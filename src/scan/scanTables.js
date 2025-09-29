// Table accessibility scan logic
export function scanTables(root = document) {
  const issues = [];
  (root || document).querySelectorAll("table").forEach((table) => {
    let caption = table.querySelector("caption");
    if (!caption) {
      caption = document.createElement("caption");
      caption.textContent = "Auto-generated table caption";
      table.insertBefore(caption, table.firstChild);
      issues.push({
        type: "table",
        element: table,
        message: "Table missing caption (auto-fixed)",
      });
    }
    let th = table.querySelector("th");
    if (!th) {
      const firstRow = table.querySelector("tr");
      if (firstRow) {
        th = document.createElement("th");
        th.textContent = "Cell";
        firstRow.insertBefore(th, firstRow.firstChild);
        issues.push({
          type: "table",
          element: table,
          message: "Table first row missing <th> (auto-fixed)",
        });
      }
    }
  });
  return issues;
}
