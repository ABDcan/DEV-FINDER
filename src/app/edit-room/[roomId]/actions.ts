"use server";

import { revalidatePath } from "next/cache";

import { Room } from "@/db/schema";
import { getSession } from "@/lib/auth";
import { editRoom, getRoomById } from "@/data-access/rooms";
import { redirect } from "next/navigation";

export async function editRoomAction(roomData: Omit<Room, "userId">) {
  const session = await getSession();

  if (!session) throw new Error("You must be logged in to create a room");

  //   Did user create this room
  const room = await getRoomById(roomData.id);
  if (room?.userId !== session.user.id) throw new Error("Unauthorized");

  await editRoom({ ...roomData, userId: room.userId });

  revalidatePath("/your-rooms");
  revalidatePath(`/rooms/${roomData.id}`);
  redirect("/your-rooms");
}
