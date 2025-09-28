import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AccessibilityWidget from "../AccessibilityWidget";

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
  <select></select>
  <textarea></textarea>
`;
test("finds form fields missing labels", () => {
  render(<AccessibilityWidget />);
  expect(screen.getByText(/Form field missing label/i)).toBeInTheDocument();
});

test("does not report form fields with labels or accessible attributes", () => {
  render(<AccessibilityWidget />);
  expect(screen.queryByText(/Label for field1/)).not.toBeNull();
  expect(screen.queryByText(/Accessible Input/)).not.toBeNull();
  expect(screen.queryByText(/Labelled by input span/)).not.toBeNull();
});
test("finds links missing descriptive text", () => {
  render(<AccessibilityWidget />);
  expect(
    screen.getByText(/Link missing descriptive text/i)
  ).toBeInTheDocument();
});

test("does not report links with descriptive text or accessible labels", () => {
  render(<AccessibilityWidget />);
  expect(screen.queryByText(/Descriptive Link/)).not.toBeNull();
  expect(screen.queryByText(/Accessible Link/)).not.toBeNull();
  expect(screen.queryByText(/Labelled by link span/)).not.toBeNull();
});

test("finds images missing alt text", () => {
  render(<AccessibilityWidget />);
  expect(screen.getByText(/Image missing alt text/i)).toBeInTheDocument();
});

test("does not report images with alt text", () => {
  render(<AccessibilityWidget />);
  expect(screen.queryByText(/Accessible/)).not.toBeNull();
});

test("finds buttons missing accessible labels", () => {
  render(<AccessibilityWidget />);
  expect(
    screen.getByText(/Button missing accessible label/i)
  ).toBeInTheDocument();
});

test("does not report buttons with accessible labels", () => {
  render(<AccessibilityWidget />);
  expect(screen.queryByText(/Accessible Button/)).not.toBeNull();
  expect(screen.queryByText(/Labelled by span/)).not.toBeNull();
  expect(screen.queryByText(/Click me/)).not.toBeNull();
});
