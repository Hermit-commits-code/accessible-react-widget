import React, { useEffect, useState } from "react";
import { scanForAccessibilityIssues } from "./accessibilityUtils";

const AccessibilityWidget = ({ rules = {} }) => {
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    setIssues(scanForAccessibilityIssues(rules));
  }, [rules]);

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
