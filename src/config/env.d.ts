/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

declare module "bun" {
    interface Env {
        VITE_DEFAULT_HOST: string;
        VITE_DEFAULT_PORT: string;

        VITE_DEV_SERVER_HOST: string;
        VITE_DEV_SERVER_PORT: string;

        VITE_PREVIEW_HOST: string;
        VITE_PREVIEW_PORT: string;
    }
}
