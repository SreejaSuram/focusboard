# FocusBoard

A responsive React task-management dashboard built with Vite, JavaScript, CSS and React Hooks.

## Features

- Dashboard statistics calculated from live task state
- Create, read, edit and delete tasks
- Status updates: To do, In progress and Completed
- Case-insensitive task-title search
- Combined status and priority filters
- Three-slide Focus Notes carousel with previous/next and direct indicators
- Browser persistence with `localStorage`
- Responsive desktop, tablet and mobile layouts
- Accessible labels, keyboard-operable controls and visible focus styles

## Technology stack

- React 18
- Vite 6
- JavaScript (ES6+)
- CSS3
- Lucide React icons
- React Hooks (`useState`, `useEffect`, `useMemo`)
- Browser `localStorage`

## Run locally

Requirements: Node.js (LTS recommended) and npm.

```bash
npm install
npm run dev
```

Open the local URL printed by Vite, normally `http://localhost:5173`.

## Production build

```bash
npm run build
npm run preview
```

Vite writes the production build to `dist/`.

## Project structure

```text
focusboard/
├── public/
├── screenshots/
├── src/
│   ├── components/
│   │   ├── FocusNotes.jsx
│   │   ├── Header.jsx
│   │   ├── Sidebar.jsx
│   │   ├── StatCard.jsx
│   │   ├── TaskForm.jsx
│   │   └── TaskList.jsx
│   ├── data/
│   │   └── sampleTasks.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── AI_USAGE.md
├── README.md
├── index.html
├── package.json
└── vite.config.js
```

## State management

The app uses React's built-in Hooks. The task collection is the single source of truth and is held in state through the reusable `useLocalStorage` hook. Create, edit, delete and status changes update that collection. `useMemo` derives the visible tasks from search text, status and priority filters. Dashboard statistics are calculated from the full task collection, not from the filtered view. The carousel keeps its active slide in local component state.

## Persistence

Tasks are stored under the `focusboard_tasks` key in browser `localStorage`. Existing saved tasks are loaded on startup. The six sample tasks are used only when there is no saved value. Changes are synchronised to localStorage by an effect.

To reset to the sample data during development, open browser DevTools → Application → Local Storage → your local site, delete the `focusboard_tasks` key, then refresh.

## Deployment

### Vercel

1. Push this repository to GitHub.
2. Sign in to Vercel and choose **Add New → Project**.
3. Import the `focusboard` repository.
4. Use these settings:
   - Framework preset: Vite
   - Build command: `npm run build`
   - Output directory: `dist`
   - Install command: `npm install`
5. Deploy and open the generated HTTPS URL.

### Netlify

Import the GitHub repository and set build command to `npm run build` and publish directory to `dist`.

## Submission links

- GitHub repository: add your repository URL here after creating it.
- Live application: add your deployed HTTPS URL here after deployment.

## Design note

This implementation follows the written assignment requirements. The supplied reference material says the original Figma file is the visual source of truth, but the Figma URL/file was not included with the written guide. Review spacing, colors, typography and exact slide content against the original Figma before claiming pixel-perfect fidelity.

## Known scope limitations

- This is a single-user, browser-local task manager. It does not use a backend, login system or cloud database, as those are not required by the assignment.
- Focus Notes copy is original placeholder content and should be replaced with the exact slide copy if the Figma design specifies different wording.
- Calendar and Settings are visual navigation items only; they are outside the required feature scope.
