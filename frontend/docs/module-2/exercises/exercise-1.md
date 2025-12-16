---
sidebar_position: 1
---

# Exercise 1: Physics-only Simulation

## Objective

In this exercise, you will set up a basic Gazebo simulation environment and explore fundamental physics concepts including gravity, collisions, and rigid body dynamics. This exercise focuses purely on physics simulation without sensors to help you understand the core principles.

## Prerequisites

- Completed Module 1 (ROS 2 fundamentals)
- Ubuntu 22.04 with ROS 2 Humble Hawksbill installed
- Gazebo Garden installed
- Basic understanding of URDF format

## Setup Instructions

### 1. Verify Gazebo Installation

First, ensure Gazebo is properly installed:

```bash
gazebo --version
```

You should see Gazebo Garden version information. If not, follow the installation steps from the Gazebo Setup section.

### 2. Create Workspace Directory

Create a workspace for this exercise:

```bash
mkdir -p ~/simulation_ws/src
cd ~/simulation_ws
colcon build
source install/setup.bash
```

### 3. Create a Simple Robot Model

Create a simple robot model that will be used in the simulation:

```bash
mkdir -p ~/simulation_ws/src/simple_robot_description/models/simple_robot
```

Create the robot URDF file at `~/simulation_ws/src/simple_robot/urdf/simple_robot.urdf`:

```xml
<?xml version="1.0"?>
<robot name="simple_robot">
  <!-- Base link -->
  <link name="base_link">
    <inertial>
      <mass value="1.0"/>
      <inertia ixx="0.1" ixy="0.0" ixz="0.0" iyy="0.1" iyz="0.0" izz="0.1"/>
    </inertial>
    <visual>
      <geometry>
        <box size="0.5 0.2 0.3"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 1 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.5 0.2 0.3"/>
      </geometry>
    </collision>
  </link>

  <!-- Upper body link -->
  <joint name="base_to_upper" type="fixed">
    <parent link="base_link"/>
    <child link="upper_body"/>
    <origin xyz="0 0 0.25"/>
  </joint>

  <link name="upper_body">
    <inertial>
      <mass value="0.5"/>
      <inertia ixx="0.05" ixy="0.0" ixz="0.0" iyy="0.05" iyz="0.0" izz="0.05"/>
    </inertial>
    <visual>
      <geometry>
        <box size="0.3 0.2 0.3"/>
      </geometry>
      <material name="red">
        <color rgba="1 0 0 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.3 0.2 0.3"/>
      </geometry>
    </collision>
  </link>
</robot>
```

### 4. Create a World File

Create a simple world file at `~/simulation_ws/src/simple_robot/worlds/physics_exercise.world`:

```xml
<?xml version="1.0" ?>
<sdf version="1.7">
  <world name="physics_exercise">
    <!-- Physics engine configuration -->
    <physics type="ode">
      <max_step_size>0.001</max_step_size>
      <real_time_update_rate>1000</real_time_update_rate>
      <gravity>0 0 -9.8</gravity>
      <ode>
        <solver>
          <type>quick</type>
          <iters>10</iters>
          <sor>1.3</sor>
        </solver>
        <constraints>
          <cfm>0.0</cfm>
          <erp>0.2</erp>
          <contact_max_correcting_vel>100</contact_max_correcting_vel>
          <contact_surface_layer>0.001</contact_surface_layer>
        </constraints>
      </ode>
    </physics>

    <!-- Ground plane -->
    <include>
      <uri>model://ground_plane</uri>
    </include>

    <!-- Sun light -->
    <include>
      <uri>model://sun</uri>
    </include>

    <!-- Simple objects for collision testing -->
    <model name="box_obstacle">
      <pose>2 0 0.5 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>0.5</mass>
          <inertia ixx="0.1" ixy="0" ixz="0" iyy="0.1" iyz="0" izz="0.1"/>
        </inertial>
        <visual name="visual">
          <geometry>
            <box>
              <size>0.5 0.5 0.5</size>
            </box>
          </geometry>
          <material>
            <ambient>0.8 0.3 0.1 1</ambient>
            <diffuse>0.8 0.3 0.1 1</diffuse>
          </material>
        </visual>
        <collision name="collision">
          <geometry>
            <box>
              <size>0.5 0.5 0.5</size>
            </box>
          </geometry>
        </collision>
      </link>
    </model>

    <!-- Sphere for testing different shapes -->
    <model name="sphere_obstacle">
      <pose>-2 1 0.5 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>0.3</mass>
          <inertia ixx="0.1" ixy="0" ixz="0" iyy="0.1" iyz="0" izz="0.1"/>
        </inertial>
        <visual name="visual">
          <geometry>
            <sphere>
              <radius>0.25</radius>
            </sphere>
          </geometry>
          <material>
            <ambient>0.1 0.8 0.3 1</ambient>
            <diffuse>0.1 0.8 0.3 1</diffuse>
          </material>
        </visual>
        <collision name="collision">
          <geometry>
            <sphere>
              <radius>0.25</radius>
            </sphere>
          </geometry>
        </collision>
      </link>
    </model>
  </world>
</sdf>
```

## Exercise Tasks

### Task 1: Launch the Simulation

1. Open a terminal and navigate to your workspace:
   ```bash
   cd ~/simulation_ws
   source install/setup.bash
   ```

2. Launch the simulation with your world file:
   ```bash
   gazebo ~/simulation_ws/src/simple_robot/worlds/physics_exercise.world
   ```

3. Observe the initial state of the simulation. You should see:
   - A ground plane
   - Your simple robot model
   - Additional objects (box and sphere)
   - All objects should be stationary initially

### Task 2: Observe Gravity Effects

1. In the Gazebo interface, select the "World" tab if it's not already selected.

2. Click the play button to start the simulation.

3. Observe how gravity affects the objects:
   - The robot should fall to the ground
   - The box and sphere obstacles should remain stationary (they're fixed in place for now)
   - Note the time in the bottom-left corner to track real-time factor

4. Pause the simulation using the pause button when you've observed the effects.

### Task 3: Modify Gravity and Observe Changes

1. In the world file, modify the gravity vector to see different effects:
   ```xml
   <gravity>0 0 -4.9</gravity>  <!-- Half of Earth's gravity -->
   ```

2. Save the file and restart the simulation to observe slower falling motion.

3. Try changing gravity to `0 0 0` to see zero-gravity effects.

4. Try negative gravity to see objects "fall" upward.

### Task 4: Test Collision Detection

1. Modify the world file to make the box obstacle dynamic (not fixed):
   Remove the static property or set it to false:
   ```xml
   <static>false</static>  <!-- Add this line to the box_obstacle model -->
   ```

2. Save and restart the simulation.

3. Observe how the robot collides with the box when it falls.

4. Try different initial positions for objects to see various collision scenarios.

### Task 5: Experiment with Mass Properties

1. Modify the mass of your robot's base_link in the URDF file:
   ```xml
   <mass value="5.0"/>  <!-- Increase from 1.0 to 5.0 -->
   ```

2. Rebuild your package:
   ```bash
   cd ~/simulation_ws
   colcon build
   source install/setup.bash
   ```

3. Restart the simulation and observe how the increased mass affects:
   - Falling speed (should be the same due to gravity)
   - Collision behavior with other objects
   - Stability when landing

### Task 6: Test Different Joint Types

1. Modify the joint between base_link and upper_body to be a revolute joint instead of fixed:
   ```xml
   <joint name="base_to_upper" type="revolute">
     <parent link="base_link"/>
     <child link="upper_body"/>
     <origin xyz="0 0 0.25"/>
     <axis xyz="0 1 0"/>  <!-- Rotate around Y axis -->
     <limit lower="-0.5" upper="0.5" effort="100" velocity="1"/>
   </joint>
   ```

2. Rebuild and restart the simulation to see how the upper body moves independently.

3. Try different joint types (continuous, prismatic) and observe the differences.

## Expected Outcomes

By completing this exercise, you should be able to:

1. Successfully launch a Gazebo simulation with custom world and robot models
2. Observe and understand the effects of gravity on different objects
3. Modify physics parameters and observe the resulting changes
4. Understand how collision detection works in the simulation
5. Experiment with different mass properties and joint types
6. Understand the relationship between URDF models and physical behavior

## Troubleshooting

### Common Issues:

- **Model not appearing**: Check that the URDF file is properly formatted and that links have both visual and collision elements
- **Gravity not working**: Ensure physics engine is enabled in the world file
- **Collisions not working**: Verify that objects have collision elements defined
- **Simulation running slowly**: Reduce physics update rate or simplify collision geometries

## Next Steps

This exercise focused purely on physics simulation. In the next exercise, you'll add sensors to your robot and observe how they interact with the physics simulation.