---
sidebar_position: 4
---

# Python Integration with rclpy

## Introduction to rclpy

`rclpy` is the Python client library for ROS 2. It provides a Python API for creating ROS 2 nodes, publishing and subscribing to topics, making service calls, and more. For humanoid robotics applications, `rclpy` enables rapid prototyping and integration of AI algorithms written in Python with the ROS 2 ecosystem.

## Installing and Setting Up rclpy

`rclpy` comes pre-installed with ROS 2 Humble Hawksbill. To use it in your Python scripts, simply import it:

```python
import rclpy
from rclpy.node import Node
```

## Basic Node Structure

Every ROS 2 Python node follows the same basic structure:

```python
import rclpy
from rclpy.node import Node

class MyRobotNode(Node):
    def __init__(self):
        # Initialize the node with a name
        super().__init__('my_robot_node')

        # Node initialization code goes here
        self.get_logger().info('MyRobotNode initialized')

def main(args=None):
    # Initialize rclpy
    rclpy.init(args=args)

    # Create node instance
    node = MyRobotNode()

    # Keep the node running
    rclpy.spin(node)

    # Cleanup
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Working with Messages

ROS 2 uses messages to communicate between nodes. The standard message types are available in packages like `std_msgs`, `sensor_msgs`, and `geometry_msgs`.

### Importing Message Types

```python
# Standard messages
from std_msgs.msg import String, Int32, Float64
from geometry_msgs.msg import Twist, Pose, Point
from sensor_msgs.msg import JointState, Image, LaserScan

# Service messages
from std_srvs.srv import SetBool, Trigger
from example_interfaces.srv import AddTwoInts
```

### Creating and Publishing Messages

```python
from rclpy.node import Node
from std_msgs.msg import String

class MessagePublisher(Node):
    def __init__(self):
        super().__init__('message_publisher')

        # Create publisher
        self.publisher = self.create_publisher(String, 'my_topic', 10)

        # Create a timer to publish messages periodically
        self.timer = self.create_timer(0.5, self.publish_message)
        self.counter = 0

    def publish_message(self):
        msg = String()
        msg.data = f'Hello from Python: {self.counter}'
        self.publisher.publish(msg)
        self.get_logger().info(f'Published: {msg.data}')
        self.counter += 1
```

## Subscribing to Topics

Subscribers allow your Python node to receive messages from other nodes:

```python
from rclpy.node import Node
from std_msgs.msg import String

class MessageSubscriber(Node):
    def __init__(self):
        super().__init__('message_subscriber')

        # Create subscriber
        self.subscription = self.create_subscription(
            String,
            'my_topic',
            self.listener_callback,
            10)  # QoS history depth
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: {msg.data}')
```

## Working with Services

Services provide request/response communication patterns:

### Service Client

```python
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class ServiceClient(Node):
    def __init__(self):
        super().__init__('service_client')

        # Create client
        self.client = self.create_client(AddTwoInts, 'add_two_ints')

        # Wait for service to be available
        while not self.client.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('Service not available, waiting...')

    def send_request(self, a, b):
        request = AddTwoInts.Request()
        request.a = a
        request.b = b

        # Make asynchronous call
        future = self.client.call_async(request)
        return future
```

### Service Server

```python
from rclpy.node import Node
from example_interfaces.srv import AddTwoInts

class ServiceServer(Node):
    def __init__(self):
        super().__init__('service_server')

        # Create service
        self.service = self.create_service(
            AddTwoInts,
            'add_two_ints',
            self.add_callback)

    def add_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info(f'Returning {response.sum}')
        return response
```

## Working with Actions

Actions are used for long-running tasks that provide feedback:

```python
from rclpy.node import Node
from rclpy.action import ActionClient
from rclpy.callback_groups import ReentrantCallbackGroup
from rclpy.executors import MultiThreadedExecutor
from example_interfaces.action import Fibonacci

class ActionClientNode(Node):
    def __init__(self):
        super().__init__('action_client')
        self._action_client = ActionClient(
            self,
            Fibonacci,
            'fibonacci'
        )

    def send_goal(self, order):
        goal_msg = Fibonacci.Goal()
        goal_msg.order = order

        self._action_client.wait_for_server()

        # Send goal and get future
        self._send_goal_future = self._action_client.send_goal_async(
            goal_msg,
            feedback_callback=self.feedback_callback)

        self._send_goal_future.add_done_callback(self.goal_response_callback)

    def goal_response_callback(self, future):
        goal_handle = future.result()
        if not goal_handle.accepted:
            self.get_logger().info('Goal rejected')
            return

        self.get_logger().info('Goal accepted')

        self._get_result_future = goal_handle.get_result_async()
        self._get_result_future.add_done_callback(self.get_result_callback)

    def feedback_callback(self, feedback_msg):
        feedback = feedback_msg.feedback
        self.get_logger().info(f'Received feedback: {feedback.sequence}')

    def get_result_callback(self, future):
        result = future.result().result
        self.get_logger().info(f'Result: {result.sequence}')
```

## Timer-Based Operations

Timers are essential for periodic operations in robotics:

```python
from rclpy.node import Node

class TimerNode(Node):
    def __init__(self):
        super().__init__('timer_node')

        # Create timer with 1Hz frequency
        self.timer = self.create_timer(1.0, self.timer_callback)
        self.counter = 0

    def timer_callback(self):
        self.get_logger().info(f'Timer callback {self.counter}')
        self.counter += 1

    def create_custom_timer(self, period_seconds, callback):
        """Create a timer with custom period"""
        return self.create_timer(period_seconds, callback)
```

## Parameter Management

Parameters allow runtime configuration of nodes:

```python
from rclpy.node import Node

class ParameterNode(Node):
    def __init__(self):
        super().__init__('parameter_node')

        # Declare parameters with default values
        self.declare_parameter('robot_name', 'humanoid_robot')
        self.declare_parameter('control_frequency', 100)
        self.declare_parameter('max_velocity', 1.0)

        # Get parameter values
        self.robot_name = self.get_parameter('robot_name').value
        self.control_frequency = self.get_parameter('control_frequency').value
        self.max_velocity = self.get_parameter('max_velocity').value

        # Set up parameter callback for dynamic reconfiguration
        self.add_on_set_parameters_callback(self.parameter_callback)

    def parameter_callback(self, params):
        """Callback for parameter changes"""
        for param in params:
            if param.name == 'max_velocity' and param.type_ == param.Type.DOUBLE:
                self.max_velocity = param.value
                self.get_logger().info(f'Max velocity updated to {param.value}')
        return SetParametersResult(successful=True)
```

## Handling Multiple Callbacks

For nodes that need to handle multiple types of callbacks efficiently:

```python
from rclpy.node import Node
from rclpy.callback_groups import MutuallyExclusiveCallbackGroup
from rclpy.executors import MultiThreadedExecutor
import threading

class MultiCallbackNode(Node):
    def __init__(self):
        super().__init__('multi_callback_node')

        # Create different callback groups for concurrent execution
        self.group1 = MutuallyExclusiveCallbackGroup()
        self.group2 = MutuallyExclusiveCallbackGroup()

        # Subscribers with different callback groups
        self.sub1 = self.create_subscription(
            String, 'topic1', self.callback1, 10,
            callback_group=self.group1)

        self.sub2 = self.create_subscription(
            String, 'topic2', self.callback2, 10,
            callback_group=self.group2)

        # Timer with its own callback group
        self.timer = self.create_timer(
            0.1, self.timer_callback,
            callback_group=self.group1)

    def callback1(self, msg):
        # This runs in group1
        self.get_logger().info(f'Callback 1: {msg.data}')

    def callback2(self, msg):
        # This runs in group2 (concurrently with group1)
        self.get_logger().info(f'Callback 2: {msg.data}')

    def timer_callback(self):
        # This also runs in group1
        self.get_logger().info('Timer callback')
```

## Error Handling and Logging

Proper error handling is crucial for robust robotic systems:

```python
from rclpy.node import Node
import traceback

class RobustNode(Node):
    def __init__(self):
        super().__init__('robust_node')

        # Set up different logging levels
        self.get_logger().set_level(rclpy.logging.LoggingSeverity.INFO)

    def safe_operation(self):
        try:
            # Potentially risky operation
            result = self.perform_calculation()
            self.get_logger().info(f'Operation successful: {result}')
            return result
        except ValueError as e:
            self.get_logger().error(f'Value error: {e}')
        except Exception as e:
            self.get_logger().fatal(f'Unexpected error: {e}')
            self.get_logger().fatal(f'Traceback: {traceback.format_exc()}')
        return None

    def perform_calculation(self):
        # Example calculation that might fail
        return 10 / 0  # This will raise ZeroDivisionError
```

## Integration with Python AI Libraries

One of the key advantages of using Python with ROS 2 is easy integration with AI libraries:

```python
import rclpy
from rclpy.node import Node
import numpy as np
# Example integration with common AI libraries
# import tensorflow as tf
# import torch
# import sklearn

class AIAgentNode(Node):
    def __init__(self):
        super().__init__('ai_agent_node')

        # Initialize AI model (example)
        self.model = self.initialize_model()

        # Create subscriber for sensor data
        self.sensor_sub = self.create_subscription(
            # Replace with appropriate message type
            # SensorMsgType,
            'sensor_data',
            self.sensor_callback,
            10
        )

        # Create publisher for commands
        self.command_pub = self.create_publisher(
            # Replace with appropriate message type
            # CommandType,
            'robot_commands',
            10
        )

    def initialize_model(self):
        """Initialize AI model"""
        # Example: Create a simple neural network or load a pre-trained model
        # model = tf.keras.models.load_model('path/to/model')
        # Or create a simple model
        self.get_logger().info('AI model initialized')
        return "dummy_model"

    def sensor_callback(self, msg):
        """Process sensor data with AI model"""
        try:
            # Convert ROS message to format suitable for AI model
            sensor_data = self.process_sensor_msg(msg)

            # Run inference
            command = self.run_inference(sensor_data)

            # Publish command
            self.publish_command(command)

        except Exception as e:
            self.get_logger().error(f'Error in AI processing: {e}')

    def process_sensor_msg(self, msg):
        """Convert ROS message to AI model input"""
        # Implementation depends on message type
        return np.array([0.0])  # Placeholder

    def run_inference(self, data):
        """Run AI model inference"""
        # Implementation depends on model type
        return np.array([0.0])  # Placeholder

    def publish_command(self, command):
        """Publish command to robot"""
        # Create and publish appropriate message
        pass
```

## Testing rclpy Nodes

Testing is important for ensuring reliability:

```python
import unittest
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class TestMyNode(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        rclpy.init()

    @classmethod
    def tearDownClass(cls):
        rclpy.shutdown()

    def test_node_creation(self):
        node = Node('test_node')
        self.assertEqual(node.get_name(), '/test_node')
        node.destroy_node()

    def test_publisher_subscriber(self):
        # Test publisher and subscriber interaction
        pass  # Implementation would depend on specific node to test
```

## Best Practices for rclpy

1. **Always call `rclpy.init()`** before creating nodes
2. **Use `rclpy.spin()`** to keep nodes running
3. **Properly destroy nodes** with `node.destroy_node()`
4. **Use appropriate QoS settings** for your application
5. **Handle exceptions** gracefully in callbacks
6. **Use logging** appropriately (DEBUG, INFO, WARN, ERROR, FATAL)
7. **Declare parameters** explicitly with default values
8. **Use callback groups** for concurrent execution when needed
9. **Test your nodes** thoroughly before deployment

## Summary

`rclpy` provides a powerful and flexible way to integrate Python applications with ROS 2. Its ease of use, combined with Python's rich ecosystem of libraries, makes it ideal for developing AI agents and control systems for humanoid robots. Understanding these concepts is essential for implementing the integration between Python agents and ROS 2 controllers as described in User Story 4.