/**
 * Project grid component rendering multiple project cards
 *
 * Handles responsive grid layout:
 * - 3 columns on desktop (>= 1024px)
 * - 2 columns on tablet (>= 640px)
 * - 1 column on mobile
 *
 * @param {Object} props - Component props
 * @param {Array} props.repos - Array of repo objects
 * @param {number} props.itemCount - Number of grid items (for animation delay calculation)
 * @param {Function} props.onRetry - Retry callback
 * @returns {JSX.Element}
 */
import React from "react";
import ProjectCard from "./ProjectCard.jsx";
import SkeletonCard from "./SkeletonCard.jsx";
import styles from "../styles/ProjectGrid.module.css";

export default function ProjectGrid({ repos, itemCount, onRetry }) {
  /**
   * Calculate columns based on viewport width
   * @returns {string} Grid columns value
   */
  const getColumns = () => {
    if (window.innerWidth >= 1024) return "repeat(3, 1fr)";
    if (window.innerWidth >= 640) return "repeat(2, 1fr)";
    return "1fr";
  };

  // Initialize columns on mount
  React.useEffect(() => {
    const handleResize = () => {
      const root = document.documentElement;
      root.style.setProperty("--grid-columns", getColumns());
    };

    // Set initial value
    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <section className={styles.grid} style={{ "--grid-columns": getColumns() }}>
      {repos.map((repo, index) => (
        <ProjectCard
          key={repo.name}
          repo={repo}
          index={index}
          onRetry={onRetry}
        />
      ))}
    </section>
  );
}