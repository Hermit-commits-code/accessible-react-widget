import React from "react";
import { render } from "@testing-library/react";
import "@testing-library/jest-dom";
import AccessibilityWidget from "../AccessibilityWidget";
import { scanForAccessibilityIssues } from "../accessibilityUtils";

describe("AccessibilityWidget dynamic DOM", () => {
  beforeEach(() => {
    document.body.innerHTML = `
      <img src="/dynamic.png" />
      <button></button>
      <input type="text" />
    `;
  });

  test("detects and auto-fixes issues for elements added after initial render", () => {
    render(<AccessibilityWidget />);
    // Add new elements dynamically
    const newImg = document.createElement("img");
    newImg.setAttribute("src", "/added.png");
    document.body.appendChild(newImg);

    const newBtn = document.createElement("button");
    document.body.appendChild(newBtn);

    const newInput = document.createElement("input");
    newInput.setAttribute("id", "dynamicField");
    document.body.appendChild(newInput);

    // Re-scan for issues after adding elements
    scanForAccessibilityIssues();

    // Check that new elements are auto-fixed
    expect(newImg.getAttribute("alt")).toBe("Placeholder alt text");
    // Button is now auto-fixed dynamically
    expect(newBtn.getAttribute("aria-label")).toBe("Accessible button");
    const autoLabel = document.querySelector('label[for="dynamicField"]');
    expect(autoLabel).toBeTruthy();
    expect(autoLabel.textContent).toBe("Auto-generated label");
  });
});
