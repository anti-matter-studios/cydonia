/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { asDegreesWrapped, asRadiansWrapped, degreesToRadians, radiansToDegrees } from "@/lib/math/angle";
import { expect, it } from "vitest";


it("should handle radians", function() {
    expect(asRadiansWrapped(0)).toBe(0);
    expect(asRadiansWrapped(Math.PI)).toBe(-Math.PI);
    expect(asRadiansWrapped(2 * Math.PI)).toBe(0);
    expect(asRadiansWrapped(3 * Math.PI)).toBe(-Math.PI);
    expect(asRadiansWrapped(Math.PI - 0.1)).toBeCloseTo(Math.PI - 0.1);
});

it("should handle degrees", function() {
    expect(asDegreesWrapped(0)).toBe(0);
    expect(asDegreesWrapped(180)).toBe(180);
    expect(asDegreesWrapped(360)).toBe(0);
    expect(asDegreesWrapped(-270)).toBe(90);
    expect(asDegreesWrapped(-180)).toBe(180);
});

it("should convert to degrees", function() {
    expect(radiansToDegrees(asRadiansWrapped(Math.PI))).toBe(180);
    expect(radiansToDegrees(asRadiansWrapped(-Math.PI))).toBe(180);
    expect(radiansToDegrees(asRadiansWrapped(0))).toBe(0);
    expect(radiansToDegrees(asRadiansWrapped(.5 * Math.PI))).toBe(90);
    expect(radiansToDegrees(asRadiansWrapped(-.5 * Math.PI))).toBe(270);
});

it("should convert to radians", function() {
    expect(degreesToRadians(asDegreesWrapped(180))).toBe(-Math.PI);
    expect(degreesToRadians(asDegreesWrapped(0))).toBe(0);
    expect(degreesToRadians(asDegreesWrapped(90))).toBe(.5 * Math.PI);
    expect(degreesToRadians(asDegreesWrapped(270))).toBe(-.5 * Math.PI);
});