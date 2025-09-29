- Scans for form fields missing labels (input, select, textarea)
  +- Scans for form fields missing labels (input, select, textarea)
- Auto-fixes images missing alt text by adding placeholder alt
- Scans for links missing descriptive text (empty, whitespace, or lacking aria-label/aria-labelledby)
  +- Scans for links missing descriptive text (empty, whitespace, or lacking aria-label/aria-labelledby)
- Scans for form fields missing labels (input, select, textarea)

# Accessible React Widget

## Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Getting Started](#getting-started)
- [Roadmap](#roadmap)
- [Changelog](#changelog)
- [Contributing](#contributing)

## Overview

An embeddable, rule-based accessibility widget for React/SPAs that automatically detects and fixes accessibility issues in real time—both in the DOM and, where possible, in source code. No AI, all fixes are deterministic and rule-driven.

## Features

- **Best-in-class form field label detection and auto-fix** (input, select, textarea, ARIA, nested labels, edge cases)
- **Auto-fixes images missing alt text** by adding placeholder alt
- **Auto-adds aria-label to buttons and links** missing accessible labels
- **Robust ARIA role and attribute scanning and auto-fix**
- **Customizable rules** via `rules` prop for fine-grained accessibility enforcement
- **Real-time monitoring and auto-fix** for dynamic DOM changes (Mutation Observer)
- **Comprehensive, professional test suite** covering all auto-fix logic and edge cases
- **Accessibility analytics and reporting** (summary, export, tracking)
- **Validated for React 19, Vite, Babel, Jest, and Testing Library**

## Getting Started

1. Clone the repo and install dependencies:
   ```bash
   npm install
   npm run dev
   ```
2. Run automated tests:
   ```bash
   npm test
   ```
3. See the ROADMAP.md for development phases and tasks.
4. All changes are tracked in CHANGELOG.md.

## Roadmap

See [ROADMAP.md](./ROADMAP.md) for detailed project phases and mini-roadmaps.

## Changelog

See [CHANGELOG.md](./CHANGELOG.md) for all updates.

## Release Notes

### v1.0.0 (2025-09-29)

- First stable release: all major accessibility features, auto-fix logic, and edge case coverage implemented and tested. Ready for production use.

## Contributing

- Use conventional commits.
- Update documentation and changelog before every commit.
- Semantic versioning in package.json.
