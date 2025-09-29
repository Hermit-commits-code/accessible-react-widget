// ARIA widget accessibility scan logic
export function scanARIAWidgets(root = document) {
  const issues = [];
  const widgetRoles = ["dialog", "alert", "tablist", "tabpanel", "tab"];
  (root || document).querySelectorAll("[role]").forEach((el) => {
    const role = el.getAttribute("role");
    if (!widgetRoles.includes(role)) return;
    if (role === "dialog" && el.getAttribute("aria-modal") !== "true") {
      el.setAttribute("aria-modal", "true");
      issues.push({
        type: "aria-widget",
        element: el,
        message: "Dialog role missing aria-modal (auto-fixed)",
      });
    }
    if (role === "alert" && el.getAttribute("aria-live") !== "assertive") {
      el.setAttribute("aria-live", "assertive");
      issues.push({
        type: "aria-widget",
        element: el,
        message: "Alert role missing aria-live (auto-fixed)",
      });
    }
    if (
      role === "tablist" &&
      el.getAttribute("aria-orientation") !== "horizontal"
    ) {
      el.setAttribute("aria-orientation", "horizontal");
      issues.push({
        type: "aria-widget",
        element: el,
        message: "Tablist role missing aria-orientation (auto-fixed)",
      });
    }
    if (
      role === "tabpanel" &&
      el.getAttribute("aria-labelledby") !== "auto-tab-label"
    ) {
      el.setAttribute("aria-labelledby", "auto-tab-label");
      issues.push({
        type: "aria-widget",
        element: el,
        message: "Tabpanel role missing aria-labelledby (auto-fixed)",
      });
    }
    if (role === "tab" && !el.hasAttribute("aria-controls")) {
      el.setAttribute("aria-controls", "auto-tabpanel");
      issues.push({
        type: "aria-widget",
        element: el,
        message: "Tab role missing aria-controls (auto-fixed)",
      });
    }
  });
  return issues;
}
