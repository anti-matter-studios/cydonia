/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

/** Brands a type with a given type. */
export type Brand<T, B extends string> = T & { [BRANDED]: B };

/** Removes a brand from a type. */
export type Unbrand<T> = T extends Brand<infer U, string> ? U : T;

// Symbol for branded types.
const BRANDED = Symbol.for('branded');
type BRANDED = typeof BRANDED;

/**
 * Brands a value with a given brand.
 * @param value The value to brand.
 * @param brand The brand to apply to the value.
 * @returns The branded value.
 */
export function brand<T, B extends string>(value: T, brand?: B): Brand<Unbrand<T>, B>;

// Type-agnostic implementation for tree-shaking.
export function brand(value: unknown, _?: string) {
    return value;
}

/**
 * Removes the brand from a given type.
 *
 * @param value The value to unbrand.
 * @returns The unbranded value.
 */
export function unbrand<T, B extends string>(value: T | Brand<T, B>): Unbrand<T>;

// Type-agnostic implementation for tree-shaking.
export function unbrand(value: unknown) {
    return value;
}