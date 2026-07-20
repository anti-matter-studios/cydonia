/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
    stories: [
        `../../../lib/ui/**/*.stories.@(ts|tsx)`,
        `../../portfolio/**/*.stories.@(ts|tsx)`,
        `../src/**/*.stories.@(ts|tsx)`,
    ],
    addons: [],
    core: {
        builder: "@storybook/builder-vite",
        allowedHosts: ["storybook.cydonia.dev.anti-matter.studio"],
        disableTelemetry: true,
        disableWhatsNewNotifications: true,
        disableWebpackDefaults: true,
    },
    framework: {
        name: "@storybook/react-vite",
        options: {},
    },
    viteFinal(config) {
        return mergeConfig<typeof config, typeof config>(config, {
            server: { ws: { port: 443 } },
        });
    },
};

export default config;
