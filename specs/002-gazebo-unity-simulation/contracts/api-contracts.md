# API Contracts: Module 2 - The Digital Twin (Gazebo & Unity)

**Feature**: Module 2 - The Digital Twin (Gazebo & Unity)
**Date**: 2025-12-11

## ROS 2 Message Interfaces

### Sensor Data Publishers

#### LiDAR Sensor
- **Topic**: `/lidar/scan`
- **Message Type**: `sensor_msgs/LaserScan`
- **Frequency**: 10 Hz (configurable)
- **Expected Fields**:
  - `ranges[]`: Array of distance measurements
  - `intensities[]`: Array of intensity values (optional)
  - `angle_min`, `angle_max`: Angular range
  - `angle_increment`: Angular resolution
  - `time_increment`: Time between measurements
  - `scan_time`: Time between scans
  - `range_min`, `range_max`: Valid range limits

#### RGB-D Camera
- **Topic**: `/camera/image_raw`
- **Message Type**: `sensor_msgs/Image`
- **Frequency**: 30 Hz (configurable)
- **Expected Fields**:
  - `header`: Timestamp and frame ID
  - `height`, `width`: Image dimensions
  - `encoding`: Pixel format (e.g., "rgb8", "bgr8")
  - `is_bigendian`: Endianness flag
  - `step`: Full row length in bytes
  - `data[]`: Image data array

- **Topic**: `/camera/depth/image_raw`
- **Message Type**: `sensor_msgs/Image`
- **Frequency**: 30 Hz (configurable)
- **Expected Fields**:
  - `header`: Timestamp and frame ID
  - `encoding`: "32FC1" for depth values
  - `data[]`: Depth values in meters

#### IMU Sensor
- **Topic**: `/imu/data`
- **Message Type**: `sensor_msgs/Imu`
- **Frequency**: 100 Hz (configurable)
- **Expected Fields**:
  - `orientation`: Quaternion (x, y, z, w)
  - `orientation_covariance[]`: 9-element covariance matrix
  - `angular_velocity`: Vector3 (x, y, z)
  - `angular_velocity_covariance[]`: 9-element covariance matrix
  - `linear_acceleration`: Vector3 (x, y, z)
  - `linear_acceleration_covariance[]`: 9-element covariance matrix

### Robot Control Subscribers

#### Velocity Commands
- **Topic**: `/cmd_vel`
- **Message Type**: `geometry_msgs/Twist`
- **Frequency**: Up to 50 Hz
- **Expected Fields**:
  - `linear`: Vector3 (x, y, z) - Linear velocity
  - `angular`: Vector3 (x, y, z) - Angular velocity

### TF Transformations
- **Topic**: `/tf` and `/tf_static`
- **Message Type**: `tf2_msgs/TFMessage`
- **Frequency**: 50-100 Hz
- **Expected Fields**:
  - `transforms[]`: Array of TransformStamped messages
  - Each transform with parent and child frame IDs
  - Translation and rotation data

## Service Interfaces

#### Robot Spawning Service
- **Service**: `/spawn_entity`
- **Type**: `gazebo_msgs/SpawnEntity`
- **Request**: URDF/SDF model, pose, entity name
- **Response**: Success status and error message

#### Robot Control Services
- **Service**: `/reset_simulation`
- **Type**: `std_srvs/Empty`
- **Request**: None
- **Response**: None

## Action Interfaces

#### Navigation Actions
- **Action**: `/navigate_to_pose`
- **Type**: `nav2_msgs/NavigateToPose` (or similar)
- **Goal**: Target pose for robot navigation
- **Feedback**: Progress updates
- **Result**: Success/failure of navigation

## Unity-ROS Bridge Interface

#### Connection Parameters
- **Protocol**: TCP/IP via rosbridge_suite
- **Default Port**: 9090
- **Message Format**: JSON over WebSocket
- **Heartbeat**: Configurable interval to maintain connection

#### Synchronization Messages
- **Robot State Topic**: `/unity_robot_state`
- **Message Type**: Custom message with joint positions and sensor data
- **Frequency**: 30 Hz for visualization, 100 Hz for control