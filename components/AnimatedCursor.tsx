"use client"
import { useEffect, useRef } from "react"
import gsap from "gsap"

const AnimatedCursor = () => {
  const cursorDot = useRef<HTMLDivElement>(null)
  const cursorRing = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const dot = cursorDot.current
    const ring = cursorRing.current
    if (!dot || !ring) return

    const moveCursor = (e: MouseEvent) => {
      gsap.to(dot, { x: e.clientX, y: e.clientY, duration: 0.05, ease: "none" })
      gsap.to(ring, { x: e.clientX, y: e.clientY, duration: 0.22, ease: "power2.out" })
    }

    const handleEnter = () => {
      gsap.to(ring, { scale: 2.5, borderColor: "#00ff99", opacity: 0.6, duration: 0.3 })
      gsap.to(dot, { scale: 0, duration: 0.2 })
    }
    const handleLeave = () => {
      gsap.to(ring, { scale: 1, borderColor: "#00ff99", opacity: 1, duration: 0.3 })
      gsap.to(dot, { scale: 1, duration: 0.2 })
    }

    window.addEventListener("mousemove", moveCursor)
    const interactables = document.querySelectorAll("a, button, [role='button'], input, textarea, select")
    interactables.forEach(el => {
      el.addEventListener("mouseenter", handleEnter)
      el.addEventListener("mouseleave", handleLeave)
    })

    return () => {
      window.removeEventListener("mousemove", moveCursor)
      interactables.forEach(el => {
        el.removeEventListener("mouseenter", handleEnter)
        el.removeEventListener("mouseleave", handleLeave)
      })
    }
  }, [])

  return (
    <>
      <div
        ref={cursorDot}
        className="fixed top-0 left-0 w-2 h-2 bg-accent rounded-full pointer-events-none z-9999 -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{ willChange: "transform" }}
      />
      <div
        ref={cursorRing}
        className="fixed top-0 left-0 w-8 h-8 border-2 border-accent rounded-full pointer-events-none z-9998 -translate-x-1/2 -translate-y-1/2"
        style={{ willChange: "transform" }}
      />
    </>
  )
}

export default AnimatedCursor