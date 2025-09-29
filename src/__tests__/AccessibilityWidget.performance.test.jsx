import React from "react";
import { render } from "@testing-library/react";
import AccessibilityWidget from "../AccessibilityWidget";

describe("AccessibilityWidget performance/scalability", () => {
  test("handles large DOMs efficiently", () => {
    // Create a large number of elements
    const COUNT = 200;
    document.body.innerHTML = Array(COUNT)
      .fill()
      .map((_, i) => `<img src="/img${i}.png" />`)
      .join("");
    const t0 = performance.now();
    render(<AccessibilityWidget />);
    const t1 = performance.now();
    // Should auto-fix all missing alt text
    const fixedImgs = Array.from(document.querySelectorAll("img")).filter(
      (img) => img.getAttribute("alt") === "Placeholder alt text"
    );
    expect(fixedImgs.length).toBe(COUNT);
    // Performance: should complete in < 200ms for 200 elements
    expect(t1 - t0).toBeLessThan(200);
  });

  test("handles large number of form fields", () => {
    const COUNT = 150;
    document.body.innerHTML = Array(COUNT)
      .fill()
      .map((_, i) => `<input type='text' id='field${i}' />`)
      .join("");
    const t0 = performance.now();
    render(<AccessibilityWidget />);
    const t1 = performance.now();
    // Should auto-generate labels for all
    const autoLabels = Array.from(document.querySelectorAll("label")).filter(
      (label) => label.textContent === "Auto-generated label"
    );
    expect(autoLabels.length).toBe(COUNT);
    expect(t1 - t0).toBeLessThan(200);
  });
});
