import { scanKeyboardNavigation } from "../scan/scanKeyboardNavigation";

describe("scanKeyboardNavigation", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("reports missing skip link and auto-fixes", () => {
    document.body.innerHTML = `
      <button>First Button</button>
      <main id="main">Main Content</main>
    `;
    const issues = scanKeyboardNavigation(document.body);
    expect(issues.some((i) => i.message.includes("Missing skip link"))).toBe(
      true
    );
    const skipLink = document.querySelector("a[data-skip-link]");
    expect(skipLink).toBeTruthy();
    expect(skipLink.textContent).toBe("Skip to main content");
  });

  it("reports tabindex > 0", () => {
    document.body.innerHTML = `
      <button tabindex="2">Tabindex Button</button>
    `;
    const issues = scanKeyboardNavigation(document.body);
    expect(issues.some((i) => i.message.includes("Tabindex > 0"))).toBe(true);
  });

  it('auto-fixes role="button" divs to be focusable', () => {
    document.body.innerHTML = `
      <div role="button"></div>
    `;
    const issues = scanKeyboardNavigation(document.body);
    expect(issues.some((i) => i.message.includes("should be focusable"))).toBe(
      true
    );
    const div = document.querySelector('div[role="button"]');
    expect(div.tabIndex).toBe(0);
  });
});
