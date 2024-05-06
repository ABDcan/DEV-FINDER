import Link from "next/link";

import { RoomCard } from "@/components/RoomCard";
import { Button } from "@/components/ui/button";
import { getOwnRooms } from "@/data-access/rooms";

export default async function YourRoomsPage() {
  const rooms = await getOwnRooms();

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Your Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create room</Link>
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-12">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </div>
    </main>
  );
}
