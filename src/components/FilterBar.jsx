/**
 * Filter bar component for topic filtering
 *
 * Collects unique topics from all repos and renders them as toggleable pills.
 * The "ALL" filter is always first and clears all active filters.
 *
 * @param {Object} props - Component props
 * @param {string[]} props.topics - Array of unique topics from all repos
 * @param {string} props.activeFilter - Currently selected topic (or "ALL")
 * @param {Function} props.onFilterChange - Callback when filter changes
 * @returns {JSX.Element}
 */
import React from "react";
import styles from "../styles/FilterBar.module.css";

export default function FilterBar({ topics, activeFilter, onFilterChange }) {
  const renderAllFilter = () => (
    <button
      className={`${styles.filterButton} ${activeFilter === "ALL" ? styles.active : ""}`}
      onClick={() => onFilterChange("ALL")}
    >
      ALL
    </button>
  );

  return (
    <nav className={styles.filterBar}>
      {renderAllFilter()}
      {topics.map((topic) => (
        <button
          key={topic}
          className={`${styles.filterButton} ${activeFilter === topic ? styles.active : ""}`}
          onClick={() => onFilterChange(topic)}
        >
          {topic.toUpperCase()}
        </button>
      ))}
    </nav>
  );
}