"use server";

import { z } from "zod";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import slugify from "slugify";
import { prisma } from "@/lib/prisma";
import { getSession } from "@/lib/auth";

const schema = z.object({
  title: z.string().trim().min(5, "Title must be at least 5 characters."),
  type: z.string().min(1, "Select a type."),
  summary: z.string().trim().min(10, "Summary must be at least 10 characters."),
  body: z.string().trim().min(20, "Body must be at least 20 characters."),
  organization: z.string().trim().min(2, "Organization is required."),
  officialUrl: z.string().trim().url("Enter a valid URL."),
  country: z.string().trim().optional(),
  region: z.string().min(1, "Select a region."),
  level: z.string().optional(),
  fundingType: z.string().min(1, "Select a funding type."),
  deadline: z.string().optional(),
  coverImage: z.string().trim().optional(),
  isFeatured: z.coerce.boolean().optional(),
  status: z.enum(["draft", "published"]),
});

export type OpportunityFormState = {
  status: "idle" | "error";
  message?: string;
  fieldErrors?: Record<string, string>;
};

function parseFormData(formData: FormData) {
  return schema.safeParse({
    title: formData.get("title"),
    type: formData.get("type"),
    summary: formData.get("summary"),
    body: formData.get("body"),
    organization: formData.get("organization"),
    officialUrl: formData.get("officialUrl"),
    country: formData.get("country") || undefined,
    region: formData.get("region"),
    level: formData.get("level") || undefined,
    fundingType: formData.get("fundingType"),
    deadline: formData.get("deadline") || undefined,
    coverImage: formData.get("coverImage") || undefined,
    isFeatured: formData.get("isFeatured") === "on",
    status: formData.get("status") || "draft",
  });
}

async function requireAdmin() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
}

export async function createOpportunity(
  _prev: OpportunityFormState,
  formData: FormData,
): Promise<OpportunityFormState> {
  await requireAdmin();
  const parsed = parseFormData(formData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[String(issue.path[0])] = issue.message;
    }
    return { status: "error", message: "Please fix the errors below.", fieldErrors };
  }

  const { deadline, ...data } = parsed.data;
  const slug = slugify(data.title, { lower: true, strict: true });

  await prisma.opportunity.create({
    data: {
      ...data,
      slug,
      deadline: deadline ? new Date(deadline) : null,
      publishedAt: data.status === "published" ? new Date() : null,
    },
  });

  revalidatePath("/");
  revalidatePath("/opportunities");
  redirect("/admin/opportunities");
}

export async function updateOpportunity(
  id: string,
  _prev: OpportunityFormState,
  formData: FormData,
): Promise<OpportunityFormState> {
  await requireAdmin();
  const parsed = parseFormData(formData);

  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) {
      fieldErrors[String(issue.path[0])] = issue.message;
    }
    return { status: "error", message: "Please fix the errors below.", fieldErrors };
  }

  const { deadline, ...data } = parsed.data;
  const existing = await prisma.opportunity.findUnique({ where: { id } });
  if (!existing) return { status: "error", message: "Opportunity not found." };

  const slug =
    existing.title === data.title ? existing.slug : slugify(data.title, { lower: true, strict: true });

  await prisma.opportunity.update({
    where: { id },
    data: {
      ...data,
      slug,
      deadline: deadline ? new Date(deadline) : null,
      publishedAt:
        data.status === "published" ? (existing.publishedAt ?? new Date()) : existing.publishedAt,
    },
  });

  revalidatePath("/");
  revalidatePath("/opportunities");
  revalidatePath(`/opportunities/${data.type}/${slug}`);
  redirect("/admin/opportunities");
}

export async function deleteOpportunity(id: string) {
  await requireAdmin();
  await prisma.opportunity.delete({ where: { id } });
  revalidatePath("/");
  revalidatePath("/opportunities");
  revalidatePath("/admin/opportunities");
}
