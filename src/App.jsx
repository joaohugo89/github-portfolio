/**
 * Main application component
 *
 * Orchestrates all child components and manages application state:
 * - Fetches and filters GitHub repos
 * - Manages topic filtering
 * - Handles loading, error, and empty states
 * - Sets dynamic title and meta description
 *
 * @returns {JSX.Element} Main app layout
 */
import React, { useState, useEffect } from "react";
import { useGitHubRepos } from "./hooks/useGitHubRepos.js";
import config from "./config.js";
import Hero from "./components/Hero.jsx";
import FilterBar from "./components/FilterBar.jsx";
import ProjectGrid from "./components/ProjectGrid.jsx";
import SkeletonCard from "./components/SkeletonCard.jsx";
import ErrorState from "./components/ErrorState.jsx";
import EmptyState from "./components/EmptyState.jsx";
import styles from "./styles/App.module.css";

export default function App() {
  const { repos, loading, error, retry } = useGitHubRepos();
  const [activeFilter, setActiveFilter] = useState("ALL");

  const allTopics = Array.from(
    new Set(repos.flatMap((repo) => repo.topics))
  );

  const filteredRepos =
    activeFilter === "ALL"
      ? repos
      : repos.filter((repo) => repo.topics.includes(activeFilter));

  useEffect(() => {
    document.title = `${repos.length} Live Projects | GitHub Portfolio`;
    const description =
      "Browse my open source work deployed on GitHub Pages. Live demos and source code for all my projects.";
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute("content", description);
  }, [repos.length]);

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  return (
    <main className={styles.app}>
      <Hero
        username={repos[0]?.owner?.login || config.username}
        projectCount={repos.length}
      />

      {/* Filter bar */}
      <FilterBar
        topics={allTopics}
        activeFilter={activeFilter}
        onFilterChange={handleFilterChange}
      />

      {/* Content area */}
      <div className={styles.content}>
        {loading && (
          <div className={styles.grid}>
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <SkeletonCard key={i} />
            ))}
          </div>
        )}

        {!loading && error && (
          <ErrorState
            error={error}
            onRetry={retry}
            isRateLimit={error.includes("Rate limit")}
          />
        )}

        {!loading && !error && filteredRepos.length === 0 && (
          <EmptyState />
        )}

        {!loading && !error && filteredRepos.length > 0 && (
          <ProjectGrid
            repos={filteredRepos}
            itemCount={filteredRepos.length}
            onRetry={retry}
          />
        )}
      </div>
    </main>
  );
}