/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { devices, defineConfig } from "@playwright/test";


const isCi = Boolean(process.env.CI);
const e2eBaseUrl = "http://127.0.0.1:10101";

export default defineConfig({
    expect: {
        timeout: 5_000
    },
    forbidOnly: isCi,
    fullyParallel: true,
    outputDir: "test-results",
    projects: [
        {
            name: "desktop-chromium",
            use: { ...devices["Desktop Chrome"] }
        },
        {
            name: "mobile-chromium",
            use: { ...devices["Pixel 7"] }
        }
    ],
    reporter: [
        ["list"],
        ["html", { open: "never", outputFolder: "playwright-report" }]
    ],
    retries: isCi ? 2 : 0,
    testDir: "./e2e",
    use: {
        baseURL: e2eBaseUrl,
        trace: "on-first-retry"
    },
    webServer: {
        command: "bunx --bun vite --host 127.0.0.1 --port 10101 --strictPort",
        cwd: ".",
        reuseExistingServer: !isCi,
        timeout: 120_000,
        url: e2eBaseUrl
    },
    workers: isCi ? 1 : undefined
});
