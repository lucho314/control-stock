"use client";

import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Factory,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";

const NavMenu = () => {
  const pathname = usePathname();
  const menuSelect = pathname.trim().split("/").at(-1);

  return (
    <aside className={`bg-gray-100 w-64 min-h-screen block`} id="aside-menu">
      <nav className="p-4 space-y-2">
        <Link href="/admin/dashboard">
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              menuSelect == "dashboard" && "bg-blue-200"
            } hover:bg-blue-400`}
          >
            <LayoutDashboard className="mr-2 h-4 w-4" />
            Administración
          </Button>
        </Link>
        <Link href="/admin/productos">
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              menuSelect == "productos" && "bg-blue-200"
            } hover:bg-blue-400`}
          >
            <Package className="mr-2 h-4 w-4" />
            Productos
          </Button>
        </Link>
        <Button
          variant="ghost"
          className={`w-full justify-start ${
            menuSelect == "ventas" && "bg-blue-200"
          } hover:bg-blue-400`}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Ventas
        </Button>
        <Button
          variant="ghost"
          className={`w-full justify-start ${
            menuSelect == "clientes" && "bg-blue-200"
          } hover:bg-blue-400`}
        >
          <Users className="mr-2 h-4 w-4" />
          Clientes
        </Button>
        <Link href="/admin/provider">
          <Button
            variant="ghost"
            className={`w-full justify-start ${
              menuSelect == "clientes" && "bg-blue-200"
            } hover:bg-blue-400`}
          >
            <Factory className="mr-2 h-4 w-4" />
            Proveedores
          </Button>
        </Link>
      </nav>
    </aside>
  );
};

export default NavMenu;
