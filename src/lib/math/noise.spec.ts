/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { expect, it } from "vitest";

import { fade, grad, lerp } from "@/lib/math/noise";


it("should smooth values with the Perlin fade curve", function() {
    expect(fade(0)).toBe(0);
    expect(fade(0.25)).toBeCloseTo(0.103515625);
    expect(fade(0.5)).toBe(0.5);
    expect(fade(0.75)).toBeCloseTo(0.896484375);
    expect(fade(1)).toBe(1);
});

it("should linearly interpolate between two values", function() {
    expect(lerp(0, 10, 30)).toBe(10);
    expect(lerp(0.25, 10, 30)).toBe(15);
    expect(lerp(0.5, 10, 30)).toBe(20);
    expect(lerp(1, 10, 30)).toBe(30);
});

it("should allow linear extrapolation", function() {
    expect(lerp(-0.5, 10, 30)).toBe(0);
    expect(lerp(1.5, 10, 30)).toBe(40);
});

it("should select Perlin gradient dot products from the hash", function() {
    expect(grad(0, 2, 3, 5)).toBe(5);
    expect(grad(1, 2, 3, 5)).toBe(1);
    expect(grad(2, 2, 3, 5)).toBe(-1);
    expect(grad(3, 2, 3, 5)).toBe(-5);
    expect(grad(4, 2, 3, 5)).toBe(7);
    expect(grad(8, 2, 3, 5)).toBe(8);
    expect(grad(12, 2, 3, 5)).toBe(5);
    expect(grad(15, 2, 3, 5)).toBe(-8);
});

it("should mask gradient hashes to four bits", function() {
    expect(grad(16, 2, 3, 5)).toBe(grad(0, 2, 3, 5));
    expect(grad(31, 2, 3, 5)).toBe(grad(15, 2, 3, 5));
});
