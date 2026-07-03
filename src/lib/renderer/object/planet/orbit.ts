/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { BufferGeometry, LineBasicMaterial, LineLoop } from "three";
import {
    getEccentricAnomalyInRadians,
    getOrbitCoordinatesFromEccentricAnomalyAU,
    type OrbitalParameters
} from "../../orbit";
import { AU_UNIT_SCALE } from "../scene";
import type { SystemPeekerObject } from "../object";


const DEFAULT_ORBIT_VERTEX_COUNT = 360;
const ORBIT_LINE_OPACITY = .32;

/** Type of the object used to draw a planet orbit. */
export type SystemPeekerPlanetOrbit = SystemPeekerObject<LineLoop<BufferGeometry, LineBasicMaterial>>;

/** Builds a line loop that samples one full orbit by regularly advancing mean anomaly. */
export function createSystemPeekerPlanetOrbit(
    parameters: OrbitalParameters,
    vertexCount = DEFAULT_ORBIT_VERTEX_COUNT
): SystemPeekerPlanetOrbit {
    const points = Array.from({ length: vertexCount }, (_, index) => {
        const meanAnomalyRadians = index / vertexCount * Math.PI * 2;
        const eccentricAnomaly = getEccentricAnomalyInRadians(meanAnomalyRadians, parameters);

        return getOrbitCoordinatesFromEccentricAnomalyAU(eccentricAnomaly, parameters)
            .multiplyScalar(AU_UNIT_SCALE);
    });
    const geometry = new BufferGeometry().setFromPoints(points);
    const material = new LineBasicMaterial({
        color: 0xfff2a3,
        opacity: ORBIT_LINE_OPACITY,
        transparent: true
    });

    return { object: new LineLoop(geometry, material) };
}
