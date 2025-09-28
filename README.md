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

- Robust, professional test suite covering all auto-fix logic and edge cases
- Validated Babel and Jest config for React 19, Vite, and Testing Library

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
