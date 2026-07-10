/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import { type RefCallback, type RefObject, useCallback, useRef } from "react";
import type { SystemPeekerSimulator } from "@/lib/renderer";


/** Creates a {@link ResizeObserver} object around the provided canvas and propagates updates to the simulator. */
export function useResizeObserver(simulator: RefObject<SystemPeekerSimulator | null>): RefCallback<HTMLCanvasElement> {
    const observer = useRef<ResizeObserver>(null);

    return useCallback(function watch(canvas) {
        observer.current?.disconnect();

        const capturedCanvasReference = canvas;
        if (!capturedCanvasReference) {
            return;
        }

        observer.current = new ResizeObserver(function onResizeEvent() {
            simulator.current?.resize(capturedCanvasReference.clientWidth, capturedCanvasReference.clientHeight);
        });
        observer.current.observe(capturedCanvasReference);
    }, [simulator]);
}