"use client";

import { useRouter } from "next/navigation";

import { cn } from "@/lib/utils";
import { badgeVariants } from "./ui/badge";

export const TagsList = ({ tags }: { tags: string[] }) => {
  const router = useRouter();

  return (
    <div className="flex gap-1 flex-wrap">
      {tags.map((tag) => (
        <button
          className={cn(badgeVariants())}
          key={tag}
          onClick={() => {
            router.push(`/?search=${tag}`);
          }}
        >
          {tag}
        </button>
      ))}
    </div>
  );
};
