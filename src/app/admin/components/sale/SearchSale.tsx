"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";

export const SearchSale = () => {
  const [text, setText] = useState("");
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
