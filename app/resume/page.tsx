"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs, FaPython, FaJava, FaCloud } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiPostgresql, SiMysql, SiAndroid, SiGit, SiCplusplus, SiVitess } from "react-icons/si";

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
  icon: "/assets/resume/badge.svg",
  title: "My experience",
  description: "Throughout my career, I've gained hands-on experience in full-stack development and IT operations. From freelance projects to corporate internships, I've developed a strong foundation in building scalable applications and solving complex technical challenges.",
  items: [
    { company: "Freelance", position: "Full Stack Software Developer", duration: "2023 - present" },
    { company: "KWFT Bank", position: "IT Intern", duration: "summer/autumn 2025" },
  ],
};

const education = {
  icon: "/assets/resume/cap.svg",
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

const AnimatedCard = ({ children, index }: { children: React.ReactNode; index: number }) => {
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    gsap.fromTo(el,
      { opacity: 0, y: 30, scale: 0.95 },
      { opacity: 1, y: 0, scale: 1, duration: 0.5, delay: index * 0.1, ease: "power3.out" }
    );
  }, [index]);
  return <li ref={ref}>{children}</li>;
};

const SkillIcon = ({ skill, index }: { skill: { icon: React.ReactNode; name: string }; index: number }) => {
  const ref = useRef<HTMLLIElement>(null);
  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, scale: 0.5, rotateY: 90 },
      { opacity: 1, scale: 1, rotateY: 0, duration: 0.5, delay: index * 0.05, ease: "back.out(1.7)" }
    );
  }, [index]);

  const handleEnter = () => {
    const el = ref.current?.querySelector(".skill-icon");
    if (el) gsap.to(el, { scale: 1.2, rotateZ: 10, duration: 0.3 });
  };
  const handleLeave = () => {
    const el = ref.current?.querySelector(".skill-icon");
    if (el) gsap.to(el, { scale: 1, rotateZ: 0, duration: 0.3 });
  };

  return (
    <li ref={ref} onMouseEnter={handleEnter} onMouseLeave={handleLeave}>
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger className="w-full h-[150px] bg-[#232329] rounded-xl flex justify-center items-center group cursor-none">
            <div className="skill-icon text-6xl group-hover:text-accent transition-colors duration-300">{skill.icon}</div>
          </TooltipTrigger>
          <TooltipContent><p className="capitalize">{skill.name}</p></TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </li>
  );
};

const Resume = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: "easeIn" } }}
      className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0 relative z-10"
    >
      <div className="container mx-auto">
        <Tabs defaultValue="experience" className="flex flex-col xl:flex-row gap-[60px]">
          <TabsList className="flex flex-col w-full max-w-[380px] mx-auto xl:mx-0 gap-6">
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="about">About me</TabsTrigger>
          </TabsList>

          <div className="min-h-[70vh] w-full">
            <TabsContent value="experience" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{experience.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{experience.description}</p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {experience.items.map((item, index) => (
                      <AnimatedCard key={index} index={index}>
                        <div className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 hover:bg-[#2a2a32] hover:shadow-[0_0_20px_rgba(0,255,153,0.1)] transition-all duration-300 group">
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left group-hover:text-accent/80 transition-colors duration-300">{item.position}</h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent animate-pulse" />
                            <p className="text-white/60">{item.company}</p>
                          </div>
                        </div>
                      </AnimatedCard>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="education" className="w-full">
              <div className="flex flex-col gap-[30px] text-center xl:text-left">
                <h3 className="text-4xl font-bold">{education.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{education.description}</p>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-1 lg:grid-cols-2 gap-[30px]">
                    {education.items.map((item, index) => (
                      <AnimatedCard key={index} index={index}>
                        <div className="bg-[#232329] h-[184px] py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1 hover:bg-[#2a2a32] hover:shadow-[0_0_20px_rgba(0,255,153,0.1)] transition-all duration-300 group">
                          <span className="text-accent">{item.duration}</span>
                          <h3 className="text-xl max-w-[260px] min-h-[60px] text-center lg:text-left group-hover:text-accent/80 transition-colors">{item.degree}</h3>
                          <div className="flex items-center gap-3">
                            <span className="w-[6px] h-[6px] rounded-full bg-accent animate-pulse" />
                            <p className="text-white/60">{item.institution}</p>
                          </div>
                        </div>
                      </AnimatedCard>
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="skills" className="w-full h-full">
              <div className="flex flex-col gap-[30px]">
                <div className="flex flex-col gap-[30px] text-center xl:text-left">
                  <h3 className="text-4xl font-bold">{skills.title}</h3>
                  <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{skills.description}</p>
                </div>
                <ScrollArea className="h-[400px]">
                  <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-[30px]">
                    {skills.skillset.map((skill, index) => (
                      <SkillIcon key={index} skill={skill} index={index} />
                    ))}
                  </ul>
                </ScrollArea>
              </div>
            </TabsContent>

            <TabsContent value="about" className="w-full text-center xl:text-left">
              <div className="flex flex-col gap-[30px]">
                <h3 className="text-4xl font-bold">{about.title}</h3>
                <p className="max-w-[600px] text-white/60 mx-auto xl:mx-0">{about.description}</p>
                <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-[620px] mx-auto xl:mx-0">
                  {about.info.map((item, index) => (
                    <li
                      key={index}
                      className="flex items-center justify-center xl:justify-start gap-4 group hover:translate-x-1 transition-transform duration-200"
                    >
                      <span className="text-white/60 group-hover:text-white/80 transition-colors">{item.fieldName}</span>
                      <span className="text-xl group-hover:text-accent transition-colors duration-300">{item.fieldValue}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>
          </div>
        </Tabs>
      </div>
    </motion.div>
  );
};

export default Resume;