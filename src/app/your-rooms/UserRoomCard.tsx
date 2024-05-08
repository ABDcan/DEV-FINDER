"use client";

import { GithubIcon, Trash2 } from "lucide-react";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Room } from "@/db/schema";
import { splitTags } from "@/lib/utils";
import { TagsList } from "@/components/TagsList";
import { Button } from "@/components/ui/button";
import { deleteRoomAction } from "./actions";

type Props = {
  room: Room;
};

export const UserRoomCard = ({ room }: Props) => {
  const tags = splitTags(room.tags);

  return (
    <Card className="dark:bg-slate-900 bg-slate-50">
      <CardHeader className="pb-4 relative">
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

      <CardFooter className="flex gap-2 w-full justify-between">
        <Button asChild>
          <Link href={`/rooms/${room.id}`}>Join room</Link>
        </Button>

        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">
              <Trash2 className="w-4 h-4 mr-2" /> Delete room
            </Button>
          </AlertDialogTrigger>

          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently remove the
                room and any data associated with it.
              </AlertDialogDescription>
            </AlertDialogHeader>

            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  deleteRoomAction(room.id);
                }}
              >
                Yes, delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </CardFooter>
    </Card>
  );
};
