import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface SimulationConceptProps {
  children: ReactNode;
  title: string;
  type?: 'definition' | 'principle' | 'concept' | 'tip' | 'warning' | 'important';
  icon?: string;
  className?: string;
}

const SimulationConcept = ({
  children,
  title,
  type = 'concept',
  icon,
  className,
}: SimulationConceptProps): JSX.Element => {
  const getTypeIcon = () => {
    switch (type) {
      case 'definition':
        return '📘';
      case 'principle':
        return '⚖️';
      case 'tip':
        return '💡';
      case 'warning':
        return '⚠️';
      case 'important':
        return '❗';
      default:
        return '🔍';
    }
  };

  return (
    <div className={clsx(styles.simulationConcept, styles[`type-${type}`], className)}>
      <div className={styles.conceptHeader}>
        <span className={styles.conceptIcon}>{icon || getTypeIcon()}</span>
        <h3 className={styles.conceptTitle}>{title}</h3>
      </div>
      <div className={styles.conceptContent}>{children}</div>
    </div>
  );
};

export default SimulationConcept;