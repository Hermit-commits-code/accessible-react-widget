// Form field accessibility scan logic
export function scanFormFields(root = document) {
  const issues = [];
  const formFields = Array.from(
    (root || document).querySelectorAll("input, select, textarea")
  ).filter((field) => {
    // Only include non-hidden, non-disabled fields
    if (field.tagName === "INPUT" && field.type === "hidden") return false;
    if (field.disabled) return false;
    return true;
  });
  const labelMap = {};
  Array.from((root || document).querySelectorAll("label[for]")).forEach(
    (label) => {
      const f = label.getAttribute("for");
      if (!labelMap[f]) labelMap[f] = [];
      labelMap[f].push(label);
    }
  );
  formFields.forEach((field) => {
    const id = field.getAttribute("id");
    let hasLabel = false;
    // If field is nested inside a label, always consider it labeled
    if (field.closest("label")) {
      hasLabel = true;
    } else {
      // For <select> and <textarea>, check for label[for]
      if (field.tagName === "SELECT" || field.tagName === "TEXTAREA") {
        if (id && labelMap[id]) {
          const realLabels = labelMap[id].filter(
            (l) => l.textContent !== "Auto-generated label"
          );
          if (realLabels.length > 0) hasLabel = true;
        }
      }
      // For <input>, check for label[for]
      if (field.tagName === "INPUT") {
        if (id && labelMap[id]) {
          const realLabels = labelMap[id].filter(
            (l) => l.textContent !== "Auto-generated label"
          );
          if (realLabels.length > 0) hasLabel = true;
        }
      }
    }
    const ariaLabel = field.getAttribute("aria-label");
    const hasAriaLabel =
      ariaLabel &&
      ariaLabel.trim().length > 0 &&
      ariaLabel !== "Auto-generated label";
    const hasAriaLabelledBy =
      field.hasAttribute("aria-labelledby") &&
      field.getAttribute("aria-labelledby").trim().length > 0;
    if (
      !hasLabel &&
      !hasAriaLabel &&
      !hasAriaLabelledBy &&
      ariaLabel !== "Auto-generated label"
    ) {
      if (
        id &&
        !labelMap[id]?.some((l) => l.textContent === "Auto-generated label")
      ) {
        const autoLabel = document.createElement("label");
        autoLabel.setAttribute("for", id);
        autoLabel.textContent = "Auto-generated label";
        field.parentNode.insertBefore(autoLabel, field.nextSibling);
        issues.push({
          type: "form",
          element: field,
          message: `Form field missing label (auto-fixed with label for='${id}')`,
        });
      } else {
        issues.push({
          type: "missing-field-label",
          element: field,
          message: "Form field missing label",
        });
      }
    }
  });
  return issues;
}
