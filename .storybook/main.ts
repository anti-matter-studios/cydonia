/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { type InlineConfig, mergeConfig } from "vite";
import type { StorybookConfig } from "@storybook/react-vite";


const config: StorybookConfig = {
    stories: ["../src/**/*.stories.@(ts|tsx)"],
    addons: ["@storybook/addon-docs"],
    framework: {
        name: "@storybook/react-vite",
        options: {}
    }
};

export default config;
