/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import type { Brand } from "@/lib/utils";


export type Degrees = Brand<number, "degrees">;
export type Radians = Brand<number, "radians">;
export type Angle = Degrees | Radians;

/**
 * Brands a numerical value as being in radians.
 *
 * Clamps the value in the `[-Math.PI; Math.PI]` range.
 * If the value falls outside the range, it wraps around with the modulo operator.
 *
 * @param value The value to brand as radians.
 * @returns The value branded as radians, clamped to the appropriate range.
 */
export function asRadiansWrapped(value: number): Radians {
    return (((value % (2 * Math.PI)) + Math.PI) % (2 * Math.PI)) - Math.PI as Radians;
}

/**
 * Brands a numerical value as being in radians.
 *
 * @param value The value to brand as radians.
 * @returns The value branded as radians, clamped to the appropriate range.
 */
export function asRadians(value: number): Radians {
    return value as Radians;
}


/**
 * Brands a numerical value as being in degrees.
 *
 * Clamps the value in the `[0; 360]` range.
 * If the value falls outside the range, it wraps around with the modulo operator.
 *
 * @param value The value to brand as degrees.
 * @returns The value branded as degrees, clamped to the appropriate range.
 */
export function asDegreesWrapped(value: number): Degrees {
    return (((value % 360) + 360) % 360) as Degrees;
}

/**
 * Brands a numerical value as being in degrees.
 *
 * @param value The value to brand as degrees.
 * @returns The value branded as degrees, clamped to the appropriate range.
 */
export function asDegrees(value: number): Degrees {
    return value as Degrees;
}

/** Converts a value from degrees to radians. */
export function degreesToRadians(degrees: Degrees): Radians {
    return asRadiansWrapped(degrees * Math.PI / 180);
}

/** Converts a value from radians to degrees. */
export function radiansToDegrees(radians: Radians): Degrees {
    return asDegreesWrapped(radians * 180 / Math.PI);
}