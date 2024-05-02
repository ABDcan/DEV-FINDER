import React from "react";
import Link from "next/link";
import { GithubIcon } from "lucide-react";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { Button } from "./ui/button";

type Props = {
  room: Room;
};

export const RoomCard = ({ room }: Props) => {
  return (
    <Card className="dark:bg-slate-900 bg-slate-50">
      <CardHeader>
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>

      <CardContent>
        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center "
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="h-5 w-5 mr-2" />
            Github project
          </Link>
        )}
      </CardContent>

      <CardFooter>
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
