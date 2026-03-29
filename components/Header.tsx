"use client"
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import Nav from './Nav'
import { Button } from './ui/button'
import MobileNav from './MobileNav'
import gsap from 'gsap'

const Header = () => {
  const headerRef = useRef<HTMLElement>(null)
  const logoRef = useRef<HTMLAnchorElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        headerRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", delay: 0.2 }
      )
    })
    return () => ctx.revert()
  }, [])

  // Magnetic logo effect
  const handleLogoMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const cx = rect.left + rect.width / 2
    const cy = rect.top + rect.height / 2
    const dx = (e.clientX - cx) * 0.25
    const dy = (e.clientY - cy) * 0.25
    gsap.to(e.currentTarget, { x: dx, y: dy, duration: 0.3, ease: "power2.out" })
  }
  const handleLogoLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.4)" })
  }

  return (
    <header ref={headerRef} className="py-8 xl:py-12 relative z-20">
      <div className="container mx-auto flex justify-between items-center">
        <Link
          href="/"
          ref={logoRef}
          onMouseMove={handleLogoMove}
          onMouseLeave={handleLogoLeave}
          style={{ display: "inline-block" }}
        >
          <h1 className="text-4xl font-semibold group cursor-none">
            Blissmal<span className="text-accent transition-all duration-300 group-hover:drop-shadow-[0_0_8px_#00ff99]">.</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden xl:flex items-center gap-8">
          <Nav />
          <Link href="/contact">
            <Button className="relative overflow-hidden group/btn">
              <span className="relative z-10 transition-colors duration-300 group-hover/btn:text-primary">Hire Me</span>
              <span className="absolute inset-0 bg-accent scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 origin-left rounded-sm" />
            </Button>
          </Link>
        </div>
        {/* Mobile Nav */}
        <div className="xl:hidden">
          <MobileNav />
        </div>
      </div>
    </header>
  )
}

export default Header