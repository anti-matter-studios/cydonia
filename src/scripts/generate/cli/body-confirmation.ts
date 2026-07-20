/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { select } from "@inquirer/prompts";
import type { SmallBody } from "@/scripts/generate/jpl-ssd-api";

import { formatSmallBodyTitle } from "./body-format";


export type ConfirmationAction = "generate" | "search-again" | "cancel";

interface ConfirmSmallBodyGenerationOptions {
    /** Whether the final generation step will only preview its work. */
    readonly dryRun?: boolean;
}

/** Presents the naming citation and asks whether to generate, search again, or stop. */
export async function confirmSmallBodyGeneration(
    body: SmallBody,
    citation: string | null,
    options: ConfirmSmallBodyGenerationOptions = {}
): Promise<ConfirmationAction> {
    const dryRun = options.dryRun ?? false;

    return select<ConfirmationAction>({
        message: [
            `${dryRun ? "Preview" : "Generate"} ${formatSmallBodyTitle(body)}?`,
            "",
            citation ?? "No naming citation was returned by the SBDB API."
        ].join("\n"),
        choices: [
            {
                name: dryRun ? "Preview this body" : "Use this body",
                value: "generate"
            },
            {
                name: "Search again",
                value: "search-again",
                description: "Fetch another random set of named bodies"
            },
            {
                name: "Cancel",
                value: "cancel"
            }
        ]
    });
}
