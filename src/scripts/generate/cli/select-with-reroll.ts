/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { select } from "@inquirer/prompts";
import { emitKeypressEvents, type Key } from "node:readline";


/** Internal marker returned when the user asks the current picker to re-roll. */
export const REROLL_SHORTCUT = Symbol("reroll-shortcut");

interface SelectChoice<Value> {
    readonly name: string;
    readonly value: Value;
    readonly description?: string;
    readonly disabled?: boolean | string;
}

interface RerollableSelectConfig<Value> {
    readonly message: string;
    readonly choices: ReadonlyArray<SelectChoice<Value>>;
    readonly pageSize?: number;
    readonly loop?: boolean;
}

/**
 * Runs an Inquirer select prompt that resolves immediately when the user presses R.
 *
 * Inquirer does not expose custom keybindings on its stock select prompt, so this wraps the
 * prompt with an abort signal and treats an R-key abort as a deliberate re-roll action.
 */
export async function selectWithRerollShortcut<Value>(
    config: RerollableSelectConfig<Value>
): Promise<Value | typeof REROLL_SHORTCUT> {
    const abortController = new AbortController();

    emitKeypressEvents(process.stdin);
    process.stdin.on("keypress", handleKeypress);

    try {
        return await select<Value>(config, { signal: abortController.signal });
    } catch (error) {
        if (isRerollAbort(error)) {
            return REROLL_SHORTCUT;
        }

        throw error;
    } finally {
        process.stdin.off("keypress", handleKeypress);
    }

    function handleKeypress(_: string, key: Key): void {
        if (key.name?.toLowerCase() === "r" && !key.ctrl && !key.meta) {
            abortController.abort(REROLL_SHORTCUT);
        }
    }

    function isRerollAbort(error: unknown): error is Error & { readonly cause: typeof REROLL_SHORTCUT } {
        return error instanceof Error && error.name === "AbortPromptError" && error.cause === REROLL_SHORTCUT;
    }
}
