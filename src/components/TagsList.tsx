import React from "react";

import { Badge } from "./ui/badge";

export const TagsList = ({ tags }: { tags: string[] }) => {
  return (
    <div className="flex gap-1 flex-wrap">
      {tags.map((tag) => (
        <Badge className="w-fit" key={tag}>
          {tag}
        </Badge>
      ))}
    </div>
  );
};
