"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Home, LogOut, Settings, Store } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { UserStoresList } from "@/components/user/stores-list"
import { UserChangePasswordForm } from "@/components/user/change-password-form"
import { RatingStars3D } from "@/components/3d/rating-stars"

export default function UserDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("stores")
  const [searchQuery, setSearchQuery] = useState("")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const handleLogout = () => {
    // In a real app, this would clear authentication state
    router.push("/login")
  }

  if (!mounted) return null

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-br from-purple-50 to-pink-50 dark:from-gray-950 dark:to-purple-950">
      <header className="sticky top-0 z-10 bg-white/80 dark:bg-gray-950/80 backdrop-blur-md border-b border-purple-200 dark:border-purple-800">
        <div className="container flex h-16 items-center justify-between py-4">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-2"
          >
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
              StoreRater
            </h1>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.5 }}>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleLogout}
              className="hover:bg-purple-100 hover:text-purple-700 dark:hover:bg-purple-900 dark:hover:text-purple-300"
            >
              <LogOut className="h-5 w-5" />
              <span className="sr-only">Logout</span>
            </Button>
          </motion.div>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r border-purple-200 dark:border-purple-800 md:sticky md:block">
          <motion.nav
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="grid items-start px-2 py-4 text-sm"
          >
            <Button
              variant={activeTab === "stores" ? "secondary" : "ghost"}
              className={`justify-start ${activeTab === "stores" ? "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800" : "hover:bg-purple-100 hover:text-purple-700 dark:hover:bg-purple-900 dark:hover:text-purple-300"}`}
              onClick={() => setActiveTab("stores")}
            >
              <Store className="mr-2 h-4 w-4" />
              Browse Stores
            </Button>
            <Button
              variant={activeTab === "settings" ? "secondary" : "ghost"}
              className={`justify-start ${activeTab === "settings" ? "bg-purple-100 text-purple-700 hover:bg-purple-200 dark:bg-purple-900 dark:text-purple-300 dark:hover:bg-purple-800" : "hover:bg-purple-100 hover:text-purple-700 dark:hover:bg-purple-900 dark:hover:text-purple-300"}`}
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Change Password
            </Button>
            <Link href="/">
              <Button
                variant="ghost"
                className="justify-start w-full hover:bg-purple-100 hover:text-purple-700 dark:hover:bg-purple-900 dark:hover:text-purple-300"
              >
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </motion.nav>
        </aside>
        <main className="flex w-full flex-col overflow-hidden p-4 md:py-6">
          <AnimatePresence mode="wait">
            {activeTab === "stores" && (
              <motion.div
                key="stores"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                    Browse Stores
                  </h2>
                  <div className="relative w-full max-w-sm">
                    <Input
                      placeholder="Search stores by name or address..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full border-purple-200 focus:border-purple-400 dark:border-purple-800 dark:focus:border-purple-600"
                    />
                  </div>
                </div>
                <UserStoresList searchQuery={searchQuery} />
              </motion.div>
            )}

            {activeTab === "settings" && (
              <motion.div
                key="settings"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-bold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-600">
                  Change Password
                </h2>
                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <UserChangePasswordForm />
                  </div>
                  <div className="flex flex-col justify-center">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.3, duration: 0.5 }}
                      className="bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm p-4 rounded-lg border border-purple-200 dark:border-purple-800"
                    >
                      <h3 className="text-lg font-medium mb-4 text-purple-700 dark:text-purple-300">
                        Rate Your Experience
                      </h3>
                      <RatingStars3D />
                      <p className="text-sm text-muted-foreground mt-4">
                        Your ratings help other users discover great stores and services.
                      </p>
                    </motion.div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </main>
      </div>
    </div>
  )
}
