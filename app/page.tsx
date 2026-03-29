"use client"
import Photo from "@/components/Photo"
import Socials from "@/components/Socials"
import Stats from "@/components/Stats"
import { Button } from "@/components/ui/button"
import { FiDownload } from "react-icons/fi"
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import Link from "next/link"

const Home = () => {
  const heroRef = useRef<HTMLDivElement>(null)
  const subtitleRef = useRef<HTMLSpanElement>(null)
  const h1Ref = useRef<HTMLHeadingElement>(null)
  const paraRef = useRef<HTMLParagraphElement>(null)
  const actionsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } })

      tl.fromTo(subtitleRef.current, { opacity: 0, x: -30 }, { opacity: 1, x: 0, duration: 0.6, delay: 1.2 })
        .fromTo(h1Ref.current, { opacity: 0, y: 40 }, { opacity: 1, y: 0, duration: 0.8 }, "-=0.3")
        .fromTo(paraRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.4")
        .fromTo(actionsRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6 }, "-=0.3")

      // Typewriter cursor blink on subtitle
      if (subtitleRef.current) {
        const cursor = document.createElement("span")
        cursor.textContent = "|"
        cursor.style.cssText = "color: #00ff99; margin-left: 2px;"
        subtitleRef.current.appendChild(cursor)
        gsap.to(cursor, { opacity: 0, duration: 0.5, repeat: -1, yoyo: true, ease: "steps(1)" })
      }
    }, heroRef)

    return () => ctx.revert()
  }, [])

  return (
    <section className="h-full relative z-10" ref={heroRef}>
      <div className="container mx-auto h-full">
        <div className="flex flex-col xl:flex-row items-center justify-between xl:pt-8 xl:pb-24">
          <div className="text-center xl:text-left order-2 xl:order-0">
            <span ref={subtitleRef} className="text-xl text-accent/80 font-mono tracking-widest opacity-0">
              Software Developer
            </span>
            <h1 ref={h1Ref} className="h1 opacity-0">
              Hello I&apos;m <br />
              <span className="text-accent relative inline-block">
                Bethuel Maluti
                {/* glitch line */}
                <span
                  className="absolute inset-0 text-white opacity-0 hover:opacity-[0.06] transition-opacity duration-100"
                  aria-hidden
                >
                  Bethuel Maluti
                </span>
              </span>
            </h1>
            <p
              ref={paraRef}
              className="max-w-[500px] mb-9 text-white/80 opacity-0"
            >
              I build digital experiences that are both functional and beautiful.
            </p>

            <div ref={actionsRef} className="flex flex-col xl:flex-row items-center gap-8 opacity-0">
              <Button
                variant="outline"
                size="lg"
                className="uppercase flex items-center gap-2 group/dl relative overflow-hidden"
              >
                <span className="relative z-10 transition-colors duration-300 group-hover/dl:text-primary">Download CV</span>
                <FiDownload className="text-xl relative z-10 transition-colors duration-300 group-hover/dl:text-primary group-hover/dl:translate-y-1 transition-transform" />
                <span className="absolute inset-0 bg-accent scale-y-0 group-hover/dl:scale-y-100 transition-transform duration-300 origin-bottom" />
              </Button>
              <div className="mb-8 xl:mb-0">
                <Socials
                  containerStyles="flex gap-6"
                  iconStyles="w-9 h-9 border border-accent rounded-full flex justify-center items-center text-accent hover:bg-accent hover:text-primary hover:transition-all duration-500 hover:scale-110 transition-transform"
                />
              </div>
            </div>
          </div>

          <div className="order-1 xl:order-0 mb-8 xl:mb-0">
            <Photo />
          </div>
        </div>
      </div>
      <Stats />
    </section>
  )
}

export default Home