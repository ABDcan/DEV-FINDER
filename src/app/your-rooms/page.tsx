import { Button } from "@/components/ui/button";
import { unstable_noStore } from "next/cache";
import Link from "next/link";

import { getOwnRooms } from "@/data-access/rooms";
import Image from "next/image";
import { UserRoomCard } from "./UserRoomCard";

export default async function YourRoomsPage() {
  unstable_noStore();
  const rooms = await getOwnRooms();

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Your Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create room</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <UserRoomCard key={room.id} room={room} />
        ))}
      </div>

      {rooms.length === 0 && (
        <div className="flex justify-center items-center flex-col gap-4 mt-24">
          <Image
            src="/no-data.svg"
            width={200}
            height={200}
            alt="no data image"
          />

          <h2 className="text-xl font-medium">You have no rooms yet.</h2>
        </div>
      )}
    </main>
  );
}
