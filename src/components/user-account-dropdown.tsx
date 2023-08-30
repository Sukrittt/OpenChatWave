"use client";
import Link from "next/link";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserAvatar from "@/components/user-avatar";
import { Icons } from "@/components/icons";

const dropdownItem = [
  {
    id: 1,
    label: "About",
    Icon: Icons.info,
    href: "/about",
  },
  {
    id: 2,
    label: "Video Chat",
    Icon: Icons.video,
    href: "/video-chat",
  },
];

export const UserAccountDropdown = ({ session }: { session: Session }) => {
  const { user } = session;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <UserAvatar className="h-8 w-8" user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <div className="flex items-center justify-start gap-2 p-2 text-sm">
          <div className="flex flex-col space-y-1 leading-none">
            {user.name && <p className="font-medium">{user.name}</p>}
            {user.email && (
              <p className="w-[200px] truncate text-sm text-muted-foreground">
                {user.email}
              </p>
            )}
          </div>
        </div>

        <DropdownMenuSeparator />

        {dropdownItem.map((item) => (
          <DropdownMenuItem key={item.id} asChild className="cursor-pointer">
            <Link href={item.href}>
              <div className="flex items-center gap-x-2">
                <item.Icon className="h-4 w-4" />
                {item.label}
              </div>
            </Link>
          </DropdownMenuItem>
        ))}

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onSelect={() => {
            signOut({
              callbackUrl: `${window.location.origin}/sign-in`,
            });
          }}
          className="cursor-pointer"
        >
          <div className="flex items-center gap-x-2">
            <Icons.logOut className="h-4 w-4" />
            Log out
          </div>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
