import { unstable_noStore } from "next/cache";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { getOwnRooms } from "@/data-access/rooms";
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
    </main>
  );
}
