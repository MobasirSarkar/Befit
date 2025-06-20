"use client"

import { useState } from "react"

export default function Page() {
  const [activeTab, setActiveTab] = useState("home")

  const renderContent = () => {
    switch (activeTab) {
      case "home":
        return (
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Home</h1>
            <p className="text-gray-600 dark:text-gray-400">Welcome to your home feed</p>
          </div>
        )
      case "search":
        return (
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Search</h1>
            <p className="text-gray-600 dark:text-gray-400">Discover new content</p>
          </div>
        )
      case "create":
        return (
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Create</h1>
            <p className="text-gray-600 dark:text-gray-400">Share something new</p>
          </div>
        )
      case "activity":
        return (
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Activity</h1>
            <p className="text-gray-600 dark:text-gray-400">See what's happening</p>
          </div>
        )
      case "profile":
        return (
          <div className="text-center space-y-4">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Profile</h1>
            <p className="text-gray-600 dark:text-gray-400">Your personal space</p>
          </div>
        )
      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Main Content */}
      <main className="pb-20 pt-8 px-4">
        <div className="max-w-2xl mx-auto">{renderContent()}</div>
      </main>

      {/* Bottom Navigation */}
    </div>
  )
}
