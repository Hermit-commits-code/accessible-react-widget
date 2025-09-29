// Headings accessibility scan logic
export function scanHeadings(root = document) {
  const issues = [];
  (root || document)
    .querySelectorAll("h1, h2, h3, h4, h5, h6")
    .forEach((heading) => {
      if (!heading.textContent || heading.textContent.trim().length === 0) {
        heading.textContent = "Auto-generated heading";
        issues.push({
          type: "empty-heading-fixed",
          element: heading,
          message: `Heading (${heading.tagName}) missing text (auto-fixed)`,
        });
      }
    });
  return issues;
}
