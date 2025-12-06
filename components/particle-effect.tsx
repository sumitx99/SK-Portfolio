"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

type Particle = {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  opacity: number
  life: number
  maxLife: number
}

export function ParticleEffect() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particles = useRef<Particle[]>([])
  const animationRef = useRef<number>()
  const mousePosition = useRef({ x: 0, y: 0 })
  const isMouseMoving = useRef(false)
  const lastMousePosition = useRef({ x: 0, y: 0 })
  const lastUpdateTime = useRef(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas size
    const setCanvasSize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasSize()
    window.addEventListener("resize", setCanvasSize)

    // Track mouse movement with throttling
    const handleMouseMove = (e: MouseEvent) => {
      const now = Date.now()
      // Only update every 16ms (roughly 60fps)
      if (now - lastUpdateTime.current < 16) return

      lastUpdateTime.current = now
      mousePosition.current = { x: e.clientX, y: e.clientY }

      // Check if mouse is actually moving
      if (
        Math.abs(mousePosition.current.x - lastMousePosition.current.x) > 3 ||
        Math.abs(mousePosition.current.y - lastMousePosition.current.y) > 3
      ) {
        isMouseMoving.current = true

        // Add particles on mouse move - reduced number from 3 to 2
        for (let i = 0; i < 2; i++) {
          addParticle(
            mousePosition.current.x,
            mousePosition.current.y,
            Math.random() * 3 + 1,
            Math.random() * 2 - 1,
            Math.random() * 2 - 1,
            `rgba(239, 68, 68, ${Math.random() * 0.5 + 0.5})`,
            Math.random() * 0.7 + 0.3,
            Math.random() * 50 + 30,
          )
        }

        lastMousePosition.current = { ...mousePosition.current }
      } else {
        isMouseMoving.current = false
      }
    }

    window.addEventListener("mousemove", handleMouseMove, { passive: true })

    // Add a particle
    const addParticle = (
      x: number,
      y: number,
      size: number,
      speedX: number,
      speedY: number,
      color: string,
      opacity: number,
      maxLife: number,
    ) => {
      // Limit the number of particles to 100 for performance
      if (particles.current.length > 100) {
        particles.current.shift() // Remove the oldest particle
      }

      particles.current.push({
        x,
        y,
        size,
        speedX,
        speedY,
        color,
        opacity,
        life: 0,
        maxLife,
      })
    }

    // Animation loop
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.current.forEach((particle, index) => {
        // Update life
        particle.life++

        // Remove dead particles
        if (particle.life >= particle.maxLife) {
          particles.current.splice(index, 1)
          return
        }

        // Calculate opacity based on life
        const lifeRatio = particle.life / particle.maxLife
        const currentOpacity = particle.opacity * (1 - lifeRatio)

        // Draw particle
        ctx.globalAlpha = currentOpacity
        ctx.fillStyle = particle.color
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fill()

        // Update position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Add gravity effect
        particle.speedY += 0.03

        // Slow down over time
        particle.speedX *= 0.99
        particle.speedY *= 0.99
      })

      ctx.globalAlpha = 1

      animationRef.current = requestAnimationFrame(animate)
    }

    animate()

    // Cleanup
    return () => {
      window.removeEventListener("resize", setCanvasSize)
      window.removeEventListener("mousemove", handleMouseMove)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [])

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-10"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    />
  )
}
