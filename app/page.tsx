"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BackgroundGradientAnimation } from "@/components/ui/background-gradient-animation"
import { FloatingParticles } from "@/components/ui/floating-particles"
import { Star } from "lucide-react"

export default function Home() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col overflow-hidden">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <BackgroundGradientAnimation />
      </div>
      <FloatingParticles />

      <header className="relative z-10 bg-background/80 backdrop-blur-sm border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              StoreRater
            </h1>
          </motion.div>
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="flex items-center gap-4"
          >
            <Link href="/login">
              <Button
                variant="outline"
                className="border-purple-400 hover:bg-purple-100 hover:text-purple-700 dark:hover:bg-purple-900 dark:hover:text-purple-300"
              >
                Login
              </Button>
            </Link>
            <Link href="/register">
              <Button className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700">
                Register
              </Button>
            </Link>
          </motion.nav>
        </div>
      </header>
      <main className="flex-1 relative z-10">
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                className="space-y-2"
              >
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600">
                  Rate Your Favorite Stores
                </h1>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Join our platform to discover and rate stores in your area. Share your experiences and help others
                  find the best places.
                </p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="flex flex-col gap-2 min-[400px]:flex-row"
              >
                <Link href="/register">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link href="/stores">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-purple-400 hover:bg-purple-100 hover:text-purple-700 dark:hover:bg-purple-900 dark:hover:text-purple-300"
                  >
                    Browse Stores
                  </Button>
                </Link>
              </motion.div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted/50 backdrop-blur-sm">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-3 lg:gap-12">
              {[
                {
                  title: "For Users",
                  description: "Discover and rate stores",
                  items: [
                    "Browse all registered stores",
                    "Submit ratings from 1 to 5",
                    "Search for stores by name and address",
                    "Modify your submitted ratings",
                  ],
                  buttonText: "Sign Up Now",
                  buttonLink: "/register",
                  delay: 0,
                },
                {
                  title: "For Store Owners",
                  description: "Manage your store presence",
                  items: [
                    "View users who rated your store",
                    "Track your average store rating",
                    "Update your store information",
                    "Secure dashboard access",
                  ],
                  buttonText: "Store Login",
                  buttonLink: "/login",
                  delay: 0.1,
                },
                {
                  title: "For Administrators",
                  description: "Complete platform management",
                  items: [
                    "Add new stores and users",
                    "View comprehensive statistics",
                    "Manage all platform users",
                    "Advanced filtering and sorting",
                  ],
                  buttonText: "Admin Login",
                  buttonLink: "/login",
                  delay: 0.2,
                },
              ].map((card, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: card.delay + 0.5, duration: 0.5 }}
                  whileHover={{ scale: 1.03, transition: { duration: 0.2 } }}
                >
                  <Card className="h-full overflow-hidden border-purple-200 dark:border-purple-800 bg-background/80 backdrop-blur-sm hover:shadow-lg hover:shadow-purple-200/20 dark:hover:shadow-purple-900/20 transition-all duration-300">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 dark:from-purple-950/30 dark:to-pink-950/30">
                      <CardTitle className="text-xl text-purple-700 dark:text-purple-300">{card.title}</CardTitle>
                      <CardDescription>{card.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="pt-6">
                      <ul className="list-disc pl-5 space-y-2">
                        {card.items.map((item, i) => (
                          <motion.li
                            key={i}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: card.delay + 0.7 + i * 0.1, duration: 0.3 }}
                          >
                            {item}
                          </motion.li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link href={card.buttonLink} className="w-full">
                        <Button
                          className={
                            index === 0
                              ? "w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                              : "w-full bg-gradient-to-r from-purple-600/10 to-pink-600/10 text-purple-700 hover:from-purple-600/20 hover:to-pink-600/20 dark:text-purple-300"
                          }
                        >
                          {card.buttonText}
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* 3D Rating Animation Section */}
        <section className="w-full py-12 md:py-24 lg:py-32 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-purple-100/20 to-pink-100/20 dark:from-purple-950/20 dark:to-pink-950/20 -z-10"></div>
          <div className="container px-4 md:px-6">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className="text-center mb-12"
            >
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                Experience Interactive Ratings
              </h2>
              <p className="mt-4 text-muted-foreground md:text-xl max-w-3xl mx-auto">
                Our intuitive rating system makes it easy to share your experiences and help others make informed
                decisions.
              </p>
            </motion.div>

            <div className="flex justify-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="relative"
              >
                <div className="flex justify-center gap-4 py-8">
                  {[1, 2, 3, 4, 5].map((rating) => (
                    <motion.div
                      key={rating}
                      whileHover={{ scale: 1.2, y: -10 }}
                      whileTap={{ scale: 0.9 }}
                      className="relative"
                    >
                      <motion.div
                        initial={{ rotateY: 0 }}
                        animate={{ rotateY: 360 }}
                        transition={{
                          duration: 2,
                          delay: rating * 0.2,
                          repeat: Number.POSITIVE_INFINITY,
                          repeatDelay: 5,
                        }}
                      >
                        <Star
                          className={`h-16 w-16 ${rating <= 3 ? "fill-yellow-400 text-yellow-400" : "fill-purple-600 text-purple-600"} 
                          drop-shadow-lg cursor-pointer transition-colors duration-300`}
                        />
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 1 + rating * 0.1 }}
                        className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-sm font-medium"
                      >
                        {rating}
                      </motion.div>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
      <footer className="relative z-10 border-t py-6 md:py-0 bg-background/80 backdrop-blur-sm">
        <div className="container flex flex-col items-center justify-between gap-4 md:h-16 md:flex-row">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="text-sm text-muted-foreground"
          >
            &copy; {new Date().getFullYear()} StoreRater. All rights reserved.
          </motion.p>
        </div>
      </footer>
    </div>
  )
}
