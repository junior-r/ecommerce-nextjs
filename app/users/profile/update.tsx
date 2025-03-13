"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserUpdateSchema } from "@/schemas";
import { User } from "next-auth";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import ErrorForm from "@/components/custom/forms/ErrorForm";
import SuccessForm from "@/components/custom/forms/SuccessForm";
import { useState } from "react";
import { updateUser } from "@/actions/users/update";
import { useSession } from "next-auth/react";

function UserUpdateForm({ user }: { user: User }) {
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { data: session, update } = useSession();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof UserUpdateSchema>>({
    resolver: zodResolver(UserUpdateSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      image: user.image || "",
    },
  });

  const onSubmit: SubmitHandler<z.infer<typeof UserUpdateSchema>> = async (
    data
  ) => {
    try {
      const res = await updateUser(data, user.email as string);

      if (res.error) {
        setError(res.error);
        setSuccess("");
        return;
      }

      if (res.success) {
        setError("");
        setSuccess(res.success);

        // Actualiza la sesión y recarga
        await update();
        window.location.reload();
      }
    } catch (err) {
      console.error("Update error:", err);
      setError("Something went wrong.");
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
      <div className="space-y-2">
        <Label htmlFor="telefono">Name *</Label>
        <Input id="name" {...register("name")} defaultValue={user.name || ""} />
        {errors.name && <ErrorForm message={errors.name.message || ""} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          {...register("email")}
          type="email"
          defaultValue={user.email || ""}
        />
        {errors.email && <ErrorForm message={errors.email.message || ""} />}
      </div>

      <div className="space-y-2">
        <Label htmlFor="telefono">Image</Label>
        <Input
          id="image"
          {...register("image")}
          defaultValue={user.image || ""}
        />
        {errors.image && <ErrorForm message={errors.image.message || ""} />}
        <span className="text-sm">Only URLs are allowed.</span>
      </div>

      {error && <ErrorForm message={error} />}
      {success && <SuccessForm message={success} />}

      <Button
        variant={"secondary"}
        type="submit"
        className="cursor-pointer"
        disabled={isSubmitting}
      >
        {isSubmitting ? "Loading..." : "Update"}
      </Button>
    </form>
  );
}

export default UserUpdateForm;
