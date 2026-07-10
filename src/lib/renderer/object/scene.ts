/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { Scene as ThreeJsScene } from "three";
import { ASTRONOMICAL_UNIT_SCALE } from "@/lib/renderer/config";
import { type Camera, createCamera } from "../control/camera";
import { type GameObject, wrapGameObject } from "./game-object";

/** Game object used as the root of the renderer. */
export interface Scene extends GameObject<ThreeJsScene> {
    /** The main camera used to render the scene. */
    get camera(): Camera;
}

/**
 * Initialises the main scene of the renderer.
 *
 * Creates the main {@link Camera} and sets the scaling up for rendering.
 */
export function createScene(): GameObject<Scene> {
    const scene = new ThreeJsScene();
    const camera = createCamera();

    scene.add(camera);
    scene.scale.setScalar(1 / ASTRONOMICAL_UNIT_SCALE);

    return wrapGameObject(scene, {
        get camera() {
            return camera;
        }
    });
}
