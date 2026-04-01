---
name: component-architect
description: Ensures modular, reusable, and consistent code architecture for all components and features.
triggers:
  - components
  - features
  - new features
  - code generation
---

# Component Architect Skill

This skill ensures that all generated code is architecturally sound, modular, and easy to maintain.

## Architecture Core Rules
### 1. Modular Design
- **Single Responsibility**: Each component should do one thing and do it well.
- **Reusable**: Design components to be independent and reusable across the project.
- **Composition**: Prefer composition over inheritance.

### 2. Consistency
- **Naming**: Use clear and consistent naming conventions (e.g., PascalCase for components, camelCase for variables).
- **Structure**: Group related logic and styles within the same component directory.
- **Framework Patterns**: Follow established patterns for the specific framework in use (e.g., Hooks in React).

### 3. Separation of Concerns
- Keep logic, styles, and markup separated but accessible.
- Use props and events for communication between components.
- Minimize global state; prefer local state or context where appropriate.

## Review Checklist
- Is the component modular and reusable?
- Are naming conventions consistent and clear?
- Is the component's responsibility well-defined?
- Is the code structured correctly according to the framework's best practices?
- Is there zero redundancy in the component's logic or styles?
