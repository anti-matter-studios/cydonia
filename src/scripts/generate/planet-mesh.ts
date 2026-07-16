/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { asDegrees, hslToHex, type RandomGenerator } from "@/lib/math";
import type { PlanetMesh, PlanetRotation } from "@/lib/schemas";


type NumericRange = readonly [minimum: number, maximum: number];

const RADIUS_RANGE: NumericRange = [0.075, 0.14];
const HEIGHT_AMPLITUDE_RANGE: NumericRange = [0.16, 0.36];
const HEIGHT_SCALE_RANGE: NumericRange = [0.38, 0.78];
const HEIGHT_OCTAVE_RANGE: NumericRange = [10, 16];
const HEIGHT_PERSISTENCE_RANGE: NumericRange = [0.45, 0.58];
const HEIGHT_LACUNARITY_RANGE: NumericRange = [1.9, 2.35];
const TILT_RANGE: NumericRange = [0, 35];
const ROTATION_RATE_RANGE: NumericRange = [0.8, 3.6];
const SHADE_STEP_RANGE: NumericRange = [4, 7];
const SPECULAR_PROBABILITY = 0.38;

/** Renderer data generated for a new minor planet. */
export interface GeneratedPlanetAppearance {
    /** Terrain and material options used by the renderer. */
    readonly mesh: PlanetMesh;

    /** Rotation options used by the simulation. */
    readonly rotation: PlanetRotation;
}

interface RockPalette {
    readonly dark: string;
    readonly light: string;
    readonly specular?: string;
    readonly specularThreshold?: number;
}

/** Creates deterministic renderer-facing terrain, material, and rotation parameters. */
export function createMinorPlanetAppearance(generator: RandomGenerator): GeneratedPlanetAppearance {
    return {
        mesh: createMinorPlanetMesh(generator, createRockPalette(generator)),
        rotation: createMinorPlanetRotation(generator)
    };
}

function createMinorPlanetMesh(generator: RandomGenerator, palette: RockPalette): PlanetMesh {
    return {
        radius: round(sampleRange(generator, RADIUS_RANGE), 3),
        subdivisions: 4,
        seed: sampleIntegerRange(generator, [0, 0xffff_ffff]),
        "shade-steps": sampleIntegerRange(generator, SHADE_STEP_RANGE),
        "gradient-light": palette.light,
        "gradient-dark": palette.dark,
        ...(typeof palette.specular === "undefined" ? {} : {
            "specular-light": palette.specular,
            "specular-threshold": palette.specularThreshold
        }),
        height: {
            initialAmplitude: round(sampleRange(generator, HEIGHT_AMPLITUDE_RANGE), 2),
            scale: round(sampleRange(generator, HEIGHT_SCALE_RANGE), 2),
            octaves: sampleIntegerRange(generator, HEIGHT_OCTAVE_RANGE),
            persistence: round(sampleRange(generator, HEIGHT_PERSISTENCE_RANGE), 2),
            lacunarity: round(sampleRange(generator, HEIGHT_LACUNARITY_RANGE), 2)
        }
    };
}

function createMinorPlanetRotation(generator: RandomGenerator): PlanetRotation {
    return {
        tilt: asDegrees(round(sampleRange(generator, TILT_RANGE), 1)),
        rate: asDegrees(round(sampleRange(generator, ROTATION_RATE_RANGE), 2))
    };
}

function createRockPalette(generator: RandomGenerator): RockPalette {
    const hue = sampleRange(generator, [0, 360]);
    const lightHue = hue + sampleRange(generator, [-28, 28]);
    const includeSpecular = generator.next() < SPECULAR_PROBABILITY;

    return {
        dark: hslToHex({
            hue: hue + sampleRange(generator, [-14, 14]),
            saturation: sampleRange(generator, [0.35, 0.62]),
            lightness: sampleRange(generator, [0.1, 0.24])
        }),
        light: hslToHex({
            hue: lightHue,
            saturation: sampleRange(generator, [0.42, 0.78]),
            lightness: sampleRange(generator, [0.52, 0.82])
        }),
        ...(includeSpecular ? {
            specular: hslToHex({
                hue: lightHue,
                saturation: sampleRange(generator, [0.15, 0.34]),
                lightness: sampleRange(generator, [0.82, 0.94])
            }),
            specularThreshold: round(sampleRange(generator, [0.88, 0.96]), 2)
        } : {})
    };
}

function sampleRange(generator: RandomGenerator, [minimum, maximum]: NumericRange): number {
    return generator.nextRange(minimum, maximum);
}

function sampleIntegerRange(generator: RandomGenerator, [minimum, maximum]: NumericRange): number {
    return Math.floor(sampleRange(generator, [minimum, maximum + 1]));
}

function round(value: number, decimals: number): number {
    const scale = 10 ** decimals;

    return Math.round(value * scale) / scale;
}
