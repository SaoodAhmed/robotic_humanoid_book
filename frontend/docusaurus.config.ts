import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'Physical AI & Humanoid Robotics Textbook',
  tagline: 'A comprehensive guide to ROS 2, simulation, and humanoid control',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://saoodahmed.github.io',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/robotic_humanoid_book/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'SaoodAhmed', // Usually your GitHub org/user name.
  projectName: 'robotic_humanoid_book', // Usually your repo name.
  deploymentBranch: 'gh-pages', // The branch to deploy to GitHub Pages

  onBrokenLinks: 'throw',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/SaoodAhmed/robotic_humanoid_book/tree/main/frontend/',
        },
        blog: false,
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    colorMode: {
      respectPrefersColorScheme: true,
    },
    // Accessibility features
    metadata: [
      {
        name: 'keywords',
        content: 'robotics, simulation, Gazebo, Unity, ROS 2, humanoid robotics, physical AI, computer science education'
      },
      {
        name: 'description',
        content: 'A comprehensive textbook on Physical AI and Humanoid Robotics, covering Gazebo simulation, Unity visualization, and ROS 2 integration'
      },
      {
        name: 'author',
        content: 'Physical AI & Humanoid Robotics Textbook'
      },
      // Accessibility metadata
      {
        name: 'Accessibility-Standard',
        content: 'This textbook follows WCAG 2.1 AA guidelines for accessibility'
      }
    ],
    navbar: {
      title: 'Physical AI & Humanoid Robotics',
      logo: {
        alt: 'Robotics Textbook Icon',
        src: 'img/logo.svg', // Using the original logo file but we'll update it to be a blue robot
      },
      items: [
        {
          type: 'docSidebar',
          sidebarId: 'tutorialSidebar',
          position: 'left',
          label: 'Textbook',
        },
        {
          href: 'https://github.com/SaoodAhmed/robotic_humanoid_book',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Textbook',
          items: [
            {
              label: 'Introduction',
              to: '/docs/intro',
            },
            {
              label: 'Module 1: The Robotic Nervous System',
              to: '/docs/module-1',
            },
            {
              label: 'Module 2: The Digital Twin',
              to: '/docs/module-2',
            },
            {
              label: 'Module 3: The AI-Robot Brain (NVIDIA Isaac)',
              to: '/docs/module-3',
            },
            {
              label: 'Module 4: Vision-Language-Action (VLA)',
              to: '/docs/module-4',
            },
          ],
        },
        {
          title: 'Resources',
          items: [
            {
              label: 'ROS 2 Documentation',
              href: 'https://docs.ros.org/en/humble/',
            },
            {
              label: 'Gazebo Simulation',
              href: 'https://gazebosim.org/',
            },
            {
              label: 'Unity Robotics',
              href: 'https://unity.com/solutions/robotics',
            },
            {
              label: 'NVIDIA Isaac',
              href: 'https://developer.nvidia.com/isaac-ros-gems',
            },
            {
              label: 'Docusaurus',
              href: 'https://docusaurus.io/',
            },
          ],
        },
        {
          title: 'Community',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/SaoodAhmed/robotic_humanoid_book',
            },
            {
              label: 'ROS Answers',
              href: 'https://answers.ros.org/questions/',
            },
            {
              label: 'Gazebo Community',
              href: 'https://community.gazebosim.org/',
            },
            {
              label: 'Unity Forums',
              href: 'https://forum.unity.com/',
            },
          ],
        },
        {
          title: 'Legal',
          items: [
            {
              label: 'Privacy Policy',
              to: '/privacy',
            },
            {
              label: 'Terms of Service',
              to: '/tos',
            },
            {
              label: 'Accessibility Statement',
              to: '/accessibility',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} Physical AI & Humanoid Robotics Textbook. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
