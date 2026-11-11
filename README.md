# web-calculator

A React calculator simulator built with Vite. Operations evaluate left to right
(`2 + 3 * 4 = 20`), division by zero shows `Error` (press `C` to recover), and
results are rounded to avoid float noise (`0.1 + 0.2 = 0.3`). Keyboard input is
also supported (digits, `+ - * /`, `Enter`/`=`, `Esc`/`c` to clear, `%`).

## Run

```bash
npm install
npm run dev
```

## Test

```bash
npm test
```

## Build

```bash
npm run build     # output in dist/
npm run preview   # serve the production build
```

## Layout

- `src/calc.js` – pure arithmetic and key handling (no React)
- `src/App.jsx` – UI
