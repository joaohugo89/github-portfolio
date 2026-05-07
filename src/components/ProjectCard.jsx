/**
 * Project card component displaying individual project information
 *
 * Features:
 * - Website preview image
 * - Repo name in user/repo format
 * - Truncated description (2 lines max)
 * - Topic tags as uppercase pills
 * - Star count with star icon
 * - Last updated time using relative formatting
 * - Staggered entrance animation based on index
 * - Two action buttons: Live Site and Source
 */

import React from "react";
import styles from "../styles/ProjectCard.module.css";

/**
 * Format relative time (e.g., "3 days ago")
 */
function formatRelativeTime(date) {
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays === 0) return "today";
  if (diffDays === 1) return "yesterday";
  if (diffDays < 7) return `${diffDays} days ago`;

  return new Intl.RelativeTimeFormat("en-US", {
    numeric: "auto",
  }).format(-diffDays, "day");
}

/**
 * Truncate description
 */
function truncateDescription(text) {
  if (!text) return "";

  const maxLength = 100;

  if (text.length <= maxLength) return text;

  const truncated = text.substring(0, maxLength - 3);
  const lastSpace = truncated.lastIndexOf(" ");

  return truncated.substring(0, lastSpace) + "...";
}

export default function ProjectCard({ repo, index }) {
  const {
    name,
    description,
    topics,
    stargazers_count,
    updated_at,
    html_url,
    homepage,
    preview,
  } = repo;

  return (
    <article
      className={styles.card}
      style={{ animationDelay: `${index * 50}ms` }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = "var(--accent)";
        e.currentTarget.style.transform = "scale(1.01)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = "";
        e.currentTarget.style.transform = "";
      }}
    >
      {/* Website Preview */}
      {preview && (
        <a
          href={homepage}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.previewWrapper}
        >
          <img
            src={preview}
            alt={`${name} preview`}
            className={styles.preview}
            loading="lazy"
          />
        </a>
      )}

      {/* Top bar */}
      <div className={styles.cardHeader}>
        <span className={styles.repoName}>~/ {name}</span>

        {topics.length > 0 && (
          <div className={styles.tags}>
            {topics.map((topic) => (
              <span key={topic} className={styles.tag}>
                {topic.toUpperCase()}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Description */}
      <p className={styles.description}>
        {truncateDescription(description)}
      </p>

      {/* Footer */}
      <div className={styles.cardFooter}>
        <div className={styles.stat}>
          <svg
            className={styles.starIcon}
            viewBox="0 0 16 16"
            fill="currentColor"
          >
            <path d="M8 0L9.4 6H16L11 9.6L12.4 16L8 12.6L3.6 16L5 9.6L0 6H6.6L8 0Z" />
          </svg>

          <span>{stargazers_count}</span>
        </div>

        <span className={styles.updatedTime}>
          {formatRelativeTime(updated_at)}
        </span>
      </div>

      {/* Action buttons */}
      <div className={styles.cardActions}>
        <a
          href={homepage}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.actionButton}
        >
          ↗ Live Site
        </a>

        <a
          href={html_url}
          target="_blank"
          rel="noopener noreferrer"
          className={`${styles.actionButton} ${styles.secondary}`}
        >
          {"</>"} Source
        </a>
      </div>
    </article>
  );
}