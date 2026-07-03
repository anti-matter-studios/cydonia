/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { type ComponentProps, useCallback, useRef } from "react";

import { createSystemPeekerRenderer, type SystemPeekerRenderer } from "@/lib/renderer";
import { useSystemPeekerTimeManager } from "./hooks";

/** Canvas that renders the orbital System Peeker. */
export default function SystemPeekerView(props: SystemPeekerViewProps) {
    const renderer = useRef<SystemPeekerRenderer>(undefined);
    const initialiseRenderer = useCallback(function initialiseSystemPeekerView(canvas: HTMLCanvasElement | null) {
        if (renderer.current) {
            renderer.current[Symbol.dispose]();
            delete renderer.current;
        }

        if (!canvas) {
            return;
        }

        // TODO: Auto-resize the canvas.
        canvas.width = canvas.clientWidth;
        canvas.height = canvas.clientHeight;

        renderer.current = createSystemPeekerRenderer(canvas);
        renderer.current.resize(canvas.width, canvas.height);
        renderer.current.start();
    }, []);

    const _ = useSystemPeekerTimeManager(renderer);

    return <canvas ref={initialiseRenderer} {...props} />;
}

export interface SystemPeekerViewProps extends ComponentProps<"canvas"> {
    /** If set, enables reduced motion mode. */
    readonly reduceMotion?: boolean;

    /** List of orbital bodies to render in the project. */
    //readonly bodies: readonly ProjectBodyDefinition[];
}
