"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"

interface Particle {
  el: HTMLDivElement
  x: number
  y: number
  size: number
}

const ParticleBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    const particles: Particle[] = []
    const count = 35

    for (let i = 0; i < count; i++) {
      const el = document.createElement("div")
      const size = Math.random() * 3 + 1
      const x = Math.random() * window.innerWidth
      const y = Math.random() * window.innerHeight

      el.style.cssText = `
        position: absolute;
        width: ${size}px;
        height: ${size}px;
        background: ${Math.random() > 0.6 ? "#00ff99" : "rgba(255,255,255,0.3)"};
        border-radius: 50%;
        pointer-events: none;
        left: ${x}px;
        top: ${y}px;
        box-shadow: ${Math.random() > 0.6 ? "0 0 6px #00ff99" : "none"};
      `
      container.appendChild(el)
      particles.push({ el, x, y, size })

      // Random float animation per particle
      gsap.to(el, {
        y: `+=${(Math.random() - 0.5) * 120}`,
        x: `+=${(Math.random() - 0.5) * 80}`,
        opacity: Math.random() * 0.5 + 0.2,
        duration: Math.random() * 6 + 4,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 4,
      })
    }

    // Pulse a few bright ones
    particles.filter((_, i) => i % 5 === 0).forEach(p => {
      gsap.to(p.el, {
        boxShadow: "0 0 14px #00ff99, 0 0 30px #00ff9944",
        scale: 1.8,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
        delay: Math.random() * 3,
      })
    })

    return () => {
      particles.forEach(p => p.el.remove())
    }
  }, [])

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden"
      aria-hidden
    />
  )
}

export default ParticleBackground