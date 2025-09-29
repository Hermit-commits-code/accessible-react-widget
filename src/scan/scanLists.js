// Lists accessibility scan logic
export function scanLists(root = document) {
  const issues = [];
  (root || document).querySelectorAll("ul, ol").forEach((list) => {
    if (!list.querySelector("li")) {
      const li = document.createElement("li");
      li.textContent = "Auto-generated list item";
      list.appendChild(li);
      issues.push({
        type: "empty-list-fixed",
        element: list,
        message: "List missing <li> (auto-fixed)",
      });
    }
  });
  return issues;
}
