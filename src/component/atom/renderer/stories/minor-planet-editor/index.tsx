/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { useContext, useEffect, useRef } from "react";
import { Vector3 } from "three";
import type { SystemPeekerSimulator } from "@/lib/renderer";
import { createOrbitLine, createPlanet, createSun, type OrbitLine } from "@/lib/renderer/object";

import { CanvasRenderer } from "../../canvas-renderer";
import { RendererContext } from "../../context";
import { usePlanetData } from "./use-planet-data";
import type { MinorPlanetEditorProps } from "./types";

/** Example story used to render a dynamically generated minor planet. */
export function MinorPlanetEditor(props: MinorPlanetEditorProps) {
    const { registerPlanet, unregisterPlanet } = useContext(RendererContext);
    const simulator = useRef<SystemPeekerSimulator>(null);
    const data = usePlanetData(props);

    const { setSimulationSpeed } = useContext(RendererContext);
    useEffect(function propagateSimulationSpeed(): void {
        setSimulationSpeed(props.simulationSpeed * 86_400);
    }, [props.simulationSpeed, setSimulationSpeed]);

    useEffect(function createPlanetObject(): VoidFunction | undefined {
        const instance = simulator.current;
        if (!instance) {
            return;
        }

        instance.add(createSun());

        let orbit: OrbitLine | undefined;
        const planet = instance.add(createPlanet(registerPlanet(data)));
        planet.applyOrbit = props.showOrbit;
        if (!planet.applyOrbit) {
            planet.lightSource = new Vector3(1, 1, -.25);
        } else {
            orbit = instance.add(createOrbitLine(data.orbit));
        }

        return function destroyPlanetObject(): void {
            instance.remove(planet);
            if (orbit) {
                instance.remove(orbit);
            }
            unregisterPlanet(data);
        }
    }, [registerPlanet, unregisterPlanet, data, props.showOrbit]);

    return <CanvasRenderer ref={simulator} className="space h-dvh w-dvw" />;
}
