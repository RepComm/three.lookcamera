import { Vector3 } from "three";
import { LookCamera, VEC3_RIGHT, RAD_90 } from "./lookcamera";
export const FreeCameraOptionsDefault = {
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
  constructor(options = FreeCameraOptionsDefault) {
    super(options);
    this.movementVector = new Vector3();
    this.movementEnabled = true;
  }

  setMovementEnabled(enabled = true) {
    this.movementEnabled = enabled;
    return this;
  }

  getMovementEnabled() {
    return this.movementEnabled;
  }

  addMovementInput(forwardDelta, sideDelta) {
    //Do math to get forward delta vector
    this.movementVector.copy(this.getLookDirection()).normalize().multiplyScalar(forwardDelta);
    this.position.add(this.movementVector); //Do math to get the side delta vector

    this.lookDirRight.set(this.lookDir.x, 0, this.lookDir.z);
    this.movementVector.copy(this.lookDirRight).applyAxisAngle(VEC3_RIGHT, RAD_90).normalize().multiplyScalar(sideDelta);
    this.position.add(this.movementVector);
    return this;
  }

}