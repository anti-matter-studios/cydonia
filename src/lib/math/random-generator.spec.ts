/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { expect, it } from "vitest";

import { createRandomGenerator } from "@/lib/math/random-generator";


it("should create a callable SFC32 random generator", function() {
    const random = createRandomGenerator(1106);
    const sample = random();

    expect(typeof random).toBe("function");
    expect(random.algorithm).toBe("sfc32");
    expect(random.seed).toBe(1106);
    expect(sample).toBeGreaterThanOrEqual(0);
    expect(sample).toBeLessThan(1);
});

it("should expose next as the callable sampling interface", function() {
    const callable = createRandomGenerator(1106);
    const method = createRandomGenerator(1106);

    expect(callable()).toBe(method.next());
});

it("should create deterministic sequences for a custom seed", function() {
    const first = createRandomGenerator("cydonia");
    const second = createRandomGenerator("cydonia");

    const firstSamples = Array.from({ length: 5 }, function() {
        return first();
    });
    const secondSamples = Array.from({ length: 5 }, function() {
        return second();
    });

    expect(firstSamples).toEqual(secondSamples);
});

it("should vary sequences between seeds", function() {
    const first = createRandomGenerator(1106);
    const second = createRandomGenerator(42);

    expect(first()).not.toBe(second());
});

it("should generate the expected SFC32 unsigned integer sequence", function() {
    const random = createRandomGenerator(1106);
    const samples = Array.from({ length: 5 }, function() {
        return random.nextUint32();
    });

    expect(samples).toEqual([
        3538942139,
        2421723711,
        960221356,
        1539053668,
        417354955
    ]);
});

it("should reject non-finite numeric seeds", function() {
    expect(function() {
        createRandomGenerator(Number.NaN);
    }).toThrow(RangeError);
});
