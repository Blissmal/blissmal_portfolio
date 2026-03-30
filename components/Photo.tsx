"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"

const Photo = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const frameRef = useRef<HTMLDivElement>(null)
  const ring1Ref = useRef<SVGCircleElement>(null)
  const ring2Ref = useRef<SVGSVGElement>(null)
  const scanRef = useRef<HTMLDivElement>(null)
  const badgeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance
      gsap.fromTo(containerRef.current,
        { opacity: 0, scale: 0.94, x: 20 },
        { opacity: 1, scale: 1, x: 0, duration: 0.9, ease: "power3.out", delay: 1.6 }
      )

      // Slow outer ring rotation
      gsap.to(ring2Ref.current, {
        rotation: 360,
        duration: 22,
        repeat: -1,
        ease: "none",
        transformOrigin: "center center",
      })

      // Scanline sweep — subtle top-to-bottom
      gsap.to(scanRef.current, {
        y: "100%",
        duration: 3.5,
        repeat: -1,
        ease: "none",
        delay: 2,
      })

      // Badge pulse
      gsap.to(badgeRef.current, {
        opacity: 0.6,
        duration: 1.8,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: 2.4,
      })

      // Subtle hover parallax on frame
      const el = frameRef.current
      if (!el) return
      const onMove = (e: MouseEvent) => {
        const rect = el.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        const dx = (e.clientX - cx) / rect.width
        const dy = (e.clientY - cy) / rect.height
        gsap.to(el, {
          rotateY: dx * 6,
          rotateX: -dy * 6,
          duration: 0.6,
          ease: "power2.out",
          transformPerspective: 800,
        })
      }
      const onLeave = () => {
        gsap.to(el, {
          rotateY: 0, rotateX: 0,
          duration: 0.8,
          ease: "elastic.out(1, 0.4)",
        })
      }
      el.addEventListener("mousemove", onMove)
      el.addEventListener("mouseleave", onLeave)
      return () => {
        el.removeEventListener("mousemove", onMove)
        el.removeEventListener("mouseleave", onLeave)
      }
    }, containerRef)

    return () => ctx.revert()
  }, [])

  return (
    <div
      ref={containerRef}
      className="relative flex items-center justify-center opacity-0"
      style={{ width: '425px', height: '475px' }} // Scaled up 25%
    >

      {/* Rotating outer ring SVG */}
      <svg
        ref={ring2Ref}
        className="absolute pointer-events-none"
        width="475"
        height="475"
        viewBox="0 0 380 380"
        fill="none"
        style={{ transformOrigin: 'center' }}
      >
        <circle
          cx="190" cy="190" r="184"
          stroke="rgba(0,255,153,0.12)"
          strokeWidth="0.75"
          strokeDasharray="5 18"
        />
        {/* Orbiting dot */}
        <circle cx="190" cy="6" r="3" fill="#00ff99" opacity="0.8" />
        <circle cx="374" cy="190" r="2" fill="#00ff99" opacity="0.35" />
      </svg>

      {/* Static inner ring */}
      <svg
        className="absolute pointer-events-none"
        width="375"
        height="375"
        viewBox="0 0 300 300"
        fill="none"
      >
        <circle
          ref={ring1Ref}
          cx="150" cy="150" r="146"
          stroke="rgba(0,255,153,0.06)"
          strokeWidth="0.75"
        />
      </svg>

      {/* Main photo frame with tilt */}
      <div
        ref={frameRef}
        className="relative overflow-hidden"
        style={{
          width: '300px',
          height: '350px',
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Corner brackets */}
        {(['tl','tr','bl','br'] as const).map((pos) => (
          <div
            key={pos}
            className="absolute w-5 h-5 z-20 pointer-events-none"
            style={{
              top: pos.startsWith('t') ? 0 : 'auto',
              bottom: pos.startsWith('b') ? 0 : 'auto',
              left: pos.endsWith('l') ? 0 : 'auto',
              right: pos.endsWith('r') ? 0 : 'auto',
              borderColor: '#00ff99',
              borderStyle: 'solid',
              borderWidth: `${pos.startsWith('t') ? '1px' : '0'} ${pos.endsWith('r') ? '1px' : '0'} ${pos.startsWith('b') ? '1px' : '0'} ${pos.endsWith('l') ? '1px' : '0'}`,
            }}
          />
        ))}

        {/* Outer frame border */}
        <div
          className="absolute inset-0 z-10 pointer-events-none"
          style={{ border: '0.5px solid rgba(255,255,255,0.08)' }}
        />

        {/* Scanline sweep overlay */}
        <div
          ref={scanRef}
          className="absolute left-0 right-0 z-10 pointer-events-none"
          style={{
            top: '-20%',
            height: '20%',
            background: 'linear-gradient(to bottom, transparent, rgba(0,255,153,0.04), transparent)',
            transform: 'translateY(-100%)',
          }}
        />

        {/* Photo */}
        <div
          className="relative w-full h-full mix-blend-lighten"
          style={{ background: '#0a0a0a' }}
        >
          <Image
            src="/assets/avatar.svg"
            priority
            quality={100}
            alt="Bethuel Maluti"
            fill
            className="object-contain"
          />
        </div>
      </div>

      {/* Floating "Available" badge — bottom left of frame */}
      <div
        ref={badgeRef}
        className="absolute z-30"
        style={{
          bottom: '60px',
          left: '20px',
          background: '#0a0a0a',
          border: '0.5px solid rgba(255,255,255,0.08)',
          padding: '8px 12px',
        }}
      >
        <span
          className="block text-[10px] tracking-[2px] uppercase font-mono"
          style={{ color: 'rgba(255,255,255,0.28)' }}
        >
          Status
        </span>
        <div className="flex items-center gap-1.5 mt-1">
          <span
            className="w-1.5 h-1.5 rounded-full"
            style={{ background: '#00ff99', boxShadow: '0 0 5px #00ff99' }}
          />
          <span className="text-[13px] font-medium text-accent">Available</span>
        </div>
      </div>

      {/* Decorative coordinate label — top right */}
      <div
        className="absolute top-8 right-0 z-20 pointer-events-none"
        style={{ color: 'rgba(255,255,255,0.15)', fontSize: '10px', letterSpacing: '2px', fontFamily: 'monospace' }}
      >
        BM.2026
      </div>
    </div>
  )
}

export default Photo