/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


/**
 * Interpolates between 0 and 1 using an ease-in-out cubic function.
 *
 * @param t The input value between 0 and 1.
 * @returns The interpolated value between 0 and 1.
 */
export function easeInOutCubic(t: number): number {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}
