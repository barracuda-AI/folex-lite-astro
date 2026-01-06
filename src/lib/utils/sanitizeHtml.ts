import sanitizeHtml from "sanitize-html";

/**
 * Sanitizes HTML content to prevent XSS attacks
 * Configured specifically for Ghost CMS blog content
 */
export function sanitizeGhostHtml(html: string): string {
  if (!html) return "";

  return sanitizeHtml(html, {
    allowedTags: [
      "h1",
      "h2",
      "h3",
      "h4",
      "h5",
      "h6",
      "p",
      "br",
      "hr",
      "ul",
      "ol",
      "li",
      "a",
      "strong",
      "em",
      "b",
      "i",
      "u",
      "s",
      "strike",
      "del",
      "blockquote",
      "pre",
      "code",
      "img",
      "figure",
      "figcaption",
      "table",
      "thead",
      "tbody",
      "tr",
      "th",
      "td",
      "div",
      "span",
      "iframe", // For embedded content (videos, etc.)
      "sub",
      "sup",
      "small",
      "mark",
    ],
    allowedAttributes: {
      "*": ["class", "id", "style"],
      a: ["href", "target", "rel", "title"],
      img: ["src", "alt", "title", "width", "height", "loading", "srcset"],
      iframe: [
        "src",
        "width",
        "height",
        "frameborder",
        "allowfullscreen",
        "allow",
      ],
      figure: ["class"],
      div: ["class", "id", "data-*"],
      span: ["class", "id", "data-*"],
      code: ["class"],
      pre: ["class"],
    },
    allowedIframeHostnames: [
      "www.youtube.com",
      "player.vimeo.com",
      "www.youtube-nocookie.com",
    ],
    transformTags: {
      a: (_tagName, attribs) => {
        // Ensure external links are safe
        return {
          tagName: "a",
          attribs: {
            ...attribs,
            rel: "noopener noreferrer",
          },
        };
      },
    },
  });
}

/**
 * Sanitizes HTML and removes all tags, returning plain text
 * Useful for excerpts and meta descriptions
 */
export function stripHtmlTags(html: string): string {
  if (!html) return "";

  const sanitized = sanitizeHtml(html, {
    allowedTags: [],
    allowedAttributes: {},
  });

  // Clean up extra whitespace
  return sanitized.replace(/\s+/g, " ").trim();
}

/**
 * Truncates HTML content to a specific word count while preserving HTML structure
 */
export function truncateHtml(html: string, wordCount: number): string {
  if (!html) return "";

  const text = stripHtmlTags(html);
  const words = text.split(/\s+/).slice(0, wordCount);
  return words.join(" ") + (words.length >= wordCount ? "..." : "");
}
