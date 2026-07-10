/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { BufferGeometry, LineBasicMaterial, LineLoop, type Material, type Vector3 } from "three";
import { asRadiansWrapped } from "@/lib/math";
import { convertDegreesOrbitalParameterAnglesToRadians, type OrbitalParameters } from "@/lib/schemas";
import { getBodyPerifocalCoordinatesFromEccentricAnomaly, getOrbitPerifocalToWorldQuaternion } from "@/lib/orbit";

import { type GameObject, wrapGameObject } from "@/lib/renderer/object";
import { ORBIT_BASE_COLOUR, ORBIT_LINE_SEGMENTS } from "@/lib/renderer/config";


/** Game object used to represent a planet orbit. */
export interface OrbitLine extends GameObject<LineLoop<BufferGeometry, Material>> {
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
export function createOrbitLine(parameters: OrbitalParameters): OrbitLine {
    const points = deriveOrbitVertices(parameters);
    const geometry = new BufferGeometry().setFromPoints(points);
    const material = new LineBasicMaterial({
        color: ORBIT_BASE_COLOUR,
        opacity: 0.35,
        transparent: true
    });
    const loop = new LineLoop<BufferGeometry, Material>(geometry, material);

    geometry.applyQuaternion(
        getOrbitPerifocalToWorldQuaternion(
            convertDegreesOrbitalParameterAnglesToRadians(parameters.angles)
        )
    );

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