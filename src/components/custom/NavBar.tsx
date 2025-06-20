"use client"

import { Home, Search, Heart, User, Plus, DumbbellIcon, SaladIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import { useRouter, usePathname } from "next/navigation"
import { AnimatePresence, motion } from "framer-motion"
import { useEffect, useState } from "react"
import { IconDashboard, IconTrendingUp2 } from "@tabler/icons-react"

interface NavItem {
  id: string
  icon: React.ReactNode
  label: string
  href: string
}

export function FloatingNavbar({ className }: { className?: string }) {
  const router = useRouter()
  const pathname = usePathname()
  const [activePath, setActivePath] = useState(pathname)

  // Animate route transitions
  useEffect(() => {
    setActivePath(pathname)
  }, [pathname])

  const iconSize = 24

  const navItems: NavItem[] = [
    { id: "dashboard", icon: <IconDashboard size={iconSize} />, label: "Dashboard", href: "/dashboard" },
    { id: "workouts", icon: <DumbbellIcon size={iconSize} />, label: "Workouts", href: "/workouts" },
    { id: "nutrition", icon: <SaladIcon size={iconSize} />, label: "Nutrition", href: "/nutrition" },
    { id: "progress", icon: <IconTrendingUp2 size={iconSize} />, label: "Progress", href: "/progress" },
    { id: "profile", icon: <User size={iconSize} />, label: "Profile", href: "/profile" },
  ]

  return (
    <motion.div
      className="fixed bottom-6 left-1/2 z-50"
      initial={{ y: 100, x: "-50%", opacity: 0 }}
      animate={{ y: 0, x: "-50%", opacity: 1 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
    >
      <motion.nav
        className={cn(
          "flex items-center justify-center px-10 py-3",
          "bg-white/20 backdrop-blur-xl border border-white/30",
          "rounded-2xl shadow-2xl",
          "dark:bg-black/20 dark:border-white/10",
          className,
        )}
        layout
      >
        <div className="flex items-center lg:space-x-8 space-x-4">
          {navItems.map((item) => {
            const isActive = activePath === item.href
            return (
              <motion.button
                key={item.id}
                onClick={() => router.push(item.href)}
                className={cn(
                  "relative flex flex-col items-center justify-center w-12 h-12 rounded-xl transition-colors duration-300",
                  "text-gray-700 dark:text-gray-300 space-y-1",
                )}
                whileHover={{ scale: 1.2, y: -8 }}
                whileTap={{ scale: 0.9, y: -4 }}
                transition={{ type: "spring", stiffness: 400, damping: 25, duration: 0.2 }}
              >

                <motion.div
                  className={cn(
                    "relative z-10 transition-colors duration-300",
                    isActive ? "text-blue-600 dark:text-blue-400" : "text-gray-700 dark:text-gray-300",
                  )}
                  whileHover={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 0.3 }}
                >
                  {item.icon}
                </motion.div>

                <motion.span
                  className={cn(
                    "relative z-10 text-xs font-extralight transition-all duration-300",
                    isActive
                      ? "text-blue-600 dark:text-blue-400 drop-shadow-[0_0_4px_rgba(59,130,246,0.4)]"
                      : "text-gray-600 dark:text-gray-400",
                  )}
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: isActive ? 1 : 0.7, scale: isActive ? 1.05 : 1 }}
                  transition={{ duration: 0.2 }}
                >
                  {item.label}
                </motion.span>

                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-1/2 w-1 h-1 bg-blue-600 dark:bg-blue-400 rounded-full"
                      layoutId="activeIndicator"
                      initial={{ opacity: 0, scale: 0, x: "-50%" }}
                      animate={{ opacity: 1, scale: 1, x: "-50%" }}
                      exit={{ opacity: 0, scale: 0, x: "-50%" }}
                      transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </div>
      </motion.nav>
    </motion.div>
  )
}
