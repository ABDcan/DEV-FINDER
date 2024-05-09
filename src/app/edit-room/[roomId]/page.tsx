import React from "react";
import { unstable_noStore } from "next/cache";

import { EditRoomForm } from "./EditRoomForm";
import { getRoomById } from "@/data-access/rooms";

const EditRoomPage = async ({ params }: { params: { roomId: string } }) => {
  unstable_noStore();
  const room = await getRoomById(params.roomId);

  if (!room) return <div>Room not found.</div>;

  return (
    <div className="container mx-auto flex flex-col gap-8 pt-12 pb-24">
      <h1 className="text-4xl font-bold">Edit room</h1>

      <EditRoomForm roomId={params.roomId} room={room} />
    </div>
  );
};

export default EditRoomPage;
