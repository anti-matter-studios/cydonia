/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

/** Number of milliseconds in a single day (24 * 60 * 60 * 1000). */
const MILLISECONDS_IN_A_DAY = 86400000;

/** The julian date of the Unix epoch, used in JD conversion calculation. */
const UNIX_EPOCH_JULIAN_DATE = 2440587.5;

/** The UTC-TAI offset in milliseconds, as of June 30th, 2026. */
const UTC_TAI_OFFSET_MILLISECONDS = 37_000;

/** The TAI-TT offset, in milliseconds. */
const TAI_TT_OFFSET_MILLISECONDS = 32_184;

/**
 * Converts a given date to its Julian Date (JD) equivalent.
 *
 * The resulting conversion is made in UTC.
 * For terrestrial time, see {@link unixTimestampToJulianDateTT}.
 *
 * @param millisecondsSinceEpoch The number of milliseconds since the Unix epoch.
 * @returns The Julian Date equivalent of the given date.
 */
export function unixTimestampToJulianDateUTC(millisecondsSinceEpoch: number): number {
    return millisecondsSinceEpoch / MILLISECONDS_IN_A_DAY + UNIX_EPOCH_JULIAN_DATE;
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
export function julianDateUTCToUnixTimestamp(julianDate: number): number {
    return (julianDate - UNIX_EPOCH_JULIAN_DATE) * MILLISECONDS_IN_A_DAY;
}

/**
 * Converts a given date to its Julian Date (JD) equivalent.
 *
 * The resulting conversion is made in terrestrial time (TT).
 * This is done, because TT is the time standard used by the Minor Planet Center for its orbital epoch.
 * For UTC, see {@link unixTimestampToJulianDateUTC}.
 *
 * @param millisecondsSinceEpoch
 * @returns
 * @see https://aa.usno.navy.mil/faq/TT#:~:text=Terrestrial%20Time%20(TT)%20is%20a,by%20an%20observer%20on%20Earth.
 */
export function unixTimestampToJulianDateTT(millisecondsSinceEpoch: number): number {
    return unixTimestampToJulianDateUTC(millisecondsSinceEpoch + UTC_TAI_OFFSET_MILLISECONDS + TAI_TT_OFFSET_MILLISECONDS);
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
export function julianDateTTToUnixTimestamp(julianDate: number): number {
    return julianDateUTCToUnixTimestamp(julianDate) - UTC_TAI_OFFSET_MILLISECONDS - TAI_TT_OFFSET_MILLISECONDS;
}
