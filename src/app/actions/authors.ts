"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";
import { makeSlug } from "@/lib/slug";

const schema = z.object({
  name: z.string().trim().min(2, "Name is required."),
  role: z.string().trim().optional(),
  bio: z.string().trim().optional(),
  avatarUrl: z.string().trim().url().nullable(),
  socialUrl: z.string().trim().url("Enter a valid URL.").optional().or(z.literal("")),
});

export type AuthorFormState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

function parseFormData(formData: FormData) {
  return schema.safeParse({
    name: formData.get("name"),
    role: formData.get("role") || undefined,
    bio: formData.get("bio") || undefined,
    avatarUrl: formData.get("avatarUrl") || null,
    socialUrl: formData.get("socialUrl") || "",
  });
}

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}

export async function createAuthor(
  _prev: AuthorFormState,
  formData: FormData,
): Promise<AuthorFormState> {
  await requireAdmin();
  const parsed = parseFormData(formData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
    return { status: "error", message: "Please fix the errors below.", fieldErrors };
  }

  const { socialUrl, ...data } = parsed.data;
  const slug = makeSlug(data.name);

  await prisma.author.create({
    data: { ...data, slug, socialUrl: socialUrl || null },
  });

  revalidatePath("/admin/authors");
  redirect("/admin/authors");
}

export async function updateAuthor(
  id: string,
  _prev: AuthorFormState,
  formData: FormData,
): Promise<AuthorFormState> {
  await requireAdmin();
  const parsed = parseFormData(formData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] = issue.message;
    return { status: "error", message: "Please fix the errors below.", fieldErrors };
  }

  const existing = await prisma.author.findUnique({ where: { id } });
  if (!existing) return { status: "error", message: "Author not found." };

  const { socialUrl, ...data } = parsed.data;
  const slug = existing.name === data.name ? existing.slug : makeSlug(data.name);

  await prisma.author.update({
    where: { id },
    data: { ...data, slug, socialUrl: socialUrl || null },
  });

  // Articles keep a legacy free-text copy of the author's name in sync.
  await prisma.article.updateMany({ where: { authorId: id }, data: { authorName: data.name } });

  revalidatePath("/admin/authors");
  revalidatePath(`/authors/${slug}`);
  redirect("/admin/authors");
}

export async function deleteAuthor(id: string) {
  await requireAdmin();
  await prisma.author.delete({ where: { id } });
  revalidatePath("/admin/authors");
}
