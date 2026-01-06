// TypeScript types for Ghost CMS API
// Based on @tryghost/content-api types

export interface GhostAuthor {
  id: string;
  name: string;
  slug: string;
  profile_image?: string;
  cover_image?: string;
  bio?: string;
  website?: string;
  location?: string;
  facebook?: string;
  twitter?: string;
  meta_title?: string;
  meta_description?: string;
  url: string;
}

export interface GhostTag {
  id: string;
  name: string;
  slug: string;
  description?: string;
  feature_image?: string;
  visibility: string;
  meta_title?: string;
  meta_description?: string;
  url: string;
}

export interface GhostPost {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html?: string;
  comment_id?: string;
  feature_image?: string;
  feature_image_alt?: string;
  feature_image_caption?: string;
  featured: boolean;
  visibility: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  custom_excerpt?: string;
  codeinjection_head?: string;
  codeinjection_foot?: string;
  custom_template?: string;
  canonical_url?: string;
  url: string;
  excerpt?: string;
  reading_time: number;
  access: boolean;
  og_image?: string;
  og_title?: string;
  og_description?: string;
  twitter_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  meta_title?: string;
  meta_description?: string;
  email_subject?: string;
  // Relationships
  primary_author?: GhostAuthor;
  authors?: GhostAuthor[];
  tags?: GhostTag[];
  primary_tag?: GhostTag;
}

export interface GhostPage {
  id: string;
  uuid: string;
  title: string;
  slug: string;
  html?: string;
  comment_id?: string;
  feature_image?: string;
  feature_image_alt?: string;
  feature_image_caption?: string;
  featured: boolean;
  visibility: string;
  created_at: string;
  updated_at: string;
  published_at: string;
  custom_excerpt?: string;
  codeinjection_head?: string;
  codeinjection_foot?: string;
  custom_template?: string;
  canonical_url?: string;
  url: string;
  excerpt?: string;
  reading_time: number;
  access: boolean;
  og_image?: string;
  og_title?: string;
  og_description?: string;
  twitter_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  meta_title?: string;
  meta_description?: string;
  // Relationships
  primary_author?: GhostAuthor;
  authors?: GhostAuthor[];
  tags?: GhostTag[];
  primary_tag?: GhostTag;
}

export interface GhostSettings {
  title: string;
  description: string;
  logo?: string;
  icon?: string;
  accent_color?: string;
  cover_image?: string;
  facebook?: string;
  twitter?: string;
  lang: string;
  timezone: string;
  codeinjection_head?: string;
  codeinjection_foot?: string;
  navigation: Array<{
    label: string;
    url: string;
  }>;
  secondary_navigation: Array<{
    label: string;
    url: string;
  }>;
  meta_title?: string;
  meta_description?: string;
  og_image?: string;
  og_title?: string;
  og_description?: string;
  twitter_image?: string;
  twitter_title?: string;
  twitter_description?: string;
  url: string;
}
