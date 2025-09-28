# Changelog

## [0.6.0] - 2025-09-28

- Refactored and expanded automated test suite for AccessibilityWidget
- Added edge case coverage for images, buttons, links, and form fields
- Ensured all auto-fix logic is professionally and robustly tested
- Validated and documented Babel and Jest config for React 19, Vite, and Testing Library

All notable changes to this project will be documented in this file.

## [0.5.0] - 2025-09-28

- Auto-fixes images missing alt text by adding placeholder alt
- Added automated tests for image alt auto-fix

## [0.4.0] - 2025-09-28

- Added scanning for form fields missing labels (input, select, textarea)
- Added automated tests for form field label detection

## [0.3.0] - 2025-09-28

- Added scanning for links missing descriptive text (empty, whitespace, or lacking aria-label/aria-labelledby)
- Added automated tests for link descriptive text detection

## [0.2.0] - 2025-09-28

- Added scanning for buttons missing accessible labels (text, aria-label, aria-labelledby)
- Added automated tests for button label detection

## [0.1.1] - 2025-09-28

- Added automated test setup with Jest and React Testing Library
- Fixed ESLint config to recognize Jest globals for test files

## [0.1.0] - 2025-09-28

- Initial project scaffolding with Vite and React (JavaScript/JSX)
- Added README.md, ROADMAP.md, and CHANGELOG.md
- Added initial accessibility widget component and integrated into app
