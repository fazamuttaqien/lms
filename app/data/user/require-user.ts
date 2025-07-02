import { cache } from "react";

import { headers } from "next/headers";
import { redirect } from "next/navigation";

import "server-only";

import { auth } from "@/lib/auth";

export const requiredUser = cache(async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return redirect("/login");
  }

  return session.user;
});
