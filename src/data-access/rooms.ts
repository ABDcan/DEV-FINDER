import { unstable_noStore } from "next/cache";
import { eq } from "drizzle-orm";

import { db } from "@/db";
import { room } from "@/db/schema";

export async function getRooms() {
  unstable_noStore();
  const rooms = await db.query.room.findMany();

  return rooms;
}

export async function getRoomById(roomId: string) {
  unstable_noStore();
  const existingRoom = await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });

  return existingRoom;
}
