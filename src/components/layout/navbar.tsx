import Link from "next/link";

import { cn } from "@/lib/utils";
import { Icons } from "@/components/icons";
import { getAuthSession } from "@/lib/auth";
import { buttonVariants } from "@/components/ui/button";
import { UserAccountDropdown } from "@/components/user-account-dropdown";
import { SocketIndicator } from "@/components/socket-indicator";

export const Navbar = async () => {
  const session = await getAuthSession();

  return (
    <nav className="flex justify-between items-center">
      <Link
        href="/"
        className={cn(
          buttonVariants({ variant: "link" }),
          "text-md tracking-tighter"
        )}
      >
        <Icons.logo className="mr-2 h-6 w-6" />
        OpenChatWave
      </Link>

      <div className="flex items-center gap-x-4">
        <SocketIndicator />
        {session ? (
          <UserAccountDropdown session={session} />
        ) : (
          <Link href="/sign-in" className={buttonVariants({ size: "sm" })}>
            Sign In
          </Link>
        )}
      </div>
    </nav>
  );
};
