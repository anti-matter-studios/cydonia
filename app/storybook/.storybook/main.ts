/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { StorybookConfig } from "@storybook/react-vite";
import { mergeConfig } from "vite";
import defineViteConfig from "@anti-matter-studios/toolchain/vite";

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
        return mergeConfig(
            config,
            defineViteConfig({
                base: "/storybook",
                server: { ws: { port: 443 } },
            }),
        );
    },
};

export default config;
