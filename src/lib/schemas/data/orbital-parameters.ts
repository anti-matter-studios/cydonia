/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import OrbitalParametersSchema from "./orbital-parameters.schema.json";
import {
    type Angle,
    type Degrees, degreesToRadians,
    type DurationDays,
    type JulianDaysTDB,
    type Radians,
    radiansToDegrees
} from "@/lib/math";
import {
    type AstronomicalUnits,
    astronomicalUnitsToKilometers,
    type Kilometers,
    kilometersToAstronomicalUnits
} from "@/lib/math/distance";


/** Supported time units in the {@link OrbitalParameters} record. */
export type OrbitalParameterTimeUnits = "julian-date-barycentric-dynamical-time-days";
/** Supported distance units in the {@link OrbitalParameters} record. */
export type OrbitalParameterDistanceUnits = "astronomical-units" | "kilometers";
/** Supported angle units in the {@link OrbitalParameters} record. */
export type OrbitalParameterAngleUnits = "degrees" | "radians";

/** Maps a time unit to its corresponding type. */
export type OrbitalParameterTimeUnitType<Time extends OrbitalParameterTimeUnits> =
    Time extends "julian-date-barycentric-dynamical-time-days" ? JulianDaysTDB : never;

/** Maps a distance unit to its corresponding type. */
export type OrbitalParameterDistanceUnitType<Distance extends OrbitalParameterDistanceUnits> =
    Distance extends "astronomical-units" ? AstronomicalUnits :
        Distance extends "kilometers" ? Kilometers : never;

/** Maps an angle unit to its corresponding type. */
export type OrbitalParameterAngleUnitType<Angle extends OrbitalParameterAngleUnits> =
    Angle extends "degrees" ? Degrees :
        Angle extends "radians" ? Radians : never;

/** The units of the {@link OrbitalParameters} record. */
export interface OrbitalParameterUnits<
    Time extends OrbitalParameterTimeUnits,
    Distance extends OrbitalParameterDistanceUnits,
    Angle extends OrbitalParameterAngleUnits,
> {
    /**
     * The unit for all time measurements in this record.
     * For now, we only support Julian Date Barycentric Dynamical Time (JD-TDB).
     */
    time: Time;

    /** The unit used for all distance measurements in this record. */
    distance: Distance;

    /** The unit used for all angle measurements in this record. */
    angle: Angle;
}

/** Inclination, ascending note, and argument of perhilion angles of this record. */
export interface OrbitalParameterAngles<T extends Angle> {
    /** The inclination (i) of the orbit. */
    inclination: T;

    /** The longitude of the ascending node (Ω). */
    longitudeOfAscendingNode: T;

    /** The argument of perihelion (ω). */
    argumentOfPerihelion: T;
}

/**
 * Converts orbital parameter angles from radians to degrees.
 *
 * @param angles The angles to convert.
 * @returns The converted angles.
 */
export function convertRadiansOrbitalParameterAnglesToDegrees(
    angles: OrbitalParameterAngles<Radians>
): OrbitalParameterAngles<Degrees> {
    return {
        inclination: radiansToDegrees(angles.inclination),
        longitudeOfAscendingNode: radiansToDegrees(angles.longitudeOfAscendingNode),
        argumentOfPerihelion: radiansToDegrees(angles.argumentOfPerihelion),
    }
}

/**
 * Converts orbital parameter angles from degrees to radian.
 *
 * @param angles The angles to convert.
 * @returns The converted angles.
 */
export function convertDegreesOrbitalParameterAnglesToRadians(
    angles: OrbitalParameterAngles<Degrees>
): OrbitalParameterAngles<Radians> {
    return {
        inclination: degreesToRadians(angles.inclination),
        longitudeOfAscendingNode: degreesToRadians(angles.longitudeOfAscendingNode),
        argumentOfPerihelion: degreesToRadians(angles.argumentOfPerihelion),
    }
}

/** Orbital parameters, as retrieved from the Jet Propulsion Laboratory Solar System Dynamics database. */
export interface OrbitalParameters<
    Time extends OrbitalParameterTimeUnits = "julian-date-barycentric-dynamical-time-days",
    Distance extends OrbitalParameterDistanceUnits = "astronomical-units",
    Angle extends OrbitalParameterAngleUnits = "degrees"
> {
    /** The units used in this object. */
    units: OrbitalParameterUnits<Time, Distance, Angle>;

    /** The epoch of these parameters. */
    epoch: OrbitalParameterTimeUnitType<Time>;

    /** The mean anomaly of the orbit at the current epoch. */
    meanAnomaly: OrbitalParameterAngleUnitType<Angle>;

    /** The eccentricity (e) of the orbit. */
    eccentricity: number;

    /** The semi-major axis (a) of the orbit. */
    semiMajorAxis: OrbitalParameterDistanceUnitType<Distance>;

    /** The orbital period (P) of the orbit. */
    orbitalPeriod: DurationDays;

    /** Information about the orbit angles. */
    angles: OrbitalParameterAngles<OrbitalParameterAngleUnitType<Angle>>;
}

export { OrbitalParametersSchema };

/**
 * Helper used to convert radians-based orbital parameters to degrees.
 *
 * @param parameters The parameters to convert.
 * @returns The same parameters, but with angles in degrees.
 */
export function convertRadiansOrbitalParametersToDegrees<
    Time extends OrbitalParameterTimeUnits,
    Distance extends OrbitalParameterDistanceUnits
>(
    parameters: OrbitalParameters<Time, Distance, "radians">
): OrbitalParameters<Time, Distance> {
    return {
        units: {
            time: parameters.units.time,
            distance: parameters.units.distance,
            angle: "degrees"
        },
        epoch: parameters.epoch,
        meanAnomaly: radiansToDegrees(parameters.meanAnomaly),
        eccentricity: parameters.eccentricity,
        semiMajorAxis: parameters.semiMajorAxis,
        orbitalPeriod: parameters.orbitalPeriod,
        angles: convertRadiansOrbitalParameterAnglesToDegrees(parameters.angles),
    }
}

/**
 * Helper used to convert degrees-based orbital parameters to degrees.
 *
 * @param parameters The parameters to convert.
 * @returns The same parameters, but with angles in degrees.
 */
export function convertDegreesOrbitalParametersToRadians<
    Time extends OrbitalParameterTimeUnits,
    Distance extends OrbitalParameterDistanceUnits
>(
    parameters: OrbitalParameters<Time, Distance>
): OrbitalParameters<Time, Distance, "radians"> {
    return {
        units: {
            time: parameters.units.time,
            distance: parameters.units.distance,
            angle: "radians"
        },
        epoch: parameters.epoch,
        meanAnomaly: degreesToRadians(parameters.meanAnomaly),
        eccentricity: parameters.eccentricity,
        semiMajorAxis: parameters.semiMajorAxis,
        orbitalPeriod: parameters.orbitalPeriod,
        angles: convertDegreesOrbitalParameterAnglesToRadians(parameters.angles),
    }
}

/**
 * Helper used to convert kilometer-based orbital parameters to astronomical units.
 *
 * @param parameters The parameters to convert.
 * @returns The same parameters, but with distances in astronomical units.
 */
export function convertKilometersOrbitalParametersToAstronomicalUnits<
    Time extends OrbitalParameterTimeUnits,
    Angle extends OrbitalParameterAngleUnits
>(
    parameters: OrbitalParameters<Time, "kilometers", Angle>
): OrbitalParameters<Time, "astronomical-units", Angle> {
    return {
        units: {
            time: parameters.units.time,
            distance: "astronomical-units",
            angle: parameters.units.angle,
        },
        epoch: parameters.epoch,
        meanAnomaly: parameters.meanAnomaly,
        eccentricity: parameters.eccentricity,
        semiMajorAxis: kilometersToAstronomicalUnits(parameters.semiMajorAxis),
        orbitalPeriod: parameters.orbitalPeriod,
        angles: parameters.angles,
    }
}

/**
 * Helper used to convert astronomical-units-based orbital parameters kilometers.
 *
 * @param parameters The parameters to convert.
 * @returns The same parameters, but with distances in kilometers.
 */
export function convertAstronomicalUnitsOrbitalParametersToKilometers<
    Time extends OrbitalParameterTimeUnits,
    Angle extends OrbitalParameterAngleUnits
>(
    parameters: OrbitalParameters<Time, "astronomical-units", Angle>
): OrbitalParameters<Time, "kilometers", Angle> {
    return {
        units: {
            time: parameters.units.time,
            distance: "kilometers",
            angle: parameters.units.angle,
        },
        epoch: parameters.epoch,
        meanAnomaly: parameters.meanAnomaly,
        eccentricity: parameters.eccentricity,
        semiMajorAxis: astronomicalUnitsToKilometers(parameters.semiMajorAxis),
        orbitalPeriod: parameters.orbitalPeriod,
        angles: parameters.angles,
    }
}
