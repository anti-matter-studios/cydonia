/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { SmallBody } from "@/scripts/generate/jpl-ssd-api";


/** Formats compact orbital context for a body-selection row. */
export function formatSmallBodyDescription(body: SmallBody): string {
    return [
        `class ${body.class}`,
        `a ${round(body.semiMajorAxis, 3)} au`,
        `e ${round(body.eccentricity, 3)}`,
        body.diameter === null ? "" : `diameter ${round(body.diameter, 3)} km`
    ].filter((part) => part.length > 0).join(", ");
}

/** Formats the selected body title used in confirm screens and progress text. */
export function formatSmallBodyTitle(body: SmallBody): string {
    return `${body.name} (${body.designation})`;
}

function round(value: number, decimals: number): number {
    const scale = 10 ** decimals;

    return Math.round(value * scale) / scale;
}
