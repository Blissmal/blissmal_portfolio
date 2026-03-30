"use client"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { motion } from "framer-motion"
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa'
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { resend } from "@/lib/resend"
import { sendContactEmail } from "@/lib/contact"
import { toast } from "sonner"

gsap.registerPlugin(ScrollTrigger)

const info = [
  { icon: <FaPhoneAlt />, title: 'Phone', description: '(+254) 706 845 000' },
  { icon: <FaEnvelope />, title: 'Email', description: 'malutibethuel@gmail.com' },
  { icon: <FaMapMarkerAlt />, title: 'Address', description: 'Kirinyaga University, Kenya' },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Stagger info items
      gsap.from(".contact-info-item", {
        x: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 0.7,
        ease: "power3.out",
        delay: 2.5,
      })

      // Form fields stagger
      gsap.from(".form-field", {
        y: 20,
        opacity: 0,
        stagger: 0.1,
        duration: 0.5,
        ease: "power2.out",
        delay: 2.5,
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Ripple on button click
  const handleSend = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget
    gsap.fromTo(btn, { scale: 0.95 }, { scale: 1, duration: 0.3, ease: "elastic.out(1.5, 0.5)" })
  }

  const handleContact = async (formData: FormData) => {
    const result = await sendContactEmail(formData);
    
    if (result.success) {
      toast.success("Message sent successfully!");
      formRef.current?.reset();
    } else {
      toast.error("Failed to send message.");
    }
  }


  return (
    <motion.section
      ref={sectionRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, transition: { delay: 2.4, duration: 0.4, ease: 'easeIn' } }}
      className="py-6 relative z-10"
    >
      <div className="container mx-auto">
        <div className="flex flex-col xl:flex-row gap-7.5">
          <div className="xl:w-[54%] order-2 xl:order-0">
            <form ref={formRef} action={handleContact} className="flex flex-col gap-6 p-10 bg-[#27272c] rounded-xl relative overflow-hidden">
              {/* Animated gradient border */}
              <div className="absolute inset-0 rounded-xl opacity-30 pointer-events-none"
                style={{
                  background: "linear-gradient(135deg, rgba(0,255,153,0.05) 0%, transparent 50%, rgba(0,255,153,0.05) 100%)",
                }}
              />

              <h3 className="text-4xl text-accent relative">
                Let&apos;s work together
                <span className="absolute -bottom-1 left-0 h-0.5 bg-accent w-16" />
              </h3>
              <p className="text-white/60">Have a project in mind? Let&apos;s discuss it and make something great together.</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {["Firstname", "Lastname", "Email address", "Phone number"].map((placeholder, i) => (
                  <div key={i} className="form-field">
                    <Input
                      placeholder={placeholder}
                      name={placeholder.toLowerCase().replace(/\s/g, "-")}
                      type={placeholder.includes("Email") ? "email" : "text"}
                      className="transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(0,255,153,0.3)] focus:border-accent"
                    />
                  </div>
                ))}
              </div>

              <div className="form-field">
                <Select name="service">
                  <SelectTrigger className="w-full focus:shadow-[0_0_0_2px_rgba(0,255,153,0.3)]">
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectLabel>Select a Service</SelectLabel>
                      <SelectItem value="web">Web Development</SelectItem>
                      <SelectItem value="ui">UI/UX Design</SelectItem>
                      <SelectItem value="logo">Logo Design</SelectItem>
                      <SelectItem value="mobile">Mobile App</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              <div className="form-field">
                <Textarea
                  className="h-50 transition-all duration-300 focus:shadow-[0_0_0_2px_rgba(0,255,153,0.3)] focus:border-accent"
                  placeholder="Type your message here."
                  name="message"
                />
              </div>

              <Button
                size="md"
                className="max-w-40 relative overflow-hidden group/send"
                type="submit"
                onClick={handleSend}
              >
                <span className="relative z-10 group-hover/send:text-primary transition-colors duration-300">Send message</span>
                <span className="absolute inset-0 bg-accent scale-x-0 group-hover/send:scale-x-100 transition-transform duration-300 origin-left" />
              </Button>
            </form>
          </div>

          <div className="flex-1 flex items-center xl:justify-end order-1 xl:order-0 mb-8 xl:mb-0">
            <ul className="flex flex-col gap-10">
              {info.map((item, index) => (
                <li
                  key={index}
                  className="contact-info-item flex items-center gap-6 group"
                >
                  <div className="w-13 h-13 xl:w-18 xl:h-18 bg-[#27272c] text-accent rounded-md flex items-center justify-center group-hover:bg-accent group-hover:text-primary transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,255,153,0.4)] group-hover:scale-110">
                    <div className="text-[28px]">{item.icon}</div>
                  </div>
                  <div className="flex-1">
                    <p className="text-white/60 group-hover:text-white/80 transition-colors duration-300">{item.title}</p>
                    <h3 className="text-xl group-hover:text-accent transition-colors duration-300">{item.description}</h3>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.section>
  )
}

export default Contact