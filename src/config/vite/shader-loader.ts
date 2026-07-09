/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { readFile } from "node:fs/promises";
import type { Plugin } from "vite";


const SHADER_FILE_PATTERN = /\.(?:frag|glsl|vert)(?:\?.*)?$/u;

/** Imports shader source files as plain strings. */
export function shaderLoader(): Plugin {
    return {
        name: "cydonia:shader-loader",
        async load(id) {
            if (!SHADER_FILE_PATTERN.test(id)) {
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
