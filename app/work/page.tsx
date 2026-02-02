"use client";

import { motion } from "framer-motion";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { BsArrowUpRight, BsGithub } from "react-icons/bs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import SwiperCore from "swiper";
import WorkSliderButtons from "@/components/WorkSliderButtons";


const projects = [
  {
    num: '01',
    category: 'full stack',
    title: 'Bliss simple socially',
    description: 'A social app with authentication, post management, profile customization, and real-time chat features.',
    stack: [
      { name: 'Next.js' },
      { name: 'Clerk' },
      { name: 'React' },
    ],
    image: '/assets/work/bliss-socially.png',
    live: "https://bls-social-app.vercel.app",
    github: "https://github.com/Blissmal/social-app"
  },
  {
    num: '02',
    category: 'full stack',
    title: 'FB Like social app',
    description: 'A Facebook-inspired social platform with authentication, image uploads, and database integration.',
    stack: [
      { name: 'Next.js' },
      { name: 'Clerk' },
      { name: 'PostgreSQL' },
      { name: 'Cloudinary' },
    ],
    image: '/assets/work/bliss-social.png',
    live: "https://bliss-social.vercel.app",
    github: "https://github.com/Blissmal/next-social-media-app"
  },
  {
    num: '03',
    category: 'frontend',
    title: 'React firebase chat',
    description: 'A real-time chat application with authentication, emoji support, image sharing, and user blocking.',
    stack: [
      { name: 'React' },
      { name: 'Firebase' },
      { name: 'Firestore' },
    ],
    image: '/assets/work/firebaseChat.png',
    live: "https://bliss-firebase-chat.vercel.app",
    github: "https://github.com/Blissmal/react-firebaseChat"
  },
  {
    num: '04',
    category: 'full stack',
    title: 'Ecommerce Application',
    description: 'A modern e-commerce platform with product variants, cart management, M-Pesa integration, and admin dashboard.',
    stack: [
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'M-Pesa API' },
      { name: 'Neon postgresql' }
    ],
    image: '/assets/work/ecommerce.png',
    live: "https://bls-ecommerce-site.vercel.app",
    github: "#"
  },
  {
    num: '05',
    category: 'full stack',
    title: 'Hire Purchase Ecommerce',
    description: 'A smartphone e-commerce platform with flexible hire purchase financing for the Kenyan market.',
    stack: [
      { name: 'Next.js' },
      { name: 'TypeScript' },
      { name: 'Payment Integration' },
    ],
    image: '/assets/work/HP-purchase.png',
    live: "https://lipa-phone.vercel.app",
    github: "#"
  }
];

const Work = () => {
  const [project, setProject] = useState(projects[0])

  const handleSlideChange = (swiper: SwiperCore) => {
    const currentIndex = swiper.activeIndex;
    setProject(projects[currentIndex])
  }

  return <motion.section
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' } }}
    className="min-h-[80vh] flex flex-col justify-center py-12 xl:py-0"
  >
    <div className="container mx-auto">
      <div className="flex flex-col xl:flex-row xl:gap-7.5">
        <div className="w-full xl:w-[50%] xl:h-115 flex flex-col xl:justify-between order-2 xl:order-0">
          <div className="flex flex-col gap-7.5 h-[50%]">
            <div className="text-8xl leading-none font-extrabold text-transparent text-outline">{project.num}</div>
            <h2 className="text-[42px] font-bold leading-none text-white group-hover:text-accent transition-all duration-500 capitalize">{project.category} project</h2>
            <p className="text-white/60">{project.description}</p>

            <ul className="flex gap-4">
              {project.stack.map((stack, index) => (
                <li key={index} className="text-xl text-accent">{stack.name}{index !== project.stack.length - 1 && ","}</li>
              ))}
            </ul>
            <div className="border border-white/20"></div>
            <div className="flex items-center gap-4">
              <Link href={project.live}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="w-17.5 h-17.5 rounded-full bg-white/5 flex justify-center items-center group">
                      <BsArrowUpRight className="text-white text-3xl group-hover:text-accent" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Live project</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>


              <Link href={project.github}>
                <TooltipProvider delayDuration={100}>
                  <Tooltip>
                    <TooltipTrigger className="w-17.5 h-17.5 rounded-full bg-white/5 flex justify-center items-center group">
                      <BsGithub className="text-white text-3xl group-hover:text-accent" />
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Github repository</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </Link>
            </div>
          </div>
        </div>
        <div className="w-full xl:w-[50%]">
          <Swiper spaceBetween={30} slidesPerView={1} className="xl:h-130 mb-12" onSlideChange={handleSlideChange}>
            {projects.map((project, index) => (
              <SwiperSlide key={index} className="w-full">
                <div className="h-115 relative group flex justify-center items-center bg-pink-50/20">
                  <div className="absolute top-0 bottom-0 w-full h-full bg-black/10 z-10"></div>
                  <div className="relative w-full h-full">
                    <Image src={project.image} fill className="object-cover" alt="" />
                  </div>
                </div>
              </SwiperSlide>
            ))}
            <WorkSliderButtons
              containerStyles="flex gap-2 absolute right-0 bottom-[calc(50%_-_22px)] xl:bottom-0 z-20 w-full justify-between xl:w-max xl:justify-none"
              btnStyles="bg-accent hover:bg-accent-hover text-primary text-[22px] w-11 h-11 flex justify-center items-center transition-all "
              iconStyles=""
            />
          </Swiper>
        </div>
      </div>
    </div>
  </motion.section>;
};

export default Work;
