# Data Model: Physical AI & Humanoid Robotics Textbook (Module 1)

## Textbook Module
- **Fields**:
  - moduleId: string (unique identifier for the module)
  - title: string (display title of the module)
  - description: string (brief description of the module content)
  - wordCount: number (target word count for the module)
  - learningObjectives: array of strings (specific learning outcomes)
  - prerequisites: array of strings (required knowledge before starting)
  - estimatedTime: string (time needed to complete the module)
  - exercises: array of Exercise objects (practical exercises included)
  - codeExamples: array of CodeExample objects (code samples provided)
  - diagrams: array of Diagram objects (visual aids included)
- **Validation rules**:
  - moduleId must be unique across all modules
  - wordCount must be between 3000-4000 for Module 1
  - learningObjectives must align with success criteria in spec
- **Relationships**:
  - Contains many Exercises, CodeExamples, Diagrams
  - Part of a larger Textbook structure

## Exercise
- **Fields**:
  - exerciseId: string (unique identifier for the exercise)
  - title: string (display title of the exercise)
  - description: string (detailed description of the exercise)
  - complexityLevel: string (basic, intermediate, or advanced)
  - steps: array of strings (step-by-step instructions)
  - expectedOutcome: string (what students should achieve)
  - requiredTools: array of strings (tools/software needed)
  - estimatedDuration: string (time to complete the exercise)
- **Validation rules**:
  - complexityLevel must be one of the defined values
  - steps must be in sequential order
- **Relationships**:
  - Belongs to a Textbook Module
  - May reference multiple CodeExamples

## CodeExample
- **Fields**:
  - exampleId: string (unique identifier for the code example)
  - title: string (display title of the code example)
  - language: string (programming language used)
  - code: string (the actual code content)
  - explanation: string (detailed explanation of the code)
  - purpose: string (what the code demonstrates/practices)
  - dependencies: array of strings (required packages/libraries)
  - output: string (expected output of the code)
- **Validation rules**:
  - language must be compatible with target environment (Python 3.8)
  - code must be syntactically correct
  - dependencies must be specified for reproducibility
- **Relationships**:
  - Belongs to a Textbook Module
  - May be referenced by multiple Exercises

## Diagram
- **Fields**:
  - diagramId: string (unique identifier for the diagram)
  - title: string (display title of the diagram)
  - description: string (what the diagram illustrates)
  - type: string (architecture, flowchart, structure, etc.)
  - imageUrl: string (path to the diagram image)
  - altText: string (accessibility text for the diagram)
  - caption: string (explanatory text for the diagram)
- **Validation rules**:
  - imageUrl must point to an existing file
  - altText must be provided for accessibility
- **Relationships**:
  - Belongs to a Textbook Module
  - May be referenced by multiple sections

## Student
- **Fields**:
  - background: string (technical background level)
  - programmingExperience: string (level of programming knowledge)
  - roboticsExperience: string (level of robotics knowledge)
  - learningGoals: array of strings (what they want to achieve)
- **Validation rules**:
  - background level must match target audience (undergraduate/graduate)
- **Relationships**:
  - Interacts with Textbook Modules
  - Completes Exercises
  - Runs CodeExamples

## ROS2Component
- **Fields**:
  - componentId: string (unique identifier for the ROS 2 component)
  - name: string (name of the component: node, topic, service, action)
  - description: string (what the component does)
  - purpose: string (why this component is important)
  - usageExample: string (how to use this component)
  - relatedComponents: array of strings (other components it interacts with)
- **Validation rules**:
  - componentId must be a valid ROS 2 concept
- **Relationships**:
  - Referenced in CodeExamples
  - Explained in Textbook Modules

## URDFModel
- **Fields**:
  - modelId: string (unique identifier for the URDF model)
  - name: string (name of the robot model)
  - description: string (what the model represents)
  - structure: string (description of the robot's physical structure)
  - joints: array of strings (types of joints in the model)
  - links: array of strings (types of links in the model)
  - visualization: string (how the model appears in simulation)
- **Validation rules**:
  - Must follow valid URDF XML structure
  - Must be compatible with Gazebo simulation
- **Relationships**:
  - Referenced in CodeExamples
  - Detailed in Textbook Modules
  - Used in Exercises