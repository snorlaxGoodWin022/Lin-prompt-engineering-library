# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This repository contains a prompt engineering library for frontend development. The main file is `模块4.1：Prompt工程 - 场景化Prompt库建设.md` (Chinese title meaning "Module 4.1: Prompt Engineering - Scenario-based Prompt Library Construction").

The library provides structured prompt templates for common frontend development scenarios, enabling consistent and high-quality AI-generated code.

## Repository Structure

- `模块4.1：Prompt工程 - 场景化Prompt库建设.md` - The complete prompt library document containing:
  - React and Vue component generation templates
  - Component documentation templates
  - Performance optimization prompts (Lighthouse analysis, bundle analysis, image optimization)
  - Team collaboration prompts (Git commit messages, PR descriptions, technical documentation)
  - Prompt optimization techniques and best practices
  - Prompt library management guidelines

## Working with the Prompt Library

### Key Concepts

1. **Scenario-based prompts**: Each template addresses a specific development scenario with appropriate context and constraints.
2. **Structured format**: Prompts follow consistent sections (技术栈/Technology Stack, 代码规范/Code Standards, 组件需求/Component Requirements, etc.).
3. **Chinese language**: The prompts are written in Chinese, targeting Chinese-speaking developers.

### Common Tasks

1. **Using existing templates**: Copy the relevant template section and fill in the bracketed parameters `{...}`.
2. **Extending templates**: Add new scenario templates following the existing structure and categorization.
3. **Localizing templates**: Translate templates to other languages while preserving the structured format.
4. **Testing prompts**: Apply templates with Claude or other AI assistants to verify generated code quality.

### Template Categories

The library is organized into three main categories:

1. **Component Development Standardization** - Templates for generating React/Vue components with specific tech stacks and coding standards.
2. **Performance Optimization Automation** - Templates for analyzing and optimizing web performance.
3. **Team Collaboration Standards** - Templates for generating Git commits, PR descriptions, and technical documentation.

## Development Notes

- This is a documentation-only repository; there are no build scripts, tests, or executable code.
- The primary file uses Chinese characters; Claude should preserve the original language when making edits.
- When creating new prompt templates, maintain the existing structure with clear section headers and placeholder notation.
- Consider adding English translations if the repository expands to international audiences.

## Best Practices for Prompt Engineering

Based on the library's guidance:
- Provide clear technical stack requirements
- Specify code structure and naming conventions
- Include positive and negative examples when possible
- Break complex tasks into sequential steps
- Define explicit output formats

## Future Development Considerations

If this repository evolves from a single document to a structured prompt library:
- Consider splitting templates into separate `.md` files by category (e.g., `prompts/component/`, `prompts/performance/`)
- Add a JSON or YAML index for easier programmatic access
- Include validation scripts to ensure template consistency
- Add examples of generated outputs for each template