
import { Camera, Object3D, Vector3, PerspectiveCamera } from "three";

let radians = (degrees: number): number => degrees * (Math.PI / 180);
let degrees = (radians: number): number => radians * (180 / Math.PI);
export const VEC3_RIGHT = new Vector3(0, 1, 0);
export const RAD_90 = radians(90);
export const RAD_180 = radians(180);

export interface LookCameraOptions {
  fov?: number;
  camera?: Camera;
  sensitivity?: number;
  pitchLowLimit?: number;
  pitchHighLimit?: number;
  aspect?: number;
  near?: number;
  far?: number;
}

export const LookCameraOptionsDefault: LookCameraOptions = {
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
  private lookEnabled: boolean;
  protected camera: Camera;
  private pitch: Object3D;
  // private yaw: Object3D;
  protected lookDir: Vector3;
  private sensitivity: number;
  protected lookDirRight: Vector3;
  private pitchLowLimit: number;
  private pitchHighLimit: number;

  constructor (options: LookCameraOptions = LookCameraOptionsDefault) {
    super();
    
    this.lookEnabled = true;

    this.sensitivity = options.sensitivity || LookCameraOptionsDefault.sensitivity;
    this.pitchLowLimit = options.pitchLowLimit || LookCameraOptionsDefault.pitchLowLimit;
    this.pitchHighLimit = options.pitchHighLimit || LookCameraOptionsDefault.pitchHighLimit;

    this.camera = new PerspectiveCamera(
      options.fov || LookCameraOptionsDefault.fov,
      options.aspect || LookCameraOptionsDefault.aspect,
      options.near || LookCameraOptionsDefault.near,
      options.far || LookCameraOptionsDefault.far
    );

    this.pitch = new Object3D();
    // this.yaw = new Object3D();
    this.lookDir = new Vector3();

    this.lookDirRight = new Vector3();

    this.pitch.add(this.camera);

    this.add(this.pitch);
    // this.yaw.add(this.pitch);
  }
  getLookDirection (): Vector3 {
    this.camera.getWorldDirection(this.lookDir);
    return this.lookDir;
  }
  getLookEnabled (): boolean {
    return this.lookEnabled;
  }
  setLookEnabled (enabled: boolean = true): this {
    this.lookEnabled = enabled;
    return this;
  }
  getCamera (): Camera {
    return this.camera;
  }
  hasCamera(): boolean {
    return this.camera !== undefined && this.camera !== null;
  }
  addRotationInput (deltaX: number, deltaY: number) {
    if (isNaN(deltaX)) throw `deltaX is nan`;
    if (isNaN(deltaY)) throw `deltaY is nan`;
    if (!this.lookEnabled) return;
    this.rotation.y -= deltaX * this.sensitivity;
    this.pitch.rotation.x -= deltaY * this.sensitivity;

    this.clipPitchLimit()
  }
  clipPitchLimit () {
    if (this.pitchLowLimit !== undefined && this.pitch.rotation.x < this.pitchLowLimit) {
      this.pitch.rotation.x = this.pitchLowLimit;
    } else if (this.pitchHighLimit !== undefined && this.pitch.rotation.x > this.pitchHighLimit) {
      this.pitch.rotation.x = this.pitchHighLimit;
    }
  }
  setRotationInput (x: number, y: number) {
    if (isNaN(x)) throw `x is nan`;
    if (isNaN(y)) throw `y is nan`;
    if (!this.lookEnabled) return;
    this.rotation.y = x * this.sensitivity;
    this.pitch.rotation.x = y * this.sensitivity;

    this.clipPitchLimit();
  }
}
