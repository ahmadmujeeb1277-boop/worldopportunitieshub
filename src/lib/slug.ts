import slugify from "slugify";

// Opportunity.slug and Article.slug are plain VARCHAR(191) columns (not
// @db.Text), so MySQL silently truncates a longer value instead of erroring —
// which orphans an already-indexed URL mid-word the moment the title is next
// edited. Keep slugs safely under that limit.
const MAX_SLUG_LENGTH = 180;

export function makeSlug(title: string): string {
  return slugify(title, { lower: true, strict: true }).slice(0, MAX_SLUG_LENGTH).replace(/-+$/, "");
}
