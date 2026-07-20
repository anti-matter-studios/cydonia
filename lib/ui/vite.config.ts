/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import defineViteConfig from "@anti-matter-studios/toolchain/vite";

export default defineViteConfig({
    build: {
        rolldownOptions: {
            input: {
                styles: "./src/index.css",
            },
            output: {
                assetFileNames: "assets/[name].[ext]",
                entryFileNames: "[name].[ext]",
            },
        },
    },
});
