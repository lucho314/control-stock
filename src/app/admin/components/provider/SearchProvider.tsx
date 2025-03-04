"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

export const SearchProvider = ({
  search = "",
  urlPush = "",
}: {
  search: string | undefined;
  urlPush: string;
}) => {
  const router = useRouter();

  const [text, setText] = useState(search);
  const [query] = useDebounce(text, 500);

  useEffect(() => {
    if (!query) {
      router.push(urlPush);
    } else {
      router.push(`${urlPush}?q=${query}`);
    }
  }, [query, router, urlPush]);

  return (
    <div className="relative mb-4">
      <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
      <Input
        placeholder="Buscar..."
        className="pl-8 w-full"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
    </div>
  );
};
