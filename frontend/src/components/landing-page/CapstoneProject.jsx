import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './capstone-project.module.css';

function CapstoneProject() {
  const capstoneProject = {
    title: 'Integrated Humanoid Robot Control Capstone',
    description: 'The culminating project that integrates all modules into a comprehensive Vision-Language-Action system for humanoid robotics',
    objectives: [
      'Integrate voice command processing with LLM-based action planning',
      'Coordinate perception, navigation, and manipulation in a single control loop',
      'Implement robust error handling and recovery mechanisms',
      'Execute end-to-end autonomous behaviors in simulation',
      'Demonstrate transfer of learning from simulation to real-world scenarios'
    ],
    deliverables: [
      'Complete VLA system implementation',
      'Technical documentation and architecture diagrams',
      'Performance analysis and optimization report',
      'Video demonstration of complete functionality',
      'Reflection report on learning outcomes achieved'
    ],
    integrationPoints: [
      'Voice Command Processing (Module 1)',
      'ROS 2 Communication (Module 1)',
      'Simulation Environment (Module 2)',
      'Isaac Integration (Module 3)',
      'Vision-Language-Action Systems (Module 4)'
    ],
    complexity: 'Advanced',
    estimatedDuration: '4-6 weeks',
    evaluationCriteria: [
      'Successful integration of all four modules',
      'Robust error handling and recovery mechanisms',
      'Performance optimization and latency targets',
      'Quality of technical documentation',
      'Effectiveness of autonomous behaviors demonstrated'
    ]
  };

  return (
    <section className={clsx('margin-vert--xl', styles.capstoneProject)}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 className={clsx('text--center', styles.sectionTitle)}>
              Capstone Project
            </h2>
            <p className={clsx('text--center', 'padding-horiz--lg', styles.sectionDescription)}>
              The capstone project integrates all course concepts into a comprehensive Vision-Language-Action system for humanoid robotics
            </p>
          </div>
        </div>

        <div className={clsx(styles.projectOverview, styles.fadeInUp)}>
          <div className={styles.projectHeader}>
            <div className={styles.projectIcon}>🏆</div>
            <h3 className={styles.projectTitle}>{capstoneProject.title}</h3>
          </div>

          <p className={styles.projectDescription}>
            {capstoneProject.description}
          </p>

          <div className={styles.durationTag}>
            Duration: {capstoneProject.estimatedDuration}
          </div>

          <div className={styles.complexityTag}>
            Complexity: {capstoneProject.complexity}
          </div>
        </div>

        <div className="row margin-vert--lg">
          <div className="col col--4">
            <div className={clsx(styles.featureSection, styles.fadeInUp)}>
              <h3 className={styles.featureTitle}>Learning Objectives</h3>
              <ul className={styles.objectivesList}>
                {capstoneProject.objectives.map((objective, index) => (
                  <li key={index} className={styles.objectiveItem}>
                    <span className={styles.bullet}>•</span>
                    {objective}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col col--4">
            <div className={clsx(styles.featureSection, styles.fadeInUp, styles.delay1)}>
              <h3 className={styles.featureTitle}>Deliverables</h3>
              <ul className={styles.deliverablesList}>
                {capstoneProject.deliverables.map((deliverable, index) => (
                  <li key={index} className={styles.deliverableItem}>
                    <span className={styles.bullet}>•</span>
                    {deliverable}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col col--4">
            <div className={clsx(styles.featureSection, styles.fadeInUp, styles.delay2)}>
              <h3 className={styles.featureTitle}>Module Integration</h3>
              <ul className={styles.integrationList}>
                {capstoneProject.integrationPoints.map((integration, index) => (
                  <li key={index} className={styles.integrationItem}>
                    <span className={styles.bullet}>🔗</span>
                    {integration}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={clsx(styles.evaluationSection, styles.fadeInUp, styles.delay3)}>
          <h3 className={styles.evaluationTitle}>Evaluation Criteria</h3>
          <div className={styles.criteriaGrid}>
            {capstoneProject.evaluationCriteria.map((criterion, index) => (
              <div key={index} className={styles.criterionCard}>
                <div className={styles.criterionNumber}>#{index + 1}</div>
                <p className={styles.criterionText}>{criterion}</p>
              </div>
            ))}
          </div>
        </div>

        <div className={clsx(styles.callToAction, styles.fadeInUp, styles.delay4)}>
          <h3 className={styles.ctaTitle}>Ready to Take on the Challenge?</h3>
          <p className={styles.ctaDescription}>
            The capstone project represents the ultimate test of your robotics and AI integration skills.
            Are you ready to build a complete Vision-Language-Action system for humanoid robotics?
          </p>
          <div className={styles.ctaButtons}>
            <Link
              className="button button--primary button--lg"
              to="/robotic_humanoid_book/docs/module-4">
              Start Building
            </Link>
            <Link
              className="button button--secondary button--lg"
              to="/robotic_humanoid_book/docs/module-4/lab-3-vla-capstone">
              View Lab Exercise
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CapstoneProject;