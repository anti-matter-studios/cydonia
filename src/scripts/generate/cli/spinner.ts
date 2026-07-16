/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import ora from "ora";


interface SpinnerMessages {
    readonly start: string;
    readonly success?: string;
    readonly failure?: string;
}

/** Runs an async CLI task behind an Ora spinner. */
export async function withSpinner<T>(messages: SpinnerMessages, task: () => Promise<T>): Promise<T> {
    const spinner = ora(messages.start).start();

    try {
        const result = await task();
        spinner.succeed(messages.success ?? messages.start);

        return result;
    } catch (error) {
        spinner.fail(messages.failure ?? messages.start);
        throw error;
    }
}
