import GhostContentAPI from "@tryghost/content-api";

// Export types
export type {
  GhostPost,
  GhostPage,
  GhostAuthor,
  GhostTag,
  GhostSettings,
} from "./ghost.types";

// Create API instance with site credentials
export const ghostClient = new GhostContentAPI({
  url: import.meta.env.GHOST_URL || "http://localhost:8080",
  key: import.meta.env.CONTENT_API_KEY,
  version: "v5.0",
});
