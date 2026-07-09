/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { expect, it } from "vitest";
import {
    asAstronomicalUnits,
    asKilometers,
    astronomicalUnitsToKilometers,
    kilometersToAstronomicalUnits
} from "@/lib/math/distance";


it("should convert kilometers to AU", function() {
    expect(kilometersToAstronomicalUnits(asKilometers(1))).toBeCloseTo(6.684587e-9);
    expect(kilometersToAstronomicalUnits(asKilometers(1.495979e+8))).toBeCloseTo(1);
});

it("should convert AU to kilometers", function() {
    expect(astronomicalUnitsToKilometers(asAstronomicalUnits(6.684587e-9))).toBeCloseTo(1);
    expect(astronomicalUnitsToKilometers(asAstronomicalUnits(1))).toBeCloseTo(1.495979e+8);
});