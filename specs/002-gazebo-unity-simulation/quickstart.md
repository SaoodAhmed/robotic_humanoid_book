# Quickstart Guide: Module 2 - The Digital Twin (Gazebo & Unity)

**Feature**: Module 2 - The Digital Twin (Gazebo & Unity)
**Date**: 2025-12-11

## Prerequisites

Before starting Module 2, ensure you have:

1. **Ubuntu 22.04** operating system
2. **ROS 2 Humble Hawksbill** installed and configured
3. **Gazebo Garden** installed
4. **Unity 2022.3 LTS** installed
5. Basic understanding of ROS 2 concepts from Module 1

## Setup Environment

### Install Gazebo Garden
```bash
sudo apt update
sudo apt install ros-humble-gazebo-*
sudo apt install gazebo
```

### Verify Installation
```bash
gazebo --version
ros2 run gazebo_ros gazebo
```

### Install Unity (if not already installed)
- Download Unity Hub from Unity's website
- Install Unity 2022.3 LTS through Unity Hub
- Install ROS-TCP-Connector package for ROS 2 integration

## Basic Simulation Workflow

### 1. Create a Simple Robot Model
```xml
<!-- Example URDF snippet -->
<robot name="simple_humanoid">
  <link name="base_link">
    <visual>
      <geometry>
        <box size="0.5 0.2 0.5"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <box size="0.5 0.2 0.5"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1.0"/>
      <inertia ixx="0.1" ixy="0" ixz="0" iyy="0.1" iyz="0" izz="0.1"/>
    </inertial>
  </link>
</robot>
```

### 2. Launch Gazebo Simulation
```bash
# Start Gazebo with empty world
ros2 launch gazebo_ros empty_world.launch.py

# Or launch with your custom world
ros2 launch gazebo_ros gazebo.launch.py world:=/path/to/your/world.sdf
```

### 3. Spawn Your Robot
```bash
# Load robot description
ros2 param set /robot_state_publisher robot_description "$(cat your_robot.urdf)"

# Spawn robot in Gazebo
ros2 run gazebo_ros spawn_entity.py -topic robot_description -entity my_robot
```

### 4. Add Sensors
Configure LiDAR, camera, or IMU sensors in your URDF:
```xml
<!-- Example LiDAR sensor -->
<gazebo reference="lidar_link">
  <sensor type="ray" name="lidar_sensor">
    <ray>
      <scan>
        <horizontal>
          <samples>360</samples>
          <resolution>1.0</resolution>
          <min_angle>-3.14159</min_angle>
          <max_angle>3.14159</max_angle>
        </horizontal>
      </scan>
      <range>
        <min>0.1</min>
        <max>10.0</max>
        <resolution>0.01</resolution>
      </range>
    </ray>
    <plugin name="lidar_controller" filename="libgazebo_ros_ray_sensor.so">
      <ros>
        <namespace>/lidar</namespace>
        <remapping>~/out:=scan</remapping>
      </ros>
      <output_type>sensor_msgs/LaserScan</output_type>
    </plugin>
  </sensor>
</gazebo>
```

## Unity Visualization Setup

### 1. Import Robot Model
- Import your URDF model using Unity's URDF Importer
- Or manually create a humanoid model with similar proportions

### 2. Set Up ROS Connection
- Add ROS-TCP-Connector to your Unity scene
- Configure connection to ROS 2 bridge
- Synchronize robot states between Gazebo and Unity

### 3. Create Basic Interaction
- Implement teleoperation controls
- Add simple command interface
- Verify visualization updates match Gazebo simulation

## Common Commands

### Check Available Topics
```bash
ros2 topic list
```

### Monitor Sensor Data
```bash
# LiDAR data
ros2 topic echo /lidar/scan sensor_msgs/msg/LaserScan

# Camera data
ros2 topic echo /camera/image_raw sensor_msgs/msg/Image

# IMU data
ros2 topic echo /imu/data sensor_msgs/msg/Imu
```

### Basic Robot Control
```bash
# Publish velocity commands
ros2 topic pub /cmd_vel geometry_msgs/msg/Twist "{linear: {x: 0.5}, angular: {z: 0.2}}"
```

## Troubleshooting

### Gazebo Won't Start
- Check if ROS 2 is sourced: `source /opt/ros/humble/setup.bash`
- Verify Gazebo installation: `which gazebo`

### Sensor Data Not Publishing
- Check that sensor plugins are properly configured in URDF
- Verify Gazebo is running and robot is spawned
- Use `ros2 topic list` to confirm topic names

### Unity-ROS Connection Issues
- Verify ROS bridge is running
- Check network connectivity between Unity and ROS
- Confirm correct IP addresses and ports in configuration