import React, { type ReactNode } from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

interface SimulationDiagramProps {
  children: ReactNode;
  title?: string;
  description?: string;
  className?: string;
  type?: 'architecture' | 'pipeline' | 'system' | 'flow' | 'other';
  showBorder?: boolean;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const SimulationDiagram = ({
  children,
  title,
  description,
  className,
  type = 'other',
  showBorder = true,
  maxWidth = 'md',
}: SimulationDiagramProps): JSX.Element => {
  return (
    <figure
      className={clsx(
        styles.simulationDiagram,
        styles[`type-${type}`],
        {[styles.withBorder]: showBorder},
        styles[`maxWidth-${maxWidth}`],
        className
      )}
    >
      {title && (
        <figcaption className={styles.diagramCaption}>
          <h3 className={styles.diagramTitle}>{title}</h3>
          {description && (
            <p className={styles.diagramDescription}>{description}</p>
          )}
        </figcaption>
      )}
      <div className={styles.diagramContent}>{children}</div>
    </figure>
  );
};

export default SimulationDiagram;