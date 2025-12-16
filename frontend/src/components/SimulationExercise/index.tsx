import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface SimulationExerciseProps {
  children: ReactNode;
  title: string;
  difficulty?: 'beginner' | 'intermediate' | 'advanced';
  duration?: string;
  objectives?: string[];
  className?: string;
}

const SimulationExercise = ({
  children,
  title,
  difficulty = 'beginner',
  duration,
  objectives = [],
  className,
}: SimulationExerciseProps): JSX.Element => {
  return (
    <div className={clsx(styles.simulationExercise, styles[`difficulty-${difficulty}`], className)}>
      <div className={styles.exerciseHeader}>
        <h2 className={styles.exerciseTitle}>{title}</h2>
        <div className={styles.exerciseMeta}>
          {difficulty && (
            <span className={clsx(styles.difficultyBadge, styles[`badge-${difficulty}`])}>
              {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
            </span>
          )}
          {duration && (
            <span className={styles.durationBadge}>
              ⏱️ {duration}
            </span>
          )}
        </div>
      </div>

      {objectives.length > 0 && (
        <div className={styles.exerciseObjectives}>
          <h4>Learning Objectives:</h4>
          <ul>
            {objectives.map((objective, index) => (
              <li key={index}>{objective}</li>
            ))}
          </ul>
        </div>
      )}

      <div className={styles.exerciseContent}>{children}</div>
    </div>
  );
};

export default SimulationExercise;