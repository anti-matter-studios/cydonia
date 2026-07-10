/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { expect, it } from "vitest";
import {
    getTDBMinusTTOffsetSeconds,
    julianDateTDBToUnixTimestamp,
    julianDateTDBToJulianDateTT,
    julianDateTTToJulianDateTDB,
    julianDateTTToUnixTimestamp,
    julianDateUTCToUnixTimestamp,
    unixTimestampToJulianDateTDB,
    unixTimestampToJulianDateTT,
    unixTimestampToJulianDateUTC
} from "./time";
import { brand } from "@/lib/utils";


it("converts the Unix epoch to UTC Julian Date", () => {
    expect(unixTimestampToJulianDateUTC(brand(0))).toBe(2440587.5);
});

it("round-trips UTC Julian Dates and Unix timestamps", () => {
    const timestamp = Date.UTC(2026, 6, 6, 12);

    expect(julianDateUTCToUnixTimestamp(unixTimestampToJulianDateUTC(brand(timestamp)))).toBeCloseTo(timestamp, 0);
});

it("converts Unix timestamps to TT Julian Dates", () => {
    expect(unixTimestampToJulianDateTT(brand(0))).toBeCloseTo(2440587.500800741, 9);
});

it("round-trips TT Julian Dates and Unix timestamps", () => {
    const timestamp = Date.UTC(2026, 6, 6, 12);

    expect(julianDateTTToUnixTimestamp(unixTimestampToJulianDateTT(brand(timestamp)))).toBeCloseTo(timestamp, 0);
});

it("estimates the expected TDB-TT offset at J2000", () => {
    expect(getTDBMinusTTOffsetSeconds(brand(2451545.0))).toBeCloseTo(-0.000072603195, 12);
});

it("converts TT Julian Dates to TDB Julian Dates", () => {
    expect(julianDateTTToJulianDateTDB(brand(2451626.0))).toBeCloseTo(2451626.0000000186, 13);
});

it("converts TDB Julian Dates back to TT Julian Dates", () => {
    const julianDateTT = 2451626.0;
    const julianDateTDB = julianDateTTToJulianDateTDB(brand(julianDateTT));

    expect(julianDateTDBToJulianDateTT(julianDateTDB)).toBeCloseTo(julianDateTT, 13);
});

it("converts Unix timestamps directly to TDB Julian Dates", () => {
    const timestamp = Date.UTC(2026, 6, 6, 12);

    expect(unixTimestampToJulianDateTDB(brand(timestamp)))
        .toBeCloseTo(julianDateTTToJulianDateTDB(unixTimestampToJulianDateTT(brand(timestamp))), 13);
});

it("round-trips TDB Julian Dates and Unix timestamps", () => {
    const timestamp = Date.UTC(2026, 6, 6, 12);

    expect(julianDateTDBToUnixTimestamp(unixTimestampToJulianDateTDB(brand(timestamp)))).toBeCloseTo(timestamp, 0);
});
