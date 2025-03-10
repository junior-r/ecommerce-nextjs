import React from "react";
import { auth } from "@/auth";

async function Page() {
  const session = await auth();
  return (
    <div>
      <p>Bienvenido {session?.user?.name}</p>
      <p>Role: {session?.user?.role}</p>
      <p>oAuth: {session?.user?.isOauth ? "Yes" : "No"}</p>
    </div>
  );
}

export default Page;
