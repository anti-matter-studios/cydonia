/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import defineViteConfig from "@anti-matter-studios/toolchain/vite";

import PackageJSON from "./package.json";

const exports = Object.entries(PackageJSON.exports)
    .map(([path, { source }]) => [path, source])
    .filter((args): args is [string, string] => typeof args[1] !== "undefined")
    .map(([path, source]) => [path.slice(2), source]);

export default defineViteConfig({
    build: {
        rolldownOptions: {
            input: Object.fromEntries(exports),
            output: {
                assetFileNames: "assets/[name].[ext]",
                entryFileNames: "[name].js",
            },
        },
    },
});
