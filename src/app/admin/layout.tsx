import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  Settings,
  LogOut,
  Menu,
  Bell,
  Search,
} from "lucide-react";
import ButtonAside from "./components/button-aside";
import NavMenu from "./components/nav-menu";

const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <ButtonAside />
              <Link href="/" className="text-xl font-bold">
                Panel Admin
              </Link>
            </div>
            <div className="flex items-center space-x-4">
              <form className="hidden md:block">
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Buscar..." className="pl-8 w-64" />
                </div>
              </form>
              <Button variant="ghost" size="icon">
                <Bell className="h-5 w-5" />
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-8 w-8 rounded-full"
                  >
                    <Avatar className="h-8 w-8">
                      <AvatarImage
                        src="/placeholder.svg?height=32&width=32"
                        alt="Avatar"
                      />
                      <AvatarFallback>AD</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Admin</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        admin@example.com
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Configuración</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Cerrar sesión</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>
      <div className="flex flex-1">
        {/* Sidebar */}
        <NavMenu />
        {children}
      </div>
      {/* Footer */}
      <footer className="bg-gray-100 border-t">
        <div className="container mx-auto px-4 py-4">
          <p className="text-center text-sm text-gray-600">
            © 2024 Panel de Administración. Todos los derechos reservados.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default layout;
