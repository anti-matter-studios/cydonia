/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { type RefCallback, type RefObject, useCallback, useRef } from "react";
import type { SystemPeekerSimulator } from "@/lib/renderer";


/**
 * Hook used to watch resize events on a given {@link HTMLCanvasElement}
 * and propagate them to a {@link RefObject<SystemPeekerSimulator>} object.
 *
 * @param simulator The reference to the simulator object.
 * @return A callback to invoke when the canvas reference changes.
 */
export function useSystemPeekerViewportResizeObserver(simulator: RefObject<SystemPeekerSimulator | undefined>): RefCallback<HTMLCanvasElement> {
    const observer = useRef<ResizeObserver | undefined>(undefined);
    return useCallback(function watchForResizeEvents(canvas: HTMLCanvasElement | null): void {
        if (canvas == null) {
            observer.current?.disconnect();
            delete observer.current;
            return;
        }

        observer.current = new ResizeObserver(function propagateResizeEvent() {
            simulator.current?.resize(canvas.clientWidth, canvas.clientHeight);
        });
        observer.current.observe(canvas);
    }, [simulator]);
}