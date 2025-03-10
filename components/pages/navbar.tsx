import { Leaf, LogInIcon, ShoppingCart, UserIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "../ui/button";
import { ModeToggle } from "../ui/theme-toggle";
import UserDropDown from "../custom/user/UserDropDown";
import { auth } from "@/auth";

async function Navbar() {
  const session = await auth();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between mx-auto">
        <div className="flex items-center gap-2">
          <Leaf className="h-6 w-6 text-green-600" />
          <span className="text-xl font-bold">AgriMarket</span>
        </div>
        <nav className="hidden md:flex gap-6">
          <Link href="#" className="text-sm font-medium hover:text-primary">
            Home
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Products
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Categories
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            About
          </Link>
          <Link
            href="#"
            className="text-sm font-medium text-muted-foreground hover:text-primary"
          >
            Contact
          </Link>
        </nav>
        <div className="flex items-center gap-4">
          {session && session.user ? (
            <>
              <Button>
                <ShoppingCart /> (0)
              </Button>
              <UserDropDown user={session.user} />
            </>
          ) : (
            <>
              <Button asChild>
                <Link
                  href="/register"
                  className="flex items-center gap-2 justify-center"
                >
                  <span>Sign Up</span>
                  <UserIcon />
                </Link>
              </Button>
              <Button asChild variant={"outline"}>
                <Link
                  href="/login"
                  className="flex items-center gap-2 justify-center"
                >
                  <span>Login</span>
                  <LogInIcon />
                </Link>
              </Button>
            </>
          )}
          <ModeToggle />
        </div>
      </div>
    </header>
  );
}

export default Navbar;
