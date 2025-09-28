import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import AccessibilityWidget from "../AccessibilityWidget";

document.body.innerHTML = `
  <img src="/test.png" />
  <img src="/test2.png" alt="Accessible" />
`;

test("finds images missing alt text", () => {
  render(<AccessibilityWidget />);
  expect(screen.getByText(/Image missing alt text/i)).toBeInTheDocument();
});

test("does not report images with alt text", () => {
  render(<AccessibilityWidget />);
  expect(screen.queryByText(/Accessible/)).not.toBeNull();
});
