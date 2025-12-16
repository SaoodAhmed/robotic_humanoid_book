import React from 'react';
import clsx from 'clsx';
import styles from './technical-requirements.module.css';

function TechnicalRequirements() {
  const requirements = {
    hardware: [
      {
        name: 'Workstation',
        minSpec: 'Intel i7-10700K or AMD Ryzen 7 3700X',
        recSpec: 'Intel i9-12900K or AMD Ryzen 9 5900X',
        justification: 'Required for Isaac Sim real-time rendering and LLM processing'
      },
      {
        name: 'Graphics',
        minSpec: 'RTX 3070 8GB VRAM',
        recSpec: 'RTX 4080 16GB VRAM',
        justification: 'Essential for Isaac Sim simulation and CUDA acceleration'
      },
      {
        name: 'Memory',
        minSpec: '32GB DDR4',
        recSpec: '64GB DDR4/DDR5',
        justification: 'Required for Isaac Sim, ROS 2 nodes, and LLM integration'
      },
      {
        name: 'Storage',
        minSpec: '1TB SSD',
        recSpec: '2TB NVMe SSD',
        justification: 'For Isaac Sim assets, simulation environments, and datasets'
      }
    ],
    software: [
      {
        name: 'Operating System',
        minSpec: 'Ubuntu 22.04 LTS',
        recSpec: 'Ubuntu 22.04 LTS',
        justification: 'Best compatibility with Isaac Sim and ROS 2 Humble'
      },
      {
        name: 'ROS 2',
        minSpec: 'Humble Hawksbill',
        recSpec: 'Humble Hawksbill with latest patches',
        justification: 'Required for Isaac ROS integration and textbook examples'
      },
      {
        name: 'Isaac Sim',
        minSpec: 'Isaac Sim 2023.1',
        recSpec: 'Latest Isaac Sim release',
        justification: 'For simulation environment and perception pipeline'
      },
      {
        name: 'Python',
        minSpec: 'Python 3.10',
        recSpec: 'Python 3.10 or 3.11',
        justification: 'For ROS 2 Python packages and LLM integration'
      }
    ],
    network: [
      {
        name: 'Internet',
        minSpec: 'Broadband (10 Mbps)',
        recSpec: 'High-speed (100 Mbps+)',
        justification: 'For OpenAI API access and Isaac Sim asset downloads'
      },
      {
        name: 'Local Network',
        minSpec: 'Gigabit Ethernet',
        recSpec: 'Gigabit Ethernet',
        justification: 'For robot communication and simulation streaming'
      }
    ],
    environment: [
      {
        name: 'Audio Input',
        minSpec: 'USB or 3.5mm microphone',
        recSpec: 'High-quality headset microphone',
        justification: 'For voice command processing and recognition'
      },
      {
        name: 'Acoustic Environment',
        minSpec: 'Quiet room',
        recSpec: 'Sound-treated environment',
        justification: 'For accurate speech recognition in educational setting'
      }
    ]
  };

  return (
    <section className={clsx('margin-vert--xl', styles.techRequirements)}>
      <div className="container">
        <div className="row">
          <div className="col col--12">
            <h2 className={clsx('text--center', styles.sectionTitle)}>
              Technical Requirements
            </h2>
            <p className={clsx('text--center', 'padding-horiz--lg', styles.sectionDescription)}>
              Ensure your environment meets these requirements to fully experience the Physical AI & Humanoid Robotics course
            </p>
          </div>
        </div>

        <div className="row">
          <div className="col col--3">
            <div className={clsx(styles.requirementCategory, styles.fadeInLeft)}>
              <div className={styles.categoryIcon}>🖥️</div>
              <h3 className={styles.categoryTitle}>Hardware</h3>
              <ul className={styles.requirementList}>
                {requirements.hardware.map((req, index) => (
                  <li key={index} className={styles.requirementItem}>
                    <div className={styles.reqName}>{req.name}</div>
                    <div className={styles.reqSpecs}>
                      <div className={styles.minSpec}>Min: {req.minSpec}</div>
                      <div className={styles.recSpec}>Rec: {req.recSpec}</div>
                    </div>
                    <div className={styles.reqJustification}>{req.justification}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col col--3">
            <div className={clsx(styles.requirementCategory, styles.fadeInLeft, styles.delay1)}>
              <div className={styles.categoryIcon}>⚙️</div>
              <h3 className={styles.categoryTitle}>Software</h3>
              <ul className={styles.requirementList}>
                {requirements.software.map((req, index) => (
                  <li key={index} className={styles.requirementItem}>
                    <div className={styles.reqName}>{req.name}</div>
                    <div className={styles.reqSpecs}>
                      <div className={styles.minSpec}>Min: {req.minSpec}</div>
                      <div className={styles.recSpec}>Rec: {req.recSpec}</div>
                    </div>
                    <div className={styles.reqJustification}>{req.justification}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col col--3">
            <div className={clsx(styles.requirementCategory, styles.fadeInRight, styles.delay2)}>
              <div className={styles.categoryIcon}>🌐</div>
              <h3 className={styles.categoryTitle}>Network</h3>
              <ul className={styles.requirementList}>
                {requirements.network.map((req, index) => (
                  <li key={index} className={styles.requirementItem}>
                    <div className={styles.reqName}>{req.name}</div>
                    <div className={styles.reqSpecs}>
                      <div className={styles.minSpec}>Min: {req.minSpec}</div>
                      <div className={styles.recSpec}>Rec: {req.recSpec}</div>
                    </div>
                    <div className={styles.reqJustification}>{req.justification}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="col col--3">
            <div className={clsx(styles.requirementCategory, styles.fadeInRight, styles.delay3)}>
              <div className={styles.categoryIcon}>🎧</div>
              <h3 className={styles.categoryTitle}>Environment</h3>
              <ul className={styles.requirementList}>
                {requirements.environment.map((req, index) => (
                  <li key={index} className={styles.requirementItem}>
                    <div className={styles.reqName}>{req.name}</div>
                    <div className={styles.reqSpecs}>
                      <div className={styles.minSpec}>Min: {req.minSpec}</div>
                      <div className={styles.recSpec}>Rec: {req.recSpec}</div>
                    </div>
                    <div className={styles.reqJustification}>{req.justification}</div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={clsx(styles.installationGuide, styles.fadeInUp, styles.delay4)}>
          <h3 className={styles.installationTitle}>Installation Guide</h3>
          <div className={styles.installationSteps}>
            <div className={styles.installStep}>
              <div className={styles.stepNumber}>1</div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>Install Ubuntu 22.04 LTS</h4>
                <p className={styles.stepDescription}>
                  Download and install Ubuntu 22.04 LTS with at least 64GB of free space.
                  Ensure your system meets the hardware requirements before installation.
                </p>
              </div>
            </div>

            <div className={styles.installStep}>
              <div className={styles.stepNumber}>2</div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>Install ROS 2 Humble</h4>
                <p className={styles.stepDescription}>
                  Follow the official ROS 2 installation guide for Ubuntu 22.04.
                  Install the desktop-full variant with all dependencies.
                </p>
              </div>
            </div>

            <div className={styles.installStep}>
              <div className={styles.stepNumber}>3</div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>Install Isaac Sim</h4>
                <p className={styles.stepDescription}>
                  Download Isaac Sim from NVIDIA developer portal.
                  Ensure your RTX GPU drivers are up to date before installation.
                </p>
              </div>
            </div>

            <div className={styles.installStep}>
              <div className={styles.stepNumber}>4</div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>Configure OpenAI API</h4>
                <p className={styles.stepDescription}>
                  Obtain an OpenAI API key and configure it in your environment variables.
                  Ensure your network allows outbound connections to OpenAI services.
                </p>
              </div>
            </div>

            <div className={styles.installStep}>
              <div className={styles.stepNumber}>5</div>
              <div className={styles.stepContent}>
                <h4 className={styles.stepTitle}>Set up the Textbook Environment</h4>
                <p className={styles.stepDescription}>
                  Clone the humanoid_robotic_book repository and install all Python dependencies.
                  Run the setup script to verify all components are properly configured.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className={clsx(styles.compatibilityMatrix, styles.fadeInUp, styles.delay5)}>
          <h3 className={styles.matrixTitle}>System Compatibility Matrix</h3>
          <table className={styles.compatibilityTable}>
            <thead>
              <tr>
                <th>Component</th>
                <th>Minimum</th>
                <th>Recommended</th>
                <th>Verification</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>CUDA</td>
                <td>11.8</td>
                <td>12.0+</td>
                <td>nvidia-smi, nvcc --version</td>
              </tr>
              <tr>
                <td>Isaac Sim</td>
                <td>2023.1</td>
                <td>Latest</td>
                <td>Isaac Sim launch test</td>
              </tr>
              <tr>
                <td>ROS 2</td>
                <td>Humble</td>
                <td>Humble with patches</td>
                <td>ros2 --version</td>
              </tr>
              <tr>
                <td>Python</td>
                <td>3.10</td>
                <td>3.11</td>
                <td>python3 --version</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default TechnicalRequirements;