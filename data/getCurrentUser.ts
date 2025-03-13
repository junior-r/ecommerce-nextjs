"use server";

import { auth } from "@/auth";

export const getCurrentUser = async () => {
  const session = await auth();
  if (!session || !session.user) return null;

  try {
    return session.user;
  } catch (error) {
    console.error(error);
    return null;
  }
};
