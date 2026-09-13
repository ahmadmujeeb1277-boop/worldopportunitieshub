import { ArticleForm } from "../article-form";
import { createArticle } from "@/app/actions/articles";

export const metadata = { title: "Add Article" };

export default function NewArticlePage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-card-foreground">Add Article</h1>
      <div className="mt-6">
        <ArticleForm action={createArticle} />
      </div>
    </div>
  );
}
