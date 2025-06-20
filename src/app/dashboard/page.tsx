"use client"

import { toast } from "@/components/custom/toast"
import { useSession } from "next-auth/react"
import { useGreetingStore } from "@/utils/store/useGretting"

const sections = [
  { id: 1, color: "bg-red-200", label: "Section 1" },
  { id: 2, color: "bg-blue-200", label: "Section 2" },
  { id: 3, color: "bg-green-200", label: "Section 3" },
  { id: 4, color: "bg-yellow-200", label: "Section 4" },
]

export default function DashboardPage() {
  const { greeted, setGreeted } = useGreetingStore()
  const { data: session, status } = useSession()

  if (status === "authenticated" && session && !greeted) {
    toast.success("Welcome to Befit", "Let's keep up the healthy habits")
    setGreeted()
  }

  return (
    <div className="flex flex-col">
      {sections.map(({ id, color, label }) => (
        <div key={id} className={`w-full h-screen ${color} flex items-center justify-center`}>
          <h1 className="text-2xl font-bold">{label}</h1>
        </div>
      ))}
    </div>
  )
}
