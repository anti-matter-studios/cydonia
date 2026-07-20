/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { SmallBody } from "@/scripts/generate/jpl-ssd-api";

import { formatSmallBodyDescription, formatSmallBodyTitle } from "./body-format";
import { REROLL_SHORTCUT, selectWithRerollShortcut } from "./select-with-reroll";


/** Shows a paged selector for candidate small bodies. */
export async function selectSmallBodyFromCandidates(candidates: readonly SmallBody[]): Promise<SmallBody | "reroll"> {
    const selected = await selectWithRerollShortcut({
        message: "Choose a named minor planet (press R to re-roll)",
        pageSize: Math.min(candidates.length, 8),
        choices: candidates.map((body) => ({
            name: formatSmallBodyTitle(body),
            value: body,
            description: formatSmallBodyDescription(body)
        })),
        loop: false
    });

    return selected === REROLL_SHORTCUT ? "reroll" : selected;
}
