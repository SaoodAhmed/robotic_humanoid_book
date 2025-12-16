---
sidebar_position: 4
---

# Physics Simulation

## Overview

Physics simulation is the cornerstone of robotics simulation, enabling accurate modeling of how robots interact with their environment. This section covers the core concepts of physics simulation in Gazebo, including gravity, collisions, and rigid body dynamics.

## Physics Engine Fundamentals

Gazebo uses the Open Dynamics Engine (ODE) as its default physics engine, though it also supports other engines like Bullet and DART. The physics engine calculates the motion and interactions of objects in the simulation based on physical laws.

### Key Physics Concepts

- **Gravity**: The constant downward force that affects all objects
- **Mass**: The amount of matter in an object, affecting its response to forces
- **Inertia**: The resistance of an object to changes in its motion
- **Collision Detection**: Identifying when objects intersect or make contact
- **Collision Response**: Calculating the resulting motion after a collision
- **Friction**: The force that opposes motion between contacting surfaces
- **Restitution**: The "bounciness" of objects during collisions

## Configuring Physics Properties

### Gravity Settings

Gravity is configured in the world file:

```xml
<world name="default">
  <physics type="ode">
    <gravity>0 0 -9.8</gravity>  <!-- Standard Earth gravity: 9.8 m/s^2 downward -->
  </physics>
</world>
```

You can adjust gravity for different environments:
- Moon: `<gravity>0 0 -1.62</gravity>`
- Mars: `<gravity>0 0 -3.71</gravity>`
- Zero gravity: `<gravity>0 0 0</gravity>`

### Material Properties

Materials define how objects interact during collisions:

```xml
<collision name="collision">
  <surface>
    <friction>
      <ode>
        <mu>1.0</mu>        <!-- Static friction coefficient -->
        <mu2>1.0</mu2>      <!-- Secondary friction coefficient -->
      </ode>
    </friction>
    <bounce>
      <restitution_coefficient>0.2</restitution_coefficient>  <!-- Bounciness -->
      <threshold>100000.0</threshold>                          <!-- Velocity threshold -->
    </bounce>
    <contact>
      <ode>
        <kp>1e+16</kp>      <!-- Contact stiffness -->
        <kd>1e+12</kd>      <!-- Contact damping -->
        <max_vel>100.0</max_vel>     <!-- Maximum contact correction velocity -->
        <min_depth>0.001</min_depth> <!-- Minimum contact depth -->
      </ode>
    </contact>
  </surface>
</collision>
```

## Rigid Body Dynamics

Rigid body dynamics govern how objects move and rotate under the influence of forces. In Gazebo, each link in a robot model has associated mass and inertia properties.

### Mass and Inertia

For a simple box:
```xml
<inertial>
  <mass>1.0</mass>  <!-- Mass in kg -->
  <inertia>
    <!-- Moments of inertia (Ixx, Iyy, Izz) and products of inertia (Ixy, Ixz, Iyz) -->
    <ixx>0.0833</ixx>
    <iyy>0.0833</iyy>
    <izz>0.0833</izz>
    <ixy>0.0</ixy>
    <ixz>0.0</ixz>
    <iyz>0.0</iyz>
  </inertia>
</inertial>
```

For a box with dimensions (width x height x depth) = (1.0 x 1.0 x 1.0):
- Ixx = 1/12 * mass * (height² + depth²) = 1/12 * 1.0 * (1.0 + 1.0) = 0.1667
- Iyy = 1/12 * mass * (width² + depth²) = 0.1667
- Izz = 1/12 * mass * (width² + height²) = 0.1667

### Links and Joints

Links represent rigid bodies, while joints define how they connect:

```xml
<link name="link1">
  <inertial>
    <mass>1.0</mass>
    <inertia>
      <ixx>0.1</ixx>
      <iyy>0.1</iyy>
      <izz>0.1</izz>
    </inertia>
  </inertial>
  <collision name="collision">
    <geometry>
      <box>
        <size>0.5 0.5 0.5</size>
      </box>
    </geometry>
  </collision>
  <visual name="visual">
    <geometry>
      <box>
        <size>0.5 0.5 0.5</size>
      </box>
    </geometry>
  </visual>
</link>

<joint name="joint1" type="revolute">
  <parent>link1</parent>
  <child>link2</child>
  <axis>
    <xyz>0 0 1</xyz>  <!-- Rotation axis -->
    <limit>
      <lower>-1.57</lower>  <!-- Lower limit in radians -->
      <upper>1.57</upper>   <!-- Upper limit in radians -->
      <effort>100</effort>  <!-- Maximum effort -->
      <velocity>1</velocity> <!-- Maximum velocity -->
    </limit>
  </axis>
</joint>
```

## Collision Detection

Collision detection is critical for realistic physics simulation. Gazebo supports various collision geometries:

### Collision Geometries

- **Box**: Rectangular solid
- **Sphere**: Perfect sphere
- **Cylinder**: Cylindrical shape
- **Capsule**: Cylinder with hemispherical ends
- **Mesh**: Complex 3D models
- **Plane**: Infinite flat surface

### Collision Optimization

For performance, use simpler collision geometries when possible:

```xml
<!-- Use a simple box for collision instead of a complex mesh -->
<collision name="collision">
  <geometry>
    <box>
      <size>0.1 0.1 0.2</size>  <!-- Simplified collision box -->
    </box>
  </geometry>
</collision>
```

## Physics Parameters and Tuning

### Global Physics Settings

In the world file, you can set global physics parameters:

```xml
<physics type="ode">
  <max_step_size>0.001</max_step_size>    <!-- Time step for physics updates -->
  <real_time_update_rate>1000</real_time_update_rate>  <!-- Updates per second -->
  <gravity>0 0 -9.8</gravity>
  <ode>
    <solver>
      <type>quick</type>      <!-- Solver type: world, quick -->
      <iters>10</iters>       <!-- Number of iterations -->
      <sor>1.3</sor>          <!-- Successive over-relaxation parameter -->
    </solver>
    <constraints>
      <cfm>0.0</cfm>          <!-- Constraint force mixing -->
      <erp>0.2</erp>          <!-- Error reduction parameter -->
      <contact_max_correcting_vel>100</contact_max_correcting_vel>
      <contact_surface_layer>0.001</contact_surface_layer>
    </constraints>
  </ode>
</physics>
```

### Performance vs. Accuracy Trade-offs

- **Smaller time steps**: More accurate but slower
- **Higher update rates**: More responsive but more computationally expensive
- **More solver iterations**: More stable contacts but slower
- **Simpler collision meshes**: Faster but less accurate

## Common Physics Simulation Issues

### Objects Falling Through the Ground

- Check that the ground plane has proper collision geometry
- Verify gravity is enabled and has correct direction
- Increase contact surface layer if objects are too thin

### Unstable Joints

- Increase solver iterations
- Adjust ERP and CFM values
- Check that joint limits are properly set
- Verify mass and inertia properties are realistic

### Penetration Between Objects

- Decrease time step size
- Increase contact surface layer
- Use more iterations in the solver
- Ensure collision meshes are properly defined

## Real-time vs. Fast-time Simulation

Gazebo can run in different modes:

- **Real-time**: Simulation time matches wall-clock time (1x speed)
- **Fast-time**: Simulation runs faster than real-time for testing
- **Paused**: Simulation stopped for debugging

The real-time factor can be monitored and controlled:
- Real-time factor = simulation time / wall-clock time
- Target: Close to 1.0 for real-time performance

## URDF/SDF Model Import and Configuration

### URDF vs SDF

URDF (Unified Robot Description Format) is primarily used for kinematic and dynamic description of robots, while SDF (Simulation Description Format) is designed specifically for simulation environments like Gazebo.

### URDF to SDF Conversion

When using URDF models in Gazebo, they are automatically converted to SDF. However, you can include Gazebo-specific extensions in your URDF:

```xml
<!-- Example URDF with Gazebo extensions -->
<robot name="example_robot">
  <!-- Links and joints as per standard URDF -->
  <link name="base_link">
    <inertial>
      <mass value="1.0"/>
      <inertia ixx="0.1" ixy="0.0" ixz="0.0" iyy="0.1" iyz="0.0" izz="0.1"/>
    </inertial>
    <visual>
      <geometry>
        <box size="0.5 0.5 0.5"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <box size="0.5 0.5 0.5"/>
      </geometry>
    </collision>
  </link>

  <!-- Gazebo-specific extensions -->
  <gazebo reference="base_link">
    <material>Gazebo/Blue</material>
    <mu1>0.2</mu1>
    <mu2>0.2</mu2>
    <kp>1000000.0</kp>
    <kd>100.0</kd>
  </gazebo>
</robot>
```

### Direct SDF Usage

For more complex simulation requirements, you can use SDF directly:

```xml
<sdf version="1.7">
  <model name="sdf_model">
    <link name="link">
      <inertial>
        <mass>1.0</mass>
        <inertia>
          <ixx>0.1</ixx>
          <iyy>0.1</iyy>
          <izz>0.1</izz>
          <ixy>0.0</ixy>
          <ixz>0.0</ixz>
          <iyz>0.0</iyz>
        </inertia>
      </inertial>

      <collision name="collision">
        <geometry>
          <box>
            <size>0.5 0.5 0.5</size>
          </box>
        </geometry>
        <surface>
          <friction>
            <ode>
              <mu>1.0</mu>
              <mu2>1.0</mu2>
            </ode>
          </friction>
        </surface>
      </collision>

      <visual name="visual">
        <geometry>
          <box>
            <size>0.5 0.5 0.5</size>
          </box>
        </geometry>
        <material>
          <ambient>0.0 0.0 1.0 1.0</ambient>
          <diffuse>0.0 0.0 1.0 1.0</diffuse>
        </material>
      </visual>
    </link>
  </model>
</sdf>
```

## Examples of Different Robot Models

### Simple Wheeled Robot

```xml
<robot name="simple_wheeled_robot">
  <link name="chassis">
    <inertial>
      <mass value="5.0"/>
      <inertia ixx="0.5" ixy="0.0" ixz="0.0" iyy="0.8" iyz="0.0" izz="0.3"/>
    </inertial>
    <visual>
      <geometry>
        <box size="0.8 0.5 0.3"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <box size="0.8 0.5 0.3"/>
      </geometry>
    </collision>
  </link>

  <joint name="left_wheel_joint" type="continuous">
    <parent link="chassis"/>
    <child link="left_wheel"/>
    <origin xyz="0.3 0.3 0" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
  </joint>

  <link name="left_wheel">
    <inertial>
      <mass value="0.5"/>
      <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.02"/>
    </inertial>
    <visual>
      <geometry>
        <cylinder radius="0.15" length="0.05"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <cylinder radius="0.15" length="0.05"/>
      </geometry>
    </collision>
  </link>

  <joint name="right_wheel_joint" type="continuous">
    <parent link="chassis"/>
    <child link="right_wheel"/>
    <origin xyz="0.3 -0.3 0" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
  </joint>

  <link name="right_wheel">
    <inertial>
      <mass value="0.5"/>
      <inertia ixx="0.01" ixy="0.0" ixz="0.0" iyy="0.01" iyz="0.0" izz="0.02"/>
    </inertial>
    <visual>
      <geometry>
        <cylinder radius="0.15" length="0.05"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <cylinder radius="0.15" length="0.05"/>
      </geometry>
    </collision>
  </link>

  <!-- Gazebo-specific elements -->
  <gazebo reference="chassis">
    <material>Gazebo/Grey</material>
  </gazebo>

  <gazebo reference="left_wheel">
    <material>Gazebo/Black</material>
    <mu1>1.0</mu1>
    <mu2>1.0</mu2>
  </gazebo>

  <gazebo reference="right_wheel">
    <material>Gazebo/Black</material>
    <mu1>1.0</mu1>
    <mu2>1.0</mu2>
  </gazebo>
</robot>
```

### Articulated Arm Robot

```xml
<robot name="articulated_arm">
  <link name="base_link">
    <inertial>
      <mass value="2.0"/>
      <inertia ixx="0.2" ixy="0.0" ixz="0.0" iyy="0.2" iyz="0.0" izz="0.3"/>
    </inertial>
    <visual>
      <geometry>
        <cylinder radius="0.1" length="0.2"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <cylinder radius="0.1" length="0.2"/>
      </geometry>
    </collision>
  </link>

  <joint name="shoulder_joint" type="revolute">
    <parent link="base_link"/>
    <child link="shoulder_link"/>
    <origin xyz="0 0 0.1" rpy="0 0 0"/>
    <axis xyz="0 0 1"/>
    <limit lower="-1.57" upper="1.57" effort="100" velocity="1"/>
  </joint>

  <link name="shoulder_link">
    <inertial>
      <mass value="1.0"/>
      <inertia ixx="0.05" ixy="0.0" ixz="0.0" iyy="0.05" iyz="0.0" izz="0.08"/>
    </inertial>
    <visual>
      <geometry>
        <box size="0.05 0.05 0.3"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <box size="0.05 0.05 0.3"/>
      </geometry>
    </collision>
  </link>

  <joint name="elbow_joint" type="revolute">
    <parent link="shoulder_link"/>
    <child link="elbow_link"/>
    <origin xyz="0 0 0.3" rpy="0 0 0"/>
    <axis xyz="0 1 0"/>
    <limit lower="-1.57" upper="1.57" effort="100" velocity="1"/>
  </joint>

  <link name="elbow_link">
    <inertial>
      <mass value="0.8"/>
      <inertia ixx="0.04" ixy="0.0" ixz="0.0" iyy="0.04" iyz="0.0" izz="0.06"/>
    </inertial>
    <visual>
      <geometry>
        <box size="0.05 0.05 0.25"/>
      </geometry>
    </visual>
    <collision>
      <geometry>
        <box size="0.05 0.05 0.25"/>
      </geometry>
    </collision>
  </link>

  <!-- Gazebo elements for the arm -->
  <gazebo reference="base_link">
    <material>Gazebo/Orange</material>
  </gazebo>

  <gazebo reference="shoulder_link">
    <material>Gazebo/Blue</material>
  </gazebo>

  <gazebo reference="elbow_link">
    <material>Gazebo/Green</material>
  </gazebo>
</robot>
```

## Validation Steps for Physics Simulation Accuracy

### Kinematic Validation

1. **Forward Kinematics Check**:
   - Calculate expected end-effector position from joint angles
   - Compare with simulated position
   - Tolerance: < 1mm for precision applications

2. **Inverse Kinematics Check**:
   - Set desired end-effector position
   - Calculate required joint angles
   - Verify robot reaches the position in simulation

### Dynamic Validation

1. **Mass Properties Validation**:
   - Verify total robot mass matches expected value
   - Check center of mass location
   - Validate moments of inertia tensors

2. **Gravity Compensation**:
   - For manipulators, verify joints can hold position against gravity
   - Check that required torques match theoretical calculations

3. **Collision Detection**:
   - Verify collisions are detected at appropriate times
   - Check that collision responses are physically plausible
   - Validate that objects don't pass through each other

### Performance Validation

1. **Real-time Factor (RTF)**:
   - Target: RTF close to 1.0 for real-time performance
   - Monitor: RTF = simulation_time / wall_clock_time

2. **Stability Checks**:
   - Run simulation for extended periods (e.g., 10 minutes)
   - Monitor for energy drift or numerical instability
   - Check for joint limit violations or unexpected behaviors

### Example Validation Script

```python
#!/usr/bin/env python3
import rclpy
from rclpy.node import Node
from std_msgs.msg import Float64
from geometry_msgs.msg import Point
from sensor_msgs.msg import JointState
import numpy as np

class PhysicsValidationNode(Node):
    def __init__(self):
        super().__init__('physics_validation_node')

        # Subscribe to joint states
        self.joint_state_sub = self.create_subscription(
            JointState,
            '/joint_states',
            self.joint_state_callback,
            10
        )

        # Publishers for validation metrics
        self.rtf_pub = self.create_publisher(Float64, '/validation/rtf', 10)
        self.energy_pub = self.create_publisher(Float64, '/validation/energy', 10)

        # Timer for periodic validation
        self.timer = self.create_timer(1.0, self.validation_callback)

        self.prev_time = self.get_clock().now()
        self.joint_positions = {}

    def joint_state_callback(self, msg):
        for i, name in enumerate(msg.name):
            if i < len(msg.position):
                self.joint_positions[name] = msg.position[i]

    def validation_callback(self):
        # Calculate real-time factor
        current_time = self.get_clock().now()
        sim_time_diff = (current_time - self.prev_time).nanoseconds / 1e9
        wall_time_diff = 1.0  # Since timer is 1Hz
        rtf = sim_time_diff / wall_time_diff

        # Publish RTF
        rtf_msg = Float64()
        rtf_msg.data = rtf
        self.rtf_pub.publish(rtf_msg)

        # Calculate system energy (simplified)
        # This would include kinetic and potential energy calculations
        energy = self.calculate_system_energy()

        energy_msg = Float64()
        energy_msg.data = energy
        self.energy_pub.publish(energy_msg)

        self.prev_time = current_time

        # Log validation metrics
        self.get_logger().info(f'Real-time factor: {rtf:.2f}')
        self.get_logger().info(f'System energy: {energy:.2f}')

    def calculate_system_energy(self):
        # Simplified energy calculation
        # In a real implementation, this would calculate kinetic and potential energy
        # based on joint positions, velocities, and robot mass properties
        total_energy = 0.0
        for joint, pos in self.joint_positions.items():
            # Add energy calculations here
            pass
        return total_energy

def main(args=None):
    rclpy.init(args=args)
    node = PhysicsValidationNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## World Configuration Examples

### Basic World with Physics Parameters

```xml
<?xml version="1.0" ?>
<sdf version="1.7">
  <world name="basic_world">
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

    <!-- Include ground plane -->
    <include>
      <uri>model://ground_plane</uri>
    </include>

    <!-- Include sun light -->
    <include>
      <uri>model://sun</uri>
    </include>

    <!-- Custom model in the world -->
    <model name="simple_box">
      <pose>0 0 1 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>1.0</mass>
          <inertia>
            <ixx>0.1</ixx>
            <iyy>0.1</iyy>
            <izz>0.1</izz>
          </inertia>
        </inertial>
        <collision name="collision">
          <geometry>
            <box>
              <size>1 1 1</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>1 1 1</size>
            </box>
          </geometry>
          <material>
            <ambient>0.8 0.3 0.1 1</ambient>
            <diffuse>0.8 0.3 0.1 1</diffuse>
          </material>
        </visual>
      </link>
    </model>
  </world>
</sdf>
```

### Complex World with Multiple Objects

```xml
<?xml version="1.0" ?>
<sdf version="1.7">
  <world name="complex_world">
    <!-- Physics engine configuration with custom gravity -->
    <physics type="ode">
      <max_step_size>0.001</max_step_size>
      <real_time_update_rate>1000</real_time_update_rate>
      <gravity>0 0 -3.71</gravity>  <!-- Mars gravity -->
      <ode>
        <solver>
          <type>quick</type>
          <iters>20</iters>  <!-- More iterations for stability -->
          <sor>1.3</sor>
        </solver>
        <constraints>
          <cfm>0.0</cfm>
          <erp>0.1</erp>  <!-- Lower ERP for more accurate contacts -->
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

    <!-- Static objects -->
    <model name="wall_1">
      <pose>-5 0 1 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>100</mass>
          <inertia>
            <ixx>100</ixx>
            <iyy>100</iyy>
            <izz>100</izz>
          </inertia>
        </inertial>
        <collision name="collision">
          <geometry>
            <box>
              <size>0.1 10 2</size>
            </box>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <box>
              <size>0.1 10 2</size>
            </box>
          </geometry>
          <material>
            <ambient>0.5 0.5 0.5 1</ambient>
            <diffuse>0.5 0.5 0.5 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <!-- Dynamic objects -->
    <model name="falling_sphere">
      <pose>0 0 5 0 0 0</pose>
      <link name="link">
        <inertial>
          <mass>0.5</mass>
          <inertia>
            <ixx>0.01</ixx>
            <iyy>0.01</iyy>
            <izz>0.01</izz>
          </inertia>
        </inertial>
        <collision name="collision">
          <geometry>
            <sphere>
              <radius>0.2</radius>
            </sphere>
          </geometry>
        </collision>
        <visual name="visual">
          <geometry>
            <sphere>
              <radius>0.2</radius>
            </sphere>
          </geometry>
          <material>
            <ambient>0.1 0.8 0.1 1</ambient>
            <diffuse>0.1 0.8 0.1 1</diffuse>
          </material>
        </visual>
      </link>
    </model>

    <!-- Articulated model -->
    <model name="pendulum">
      <link name="base">
        <pose>2 0 1 0 0 0</pose>
        <inertial>
          <mass>1.0</mass>
          <inertia>
            <ixx>0.1</ixx>
            <iyy>0.1</iyy>
            <izz>0.1</izz>
          </inertia>
        </inertial>
        <visual name="visual">
          <geometry>
            <box>
              <size>0.2 0.2 0.2</size>
            </box>
          </geometry>
        </visual>
        <collision name="collision">
          <geometry>
            <box>
              <size>0.2 0.2 0.2</size>
            </box>
          </geometry>
        </collision>
      </link>

      <link name="bob">
        <pose>2 0 0 0 0 0</pose>
        <inertial>
          <mass>0.5</mass>
          <inertia>
            <ixx>0.01</ixx>
            <iyy>0.01</iyy>
            <izz>0.01</izz>
          </inertia>
        </inertial>
        <visual name="visual">
          <geometry>
            <sphere>
              <radius>0.1</radius>
            </sphere>
          </geometry>
        </visual>
        <collision name="collision">
          <geometry>
            <sphere>
              <radius>0.1</radius>
            </sphere>
          </geometry>
        </collision>
      </link>

      <joint name="pivot" type="revolute">
        <parent>base</parent>
        <child>bob</child>
        <axis>
          <xyz>0 1 0</xyz>
          <limit>
            <lower>-1.57</lower>
            <upper>1.57</upper>
            <effort>100</effort>
            <velocity>1</velocity>
          </limit>
        </axis>
        <pose>0 0 -0.5 0 0 0</pose>
      </joint>
    </model>
  </world>
</sdf>
```

### Physics Validation

#### Checking Physics Accuracy

1. **Conservation of energy**: Verify that energy is conserved in closed systems
2. **Stable equilibrium**: Objects should remain stable when at rest
3. **Correct collision response**: Objects should bounce and slide appropriately
4. **Joint behavior**: Joints should respect limits and constraints

#### Performance Monitoring

Monitor physics performance using:
- Simulation step time
- Real-time factor
- CPU usage
- Memory consumption

## References and Citations

[1] Open Source Robotics Foundation. (2023). *Gazebo Physics Simulation Documentation*. Retrieved from https://gazebosim.org/docs

[2] ODE Development Team. (2023). *Open Dynamics Engine User Guide*. Retrieved from http://www.ode.org/

[3] Coumans, E., & Bai, Y. (2016). *Proceedings of the IEEE/RSJ International Conference on Intelligent Robots and Systems (IROS)*. Physics-based Simulation for Robotics.

[4] ROS.org. (2023). *URDF/SDF Robot Description Formats*. Retrieved from https://docs.ros.org/en/humble/Tutorials/URDF/URDF-Main.html

## Summary

Physics simulation is fundamental to creating realistic robot simulations. Proper configuration of mass, inertia, collision properties, and physics parameters ensures accurate and stable simulations. The next section will cover sensor simulation in Gazebo.