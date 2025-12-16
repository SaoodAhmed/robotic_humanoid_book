import type {SidebarsConfig} from '@docusaurus/plugin-content-docs';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */
const sidebars: SidebarsConfig = {
  // Manual sidebar structure for the Physical AI & Humanoid Robotics textbook
  tutorialSidebar: [
    {
      type: 'category',
      label: 'Overview',
      items: ['intro'],
    },
    {
      type: 'category',
      label: 'Module 1: The Robotic Nervous System (ROS 2)',
      items: [
        'module-1/index',
        'module-1/ros2-basics',
        'module-1/nodes-topics-services',
        'module-1/rclpy-integration',
        'module-1/urdf-modeling',
        {
          type: 'category',
          label: 'Exercises',
          items: [
            'module-1/exercises/exercise-1',
            'module-1/exercises/exercise-2',
            'module-1/exercises/exercise-3'
          ],
        },
      ],
    },
    // Additional modules will be added as they are developed
    {
      type: 'category',
      label: 'Module 2: The Digital Twin (Gazebo & Unity)',
      items: [
        'module-2/index',
        'module-2/gazebo-setup',
        'module-2/physics-simulation',
        'module-2/sensor-simulation',
        'module-2/unity-visualization',
        {
          type: 'category',
          label: 'Exercises',
          items: [
            'module-2/exercises/exercise-1',
            'module-2/exercises/exercise-2',
            'module-2/exercises/exercise-3'
          ],
        },
      ],
    },
    {
      type: 'category',
      label: 'Module 3: The AI-Robot Brain (NVIDIA Isaac)',
      items: [
        'module-3/index',
        'module-3/isaac-sim-scenes',
        'module-3/scene-creation-workflow',
        'module-3/lighting-physics-setup',
        'module-3/synthetic-data-lab',
        'module-3/rgb-generation',
        'module-3/depth-generation',
        'module-3/semantic-segmentation',
        'module-3/dataset-export-validation',
        'module-3/performance-optimization-basic',
        'module-3/performance-optimization-complex',
        'module-3/scalability-optimization',
        'module-3/sensor-optimization',
        'module-3/isaac-sim-architecture',
        'module-3/data-generation-pipeline',
        'module-3/validation-environment',
        'module-3/security-protocols',
        'module-3/authentication-access',
        'module-3/isaac-ros-pipelines',
        'module-3/nav2-integration',
        'module-3/lab-1-isaac-sim-scene-creation',
        'module-3/lab-2-isaac-ros-vslam',
        'module-3/lab-3-nav2-integration',
        'module-3/quickstart',
        'module-3/hardware-requirements',
        'module-3/jetson-orin-deployment',
        'module-3/educational-approach',
        'module-3/accessibility-guide',
        'module-3/course-progression',
        'module-3/official-references',
      ],
    },
    {
      type: 'category',
      label: 'Module 4: Vision-Language-Action (VLA)',
      items: [
        'module-4/index',
        'module-4/voice-command-processing',
        'module-4/language-to-action',
        'module-4/vla-control-loop',
        'module-4/system-architecture',
        'module-4/command-plan-action',
        'module-4/autonomy-state-machine',
        'module-4/lab-1-voice-text-pipeline',
        'module-4/lab-2-language-ros-planning',
        'module-4/lab-3-vla-capstone',
        'module-4/security',
        'module-4/performance',
        'module-4/testing',
        'module-4/accessibility',
        'module-4/multi-user',
        'module-4/quality-checklist',
        'module-4/build-validation',
        'module-4/quickstart',
        'module-4/content-review'
      ],
      collapsed: false
    },
  ],
};

export default sidebars;
