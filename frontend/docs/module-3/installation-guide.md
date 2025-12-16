# Software Installation Guide for Isaac Tools

## Overview

This guide provides step-by-step instructions for installing NVIDIA Isaac Sim, Isaac ROS, and Nav2 on Ubuntu 22.04 LTS. Follow these instructions carefully to set up your development environment for Module 3.

## Prerequisites

Before beginning the installation, ensure your system meets the hardware requirements outlined in the hardware requirements document. You should also have:

- Ubuntu 22.04 LTS installed
- Administrative (sudo) access to your system
- Internet connection for package downloads
- At least 50GB of free disk space
- NVIDIA GPU drivers properly installed

## Step 1: Install NVIDIA GPU Drivers and CUDA

### Update System Packages
```bash
# Update package list
sudo apt update
```

### Install NVIDIA Drivers
```bash
# Install recommended NVIDIA drivers
sudo apt install nvidia-driver-535

# Reboot to apply driver changes
sudo reboot
```

### Verify GPU Detection
```bash
# After reboot, verify GPU is detected
nvidia-smi
```

### Install CUDA
```bash
# Download and install CUDA 11.8
wget https://developer.download.nvidia.com/compute/cuda/11.8.0/local_installers/cuda_11.8.0_520.61.05_linux.run
sudo sh cuda_11.8.0_520.61.05_linux.run
```

### Update Environment Variables
```bash
# Add CUDA paths to ~/.bashrc
echo 'export PATH=/usr/local/cuda-11.8/bin:$PATH' >> ~/.bashrc
echo 'export LD_LIBRARY_PATH=/usr/local/cuda-11.8/lib64:$LD_LIBRARY_PATH' >> ~/.bashrc
source ~/.bashrc
```

## Step 2: Install ROS 2 Humble Hawksbill

### Set Locale
```bash
# Check current locale
locale

# Generate required locale
sudo locale-gen en_US en_US.UTF-8
sudo update-locale LC_ALL=en_US.UTF-8 LANG=en_US.UTF-8
export LANG=en_US.UTF-8
```

### Add ROS 2 Repository
```bash
# Install required packages
sudo apt update && sudo apt install -y curl gnupg lsb-release

# Add ROS 2 GPG key
sudo curl -sSL https://raw.githubusercontent.com/ros/rosdistro/master/ros.key -o /usr/share/keyrings/ros-archive-keyring.gpg

# Add ROS 2 repository
echo "deb [arch=$(dpkg --print-architecture) signed-by=/usr/share/keyrings/ros-archive-keyring.gpg] http://packages.ros.org/ros2/ubuntu $(source /etc/os-release && echo $UBUNTU_CODENAME) main" | sudo tee /etc/apt/sources.list.d/ros2.list > /dev/null
```

### Install ROS 2 Packages
```bash
# Update package list and install ROS 2 Humble
sudo apt update
sudo apt install ros-humble-desktop
sudo apt install python3-colcon-common-extensions
sudo apt install python3-rosdep

# Source ROS 2 environment
echo "source /opt/ros/humble/setup.bash" >> ~/.bashrc
source ~/.bashrc
```

## Step 3: Install Isaac Sim

### Install Isaac Sim Prerequisites
```bash
# Install Python packages
sudo apt install python3-pip python3-dev python3-venv
pip3 install --upgrade pip
```

### Download and Install Isaac Sim
```bash
# Isaac Sim requires registration on NVIDIA Developer website
# Download Isaac Sim from: https://developer.nvidia.com/isaac-sim

# After downloading the installer, run:
# chmod +x isaac-sim-*.sh
# sudo ./isaac-sim-*.sh

# Alternative: Use Omniverse Launcher (recommended for educational environments)
# Download Omniverse Launcher from: https://www.nvidia.com/en-us/omniverse/download/
```

### Verify Isaac Sim Installation
```bash
# Navigate to Isaac Sim directory (typically ~/isaac-sim)
cd ~/isaac-sim

# Run Isaac Sim to verify installation
./isaac-sim.py
```

## Step 4: Install Isaac ROS

### Create ROS Workspace
```bash
# Create a new ROS workspace for Isaac ROS packages
mkdir -p ~/isaac_ros_ws/src
cd ~/isaac_ros_ws
```

### Install Isaac ROS Dependencies
```bash
# Initialize rosdep if not already done
sudo rosdep init
rosdep update

# Install additional dependencies
sudo apt update
sudo apt install python3-rosdep python3-colcon-common-extensions
```

### Clone Isaac ROS Packages
```bash
# Navigate to the source directory
cd ~/isaac_ros_ws/src

# Clone Isaac ROS packages for Humble Hawksbill
git clone -b humble https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_common.git
git clone -b humble https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_visual_slam.git
git clone -b humble https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_image_pipeline.git
git clone -b humble https://github.com/NVIDIA-ISAAC-ROS/isaac_ros_bringup.git
```

### Install Package Dependencies
```bash
# Navigate to workspace root
cd ~/isaac_ros_ws

# Install dependencies using rosdep
rosdep install --from-paths src --ignore-src -r -y
```

### Build Isaac ROS Workspace
```bash
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

## Step 5: Install Navigation2 (Nav2)

### Install Nav2 Packages
```bash
# Install core Nav2 packages
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

### Verify Nav2 Installation
```bash
# Test Nav2 installation
ros2 launch nav2_bringup navigation_launch.py --show-args
```

## Step 6: Verify Complete Installation

### Test Isaac Sim
1. Launch Isaac Sim
2. Create a new scene (File → New)
3. Add basic objects and verify rendering works

### Test Isaac ROS
```bash
# Source all environments
source /opt/ros/humble/setup.bash
source ~/isaac_ros_ws/install/setup.bash

# Test Isaac ROS launch files
ros2 launch isaac_ros_visual_slam isaac_ros_visual_slam.launch.py --show-args
```

### Test Nav2
```bash
# Source ROS environment
source /opt/ros/humble/setup.bash

# Test Nav2 launch files
ros2 launch nav2_bringup navigation_launch.py --show-args
```

## Docker Environment Setup (Alternative)

For consistent environments across students, consider using Docker:

### Install Docker
```bash
# Install Docker
sudo apt update
sudo apt install docker.io
sudo usermod -aG docker $USER

# Log out and log back in for group changes to take effect
```

### Create Docker Compose File
Create a file named `isaac-tools-compose.yaml`:

```yaml
version: '3.8'
services:
  isaac-ros:
    image: nvidia/isaac-ros:latest
    runtime: nvidia
    environment:
      - NVIDIA_VISIBLE_DEVICES=all
      - NVIDIA_DRIVER_CAPABILITIES=all
    volumes:
      - /tmp/.X11-unix:/tmp/.X11-unix:rw
      - ./workspace:/workspace
    network_mode: host
    stdin_open: true
    tty: true
```

## Troubleshooting Common Installation Issues

### CUDA Installation Issues
- If CUDA installation fails, ensure you have the correct version for your driver
- Check NVIDIA driver version with `nvidia-smi`

### ROS 2 Installation Issues
- If ROS packages are not found, verify the repository was added correctly
- Ensure your Ubuntu version matches the supported versions

### Isaac Sim Installation Issues
- Ensure you have registered on the NVIDIA Developer website
- Check that your GPU is supported
- Verify sufficient disk space is available

### Isaac ROS Build Issues
- If compilation fails, ensure all dependencies are installed
- Check that ROS 2 Humble is properly installed
- Verify git submodules are properly cloned

### Network Configuration
- For multi-user environments, configure ROS_DOMAIN_ID to avoid conflicts
- Set environment variable: `export ROS_DOMAIN_ID=<unique_id>`

## Next Steps

After completing the installation:

1. Follow the Quickstart Guide to run your first Isaac Sim scene
2. Complete the three practical labs for hands-on experience
3. Review the performance optimization documentation
4. Test the complete pipeline integration

## References

- [ROS 2 Humble Installation Guide](https://docs.ros.org/en/humble/Installation.html)
- [Isaac Sim Documentation](https://docs.omniverse.nvidia.com/isaacsim/book_welcome/index.html)
- [Isaac ROS Documentation](https://nvidia-isaac-ros.github.io/)
- [Navigation2 Documentation](https://navigation.ros.org/)