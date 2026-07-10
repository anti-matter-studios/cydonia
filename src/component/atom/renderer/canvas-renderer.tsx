/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { forwardRef, type HTMLAttributes, useCallback, useContext, useEffect, useRef } from "react";
import { createSystemPeekerSimulator, type SystemPeekerSimulator } from "@/lib/renderer";
import { RendererContext } from "./context";
import { useAnimationFrameRenderer, useResizeObserver } from "./hooks";


/** Creates a new {@link SystemPeekerSimulator} on a {@link HTMLCanvasElement}. */
export const CanvasRenderer = forwardRef<SystemPeekerSimulator | null, CanvasRendererProps>(function CanvasRenderer(props, ref) {
    const systemPeeker = useRef<SystemPeekerSimulator>(null);
    const resizeObserver = useResizeObserver(systemPeeker);

    const onCanvasReady = useCallback(function(canvas: HTMLCanvasElement | null) {
        systemPeeker.current?.dispose();
        systemPeeker.current = null;

        resizeObserver(canvas);

        if (canvas) {
            systemPeeker.current = createSystemPeekerSimulator(canvas);
        }

        if (typeof ref === "function") {
            ref(systemPeeker.current);
        } else if (typeof ref === "object" && ref) {
            ref.current = systemPeeker.current;
        }
    }, [ref, resizeObserver]);

    useAnimationFrameRenderer(systemPeeker);

    const state = useContext(RendererContext);
    useEffect(function propagateStateUpdates(): void {
        systemPeeker.current?.updateSimulationState(state);
    }, [state]);

    return <canvas {...props} ref={onCanvasReady} />;
});

export type CanvasRendererProps = HTMLAttributes<HTMLCanvasElement> & {};