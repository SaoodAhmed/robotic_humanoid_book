# VLA System API Contracts

## Voice Command Service

### Request: Process Voice Command
- **Endpoint**: `/vla/process_command` (ROS 2 service)
- **Input**:
  ```
  string voice_text
  float32 confidence_score
  ```
- **Output**:
  ```
  string action_plan_id
  string[] action_sequence
  string status
  string error_message
  ```

### Topic: Voice Command Input
- **Topic**: `/vla/voice_command` (ROS 2 topic)
- **Type**: `std_msgs/String`
- **Description**: Raw voice command text from speech recognition

### Topic: Action Plan Execution
- **Topic**: `/vla/action_plan` (ROS 2 topic)
- **Type**: `actionlib_msgs/GoalID`
- **Description**: Action plan to execute in the simulation

## LLM Integration Service

### Request: Generate Action Plan
- **Endpoint**: `/vla/generate_plan` (ROS 2 service)
- **Input**:
  ```
  string natural_language_command
  string robot_capabilities
  string environment_context
  ```
- **Output**:
  ```
  string[] action_sequence
  string plan_id
  string status
  string error_message
  ```

## State Management Service

### Request: Get Current State
- **Endpoint**: `/vla/get_state` (ROS 2 service)
- **Input**: (empty)
- **Output**:
  ```
  string current_state
  string active_plan_id
  string last_error
  int32 recovery_attempts
  ```

### Topic: State Updates
- **Topic**: `/vla/state` (ROS 2 topic)
- **Type**: Custom message (`VLAState.msg`)
- **Description**: Current state of the VLA system

## Action Definitions

### Navigation Action
- **Type**: `nav2_msgs/NavigateToPose`
- **Parameters**:
  - `pose`: Target pose for navigation
  - `behavior_tree`: Behavior tree to use (optional)

### Manipulation Action
- **Type**: Custom manipulation action
- **Parameters**:
  - `object_name`: Name of object to manipulate
  - `action_type`: grasp, release, move
  - `target_pose`: Target pose for manipulation

### Perception Action
- **Type**: Custom perception action
- **Parameters**:
  - `object_type`: Type of object to detect
  - `search_area`: Area to search in
  - `detection_threshold`: Confidence threshold for detection