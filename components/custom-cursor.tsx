"use client"

import { useEffect, useRef } from "react"
import { motion, useAnimation } from "framer-motion"

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement | null>(null)
  const dotRef = useRef<HTMLDivElement | null>(null)
  const rafRef = useRef<number | null>(null)
  const mouse = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      // schedule RAF if none running
      if (rafRef.current == null) {
        rafRef.current = requestAnimationFrame(() => {
          if (cursorRef.current) {
            cursorRef.current.style.transform = `translate3d(${mouse.current.x - 16}px, ${mouse.current.y - 16}px, 0)`
          }
          if (dotRef.current) {
            dotRef.current.style.transform = `translate3d(${mouse.current.x - 4}px, ${mouse.current.y - 4}px, 0)`
          }
          rafRef.current = null
        })
      }
    }

    const onLeave = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0"
      if (dotRef.current) dotRef.current.style.opacity = "0"
    }
    const onEnter = () => {
      if (cursorRef.current) cursorRef.current.style.opacity = "0.5"
      if (dotRef.current) dotRef.current.style.opacity = "0.8"
    }

    document.addEventListener("mousemove", onMove, { passive: true })
    document.addEventListener("mouseleave", onLeave)
    document.addEventListener("mouseenter", onEnter)

    return () => {
      document.removeEventListener("mousemove", onMove)
      document.removeEventListener("mouseleave", onLeave)
      document.removeEventListener("mouseenter", onEnter)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      <div ref={cursorRef} className="fixed top-0 left-0 w-8 h-8 rounded-full border-2 border-red-500 pointer-events-none z-50" />
      <div ref={dotRef} className="fixed top-0 left-0 w-2 h-2 bg-red-500 rounded-full pointer-events-none z-50" />
    </>
  )
}
