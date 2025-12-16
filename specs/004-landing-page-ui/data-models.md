# Data Models: Beautiful Landing Page UI for Physical AI & Humanoid Robotics Textbook

## Key Entities

### Course Information
- **Fields**:
  - `id`: String (unique identifier for the course)
  - `title`: String (main course title: "Physical AI & Humanoid Robotics")
  - `subtitle`: String (descriptive subtitle: "Mastering Vision-Language-Action Systems")
  - `description`: String (brief overview of the course content)
  - `target_audience`: String[] (who the course is designed for: ["prospective students", "instructors", "institutions"])
  - `prerequisites`: String[] (required background knowledge)
  - `duration_estimate`: String (estimated time to complete course)
  - `learning_approach`: String (pedagogical approach used)
  - `technical_requirements`: TechnicalRequirement[] (system requirements for implementation)
- **Validation**: Title and description must not be empty, target_audience must have at least one entry
- **State transitions**: N/A (informational entity)

### Module Information
- **Fields**:
  - `id`: String (unique identifier for the module, e.g. "module-1", "module-2")
  - `title`: String (module title)
  - `description`: String (brief description of module content)
  - `learning_objectives`: String[] (list of key learning objectives)
  - `prerequisites`: String[] (knowledge required before starting)
  - `duration`: String (estimated time to complete module)
  - `complexity`: Enum (beginner, intermediate, advanced)
  - `order`: Integer (sequence order in the course)
  - `icon_path`: String (path to module-specific icon or illustration)
- **Validation**: All fields required, order must be unique among modules, complexity must be valid enum value
- **State transitions**: N/A (informational entity)

### Learning Outcome
- **Fields**:
  - `id`: String (unique identifier for the outcome)
  - `description`: String (what students will be able to do after completion)
  - `measurable`: Boolean (can the outcome be measured/tested)
  - `module_reference`: String (which module this outcome belongs to)
  - `category`: Enum (technical_skill, theoretical_knowledge, practical_application)
  - `assessment_method`: String (how this outcome is evaluated)
- **Validation**: Description must be specific and actionable, module_reference must exist in course modules
- **State transitions**: N/A (informational entity)

### Capstone Project
- **Fields**:
  - `title`: String (project title)
  - `description`: String (overview of the project)
  - `requirements`: String[] (what students need to complete project)
  - `deliverables`: String[] (what students produce)
  - `evaluation_criteria`: String[] (how project is assessed)
  - `integration_points`: String[] (modules integrated in project)
  - `complexity`: Enum (intermediate, advanced)
  - `estimated_duration`: String (time to complete project)
- **Validation**: Must integrate at least 3 course modules, description must be substantive
- **State transitions**: N/A (informational entity)

### Technical Requirement
- **Fields**:
  - `category`: Enum (hardware, software, network, environment)
  - `requirement`: String (specific requirement)
  - `minimum_spec`: String (minimum acceptable specification)
  - `recommended_spec`: String (recommended specification)
  - `justification`: String (why this requirement is needed)
  - `installation_notes`: String (instructions for setting up this requirement)
- **Validation**: Requirement and justification must be provided, category must be valid enum value
- **State transitions**: N/A (informational entity)

### Call-to-Action Button
- **Fields**:
  - `id`: String (unique identifier)
  - `text`: String (display text on the button)
  - `link`: String (destination URL or page reference)
  - `style`: Enum (primary, secondary, tertiary) for visual hierarchy
  - `tracking_id`: String (identifier for analytics tracking)
- **Validation**: Text and link must not be empty
- **State transitions**: N/A (informational entity)

## Relationships

```
Course Information (1) → (N) Module Information
Course Information (1) → (N) Learning Outcome
Course Information (1) → (1) Capstone Project
Course Information (1) → (N) Technical Requirement
Module Information (1) → (N) Learning Outcome
```

## Component Data Structures

### Hero Section Data
```typescript
interface HeroSectionProps {
  title: string;
  subtitle: string;
  description: string;
  primaryCTA: CallToAction;
  secondaryCTA?: CallToAction;
  backgroundImage?: string; // Path to background image asset
  animationEnabled: boolean; // Whether to include subtle entrance animations
}
```

### Module Card Data
```typescript
interface ModuleCardProps {
  id: string;
  title: string;
  description: string;
  learningObjectives: string[];
  duration: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  iconPath?: string; // Path to icon asset
  order: number; // Display order in the list
}
```

### Outcome Item Data
```typescript
interface OutcomeItemProps {
  id: string;
  description: string;
  category: 'technical_skill' | 'theoretical_knowledge' | 'practical_application';
  iconPath?: string; // Path to icon asset
  measurable: boolean; // Whether this outcome is directly measurable
}
```

### Requirement Item Data
```typescript
interface RequirementItemProps {
  category: 'hardware' | 'software' | 'network' | 'environment';
  requirement: string;
  minimumSpec: string;
  recommendedSpec: string;
  justification: string;
  satisfied?: boolean; // For requirement checker UI
  installationNotes?: string;
}
```

### Landing Page Content Structure
```typescript
interface LandingPageContent {
  courseInfo: CourseInformation;
  modules: ModuleInformation[];
  outcomes: LearningOutcome[];
  capstone: CapstoneProject;
  technicalRequirements: TechnicalRequirement[];
  ctas: CallToAction[];
  testimonials?: string[]; // Optional testimonial quotes (if included)
  faqs?: FAQItem[]; // Optional frequently asked questions
}
```

### FAQ Item Data
```typescript
interface FAQItem {
  question: string;
  answer: string;
  category: 'technical' | 'educational' | 'administrative';
}
```

## API Contract (if needed)

### Course Data Endpoint
```
GET /api/course-info
Response:
{
  "course": {
    "id": "physical-ai-humanoid-robotics",
    "title": "Physical AI & Humanoid Robotics",
    "subtitle": "Mastering Vision-Language-Action Systems",
    "description": "A comprehensive textbook covering the integration of physical AI with humanoid robotics, including perception, language processing, and action execution.",
    "targetAudience": ["prospective students", "instructors", "institutions"],
    "prerequisites": ["Basic programming knowledge", "Understanding of robotics concepts", "Familiarity with ROS 2"],
    "durationEstimate": "12-15 weeks",
    "learningApproach": "Hands-on laboratory approach with simulation-based learning",
    "technicalRequirements": [
      {
        "category": "hardware",
        "requirement": "RTX-capable workstation",
        "minimumSpec": "RTX 3070",
        "recommendedSpec": "RTX 4080",
        "justification": "Required for Isaac Sim simulation",
        "installationNotes": "CUDA 11.8+ required"
      }
    ]
  },
  "modules": [
    {
      "id": "module-1",
      "title": "The Robotic Nervous System (ROS 2)",
      "description": "Foundation of robotic operating systems and communication frameworks",
      "learningObjectives": [
        "Implement basic ROS 2 nodes",
        "Design message-passing architectures",
        "Integrate sensors and actuators"
      ],
      "prerequisites": ["Programming fundamentals", "Basic robotics concepts"],
      "duration": "3-4 weeks",
      "complexity": "intermediate",
      "order": 1,
      "iconPath": "/img/module-icons/ros2-icon.svg"
    }
  ],
  "outcomes": [
    {
      "id": "outcome-1",
      "description": "Students can implement distributed robotic systems using ROS 2 communication patterns",
      "measurable": true,
      "moduleReference": "module-1",
      "category": "technical_skill",
      "assessmentMethod": "Laboratory exercises and code review"
    }
  ],
  "capstone": {
    "title": "Integrated Humanoid Robot Control",
    "description": "A comprehensive project integrating all modules to control a humanoid robot in simulation",
    "requirements": ["Complete all four modules", "Pass all laboratory exercises"],
    "deliverables": ["Complete control system", "Technical documentation", "Video demonstration"],
    "evaluationCriteria": [
      "Successful task completion",
      "Code quality and documentation",
      "System robustness and error handling"
    ],
    "integrationPoints": ["module-1", "module-2", "module-3", "module-4"],
    "complexity": "advanced",
    "estimatedDuration": "3-4 weeks"
  },
  "callToActions": [
    {
      "id": "start-learning",
      "text": "Start Learning",
      "link": "/robotic_humanoid_book/docs/intro",
      "style": "primary",
      "trackingId": "cta_start_learning"
    },
    {
      "id": "view-modules",
      "text": "View Modules",
      "link": "/robotic_humanoid_book/docs/module-1",
      "style": "secondary",
      "trackingId": "cta_view_modules"
    }
  ]
}
```

## Visual Design Specifications

### Color Palette
```typescript
interface ColorPalette {
  primary: {
    main: string;      // e.g., "#1976d2" (technical blue)
    light: string;     // e.g., "#63a4ff"
    dark: string;      // e.g., "#004ba0"
  };
  secondary: {
    main: string;      // e.g., "#7b1fa2" (robotic purple)
    light: string;     // e.g., "#ba68c8"
    dark: string;      // e.g., "#4a0072"
  };
  background: {
    main: string;      // e.g., "#ffffff" or "#f5f5f5"
    paper: string;     // e.g., "#ffffff" for cards
    elevation: string; // e.g., "#fafafa" for elevated surfaces
  };
  text: {
    primary: string;   // e.g., "#212121" for main text
    secondary: string; // e.g., "#757575" for secondary text
    disabled: string;  // e.g., "#bdbdbd" for disabled text
  };
  success: string;     // e.g., "#4caf50" for success states
  warning: string;     // e.g., "#ff9800" for warnings
  error: string;       // e.g., "#f44336" for errors
  info: string;        // e.g., "#2196f3" for information
}
```

### Typography Scale
```typescript
interface TypographyScale {
  h1: {
    fontSize: string;    // e.g., "3rem"
    fontWeight: number;  // e.g., 500
    lineHeight: number;  // e.g., 1.167
  };
  h2: {
    fontSize: string;    // e.g., "2.125rem"
    fontWeight: number;  // e.g., 500
    lineHeight: number;  // e.g., 1.235
  };
  h3: {
    fontSize: string;    // e.g., "1.5rem"
    fontWeight: number;  // e.g., 500
    lineHeight: number;  // e.g., 1.375
  };
  body1: {
    fontSize: string;    // e.g., "1rem"
    fontWeight: number;  // e.g., 400
    lineHeight: number;  // e.g., 1.5
  };
  body2: {
    fontSize: string;    // e.g., "0.875rem"
    fontWeight: number;  // e.g., 400
    lineHeight: number;  // e.g., 1.43
  };
  caption: {
    fontSize: string;    // e.g., "0.75rem"
    fontWeight: number;  // e.g., 400
    lineHeight: number;  // e.g., 1.66
  };
}
```

### Spacing System
```typescript
interface SpacingSystem {
  unit: number;          // Base spacing unit in pixels (e.g., 8)
  xs: number;            // Extra small spacing (1 unit)
  sm: number;            // Small spacing (2 units)
  md: number;            // Medium spacing (4 units)
  lg: number;            // Large spacing (8 units)
  xl: number;            // Extra large spacing (16 units)
  xxl: number;           // Double extra large spacing (24 units)
}
```