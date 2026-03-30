"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'

const links = [
  { name: 'home', href: '/' },
  { name: 'services', href: '/services' },
  { name: 'resume', href: '/resume' },
  { name: 'work', href: '/work' },
  { name: 'contact', href: '/contact' },
]

const Nav = () => {
  const pathname = usePathname()
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.nav-link', {
        y: -16,
        opacity: 0,
        stagger: 0.07,
        duration: 0.55,
        ease: 'power3.out',
        delay: 0.5,
      })
    }, navRef)
    return () => ctx.revert()
  }, [])

  const handleEnter = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { y: -2, duration: 0.18, ease: 'power2.out' })
  }
  const handleLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { y: 0, duration: 0.45, ease: 'elastic.out(1, 0.5)' })
  }

  return (
    <nav ref={navRef} className="flex gap-8 items-center">
      {links.map((link, i) => {
        const isActive = link.href === pathname
        return (
          <Link
            key={i}
            href={link.href}
            onMouseEnter={handleEnter}
            onMouseLeave={handleLeave}
            className={`nav-link text-[10px] tracking-[2px] uppercase relative group inline-block
              transition-colors duration-200
              ${isActive ? 'text-accent' : 'text-white/35 hover:text-white'}`}
            style={{ display: 'inline-block' }}
          >
            {link.name}
            {/* Underline */}
            <span
              className={`absolute -bottom-1 left-0 h-px bg-accent transition-all duration-300
                ${isActive ? 'w-full' : 'w-0 group-hover:w-full'}`}
            />
          </Link>
        )
      })}
    </nav>
  )
}

export default Nav