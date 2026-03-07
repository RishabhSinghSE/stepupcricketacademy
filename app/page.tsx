"use client"

import { useState } from "react"
import { HeroSection } from "@/components/home/hero-section"
import { NavBar } from "@/components/home/nav-bar"
import { FacilitiesSection } from "@/components/home/facilities-section"
import { SignupForm } from "@/components/home/signup-form"
import { AdminSection } from "@/components/home/admin-section"
import { Footer } from "@/components/home/footer"

export default function HomePage() {
  const [isAdmin, setIsAdmin] = useState(false)
  const [showAdmin, setShowAdmin] = useState(false)

  const handleLogout = () => {
    setIsAdmin(false)
    setShowAdmin(false)
  }

  const handleAdminLogin = () => {
    setIsAdmin(true)
  }

  const handleAdminToggle = () => {
    setShowAdmin((prev) => !prev)
  }

  return (
    <div className="min-h-screen bg-white">
      <HeroSection />
      <NavBar
        isAdmin={isAdmin}
        onLogout={handleLogout}
        onAdminToggle={handleAdminToggle}
        showAdmin={showAdmin}
      />
      <FacilitiesSection />
      <SignupForm />

      {/* Admin Section - only when toggled */}
      <AdminSection
        showLogin={showAdmin && !isAdmin}
        isAdmin={isAdmin && showAdmin}
        onLogin={handleAdminLogin}
      />

      <Footer />
    </div>
  )
}
