/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


/**
 * Smooths a value using the quintic Perlin fade curve.
 *
 * @param value The value to smooth.
 * @returns The smoothed value.
 */
export function fade(value: number): number {
    return value * value * value * (value * (value * 6 - 15) + 10);
}

/**
 * Linearly interpolates between two values.
 *
 * @param amount The interpolation amount.
 * @param start The start value.
 * @param end The end value.
 * @returns The interpolated value.
 */
export function lerp(amount: number, start: number, end: number): number {
    return start + amount * (end - start);
}

/**
 * Selects a Perlin gradient direction and returns its dot product.
 *
 * @param hash The hashed gradient index.
 * @param x The local x coordinate.
 * @param y The local y coordinate.
 * @param z The local z coordinate.
 * @returns The gradient dot product.
 */
export function grad(hash: number, x: number, y: number, z: number): number {
    const h = hash & 15;
    const u = h < 8 ? x : y;
    const v = h < 4 ? y : h === 12 || h === 14 ? x : z;

    return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
}
