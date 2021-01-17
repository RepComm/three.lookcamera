import { Object3D, Vector3, PerspectiveCamera } from "three";

let radians = degrees => degrees * (Math.PI / 180);

let degrees = radians => radians * (180 / Math.PI);

export const VEC3_RIGHT = new Vector3(0, 1, 0);
export const RAD_90 = radians(90);
export const RAD_180 = radians(180);
export const LookCameraOptionsDefault = {
  fov: 65,
  camera: null,
  sensitivity: 0.002,
  pitchLowLimit: -1.5,
  pitchHighLimit: 1.5,
  aspect: 1,
  near: 0.1,
  far: 1000
};
export class LookCamera extends Object3D {
  // private yaw: Object3D;
  posY = 0;
  sensitivity = 0.002;
  pitchLowLimit = -1.5;
  pitchHighLimit = 1.5;

  constructor(options = LookCameraOptionsDefault) {
    super();
    this.lookEnabled = true;
    this.camera = new PerspectiveCamera(options.fov, options.aspect, options.near, options.far);
    this.pitch = new Object3D(); // this.yaw = new Object3D();

    this.lookDir = new Vector3();
    this.lookDirRight = new Vector3();
    this.pitch.add(this.camera);
    this.add(this.pitch); // this.yaw.add(this.pitch);
  }

  getLookDirection() {
    this.camera.getWorldDirection(this.lookDir);
    return this.lookDir;
  }

  getLookEnabled() {
    return this.lookEnabled;
  }

  setLookEnabled(enabled = true) {
    this.lookEnabled = enabled;
    return this;
  }

  getCamera() {
    return this.camera;
  }

  addRotationInput(deltaX, deltaY) {
    if (!this.lookEnabled) return;
    this.rotation.y -= deltaX * this.sensitivity;
    this.pitch.rotation.x -= deltaY * this.sensitivity;

    if (this.pitch.rotation.x < this.pitchLowLimit) {
      this.pitch.rotation.x = this.pitchLowLimit;
    } else if (this.pitch.rotation.x > this.pitchHighLimit) {
      this.pitch.rotation.x = this.pitchHighLimit;
    }
  }

  setRotationInput(x, y) {
    if (!this.lookEnabled) return;
    this.rotation.y = x * this.sensitivity;
    this.pitch.rotation.x = y * this.sensitivity;

    if (this.pitch.rotation.x < this.pitchLowLimit) {
      this.pitch.rotation.x = this.pitchLowLimit;
    } else if (this.pitch.rotation.x > this.pitchHighLimit) {
      this.pitch.rotation.x = this.pitchHighLimit;
    }
  }

}