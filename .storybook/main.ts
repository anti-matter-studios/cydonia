/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";


const config: StorybookConfig = {
    stories: ["../src/**/*.stories.@(ts|tsx)"],
    addons: ["@storybook/addon-docs"],
    core: {
        builder: "@storybook/builder-vite",
        allowedHosts: ["storybook.cydonia.dev.anti-matter.studio"],
        disableTelemetry: true,
        disableWhatsNewNotifications: true,
        disableWebpackDefaults: true
    },
    framework: {
        name: "@storybook/react-vite",
        options: {}
    },
    viteFinal(config) {
        return mergeConfig<typeof config, typeof config>(
            config,
            {
                server: {
                    ws: {
                        port: 443
                    }
                }
            }
        );
    }
};

export default config;
