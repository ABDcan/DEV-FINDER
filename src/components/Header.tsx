"use client";

import { signIn, useSession } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";

import { AccountDropdown } from "./AccountDropdown";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { FolderSearch2, Tv2 } from "lucide-react";

export const Header = () => {
  const session = useSession();
  const isLoggedIn = !!session.data;

  return (
    <header className="bg-slate-100 py-1 dark:bg-slate-900 z-10 relative ">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          className="flex gap-1 items-center text-xl hover:underline font-semibold"
        >
          <Image src="/icon.png" width="60" height="60" alt="devfi logo" />
          Devfi
        </Link>

        <nav className="flex gap-3">
          {isLoggedIn && (
            <>
              <Link
                href="/browse"
                className="hover:underline text-sm font-medium flex items-center"
              >
                <FolderSearch2 className="h-4 w-4 mr-2" />
                Browse
              </Link>

              <Link
                href="/your-rooms"
                className="hover:underline text-sm font-medium flex items-center"
              >
                <Tv2 className="h-4 w-4 mr-2" />
                Your rooms
              </Link>
            </>
          )}
        </nav>

        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <AccountDropdown />
          ) : (
            <Button onClick={() => signIn("google")}>Sign in</Button>
          )}

          <ModeToggle />
        </div>
      </div>
    </header>
  );
};
