import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface SimulationLayoutProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
}

const SimulationLayout = ({
  children,
  title,
  description,
  className,
}: SimulationLayoutProps): JSX.Element => {
  return (
    <div className={clsx(styles.simulationLayout, className)}>
      {title && (
        <header className={styles.simulationHeader}>
          <h1 className={styles.simulationTitle}>{title}</h1>
          {description && (
            <p className={styles.simulationDescription}>{description}</p>
          )}
        </header>
      )}
      <div className={styles.simulationContent}>{children}</div>
    </div>
  );
};

export default SimulationLayout;