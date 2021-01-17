import { LookCamera, LookCameraOptions } from "./lookcamera";
export interface FreeCameraOptions extends LookCameraOptions {
}
export declare const FreeCameraOptionsDefault: FreeCameraOptions;
export declare class FreeCamera extends LookCamera {
    private movementVector;
    private movementEnabled;
    constructor(options?: FreeCameraOptions);
    setMovementEnabled(enabled?: boolean): this;
    getMovementEnabled(): boolean;
    addMovementInput(forwardDelta: number, sideDelta: number): this;
}
