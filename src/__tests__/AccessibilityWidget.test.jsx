import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AccessibilityWidget from "../AccessibilityWidget";

beforeEach(() => {
  document.body.innerHTML = `
    <img src="/test.png" />
    <img src="/test2.png" alt="Accessible" />
    <button></button>
    <button>Click me</button>
    <button aria-label="Accessible Button"></button>
    <button aria-labelledby="label1"></button>
    <span id="label1">Labelled by span</span>
    <a href="#"></a>
    <a href="#">   </a>
    <a href="#">Descriptive Link</a>
    <a href="#" aria-label="Accessible Link"></a>
    <a href="#" aria-labelledby="label2"></a>
    <span id="label2">Labelled by link span</span>
    <input type="text" />
    <input type="text" id="field1" />
    <label for="field1">Label for field1</label>
    <input type="text" aria-label="Accessible Input" />
    <input type="text" aria-labelledby="label3" />
    <span id="label3">Labelled by input span</span>
    <label><input type="text" /></label>
    <input type="hidden" />
    <input type="text" disabled />
    <select></select>
    <textarea></textarea>
  `;
});

test("auto-fixes and reports all missing alt text images", () => {
  render(<AccessibilityWidget />);
  const fixedImg = document.querySelector('img[src="/test.png"]');
  expect(fixedImg).toHaveAttribute("alt", "Placeholder alt text");
  const issues = screen.getAllByText(/Image missing alt text \(auto-fixed\)/i);
  expect(issues.length).toBe(1);
});

test("does not report images with alt text", () => {
  render(<AccessibilityWidget />);
  const img = document.querySelector('img[src="/test2.png"]');
  expect(img).toHaveAttribute("alt", "Accessible");
  const issues = screen.getAllByText(/Image missing alt text \(auto-fixed\)/i);
  // Only the image missing alt should be reported
  expect(issues.length).toBe(1);
});

test("auto-fixes and reports all buttons missing accessible labels", () => {
  render(<AccessibilityWidget />);
  const fixedBtns = Array.from(
    document.querySelectorAll('button[aria-label="Accessible button"]')
  );
  expect(fixedBtns.length).toBe(1);
  const issues = screen.getAllByText(
    /Button missing accessible label \(auto-fixed\)/i
  );
  expect(issues.length).toBe(1);
});

test("does not report buttons with accessible labels or text", () => {
  render(<AccessibilityWidget />);
  const issues = screen.getAllByText(
    /Button missing accessible label \(auto-fixed\)/i
  );
  // Only one button should be reported as missing label
  expect(issues.length).toBe(1);
  expect(
    document.querySelector('button[aria-label="Accessible Button"]')
  ).toBeTruthy();
  expect(
    document.querySelector('button[aria-labelledby="label1"]')
  ).toBeTruthy();
  expect(document.querySelector("button")).not.toBeNull();
});

test("auto-fixes and reports all links missing descriptive text", () => {
  render(<AccessibilityWidget />);
  const fixedLinks = Array.from(document.querySelectorAll("a")).filter(
    (link) => link.getAttribute("aria-label") === "Accessible link"
  );
  expect(fixedLinks.length).toBeGreaterThan(0);
  const issues = screen.getAllByText(
    /Link missing descriptive text \(auto-fixed\)/i
  );
  expect(issues.length).toBe(2);
});

test("does not report links with descriptive text or accessible labels", () => {
  render(<AccessibilityWidget />);
  const issues = screen.getAllByText(
    /Link missing descriptive text \(auto-fixed\)/i
  );
  // Only links missing text/label should be reported
  expect(issues.length).toBe(2);
  expect(
    document.querySelector('a[aria-label="Accessible Link"]')
  ).toBeTruthy();
  expect(document.querySelector('a[aria-labelledby="label2"]')).toBeTruthy();
  expect(screen.getByText(/Descriptive Link/)).toBeInTheDocument();
});

test("auto-fixes and reports all form fields missing labels", () => {
  render(<AccessibilityWidget />);
  const issues = screen.getAllByText(/Form field missing label/i);
  // Should only report unlabeled, non-hidden, non-disabled fields
  expect(issues.length).toBe(3);
});

test("does not report form fields with labels or accessible attributes", () => {
  render(<AccessibilityWidget />);
  const issues = screen.getAllByText(/Form field missing label/i);
  // Only unlabeled, non-hidden, non-disabled fields should be reported
  expect(issues.length).toBe(3);
  expect(document.querySelector('input[id="field1"]')).toBeTruthy();
  expect(
    document.querySelector('input[aria-label="Accessible Input"]')
  ).toBeTruthy();
  expect(
    document.querySelector('input[aria-labelledby="label3"]')
  ).toBeTruthy();
  expect(document.querySelector('label[for="field1"]')).toBeTruthy();
  expect(document.querySelector("label input")).toBeTruthy();
});

test("does not report hidden or disabled fields", () => {
  render(<AccessibilityWidget />);
  expect(document.querySelector('input[type="hidden"]')).toBeTruthy();
  expect(document.querySelector("input:disabled")).toBeTruthy();
  // These should not be reported as issues
  const issues = screen.getAllByText(/Form field missing label/i);
  issues.forEach((issue) => {
    expect(issue).not.toHaveTextContent(/hidden|disabled/i);
  });
});
