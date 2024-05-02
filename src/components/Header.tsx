"use client";

import { signIn, signOut, useSession } from "next-auth/react";

import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";

export const Header = () => {
  const session = useSession();

  return (
    <header>
      <div className="">
        {session.data ? (
          <Button onClick={() => signOut()}>Sign out</Button>
        ) : (
          <Button onClick={() => signIn("google")}>Sign in</Button>
        )}
        <ModeToggle />
      </div>
    </header>
  );
};
