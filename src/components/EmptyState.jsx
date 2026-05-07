/**
 * Empty state component when no repos are available
 *
 * Displays when:
 * - All repos are filtered out
 * - No repos have live Pages deployments
 * - API returns empty results
 *
 * @param {Object} props - Component props
 * @returns {JSX.Element}
 */
import React from "react";
import styles from "../styles/EmptyState.module.css";

export default function EmptyState() {
  return (
    <section className={styles.emptyState}>
      <div className={styles.emptyIcon}>📭</div>
      <h2 className={styles.emptyTitle}>No Live Projects</h2>
      <p className={styles.emptyMessage}>
        No repositories with active GitHub Pages deployments were found.
      </p>
      <p className={styles.emptySubMessage}>
        Make sure your repos are public and have Pages enabled.
      </p>
    </section>
  );
}