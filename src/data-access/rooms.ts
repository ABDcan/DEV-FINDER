import { unstable_noStore } from "next/cache";
import { eq, like } from "drizzle-orm";

import { db } from "@/db";
import { room } from "@/db/schema";

export async function getRooms(search: string | undefined) {
  unstable_noStore();
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  
  const rooms = await db.query.room.findMany({
    where,
  });

  return rooms;
}

export async function getRoomById(roomId: string) {
  unstable_noStore();
  const existingRoom = await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });

  return existingRoom;
}
