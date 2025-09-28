# Project Roadmap

This roadmap tracks major phases and mini-roadmaps for complex steps. Update as features and documentation evolve.

## Phase 1: Core Widget

- [x] DOM scanning logic
  - [x] Scan for images missing alt text
  - [x] Scan for buttons missing accessible labels
  - [x] Scan for links missing descriptive text
  - [x] Scan for form fields missing labels
- [ ] Rule-based fix engine
  - [ ] Auto-add alt text to images (with placeholder)
  - [ ] Auto-add aria-label to buttons/links
  - [ ] Auto-associate labels with form fields
- [ ] Mutation observer setup
  - [ ] Monitor DOM for dynamic content changes
  - [ ] Re-scan and auto-fix on mutations

## Phase 2: Sandbox Sites

- [ ] Create sample React apps with accessibility issues
- [ ] Integrate widget for validation

## Phase 3: Extension/Bookmarklet

- [ ] Browser injection logic
- [ ] UI for controls/logs

## Phase 4: Source Code CLI

- [ ] AST parsing for React
- [ ] PR creation workflow

---

### Mini-Roadmaps

#### Core Widget: Scanning Logic & Auto-Fixing

- [x] Expand scanning logic to cover:
  - Images without alt text
  - Buttons without accessible labels
  - Links without descriptive text
  - Form fields without labels
- [ ] Implement auto-fix logic for each issue:
  - Add placeholder alt text to images
  - Add aria-label to buttons/links
  - Associate labels with form fields
- [ ] Test fixes in the widget UI
- [ ] Document all rules and fixes in README.md
- [ ] Update CHANGELOG.md and bump version after each feature
