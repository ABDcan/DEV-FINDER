"use client";

import { z } from "zod";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { editRoomAction } from "./actions";
import { Room } from "@/db/schema";

const editRoomSchema = z.object({
  name: z.string().min(1).max(50),
  description: z.string().min(1).max(50),
  githubRepo: z.string().min(1).max(50),
  tags: z.string().min(1).max(50),
});

type Props = {
  roomId: string;
  room: Room;
};

export const EditRoomForm = ({ roomId, room }: Props) => {
  const router = useRouter();

  const form = useForm<z.infer<typeof editRoomSchema>>({
    resolver: zodResolver(editRoomSchema),
    defaultValues: {
      name: room.name ?? "",
      description: room.description ?? "",
      githubRepo: room.githubRepo ?? "",
      tags: room.tags ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof editRoomSchema>) => {
    await editRoomAction({ ...values, id: roomId });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>

              <FormControl>
                <Input placeholder="React coders" {...field} />
              </FormControl>

              <FormDescription>
                This will be your public room name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>

              <FormControl>
                <Input
                  placeholder="Hi, let's join this room and code a react app together :)"
                  {...field}
                />
              </FormControl>

              <FormDescription>
                Please write a short description for this room
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="githubRepo"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Github Repo</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  placeholder="https://github.com/ahoang2502/miro-cl"
                />
              </FormControl>
              <FormDescription>
                Please put a link to the project you are working on
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tags</FormLabel>
              <FormControl>
                <Input {...field} placeholder="typescript, nextjs, tailwind" />
              </FormControl>
              <FormDescription>
                List your programming languages, frameworks, libraries so people
                can find you content
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};
