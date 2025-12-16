---
sidebar_position: 2
---

# Exercise 2: Intermediate Node Communication and URDF Modeling

## Objective

Create a more complex ROS 2 node that publishes sensor data and integrates with a basic URDF model.

## Prerequisites

- Completion of Exercise 1
- Understanding of ROS 2 topics, services, and basic URDF
- ROS 2 Humble Hawksbill installed
- Python 3.8

## Learning Outcomes

After completing this exercise, you will be able to:
- Create nodes that publish more complex message types
- Understand the structure of URDF files
- Visualize a simple robot model in RViz

## Estimated Duration

45-60 minutes

## Part A: Advanced Publisher-Subscriber System

### Step 1: Create a Sensor Data Publisher

Create a new script `my_robot_exercises/my_robot_exercises/sensor_publisher.py`:

```python
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import JointState
from std_msgs.msg import Header
import math
import random

class SensorPublisher(Node):
    def __init__(self):
        super().__init__('sensor_publisher')

        # Create publisher for joint states
        self.joint_publisher = self.create_publisher(JointState, 'joint_states', 10)

        # Create timer to publish at 10 Hz
        self.timer = self.create_timer(0.1, self.publish_joint_states)

        # Initialize joint positions
        self.joint_positions = [0.0, 0.0, 0.0, 0.0]  # 4 joints
        self.joint_names = ['joint1', 'joint2', 'joint3', 'joint4']

        self.get_logger().info('Sensor Publisher Node Started')

    def publish_joint_states(self):
        msg = JointState()
        msg.header = Header()
        msg.header.stamp = self.get_clock().now().to_msg()
        msg.header.frame_id = 'base_link'

        # Update joint positions with some simulated movement
        for i in range(len(self.joint_positions)):
            # Add some oscillating movement
            self.joint_positions[i] = 0.5 * math.sin(self.get_clock().now().nanoseconds / 1e9 + i)

        msg.name = self.joint_names
        msg.position = self.joint_positions
        msg.velocity = [0.0] * len(self.joint_positions)
        msg.effort = [0.0] * len(self.joint_positions)

        self.joint_publisher.publish(msg)
        self.get_logger().info(f'Published joint states: {self.joint_positions}')

def main(args=None):
    rclpy.init(args=args)
    node = SensorPublisher()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Step 2: Update setup.py

Add the new executable to your `setup.py`:

```python
entry_points={
    'console_scripts': [
        'talker = my_robot_exercises.publisher_member_function:main',
        'listener = my_robot_exercises.subscriber_member_function:main',
        'sensor_publisher = my_robot_exercises.sensor_publisher:main',
    ],
},
```

### Step 3: Build and Test the Node

```bash
cd ~/ros2_ws
colcon build --packages-select my_robot_exercises
source install/setup.bash
ros2 run my_robot_exercises sensor_publisher
```

## Part B: Creating a Simple URDF Model

### Step 4: Create URDF Directory Structure

```bash
cd ~/ros2_ws/src/my_robot_exercises
mkdir -p urdf
```

### Step 5: Create a Simple Robot URDF

Create `my_robot_exercises/urdf/simple_robot.urdf`:

```xml
<?xml version="1.0"?>
<robot name="simple_robot">
  <!-- Base link -->
  <link name="base_link">
    <visual>
      <origin xyz="0 0 0.1" rpy="0 0 0"/>
      <geometry>
        <cylinder radius="0.2" length="0.2"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 1 1"/>
      </material>
    </visual>
    <collision>
      <origin xyz="0 0 0.1" rpy="0 0 0"/>
      <geometry>
        <cylinder radius="0.2" length="0.2"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="1.0"/>
      <inertia ixx="0.1" ixy="0" ixz="0" iyy="0.1" iyz="0" izz="0.1"/>
    </inertial>
  </link>

  <!-- First arm link -->
  <link name="arm_link">
    <visual>
      <origin xyz="0.15 0 0" rpy="0 0 0"/>
      <geometry>
        <box size="0.3 0.05 0.05"/>
      </geometry>
      <material name="red">
        <color rgba="1 0 0 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.3 0.05 0.05"/>
      </geometry>
    </collision>
    <inertial>
      <mass value="0.5"/>
      <inertia ixx="0.01" ixy="0" ixz="0" iyy="0.01" iyz="0" izz="0.01"/>
    </inertial>
  </link>

  <!-- Joint connecting base to arm -->
  <joint name="arm_joint" type="revolute">
    <parent link="base_link"/>
    <child link="arm_link"/>
    <origin xyz="0.2 0 0.1" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-1.57" upper="1.57" effort="100" velocity="1"/>
  </joint>
</robot>
```

### Step 6: Create a URDF Launch File

Create `my_robot_exercises/launch/display_robot.launch.py`:

```python
from launch import LaunchDescription
from launch.substitutions import Command
from launch_ros.actions import Node
from ament_index_python.packages import get_package_share_directory
import os

def generate_launch_description():
    pkg_share = get_package_share_directory('my_robot_exercises')
    urdf_file = os.path.join(pkg_share, 'urdf', 'simple_robot.urdf')

    # Robot state publisher node
    robot_state_publisher = Node(
        package='robot_state_publisher',
        executable='robot_state_publisher',
        name='robot_state_publisher',
        parameters=[{
            'robot_description': Command(['xacro ', urdf_file])
        }]
    )

    # Joint state publisher node
    joint_state_publisher = Node(
        package='joint_state_publisher',
        executable='joint_state_publisher',
        name='joint_state_publisher'
    )

    # RViz node
    rviz = Node(
        package='rviz2',
        executable='rviz2',
        name='rviz2',
        arguments=['-d', os.path.join(pkg_share, 'rviz', 'urdf_config.rviz')]
    )

    return LaunchDescription([
        robot_state_publisher,
        joint_state_publisher,
        rviz
    ])
```

### Step 7: Create RViz Configuration

Create the rviz directory and configuration file:

```bash
mkdir -p ~/ros2_ws/src/my_robot_exercises/rviz
```

Create `my_robot_exercises/rviz/urdf_config.rviz`:

```yaml
Panels:
  - Class: rviz_common/Displays
    Help Height: 78
    Name: Displays
    Property Tree Widget:
      Expanded:
        - /Global Options1
        - /Status1
        - /RobotModel1
      Splitter Ratio: 0.5
    Tree Height: 690
Visualization Manager:
  Class: ""
  Displays:
    - Alpha: 0.5
      Cell Size: 1
      Class: rviz_default_plugins/Grid
      Color: 160; 160; 164
      Enabled: true
      Line Style:
        Line Width: 0.029999999329447746
        Value: Lines
      Name: Grid
      Normal Cell Count: 0
      Offset:
        X: 0
        Y: 0
        Z: 0
      Plane: XY
      Plane Cell Count: 10
      Reference Frame: <Fixed Frame>
      Value: true
    - Alpha: 1
      Class: rviz_default_plugins/RobotModel
      Collision Enabled: false
      Description File: ""
      Description Source: Topic
      Description Topic:
        Depth: 5
        Durability Policy: Volatile
        History Policy: Keep Last
        Reliability Policy: Reliable
        Value: /robot_description
      Enabled: true
      Links:
        All Links Enabled: true
        Expand Joint Details: false
        Expand Link Details: false
        Expand Tree: false
        Link Tree Style: Links in Alphabetic Order
      Name: RobotModel
      TF Prefix: ""
      Update Interval: 0
      Value: true
      Visual Enabled: true
  Enabled: true
  Global Options:
    Background Color: 48; 48; 48
    Fixed Frame: base_link
    Frame Rate: 30
  Name: root
  Tools:
    - Class: rviz_default_plugins/Interact
      Hide Inactive Objects: true
    - Class: rviz_default_plugins/MoveCamera
    - Class: rviz_default_plugins/Select
    - Class: rviz_default_plugins/FocusCamera
  Transformation:
    Current:
      Class: rviz_default_plugins/TF
  Value: true
  Views:
    Current:
      Class: rviz_default_plugins/Orbit
      Distance: 1.7000000476837158
      Enable Stereo Rendering:
        Stereo Eye Separation: 0.05999999865889549
        Stereo Focal Distance: 1
        Swap Stereo Eyes: false
        Value: false
      Focal Point:
        X: 0
        Y: 0
        Z: 0
      Focal Shape Fixed Size: true
      Focal Shape Size: 0.05000000074505806
      Invert Z Axis: false
      Name: Current View
      Near Clip Distance: 0.009999999776482582
      Pitch: 0.5
      Target Frame: <Fixed Frame>
      Value: Orbit (rviz)
      Yaw: 0.5
    Saved: ~
Window Geometry:
  Displays:
    collapsed: false
  Height: 896
  Width: 1200
```

### Step 8: Update Package.xml

Add necessary dependencies to `my_robot_exercises/package.xml`:

```xml
<?xml version="1.0"?>
<?xml-model href="http://download.ros.org/schema/package_format3.xsd" schematypens="http://www.w3.org/2001/XMLSchema"?>
<package format="3">
  <name>my_robot_exercises</name>
  <version>0.0.0</version>
  <description>Basic ROS 2 exercises</description>
  <maintainer email="your.email@example.com">Your Name</maintainer>
  <license>Apache-2.0</license>

  <test_depend>ament_copyright</test_depend>
  <test_depend>ament_flake8</test_depend>
  <test_depend>ament_pep257</test_depend>
  <test_depend>python3-pytest</test_depend>

  <exec_depend>rclpy</exec_depend>
  <exec_depend>std_msgs</exec_depend>
  <exec_depend>sensor_msgs</exec_depend>
  <exec_depend>geometry_msgs</exec_depend>
  <exec_depend>launch</exec_depend>
  <exec_depend>launch_ros</exec_depend>
  <exec_depend>robot_state_publisher</exec_depend>
  <exec_depend>joint_state_publisher</exec_depend>
  <exec_depend>rviz2</exec_depend>
  <exec_depend>xacro</exec_depend>

  <export>
    <build_type>ament_python</build_type>
  </export>
</package>
```

### Step 9: Build and Run the Visualization

```bash
cd ~/ros2_ws
colcon build --packages-select my_robot_exercises
source install/setup.bash
ros2 launch my_robot_exercises display_robot.launch.py
```

## Expected Results

- You should see the simple robot model displayed in RViz
- The robot should have a base and one arm link
- You should be able to rotate the view to see the robot from different angles

## Troubleshooting Tips

- If the robot doesn't appear in RViz, check that the URDF file is valid
- Ensure all dependencies are properly installed
- Check that the joint states topic is being published if you want to see animated joints

## Advanced Challenge

Extend the URDF model to include more links and joints, creating a more complex robot arm. Then modify the sensor publisher to publish joint states that match your new robot model.

## Summary

This exercise combined advanced ROS 2 concepts with URDF modeling. You created a sensor publisher that publishes joint states and visualized a simple robot model in RViz. This is a fundamental skill for humanoid robotics, where you'll need to model complex robots and visualize their states during simulation and control.