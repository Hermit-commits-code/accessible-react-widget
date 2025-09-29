// Utility for accessibility scanning
import { scanTables } from "./scan/scanTables";
import { scanARIAWidgets } from "./scan/scanARIAWidgets";
import { scanFormFields } from "./scan/scanFormFields";
import { scanColorContrast } from "./scan/scanColorContrast";
import { scanHeadings } from "./scan/scanHeadings";
import { scanLandmarks } from "./scan/scanLandmarks";
import { scanLists } from "./scan/scanLists";
import { scanKeyboardNavigation } from "./scan/scanKeyboardNavigation";
import { scanAriaLiveRegions } from "./scan/scanAriaLiveRegions";
import { scanCustomWidgets } from "./scan/scanCustomWidgets";

export function scanForAccessibilityIssues(rules = {}, root = document) {
  const issues = [];
  // Modular scan: Color contrast
  if (rules.colorContrast !== false) {
    issues.push(...scanColorContrast(root));
  }
  // Modular scan: Keyboard navigation
  if (rules.keyboardNavigation !== false) {
    issues.push(...scanKeyboardNavigation(root));
  }
  // Modular scan: ARIA live regions
  if (rules.ariaLiveRegions !== false) {
    issues.push(...scanAriaLiveRegions(root));
  }
  // Modular scan: Custom widgets
  if (rules.customWidgets !== false) {
    issues.push(...scanCustomWidgets(root));
  }
  let scanStats = {
    roles: 0,
    images: 0,
    buttons: 0,
    links: 0,
    formFields: 0,
    headings: 0,
    landmarks: 0,
    tables: 0,
    lists: 0,
    issues: 0,
  };

  // ARIA role and attribute checks
  (root || document).querySelectorAll("[role]").forEach((el) => {
    scanStats.roles++;
    if (rules.ariaRoles === false) return;
    const role = el.getAttribute("role");
    if (role === "button" && !el.hasAttribute("aria-pressed")) {
      el.setAttribute("aria-pressed", "false");
      issues.push({
        type: "missing-aria-pressed-fixed",
        element: el,
        message: "Button role missing aria-pressed (auto-fixed)",
      });
    }
    if (role === "textbox" && !el.hasAttribute("aria-multiline")) {
      el.setAttribute("aria-multiline", "false");
      issues.push({
        type: "missing-aria-multiline-fixed",
        element: el,
        message: "Textbox role missing aria-multiline (auto-fixed)",
      });
    }
    if (role === "checkbox" && !el.hasAttribute("aria-checked")) {
      el.setAttribute("aria-checked", "false");
      issues.push({
        type: "missing-aria-checked-fixed",
        element: el,
        message: "Checkbox role missing aria-checked (auto-fixed)",
      });
    }
    if (role === "switch" && !el.hasAttribute("aria-checked")) {
      el.setAttribute("aria-checked", "false");
      issues.push({
        type: "missing-aria-checked-fixed",
        element: el,
        message: "Switch role missing aria-checked (auto-fixed)",
      });
    }
    if (role === "menuitem" && !el.hasAttribute("aria-haspopup")) {
      el.setAttribute("aria-haspopup", "false");
      issues.push({
        type: "missing-aria-haspopup-fixed",
        element: el,
        message: "Menuitem role missing aria-haspopup (auto-fixed)",
      });
    }
    if (role === "progressbar" && !el.hasAttribute("aria-valuenow")) {
      el.setAttribute("aria-valuenow", "0");
      issues.push({
        type: "missing-aria-valuenow-fixed",
        element: el,
        message: "Progressbar role missing aria-valuenow (auto-fixed)",
      });
    }
    if (role === "slider" && !el.hasAttribute("aria-valuenow")) {
      el.setAttribute("aria-valuenow", "0");
      issues.push({
        type: "missing-aria-valuenow-fixed",
        element: el,
        message: "Slider role missing aria-valuenow (auto-fixed)",
      });
    }
    if (role === "combobox" && !el.hasAttribute("aria-expanded")) {
      el.setAttribute("aria-expanded", "false");
      issues.push({
        type: "missing-aria-expanded-fixed",
        element: el,
        message: "Combobox role missing aria-expanded (auto-fixed)",
      });
    }
  });

  // Modular scan: Headings
  issues.push(...scanHeadings(root));

  // Modular scan: Landmarks
  issues.push(...scanLandmarks(root));

  // Modular scan: Lists
  issues.push(...scanLists(root));

  // Modular scan: ARIA widgets
  issues.push(...scanARIAWidgets(root));

  // Auto-fix for images missing alt
  (root || document).querySelectorAll("img").forEach((img) => {
    scanStats.images++;
    if (rules.imgAlt === false) return;
    const alt = img.getAttribute("alt");
    if (
      (!img.hasAttribute("alt") || alt === "") &&
      alt !== "Placeholder alt text"
    ) {
      img.setAttribute("alt", "Placeholder alt text");
      issues.push({
        type: "image",
        element: img,
        message: "Image missing alt text (auto-fixed)",
      });
    }
  });

  // Auto-fix for buttons missing accessible labels
  (root || document).querySelectorAll("button").forEach((btn) => {
    scanStats.buttons++;
    if (rules.buttonLabels === false) return;
    const hasText = btn.textContent && btn.textContent.trim().length > 0;
    const hasAriaLabel =
      btn.hasAttribute("aria-label") &&
      btn.getAttribute("aria-label").trim().length > 0;
    const hasAriaLabelledBy =
      btn.hasAttribute("aria-labelledby") &&
      btn.getAttribute("aria-labelledby").trim().length > 0;
    if (!hasText && !hasAriaLabel && !hasAriaLabelledBy) {
      btn.setAttribute("aria-label", "Accessible button");
      issues.push({
        type: "missing-button-label-fixed",
        element: btn,
        message: "Button missing accessible label (auto-fixed with aria-label)",
      });
    }
  });

  // Auto-fix for links missing accessible labels
  (root || document).querySelectorAll("a").forEach((link) => {
    scanStats.links++;
    if (rules.linkLabels === false) return;
    const hasText = link.textContent && link.textContent.trim().length > 0;
    const ariaLabel = link.getAttribute("aria-label");
    const hasAriaLabel =
      ariaLabel &&
      ariaLabel.trim().length > 0 &&
      ariaLabel !== "Accessible link";
    const hasAriaLabelledBy =
      link.hasAttribute("aria-labelledby") &&
      link.getAttribute("aria-labelledby").trim().length > 0;
    if (
      !hasText &&
      !hasAriaLabel &&
      !hasAriaLabelledBy &&
      ariaLabel !== "Accessible link"
    ) {
      link.setAttribute("aria-label", "Accessible link");
      issues.push({
        type: "link",
        element: link,
        message: "Link missing accessible label (auto-fixed with aria-label)",
      });
    }
  });

  // Modular scan: Form fields
  issues.push(...scanFormFields(root));

  // Modular scan: Tables
  issues.push(...scanTables(root));

  scanStats.issues = issues.length;
  if (typeof window !== "undefined" && window.console) {
    console.log("Accessibility Scan Stats:", scanStats);
  }
  return issues;
}
