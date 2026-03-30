"use client"
import Link from 'next/link'
import { BsArrowUpRight, BsGithub } from 'react-icons/bs'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import Image from 'next/image'
import { useState, useEffect, useRef, useCallback } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Keyboard } from 'swiper/modules'
import SwiperCore from 'swiper'
import 'swiper/css'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    num: '01',
    category: 'Full Stack',
    title: 'Bliss Simple Socially',
    description: 'A social app with authentication, post management, profile customization, and real-time chat features.',
    stack: [{ name: 'Next.js' }, { name: 'Clerk' }, { name: 'React' }],
    image: '/assets/work/bliss-socially.png',
    live: 'https://bls-social-app.vercel.app',
    github: 'https://github.com/Blissmal/social-app',
  },
  {
    num: '02',
    category: 'Full Stack',
    title: 'FB Like Social App',
    description: 'A Facebook-inspired social platform with authentication, image uploads, and database integration.',
    stack: [{ name: 'Next.js' }, { name: 'Clerk' }, { name: 'PostgreSQL' }, { name: 'Cloudinary' }],
    image: '/assets/work/bliss-social.png',
    live: 'https://bliss-social.vercel.app',
    github: 'https://github.com/Blissmal/next-social-media-app',
  },
  {
    num: '03',
    category: 'Frontend',
    title: 'React Firebase Chat',
    description: 'A real-time chat application with authentication, emoji support, image sharing, and user blocking.',
    stack: [{ name: 'React' }, { name: 'Firebase' }, { name: 'Firestore' }],
    image: '/assets/work/firebaseChat.png',
    live: 'https://bliss-firebase-chat.vercel.app',
    github: 'https://github.com/Blissmal/react-firebaseChat',
  },
  {
    num: '04',
    category: 'Full Stack',
    title: 'Ecommerce Application',
    description: 'A modern e-commerce platform with product variants, cart management, M-Pesa integration, and admin dashboard.',
    stack: [{ name: 'Next.js' }, { name: 'TypeScript' }, { name: 'M-Pesa API' }, { name: 'Neon PostgreSQL' }],
    image: '/assets/work/ecommerce.png',
    live: 'https://bls-ecommerce-site.vercel.app',
    github: '#',
  },
  {
    num: '05',
    category: 'Full Stack',
    title: 'Hire Purchase Ecommerce',
    description: 'A smartphone e-commerce platform with flexible hire purchase financing for the Kenyan market.',
    stack: [{ name: 'Next.js' }, { name: 'TypeScript' }, { name: 'Payment Integration' }],
    image: '/assets/work/HP-purchase.png',
    live: 'https://lipa-phone.vercel.app',
    github: '#',
  },
]

const Work = () => {
  const [project, setProject] = useState(projects[0])
  const [activeIndex, setActiveIndex] = useState(0)
  const swiperRef = useRef<SwiperCore | null>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const infoPanelRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLDivElement>(null)
  const stackRef = useRef<HTMLUListElement>(null)

  // Animate info panel whenever project changes
  useEffect(() => {
    const tl = gsap.timeline()

    if (infoPanelRef.current) {
      tl.fromTo(infoPanelRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.45, ease: 'power3.out' }
      )
    }
    if (numRef.current) {
      tl.fromTo(numRef.current,
        { scale: 0.75, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.35, ease: 'back.out(2)' },
        '<'
      )
    }
    if (stackRef.current) {
      const tags = stackRef.current.querySelectorAll('li')
      tl.fromTo(tags,
        { opacity: 0, y: 8 },
        { opacity: 1, y: 0, stagger: 0.07, duration: 0.3, ease: 'power2.out' },
        '-=0.2'
      )
    }

    return () => { tl.kill() }
  }, [project])

  // Page entrance — fixed with ScrollTrigger.refresh()
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.work-entrance', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
          once: true,
        },
        y: 40,
        opacity: 0,
        stagger: 0.12,
        duration: 0.7,
        ease: 'power3.out',
      })
    }, sectionRef)

    const t = setTimeout(() => ScrollTrigger.refresh(), 100)

    return () => {
      clearTimeout(t)
      ctx.revert()
    }
  }, [])

  const handleSlideChange = useCallback((swiper: SwiperCore) => {
    const idx = swiper.activeIndex
    setActiveIndex(idx)
    setProject(projects[idx])
  }, [])

  const goTo = (idx: number) => {
    swiperRef.current?.slideTo(idx)
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center py-16 xl:py-24 relative z-10"
    >
      <div className="container mx-auto px-6 xl:px-12 max-w-6xl">

        {/* Header */}
        <div className="work-entrance flex items-end justify-between border-b border-white/6 pb-8 mb-14 gap-8">
          <h1
            className="text-[60px] xl:text-[80px] leading-none tracking-widest uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Selected<br />
            <span className="text-accent">Work</span>
          </h1>
          <span className="text-xs tracking-[3px] uppercase text-white/25 hidden md:block">
            {project.num} / 0{projects.length}
          </span>
        </div>

        {/* Main layout */}
        <div className="work-entrance grid grid-cols-1 xl:grid-cols-2 border border-white/6 min-h-115">

          {/* Info panel */}
          <div
            ref={infoPanelRef}
            className="flex flex-col justify-between p-10 xl:p-12 border-b xl:border-b-0 xl:border-r border-white/6 order-2 xl:order-1"
          >
            <div>
              {/* Number */}
              <div
                ref={numRef}
                className="text-[108px] leading-none select-none -mt-3 mb-0"
                style={{
                  fontFamily: "'Bebas Neue', sans-serif",
                  WebkitTextStroke: '1px rgba(255,255,255,0.05)',
                  color: 'transparent',
                }}
              >
                {project.num}
              </div>

              {/* Category */}
              <p className="text-[10px] tracking-[3px] uppercase text-white/30 mb-3">
                {project.category} project
              </p>

              {/* Title */}
              <h2
                className="text-[32px] xl:text-[38px] leading-tight mb-4 text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: '1px' }}
              >
                {project.title}
              </h2>

              {/* Description */}
              <p className="text-sm leading-relaxed text-white/50 font-light max-w-sm">
                {project.description}
              </p>

              {/* Stack */}
              <ul ref={stackRef} className="flex flex-wrap gap-2 mt-5 mb-6">
                {project.stack.map((s, i) => (
                  <li
                    key={i}
                    className="text-[10px] tracking-[1.5px] uppercase text-accent bg-accent/[0.07] border border-accent/20 px-3 py-1"
                    style={{ borderRadius: '2px' }}
                  >
                    {s.name}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <div className="h-px bg-white/6 mb-6" />
              <div className="flex items-center gap-4">
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={project.live}
                        target="_blank"
                        className="w-13 h-13 rounded-full border border-white/10 bg-transparent flex items-center justify-center transition-all duration-300 hover:bg-accent hover:border-accent group"
                      >
                        <BsArrowUpRight className="text-white/40 text-lg group-hover:text-black group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent><p>Live project</p></TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        href={project.github}
                        target="_blank"
                        className="w-13 h-13 rounded-full border border-white/10 bg-transparent flex items-center justify-center transition-all duration-300 hover:bg-accent hover:border-accent group"
                      >
                        <BsGithub className="text-white/40 text-lg group-hover:text-black group-hover:rotate-12 transition-all duration-300" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent><p>GitHub repository</p></TooltipContent>
                  </Tooltip>
                </TooltipProvider>

                <span className="text-[10px] tracking-[2px] uppercase text-white/20">
                  View project
                </span>
              </div>
            </div>
          </div>

          {/* Image / Swiper panel */}
          <div className="order-1 xl:order-2 min-h-80 xl:min-h-0 relative">
            <Swiper
              modules={[Keyboard]}
              keyboard={{ enabled: true }}
              spaceBetween={0}
              slidesPerView={1}
              onSwiper={(s) => { swiperRef.current = s }}
              onSlideChange={handleSlideChange}
              className="w-full h-full min-h-80 xl:min-h-115"
            >
              {projects.map((p, i) => (
                <SwiperSlide key={i}>
                  <div className="relative w-full h-full min-h-80 xl:min-h-115 overflow-hidden bg-[#111] group">
                    {/* Scanlines overlay on hover */}
                    <div
                      className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: 'repeating-linear-gradient(transparent, transparent 3px, rgba(0,255,153,0.015) 3px, rgba(0,255,153,0.015) 4px)',
                      }}
                    />
                    <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/10 transition-colors duration-400" />
                    <Image
                      src={p.image}
                      fill
                      alt={p.title}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    {/* Category label */}
                    <span className="absolute top-5 left-5 z-30 text-[10px] tracking-[3px] uppercase text-white/35">
                      {p.category}
                    </span>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>

        {/* Nav bar */}
        <div className="work-entrance flex items-center justify-between border border-t-0 border-white/6 px-8 py-5">
          {/* Dot indicators */}
          <div className="flex gap-2 items-center">
            {projects.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className="h-0.5 rounded-[1px] transition-all duration-300 cursor-pointer"
                style={{
                  width: i === activeIndex ? '40px' : '24px',
                  background: i === activeIndex ? '#00FF99' : '#2a2a2a',
                }}
                aria-label={`Go to project ${i + 1}`}
              />
            ))}
          </div>

          {/* Arrow buttons */}
          <div className="flex gap-3">
            <button
              onClick={() => goTo(activeIndex - 1)}
              disabled={activeIndex === 0}
              className="w-10 h-10 rounded-full border border-white/10 bg-transparent flex items-center justify-center transition-all duration-300 hover:bg-accent hover:border-accent group disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-white/40 group-hover:stroke-black transition-colors">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </button>
            <button
              onClick={() => goTo(activeIndex + 1)}
              disabled={activeIndex === projects.length - 1}
              className="w-10 h-10 rounded-full border border-white/10 bg-transparent flex items-center justify-center transition-all duration-300 hover:bg-accent hover:border-accent group disabled:opacity-20 disabled:cursor-not-allowed"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="stroke-white/40 group-hover:stroke-black transition-colors">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </button>
          </div>
        </div>

      </div>
    </section>
  )
}

export default Work