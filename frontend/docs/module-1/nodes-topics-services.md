---
sidebar_position: 3
---

# Nodes, Topics, and Services

## Understanding Nodes

A node is a fundamental component of a ROS 2 system that performs computation. In humanoid robotics, nodes typically handle specific aspects of robot behavior such as sensor processing, control algorithms, or communication with hardware.

### Creating a Node

In Python, nodes are created by subclassing `rclpy.node.Node`. Here's a basic example:

```python
import rclpy
from rclpy.node import Node

class MinimalNode(Node):
    def __init__(self):
        super().__init__('minimal_node')
        self.get_logger().info('Hello World from Python!')

def main(args=None):
    rclpy.init(args=args)
    node = MinimalNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Node Lifecycle

ROS 2 nodes have a well-defined lifecycle that includes:
- **Unconfigured**: Node is created but not configured
- **Inactive**: Node is configured but not active
- **Active**: Node is running and can execute callbacks
- **Finalized**: Node is shutting down

## Topics and Publish/Subscribe Pattern

Topics enable asynchronous communication between nodes using a publish/subscribe pattern. This is ideal for continuous data streams like sensor readings, robot states, or control commands.

### Publishers

A publisher sends messages to a topic. Here's an example of a publisher that sends "Hello World" messages:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalPublisher(Node):
    def __init__(self):
        super().__init__('minimal_publisher')
        self.publisher_ = self.create_publisher(String, 'topic', 10)
        timer_period = 0.5  # seconds
        self.timer = self.create_timer(timer_period, self.timer_callback)
        self.i = 0

    def timer_callback(self):
        msg = String()
        msg.data = f'Hello World: {self.i}'
        self.publisher_.publish(msg)
        self.get_logger().info(f'Publishing: "{msg.data}"')
        self.i += 1

def main(args=None):
    rclpy.init(args=args)
    minimal_publisher = MinimalPublisher()
    rclpy.spin(minimal_publisher)
    minimal_publisher.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Subscribers

A subscriber receives messages from a topic. Here's an example of a subscriber:

```python
import rclpy
from rclpy.node import Node
from std_msgs.msg import String

class MinimalSubscriber(Node):
    def __init__(self):
        super().__init__('minimal_subscriber')
        self.subscription = self.create_subscription(
            String,
            'topic',
            self.listener_callback,
            10)
        self.subscription  # prevent unused variable warning

    def listener_callback(self, msg):
        self.get_logger().info(f'I heard: "{msg.data}"')

def main(args=None):
    rclpy.init(args=args)
    minimal_subscriber = MinimalSubscriber()
    rclpy.spin(minimal_subscriber)
    minimal_subscriber.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Topic Communication in Humanoid Robots

In humanoid robots, common topics include:
- `/joint_states` - Current positions, velocities, and efforts of joints
- `/tf` - Transformations between coordinate frames
- `/sensor_msgs` - Sensor data (IMU, cameras, LIDAR)
- `/cmd_vel` - Velocity commands
- `/joint_commands` - Joint position/effort commands

## Services and Request/Response Pattern

Services provide synchronous communication with request/response semantics. This is useful for operations that need to complete before continuing, such as changing robot states or requesting specific actions.

### Creating a Service Server

Here's an example of a service server:

```python
from example_interfaces.srv import AddTwoInts
import rclpy
from rclpy.node import Node

class MinimalService(Node):
    def __init__(self):
        super().__init__('minimal_service')
        self.srv = self.create_service(AddTwoInts, 'add_two_ints', self.add_two_ints_callback)

    def add_two_ints_callback(self, request, response):
        response.sum = request.a + request.b
        self.get_logger().info(f'Returning {response.sum}')
        return response

def main(args=None):
    rclpy.init(args=args)
    minimal_service = MinimalService()
    rclpy.spin(minimal_service)
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Creating a Service Client

Here's an example of a service client:

```python
from example_interfaces.srv import AddTwoInts
import rclpy
from rclpy.node import Node

class MinimalClient(Node):
    def __init__(self):
        super().__init__('minimal_client')
        self.cli = self.create_client(AddTwoInts, 'add_two_ints')
        while not self.cli.wait_for_service(timeout_sec=1.0):
            self.get_logger().info('service not available, waiting again...')
        self.req = AddTwoInts.Request()

    def send_request(self, a, b):
        self.req.a = a
        self.req.b = b
        self.future = self.cli.call_async(self.req)
        rclpy.spin_until_future_complete(self, self.future)
        return self.future.result()

def main(args=None):
    rclpy.init(args=args)
    minimal_client = MinimalClient()
    response = minimal_client.send_request(1, 2)
    minimal_client.get_logger().info(f'Result of add_two_ints: {response.sum}')
    minimal_client.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

### Services in Humanoid Robotics

Common services in humanoid robots include:
- `/set_mode` - Change robot operational mode
- `/save_config` - Save robot configuration
- `/calibrate` - Calibrate sensors or joints
- `/get_robot_state` - Get current robot state

## Quality of Service (QoS) Settings

QoS settings allow you to specify how messages are delivered, which is important for real-time systems like humanoid robots:

```python
from rclpy.qos import QoSProfile, QoSDurabilityPolicy, QoSHistoryPolicy, QoSReliabilityPolicy

# Example QoS for sensor data (high frequency, no need to keep old values)
sensor_qos = QoSProfile(
    history=QoSHistoryPolicy.RMW_QOS_POLICY_HISTORY_KEEP_LAST,
    depth=1,
    reliability=QoSReliabilityPolicy.RMW_QOS_POLICY_RELIABILITY_BEST_EFFORT,
    durability=QoSDurabilityPolicy.RMW_QOS_POLICY_DURABILITY_VOLATILE
)

# Example QoS for critical commands (must be delivered reliably)
command_qos = QoSProfile(
    history=QoSHistoryPolicy.RMW_QOS_POLICY_HISTORY_KEEP_LAST,
    depth=10,
    reliability=QoSReliabilityPolicy.RMW_QOS_POLICY_RELIABILITY_RELIABLE,
    durability=QoSDurabilityPolicy.RMW_QOS_POLICY_DURABILITY_VOLATILE
)
```

## Parameter Server

ROS 2 includes a parameter server that allows nodes to store and retrieve configuration parameters:

```python
import rclpy
from rclpy.node import Node

class ParameterNode(Node):
    def __init__(self):
        super().__init__('parameter_node')

        # Declare parameters with default values
        self.declare_parameter('robot_name', 'humanoid_robot')
        self.declare_parameter('max_velocity', 1.0)

        # Get parameter values
        robot_name = self.get_parameter('robot_name').value
        max_velocity = self.get_parameter('max_velocity').value

        self.get_logger().info(f'Robot: {robot_name}, Max velocity: {max_velocity}')

def main(args=None):
    rclpy.init(args=args)
    node = ParameterNode()
    rclpy.spin(node)
    node.destroy_node()
    rclpy.shutdown()

if __name__ == '__main__':
    main()
```

## Launch Files

Launch files allow you to start multiple nodes at once with specific configurations:

```xml
<!-- example_launch.py -->
from launch import LaunchDescription
from launch_ros.actions import Node

def generate_launch_description():
    return LaunchDescription([
        Node(
            package='my_robot_package',
            executable='joint_state_publisher',
            name='joint_state_publisher'
        ),
        Node(
            package='my_robot_package',
            executable='robot_controller',
            name='robot_controller'
        ),
        Node(
            package='rviz2',
            executable='rviz2',
            name='rviz2'
        )
    ])
```

## Best Practices for Humanoid Robotics

1. **Modularity**: Keep nodes focused on single responsibilities
2. **Naming Conventions**: Use consistent, descriptive names for topics and services
3. **Error Handling**: Implement proper error handling and recovery mechanisms
4. **QoS Settings**: Choose appropriate QoS settings based on message criticality
5. **Resource Management**: Properly clean up resources in node destruction
6. **Logging**: Use appropriate logging levels for debugging and monitoring

## Summary

Understanding nodes, topics, and services is fundamental to ROS 2 programming. These communication patterns form the backbone of how humanoid robots coordinate their various subsystems. In the next section, we'll explore how to integrate Python agents with ROS 2 controllers using the rclpy library.