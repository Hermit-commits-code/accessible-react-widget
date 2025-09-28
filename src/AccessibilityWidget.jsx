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
  // Add more rules here as needed
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
