"use client"
import Photo from "@/components/Photo"
import Socials from "@/components/Socials"
import Stats from "@/components/Stats"
import { FiDownload } from "react-icons/fi"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import Link from "next/link"

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const vlineRef = useRef<HTMLDivElement>(null)
  const vlineLabelRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLSpanElement>(null)
  const subtitleRef = useRef<HTMLDivElement>(null)
  const nameRef = useRef<HTMLDivElement>(null)
  const paraRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)
  const photoRef = useRef<HTMLDivElement>(null)
  const statsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set([subtitleRef.current, paraRef.current, actionsRef.current, statsRef.current], {
        opacity: 0, y: 18,
      })
      gsap.set(nameRef.current?.querySelectorAll('.name-line') ?? [], {
        opacity: 0, y: 52, skewY: 2,
      })
      gsap.set(vlineRef.current, { scaleY: 0, transformOrigin: 'top center' })
      gsap.set([vlineLabelRef.current, dotRef.current], { opacity: 0 })
      gsap.set(photoRef.current, { opacity: 0, x: 24 })

      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

      tl.to(vlineRef.current, { scaleY: 1, duration: 1.1, ease: 'power3.inOut' })
        .to(dotRef.current, { opacity: 1, duration: 0.4 }, '-=0.6')
        .to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.65 }, '-=0.5')
        .to(
          nameRef.current?.querySelectorAll('.name-line') ?? [],
          { opacity: 1, y: 0, skewY: 0, stagger: 0.1, duration: 0.9 },
          '-=0.45'
        )
        .to(paraRef.current, { opacity: 1, y: 0, duration: 0.6 }, '-=0.55')
        .to(actionsRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.45')
        .to(photoRef.current, { opacity: 1, x: 0, duration: 0.8, ease: 'power3.out' }, '-=0.7')
        .to(vlineLabelRef.current, { opacity: 1, duration: 0.5 }, '-=0.3')
        .to(statsRef.current, { opacity: 1, y: 0, duration: 0.5 }, '-=0.3')

      if (subtitleRef.current) {
        const cursor = document.createElement('span')
        cursor.textContent = '_'
        cursor.style.cssText = 'color:#00ff99;margin-left:2px;font-weight:300;font-family:monospace'
        subtitleRef.current.appendChild(cursor)
        gsap.to(cursor, { opacity: 0, duration: 0.55, repeat: -1, yoyo: true, ease: 'steps(1)' })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      className="min-h-screen flex flex-col justify-center relative z-10 overflow-hidden"
      ref={heroRef}
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.013) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.013) 1px, transparent 1px)`,
          backgroundSize: '72px 72px',
        }}
      />

      {/* Top rule */}
      <div
        className="absolute top-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(0,255,153,0.3), transparent)' }}
      />

      <div className="container mx-auto px-6 xl:px-12 max-w-6xl">
        <div className="flex flex-col xl:flex-row items-center justify-between gap-12 xl:gap-0 py-16 xl:py-0">

          {/* Left: text */}
          <div className="flex gap-8 xl:gap-10 order-2 xl:order-1 flex-1 items-stretch">

            {/* Vertical accent line */}
            <div className="hidden xl:flex flex-col items-center shrink-0">
              <div
                ref={vlineRef}
                className="w-px"
                style={{
                  height: '200px',
                  background: 'linear-gradient(to bottom, #00ff99, rgba(0,255,153,0.04))',
                }}
              />
              <div
                ref={vlineLabelRef}
                className="text-[9px] tracking-[3px] uppercase font-mono mt-4 whitespace-nowrap"
                style={{ color: 'rgba(255,255,255,0.18)', writingMode: 'vertical-rl' }}
              >
                Portfolio 2026
              </div>
            </div>

            {/* Text block */}
            <div className="flex flex-col justify-center text-center xl:text-left">

              {/* Subtitle */}
              <div
                ref={subtitleRef}
                className="flex items-center gap-3 justify-center xl:justify-start mb-6"
              >
                {/* <span
                  ref={dotRef}
                  className="w-1.5 h-1.5 rounded-full shrink-0"
                  style={{ background: '#00ff99', boxShadow: '0 0 8px #00ff99' }}
                /> */}
                <span
                  className="text-[10px] tracking-[4px] uppercase font-mono"
                  style={{ color: 'rgba(0,255,153,0.65)' }}
                >
                  Software Developer
                </span>
              </div>

              {/* Name */}
              <div ref={nameRef} className="mb-7 overflow-hidden" style={{ lineHeight: '0.92' }}>
                <span
                  className="name-line block text-[52px] xl:text-[80px] uppercase tracking-[2px]"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", lineHeight: '0.92' }}
                >
                  Hello I'm
                </span>
                <span
                  className="name-line block text-[52px] xl:text-[80px] uppercase tracking-[2px] text-accent"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", lineHeight: '0.92' }}
                >
                  Bethuel
                </span>
                <span
                  className="name-line block text-[52px] xl:text-[80px] uppercase tracking-[2px]"
                  style={{
                    fontFamily: "'Bebas Neue', sans-serif",
                    lineHeight: '0.92',
                    WebkitTextStroke: '1px rgba(255,255,255,0.2)',
                    color: 'transparent',
                  }}
                >
                  Maluti
                </span>
              </div>

              {/* Description */}
              <p
                ref={paraRef}
                className="text-sm leading-relaxed font-light mb-10 max-w-md mx-auto xl:mx-0"
                style={{ color: 'rgba(255,255,255,0.42)' }}
              >
                I build digital experiences that are both functional and beautiful —
                from full-stack web apps to intelligent AI systems.
              </p>

              {/* Actions */}
              <div
                ref={actionsRef}
                className="flex flex-col xl:flex-row items-center xl:items-start gap-5"
              >
                <Link
                  href="/assets/resume/bethuelsResume.pdf"
                  target="_blank"
                  download
                  className="relative overflow-hidden group text-[10px] tracking-[2.5px] uppercase border px-7 py-3.5 transition-colors duration-300 hover:text-black flex items-center gap-3 shrink-0"
                  style={{ borderColor: 'rgba(0,255,153,0.45)', color: '#00ff99' }}
                >
                  <span className="relative z-10 flex items-center gap-3">
                    Download CV
                    <FiDownload className="text-sm group-hover:translate-y-0.5 transition-transform duration-300" />
                  </span>
                  <span className="absolute inset-0 bg-accent translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </Link>

                <div className="flex items-center gap-3">
                  <div className="h-px w-7" style={{ background: 'rgba(0,255,153,0.25)' }} />
                  <Socials
                    containerStyles="flex gap-2"
                    iconStyles="w-9 h-9 border border-white/10 flex justify-center items-center text-white/35 hover:border-accent hover:text-accent transition-all duration-300"
                  />
                </div>
              </div>
            </div>
          </div>

          <div
            ref={photoRef}
            className="order-1 xl:order-2 shrink-0"
          >
            <Photo />
          </div>

        </div>
      </div>

      <div ref={statsRef}>
        <Stats />
      </div>

      <div
        className="absolute bottom-0 left-0 right-0 h-px"
        style={{ background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.05), transparent)' }}
      />
    </section>
  )
}

export default Home