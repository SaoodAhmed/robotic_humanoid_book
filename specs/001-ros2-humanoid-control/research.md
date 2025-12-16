# Research: Physical AI & Humanoid Robotics Textbook (Docusaurus)

## Decision: Content Structure - Module-based vs Week-based
**Rationale**: Module-based structure chosen to provide logical topic separation and allow flexible pacing based on student needs. This approach aligns with educational best practices where content is organized by concepts rather than time constraints.
**Alternatives considered**: Week-based structure was considered but rejected because it creates artificial pacing constraints that may not suit all educational contexts.

## Decision: Code Style - Inline MDX vs External Directory
**Rationale**: Inline MDX blocks chosen for simplicity and better integration with Docusaurus documentation flow. This approach keeps code examples close to explanatory text, making it easier for students to follow along.
**Alternatives considered**: External code directory was considered but rejected because it would require students to navigate between multiple locations, potentially disrupting the learning flow.

## Decision: URDF Coverage Depth - Introductory vs Full Description
**Rationale**: Introductory examples chosen to match the educational level of the target audience (undergraduate and graduate students with basic Python knowledge). This provides a solid foundation without overwhelming beginners.
**Alternatives considered**: Full humanoid description was considered but rejected because it would be too complex for Module 1, which serves as an introduction to ROS 2 concepts.

## Technology Research: Docusaurus v3 Implementation
**Findings**: Docusaurus v3 supports TypeScript out of the box and provides excellent MDX capabilities. The classic template provides a good starting point for documentation sites with built-in search, navigation, and theming options.
**Best practices**: Use of TypeScript for type safety, proper MDX syntax for code integration, and sidebar configuration for logical content navigation.

## Technology Research: ROS 2 Humble Hawksbill Integration
**Findings**: ROS 2 Humble Hawksbill is the current LTS version with 5-year support, making it ideal for educational content. It has strong Python 3.8 compatibility and extensive documentation.
**Best practices**: Use rclpy for Python-based ROS 2 nodes, follow official ROS 2 tutorials for example structure, ensure all examples are tested in simulation.

## Technology Research: Gazebo Simulation Environment
**Findings**: Gazebo Classic or Garden provides the standard simulation environment for ROS 2. Both have good educational support and extensive documentation.
**Best practices**: Use simple models for educational purposes, ensure all simulation examples are reproducible, provide clear setup instructions for students.

## Technology Research: Educational Content Standards
**Findings**: Flesch-Kincaid grade 10-14 readability standard is appropriate for undergraduate and graduate students. This requires clear, concise language with technical concepts explained in accessible ways.
**Best practices**: Use diagrams to illustrate concepts, provide step-by-step examples, include practical exercises with progressive complexity.

## Architecture Research: Frontend Structure
**Findings**: Creating a `frontend` directory with Docusaurus follows modern web development practices and keeps the textbook separate from any backend systems that might be developed later.
**Best practices**: Use Docusaurus recommended project structure, organize content by modules, implement clear navigation hierarchy.

## Testing Strategy Research
**Findings**: Comprehensive testing should include both technical validation (build processes, link checking) and educational validation (example reproducibility, clarity assessment).
**Best practices**: Implement automated build testing, manual example validation, peer review for educational content quality, student feedback collection mechanisms.