import { auth } from "@/auth.config";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ShoppingCart, User } from "lucide-react";
import LogoutButton from "./logout-button";

const Header = async () => {
  const session = await auth();
  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold">
          Control de stock
        </Link>
        <NavigationMenu>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Categorías</NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid gap-3 p-4 md:w-[400px] lg:w-[500px] lg:grid-cols-[.75fr_1fr]">
                  <li className="row-span-3">
                    <NavigationMenuLink asChild>
                      <a
                        className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <ShoppingCart className="h-6 w-6" />
                        <div className="mb-2 mt-4 text-lg font-medium">
                          Todas las categorías
                        </div>
                        <p className="text-sm leading-tight text-muted-foreground">
                          Explora todos nuestros productos
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/"
                      >
                        <div className="text-sm font-medium leading-none">
                          Electrónica
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Gadgets y dispositivos electrónicos
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/"
                      >
                        <div className="text-sm font-medium leading-none">
                          Insumos
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Insumo, insumo, etc
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                  <li>
                    <NavigationMenuLink asChild>
                      <a
                        className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                        href="/"
                      >
                        <div className="text-sm font-medium leading-none">
                          Repuestos
                        </div>
                        <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                          Repuesto, repuesto, etc
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/ofertas" legacyBehavior passHref>
                <NavigationMenuLink className="font-medium">
                  Ofertas
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/contacto" legacyBehavior passHref>
                <NavigationMenuLink className="font-medium">
                  Contacto
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
        {!session ? (
          <>
            <Link href="/auth/login">
              <Button variant="outline">
                <User className="mr-2 h-4 w-4" /> Login
              </Button>
            </Link>
          </>
        ) : (
          <LogoutButton />
        )}
      </div>
    </header>
  );
};

export default Header;
