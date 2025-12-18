import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './hero-section.module.css';

function HeroSection() {
  const { siteConfig } = useDocusaurusContext();

  return (
    <div className={clsx(styles.hero, styles.heroInner)}>
      <div className={styles.backgroundPattern}></div>
      <div className={styles.heroContent}>
        <div className={styles.heroIcon}>
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="64" height="64" className={styles.robotIcon}>
            <path d="M20 9V7c0-1.1-.9-2-2-2h-3c0-1.66-1.34-3-3-3S9 3.34 9 5H6c-1.1 0-2 .9-2 2v2c-1.66 0-3 1.34-3 3s1.34 3 3 3v4c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-4c1.66 0 3-1.34 3-3s-1.34-3-3-3zM7.5 11.5c0-.83.67-1.5 1.5-1.5s1.5.67 1.5 1.5S9.83 13 9 13s-1.5-.67-1.5-1.5zM16.5 9.5c0 .83-.67 1.5-1.5 1.5s-1.5-.67-1.5-1.5.67-1.5 1.5-1.5 1.5.67 1.5 1.5z"/>
          </svg>
        </div>
        <h1 className={clsx('hero__title', styles.heroTitle)}>
          Physical AI & Humanoid Robotics
        </h1>
        <p className={clsx('hero__subtitle', styles.heroSubtitle)}>
          Mastering Vision-Language-Action Systems for Advanced Robotics
        </p>
        <p className={clsx('hero__description', styles.heroDescription)}>
          A comprehensive textbook covering the integration of physical AI with humanoid robotics,
          including perception, language processing, and action execution in simulation environments.
        </p>
        <div className={styles.buttons}>
          <Link
            className={clsx('button button--primary button--lg', styles.buttonBeautiful)}
            to="/docs/intro">
            Start Learning
          </Link>
          <Link
            className={clsx('button button--secondary button--lg', styles.buttonBeautiful)}
            to="/docs/module-1">
            View Modules
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HeroSection;