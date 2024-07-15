import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { AlignJustifyIcon, Menu } from "lucide-react";
import { Link } from "@inertiajs/react";
import { MenuItemProp } from "@/types";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { DropdownMenuSeparator } from "./ui/dropdown-menu";

const MobileMenu = ({ links }: { links: MenuItemProp[] }) => {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle navigation menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side="left" className="flex flex-col">
                <nav className="text-lg font-medium">
                    <Link
                        href="#"
                        className="flex items-center gap-2 text-lg font-semibold mb-4"
                    >
                        <ApplicationLogo className="h-8 w-8 fill-current text-gray-500" />

                        <span>Acme Inc</span>
                    </Link>

                    <DropdownMenuSeparator />

                    <div className="space-y-2">
                        {links.map((link, index) => (
                            <MobileMenuItem key={index} link={link} />
                        ))}
                    </div>
                </nav>
            </SheetContent>
        </Sheet>
    );
};

const MobileMenuItem = ({ link }: { link: MenuItemProp }) => {
    const Icon = (link.icon ?? AlignJustifyIcon) as React.ElementType;

    return (
        <Link
            href={link.href}
            className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
        >
            <Icon className="h-5 w-5" />
            {link.title}
        </Link>
    );
};

export default MobileMenu;
