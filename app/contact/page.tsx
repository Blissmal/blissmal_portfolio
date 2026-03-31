"use client"

import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { sendContactEmail } from "@/lib/contact"
import { toast } from "sonner"
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa"

gsap.registerPlugin(ScrollTrigger)

const contactInfo = [
  { icon: <FaPhoneAlt />, label: "Phone", value: "(+254) 706 845 000", href: "tel:+254706845000" },
  { icon: <FaEnvelope />, label: "Email", value: "malutibethuel@gmail.com", href: "mailto:malutibethuel@gmail.com" },
  { icon: <FaMapMarkerAlt />, label: "Location", value: "Kirinyaga University, Kenya", href: "#" },
]

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null)
  const formRef = useRef<HTMLFormElement>(null)

  // UI State Management
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  useEffect(() => {
    const all = sectionRef.current?.querySelectorAll(
      '.contact-header, .contact-info-card, .contact-form-container, .form-field'
    )
    if (all?.length) gsap.set(all, { opacity: 1, y: 0, x: 0 })

    const ctx = gsap.context(() => {
      const base = {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 88%', once: true },
        ease: 'power3.out',
        clearProps: 'all',
      }

      gsap.from('.contact-header', { ...base, y: 28, opacity: 0, duration: 0.6 })
      gsap.from('.contact-info-card', { ...base, x: -32, opacity: 0, stagger: 0.09, duration: 0.55, delay: 0.1 })
      gsap.from('.contact-form-container', { ...base, y: 32, opacity: 0, duration: 0.65, delay: 0.15 })
      gsap.from('.form-field', { ...base, y: 16, opacity: 0, stagger: 0.07, duration: 0.45, delay: 0.25 })
    }, sectionRef)

    const t = setTimeout(() => ScrollTrigger.refresh(), 150)
    return () => { clearTimeout(t); ctx.revert() }
  }, [])

  // Handle standard form submission to control state
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Extract FormData from the event target
    const formData = new FormData(e.currentTarget)
    const result = await sendContactEmail(formData)

    setIsSubmitting(false)

    if (result.success) {
      setIsSuccess(true)
      formRef.current?.reset() // Reset so it's fresh if they click "Send another"
    } else {
      // Keep toast for errors only so the user knows what went wrong
      toast.error("Failed to send message. Please try again.")
    }
  }

  const handleSendClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (isSubmitting) return; // Prevent animation if already submitting
    gsap.fromTo(e.currentTarget,
      { scale: 0.95 },
      { scale: 1, duration: 0.35, ease: 'elastic.out(1.5, 0.5)' }
    )
  }

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center py-16 xl:py-24 relative z-10"
    >
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: `linear-gradient(rgba(255,255,255,0.012) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(255,255,255,0.012) 1px, transparent 1px)`,
        backgroundSize: '80px 80px',
      }} />

      <div className="container mx-auto px-6 xl:px-12 max-w-6xl">

        {/* Header */}
        <div className="contact-header flex items-end justify-between border-b border-white/6 pb-10 mb-16 gap-8">
          <div>
            <span className="text-[10px] tracking-[4px] uppercase text-accent/50 font-mono block mb-3">
              Contact
            </span>
            <h1
              className="text-[64px] xl:text-[88px] leading-none tracking-widest uppercase"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              Get In<br />
              <span className="text-accent">Touch</span>
            </h1>
          </div>
          <p className="text-sm text-white/35 text-right max-w-50 leading-relaxed hidden md:block font-light pb-2">
            Have a project in mind? Let's create something extraordinary.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-10 xl:gap-8">

          {/* Info cards */}
          <div className="xl:col-span-1 flex flex-col gap-5">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="contact-info-card group relative overflow-hidden border border-white/6 p-7 transition-all duration-400 hover:no-underline hover:border-accent/20"
              >
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{ background: 'linear-gradient(135deg, rgba(0,255,153,0.05) 0%, transparent 60%)' }} />

                <div className="w-14 h-14 border border-accent/15 bg-accent/6 flex items-center justify-center mb-5
                  group-hover:border-accent/35 group-hover:bg-accent/12 transition-all duration-300
                  group-hover:shadow-[0_0_18px_rgba(0,255,153,0.15)]">
                  <div className="text-xl text-accent group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>

                <p className="text-[10px] tracking-[2.5px] uppercase text-white/35 mb-1.5
                  group-hover:text-white/55 transition-colors duration-300">
                  {item.label}
                </p>
                <h3 className="text-base text-white group-hover:text-accent transition-colors duration-300
                  font-light break-all">
                  {item.value}
                </h3>

                <div className="absolute bottom-0 left-0 h-px w-0 bg-accent group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </div>

          {/* Form Container */}
          <div className="contact-form-container xl:col-span-2 border border-white/6 p-10 xl:p-14 relative overflow-hidden min-h-125 flex flex-col justify-center">

            {/* Subtle corner accents */}
            <div className="absolute top-0 left-0 w-16 h-16 pointer-events-none">
              <div className="absolute top-0 left-0 w-full h-px bg-accent/30" />
              <div className="absolute top-0 left-0 h-full w-px bg-accent/30" />
            </div>
            <div className="absolute bottom-0 right-0 w-16 h-16 pointer-events-none">
              <div className="absolute bottom-0 right-0 w-full h-px bg-accent/20" />
              <div className="absolute bottom-0 right-0 h-full w-px bg-accent/20" />
            </div>

            {isSuccess ? (
              /* SUCCESS UI */
              <div className="relative z-10 flex flex-col items-center justify-center text-center gap-6 py-10 animate-in fade-in zoom-in-95 duration-500">
                <div className="w-20 h-20 border border-accent/30 bg-accent/5 flex items-center justify-center rounded-full shadow-[0_0_30px_rgba(0,255,153,0.15)] mb-2">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-accent">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h3 className="text-[44px] xl:text-[54px] text-white tracking-wide uppercase leading-none mb-4" style={{ fontFamily: "'Bebas Neue', sans-serif" }}>
                    Message <span className="text-accent">Sent</span>
                  </h3>
                  <div className="h-px w-16 bg-accent/60 mx-auto mb-5" />
                  <p className="text-sm text-white/50 max-w-75 mx-auto leading-relaxed font-light">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                </div>
                <button
                  onClick={() => setIsSuccess(false)}
                  className="text-[10px] tracking-[3px] uppercase text-accent/60 hover:text-accent transition-colors duration-300 mt-6 flex items-center gap-2"
                >
                  Send another message <span className="text-base">→</span>
                </button>
              </div>
            ) : (
              /* FORM UI */
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                className="relative z-10"
              >
                {/* Form header */}
                <div className="mb-10">
                  <span className="text-[10px] tracking-[4px] uppercase text-accent/50 font-mono block mb-3">
                    Send a message
                  </span>
                  <h2
                    className="text-[44px] xl:text-[54px] text-white tracking-wide uppercase leading-none mb-4"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    Let's work<br />
                    <span className="text-accent">together</span>
                  </h2>
                  <div className="h-px w-16 bg-accent/60 mb-5" />
                  <p className="text-sm text-white/35 max-w-85 leading-relaxed font-light">
                    Drop your details and a brief message. I'll get back to you within 24 hours.
                  </p>
                </div>

                {/* Fields */}
                <div className="space-y-5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="form-field">
                      <Input name="firstname" placeholder="First name" type="text" required
                        className="h-13 bg-white/2 border border-white/[0.07] text-white placeholder:text-white/25
                          rounded-none focus:border-accent focus:shadow-[0_0_0_2px_rgba(0,255,153,0.08)] transition-all duration-300" />
                    </div>
                    <div className="form-field">
                      <Input name="lastname" placeholder="Last name" type="text" required
                        className="h-13 bg-white/2 border border-white/[0.07] text-white placeholder:text-white/25
                          rounded-none focus:border-accent focus:shadow-[0_0_0_2px_rgba(0,255,153,0.08)] transition-all duration-300" />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="form-field">
                      <Input name="email" placeholder="Email address" type="email" required
                        className="h-13 bg-white/2 border border-white/[0.07] text-white placeholder:text-white/25
                          rounded-none focus:border-accent focus:shadow-[0_0_0_2px_rgba(0,255,153,0.08)] transition-all duration-300" />
                    </div>
                    <div className="form-field">
                      <Input name="phone" placeholder="Phone number" type="tel"
                        className="h-13 bg-white/2 border border-white/[0.07] text-white placeholder:text-white/25
                          rounded-none focus:border-accent focus:shadow-[0_0_0_2px_rgba(0,255,153,0.08)] transition-all duration-300" />
                    </div>
                  </div>

                  <div className="form-field">
                    <Select name="service" required>
                      <SelectTrigger className="h-13 bg-white/2 border border-white/[0.07] text-white rounded-none
                        focus:border-accent focus:shadow-[0_0_0_2px_rgba(0,255,153,0.08)]">
                        <SelectValue placeholder="Select a service" className="text-white/25" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#141414] border border-white/[0.07]">
                        <SelectGroup>
                          <SelectLabel className="text-white/40 text-xs tracking-widest uppercase">Services</SelectLabel>
                          <SelectItem value="web" className="hover:bg-accent/10 cursor-pointer">Web Development</SelectItem>
                          <SelectItem value="mobile" className="hover:bg-accent/10 cursor-pointer">Mobile App Development</SelectItem>
                          <SelectItem value="ui" className="hover:bg-accent/10 cursor-pointer">UI/UX Design</SelectItem>
                          <SelectItem value="ai" className="hover:bg-accent/10 cursor-pointer">AI / ML Integration</SelectItem>
                          <SelectItem value="other" className="hover:bg-accent/10 cursor-pointer">Other</SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="form-field">
                    <Textarea name="message" placeholder="Tell me about your project..." required
                      className="min-h-32.5 bg-white/2 border border-white/[0.07] text-white placeholder:text-white/25
                        rounded-none focus:border-accent focus:shadow-[0_0_0_2px_rgba(0,255,153,0.08)] resize-none transition-all duration-300" />
                  </div>

                  {/* Submit */}
                  <div className="flex items-center gap-6 pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      onClick={handleSendClick}
                      className="px-12 py-4 bg-accent text-black uppercase tracking-[2px] font-semibold text-xs
                        transition-all duration-300 hover:shadow-[0_0_24px_rgba(0,255,153,0.35)] hover:scale-[1.03] active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                    >
                      {isSubmitting ? 'Sending...' : 'Send message'}
                    </button>
                    <div className="h-px flex-1 bg-linear-to-r from-accent/50 to-transparent" />
                  </div>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact;