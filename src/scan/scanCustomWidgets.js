// Custom widget accessibility scan logic
// Scans for modals, dropdowns, tooltips, grids and validates ARIA, focus, and keyboard support
export function scanCustomWidgets(root = document) {
  const issues = [];
  // Modals
  Array.from(
    (root || document).querySelectorAll('[role="dialog"], .modal')
  ).forEach((modal) => {
    if (!modal.hasAttribute("aria-modal")) {
      issues.push({
        type: "custom-widget",
        element: modal,
        message: "Modal missing aria-modal attribute",
      });
      modal.setAttribute("aria-modal", "true");
    }
    if (!modal.hasAttribute("tabindex")) {
      issues.push({
        type: "custom-widget",
        element: modal,
        message: "Modal should be focusable (missing tabindex)",
      });
      modal.tabIndex = -1;
    }
  });
  // Dropdowns
  Array.from(
    (root || document).querySelectorAll('[role="listbox"], .dropdown')
  ).forEach((dropdown) => {
    if (!dropdown.hasAttribute("aria-expanded")) {
      issues.push({
        type: "custom-widget",
        element: dropdown,
        message: "Dropdown missing aria-expanded attribute",
      });
      dropdown.setAttribute("aria-expanded", "false");
    }
  });
  // Tooltips
  Array.from(
    (root || document).querySelectorAll('[role="tooltip"], .tooltip')
  ).forEach((tooltip) => {
    if (!tooltip.hasAttribute("aria-hidden")) {
      issues.push({
        type: "custom-widget",
        element: tooltip,
        message: "Tooltip missing aria-hidden attribute",
      });
      tooltip.setAttribute("aria-hidden", "true");
    }
  });
  // Grids
  Array.from(
    (root || document).querySelectorAll('[role="grid"], .grid')
  ).forEach((grid) => {
    if (!grid.hasAttribute("aria-readonly")) {
      issues.push({
        type: "custom-widget",
        element: grid,
        message: "Grid missing aria-readonly attribute",
      });
      grid.setAttribute("aria-readonly", "false");
    }
  });
  return issues;
}
