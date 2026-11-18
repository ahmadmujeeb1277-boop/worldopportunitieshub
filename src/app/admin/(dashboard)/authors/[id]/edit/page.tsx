import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { AuthorForm } from "../../author-form";
import { updateAuthor } from "@/app/actions/authors";

export const metadata = { title: "Edit Author" };

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EditAuthorPage({ params }: PageProps) {
  const { id } = await params;
  const author = await prisma.author.findUnique({ where: { id } });

  if (!author) notFound();

  const action = updateAuthor.bind(null, id);

  return (
    <div>
      <h1 className="font-display text-2xl font-bold text-card-foreground">Edit Author</h1>
      <p className="mt-1 truncate text-sm text-muted-foreground">{author.name}</p>
      <div className="mt-6">
        <AuthorForm action={action} author={author} />
      </div>
    </div>
  );
}
