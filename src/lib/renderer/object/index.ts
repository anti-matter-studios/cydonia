/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { createSystemPeekerSunMesh, type SystemPeekerSun } from "./sun";
import { createSystemPeekerScene, type SystemPeekerScene } from "./scene";
import {
    createSystemPeekerPlanetMesh,
    type SystemPeekerPlanet
} from "./planet";
import type { SystemPeekerRendererState } from "../state";
import { PLANETS } from "../../../data/orbit/planets";


export type { SystemPeekerObject } from "./object";
export { createSystemPeekerScene, AU_UNIT_SCALE, type SystemPeekerScene } from "./scene";
export {
    createSystemPeekerPlanetMesh,
    SYSTEM_PLANET_DEFINITIONS,
    type SystemPeekerPlanet,
    type SystemPeekerPlanetDefinition
} from "./planet";
export { createSystemPeekerSunMesh, SYSTEM_SCALE, type SystemPeekerSun } from "./sun";

/** Scene rendered by the system peeker. */
export interface SystemPeekerSystem {
    /** Root of the scene. */
    readonly root: SystemPeekerScene;

    /** Sun rendered in the centre of the scene. */
    readonly sun: SystemPeekerSun;

    /** Planet previews rendered in a temporary line beside the Sun. */
    readonly planets: readonly SystemPeekerPlanet[];

    /** @see {SystemPeekerObject.update} */
    update(deltaTime: number, state: SystemPeekerRendererState): void;
}

/**
 * Creates the root system scene for the system peeker.
 *
 * Creates the scene, sun, all major planets and their orbits.
 */
export function createSystemPeekerSystem(): SystemPeekerSystem {
    const root = createSystemPeekerScene();
    const sun = createSystemPeekerSunMesh();
    const planets = Object.values(PLANETS).map(createSystemPeekerPlanetMesh);

    root.object.add(sun.object);
    root.object.add(...planets.map((planet) => planet.orbit.object));
    root.object.add(...planets.map((planet) => planet.object));

    return {
        root,
        sun,
        planets,
        update(deltaTime, state) {
            sun.update?.(deltaTime, state);
            planets.forEach((planet) => {
                planet.update?.(deltaTime, state);
            });
        }
    };
}
