import React from 'react';
import Layout from '@theme/Layout';
import clsx from 'clsx';

function TermsOfService() {
  return (
    <Layout title="Terms of Service" description="Terms of Service for the Physical AI & Humanoid Robotics Textbook">
      <div className={clsx('container', 'margin-vert--lg', 'padding-vert--lg')}>
        <div className="row">
          <div className="col col--8 col--offset-2">
            <h1>Terms of Service</h1>
            <p><em>Last updated: {new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</em></p>

            <h2>Acceptance of Terms</h2>
            <p>
              By accessing and using the Physical AI & Humanoid Robotics Textbook website, you accept
              and agree to be bound by the terms and provision of this agreement.
            </p>

            <h2>License to Use Content</h2>
            <p>
              The educational content provided on this website is licensed under Creative Commons
              Attribution-NonCommercial-ShareAlike 4.0 International (CC BY-NC-SA 4.0). You are free
              to share and adapt the material for non-commercial purposes, provided you give appropriate
              credit and distribute any modifications under the same license.
            </p>

            <h2>Use Restrictions</h2>
            <p>
              You agree not to use this website for any commercial purposes without explicit permission.
              You also agree not to use this website in any way that could damage, disable, overburden,
              or impair the website.
            </p>

            <h2>Disclaimer of Warranties</h2>
            <p>
              The content on this website is provided "as is" without any warranties of any kind, either
              express or implied, including but not limited to warranties of merchantability, fitness
              for a particular purpose, or non-infringement.
            </p>

            <h2>Limitation of Liability</h2>
            <p>
              In no event shall the authors or contributors of this textbook be liable for any claim,
              damages, or other liability arising from, out of, or in connection with the website or
              the use of the content.
            </p>

            <h2>Changes to Terms</h2>
            <p>
              We reserve the right to modify these terms at any time. Continued use of the website
              after any changes constitutes acceptance of the updated terms.
            </p>

            <h2>Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us through the
              GitHub repository for this project.
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export default TermsOfService;