// ARIA live region accessibility scan logic
// Scans for dynamic content updates and validates aria-live usage
export function scanAriaLiveRegions(root = document) {
  const issues = [];
  // Find all elements with dynamic content (commonly updated containers)
  const dynamicSelectors = ["[data-dynamic]", "[aria-live]"];
  const dynamicElements = Array.from(
    (root || document).querySelectorAll(dynamicSelectors.join(","))
  );

  dynamicElements.forEach((el) => {
    const ariaLive = el.getAttribute("aria-live");
    if (!ariaLive) {
      issues.push({
        type: "aria-live",
        element: el,
        message: "Dynamic content missing aria-live attribute",
      });
      // Auto-fix: add aria-live="polite"
      el.setAttribute("aria-live", "polite");
    } else if (!["polite", "assertive", "off"].includes(ariaLive)) {
      issues.push({
        type: "aria-live",
        element: el,
        message: `Invalid aria-live value: ${ariaLive}`,
      });
      // Auto-fix: set to polite
      el.setAttribute("aria-live", "polite");
    }
  });

  return issues;
}
