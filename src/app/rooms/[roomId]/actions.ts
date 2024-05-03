"use server";

import { StreamChat } from "stream-chat";

import { getSession } from "@/lib/auth";

export async function generateTokenAction() {
  const session = await getSession();
  if (!session) throw new Error("No session found");

  const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
  const apiSecret = process.env.GET_STREAM_SECRET_KEY!;

  const serverClient = StreamChat.getInstance(apiKey, apiSecret);
  const token = serverClient.createToken(session.user.id);

  return token;
}
