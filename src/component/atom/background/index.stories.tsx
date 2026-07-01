/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import { StoryFn, Meta } from "@storybook/react";
import Background from ".";

export default {
    title: "Background",
    parameters: {
        layout: "fullscreen"
    }
} satisfies Meta<typeof Background>;

export const Default: StoryFn<typeof Background> = function() {
    return <div className="w-full h-dvh grid grid-rows-[60px_1fr_120px] grid-cols-[300px_1fr_300px] content-stretch">
        <div className="panel row-span-2" />
        <div className="panel" />
        <div className="panel row-span-2" />
        <div className="space" />
        <div className="panel col-span-3" />
    </div>;
};
