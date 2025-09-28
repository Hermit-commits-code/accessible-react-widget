import React, { useEffect, useState } from "react";

// Simple rule: find images without alt text
function scanForAccessibilityIssues() {
  const issues = [];
  document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("alt") || img.getAttribute("alt") === "") {
      // Auto-fix: add placeholder alt text
      img.setAttribute("alt", "Placeholder alt text");
      issues.push({
        type: "missing-alt-fixed",
        element: img,
        message: "Image missing alt text (auto-fixed)",
      });
    }
  });
  // Scan for buttons missing accessible labels
  document.querySelectorAll("button").forEach((btn) => {
    const hasText = btn.textContent && btn.textContent.trim().length > 0;
    const hasAriaLabel =
      btn.hasAttribute("aria-label") &&
      btn.getAttribute("aria-label").trim().length > 0;
    const hasAriaLabelledBy =
      btn.hasAttribute("aria-labelledby") &&
      btn.getAttribute("aria-labelledby").trim().length > 0;
    if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
      // Auto-fix: add placeholder aria-label
      btn.setAttribute("aria-label", "Accessible button");
      issues.push({
        type: "missing-button-label-fixed",
        element: btn,
        message: "Button missing accessible label (auto-fixed)",
      });
    }
  });

  // Scan for links missing descriptive text
  document.querySelectorAll("a").forEach((link) => {
    const hasText = link.textContent && link.textContent.trim().length > 0;
    const hasAriaLabel =
      link.hasAttribute("aria-label") &&
      link.getAttribute("aria-label").trim().length > 0;
    const hasAriaLabelledBy =
      link.hasAttribute("aria-labelledby") &&
      link.getAttribute("aria-labelledby").trim().length > 0;
    // Optionally, check for only icon children (not implemented here)
    if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
      // Auto-fix: add placeholder aria-label
      link.setAttribute("aria-label", "Accessible link");
      issues.push({
        type: "missing-link-description-fixed",
        element: link,
        message: "Link missing descriptive text (auto-fixed)",
      });
    }
  });
  // Scan for form fields missing labels
  const formFields = document.querySelectorAll("input, select, textarea");
  formFields.forEach((field) => {
    // Ignore hidden, type="hidden", or disabled fields
    if (field.type === "hidden" || field.disabled) return;
    // Check for label association
    const id = field.getAttribute("id");
    let hasLabel = false;
    if (id) {
      // Look for <label for="id">
      const label = document.querySelector(`label[for="${id}"]`);
      if (label) hasLabel = true;
    }
    // Look for parent <label>
    if (!hasLabel && field.closest("label")) {
      hasLabel = true;
    }
    // Check aria-label and aria-labelledby
    const hasAriaLabel =
      field.hasAttribute("aria-label") &&
      field.getAttribute("aria-label").trim().length > 0;
    const hasAriaLabelledBy =
      field.hasAttribute("aria-labelledby") &&
      field.getAttribute("aria-labelledby").trim().length > 0;
    if (!hasLabel && !hasAriaLabel && !hasAriaLabelledBy) {
      issues.push({
        type: "missing-field-label",
        element: field,
        message: "Form field missing label",
      });
    }
  });
  return issues;
}

const AccessibilityWidget = () => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    setIssues(scanForAccessibilityIssues());
  }, []);

  return (
    <div className="accessibility-widget">
      <h2>Accessibility Issues</h2>
      {issues.length === 0 ? (
        <p>No accessibility issues found.</p>
      ) : (
        <ul>
          {issues.map((issue, idx) => (
            <li key={idx}>{issue.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AccessibilityWidget;
