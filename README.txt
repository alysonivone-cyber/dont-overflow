DON'T OVERFLOW! — Step 07: React component interaction tests

1. In your existing project folder (where package.json is), run in PowerShell:
   npm.cmd install -D @testing-library/react jsdom

2. Copy ONLY the two .test.tsx files from this ZIP into the corresponding existing folders:
   src/components/UI/FillButton.test.tsx
   src/components/GameOutcomeScreen.test.tsx
   Do not replace any existing game component.

3. Run:
   npm.cmd run test
   npm.cmd run lint
   npm.cmd run build

These 9 tests check the button states and navigation callbacks, NOT the full App.tsx timer/inertia/evaporation transitions or persistence. Those require additional integration tests.
