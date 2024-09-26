"use client";

import { Button } from "@/components/ui/button";

import { Menu } from "lucide-react";

const toggleVisibility = () => {
  const asideMenu = document.getElementById("aside-menu");

  if (asideMenu?.classList.contains("hidden")) {
    asideMenu.classList.remove("hidden");
    asideMenu.classList.add("block");
  } else {
    asideMenu?.classList.remove("block");
    asideMenu?.classList.add("hidden");
  }
};

const ButtonAside = () => {
  return (
    <Button variant="ghost" size="icon" onClick={toggleVisibility} className="">
      <Menu className="h-6 w-6" />
    </Button>
  );
};

export default ButtonAside;
