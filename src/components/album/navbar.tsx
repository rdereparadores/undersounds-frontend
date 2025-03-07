import { Input } from "@/components/ui/input"
import {MenuIcon, Search} from "lucide-react"
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button.tsx";
import {NavigationMenu, NavigationMenuList, NavigationMenuLink, NavigationMenuContent, NavigationMenuItem, NavigationMenuTrigger} from "@/components/ui/navigation-menu.tsx";
import {cn} from "@/lib/utils.ts";
import * as React from "react";

const avatarMenu: { title: string; href: string;}[] = [
    {
        title: "Perfil",
        href: "#",
    },
    {
        title: "Mis Canciones",
        href: "#",
    },
    {
        title: "Mis Álbumes",
        href: "#",
    },
    {
        title: "Estadísticas",
        href: "#",
    },
    {
        title: "Mis Compras",
        href: "#",
    },
    {
        title: "Cerrar Sesión",
        href: "#",
    },

]

export function Navbar(){
  return (
    <header className="bg-black/30 backdrop-blur-sm p-2 flex items-center justify-around rounded-xl">
      <div className="bg-black/30 rounded-lg px-4 py-2">
        <h1 className="text-black font-bold text-xl leading-none">
          Under
          <br />
          Sounds
        </h1>
      </div>

      <div className="relative flex-1 max-w-xl mx-4 hidden md:block">
        <div className="relative flex items-center">
          <Input
            type="text"
            placeholder="Buscar..."
            className="w-full bg-[#d9d9d9]/30 border-none text-gray-800 pr-10"
          />
          <Search className="absolute right-3 w-5 h-5 text-gray-800" />
        </div>
      </div>

      <nav className="hidden md:flex items-center gap-8 mr-4">
        <a href="#" className="text-black hover:text-gray-300">
          Tienda
        </a>
        <a href="#" className="text-black hover:text-gray-300">
          Que incluye
        </a>
        <a href="#" className="text-black hover:text-gray-300">
          Descargas
        </a>
      </nav>

      <div className="md:hidden h-6 w-6 text-black content-center">
          <DropdownMenu>
              <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="text-black bg-black/30" size="default">
                      <MenuIcon />
                  </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black/80 text-white">
                <DropdownMenuItem>Tienda</DropdownMenuItem>
                <DropdownMenuItem>Que incluye</DropdownMenuItem>
                <DropdownMenuItem>Descargas</DropdownMenuItem>
              </DropdownMenuContent>
          </DropdownMenu>
      </div>
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger className="bg-black/30 hover:bg-gray-500 data-[state=open]:bg-black/20 data-[state=open]:text-black">
                        <img
                            src="src/assets/Avatar.png"
                            alt="User"
                            className="h-full w-full rounded-full overflow-hidden" />
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                        <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] lg:w-[600px] text-white bg-black/80 z-50">
                            {avatarMenu.map((component) => (
                                <ListItem
                                    key={component.title}
                                    title={component.title}
                                    href={component.href}
                                >
                                </ListItem>
                            ))}
                        </ul>
                    </NavigationMenuContent>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    </header>
  )
}

const ListItem = React.forwardRef<
    HTMLAnchorElement,
    React.ComponentPropsWithoutRef<'a'>
>(({ className, title, children, ...props }, ref) => {
    return (
        <li>
            <NavigationMenuLink asChild>
                <a
                    ref={ref as React.ForwardedRef<HTMLAnchorElement>}
                    className={cn(
                        'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-500 hover:text-accent-foreground focus:bg-gray-500 focus:text-accent-foreground',
                        className
                    )}
                    {...props}
                >
                    <div className="text-sm font-medium leading-none">{title}</div>
                    <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
                        {children}
                    </p>
                </a>
            </NavigationMenuLink>
        </li>
    );
});
ListItem.displayName = "ListItem"

