"use client";

import "@stream-io/video-react-sdk/dist/css/styles.css";
import {
  Call,
  CallControls,
  CallParticipantsList,
  SpeakerLayout,
  StreamCall,
  StreamTheme,
  StreamVideo,
  StreamVideoClient,
} from "@stream-io/video-react-sdk";
import { useSession } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import { Room } from "@/db/schema";

const apiKey = process.env.NEXT_PUBLIC_GET_STREAM_API_KEY!;
const token = "";

export const VideoPlayer = ({ room }: { room: Room }) => {
  const [client, setClient] = useState<StreamVideoClient | null>(null);
  const [call, setCall] = useState<Call | null>(null);

  const session = useSession();

  useEffect(() => {
    if (!room || !session.data) return;

    const userId = session.data.user.id;
    const client = new StreamVideoClient({
      apiKey,
      user: {
        id: userId,
      },
      token,
    });

    const call = client.call("default", room.id);
    call.join({ create: true });

    setClient(client);
    setCall(call);

    return () => {
      call.leave();
      client.disconnectUser();
    };
  }, [session, room]);

  return (
    client &&
    call && (
      <StreamVideo client={client}>
        <StreamTheme>
          <StreamCall call={call}>
            <SpeakerLayout />
            <CallControls />
          </StreamCall>
        </StreamTheme>
      </StreamVideo>
    )
  );
};
