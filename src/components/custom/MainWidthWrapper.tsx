import { cn } from "@/lib/utils"

interface MainWidthWrapperProps {
  children: React.ReactNode
  className?: string
}

export function MainWidthWrapper({ children, className }: MainWidthWrapperProps) {
  return (
    <main
      className={cn(className, `max-w-[80rem] mx-auto min-h-screen`)}
    >{children}</main>
  )
}
