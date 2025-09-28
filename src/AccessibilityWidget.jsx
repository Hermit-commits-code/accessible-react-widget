import React, { useEffect, useState } from "react";

// Simple rule: find images without alt text
function scanForAccessibilityIssues() {
  const issues = [];
  document.querySelectorAll("img").forEach((img) => {
    if (!img.hasAttribute("alt") || img.getAttribute("alt") === "") {
      issues.push({
        type: "missing-alt",
        element: img,
        message: "Image missing alt text",
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
      issues.push({
        type: "missing-button-label",
        element: btn,
        message: "Button missing accessible label",
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
    <div
      style={{
        position: "fixed",
        bottom: 20,
        right: 20,
        background: "#fff",
        border: "1px solid #333",
        padding: "1rem",
        zIndex: 9999,
      }}
    >
      <h3>Accessibility Widget</h3>
      {issues.length === 0 ? (
        <p>No issues found!</p>
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
