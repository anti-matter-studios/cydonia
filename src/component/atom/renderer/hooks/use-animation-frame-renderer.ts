/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { type RefObject, useEffect } from "react";
import type { SystemPeekerSimulator } from "@/lib/renderer";


/** Hook used to register a callback to {@link requestAnimationFrame} to render the simulator. */
export function useAnimationFrameRenderer(simulator: RefObject<SystemPeekerSimulator | null>): void {
    useEffect(function registerAnimationFrameHandler(): VoidFunction {
        let previousTimestamp = 0;
        let frame = requestAnimationFrame(function updateAnimation(timestamp) {
            const deltaTime = previousTimestamp ? timestamp - previousTimestamp : 0;
            previousTimestamp = timestamp;
            simulator.current?.render(deltaTime / 1000);

            frame = requestAnimationFrame(updateAnimation);
        });

        return function cleanupAnimationFrame() {
            cancelAnimationFrame(frame);
        };
    }, [simulator]);
}