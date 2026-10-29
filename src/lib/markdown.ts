import { marked, Marked } from "marked";
import slugify from "slugify";

export function renderMarkdown(source: string): string {
  return marked.parse(source, { async: false }) as string;
}

export interface TocItem {
  id: string;
  text: string;
  level: number;
}

// Same rendering as renderMarkdown, but also assigns an id to every H2/H3
// and returns a flat table-of-contents list built from those headings.
export function renderMarkdownWithToc(source: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = [];
  const seen = new Map<string, number>();

  const instance = new Marked();
  instance.use({
    renderer: {
      heading(token: { tokens: Parameters<typeof marked.parseInline>[0]; depth: number }) {
        const inlineHtml = this.parser.parseInline(token.tokens);
        const text = inlineHtml.replace(/<[^>]+>/g, "").trim();
        let id = slugify(text, { lower: true, strict: true }) || `section-${toc.length + 1}`;
        const count = seen.get(id) ?? 0;
        seen.set(id, count + 1);
        if (count > 0) id = `${id}-${count}`;

        if (token.depth === 2 || token.depth === 3) {
          toc.push({ id, text, level: token.depth });
        }
        return `<h${token.depth} id="${id}">${inlineHtml}</h${token.depth}>\n`;
      },
    },
  });

  const html = instance.parse(source, { async: false }) as string;
  return { html, toc };
}
