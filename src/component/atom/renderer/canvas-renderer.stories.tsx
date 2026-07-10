/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import type { Meta, StoryFn } from "@storybook/react-vite";

import { CanvasRenderer, type CanvasRendererProps } from "./canvas-renderer";
import { RendererContext, RendererContextProvider } from "@/component/atom/renderer/context";
import { useCallback, useContext } from "react";
import type { SystemPeekerSimulator } from "@/lib/renderer";
import { createOrbitLine, createPlanet, createSun } from "@/lib/renderer/object";
import type { PlanetData } from "@/lib/schemas";
import { AllPlanets, Cydonia, Earth, Jupiter, Mars, Mercury, Neptune, Pluto, Saturn, Venus } from "@/data";


const meta: Meta<CanvasRendererProps> = {
    title: "Atom/Renderer/Canvas Renderer",
    parameters: { layout: "fullscreen" },
    decorators: Story => <RendererContextProvider children={<Story />} />
};
export default meta;

export const CanvasRendererStory: StoryFn = function() {
    const { registerPlanet } = useContext(RendererContext);

    const createCanvasRenderer = useCallback(function(renderer: SystemPeekerSimulator | null) {
        if (!renderer) {
            return;
        }

        renderer.add(createSun());
        for (const planet of AllPlanets) {
            renderer.add(createPlanet(registerPlanet(planet)));
            renderer.add(createOrbitLine(planet.orbit));
        }
    }, [registerPlanet]);

    return <CanvasRenderer ref={createCanvasRenderer} className="space h-dvh w-dvw" />;
};
CanvasRendererStory.storyName = "Canvas Renderer";