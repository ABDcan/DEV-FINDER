"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { SearchIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const searchFormSchema = z.object({
  search: z.string().min(0).max(50),
});

export const SearchBar = () => {
  const router = useRouter();
  const query = useSearchParams();

  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      search: query.get("search") ?? "",
    },
  });

  const onSubmit = async (values: z.infer<typeof searchFormSchema>) => {
    if (values.search) router.push(`/search?q=${values.search}`);
    else router.push("/");
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-2">
        <FormField
          control={form.control}
          name="search"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Filter rooms by keywords..."
                  {...field}
                  className="w-[440px]"
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit">
          <SearchIcon className="h-5 w-5 mr-2" />
          Search
        </Button>

        {query.get("search") && (
          <Button
            variant="link"
            onClick={() => {
              form.setValue("search", "");
              router.push("/");
            }}
          >
            Clear
          </Button>
        )}
      </form>
    </Form>
  );
};
