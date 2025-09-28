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

- DOM auto-fixing for accessibility issues
- Scans for buttons missing accessible labels (text, aria-label, aria-labelledby)
- Mutation observer for dynamic content
- Extension/bookmarklet for rapid testing
- Sandbox sites for validation
- Logging and undo/redo for fixes
- CLI for source code suggestions/PR creation
- Automated tests with Jest and React Testing Library

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

## Contributing

- Use conventional commits.
- Update documentation and changelog before every commit.
- Semantic versioning in package.json.
