"use client"

import { useRef, useEffect } from "react"
import * as THREE from "three"
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls"

export function RatingStars3D() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!containerRef.current) return

    // Scene setup
    const scene = new THREE.Scene()
    scene.background = new THREE.Color(0xf8f9fa)

    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000,
    )
    camera.position.z = 5

    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true })
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    containerRef.current.appendChild(renderer.domElement)

    // Controls
    const controls = new OrbitControls(camera, renderer.domElement)
    controls.enableDamping = true
    controls.dampingFactor = 0.05
    controls.enableZoom = false

    // Create star geometry
    const createStarGeometry = () => {
      const starShape = new THREE.Shape()
      const outerRadius = 1
      const innerRadius = 0.5
      const points = 5
      const angleStep = Math.PI / points

      for (let i = 0; i < points * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius
        const angle = i * angleStep
        const x = Math.cos(angle) * radius
        const y = Math.sin(angle) * radius

        if (i === 0) {
          starShape.moveTo(x, y)
        } else {
          starShape.lineTo(x, y)
        }
      }
      starShape.closePath()

      const extrudeSettings = {
        depth: 0.2,
        bevelEnabled: true,
        bevelSegments: 2,
        bevelSize: 0.1,
        bevelThickness: 0.1,
      }

      return new THREE.ExtrudeGeometry(starShape, extrudeSettings)
    }

    // Create stars
    const starGeometry = createStarGeometry()
    const stars = []

    const colors = [
      new THREE.Color(0x9333ea), // Purple
      new THREE.Color(0xdb2777), // Pink
      new THREE.Color(0x4f46e5), // Indigo
      new THREE.Color(0xec4899), // Pink lighter
      new THREE.Color(0x8b5cf6), // Purple lighter
    ]

    for (let i = 0; i < 5; i++) {
      const material = new THREE.MeshStandardMaterial({
        color: colors[i % colors.length],
        metalness: 0.3,
        roughness: 0.4,
      })

      const star = new THREE.Mesh(starGeometry, material)
      star.position.x = (i - 2) * 2.2
      star.rotation.z = Math.PI / 2
      scene.add(star)
      stars.push(star)
    }

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5)
    scene.add(ambientLight)

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1)
    directionalLight.position.set(5, 5, 5)
    scene.add(directionalLight)

    const pointLight = new THREE.PointLight(0xffffff, 1)
    pointLight.position.set(-5, 5, 5)
    scene.add(pointLight)

    // Animation
    const animate = () => {
      requestAnimationFrame(animate)

      stars.forEach((star, index) => {
        star.rotation.y += 0.01 * (index % 2 === 0 ? 1 : -1)
        star.position.y = Math.sin(Date.now() * 0.001 + index * 0.5) * 0.2
      })

      controls.update()
      renderer.render(scene, camera)
    }

    animate()

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return

      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight)
    }

    window.addEventListener("resize", handleResize)

    // Cleanup
    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement)
      }
      window.removeEventListener("resize", handleResize)
    }
  }, [])

  return <div ref={containerRef} className="w-full h-[300px] rounded-lg" />
}
