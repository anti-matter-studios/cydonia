/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { Vector3 } from "three";
import { getEccentricAnomalyInRadians } from "./eccentric-anomaly";
import { getMeanAnomalyInRadians } from "./mean-anomaly";
import { getPerifocalToWorldQuaternion, type OrbitalParameters } from "./orbital-parameters";


/**
 * Gets the position of a body in its orbit at a given time.
 *
 * The returned vector is in Astronomical Units (AU), in 3D space coordinates.
 *
 * @param targetTimeTTJD The time in Terrestrial Time Julian Date (TTJD) at which to calculate the position.
 * @param parameters The parameters of the orbit.
 * @returns The position vector of the body in its orbit at the given time, in Astronomical Units (AU).
 */
export function getOrbitCoordinatesAU(
    targetTimeTTJD: number,
    parameters: OrbitalParameters
): Vector3 {
    const meanAnomalyRadians = getMeanAnomalyInRadians(targetTimeTTJD, parameters);
    const eccentricAnomaly = getEccentricAnomalyInRadians(meanAnomalyRadians, parameters);

    return getOrbitCoordinatesFromEccentricAnomalyAU(eccentricAnomaly, parameters);
}

/**
 * Gets the position of a body in its orbit for a given eccentric anomaly.
 *
 * The returned vector is in Astronomical Units (AU), in 3D space coordinates.
 *
 * @param eccentricAnomaly The eccentric anomaly to sample, in radians.
 * @param parameters The parameters of the orbit.
 * @returns The position vector of the body in its orbit, in Astronomical Units (AU).
 */
export function getOrbitCoordinatesFromEccentricAnomalyAU(
    eccentricAnomaly: number,
    parameters: OrbitalParameters
): Vector3 {
    return getOrbitPerifocalCoordinatesFromEccentricAnomalyAU(eccentricAnomaly, parameters)
        .applyQuaternion(getPerifocalToWorldQuaternion(parameters));
}

/**
 * Gets the position of a body in its orbit for a given eccentric anomaly, in the orbital plane.
 *
 * The returned vector is in Astronomical Units (AU). The Z component is always 0.
 *
 * @param eccentricAnomaly The eccentric anomaly to sample, in radians.
 * @param parameters The parameters of the orbit.
 * @returns The position vector of the body in its orbit, in Astronomical Units (AU).
 */
export function getOrbitPerifocalCoordinatesFromEccentricAnomalyAU(
    eccentricAnomaly: number,
    parameters: OrbitalParameters
): Vector3 {
    return new Vector3(
        parameters.semiMajorAxisAU * (Math.cos(eccentricAnomaly) - parameters.eccentricity),
        parameters.semiMajorAxisAU * Math.sqrt(1 - parameters.eccentricity ** 2) * Math.sin(eccentricAnomaly),
        0
    );
}
