/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { type ViteUserConfig, mergeConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { defaultClientConditions } from "vite";

/**
 * Defines the Vite configuration used in the project.
 *
 * @param overrides The overrides to apply over the {@link defineDefaultViteConfig}.
 */
export default function defineViteConfig(overrides: ViteUserConfig = {}): ViteUserConfig {
    return mergeConfig(defineDefaultViteConfig(), overrides);
}

/** Generates the default Vite configuration */
export function defineDefaultViteConfig(): ViteUserConfig {
    return {
        appType: "spa",
        clearScreen: false,
        resolve: {
            conditions: ["source", ...defaultClientConditions],
        },
        build: {
            reportCompressedSize: true,
            chunkSizeWarningLimit: 250,
            sourcemap: true,
        },
        plugins: [react(), tailwindcss()],
        test: {
            environment: "jsdom",
            coverage: {
                enabled: true,
                reporter: "lcovonly",
                clean: true,
                include: ["src/**/*.{ts,tsx}"],
                reportsDirectory: "coverage",
            },
        },
    };
}
