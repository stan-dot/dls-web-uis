import os
import datetime
from contextlib import asynccontextmanager
from typing import Annotated,List, Optional, Union

from fastapi import Depends, FastAPI, Form, UploadFile, File
from fastapi.responses import HTMLResponse
from fastapi_pagination import add_pagination
from fastapi_pagination.cursor import CursorPage
from fastapi_pagination.ext.sqlalchemy import paginate
from sqlmodel import Session, SQLModel, create_engine, select

from fastapi.staticfiles import StaticFiles

from .crud import (add_new_standard, get_data, get_standard, update_review, select_all,select_or_create_person)
from .schemas import (
    Review,
    XASStandard,
    Element,
    Edge,
    Beamline,
    BeamlineResponse,
    XASStandardResponse,
    XASStandardAdminResponse,
    XASStandardInput,
    LicenceType
)

dev = False
lifespan = None


if dev:
    engine = create_engine(
        "sqlite:///standards.db", connect_args={"check_same_thread": False}, echo=True
    )

    @asynccontextmanager
    async def lifespan(app: FastAPI):
        SQLModel.metadata.create_all(engine)
        yield
else:
    url = os.environ.get("POSTGRESURL")
    engine = create_engine(url)


def get_session():
    with Session(engine) as session:
        yield session


app = FastAPI(lifespan=lifespan)

add_pagination(app)


@app.get("/api/licences") 
def read_licences(session: Session = Depends(get_session)) -> List[LicenceType]:
    return list(LicenceType)

@app.get("/api/beamlines") 
def read_beamlines(session: Session = Depends(get_session))-> List[BeamlineResponse]:
    bl = select_all(session,Beamline)
    return bl

@app.get("/api/elements") 
def read_elements(session: Session = Depends(get_session))-> List[Element]:
    e = select_all(session, Element)
    return e

@app.get("/api/edges") 
def read_edges(session: Session = Depends(get_session))-> List[Edge]:
    e = select_all(session, Edge)
    return e

@app.get("/api/standards")
def read_standards(session: Session = Depends(get_session), 
                   element: str | None = None,
                   admin: bool = False,
                   response_model=Union[XASStandardResponse, XASStandardAdminResponse]) -> CursorPage[XASStandardAdminResponse | XASStandardResponse]:
    
    #CHECK HEADER FOR ADMIN QUERY

    statement = select(XASStandard)

    if element:
        statement = statement.join(Element, XASStandard.element_z==Element.z).where(Element.symbol == element)

    if admin:
        transformer = lambda x: [XASStandardAdminResponse.model_validate(i) for i in x]
    else:
        transformer = lambda x: [XASStandardResponse.model_validate(i) for i in x]

    return paginate(session, statement.order_by(XASStandard.id), transformer=transformer)


@app.get("/api/standards/{id}")
async def read_standard(
    id: int, session: Session = Depends(get_session)
) -> XASStandardResponse:
    return get_standard(session, id)


@app.post("/api/standards")
def add_standard_file(
    xdi_file: UploadFile,
    element_id:  Annotated[str, Form()],
    edge_id:  Annotated[str, Form()],
    beamline_id:  Annotated[int, Form()],
    sample_name:  Annotated[str, Form()],
    sample_prep: Annotated[str, Form()],
    doi: Annotated[str, Form()],
    citation: Annotated[str, Form()],
    comments: Annotated[str, Form()],
    date: Annotated[str, Form()],
    licence:  Annotated[str, Form()],
    additional_files: Optional[list[UploadFile]]= Form(None),
    sample_comp:  Optional[str] = Form(None),
    session: Session = Depends(get_session)
) -> XASStandard:
    
    if additional_files:
        print(f"Additional files {len(additional_files)}")

    person = select_or_create_person(session, "test1234")

    form_input = XASStandardInput(submitter_id=person.id,
                                      beamline_id=beamline_id,
                                      doi=doi,
                                      element_z=element_id,
                                      edge_id=edge_id,
                                      sample_name=sample_name,
                                      sample_prep=sample_prep,
                                      submitter_comments= comments,
                                      citation=citation,
                                      licence=licence,
                                      collection_date=date,
                                      submission_date=datetime.datetime.now(),
                                      sample_comp=sample_comp)

    return add_new_standard(session, xdi_file, form_input, additional_files)


@app.patch("/api/standards")
def submit_review(review: Review, session: Session = Depends(get_session)):
    return update_review(session, review)


@app.get("/api/data/{id}")
async def read_data(id: int, session: Session = Depends(get_session)):
    return get_data(session, id)


@app.post("/uploadfiles/")
async def create_upload_files(
    files: Annotated[
        list[UploadFile], File(description="Multiple files as UploadFile")
    ],
):
    return {"filenames": [file.filename for file in files]}


@app.get("/test")
async def main():
    content = """
<body>
<form action="/uploadfiles/" enctype="multipart/form-data" method="post">
<input name="files" type="file" multiple>
<input type="submit">
</form>
</body>
    """
    return HTMLResponse(content=content)

# app.mount("/", StaticFiles(directory="/client/dist", html = True), name="site")import os
import uuid

from fastapi import HTTPException
from larch.io import xdi
from sqlmodel import select

from larch.xafs import pre_edge,set_xafsGroup

from .schemas import (
    Beamline,
    Person,
    PersonInput,
    XASStandard,
    XASStandardData,
    XASStandardInput,
    XASStandardDataInput
)

pvc_location = "/scratch/xas-standards-pretend-pvc/"

def get_beamline_names(session):
    results = session.exec(select(Beamline.name, Beamline.id)).all();
    return results

def select_all(session, sql_model):
    statement = select(sql_model)
    results = session.exec(statement)
    return results.unique().all()

def get_standard(session, id) -> XASStandard:
    standard = session.get(XASStandard, id)
    if standard:
        return standard
    else:
        raise HTTPException(status_code=404, detail=f"No standard with id={id}")


def update_review(session, review):
    standard = session.get(XASStandard, review.id)
    standard.review_status = review.review_status
    session.add(standard)
    session.commit()
    session.refresh(standard)
    return standard

def select_or_create_person(session, identifier):
    p = PersonInput(identifier=identifier)

    statement = select(Person).where(Person.identifier == p.identifier)
    person = session.exec(statement).first()

    if person is None:
        new_person = Person.from_orm(p)
        session.add(new_person)
        session.commit()
        session.refresh(new_person)
        person = new_person

    return person


def add_new_standard(session, file1, xs_input : XASStandardInput, additional_files):

    tmp_filename = pvc_location + str(uuid.uuid4())

    with open(tmp_filename, "wb") as ntf:
        filename = ntf.name
        ntf.write(file1.file.read())
        xdi_data = xdi.read_xdi(filename)

        set_labels = set(xdi_data.array_labels)

        fluorescence = "mufluro" in set_labels
        transmission = "mutrans" in set_labels
        emission = "mutey" in set_labels

        xsd = XASStandardDataInput(fluorescence=fluorescence,
                                   location=tmp_filename,
                                   original_filename=file1.filename,
                                   emission=emission,
                                   transmission=transmission)

    new_standard = XASStandard.model_validate(xs_input)
    new_standard.xas_standard_data = XASStandardData.model_validate(xsd)
    session.add(new_standard)
    session.commit()
    session.refresh(new_standard)

    return new_standard


def get_data(session, id):
    standard = session.get(XASStandard, id)
    if not standard:
        raise HTTPException(status_code=404, detail=f"No standard with id={id}")
    
    standard_data = session.get(XASStandardData, standard.data_id)

    if not standard_data:
        raise HTTPException(status_code=404, detail=f"No standard data for standard with id={id}")

    xdi_data = xdi.read_xdi(standard_data.location)

    if "energy" not in xdi_data:
        raise HTTPException(status_code=404, detail=f"No energy in file with id={id}")
    
    if "mutrans" not in xdi_data and "":
        raise HTTPException(status_code=404, detail=f"No itrans in file with id={id}")

    e = xdi_data["energy"]
    t = xdi_data["mutrans"]
    r = xdi_data["murefer"]

    tg = set_xafsGroup(None)
    tg.energy = e
    tg.mu = t
    pre_edge(tg)

    tr = set_xafsGroup(None)
    tr.energy = e
    tr.mu = r
    pre_edge(tr)


    return {"energy": e.tolist(), "mutrans": tg.flat.tolist(), "murefer": tr.flat.tolist()}
from typing import Optional, List
from pydantic import BaseModel
from sqlmodel import Field, SQLModel, Enum, Column, Relationship

import datetime

import enum


class Review(BaseModel):
    id: int
    review_status: str

class Mono(BaseModel):
    name: Optional[str] = None
    d_spacing: Optional[str] = None

class Sample(BaseModel):
    name: Optional[str] = None
    prep: Optional[str] = None

class PersonInput(SQLModel):
    identifier: str = Field(index=True, unique=True)

class Person(PersonInput, table=True):
    id: int | None = Field(primary_key=True, default=None)

class ElementInput(SQLModel):
    symbol: str = Field(unique=True)

class Element(ElementInput, table=True):
    __tablename__: str = "element"

    z: int = Field(primary_key=True, unique=True)
    name: str = Field(unique=True)

class EdgeInput(SQLModel):
   name: str = Field(unique=True)

class Edge(EdgeInput, table=True):
    __tablename__: str = "edge"

    id: int = Field(primary_key=True)
    level:str = Field(unique=True)

class Facility(SQLModel, table=True):
    __tablename__: str = "facility"

    id: int = Field(primary_key=True)
    name: str = Field(unique=True)
    notes: str
    fullname: str
    laboratory: str
    city: str
    region: str
    country: str

    beamlines: List["Beamline"] = Relationship(back_populates="facility", sa_relationship_kwargs={"lazy": "joined"})

class Beamline(SQLModel, table=True):
    __tablename__: str = "beamline"

    id: int = Field(primary_key=True)
    name: str = Field(unique=True)
    notes: str | None
    xray_source: str | None
    facility_id: int = Field(foreign_key="facility.id")

    facility: Facility = Relationship(back_populates="beamlines", sa_relationship_kwargs={"lazy": "joined"})


class FacilityResponse(SQLModel):
    fullname: str
    name: str
    city: str
    country: str

class BeamlineResponse(SQLModel):
    id: int
    name: str
    notes: str
    facility: FacilityResponse


class XASStandardDataInput(SQLModel):
    original_filename: str
    transmission: bool
    fluorescence: bool
    emission: bool
    location: str

class XASStandardData(XASStandardDataInput, table=True):
    __tablename__: str = "xas_standard_data"

    id: int | None = Field(primary_key=True, default=None)

    xas_standard: "XASStandard" = Relationship(back_populates="xas_standard_data")


class ReviewStatus(enum.Enum):
    pending = "pending"
    approved = "approved"
    rejected = "rejected"

class LicenceType(enum.Enum):
    cc_by = "cc_by"
    cc_0 = "cc_0"
    logged_in_only = "logged_in_only"


class XASStandardInput(SQLModel):

    submitter_id: int = Field(foreign_key="person.id")
    submission_date: datetime.datetime
    collection_date: Optional[datetime.datetime]
    doi: Optional[str] = None
    citation: Optional[str] = None
    element_z: int = Field(foreign_key="element.z")
    edge_id: int = Field(foreign_key="edge.id")
    sample_name: str
    sample_prep: Optional[str]
    sample_comp: Optional[str]
    beamline_id: int = Field(foreign_key="beamline.id")
    licence : LicenceType = Field(sa_column=Column(Enum(LicenceType)))

class XASStandard(XASStandardInput, table=True):
    __tablename__: str = "xas_standard"
    id: int | None = Field(primary_key=True, default=None)
    data_id: int | None = Field(foreign_key="xas_standard_data.id", default=None)
    reviewer_id: Optional[int] = Field(foreign_key="person.id", default=None)
    reviewer_comments: Optional[str] = None
    review_status: Optional[ReviewStatus] = Field(sa_column=Column(Enum(ReviewStatus)), default=ReviewStatus.pending)

    xas_standard_data: XASStandardData = Relationship(back_populates="xas_standard")
    element: Element = Relationship(sa_relationship_kwargs={"lazy": "joined"})
    edge: Edge = Relationship(sa_relationship_kwargs={"lazy": "joined"})
    beamline: Beamline = Relationship(sa_relationship_kwargs={"lazy": "selectin"})

class XASStandardResponse(XASStandardInput):
    id : int | None 
    element: ElementInput
    edge: EdgeInput
    beamline: BeamlineResponse
    submitter_id: int 


class XASStandardAdminResponse(XASStandardResponse):
    reviewer_id: Optional[int] = None
    reviewer_comments: Optional[str] = None
    review_status: Optional[ReviewStatus] = None


