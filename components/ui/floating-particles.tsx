"use client"

import { useRef } from "react"
import { motion } from "framer-motion"

interface Particle {
  id: number
  x: number
  y: number
  size: number
  color: string
  opacity: number
  speed: number
}

export function FloatingParticles() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Generate random particles
  const particles: Particle[] = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 6 + 2,
    color: [
      "rgba(147, 51, 234, 0.7)", // Purple
      "rgba(219, 39, 119, 0.7)", // Pink
      "rgba(79, 70, 229, 0.7)", // Indigo
      "rgba(236, 72, 153, 0.7)", // Pink lighter
    ][Math.floor(Math.random() * 4)],
    opacity: Math.random() * 0.5 + 0.2,
    speed: Math.random() * 20 + 10,
  }))

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            backgroundColor: particle.color,
            opacity: particle.opacity,
            filter: "blur(1px)",
          }}
          animate={{
            y: ["0%", `${particle.speed}%`, "0%"],
            x: [`0%`, `${(particle.speed / 3) * (Math.random() > 0.5 ? 1 : -1)}%`, `0%`],
            opacity: [particle.opacity, particle.opacity * 0.6, particle.opacity],
          }}
          transition={{
            duration: 10 + Math.random() * 20,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatType: "reverse",
          }}
        />
      ))}
    </div>
  )
}
