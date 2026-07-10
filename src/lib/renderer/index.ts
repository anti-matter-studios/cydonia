/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { Object3D } from "three";


import type { CameraAPI } from "./control/camera";
import { createScene } from "./object/scene";
import { createRendererResources } from "./resources";
import type { GameObject } from "./object";
import type { SimulationState } from "./state";


export type {
    PlanetGeometry, PlanetGeometryOptions, PlanetMaterialOptions, PlanetMaterial, Planet, GameObject, Sun
} from "./object";

/** Three.JS-based renderer that can simulate the state of the system. */
export interface SystemPeekerSimulator extends CameraAPI {
    /**
     * Renders a frame of the scene and presents it to the target canvas.
     *
     * @param deltaTimeSeconds The time, in seconds, elapsed since the last frame.
     */
    render(deltaTimeSeconds: number): void;

    /**
     * Adds a new object to the scene.
     *
     * @param object The object that should be added to the scene.
     */
    add<T extends GameObject<Object3D>>(object: T): T;

    /**
     * Removes a game object from the scene.
     *
     * @param object The object that should be removed from the scene.
     */
    remove(object: GameObject<Object3D>): void;

    /**
     * Updates the simulation state.
     *
     * @param state The new state of the simulation.
     */
    updateSimulationState(state: SimulationState): void;

    /** Disposes of the resources used by the simulator. */
    dispose(): void;
}

/**
 * Creates a new {@link SystemPeekerSimulator} object.
 *
 * @param target The canvas element or offscreen canvas to render to.
 * @returns The simulator object.
 */
export function createSystemPeekerSimulator(target: HTMLCanvasElement | OffscreenCanvas): SystemPeekerSimulator {
    const resources = createRendererResources(target);
    const scene = createScene();

    let previousUpdateTimeSconds: number | undefined;

    return {
        render(deltaTime) {
            scene.update?.(deltaTime);
            resources.render(scene, scene.camera);
        },
        dispose() {
            resources.dispose();
        },
        add(object) {
            scene.add(object);
            return object;
        },
        remove(object) {
            scene.remove(object);
        },
        updateSimulationState(state) {
            const nowInSeconds = state.wallClockUTC / 1000;
            const deltaTimeSeconds = previousUpdateTimeSconds ? nowInSeconds - previousUpdateTimeSconds : 0;
            scene.simulationUpdate?.(state, deltaTimeSeconds);
            previousUpdateTimeSconds = nowInSeconds;
        },
        resize(width, height) {
            resources.resize(width, height);
            scene.camera.resize(width, height);
        },
        track: scene.camera.track.bind(scene.camera),
        stopTracking: scene.camera.stopTracking.bind(scene.camera)
    };
}
