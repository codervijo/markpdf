// Homepage "convert markdown to pdf" content. Shared by the Landing island
// (visible FAQ) and index.astro (FAQPage JSON-LD) so the markup always matches
// the rendered text.

export const homeFaq = [
  {
    q: "Can I convert Markdown to PDF without installing anything?",
    a: "Yes. Render it in any browser-based Markdown previewer and print to PDF, or write and export in Markpdf, which runs in the browser. Pandoc and editor extensions both need installing.",
  },
  {
    q: "Why does my PDF look different from the preview?",
    a: "The converter applies its own styling, not your editor's theme. Pandoc's default route goes through LaTeX, so you get LaTeX typography. To control the look, use an HTML-based engine with your own CSS, or a tool with saved document styles.",
  },
  {
    q: "How do I add a page break?",
    a: "Markdown has no page-break syntax. For HTML-based conversion, insert <div style=\"page-break-after: always\"></div> where the break should go. For Pandoc's LaTeX output, a line containing \\newpage does the same.",
  },
  {
    q: "Do links still work in the PDF?",
    a: "With Pandoc and with Chrome's or Edge's Save as PDF, links stay clickable in most PDF viewers. Check before sending. Some viewers and print workflows flatten them to plain text.",
  },
];
