/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


/**
 * Computes the dot product between two 3D vectors.
 *
 * @param ax The first vector x component.
 * @param ay The first vector y component.
 * @param az The first vector z component.
 * @param bx The second vector x component.
 * @param by The second vector y component.
 * @param bz The second vector z component.
 * @returns The scalar dot product.
 */
export function dot3(
    ax: number,
    ay: number,
    az: number,
    bx: number,
    by: number,
    bz: number
): number {
    return ax * bx + ay * by + az * bz;
}
