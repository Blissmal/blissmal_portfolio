"use client"
import { motion } from 'framer-motion'
import Link from 'next/link'
import { BsArrowDownRight } from 'react-icons/bs'
import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const services = [
  { num: '01', title: 'Web Development', desc: 'Building responsive and modern web applications with cutting-edge tools and frameworks.', href: "" },
  { num: '02', title: 'Mobile App Development', desc: 'Creating user-friendly mobile applications for iOS and Android.', href: "" },
  { num: '03', title: 'UI/UX Design', desc: 'Designing intuitive and engaging user interfaces and experiences.', href: "" },
  { num: '04', title: 'AI/ML', desc: 'Developing intelligent solutions using machine learning models and AI algorithms for data analysis and automation.', href: '' }
]

const Services = () => {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".service-card", {
        scrollTrigger: { trigger: sectionRef.current, start: "top 80%" },
        y: 60,
        opacity: 0,
        stagger: 0.15,
        duration: 0.8,
        ease: "power3.out",
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className='min-h-[80vh] flex flex-col justify-center py-12 xl:py-0 relative z-10'>
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" } }}
          className='grid grid-cols-1 md:grid-cols-2 gap-[60px]'
        >
          {services.map((service, index) => (
            <div
              key={index}
              className='service-card flex-1 flex flex-col justify-center gap-6 group relative overflow-hidden rounded-lg p-1'
            >
              {/* Animated border shimmer */}
              <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                style={{
                  background: "linear-gradient(90deg, transparent 0%, rgba(0,255,153,0.1) 50%, transparent 100%)",
                  backgroundSize: "200% 100%",
                  animation: "shimmer 2s infinite",
                }}
              />

              <div className='w-full flex justify-between items-center'>
                <div className='text-5xl font-extrabold text-outline text-transparent group-hover:text-outline-hover transition-all duration-500'>
                  {service.num}
                </div>
                <Link
                  href={service.href}
                  className='w-[70px] h-[70px] rounded-full bg-white group-hover:bg-accent transition-all duration-500 flex justify-center items-center hover:-rotate-45 shadow-lg group-hover:shadow-[0_0_20px_rgba(0,255,153,0.5)]'
                >
                  <BsArrowDownRight className='text-primary text-3xl' />
                </Link>
              </div>
              <h2 className='text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500'>
                {service.title}
              </h2>
              <p className='text-white/60 group-hover:text-white/80 transition-colors duration-300'>
                {service.desc}
              </p>
              <div className='border-b border-white/20 w-full group-hover:border-accent/40 transition-colors duration-500' />
            </div>
          ))}
        </motion.div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: -200% 0; }
          100% { background-position: 200% 0; }
        }
      `}</style>
    </section>
  )
}

export default Services