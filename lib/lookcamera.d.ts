import { Camera, Object3D, Vector3 } from "three";
export declare const VEC3_RIGHT: Vector3;
export declare const RAD_90: number;
export declare const RAD_180: number;
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
export declare const LookCameraOptionsDefault: LookCameraOptions;
export declare class LookCamera extends Object3D {
    private lookEnabled;
    protected camera: Camera;
    private pitch;
    protected lookDir: Vector3;
    private sensitivity;
    protected lookDirRight: Vector3;
    private pitchLowLimit;
    private pitchHighLimit;
    constructor(options?: LookCameraOptions);
    getLookDirection(): Vector3;
    getLookEnabled(): boolean;
    setLookEnabled(enabled?: boolean): this;
    getCamera(): Camera;
    hasCamera(): boolean;
    addRotationInput(deltaX: number, deltaY: number): void;
    clipPitchLimit(): void;
    setRotationInput(x: number, y: number): void;
}
