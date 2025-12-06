"use client"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"
import { useEffect, useState } from "react"

interface Text3DProps {
  text: string
  className?: string
  delay?: number
}

export function Text3D({ text, className, delay = 0 }: Text3DProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, delay)

    return () => clearTimeout(timer)
  }, [delay])

  const container = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  const child = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 200,
      },
    },
  }

  return (
    <motion.div
      className={cn("relative", className)}
      variants={container}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <motion.div
          key={i}
          className={cn("absolute inset-0 text-red-500", i === 0 && "text-foreground")}
          variants={child}
          style={{
            textShadow: i === 0 ? "none" : `${i * 0.5}px ${i * 0.5}px 0 rgba(239, 68, 68, ${0.8 - i * 0.2})`,
            zIndex: 5 - i,
          }}
        >
          {text}
        </motion.div>
      ))}
    </motion.div>
  )
}
