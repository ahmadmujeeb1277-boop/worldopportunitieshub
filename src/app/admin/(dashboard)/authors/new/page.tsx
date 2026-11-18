import { AuthorForm } from "../author-form";
import { createAuthor } from "@/app/actions/authors";

export const metadata = { title: "Add Author" };

export default function NewAuthorPage() {
  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-card-foreground">Add Author</h1>
      <div className="mt-6">
        <AuthorForm action={createAuthor} />
      </div>
    </div>
  );
}
