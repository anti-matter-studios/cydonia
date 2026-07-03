/*
 * Copyright © 2026 Anti-Matter Studios.
 * This product is released under the MIT licence.
 */


import type { Meta, StoryFn } from "@storybook/react-vite";
import { useEffect, useRef } from "react";
import { unixTimestampToJulianDateTT } from "@/lib/renderer/orbit";
import SystemPeekerView from "@/component/atom/system-peeker-view";


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
        const updateJulianDay = () => {
            if (julianDayRef.current !== null) {
                julianDayRef.current.textContent = unixTimestampToJulianDateTT(Date.now()).toFixed(6);
            }

            frame = window.requestAnimationFrame(updateJulianDay);
        };

        let frame = window.requestAnimationFrame(updateJulianDay);
        return () => window.cancelAnimationFrame(frame);
    }, []);

    return <main className="grid h-dvh min-h-180 w-dvw min-w-295 grid-cols-[310px_minmax(560px,1fr)_310px] grid-rows-[64px_1fr_54px] content-stretch overflow-hidden bg-background font-mono text-text-primary">
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
                    <span className="text-signal-100 uppercase">Status</span>
                    <span className="flex items-center gap-2">
                        <span className="size-2 rounded-full bg-success" />
                        online
                    </span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-signal-100 uppercase">Orbit Sync</span>
                    <span>live</span>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-signal-100 uppercase">Last Update</span>
                    <span>real time</span>
                </div>
            </section>

            <div className="mx-5 h-px bg-border-subtle" />

            <section className="px-6 py-5">
                <p className="mb-3 text-[13px] leading-none text-signal-100 uppercase">Project Counter</p>
                <div className="grid grid-cols-[1fr_64px] items-end gap-4">
                    <div>
                        <p className="text-[72px] leading-[0.85] font-semibold text-text-primary">07</p>
                        <p className="mt-2 text-xl leading-none text-text-secondary">projects</p>
                    </div>
                    <div className="grid grid-cols-[repeat(5,4px)] grid-rows-[repeat(5,4px)] gap-1.5 pb-4">
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                        <span className="size-1 rounded-full bg-signal-100" />
                    </div>
                </div>
            </section>

            <div className="mx-5 h-px bg-border-subtle" />

            <section className="flex min-h-0 flex-1 flex-col">
                <div className="px-6 py-3">
                    <p className="text-[13px] leading-none text-signal-100 uppercase">Signal Listener</p>
                </div>

                <div className="min-h-0 flex-1 overflow-hidden">
                    <article className="grid grid-cols-[40px_1fr_56px] items-center border-y border-border-subtle bg-signal-800/45 px-5 py-2 shadow-[inset_4px_0_0_var(--color-success)]">
                        <svg className="size-7" viewBox="0 0 44 44" aria-hidden="true">
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
                        <svg className="size-7" viewBox="0 0 44 44" aria-hidden="true">
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
                        <svg className="size-7" viewBox="0 0 44 44" aria-hidden="true">
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
                        <svg className="size-7" viewBox="0 0 44 44" aria-hidden="true">
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
                        <svg className="size-7" viewBox="0 0 44 44" aria-hidden="true">
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
                        <svg className="size-7" viewBox="0 0 44 44" aria-hidden="true">
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
                        <svg className="size-7" viewBox="0 0 44 44" aria-hidden="true">
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

                <div className="mx-5 mt-3 mb-4 border border-dashed border-border-subtle px-5 py-3 text-xs leading-5 text-text-muted">
                    Signals are grouped by IAU-style project identifiers and live orbital state.
                </div>
            </section>
        </aside>

        <nav className="panel col-start-2 row-start-1 flex items-center justify-center">
            <div className="grid h-12 w-140 grid-cols-2 border border-border-default text-sm tracking-wide text-text-secondary uppercase">
                <div className="flex items-center justify-center gap-3 bg-signal-700/60 text-text-primary shadow-[inset_0_0_28px_hsl(116_28%_58%/0.28)]">
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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
                    <svg className="size-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <rect x="5" y="4" width="14" height="16" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M9 8h6M9 12h6M9 16h3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Information Gatherer
                </div>
            </div>
        </nav>

        <section className="space relative col-start-2 row-start-2 min-h-0 overflow-hidden">
            <header className="absolute top-5 left-5 z-10">
                <h2 className="text-2xl leading-none text-text-primary">System Peeker</h2>
            </header>

            <SystemPeekerView className="size-full" />
        </section>

        <aside className="panel col-start-3 row-span-2 row-start-1 flex min-h-0 flex-col p-5">
            <header className="flex items-center justify-between">
                <h2 className="text-xl leading-none text-text-primary">Signal Outputer</h2>
                <span className="size-3.5 rounded-full bg-text-secondary" />
            </header>

            <div className="my-4 h-px bg-border-default" />

            <section className="flex items-center gap-5">
                <svg className="size-16 shrink-0" viewBox="0 0 64 64" aria-hidden="true">
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
                <h3 className="mb-2 text-sm text-signal-100 uppercase">Project Information</h3>
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
                <h3 className="mb-3 text-sm text-signal-100 uppercase">Orbit
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
                <h3 className="mb-3 text-sm text-signal-100 uppercase">Latest Note</h3>
                <p className="text-sm leading-5 text-text-primary">Orbit positions are projected against the current
                                                                   Julian Day readout. No significant anomalies detected
                                                                   in this pass.</p>
            </section>
        </aside>

        <footer className="panel col-span-3 col-start-1 row-start-3 grid grid-cols-[310px_1fr_310px] items-center px-5">
            <p className="text-sm text-text-secondary">Anti-Matter Studios / Cydonia</p>
            <p className="justify-self-center text-sm text-text-secondary">7 tracked signals</p>
            <p className="justify-self-end text-sm text-text-secondary">live orbit track /
                                                                        JD <span ref={julianDayRef} /></p>
        </footer>
    </main>;
};
