import { scanCustomWidgets } from "../scan/scanCustomWidgets";

describe("scanCustomWidgets", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });

  it("reports and auto-fixes modal missing aria-modal and tabindex", () => {
    document.body.innerHTML = `<div class="modal"></div>`;
    const issues = scanCustomWidgets(document.body);
    expect(issues.some((i) => i.message.includes("aria-modal"))).toBe(true);
    expect(issues.some((i) => i.message.includes("tabindex"))).toBe(true);
    const modal = document.querySelector(".modal");
    expect(modal.getAttribute("aria-modal")).toBe("true");
    expect(modal.tabIndex).toBe(-1);
  });

  it("reports and auto-fixes dropdown missing aria-expanded", () => {
    document.body.innerHTML = `<div class="dropdown"></div>`;
    const issues = scanCustomWidgets(document.body);
    expect(issues.some((i) => i.message.includes("aria-expanded"))).toBe(true);
    const dropdown = document.querySelector(".dropdown");
    expect(dropdown.getAttribute("aria-expanded")).toBe("false");
  });

  it("reports and auto-fixes tooltip missing aria-hidden", () => {
    document.body.innerHTML = `<div class="tooltip"></div>`;
    const issues = scanCustomWidgets(document.body);
    expect(issues.some((i) => i.message.includes("aria-hidden"))).toBe(true);
    const tooltip = document.querySelector(".tooltip");
    expect(tooltip.getAttribute("aria-hidden")).toBe("true");
  });

  it("reports and auto-fixes grid missing aria-readonly", () => {
    document.body.innerHTML = `<div class="grid"></div>`;
    const issues = scanCustomWidgets(document.body);
    expect(issues.some((i) => i.message.includes("aria-readonly"))).toBe(true);
    const grid = document.querySelector(".grid");
    expect(grid.getAttribute("aria-readonly")).toBe("false");
  });
});
