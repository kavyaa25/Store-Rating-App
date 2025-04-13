"use client"

import { useEffect, useRef } from "react"

export function BackgroundGradientAnimation() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const setCanvasDimensions = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    setCanvasDimensions()
    window.addEventListener("resize", setCanvasDimensions)

    // Create gradient points
    const gradientPoints = [
      { x: canvas.width * 0.1, y: canvas.height * 0.1, radius: 300, color: "rgba(147, 51, 234, 0.5)" }, // Purple
      { x: canvas.width * 0.8, y: canvas.height * 0.3, radius: 250, color: "rgba(219, 39, 119, 0.4)" }, // Pink
      { x: canvas.width * 0.5, y: canvas.height * 0.7, radius: 350, color: "rgba(79, 70, 229, 0.4)" }, // Indigo
      { x: canvas.width * 0.2, y: canvas.height * 0.8, radius: 200, color: "rgba(236, 72, 153, 0.3)" }, // Pink lighter
    ]

    // Animation variables
    let animationFrameId: number
    const velocities = gradientPoints.map(() => ({
      x: (Math.random() - 0.5) * 0.5,
      y: (Math.random() - 0.5) * 0.5,
    }))

    // Animation function
    const animate = () => {
      // Clear canvas with a very subtle base color
      ctx.fillStyle = "rgba(255, 255, 255, 0.01)" // Almost transparent white
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update gradient points positions
      gradientPoints.forEach((point, index) => {
        point.x += velocities[index].x
        point.y += velocities[index].y

        // Bounce off edges
        if (point.x < 0 || point.x > canvas.width) velocities[index].x *= -1
        if (point.y < 0 || point.y > canvas.height) velocities[index].y *= -1

        // Draw gradient
        const gradient = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.radius)
        gradient.addColorStop(0, point.color)
        gradient.addColorStop(1, "rgba(255, 255, 255, 0)")

        ctx.fillStyle = gradient
        ctx.beginPath()
        ctx.arc(point.x, point.y, point.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      animationFrameId = requestAnimationFrame(animate)
    }

    animate()

    return () => {
      window.removeEventListener("resize", setCanvasDimensions)
      cancelAnimationFrame(animationFrameId)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 z-0"
      style={{
        background: "linear-gradient(to bottom, rgba(255, 255, 255, 0.8), rgba(240, 240, 255, 0.8))",
        filter: "blur(8px)",
      }}
    />
  )
}
