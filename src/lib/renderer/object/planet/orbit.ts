/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { type GameObject, wrapGameObject } from "@/lib/renderer/object";
import { BufferGeometry, LineBasicMaterial, LineLoop, type Material, type Quaternion, type Vector3 } from "three";
import { type OrbitalParameters } from "@/lib/schemas";
import { ORBIT_BASE_COLOUR, ORBIT_LINE_SEGMENTS } from "@/lib/renderer/config";
import { getBodyPerifocalCoordinatesFromEccentricAnomaly } from "@/lib/orbit";
import { asRadiansWrapped } from "@/lib/math";


/** Game object used to represent a planet orbit. */
export interface PlanetOrbit extends GameObject<LineLoop<BufferGeometry, Material>> {
    /** Reference to the orbital parameters of this planet orbit object. */
    readonly parameters: OrbitalParameters;

    /** If set, renders the orbit as a dashed line. */
    dashed: boolean;

    /** If set, renders the orbit as if active. */
    active: boolean;
}

/**
 * Creates a new planet orbit game object.
 *
 * @param parameters The orbital parameters being represented.
 * @returns The newly created planet orbit game object.
 */
export function createPlanetOrbit(parameters: OrbitalParameters): PlanetOrbit {
    const points = deriveOrbitVertices(parameters);
    const geometry = new BufferGeometry().setFromPoints(points);
    const material = new LineBasicMaterial({
        color: ORBIT_BASE_COLOUR,
        opacity: 0.35,
        transparent: true
    });
    const loop = new LineLoop<BufferGeometry, Material>(geometry, material);

    return wrapGameObject(loop, {
        get parameters() {
            return parameters;
        },
        get dashed() {
            return false;
        },
        set dashed(value: boolean) {
            // TODO!
        },
        get active() {
            return false;
        },
        set active(value: boolean) {
            // TODO!
        }
    });
}

/** Builds a list of vertices for an orbit line. */
function deriveOrbitVertices(parameters: OrbitalParameters): Vector3[] {
    return Array.from({ length: ORBIT_LINE_SEGMENTS }).map(function(_, index) {
        const eccentricAnomaly = asRadiansWrapped((index / ORBIT_LINE_SEGMENTS) * Math.PI * 2);
        return getBodyPerifocalCoordinatesFromEccentricAnomaly(eccentricAnomaly, parameters);
    });
}