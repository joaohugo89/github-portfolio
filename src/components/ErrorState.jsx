/**
 * Error state component for API errors and rate limits
 *
 * Displays distinct UI for:
 * - Rate limit exceeded errors (403) with token instructions
 * - Generic API errors with retry button
 * - Empty state when no repos are available
 *
 * @param {Object} props - Component props
 * @param {string} props.error - Error message to display
 * @param {Function} props.onRetry - Retry callback
 * @param {boolean} props.isRateLimit - Whether error is rate limit related
 * @returns {JSX.Element}
 */
import React from "react";
import styles from "../styles/ErrorState.module.css";

export default function ErrorState({ error, onRetry, isRateLimit = false }) {
  /**
   * Get error message based on rate limit status
   * @returns {string} Formatted error message
   */
  const getErrorMessage = () => {
    if (isRateLimit) {
      return (
        <div className={styles.rateLimitMessage}>
          <h2 className={styles.errorTitle}>Rate Limit Exceeded</h2>
          <p className={styles.errorMessage}>
            You've hit GitHub's API rate limit. To fetch more repos, add a personal access token to your .env.local file.
          </p>
          <a
            href="https://github.com/settings/tokens/new"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.tokenLink}
          >
            Get a token →
          </a>
        </div>
      );
    }

    return (
      <div className={styles.genericMessage}>
        <h2 className={styles.errorTitle}>Error Loading Projects</h2>
        <p className={styles.errorMessage}>{error}</p>
      </div>
    );
  };

  return (
    <section className={styles.errorState}>
      {getErrorMessage()}
      <button
        className={styles.retryButton}
        onClick={onRetry}
        type="button"
      >
        Retry
      </button>
    </section>
  );
}