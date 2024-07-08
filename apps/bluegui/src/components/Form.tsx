import {
  materialCells,
  materialRenderers,
} from "@jsonforms/material-renderers";
import { JsonForms } from "@jsonforms/react";
import { useState } from "react";
import Button from "@mui/material/Button";

const initialData = {};

type FormProps = {
  schema: {
    additionalProperties: boolean;
    title: string;
    type: string;
    properties: Record<any, any>;
  };
};

function Form({ schema }: FormProps) {
  const [data, setData] = useState(initialData);
  const submitData = async () => {
    let payload =
      '{"name": "' + schema.title + '","params": ' + JSON.stringify(data) + "}";
    await fetch("/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: payload,
    }).then(async (r) => {
      if (r.status == 201) {
        fetch("api/worker/task", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(await r.json()),
        }).then((r) => {
          if (r.status == 200) {
            document
              .getElementById("running")
              ?.classList.remove("hidden", "fade-out");
            setTimeout(() => {
              document.getElementById("running")?.classList.add("fade-out");
            }, 1000);
          }
        });
      }
    });
  };
  return (
    <div>
      <JsonForms
        schema={schema}
        data={data}
        renderers={materialRenderers}
        cells={materialCells}
        onChange={({ data }) => setData(data)}
      />
      <div>
        <Button
          onClick={submitData}
          color="primary"
          variant="contained"
          data-testid="clear-data"
        >
          Submit
        </Button>
      </div>
      <div id="running" className="hidden">
        <br />
        <span>Plan execution has started</span>
      </div>
    </div>
  );
}

export default Form;
