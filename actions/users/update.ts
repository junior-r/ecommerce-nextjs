"use server";
import { prisma } from "@/prisma/prisma";
import { UserUpdateSchema } from "@/schemas";
import { z } from "zod";

export const updateUser = async (
  data: z.infer<typeof UserUpdateSchema>,
  userEmail: string
) => {
  try {
    const validatedData = UserUpdateSchema.parse(data);

    if (!validatedData) return { error: "Invalid input data." };

    if (validatedData.email !== userEmail) {
      const userExists = await prisma.user.findFirst({
        where: {
          email: validatedData.email,
        },
      });

      if (userExists)
        return { error: "A user with this email already exists." };
    }

    await prisma.user.update({
      where: {
        email: userEmail,
      },
      data: {
        name: validatedData.name,
        email: validatedData.email,
        image: validatedData.image,
      },
    });

    return { success: "User updated successfully." };
  } catch (error) {
    console.error(error);
    return { error: "An error occurred while updating user." };
  }
};
