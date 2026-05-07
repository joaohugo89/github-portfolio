/**
 * GitHub API configuration
 *
 * @description Centralized configuration for GitHub API calls. Change these values
 * to match your GitHub profile. Add a personal access token in .env.local for higher
 * rate limits (5000 req/hr vs 60 req/hr unauthenticated).
 *
 * @example
 * // In .env.local
 * VITE_GITHUB_TOKEN=ghp_your_token_here
 *
 * @example
 * // In src/config.js
 * export default config;
 */
const config = {
  /**
   * Your GitHub username for the API
   * @type {string}
   */
  username: "joaohugo89", // Altere para seu nome de usuário real do GitHub

  /**
   * GitHub personal access token (optional)
   * Higher rate limit: 5,000 req/hr vs 60 req/hr without token
   * Generate at: https://github.com/settings/tokens/new
   * Required scope: public_repo
   * @type {string}
   */
  token: import.meta.env.VITE_GITHUB_TOKEN ?? "",

  /**
   * Number of repos to fetch from the API (max 100 per request)
   * @type {number}
   * @default 100
   */
  perPage: 100,

  /**
   * Sort order for repos: "updated" | "stars" | "name"
   * @type {"updated" | "stars" | "name"}
   * @default "updated"
   */
  sortBy: "updated", // "updated" | "stars" | "name"
};

export default config;