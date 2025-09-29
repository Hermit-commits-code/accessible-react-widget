// Keyboard navigation accessibility scan logic
// Scans for tab order, focusable elements, skip links, and common issues
export function scanKeyboardNavigation(root = document) {
  const issues = [];
  // Find all focusable elements
  const focusableSelectors = [
    "a[href]",
    "button",
    'input:not([type="hidden"]):not([disabled])',
    "select:not([disabled])",
    "textarea:not([disabled])",
    "[tabindex]",
  ];
  const focusable = Array.from(
    (root || document).querySelectorAll(focusableSelectors.join(","))
  ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

  // Check for missing skip links (should be first focusable element)
  const firstFocusable = focusable[0];
  if (
    firstFocusable &&
    firstFocusable.tagName !== "A" &&
    !firstFocusable.hasAttribute("data-skip-link")
  ) {
    issues.push({
      type: "keyboard",
      element: firstFocusable,
      message:
        "Missing skip link for keyboard navigation (should be first focusable element)",
    });
  }

  // Check tab order (tabindex > 0 is discouraged)
  focusable.forEach((el) => {
    if (el.hasAttribute("tabindex") && el.tabIndex > 0) {
      issues.push({
        type: "keyboard",
        element: el,
        message: "Tabindex > 0 can break natural tab order",
      });
    }
  });

  // Check for elements that should be focusable but are not (e.g., interactive divs)
  Array.from(
    (root || document).querySelectorAll("div[role], span[role]")
  ).forEach((el) => {
    const role = el.getAttribute("role");
    if ((role === "button" || role === "link") && el.tabIndex < 0) {
      issues.push({
        type: "keyboard",
        element: el,
        message: `Element with role="${role}" should be focusable (tabIndex >= 0)`,
      });
      // Auto-fix: make focusable
      el.tabIndex = 0;
    }
  });

  // Auto-fix: add skip link if missing
  if (firstFocusable && firstFocusable.tagName !== "A") {
    const skipLink = document.createElement("a");
    skipLink.href = "#main";
    skipLink.textContent = "Skip to main content";
    skipLink.setAttribute("data-skip-link", "true");
    skipLink.tabIndex = 0;
    firstFocusable.parentNode.insertBefore(skipLink, firstFocusable);
  }

  return issues;
}
