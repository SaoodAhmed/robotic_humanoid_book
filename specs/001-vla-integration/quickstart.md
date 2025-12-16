# Quickstart Guide: Module 4 - Vision-Language-Action (VLA)

## Overview
This guide will help you set up and run the Vision-Language-Action (VLA) system for Module 4. The system enables voice commands to control a simulated humanoid robot through speech recognition, LLM-based planning, and ROS 2 action execution.

## Prerequisites
- Ubuntu 22.04 LTS
- RTX-capable workstation (for Isaac Sim)
- ROS 2 Humble Hawksbill installed
- Python 3.10+
- OpenAI API key (for LLM integration)
- Isaac Sim and Isaac ROS packages installed (from Module 3)

## Setup Instructions

### 1. Clone and Setup Repository
```bash
git clone [repository-url]
cd humanoid_robotic_book
```

### 2. Install Python Dependencies
```bash
pip install SpeechRecognition openai pyaudio rospy ros2
```

### 3. Configure Environment Variables
Create a `.env` file in the project root:
```env
OPENAI_API_KEY=your_openai_api_key_here
VOICE_ACTIVATION_KEYWORD="hey robot"
STT_ENGINE=google  # or vosk for offline
```

### 4. Launch the Simulation Environment
```bash
# Start Isaac Sim environment (from Module 3 setup)
ros2 launch isaac_sim_module3.launch.py

# In a new terminal, start the VLA system
ros2 run vla_module4 vla_node.py
```

## Basic Usage

### Voice Command Processing
1. Say the activation phrase (default: "hey robot")
2. Issue your command (e.g., "Go to the kitchen")
3. Observe the speech-to-text conversion in the terminal
4. The system will generate and execute an action plan

### Manual Testing
You can also test without voice by publishing directly to the command topic:
```bash
ros2 topic pub /vla/command std_msgs/String "data: 'Find the red ball and bring it to me'"
```

## Lab Exercises

### Lab 1: Voice-to-Text Pipeline
1. Navigate to `frontend/docs/module-4/lab-1-voice-text-pipeline.mdx`
2. Follow instructions to test speech recognition accuracy
3. Experiment with different STT engines (online vs offline)

### Lab 2: Language-to-ROS Planning
1. Navigate to `frontend/docs/module-4/lab-2-language-ros-planning.mdx`
2. Test LLM-generated action sequences
3. Validate that natural language commands translate correctly to ROS 2 actions

### Lab 3: End-to-End VLA Capstone
1. Navigate to `frontend/docs/module-4/lab-3-vla-capstone.mdx`
2. Execute complete voice command → plan → action scenarios
3. Test error recovery and state management

## Key Components

### VLA Node
- Handles voice input and speech-to-text conversion
- Interfaces with LLM for action planning
- Coordinates ROS 2 action execution
- Manages state machine transitions

### Action Planner
- Converts natural language to ROS 2 action sequences
- Validates actions against robot capabilities
- Generates error recovery strategies

### State Manager
- Tracks current autonomy state
- Handles transitions between states
- Manages error conditions and recovery

## Troubleshooting

### Voice Not Detected
- Check microphone permissions
- Verify audio input levels
- Confirm activation keyword sensitivity

### LLM Not Responding
- Check API key validity
- Verify network connectivity
- Confirm rate limit status

### Actions Failing in Simulation
- Validate robot configuration
- Check navigation space accessibility
- Verify manipulation capabilities

## Next Steps
After completing this quickstart, proceed to the detailed module content in `frontend/docs/module-4/` to learn about:
- Advanced VLA system architecture
- Customizing LLM prompts for specific tasks
- Extending the state machine for additional capabilities
- Error handling and recovery strategies