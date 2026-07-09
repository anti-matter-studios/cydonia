/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { devices, defineConfig } from "@playwright/test";


export default defineConfig({
    expect: { timeout: 5_000 },
    forbidOnly: !process.env.CI,
    fullyParallel: true,
    outputDir: "test-results",
    projects: [
        {
            name: "desktop",
            use: { ...devices["Desktop Safari"] }
        },
        {
            name: "iphone",
            use: { ...devices["iPhone 17"] }
        },
        {
            name: "iphone-max",
            use: { ...devices["iPhone 17 Pro Max"] }
        }
    ],
    reporter: [
        ["list"],
        ["html", { open: "never", outputFolder: "playwright-report" }]
    ],
    retries: 0,
    testDir: "./e2e",
    use: {
        baseURL: "http://localhost:10101/",
        trace: "on-first-retry"
    },
    webServer: {
        command: "bun run dev",
        cwd: ".",
        reuseExistingServer: !process.env.CI,
        timeout: 120_000,
        url: "http://localhost:10101/"
    }
});
