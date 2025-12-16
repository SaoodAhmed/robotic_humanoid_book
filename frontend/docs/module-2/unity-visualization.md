---
sidebar_position: 6
---

# Unity Visualization for Robotics

## Overview

Unity provides high-fidelity visualization capabilities that complement physics simulation in Gazebo. This section covers setting up Unity for robotics visualization, including humanoid model representation and human-robot interaction capabilities.

## Unity for Robotics Fundamentals

Unity is a powerful 3D development platform that can be used for creating high-quality visualizations of robotic systems. When combined with Gazebo for physics simulation, Unity provides an excellent environment for robotics research and education.

### Key Concepts

- **High-Fidelity Visualization**: Detailed rendering of robots and environments
- **Human-Robot Interaction**: Teleoperation and command interfaces
- **ROS 2 Integration**: Connecting Unity with ROS 2 systems via rosbridge_suite
- **Performance Optimization**: Ensuring smooth visualization on academic hardware

## Setting Up Unity for Robotics

### Prerequisites

Before starting with Unity robotics visualization:

- Unity 2022.3 LTS installed
- Basic Unity knowledge (scenes, GameObjects, components)
- ROS 2 Humble Hawksbill with rosbridge_suite
- Understanding of 3D coordinate systems

### Unity Scene Setup for Robotics

Creating a proper Unity scene for robotics visualization requires attention to scale, coordinate systems, and performance optimization from the start.

### Installing Robotics Packages

Unity provides specific packages for robotics development:

1. **Unity Robotics Hub**: Centralized access to robotics tools and packages
2. **Unity Robotics Package (URP)**: Core robotics functionality
3. **ROS-TCP-Connector**: Communication bridge between Unity and ROS 2

To install these packages:

1. Open Unity Hub and create a new 3D project
2. Go to Window → Package Manager
3. Install "ROS TCP Connector" from the package list
4. Import robotics samples if available

### Unity Scene Setup Exercise

**Difficulty**: Beginner
**Duration**: 20-25 minutes
**Objectives**: Set up Unity project for robotics, Install required packages, Create basic robot scene

Complete the following setup steps:
1. Create a new Unity 3D project named "RoboticsVisualization"
2. Install the ROS TCP Connector package via Package Manager
3. Create a simple robot model using primitive shapes (cubes for body and limbs)
4. Add a basic script to control one joint of the robot
5. Test that the scene runs at acceptable frame rate

### Basic Scene Setup

Create a basic Unity scene for robotics visualization:

```csharp
// BasicRobotController.cs
using UnityEngine;
using Unity.Robotics.ROSTCPConnector;
using RosMessageTypes.Std;

public class BasicRobotController : MonoBehaviour
{
    // Reference to ROS connector
    ROSConnection ros;

    // Robot position and rotation from ROS
    Vector3 robotPosition;
    Quaternion robotRotation;

    void Start()
    {
        // Get the ROS connection static instance
        ros = ROSConnection.GetOrCreateInstance();
        ros.RegisterPublisher<UInt8Msg>("robot_control");
    }

    void Update()
    {
        // Update robot visualization based on ROS data
        UpdateRobotVisualization();
    }

    void UpdateRobotVisualization()
    {
        // This method would update the Unity representation
        // based on data received from ROS
    }
}
```

## Humanoid Model Visualization

### Importing Robot Models

Unity supports various 3D model formats for robot visualization:

1. **URDF Importer**: Convert URDF files directly to Unity models
2. **FBX/OBJ**: Standard 3D model formats
3. **Custom models**: Created specifically for visualization

### Setting Up a Humanoid Robot

To create a humanoid robot visualization in Unity:

1. **Import the model**: Use the URDF Importer or import as standard 3D model
2. **Configure the skeleton**: Set up the humanoid skeleton for animation
3. **Add colliders**: For interaction detection (optional for visualization)
4. **Configure materials**: Apply appropriate materials for realistic appearance

### Humanoid Robot Setup Exercise

**Difficulty**: Intermediate
**Duration**: 30-40 minutes
**Objectives**: Create humanoid robot model, Set up joint hierarchy, Test basic movement

Create a humanoid robot with the following specifications:
1. Create a simple humanoid model with head, torso, 2 arms, and 2 legs
2. Set up the joint hierarchy with proper parent-child relationships
3. Add basic materials to distinguish different body parts
4. Implement a script to move the robot's arms in a waving motion
5. Ensure the model follows Unity's coordinate system conventions

### Animation and Movement

For humanoid robot visualization, you can animate the robot based on joint positions received from ROS:

```csharp
// HumanoidRobotController.cs
using UnityEngine;
using Unity.Robotics.ROSTCPConnector;
using RosMessageTypes.Sensor;

public class HumanoidRobotController : MonoBehaviour
{
    [SerializeField] Transform[] jointTransforms; // Array of joint transforms
    ROSConnection ros;

    void Start()
    {
        ros = ROSConnection.GetOrCreateInstance();
        // Subscribe to joint state topic
        ros.Subscribe<JointStateMsg>("joint_states", OnJointStateReceived);
    }

    void OnJointStateReceived(JointStateMsg jointState)
    {
        // Update joint positions based on ROS message
        for (int i = 0; i < jointState.name.Count; i++)
        {
            string jointName = jointState.name[i];
            float jointPosition = (float)jointState.position[i];

            // Find corresponding transform and update rotation
            Transform jointTransform = FindJointByName(jointName);
            if (jointTransform != null)
            {
                jointTransform.localRotation = Quaternion.Euler(0, jointPosition * Mathf.Rad2Deg, 0);
            }
        }
    }

    Transform FindJointByName(string name)
    {
        foreach (Transform joint in jointTransforms)
        {
            if (joint.name == name)
                return joint;
        }
        return null;
    }
}
```

## ROS 2 Integration

### Setting Up ROS Bridge

The connection between Unity and ROS 2 is established through rosbridge_suite:

1. **Install rosbridge_suite**:
   ```bash
   sudo apt install ros-humble-rosbridge-suite
   ```

2. **Launch the ROS bridge**:
   ```bash
   ros2 launch rosbridge_server rosbridge_websocket_launch.xml
   ```

3. **Configure Unity TCP connection**:
   - Default port: 9090
   - IP address: localhost (or remote machine address)

### Unity-ROS Communication

Unity communicates with ROS 2 through TCP messages. Here's how to set up basic communication:

```csharp
// ROSManager.cs
using UnityEngine;
using Unity.Robotics.ROSTCPConnector;
using RosMessageTypes.Geometry;

public class ROSManager : MonoBehaviour
{
    ROSConnection ros;

    void Start()
    {
        ros = ROSConnection.GetOrCreateInstance();
        ros.RegisterPublisher<TwistMsg>("cmd_vel");
    }

    public void SendVelocityCommand(float linearX, float angularZ)
    {
        var twist = new TwistMsg();
        twist.linear = new Vector3Msg(linearX, 0, 0);
        twist.angular = new Vector3Msg(0, 0, angularZ);

        ros.Publish("cmd_vel", twist);
    }
}
```

## Teleoperation Interfaces

### Basic Teleoperation Setup

Teleoperation allows direct control of the robot through Unity interface. Here's a basic implementation:

```csharp
// TeleoperationController.cs
using UnityEngine;
using Unity.Robotics.ROSTCPConnector;
using RosMessageTypes.Geometry;

public class TeleoperationController : MonoBehaviour
{
    ROSConnection ros;
    Camera mainCamera;

    void Start()
    {
        ros = ROSConnection.GetOrCreateInstance();
        ros.RegisterPublisher<TwistMsg>("cmd_vel");
        mainCamera = Camera.main;
    }

    void Update()
    {
        // Handle keyboard input for teleoperation
        float linear = 0f;
        float angular = 0f;

        if (Input.GetKey(KeyCode.W)) linear += 1f;
        if (Input.GetKey(KeyCode.S)) linear -= 1f;
        if (Input.GetKey(KeyCode.A)) angular += 1f;
        if (Input.GetKey(KeyCode.D)) angular -= 1f;

        if (linear != 0 || angular != 0)
        {
            SendVelocityCommand(linear, angular);
        }
    }

    void SendVelocityCommand(float linear, float angular)
    {
        var twist = new TwistMsg();
        twist.linear = new Vector3Msg(linear, 0, 0);
        twist.angular = new Vector3Msg(0, 0, angular);

        ros.Publish("cmd_vel", twist);
    }
}
```

### UI-Based Teleoperation

Create a UI for teleoperation with buttons and sliders:

```csharp
// UITeleoperation.cs
using UnityEngine;
using UnityEngine.UI;
using Unity.Robotics.ROSTCPConnector;
using RosMessageTypes.Geometry;

public class UITeleoperation : MonoBehaviour
{
    [SerializeField] Slider linearSlider;
    [SerializeField] Slider angularSlider;
    [SerializeField] Button moveButton;

    ROSConnection ros;

    void Start()
    {
        ros = ROSConnection.GetOrCreateInstance();
        ros.RegisterPublisher<TwistMsg>("cmd_vel");

        moveButton.onClick.AddListener(SendCommand);
    }

    void SendCommand()
    {
        var twist = new TwistMsg();
        twist.linear = new Vector3Msg(linearSlider.value, 0, 0);
        twist.angular = new Vector3Msg(0, 0, angularSlider.value);

        ros.Publish("cmd_vel", twist);
    }
}
```

## Command Interfaces

### High-Level Command System

Beyond basic velocity control, Unity can provide higher-level command interfaces:

```csharp
// CommandInterface.cs
using UnityEngine;
using Unity.Robotics.ROSTCPConnector;
using RosMessageTypes.Actionlib;

public class CommandInterface : MonoBehaviour
{
    ROSConnection ros;

    void Start()
    {
        ros = ROSConnection.GetOrCreateInstance();
        ros.RegisterPublisher<GoalIDMsg>("navigation/goal");
    }

    public void SendNavigationGoal(float x, float y, float theta)
    {
        // Implementation for sending navigation goals
        // This would typically use actionlib for goal-based navigation
    }

    public void SendManipulationCommand(string command)
    {
        // Implementation for sending manipulation commands
        ros.Publish("manipulation/command", new StdMsgs.StringMsg(command));
    }
}
```

## Performance Optimization

### Visual Quality vs. Performance

For academic hardware, balance visual quality with performance:

1. **Level of Detail (LOD)**: Use simpler models when the robot is far from the camera
2. **Occlusion Culling**: Don't render objects that aren't visible
3. **Texture Resolution**: Use lower resolution textures when possible
4. **Lighting**: Use baked lighting instead of real-time lighting when possible
5. **Shadow Quality**: Reduce shadow resolution or disable shadows in performance-critical scenarios

### Optimization Techniques

```csharp
// PerformanceOptimizer.cs
using UnityEngine;

public class PerformanceOptimizer : MonoBehaviour
{
    [Range(0.1f, 1.0f)]
    public float renderingQuality = 1.0f;

    void Update()
    {
        // Adjust rendering quality based on performance
        QualitySettings.globalTextureMipmapLimit = renderingQuality < 0.5f ? 1 : 0;
        QualitySettings.shadowDistance = renderingQuality < 0.7f ? 50f : 150f;
    }
}
```

## Integration with Gazebo Simulation

### Synchronization Between Gazebo and Unity

For effective visualization, Unity should reflect the state of the Gazebo simulation:

1. **State Synchronization**: Subscribe to ROS topics that publish robot states
2. **Time Synchronization**: Ensure Unity visualization matches simulation time
3. **Coordinate System Alignment**: Verify that coordinate systems match between Gazebo and Unity

### Example Synchronization

```csharp
// GazeboUnitySync.cs
using UnityEngine;
using Unity.Robotics.ROSTCPConnector;
using RosMessageTypes.Nav;

public class GazeboUnitySync : MonoBehaviour
{
    ROSConnection ros;

    void Start()
    {
        ros = ROSConnection.GetOrCreateInstance();
        ros.Subscribe<OdometryMsg>("odom", OnOdometryReceived);
    }

    void OnOdometryReceived(OdometryMsg odom)
    {
        // Update Unity robot position based on Gazebo odometry
        Vector3 position = new Vector3(
            (float)odom.pose.pose.position.x,
            (float)odom.pose.pose.position.z, // Unity Y is up, Gazebo Z is up
            (float)odom.pose.pose.position.y  // Unity Z is forward, Gazebo Y is forward
        );

        Quaternion rotation = new Quaternion(
            (float)odom.pose.pose.orientation.x,
            (float)odom.pose.pose.orientation.z,
            (float)odom.pose.pose.orientation.y,
            (float)odom.pose.pose.orientation.w
        );

        transform.position = position;
        transform.rotation = rotation;
    }
}
```

## Troubleshooting Unity Visualization

### Common Issues

1. **Connection Problems**:
   - Verify ROS bridge is running
   - Check port and IP address settings
   - Ensure firewall isn't blocking the connection

2. **Model Import Issues**:
   - Check model format compatibility
   - Verify material and texture paths
   - Ensure proper scale (Unity uses meters)

3. **Performance Issues**:
   - Reduce visual quality settings
   - Simplify models or use LOD
   - Check hardware requirements

### Performance Monitoring

Monitor Unity performance using:

- Window → Analysis → Profiler
- Check CPU, GPU, and memory usage
- Identify bottlenecks in rendering or script execution

## Best Practices

### For Educational Use

- Keep visual complexity appropriate for hardware
- Provide clear feedback for user interactions
- Use consistent coordinate systems
- Document setup procedures clearly

### For Integration with ROS 2

- Use standard ROS 2 message types
- Implement proper error handling for connection failures
- Consider network latency in interactive applications
- Follow ROS 2 naming conventions

## References and Citations

[1] Unity Technologies. (2023). *Unity Robotics Hub Documentation*. Retrieved from https://docs.unity3d.com/Packages/com.unity.robotics.ros-tcp-connector

[2] Open Source Robotics Foundation. (2023). *ROS Bridge Suite Documentation*. Retrieved from https://docs.ros.org/en/humble/p/rosbridge_suite.html

[3] Unity Technologies. (2022). *Unity 2022.3 LTS Release Notes*. Retrieved from https://unity.com/releases/editor/whats-new/2022.3.0

[4] Quigley, M., et al. (2009). *ROS: an open-source Robot Operating System*. In *ICRA Workshop on Open Source Software*.

## Summary

Unity visualization provides high-fidelity rendering capabilities that enhance the understanding of robot behavior. When properly integrated with ROS 2 and synchronized with Gazebo physics simulation, Unity enables effective human-robot interaction through teleoperation and command interfaces. The next section will cover practical exercises to reinforce these concepts.