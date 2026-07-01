/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */

import classNames from "classnames";


export default function Background(props: BackgroundProps) {
    const className = classNames("bg-(image:--background-space-gradient) [background-blend-mode:var(--background-space-blend)]", props.className);
    return <div className={className} />;
}

export interface BackgroundProps {
    className?: string;
}