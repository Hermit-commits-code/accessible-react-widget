# Project Roadmap

This roadmap tracks major phases and mini-roadmaps for complex steps. Update as features and documentation evolve.

## Phase 1: Core Widget

- Scanning Logic

  - [x] Scan for images missing alt text
  - [x] Scan for buttons missing accessible labels
  - [x] Scan for links missing descriptive text
  - [x] Scan for form fields missing labels

- Rule-based Fix Engine

  - [x] Auto-add alt text to images (with placeholder)
  - [x] Auto-add aria-label to buttons/links
    - [x] Detect buttons/links missing accessible labels
    - [x] Auto-add generic aria-label (e.g., "Accessible button"/"Accessible link")
    - [x] Add/expand tests for coverage
    - [ ] Document in changelog and README
  - [x] Auto-associate labels with form fields
    - [x] Identify all cases (not just fields with id)
    - [x] Implement robust label association logic
    - [x] Add/expand tests
    - [ ] Document in changelog and README
  - [x] Test fixes in widget UI (robust automated tests)
  - [ ] Document fixes in README.md
    - [ ] Review all new features
    - [ ] Update usage, configuration, and auto-fix documentation
    - [ ] Add examples and best practices
  - [x] Update CHANGELOG.md and bump version

- Mutation Observer Setup
  - [ ] Monitor DOM for dynamic content changes
    - [ ] Design observer logic
    - [ ] Integrate with scan/auto-fix utilities
    - [ ] Add/expand tests for dynamic content
    - [ ] Document in changelog and README
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

#### Core Widget: Scanning Logic (completed)

- Scan for images missing alt text
- Scan for buttons missing accessible labels
- Scan for links missing descriptive text
- Scan for form fields missing labels

#### Core Widget: Rule-based Fix Engine

- Auto-add alt text to images (with placeholder)
- Auto-add aria-label to buttons/links
- Auto-associate labels with form fields
- Test fixes in widget UI
- Document fixes in README.md
- Update CHANGELOG.md and bump version

#### Core Widget: Mutation Observer Setup

- Monitor DOM for dynamic content changes
- Re-scan and auto-fix on mutations
