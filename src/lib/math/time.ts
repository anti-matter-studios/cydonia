/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { brand, type Brand } from "@/lib/utils";
import { asDegreesWrapped, degreesToRadians } from "@/lib/math/angle";


/** Duration in earth days. */
export type DurationDays = Brand<number, "earth-days">;

/** Number of days since the Julian epoch in Universal Coordinated Time. */
export type JulianDaysUTC = Brand<number, "jd-utc">;

/** Number of days since the Julian epoch in Terrestrial Time. */
export type JulianDaysTT = Brand<number, "jd-tt">;

/** Number of days since the Julian epoch in Barycentric Dynamical Time. */
export type JulianDaysTDB = Brand<number, "jd-tdb">;

/** @see JulianDaysUTC */
export type JulianDays = JulianDaysUTC;

/** Number of seconds since the unix epoch. */
export type UnixTimestampUTC = Brand<number, "unix-timestamp-utc">;

/** @see UnixTimestampUTC */
export type UnixTimestamp = UnixTimestampUTC;

/** Number of milliseconds in a single day (24 * 60 * 60 * 1000). */
const MILLISECONDS_IN_A_DAY = 86400000;

/** Number of seconds in a single day (24 * 60 * 60). */
const SECONDS_IN_A_DAY = 86400;

/** The julian date of the Unix epoch, used in JD conversion calculation. */
const UNIX_EPOCH_JULIAN_DATE = 2440587.5;

/** The Julian Date of the J2000.0 epoch. */
const J2000_JULIAN_DATE = 2451545.0;

/** The UTC-TAI offset in milliseconds, as of June 30th, 2026. */
const UTC_TAI_OFFSET_MILLISECONDS = 37_000;

/** The TAI-TT offset, in milliseconds. */
const TAI_TT_OFFSET_MILLISECONDS = 32_184;

/**
 * Estimates the periodic TDB-TT correction for a given Julian Date in Terrestrial Time.
 *
 * This short-period approximation keeps the dominant annual term and its second harmonic.
 * Its precision is good enough for keeping Horizons JD-TDB elements
 * and locally derived TT dates in the same timescale for rendering/orbital phase work.
 * Based off the equation offered by
 * [the ESA](https://gssc.esa.int/navipedia/index.php/Transformations_between_Time_Systems)
 *
 * @param julianDate The Julian Date in Terrestrial Time.
 * @returns The estimated TDB-TT offset, in seconds.
 */
export function getTDBMinusTTOffsetSeconds(julianDate: JulianDaysTT): JulianDaysTDB {
    const daysSinceJ2000 = julianDate - J2000_JULIAN_DATE;
    const meanAnomaly = degreesToRadians(asDegreesWrapped(357.53 + 0.9856003 * daysSinceJ2000));
    return brand(0.001657 * Math.sin(meanAnomaly) + 0.00001385 * Math.sin(2 * meanAnomaly));
}

/**
 * Converts a given date to its Julian Date (JD) equivalent.
 *
 * The resulting conversion is made in UTC.
 * For terrestrial time, see {@link unixTimestampToJulianDateTT}; for barycentric
 * dynamical time, see {@link unixTimestampToJulianDateTDB}.
 *
 * @param timestamp The number of milliseconds since the Unix epoch.
 * @returns The Julian Date equivalent of the given date.
 */
export function unixTimestampToJulianDateUTC(timestamp: UnixTimestampUTC): JulianDaysUTC {
    return brand(timestamp / MILLISECONDS_IN_A_DAY + UNIX_EPOCH_JULIAN_DATE);
}

/**
 * Converts a given Julian Date (JD) equivalent to its Unix timestamp.
 *
 * The conversion assumes that the given Julian Date is in UTC.
 * For terrestrial time, see {@link julianDateTTToUnixTimestamp}.
 *
 * @param julianDate The Julian Date equivalent of the given date.
 * @returns The Unix timestamp equivalent of the given Julian Date.
 */
export function julianDateUTCToUnixTimestamp(julianDate: JulianDaysUTC): UnixTimestampUTC {
    return brand((julianDate - UNIX_EPOCH_JULIAN_DATE) * MILLISECONDS_IN_A_DAY);
}

/**
 * Converts a given date to its Julian Date (JD) equivalent.
 *
 * The resulting conversion is made in terrestrial time (TT).
 * This is done as an intermediate step to convert to Barycentric Dynamical Time (JD-TDB).
 * For UTC, see {@link unixTimestampToJulianDateUTC}.
 *
 * @param timestamp The Unix timestamp equivalent of the given date.
 * @returns The Julian Date equivalent of the given date.
 * @see https://aa.usno.navy.mil/faq/TT#:~:text=Terrestrial%20Time%20(TT)%20is%20a,by%20an%20observer%20on%20Earth.
 */
export function unixTimestampToJulianDateTT(timestamp: UnixTimestampUTC): JulianDaysTT {
    return brand(
        unixTimestampToJulianDateUTC(
            brand(timestamp + UTC_TAI_OFFSET_MILLISECONDS + TAI_TT_OFFSET_MILLISECONDS)
        )
    );
}

/**
 * Converts a Terrestrial Time Julian Date (JD-TT) to Barycentric Dynamical Time (JD-TDB).
 *
 * JPL Horizons element tables use TDB. The TT/TDB delta is periodic and small, but applying
 * it avoids mixing time scales when comparing a local wall-clock-derived Julian Date with
 * Horizons orbital elements.
 *
 * @param julianDate The Julian Date in Terrestrial Time.
 * @returns The Julian Date in Barycentric Dynamical Time.
 */
export function julianDateTTToJulianDateTDB(julianDate: JulianDaysTT): JulianDaysTDB {
    return brand(julianDate + getTDBMinusTTOffsetSeconds(julianDate) / SECONDS_IN_A_DAY);
}

/**
 * Converts a given Unix timestamp to its Julian Date (JD) equivalent in Barycentric
 * Dynamical Time (TDB).
 *
 * @param timestamp The number of milliseconds since the Unix epoch.
 * @returns The Julian Date equivalent of the given date, in TDB.
 */
export function unixTimestampToJulianDateTDB(timestamp: UnixTimestampUTC): JulianDaysTDB {
    return julianDateTTToJulianDateTDB(unixTimestampToJulianDateTT(timestamp));
}

/**
 * Converts a Barycentric Dynamical Time Julian Date (JD-TDB) to Terrestrial Time (JD-TT).
 *
 * @param julianDate The Julian Date in Barycentric Dynamical Time.
 * @returns The Julian Date in Terrestrial Time.
 */
export function julianDateTDBToJulianDateTT(julianDate: JulianDaysTDB): JulianDaysTT {
    let julianDateTT = julianDate;
    for (let iteration = 0; iteration < 2; iteration++) {
        julianDateTT = brand(julianDate - getTDBMinusTTOffsetSeconds(brand(julianDateTT)) / SECONDS_IN_A_DAY);
    }

    return brand(julianDateTT);
}

/**
 * Converts a given Julian Date (JD) equivalent to its Unix timestamp.
 *
 * The conversion assumes that the given Julian Date is in Terrestrial Time.
 * For UTC, see {@link julianDateUTCToUnixTimestamp}.
 *
 * @param julianDate The Julian Date equivalent of the given date.
 * @returns The Unix timestamp equivalent of the given Julian Date.
 */
export function julianDateTTToUnixTimestamp(julianDate: JulianDaysTT): UnixTimestampUTC {
    return brand(julianDateUTCToUnixTimestamp(brand(julianDate)) - UTC_TAI_OFFSET_MILLISECONDS - TAI_TT_OFFSET_MILLISECONDS);
}

/**
 * Converts a given Julian Date (JD) equivalent to its Unix timestamp.
 *
 * The conversion assumes that the given Julian Date is in Barycentric Dynamical Time.
 * For UTC, see {@link julianDateUTCToUnixTimestamp}.
 *
 * @param julianDate The Julian Date equivalent of the given date.
 * @returns The Unix timestamp equivalent of the given Julian Date.
 */
export function julianDateTDBToUnixTimestamp(julianDate: JulianDaysTDB): UnixTimestampUTC {
    return julianDateTTToUnixTimestamp(julianDateTDBToJulianDateTT(julianDate));
}
