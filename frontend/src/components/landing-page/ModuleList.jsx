import React from 'react';
import clsx from 'clsx';
import Link from '@docusaurus/Link';
import styles from './module-list.module.css';

function ModuleList() {
  const modules = [
    {
      id: 'module-1',
      title: 'The Robotic Nervous System (ROS 2)',
      description: 'Foundation of robotic operating systems and communication frameworks',
      objectives: [
        'Implement basic ROS 2 nodes and communication patterns',
        'Design message-passing architectures for multi-component systems',
        'Integrate sensors and actuators with ROS 2',
        'Develop distributed robotic systems using ROS 2'
      ],
      duration: '3-4 weeks',
      difficulty: 'Intermediate',
      icon: '🌐'
    },
    {
      id: 'module-2',
      title: 'Digital Twins & Simulation (Gazebo/Unity)',
      description: 'Creating realistic simulation environments for robotics development',
      objectives: [
        'Build accurate digital twin environments for robot testing',
        'Implement physics-based simulation with realistic parameters',
        'Develop sensor simulation for perception system testing',
        'Create visualization systems for robot behavior monitoring'
      ],
      duration: '3-4 weeks',
      difficulty: 'Intermediate',
      icon: '🎮'
    },
    {
      id: 'module-3',
      title: 'The AI-Robot Brain (NVIDIA Isaac)',
      description: 'Advanced perception, planning, and control using NVIDIA Isaac ecosystem',
      objectives: [
        'Implement Isaac Sim scenes for photorealistic training',
        'Generate synthetic datasets for perception system training',
        'Build Isaac ROS pipelines for hardware-accelerated processing',
        'Integrate Isaac tools with Nav2 for navigation systems'
      ],
      duration: '4-5 weeks',
      difficulty: 'Advanced',
      icon: '🧠'
    },
    {
      id: 'module-4',
      title: 'Vision-Language-Action (VLA)',
      description: 'Integrating language models with robotic systems for autonomous behavior',
      objectives: [
        'Process voice commands through speech recognition systems',
        'Translate natural language to ROS 2 action plans using LLMs',
        'Integrate perception, navigation, and manipulation in VLA loop',
        'Execute end-to-end autonomous behaviors in simulation'
      ],
      duration: '4-5 weeks',
      difficulty: 'Advanced',
      icon: '👁️'
    }
  ];

  return (
    <section className={clsx('margin-vert--xl', styles.moduleList)}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 className={clsx('text--center', styles.sectionTitle)}>
              Course Modules
            </h2>
            <p className={clsx('text--center', 'padding-horiz--lg', styles.sectionDescription)}>
              The course is structured into four comprehensive modules that progressively build advanced robotics skills
            </p>
          </div>
        </div>

        <div className={styles.moduleGrid}>
          {modules.map((module, index) => (
            <div
              key={module.id}
              className={clsx(styles.moduleCard, styles.fadeInUp)}
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <div className={styles.moduleHeader}>
                <div className={styles.moduleIcon}>{module.icon}</div>
                <div className={styles.moduleInfo}>
                  <h3 className={styles.moduleTitle}>{module.title}</h3>
                  <span className={clsx(styles.difficultyBadge,
                    module.difficulty === 'Beginner' ? styles.beginner :
                    module.difficulty === 'Intermediate' ? styles.intermediate :
                    styles.advanced)}>
                    {module.difficulty}
                  </span>
                </div>
              </div>

              <p className={styles.moduleDescription}>{module.description}</p>

              <div className={styles.durationTag}>
                Duration: {module.duration}
              </div>

              <h4 className={styles.objectivesTitle}>Learning Objectives:</h4>
              <ul className={styles.objectivesList}>
                {module.objectives.map((objective, idx) => (
                  <li key={idx} className={styles.objectiveItem}>
                    <span className={styles.bullet}>•</span>
                    {objective}
                  </li>
                ))}
              </ul>

              <div className={styles.moduleFooter}>
                <Link
                  className="button button--primary button--sm"
                  to={`/docs/${module.id}`}>
                  Explore Module
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ModuleList;