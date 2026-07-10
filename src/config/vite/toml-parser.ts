/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { readFile } from "node:fs/promises";
import { TOML } from "bun";
import type { Plugin } from "vite";



const TOML_SOURCE_PATTERN = /\.toml(?:\?.*)?$/u;

/** Imports TOML data source files as plain JavaScript objects. */
export function tomlParser(): Plugin {
    return {
        name: "cydonia:toml-parser",
        async load(id) {
            if (!TOML_SOURCE_PATTERN.test(id)) {
                return null;
            }

            const [filename] = id.split("?");
            const source = await readFile(filename, "utf8");
            const data = TOML.parse(source);

            return {
                code: `export default ${JSON.stringify(data)};`,
                map: null
            };
        }
    };
}
