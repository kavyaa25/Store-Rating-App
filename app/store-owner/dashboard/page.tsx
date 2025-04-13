"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart3, Home, LogOut, Settings, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { StoreOwnerUsersList } from "@/components/store-owner/users-list"
import { StoreOwnerChangePasswordForm } from "@/components/store-owner/change-password-form"

export default function StoreOwnerDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for store stats
  const storeData = {
    name: "Coffee Haven",
    address: "123 Main Street, Cityville",
    averageRating: 4.2,
    totalRatings: 45,
    recentRatings: 12,
  }

  const handleLogout = () => {
    // In a real app, this would clear authentication state
    router.push("/login")
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-10 bg-background border-b">
        <div className="container flex h-16 items-center justify-between py-4">
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold">StoreRater - Store Owner</h1>
          </div>
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
            <span className="sr-only">Logout</span>
          </Button>
        </div>
      </header>
      <div className="container flex-1 items-start md:grid md:grid-cols-[220px_1fr] md:gap-6 lg:grid-cols-[240px_1fr] lg:gap-10">
        <aside className="fixed top-16 z-30 hidden h-[calc(100vh-4rem)] w-full shrink-0 overflow-y-auto border-r md:sticky md:block">
          <nav className="grid items-start px-2 py-4 text-sm">
            <Button
              variant={activeTab === "overview" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("overview")}
            >
              <BarChart3 className="mr-2 h-4 w-4" />
              Store Overview
            </Button>
            <Button
              variant={activeTab === "users" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-2 h-4 w-4" />
              User Ratings
            </Button>
            <Button
              variant={activeTab === "settings" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("settings")}
            >
              <Settings className="mr-2 h-4 w-4" />
              Change Password
            </Button>
            <Link href="/">
              <Button variant="ghost" className="justify-start w-full">
                <Home className="mr-2 h-4 w-4" />
                Home
              </Button>
            </Link>
          </nav>
        </aside>
        <main className="flex w-full flex-col overflow-hidden p-4 md:py-6">
          <div className={activeTab === "overview" ? "block" : "hidden"}>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Store Overview</h2>
            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Store Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div>
                      <span className="font-medium">Name:</span> {storeData.name}
                    </div>
                    <div>
                      <span className="font-medium">Address:</span> {storeData.address}
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Rating Summary</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="text-2xl font-bold">{storeData.averageRating.toFixed(1)}/5.0</div>
                    <div>
                      <span className="font-medium">Total Ratings:</span> {storeData.totalRatings}
                    </div>
                    <div>
                      <span className="font-medium">Recent Ratings:</span> {storeData.recentRatings} (last 30 days)
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className={activeTab === "users" ? "block" : "hidden"}>
            <h2 className="text-2xl font-bold tracking-tight mb-6">User Ratings</h2>
            <StoreOwnerUsersList />
          </div>

          <div className={activeTab === "settings" ? "block" : "hidden"}>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Change Password</h2>
            <StoreOwnerChangePasswordForm />
          </div>
        </main>
      </div>
    </div>
  )
}
