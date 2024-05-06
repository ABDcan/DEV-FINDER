import { unstable_noStore } from "next/cache";
import { eq, like } from "drizzle-orm";

import { db } from "@/db";
import { room } from "@/db/schema";
import { getSession } from "@/lib/auth";

export async function getRooms(search: string | undefined) {
  unstable_noStore();
  const where = search ? like(room.tags, `%${search}%`) : undefined;

  const rooms = await db.query.room.findMany({
    where,
  });

  return rooms;
}

export async function getOwnRooms() {
  unstable_noStore();
  const session = await getSession();
  if (!session) throw new Error("User not authenticated");

  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
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
