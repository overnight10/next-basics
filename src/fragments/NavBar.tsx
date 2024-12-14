import {
    NavigationMenu,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
} from "@/components/ui/navigation-menu"

const links: { title: string, href: string }[] = [
    { title: "Home", href: "/" },
    { title: "Cats", href: "/cats" }
];

export default function NavBar() {
    return (
        <NavigationMenu>
            <NavigationMenuList className="flex flex-1 items-center justify-center gap-4 px-4 py-8">
                {links.map((link) => (
                    <NavigationMenuItem key={link.href}>
                        <NavigationMenuLink
                            href={link.href}
                            className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                        >
                            {link.title}
                        </NavigationMenuLink>
                    </NavigationMenuItem>
                ))}
            </NavigationMenuList>
        </NavigationMenu>
    );
}