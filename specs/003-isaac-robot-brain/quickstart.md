# Quickstart Guide: Module 3 - The AI-Robot Brain (NVIDIA Isaac)

## Overview
This quickstart guide will help you set up the NVIDIA Isaac tools environment for Module 3, including Isaac Sim, Isaac ROS pipelines, and Nav2 integration for humanoid navigation.

## Prerequisites

### Hardware Requirements
- RTX-capable workstation (RTX 3080 or better recommended)
- 32GB RAM (minimum 16GB)
- Ubuntu 22.04 LTS
- Internet connection for package downloads

### Software Requirements
- ROS 2 Humble Hawksbill
- NVIDIA GPU drivers (520.61.05 or newer)
- CUDA 11.8 or newer
- Docker (for containerized Isaac tools)

## Installation Steps

### 1. Install NVIDIA GPU Drivers and CUDA
```bash
# Update package list
sudo apt update

# Install NVIDIA drivers
sudo apt install nvidia-driver-535

# Reboot to apply driver changes
sudo reboot

# Verify GPU is detected
nvidia-smi

# Install CUDA
wget https://developer.download.nvidia.com/compute/cuda/11.8.0/local_installers/cuda_11.8.0_520.61.05_linux.run
sudo sh cuda_11.8.0_520.61.05_linux.run
```

### 2. Install ROS 2 Humble Hawksbill
```bash
# Set locale
locale  # check for UTF-8
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8

# Add ROS 2 GPG key and repository
sudo apt update && sudo apt install -y curl gnupg lsb-release
curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key | sudo gpg --dearmor -o /usr/share/keyrings/ros-archive-keyring.gpg
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null

# Install ROS 2 packages
sudo apt update
sudo apt install ros-humble-desktop
sudo apt install python3-colcon-common-extensions
sudo apt install python3-rosdep

# Source ROS 2 environment
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

### 3. Install Isaac Sim
```bash
# Install Isaac Sim prerequisites
sudo apt install python3-pip python3-dev python3-venv
pip3 install --upgrade pip

# Download Isaac Sim from NVIDIA Developer website (requires registration)
# Follow the installation guide at: https://docs.omniverse.nvidia.com/isaacsim/book_welcome/index.html

# After installation, verify Isaac Sim runs
cd ~/isaac-sim
./isaac-sim.py
```

### 4. Install Isaac ROS
```bash
# Create a new ROS workspace
mkdir -p ~/isaac_ros_ws/src
cd ~/isaac_ros_ws

# Install Isaac ROS dependencies
sudo apt update
sudo apt install python3-rosdep python3-colcon-common-extensions
sudo rosdep init
rosdep update

# Clone Isaac ROS packages
cd ~/isaac_ros_ws/src
git clone -b humble https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_common.git
git clone -b humble https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_visual_slam.git
git clone -b humble https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_image_pipeline.git
git clone -b humble https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_bringup.git

# Install dependencies
cd ~/isaac_ros_ws
rosdep install --from-paths src --ignore-src -r -y

# Build the workspace
colcon build --symlink-install --packages-select \
  isaac_ros_common \
  isaac_ros_visual_slam \
  isaac_ros_image_pipeline \
  isaac_ros_bringup

# Source the workspace
source ~/isaac_ros_ws/install/setup.bash
echo "source ~/isaac_ros_ws/install/setup.bash" >> ~/.bashrc
```

### 5. Install Navigation2 (Nav2)
```bash
# Install Nav2 packages
sudo apt update
sudo apt install ros-humble-navigation2 ros-humble-nav2-bringup
sudo apt install ros-humble-nav2-gazebo-spawner
sudo apt install ros-humble-nav2-controller-server
sudo apt install ros-humble-nav2-planner-server
sudo apt install ros-humble-nav2-recoveries
sudo apt install ros-humble-nav2-rviz-plugins
sudo apt install ros-humble-nav2-map-server
sudo apt install ros-humble-nav2-lifecycle-manager
```

## Running Your First Isaac Sim Scene

### 1. Launch Isaac Sim
```bash
cd ~/isaac-sim
./isaac-sim.py
```

### 2. Create a Basic Scene
1. In Isaac Sim, go to `File → New` to create a new scene
2. Add a ground plane: `Create → Ground Plane`
3. Add a simple robot: `Create → Robot → Carter`
4. Add lighting: `Create → Lights → Distant Light`
5. Save the scene: `File → Save As` (save as `basic_scene.usd`)

### 3. Generate Synthetic Dataset
1. Open the Isaac Sim Replicator window: `Window → Replicator`
2. Create a camera: `Create → Camera → Camera`
3. Set up randomization for textures and lighting
4. Run the replicator to generate images and depth maps
5. Export the dataset to your desired location

## Running Isaac ROS VSLAM Pipeline

### 1. Launch Isaac ROS Visual SLAM
```bash
# Source your ROS environment
source /opt/ros/humble/setup.bash
source ~/isaac_ros_ws/install/setup.bash

# Launch the visual slam pipeline
ros2 launch isaac_ros_visual_slam isaac_ros_visual_slam.launch.py
```

### 2. Visualize Results in RViz
```bash
# In a new terminal
source /opt/ros/humble/setup.bash
source ~/isaac_ros_ws/install/setup.bash

# Launch RViz
rviz2

# Add displays for:
# - Image topic: `/rgb/image_raw`
# - Pose topic: `/visual_slam/tracking/pose`
# - Map topic: `/visual_slam/map`
```

## Integrating with Nav2 for Navigation

### 1. Launch Nav2 with Isaac ROS Inputs
```bash
# Source ROS environment
source /opt/ros/humble/setup.bash
source ~/isaac_ros_ws/install/setup.bash

# Launch Nav2 with Isaac ROS integration
ros2 launch nav2_bringup navigation_launch.py use_sim_time:=true
```

### 2. Send Navigation Goals
```bash
# In a new terminal, send a navigation goal
source /opt/ros/humble/setup.bash
ros2 action send_goal /navigate_to_pose nav2_msgs/action/NavigateToPose "{pose: {pose: {position: {x: 1.0, y: 1.0, z: 0.0}, orientation: {z: 0.0, w: 1.0}}, header: {frame_id: 'map'}}}"
```

## Training with Synthetic Data

### 1. Prepare Your Dataset
```bash
# Navigate to your dataset directory
cd ~/synthetic_datasets/my_dataset

# Verify dataset structure
ls -la
# Should contain: images/, depth/, annotations/, metadata.json
```

### 2. Train a Simple Perception Model
```bash
# Create a Python script for training
cat << EOF > train_perception_model.py
import numpy as np
import cv2
import os
from sklearn.model_selection import train_test_split

def load_dataset(dataset_path):
    """Load images and annotations from synthetic dataset"""
    images = []
    labels = []

    image_dir = os.path.join(dataset_path, "images")
    annotation_dir = os.path.join(dataset_path, "annotations")

    for filename in os.listdir(image_dir):
        if filename.endswith(('.png', '.jpg', '.jpeg')):
            img_path = os.path.join(image_dir, filename)
            ann_path = os.path.join(annotation_dir, filename.replace('.jpg', '.png').replace('.jpeg', '.png'))

            img = cv2.imread(img_path)
            ann = cv2.imread(ann_path, cv2.IMREAD_GRAYSCALE)

            images.append(img)
            labels.append(ann)

    return np.array(images), np.array(labels)

# Load dataset
X, y = load_dataset("~/synthetic_datasets/my_dataset")

# Split into training and validation sets
X_train, X_val, y_train, y_val = train_test_split(X, y, test_size=0.2, random_state=42)

print(f"Training set: {X_train.shape[0]} samples")
print(f"Validation set: {X_val.shape[0]} samples")

# Here you would implement your model training
# For example, using TensorFlow/Keras or PyTorch
EOF

python3 train_perception_model.py
```

## Troubleshooting Common Issues

### Isaac Sim Performance
- If FPS is low, reduce scene complexity or sensor count
- Ensure you're using an RTX GPU with adequate VRAM
- Close other GPU-intensive applications

### ROS Communication Issues
- Verify all nodes are on the same network
- Check ROS_DOMAIN_ID is consistent across terminals
- Ensure proper network configuration for multi-machine setups

### Nav2 Path Planning Issues
- Verify the map is properly loaded
- Check that localization is working before navigation
- Ensure the robot's kinematic constraints are properly configured

## Next Steps
1. Complete the three practical labs in the full module:
   - Lab 1: Isaac Sim scene creation & synthetic data export
   - Lab 2: Isaac ROS VSLAM pipeline implementation
   - Lab 3: Nav2 integration and humanoid path planning
2. Experiment with different scene complexities and sensor configurations
3. Explore transfer learning from synthetic to real-world data
4. Test deployment on Jetson/Orin hardware if available