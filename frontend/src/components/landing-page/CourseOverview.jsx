import React from 'react';
import clsx from 'clsx';
import styles from './course-overview.module.css';

function CourseOverview() {
  return (
    <section className={clsx('margin-vert--xl', styles.courseOverview)}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 className={clsx('text--center', styles.sectionTitle)}>
              Course Overview
            </h2>
            <p className={clsx('text--center', 'padding-horiz--lg', styles.sectionDescription)}>
              The Physical AI & Humanoid Robotics textbook provides a comprehensive exploration of Vision-Language-Action (VLA) systems for advanced robotics applications. This cutting-edge course integrates perception, language processing, and action execution in simulation environments to prepare students for the future of embodied AI.
            </p>
          </div>
        </div>

        <div className="row margin-vert--lg">
          <div className="col col--4">
            <div className={clsx(styles.featureCard, styles.fadeInUp)}>
              <div className={styles.icon}>🤖</div>
              <h3 className={styles.featureTitle}>Embodied Intelligence</h3>
              <p className={styles.featureDescription}>
                Learn how to create intelligent systems that integrate perception, cognition, and action in physical form.
              </p>
            </div>
          </div>

          <div className="col col--4">
            <div className={clsx(styles.featureCard, styles.fadeInUp, styles.delay1)}>
              <div className={styles.icon}>🧠</div>
              <h3 className={styles.featureTitle}>Vision-Language-Action</h3>
              <p className={styles.featureDescription}>
                Master the integration of computer vision, natural language processing, and robotic action execution.
              </p>
            </div>
          </div>

          <div className="col col--4">
            <div className={clsx(styles.featureCard, styles.fadeInUp, styles.delay2)}>
              <div className={styles.icon}>🎮</div>
              <h3 className={styles.featureTitle}>Simulation-First Approach</h3>
              <p className={styles.featureDescription}>
                Develop and test robotics systems in high-fidelity simulation before real-world deployment.
              </p>
            </div>
          </div>
        </div>

        <div className="row margin-vert--lg">
          <div className="col col--6">
            <h3 className={styles.subsectionTitle}>Target Audience</h3>
            <ul className={styles.audienceList}>
              <li className={styles.audienceItem}>Upper-level undergraduate students in robotics and AI</li>
              <li className={styles.audienceItem}>Graduate students in computer engineering and robotics</li>
              <li className={styles.audienceItem}>Researchers exploring embodied AI systems</li>
              <li className={styles.audienceItem}>Engineers working on humanoid robotics</li>
            </ul>
          </div>

          <div className="col col--6">
            <h3 className={styles.subsectionTitle}>Prerequisites</h3>
            <ul className={styles.prereqList}>
              <li className={styles.prereqItem}>Basic programming knowledge (Python preferred)</li>
              <li className={styles.prereqItem}>Fundamental understanding of robotics concepts</li>
              <li className={styles.prereqItem}>Experience with ROS 2 (covered in Module 1)</li>
              <li className={styles.prereqItem}>Familiarity with simulation environments</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CourseOverview;