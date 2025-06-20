"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Loader2 } from "lucide-react"
import { useActionState, useTransition } from "react"
import { authenticate, signInWithGoogle } from "../action"
import { useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import { IconBrandGoogleFilled } from "@tabler/icons-react"
import Link from "next/link"

export default function SignInPage() {
  const [errorMessage, formAction, isPending] = useActionState(authenticate, undefined)
  const [isGoogleLoading, startGoogleTransition] = useTransition()
  const { data: session, status } = useSession()
  const router = useRouter()

  // Redirect if already authenticated
  useEffect(() => {
    if (status === "authenticated" && session) {
      router.push("/dashboard")
    }
  }, [session, status, router])

  const handleGoogleSignIn = () => {
    startGoogleTransition(async () => {
      await signInWithGoogle()
    })
  }

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (status === "authenticated") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p>Redirecting...</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1 text-center">
          <CardTitle className="text-2xl font-semibold tracking-tight">Welcome back</CardTitle>
          <CardDescription className="text-sm text-muted-foreground">
            Sign in to your account to continue
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            variant="outline"
            className="w-full bg-white text-gray-900 hover:bg-gray-50"
            onClick={handleGoogleSignIn}
            disabled={isGoogleLoading || isPending}
          >
            {isGoogleLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <IconBrandGoogleFilled className="mr-2 h-4 w-4" />}
            Continue with Google
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <form action={formAction} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-sm font-medium">
                Email
              </Label>
              <Input
                id="email"
                name="email"
                type="email"
                placeholder="demo@example.com"
                className="h-10"
                required
                disabled={isPending}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password" className="text-sm font-medium">
                Password
              </Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="password123"
                className="h-10"
                required
                disabled={isPending}
              />
            </div>

            {errorMessage && <div className="text-sm text-red-600 text-center">{errorMessage}</div>}

            <div className="flex items-center justify-end">
              <Button variant="link" className="px-0 text-sm text-muted-foreground hover:text-foreground">
                Forgot password?
              </Button>
            </div>

            <Button className="w-full h-10" type="submit" disabled={isPending}>
              {isPending ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="text-center text-sm text-muted-foreground">
            {"Don't have an account? "}
            <Button variant="link" className="px-0 text-sm font-medium">
              <Link href={"/auth/signup"}>Sign up</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
