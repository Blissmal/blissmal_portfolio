"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useRef } from "react"
import gsap from "gsap"

const links = [
  { name: "home", href: "/" },
  { name: "services", href: "/services" },
  { name: "resume", href: "/resume" },
  { name: "work", href: "/work" },
  { name: "contact", href: "/contact" },
]

const Nav = () => {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".nav-link", {
        y: -20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.6,
        ease: "power3.out",
        delay: 0.6,
      })
    }, navRef)
    return () => ctx.revert()
  }, [])

  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { y: -3, duration: 0.2, ease: "power2.out" })
  }
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { y: 0, duration: 0.4, ease: "elastic.out(1, 0.5)" })
  }

  return (
    <nav ref={navRef} className="flex gap-8">
      {links.map((link, index) => (
        <Link
          key={index}
          href={link.href}
          className={`nav-link capitalize font-medium transition-colors duration-300 relative group/nl
            ${link.href === pathname ? "text-accent" : "hover:text-accent"}`}
          onMouseEnter={handleEnter}
          onMouseLeave={handleLeave}
          style={{ display: "inline-block" }}
        >
          {link.name}
          <span
            className={`absolute -bottom-1 left-0 h-[2px] bg-accent transition-all duration-300
              ${link.href === pathname ? "w-full" : "w-0 group-hover/nl:w-full"}`}
          />
        </Link>
      ))}
    </nav>
  )
}

export default Nav