// Utility for accessibility scanning

export function scanForAccessibilityIssues(rules = {}) {
  const issues = [];
  let scanStats = {
    roles: 0,
    images: 0,
    buttons: 0,
    links: 0,
    formFields: 0,
    issues: 0,
  };

  // ARIA role and attribute checks
  document.querySelectorAll("[role]").forEach((el) => {
    scanStats.roles++;
    if (rules.ariaRoles === false) return;
    const role = el.getAttribute("role");
    if (role === "button" && !el.hasAttribute("aria-pressed")) {
      el.setAttribute("aria-pressed", "false");
      issues.push({
        type: "missing-aria-pressed-fixed",
        element: el,
        message: "Button role missing aria-pressed (auto-fixed)",
      });
    }
    if (role === "textbox" && !el.hasAttribute("aria-multiline")) {
      el.setAttribute("aria-multiline", "false");
      issues.push({
        type: "missing-aria-multiline-fixed",
        element: el,
        message: "Textbox role missing aria-multiline (auto-fixed)",
      });
    }
    if (role === "checkbox" && !el.hasAttribute("aria-checked")) {
      el.setAttribute("aria-checked", "false");
      issues.push({
        type: "missing-aria-checked-fixed",
        element: el,
        message: "Checkbox role missing aria-checked (auto-fixed)",
      });
    }
    if (role === "switch" && !el.hasAttribute("aria-checked")) {
      el.setAttribute("aria-checked", "false");
      issues.push({
        type: "missing-aria-checked-fixed",
        element: el,
        message: "Switch role missing aria-checked (auto-fixed)",
      });
    }
    if (role === "menuitem" && !el.hasAttribute("aria-haspopup")) {
      el.setAttribute("aria-haspopup", "false");
      issues.push({
        type: "missing-aria-haspopup-fixed",
        element: el,
        message: "Menuitem role missing aria-haspopup (auto-fixed)",
      });
    }
    if (role === "progressbar" && !el.hasAttribute("aria-valuenow")) {
      el.setAttribute("aria-valuenow", "0");
      issues.push({
        type: "missing-aria-valuenow-fixed",
        element: el,
        message: "Progressbar role missing aria-valuenow (auto-fixed)",
      });
    }
    if (role === "slider" && !el.hasAttribute("aria-valuenow")) {
      el.setAttribute("aria-valuenow", "0");
      issues.push({
        type: "missing-aria-valuenow-fixed",
        element: el,
        message: "Slider role missing aria-valuenow (auto-fixed)",
      });
    }
    if (role === "combobox" && !el.hasAttribute("aria-expanded")) {
      el.setAttribute("aria-expanded", "false");
      issues.push({
        type: "missing-aria-expanded-fixed",
        element: el,
        message: "Combobox role missing aria-expanded (auto-fixed)",
      });
    }
  });

  // Auto-fix for images missing alt
  document.querySelectorAll("img").forEach((img) => {
    scanStats.images++;
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

  // Auto-fix for buttons missing accessible labels
  document.querySelectorAll("button").forEach((btn) => {
    scanStats.buttons++;
    if (rules.buttonLabels === false) return;
    const hasText = btn.textContent && btn.textContent.trim().length > 0;
    const hasAriaLabel =
      btn.hasAttribute("aria-label") &&
      btn.getAttribute("aria-label").trim().length > 0;
    const hasAriaLabelledBy =
      btn.hasAttribute("aria-labelledby") &&
      btn.getAttribute("aria-labelledby").trim().length > 0;
    if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
      btn.setAttribute("aria-label", "Accessible button");
      issues.push({
        type: "missing-button-label-fixed",
        element: btn,
        message: "Button missing accessible label (auto-fixed with aria-label)",
      });
    }
  });

  // Auto-fix for links missing accessible labels
  document.querySelectorAll("a").forEach((link) => {
    scanStats.links++;
    if (rules.linkLabels === false) return;
    const hasText = link.textContent && link.textContent.trim().length > 0;
    const hasAriaLabel =
      link.hasAttribute("aria-label") &&
      link.getAttribute("aria-label").trim().length > 0;
    const hasAriaLabelledBy =
      link.hasAttribute("aria-labelledby") &&
      link.getAttribute("aria-labelledby").trim().length > 0;
    if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
      link.setAttribute("aria-label", "Accessible link");
      issues.push({
        type: "missing-link-label-fixed",
        element: link,
        message: "Link missing accessible label (auto-fixed with aria-label)",
      });
    }
  });

  // Form field label logic
  const formFields = document.querySelectorAll("input, select, textarea");
  scanStats.formFields = formFields.length;
  formFields.forEach((field) => {
    if (rules.formLabels === false) return;
    if (field.type === "hidden" || field.disabled) return;
    const id = field.getAttribute("id");
    let hasLabel = false;
    // Case 1: Associated label via for attribute
    if (id) {
      const prev = field.previousElementSibling;
      hasLabel =
        prev &&
        prev.tagName.toLowerCase() === "label" &&
        prev.getAttribute("for") === id;
    }
    // Case 2: Wrapped in a label
    if (!hasLabel && field.closest("label")) {
      hasLabel = true;
    }
    // Case 3: Has aria-label or aria-labelledby
    const hasAriaLabel =
      field.hasAttribute("aria-label") &&
      field.getAttribute("aria-label").trim().length > 0;
    const hasAriaLabelledBy =
      field.hasAttribute("aria-labelledby") &&
      field.getAttribute("aria-labelledby").trim().length > 0;

    // Case 4: No label, no id, no aria-label, no aria-labelledby
    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
      // If field has id, associate with label using for
      if (id) {
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
        // If no id, wrap field in a label
        const wrapper = document.createElement("label");
        wrapper.textContent = "Auto-generated label ";
        field.parentNode.insertBefore(wrapper, field);
        wrapper.appendChild(field);
        issues.push({
          type: "missing-field-label-fixed",
          element: field,
          message: "Form field missing label (auto-fixed by wrapping in label)",
        });
      }
    }
  });

  scanStats.issues = issues.length;
  if (typeof window !== "undefined" && window.console) {
    console.log("Accessibility Scan Stats:", scanStats);
  }
  return issues;
}
