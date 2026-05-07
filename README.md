# GitHub Portfolio

A dark editorial portfolio website that automatically fetches your GitHub projects with active GitHub Pages deployments. Built with React + Vite.

![Portfolio Screenshot](./docs/screenshot.png)

## Features

- ✨ Auto-fetches repos from your GitHub profile
- 🚀 Only displays repos with live GitHub Pages deployments
- 🎨 Dark editorial aesthetic with brutalist grid layout
- ⚡ 60 req/hr rate limit support via personal access token
- 📱 Fully responsive design (1-3 column grid)
- 🎭 Staggered entrance animations for cards
- 🔥 Real-time star counts and relative time updates
- 🖼️ Website preview images for each project
- 🔄 Auto-retry on error
- ⚡ Optimized performance with Vite
- 🔒 Secure environment variable handling

## Prerequisites

- Node.js 18+ (use nvm for easy version management)
- A GitHub account (to generate a personal access token)

## Setup

1. **Clone and install dependencies:**

```bash
cd github-portfolio
npm install
```

2. **Configure your GitHub settings:**

Create `.env.local` in the project root:

```env
VITE_GITHUB_TOKEN=ghp_your_token_here
```

> **Important:** Get your token from [GitHub Settings → Developer settings → Personal access tokens → Tokens (classic)](https://github.com/settings/tokens/new)
> - Select `public_repo` scope
> - Create token and add it to `.env.local`
> - Without token: 60 requests/hour (unauthenticated)

3. **Configure `src/config.js`:**

```js
const config = {
  username: "YOUR_GITHUB_USERNAME", // Replace with your GitHub username
  token: import.meta.env.VITE_GITHUB_TOKEN ?? "",
  perPage: 100,
  sortBy: "updated", // "updated" | "stars" | "name"
};
export default config;
```

4. **Start development server:**

```bash
npm run dev
```

> **Note:** `.env.local` is automatically excluded from git. Never commit it to your repository.

## Project Structure

```
github-portfolio/
├── src/
│   ├── components/      # React components
│   │   ├── Hero.jsx         # Hero section with stats
│   │   ├── FilterBar.jsx    # Topic filter component
│   │   ├── ProjectCard.jsx  # Individual project card
│   │   ├── ProjectGrid.jsx  # Grid layout for projects
│   │   ├── SkeletonCard.jsx # Loading skeleton
│   │   ├── ErrorState.jsx   # Error display component
│   │   └── EmptyState.jsx   # Empty state component
│   ├── hooks/           # Custom React hooks
│   │   └── useGitHubRepos.js # Fetches repos with Pages checks
│   ├── styles/          # CSS modules
│   │   ├── global.css        # Global styles & CSS variables
│   │   ├── App.module.css    # App-specific styles
│   │   ├── Hero.module.css   # Hero section styles
│   │   ├── FilterBar.module.css
│   │   ├── ProjectCard.module.css
│   │   ├── ProjectGrid.module.css
│   │   └── Skeleton.module.css
│   ├── config.js        # GitHub API configuration
│   ├── App.jsx          # Main app component
│   └── main.jsx         # Entry point
├── docs/                # Documentation
│   ├── DEVELOPMENT.md   # Detailed development guide
│   ├── OPTIMIZATION.md  # Code optimization documentation
│   └── README.md        # This file
├── .env.local.example   # Environment variables template
├── .gitignore          # Git ignore rules
├── vite.config.js      # Vite configuration
├── package.json        # Project dependencies & scripts
└── README.md           # This file
```

See [DEVELOPMENT.md](./docs/DEVELOPMENT.md) for detailed architecture and component documentation.

## Deploying to GitHub Pages

1. **Configure base path in `vite.config.js`:**

```js
export default defineConfig({
  base: "/your-username/", // Replace with your GitHub username
  // ...
});
```

2. **Build the project:**

```bash
npm run build
```

3. **Enable Pages in GitHub repo:**
   - Go to **Settings** → **Pages**
   - **Source**: Deploy from a branch
   - **Branch**: `gh-pages` → `/ (root)`
   - Click **Save**

## Configuration Reference

| Property | Type | Default | Description |
|----------|------|---------|-------------|
| `username` | `string` | - | Your GitHub username |
| `token` | `string` | `""` | Personal access token (unauth: 60 req/hr, token: 5000 req/hr) |
| `perPage` | `number` | `100` | Number of repos to fetch (max 100) |
| `sortBy` | `"updated" \| "stars" \| "name"` | `"updated"` | Sort repos by: last update, stars, or name |

## Rate Limits

### Unauthenticated (No Token)
- **60 requests/hour** for unauthenticated API calls
- Recommended for small portfolios (fewer than 100 repos)

### Authenticated (With Token)
- **5,000 requests/hour** for authenticated requests
- Required for: larger portfolios, frequent refreshes, or avoiding rate limit errors
- Generate token at: https://github.com/settings/tokens/new
- Required scopes: `public_repo`

## API Strategy

The portfolio uses a **two-phase fetch strategy**:

1. **List repos**: Fetch all repos from `GET /users/{username}/repos`
2. **Parallel Pages checks**: For each repo, check Pages status in parallel
3. **Filter**: Only keep repos where `data.status === "built"`

This approach ensures we only display repos with live Pages deployments.

### Why This Approach?

- **Efficiency**: Parallel checks are faster than sequential
- **Resilience**: `Promise.allSettled()` handles failures gracefully
- **Accuracy**: Only shows projects with active deployments
- **User Experience**: Clearer feedback about available projects

See [DEVELOPMENT.md](./docs/DEVELOPMENT.md#hooks) for more details on the API strategy.

## Documentation

- [DEVELOPMENT.md](./docs/DEVELOPMENT.md) - Architecture, components, and development guide
- [OPTIMIZATION.md](./docs/OPTIMIZATION.md) - Code optimizations and performance improvements
- [API Reference](./docs/DEVELOPMENT.md#api-strategy) - Detailed API strategy documentation

## Contributing

This is a personal portfolio template. Feel free to fork and customize!

## License

MIT