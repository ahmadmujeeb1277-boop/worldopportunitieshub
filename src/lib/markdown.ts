import { marked, Marked, type Tokens } from "marked";
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
      heading(token: Tokens.Heading) {
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

export interface FaqItem {
  question: string;
  answer: string;
}

// Parses "Q: ...\nA: ..." pairs (possibly multi-line answers) into a flat
// list. Lines that don't belong to a Q/A pair are ignored.
export function parseFaqs(source: string | null | undefined): FaqItem[] {
  if (!source) return [];
  const lines = source.split(/\r?\n/);
  const items: FaqItem[] = [];
  let current: FaqItem | null = null;

  for (const rawLine of lines) {
    const line = rawLine.trim();
    const qMatch = line.match(/^Q[:.]\s*(.+)/i);
    const aMatch = line.match(/^A[:.]\s*(.+)/i);

    if (qMatch) {
      if (current) items.push(current);
      current = { question: qMatch[1].trim(), answer: "" };
    } else if (aMatch && current) {
      current.answer = current.answer ? `${current.answer} ${aMatch[1].trim()}` : aMatch[1].trim();
    } else if (line && current && current.answer) {
      current.answer += ` ${line}`;
    }
  }
  if (current) items.push(current);

  return items.filter((item) => item.question && item.answer);
}
