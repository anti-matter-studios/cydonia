/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { type ComponentProps, useCallback, useEffect, useRef } from "react";

import { createSystemPeekerSimulator, type SystemPeekerSimulator } from "@/lib/renderer";
import {
    useSystemPeekerAnimation,
    useSystemPeekerViewportResizeObserver
} from "@/component/atom/system-peeker-view/hooks";
import { brand } from "@/lib/utils";
import { Cydonia, Earth, Jupiter, Mars, Mercury, Neptune, Pluto, Saturn, Uranus, Venus } from "@/data";


/** Canvas that renders the orbital System Peeker. */
export default function SystemPeekerView(props: SystemPeekerViewProps) {
    const simulator = useRef<SystemPeekerSimulator>(undefined);
    const resize = useSystemPeekerViewportResizeObserver(simulator);

    const initialiseRenderer = useCallback(function initialiseSystemPeekerView(canvas: HTMLCanvasElement | null) {
        try {
            if (simulator.current) {
                simulator.current.dispose();
                delete simulator.current;
            }

            if (!canvas) {
                return;
            }

            simulator.current = createSystemPeekerSimulator(canvas);
            simulator.current.resize(canvas.width, canvas.height);
            simulator.current.addPlanet(Mercury);
            simulator.current.addPlanet(Venus);
            simulator.current.addPlanet(Earth);
            simulator.current.addPlanet(Mars);
            simulator.current.addPlanet(Jupiter);
            simulator.current.addPlanet(Saturn);
            simulator.current.addPlanet(Uranus);
            simulator.current.addPlanet(Neptune);
            simulator.current.addPlanet(Pluto);
            simulator.current.addPlanet(Cydonia);
            simulator.current.track(Cydonia.designation);
            simulator.current.setSimulationTime(brand(0));
        } finally {
            resize(canvas);
        }
    }, [resize]);

    const wallClock = useRef<number>(Date.now());
    useEffect(function(): VoidFunction {
        const interval = window.setInterval(function() {
            wallClock.current += 24 * 60 * 60 * 1000;
            simulator.current?.setSimulationTime(brand(wallClock.current));
        }, 1 / 30);

        return function cleanup() {
            clearInterval(interval);
        }
    }, []);

    useSystemPeekerAnimation(simulator);

    return <canvas ref={initialiseRenderer} {...props} />;
}

export interface SystemPeekerViewProps extends ComponentProps<"canvas"> {
    /** If set, enables reduced motion mode. */
    readonly reduceMotion?: boolean;

    /** List of orbital bodies to render in the project. */
    //readonly bodies: readonly ProjectBodyDefinition[];
}
