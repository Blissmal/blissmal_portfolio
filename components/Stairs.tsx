"use client"
import { motion } from "framer-motion"

const stairAnimation = {
  initial: { top: "0%", opacity: 1 },
  animate: { top: "100%", opacity: [1, 1, 0] },
  exit: { top: ["100%", "0%"] }
}

const reverseIndex = (index: number) => {
  const totalSteps = 6
  return totalSteps - index - 1
}

const Stairs = () => {
  return (
    <>
      {[...Array(6)].map((_, index) => (
        <motion.div
          key={index}
          variants={stairAnimation}
          initial="initial"
          animate="animate"
          exit="exit"
          transition={{
            duration: 0.45,
            ease: "easeInOut",
            delay: reverseIndex(index) * 0.1,
          }}
          className="h-full w-full relative"
          style={{
            background: index % 2 === 0
              ? "white"
              : "linear-gradient(135deg, white 0%, #e8fff5 100%)",
          }}
        />
      ))}
    </>
  )
}

export default Stairs