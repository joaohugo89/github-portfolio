# Claude Code Project Guide

## Project Overview

This is a React portfolio website built with Vite that automatically fetches and displays GitHub projects with active GitHub Pages deployments.

**Primary Goal:** Show only repos that are actually live on the web, filtered via the GitHub Pages API.

**Current Status:** Complete with all components, hooks, styling, and documentation.

## Key Technical Decisions

### API Strategy: Two-Phase Fetch

```javascript
// Phase 1: Get all repos
GET https://api.github.com/users/{username}/repos

// Phase 2: Parallel Pages checks for each repo
GET https://api.github.com/repos/{owner}/{repo}/pages

// Only keep repos with status === "built"
```

**Why `Promise.allSettled` instead of `Promise.all`:**
- Allows individual Page check failures without breaking the entire fetch
- Better UX: shows partial results even if some repos don't have Pages
- Handles rate limits gracefully without cascading errors

### Styling: CSS Modules + Custom Properties

- **CSS Variables** in `global.css` for consistent theming
- **CSS Modules** for component-specific styles (avoiding global scope pollution)
- **No UI libraries** for maximum control and small bundle size

### Animation Strategy

- Staggered entrance using `animation-delay = index * 50ms`
- CSS keyframes for simple, performant animations
- No external animation libraries

## File Responsibilities

### Configuration
- `src/config.js`: Centralized API settings with JSDoc

### Hooks
- `src/hooks/useGitHubRepos.js`: Custom hook for data fetching

### Components
- `src/components/Hero.jsx`: Hero section with stats
- `src/components/FilterBar.jsx`: Topic filtering UI
- `src/components/ProjectCard.jsx`: Individual card component
- `src/components/ProjectGrid.jsx`: Grid layout
- `src/components/SkeletonCard.jsx`: Loading state
- `src/components/ErrorState.jsx`: Error handling UI

### Styles
- `src/styles/global.css`: Root styles and CSS variables
- Component-specific CSS modules

### Documentation
- `README.md`: User-facing documentation
- `CLAUDE.md`: Developer guide (this file)

## Development Notes

### Adding a New Repo to Display

1. Ensure the repo has GitHub Pages enabled
2. Commit and push to the default branch
3. Wait for Pages to build (status becomes "built")
4. Refresh the portfolio

### Customizing the Design

Edit CSS variables in `global.css`:

```css
:root {
  --bg: #0a0a0a;
  --surface: #111111;
  --border: #2a2a2a;
  --accent: #e8ff47;
  --accent2: #ff4757;
  --text: #e0e0e0;
  --text-muted: #666;
}
```

### Deployment Checklist

- [ ] Configure `vite.config.js` with correct base path
- [ ] Add `gh-pages` to devDependencies
- [ ] Add deploy script to package.json
- [ ] Create `.env.local` with VITE_GITHUB_TOKEN
- [ ] Configure `src/config.js` with your username
- [ ] Run `npm run deploy`
- [ ] Enable Pages in GitHub repo settings

## Known Limitations

- Only displays repos with GitHub Pages enabled
- Requires Node.js 18+
- No authentication support (all repos are public)
- Pages must be deployed on default branch for visibility

## Future Enhancements

- [ ] Add project category filtering
- [ ] Search functionality
- [ ] Load more infinite scroll
- [ ] Favicon customization
- [ ] SEO meta tags for each project
- [ ] Dark/light mode toggle