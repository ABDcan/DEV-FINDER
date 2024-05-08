"use server";

import { revalidatePath } from "next/cache";

import { deleteRoom, getRoomById } from "@/data-access/rooms";
import { getSession } from "@/lib/auth";

export async function deleteRoomAction(roomId: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  //   Did user create this room
  const room = await getRoomById(roomId);
  if (room?.userId !== session.user.id) throw new Error("Unauthorized");

  await deleteRoom(roomId);

  revalidatePath("/your-rooms");
}
