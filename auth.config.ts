import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import type { NextAuthConfig } from "next-auth";
import { LoginSchema } from "./schemas";
import { prisma } from "./prisma/prisma";
import bcrypt from "bcryptjs";

export default {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
    Credentials({
      async authorize(credentials) {
        const validatedData = LoginSchema.safeParse(credentials);

        if (!validatedData.success) return null;

        const { email, password } = validatedData.data;

        const userExists = await prisma.user.findFirst({
          where: {
            email,
          },
        });

        if (!userExists || !userExists.password || !userExists.email)
          return null;

        const passwordMatch = await bcrypt.compare(
          password,
          userExists.password
        );

        if (!passwordMatch) return null;

        return userExists;
      },
    }),
  ],
} satisfies NextAuthConfig;
