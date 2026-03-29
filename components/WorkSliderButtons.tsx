"use client"
import { useSwiper } from "swiper/react"
import { PiCaretLeftBold, PiCaretRightBold } from "react-icons/pi"
import { useRef } from "react"
import gsap from "gsap"

interface WorkSliderButtonsProps {
  containerStyles: string
  btnStyles: string
  iconStyles: string
}

const WorkSliderButtons = ({ containerStyles, btnStyles, iconStyles }: WorkSliderButtonsProps) => {
  const swiper = useSwiper()
  const prevRef = useRef<HTMLButtonElement>(null)
  const nextRef = useRef<HTMLButtonElement>(null)

  const animateBtn = (ref: React.RefObject<HTMLButtonElement | null>) => {
    if (!ref.current) return
    gsap.fromTo(ref.current,
      { scale: 0.85 },
      { scale: 1, duration: 0.35, ease: "elastic.out(1.5, 0.5)" }
    )
  }

  return (
    <div className={containerStyles}>
      <button
        ref={prevRef}
        className={`${btnStyles} rounded-full transition-all`}
        onClick={() => { swiper.slidePrev(); animateBtn(prevRef) }}
      >
        <PiCaretLeftBold className={iconStyles} />
      </button>
      <button
        ref={nextRef}
        className={`${btnStyles} rounded-full transition-all`}
        onClick={() => { swiper.slideNext(); animateBtn(nextRef) }}
      >
        <PiCaretRightBold className={iconStyles} />
      </button>
    </div>
  )
}

export default WorkSliderButtons