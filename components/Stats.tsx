"use client"
import CountUp from "react-countup"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { num: 5, text: "Years of\nExperience" },
  { num: 10, text: "Projects\nCompleted" },
  { num: 8, text: "Technologies\nMastered" },
  { num: 1200, text: "Code\nCommits" },
]

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
          once: true,
        },
        y: 24,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="relative z-10 mt-16 xl:mt-20">
      {/* Full-width border top */}
      <div className="border-t border-white/[0.06]">
        <div className="container mx-auto px-6 xl:px-12 max-w-6xl">
          <div className="grid grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={`stat-item group py-8 px-6 xl:px-8 flex flex-col gap-1 transition-all duration-300
                  ${index < stats.length - 1 ? "border-r border-white/[0.06]" : ""}
                  hover:bg-white/[0.02]
                `}
              >
                {/* Number row */}
                <div className="flex items-end gap-0.5">
                  <CountUp
                    end={stat.num}
                    duration={4}
                    delay={2}
                    className="text-[42px] xl:text-[52px] font-black leading-none text-white group-hover:text-accent transition-colors duration-500"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  />
                  <span
                    className="text-[42px] xl:text-[52px] font-black leading-none text-accent"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    +
                  </span>
                </div>
                {/* Label */}
                <p className="text-[10px] tracking-[2px] uppercase text-white/30 leading-relaxed whitespace-pre-line group-hover:text-white/50 transition-colors duration-300">
                  {stat.text}
                </p>
                {/* Accent tick on hover */}
                <div className="h-[1px] w-0 bg-accent group-hover:w-8 transition-all duration-500 mt-2" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Stats