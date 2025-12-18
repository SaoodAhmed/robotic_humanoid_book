import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';

function PrivacyPolicy() {
  return (
    <Layout title="Privacy Policy" description="Privacy Policy for the Physical AI & Humanoid Robotics Textbook">
      <div className={clsx('container', 'margin-vert--lg', 'padding-vert--lg')}>
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Privacy Policy</h1>
            <p><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>

            <h2>Information Collection and Use</h2>
            <p>
              The Physical AI & Humanoid Robotics Textbook website does not collect personal information
              from visitors. We only collect information that is voluntarily provided by users, such as
              when participating in community discussions or contacting us directly.
            </p>

            <h2>Use of Information</h2>
            <p>
              Any information voluntarily provided is used solely to improve the educational content
              and user experience of the textbook. We do not share personal information with third parties.
            </p>

            <h2>Data Security</h2>
            <p>
              We implement appropriate security measures to protect against unauthorized access to
              or unauthorized alteration, disclosure, or destruction of data.
            </p>

            <h2>Cookies</h2>
            <p>
              This website may use cookies to enhance user experience. Cookies are small data files
              that are placed on your device when you visit a website. You can instruct your browser
              to refuse all cookies or to indicate when a cookie is being sent.
            </p>

            <h2>Third-Party Services</h2>
            <p>
              We may use third-party services for analytics and educational content delivery. These
              services may collect information about your usage of the website, but this information
              is anonymized and used only for analytical purposes.
            </p>

            <h2>Changes to This Privacy Policy</h2>
            <p>
              We may update our Privacy Policy from time to time. We will notify users of any changes
              by posting the new Privacy Policy on this page.
            </p>

            <h2>Contact Us</h2>
            <p>
              If you have any questions about this Privacy Policy, please contact us through the
              GitHub repository for this project.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default PrivacyPolicy;