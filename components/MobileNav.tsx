"use client"

import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet"
import Link from "next/link"
import { CiMenuFries } from "react-icons/ci"

const links = [
    { name: "home", href: "/" },
    { name: "services", href: "/services" },
    { name: "resume", href: "/resume" },
    { name: "work", href: "/work" },
    { name: "contact", href: "/contact" },
]

const MobileNav = () => {
    const pathname = usePathname();
    return (
        <nav>
            <Sheet>
                <SheetTrigger className="flex justify-center items-center">
                    <CiMenuFries className="text-[32px] text-accent" />
                </SheetTrigger>
                <SheetContent className="flex flex-col">
                    <div className="mt-32 mb-40 text-center text-2xl">
                        <Link href="/">
                            <h1 className="text-4xl font-semibold">Blissmal<span className="text-accent">.</span></h1>
                        </Link></div>
                    <nav className="flex flex-col items-center justify-center gap-8">
                        {links.map((link, index) => {
                            return (
                                <Link
                                    key={index}
                                    href={link.href}
                                    className={`${pathname === link.href
                                        && 'text-accent border-b-2 border-accent'
                                        } capitalize text-xl hover:text-accent transition-all`}
                                >
                                    {link.name}
                                </Link>
                            );
                        })}
                    </nav>
                </SheetContent>
            </Sheet>
        </nav>
    )
}

export default MobileNav