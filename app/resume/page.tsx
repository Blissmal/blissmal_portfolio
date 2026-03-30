"use client";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs, FaPython, FaJava, FaCloud } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiPostgresql, SiMysql, SiAndroid, SiGit, SiCplusplus, SiVitess } from "react-icons/si";

gsap.registerPlugin(ScrollTrigger);

const about = {
  title: "About me",
  description: "Hi Everyone, I am Bethuel Maluti from Nairobi, Kenya. 🌱 I'm currently pursuing Bachelor of Science in Software Engineering at Kirinyaga University, Kenya. I'm passionate about creating innovative solutions and building impactful software.",
  info: [
    { fieldName: "Name", fieldValue: "Bethuel Maluti" },
    { fieldName: "Phone", fieldValue: "(+254) 706 845 000" },
    { fieldName: "Experience", fieldValue: "5+ Years" },
    { fieldName: "Email", fieldValue: "malutibethuel@gmail.com" },
    { fieldName: "Nationality", fieldValue: "Kenyan" },
    { fieldName: "Freelance", fieldValue: "Available" },
    { fieldName: "Languages", fieldValue: "English, Swahili" },
  ],
};

const experience = {
  title: "My experience",
  description: "Throughout my career, I've gained hands-on experience in full-stack development and IT operations. From freelance projects to corporate internships, I've developed a strong foundation in building scalable applications and solving complex technical challenges.",
  items: [
    { company: "Freelance", position: "Full Stack Software Developer", duration: "2023 - present" },
    { company: "KWFT Bank", position: "IT Intern", duration: "summer/autumn 2025" },
  ],
};

const education = {
  title: "My education",
  description: "My educational journey combines formal university training with practical bootcamp experience and self-directed learning.",
  items: [
    { institution: "Kirinyaga University", degree: "Bachelor of Science: Software Engineering", duration: "2023 - present" },
    { institution: "KWFT Bank", degree: "IT Student Intern", duration: "autumn/winter 2025" },
    { institution: "Youtube", degree: "Self Taught ReactJs Developer", duration: "2024" },
    { institution: "E-mobilis Mobile Technology Institute", degree: "MIT: Full Stack Software Development", duration: "summer/autumn 2023" },
  ],
};

const skills = {
  title: "My skills",
  description: "I've developed proficiency across the full technology stack, from frontend frameworks to backend databases.",
  skillset: [
    { icon: <FaHtml5 />, name: "html 5" },
    { icon: <FaCss3 />, name: "css 3" },
    { icon: <FaJs />, name: "javascript" },
    { icon: <FaReact />, name: "react.js" },
    { icon: <SiNextdotjs />, name: "next.js" },
    { icon: <SiTailwindcss />, name: "tailwind.css" },
    { icon: <FaNodeJs />, name: "node.js" },
    { icon: <SiPostgresql />, name: "postgresql" },
    { icon: <FaPython />, name: "python" },
    { icon: <FaJava />, name: "java" },
    { icon: <SiMysql />, name: "mysql" },
    { icon: <SiAndroid />, name: "android" },
    { icon: <SiGit />, name: "git" },
    { icon: <FaCloud />, name: "cloud computing" },
    { icon: <SiCplusplus />, name: "c++" },
    { icon: <SiVitess />, name: "vitejs" },
  ],
};

// Card component for experience/education
const ResumeCard = ({ item, type, index }: { item: any; type: "experience" | "education"; index: number }) => {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.fromTo(
      cardRef.current,
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, delay: index * 0.1, ease: "power3.out" }
    );
  }, [index]);

  return (
    <div
      ref={cardRef}
      className="resume-card group relative overflow-hidden border border-white/6 p-8 lg:p-10 transition-all duration-400"
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(0,255,153,0.05) 0%, transparent 60%)",
        }}
      />

      {/* Top accent bar */}
      <div className="h-0.5 w-12 bg-accent mb-6 group-hover:w-16 transition-all duration-400 relative z-10" />

      {/* Duration badge */}
      <span className="text-[10px] tracking-[2px] uppercase text-accent bg-accent/8 border border-accent/20 px-3 py-1.5 inline-block mb-4 relative z-10">
        {item.duration}
      </span>

      {/* Title */}
      <h3 className="text-lg lg:text-xl leading-tight mb-4 text-white group-hover:text-accent transition-colors duration-300 max-w-75 relative z-10"
        style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "0.5px" }}
      >
        {type === "experience" ? item.position : item.degree}
      </h3>

      {/* Company/Institution */}
      <div className="flex items-center gap-3 pt-4 border-t border-white/6 group-hover:border-accent/20 transition-colors duration-300 relative z-10">
        <span className="w-2 h-2 rounded-full bg-accent" />
        <p className="text-sm text-white/50 group-hover:text-white/70 transition-colors duration-300">
          {type === "experience" ? item.company : item.institution}
        </p>
      </div>
    </div>
  );
};

// Skill icon component
const SkillIcon = ({ skill, index }: { skill: { icon: React.ReactNode; name: string }; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.fromTo(
      ref.current,
      { opacity: 0, scale: 0.6 },
      { opacity: 1, scale: 1, duration: 0.5, delay: index * 0.05, ease: "back.out(1.7)" }
    );
  }, [index]);

  const handleEnter = () => {
    if (ref.current?.querySelector(".skill-icon")) {
      gsap.to(ref.current.querySelector(".skill-icon"), {
        scale: 1.3,
        duration: 0.3,
        ease: "back.out(2)",
      });
    }
  };

  const handleLeave = () => {
    if (ref.current?.querySelector(".skill-icon")) {
      gsap.to(ref.current.querySelector(".skill-icon"), {
        scale: 1,
        duration: 0.3,
      });
    }
  };

  return (
    <div
      ref={ref}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      className="skill-card group relative"
    >
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger className="w-full h-35 border border-white/6 bg-linear-to-br from-white/3 to-transparent flex justify-center items-center transition-all duration-300 group-hover:border-accent/40 group-hover:bg-linear-to-br group-hover:from-accent/8 group-hover:to-transparent">
            <div className="skill-icon text-5xl group-hover:text-accent transition-colors duration-300">
              {skill.icon}
            </div>
          </TooltipTrigger>
          <TooltipContent><p className="capitalize text-xs tracking-wide">{skill.name}</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </div>
  );
};

const Resume = () => {
  const [activeTab, setActiveTab] = useState("experience");
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  const tabs = [
    { value: "experience", label: "Experience" },
    { value: "education", label: "Education" },
    { value: "skills", label: "Skills" },
    { value: "about", label: "About" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".resume-header", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 85%",
          once: true,
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: "power3.out",
      });

      gsap.from(".resume-content", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 0.7,
        ease: "power3.out",
      });
    }, sectionRef);

    const t = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  // Animate content on tab change
  useEffect(() => {
    if (contentRef.current) {
      gsap.fromTo(
        contentRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.4, ease: "power2.out" }
      );
    }
  }, [activeTab]);

  const renderContent = () => {
    switch (activeTab) {
      case "experience":
        return (
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-4xl xl:text-5xl tracking-wide uppercase mb-3 text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {experience.title}
              </h2>
              <p className="text-sm text-white/40 max-w-125 leading-relaxed font-light">
                {experience.description}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {experience.items.map((item, index) => (
                <ResumeCard key={index} item={item} type="experience" index={index} />
              ))}
            </div>
          </div>
        );

      case "education":
        return (
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-4xl xl:text-5xl tracking-wide uppercase mb-3 text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {education.title}
              </h2>
              <p className="text-sm text-white/40 max-w-125 leading-relaxed font-light">
                {education.description}
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {education.items.map((item, index) => (
                <ResumeCard key={index} item={item} type="education" index={index} />
              ))}
            </div>
          </div>
        );

      case "skills":
        return (
          <div className="flex flex-col gap-8">
            <div>
              <h2 className="text-4xl xl:text-5xl tracking-wide uppercase mb-3 text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {skills.title}
              </h2>
              <p className="text-sm text-white/40 max-w-125 leading-relaxed font-light">
                {skills.description}
              </p>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {skills.skillset.map((skill, index) => (
                <SkillIcon key={index} skill={skill} index={index} />
              ))}
            </div>
          </div>
        );

      case "about":
        return (
          <div className="flex flex-col gap-12">
            <div>
              <h2 className="text-4xl xl:text-5xl tracking-wide uppercase mb-3 text-white"
                style={{ fontFamily: "'Bebas Neue', sans-serif" }}
              >
                {about.title}
              </h2>
              <p className="text-sm text-white/40 max-w-150 leading-relaxed font-light">
                {about.description}
              </p>
            </div>

            {/* Info grid */}
            <div className="border border-white/6 divide-y divide-white/6">
              {about.info.map((item, index) => (
                <div
                  key={index}
                  className="group flex flex-col md:flex-row md:items-center md:justify-between gap-4 p-6 xl:p-8 transition-all duration-300 hover:bg-white/2"
                >
                  <span className="text-xs tracking-[2px] uppercase text-white/40 group-hover:text-white/60 transition-colors duration-300">
                    {item.fieldName}
                  </span>
                  <span className="text-lg text-accent group-hover:text-white transition-colors duration-300 font-light">
                    {item.fieldValue}
                  </span>
                </div>
              ))}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center py-16 xl:py-24 relative z-10"
    >
      <div className="container mx-auto px-6 xl:px-12 max-w-6xl">
        {/* Header */}
        <div className="resume-header flex items-end justify-between border-b border-white/6 pb-8 mb-16 gap-8">
          <h1
            className="text-[64px] xl:text-[88px] leading-none tracking-widest uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            My<br />
            <span className="text-accent">Journey</span>
          </h1>
          <p className="text-sm text-white/40 text-right max-w-50 leading-relaxed hidden md:block font-light">
            Education, experience, and skills that shape my craft.
          </p>
        </div>

        {/* Custom Tab Navigation */}
        <div className="border-b border-white/6 mb-16 pb-0 overflow-x-auto">
          <div className="flex gap-16 min-w-max relative">
            {tabs.map((tab) => (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`text-xs tracking-[3px] uppercase relative pb-5 transition-all duration-300 ${activeTab === tab.value
                    ? "text-accent"
                    : "text-white/40 hover:text-white/70"
                  }`}
              >
                {tab.label}
                {activeTab === tab.value && (
                  <span className="absolute bottom-0 left-0 h-0.5 w-full bg-accent" />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div ref={contentRef} className="resume-content">
          {renderContent()}
        </div>
      </div>
    </section>
  );
};

export default Resume;