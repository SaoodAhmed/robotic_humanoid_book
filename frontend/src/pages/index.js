import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HeroSection from '../components/landing-page/HeroSection';
import CourseOverview from '../components/landing-page/CourseOverview';
import ModuleList from '../components/landing-page/ModuleList';
import LearningOutcomes from '../components/landing-page/LearningOutcomes';
import CapstoneProject from '../components/landing-page/CapstoneProject';
import TechnicalRequirements from '../components/landing-page/TechnicalRequirements';

import styles from './index.module.css';

function HomepageHeader() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <header className={clsx('hero hero--primary', styles.heroBanner)}>
      <div className="container">
        <HeroSection />
      </div>
    </header>
  );
}

export default function Home() {
  const { siteConfig } = useDocusaurusContext();
  return (
    <Layout
      title={`Physical AI & Humanoid Robotics`}
      description="Vision-Language-Action Systems for Advanced Robotics Education">
      <HomepageHeader />
      <main>
        <CourseOverview />
        <ModuleList />
        <LearningOutcomes />
        <CapstoneProject />
        <TechnicalRequirements />

        {/* Final Call to Action Section */}
        <section className={clsx('margin-vert--xl', styles.finalCta)}>
          <div className="container text--center">
            <h2 className={clsx(styles.ctaTitle, 'text--secondary')}>
              Ready to Master Vision-Language-Action Systems?
            </h2>
            <p className={clsx(styles.ctaDescription, 'padding-horiz--md')}>
              Begin your journey into the future of humanoid robotics with our comprehensive Physical AI textbook
            </p>
            <div className={styles.ctaButtons}>
              <Link
                className="button button--primary button--lg margin-horiz--md"
                to="/docs/intro">
                Start Learning Now
              </Link>
              <Link
                className="button button--secondary button--lg margin-horiz--md"
                to="/docs/module-1">
                Explore Modules
              </Link>
            </div>
          </div>
        </section>
      </main>
    </Layout>
  );
}