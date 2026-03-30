"use client"
import Link from 'next/link'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    num: '01',
    tag: 'Core service',
    title: 'Web Development',
    desc: 'Building responsive and modern web applications with cutting-edge tools and frameworks. End-to-end, from architecture to deploy.',
    href: '',
  },
  {
    num: '02',
    tag: 'Core service',
    title: 'Mobile App Development',
    desc: 'Creating user-friendly mobile applications for iOS and Android. Native feel, cross-platform efficiency.',
    href: '',
  },
  {
    num: '03',
    tag: 'Design',
    title: 'UI/UX Design',
    desc: 'Designing intuitive and engaging user interfaces and experiences. Every interaction considered, every pixel intentional.',
    href: '',
  },
  {
    num: '04',
    tag: 'Emerging tech',
    title: 'AI / ML',
    desc: 'Developing intelligent solutions using machine learning models and AI algorithms for data analysis and automation.',
    href: '',
  },
]

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.7,
        ease: 'power3.out',
      })

      gsap.from('.services-header', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%',
          once: true,
        },
        y: 24,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
      })
    }, sectionRef)

    const t = setTimeout(() => ScrollTrigger.refresh(), 100)

    return () => {
      clearTimeout(t)
      ctx.revert()
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center py-16 xl:py-24 relative z-10"
    >
      <div className="container mx-auto px-6 xl:px-12 max-w-6xl">

        {/* Header */}
        <div className="services-header flex items-end justify-between border-b border-white/[0.06] pb-8 mb-16 gap-8">
          <h1
            className="text-[64px] xl:text-[88px] leading-none tracking-widest uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            What I<br />
            <span className="text-accent">Build</span>
          </h1>
          <p className="text-sm text-white/40 text-right max-w-[200px] leading-relaxed hidden md:block font-light">
            Crafting precise digital experiences — from code to pixel to algorithm.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 border border-white/[0.06] divide-y divide-white/[0.06] md:divide-y-0">
          {services.map((service, i) => (
            <Link
              key={i}
              href={service.href || '#'}
              className={`
                service-card group relative overflow-hidden bg-[#111111]
                p-10 xl:p-12 flex flex-col cursor-pointer
                transition-colors duration-300 hover:bg-[#141414]
                ${i % 2 === 0 ? 'md:border-r border-white/[0.06]' : ''}
                ${i < 2 ? 'md:border-b border-white/[0.06]' : ''}
              `}
            >
              {/* Subtle green glow on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                  background: 'linear-gradient(135deg, rgba(0,255,153,0.04) 0%, transparent 60%)'
                }}
              />

              {/* Large background number */}
              <span
                className="absolute top-[-12px] right-6 text-[130px] leading-none select-none pointer-events-none transition-colors duration-500"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  color: '#1a1a1a',
                }}
              >
                {service.num}
              </span>

              {/* Tag */}
              <span className="text-[10px] tracking-[3px] uppercase text-white/30 group-hover:text-accent transition-colors duration-400 mb-5">
                {service.tag}
              </span>

              {/* Accent bar */}
              <div className="h-[2px] bg-accent mb-6 w-8 group-hover:w-14 transition-all duration-400" />

              {/* Title */}
              <h2
                className="text-4xl xl:text-5xl leading-tight mb-4 text-white group-hover:text-accent transition-colors duration-400 max-w-[260px]"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px' }}
              >
                {service.title}
              </h2>

              {/* Description */}
              <p className="text-sm leading-relaxed text-white/40 group-hover:text-white/60 transition-colors duration-300 font-light max-w-[300px] flex-1">
                {service.desc}
              </p>

              {/* Footer */}
              <div className="mt-8 pt-5 border-t border-white/[0.06] group-hover:border-accent/20 transition-colors duration-400 flex items-center justify-between">
                <span className="text-[10px] tracking-[2px] uppercase text-white/20 group-hover:text-accent transition-colors duration-400">
                  View work
                </span>
                <div className="w-9 h-9 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:-rotate-45 transition-all duration-400">
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="none"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="stroke-white/30 group-hover:stroke-black transition-colors duration-400"
                  >
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>

      </div>
    </section>
  )
}

export default Services