/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { Quaternion, Vector3 } from "three";


/** Orbital parameters, as retrieved from the MPC database. */
export interface OrbitalParameters {
    /** The epoch of these parameters, in Terrestrial Time Julian Date */
    epochTTJD: number;

    /** The distance to orbiting body at perihelion (q), in astronomical units. */
    perihelionDistanceAU: number;

    /** The eccentricity (e) of the orbit. */
    eccentricity: number;

    /** The inclination (i) of the orbit, in degrees. */
    inclinationDegrees: number;

    /** The longitude of the ascending node (Ω), in degrees. */
    longitudeOfAscendingNodeDegrees: number;

    /** The argument of perihelion (ω), in degrees. */
    argumentOfPerihelionDegrees: number;

    /** The time of perihelion passage (Tp), in Terrestrial Time Julian Date */
    timeOfPerihelionPassageTTJD: number;

    /** The semi-major axis (a) of the orbit, in astronomical units. */
    semiMajorAxisAU: number;

    /** The mean anomaly (M) of the orbit at the {@link epochTTJD}, in degrees. */
    meanAnomalyDegrees: number;

    /** The orbital period (P), in days. */
    orbitalPeriodDays: number;
}

/**
 * Builds a quaternion that transforms a vector from the perifocal frame to the world frame.
 *
 * @param {OrbitalParameters} parameters The orbital parameters.
 * @returns {Quaternion} The transformation quaternion.
 */
export function getPerifocalToWorldQuaternion(parameters: OrbitalParameters): Quaternion {
    const longitudeOfAscendingNodeQuaternion = new Quaternion();
    longitudeOfAscendingNodeQuaternion.setFromAxisAngle(
        new Vector3(0, 0, 1),
        parameters.longitudeOfAscendingNodeDegrees / 180 * Math.PI
    );

    const inclinationQuaternion = new Quaternion();
    inclinationQuaternion.setFromAxisAngle(
        new Vector3(1, 0, 0),
        parameters.inclinationDegrees / 180 * Math.PI
    );

    const argumentOfPerihelionQuaternion = new Quaternion();
    argumentOfPerihelionQuaternion.setFromAxisAngle(
        new Vector3(0, 0, 1),
        parameters.argumentOfPerihelionDegrees / 180 * Math.PI
    );

    return longitudeOfAscendingNodeQuaternion
        .multiply(inclinationQuaternion)
        .multiply(argumentOfPerihelionQuaternion);
}
