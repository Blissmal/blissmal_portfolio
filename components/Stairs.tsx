"use client"
import { motion } from "framer-motion"

const totalSteps = 6

const reverseIndex = (index: number) => totalSteps - index - 1

const Stairs = () => {
  return (
    <>
      {[...Array(totalSteps)].map((_, index) => {
        const rev = reverseIndex(index)
        const isEven = index % 2 === 0

        return (
          <motion.div
            key={index}
            className="h-full w-full relative overflow-hidden"
            initial={{ scaleY: 1, originY: 0 }}
            animate={{ scaleY: 0, originY: 0 }}
            exit={{ scaleY: 1, originY: 1 }}
            transition={{
              duration: 0.55,
              ease: [0.76, 0, 0.24, 1],
              delay: rev * 0.07,
            }}
            style={{
              background: isEven
                ? "#00FF99"
                : "#080808",
            }}
          >
            {/* Scanline shimmer on the accent slices */}
            {isEven && (
              <motion.div
                className="absolute inset-0 pointer-events-none"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.18, 0] }}
                transition={{ duration: 0.5, delay: rev * 0.07 + 0.1 }}
                style={{
                  background:
                    "repeating-linear-gradient(transparent, transparent 3px, rgba(0,0,0,0.12) 3px, rgba(0,0,0,0.12) 4px)",
                }}
              />
            )}

            {/* Diagonal slash accent line */}
            <motion.div
              className="absolute bottom-0 left-0 w-full h-[2px]"
              initial={{ scaleX: 0, originX: 0 }}
              animate={{ scaleX: 1, originX: 0 }}
              transition={{
                duration: 0.3,
                ease: "easeOut",
                delay: rev * 0.07 + 0.15,
              }}
              style={{
                background: isEven
                  ? "rgba(0,0,0,0.2)"
                  : "rgba(0,255,153,0.4)",
              }}
            />
          </motion.div>
        )
      })}
    </>
  )
}

export default Stairs