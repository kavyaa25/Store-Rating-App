"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BarChart3, Home, LogOut, Store, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminStoresList } from "@/components/admin/stores-list"
import { AdminUsersList } from "@/components/admin/users-list"
import { AdminAddUserForm } from "@/components/admin/add-user-form"
import { AdminAddStoreForm } from "@/components/admin/add-store-form"

export default function AdminDashboardPage() {
  const router = useRouter()
  const [activeTab, setActiveTab] = useState("overview")

  // Mock data for dashboard stats
  const stats = {
    totalUsers: 124,
    totalStores: 48,
    totalRatings: 1256,
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
            <h1 className="text-xl font-bold">StoreRater Admin</h1>
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
              Overview
            </Button>
            <Button
              variant={activeTab === "stores" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("stores")}
            >
              <Store className="mr-2 h-4 w-4" />
              Stores
            </Button>
            <Button
              variant={activeTab === "users" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("users")}
            >
              <Users className="mr-2 h-4 w-4" />
              Users
            </Button>
            <Button
              variant={activeTab === "add-user" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("add-user")}
            >
              <Users className="mr-2 h-4 w-4" />
              Add User
            </Button>
            <Button
              variant={activeTab === "add-store" ? "secondary" : "ghost"}
              className="justify-start"
              onClick={() => setActiveTab("add-store")}
            >
              <Store className="mr-2 h-4 w-4" />
              Add Store
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
            <h2 className="text-2xl font-bold tracking-tight mb-6">Dashboard Overview</h2>
            <div className="grid gap-4 md:grid-cols-3">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalUsers}</div>
                  <p className="text-xs text-muted-foreground">+12 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
                  <Store className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalStores}</div>
                  <p className="text-xs text-muted-foreground">+4 from last month</p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Total Ratings</CardTitle>
                  <BarChart3 className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.totalRatings}</div>
                  <p className="text-xs text-muted-foreground">+156 from last month</p>
                </CardContent>
              </Card>
            </div>
          </div>

          <div className={activeTab === "stores" ? "block" : "hidden"}>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Manage Stores</h2>
            <AdminStoresList />
          </div>

          <div className={activeTab === "users" ? "block" : "hidden"}>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Manage Users</h2>
            <AdminUsersList />
          </div>

          <div className={activeTab === "add-user" ? "block" : "hidden"}>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Add New User</h2>
            <AdminAddUserForm />
          </div>

          <div className={activeTab === "add-store" ? "block" : "hidden"}>
            <h2 className="text-2xl font-bold tracking-tight mb-6">Add New Store</h2>
            <AdminAddStoreForm />
          </div>
        </main>
      </div>
    </div>
  )
}
