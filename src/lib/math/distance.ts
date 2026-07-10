/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import type { Brand } from "@/lib/utils";

export type AstronomicalUnits = Brand<number, "astronomical-units">;
export type Kilometers = Brand<number, "kilometers">;

/** Number of kilometers in a single astronomical unit. */
const AU_TO_KM = 1.495979e+8;

/**
 * Brands a numerical value as being in kilometers.
 *
 * @param value The value to brand as kilometers.
 * @returns The value branded as kilometers.
 */
export function asKilometers(value: number): Kilometers {
    return value as Kilometers;
}

/**
 * Converts kilometers to astronomical units.
 *
 * @param kilometers The number of kilometers to convert.
 * @returns The astronomical units equivalent of the given kilometers.
 */
export function kilometersToAstronomicalUnits(kilometers: Kilometers): AstronomicalUnits {
    return kilometers / AU_TO_KM as AstronomicalUnits;
}

/**
 * Brands a numerical value as being in astronomical units.
 *
 * @param value The value to brand as astronomical units.
 * @returns The value branded as astronomical units.
 */
export function asAstronomicalUnits(value: number): AstronomicalUnits {
    return value as AstronomicalUnits;
}

/**
 * Converts astronomical units to kilometers.
 *
 * @param astronomicalUnits The number of astronomical units to convert.
 * @returns The kilometers equivalent of the given astronomical units.
 */
export function astronomicalUnitsToKilometers(astronomicalUnits: AstronomicalUnits): Kilometers {
    return astronomicalUnits * AU_TO_KM as Kilometers;
}