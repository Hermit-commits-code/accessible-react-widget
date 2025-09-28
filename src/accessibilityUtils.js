// Utility for accessibility scanning
export function scanForAccessibilityIssues(rules = {}) {
  // ARIA role and attribute checks
  document.querySelectorAll("[role]").forEach((el) => {
    // If rules.ariaRoles is false, skip ARIA role checks
    if (rules.ariaRoles === false) return;
    const role = el.getAttribute("role");
    // Example: auto-fix for role='button' missing aria-pressed
    if (role === "button" && !el.hasAttribute("aria-pressed")) {
      el.setAttribute("aria-pressed", "false");
      issues.push({
        type: "missing-aria-pressed-fixed",
        element: el,
        message: "Button role missing aria-pressed (auto-fixed)",
      });
    }
    // Example: role='textbox' missing aria-multiline
    if (role === "textbox" && !el.hasAttribute("aria-multiline")) {
      el.setAttribute("aria-multiline", "false");
      issues.push({
        type: "missing-aria-multiline-fixed",
        element: el,
        message: "Textbox role missing aria-multiline (auto-fixed)",
      });
    }
    // Example: role='checkbox' missing aria-checked
    if (role === "checkbox" && !el.hasAttribute("aria-checked")) {
      el.setAttribute("aria-checked", "false");
      issues.push({
        type: "missing-aria-checked-fixed",
        element: el,
        message: "Checkbox role missing aria-checked (auto-fixed)",
      });
    }
    // Example: role='switch' missing aria-checked
    if (role === "switch" && !el.hasAttribute("aria-checked")) {
      el.setAttribute("aria-checked", "false");
      issues.push({
        type: "missing-aria-checked-fixed",
        element: el,
        message: "Switch role missing aria-checked (auto-fixed)",
      });
    }
    // Example: role='menuitem' missing aria-haspopup
    if (role === "menuitem" && !el.hasAttribute("aria-haspopup")) {
      el.setAttribute("aria-haspopup", "false");
      issues.push({
        type: "missing-aria-haspopup-fixed",
        element: el,
        message: "Menuitem role missing aria-haspopup (auto-fixed)",
      });
    }
    // Example: role='progressbar' missing aria-valuenow
    if (role === "progressbar" && !el.hasAttribute("aria-valuenow")) {
      el.setAttribute("aria-valuenow", "0");
      issues.push({
        type: "missing-aria-valuenow-fixed",
        element: el,
        message: "Progressbar role missing aria-valuenow (auto-fixed)",
      });
    }
    // Example: role='slider' missing aria-valuenow
    if (role === "slider" && !el.hasAttribute("aria-valuenow")) {
      el.setAttribute("aria-valuenow", "0");
      issues.push({
        type: "missing-aria-valuenow-fixed",
        element: el,
        message: "Slider role missing aria-valuenow (auto-fixed)",
      });
    }
    // Example: role='combobox' missing aria-expanded
    if (role === "combobox" && !el.hasAttribute("aria-expanded")) {
      el.setAttribute("aria-expanded", "false");
      issues.push({
        type: "missing-aria-expanded-fixed",
        element: el,
        message: "Combobox role missing aria-expanded (auto-fixed)",
      });
    }
  });
  const issues = [];
  document.querySelectorAll("img").forEach((img) => {
    if (rules.imgAlt === false) return;
    if (!img.hasAttribute("alt") || img.getAttribute("alt") === "") {
      img.setAttribute("alt", "Placeholder alt text");
      issues.push({
        type: "missing-alt-fixed",
        element: img,
        message: "Image missing alt text (auto-fixed)",
      });
    }
  });
  const formFields = document.querySelectorAll("input, select, textarea");
  formFields.forEach((field) => {
    if (rules.formLabels === false) return;
    if (field.type === "hidden" || field.disabled) return;
    const id = field.getAttribute("id");
    let hasLabel = false;
    if (id) {
      // Check if this specific field has a label immediately before it
      const prev = field.previousElementSibling;
      hasLabel =
        prev &&
        prev.tagName.toLowerCase() === "label" &&
        prev.getAttribute("for") === id;
    }
    if (!hasLabel && field.closest("label")) {
      hasLabel = true;
    }
    const hasAriaLabel =
      field.hasAttribute("aria-label") &&
      field.getAttribute("aria-label").trim().length > 0;
    const hasAriaLabelledBy =
      field.hasAttribute("aria-labelledby") &&
      field.getAttribute("aria-labelledby").trim().length > 0;
    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
      if (id) {
        // Always auto-generate label for fields with id and no label
        const autoLabel = document.createElement("label");
        autoLabel.setAttribute("for", id);
        autoLabel.textContent = "Auto-generated label";
        field.parentNode.insertBefore(autoLabel, field);
        issues.push({
          type: "missing-field-label-fixed",
          element: field,
          message: `Form field missing label (auto-fixed with label for='${id}')`,
        });
      } else {
        issues.push({
          type: "missing-field-label",
          element: field,
          message: "Form field missing label",
        });
      }
    }
  });
  return issues;
}
