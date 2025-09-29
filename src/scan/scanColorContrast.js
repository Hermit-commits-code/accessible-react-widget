// Color contrast accessibility scan logic
export function scanColorContrast(root = document) {
  const issues = [];
  function getRGB(color) {
    if (!color) return [255, 255, 255];
    color = color.trim().toLowerCase();
    if (color[0] === "#") {
      let hex = color.slice(1);
      if (hex.length === 3) {
        hex = hex
          .split("")
          .map((c) => c + c)
          .join("");
      }
      if (hex.length === 6) {
        return [
          parseInt(hex.slice(0, 2), 16),
          parseInt(hex.slice(2, 4), 16),
          parseInt(hex.slice(4, 6), 16),
        ];
      }
    }
    const rgbMatch = color.match(/rgba?\(([^)]+)\)/);
    if (rgbMatch) {
      const parts = rgbMatch[1].split(",").map((v) => parseFloat(v));
      return parts.length >= 3 ? parts.slice(0, 3) : [255, 255, 255];
    }
    const namedColors = {
      black: [0, 0, 0],
      white: [255, 255, 255],
      red: [255, 0, 0],
      green: [0, 128, 0],
      blue: [0, 0, 255],
      yellow: [255, 255, 0],
      magenta: [255, 0, 255],
      cyan: [0, 255, 255],
      gray: [128, 128, 128],
      grey: [128, 128, 128],
    };
    if (namedColors[color]) {
      return namedColors[color];
    }
    return [255, 255, 255];
  }
  function luminance([r, g, b]) {
    const a = [r, g, b].map((v) => {
      v /= 255;
      return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    return 0.2126 * a[0] + 0.7152 * a[1] + 0.0722 * a[2];
  }
  function contrast(rgb1, rgb2) {
    const l1 = luminance(rgb1);
    const l2 = luminance(rgb2);
    return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05);
  }
  (root || document)
    .querySelectorAll(
      "body, div, span, p, h1, h2, h3, h4, h5, h6, label, button, a"
    )
    .forEach((el) => {
      if (!el.textContent || el.textContent.trim().length === 0) return;
      const style = window.getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") return;
      const fg = getRGB(style.color);
      const bg = getRGB(style.backgroundColor);
      const ratio = contrast(fg, bg);
      const isLarge =
        el.tagName.match(/^H[1-2]$/) ||
        parseFloat(style.fontSize.replace("px", "")) >= 24;
      const threshold = isLarge ? 3 : 4.5;
      if (ratio < threshold) {
        issues.push({
          type: "insufficient-contrast",
          element: el,
          message: `Insufficient color contrast (${ratio.toFixed(
            2
          )}:1, required ${threshold}:1)`,
        });
      }
    });
  return issues;
}
