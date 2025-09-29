import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccessibilityWidget from "../AccessibilityWidget";
import { scanForAccessibilityIssues } from "../accessibilityUtils";

describe("AccessibilityWidget unusual markup edge cases", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <input type="text" id="multi1" />
      <label for="multi1">Label 1</label>
      <label for="multi1">Label 2</label>
      <label><input type="text" id="nested1" /></label>
      <input type="text" id="noLabel" />
      <input type="text" id="duplicateId" />
      <input type="text" id="duplicateId" />
      <input type="text" />
    `;
  });

  test("handles multiple labels for one field", () => {
    render(<AccessibilityWidget />);
    const issues = scanForAccessibilityIssues();
    // Should not report missing label for multi1
    expect(issues.find((i) => i.element.id === "multi1")).toBeUndefined();
  });

  test("handles nested label structure", () => {
    render(<AccessibilityWidget />);
    const issues = scanForAccessibilityIssues();
    // Should not report missing label for nested1
    expect(issues.find((i) => i.element.id === "nested1")).toBeUndefined();
  });

  test("reports missing label for field with no label", () => {
    render(<AccessibilityWidget />);
    // Check DOM for auto-generated label for 'noLabel' field
    const label = document.querySelector('label[for="noLabel"]');
    expect(label).toBeTruthy();
    expect(label.textContent).toBe("Auto-generated label");
  });

  test("handles duplicate ids gracefully", () => {
    render(<AccessibilityWidget />);
    // Check DOM for auto-generated labels for both duplicateId fields
    const dupFields = document.querySelectorAll('input[id="duplicateId"]');
    expect(dupFields.length).toBe(2);
    const labels = document.querySelectorAll('label[for="duplicateId"]');
    expect(labels.length).toBe(2);
    labels.forEach((label) => {
      expect(label.textContent).toBe("Auto-generated label");
    });
  });

  test("reports missing label for field with no id or label", () => {
    render(<AccessibilityWidget />);
    const issues = scanForAccessibilityIssues();
    expect(issues.some((i) => i.type === "missing-field-label")).toBeTruthy();
  });
});
