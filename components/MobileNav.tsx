"use client"

import { usePathname } from "next/navigation"
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "./ui/sheet"
import Link from "next/link"
import { CiMenuFries } from "react-icons/ci"
import { useEffect, useRef } from "react"
import gsap from "gsap"

const links = [
    { name: "home", href: "/" },
    { name: "services", href: "/services" },
    { name: "resume", href: "/resume" },
    { name: "work", href: "/work" },
    { name: "contact", href: "/contact" },
]

const MobileNav = () => {
    const pathname = usePathname()
    const contentRef = useRef<HTMLDivElement>(null)
    const navRef = useRef<HTMLDivElement>(null)

    // Animate on sheet open
    useEffect(() => {
        const ctx = gsap.context(() => {
            const logo = contentRef.current?.querySelector(".mobile-logo")
            const navItems = navRef.current?.querySelectorAll(".mobile-nav-item")

            if (logo) {
                gsap.fromTo(logo, 
                    { opacity: 0, y: -20 },
                    { opacity: 1, y: 0, duration: 0.5, ease: "power3.out" }
                )
            }

            if (navItems) {
                gsap.fromTo(navItems,
                    { opacity: 0, x: -30 },
                    { opacity: 1, x: 0, stagger: 0.08, duration: 0.5, ease: "power3.out", delay: 0.2 }
                )
            }
        })

        return () => ctx.revert()
    }, [])

    return (
        <nav>
            <Sheet>
                <SheetTrigger className="flex justify-center items-center hover:text-accent transition-colors duration-300 group">
                    <CiMenuFries className="text-[32px] text-accent group-hover:scale-110 transition-transform duration-300" />
                </SheetTrigger>
                <SheetContent className="flex flex-col bg-[#1a1a1f] border-l border-white/[0.06] p-0">
                    {/* Logo section */}
                    <div ref={contentRef} className="mobile-logo mt-8 px-6 py-10 border-b border-white/[0.06]">
                        <Link href="/" className="group block">
                            <h1 className="text-4xl font-semibold tracking-wider group-hover:text-accent transition-colors duration-300"
                                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                            >
                                Blissmal<span className="text-accent">.</span>
                            </h1>
                            <p className="text-xs tracking-[2px] uppercase text-white/30 mt-2 group-hover:text-white/50 transition-colors duration-300">
                                Full Stack Developer
                            </p>
                        </Link>
                    </div>

                    {/* Navigation links */}
                    <nav ref={navRef} className="flex flex-col flex-1 justify-start gap-0 px-6 pt-8">
                        {links.map((link, index) => {
                            const isActive = pathname === link.href
                            return (
                                <SheetClose key={index} asChild>
                                    <Link
                                        href={link.href}
                                        className={`mobile-nav-item group relative px-4 py-4 capitalize text-lg tracking-wide transition-all duration-300 ${
                                            isActive
                                                ? "text-accent"
                                                : "text-white/50 hover:text-white/80"
                                        }`}
                                    >
                                        {/* Accent bar on active */}
                                        {isActive && (
                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-8 bg-accent" />
                                        )}
                                        
                                        <span className={isActive ? "ml-3" : "group-hover:ml-2 transition-all duration-300"}>
                                            {link.name}
                                        </span>

                                        {/* Hover underline */}
                                        {!isActive && (
                                            <span className="absolute bottom-2 left-4 h-[1px] w-0 bg-accent/60 group-hover:w-[calc(100%-2rem)] transition-all duration-300" />
                                        )}
                                    </Link>
                                </SheetClose>
                            )
                        })}
                    </nav>

                    {/* Footer info */}
                    <div className="px-6 py-8 border-t border-white/[0.06] space-y-3">
                        <p className="text-xs tracking-[2px] uppercase text-white/30">Contact</p>
                        <a 
                            href="mailto:malutibethuel@gmail.com"
                            className="text-sm text-accent hover:text-white transition-colors duration-300 block break-all"
                        >
                            malutibethuel@gmail.com
                        </a>
                        <a 
                            href="tel:+254706845000"
                            className="text-sm text-accent hover:text-white transition-colors duration-300 block"
                        >
                            (+254) 706 845 000
                        </a>
                    </div>
                </SheetContent>
            </Sheet>
        </nav>
    )
}

export default MobileNav