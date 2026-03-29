"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsArrowUpRight, BsGithub } from "react-icons/bs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useRef } from "react";
import SwiperCore from "swiper";
import WorkSliderButtons from "@/components/WorkSliderButtons";
import gsap from "gsap";

const projects = [
  {
    num: '01',
    category: 'full stack',
    title: 'Bliss simple socially',
    description: 'A social app with authentication, post management, profile customization, and real-time chat features.',
    stack: [{ name: 'Next.js' }, { name: 'Clerk' }, { name: 'React' }],
    image: '/assets/work/bliss-socially.png',
    live: "https://bls-social-app.vercel.app",
    github: "https://github.com/Blissmal/social-app"
  },
  {
    num: '02',
    category: 'full stack',
    title: 'FB Like social app',
    description: 'A Facebook-inspired social platform with authentication, image uploads, and database integration.',
    stack: [{ name: 'Next.js' }, { name: 'Clerk' }, { name: 'PostgreSQL' }, { name: 'Cloudinary' }],
    image: '/assets/work/bliss-social.png',
    live: "https://bliss-social.vercel.app",
    github: "https://github.com/Blissmal/next-social-media-app"
  },
  {
    num: '03',
    category: 'frontend',
    title: 'React firebase chat',
    description: 'A real-time chat application with authentication, emoji support, image sharing, and user blocking.',
    stack: [{ name: 'React' }, { name: 'Firebase' }, { name: 'Firestore' }],
    image: '/assets/work/firebaseChat.png',
    live: "https://bliss-firebase-chat.vercel.app",
    github: "https://github.com/Blissmal/react-firebaseChat"
  },
  {
    num: '04',
    category: 'full stack',
    title: 'Ecommerce Application',
    description: 'A modern e-commerce platform with product variants, cart management, M-Pesa integration, and admin dashboard.',
    stack: [{ name: 'Next.js' }, { name: 'TypeScript' }, { name: 'M-Pesa API' }, { name: 'Neon postgresql' }],
    image: '/assets/work/ecommerce.png',
    live: "https://bls-ecommerce-site.vercel.app",
    github: "#"
  },
  {
    num: '05',
    category: 'full stack',
    title: 'Hire Purchase Ecommerce',
    description: 'A smartphone e-commerce platform with flexible hire purchase financing for the Kenyan market.',
    stack: [{ name: 'Next.js' }, { name: 'TypeScript' }, { name: 'Payment Integration' }],
    image: '/assets/work/HP-purchase.png',
    live: "https://lipa-phone.vercel.app",
    github: "#"
  }
];

const Work = () => {
  const [project, setProject] = useState(projects[0])
  const infoRef = useRef<HTMLDivElement>(null)
  const numRef = useRef<HTMLDivElement>(null)

  const handleSlideChange = (swiper: SwiperCore) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex])

    // Animate info panel on slide change
    if (infoRef.current) {
      gsap.fromTo(infoRef.current,
        { opacity: 0, x: -20 },
        { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }
      )
    }
    if (numRef.current) {
      gsap.fromTo(numRef.current,
        { scale: 0.7, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(2)" }
      )
    }
  }

  useEffect(() => {
    // Animate stack tags on project change
    const tags = document.querySelectorAll(".stack-tag")
    gsap.fromTo(tags,
      { opacity: 0, y: 10 },
      { opacity: 1, y: 0, stagger: 0.08, duration: 0.4, ease: "power2.out" }
    )
  }, [project])

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' } }}
      className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0 relative z-10"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row xl:gap-[30px]">
          <div ref={infoRef} className="w-full xl:w-[50%] xl:h-[460px] flex flex-col xl:justify-between order-2 xl:order-0">
            <div className="flex flex-col gap-[30px] h-[50%]">
              <div ref={numRef} className="text-8xl leading-none font-extrabold text-transparent text-outline">
                {project.num}
              </div>
              <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">
                {project.category} project
              </h2>
              <p className="text-white/60">{project.description}</p>

              <ul className="flex gap-4 flex-wrap">
                {project.stack.map((stack, index) => (
                  <li key={index} className="stack-tag text-xl text-accent bg-accent/10 px-3 py-1 rounded-full text-sm border border-accent/20">
                    {stack.name}
                  </li>
                ))}
              </ul>
              <div className="border border-white/20" />
              <div className="flex items-center gap-4">
                <Link href={project.live}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group hover:bg-accent/20 hover:shadow-[0_0_20px_rgba(0,255,153,0.3)] transition-all duration-300">
                        <BsArrowUpRight className="text-white text-3xl group-hover:text-accent group-hover:-translate-y-1 group-hover:translate-x-1 transition-transform" />
                      </TooltipTrigger>
                      <TooltipContent><p>Live project</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
                <Link href={project.github}>
                  <TooltipProvider delayDuration={100}>
                    <Tooltip>
                      <TooltipTrigger className="w-[70px] h-[70px] rounded-full bg-white/5 flex justify-center items-center group hover:bg-accent/20 hover:shadow-[0_0_20px_rgba(0,255,153,0.3)] transition-all duration-300">
                        <BsGithub className="text-white text-3xl group-hover:text-accent group-hover:rotate-12 transition-transform duration-300" />
                      </TooltipTrigger>
                      <TooltipContent><p>Github repository</p></TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </Link>
              </div>
            </div>
          </div>

          <div className="w-full xl:w-[50%]">
            <Swiper spaceBetween={30} slidesPerView={1} className="xl:h-[520px] mb-12" onSlideChange={handleSlideChange}>
              {projects.map((project, index) => (
                <SwiperSlide key={index} className="w-full">
                  <div className="h-[460px] relative group flex justify-center items-center bg-pink-50/20 overflow-hidden rounded-xl">
                    <div className="absolute inset-0 bg-black/20 z-10 group-hover:bg-black/10 transition-colors duration-300" />
                    {/* Glitch overlay on hover */}
                    <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                      style={{
                        background: "linear-gradient(transparent 49%, rgba(0,255,153,0.03) 50%, transparent 51%)",
                        backgroundSize: "100% 4px",
                      }}
                    />
                    <div className="relative w-full h-full">
                      <Image src={project.image} fill className="object-cover group-hover:scale-105 transition-transform duration-700" alt={project.title} />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
              <WorkSliderButtons
                containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
                btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-[44px] h-[44px] flex justify-center items-center transition-all hover:shadow-[0_0_15px_rgba(0,255,153,0.5)] hover:scale-110"
                iconStyles=""
              />
            </Swiper>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

export default Work;