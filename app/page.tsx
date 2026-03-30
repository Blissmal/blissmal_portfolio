"use client"
import Photo from "@/components/Photo"
import Socials from "@/components/Socials"
import Stats from "@/components/Stats"
import { Button } from "@/components/ui/button"
import { FiDownload } from "react-icons/fi"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import Link from "next/link"

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLSpanElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const paraRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const lineRef = useRef<HTMLDivElement>(null)
  const indexRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } })

      // Vertical line draw
      tl.fromTo(lineRef.current,
        { scaleY: 0, transformOrigin: "top center" },
        { scaleY: 1, duration: 1, ease: "power3.inOut", delay: 0.2 }
      )
      .fromTo(subtitleRef.current,
        { opacity: 0, x: -24, letterSpacing: "0.3em" },
        { opacity: 1, x: 0, letterSpacing: "0.15em", duration: 0.7 },
        "-=0.5"
      )
      .fromTo(h1Ref.current?.querySelectorAll(".line-word") ?? [],
        { opacity: 0, y: 60, skewY: 4 },
        { opacity: 1, y: 0, skewY: 0, stagger: 0.1, duration: 0.9 },
        "-=0.4"
      )
      .fromTo(paraRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.6 },
        "-=0.5"
      )
      .fromTo(actionsRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.4"
      )
      .fromTo(indexRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 0.6 },
        "-=0.3"
      )

      // Cursor blink
      if (subtitleRef.current) {
        const cursor = document.createElement("span")
        cursor.textContent = "_"
        cursor.style.cssText = "color: #00ff99; margin-left: 2px; font-weight: 300;"
        subtitleRef.current.appendChild(cursor)
        gsap.to(cursor, { opacity: 0, duration: 0.6, repeat: -1, yoyo: true, ease: "steps(1)" })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="min-h-screen flex flex-col justify-center relative z-10 overflow-hidden" ref={heroRef}>
      {/* Background grid lines */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)`,
        backgroundSize: "80px 80px"
      }} />

      {/* Top horizontal rule */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />

      <div className="container mx-auto px-6 xl:px-12 max-w-6xl">
        <div className="flex flex-col xl:flex-row items-center xl:items-stretch justify-between gap-12 xl:gap-0 py-16 xl:py-0">

          {/* Left: Text content */}
          <div className="flex xl:flex-row gap-0 xl:gap-10 order-2 xl:order-1 flex-1">
            {/* Vertical accent line + index */}
            <div className="hidden xl:flex flex-col items-center gap-4 pt-2 mr-2">
              <div
                ref={lineRef}
                className="w-px flex-1 max-h-[320px]"
                style={{ background: "linear-gradient(to bottom, #00ff99, rgba(0,255,153,0.1))" }}
              />
              <div ref={indexRef} className="text-[10px] tracking-[3px] text-white/20 uppercase rotate-90 origin-center whitespace-nowrap mt-4">
                Portfolio 2025
              </div>
            </div>

            {/* Main text */}
            <div className="text-center xl:text-left flex flex-col justify-center">
              <span
                ref={subtitleRef}
                className="inline-block text-xs tracking-[0.15em] text-accent/70 font-mono uppercase mb-6 opacity-0"
              >
                Software Developer
              </span>

              <h1 ref={h1Ref} className="mb-7 overflow-hidden">
                <span className="line-word block text-[56px] xl:text-[80px] leading-[0.9] font-black uppercase tracking-tight opacity-0"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Hello I'm
                </span>
                <span className="line-word block text-[56px] xl:text-[80px] leading-[0.9] font-black uppercase tracking-tight text-accent opacity-0"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Bethuel
                </span>
                <span className="line-word block text-[56px] xl:text-[80px] leading-[0.9] font-black uppercase tracking-tight opacity-0"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                  Maluti
                </span>
              </h1>

              <p ref={paraRef} className="max-w-[440px] mb-10 text-sm text-white/50 leading-relaxed font-light opacity-0">
                I build digital experiences that are both functional and beautiful —
                from full-stack web apps to intelligent AI systems.
              </p>

              <div ref={actionsRef} className="flex flex-col xl:flex-row items-center xl:items-start gap-6 opacity-0">
                <button className="group relative px-10 py-4 overflow-hidden uppercase tracking-[2px] text-xs font-medium border border-accent text-accent transition-all duration-300 hover:text-black">
                  <span className="relative z-10 flex items-center gap-3">
                    Download CV
                    <FiDownload className="text-base group-hover:translate-y-0.5 transition-transform duration-300" />
                  </span>
                  <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </button>

                <div className="flex items-center gap-2">
                  <div className="h-px w-8 bg-accent/30" />
                  <Socials
                    containerStyles="flex gap-4"
                    iconStyles="w-9 h-9 border border-white/10 flex justify-center items-center text-white/40 hover:border-accent hover:text-accent transition-all duration-300 hover:shadow-[0_0_12px_rgba(0,255,153,0.3)]"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right: Photo */}
          <div className="order-1 xl:order-2 xl:self-center">
            <Photo />
          </div>
        </div>
      </div>

      <Stats />

      {/* Bottom horizontal rule */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
    </section>
  )
}

export default Home