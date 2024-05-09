import { unstable_noStore } from "next/cache";
import { eq, like } from "drizzle-orm";

import { db } from "@/db";
import { Room, room } from "@/db/schema";
import { getSession } from "@/lib/auth";

export async function getRooms(search: string | undefined) {
  const where = search ? like(room.tags, `%${search}%`) : undefined;

  const rooms = await db.query.room.findMany({
    where,
  });

  return rooms;
}

export async function getOwnRooms() {
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

export async function deleteRoom(roomId: string) {
  await db.delete(room).where(eq(room.id, roomId));
}

export async function createRoom(
  roomData: Omit<Room, "id" | "userId">,
  userId: string
) {
  const inserted = await db
    .insert(room)
    .values({ ...roomData, userId })
    .returning();

  return inserted[0];
}

export async function editRoom(roomData: Room) {
  const updated = await db
    .update(room)
    .set(roomData)
    .where(eq(room.id, roomData.id))
    .returning();

  return updated[0];
}
