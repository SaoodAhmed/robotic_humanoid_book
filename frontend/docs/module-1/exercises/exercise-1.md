---
sidebar_position: 1
---

# Exercise 1: Basic Node Communication

## Objective

Create and run a simple publisher-subscriber pair to understand basic ROS 2 communication patterns.

## Prerequisites

- ROS 2 Humble Hawksbill installed
- Python 3.8
- Basic understanding of ROS 2 concepts

## Learning Outcomes

After completing this exercise, you will be able to:
- Create a ROS 2 publisher node in Python
- Create a ROS 2 subscriber node in Python
- Run nodes and observe message passing between them

## Estimated Duration

30-45 minutes

## Step-by-Step Instructions

### Step 1: Create a ROS 2 Package

First, create a new ROS 2 package for your exercises:

```bash
# Create workspace if you don't have one
mkdir -p ~/ros2_ws/src
cd ~/ros2_ws/src

# Create the package
ros2 pkg create --build-type ament_python my_robot_exercises
cd my_robot_exercises
```

### Step 2: Create the Publisher Node

Create a publisher script at `my_robot_exercises/my_robot_exercises/publisher_member_function.py`:

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

### Step 3: Create the Subscriber Node

Create a subscriber script at `my_robot_exercises/my_robot_exercises/subscriber_member_function.py`:

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

### Step 4: Update setup.py

Update the `setup.py` file in your package to include the new scripts:

```python
from setuptools import find_packages, setup

package_name = 'my_robot_exercises'

setup(
    name=package_name,
    version='0.0.0',
    packages=find_packages(exclude=['test']),
    data_files=[
        ('share/ament_index/resource_index/packages',
            ['resource/' + package_name]),
        ('share/' + package_name, ['package.xml']),
    ],
    install_requires=['setuptools'],
    zip_safe=True,
    maintainer='Your Name',
    maintainer_email='your.email@example.com',
    description='Basic ROS 2 exercises',
    license='Apache-2.0',
    tests_require=['pytest'],
    entry_points={
        'console_scripts': [
            'talker = my_robot_exercises.publisher_member_function:main',
            'listener = my_robot_exercises.subscriber_member_function:main',
        ],
    },
)
```

### Step 5: Build the Package

```bash
cd ~/ros2_ws
colcon build --packages-select my_robot_exercises
source install/setup.bash
```

### Step 6: Run the Publisher Node

Open a new terminal and run:

```bash
source ~/ros2_ws/install/setup.bash
ros2 run my_robot_exercises talker
```

### Step 7: Run the Subscriber Node

Open another terminal and run:

```bash
source ~/ros2_ws/install/setup.bash
ros2 run my_robot_exercises listener
```

### Step 8: Observe the Communication

You should see the publisher sending messages and the subscriber receiving them. The publisher will count up from 0, and the subscriber will print the received messages.

## Expected Output

Publisher terminal should show:
```
[INFO] [1612345678.123456789] [minimal_publisher]: Publishing: "Hello World: 0"
[INFO] [1612345678.623456789] [minimal_publisher]: Publishing: "Hello World: 1"
...
```

Subscriber terminal should show:
```
[INFO] [1612345678.373456789] [minimal_subscriber]: I heard: "Hello World: 0"
[INFO] [1612345678.873456789] [minimal_subscriber]: I heard: "Hello World: 1"
...
```

## Troubleshooting Tips

- Ensure both terminals have sourced the ROS 2 environment: `source /opt/ros/humble/setup.bash`
- Make sure you've sourced your workspace: `source ~/ros2_ws/install/setup.bash`
- Check that the topic names match between publisher and subscriber
- Verify that your firewall is not blocking DDS communication

## Advanced Challenge

Modify the publisher to send different types of messages (e.g., integers, custom messages) and update the subscriber accordingly.

## Summary

This exercise demonstrated the fundamental publish-subscribe communication pattern in ROS 2. You created two nodes that communicate through a topic, which is a core concept in ROS 2 and essential for humanoid robot control systems.