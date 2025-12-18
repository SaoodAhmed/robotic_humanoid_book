import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';

function AccessibilityStatement() {
  return (
    <Layout title="Accessibility Statement" description="Accessibility Statement for the Physical AI & Humanoid Robotics Textbook">
      <div className={clsx('container', 'margin-vert--lg', 'padding-vert--lg')}>
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Accessibility Statement</h1>
            <p><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>

            <h2>Our Commitment to Accessibility</h2>
            <p>
              The Physical AI & Humanoid Robotics Textbook is committed to providing a website that
              is accessible to all users, regardless of disability. We are continuously working to
              improve the accessibility of our content and user experience.
            </p>

            <h2>Conformance Standards</h2>
            <p>
              Our website aims to conform to the <strong>Web Content Accessibility Guidelines (WCAG) 2.1</strong>,
              Level AA standards. These guidelines explain how to make web content more accessible
              for people with disabilities and more user-friendly for everyone.
            </p>

            <h2>Accessibility Features</h2>
            <p>
              Our website includes the following accessibility features:
            </p>
            <ul>
              <li>Semantic HTML markup for proper screen reader navigation</li>
              <li>Alternative text for images and diagrams</li>
              <li>Sufficient color contrast between text and backgrounds</li>
              <li>Keyboard navigation support for interactive elements</li>
              <li>Focus indicators for keyboard users</li>
              <li>Proper heading structure for content organization</li>
              <li>Descriptive link text</li>
              <li>Form labels and instructions</li>
              <li>Reduced motion options for users with vestibular disorders</li>
            </ul>

            <h2>Technical Specifications</h2>
            <p>
              The website relies on the following technologies to work with the particular
              combination of web browser and any assistive technologies or plugins:
            </p>
            <ul>
              <li>HTML</li>
              <li>CSS</li>
              <li>JavaScript</li>
              <li>WAI-ARIA (Accessible Rich Internet Applications)</li>
            </ul>

            <h2>Compatibility</h2>
            <p>
              Our website is designed to be compatible with:
            </p>
            <ul>
              <li>Popular screen readers (NVDA, JAWS, VoiceOver)</li>
              <li>Modern web browsers (Chrome, Firefox, Safari, Edge)</li>
              <li>Mobile accessibility features</li>
            </ul>

            <h2>Limitations and Alternatives</h2>
            <p>
              Despite our best efforts to ensure accessibility, there may be some limitations.
              If you experience any issues or have specific accessibility needs, please contact us
              for alternative formats or assistance.
            </p>

            <h2>Feedback</h2>
            <p>
              We welcome your feedback on the accessibility of our website. If you encounter
              accessibility barriers or have suggestions for improvement, please contact us through
              the GitHub repository for this project.
            </p>

            <h2>Measures to Support Accessibility</h2>
            <p>
              Our approach to support accessibility includes:
            </p>
            <ul>
              <li>Regular accessibility testing during development</li>
              <li>Implementation of accessibility best practices</li>
              <li>Staff training on accessibility guidelines</li>
              <li>Continuous monitoring and improvement</li>
            </ul>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default AccessibilityStatement;