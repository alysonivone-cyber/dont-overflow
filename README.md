# DON'T OVERFLOW! 🦫

**DON'T OVERFLOW!** is a browser-based precision game featuring **Cappy the capybara**. The challenge: fill a container to the target water level without going too low or overflowing.

The game includes **15 worlds and 75 levels** (five levels per world), with progressively varied challenges, animated effects, sound, and saved progress.

## How to play

1. Start the game and choose an unlocked world and level.
2. Use the fill button to start pouring water into the container.
3. Stop at the right moment to aim for the target range.
4. Adapt to the mechanics introduced by each level: time pressure, limited water, inertia, evaporation, obstacles, movement, and other surprises.
5. Earn stars for successful attempts and unlock further levels.

Some levels deliberately change what you can see or how the water behaves. Watch the level instructions carefully!

## Features

- **15 worlds / 75 levels** with different challenges.
- Different container shapes and target zones.
- Timed levels, changing flow speed, limited reserves, inertia, and evaporation.
- Interactive obstacles and character-based events, including frogs and warriors.
- Animated results, sound effects, background music, and a capybara-themed presentation.
- Local progress saving in the browser, including earned stars and unlocked content.

## Technology

- **React 19** and **TypeScript** for the application and gameplay interface.
- **Vite 8** for local development and production builds.
- **Vitest 5** for automated tests.
- **React Testing Library** and **jsdom** for component interaction tests.
- **Oxlint** for static lint checks.
- CSS for interface layout, styling, and animations.

## Getting started

### Requirements

Install a recent version of **Node.js** compatible with Vite 8 (Node.js 20.19+ or 22.12+).

### Installation

From the project root:

```bash
npm install
npm run dev
```

Open the local address shown in the terminal (typically `http://localhost:5173`).

**Windows PowerShell:** if `npm` is blocked by your execution policy, use `npm.cmd` instead, for example `npm.cmd run dev`.

## Quality checks

```bash
npm run test
npm run lint
npm run build
npm audit
```

The production build is written to the `dist/` directory. To preview it locally:

```bash
npm run preview
```

## Project structure

```text
src/
  assets/            Images, audio, and other media
  components/        Game screens and reusable UI components
    UI/              Controls and informational panels
    WorldSelection/  World map and level checklist
  game/              Level configuration, gameplay calculations,
                     progress persistence, sounds, and unit tests
  App.tsx            Main game orchestration and transitions
  App.css            Main game styles
```

## Notes

- Progress is saved locally in the browser; it is not synced across devices.
- The project is a browser game and does not require an account or backend server to play.
- Keep the `src/assets/` files and other public assets when copying or deploying the project.

## Project status

Educational game project. Gameplay logic and React component interactions are covered by automated tests; visual behavior and complete playthroughs should also be checked manually before release.
