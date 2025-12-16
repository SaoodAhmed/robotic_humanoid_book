import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';
import CodeBlock from '@theme/CodeBlock';

interface SimulationCodeBlockProps {
  children: string;
  title?: string;
  description?: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

const SimulationCodeBlock = ({
  children,
  title,
  description,
  language,
  showLineNumbers = false,
  className,
}: SimulationCodeBlockProps): JSX.Element => {
  return (
    <div className={clsx(styles.simulationCodeBlock, className)}>
      {title && (
        <div className={styles.codeBlockHeader}>
          <h3 className={styles.codeBlockTitle}>{title}</h3>
          {description && (
            <p className={styles.codeBlockDescription}>{description}</p>
          )}
        </div>
      )}
      <CodeBlock
        className={styles.codeBlock}
        language={language}
        showLineNumbers={showLineNumbers}
      >
        {children}
      </CodeBlock>
    </div>
  );
};

export default SimulationCodeBlock;