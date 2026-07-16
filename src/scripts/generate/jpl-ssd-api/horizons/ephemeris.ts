/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import type { Degrees, DurationDays, JulianDaysTDB } from "@/lib/math";
import type { AstronomicalUnits } from "@/lib/math/distance";
import type { OrbitalParameters } from "@/lib/schemas";

/** Ephemeris that was parsed from the Horizons API. */
export interface HorizonsApiEphemeris {
    /** The epoch date of the ephemeris, as a TDB Julian Date. */
    readonly JD: JulianDaysTDB;

    /** The date of the epoch, formatted as a TDB date string. */
    readonly TDB: string;

    /** The eccentricity of the orbit. */
    readonly EC: number;

    /** The distance to the focus of the orbit at periapsis. */
    readonly QR: AstronomicalUnits;

    /** The inclination of the orbit. */
    readonly IN: Degrees;

    /** The longitude of the ascending node. */
    readonly OM: Degrees;

    /** The argument of periapsis of the orbit. */
    readonly W: Degrees;

    /** The time of the last periapsis passage. */
    readonly Tp: JulianDaysTDB;

    /** The mean motion of the orbit at the current epoch. */
    readonly N: Degrees;

    /** The mean anomaly of the orbit at the current epoch. */
    readonly MA: Degrees;

    /** The true anomaly of the orbit at the current epoch. */
    readonly TA: Degrees;

    /** The semi-major axis of the orbit. */
    readonly A: AstronomicalUnits;

    /** The distance to the focus of the orbit at apoapsis. */
    readonly AD: AstronomicalUnits;

    /** The period of the orbit, in days. */
    readonly PR: DurationDays;
}

/**
 * Converts a Horizons API ephemeris to orbital parameters.
 *
 * @param ephemeris The Horizons API ephemeris.
 * @returns The converted orbital parameters.
 */
export function ephemerisToOrbitalParameters(ephemeris: HorizonsApiEphemeris): OrbitalParameters {
    return {
        units: {
            time: "julian-date-barycentric-dynamical-time-days",
            distance: "astronomical-units",
            angle: "degrees",
        },
        epoch: ephemeris.JD,
        eccentricity: ephemeris.EC,
        meanAnomaly: ephemeris.MA,
        orbitalPeriod: ephemeris.PR,
        semiMajorAxis: ephemeris.A,
        angles: {
            inclination: ephemeris.IN,
            longitudeOfAscendingNode: ephemeris.OM,
            argumentOfPeriapsis: ephemeris.W,
        }
    };
}
