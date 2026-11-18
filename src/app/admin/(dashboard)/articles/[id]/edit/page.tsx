import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ArticleForm } from "../../article-form";
import { updateArticle } from "@/app/actions/articles";

export const metadata = { title: "Edit Article" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditArticlePage({ params }: PageProps) {
  const { id } = await params;
  const [article, authors] = await Promise.all([
    prisma.article.findUnique({ where: { id } }),
    prisma.author.findMany({ orderBy: { name: "asc" } }),
  ]);

  if (!article) notFound();

  const action = updateArticle.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-card-foreground">Edit Article</h1>
      <p className="mt-1 truncate text-sm text-muted-foreground">{article.title}</p>
      <div className="mt-6">
        <ArticleForm action={action} article={article} authors={authors} />
      </div>
    </div>
  );
}
