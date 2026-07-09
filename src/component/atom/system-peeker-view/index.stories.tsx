/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import type { Meta, StoryFn } from "@storybook/react-vite";

import SystemPeekerView from ".";


const meta: Meta<typeof SystemPeekerView> = {
    title: "Atom/SystemPeekerView",
    component: SystemPeekerView,
    parameters: {
        layout: "fullscreen"
    }
};
export default meta;

export const Interactive: StoryFn = function() {
    return <main className="grid h-dvh w-dvw">
        <section className="space overflow-hidden">
            <SystemPeekerView className="size-full" />
        </section>
    </main>;
};
