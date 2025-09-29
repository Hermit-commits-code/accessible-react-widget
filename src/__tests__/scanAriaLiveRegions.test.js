import { scanAriaLiveRegions } from "../scan/scanAriaLiveRegions";

describe("scanAriaLiveRegions", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("reports missing aria-live and auto-fixes", () => {
    document.body.innerHTML = `
      <div data-dynamic>Dynamic Content</div>
    `;
    const issues = scanAriaLiveRegions(document.body);
    expect(issues.some((i) => i.message.includes("missing aria-live"))).toBe(
      true
    );
    const el = document.querySelector("[data-dynamic]");
    expect(el.getAttribute("aria-live")).toBe("polite");
  });

  it("reports invalid aria-live value and auto-fixes", () => {
    document.body.innerHTML = `
      <div aria-live="loud">Invalid Live</div>
    `;
    const issues = scanAriaLiveRegions(document.body);
    expect(
      issues.some((i) => i.message.includes("Invalid aria-live value"))
    ).toBe(true);
    const el = document.querySelector("[aria-live]");
    expect(el.getAttribute("aria-live")).toBe("polite");
  });

  it("does not report valid aria-live values", () => {
    document.body.innerHTML = `
      <div aria-live="polite">Polite</div>
      <div aria-live="assertive">Assertive</div>
      <div aria-live="off">Off</div>
    `;
    const issues = scanAriaLiveRegions(document.body);
    expect(issues.length).toBe(0);
  });
});
