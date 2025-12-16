---
sidebar_position: 2
---

# ROS 2 Basics

## Introduction to ROS 2

ROS 2 (Robot Operating System 2) is a flexible framework for writing robot software. It's a collection of tools, libraries, and conventions that aim to simplify the task of creating complex and robust robot behavior across a wide variety of robot platforms, from humanoid robots to industrial manipulators.

ROS 2 is the successor to ROS 1, addressing many of the limitations of the original system, particularly in areas of security, real-time performance, and deployment in production environments.

## Why ROS 2 for Humanoid Robotics?

Humanoid robots are complex systems with multiple sensors, actuators, and control systems that need to work together seamlessly. ROS 2 provides:

- **Modularity**: Different components can be developed and tested independently
- **Communication**: Standardized message passing between components
- **Hardware Abstraction**: Same software can run on simulation or real hardware
- **Ecosystem**: Extensive libraries for perception, planning, and control
- **Community**: Large community of researchers and developers

## Core Concepts

### Nodes

A node is a process that performs computation in the ROS 2 system. Nodes are the fundamental building blocks of a ROS 2 application. Each node typically performs a specific task such as:

- Sensor data processing
- Motion planning
- Control algorithms
- User interface
- Data logging

In humanoid robotics, you might have nodes for:
- Joint controller
- Sensor fusion
- Balance control
- Perception system
- High-level behavior

### Topics and Message Passing

Topics are named buses over which nodes exchange messages. The communication is based on a publish/subscribe pattern where publishers send messages to a topic and subscribers receive messages from a topic.

For example, a sensor node might publish joint position data to a `/joint_states` topic, and multiple other nodes (like controllers, visualizers, and loggers) might subscribe to this topic.

### Services

Services provide a request/reply communication pattern. A client sends a request to a service and waits for a response. This is useful for operations that need to complete before continuing, such as:

- Changing robot state
- Requesting specific actions
- Getting configuration parameters
- Saving data

### Actions

Actions are used for long-running tasks that provide feedback and can be canceled. They're ideal for tasks like:

- Moving to a specific location
- Grasping an object
- Executing a complex behavior
- Calibration procedures

## ROS 2 Architecture

ROS 2 uses a DDS (Data Distribution Service) middleware layer for communication. This provides:

- **Decentralized Architecture**: No central master node like in ROS 1
- **Real-time Performance**: Deterministic message delivery
- **Security**: Built-in security features
- **Multi-language Support**: Python, C++, Java, and more

### DDS Implementation Options

ROS 2 supports multiple DDS implementations:
- **Fast DDS** (default in Humble Hawksbill)
- **Cyclone DDS**
- **RTI Connext DDS**
- **Eclipse iceoryx** (for intra-process communication)

## ROS 2 Ecosystem

The ROS 2 ecosystem includes several key components:

### Command Line Tools

- `ros2 run`: Run a node
- `ros2 topic`: Work with topics
- `ros2 service`: Work with services
- `ros2 action`: Work with actions
- `ros2 param`: Work with parameters
- `ros2 launch`: Launch multiple nodes at once

### Development Tools

- **RViz2**: 3D visualization tool for robot data
- **rqt**: GUI tools for monitoring and controlling nodes
- **rosbag2**: Data recording and playback
- **Gazebo**: Robot simulation environment

## Setting Up Your Environment

To work with ROS 2 Humble Hawksbill, you need to source the ROS 2 environment in each terminal:

```bash
source /opt/ros/humble/setup.bash
```

For convenience, you can add this to your `.bashrc` file:

```bash
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
```

## Package Structure

ROS 2 packages follow a standard structure:

```
my_robot_package/
├── CMakeLists.txt          # Build configuration for C++
├── package.xml             # Package metadata
├── src/                    # Source code
├── include/                # Header files
├── launch/                 # Launch files
├── config/                 # Configuration files
├── test/                   # Test files
└── scripts/                # Python scripts
```

For Python-only packages, the structure is slightly different:

```
my_python_package/
├── package.xml             # Package metadata
├── setup.py                # Python setup
├── setup.cfg               # Installation configuration
└── my_python_package/      # Python modules
    ├── __init__.py
    └── nodes/              # Python node files
```

## Summary

ROS 2 provides the foundation for building complex robotic systems by offering standardized communication patterns, a rich ecosystem of tools, and a modular architecture. Understanding these basic concepts is crucial for working with humanoid robots, as they form the "nervous system" that coordinates all robot behaviors.

In the next section, we'll explore nodes, topics, and services in more detail, including practical examples of how to implement them.