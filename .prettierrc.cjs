/*
 * Copyright © 2017-2026 - Zimproov.
 * All rights reserved.
 */

module.exports = {
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
    plugins: [require.resolve("prettier-plugin-packagejson")],
};
