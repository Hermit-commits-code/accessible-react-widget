import React, { useEffect, useState } from "react";
import { scanForAccessibilityIssues } from "./accessibilityUtils";

const AccessibilityWidget = ({ rules = {} }) => {
  const [issues, setIssues] = useState([]);
  const isInitialScan = React.useRef(true);

  useEffect(() => {
    // Initial scan only once
    if (isInitialScan.current) {
      setIssues(scanForAccessibilityIssues(rules));
      isInitialScan.current = false;
    }

    // Mutation Observer for dynamic DOM changes
    const observer = new MutationObserver(() => {
      // Only update if issues actually change
      const newIssues = scanForAccessibilityIssues(rules);
      setIssues((prevIssues) => {
        // Compare by message array for simplicity
        const prevMessages = prevIssues.map((i) => i.message).join("|");
        const newMessages = newIssues.map((i) => i.message).join("|");
        return prevMessages !== newMessages ? newIssues : prevIssues;
      });
    });
    observer.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
    });

    return () => {
      observer.disconnect();
    };
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
