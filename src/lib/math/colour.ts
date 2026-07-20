/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { asDegreesWrapped, type Degrees } from "@/lib/math/angle";
import { clamp } from "@/lib/math/scalar";


/** HSL colour channels using hue in degrees and saturation/lightness in `[0, 1]`. */
export interface HslColour {
    /** Hue angle on the colour wheel. Values outside `[0, 360)` wrap around. */
    readonly hue: Degrees | number;

    /** Colour intensity, clamped to `[0, 1]` during conversion. */
    readonly saturation: number;

    /** Perceived brightness, clamped to `[0, 1]` during conversion. */
    readonly lightness: number;
}

/** RGB colour channels in the usual 8-bit `[0, 255]` range. */
export interface RgbColour {
    readonly red: number;
    readonly green: number;
    readonly blue: number;
}

/** Converts an HSL colour to 8-bit RGB channels. */
export function hslToRgb(colour: HslColour): RgbColour {
    const huePrime = asDegreesWrapped(colour.hue) / 60;
    const saturation = clamp(colour.saturation, 0, 1);
    const lightness = clamp(colour.lightness, 0, 1);
    const chroma = (1 - Math.abs(2 * lightness - 1)) * saturation;
    const x = chroma * (1 - Math.abs((huePrime % 2) - 1));
    const match = lightness - chroma / 2;
    const [red, green, blue] = getHslSegment(huePrime, chroma, x);

    return {
        red: toEightBitChannel(red + match),
        green: toEightBitChannel(green + match),
        blue: toEightBitChannel(blue + match)
    };
}

/** Formats RGB channels as a six-digit hexadecimal colour string without a leading hash. */
export function rgbToHex(colour: RgbColour): string {
    return [colour.red, colour.green, colour.blue]
        .map((channel) => Math.round(clamp(channel, 0, 255)).toString(16).padStart(2, "0"))
        .join("");
}

/** Converts an HSL colour directly to a six-digit hexadecimal colour string. */
export function hslToHex(colour: HslColour): string {
    return rgbToHex(hslToRgb(colour));
}

function getHslSegment(huePrime: number, chroma: number, x: number): readonly [number, number, number] {
    if (huePrime < 1) {
        return [chroma, x, 0];
    }
    if (huePrime < 2) {
        return [x, chroma, 0];
    }
    if (huePrime < 3) {
        return [0, chroma, x];
    }
    if (huePrime < 4) {
        return [0, x, chroma];
    }
    if (huePrime < 5) {
        return [x, 0, chroma];
    }

    return [chroma, 0, x];
}

function toEightBitChannel(value: number): number {
    return Math.round(clamp(value, 0, 1) * 255);
}
