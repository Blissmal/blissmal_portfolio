"use client"
import Link from 'next/link'
import React, { useEffect, useRef } from 'react'
import Nav from './Nav'
import MobileNav from './MobileNav'
import gsap from 'gsap'

const Header = () => {
  const headerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline()
      tl.fromTo('.header-status',
        { opacity: 0 },
        { opacity: 1, duration: 0.5, ease: 'power2.out' }
      )
      tl.fromTo(headerRef.current,
        { y: -60, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: 'power3.out' },
        '-=0.2'
      )
    })
    return () => ctx.revert()
  }, [])

  const handleLogoMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const dx = (e.clientX - (rect.left + rect.width / 2)) * 0.22
    const dy = (e.clientY - (rect.top + rect.height / 2)) * 0.22
    gsap.to(e.currentTarget, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' })
  }
  const handleLogoLeave = (e: React.MouseEvent<HTMLAnchorElement>) => {
    gsap.to(e.currentTarget, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' })
  }

  return (
    <>
      {/* Status bar */}
      {/* <div className="header-status border-b border-white/[0.05] px-6 xl:px-12 py-2 flex items-center justify-between opacity-0">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-accent shadow-[0_0_6px_#00ff99]" />
          <span className="text-[10px] tracking-[2px] uppercase text-white/25 font-mono">
            Available for work
          </span>
        </div>
        <span className="text-[10px] tracking-[2px] uppercase text-white/15 font-mono hidden md:block">
          Portfolio 2026
        </span>
      </div> */}

      {/* Main header */}
      <header ref={headerRef} className="border-b border-white/5 py-5 xl:py-7 relative z-20">
        <div className="container mx-auto px-6 xl:px-12 max-w-6xl flex justify-between items-center">

          <Link
            href="/"
            onMouseMove={handleLogoMove}
            onMouseLeave={handleLogoLeave}
            className="inline-block"
          >
            <h1
              className="text-[30px] leading-none tracking-[1px] uppercase cursor-none select-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Blissmal
              <span className="text-accent transition-all duration-300 hover:drop-shadow-[0_0_8px_#00ff99]">
                .
              </span>
            </h1>
          </Link>

          {/* Desktop */}
          <div className="hidden xl:flex items-center gap-10">
            <Nav />
            <Link
              href="/contact"
              className="relative overflow-hidden group text-[10px] tracking-[2px] uppercase text-accent border border-accent/35 px-5 py-3 transition-colors duration-300 hover:text-black"
            >
              <span className="relative z-10">Hire Me</span>
              <span className="absolute inset-0 bg-accent translate-x-[-101%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
            </Link>
          </div>

          {/* Mobile */}
          <div className="xl:hidden">
            <MobileNav />
          </div>
        </div>
      </header>
    </>
  )
}

export default Header