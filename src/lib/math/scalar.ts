/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { RandomGenerator } from "./random-generator";


/** Numeric range with optional inclusive bounds. */
export interface NumberRange {
    /** Inclusive lower bound. */
    readonly min?: number;

    /** Inclusive upper bound. */
    readonly max?: number;
}

/** Restricts a value to the inclusive `[min, max]` range. */
export function clamp(value: number, min: number, max: number): number {
    return Math.max(min, Math.min(max, value));
}

/** Sorts two numbers into ascending range order. */
export function sortRange(min: number, max: number): [number, number] {
    return min <= max ? [min, max] : [max, min];
}

/** Samples a floating-point value from a numeric range. */
export function sampleRange(
    random: RandomGenerator,
    range: NumberRange | undefined,
    fallback: Required<NumberRange>
): number {
    const [min, max] = sortRange(range?.min ?? fallback.min, range?.max ?? fallback.max);

    return min + random.next() * (max - min);
}

/** Samples an integer value from a numeric range. */
export function sampleIntegerRange(
    random: RandomGenerator,
    range: NumberRange | undefined,
    fallback: Required<NumberRange>
): number {
    const [min, max] = sortRange(range?.min ?? fallback.min, range?.max ?? fallback.max);
    const lower = Math.max(0, Math.floor(min));
    const upper = Math.max(lower, Math.floor(max));

    return lower + random.nextUint32() % (upper - lower + 1);
}
