"use client";

import React, { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { DeleteIcon, LogOutIcon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export const AccountDropdown = () => {
  const session = useSession();
  const [open, setOpen] = useState(false);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link" className="px-0">
          <Avatar className="mr-2">
            <AvatarImage
              src={session.data?.user?.image ?? "/default-user.jpg"}
            />
            <AvatarFallback>
              {session.data?.user?.name ? session.data?.user?.name[0] : "CN"}
            </AvatarFallback>
          </Avatar>

          {session.data?.user?.name}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent>
        <DropdownMenuItem
          onClick={() =>
            signOut({
              callbackUrl: "/",
            })
          }
        >
          <LogOutIcon className="mr-3 w-5 h-5" />
          Sign out
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            setOpen(true);
          }}
        >
          <DeleteIcon className="mr-3 h-5 w-5" /> Delete Account
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
