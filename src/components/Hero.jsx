/**
 * Hero section displaying username, tagline, and project count
 *
 * Features:
 * - Animated count-up for the project counter
 * - Subtle grid background pattern
 * - Editorial typography hierarchy
 *
 * @param {Object} props - Component props
 * @param {string} props.username - GitHub username to display
 * @param {number} props.projectCount - Number of live projects
 * @returns {JSX.Element}
 */
import React, { useState, useEffect } from "react";
import styles from "../styles/Hero.module.css";

export default function Hero({ username, projectCount }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let current = 0;
    const increment = Math.ceil(projectCount / 40);
    const duration = 2000;
    const stepTime = duration / 40;

    const timer = setInterval(() => {
      current += increment;
      if (current >= projectCount) {
        setCount(projectCount);
        return;
      }
      setCount(current);
    }, stepTime);

    return () => clearInterval(timer);
  }, [projectCount]);

  return (
    <header className={styles.hero}>
      {/* Subtle grid background pattern */}
      <div className={styles.gridBackground} />

      <div className={styles.content}>
        <h1 className={styles.greeting}>Hi, I'm <span className={styles.username}>{username}</span></h1>
        <p className={styles.tagline}>open source work, live on the web</p>

        <div className={styles.stats}>
          <span className={styles.countValue}>{count}</span>
          <span className={styles.countLabel}>LIVE PROJECTS</span>
        </div>
      </div>
    </header>
  );
}