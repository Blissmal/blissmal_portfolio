"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { useEffect, useRef } from "react"
import gsap from "gsap"

const Photo = () => {
  const glowRef = useRef<HTMLDivElement>(null)
  const orbitRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Pulsing glow ring
      gsap.to(glowRef.current, {
        boxShadow: "0 0 60px 20px rgba(0,255,153,0.25), 0 0 120px 40px rgba(0,255,153,0.1)",
        scale: 1.04,
        duration: 2.5,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      })

      // Orbit dots spinning
      if (orbitRef.current) {
        const dots = orbitRef.current.querySelectorAll(".orbit-dot")
        dots.forEach((dot, i) => {
          const angle = (i / dots.length) * Math.PI * 2
          const radius = 140
          gsap.to(dot, {
            motionPath: {
              path: `M ${radius * Math.cos(angle)} ${radius * Math.sin(angle)}`,
              autoRotate: true,
            },
            duration: 8 + i * 1.5,
            repeat: -1,
            ease: "none",
          })
        })

        // Simple CSS rotation fallback for orbit ring
        gsap.to(".orbit-ring-1", { rotation: 360, duration: 12, repeat: -1, ease: "none", transformOrigin: "center" })
        gsap.to(".orbit-ring-2", { rotation: -360, duration: 18, repeat: -1, ease: "none", transformOrigin: "center" })
      }
    })
    return () => ctx.revert()
  }, [])

  return (
    <div className="w-full h-full relative flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1, transition: { delay: 1.8, duration: 0.7, ease: "easeOut" } }}
        className="relative"
      >
        {/* Outer orbit rings */}
        <div ref={orbitRef} className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {/* Ring 1 */}
          <svg
            className="orbit-ring-1 absolute w-[340px] h-[340px] xl:w-[560px] xl:h-[560px]"
            viewBox="0 0 560 560"
            fill="none"
          >
            <circle cx="280" cy="280" r="270" stroke="rgba(0,255,153,0.15)" strokeWidth="1" strokeDasharray="6 16" />
            <circle cx="280" cy="10" r="5" fill="#00ff99" className="drop-shadow-[0_0_6px_#00ff99]" />
          </svg>
          {/* Ring 2 */}
          <svg
            className="orbit-ring-2 absolute w-[290px] h-[290px] xl:w-[480px] xl:h-[480px]"
            viewBox="0 0 480 480"
            fill="none"
          >
            <circle cx="240" cy="240" r="230" stroke="rgba(0,255,153,0.08)" strokeWidth="1" strokeDasharray="3 20" />
            <circle cx="240" cy="10" r="3" fill="rgba(0,255,153,0.7)" />
          </svg>
        </div>

        {/* Glow backing */}
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-full"
          style={{ boxShadow: "0 0 40px 10px rgba(0,255,153,0.15)" }}
        />

        {/* Photo */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 2.2, duration: 0.5 } }}
          className="w-[298px] h-[298px] xl:w-[498px] xl:h-[498px] mix-blend-lighten relative"
        >
          <Image
            src="/assets/avatar.svg"
            priority
            quality={100}
            alt="Blissmal Photo"
            fill
            className="object-contain"
          />
        </motion.div>

        {/* SVG spinning dashed circle */}
        <motion.svg
          className="absolute inset-0 w-full h-full"
          fill="transparent"
          viewBox="0 0 506 506"
          xmlns="http://www.w3.org/2000/svg"
        >
          <motion.circle
            cx="253"
            cy="253"
            r="250"
            stroke="#00FF99"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ strokeDasharray: "24 10 0 0" }}
            animate={{
              strokeDasharray: ["15 120 25 25", "16 25 92 72", "4 250 22 22"],
              rotate: [120, 360],
            }}
            transition={{ duration: 20, repeat: Infinity, repeatType: "reverse", ease: "linear" }}
          />
        </motion.svg>
      </motion.div>
    </div>
  )
}

export default Photo