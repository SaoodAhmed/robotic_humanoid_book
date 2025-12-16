---
sidebar_position: 2
---

# Exercise 2: Sensors-only Simulation

## Objective

In this exercise, you will add various sensors to your robot model and observe how they generate realistic data streams in the simulation environment. This exercise focuses on sensor simulation without complex robot control to help you understand sensor principles and data processing.

## Prerequisites

- Completed Exercise 1 (Physics-only Simulation)
- Ubuntu 22.04 with ROS 2 Humble Hawksbill installed
- Gazebo Garden installed
- Understanding of ROS 2 topics and messages
- Basic knowledge of sensor types (LiDAR, camera, IMU)

## Setup Instructions

### 1. Update Robot Model with Sensors

Building on the robot model from Exercise 1, add sensors to the URDF file at `~/simulation_ws/src/simple_robot/urdf/sensor_robot.urdf`:

```xml
<?xml version="1.0"?>
<robot name="sensor_robot">
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

  <!-- LiDAR sensor mounted on top -->
  <joint name="lidar_mount_joint" type="fixed">
    <parent link="base_link"/>
    <child link="lidar_link"/>
    <origin xyz="0 0 0.2" rpy="0 0 0"/>
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
    <collision>
      <geometry>
        <cylinder radius="0.05" length="0.04"/>
      </geometry>
    </collision>
  </link>

  <!-- Camera sensor -->
  <joint name="camera_mount_joint" type="fixed">
    <parent link="base_link"/>
    <child link="camera_link"/>
    <origin xyz="0.2 0 0.1" rpy="0 0 0"/>
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
    <collision>
      <geometry>
        <box size="0.02 0.08 0.08"/>
      </geometry>
    </collision>
  </link>

  <!-- IMU sensor -->
  <joint name="imu_mount_joint" type="fixed">
    <parent link="base_link"/>
    <child link="imu_link"/>
    <origin xyz="0 0 0.1" rpy="0 0 0"/>
  </joint>

  <link name="imu_link">
    <inertial>
      <mass value="0.01"/>
      <inertia ixx="0.00001" ixy="0.0" ixz="0.0" iyy="0.00001" iyz="0.0" izz="0.00001"/>
    </inertial>
    <visual>
      <geometry>
        <box size="0.01 0.01 0.01"/>
      </geometry>
      <material name="green">
        <color rgba="0 1 0 1"/>
      </material>
    </visual>
    <collision>
      <geometry>
        <box size="0.01 0.01 0.01"/>
      </geometry>
    </collision>
  </link>

  <!-- Gazebo-specific sensor definitions -->
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
          <namespace>/lidar</namespace>
          <remapping>~/out:=scan</remapping>
        </ros>
        <output_type>sensor_msgs/LaserScan</output_type>
      </plugin>
      <always_on>true</always_on>
      <update_rate>10</update_rate>
      <visualize>false</visualize>
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
          <namespace>/camera</namespace>
          <remapping>image_raw:=/camera/image_raw</remapping>
          <remapping>depth/image_raw:=/camera/depth/image_raw</remapping>
          <remapping>camera_info:=/camera/camera_info</remapping>
        </ros>
        <output_type>sensor_msgs/Image</output_type>
      </plugin>
      <always_on>true</always_on>
      <update_rate>15</update_rate>
      <visualize>false</visualize>
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
          <namespace>/imu</namespace>
        </ros>
        <frame_name>imu_link</frame_name>
      </plugin>
    </sensor>
  </gazebo>
</robot>
```

### 2. Create Launch File

Create a launch file to easily start the simulation with sensors at `~/simulation_ws/src/simple_robot/launch/sensor_simulation.launch.py`:

```python
from launch import LaunchDescription
from launch.actions import DeclareLaunchArgument
from launch.substitutions import LaunchConfiguration
from launch_ros.actions import Node
from launch.actions import IncludeLaunchDescription
from launch.launch_description_sources import PythonLaunchDescriptionSource
from ament_index_python.packages import get_package_share_directory
import os

def generate_launch_description():
    # Get the package share directory
    pkg_dir = get_package_share_directory('simple_robot')

    # World file path
    world_file = os.path.join(pkg_dir, 'worlds', 'sensor_exercise.world')

    # Launch Gazebo with the world file
    gazebo = IncludeLaunchDescription(
        PythonLaunchDescriptionSource(
            os.path.join(get_package_share_directory('gazebo_ros'), 'launch', 'gazebo.launch.py')
        ),
        launch_arguments={
            'world': world_file,
            'verbose': 'true'
        }.items()
    )

    # Spawn the robot in Gazebo
    spawn_entity = Node(
        package='gazebo_ros',
        executable='spawn_entity.py',
        arguments=[
            '-topic', 'robot_description',
            '-entity', 'sensor_robot'
        ],
        output='screen'
    )

    # Robot State Publisher
    robot_state_publisher = Node(
        package='robot_state_publisher',
        executable='robot_state_publisher',
        name='robot_state_publisher',
        output='screen',
        parameters=[{'use_sim_time': True}]
    )

    # Static transform publisher for robot description
    robot_description_publisher = Node(
        package='simple_robot',
        executable='robot_description_publisher',  # This would need to be created
        name='robot_description_publisher',
        output='screen'
    )

    return LaunchDescription([
        DeclareLaunchArgument(
            'world',
            default_value=world_file,
            description='Choose one of the world files from `/simple_robot/worlds`'
        ),
        gazebo,
        spawn_entity,
        robot_state_publisher,
    ])
```

### 3. Create World File for Sensor Exercise

Create a world file at `~/simulation_ws/src/simple_robot/worlds/sensor_exercise.world`:

```xml
<?xml version="1.0" ?>
<sdf version="1.7">
  <world name="sensor_exercise">
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

    <!-- Simple environment for sensor testing -->
    <model name="wall_1">
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

    <model name="wall_2">
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

    <model name="obstacle_box">
      <pose>1 1 0.5 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>5</mass>
          <inertia ixx="0.5" ixy="0" ixz="0" iyy="0.5" iyz="0" izz="0.5"/>
        </inertial>
        <visual name="visual">
          <geometry>
            <box>
              <size>1 1 1</size>
            </box>
          </geometry>
          <material>
            <ambient>0.8 0.4 0.2 1</ambient>
            <diffuse>0.8 0.4 0.2 1</diffuse>
          </material>
        </visual>
        <collision name="collision">
          <geometry>
            <box>
              <size>1 1 1</size>
            </box>
          </geometry>
        </collision>
      </link>
    </model>
  </world>
</sdf>
```

## Exercise Tasks

### Task 1: Launch Simulation with Sensors

1. Build your workspace:
   ```bash
   cd ~/simulation_ws
   colcon build --packages-select simple_robot
   source install/setup.bash
   ```

2. Launch the simulation:
   ```bash
   ros2 launch simple_robot sensor_simulation.launch.py
   ```

3. In another terminal, check available topics:
   ```bash
   ros2 topic list
   ```

   You should see topics like `/lidar/scan`, `/camera/image_raw`, `/camera/depth/image_raw`, and `/imu/data`.

### Task 2: Monitor LiDAR Data

1. In a new terminal, monitor the LiDAR data:
   ```bash
   ros2 topic echo /lidar/scan sensor_msgs/msg/LaserScan
   ```

2. Observe the message structure:
   - `ranges`: Array of distance measurements
   - `intensities`: Array of intensity values (if available)
   - `angle_min`, `angle_max`: Angular range
   - `angle_increment`: Angular resolution
   - `time_increment`: Time between measurements
   - `scan_time`: Time between scans
   - `range_min`, `range_max`: Valid range limits

3. Move the robot (or change the simulation environment) and observe how the LiDAR readings change.

### Task 3: Visualize Camera Data

1. Install image tools if not already installed:
   ```bash
   sudo apt install ros-humble-image-tools
   ```

2. Convert and view the camera image:
   ```bash
   ros2 run image_tools showimage --ros-args --remap /image:=/camera/image_raw
   ```

3. For depth images:
   ```bash
   ros2 run image_tools showimage --ros-args --remap /image:=/camera/depth/image_raw
   ```

4. Observe how the camera captures the environment and how depth values represent distances.

### Task 4: Monitor IMU Data

1. Monitor IMU data:
   ```bash
   ros2 topic echo /imu/data sensor_msgs/msg/Imu
   ```

2. Observe the message structure:
   - `orientation`: Quaternion representing robot orientation
   - `angular_velocity`: Angular velocity in x, y, z axes
   - `linear_acceleration`: Linear acceleration in x, y, z axes

3. Apply forces to the robot in simulation and observe changes in IMU readings.

### Task 5: Record and Analyze Sensor Data

1. Create a directory for data collection:
   ```bash
   mkdir -p ~/sensor_data
   ```

2. Record a short data sample:
   ```bash
   # Record LiDAR data for 10 seconds
   ros2 bag record /lidar/scan -o ~/sensor_data/lidar_data &

   # Record IMU data for 10 seconds
   ros2 bag record /imu/data -o ~/sensor_data/imu_data &

   # Record camera data for 5 seconds (be careful with size!)
   ros2 bag record /camera/image_raw /camera/depth/image_raw -o ~/sensor_data/camera_data
   ```

3. Stop the recording after sufficient data is collected (Ctrl+C).

4. Check the recorded data:
   ```bash
   ros2 bag info ~/sensor_data/lidar_data
   ```

### Task 6: Analyze Sensor Performance

1. Check the update rates of different sensors:
   ```bash
   # Check LiDAR update rate
   rosbag2 topic_hz /lidar/scan

   # Check IMU update rate
   rosbag2 topic_hz /imu/data
   ```

2. Monitor CPU usage during simulation to understand computational requirements.

3. Note any dropped messages or performance issues, especially with camera data.

### Task 7: Sensor Fusion Concept

1. Write a simple ROS 2 node to combine sensor data (conceptual):
   ```python
   #!/usr/bin/env python3
   import rclpy
   from rclpy.node import Node
   from sensor_msgs.msg import LaserScan, Imu
   from geometry_msgs.msg import Twist

   class SensorFusionNode(Node):
       def __init__(self):
           super().__init__('sensor_fusion_node')

           # Subscribe to sensor topics
           self.lidar_sub = self.create_subscription(
               LaserScan,
               '/lidar/scan',
               self.lidar_callback,
               10
           )

           self.imu_sub = self.create_subscription(
               Imu,
               '/imu/data',
               self.imu_callback,
               10
           )

           self.cmd_vel_pub = self.create_publisher(Twist, '/cmd_vel', 10)

           self.lidar_data = None
           self.imu_data = None

       def lidar_callback(self, msg):
           self.lidar_data = msg
           self.process_sensor_data()

       def imu_callback(self, msg):
           self.imu_data = msg
           self.process_sensor_data()

       def process_sensor_data(self):
           # Simple fusion: stop if obstacle detected in front
           if self.lidar_data and self.imu_data:
               # Check front-facing range (middle of scan)
               front_idx = len(self.lidar_data.ranges) // 2
               front_distance = self.lidar_data.ranges[front_idx]

               if front_distance < 1.0:  # Stop if obstacle within 1m
                   cmd = Twist()
                   cmd.linear.x = 0.0
                   self.cmd_vel_pub.publish(cmd)

   def main(args=None):
       rclpy.init(args=args)
       node = SensorFusionNode()
       rclpy.spin(node)
       node.destroy_node()
       rclpy.shutdown()

   if __name__ == '__main__':
       main()
   ```

## Expected Outcomes

By completing this exercise, you should be able to:

1. Successfully launch a Gazebo simulation with multiple sensor types
2. Monitor and understand the data structure of different sensor types
3. Visualize camera and depth data streams
4. Record and analyze sensor data using ROS 2 tools
5. Understand the computational requirements of different sensors
6. Conceptualize how sensor data can be combined for robotics applications

## Troubleshooting

### Common Issues:

- **No sensor data published**: Check that sensor plugins are properly configured in the URDF
- **High CPU usage**: Reduce camera resolution or update rates
- **Missing topics**: Verify Gazebo is running and plugins are loaded
- **Data quality issues**: Check sensor parameters and noise settings

## Next Steps

This exercise focused on sensor simulation in isolation. In the next exercise, you'll combine physics simulation and sensor simulation to create a more complete robotic system.