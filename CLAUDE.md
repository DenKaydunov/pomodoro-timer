# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A Pomodoro Timer web application built with Node.js and Tailwind CSS. The project uses modern web development practices with separate source and distribution directories.

**Language**: Russian (UI text, comments, README)

## Development Commands

```bash
# Install dependencies
npm install

# Development mode (with watch)
npm run dev

# Build for production (minified CSS)
npm run build
```

## Running the Application

1. Install dependencies: `npm install`
2. Build the CSS: `npm run build`
3. Open `dist/index.html` in any modern browser

For development with auto-rebuild: `npm run dev` and open `dist/index.html`

## Project Structure

```
├── src/
│   ├── index.html       # Main HTML file with Tailwind classes
│   ├── input.css        # Tailwind directives and custom styles
│   └── app.js           # Application logic
├── dist/                # Generated on build (not in git)
│   ├── index.html       # Copied from src/
│   ├── output.css       # Generated Tailwind CSS
│   └── app.js           # Copied from src/
├── tailwind.config.js   # Tailwind configuration with custom colors
└── package.json         # Dependencies and scripts
```

**Note:** The entire `dist/` directory is gitignored and generated during build.

## Architecture

### State Management

Application state is managed via a single `state` object in `src/app.js`:
- `mode`: Current mode ('pomodoro', 'short-break', 'long-break')
- `isRunning`: Boolean tracking timer state
- `timeLeft`: Remaining seconds in current session
- `totalTime`: Total seconds for current mode (used for progress bar)
- `pomodoroCount`: Number of completed work sessions
- `timerInterval`: setInterval reference

Time durations are defined in `TIME_SETTINGS`:
- pomodoro: 25 minutes (1500 seconds)
- short-break: 5 minutes (300 seconds)
- long-break: 15 minutes (900 seconds)

### Core Functions (src/app.js)

- `updateDisplay()`: Updates timer display, progress bar, and page title
- `startTimer()`: Starts countdown, toggles to pause if already running
- `pauseTimer()`: Pauses countdown and clears interval
- `resetTimer()`: Resets to current mode's default time
- `switchMode(mode)`: Changes mode, updates Tailwind classes for gradients
- `getModeClasses(mode)`: Returns Tailwind gradient classes for mode
- `onTimerComplete()`: Handles timer completion - plays sound, shows notification, auto-switches modes (every 4th pomodoro triggers long break)

### Tailwind Configuration

Custom colors defined in `tailwind.config.js`:
- `pomodoro`: Red gradient (light: #e74c3c, dark: #c0392b)
- `short-break`: Green gradient (light: #27ae60, dark: #229954)
- `long-break`: Blue gradient (light: #3498db, dark: #2980b9)

Background gradients applied via Tailwind utility classes:
- Pomodoro: `from-red-500 to-red-700`
- Short break: `from-green-500 to-green-700`
- Long break: `from-blue-500 to-blue-700`

### Browser APIs Used

- **Web Audio API**: `AudioContext`, oscillator for beep sound generation
- **Notifications API**: Browser notifications when timer completes
- **setInterval**: Timer countdown mechanism

### Keyboard Shortcuts

Implemented in `src/app.js`:
- `Space`: Start/pause timer
- `R`: Reset timer

## Making Changes

### UI Changes
- Edit `src/index.html` for structure changes
- Use Tailwind utility classes for styling
- Run `npm run build` to regenerate dist/

### Logic Changes
- Edit `src/app.js` for application logic
- Run `npm run build` to copy to dist/

### Style Changes
- Add custom CSS to `src/input.css` using `@layer utilities`
- Modify `tailwind.config.js` for theme customization
- Run `npm run build` to regenerate output.css

### Time Duration Changes
- Modify `TIME_SETTINGS` object in `src/app.js`

## Testing

No automated tests. Manual testing checklist:
1. Run `npm run build` and open `dist/index.html`
2. Verify timer displays "25:00"
3. Click "Старт" (Start), verify countdown begins
4. Test keyboard shortcuts (Space, R)
5. Test mode switching between three modes
6. Let timer complete, verify:
   - Sound plays
   - Notification appears (requires permission)
   - Auto-switches to break mode
   - Pomodoro count increments (work mode only)
7. Complete 4 pomodoros, verify long break triggers
8. Test responsive design on mobile viewport

## Dependencies

- **tailwindcss** (v3.x): Utility-first CSS framework
- **postcss**: CSS transformation tool (Tailwind dependency)
- **autoprefixer**: Adds vendor prefixes (Tailwind dependency)

## Notes

- Notification permission requested on first load
- Progress bar animates via inline width percentage style
- Timer continues countdown even when page is in background (setInterval behavior)
- No data persistence - pomodoro count resets on page reload
- Entire `dist/` directory is gitignored and regenerated on each build
- Always run `npm run build` before opening the app after making changes
