"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const schema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters."),
  excerpt: z.string().trim().min(10, "Excerpt must be at least 10 characters."),
  body: z.string().trim().min(20, "Body must be at least 20 characters."),
  author: z.string().trim().min(2, "Author is required."),
  coverImage: z.string().trim().optional(),
  status: z.enum(["draft", "published"]),
});

export type ArticleFormState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

function parseFormData(formData: FormData) {
  return schema.safeParse({
    title: formData.get("title"),
    excerpt: formData.get("excerpt"),
    body: formData.get("body"),
    author: formData.get("author") || "WorldOpportunitiesHub Team",
    coverImage: formData.get("coverImage") || undefined,
    status: formData.get("status") || "draft",
  });
}

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}

export async function createArticle(
  _prev: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  await requireAdmin();
  const parsed = parseFormData(formData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
    return { status: "error", message: "Please fix the errors below.", fieldErrors };
  }

  const slug = slugify(parsed.data.title, { lower: true, strict: true });

  await prisma.article.create({
    data: {
      ...parsed.data,
      slug,
      publishedAt: parsed.data.status === "published" ? new Date() : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/articles");
  redirect("/admin/articles");
}

export async function updateArticle(
  id: string,
  _prev: ArticleFormState,
  formData: FormData,
): Promise<ArticleFormState> {
  await requireAdmin();
  const parsed = parseFormData(formData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
    return { status: "error", message: "Please fix the errors below.", fieldErrors };
  }

  const existing = await prisma.article.findUnique({ where: { id } });
  if (!existing) return { status: "error", message: "Article not found." };

  const slug =
    existing.title === parsed.data.title
      ? existing.slug
      : slugify(parsed.data.title, { lower: true, strict: true });

  await prisma.article.update({
    where: { id },
    data: {
      ...parsed.data,
      slug,
      publishedAt:
        parsed.data.status === "published" ? (existing.publishedAt ?? new Date()) : existing.publishedAt,
    },
  });

  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath(`/articles/${slug}`);
  redirect("/admin/articles");
}

export async function deleteArticle(id: string) {
  await requireAdmin();
  await prisma.article.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/articles");
  revalidatePath("/admin/articles");
}
