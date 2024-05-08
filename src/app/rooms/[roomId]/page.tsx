import { GithubIcon } from "lucide-react";
import Link from "next/link";

import { TagsList } from "@/components/TagsList";
import { getRoomById } from "@/data-access/rooms";
import { splitTags } from "@/lib/utils";
import { VideoPlayer } from "@/components/VideoPlayer";
import { unstable_noStore } from "next/cache";

type Props = {
  params: {
    roomId: string;
  };
};

const RoomDetailsPage = async ({ params }: Props) => {
  const roomId = params.roomId;
  unstable_noStore();
  const room = await getRoomById(roomId);

  if (!room)
    return (
      <div className="flex flex-col justify-center items-center mt-20 gap-3">
        No room of this ID found.
        <Link href="/" className="hover:underline">
          Back →
        </Link>
      </div>
    );

  const tags = splitTags(room.tags);

  return (
    <div className="grid grid-cols-4 min-h-screen">
      <div className="col-span-3 p-4 pr-2">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-h-screen">
          <VideoPlayer room={room} />
        </div>
      </div>

      <div className="col-span-1 p-4 pl-2 ">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm p-4 min-h-screen flex flex-col gap-4">
          <h1 className="text-base font-semibold">{room.name}</h1>
          {room.githubRepo && (
            <Link
              href={room.githubRepo}
              className="flex items-center text-sm hover:underline font-medium"
              target="_blank"
              rel="noopener noreferrer"
            >
              <GithubIcon className="h-5 w-5 mr-2" />
              Github project
            </Link>
          )}

          <p className="text-sm text-gray-600">{room.description}</p>

          <TagsList tags={tags} />
        </div>
      </div>
    </div>
  );
};

export default RoomDetailsPage;
