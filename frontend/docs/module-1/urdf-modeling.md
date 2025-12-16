---
sidebar_position: 5
---

# URDF Modeling

## Introduction to URDF

URDF (Unified Robot Description Format) is an XML-based format used in ROS to describe robot models. It defines the physical and visual properties of a robot, including its links, joints, inertial properties, and how they connect. For humanoid robots, URDF is essential for simulation, visualization, and control.

## URDF Structure Overview

A URDF file consists of:
- **Links**: Rigid bodies of the robot (e.g., torso, limbs)
- **Joints**: Connections between links (e.g., hinges, prismatic joints)
- **Visual**: How the robot appears in simulation
- **Collision**: How the robot interacts with the environment
- **Inertial**: Mass and inertial properties for physics simulation

## Basic URDF Structure

Here's a minimal URDF example:

```xml
<?xml version="1.0"?>
<robot name="simple_robot">
  <!-- Base link -->
  <link name="base_link">
    <visual>
      <geometry>
        <box size="1.0 0.5 0.2"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 1 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="1.0 0.5 0.2"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1.0"/>
      <inertia ixx="0.1" ixy="0" ixz="0" iyy="0.1" iyz="0" izz="0.1"/>
    </inertial>
  </link>
</robot>
```

## Links

Links represent rigid bodies in the robot. Each link must have:
- A unique name
- Visual properties (how it looks)
- Collision properties (how it interacts)
- Inertial properties (for physics simulation)

### Visual Properties

```xml
<link name="link_name">
  <visual>
    <origin xyz="0 0 0" rpy="0 0 0"/>
    <geometry>
      <!-- Choose one geometry type -->
      <box size="1 1 1"/>
      <!-- <cylinder radius="0.5" length="1"/> -->
      <!-- <sphere radius="0.5"/> -->
      <!-- <mesh filename="package://path/to/mesh.stl"/> -->
    </geometry>
    <material name="red">
      <color rgba="1 0 0 1"/>
    </material>
  </visual>
</link>
```

### Collision Properties

```xml
<link name="link_name">
  <collision>
    <origin xyz="0 0 0" rpy="0 0 0"/>
    <geometry>
      <box size="1 1 1"/>
    </geometry>
  </collision>
</link>
```

### Inertial Properties

```xml
<link name="link_name">
  <inertial>
    <mass value="1.0"/>
    <origin xyz="0 0 0" rpy="0 0 0"/>
    <inertia ixx="0.1" ixy="0" ixz="0" iyy="0.1" iyz="0" izz="0.1"/>
  </inertial>
</link>
```

## Joints

Joints connect links and define how they can move relative to each other.

### Joint Types

1. **Fixed**: No movement (0 DOF)
2. **Revolute**: Rotational movement (1 DOF)
3. **Continuous**: Continuous rotation (1 DOF)
4. **Prismatic**: Linear movement (1 DOF)
5. **Floating**: 6 DOF movement
6. **Planar**: Movement in a plane (3 DOF)

### Joint Definition

```xml
<joint name="joint_name" type="revolute">
  <parent link="parent_link"/>
  <child link="child_link"/>
  <origin xyz="0 0 0.1" rpy="0 0 0"/>
  <axis xyz="0 0 1"/>
  <limit lower="-1.57" upper="1.57" effort="100" velocity="1"/>
</joint>
```

## Simple Humanoid Model

Here's a basic humanoid model with torso, head, arms, and legs:

```xml
<?xml version="1.0"?>
<robot name="simple_humanoid">
  <!-- Torso -->
  <link name="torso">
    <visual>
      <origin xyz="0 0 0.5" rpy="0 0 0"/>
      <geometry>
        <box size="0.3 0.3 1.0"/>
      </geometry>
      <material name="gray">
        <color rgba="0.5 0.5 0.5 1"/>
      </material>
    </visual>
    <collision>
      <origin xyz="0 0 0.5" rpy="0 0 0"/>
      <geometry>
        <box size="0.3 0.3 1.0"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="10.0"/>
      <inertia ixx="0.5" ixy="0" ixz="0" iyy="0.5" iyz="0" izz="0.2"/>
    </inertial>
  </link>

  <!-- Head -->
  <link name="head">
    <visual>
      <origin xyz="0 0 0" rpy="0 0 0"/>
      <geometry>
        <sphere radius="0.15"/>
      </geometry>
      <material name="skin">
        <color rgba="0.8 0.6 0.4 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <sphere radius="0.15"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="2.0"/>
      <inertia ixx="0.02" ixy="0" ixz="0" iyy="0.02" iyz="0" izz="0.02"/>
    </inertial>
  </link>

  <!-- Neck joint -->
  <joint name="neck_joint" type="revolute">
    <parent link="torso"/>
    <child link="head"/>
    <origin xyz="0 0 1.0" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-0.5" upper="0.5" effort="10" velocity="1"/>
  </joint>

  <!-- Left Arm -->
  <link name="left_upper_arm">
    <visual>
      <origin xyz="0 0 -0.15" rpy="0 0 0"/>
      <geometry>
        <cylinder radius="0.05" length="0.3"/>
      </geometry>
      <material name="arm_color">
        <color rgba="0.7 0.7 0.7 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <cylinder radius="0.05" length="0.3"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1.0"/>
      <inertia ixx="0.01" ixy="0" ixz="0" iyy="0.01" iyz="0" izz="0.001"/>
    </inertial>
  </link>

  <!-- Left shoulder joint -->
  <joint name="left_shoulder_joint" type="revolute">
    <parent link="torso"/>
    <child link="left_upper_arm"/>
    <origin xyz="0.2 0 0.7" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
    <limit lower="-1.57" upper="1.57" effort="50" velocity="1"/>
  </joint>
</robot>
```

## URDF Best Practices

### 1. Proper Kinematic Chain

Ensure all links are connected in a proper kinematic chain. The robot should have one base link with no parent:

```xml
<!-- This is the root link -->
<link name="base_link">
  <!-- content -->
</link>
```

### 2. Consistent Units

Use consistent units throughout your URDF:
- Length: meters
- Mass: kilograms
- Angles: radians
- Colors: rgba values from 0 to 1

### 3. Realistic Inertial Properties

Calculate or estimate realistic inertial properties. For simple shapes:

- Box: `ixx = m/12 * (h² + d²)`, `iyy = m/12 * (w² + d²)`, `izz = m/12 * (w² + h²)`
- Cylinder: `ixx = iyy = m/12 * (3*r² + h²)`, `izz = m/2 * r²`
- Sphere: `ixx = iyy = izz = 2/5 * m * r²`

### 4. Collision vs Visual Geometry

Use simplified collision geometry for better performance:

```xml
<link name="complex_shape">
  <!-- Detailed visual mesh -->
  <visual>
    <geometry>
      <mesh filename="package://robot_description/meshes/complex_shape.dae"/>
    </geometry>
  </visual>
  <!-- Simplified collision geometry -->
  <collision>
    <geometry>
      <cylinder radius="0.1" length="0.2"/>
    </geometry>
  </collision>
</link>
```

## Xacro for Complex Models

For complex humanoid models, use Xacro (XML Macros) to simplify URDF:

```xml
<?xml version="1.0"?>
<robot xmlns:xacro="http://www.ros.org/wiki/xacro" name="humanoid_with_xacro">
  <!-- Define properties -->
  <xacro:property name="M_PI" value="3.1415926535897931" />
  <xacro:property name="link_width" value="0.1" />

  <!-- Macro for creating a limb -->
  <xacro:macro name="limb" params="name parent xyz rpy">
    <link name="${name}_link">
      <visual>
        <origin xyz="${xyz}" rpy="${rpy}"/>
        <geometry>
          <cylinder radius="${link_width}" length="0.3"/>
        </geometry>
      </visual>
      <collision>
        <geometry>
          <cylinder radius="${link_width}" length="0.3"/>
        </geometry>
      </collision>
      <inertial>
        <mass value="1.0"/>
        <inertia ixx="0.01" ixy="0" ixz="0" iyy="0.01" iyz="0" izz="0.001"/>
      </inertial>
    </link>
  </xacro:macro>

  <!-- Use the macro -->
  <xacro:limb name="left_arm" parent="torso" xyz="0.2 0 0" rpy="0 0 0"/>
</robot>
```

## Validating URDF Files

Always validate your URDF files:

```bash
# Check for XML syntax errors
xmllint --noout your_robot.urdf

# Use check_urdf tool (if available)
check_urdf your_robot.urdf

# Load in RViz or Gazebo to visually inspect
```

## URDF in Simulation

To use URDF in Gazebo, add Gazebo-specific tags:

```xml
<link name="wheel">
  <!-- Standard URDF elements -->
  <visual>
    <geometry>
      <cylinder radius="0.1" length="0.05"/>
    </geometry>
  </visual>

  <!-- Gazebo-specific properties -->
  <gazebo reference="wheel">
    <material>Gazebo/Blue</material>
    <mu1>0.5</mu1>
    <mu2>0.5</mu2>
  </gazebo>
</link>
```

## Common URDF Issues

1. **Self-collisions**: Links colliding with themselves
2. **Invalid inertials**: Non-positive definite inertia matrices
3. **Disconnected links**: Links not connected to the kinematic tree
4. **Invalid joint limits**: Limits that don't make physical sense
5. **Zero mass**: Links with zero mass can cause simulation issues

## Tools for URDF Development

- **RViz**: Visualize URDF models
- **URDF Tutorials**: Official ROS URDF tutorials
- **Mesh processing tools**: Blender, MeshLab for creating complex geometries
- **Inertial calculators**: Online tools for calculating inertial properties

## Summary

URDF is fundamental to representing robots in ROS and simulation environments. For humanoid robots, creating an accurate URDF model is crucial for proper simulation, visualization, and control. Understanding the structure of URDF files, the relationship between links and joints, and best practices for modeling will enable you to create effective humanoid robot models that can be used in simulation and control systems.

In the next section, we'll look at how to create practical exercises that allow students to apply these concepts.