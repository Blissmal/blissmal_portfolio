"use client"

import { useEffect, useRef } from "react"

// Spring config — tune these to taste
const SPRING = {
  position: { stiffness: 400, damping: 45, mass: 1 },
  rotation: { stiffness: 180, damping: 28, mass: 0.8 },
}

interface SpringState {
  value: number
  velocity: number
  target: number
}

function spring(state: SpringState, config: typeof SPRING.position, dt: number): SpringState {
  const { stiffness, damping, mass } = config
  const force = -stiffness * (state.value - state.target)
  const dampingForce = -damping * state.velocity
  const acceleration = (force + dampingForce) / mass
  const velocity = state.velocity + acceleration * dt
  const value = state.value + velocity * dt
  return { value, velocity, target: state.target }
}

// Normalize angle difference to [-180, 180] so we never spin the long way round
function shortestAngle(from: number, to: number): number {
  let diff = ((to - from + 180) % 360) - 180
  if (diff < -180) diff += 360
  return from + diff
}

const AnimatedCursor = () => {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)
  const rafRef = useRef<number>(0)


  useEffect(() => {
    const wrapper = wrapperRef.current
    const svg = svgRef.current
    if (!wrapper || !svg) return

    // Hide default cursor globally
    document.documentElement.style.setProperty("cursor", "none", "important")

    // Spring states — x, y, rotation each get their own spring
    const px: SpringState = { value: -100, velocity: 0, target: -100 }
    const py: SpringState = { value: -100, velocity: 0, target: -100 }
    const rot: SpringState = { value: 0, velocity: 0, target: 0 }

    let prevMouseX = -100
    let prevMouseY = -100
    let isIdle = false
    let idleTimer: ReturnType<typeof setTimeout>
    let isHovering = false
    let prevTime = performance.now()

    const onMouseMove = (e: MouseEvent) => {
      const dx = e.clientX - prevMouseX
      const dy = e.clientY - prevMouseY
      const speed = Math.sqrt(dx * dx + dy * dy)

      px.target = e.clientX
      py.target = e.clientY

      // Only update rotation when moving fast enough — kills micro-jitter on slow moves
      if (speed > 2) {
        const angle = Math.atan2(dy, dx) * (180 / Math.PI) + 135
        // Use shortestAngle so rotation never wraps 360°
        rot.target = shortestAngle(rot.value, angle)
        isIdle = false
        clearTimeout(idleTimer)
        idleTimer = setTimeout(() => {
          isIdle = true
          // Snap back to upright — but via the shortest path
          rot.target = shortestAngle(rot.value, 0)
        }, 400)
      }

      prevMouseX = e.clientX
      prevMouseY = e.clientY
    }

    const onMouseOver = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, input, textarea, select, [role='button']")) {
        isHovering = true
      }
    }
    const onMouseOut = (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest("a, button, input, textarea, select, [role='button']")) {
        isHovering = false
      }
    }
    const onMouseLeave = () => { wrapper.style.opacity = "0" }
    const onMouseEnter = () => { wrapper.style.opacity = "1" }

    // Set GSAP-like transformOrigin via attribute so RAF transform is the only transform
    svg.style.transformOrigin = "1.75px 3.33px"

    let currentScale = 1

    const tick = (time: number) => {
      const rawDt = Math.min((time - prevTime) / 1000, 0.05) // cap at 50ms to survive tab switches
      prevTime = time

      // Step each spring
      const npx = spring(px, SPRING.position, rawDt)
      const npy = spring(py, SPRING.position, rawDt)
      const nrot = spring(rot, SPRING.rotation, rawDt)

      // Write back
      px.value = npx.value; px.velocity = npx.velocity
      py.value = npy.value; py.velocity = npy.velocity
      rot.value = nrot.value; rot.velocity = nrot.velocity

      // Smooth scale transition
      const targetScale = isHovering ? 1.4 : 1
      currentScale += (targetScale - currentScale) * Math.min(rawDt * 8, 1)

      // Apply transforms — single style.transform write per frame
      wrapper.style.transform = `translate(${px.value}px, ${py.value}px)`
      svg.style.transform = `rotate(${rot.value}deg) scale(${currentScale})`

      // Accent colour on hover
      if (isHovering) {
        svg.style.fill = "rgba(0,255,153,0.18)"
        svg.style.stroke = "#00ff99"
      } else {
        svg.style.fill = "#000000"
        svg.style.stroke = "#ffffff"
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)

    window.addEventListener("mousemove", onMouseMove)
    window.addEventListener("mouseover", onMouseOver)
    window.addEventListener("mouseout", onMouseOut)
    document.addEventListener("mouseleave", onMouseLeave)
    document.addEventListener("mouseenter", onMouseEnter)

    return () => {
      cancelAnimationFrame(rafRef.current)
      clearTimeout(idleTimer)
      window.removeEventListener("mousemove", onMouseMove)
      window.removeEventListener("mouseover", onMouseOver)
      window.removeEventListener("mouseout", onMouseOut)
      document.removeEventListener("mouseleave", onMouseLeave)
      document.removeEventListener("mouseenter", onMouseEnter)
      document.documentElement.style.removeProperty("cursor")
    }
  }, [])

  return (
    <div
      ref={wrapperRef}
      className="fixed top-0 left-0 pointer-events-none z-9999"
      style={{ willChange: "transform" }}
    >
      <svg
        ref={svgRef}
        width="24"
        height="36"
        viewBox="0 0 24 36"
        fill="#000000"
        stroke="#ffffff"
        strokeWidth="2"
        style={{
          willChange: "transform",
          position: "absolute",
          top: "-3.33px",
          left: "-1.75px",
          filter: "drop-shadow(0 1px 3px rgba(0,0,0,0.5))",
        }}
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M5.65376 21.2858L1.75 3.33331L19.4627 12.8732L11.372 14.5458L5.65376 21.2858Z"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default AnimatedCursor