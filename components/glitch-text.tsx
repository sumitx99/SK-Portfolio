"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface GlitchTextProps {
  text: string
  className?: string
  delay?: number
}

export function GlitchText({ text, className, delay = 0 }: GlitchTextProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const letters = Array.from(text)

  const container = {
    hidden: { opacity: 0 },
    visible: (i = 1) => ({
      opacity: 1,
      transition: { staggerChildren: 0.03, delayChildren: 0.04 * i },
    }),
  }

  const child = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
    hidden: {
      opacity: 0,
      y: 20,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  }

  return (
    <motion.h1
      className={cn("flex overflow-hidden text-red-500", className)}
      variants={container}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      aria-label={text}
    >
      {letters.map((letter, index) => (
        <motion.span
          key={index}
          variants={child}
          className="inline-block relative"
          style={{
            textShadow:
              "0.05em 0 0 rgba(255, 0, 0, 0.75), -0.025em -0.05em 0 rgba(0, 255, 0, 0.75), 0.025em 0.05em 0 rgba(0, 0, 255, 0.75)",
          }}
          whileHover={{
            scale: 1.2,
            rotate: Math.random() * 10 - 5,
            color: "#ef4444",
            transition: { duration: 0.2 },
          }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </motion.h1>
  )
}
