/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { OrthographicCamera, Vector3 } from "three";
import { getBodyPerifocalCoordinatesAtTime } from "@/lib/orbit";
import {
    CAMERA_DEFAULT_CLIP_PLANES,
    CAMERA_PAN_TIME_SECONDS, CAMERA_TRACKING_DAMPING,
    SCENE_HEIGHT_SCALE
} from "@/lib/renderer/config";
import { type GameObject, wrapGameObject } from "../object";
import type { PlanetData } from "@/lib/schemas";
import { easeInOutCubic } from "@/lib/math";

/** API exposed to manipulate the {@link Camera} object. */
export interface CameraAPI {
    /**
     * Resizes the viewport of the camera to match the aspect ratio for the provided canvas size.
     *
     * @param width The width of the canvas.
     * @param height The height of the canvas.
     */
    resize(width: number, height: number): void;

    /**
     * Starts tracking the given object by its designation.
     *
     * This will query the position of the object from the parent scene and start tracking it.
     * The view will pan towards the selected object and keep up with it every frame.
     */
    track(designation: string): void;

    /**
     * Stops tracking the currently tracked body.
     *
     * If nothing is currently tracked, this method does nothing.
     */
    stopTracking(): void;
}

/** Camera used by the system peeker to render the entire system. */
export interface Camera extends GameObject<OrthographicCamera>, CameraAPI {
    /** The designation of the currently tracked body, if any. */
    readonly trackedBodyDesignation?: string;
}

/**
 * Creates a new camera object.
 *
 * The user can pan and zoom the camera with keyboard and/or touch controls.
 * The camera is also able to track a body by its designation,
 * following its orbit through the {@link SimulationState.bodies} property.
 *
 * @returns The camera object that can be used to render the system.
 */
export function createCamera(): Camera {
    const camera = new OrthographicCamera(
        -SCENE_HEIGHT_SCALE / 2,
        SCENE_HEIGHT_SCALE / 2,
        SCENE_HEIGHT_SCALE / 2,
        -SCENE_HEIGHT_SCALE / 2,
        CAMERA_DEFAULT_CLIP_PLANES.near,
        CAMERA_DEFAULT_CLIP_PLANES.far
    );
    camera.position.set(0, 0, CAMERA_DEFAULT_CLIP_PLANES.far / 2);

    let tracked: string | undefined;
    let currentProgress = 0;
    let easingStartPosition: Vector3 | undefined;
    let targetPosition: Vector3 | undefined;

    return wrapGameObject(camera, {
        resize(width, height) {
            const ratio = width / height;
            this.left = -(ratio / 2) * SCENE_HEIGHT_SCALE;
            this.right = (ratio / 2) * SCENE_HEIGHT_SCALE;
            this.updateProjectionMatrix();
        },
        track(designation) {
            tracked = designation;
            currentProgress = 0;
            easingStartPosition = this.position.clone();
        },
        stopTracking() {
            tracked = undefined;
            targetPosition = undefined;
            easingStartPosition = undefined;
        },
        update(deltaTime) {
            if (!targetPosition) {
                return;
            }

            // Handle smooth ease-in-out until close enough to the target.
            if (easingStartPosition) {
                currentProgress += deltaTime / CAMERA_PAN_TIME_SECONDS;
                let progress = easeInOutCubic(currentProgress);
                progress = Math.min(1, Math.max(0, progress));
                this.position.copy(easingStartPosition.lerp(targetPosition, progress));

                // Stop the easing if we're close enough to the target.
                if (progress > .99) {
                    easingStartPosition = undefined;
                }
                return;
            }

            // Follow the target using exponential damping.
            const position = this.position.clone();
            position.lerp(targetPosition, 1 - Math.exp(-CAMERA_TRACKING_DAMPING * deltaTime));
            this.position.copy(targetPosition);
            this.updateMatrixWorld();
        },
        simulationUpdate(state) {
            if (!tracked) {
                return;
            }

            // Get the target position of the tracked target.
            const parameters = state.bodies[tracked] as PlanetData | undefined;
            if (!parameters) {
                console.error("Cannot find body with designation \"%s\"", tracked);
                return;
            }
            targetPosition = getBodyPerifocalCoordinatesAtTime(state.wallClockJD, parameters.orbit)
                .add(new Vector3(0, 0, CAMERA_DEFAULT_CLIP_PLANES.far / 2));
        }
    });
}