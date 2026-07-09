/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { readFile } from "node:fs/promises";
import { YAML } from "bun";
import type { Plugin } from "vite";



const YAML_SOURCE_PATTERN = /\.ya?ml(?:\?.*)?$/u;

/** Imports YAML data source files as plain JavaScript objects. */
export function yamlParser(): Plugin {
    return {
        name: "cydonia:yaml-parser",
        async load(id) {
            if (!YAML_SOURCE_PATTERN.test(id)) {
                return null;
            }

            const [filename] = id.split("?");
            const source = await readFile(filename, "utf8");
            const data = YAML.parse(source);

            return {
                code: `export default ${JSON.stringify(data)};`,
                map: null
            };
        }
    };
}
