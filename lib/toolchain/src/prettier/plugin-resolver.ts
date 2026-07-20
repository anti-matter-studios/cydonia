/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";

/**
 * Resolves a plugin using `require.resolve` and adds it to the list of plugins.
 *
 * If the plugin is not found, it will be ignored.
 *
 * @param name The name of the plugin to resolve.
 * @param pluginList The list of plugins to add the resolved plugin to.
 * @return The updated list of plugins.
 */
export function resolvePlugin(name: string, pluginList: string[] = []): string[] {
    try {
        return pluginList.concat(require.resolve(name));
    } catch (_: unknown) {
        // TODO: Log the error.
        return pluginList;
    }
}

const require = createRequire(fileURLToPath(import.meta.url));
