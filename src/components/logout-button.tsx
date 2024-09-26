"use client";
import { logout } from "@/actions";
import { Button } from "@/components/ui/button";
import { User } from "lucide-react";

const LogoutButton = () => {
  const handleClick = async () => {
    await logout();
  };
  return (
    <Button variant="outline" onClick={handleClick}>
      <User className="mr-2 h-4 w-4" /> Cerrar sesión
    </Button>
  );
};

export default LogoutButton;
