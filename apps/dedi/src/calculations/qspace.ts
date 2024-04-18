import { Vector3, Vector2 } from "three";
import { DetectorParams } from "../types";

export interface DetectorDynamicState {
  origin: Vector3;
  beamVector: Vector3;
}

/**
 * Collection of useful methods for finding the q range.
 * todo suggestion: more descriptive property names (mki? kmod?)
 */
export default class QSpace {
  detectorFixedProperties: DetectorParams;
  detectorDynamicState: DetectorDynamicState;
  kmod: number;
  qScale: number;
  mki: Vector3;

  constructor(
    detectorFixedProperties: DetectorParams,
    detProps: DetectorDynamicState,
    wavelength: number,
    qScale: number
  ) {
    this.detectorFixedProperties = detectorFixedProperties;
    this.detectorDynamicState = detProps;
    detProps.beamVector.normalize();
    this.qScale = qScale;

    this.mki = detProps.beamVector.clone().negate();
    this.kmod = this.qScale / wavelength;
    const ki = this.detectorDynamicState.beamVector.clone();
    ki.multiplyScalar(this.kmod).negate();
    this.mki = ki.negate();
  }

  public qFromPixelPosition(vector: Vector2): Vector3 {
    const q = new Vector3();
    q.set(-vector.x, -vector.y, 0);
    q.add(this.detectorDynamicState.origin);
    return this._convertToQ(q);
  }

  public setDiffractionCrystalEnviroment(wavelength: number): void {
    this.kmod = this.qScale / wavelength;
    const ki = this.detectorDynamicState.beamVector.clone();
    ki.multiplyScalar(this.kmod);
    this.mki = ki.negate();
  }

  private _convertToQ(q: Vector3): Vector3 {
    const qLength = q.length();
    if (qLength > 0) {
      q.multiplyScalar(this.kmod / qLength);
      q.add(this.mki);
    } else {
      q.add(this.mki);
    }
    return q;
  }
}
