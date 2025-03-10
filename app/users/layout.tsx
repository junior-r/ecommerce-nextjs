import { auth } from "@/auth";
import { AppSidebar } from "@/components/pages/users/app-sidebar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { redirect } from "next/navigation";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Perfil del usuario",
};

async function UsersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  if (!session || !session.user) redirect("/login");

  return (
    <section className="min-h-screen bg-white dark:bg-black">
      <section className="flex gap-4 flex-wrap content-start flex-row relative">
        <div>
          <SidebarProvider>
            <AppSidebar user={session.user} />
            <main>
              <SidebarTrigger />
            </main>
          </SidebarProvider>
        </div>
        <div className="grow">
          <h1>Users Layout</h1>
          {children}
        </div>
      </section>
    </section>
  );
}

export default UsersLayout;
