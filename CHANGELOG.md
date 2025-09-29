# Changelog

## [1.0.0] - 2025-09-29

- First stable release: all major accessibility features, auto-fix logic, and edge case coverage implemented and tested. Ready for production use.
- Robust form field label detection and auto-fix (input, select, textarea, ARIA, nested labels, edge cases)
- Auto-fixes images missing alt text by adding placeholder alt
- Auto-adds aria-label to buttons and links missing accessible labels
- ARIA role and attribute scanning and auto-fix
- Customizable rules via `rules` prop
- Real-time monitoring and auto-fix for dynamic DOM changes
- Accessibility analytics and reporting
- Comprehensive, professional test suite

# Changelog

## [0.9.0] - 2025-09-28

- Major expansion: best-in-class accessibility features
- Color contrast checks for text and UI elements
- Keyboard navigation validation and auto-fix (tab order, focus management, skip links)
- ARIA live region support for dynamic content
- Custom widget scanning and auto-fix (modals, dropdowns, tooltips, grids)
- Screen reader output simulation for key elements
- Configurable rules and auto-fix options
- Accessibility analytics and reporting (summary, export, tracking)

## [0.8.0] - 2025-09-28

- Robust auto-association of labels with form fields (covers all cases, not just fields with id)
- Auto-adds aria-label to buttons and links missing accessible labels
- Tracker for scanned elements and issues in console
- Documentation updated for new auto-fix features

## [0.7.0] - 2025-09-28

- Added ARIA role and attribute scanning and auto-fix logic (role='button', role='textbox', aria-checked, aria-expanded, etc.)
- Widget now supports customizable rules via `rules` prop for fine-grained accessibility enforcement
- Comprehensive test suite expanded for edge cases, ARIA, and dynamic DOMs
- Added performance/scalability tests for large DOMs and form fields
- Ready for production use; all features robustly tested

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
