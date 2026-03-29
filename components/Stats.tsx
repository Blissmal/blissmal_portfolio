"use client"
import CountUp from "react-countup"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const stats = [
  { num: 5, text: "Years of Experience" },
  { num: 10, text: "Projects Completed" },
  { num: 8, text: "Technologies" },
  { num: 1200, text: "Code Commits" },
]

const Stats = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".stat-item", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 90%",
        },
        y: 30,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="pt-4 pb-12 xl:pt-0 xl:pb-0 relative z-10">
      <div className="container mx-auto">
        <div className="flex flex-wrap gap-6 max-w-[80vw] mx-auto xl:max-w-none">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="stat-item flex-1 flex gap-4 items-center justify-center xl:justify-start group"
            >
              <div className="relative">
                <CountUp
                  end={stat.num}
                  duration={5}
                  delay={2}
                  className="text-4xl xl:text-6xl font-extrabold text-accent group-hover:drop-shadow-[0_0_12px_#00ff99] transition-all duration-500"
                />
                <span className="text-4xl xl:text-6xl font-extrabold text-accent">+</span>
              </div>
              <p
                className={`${stat.text.length < 15 ? "max-w-[100px]" : "max-w-[150px]"} leading-snug text-white/80 group-hover:text-white transition-colors duration-300`}
              >
                {stat.text}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Stats