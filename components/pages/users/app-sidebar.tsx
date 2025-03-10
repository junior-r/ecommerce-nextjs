"use client";
import UserAvatar from "@/components/custom/user/UserAvatar";
import { Button } from "@/components/ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { User } from "next-auth";
import {
  ArrowLeftIcon,
  LogOutIcon,
  UserIcon,
  Ellipsis,
  ShieldUser,
} from "lucide-react";
import Link from "next/link";
import logout from "@/actions/logout";
import { usePathname } from "next/navigation";

type ExtendedUser = User & {
  role?: string;
  isOauth?: boolean;
};

type Props = {
  user: ExtendedUser;
};

const normalUserMenu = [
  {
    name: "Profile",
    href: "/users/profile",
    icon: UserIcon,
  },
  {
    name: "Accounts",
    href: "/accounts",
    icon: ShieldUser,
  },
  {
    name: "Change Password",
    href: "/change-password",
    icon: Ellipsis,
  },
];

export function AppSidebar({ user }: Props) {
  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="bg-blue-400/50 dark:bg-blue-600/50">
        <div className="flex justify-between items-center gap-2">
          <Button variant={"outline"} size={"icon"} title="Go Back" asChild>
            <Link href={"/"}>
              <ArrowLeftIcon />
            </Link>
          </Button>
          <ModeToggle />
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {normalUserMenu.map((item) => {
              const isActive =
                pathname === item.href ||
                (pathname.startsWith(item.href) && item.href !== "/");
              return (
                <SidebarMenuItem key={item.name}>
                  <SidebarMenuButton asChild>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-2 ${
                        isActive ? "font-bold" : ""
                      }`}
                    >
                      <item.icon />
                      <span>{item.name}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              );
            })}
            <SidebarMenuItem key={"Logout"}>
              <SidebarMenuButton onClick={logout}>
                <LogOutIcon />
                <span>{"Logout"}</span>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup />
      </SidebarContent>
      <SidebarFooter>
        <div className="flex items-center justify-between gap-2 rounded-lg transition hover:bg-gray-600/30 dark:hover:bg-black/80 py-2 px-1">
          <UserAvatar user={user} />
          <div className="flex flex-col items-start text-sm flex-1">
            <p className="font-semibold">{user.name}</p>
            <p>{user.email}</p>
          </div>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
