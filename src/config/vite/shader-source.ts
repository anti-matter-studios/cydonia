/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { readFile } from "node:fs/promises";
import type { Plugin } from "vite";


const SHADER_SOURCE_PATTERN = /\.(?:frag|glsl|vert)(?:\?.*)?$/u;

/** Imports shader source files as plain strings. */
export function shaderSource(): Plugin {
    return {
        name: "cydonia:shader-source",
        async load(id) {
            if (!SHADER_SOURCE_PATTERN.test(id)) {
                return null;
            }

            const [filename] = id.split("?");
            const source = await readFile(filename, "utf8");

            return {
                code: `export default ${JSON.stringify(source)};`,
                map: null
            };
        }
    };
}
