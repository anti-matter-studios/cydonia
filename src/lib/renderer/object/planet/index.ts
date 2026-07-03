/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { Mesh, ShaderMaterial, SphereGeometry, Vector3 } from "three";
import { PLANETS, type PlanetOrbitColour, type PlanetOrbitData } from "@/data/orbit/planets";
import { getOrbitCoordinatesAU } from "../../orbit";
import type { SystemPeekerObject } from "../object";

import {
    createSystemPeekerPlanetOrbit,
    type SystemPeekerPlanetOrbit
} from "./orbit";
import fragmentShader from "../shaders/world-space-gradient.frag";
import vertexShader from "../shaders/world-space-gradient.vert";
import { AU_UNIT_SCALE } from "../scene";
import { SYSTEM_SCALE } from "../sun";


/** Type of the object used for a planet. */
export interface SystemPeekerPlanet extends SystemPeekerObject<Mesh<SphereGeometry, ShaderMaterial>> {
    /** Orbit path for this planet. Attach it to the root scene, not to the planet mesh. */
    readonly orbit: SystemPeekerPlanetOrbit;
}

/** Temporary planet display definitions, ordered from the Sun outward. */
export const SYSTEM_PLANET_DEFINITIONS = PLANETS;

function createColour(value: PlanetOrbitColour): Vector3 {
    return new Vector3(value[0], value[1], value[2]);
}

/** Builds a planet mesh using the reusable world-space gradient shader. */
export function createSystemPeekerPlanetMesh(definition: PlanetOrbitData): SystemPeekerPlanet {
    const geometry = new SphereGeometry(definition.scale * SYSTEM_SCALE, 32, 32);
    const uniforms = {
        uHighlightColor: { value: createColour(definition.colours.light) },
        uLightDirection: { value: new Vector3(-1, 0, 0) },
        uShadowColor: { value: createColour(definition.colours.shaded) }
    };
    const material = new ShaderMaterial({
        name: definition.designation,
        uniforms,
        vertexShader,
        fragmentShader
    });
    const object = new Mesh(geometry, material);
    const orbit = createSystemPeekerPlanetOrbit(definition.orbitalParameters);
    object.name = definition.designation;

    return {
        object,
        orbit,
        update(_deltaTime, state) {
            object.position.copy(getOrbitCoordinatesAU(state.currentTimeTTJD, definition.orbitalParameters))
                .multiplyScalar(AU_UNIT_SCALE);

            if (object.position.lengthSq() > 0) {
                uniforms.uLightDirection.value.copy(object.position).multiplyScalar(-1).normalize();
            }
        }
    };
}

export { type PlanetOrbitData as SystemPeekerPlanetDefinition } from "@/data/orbit/planets";
export { createSystemPeekerPlanetOrbit, type SystemPeekerPlanetOrbit } from "./orbit";
