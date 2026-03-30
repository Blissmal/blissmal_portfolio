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
    tech: ['Next.js', 'React', 'Node.js', 'PostgreSQL'],
  },
  {
    num: '02',
    tag: 'Core service',
    title: 'Mobile App Development',
    desc: 'Creating user-friendly mobile applications for iOS and Android. Native feel, cross-platform efficiency.',
    href: '',
    tech: ['Android', 'React Native', 'Firebase'],
  },
  {
    num: '03',
    tag: 'Design',
    title: 'UI/UX Design',
    desc: 'Designing intuitive and engaging user interfaces and experiences. Every interaction considered, every pixel intentional.',
    href: '',
    tech: ['Figma', 'Tailwind', 'Framer'],
  },
  {
    num: '04',
    tag: 'Emerging tech',
    title: 'AI / ML Integration',
    desc: 'Developing intelligent solutions using machine learning models and AI algorithms for data analysis and automation.',
    href: '',
    tech: ['Python', 'TensorFlow', 'OpenAI API'],
  },
]

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.services-header', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 90%', once: true },
        y: 24, opacity: 0, duration: 0.6, ease: 'power3.out',
      })
      gsap.from('.service-card', {
        scrollTrigger: { trigger: '.service-card', start: 'top 85%', once: true },
        y: 40, opacity: 0, stagger: 0.1, duration: 0.7, ease: 'power3.out',
      })
    }, sectionRef)

    const t = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => { clearTimeout(t); ctx.revert() }
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center py-16 xl:py-24 relative z-10"
    >
      {/* Background grid */}
      <div className="absolute inset-0 pointer-events-none opacity-40" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`,
        backgroundSize: "80px 80px"
      }} />

      <div className="container mx-auto px-6 xl:px-12 max-w-6xl relative">

        {/* Header */}
        <div className="services-header flex items-end justify-between border-b border-white/[0.06] pb-10 mb-16 gap-8">
          <div>
            <span className="text-[10px] tracking-[4px] uppercase text-accent/60 font-mono block mb-4">
              What I offer
            </span>
            <h1
              className="text-[64px] xl:text-[88px] leading-none tracking-widest uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              What I<br />
              <span className="text-accent">Build</span>
            </h1>
          </div>
          <p className="text-sm text-white/30 text-right max-w-[180px] leading-relaxed hidden md:block font-light">
            Crafting precise digital experiences — from code to pixel to algorithm.
          </p>
        </div>

        {/* Services list — editorial row layout */}
        <div className="flex flex-col divide-y divide-white/[0.06]">
          {services.map((service, i) => (
            <Link
              key={i}
              href={service.href || '#'}
              className="service-card group relative overflow-hidden py-10 xl:py-12 flex flex-col xl:flex-row xl:items-center gap-6 xl:gap-0 cursor-pointer"
            >
              {/* Hover fill */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{ background: 'linear-gradient(90deg, rgba(0,255,153,0.03) 0%, transparent 60%)' }}
              />
              {/* Left accent bar */}
              <div className="absolute left-0 top-0 bottom-0 w-0 group-hover:w-[2px] bg-accent transition-all duration-400" />

              {/* Number */}
              <div className="xl:w-[120px] flex-shrink-0 pl-6 xl:pl-8">
                <span
                  className="text-[13px] tracking-[3px] font-mono text-white/20 group-hover:text-accent transition-colors duration-400"
                >
                  {service.num}
                </span>
              </div>

              {/* Tag + Title */}
              <div className="xl:w-[300px] flex-shrink-0 pl-6 xl:pl-0">
                <span className="text-[9px] tracking-[3px] uppercase text-white/30 block mb-2 group-hover:text-accent/60 transition-colors duration-300">
                  {service.tag}
                </span>
                <h2
                  className="text-[28px] xl:text-[36px] leading-tight text-white group-hover:text-accent transition-colors duration-400"
                  style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px' }}
                >
                  {service.title}
                </h2>
              </div>

              {/* Description */}
              <div className="flex-1 pl-6 xl:pl-0 xl:px-12">
                <p className="text-sm leading-relaxed text-white/40 group-hover:text-white/60 transition-colors duration-300 font-light max-w-[400px]">
                  {service.desc}
                </p>
              </div>

              {/* Tech tags */}
              <div className="xl:w-[240px] flex-shrink-0 pl-6 xl:pl-0">
                <div className="flex flex-wrap gap-2">
                  {service.tech.map((t, ti) => (
                    <span
                      key={ti}
                      className="text-[9px] tracking-[1.5px] uppercase text-white/25 border border-white/[0.06] px-2.5 py-1 group-hover:border-accent/20 group-hover:text-accent/50 transition-all duration-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Arrow */}
              <div className="flex-shrink-0 pr-2 pl-6 xl:pl-0">
                <div className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center group-hover:bg-accent group-hover:border-accent group-hover:-rotate-45 transition-all duration-400">
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round"
                    className="stroke-white/30 group-hover:stroke-black transition-colors duration-400">
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