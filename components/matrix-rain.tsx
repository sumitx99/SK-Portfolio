"use client"

import { useEffect, useRef, useState } from "react"

export function MatrixRain() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Matrix rain characters
    const characters = "01"
    const fontSize = 14
    // Reduce the number of columns for better performance
    const columns = Math.floor(canvas.width / (fontSize * 2.5))

    // Array to track the y position of each column
    const drops: number[] = []
    for (let i = 0; i < columns; i++) {
      drops[i] = Math.floor(Math.random() * -100) // Random starting position above the canvas
    }

    // Drawing the characters
    const draw = () => {
      if (!isVisible) return

      // Black semi-transparent background to create fade effect
      ctx.fillStyle = "rgba(0, 0, 0, 0.05)"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Set the color and font of the characters
      ctx.fillStyle = "#ef4444"
      ctx.font = `${fontSize}px monospace`

      // Loop through each column
      for (let i = 0; i < drops.length; i++) {
        // Only process every other column for better performance
        if (i % 2 === 0) {
          // Choose a random character
          const text = characters.charAt(Math.floor(Math.random() * characters.length))

          // Draw the character
          ctx.fillText(text, i * fontSize * 2.5, drops[i] * fontSize)

          // Move the drop down
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
            drops[i] = 0
          }
          drops[i]++
        }
      }
    }

    // Animation loop - increase interval from 50ms to 120ms for better performance
    const interval = setInterval(draw, 120)

    // Visibility observer to pause animation when not visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(entry.isIntersecting)
        })
      },
      { threshold: 0.1 },
    )

    if (canvas) {
      observer.observe(canvas)
    }

    return () => {
      clearInterval(interval)
      window.removeEventListener("resize", resizeCanvas)
      if (canvas) {
        observer.unobserve(canvas)
      }
    }
  }, [isVisible])

  return <canvas ref={canvasRef} className="fixed inset-0 z-[-1] opacity-5" />
}
