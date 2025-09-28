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
`;

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
