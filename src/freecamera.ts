
import { Vector3 } from "three";
import { LookCamera, VEC3_RIGHT, RAD_90, LookCameraOptions } from "./lookcamera";

export interface FreeCameraOptions extends LookCameraOptions {
  
}

export const FreeCameraOptionsDefault: FreeCameraOptions = {
  aspect: 1,
  camera: null,
  far: 1000,
  fov: 75,
  near: 0.1,
  pitchHighLimit: 1.5,
  pitchLowLimit: -1.5,
  sensitivity: 0.002
};

export class FreeCamera extends LookCamera {
  private movementVector: Vector3;
  private movementEnabled: boolean;

  constructor(options: FreeCameraOptions = FreeCameraOptionsDefault) {
    super(options);

    this.movementVector = new Vector3();

    this.movementEnabled = true;
  }
  setMovementEnabled(enabled: boolean = true): this {
    this.movementEnabled = enabled;
    return this;
  }
  getMovementEnabled(): boolean {
    return this.movementEnabled;
  }
  addMovementInput(forwardDelta: number, sideDelta: number): this {
    //Do math to get forward delta vector
    this.movementVector
    .copy(this.getLookDirection())
    .normalize()
    .multiplyScalar(forwardDelta);

    this.position.add(this.movementVector);

    //Do math to get the side delta vector
    this.lookDirRight.set(
      this.lookDir.x,
      0,
      this.lookDir.z
    );

    this.movementVector
    .copy(this.lookDirRight)
    .applyAxisAngle(VEC3_RIGHT, RAD_90)
    .normalize()
    .multiplyScalar(sideDelta);

    this.position.add(this.movementVector);
    return this;
  }
}
