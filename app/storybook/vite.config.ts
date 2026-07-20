/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import defineViteConfig from "@anti-matter-studios/toolchain/vite";

export default defineViteConfig({
    base: "/storybook",
    server: { ws: { port: 443 } },
});
