/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { Quaternion, Vector3 } from "three";

import {
    convertDegreesOrbitalParameterAnglesToRadians,
    type OrbitalParameterAngles,
    type OrbitalParameters
} from "@/lib/schemas";
import { degreesToRadians, type JulianDaysTDB, type Radians } from "@/lib/math";
import { getEccentricAnomaly } from "./eccentric-anomaly";
import { getMeanAnomaly } from "./mean-anomaly";


/**
 * Gets the position of a body in its orbit for the given eccentric anomaly.
 *
 * The returned vector is in the same distance unit as the parameters.
 *
 * @param eccentricAnomaly The eccentric anomaly of the body.
 * @param parameters The parameters of the orbit.
 * @returns The position of the body in the perifocal frame.
 */
export function getBodyPerifocalCoordinatesFromEccentricAnomaly(
    eccentricAnomaly: Radians,
    parameters: OrbitalParameters
): Vector3 {
    return new Vector3(
        parameters.semiMajorAxis * (Math.cos(eccentricAnomaly) - parameters.eccentricity),
        parameters.semiMajorAxis * Math.sqrt(1 - parameters.eccentricity ** 2) * Math.sin(eccentricAnomaly),
        0
    );
}

/**
 * Gets the position of a body in its orbit for a given time.
 *
 * The returned vector is in the same distance unit as the parameters.
 *
 * @param time The time in Barycentric Dynamical Time (TDB).
 * @param parameters The parameters of the orbit.
 * @returns The position vector of the body in its orbit at the given time, in Astronomical Units (AU).
 */
export function getBodyPerifocalCoordinatesAtTime(
    time: JulianDaysTDB,
    parameters: OrbitalParameters
): Vector3 {
    const meanAnomaly = getMeanAnomaly(
        time,
        parameters.epoch,
        parameters.orbitalPeriod,
        degreesToRadians(parameters.meanAnomaly)
    );

    return getBodyPerifocalCoordinatesFromEccentricAnomaly(
        getEccentricAnomaly(
            meanAnomaly,
            parameters.eccentricity
        ),
        parameters
    );
}

/**
 * Builds a quaternion that transforms coordinates from the perifocal frame to the world frame.
 *
 * @param angles The angles used in the conversion.
 * @returns The quaternion that transforms coordinates from the perifocal frame to the world frame.
 */
export function getOrbitPerifocalToWorldQuaternion(
    angles: OrbitalParameterAngles<Radians>
): Quaternion {
    const longitudeOfAscendingNodeQuaternion = new Quaternion();
    longitudeOfAscendingNodeQuaternion.setFromAxisAngle(
        new Vector3(0, 0, 1),
        angles.longitudeOfAscendingNode
    );

    const inclinationQuaternion = new Quaternion();
    inclinationQuaternion.setFromAxisAngle(
        new Vector3(1, 0, 0),
        angles.inclination
    );

    const argumentOfPeriapsisQuaternion = new Quaternion();
    argumentOfPeriapsisQuaternion.setFromAxisAngle(
        new Vector3(0, 0, 1),
        angles.argumentOfPeriapsis
    );

    return longitudeOfAscendingNodeQuaternion
        .multiply(inclinationQuaternion)
        .multiply(argumentOfPeriapsisQuaternion);
}

/**
 * Gets the position of a body in its orbit in the world reference frame.
 *
 * This assumes that the sun (or the central body) is at the origin of the reference frame.
 * The returned vector is in the same distance unit as the parameters.
 *
 * @param eccentricAnomaly The eccentric anomaly of the body.
 * @param parameters The parameters of the orbit.
 * @param perifocalFrameQuaternion The quaternion that transforms from the perifocal frame to the world frame.
 * If not provided, it is automatically calculated with {@link getOrbitPerifocalToWorldQuaternion}.
 * @returns The position of the body in the perifocal frame.
 */
export function getBodyWorldCoordinatesFromEccentricAnomaly(
    eccentricAnomaly: Radians,
    parameters: OrbitalParameters,
    perifocalFrameQuaternion = getOrbitPerifocalToWorldQuaternion(
        convertDegreesOrbitalParameterAnglesToRadians(parameters.angles)
    )
): Vector3 {
    return getBodyPerifocalCoordinatesFromEccentricAnomaly(eccentricAnomaly, parameters).applyQuaternion(
        perifocalFrameQuaternion
    );
}

/**
 * Gets the position of a body in its orbit in the world reference frame.
 *
 * This assumes that the sun (or the central body) is at the origin of the reference frame.
 * The returned vector is in the same distance unit as the parameters.
 *
 * @param time The time at which to get the position of the body.
 * @param parameters The parameters of the orbit.
 * @param perifocalFrameQuaternion The quaternion that transforms from the perifocal frame to the world frame.
 * If not provided, it is automatically calculated with {@link getOrbitPerifocalToWorldQuaternion}.
 * @returns The position of the body in the perifocal frame.
 */
export function getBodyWorldCoordinatesAtTime(
    time: JulianDaysTDB,
    parameters: OrbitalParameters,
    perifocalFrameQuaternion = getOrbitPerifocalToWorldQuaternion(
        convertDegreesOrbitalParameterAnglesToRadians(parameters.angles)
    )
): Vector3 {
    return getBodyPerifocalCoordinatesAtTime(time, parameters).applyQuaternion(perifocalFrameQuaternion);
}
