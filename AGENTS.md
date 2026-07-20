# Cydonia agent rules

These instructions apply to every AI agent working anywhere in this repository.
A nested `AGENTS.md` may add area-specific constraints but must not weaken these
rules unless the user explicitly approves an exception for the current task.

## Project and authorship

Cydonia is an owner-built, interactive portfolio presented as a small solar
system. The repository is being rewritten deliberately so the owner can make
and understand the important implementation and architecture decisions.

- Default to acting as a collaborator, teacher, and reviewer. Inspect the code,
  explain it, discuss trade-offs, propose small examples, and review changes.
- Do not write or rewrite production application code unless the user explicitly
  asks for implementation. A broad product goal or discussion is not permission
  to implement it.
- When implementation is requested, make only the requested change and leave
  adjacent work for the owner. Explain any non-obvious decision in the handoff.
- Treat the existing application as a reference, not as a contract. Preserve it
  unless a task authorizes a change, but you shall not reproduce its architecture 
  or behaviour automatically during the rewrite.
- Use `docs/GUIDELINES.md` for product and technical direction and
  `docs/MOODBOARD.md` for art-direction boundaries. Surface conflicts or stale
  guidance instead of silently choosing one interpretation.

## Change discipline

- Inspect the affected area and search for relevant existing code before
  proposing or making a change.
- Make the smallest coherent change that completely satisfies the request.
- Do not perform repository-wide rewrites, broad formatting, mass renames,
  dependency migrations, or unrelated cleanup without explicit approval.
- Do not delete or replace existing work merely because the eventual goal is a
  rewrite. Confirm the exact slice being replaced.
- Do not mix opportunistic improvements into focused work. Record them as
  follow-up suggestions instead.
- Do not add a production dependency without explaining why the existing stack
  is insufficient and receiving explicit approval.
- Preserve user changes in a dirty worktree. Never revert or overwrite work that
  is outside the requested scope.

## Stack and source boundaries

The checked-in configuration and `package.json` are the source of truth for
exact versions and commands. The intended stack is Bun, strict TypeScript,
React, Vite, Three.js, Tailwind CSS, Storybook, Vitest, and Playwright.

- Keep orbital mathematics, time conversion, deterministic generation, and
  other domain logic independent of React and Three.js whenever practical.
- Keep rendering code behind a narrow boundary. React owns interface and
  lifecycle integration; Three.js owns the scene, camera, GPU resources, and
  frame rendering.
- Keep presentation components focused on rendering already-shaped data and
  emitting user intent. Put orchestration in focused hooks or domain modules.
- Isolate browser APIs, network access, storage, time, randomness, and animation
  frames at explicit boundaries.
- Validate external and generated data before it enters domain or simulation
  state. Preserve its source, units, epoch, and generation metadata.
- Use real astronomical data when it is available. Never silently substitute a
  visually convenient orbit or value for a factual one.
- Keep generated data reproducible. Generation commands must be deterministic
  where possible and must not hand-edit generated outputs without updating their
  source or generator.
- Keep reusable modules capability-focused. Avoid catch-all `utils`, `helpers`,
  or `common` modules and avoid circular dependencies.
- Do not introduce a new architectural layer, state library, or abstraction for
  one speculative use. Extract shared behaviour only when reuse is real.

## TypeScript and implementation style

- Name new files with `kebab-case`, except for ecosystem-mandated filenames.
- Prefer immutable data, pure functions, explicit inputs, and explicit return
  values. Never mutate an input unless the API requires it and the mutation is
  documented.
- Prefer function declarations for named operations. Arrow functions are fine
  for short callbacks and established React patterns.
- Prefer `interface` for object contracts. Use `type` when expressing unions,
  intersections, mapped types, branded primitives, or other contracts that an
  interface cannot express clearly.
- Keep control flow shallow with guard clauses and small named operations.
- Keep modules cohesive. Treat 100-200 lines as a prompt to reconsider a file,
  not as a hard limit; JSX, shaders, schemas, and renderer adapters may naturally
  be larger.
- Document exported domain APIs and non-obvious lifecycle, unit, ownership, or
  side-effect contracts. Do not add comments that merely restate the code.
- Framework-shaped object-oriented or mutable code is acceptable at the Three.js
  and browser boundaries. Keep calculations and domain decisions functional.
- Dispose of Three.js and browser resources explicitly, including renderers,
  geometries, materials, textures, observers, listeners, and animation frames.
- Keep simulation behaviour deterministic and frame-rate independent. State
  units and time scales in names or types rather than relying on convention.

## UI, interaction, and accessibility

- The interactive solar-system view is the primary product, not a decorative
  background for a conventional landing page.
- Reusable UI components should receive narrow props and expose user intent
  through callbacks. Keep data fetching and simulation rules out of views.
- Add or update a Storybook story when a reusable component's public visual API
  changes. Cover only meaningful applicable states, interactions, and viewport
  sizes.
- Preserve keyboard access and accessible names for every interaction that has a
  pointer or canvas-driven path. Provide a non-canvas route to essential project
  information.
- Respect `prefers-reduced-motion`. Audio must remain opt-in after a user gesture
  and have obvious mute and volume controls.
- Treat mobile layouts and WebGL capability or failure states as first-class
  behaviour, not later polish.
- Do not copy the visual, audio, textual, or interaction assets of the projects
  cited as inspiration. Reinterpret principles in Cydonia's own language.

## Tests and verification

- Match verification to the change. Documentation-only edits do not require
  application tests; behaviour changes require relevant automated coverage.
- Unit test domain logic, especially orbit propagation, time and unit conversion,
  deterministic generation, schema normalization, and failure cases.
- Test React behaviour through observable output and interaction rather than
  implementation details. Add accessibility checks where applicable.
- Test renderer calculations outside WebGL when possible. Use browser-level
  smoke or visual tests for behaviour that genuinely depends on canvas, shaders,
  resizing, input, or GPU resource lifecycle.
- Use Playwright for complete user-visible routes once those routes exist. Keep
  tests deterministic, unattended, and based on synthetic or approved data.
- Never weaken a rule, suppress a warning, skip a test, or update a snapshot
  blindly to make verification pass.
- After an implementation change, run the narrowest relevant Vitest tests,
  ESLint, Prettier check, and TypeScript check. Run affected Storybook or
  Playwright checks when the change crosses those boundaries.
- If a configured command is missing, broken, or cannot run, report the exact
  command and failure. Do not claim the change is fully verified.

## Agent handoff and review

- Summarize only what changed, the checks actually run, and known remaining
  risks or decisions.
- Distinguish implementation from examples or pseudocode so ownership is clear.
- During review, prioritize correctness, simulation and unit errors, resource
  leaks, accessibility regressions, missing meaningful coverage, and violations
  of the authorship boundary.
- Do not present optional style preferences as correctness findings.
