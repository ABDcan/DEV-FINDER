import { GithubIcon } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Room } from "@/db/schema";
import { TagsList } from "./TagsList";
import { Button } from "./ui/button";
import { splitTags } from "@/lib/utils";

type Props = {
  room: Room;
};

export const RoomCard = ({ room }: Props) => {
  const tags = splitTags(room.tags);

  return (
    <Card className="dark:bg-slate-900 bg-slate-50">
      <CardHeader className="pb-4">
        <CardTitle>{room.name}</CardTitle>
        <CardDescription>{room.description}</CardDescription>
      </CardHeader>

      <CardContent className="flex flex-col gap-3">
        <TagsList tags={tags} />

        {room.githubRepo && (
          <Link
            href={room.githubRepo}
            className="flex items-center text-sm font-medium hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GithubIcon className="h-5 w-5 mr-2" />
            Github project
          </Link>
        )}
      </CardContent>

      <CardFooter className="">
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join room</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
