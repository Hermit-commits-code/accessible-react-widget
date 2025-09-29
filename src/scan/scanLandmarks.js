// Landmarks accessibility scan logic
export function scanLandmarks(root = document) {
  const issues = [];
  const expectedRoles = {
    main: "main",
    nav: "navigation",
    aside: "complementary",
    header: "banner",
    footer: "contentinfo",
  };
  Array.from(
    (root || document).querySelectorAll("main, nav, aside, header, footer")
  ).forEach((landmark) => {
    const tag = landmark.tagName.toLowerCase();
    const beforeRole = landmark.getAttribute("role");
    const expectedRole = expectedRoles[tag];
    if (!beforeRole || beforeRole !== expectedRole) {
      landmark.setAttribute("role", expectedRole);
      issues.push({
        type: "missing-landmark-role-fixed",
        element: landmark,
        message: `${tag} missing ARIA role '${expectedRole}' (auto-fixed)`,
      });
    }
  });
  return issues;
}
