"use client"
import { AnimatePresence, motion } from "framer-motion"
import { usePathname } from "next/navigation"

const BLOCKS = 6 // vertical slices

const PageTransition = () => {
  const pathname = usePathname()

  return (
    <AnimatePresence mode="wait">
      <div key={pathname} className="pointer-events-none">
        {/* Slice wipe — each column drops in then retracts upward */}
        <div className="fixed inset-0 z-50 flex">
          {Array.from({ length: BLOCKS }).map((_, i) => (
            <motion.div
              key={i}
              className="flex-1 h-full origin-top"
              style={{ background: i % 2 === 0 ? "#00FF99" : "#0a0a0a" }}
              initial={{ scaleY: 0, originY: 0 }}
              animate={{
                scaleY: [0, 1, 1, 0],
                originY: [0, 0, 1, 1],
                transition: {
                  duration: 1.1,
                  delay: i * 0.055,
                  times: [0, 0.35, 0.6, 1],
                  ease: [0.76, 0, 0.24, 1],
                },
              }}
            />
          ))}
        </div>

        {/* Soft flash on arrival */}
        <motion.div
          className="fixed inset-0 z-40 bg-accent/10"
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, 0.15, 0],
            transition: { delay: 0.5, duration: 0.6, ease: "easeOut" },
          }}
        />
      </div>
    </AnimatePresence>
  )
}

export default PageTransition