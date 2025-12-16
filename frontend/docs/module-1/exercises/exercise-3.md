---
sidebar_position: 3
---

# Exercise 3: Advanced Integration - Python Agents with ROS 2 Controllers

## Objective

Integrate a Python-based AI agent with ROS 2 controllers to implement basic robot behaviors, creating a bridge between AI algorithms and robot control.

## Prerequisites

- Completion of Exercises 1 and 2
- Understanding of ROS 2 nodes, topics, services, actions, and rclpy
- Basic knowledge of Python AI libraries (conceptually)
- ROS 2 Humble Hawksbill installed
- Python 3.8

## Learning Outcomes

After completing this exercise, you will be able to:
- Create a Python agent that communicates with ROS 2 controllers
- Implement decision-making logic in Python and execute it on a robot
- Understand the integration between AI algorithms and robot control systems
- Use ROS 2 actions for long-running robot tasks

## Estimated Duration

60-90 minutes

## Part A: Creating a Simple AI Decision-Making Node

### Step 1: Create an AI Agent Node

Create a new script `my_robot_exercises/my_robot_exercises/ai_agent.py`:

```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from sensor_msgs.msg import LaserScan
from std_msgs.msg import String
import math
import random

class AIAgent(Node):
    def __init__(self):
        super().__init__('ai_agent')

        # Publisher for robot commands
        self.cmd_vel_publisher = self.create_publisher(Twist, '/cmd_vel', 10)

        # Subscriber for sensor data
        self.scan_subscriber = self.create_subscription(
            LaserScan,
            '/scan',
            self.scan_callback,
            10
        )

        # Publisher for AI state (for monitoring)
        self.ai_state_publisher = self.create_publisher(String, '/ai_state', 10)

        # Timer for decision making (10 Hz)
        self.timer = self.create_timer(0.1, self.decision_loop)

        # Robot state variables
        self.scan_data = None
        self.robot_state = "IDLE"  # IDLE, MOVING_FORWARD, TURNING, AVOIDING

        self.get_logger().info('AI Agent Node Started')

    def scan_callback(self, msg):
        """Process laser scan data"""
        self.scan_data = msg.ranges
        self.get_logger().debug(f'Received scan with {len(msg.ranges)} points')

    def decision_loop(self):
        """Main decision-making loop"""
        if self.scan_data is None:
            return

        # Simple obstacle avoidance logic
        safe_distance = 1.0  # meters
        front_scan = self.scan_data[len(self.scan_data)//2]  # Front reading

        # Get left and right readings for turning decisions
        left_scan = self.scan_data[len(self.scan_data)//4]    # Left reading
        right_scan = self.scan_data[3*len(self.scan_data)//4]  # Right reading

        cmd_msg = Twist()

        # Decision making based on sensor data
        if front_scan > safe_distance:
            # Safe to move forward
            cmd_msg.linear.x = 0.5  # Move forward at 0.5 m/s
            cmd_msg.angular.z = 0.0
            self.robot_state = "MOVING_FORWARD"
        else:
            # Obstacle detected, turn away
            if left_scan > right_scan:
                # Turn left
                cmd_msg.linear.x = 0.0
                cmd_msg.angular.z = 0.5  # Turn left at 0.5 rad/s
                self.robot_state = "TURNING_LEFT"
            else:
                # Turn right
                cmd_msg.linear.x = 0.0
                cmd_msg.angular.z = -0.5  # Turn right at 0.5 rad/s
                self.robot_state = "TURNING_RIGHT"

        # Publish the command
        self.cmd_vel_publisher.publish(cmd_msg)

        # Publish AI state for monitoring
        state_msg = String()
        state_msg.data = self.robot_state
        self.ai_state_publisher.publish(state_msg)

        self.get_logger().info(f'State: {self.robot_state}, Lin: {cmd_msg.linear.x:.2f}, Ang: {cmd_msg.angular.z:.2f}')

def main(args=None):
    rclpy.init(args=args)
    node = AIAgent()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Step 2: Create an Action Server for Robot Navigation

Create `my_robot_exercises/my_robot_exercises/navigation_action_server.py`:

```python
import rclpy
from rclpy.action import ActionServer, GoalResponse, CancelResponse
from rclpy.node import Node
from rclpy.executors import MultiThreadedExecutor
from rclpy.callback_groups import ReentrantCallbackGroup

from example_interfaces.action import Fibonacci
import time

class NavigationActionServer(Node):
    def __init__(self):
        super().__init__('navigation_action_server')

        # Create action server
        self._action_server = ActionServer(
            self,
            Fibonacci,  # Using Fibonacci as example; in real apps, use navigation-specific action
            'navigate_to_pose',
            execute_callback=self.execute_callback,
            callback_group=ReentrantCallbackGroup(),
            goal_callback=self.goal_callback,
            cancel_callback=self.cancel_callback)

        # Publisher for robot commands (simplified for example)
        from geometry_msgs.msg import Twist
        self.cmd_vel_publisher = self.create_publisher(Twist, '/cmd_vel', 10)

        self.get_logger().info('Navigation Action Server Started')

    def destroy(self):
        self._action_server.destroy()
        super().destroy_node()

    def goal_callback(self, goal_request):
        """Accept or reject a goal"""
        self.get_logger().info('Received goal request')
        return GoalResponse.ACCEPT

    def cancel_callback(self, goal_handle):
        """Accept or reject a cancel request"""
        self.get_logger().info('Received cancel request')
        return CancelResponse.ACCEPT

    def execute_callback(self, goal_handle):
        """Execute the navigation goal"""
        self.get_logger().info('Executing goal...')

        # Simulate navigation process
        feedback_msg = Fibonacci.Feedback()
        feedback_msg.sequence = [0, 1]

        # Simulate movement by sending commands
        for i in range(1, goal_handle.request.order):
            # Check if there's a cancel request
            if goal_handle.is_cancel_requested:
                self.get_logger().info('Goal canceled')
                goal_handle.canceled()
                result = Fibonacci.Result()
                result.sequence = feedback_msg.sequence
                return result

            # Publish feedback
            feedback_msg.sequence.append(
                feedback_msg.sequence[i] + feedback_msg.sequence[i-1])
            goal_handle.publish_feedback(feedback_msg)

            # Send a simple movement command
            from geometry_msgs.msg import Twist
            cmd_msg = Twist()
            cmd_msg.linear.x = 0.2  # Move forward slowly
            cmd_msg.angular.z = 0.0
            self.cmd_vel_publisher.publish(cmd_msg)

            time.sleep(0.5)  # Simulate time for movement

        # Complete the goal
        goal_handle.succeed()
        result = Fibonacci.Result()
        result.sequence = feedback_msg.sequence
        self.get_logger().info('Goal succeeded')
        return result

def main(args=None):
    rclpy.init(args=args)
    node = NavigationActionServer()

    try:
        # Use multi-threaded executor to handle action callbacks
        executor = MultiThreadedExecutor()
        executor.add_node(node)
        executor.spin()
    except KeyboardInterrupt:
        pass
    finally:
        node.destroy()
        rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Step 3: Create a Service Client for Robot Control

Create `my_robot_exercises/my_robot_exercises/robot_control_client.py`:

```python
import rclpy
from rclpy.node import Node
from std_srvs.srv import SetBool
import time

class RobotControlClient(Node):
    def __init__(self):
        super().__init__('robot_control_client')

        # Create clients for different services
        self.emergency_stop_client = self.create_client(
            SetBool,
            'emergency_stop'
        )
        self.reset_position_client = self.create_client(
            SetBool,
            'reset_position'
        )

        while not self.emergency_stop_client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Emergency stop service not available, waiting again...')

        while not self.reset_position_client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Reset position service not available, waiting again...')

        self.get_logger().info('Robot Control Client Ready')

    def emergency_stop(self):
        """Send emergency stop command"""
        request = SetBool.Request()
        request.data = True
        future = self.emergency_stop_client.call_async(request)
        rclpy.spin_until_future_complete(self, future)
        response = future.result()
        self.get_logger().info(f'Emergency stop response: {response.success}, {response.message}')
        return response

    def reset_position(self):
        """Send reset position command"""
        request = SetBool.Request()
        request.data = True
        future = self.reset_position_client.call_async(request)
        rclpy.spin_until_future_complete(self, future)
        response = future.result()
        self.get_logger().info(f'Reset position response: {response.success}, {response.message}')
        return response

def main(args=None):
    rclpy.init(args=args)
    client = RobotControlClient()

    # Test the services
    client.get_logger().info('Testing emergency stop...')
    client.emergency_stop()

    time.sleep(1)

    client.get_logger().info('Testing reset position...')
    client.reset_position()

    client.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Step 4: Update setup.py

Add the new executables to your `setup.py`:

```python
entry_points={
    'console_scripts': [
        'talker = my_robot_exercises.publisher_member_function:main',
        'listener = my_robot_exercises.subscriber_member_function:main',
        'sensor_publisher = my_robot_exercises.sensor_publisher:main',
        'ai_agent = my_robot_exercises.ai_agent:main',
        'nav_server = my_robot_exercises.navigation_action_server:main',
        'robot_client = my_robot_exercises.robot_control_client:main',
    ],
},
```

## Part B: Creating a Complete Robot Controller System

### Step 5: Create a Robot Controller Node

Create `my_robot_exercises/my_robot_exercises/robot_controller.py`:

```python
import rclpy
from rclpy.node import Node
from geometry_msgs.msg import Twist
from sensor_msgs.msg import JointState
from std_msgs.msg import String
from std_srvs.srv import SetBool
import time

class RobotController(Node):
    def __init__(self):
        super().__init__('robot_controller')

        # Publisher for velocity commands
        self.cmd_vel_publisher = self.create_publisher(Twist, '/cmd_vel', 10)

        # Publisher for joint commands (simulated)
        self.joint_publisher = self.create_publisher(JointState, '/joint_commands', 10)

        # Subscriber for AI commands
        self.ai_command_subscriber = self.create_subscription(
            String,
            '/ai_commands',
            self.ai_command_callback,
            10
        )

        # Service server for emergency stop
        self.emergency_stop_service = self.create_service(
            SetBool,
            'emergency_stop',
            self.emergency_stop_callback
        )

        # Service server for position reset
        self.reset_position_service = self.create_service(
            SetBool,
            'reset_position',
            self.reset_position_callback
        )

        # Timer for controller loop
        self.timer = self.create_timer(0.05, self.controller_loop)  # 20 Hz

        # Robot state
        self.is_active = True
        self.current_command = Twist()
        self.joint_positions = [0.0] * 4  # 4 joints
        self.target_positions = [0.0] * 4

        self.get_logger().info('Robot Controller Started')

    def ai_command_callback(self, msg):
        """Process commands from AI agent"""
        command = msg.data.lower()
        self.get_logger().info(f'Received AI command: {command}')

        if command == 'move_forward':
            self.current_command.linear.x = 0.5
            self.current_command.angular.z = 0.0
        elif command == 'turn_left':
            self.current_command.linear.x = 0.0
            self.current_command.angular.z = 0.5
        elif command == 'turn_right':
            self.current_command.linear.x = 0.0
            self.current_command.angular.z = -0.5
        elif command == 'stop':
            self.current_command.linear.x = 0.0
            self.current_command.angular.z = 0.0
        elif command.startswith('move_to:'):
            # Parse joint positions from command
            try:
                parts = command.split(':')
                if len(parts) > 1:
                    positions = [float(x) for x in parts[1].split(',')]
                    self.target_positions = positions[:4]  # Take first 4 values
                    self.get_logger().info(f'Set target positions: {self.target_positions}')
            except ValueError:
                self.get_logger().error(f'Invalid move_to command: {command}')

    def emergency_stop_callback(self, request, response):
        """Handle emergency stop service call"""
        self.get_logger().info('Emergency stop requested')
        self.is_active = False
        self.current_command = Twist()  # Stop all movement
        response.success = True
        response.message = 'Emergency stop activated'
        return response

    def reset_position_callback(self, request, response):
        """Handle position reset service call"""
        self.get_logger().info('Position reset requested')
        self.target_positions = [0.0] * 4
        self.current_command = Twist()
        self.is_active = True
        response.success = True
        response.message = 'Position reset complete'
        return response

    def controller_loop(self):
        """Main control loop"""
        if not self.is_active:
            return

        # Publish velocity command
        self.cmd_vel_publisher.publish(self.current_command)

        # Simulate joint control
        msg = JointState()
        msg.name = ['joint1', 'joint2', 'joint3', 'joint4']
        msg.position = self.joint_positions
        msg.velocity = [0.0] * 4
        msg.effort = [0.0] * 4

        # Update joint positions towards targets (simulated control)
        for i in range(len(self.joint_positions)):
            if abs(self.target_positions[i] - self.joint_positions[i]) > 0.01:
                # Move towards target at 0.1 rad/s
                direction = 1 if self.target_positions[i] > self.joint_positions[i] else -1
                self.joint_positions[i] += 0.1 * 0.05 * direction  # 0.05 is dt

        self.joint_publisher.publish(msg)

def main(args=None):
    rclpy.init(args=args)
    node = RobotController()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Step 6: Update setup.py with Robot Controller

Add the robot controller to your `setup.py`:

```python
entry_points={
    'console_scripts': [
        'talker = my_robot_exercises.publisher_member_function:main',
        'listener = my_robot_exercises.subscriber_member_function:main',
        'sensor_publisher = my_robot_exercises.sensor_publisher:main',
        'ai_agent = my_robot_exercises.ai_agent:main',
        'nav_server = my_robot_exercises.navigation_action_server:main',
        'robot_client = my_robot_exercises.robot_control_client:main',
        'robot_controller = my_robot_exercises.robot_controller:main',
    ],
},
```

### Step 7: Create a System Launch File

Create `my_robot_exercises/launch/integrated_system.launch.py`:

```python
from launch import LaunchDescription
from launch_ros.actions import Node
from ament_index_python.packages import get_package_share_directory
import os

def generate_launch_description():
    return LaunchDescription([
        # Robot controller
        Node(
            package='my_robot_exercises',
            executable='robot_controller',
            name='robot_controller',
            output='screen'
        ),
        # AI agent
        Node(
            package='my_robot_exercises',
            executable='ai_agent',
            name='ai_agent',
            output='screen'
        ),
        # Navigation server
        Node(
            package='my_robot_exercises',
            executable='nav_server',
            name='navigation_server',
            output='screen'
        )
    ])
```

### Step 8: Build the Package

```bash
cd ~/ros2_ws
colcon build --packages-select my_robot_exercises
source install/setup.bash
```

## Part C: Testing the Integrated System

### Step 9: Run the Integrated System

```bash
# Terminal 1: Launch the integrated system
source ~/ros2_ws/install/setup.bash
ros2 launch my_robot_exercises integrated_system.launch.py

# Terminal 2: Send commands to the AI agent (manually or through another node)
source ~/ros2_ws/install/setup.bash
ros2 topic pub /ai_commands std_msgs/String "data: 'move_forward'"

# Terminal 3: Test services
source ~/ros2_ws/install/setup.bash
ros2 service call /emergency_stop std_srvs/srv/SetBool "{data: true}"
```

## Expected Results

- The AI agent should process sensor data and make decisions
- The robot controller should respond to commands from the AI agent
- Services should be callable to control robot behavior
- The system should demonstrate integration between AI algorithms and robot control

## Troubleshooting Tips

- Ensure all nodes are properly sourced and discoverable
- Check that topics and services have the correct names
- Monitor the logs for any error messages
- Verify that the robot simulation environment is properly configured

## Advanced Challenge

Extend the AI agent to include more sophisticated decision-making logic, such as:
- Path planning algorithms
- Learning from past experiences
- Multi-objective optimization (efficiency, safety, etc.)
- Integration with real sensor data if available

## Summary

This exercise demonstrates the integration of Python-based AI agents with ROS 2 controllers, which is fundamental for modern humanoid robotics. You've created a complete system where an AI agent makes decisions based on sensor data, communicates those decisions to a robot controller, and executes behaviors on the robot. This represents the core concept of connecting AI algorithms with physical robot control systems.