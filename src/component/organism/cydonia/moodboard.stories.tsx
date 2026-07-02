/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import type { Meta, StoryFn } from "@storybook/react-vite";
import { useEffect, useRef } from "react";


const meta: Meta<typeof Desktop> = {
    title: "Moodboard/Cydonia",
    parameters: {
        layout: "fullscreen"
    }
};
export default meta;

export const Desktop: StoryFn = function() {
    const julianDayRef = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const formatJulianDay = () => (Date.now() / 86400000 + 2440587.5).toFixed(6);
        const updateJulianDay = () => {
            if (julianDayRef.current !== null) {
                julianDayRef.current.textContent = formatJulianDay();
            }

            frame = window.requestAnimationFrame(updateJulianDay);
        };

        let frame = window.requestAnimationFrame(updateJulianDay);
        return () => window.cancelAnimationFrame(frame);
    }, []);

    return <main className="grid h-dvh min-h-[720px] w-dvw min-w-[1180px] grid-cols-[310px_minmax(560px,1fr)_310px] grid-rows-[64px_1fr_54px] content-stretch overflow-hidden bg-background font-mono text-text-primary">
        <aside className="panel col-start-1 row-span-2 row-start-1 flex min-h-0 flex-col">
            <header className="px-8 py-4">
                <h1 className="flex items-center gap-4 text-xl leading-tight tracking-normal">
                    <img src="/image/icon-light.svg" width={50} height={50} alt="Anti-Matter Studios" />
                    <span>Anti-Matter<br />Studios</span>
                </h1>
            </header>

            <div className="mx-5 h-px bg-border-default" />

            <section className="space-y-3 px-6 py-4 text-[13px] leading-none text-text-secondary">
                <div className="flex items-center justify-between">
                    <span className="uppercase text-signal-100">Status</span>
                    <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full bg-success" />
                        online
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="uppercase text-signal-100">Orbit Sync</span>
                    <span>live</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="uppercase text-signal-100">Last Update</span>
                    <span>real time</span>
                </div>
            </section>

            <div className="mx-5 h-px bg-border-subtle" />

            <section className="px-6 py-5">
                <p className="mb-3 text-[13px] uppercase leading-none text-signal-100">Portfolio Energy</p>
                <div className="grid grid-cols-[1fr_64px] items-end gap-4">
                    <div>
                        <p className="text-[72px] font-semibold leading-[0.85] text-text-primary">07</p>
                        <p className="mt-2 text-xl leading-none text-text-secondary">projects</p>
                    </div>
                    <div className="grid grid-cols-[repeat(5,4px)] grid-rows-[repeat(5,4px)] gap-[6px] pb-4">
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                        <span className="h-1 w-1 rounded-full bg-signal-100" />
                    </div>
                </div>
            </section>

            <div className="mx-5 h-px bg-border-subtle" />

            <section className="flex min-h-0 flex-1 flex-col">
                <div className="px-6 py-3">
                    <p className="text-[13px] uppercase leading-none text-signal-100">Project Index</p>
                </div>

                <div className="min-h-0 flex-1 overflow-hidden">
                    <article className="grid grid-cols-[40px_1fr_56px] items-center border-y border-border-subtle bg-signal-800/45 px-5 py-2 shadow-[inset_4px_0_0_var(--color-success)]">
                        <svg className="h-7 w-7" viewBox="0 0 44 44" aria-hidden="true">
                            <polygon
                                points="22 1 35 7 43 20 37 35 23 43 8 37 1 23 7 8"
                                fill="var(--color-matter-400)"
                            />
                            <polygon points="22 1 35 7 27 18 12 14" fill="var(--color-matter-300)" />
                            <polygon points="27 18 43 20 37 35 23 28" fill="var(--color-matter-500)" />
                            <polygon points="12 14 23 28 8 37 1 23" fill="var(--color-matter-600)" />
                        </svg>
                        <div className="min-w-0">
                            <h2 className="text-[15px] leading-tight text-text-primary">Cydonia</h2>
                            <p className="truncate text-[10px] leading-3 text-text-muted">This app</p>
                        </div>
                        <p className="text-right text-[11px] leading-tight text-text-secondary">#01106<br /><span
                            className="text-success"
                        >selected</span></p>
                    </article>

                    <article className="grid grid-cols-[40px_1fr_56px] items-center border-b border-border-subtle px-5 py-2">
                        <svg className="h-7 w-7" viewBox="0 0 44 44" aria-hidden="true">
                            <polygon
                                points="20 1 34 6 43 18 39 33 25 43 9 38 1 24 6 9"
                                fill="var(--color-signal-300)"
                            />
                            <polygon points="20 1 34 6 25 18 9 13" fill="var(--color-signal-100)" />
                            <polygon points="25 18 43 18 39 33 24 29" fill="var(--color-signal-500)" />
                            <polygon points="9 13 24 29 9 38 1 24" fill="var(--color-signal-400)" />
                        </svg>
                        <div className="min-w-0">
                            <h2 className="text-[15px] leading-tight text-text-primary">Arcadia</h2>
                            <p className="truncate text-[10px] leading-3 text-text-muted">Knowledge database system</p>
                        </div>
                        <p className="text-right text-[11px] leading-tight text-text-secondary">#01020</p>
                    </article>

                    <article className="grid grid-cols-[40px_1fr_56px] items-center border-b border-border-subtle px-5 py-2">
                        <svg className="h-7 w-7" viewBox="0 0 44 44" aria-hidden="true">
                            <polygon points="21 1 35 7 42 20 38 35 24 43 8 36 1 22 7 8" fill="#8f68a7" />
                            <polygon points="21 1 35 7 27 18 10 15" fill="#b28ac4" />
                            <polygon points="27 18 42 20 38 35 22 29" fill="#7d5796" />
                            <polygon points="10 15 22 29 8 36 1 22" fill="#6d4b86" />
                        </svg>
                        <div className="min-w-0">
                            <h2 className="text-[15px] leading-tight text-text-primary">Desdemona</h2>
                            <p className="truncate text-[10px] leading-3 text-text-muted">Tech/backend support tool</p>
                        </div>
                        <p className="text-right text-[11px] leading-tight text-text-secondary">#00666</p>
                    </article>

                    <article className="grid grid-cols-[40px_1fr_56px] items-center border-b border-border-subtle px-5 py-2">
                        <svg className="h-7 w-7" viewBox="0 0 44 44" aria-hidden="true">
                            <polygon points="22 1 36 8 43 22 36 36 21 43 7 36 1 21 8 7" fill="var(--color-info)" />
                            <polygon points="22 1 36 8 26 18 10 14" fill="#a8d5ca" />
                            <polygon points="26 18 43 22 36 36 22 29" fill="#77a99f" />
                            <polygon points="10 14 22 29 7 36 1 21" fill="#5e8f88" />
                        </svg>
                        <div className="min-w-0">
                            <h2 className="text-[15px] leading-tight text-text-primary">Nortia</h2>
                            <p className="truncate text-[10px] leading-3 text-text-muted">Legacy .NET ERP</p>
                        </div>
                        <p className="text-right text-[11px] leading-tight text-text-secondary">#04916</p>
                    </article>

                    <article className="grid grid-cols-[40px_1fr_56px] items-center border-b border-border-subtle px-5 py-2">
                        <svg className="h-7 w-7" viewBox="0 0 44 44" aria-hidden="true">
                            <polygon points="21 2 35 8 42 21 35 36 21 42 7 35 2 20 9 7" fill="var(--color-warning)" />
                            <polygon points="21 2 35 8 25 18 9 7" fill="#f0d889" />
                            <polygon points="25 18 42 21 35 36 21 28" fill="#b99845" />
                            <polygon points="9 7 21 28 7 35 2 20" fill="#d0ad58" />
                        </svg>
                        <div className="min-w-0">
                            <h2 className="text-[15px] leading-tight text-text-primary">Orpheus</h2>
                            <p className="truncate text-[10px] leading-3 text-text-muted">PrincessLog/Vita bridge</p>
                        </div>
                        <p className="text-right text-[11px] leading-tight text-text-secondary">#03361</p>
                    </article>

                    <article className="grid grid-cols-[40px_1fr_56px] items-center border-b border-border-subtle px-5 py-2">
                        <svg className="h-7 w-7" viewBox="0 0 44 44" aria-hidden="true">
                            <polygon points="22 1 37 9 42 24 33 39 17 42 4 31 4 14" fill="#c7d7a7" />
                            <polygon points="22 1 37 9 25 20 4 14" fill="#e4efd0" />
                            <polygon points="25 20 42 24 33 39 20 30" fill="#9fb77c" />
                            <polygon points="4 14 20 30 17 42 4 31" fill="#b7c98f" />
                        </svg>
                        <div className="min-w-0">
                            <h2 className="text-[15px] leading-tight text-text-primary">Moritakumi</h2>
                            <p className="truncate text-[10px] leading-3 text-text-muted">Sister portfolio app</p>
                        </div>
                        <p className="text-right text-[11px] leading-tight text-text-secondary">#18492</p>
                    </article>

                    <article className="grid grid-cols-[40px_1fr_56px] items-center border-b border-border-subtle px-5 py-2">
                        <svg className="h-7 w-7" viewBox="0 0 44 44" aria-hidden="true">
                            <polygon points="22 2 36 7 43 21 38 35 23 43 8 37 2 22 8 8" fill="#7890b7" />
                            <polygon points="22 2 36 7 26 19 8 8" fill="#a9bbdc" />
                            <polygon points="26 19 43 21 38 35 22 29" fill="#607aa7" />
                            <polygon points="8 8 22 29 8 37 2 22" fill="#6e86b2" />
                        </svg>
                        <div className="min-w-0">
                            <h2 className="text-[15px] leading-tight text-text-primary">Ganymede</h2>
                            <p className="truncate text-[10px] leading-3 text-text-muted">PS VITA 3D engine in Rust</p>
                        </div>
                        <p className="text-right text-[11px] leading-tight text-text-secondary">#01036</p>
                    </article>
                </div>

                <div className="mx-5 mb-4 mt-3 border border-dashed border-border-subtle px-5 py-3 text-xs leading-5 text-text-muted">
                    Signals are grouped by IAU-style project identifiers and live orbital state.
                </div>
            </section>
        </aside>

        <nav className="panel col-start-2 row-start-1 flex items-center justify-center">
            <div className="grid h-12 w-[560px] grid-cols-2 border border-border-default text-sm uppercase tracking-wide text-text-secondary">
                <div className="flex items-center justify-center gap-3 bg-signal-700/60 text-text-primary shadow-[inset_0_0_28px_hsl(116_28%_58%_/_0.28)]">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                            d="M12 4v3m0 10v3M4 12h3m10 0h3"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                        <ellipse
                            cx="12"
                            cy="12"
                            rx="6.5"
                            ry="6.5"
                            stroke="currentColor"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                        />
                    </svg>
                    System Peeker
                </div>
                <div className="flex items-center justify-center gap-3 border-l border-border-default">
                    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <rect x="5" y="4" width="14" height="16" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M9 8h6M9 12h6M9 16h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Information Gatherer
                </div>
            </div>
        </nav>

        <section className="space relative col-start-2 row-start-2 min-h-0 overflow-hidden">
            <header className="absolute left-8 top-7 z-10">
                <h2 className="text-2xl leading-none text-text-primary">System Peeker</h2>
                <p className="mt-3 text-sm uppercase tracking-wide text-signal-100">Solar System View</p>
            </header>

            <svg
                className="absolute inset-0 h-full w-full"
                viewBox="0 0 920 680"
                preserveAspectRatio="xMidYMid meet"
                aria-label="Solar system concept map"
            >
                <defs>
                    <radialGradient id="sunGradient">
                        <stop offset="0%" stopColor="#fff4a8" />
                        <stop offset="58%" stopColor="#f4d348" />
                        <stop offset="100%" stopColor="#dfb82f" />
                    </radialGradient>
                    <radialGradient id="glowGradient">
                        <stop offset="0%" stopColor="#f2d34d" stopOpacity="0.45" />
                        <stop offset="100%" stopColor="#f2d34d" stopOpacity="0" />
                    </radialGradient>
                    <filter id="softGlow" x="-80%" y="-80%" width="260%" height="260%">
                        <feGaussianBlur stdDeviation="12" result="blur" />
                        <feMerge>
                            <feMergeNode in="blur" />
                            <feMergeNode in="SourceGraphic" />
                        </feMerge>
                    </filter>
                </defs>

                <rect width="920" height="680" fill="transparent" />

                <g fill="var(--color-text-primary)" opacity="0.75">
                    <circle cx="95" cy="118" r="1.7" />
                    <circle cx="186" cy="84" r="1.2" />
                    <circle cx="362" cy="72" r="1.4" />
                    <circle cx="687" cy="104" r="1.3" />
                    <circle cx="823" cy="202" r="1.4" />
                    <circle cx="824" cy="494" r="1.7" />
                    <circle cx="705" cy="596" r="1.3" />
                    <circle cx="225" cy="601" r="1.4" />
                    <circle cx="101" cy="527" r="1.3" />
                    <circle cx="471" cy="153" r="2.5" />
                    <circle cx="645" cy="521" r="2.6" />
                    <circle cx="255" cy="364" r="3.2" />
                </g>

                <g fill="none" stroke="var(--color-border-default)" strokeWidth="1">
                    <ellipse cx="460" cy="348" rx="92" ry="72" opacity="0.65" />
                    <ellipse cx="460" cy="348" rx="155" ry="122" opacity="0.62" />
                    <ellipse cx="460" cy="348" rx="232" ry="184" opacity="0.58" />
                    <ellipse cx="460" cy="348" rx="306" ry="242" opacity="0.54" />
                    <ellipse cx="460" cy="348" rx="382" ry="302" opacity="0.5" />
                    <ellipse
                        cx="460"
                        cy="348"
                        rx="221"
                        ry="141"
                        strokeDasharray="12 12"
                        opacity="0.5"
                        transform="rotate(-11 460 348)"
                    />
                </g>

                <g filter="url(#softGlow)">
                    <circle cx="460" cy="348" r="70" fill="url(#glowGradient)" />
                    <circle cx="460" cy="348" r="32" fill="url(#sunGradient)" />
                </g>

                <g>
                    <circle cx="489" cy="313" r="7" fill="var(--color-text-primary)" opacity="0.72" />
                    <text x="503" y="318" fill="var(--color-text-secondary)" fontSize="12">Mercury</text>

                    <circle cx="382" cy="387" r="9" fill="var(--color-warning)" opacity="0.7" />
                    <text x="395" y="392" fill="var(--color-text-secondary)" fontSize="12">Venus</text>

                    <circle cx="574" cy="302" r="10" fill="var(--color-info)" opacity="0.85" />
                    <text x="588" y="307" fill="var(--color-text-secondary)" fontSize="12">Earth</text>

                    <circle cx="335" cy="291" r="8" fill="var(--color-matter-600)" opacity="0.85" />
                    <text x="348" y="296" fill="var(--color-text-secondary)" fontSize="12">Mars</text>
                </g>

                <g>
                    <line
                        x1="636"
                        y1="233"
                        x2="696"
                        y2="194"
                        stroke="var(--color-text-secondary)"
                        strokeWidth="1"
                        strokeDasharray="3 6"
                    />
                    <circle cx="615" cy="245" r="29" fill="none" stroke="var(--color-text-primary)" strokeWidth="2" />
                    <polygon
                        points="615 222 635 232 641 252 625 269 604 267 589 251 593 231"
                        fill="var(--color-matter-500)"
                    />
                    <polygon points="615 222 635 232 621 244 598 239" fill="var(--color-matter-300)" />
                    <polygon points="621 244 641 252 625 269 610 254" fill="var(--color-matter-600)" />
                    <text
                        x="704"
                        y="191"
                        fill="var(--color-matter-300)"
                        fontSize="14"
                        fontWeight="600"
                        letterSpacing="1"
                    >CYDONIA
                    </text>
                    <text x="704" y="208" fill="var(--color-text-secondary)" fontSize="12">#01106</text>
                </g>

                <g>
                    <polygon
                        points="238 333 253 340 258 356 246 369 229 366 219 352 223 339"
                        fill="var(--color-signal-400)"
                    />
                    <polygon points="238 333 253 340 242 350 223 339" fill="var(--color-signal-100)" opacity="0.7" />
                    <text x="174" y="341" fill="var(--color-signal-100)" fontSize="14" fontWeight="500">ARCADIA</text>
                    <text x="174" y="359" fill="var(--color-text-secondary)" fontSize="12">#01020</text>
                </g>

                <g>
                    <polygon points="323 433 340 440 347 456 334 471 317 468 305 453 309 438" fill="#8f68a7" />
                    <polygon points="323 433 340 440 329 451 309 438" fill="#b28ac4" opacity="0.78" />
                    <text
                        x="354"
                        y="457"
                        fill="var(--color-text-secondary)"
                        fontSize="14"
                        fontWeight="500"
                    >DESDEMONA
                    </text>
                    <text x="354" y="475" fill="var(--color-text-secondary)" fontSize="12">#00666</text>
                </g>

                <g>
                    <polygon
                        points="623 419 641 428 646 445 633 459 615 455 604 440 608 425"
                        fill="var(--color-info)"
                        opacity="0.9"
                    />
                    <polygon points="623 419 641 428 628 438 608 425" fill="#a8d5ca" opacity="0.8" />
                    <text
                        x="654"
                        y="447"
                        fill="var(--color-text-secondary)"
                        fontSize="14"
                        fontWeight="500"
                    >NORTIA
                    </text>
                    <text x="654" y="465" fill="var(--color-text-secondary)" fontSize="12">#04916</text>
                </g>

                <g>
                    <polygon
                        points="448 506 466 514 473 532 459 548 440 544 428 527 433 511"
                        fill="var(--color-space-100)"
                    />
                    <polygon points="448 506 466 514 453 527 433 511" fill="var(--color-signal-50)" opacity="0.82" />
                    <text
                        x="486"
                        y="541"
                        fill="var(--color-text-secondary)"
                        fontSize="14"
                        fontWeight="500"
                    >ORPHEUS
                    </text>
                    <text x="486" y="559" fill="var(--color-text-secondary)" fontSize="12">#03361</text>
                </g>

                <g>
                    <polygon points="536 156 551 163 557 179 545 193 528 190 518 176 522 161" fill="#c7d7a7" />
                    <polygon points="536 156 551 163 539 174 522 161" fill="#e4efd0" opacity="0.75" />
                    <text
                        x="568"
                        y="174"
                        fill="var(--color-text-secondary)"
                        fontSize="14"
                        fontWeight="500"
                    >MORITAKUMI
                    </text>
                    <text x="568" y="192" fill="var(--color-text-secondary)" fontSize="12">#18492</text>
                </g>

                <g>
                    <polygon points="702 338 720 346 727 362 714 378 696 375 684 359 689 343" fill="#7890b7" />
                    <polygon points="702 338 720 346 707 357 689 343" fill="#a9bbdc" opacity="0.75" />
                    <text
                        x="738"
                        y="366"
                        fill="var(--color-text-secondary)"
                        fontSize="14"
                        fontWeight="500"
                    >GANYMEDE
                    </text>
                    <text x="738" y="384" fill="var(--color-text-secondary)" fontSize="12">#01036</text>
                </g>

                <g opacity="0.75">
                    <circle cx="321" cy="131" r="15" fill="#b39772" />
                    <text x="336" y="122" fill="var(--color-text-secondary)" fontSize="12">Jupiter</text>

                    <circle cx="117" cy="363" r="16" fill="#a98f61" />
                    <ellipse
                        cx="117"
                        cy="363"
                        rx="35"
                        ry="8"
                        fill="none"
                        stroke="#a98f61"
                        strokeWidth="3"
                        opacity="0.45"
                        transform="rotate(-9 117 363)"
                    />
                    <text x="136" y="356" fill="var(--color-text-secondary)" fontSize="12">Saturn</text>

                    <circle cx="782" cy="429" r="15" fill="var(--color-info)" opacity="0.7" />
                    <ellipse
                        cx="782"
                        cy="429"
                        rx="27"
                        ry="8"
                        fill="none"
                        stroke="var(--color-info)"
                        strokeWidth="1.5"
                        opacity="0.45"
                        transform="rotate(-7 782 429)"
                    />
                    <text x="812" y="408" fill="var(--color-text-secondary)" fontSize="12">Uranus</text>

                    <circle cx="452" cy="618" r="14" fill="#7890b7" opacity="0.75" />
                    <text x="473" y="596" fill="var(--color-text-secondary)" fontSize="12">Neptune</text>
                </g>
            </svg>
        </section>

        <aside className="panel col-start-3 row-span-2 row-start-1 flex min-h-0 flex-col px-5 py-5">
            <header className="flex items-center justify-between">
                <h2 className="text-xl leading-none text-text-primary">Project Signal</h2>
                <span className="h-3.5 w-3.5 rounded-full bg-text-secondary" />
            </header>

            <div className="my-4 h-px bg-border-default" />

            <section className="flex items-center gap-5">
                <svg className="h-16 w-16 shrink-0" viewBox="0 0 64 64" aria-hidden="true">
                    <polygon points="32 2 52 12 62 31 52 52 32 62 12 52 2 32 12 12" fill="var(--color-matter-500)" />
                    <polygon points="32 2 52 12 38 28 14 20" fill="var(--color-matter-300)" />
                    <polygon points="38 28 62 31 52 52 32 39" fill="var(--color-matter-600)" />
                    <polygon points="14 20 32 39 12 52 2 32" fill="var(--color-matter-400)" />
                </svg>
                <div>
                    <h3 className="text-2xl leading-tight text-matter-300">Cydonia</h3>
                    <p className="text-sm text-text-primary">#01106</p>
                </div>
            </section>

            <div className="my-4 h-px bg-border-default" />

            <section className="mb-4">
                <h3 className="mb-2 text-sm uppercase text-signal-100">Project Information</h3>
                <p className="mb-3 text-sm leading-5 text-text-primary">Cydonia is this app: the static portfolio
                                                                        surface and current navigation body.</p>
                <dl className="space-y-2 text-xs text-text-secondary">
                    <div className="flex justify-between gap-4">
                        <dt>start-date</dt>
                        <dd className="text-text-primary">2026-07-01</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                        <dt>client</dt>
                        <dd className="text-text-primary">N/A</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                        <dt>technology</dt>
                        <dd className="text-text-primary">react</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                        <dt>hosting</dt>
                        <dd className="text-text-primary">github pages</dd>
                    </div>
                </dl>
            </section>

            <section>
                <h3 className="mb-3 text-sm uppercase text-signal-100">Orbit
                                                                       Data <span className="text-text-secondary">(J2000)</span>
                </h3>
                <dl className="space-y-2 text-xs text-text-secondary">
                    <div className="flex justify-between gap-4">
                        <dt>semi-major axis</dt>
                        <dd className="text-text-primary">2.694 AU</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                        <dt>eccentricity</dt>
                        <dd className="text-text-primary">0.174</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                        <dt>inclination</dt>
                        <dd className="text-text-primary">11.56 deg</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                        <dt>longitude of node</dt>
                        <dd className="text-text-primary">62.57 deg</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                        <dt>argument of peri.</dt>
                        <dd className="text-text-primary">131.02 deg</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                        <dt>mean anomaly</dt>
                        <dd className="text-text-primary">172.48 deg</dd>
                    </div>
                    <div className="flex justify-between gap-4">
                        <dt>epoch</dt>
                        <dd className="text-text-primary">2025-05-19</dd>
                    </div>
                </dl>
            </section>

            <div className="my-4 h-px bg-border-default" />

            <section className="mt-auto">
                <h3 className="mb-3 text-sm uppercase text-signal-100">Latest Note</h3>
                <p className="text-sm leading-5 text-text-primary">Orbit positions are projected against the current
                                                                   Julian Day readout. No significant anomalies detected
                                                                   in this pass.</p>
            </section>
        </aside>

        <footer className="panel col-span-3 col-start-1 row-start-3 grid grid-cols-[310px_1fr_310px] items-center px-5">
            <p className="text-sm text-text-secondary">Anti-Matter Studios / Cydonia</p>
            <p className="justify-self-center text-sm text-text-secondary">7 tracked signals</p>
            <p className="justify-self-end text-sm text-text-secondary">live orbit track / JD <span ref={julianDayRef}>{(Date.now() / 86400000 + 2440587.5).toFixed(6)}</span></p>
        </footer>
    </main>;
};
