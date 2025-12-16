---
sidebar_position: 3
---

# Exercise 3: Integrated Physics and Sensors

## Objective

In this exercise, you will combine physics simulation and sensor simulation to create a complete robotic system. You'll implement robot control based on sensor feedback, demonstrating how physics and sensors work together in a realistic simulation environment.

## Prerequisites

- Completed Exercise 1 (Physics-only Simulation) and Exercise 2 (Sensors-only Simulation)
- Ubuntu 22.04 with ROS 2 Humble Hawksbill installed
- Gazebo Garden installed
- Understanding of ROS 2 topics, services, and actions
- Basic Python programming skills for ROS 2 nodes

## Setup Instructions

### 1. Create Complete Robot Model

Create a comprehensive robot model that includes both physics properties and sensors at `~/simulation_ws/src/integrated_robot/urdf/integrated_robot.urdf`:

```xml
<?xml version="1.0"?>
<robot name="integrated_robot">
  <!-- Base link with realistic properties -->
  <link name="base_link">
    <inertial>
      <mass value="2.0"/>
      <inertia ixx="0.2" ixy="0.0" ixz="0.0" iyy="0.4" iyz="0.0" izz="0.4"/>
    </inertial>
    <visual>
      <geometry>
        <cylinder radius="0.2" length="0.2"/>
      </geometry>
      <material name="blue">
        <color rgba="0 0 1 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <cylinder radius="0.2" length="0.2"/>
      </geometry>
    </collision>
  </link>

  <!-- Inertial unit for stability -->
  <joint name="inertial_joint" type="fixed">
    <parent link="base_link"/>
    <child link="inertial_unit"/>
    <origin xyz="0 0 0.1"/>
  </joint>

  <link name="inertial_unit">
    <inertial>
      <mass value="0.5"/>
      <inertia ixx="0.05" ixy="0.0" ixz="0.0" iyy="0.05" iyz="0.0" izz="0.05"/>
    </inertial>
  </link>

  <!-- LiDAR sensor -->
  <joint name="lidar_mount_joint" type="fixed">
    <parent link="base_link"/>
    <child link="lidar_link"/>
    <origin xyz="0 0 0.15" rpy="0 0 0"/>
  </joint>

  <link name="lidar_link">
    <inertial>
      <mass value="0.1"/>
      <inertia ixx="0.001" ixy="0.0" ixz="0.0" iyy="0.001" iyz="0.0" izz="0.001"/>
    </inertial>
    <visual>
      <geometry>
        <cylinder radius="0.05" length="0.04"/>
      </geometry>
      <material name="black">
        <color rgba="0 0 0 1"/>
      </material>
    </visual>
  </link>

  <!-- Camera sensor -->
  <joint name="camera_mount_joint" type="fixed">
    <parent link="base_link"/>
    <child link="camera_link"/>
    <origin xyz="0.15 0 0.05" rpy="0 0 0"/>
  </joint>

  <link name="camera_link">
    <inertial>
      <mass value="0.05"/>
      <inertia ixx="0.0001" ixy="0.0" ixz="0.0" iyy="0.0001" iyz="0.0" izz="0.0001"/>
    </inertial>
    <visual>
      <geometry>
        <box size="0.02 0.08 0.08"/>
      </geometry>
      <material name="red">
        <color rgba="1 0 0 1"/>
      </material>
    </visual>
  </link>

  <!-- IMU sensor -->
  <joint name="imu_mount_joint" type="fixed">
    <parent link="base_link"/>
    <child link="imu_link"/>
    <origin xyz="0 0 0.05" rpy="0 0 0"/>
  </joint>

  <link name="imu_link">
    <inertial>
      <mass value="0.01"/>
      <inertia ixx="0.00001" ixy="0.0" ixz="0.0" iyy="0.00001" iyz="0.0" izz="0.00001"/>
    </inertial>
  </link>

  <!-- Wheel joints and links for differential drive -->
  <joint name="left_wheel_joint" type="continuous">
    <parent link="base_link"/>
    <child link="left_wheel"/>
    <origin xyz="0 0.15 -0.1" rpy="-1.57079632679 0 0"/>
    <axis xyz="0 0 1"/>
  </joint>

  <link name="left_wheel">
    <inertial>
      <mass value="0.2"/>
      <inertia ixx="0.001" ixy="0.0" ixz="0.0" iyy="0.001" iyz="0.0" izz="0.002"/>
    </inertial>
    <visual>
      <geometry>
        <cylinder radius="0.1" length="0.04"/>
      </geometry>
      <material name="gray">
        <color rgba="0.5 0.5 0.5 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <cylinder radius="0.1" length="0.04"/>
      </geometry>
    </collision>
  </link>

  <joint name="right_wheel_joint" type="continuous">
    <parent link="base_link"/>
    <child link="right_wheel"/>
    <origin xyz="0 -0.15 -0.1" rpy="-1.57079632679 0 0"/>
    <axis xyz="0 0 1"/>
  </joint>

  <link name="right_wheel">
    <inertial>
      <mass value="0.2"/>
      <inertia ixx="0.001" ixy="0.0" ixz="0.0" iyy="0.001" iyz="0.0" izz="0.002"/>
    </inertial>
    <visual>
      <geometry>
        <cylinder radius="0.1" length="0.04"/>
      </geometry>
      <material name="gray">
        <color rgba="0.5 0.5 0.5 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <cylinder radius="0.1" length="0.04"/>
      </geometry>
    </collision>
  </link>

  <!-- Gazebo plugins for differential drive -->
  <gazebo>
    <plugin name="diff_drive" filename="libgazebo_ros_diff_drive.so">
      <ros>
        <namespace>/robot</namespace>
        <remapping>cmd_vel:=cmd_vel</remapping>
        <remapping>odom:=odom</remapping>
      </ros>
      <left_joint>left_wheel_joint</left_joint>
      <right_joint>right_wheel_joint</right_joint>
      <wheel_separation>0.3</wheel_separation>
      <wheel_diameter>0.2</wheel_diameter>
      <max_wheel_torque>20</max_wheel_torque>
      <max_wheel_acceleration>1.0</max_wheel_acceleration>
      <publish_odom>true</publish_odom>
      <publish_odom_tf>true</publish_odom_tf>
      <odometry_frame>odom</odometry_frame>
      <robot_base_frame>base_link</robot_base_frame>
    </plugin>
  </gazebo>

  <!-- Gazebo sensor plugins -->
  <gazebo reference="lidar_link">
    <sensor name="lidar_sensor" type="ray">
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
          <namespace>/robot/lidar</namespace>
          <remapping>~/out:=scan</remapping>
        </ros>
        <output_type>sensor_msgs/LaserScan</output_type>
      </plugin>
      <always_on>true</always_on>
      <update_rate>10</update_rate>
    </sensor>
  </gazebo>

  <gazebo reference="camera_link">
    <sensor name="camera_sensor" type="depth">
      <camera>
        <horizontal_fov>1.047</horizontal_fov>
        <image>
          <width>640</width>
          <height>480</height>
          <format>R8G8B8</format>
        </image>
        <clip>
          <near>0.1</near>
          <far>10.0</far>
        </clip>
      </camera>
      <plugin name="camera_controller" filename="libgazebo_ros_depth_camera.so">
        <ros>
          <namespace>/robot/camera</namespace>
          <remapping>image_raw:=image_raw</remapping>
          <remapping>depth/image_raw:=depth/image_raw</remapping>
          <remapping>camera_info:=camera_info</remapping>
        </ros>
      </plugin>
      <always_on>true</always_on>
      <update_rate>15</update_rate>
    </sensor>
  </gazebo>

  <gazebo reference="imu_link">
    <sensor name="imu_sensor" type="imu">
      <always_on>true</always_on>
      <update_rate>100</update_rate>
      <imu>
        <angular_velocity>
          <x>
            <noise type="gaussian">
              <mean>0.0</mean>
              <stddev>2e-4</stddev>
            </noise>
          </x>
          <y>
            <noise type="gaussian">
              <mean>0.0</mean>
              <stddev>2e-4</stddev>
            </noise>
          </y>
          <z>
            <noise type="gaussian">
              <mean>0.0</mean>
              <stddev>2e-4</stddev>
            </noise>
          </z>
        </angular_velocity>
        <linear_acceleration>
          <x>
            <noise type="gaussian">
              <mean>0.0</mean>
              <stddev>1.7e-2</stddev>
            </noise>
          </x>
          <y>
            <noise type="gaussian">
              <mean>0.0</mean>
              <stddev>1.7e-2</stddev>
            </noise>
          </y>
          <z>
            <noise type="gaussian">
              <mean>0.0</mean>
              <stddev>1.7e-2</stddev>
            </noise>
          </z>
        </linear_acceleration>
      </imu>
      <plugin name="imu_controller" filename="libgazebo_ros_imu_sensor.so">
        <ros>
          <namespace>/robot/imu</namespace>
        </ros>
        <frame_name>imu_link</frame_name>
      </plugin>
    </sensor>
  </gazebo>
</robot>
```

### 2. Create World File for Integrated Exercise

Create a world file at `~/simulation_ws/src/integrated_robot/worlds/integrated_exercise.world`:

```xml
<?xml version="1.0" ?>
<sdf version="1.7">
  <world name="integrated_exercise">
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

    <!-- Maze environment for navigation challenge -->
    <model name="maze_wall_1">
      <pose>0 3 1 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>100</mass>
          <inertia ixx="100" ixy="0" ixz="0" iyy="100" iyz="0" izz="100"/>
        </inertial>
        <visual name="visual">
          <geometry>
            <box>
              <size>6 0.1 2</size>
            </box>
          </geometry>
          <material>
            <ambient>0.5 0.5 0.5 1</ambient>
            <diffuse>0.5 0.5 0.5 1</diffuse>
          </material>
        </visual>
        <collision name="collision">
          <geometry>
            <box>
              <size>6 0.1 2</size>
            </box>
          </geometry>
        </collision>
      </link>
    </model>

    <model name="maze_wall_2">
      <pose>0 -3 1 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>100</mass>
          <inertia ixx="100" ixy="0" ixz="0" iyy="100" iyz="0" izz="100"/>
        </inertial>
        <visual name="visual">
          <geometry>
            <box>
              <size>6 0.1 2</size>
            </box>
          </geometry>
          <material>
            <ambient>0.5 0.5 0.5 1</ambient>
            <diffuse>0.5 0.5 0.5 1</diffuse>
          </material>
        </visual>
        <collision name="collision">
          <geometry>
            <box>
              <size>6 0.1 2</size>
            </box>
          </geometry>
        </collision>
      </link>
    </model>

    <model name="maze_wall_3">
      <pose>3 0 1 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>100</mass>
          <inertia ixx="100" ixy="0" ixz="0" iyy="100" iyz="0" izz="100"/>
        </inertial>
        <visual name="visual">
          <geometry>
            <box>
              <size>0.1 6 2</size>
            </box>
          </geometry>
          <material>
            <ambient>0.5 0.5 0.5 1</ambient>
            <diffuse>0.5 0.5 0.5 1</diffuse>
          </material>
        </visual>
        <collision name="collision">
          <geometry>
            <box>
              <size>0.1 6 2</size>
            </box>
          </geometry>
        </collision>
      </link>
    </model>

    <model name="maze_wall_4">
      <pose>-3 0 1 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>100</mass>
          <inertia ixx="100" ixy="0" ixz="0" iyy="100" iyz="0" izz="100"/>
        </inertial>
        <visual name="visual">
          <geometry>
            <box>
              <size>0.1 6 2</size>
            </box>
          </geometry>
          <material>
            <ambient>0.5 0.5 0.5 1</ambient>
            <diffuse>0.5 0.5 0.5 1</diffuse>
          </material>
        </visual>
        <collision name="collision">
          <geometry>
            <box>
              <size>0.1 6 2</size>
            </box>
          </geometry>
        </collision>
      </link>
    </model>

    <!-- Internal maze walls -->
    <model name="internal_wall_1">
      <pose>1 1 1 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>50</mass>
          <inertia ixx="50" ixy="0" ixz="0" iyy="50" iyz="0" izz="50"/>
        </inertial>
        <visual name="visual">
          <geometry>
            <box>
              <size>2 0.1 2</size>
            </box>
          </geometry>
          <material>
            <ambient>0.7 0.7 0.7 1</ambient>
            <diffuse>0.7 0.7 0.7 1</diffuse>
          </material>
        </visual>
        <collision name="collision">
          <geometry>
            <box>
              <size>2 0.1 2</size>
            </box>
          </geometry>
        </collision>
      </link>
    </model>

    <model name="internal_wall_2">
      <pose>-1 -1 1 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>50</mass>
          <inertia ixx="50" ixy="0" ixz="0" iyy="50" iyz="0" izz="50"/>
        </inertial>
        <visual name="visual">
          <geometry>
            <box>
              <size>2 0.1 2</size>
            </box>
          </geometry>
          <material>
            <ambient>0.7 0.7 0.7 1</ambient>
            <diffuse>0.7 0.7 0.7 1</diffuse>
          </material>
        </visual>
        <collision name="collision">
          <geometry>
            <box>
              <size>2 0.1 2</size>
            </box>
          </geometry>
        </collision>
      </link>
    </model>

    <!-- Goal marker -->
    <model name="goal_marker">
      <pose>2 -2 0.5 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>0.1</mass>
          <inertia ixx="0.01" ixy="0" ixz="0" iyy="0.01" iyz="0" izz="0.01"/>
        </inertial>
        <visual name="visual">
          <geometry>
            <cylinder radius="0.2" length="1"/>
          </geometry>
          <material>
            <ambient>0 1 0 1</ambient>
            <diffuse>0 1 0 1</diffuse>
          </material>
        </visual>
      </link>
    </model>
  </world>
</sdf>
```

### 3. Create Navigation Node

Create a navigation node that uses sensor data to control the robot at `~/simulation_ws/src/integrated_robot/nodes/navigation_node.py`:

```python
#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from sensor_msgs.msg import LaserScan
from geometry_msgs.msg import Twist, Vector3
from nav_msgs.msg import Odometry
import math
import numpy as np

class NavigationNode(Node):
    def __init__(self):
        super().__init__('navigation_node')

        # Subscribe to laser scan data
        self.lidar_sub = self.create_subscription(
            LaserScan,
            '/robot/lidar/scan',
            self.lidar_callback,
            10
        )

        # Subscribe to odometry data
        self.odom_sub = self.create_subscription(
            Odometry,
            '/robot/odom',
            self.odom_callback,
            10
        )

        # Publisher for velocity commands
        self.cmd_vel_pub = self.create_publisher(Twist, '/robot/cmd_vel', 10)

        # Timer for control loop
        self.timer = self.create_timer(0.1, self.control_loop)

        # Robot state
        self.lidar_data = None
        self.odom_data = None
        self.obstacle_detected = False
        self.target_reached = False

        # Navigation parameters
        self.safe_distance = 0.5  # meters
        self.linear_speed = 0.3   # m/s
        self.angular_speed = 0.5  # rad/s
        self.goal_x = 2.0
        self.goal_y = -2.0

        self.get_logger().info('Navigation node initialized')

    def lidar_callback(self, msg):
        self.lidar_data = msg
        self.process_lidar_data()

    def odom_callback(self, msg):
        self.odom_data = msg

    def process_lidar_data(self):
        if self.lidar_data is None:
            return

        # Check for obstacles in front (30 degree sectors)
        front_ranges = []
        # Front left (30 degrees)
        for i in range(165, 195):  # Approximately front left
            if 0 < self.lidar_data.ranges[i] < float('inf'):
                front_ranges.append(self.lidar_data.ranges[i])

        # Front center (30 degrees)
        for i in range(180-15, 180+15):  # Front center
            if 0 < self.lidar_data.ranges[i] < float('inf'):
                front_ranges.append(self.lidar_data.ranges[i])

        # Front right (30 degrees)
        for i in range(165, 195):  # Approximately front right
            idx = (i + 180) % 360  # Mirror to front right
            if 0 < self.lidar_data.ranges[idx] < float('inf'):
                front_ranges.append(self.lidar_data.ranges[idx])

        # Calculate minimum distance in front
        if front_ranges:
            min_front_dist = min(front_ranges)
            self.obstacle_detected = min_front_dist < self.safe_distance
        else:
            self.obstacle_detected = False

    def get_robot_position(self):
        if self.odom_data is None:
            return 0.0, 0.0, 0.0

        x = self.odom_data.pose.pose.position.x
        y = self.odom_data.pose.pose.position.y

        # Extract yaw from quaternion
        quat = self.odom_data.pose.pose.orientation
        siny_cosp = 2 * (quat.w * quat.z + quat.x * quat.y)
        cosy_cosp = 1 - 2 * (quat.y * quat.y + quat.z * quat.z)
        yaw = math.atan2(siny_cosp, cosy_cosp)

        return x, y, yaw

    def control_loop(self):
        if self.lidar_data is None or self.odom_data is None:
            return

        cmd = Twist()

        # Get current position
        robot_x, robot_y, robot_yaw = self.get_robot_position()

        # Calculate distance to goal
        dist_to_goal = math.sqrt((self.goal_x - robot_x)**2 + (self.goal_y - robot_y)**2)

        # Check if goal is reached
        if dist_to_goal < 0.5:  # 0.5m tolerance
            cmd.linear.x = 0.0
            cmd.angular.z = 0.0
            if not self.target_reached:
                self.get_logger().info(f'Goal reached! Position: ({robot_x:.2f}, {robot_y:.2f})')
                self.target_reached = True
        elif self.obstacle_detected:
            # Obstacle avoidance behavior
            self.get_logger().info('Obstacle detected, executing avoidance')
            cmd.linear.x = 0.0
            cmd.angular.z = self.angular_speed  # Turn right
        else:
            # Navigate towards goal
            target_angle = math.atan2(self.goal_y - robot_y, self.goal_x - robot_x)
            angle_diff = target_angle - robot_yaw

            # Normalize angle to [-pi, pi]
            while angle_diff > math.pi:
                angle_diff -= 2 * math.pi
            while angle_diff < -math.pi:
                angle_diff += 2 * math.pi

            # PID-like control for rotation
            cmd.linear.x = self.linear_speed
            cmd.angular.z = max(-self.angular_speed, min(self.angular_speed, 2.0 * angle_diff))

        # Publish command
        self.cmd_vel_pub.publish(cmd)

def main(args=None):
    rclpy.init(args=args)
    node = NavigationNode()

    try:
        rclpy.spin(node)
    except KeyboardInterrupt:
        node.get_logger().info('Navigation node stopped by user')
    finally:
        # Stop the robot before shutting down
        stop_cmd = Twist()
        node.cmd_vel_pub.publish(stop_cmd)
        node.destroy_node()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Exercise Tasks

### Task 1: Launch Integrated Simulation

1. Build your workspace:
   ```bash
   cd ~/simulation_ws
   colcon build --packages-select integrated_robot
   source install/setup.bash
   ```

2. Launch the integrated simulation:
   ```bash
   # Terminal 1: Launch Gazebo with the robot
   ros2 launch integrated_robot integrated_simulation.launch.py
   ```

   If you need to create a launch file, use this template:
   ```bash
   # Create the launch file
   mkdir -p ~/simulation_ws/src/integrated_robot/launch
   ```

   Create `~/simulation_ws/src/integrated_robot/launch/integrated_simulation.launch.py`:
   ```python
   from launch import LaunchDescription
   from launch.actions import DeclareLaunchArgument, ExecuteProcess
   from launch.substitutions import LaunchConfiguration, Command
   from launch_ros.actions import Node
   from launch.actions import IncludeLaunchDescription
   from launch.launch_description_sources import PythonLaunchDescriptionSource
   from ament_index_python.packages import get_package_share_directory
   import os

   def generate_launch_description():
       pkg_dir = get_package_share_directory('integrated_robot')
       robot_urdf = os.path.join(pkg_dir, 'urdf', 'integrated_robot.urdf')
       world_file = os.path.join(pkg_dir, 'worlds', 'integrated_exercise.world')

       # Launch Gazebo
       gazebo = IncludeLaunchDescription(
           PythonLaunchDescriptionSource(
               os.path.join(get_package_share_directory('gazebo_ros'), 'launch', 'gazebo.launch.py')
           ),
           launch_arguments={
               'world': world_file,
               'verbose': 'true'
           }.items()
       )

       # Robot State Publisher
       robot_state_publisher = Node(
           package='robot_state_publisher',
           executable='robot_state_publisher',
           name='robot_state_publisher',
           parameters=[{
               'use_sim_time': True,
               'robot_description': Command(['xacro ', robot_urdf])
           }]
       )

       # Spawn the robot in Gazebo
       spawn_entity = Node(
           package='gazebo_ros',
           executable='spawn_entity.py',
           arguments=[
               '-topic', 'robot_description',
               '-entity', 'integrated_robot',
               '-x', '0', '-y', '0', '-z', '0.2'
           ],
           output='screen'
       )

       return LaunchDescription([
           DeclareLaunchArgument(
               'world',
               default_value=world_file,
               description='Choose one of the world files from `/integrated_robot/worlds`'
           ),
           gazebo,
           robot_state_publisher,
           spawn_entity
       ])
   ```

### Task 2: Monitor Integrated System

1. In a new terminal, monitor all sensor data:
   ```bash
   # Monitor laser scan data
   ros2 topic echo /robot/lidar/scan sensor_msgs/msg/LaserScan

   # Monitor odometry
   ros2 topic echo /robot/odom nav_msgs/msg/Odometry

   # Monitor IMU data
   ros2 topic echo /robot/imu/data sensor_msgs/msg/Imu
   ```

2. In another terminal, publish velocity commands manually to test the system:
   ```bash
   # Move forward
   ros2 topic pub /robot/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 0.5}, angular: {z: 0.0}}"

   # Turn in place
   ros2 topic pub /robot/cmd_vel geometry_msgs/msg/Twist "{linear: {x: 0.0}, angular: {z: 0.5}}"
   ```

### Task 3: Run Navigation Node

1. Make the navigation node executable:
   ```bash
   chmod +x ~/simulation_ws/src/integrated_robot/nodes/navigation_node.py
   ```

2. Build again to register the executable:
   ```bash
   cd ~/simulation_ws
   colcon build --packages-select integrated_robot
   source install/setup.bash
   ```

3. Run the navigation node in a new terminal:
   ```bash
   ros2 run integrated_robot navigation_node.py
   ```

4. Observe how the robot uses sensor data to navigate around obstacles toward the goal.

### Task 4: Analyze Sensor-Physics Interaction

1. Monitor how sensor readings change as the robot moves through the environment:
   ```bash
   # Record sensor data while the robot is navigating
   ros2 bag record /robot/lidar/scan /robot/odom /robot/cmd_vel -o ~/integrated_data
   ```

2. Stop the recording after the robot has moved for a while (Ctrl+C).

3. Analyze the relationship between:
   - Robot motion (from odometry)
   - Sensor readings (from LiDAR)
   - Control commands (from navigation node)

### Task 5: Modify Navigation Behavior

1. Modify the navigation parameters in the `navigation_node.py`:
   - Change the `safe_distance` to see how it affects obstacle avoidance
   - Adjust the `linear_speed` and `angular_speed` for different navigation characteristics

2. Rebuild and run the node to observe changes in behavior.

3. Try different strategies for obstacle avoidance (e.g., turn left instead of right).

### Task 6: Add Sensor Validation

1. Create a sensor validation node that checks sensor data quality:
   ```python
   #!/usr/bin/env python3
   import rclpy
   from rclpy.node import Node
   from sensor_msgs.msg import LaserScan, Imu
   from std_msgs.msg import Bool

   class SensorValidatorNode(Node):
       def __init__(self):
           super().__init__('sensor_validator')

           # Subscribe to sensor data
           self.lidar_sub = self.create_subscription(
               LaserScan,
               '/robot/lidar/scan',
               self.validate_lidar,
               10
           )

           self.imu_sub = self.create_subscription(
               Imu,
               '/robot/imu/data',
               self.validate_imu,
               10
           )

           # Publisher for sensor health status
           self.health_pub = self.create_publisher(Bool, '/robot/sensors_healthy', 10)

           self.sensors_healthy = True
           self.timer = self.create_timer(1.0, self.publish_health_status)

       def validate_lidar(self, msg):
           # Check if we have valid range readings
           valid_ranges = [r for r in msg.ranges if 0 < r < float('inf')]
           if len(valid_ranges) < len(msg.ranges) * 0.5:  # Less than 50% valid
               self.get_logger().warn('Lidar has too many invalid ranges')
               self.sensors_healthy = False
           else:
               self.sensors_healthy = True

       def validate_imu(self, msg):
           # Check if IMU readings are reasonable
           if (abs(msg.linear_acceleration.x) > 50.0 or
               abs(msg.linear_acceleration.y) > 50.0 or
               abs(msg.linear_acceleration.z) > 50.0):
               self.get_logger().warn('IMU acceleration readings are too high')
               self.sensors_healthy = False
           else:
               self.sensors_healthy = True

       def publish_health_status(self):
           msg = Bool()
           msg.data = self.sensors_healthy
           self.health_pub.publish(msg)

   def main(args=None):
       rclpy.init(args=args)
       node = SensorValidatorNode()
       rclpy.spin(node)
       node.destroy_node()
       rclpy.shutdown()

   if __name__ == '__main__':
       main()
   ```

2. Run the sensor validation node alongside the navigation node:
   ```bash
   ros2 run integrated_robot sensor_validator.py
   ```

### Task 7: Performance Analysis

1. Monitor system performance during the integrated simulation:
   ```bash
   # Monitor CPU usage
   htop

   # Monitor ROS 2 topics
   ros2 topic hz /robot/lidar/scan
   ros2 topic hz /robot/odom
   ```

2. Record and analyze the performance data to understand the computational requirements of the integrated system.

## Expected Outcomes

By completing this exercise, you should be able to:

1. Successfully integrate physics simulation with sensor simulation and robot control
2. Implement a complete robotic system with sensor-based navigation
3. Understand how sensor data affects robot behavior in a physics-based environment
4. Analyze the interaction between different components of the robotic system
5. Validate sensor data quality in the context of robot navigation
6. Evaluate the computational requirements of an integrated robotic system

## Troubleshooting

### Common Issues:

- **Robot not moving**: Check that the differential drive plugin is properly configured
- **Sensor data not updating**: Verify that sensor plugins are correctly set up in the URDF
- **Navigation not working**: Check that all required topics are being published/subscribed
- **High CPU usage**: Reduce sensor update rates or simplify the environment

## Summary

This exercise demonstrates the integration of physics simulation and sensor simulation in a complete robotic system. You've learned how to combine these elements to create an autonomous navigation system that uses sensor feedback to navigate through a complex environment while respecting physical constraints.

The integration of physics and sensors provides a realistic simulation environment that can be used for testing and validating robotics algorithms before deployment on real hardware.