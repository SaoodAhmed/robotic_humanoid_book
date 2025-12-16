# Research: Module 2 - The Digital Twin (Gazebo & Unity)

**Feature**: Module 2 - The Digital Twin (Gazebo & Unity)
**Date**: 2025-12-11
**Input**: Feature specification and implementation plan

## Decision: Gazebo-first vs Unity-first workflow
**Rationale**: Chosen Gazebo-first approach to establish physics fundamentals before visualization. Physics simulation is the core of robot simulation, and students need to understand the underlying physical behaviors before adding visualization layers.
**Alternatives considered**: Unity-first would prioritize visualization but could lead to students misunderstanding the underlying physics that drives robot behavior.

## Decision: Sensor coverage depth - practical simulation-level detail
**Rationale**: Focus on simulation-level details rather than full pipeline to maintain educational focus on simulation concepts. Students need to understand how to configure and use simulated sensors rather than implement sensor drivers from scratch.
**Alternatives considered**: Full pipeline coverage would be too complex for initial learning; basic usage would not provide sufficient depth.

## Decision: Rendering approach - simple humanoid visualization
**Rationale**: Simple visualization focuses on the robot model and basic interaction without overwhelming students with complex environment rendering. This maintains focus on the robot and its behavior.
**Alternatives considered**: Interactive environment would add complexity that might distract from core simulation concepts.

## Technology Research Findings

### Gazebo Garden Integration
- Compatible with ROS 2 Humble Hawksbill
- Supports physics simulation with gravity, collisions, and rigid body dynamics
- Provides plugins for LiDAR, RGB-D cameras, and IMU sensors
- Can import URDF models directly

### Unity 2022.3 LTS Integration
- Supports importing 3D models including humanoid robots
- Can interface with ROS 2 via rosbridge_suite
- Provides high-fidelity visualization capabilities
- Compatible with Ubuntu 22.04 via Unity Editor or build pipeline

### Sensor Simulation in Gazebo
- LiDAR: Ray-based sensor plugin that publishes LaserScan messages
- RGB-D Camera: Depth camera plugin that publishes Image and CameraInfo messages
- IMU: Inertial measurement unit plugin that publishes Imu messages
- All sensors can be configured with realistic parameters for educational purposes

### Ubuntu 22.04 Compatibility
- Gazebo Garden has official support for Ubuntu 22.04
- Unity can run on Ubuntu 22.04 via editor or pre-built applications
- ROS 2 Humble Hawksbill is designed for Ubuntu 22.04
- All tools integrate well in the Ubuntu 22.04 environment