/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { tomlParser } from "./toml-parser.js";
import { yamlParser } from "./yaml-parser.js";
import { shaderLoader } from "./shader-loader.js";


/** Shared Vite configuration for the project. */
export default defineConfig({
    appType: "spa",
    resolve: {
        alias: {
            "@": "/src"
        }
    },
    plugins: [react(), tailwindcss(), tomlParser(), yamlParser(), shaderLoader()],
    preview: {
        host: process.env.VITE_PREVIEW_HOST,
        port: parseInt(process.env.VITE_PREVIEW_PORT),
        strictPort: true
    },
    server: {
        host: process.env.VITE_DEV_SERVER_HOST,
        port: parseInt(process.env.VITE_DEV_SERVER_PORT),
        strictPort: true
    }
});
