/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { type Camera, OrthographicCamera } from "three";
import { AU_UNIT_SCALE } from "../object";

/** Default zoom level of the camera. */
export const CAMERA_DEFAULT_ZOOM_LEVEL = 10;

/** API exposed by {@link createSystemPeekerCamera}. */
export interface SystemPeekerCamera {
    /** Camera object that should be used to render the scene. */
    readonly camera: Camera;

    /** Resizes the viewport of the camera. */
    resize(width: number, height: number): void;
}

/** Builds the API for the system peeker camera. */
export function createSystemPeekerCamera(): SystemPeekerCamera {
    const camera = new OrthographicCamera(-AU_UNIT_SCALE, AU_UNIT_SCALE, AU_UNIT_SCALE, -AU_UNIT_SCALE, 0.001, 100000);
    camera.position.setZ(AU_UNIT_SCALE);

    return {
        /** @returns The camera object to use in the scene. */
        get camera() {
            return camera;
        },
        resize(width, height) {
            camera.left = -(width / height) * AU_UNIT_SCALE;
            camera.right = (width / height) * AU_UNIT_SCALE;
            camera.zoom = CAMERA_DEFAULT_ZOOM_LEVEL;
            camera.updateProjectionMatrix();
        }
    };
}
