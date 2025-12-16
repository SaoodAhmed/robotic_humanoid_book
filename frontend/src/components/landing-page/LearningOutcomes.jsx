import React from 'react';
import clsx from 'clsx';
import styles from './learning-outcomes.module.css';

function LearningOutcomes() {
  const learningOutcomes = [
    {
      id: 'outcome-1',
      category: 'technical-skill',
      title: 'ROS 2 Integration',
      description: 'Students will be able to implement distributed robotic systems using ROS 2 communication patterns and develop message-passing architectures for multi-component systems.',
      measurable: true,
      icon: '🌐'
    },
    {
      id: 'outcome-2',
      category: 'technical-skill',
      title: 'Simulation Environments',
      description: 'Students will create realistic simulation environments using Gazebo/Unity and implement physics-based simulation with realistic parameters for robot testing.',
      measurable: true,
      icon: '🎮'
    },
    {
      id: 'outcome-3',
      category: 'technical-skill',
      title: 'Isaac Integration',
      description: 'Students will build Isaac ROS pipelines for hardware-accelerated perception and integrate Isaac tools with navigation systems like Nav2.',
      measurable: true,
      icon: '🧠'
    },
    {
      id: 'outcome-4',
      category: 'technical-skill',
      title: 'Vision-Language-Action Systems',
      description: 'Students will integrate language models with robotic systems to enable Vision-Language-Action pipelines for autonomous behavior in humanoid robots.',
      measurable: true,
      icon: '👁️'
    },
    {
      id: 'outcome-5',
      category: 'practical-application',
      title: 'End-to-End Robotics',
      description: 'Students will execute complete robotic workflows from voice command to task completion in simulation, demonstrating integration of perception, navigation, and manipulation.',
      measurable: true,
      icon: '🔄'
    },
    {
      id: 'outcome-6',
      category: 'practical-application',
      title: 'Error Handling & Recovery',
      description: 'Students will implement robust error recovery mechanisms for autonomous robotic systems with proper state management and fallback behaviors.',
      measurable: true,
      icon: '🛡️'
    }
  ];

  return (
    <section className={clsx('margin-vert--xl', styles.learningOutcomes)}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 className={clsx('text--center', styles.sectionTitle)}>
              Learning Outcomes
            </h2>
            <p className={clsx('text--center', 'padding-horiz--lg', styles.sectionDescription)}>
              Upon completing this course, students will be able to demonstrate proficiency in advanced robotics concepts through practical implementation and integration
            </p>
          </div>
        </div>

        <div className={styles.outcomesGrid}>
          {learningOutcomes.map((outcome, index) => (
            <div
              key={outcome.id}
              className={clsx(styles.outcomeCard, styles.fadeInUp)}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className={styles.outcomeHeader}>
                <div className={styles.outcomeIcon}>{outcome.icon}</div>
                <div className={styles.outcomeCategory}>
                  <span className={clsx(
                    styles.categoryTag,
                    outcome.category === 'technical-skill' ? styles.technicalSkill :
                    outcome.category === 'theoretical-knowledge' ? styles.theoreticalKnowledge :
                    styles.practicalApplication
                  )}>
                    {outcome.category.replace('-', ' ').toUpperCase()}
                  </span>
                </div>
              </div>

              <h3 className={styles.outcomeTitle}>{outcome.title}</h3>
              <p className={styles.outcomeDescription}>{outcome.description}</p>

              <div className={styles.measurementIndicator}>
                <span className={styles.measurableIcon}>✓</span>
                <span className={styles.measurableText}>Measurable Outcome</span>
              </div>
            </div>
          ))}
        </div>

        <div className="row margin-vert--lg">
          <div className="col col--12">
            <div className={clsx(styles.assessmentSection, styles.fadeInUp)}>
              <h3 className={styles.assessmentTitle}>Assessment Approach</h3>
              <p className={styles.assessmentDescription}>
                Learning outcomes are assessed through a combination of laboratory exercises,
                project-based evaluations, and capstone demonstrations. Each outcome includes
                specific, measurable criteria that students must demonstrate to show competency.
              </p>

              <div className={styles.assessmentGrid}>
                <div className={styles.assessmentCard}>
                  <h4 className={styles.assessmentCardTitle}>Laboratory Exercises</h4>
                  <p className={styles.assessmentCardBody}>
                    Hands-on exercises that demonstrate specific technical skills in controlled environments
                  </p>
                </div>

                <div className={styles.assessmentCard}>
                  <h4 className={styles.assessmentCardTitle}>Project Evaluations</h4>
                  <p className={styles.assessmentCardBody}>
                    Integration projects that combine multiple learning outcomes in complex scenarios
                  </p>
                </div>

                <div className={styles.assessmentCard}>
                  <h4 className={styles.assessmentCardTitle}>Capstone Demonstration</h4>
                  <p className={styles.assessmentCardBody}>
                    End-to-end autonomous behavior demonstrating mastery of all outcomes
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default LearningOutcomes;