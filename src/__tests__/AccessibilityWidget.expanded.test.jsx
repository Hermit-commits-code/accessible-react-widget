import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { scanForAccessibilityIssues } from "../accessibilityUtils";
import AccessibilityWidget from "../AccessibilityWidget";

describe("AccessibilityWidget expanded element coverage", () => {
  let container;
  beforeEach(() => {
    container = document.createElement("div");
    container.innerHTML = `
      <h1></h1>
      <h2>Heading 2</h2>
      <main></main>
      <nav></nav>
      <aside></aside>
      <header></header>
      <footer></footer>
      <table><tr><td>Cell</td></tr></table>
      <table><caption>Table Caption</caption><tr><th>Header</th></tr></table>
      <ul></ul>
      <ol><li>Item</li></ol>
      <div role="dialog"></div>
      <div role="alert"></div>
      <div role="tablist"></div>
      <div role="tabpanel"></div>
      <div role="tab"></div>
    `;
    document.body.innerHTML = "";
    document.body.appendChild(container);
  });

  test("auto-fixes and reports empty headings", () => {
    const issues = scanForAccessibilityIssues({}, container);
    expect(
      issues.some((i) =>
        i.message.match(/Heading \(H1\) missing text \(auto-fixed\)/i)
      )
    ).toBeTruthy();
    expect(container.querySelector("h1").textContent).toBe(
      "Auto-generated heading"
    );
  });

  test("auto-fixes and reports missing landmark roles", () => {
    const issues = scanForAccessibilityIssues({}, container);
    ["main", "nav", "aside", "header", "footer"].forEach((tag) => {
      const el = container.querySelector(tag);
      const expectedRole = {
        main: "main",
        nav: "navigation",
        aside: "complementary",
        header: "banner",
        footer: "contentinfo",
      }[tag];
      expect(el.getAttribute("role")).toBe(expectedRole);
      // Match issues by message only
      const found = issues.some(
        (i) =>
          i.message ===
          `${tag} missing ARIA role '${expectedRole}' (auto-fixed)`
      );
      expect(found).toBeTruthy();
    });
  });

  test("auto-fixes and reports missing table caption and header", () => {
    const issues = scanForAccessibilityIssues({}, container);
    const table = container.querySelector("table");
    expect(table.querySelector("caption").textContent).toBe(
      "Auto-generated table caption"
    );
    expect(table.querySelector("th").textContent).toBe("Cell");
    expect(
      issues.some((i) =>
        i.message.match(/Table missing caption \(auto-fixed\)/i)
      )
    ).toBeTruthy();
    expect(
      issues.some((i) =>
        i.message.match(/Table first row missing <th> \(auto-fixed\)/i)
      )
    ).toBeTruthy();
  });

  test("does not report table with caption and header", () => {
    const issues = scanForAccessibilityIssues({}, container);
    const table = container.querySelectorAll("table")[1];
    expect(table.querySelector("caption").textContent).toBe("Table Caption");
    expect(table.querySelector("th").textContent).toBe("Header");
    // Only check issues for this table
    const relevantIssues = issues.filter(
      (i) =>
        i.element &&
        i.element.tagName &&
        i.element.tagName.toLowerCase() === "table" &&
        i.element === table
    );
    expect(
      relevantIssues.some((i) =>
        i.message.match(/Table missing caption \(auto-fixed\)/i)
      )
    ).toBeFalsy();
    expect(
      relevantIssues.some((i) =>
        i.message.match(/Table first row missing <th> \(auto-fixed\)/i)
      )
    ).toBeFalsy();
  });

  test("auto-fixes and reports empty lists", () => {
    const issues = scanForAccessibilityIssues({}, container);
    const ul = container.querySelector("ul");
    expect(ul.querySelector("li").textContent).toBe("Auto-generated list item");
    expect(
      issues.some((i) => i.message.match(/List missing <li> \(auto-fixed\)/i))
    ).toBeTruthy();
  });

  test("does not report lists with items", () => {
    const issues = scanForAccessibilityIssues({}, container);
    const ol = container.querySelector("ol");
    expect(ol.querySelector("li").textContent).toBe("Item");
    // Only check issues for this list
    const relevantIssues = issues.filter(
      (i) =>
        i.element &&
        i.element.tagName &&
        i.element.tagName.toLowerCase() === "ol" &&
        i.element === ol
    );
    expect(
      relevantIssues.some((i) =>
        i.message.match(/List missing <li> \(auto-fixed\)/i)
      )
    ).toBeFalsy();
  });

  test("auto-fixes and reports ARIA widget roles", () => {
    const issues = scanForAccessibilityIssues({}, container);
    const dialog = container.querySelector('[role="dialog"]');
    expect(dialog.getAttribute("aria-modal")).toBe("true");
    expect(
      issues.some((i) =>
        i.message.match(/Dialog role missing aria-modal \(auto-fixed\)/i)
      )
    ).toBeTruthy();
    const alert = container.querySelector('[role="alert"]');
    expect(alert.getAttribute("aria-live")).toBe("assertive");
    expect(
      issues.some((i) =>
        i.message.match(/Alert role missing aria-live \(auto-fixed\)/i)
      )
    ).toBeTruthy();
    const tablist = container.querySelector('[role="tablist"]');
    expect(tablist.getAttribute("aria-orientation")).toBe("horizontal");
    expect(
      issues.some((i) =>
        i.message.match(/Tablist role missing aria-orientation \(auto-fixed\)/i)
      )
    ).toBeTruthy();
    const tabpanel = container.querySelector('[role="tabpanel"]');
    expect(tabpanel.getAttribute("aria-labelledby")).toBe("auto-tab-label");
    expect(
      issues.some((i) =>
        i.message.match(/Tabpanel role missing aria-labelledby \(auto-fixed\)/i)
      )
    ).toBeTruthy();
    const tab = container.querySelector('[role="tab"]');
    expect(tab.getAttribute("aria-controls")).toBe("auto-tabpanel");
    expect(
      issues.some((i) =>
        i.message.match(/Tab role missing aria-controls \(auto-fixed\)/i)
      )
    ).toBeTruthy();
  });
});
