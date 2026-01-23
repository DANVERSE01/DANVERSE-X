"use client";

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { AlertCircle } from "lucide-react"

export default function AdminLogin() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsLoading(true)

    setTimeout(() => {
      if (
        (email === "admin@danverse.com" && password === "1234") ||
        (email === "danverseai@outlook.com" && password === "1234")
      ) {
        const expiryDate = new Date()
        expiryDate.setTime(expiryDate.getTime() + 24 * 60 * 60 * 1000)
        document.cookie = `admin-session=authenticated; path=/; expires=${expiryDate.toUTCString()}`
        router.push("/admin")
      } else {
        setError("Invalid email or password")
      }
      setIsLoading(false)
    }, 1000)
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col md:flex-row">
      <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-red-600 to-orange-500 p-12 flex-col justify-between">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/danverse-logo.png" alt="DANVERSE" width={160} height={44} className="object-contain" />
          </div>
          <h1 className="text-4xl font-bold text-white mt-12">Welcome to DANVERSE Admin</h1>
          <p className="text-orange-100 mt-4 max-w-md">
            Manage your website content, pricing, and settings from one central dashboard.
          </p>
        </div>
        <div className="mt-auto">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20">
            <p className="text-white/90 text-lg font-medium">
              "AI-Powered Creative Studio for Cinematic Ads, Branding & Digital Experiences"
            </p>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center p-6 md:p-12">
        <div className="flex md:hidden items-center gap-3 mb-8 w-full justify-center">
          <Image src="/images/danverse-logo.png" alt="DANVERSE" width={140} height={38} className="object-contain" />
        </div>

        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white">Sign in to your account</h2>
            <p className="text-neutral-400 mt-2">Enter your credentials to access the admin panel</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/30 text-red-300 px-4 py-3 rounded-lg flex items-center gap-3">
                <AlertCircle className="h-5 w-5" />
                <span>{error}</span>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="email" className="text-neutral-200">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@danverse.com"
                className="bg-[#1a1a1a] border-neutral-800 text-white focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-neutral-200">
                  Password
                </Label>
                <button type="button" className="text-sm text-orange-400 hover:text-orange-300 hover:underline">
                  Forgot password?
                </button>
              </div>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#1a1a1a] border-neutral-800 text-white focus:border-orange-500 focus:ring-orange-500"
                required
              />
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 text-white hover:from-red-600 hover:to-orange-600 font-semibold"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                  Signing in...
                </>
              ) : (
                "Sign in"
              )}
            </Button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-neutral-400 text-sm">
              Need help? Contact{" "}
              <a href="mailto:danverseai@outlook.com" className="text-orange-400 hover:text-orange-300 hover:underline">
                danverseai@outlook.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
