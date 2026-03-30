"use client"
import CountUp from "react-countup"
import { useEffect, useRef, useState } from "react"
import { useInView } from "framer-motion"

const stats = [
  { num: 5,    suffix: "+", label: "Years of",     sub: "Experience"  },
  { num: 10,   suffix: "+", label: "Projects",     sub: "Completed"   },
  { num: 8,    suffix: "+", label: "Technologies", sub: "Mastered"    },
  { num: 1200, suffix: "+", label: "Code",         sub: "Commits"     },
]

const Stats = () => {
  const ref = useRef<HTMLElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-10% 0px" })
  const [triggered, setTriggered] = useState(false)

  useEffect(() => {
    if (isInView) setTriggered(true)
  }, [isInView])

  return (
    <section ref={ref} className="relative z-10 mt-16 xl:mt-24">
      {/* Thin top rule with accent glow at center */}
      <div className="relative h-px w-full">
        <div className="absolute inset-0 bg-white/[0.06]" />
        <div className="absolute left-1/2 -translate-x-1/2 h-px w-48
          bg-gradient-to-r from-transparent via-accent/60 to-transparent" />
      </div>

      <div className="container mx-auto px-6 xl:px-12 max-w-6xl">
        <div className="grid grid-cols-2 xl:grid-cols-4">
          {stats.map((stat, i) => (
            <div
              key={i}
              className={[
                "group relative py-10 px-6 xl:px-8 flex flex-col gap-0 overflow-hidden",
                "transition-all duration-500 hover:bg-white/[0.025]",
                i < stats.length - 1 ? "border-r border-white/[0.06]" : "",
                // Staggered slide-up via inline delay
              ].join(" ")}
              style={{
                opacity: triggered ? 1 : 0,
                transform: triggered ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`,
              }}
            >
              {/* Accent corner bracket — top left */}
              <span className="absolute top-4 left-4 w-3 h-3 border-l border-t border-accent/20
                group-hover:border-accent/60 transition-colors duration-500" />

              {/* Number */}
              <div className="flex items-end gap-0 leading-none mb-2">
                {triggered && (
                  <CountUp
                    end={stat.num}
                    duration={2.8}
                    delay={i * 0.15}
                    className="text-[48px] xl:text-[60px] font-black leading-none text-white
                      group-hover:text-accent transition-colors duration-500"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  />
                )}
                <span
                  className="text-[48px] xl:text-[60px] font-black leading-none text-accent pb-0"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {stat.suffix}
                </span>
              </div>

              {/* Label — two-line stacked */}
              <p className="text-[9px] tracking-[3px] uppercase text-white/25
                group-hover:text-white/45 transition-colors duration-300 leading-[1.8]">
                {stat.label}<br />
                <span className="text-accent/50 group-hover:text-accent/80
                  transition-colors duration-300">{stat.sub}</span>
              </p>

              {/* Animated underline */}
              <div className="mt-4 h-[1px] w-0 bg-gradient-to-r from-accent to-accent/20
                group-hover:w-10 transition-all duration-500 ease-out" />

              {/* Subtle radial glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100
                transition-opacity duration-700 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 30% 50%, rgba(0,255,153,0.04) 0%, transparent 70%)"
                }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom rule */}
      <div className="h-px bg-white/[0.04] mt-0" />
    </section>
  )
}

export default Stats