/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { Config } from "prettier";
import { resolvePlugin } from "./plugin-resolver.js";

/** Core prettier configuration used for the projects. */
export const PrettierConfiguration: Config = {
    printWidth: 120,
    tabWidth: 4,
    useTabs: false,
    semi: true,
    singleQuote: false,
    quoteProps: "as-needed",
    jsxSingleQuote: false,
    trailingComma: "all",
    bracketSpacing: true,
    bracketSameLine: false,
    arrowParens: "avoid",
    endOfLine: "lf",
    plugins: resolvePlugin("prettier-plugin-packagejson"),
};
