# Data Model: Module 2 - The Digital Twin (Gazebo & Unity)

**Feature**: Module 2 - The Digital Twin (Gazebo & Unity)
**Date**: 2025-12-11

## Key Entities

### Simulation Environment
- **Gazebo World**: Physics simulation environment with gravity, collision detection, and rigid body dynamics
  - Properties: gravity settings, collision boundaries, material properties
  - Relationships: Contains Robot Models and Sensor Configurations

- **Unity Scene**: Visualization environment for robot representation and human-robot interaction
  - Properties: lighting, camera settings, rendering quality
  - Relationships: Visualizes Robot Models with synchronized movement from Gazebo

### Robot Model
- **URDF/SDF Model**: Robot description format defining physical and visual properties
  - Properties: links, joints, mass, inertia, visual geometry, collision geometry
  - Relationships: Used by both Gazebo for physics simulation and Unity for visualization

### Sensor Configuration
- **LiDAR Sensor**: Simulated laser range finder
  - Properties: range, resolution, field of view, update rate
  - Output: LaserScan messages with distance measurements
  - Validation: Range values must be within sensor limits

- **RGB-D Camera**: Simulated depth camera
  - Properties: resolution, field of view, depth range, update rate
  - Output: Image (color) and Depth Image (depth) messages
  - Validation: Depth values must be within sensor limits

- **IMU Sensor**: Simulated inertial measurement unit
  - Properties: noise parameters, update rate, measurement range
  - Output: Imu messages with orientation, angular velocity, and linear acceleration
  - Validation: Values must be within physical limits

### Human-Robot Interaction
- **Teleoperation Interface**: Direct control interface for robot movement
  - Properties: control commands (linear/angular velocity), safety limits
  - Relationships: Maps user input to Robot Commands

- **Command Interface**: Higher-level command interface
  - Properties: predefined commands, parameters, validation rules
  - Relationships: Maps user commands to Robot Commands

## State Transitions

### Simulation State
- **Idle**: Simulation environment loaded but not running
- **Running**: Physics simulation actively updating robot states
- **Paused**: Simulation temporarily stopped, states preserved
- **Reset**: Simulation returned to initial state

### Robot State
- **Stationary**: Robot not moving, all joints at rest
- **Moving**: Robot executing motion commands
- **Colliding**: Robot in contact with environment
- **Sensor Active**: Robot sensors actively publishing data

## Validation Rules

### From Requirements
- All sensor data streams must be realistic and consistent with physical properties
- Simulation must run in real-time on academic hardware
- Robot models must maintain physical plausibility during simulation
- Human-robot interaction must provide immediate feedback