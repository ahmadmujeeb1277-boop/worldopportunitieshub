"use server";

import { redirect } from "next/navigation";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { verifyPassword, createSession, destroySession } from "@/lib/auth";

const schema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(1),
});

export type LoginState = {
  status: "idle" | "error";
  message?: string;
};

export async function login(_prev: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = schema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { status: "error", message: "Enter a valid email and password." };
  }

  const admin = await prisma.adminUser.findUnique({ where: { email: parsed.data.email } });
  if (!admin) {
    return { status: "error", message: "Incorrect email or password." };
  }

  const valid = await verifyPassword(parsed.data.password, admin.passwordHash);
  if (!valid) {
    return { status: "error", message: "Incorrect email or password." };
  }

  await createSession({ adminId: admin.id, email: admin.email });

  const redirectTo = formData.get("from");
  redirect(typeof redirectTo === "string" && redirectTo.startsWith("/admin") ? redirectTo : "/admin");
}

export async function logout() {
  await destroySession();
  redirect("/admin/login");
}
