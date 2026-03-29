"use client"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"
import { ReactNode, useEffect } from "react"
import gsap from "gsap"

const PageTransition = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname()

  useEffect(() => {
    // After page transition, animate page content in
    const ctx = gsap.context(() => {
      gsap.from(".page-content-animate", {
        opacity: 0,
        y: 10,
        duration: 0.5,
        ease: "power2.out",
        delay: 1.2,
      })
    })
    return () => ctx.revert()
  }, [pathname])

  return (
    <AnimatePresence>
      <div key={pathname}>
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, transition: { delay: 1, duration: 0.4, ease: "easeInOut" } }}
          className="h-screen w-screen fixed bg-primary top-0 pointer-events-none z-30"
        />
        <main className="page-content-animate">
          {children}
        </main>
      </div>
    </AnimatePresence>
  )
}

export default PageTransition