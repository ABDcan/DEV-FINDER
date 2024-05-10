import Link from "next/link";
import { unstable_noStore } from "next/cache";
import Image from "next/image";

import { RoomCard } from "@/components/RoomCard";
import { SearchBar } from "@/components/SearchBar";
import { Button } from "@/components/ui/button";
import { getRooms } from "@/data-access/rooms";

type Props = {
  searchParams: { search: string };
};

export default async function BrowsePage({ searchParams }: Props) {
  unstable_noStore();
  const rooms = await getRooms(searchParams.search);

  return (
    <main className="min-h-screen p-16">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl">Find Dev Rooms</h1>
        <Button asChild>
          <Link href="/create-room">Create room</Link>
        </Button>
      </div>

      <SearchBar />

      <div className="grid grid-cols-3 gap-4 mt-12">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
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

          <h2 className="text-xl font-medium">No rooms yet.</h2>

          <Button asChild>
            <Link href="/create-room">Create room</Link>
          </Button>
        </div>
      )}
    </main>
  );
}
