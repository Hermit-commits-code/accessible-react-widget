import React, { useEffect, useState } from "react";
import { scanForAccessibilityIssues } from "./accessibilityUtils";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    // Log error gracefully
    if (window && window.console) {
      window.console.error("AccessibilityWidget error:", error, info);
    }
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="accessibility-widget-error">
          AccessibilityWidget encountered an error. See console for details.
        </div>
      );
    }
    return this.props.children;
  }
}

const AccessibilityWidget = ({ rules = {} }) => {
  const [issues, setIssues] = useState([]);
  const isInitialScan = React.useRef(true);

  useEffect(() => {
    // Initial scan only once
    if (isInitialScan.current) {
      try {
        setIssues(scanForAccessibilityIssues(rules));
      } catch (err) {
        window.console &&
          window.console.error("AccessibilityWidget scan error:", err);
      }
      isInitialScan.current = false;
    }

    // Mutation Observer for dynamic DOM changes
    const observer = new MutationObserver(() => {
      try {
        // Only update if issues actually change
        const newIssues = scanForAccessibilityIssues(rules);
        setIssues((prevIssues) => {
          // Compare by message array for simplicity
          const prevMessages = prevIssues.map((i) => i.message).join("|");
          const newMessages = newIssues.map((i) => i.message).join("|");
          return prevMessages !== newMessages ? newIssues : prevIssues;
        });
      } catch (err) {
        window.console &&
          window.console.error("AccessibilityWidget scan error:", err);
      }
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
    <ErrorBoundary>
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
    </ErrorBoundary>
  );
};

export default AccessibilityWidget;
