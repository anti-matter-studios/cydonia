/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { createRendererResources } from "./resources";
import { createScene } from "./object/scene";
import { createPlanet, type Planet } from "@/lib/renderer/object/planet";
import type { SimulationState } from "@/lib/renderer/simulation/state";
import type { PlanetData } from "@/lib/schemas";
import { brand } from "@/lib/utils";
import { unixTimestampToJulianDateTDB, type UnixTimestampUTC } from "@/lib/math";


/** Three.JS-based renderer that can simulate the state of the system. */
export interface SystemPeekerSimulator {
    render(deltaTime: number): void;
    resize(width: number, height: number): void;
    dispose(): void;

    track(planetDesignation: string): void;
    stopTracking(): void;
    addPlanet(planet: PlanetData): void;
    setSimulationTime(wallClockUTC: UnixTimestampUTC): void;
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
    const state: SimulationState = {
        wallClockUTC: brand(Date.now()),
        wallClockJD: unixTimestampToJulianDateTDB(brand(Date.now())),
        bodies: {},
    };

    const planets = new Map<string, Planet>();

    return {
        render(deltaTime) {
            scene.update?.(deltaTime);
            resources.render(scene, scene.camera);
        },
        resize(width, height) {
            resources.resize(width, height);
            scene.camera.resize(width, height);
        },
        dispose() {
            resources.dispose();
        },
        track(planetDesignation) {
            scene.camera.track(planetDesignation);
        },
        stopTracking() {
            scene.camera.stopTracking();
        },
        addPlanet(descriptor) {
            const planet = createPlanet(descriptor);
            planets.set(descriptor.designation, planet);
            scene.add(planet);
            scene.add(planet.orbit);
            state.bodies[descriptor.designation] = descriptor.orbit;
        },
        setSimulationTime(time) {
            const deltaTime = (time - state.wallClockUTC) / 1000;
            state.wallClockUTC = time;
            state.wallClockJD = unixTimestampToJulianDateTDB(time);
            scene.simulationUpdate?.(state, deltaTime);
        }
    };
}
