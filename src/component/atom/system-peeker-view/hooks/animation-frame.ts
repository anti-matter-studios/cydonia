/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { type RefObject, useEffect } from "react";
import type { SystemPeekerSimulator } from "@/lib/renderer";


/**
 * Hook used to call {@link SystemPeekerSimulator.render} on browser animation frames.
 *
 * Hooks into {@link window.requestAnimationFrame} until the renderer is destroyed.
 *
 * @param simulator The reference to the simulator object.
 */
export function useSystemPeekerAnimation(simulator: RefObject<SystemPeekerSimulator | undefined>) : void {
    useEffect(function hookAnimationFrames(): VoidFunction {
        let previousFrameTime: number | undefined;
        let frame = window.requestAnimationFrame(function renderSimulatorFrame(timestamp)  {
            let deltaTime = 0;
            if (previousFrameTime) {
                deltaTime = (timestamp - previousFrameTime) / 1000;
            }
            previousFrameTime = timestamp;

            simulator.current?.render(deltaTime);

            frame = window.requestAnimationFrame(renderSimulatorFrame);
        });

        return function cleanupAnimationFrame() {
            window.cancelAnimationFrame(frame);
        }
    }, [simulator]);
}