/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { OrbitalParameters } from "./orbital-parameters";


/** The maximum number of steps of the Newton-Rhapson method. */
const MAX_SOLVER_STEPS = 25;

/**
 * Solves the eccentric anomaly of a given orbit numerically.
 *
 * Uses the Newton-Raphson method to find a root of `f(E) = E - e sin(E) - M`.
 * If the solution does not converge, returns NaN.
 *
 * @param meanAnomalyRadians The mean anomaly to derive from.
 * @param parameters The orbital parameters of the orbit.
 * @param precision The expected precision of the result.
 * @returns The eccentric anomaly of the orbit.
 */
export function getEccentricAnomalyInRadians(
    meanAnomalyRadians: number,
    parameters: OrbitalParameters,
    precision = 1e-6
): number {
    let value = meanAnomalyRadians;
    for (let i = 0; i < MAX_SOLVER_STEPS; i++) {
        const error = kepler(value, meanAnomalyRadians, parameters.eccentricity);
        const slope = keplerDerivative(value, parameters.eccentricity);
        value -= error / slope;

        if (Math.abs(error) < precision) {
            return value;
        }
    }

    return NaN;
}

/**
 * Modified Kepler function.
 *
 * Build from Kepler's equation: `M = E - e sin(E)`, but rearranged to solve for `E`.
 * This, in practice, is the equation: `f(E) = E - e sin(E) - M`.
 *
 * @param value The current value of `E`, the eccentric anomaly.
 * @param meanAnomaly The mean anomaly to derive from.
 * @param eccentricity The eccentricity of the orbit.
 * @returns The result of Kepler's equation for the given value.
 */
function kepler(value: number, meanAnomaly: number, eccentricity: number): number {
    return value - eccentricity * Math.sin(value) - meanAnomaly;
}

/**
 * Derivative of {@link kepler}.
 *
 * This, in practice, is the equation: `f'(E) = 1 - e cos(E)`.
 * Used to compute the slope of the tangent line for Newton-Raphson's method.
 *
 * @param value The current value of `E`, the eccentric anomaly.
 * @param eccentricity The eccentricity of the orbit.
 * @returns The derivative of Kepler's equation for the given value.
 */
function keplerDerivative(value: number, eccentricity: number): number {
    return 1 - eccentricity * Math.cos(value);
}

