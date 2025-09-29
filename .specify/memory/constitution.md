<!-- Sync Impact Report (2025-09-26)
Version change: 2.1.1 → 2.1.2 (MINOR: Added Security & Performance Standards and Development Workflow sections)
Modified principles: None renamed
Added sections:
- IV. Security & Performance Standards
- V. Development Workflow
Removed sections: None
Templates requiring updates:
- .specify/templates/plan-template.md ✅ (updated to include security checks)
- .specify/templates/spec-template.md ✅ (added performance targets)
- .specify/templates/tasks-template.md ⚠ (pending alignment with new workflow)
- Commands: .specify/templates/commands/cm-constitution.md ✅ (updated references)
Follow-up TODOs: None
-->
# MCP Context Master Constitution
<!-- Example: Spec Constitution, TaskFlow Constitution, etc. -->

## Core Principles

### I. Library-First (NON-NEGOTIABLE)
Every feature starts as a standalone library. Libraries must be self-contained, independently testable, and fully documented. No organizational-only libraries allowed - clear purpose required.

### II. CLI Interface (MANDATORY)
All libraries must expose functionality via CLI. Input/output follows stdin/args → stdout protocol with errors routed to stderr. Support both JSON and human-readable formats.

### III. Test-First (NON-NEGOTIABLE)
Test-Driven Development is mandatory. Tests must be written and approved before implementation. Red-Green-Refactor cycle strictly enforced.

### IV. Integration Testing (REQUIRED)
Mandatory for: New library contracts, interface changes, inter-service communication, and shared schema updates. Must include both happy paths and edge cases.

### V. Observability & Versioning (CRITICAL)
1. Structured logging required for all services
2. Semantic versioning (MAJOR.MINOR.PATCH) enforced
3. YAGNI principle applied to feature development

## IV. Security & Performance Standards
OWASP Top 10 compliance is mandatory. Performance targets: p95 latency must stay under 200ms. Memory usage capped at 512MB per process.

## V. Development Workflow
1. Test-Driven Development enforced via pre-commit hooks
2. All changes require 2 approver code reviews
3. Deployment requires green integration tests and migration plan for breaking changes

## Governance
<!-- Example: Constitution supersedes all other practices; Amendments require documentation, approval, migration plan -->

All pull requests require a compliance checklist. Breaking changes must include a migration plan. Runtime guidance is documented in `.specify/guidance/development.md`.

**Version**: 2.1.2 | **Ratified**: 2025-06-13 | **Last Amended**: 2025-09-26
<!-- Constitution version history maintained in .specify/versions/ directory -->