"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { sendContactEmail } from "@/lib/contact";
import { toast } from "sonner";
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from "react-icons/fa";

gsap.registerPlugin(ScrollTrigger);

const contactInfo = [
  {
    icon: <FaPhoneAlt />,
    label: "Phone",
    value: "(+254) 706 845 000",
    href: "tel:+254706845000",
  },
  {
    icon: <FaEnvelope />,
    label: "Email",
    value: "malutibethuel@gmail.com",
    href: "mailto:malutibethuel@gmail.com",
  },
  {
    icon: <FaMapMarkerAlt />,
    label: "Location",
    value: "Kirinyaga University, Kenya",
    href: "#",
  },
];

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.from(".contact-header", {
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

      // Info cards stagger
      gsap.from(".contact-info-card", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          once: true,
        },
        x: -40,
        opacity: 0,
        stagger: 0.1,
        duration: 0.6,
        ease: "power3.out",
      });

      // Form entrance
      gsap.from(".contact-form", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 75%",
          once: true,
        },
        y: 40,
        opacity: 0,
        duration: 0.7,
        ease: "power3.out",
      });

      // Form fields stagger
      gsap.from(".form-field", {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          once: true,
        },
        y: 20,
        opacity: 0,
        stagger: 0.08,
        duration: 0.5,
        ease: "power2.out",
      });
    }, sectionRef);

    const t = setTimeout(() => ScrollTrigger.refresh(), 100);

    return () => {
      clearTimeout(t);
      ctx.revert();
    };
  }, []);

  const handleContact = async (formData: FormData) => {
    const result = await sendContactEmail(formData);

    if (result.success) {
      toast.success("Message sent successfully!");
      formRef.current?.reset();
    } else {
      toast.error("Failed to send message.");
    }
  };

  const handleSendClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    const btn = e.currentTarget;
    gsap.fromTo(
      btn,
      { scale: 0.95 },
      { scale: 1, duration: 0.3, ease: "elastic.out(1.5, 0.5)" }
    );
  };

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex flex-col justify-center py-16 xl:py-24 relative z-10"
    >
      <div className="container mx-auto px-6 xl:px-12 max-w-6xl">
        {/* Header */}
        <div className="contact-header flex items-end justify-between border-b border-white/[0.06] pb-8 mb-16 gap-8">
          <h1
            className="text-[64px] xl:text-[88px] leading-none tracking-widest uppercase"
            style={{ fontFamily: "'Bebas Neue', sans-serif" }}
          >
            Get In<br />
            <span className="text-accent">Touch</span>
          </h1>
          <p className="text-sm text-white/40 text-right max-w-[220px] leading-relaxed hidden md:block font-light">
            Have a project in mind? Let's discuss and create something extraordinary together.
          </p>
        </div>

        {/* Main layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-12 xl:gap-8">
          {/* Contact Info Cards */}
          <div className="xl:col-span-1 flex flex-col gap-6">
            {contactInfo.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="contact-info-card group relative overflow-hidden border border-white/[0.06] p-8 rounded-none transition-all duration-400 cursor-pointer hover:no-underline"
              >
                {/* Hover glow */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: "linear-gradient(135deg, rgba(0,255,153,0.05) 0%, transparent 60%)",
                  }}
                />

                {/* Icon box */}
                <div className="w-16 h-16 bg-gradient-to-br from-accent/[0.1] to-transparent border border-accent/20 rounded-none flex items-center justify-center mb-5 group-hover:bg-accent/[0.15] group-hover:border-accent/40 transition-all duration-300 group-hover:shadow-[0_0_20px_rgba(0,255,153,0.2)]">
                  <div className="text-2xl text-accent group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                </div>

                {/* Content */}
                <div className="relative z-10">
                  <p className="text-xs tracking-[2px] uppercase text-white/40 mb-2 group-hover:text-white/60 transition-colors duration-300">
                    {item.label}
                  </p>
                  <h3 className="text-lg text-white group-hover:text-accent transition-colors duration-300 font-light break-all">
                    {item.value}
                  </h3>
                </div>

                {/* Accent bar */}
                <div className="absolute bottom-0 left-0 h-[1px] w-0 bg-accent group-hover:w-full transition-all duration-500" />
              </a>
            ))}
          </div>

          {/* Contact Form */}
          <form
            ref={formRef}
            action={handleContact}
            className="contact-form xl:col-span-2 border border-white/[0.06] p-10 xl:p-14 rounded-none relative overflow-hidden"
          >
            {/* Subtle gradient overlay */}
            <div
              className="absolute inset-0 opacity-20 pointer-events-none"
              style={{
                background:
                  "linear-gradient(135deg, rgba(0,255,153,0.03) 0%, transparent 50%, rgba(0,255,153,0.03) 100%)",
              }}
            />

            {/* Header */}
            <div className="relative z-10 mb-10">
              <h2
                className="text-5xl xl:text-6xl text-white tracking-wide uppercase mb-4"
                style={{ fontFamily: "'Bebas Neue', sans-serif", letterSpacing: "1px" }}
              >
                Let's work<br />
                <span className="text-accent">together</span>
              </h2>
              <div className="h-[2px] w-20 bg-accent mb-6" />
              <p className="text-sm text-white/40 max-w-[350px] leading-relaxed font-light">
                Drop your details and a brief message about your project. I'll get back to you within 24 hours.
              </p>
            </div>

            {/* Form grid */}
            <div className="relative z-10">
              {/* Name fields */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="form-field">
                  <Input
                    placeholder="First name"
                    name="firstname"
                    type="text"
                    required
                    className="h-14 bg-white/[0.02] border border-white/[0.08] text-white placeholder:text-white/30 rounded-none transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,255,153,0.1)]"
                  />
                </div>
                <div className="form-field">
                  <Input
                    placeholder="Last name"
                    name="lastname"
                    type="text"
                    required
                    className="h-14 bg-white/[0.02] border border-white/[0.08] text-white placeholder:text-white/30 rounded-none transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,255,153,0.1)]"
                  />
                </div>
              </div>

              {/* Email & Phone */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="form-field">
                  <Input
                    placeholder="Email address"
                    name="email"
                    type="email"
                    required
                    className="h-14 bg-white/[0.02] border border-white/[0.08] text-white placeholder:text-white/30 rounded-none transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,255,153,0.1)]"
                  />
                </div>
                <div className="form-field">
                  <Input
                    placeholder="Phone number"
                    name="phone"
                    type="tel"
                    className="h-14 bg-white/[0.02] border border-white/[0.08] text-white placeholder:text-white/30 rounded-none transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,255,153,0.1)]"
                  />
                </div>
              </div>

              {/* Service select */}
              <div className="form-field mb-6">
                <Select name="service">
                  <SelectTrigger className="h-14 bg-white/[0.02] border border-white/[0.08] text-white rounded-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,255,153,0.1)]">
                    <SelectValue placeholder="Select a service" className="text-white/30" />
                  </SelectTrigger>
                  <SelectContent className="bg-[#1a1a1f] border border-white/[0.06]">
                    <SelectGroup>
                      <SelectLabel className="text-white/50">Services</SelectLabel>
                      <SelectItem value="web" className="hover:bg-accent/10 cursor-pointer">
                        Web Development
                      </SelectItem>
                      <SelectItem value="mobile" className="hover:bg-accent/10 cursor-pointer">
                        Mobile App Development
                      </SelectItem>
                      <SelectItem value="ui" className="hover:bg-accent/10 cursor-pointer">
                        UI/UX Design
                      </SelectItem>
                      <SelectItem value="ai" className="hover:bg-accent/10 cursor-pointer">
                        AI / ML Integration
                      </SelectItem>
                      <SelectItem value="other" className="hover:bg-accent/10 cursor-pointer">
                        Other
                      </SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>

              {/* Message */}
              <div className="form-field mb-8">
                <Textarea
                  placeholder="Tell me about your project..."
                  name="message"
                  required
                  className="min-h-[140px] bg-white/[0.02] border border-white/[0.08] text-white placeholder:text-white/30 rounded-none transition-all duration-300 focus:outline-none focus:border-accent focus:shadow-[0_0_0_3px_rgba(0,255,153,0.1)] resize-none"
                />
              </div>

              {/* Submit button with accent underline */}
              <div className="flex items-center gap-6">
                <button
                  type="submit"
                  onClick={handleSendClick}
                  className="px-12 py-4 bg-accent text-black uppercase tracking-[2px] font-medium text-sm transition-all duration-300 hover:shadow-[0_0_20px_rgba(0,255,153,0.3)] hover:scale-105 active:scale-95"
                >
                  Send message
                </button>
                <div className="h-[1px] flex-1 bg-gradient-to-r from-accent to-transparent" />
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;