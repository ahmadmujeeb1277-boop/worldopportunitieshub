"use server";

import { z } from "zod";
import { prisma } from "@/lib/prisma";

const schema = z.object({
  email: z.string().trim().email("Enter a valid email address."),
});

export type SubscribeState = {
  status: "idle" | "success" | "error";
  message?: string;
};

export async function subscribeToNewsletter(
  _prev: SubscribeState,
  formData: FormData,
): Promise<SubscribeState> {
  const parsed = schema.safeParse({ email: formData.get("email") });

  if (!parsed.success) {
    return { status: "error", message: parsed.error.issues[0]?.message ?? "Invalid email." };
  }

  try {
    await prisma.newsletterSubscriber.upsert({
      where: { email: parsed.data.email },
      update: {},
      create: { email: parsed.data.email },
    });
    return { status: "success", message: "You're subscribed. Watch your inbox." };
  } catch {
    return { status: "error", message: "Something went wrong. Please try again." };
  }
}
