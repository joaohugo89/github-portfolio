/**
 * Skeleton loading state for project cards
 *
 * Features:
 * - Animated shimmer effect using gradient sweep
 * - Mimics card dimensions for seamless transitions
 * - Includes website preview placeholder
 */

import React from "react";
import styles from "../styles/Skeleton.module.css";

export default function SkeletonCard() {
  return (
    <article className={styles.skeletonCard}>
      {/* Website preview placeholder */}
      <div className={styles.skeletonPreview} />

      {/* Top bar: repo name placeholder */}
      <div className={styles.skeletonHeader}>
        <div className={styles.skeletonRepoName} />

        <div className={styles.skeletonTags}>
          <div className={styles.skeletonTag} />
          <div className={styles.skeletonTag} />
        </div>
      </div>

      {/* Description placeholder */}
      <div className={styles.skeletonDescription} />

      {/* Stats placeholders */}
      <div className={styles.skeletonStats}>
        <div className={styles.skeletonStar} />
        <div className={styles.skeletonTime} />
      </div>

      {/* Action buttons placeholders */}
      <div className={styles.skeletonActions}>
        <div className={styles.skeletonButton} />
        <div className={`${styles.skeletonButton} ${styles.secondary}`} />
      </div>
    </article>
  );
}