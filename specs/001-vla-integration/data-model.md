# Data Model: Module 4 - Vision-Language-Action (VLA)

## Key Entities

### Voice Command
- **Fields**:
  - `id`: String (unique identifier)
  - `text`: String (transcribed speech content)
  - `timestamp`: DateTime (when command was received)
  - `confidence`: Float (speech recognition confidence score)
  - `metadata`: Dict (additional context like source, environment noise level)
- **Validation**: Text must not be empty, confidence > 0.5 for processing
- **State transitions**: Raw → Transcribed → Processed → Actioned

### Action Plan
- **Fields**:
  - `id`: String (unique identifier)
  - `voice_command_id`: String (reference to originating voice command)
  - `actions`: List[Dict] (sequence of ROS 2 actions)
  - `status`: Enum (pending, executing, completed, failed, cancelled)
  - `created_at`: DateTime
  - `completed_at`: DateTime (nullable)
  - `error_info`: Dict (details if failed)
- **Validation**: Must contain at least one valid ROS 2 action
- **State transitions**: Pending → Executing → [Completed | Failed | Cancelled]

### VLA Control Loop State
- **Fields**:
  - `current_state`: Enum (idle, listening, processing, planning, executing, error, recovery)
  - `active_plan_id`: String (nullable, current action plan being executed)
  - `last_error`: Dict (nullable, details of last error)
  - `recovery_attempts`: Integer (count of recovery attempts)
- **Validation**: State transitions must follow valid FSM transitions
- **State transitions**:
  - Idle ↔ Listening (on voice activation)
  - Listening → Processing (on voice command received)
  - Processing → Planning (after speech-to-text)
  - Planning → Executing (after LLM action plan generated)
  - Executing → [Idle | Error] (on completion or failure)
  - Error → Recovery (on recovery attempt)
  - Recovery → [Idle | Error] (on success or continued failure)

### Simulation Environment
- **Fields**:
  - `name`: String (environment name)
  - `description`: String (environment description)
  - `objects`: List[Dict] (objects in the environment)
  - `robot_config`: Dict (robot configuration in this environment)
  - `navigation_goals`: List[Dict] (valid navigation goals)
- **Validation**: Must contain valid URDF/SDF definitions
- **State transitions**: Not applicable (configuration entity)

## Relationships

```
Voice Command (1) → (0..1) Action Plan
Action Plan (1) → (1) VLA Control Loop State
Simulation Environment (1) → (N) Action Plans (executed in this environment)
```

## ROS 2 Message Types

### VLAAction.msg
```
# Input
string voice_command
float32 confidence

# Output
string[] action_sequence
string status
string error_message

# Feedback
string current_action
float32 progress_percentage
```

### VLAState.msg
```
string current_state  # idle, listening, processing, planning, executing, error, recovery
string active_plan_id
string last_error
int32 recovery_attempts
```

## State Machine: Autonomy State Machine

States:
1. **IDLE**: Awaiting voice command
2. **LISTENING**: Capturing audio input
3. **PROCESSING**: Converting speech to text
4. **PLANNING**: Generating action sequence from LLM
5. **EXECUTING**: Running action sequence in simulation
6. **ERROR**: Error occurred, awaiting recovery decision
7. **RECOVERY**: Attempting to recover from error

Transitions:
- IDLE → LISTENING: Voice activation detected
- LISTENING → PROCESSING: Audio capture complete
- PROCESSING → PLANNING: Speech-to-text successful
- PROCESSING → IDLE: Speech-to-text failed
- PLANNING → EXECUTING: Action plan generated successfully
- PLANNING → ERROR: Action plan generation failed
- EXECUTING → IDLE: Action sequence completed successfully
- EXECUTING → ERROR: Action in sequence failed
- ERROR → RECOVERY: Recovery attempt initiated
- ERROR → IDLE: Recovery cancelled
- RECOVERY → IDLE: Recovery successful
- RECOVERY → ERROR: Recovery failed