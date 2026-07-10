/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { expect, it } from "vitest";

import {
    createSimplexNoiseSampler,
    sampleLayeredSimplexNoise
} from "@/lib/math/simplex-noise";


it("should create deterministic seeded Simplex samples", function() {
    const first = createSimplexNoiseSampler(1106);
    const second = createSimplexNoiseSampler(1106);

    expect(first.algorithm).toBe("simplex");
    expect(first.seed).toBe(1106);
    expect(first(0.25, 1.5, -0.75)).toBe(second(0.25, 1.5, -0.75));
});

it("should vary Simplex samples between seeds", function() {
    const first = createSimplexNoiseSampler(1106);
    const second = createSimplexNoiseSampler(42);

    expect(first(0.25, 1.5, -0.75)).not.toBe(second(0.25, 1.5, -0.75));
});

it("should return known Simplex sample values", function() {
    const noise = createSimplexNoiseSampler(1106);

    expect(noise(0, 0, 0)).toBe(0);
    expect(noise(0.25, 1.5, -0.75)).toBeCloseTo(-0.06273784722222218, 12);
    expect(noise(1.25, -0.5, 2.75)).toBeCloseTo(0.054910442386831015, 12);
    expect(noise(-3.125, 0.875, 4.5)).toBeCloseTo(0.09613834635416661, 12);
});

it("should return known Simplex sample values for string seeds", function() {
    const noise = createSimplexNoiseSampler("cydonia");

    expect(noise(0.125, -0.25, 0.5)).toBeCloseTo(-0.03331575978596976, 12);
    expect(noise(2.5, -1.25, 0.75)).toBeCloseTo(0.001290226337448558, 12);
});

it("should normalise layered Simplex samples", function() {
    const noise = createSimplexNoiseSampler(1106);
    const sample = noise.layered(0.25, 1.5, -0.75, {
        octaves: 5,
        scale: 1
    });

    expect(sample).toBeGreaterThanOrEqual(-1);
    expect(sample).toBeLessThanOrEqual(1);
});

it("should return the known layered Simplex sample value", function() {
    const noise = createSimplexNoiseSampler(1106);

    expect(noise.layered(0.3, -0.2, 0.7, {
        lacunarity: 2,
        octaves: 4,
        persistence: 0.5,
        scale: 1.4
    })).toBeCloseTo(-0.0470745160715591, 12);
});

it("should scale layered Simplex samples by the initial amplitude", function() {
    const noise = createSimplexNoiseSampler(1106);
    const options = {
        lacunarity: 2,
        octaves: 4,
        persistence: 0.5,
        scale: 1.4
    };
    const sample = noise.layered(0.3, -0.2, 0.7, options);

    expect(noise.layered(0.3, -0.2, 0.7, {
        ...options,
        initialAmplitude: 0.25
    })).toBeCloseTo(sample * 0.25, 12);
});

it("should apply layered Simplex offsets after frequency scaling", function() {
    const noise = function(x: number, y: number, z: number): number {
        return x + y + z;
    };

    expect(sampleLayeredSimplexNoise(noise, 1, 2, 3, {
        offset: [10, 20, 30],
        scale: 2
    })).toBe(72);
});

it("should keep the standalone layered Simplex helper compatible", function() {
    const noise = createSimplexNoiseSampler(1106);
    const options = {
        lacunarity: 2,
        octaves: 4,
        persistence: 0.5,
        scale: 1.4
    };

    expect(sampleLayeredSimplexNoise(noise, 0.3, -0.2, 0.7, options))
        .toBe(noise.layered(0.3, -0.2, 0.7, options));
});
