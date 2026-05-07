/**
 * Custom hook for fetching GitHub repositories with GitHub Pages
 * and live website previews using Microlink screenshots.
 */

import { useState, useEffect } from "react";
import config from "../config.js";

/**
 * Fetch all public repositories
 */
async function fetchRepos(username, token, perPage, sortBy) {
  const headers = {
    Accept: "application/vnd.github.v3+json",
  };

  if (token) {
    headers.Authorization = `token ${token}`;
  }

  const response = await fetch(
    `https://api.github.com/users/${username}/repos?per_page=${perPage}&sort=${sortBy}`,
    { headers }
  );

  if (!response.ok) {
    if (response.status === 403) {
      throw new Error(
        "GitHub API rate limit exceeded. Add a personal access token to .env.local."
      );
    }

    throw new Error(
      `GitHub API error: ${response.status} ${response.statusText}`
    );
  }

  return response.json();
}

/**
 * Generate GitHub Pages URL
 */
function getGitHubPagesUrl(repo) {
  // Special case: username.github.io
  if (repo.name === `${repo.owner.login}.github.io`) {
    return `https://${repo.owner.login}.github.io/`;
  }

  return `https://${repo.owner.login}.github.io/${repo.name}/`;
}

/**
 * Fetch website screenshot from Microlink
 */
async function getWebsitePreview(url) {
  try {
    const response = await fetch(
      `https://api.microlink.io/?url=${encodeURIComponent(
        url
      )}&screenshot=true&meta=false`
    );

    const data = await response.json();

    return data?.data?.screenshot?.url || null;
  } catch {
    return null;
  }
}

/**
 * Main hook
 */
export function useGitHubRepos() {
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const retry = async () => {
    setLoading(true);
    setError(null);

    try {
      const reposData = await fetchRepos(
        config.username,
        config.token,
        config.perPage,
        config.sortBy
      );

      /**
       * Filter repositories with GitHub Pages enabled
       */
      const candidateRepos = reposData.filter(
        (repo) => repo.has_pages
      );

      /**
       * Generate screenshots in parallel
       */
      const liveRepos = await Promise.all(
        candidateRepos.map(async (repo) => {
          const homepage =
            repo.homepage || getGitHubPagesUrl(repo);

          const preview = await getWebsitePreview(homepage);

          return {
            id: repo.id,
            name: repo.name,
            description: repo.description,
            topics: repo.topics || [],
            stargazers_count: repo.stargazers_count,
            updated_at: repo.updated_at,
            html_url: repo.html_url,
            homepage,
            preview,
          };
        })
      );

      setRepos(liveRepos);
    } catch (err) {
      setError(err.message);
      setRepos([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    retry();
  }, []);

  return {
    repos,
    loading,
    error,
    retry,
  };
}