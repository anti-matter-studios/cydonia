/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { OrbitalParameters } from "./orbital-parameters";


/**
 * Computes the mean anomaly of an orbit for a given timestamp.
 *
 * The result is normalised to the range `[0, 360(` degrees.
 *
 * @param targetTimeTTJD The target time in terrestrial time Julian days.
 * @param parameters The orbital parameters of the object.
 * @returns The mean anomaly in degrees.
 */
export function getMeanAnomalyInDegrees(
    targetTimeTTJD: number,
    parameters: OrbitalParameters
): number {
    const elapsedOrbitalPeriods = (targetTimeTTJD - parameters.epochTTJD) / parameters.orbitalPeriodDays;
    const degrees = parameters.meanAnomalyDegrees + elapsedOrbitalPeriods * 360;

    // Normalise to [0; 360(.
    return ((degrees % 360) + 360) % 360;
}

/**
 * Computes the mean anomaly of an orbit for a given timestamp.
 *
 * Converts the result to radians, normalised to the range `[0, 2π(`.
 *
 * @param targetTimeTTJD The target time in terrestrial time Julian days.
 * @param parameters The orbital parameters of the object.
 * @returns The mean anomaly in radians.
 */
export function getMeanAnomalyInRadians(
    targetTimeTTJD: number,
    parameters: OrbitalParameters
): number {
    return getMeanAnomalyInDegrees(targetTimeTTJD, parameters) * Math.PI / 180;
}
