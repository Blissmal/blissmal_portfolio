"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'
import gsap from 'gsap'

const links = [
  { name: 'Home', href: '/' },
  { name: 'Services', href: '/services' },
  { name: 'Resume', href: '/resume' },
  { name: 'Work', href: '/work' },
  { name: 'Contact', href: '/contact' },
]

const MobileNav = () => {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  // Close on route change
  useEffect(() => { setOpen(false) }, [pathname])

  // Prevent body scroll when open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Animate links when drawer opens
  useEffect(() => {
    if (open) {
      gsap.fromTo('.mob-link',
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, stagger: 0.07, duration: 0.4, ease: 'power3.out', delay: 0.1 }
      )
    }
  }, [open])

  return (
    <>
      {/* Hamburger */}
      <button
        onClick={() => setOpen(!open)}
        className="flex flex-col gap-1.25 cursor-pointer p-1 group"
        aria-label="Toggle menu"
      >
        <span
          className={`block h-px bg-accent transition-all duration-300 origin-left
            ${open ? 'w-6 rotate-42 translate-y-0' : 'w-6'}`}
        />
        <span
          className={`block h-px bg-accent/60 transition-all duration-300
            ${open ? 'opacity-0 -translate-x-2 w-4' : 'w-4 group-hover:w-6'}`}
        />
        <span
          className={`block h-px bg-accent transition-all duration-300 origin-left
            ${open ? 'w-6 -rotate-42' : 'w-5 group-hover:w-6'}`}
        />
      </button>

      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 z-30 bg-black/70 transition-opacity duration-300
          ${open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-75 z-40 flex flex-col
          border-l border-white/6 bg-[#0a0a0a]
          transition-transform duration-400 ease-in-out
          ${open ? 'translate-x-0' : 'translate-x-full'}`}
      >
        {/* Drawer header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/6">
          <Link href="/" className="text-[24px] uppercase tracking-[1px]"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
            Blissmal<span className="text-accent">.</span>
          </Link>
          <button
            onClick={() => setOpen(false)}
            className="w-8 h-8 flex flex-col gap-1.25 items-center justify-center"
          >
            <span className="block h-px w-5 bg-white/30 rotate-45 translate-y-0.75" />
            <span className="block h-px w-5 bg-white/30 -rotate-45 -translate-y-0.75" />
          </button>
        </div>

        {/* Links */}
        <nav className="flex flex-col px-8 py-8 gap-1 flex-1">
          {links.map((link, i) => {
            const isActive = link.href === pathname
            return (
              <Link
                key={i}
                href={link.href}
                onClick={() => setOpen(false)}
                className={`mob-link flex items-center justify-between py-4 border-b border-white/6
                  last:border-b-0 opacity-0 transition-colors duration-200
                  ${isActive ? 'text-accent' : 'text-white/30 hover:text-white'}`}
              >
                <span
                  className="text-[28px] uppercase tracking-[1px]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {link.name}
                </span>
                {isActive && (
                  <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Drawer footer */}
        <div className="px-8 py-6 border-t border-white/6">
          <Link
            href="/contact"
            onClick={() => setOpen(false)}
            className="block text-center text-[10px] tracking-[2px] uppercase text-accent border border-accent/30 py-3 transition-colors duration-300 hover:bg-accent hover:text-black"
          >
            Hire Me
          </Link>
        </div>
      </div>
    </>
  )
}

export default MobileNav