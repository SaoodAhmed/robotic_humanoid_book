# Quickstart Guide: Physical AI & Humanoid Robotics Textbook (Module 1)

## Prerequisites

Before starting with Module 1: The Robotic Nervous System (ROS 2), ensure you have the following installed and configured:

- **Operating System**: Ubuntu 22.04 LTS (recommended) or equivalent Linux distribution
- **ROS 2**: Humble Hawksbill LTS distribution installed
- **Python**: Python 3.8 (required for compatibility with ROS 2 Humble)
- **Node.js**: Version 18 or higher for Docusaurus
- **npm**: Package manager for Node.js
- **Gazebo**: Classic or Garden simulation environment
- **Git**: Version control system

## Setting up the Development Environment

### 1. Install ROS 2 Humble Hawksbill

```bash
# Add the ROS 2 GPG key and repository
sudo apt update && sudo apt install curl gnupg lsb-release
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Install ROS 2 Humble packages
sudo apt update
sudo apt install ros-humble-desktop
sudo apt install python3-rosdep2
sudo apt install python3-colcon-common-extensions

# Source ROS 2 environment
source /opt/ros/humble/setup.bash
```

### 2. Install Python 3.8

```bash
# Install Python 3.8 and pip
sudo apt update
sudo apt install python3.8 python3.8-venv python3.8-dev python3-pip

# Verify Python version
python3.8 --version
```

### 3. Install Gazebo

```bash
# Install Gazebo (Classic or Garden)
sudo apt install ros-humble-gazebo-*
```

### 4. Set up Docusaurus Frontend

```bash
# Navigate to project root
cd /path/to/your/project

# Create frontend directory with Docusaurus
npx create-docusaurus@latest frontend classic --typescript

# Navigate to frontend directory
cd frontend

# Install additional dependencies if needed
npm install
```

## Creating Your First ROS 2 Node

### 1. Create a ROS 2 Workspace

```bash
# Create workspace directory
mkdir -p ~/ros2_workspace/src
cd ~/ros2_workspace

# Source ROS 2 environment
source /opt/ros/humble/setup.bash

# Build the workspace
colcon build
source install/setup.bash
```

### 2. Write a Simple Publisher Node

Create the following file in your workspace:
`~/ros2_workspace/src/my_robot_tutorials/my_robot_tutorials/publisher_member_function.py`

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

### 3. Run the Publisher Node

```bash
# In one terminal, source the workspace
cd ~/ros2_workspace
source install/setup.bash
ros2 run my_robot_tutorials publisher_member_function

# In another terminal, listen to the topic
cd ~/ros2_workspace
source install/setup.bash
ros2 topic echo /topic std_msgs/msg/String
```

## Building the Textbook Frontend

### 1. Navigate to the Frontend Directory

```bash
cd frontend
```

### 2. Start the Development Server

```bash
npm run start
```

### 3. Build for Production

```bash
npm run build
```

## Module 1 Structure

The Module 1 content will be organized as follows in the `frontend/docs/module-1/` directory:

- `index.md` - Module overview and learning objectives
- `ros2-basics.md` - Introduction to ROS 2 concepts
- `nodes-topics-services.md` - Detailed explanation of ROS 2 communication patterns
- `rclpy-integration.md` - Python integration with ROS 2
- `urdf-modeling.md` - Introduction to URDF for robot modeling
- `exercises/` - Practical exercises with progressive complexity

## Running Examples from the Textbook

All code examples in the textbook can be run following the patterns demonstrated in the quickstart above. Each example will include:

1. **Setup instructions** - How to prepare your environment
2. **Code listing** - Complete code with explanations
3. **Execution steps** - How to run the example
4. **Expected output** - What you should see when running the example
5. **Troubleshooting tips** - Common issues and solutions

## Testing Your Setup

To verify that your environment is properly configured:

1. **ROS 2 Installation**: Run `ros2 --help` to confirm ROS 2 is installed
2. **Python Version**: Run `python3.8 --version` to confirm Python 3.8
3. **Gazebo Installation**: Run `gazebo` to launch the simulation environment
4. **Docusaurus**: Run `npm run start` in the frontend directory to launch the textbook

## Next Steps

After completing this quickstart:

1. Proceed to Module 1 content in the textbook
2. Complete the exercises in progressive order from basic to intermediate
3. Practice creating your own ROS 2 nodes using the patterns learned
4. Experiment with the simple custom humanoid model described in the URDF section