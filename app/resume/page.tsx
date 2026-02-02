"use client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { motion } from "framer-motion";
import { FaHtml5, FaCss3, FaJs, FaReact, FaNodeJs, FaPython, FaJava, FaCloud } from "react-icons/fa";
import { SiTailwindcss, SiNextdotjs, SiPostgresql, SiMysql, SiAndroid, SiGit, SiCplusplus, SiVitess } from "react-icons/si";

const about = {
  title: "About me",
  description:
    "Hi Everyone, I am Bethuel Maluti from Nairobi, Kenya. 🌱 I'm currently pursuing Bachelor of Science in Software Engineering at Kirinyaga University, Kenya. I'm passionate about creating innovative solutions and building impactful software.",
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
  description:
    "Throughout my career, I've gained hands-on experience in full-stack development and IT operations. From freelance projects to corporate internships, I've developed a strong foundation in building scalable applications and solving complex technical challenges.",
  items: [
    {
      company: "Freelance",
      position: "Full Stack Software Developer",
      duration: "2023 - present",
    },
    {
      company: "KWFT Bank",
      position: "IT Intern",
      duration: "summer/autumn 2025",
    },
  ],
};

const education = {
  icon: "/assets/resume/cap.svg",
  title: "My education",
  description:
    "My educational journey combines formal university training with practical bootcamp experience and self-directed learning. This diverse approach has equipped me with both theoretical knowledge and real-world development skills.",
  items: [
    {
      institution: "Kirinyaga University",
      degree: "Bachelor of Science: Software Engineering",
      duration: "2023 - present",
    },
    {
      institution: "KWFT Bank",
      degree: "IT Student Intern",
      duration: "autumn/winter 2025",
    },
    {
      institution: "Youtube",
      degree: "Self Taught ReactJs Developer",
      duration: "2024"
    },
    {
      institution: "E-mobilis Mobile Technology Institute",
      degree: "MIT: Full Stack Software Development",
      duration: "summer/autumn 2023",
    },
  ],
};

const skills = {
  title: "My skills",
  description:
    "I've developed proficiency across the full technology stack, from frontend frameworks to backend databases. My skill set enables me to build complete, production-ready applications from concept to deployment.",
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

const Resume = () => {
  return <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' } }}
    className="min-h-[80vh] flex items-center justify-center py-12 xl:py-0"
  >
    <div className="container mx-auto">
      <Tabs defaultValue="experience" className="flex flex-col xl:flex-row gap-15">
        <TabsList className="flex flex-col w-full max-w-95 mx-auto xl:mx-0 gap-6">
          <TabsTrigger value="experience">Experience</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="about">About me</TabsTrigger>
        </TabsList>

        <div className="min-h-[70vh] w-full">
          <TabsContent value="experience" className="w-full">
            <div className="flex flex-col gap-7.5 text-center xl:text-left">
              <h3 className="text-4xl font-bold">{experience.title}</h3>
              <p className="max-w-150 text-white/60 mx-auto xl:mx-0">{experience.description}</p>
              <ScrollArea className="h-100">
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-7.5">
                  {experience.items.map((item, index) => (
                    <li key={index} className="bg-[#232329] h-46 py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                      <span className="text-accent">{item.duration}</span>
                      <h3 className="text-xl max-w-65 min-h-15 text-center lg:text-left">{item.position}</h3>
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <p className="text-white/60">{item.company}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          </TabsContent>
          <TabsContent value="education" className="w-full">
            <div className="flex flex-col gap-7.5 text-center xl:text-left">
              <h3 className="text-4xl font-bold">{education.title}</h3>
              <p className="max-w-150 text-white/60 mx-auto xl:mx-0">{education.description}</p>
              <ScrollArea className="h-100">
                <ul className="grid grid-cols-1 lg:grid-cols-2 gap-7.5">
                  {education.items.map((item, index) => (
                    <li key={index} className="bg-[#232329] h-46 py-6 px-10 rounded-xl flex flex-col justify-center items-center lg:items-start gap-1">
                      <span className="text-accent">{item.duration}</span>
                      <h3 className="text-xl max-w-65 min-h-15 text-center lg:text-left">{item.degree}</h3>
                      <div className="flex items-center gap-3">
                        <span className="w-1.5 h-1.5 rounded-full bg-accent"></span>
                        <p className="text-white/60">{item.institution}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          </TabsContent>
          <TabsContent value="skills" className="w-full h-full">
            <div className="flex flex-col gap-7.5">
              <div className="flex flex-col gap-7.5 text-center xl:text-left">
                <h3 className="text-4xl font-bold">{skills.title}</h3>
                <p className="max-w-150 text-white/60 mx-auto xl:mx-0">{skills.description}</p>
              </div>
              <ScrollArea className="h-100">
                <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 xl:gap-7.5">
                  {skills.skillset.map((skill, index) => (
                    <li key={index}>
                      <TooltipProvider delayDuration={100}>
                        <Tooltip>
                          <TooltipTrigger className="w-full h-37.5 bg-[#232329] rounded-xl flex justify-center items-center group">
                            <div className="text-6xl group-hover:text-accent transition-all duration-300">{skill.icon}</div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p className="capitalize">{skill.name}</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </li>
                  ))}
                </ul>
              </ScrollArea>
            </div>
          </TabsContent>
          <TabsContent value="about" className="w-full text-center xl:text-left">
            <div className="flex flex-col gap-7.5">
              <h3 className="text-4xl font-bold">{about.title}</h3>
              <p className="max-w-150 text-white/60 mx-auto xl:mx-0">{about.description}</p>
              <ul className="grid grid-cols-1 xl:grid-cols-2 gap-y-6 max-w-155 mx-auto xl:mx-0">
                {about.info.map((item, index) => (
                  <li key={index} className="flex items-center justify-center xl:justify-start gap-4">
                    <span className="text-white/60">{item.fieldName}</span>
                    <span className="text-xl">{item.fieldValue}</span>
                  </li>
                ))}
              </ul>
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  </motion.div>;
};

export default Resume;