"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import Image from "next/image"
import {
  Home, Settings, LogOut, Save, Sparkles, DollarSign,
  BarChart3, HelpCircle, Eye, AlertCircle, CheckCircle,
  ChevronRight, ChevronLeft, TrendingUp, FileText, Menu, X,
  Plus, Trash2, Download, Upload, Rocket, Camera, Diff,
  RefreshCw, Copy, Wand2, ShieldCheck, Clock, Code2,
} from "lucide-react"

// ── Storage keys ─────────────────────────────────────────────────────────
const STORAGE_CONTENT   = "danverse-content"
const STORAGE_SNAPSHOTS = "danverse-snapshots"
const STORAGE_ACTIVITY  = "danverse-activity"

// ── Types ─────────────────────────────────────────────────────────────────
interface SiteContent {
  hero:     { title: string; subtitle: string; cta: string }
  features: { title: string; subtitle: string }
  footer:   { tagline: string; copyright: string }
  about:    { title: string; description: string }
  pricing: {
    starter:      { price: string; features: string[] }
    professional: { price: string; features: string[] }
    premium:      { price: string; features: string[] }
  }
  seo: {
    title: string
    description: string
    ogImage: string
  }
  contact: {
    whatsapp: string
    email: string
    instagram: string
  }
  deploy: { hookUrl: string }
}

interface Snapshot {
  id: string
  name: string
  ts: number
  content: SiteContent
}

interface ActivityItem {
  id: string
  label: string
  time: number
}

// ── Defaults ──────────────────────────────────────────────────────────────
const DEFAULT: SiteContent = {
  hero: {
    title: "Cinematic Ads Built for Scale",
    subtitle: "A premium creative studio that builds ads, brand systems, and AI workflows.",
    cta: "Book a Call",
  },
  features: {
    title: "Why brands choose DANVERSE",
    subtitle: "Discover our unique approach to creative storytelling",
  },
  footer: {
    tagline: "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems.",
    copyright: "© 2026 — DANVERSE",
  },
  about: {
    title: "A Creative Studio Built for Output",
    description: "DANVERSE is not an agency. It's a creative operating system built around locked direction, repeatable systems, and cinematic execution.",
  },
  pricing: {
    starter:      { price: "$299", features: ["1 Cinematic Ad (60s)", "1 Platform format", "Basic color grade", "2 revision rounds", "5-day turnaround"] },
    professional: { price: "$699", features: ["3 Cinematic Ads (90s each)", "All platform formats", "Cinematic color grade + LUT", "Brand system integration", "3 revision rounds", "7-day turnaround"] },
    premium:      { price: "$2,049", features: ["Full campaign (10+ assets)", "Video + branding + landing page", "Custom AI content workflow", "Dedicated creative director", "Unlimited revisions", "14-day turnaround"] },
  },
  seo: {
    title: "DANVERSE | AI-Powered Creative Studio",
    description: "DANVERSE is an AI powered creative studio that builds cinematic ads, bold branding, and smart content systems for brands that want to stand out globally.",
    ogImage: "/images/danverse-logo-blend-1.webp",
  },
  contact: {
    whatsapp: "201207346648",
    email: "danverseai@outlook.com",
    instagram: "@muhammedd_adel",
  },
  deploy: { hookUrl: "" },
}

// ── Health Score ──────────────────────────────────────────────────────────
function calcHealthScore(c: SiteContent): { score: number; checks: { label: string; pass: boolean }[] } {
  const checks = [
    { label: "Hero title not empty",           pass: c.hero.title.length > 5 },
    { label: "Hero subtitle not empty",        pass: c.hero.subtitle.length > 10 },
    { label: "Hero CTA set",                   pass: c.hero.cta.length > 0 },
    { label: "Features title set",             pass: c.features.title.length > 5 },
    { label: "Footer tagline set",             pass: c.footer.tagline.length > 20 },
    { label: "Footer copyright year is 2026",  pass: c.footer.copyright.includes("2026") },
    { label: "SEO title ≤ 60 chars",           pass: c.seo.title.length <= 60 },
    { label: "SEO description ≤ 160 chars",    pass: c.seo.description.length <= 160 },
    { label: "OG image path set",              pass: c.seo.ogImage.length > 0 },
    { label: "WhatsApp number set",            pass: c.contact.whatsapp.length >= 10 },
    { label: "Email set",                      pass: c.contact.email.includes("@") },
    { label: "Pricing: all 3 plans have price", pass: [c.pricing.starter.price, c.pricing.professional.price, c.pricing.premium.price].every(p => p.startsWith("$")) },
  ]
  const score = Math.round((checks.filter(c => c.pass).length / checks.length) * 100)
  return { score, checks }
}

// ── Export generator ──────────────────────────────────────────────────────
function generateContentTs(c: SiteContent): string {
  return `/**
 * DANVERSE Site Content
 * Auto-generated by DANVERSE Studio v3
 * Generated: ${new Date().toISOString()}
 *
 * Usage: import { HERO, PRICING, SEO } from '@/lib/content'
 */

export const HERO = ${JSON.stringify(c.hero, null, 2)} as const

export const FEATURES = ${JSON.stringify(c.features, null, 2)} as const

export const FOOTER = ${JSON.stringify(c.footer, null, 2)} as const

export const ABOUT = ${JSON.stringify(c.about, null, 2)} as const

export const PRICING = ${JSON.stringify(c.pricing, null, 2)} as const

export const SEO = ${JSON.stringify(c.seo, null, 2)} as const

export const CONTACT = ${JSON.stringify(c.contact, null, 2)} as const
`
}

// ── AI Copy hook ──────────────────────────────────────────────────────────
async function generateCopy(fieldLabel: string, currentValue: string, context: string): Promise<string> {
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 300,
      messages: [{
        role: "user",
        content: `You are a copywriter for DANVERSE, an AI-powered creative studio.
Context: ${context}
Field: ${fieldLabel}
Current value: "${currentValue}"

Write an improved version of this copy. Keep the same tone: bold, premium, uppercase where appropriate.
Return ONLY the improved copy text, no explanation, no quotes around it.`,
      }],
    }),
  })
  const data = await res.json()
  return data?.content?.[0]?.text ?? currentValue
}

// ── Main Component ────────────────────────────────────────────────────────
export default function AdminDashboard() {
  const router  = useRouter()
  const [authed, setAuthed]     = useState(false)
  const [loading, setLoading]   = useState(true)
  const [page, setPage]         = useState("dashboard")
  const [sidebar, setSidebar]   = useState(false)

  const [content, setContent]         = useState<SiteContent>(DEFAULT)
  const [saved, setSaved]             = useState<SiteContent>(DEFAULT)
  const [dirty, setDirty]             = useState(false)
  const [saving, setSaving]           = useState(false)
  const [msg, setMsg]                 = useState("")

  const [snapshots, setSnapshots]     = useState<Snapshot[]>([])
  const [snapName, setSnapName]       = useState("")
  const [diffTarget, setDiffTarget]   = useState<Snapshot | null>(null)

  const [activity, setActivity]       = useState<ActivityItem[]>([])
  const [deploying, setDeploying]     = useState(false)
  const [deployMsg, setDeployMsg]     = useState("")

  const [aiField, setAiField]         = useState<{label: string; path: string} | null>(null)
  const [aiLoading, setAiLoading]     = useState(false)
  const [aiResult, setAiResult]       = useState("")

  const [featureInput, setFeatureInput] = useState<Record<string, string>>({})

  const autoSaveRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  // ── Auth ────────────────────────────────────────────────────────────────
  useEffect(() => {
    const cookies = document.cookie.split(";")
    const session = cookies.find(c => c.trim().startsWith("admin-session="))
    if (!session?.includes("authenticated")) { router.push("/admin/login"); setLoading(false); return }

    setAuthed(true)
    try {
      const raw = localStorage.getItem(STORAGE_CONTENT)
      if (raw) { const p = JSON.parse(raw); setContent(p); setSaved(p) }
      const rawSnap = localStorage.getItem(STORAGE_SNAPSHOTS)
      if (rawSnap) setSnapshots(JSON.parse(rawSnap))
      const rawAct = localStorage.getItem(STORAGE_ACTIVITY)
      if (rawAct) setActivity(JSON.parse(rawAct))
    } catch { /* ignore */ }
    setLoading(false)
  }, [router])

  // ── Dirty check ─────────────────────────────────────────────────────────
  useEffect(() => {
    setDirty(JSON.stringify(content) !== JSON.stringify(saved))
  }, [content, saved])

  // ── Auto-save (60s) ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!dirty) return
    if (autoSaveRef.current) clearTimeout(autoSaveRef.current)
    autoSaveRef.current = setTimeout(() => {
      localStorage.setItem(STORAGE_CONTENT, JSON.stringify(content))
      setMsg("Auto-saved")
      setTimeout(() => setMsg(""), 2000)
    }, 60_000)
    return () => { if (autoSaveRef.current) clearTimeout(autoSaveRef.current) }
  }, [content, dirty])

  // ── Keyboard shortcuts ──────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key === "s") { e.preventDefault(); handleSave() }
      if ((e.ctrlKey || e.metaKey) && e.key === "e") { e.preventDefault(); handleExport() }
      if ((e.ctrlKey || e.metaKey) && e.key === "z") { e.preventDefault(); setContent(saved) }
      if (e.key === "Escape") { setSidebar(false) }
    }
    window.addEventListener("keydown", handler)
    return () => window.removeEventListener("keydown", handler)
  })

  // ── Helpers ──────────────────────────────────────────────────────────────
  const setFlash = (text: string, ms = 3000) => { setMsg(text); setTimeout(() => setMsg(""), ms) }

  const logActivity = useCallback((label: string) => {
    const item: ActivityItem = { id: Date.now().toString(), label, time: Date.now() }
    const next = [item, ...activity].slice(0, 20)
    setActivity(next)
    localStorage.setItem(STORAGE_ACTIVITY, JSON.stringify(next))
  }, [activity])

  // ── Save ──────────────────────────────────────────────────────────────────
  const handleSave = useCallback(async () => {
    if (!dirty) return
    setSaving(true)
    await new Promise(r => setTimeout(r, 600))
    localStorage.setItem(STORAGE_CONTENT, JSON.stringify(content))
    setSaved(JSON.parse(JSON.stringify(content)))
    setDirty(false)
    logActivity(`Saved: ${page}`)
    setFlash("✓ Changes saved")
    setSaving(false)
  }, [dirty, content, page, logActivity])

  // ── Snapshot ──────────────────────────────────────────────────────────────
  const createSnapshot = () => {
    if (!snapName.trim()) return
    const snap: Snapshot = { id: Date.now().toString(), name: snapName.trim(), ts: Date.now(), content: JSON.parse(JSON.stringify(content)) }
    const next = [snap, ...snapshots].slice(0, 20)
    setSnapshots(next)
    localStorage.setItem(STORAGE_SNAPSHOTS, JSON.stringify(next))
    setSnapName("")
    logActivity(`Snapshot: "${snap.name}"`)
    setFlash(`✓ Snapshot "${snap.name}" saved`)
  }

  const restoreSnapshot = (snap: Snapshot) => {
    if (!confirm(`Restore snapshot "${snap.name}"? Unsaved changes will be lost.`)) return
    setContent(snap.content)
    setFlash(`✓ Restored "${snap.name}"`)
    logActivity(`Restored: "${snap.name}"`)
  }

  const deleteSnapshot = (id: string) => {
    const next = snapshots.filter(s => s.id !== id)
    setSnapshots(next)
    localStorage.setItem(STORAGE_SNAPSHOTS, JSON.stringify(next))
    if (diffTarget?.id === id) setDiffTarget(null)
  }

  // ── Export ─────────────────────────────────────────────────────────────────
  const handleExport = () => {
    const ts = generateContentTs(content)
    const blob = new Blob([ts], { type: "text/plain" })
    const url = URL.createObjectURL(blob)
    const a = document.createElement("a"); a.href = url; a.download = "content.ts"; a.click()
    URL.revokeObjectURL(url)
    logActivity("Exported content.ts")
    setFlash("✓ content.ts downloaded")
  }

  // ── Deploy ─────────────────────────────────────────────────────────────────
  const handleDeploy = async () => {
    if (!content.deploy.hookUrl) { setDeployMsg("⚠ No deploy hook URL set. Go to Settings → Deploy Hook."); return }
    setDeploying(true); setDeployMsg("")
    try {
      await fetch(content.deploy.hookUrl, { method: "POST" })
      setDeployMsg("✓ Deploy triggered — Netlify will rebuild in ~2 min")
      logActivity("Deploy triggered")
    } catch {
      setDeployMsg("✗ Deploy failed — check the hook URL")
    }
    setDeploying(false)
  }

  // ── AI Copy ────────────────────────────────────────────────────────────────
  const runAiCopy = async () => {
    if (!aiField) return
    setAiLoading(true)
    try {
      const context = "DANVERSE is a premium AI-powered creative studio. Colors: red #ef4444 / orange #f97316. Tone: bold, precise, premium."
      const current = aiField.path.split(".").reduce((obj: unknown, k: string) => (obj as Record<string, unknown>)[k], content as unknown)
      const result = await generateCopy(aiField.label, String(current ?? ""), context)
      setAiResult(result)
    } catch { setAiResult("") }
    setAiLoading(false)
  }

  const applyAiResult = () => {
    if (!aiField || !aiResult) return
    const keys = aiField.path.split(".")
    setContent(prev => {
      const next = JSON.parse(JSON.stringify(prev))
      let obj = next
      for (let i = 0; i < keys.length - 1; i++) obj = obj[keys[i]]
      obj[keys[keys.length - 1]] = aiResult
      return next
    })
    setAiField(null); setAiResult("")
  }

  const AiBtn = ({ label, path }: { label: string; path: string }) => (
    <button
      type="button"
      onClick={() => { setAiField({ label, path }); setAiResult("") }}
      className="ml-2 text-[10px] text-orange-400 hover:text-orange-300 border border-orange-500/30 rounded px-1.5 py-0.5 transition-colors"
    >
      <Wand2 className="h-3 w-3 inline mr-0.5" />AI
    </button>
  )

  const patch = (section: keyof SiteContent, field: string, value: unknown) =>
    setContent(prev => ({ ...prev, [section]: { ...(prev[section] as Record<string, unknown>), [field]: value } }))

  const patchPricingFeatures = (plan: keyof SiteContent["pricing"], features: string[]) =>
    setContent(prev => ({ ...prev, pricing: { ...prev.pricing, [plan]: { ...prev.pricing[plan], features } } }))

  const health = calcHealthScore(content)

  const timeAgo = (ts: number) => {
    const s = Math.floor((Date.now() - ts) / 1000)
    if (s < 60) return "just now"
    if (s < 3600) return `${Math.floor(s/60)}m ago`
    if (s < 86400) return `${Math.floor(s/3600)}h ago`
    return `${Math.floor(s/86400)}d ago`
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  if (loading) return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
      <div className="w-6 h-6 border-2 border-red-500 border-t-transparent rounded-full animate-spin" />
    </div>
  )
  if (!authed) return null

  const NAV = [
    { id: "dashboard", label: "Dashboard",  icon: Home },
    { id: "content",   label: "Content",    icon: FileText },
    { id: "pricing",   label: "Pricing",    icon: DollarSign },
    { id: "snapshots", label: "Snapshots",  icon: Camera },
    { id: "export",    label: "Export",     icon: Download },
    { id: "deploy",    label: "Deploy",     icon: Rocket },
    { id: "analytics", label: "Analytics",  icon: BarChart3 },
    { id: "settings",  label: "Settings",   icon: Settings },
    { id: "help",      label: "Help",       icon: HelpCircle },
  ]

  // ── Sidebar ───────────────────────────────────────────────────────────────
  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b border-neutral-800">
        <Image src="/images/danverse-logo.webp" alt="DANVERSE" width={120} height={32} className="object-contain" unoptimized />
        <p className="text-[10px] text-neutral-500 mt-1 uppercase tracking-widest">Studio v3</p>
      </div>
      <nav className="flex-1 p-3 space-y-0.5 overflow-y-auto">
        {NAV.map(item => (
          <button key={item.id} onClick={() => { setPage(item.id); setSidebar(false) }}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
              page === item.id
                ? "bg-gradient-to-r from-red-500/20 to-orange-500/20 text-orange-400 border border-orange-500/20"
                : "text-neutral-400 hover:text-white hover:bg-neutral-800"
            }`}
          >
            <item.icon className="h-4 w-4 shrink-0" />{item.label}
            {item.id === "deploy" && dirty && <span className="ml-auto h-2 w-2 rounded-full bg-orange-500" />}
          </button>
        ))}
      </nav>
      <div className="p-3 border-t border-neutral-800 space-y-1">
        {dirty && (
          <div className="text-[10px] text-orange-400 text-center mb-2 flex items-center justify-center gap-1">
            <Clock className="h-3 w-3" /> Unsaved changes
          </div>
        )}
        <button onClick={() => { document.cookie = "admin-session=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT"; router.push("/admin/login") }}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm text-neutral-500 hover:text-red-400 hover:bg-red-500/10 transition-all"
        >
          <LogOut className="h-4 w-4" /> Logout
        </button>
      </div>
    </div>
  )

  // ── Dashboard ──────────────────────────────────────────────────────────────
  const Dashboard = () => (
    <div className="space-y-6">
      {/* Status banner */}
      <div className="bg-gradient-to-r from-red-600 to-orange-500 rounded-2xl p-6 text-white relative overflow-hidden">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-bold">DANVERSE Studio v3</h3>
              <p className="text-orange-100 text-sm">Content management active</p>
            </div>
          </div>
          <Button onClick={() => window.open("/", "_blank")} className="bg-white text-red-600 hover:bg-gray-100 font-semibold text-sm">
            <Eye className="h-4 w-4 mr-1" /> Preview
          </Button>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Health Score", value: `${health.score}%`, icon: ShieldCheck, color: health.score >= 80 ? "text-green-400" : "text-orange-400" },
          { label: "Snapshots",    value: snapshots.length, icon: Camera,     color: "text-blue-400" },
          { label: "Unsaved",      value: dirty ? "Yes" : "No", icon: Clock, color: dirty ? "text-orange-400" : "text-green-400" },
          { label: "Deploy Hook",  value: content.deploy.hookUrl ? "Set" : "Missing", icon: Rocket, color: content.deploy.hookUrl ? "text-green-400" : "text-red-400" },
        ].map(s => (
          <Card key={s.label} className="bg-[#1a1a1a] border-neutral-800">
            <CardContent className="p-4">
              <s.icon className={`h-5 w-5 mb-2 ${s.color}`} />
              <p className="text-neutral-400 text-xs">{s.label}</p>
              <p className={`text-xl font-bold ${s.color}`}>{String(s.value)}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Health checks */}
      <Card className="bg-[#1a1a1a] border-neutral-800">
        <CardHeader><CardTitle className="text-white text-sm flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-green-400" /> Content Health — {health.score}/100</CardTitle></CardHeader>
        <CardContent>
          <div className="w-full bg-neutral-800 rounded-full h-2 mb-4">
            <div className="h-2 rounded-full bg-gradient-to-r from-red-500 to-orange-500 transition-all" style={{ width: `${health.score}%` }} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {health.checks.map(c => (
              <div key={c.label} className="flex items-center gap-2 text-xs">
                {c.pass ? <CheckCircle className="h-3.5 w-3.5 text-green-400 shrink-0" /> : <AlertCircle className="h-3.5 w-3.5 text-red-400 shrink-0" />}
                <span className={c.pass ? "text-neutral-400" : "text-red-400"}>{c.label}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Activity */}
      <Card className="bg-[#1a1a1a] border-neutral-800">
        <CardHeader><CardTitle className="text-white text-sm">Recent Activity</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          {activity.length === 0 && <p className="text-neutral-500 text-sm">No activity yet.</p>}
          {activity.slice(0, 8).map(a => (
            <div key={a.id} className="flex items-center justify-between text-sm p-2 rounded bg-neutral-900">
              <span className="text-neutral-300">{a.label}</span>
              <span className="text-neutral-500 text-xs">{timeAgo(a.time)}</span>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Shortcuts reference */}
      <Card className="bg-[#1a1a1a] border-neutral-800">
        <CardHeader><CardTitle className="text-white text-sm flex items-center gap-2"><Code2 className="h-4 w-4 text-orange-400" /> Keyboard Shortcuts</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[["Ctrl+S", "Save changes"], ["Ctrl+E", "Export content.ts"], ["Ctrl+Z", "Undo (revert to saved)"], ["Esc", "Close sidebar"]].map(([k,v]) => (
              <div key={k} className="flex items-center gap-2"><kbd className="bg-neutral-800 border border-neutral-700 rounded px-1.5 py-0.5 font-mono text-orange-400">{k}</kbd><span className="text-neutral-400">{v}</span></div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )

  // ── Content editor ──────────────────────────────────────────────────────────
  const ContentEditor = () => (
    <div className="space-y-4">
      <PageHeader title="Content" sub="Edit site copy and text sections" />
      <SaveBar />
      <Tabs defaultValue="hero">
        <TabsList className="grid w-full grid-cols-4 bg-neutral-900 border border-neutral-800">
          {["hero","features","footer","about"].map(t => <TabsTrigger key={t} value={t} className="capitalize data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">{t}</TabsTrigger>)}
        </TabsList>

        <TabsContent value="hero" className="space-y-4 mt-4">
          <Card className="bg-[#1a1a1a] border-neutral-800">
            <CardHeader><CardTitle className="text-white text-sm">Hero Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Field label="Main Headline" aiBtn={<AiBtn label="Hero Headline" path="hero.title" />}>
                <Textarea value={content.hero.title} onChange={e => patch("hero","title",e.target.value)} className="bg-neutral-900 border-neutral-700 text-white min-h-[60px]" />
              </Field>
              <Field label="Subheadline" aiBtn={<AiBtn label="Hero Subheadline" path="hero.subtitle" />}>
                <Textarea value={content.hero.subtitle} onChange={e => patch("hero","subtitle",e.target.value)} className="bg-neutral-900 border-neutral-700 text-white" />
              </Field>
              <Field label="CTA Button Text">
                <Input value={content.hero.cta} onChange={e => patch("hero","cta",e.target.value)} className="bg-neutral-900 border-neutral-700 text-white" />
              </Field>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="features" className="space-y-4 mt-4">
          <Card className="bg-[#1a1a1a] border-neutral-800">
            <CardHeader><CardTitle className="text-white text-sm">Features Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Field label="Section Title" aiBtn={<AiBtn label="Features Title" path="features.title" />}>
                <Input value={content.features.title} onChange={e => patch("features","title",e.target.value)} className="bg-neutral-900 border-neutral-700 text-white" />
              </Field>
              <Field label="Section Subtitle" aiBtn={<AiBtn label="Features Subtitle" path="features.subtitle" />}>
                <Input value={content.features.subtitle} onChange={e => patch("features","subtitle",e.target.value)} className="bg-neutral-900 border-neutral-700 text-white" />
              </Field>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="footer" className="space-y-4 mt-4">
          <Card className="bg-[#1a1a1a] border-neutral-800">
            <CardHeader><CardTitle className="text-white text-sm">Footer Section</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Field label="Tagline" aiBtn={<AiBtn label="Footer Tagline" path="footer.tagline" />}>
                <Textarea value={content.footer.tagline} onChange={e => patch("footer","tagline",e.target.value)} className="bg-neutral-900 border-neutral-700 text-white" />
              </Field>
              <Field label="Copyright">
                <Input value={content.footer.copyright} onChange={e => patch("footer","copyright",e.target.value)} className="bg-neutral-900 border-neutral-700 text-white" />
              </Field>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="about" className="space-y-4 mt-4">
          <Card className="bg-[#1a1a1a] border-neutral-800">
            <CardHeader><CardTitle className="text-white text-sm">About Page</CardTitle></CardHeader>
            <CardContent className="space-y-4">
              <Field label="Page Title" aiBtn={<AiBtn label="About Title" path="about.title" />}>
                <Input value={content.about.title} onChange={e => patch("about","title",e.target.value)} className="bg-neutral-900 border-neutral-700 text-white" />
              </Field>
              <Field label="Description" aiBtn={<AiBtn label="About Description" path="about.description" />}>
                <Textarea value={content.about.description} onChange={e => patch("about","description",e.target.value)} className="bg-neutral-900 border-neutral-700 text-white min-h-[80px]" />
              </Field>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )

  // ── Pricing editor ──────────────────────────────────────────────────────────
  const PricingEditor = () => (
    <div className="space-y-4">
      <PageHeader title="Pricing" sub="Manage plan prices and features" />
      <SaveBar />
      <Tabs defaultValue="starter">
        <TabsList className="grid w-full grid-cols-3 bg-neutral-900 border border-neutral-800">
          {(["starter","professional","premium"] as const).map(t => (
            <TabsTrigger key={t} value={t} className="capitalize data-[state=active]:bg-red-500/20 data-[state=active]:text-red-400">{t}</TabsTrigger>
          ))}
        </TabsList>
        {(["starter","professional","premium"] as const).map(plan => (
          <TabsContent key={plan} value={plan} className="space-y-4 mt-4">
            <Card className="bg-[#1a1a1a] border-neutral-800">
              <CardHeader><CardTitle className="text-white text-sm capitalize">{plan} Plan</CardTitle></CardHeader>
              <CardContent className="space-y-4">
                <Field label="Price (USD)">
                  <Input value={content.pricing[plan].price} onChange={e => setContent(prev => ({ ...prev, pricing: { ...prev.pricing, [plan]: { ...prev.pricing[plan], price: e.target.value } } }))} className="bg-neutral-900 border-neutral-700 text-white w-32" />
                </Field>
                <div>
                  <Label className="text-neutral-300 text-xs mb-2 block">Features</Label>
                  <div className="space-y-2">
                    {content.pricing[plan].features.map((f, i) => (
                      <div key={i} className="flex gap-2">
                        <Input value={f} onChange={e => { const arr = [...content.pricing[plan].features]; arr[i] = e.target.value; patchPricingFeatures(plan, arr) }} className="bg-neutral-900 border-neutral-700 text-white text-sm" />
                        <Button variant="ghost" size="icon" onClick={() => patchPricingFeatures(plan, content.pricing[plan].features.filter((_,j) => j !== i))} className="text-red-400 hover:bg-red-500/10 shrink-0">
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                    <div className="flex gap-2">
                      <Input value={featureInput[plan] ?? ""} onChange={e => setFeatureInput(prev => ({ ...prev, [plan]: e.target.value }))}
                        onKeyDown={e => { if (e.key === "Enter" && featureInput[plan]?.trim()) { patchPricingFeatures(plan, [...content.pricing[plan].features, featureInput[plan].trim()]); setFeatureInput(prev => ({ ...prev, [plan]: "" })) } }}
                        placeholder="Add feature… (Enter to add)" className="bg-neutral-900 border-neutral-700 text-white text-sm" />
                      <Button variant="outline" size="icon" onClick={() => { if (featureInput[plan]?.trim()) { patchPricingFeatures(plan, [...content.pricing[plan].features, featureInput[plan].trim()]); setFeatureInput(prev => ({ ...prev, [plan]: "" })) } }} className="border-neutral-700 bg-transparent text-neutral-300">
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )

  // ── Snapshots ────────────────────────────────────────────────────────────────
  const SnapshotsPanel = () => (
    <div className="space-y-4">
      <PageHeader title="Snapshots" sub="Named saves — restore any point in time" />

      <Card className="bg-[#1a1a1a] border-neutral-800">
        <CardHeader><CardTitle className="text-white text-sm">Create Snapshot</CardTitle></CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input value={snapName} onChange={e => setSnapName(e.target.value)} onKeyDown={e => e.key === "Enter" && createSnapshot()} placeholder="e.g. Before redesign / v2.1 pricing" className="bg-neutral-900 border-neutral-700 text-white" />
            <Button onClick={createSnapshot} disabled={!snapName.trim()} className="bg-gradient-to-r from-red-500 to-orange-500 text-white shrink-0">
              <Plus className="h-4 w-4 mr-1" /> Save
            </Button>
          </div>
        </CardContent>
      </Card>

      {snapshots.length === 0 && (
        <div className="text-center py-12 text-neutral-500 text-sm">No snapshots yet. Create one above.</div>
      )}

      {snapshots.map(snap => (
        <Card key={snap.id} className="bg-[#1a1a1a] border-neutral-800">
          <CardContent className="p-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-white font-medium">{snap.name}</p>
              <p className="text-neutral-500 text-xs mt-0.5">{new Date(snap.ts).toLocaleString()}</p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="outline" size="sm" onClick={() => setDiffTarget(diffTarget?.id === snap.id ? null : snap)}
                className={`border-neutral-700 text-xs ${diffTarget?.id === snap.id ? "text-orange-400 border-orange-500/40" : "text-neutral-400"} bg-transparent`}>
                <Diff className="h-3.5 w-3.5 mr-1" /> Diff
              </Button>
              <Button variant="outline" size="sm" onClick={() => restoreSnapshot(snap)} className="border-neutral-700 text-neutral-400 bg-transparent text-xs">
                <Upload className="h-3.5 w-3.5 mr-1" /> Restore
              </Button>
              <Button variant="ghost" size="icon" onClick={() => deleteSnapshot(snap.id)} className="text-red-400 hover:bg-red-500/10 h-8 w-8">
                <Trash2 className="h-3.5 w-3.5" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Diff viewer */}
      {diffTarget && (
        <Card className="bg-[#1a1a1a] border-orange-500/30">
          <CardHeader><CardTitle className="text-white text-sm flex items-center gap-2"><Diff className="h-4 w-4 text-orange-400" /> Diff: Current vs "{diffTarget.name}"</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-2">Current</p>
                <pre className="text-xs text-green-400 bg-black/60 rounded p-3 overflow-auto max-h-60 whitespace-pre-wrap">{JSON.stringify(content, null, 2)}</pre>
              </div>
              <div>
                <p className="text-[10px] text-neutral-500 uppercase tracking-widest mb-2">Snapshot: {diffTarget.name}</p>
                <pre className="text-xs text-orange-400 bg-black/60 rounded p-3 overflow-auto max-h-60 whitespace-pre-wrap">{JSON.stringify(diffTarget.content, null, 2)}</pre>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  )

  // ── Export ────────────────────────────────────────────────────────────────
  const ExportPanel = () => (
    <div className="space-y-4">
      <PageHeader title="Export" sub="Generate lib/content.ts for the site repo" />
      <Card className="bg-[#1a1a1a] border-neutral-800">
        <CardHeader>
          <CardTitle className="text-white text-sm">Export Engine</CardTitle>
          <p className="text-neutral-500 text-xs">Generates a TypeScript constants file from current content. Copy it into lib/content.ts in your repo.</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button onClick={handleExport} className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
            <Download className="h-4 w-4 mr-2" /> Download content.ts
          </Button>
          <div>
            <p className="text-neutral-400 text-xs mb-2">Preview:</p>
            <pre className="text-xs text-green-400 bg-black/80 rounded-lg p-4 overflow-auto max-h-80 border border-neutral-800">{generateContentTs(content)}</pre>
          </div>
          <Alert className="bg-neutral-900 border-neutral-700">
            <AlertDescription className="text-neutral-400 text-xs">
              After downloading: place the file at <code className="text-orange-400">lib/content.ts</code> in your repo, then push to Netlify to deploy.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>
    </div>
  )

  // ── Deploy ─────────────────────────────────────────────────────────────────
  const DeployPanel = () => (
    <div className="space-y-4">
      <PageHeader title="Deploy" sub="Trigger a Netlify rebuild" />
      <Card className="bg-[#1a1a1a] border-neutral-800">
        <CardHeader><CardTitle className="text-white text-sm">Deploy Hook Setup</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Field label="Netlify Deploy Hook URL">
            <Input value={content.deploy.hookUrl} onChange={e => patch("deploy","hookUrl",e.target.value)}
              placeholder="https://api.netlify.com/build_hooks/..." className="bg-neutral-900 border-neutral-700 text-white font-mono text-sm" />
          </Field>
          <Alert className="bg-neutral-900 border-neutral-700">
            <AlertDescription className="text-neutral-400 text-xs">
              Netlify → Site → Site configuration → Build hooks → Add build hook → copy URL here.
            </AlertDescription>
          </Alert>
          <Button onClick={handleSave} disabled={!dirty} variant="outline" size="sm" className="border-neutral-700 text-neutral-400 bg-transparent">
            Save hook URL first
          </Button>
        </CardContent>
      </Card>
      <Card className="bg-[#1a1a1a] border-neutral-800">
        <CardHeader><CardTitle className="text-white text-sm flex items-center gap-2"><Rocket className="h-4 w-4 text-orange-400" /> Trigger Deploy</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          {deployMsg && (
            <Alert className={`${deployMsg.startsWith("✓") ? "bg-green-500/10 border-green-500/30 text-green-300" : "bg-orange-500/10 border-orange-500/30 text-orange-300"}`}>
              <AlertDescription>{deployMsg}</AlertDescription>
            </Alert>
          )}
          <Button onClick={handleDeploy} disabled={deploying || !content.deploy.hookUrl}
            className="bg-gradient-to-r from-red-500 to-orange-500 text-white">
            {deploying ? <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Deploying…</> : <><Rocket className="h-4 w-4 mr-2" /> Deploy to Netlify</>}
          </Button>
          <p className="text-neutral-500 text-xs">This triggers a Netlify build. The site will go live in ~2 minutes.</p>
        </CardContent>
      </Card>
    </div>
  )

  // ── Analytics ──────────────────────────────────────────────────────────────
  const AnalyticsPanel = () => (
    <div className="space-y-4">
      <PageHeader title="Analytics" sub="Performance overview" />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: "Page Views",      value: "—", note: "via GA" },
          { label: "Unique Visitors", value: "—", note: "via GA" },
          { label: "Bounce Rate",     value: "—", note: "via GA" },
          { label: "Avg. Session",    value: "—", note: "via GA" },
        ].map(s => (
          <Card key={s.label} className="bg-[#1a1a1a] border-neutral-800">
            <CardContent className="p-4">
              <p className="text-neutral-400 text-xs">{s.label}</p>
              <p className="text-2xl font-bold text-white">{s.value}</p>
              <p className="text-neutral-600 text-[10px]">{s.note}</p>
            </CardContent>
          </Card>
        ))}
      </div>
      <Card className="bg-[#1a1a1a] border-neutral-800">
        <CardContent className="p-6 flex flex-col items-center gap-3">
          <BarChart3 className="h-10 w-10 text-neutral-600" />
          <p className="text-neutral-400 text-sm text-center">Live analytics powered by Google Analytics</p>
          <Button asChild variant="outline" className="border-neutral-700 text-neutral-400 bg-transparent">
            <a href="https://analytics.google.com" target="_blank" rel="noopener noreferrer">
              <TrendingUp className="h-4 w-4 mr-2" /> Open GA Dashboard
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  // ── Settings ───────────────────────────────────────────────────────────────
  const SettingsPanel = () => (
    <div className="space-y-4">
      <PageHeader title="Settings" sub="SEO, contact info, and system preferences" />
      <SaveBar />

      <Card className="bg-[#1a1a1a] border-neutral-800">
        <CardHeader><CardTitle className="text-white text-sm">SEO Metadata</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Field label="Meta Title (≤60 chars)">
            <Input value={content.seo.title} onChange={e => patch("seo","title",e.target.value)} className="bg-neutral-900 border-neutral-700 text-white" maxLength={60} />
            <p className="text-neutral-600 text-xs mt-1">{content.seo.title.length}/60</p>
          </Field>
          <Field label="Meta Description (≤160 chars)">
            <Textarea value={content.seo.description} onChange={e => patch("seo","description",e.target.value)} className="bg-neutral-900 border-neutral-700 text-white" maxLength={160} />
            <p className="text-neutral-600 text-xs mt-1">{content.seo.description.length}/160</p>
          </Field>
          <Field label="OG Image Path">
            <Input value={content.seo.ogImage} onChange={e => patch("seo","ogImage",e.target.value)} className="bg-neutral-900 border-neutral-700 text-white font-mono text-sm" placeholder="/images/og.jpg" />
          </Field>
        </CardContent>
      </Card>

      <Card className="bg-[#1a1a1a] border-neutral-800">
        <CardHeader><CardTitle className="text-white text-sm">Contact Information</CardTitle></CardHeader>
        <CardContent className="space-y-4">
          <Field label="WhatsApp Number (no + or spaces)">
            <Input value={content.contact.whatsapp} onChange={e => patch("contact","whatsapp",e.target.value)} className="bg-neutral-900 border-neutral-700 text-white" />
          </Field>
          <Field label="Email"><Input value={content.contact.email} onChange={e => patch("contact","email",e.target.value)} className="bg-neutral-900 border-neutral-700 text-white" /></Field>
          <Field label="Instagram Handle"><Input value={content.contact.instagram} onChange={e => patch("contact","instagram",e.target.value)} className="bg-neutral-900 border-neutral-700 text-white" /></Field>
        </CardContent>
      </Card>

      <Card className="bg-[#1a1a1a] border-neutral-800">
        <CardHeader><CardTitle className="text-white text-sm text-red-400">Danger Zone</CardTitle></CardHeader>
        <CardContent>
          <Button variant="destructive" onClick={() => {
            if (!confirm("Reset all content to defaults?")) return
            setContent(DEFAULT); setSaved(DEFAULT)
            localStorage.removeItem(STORAGE_CONTENT)
            localStorage.removeItem(STORAGE_ACTIVITY)
            setActivity([])
            setFlash("Dashboard reset to defaults")
          }}>
            Reset to Defaults
          </Button>
        </CardContent>
      </Card>
    </div>
  )

  // ── Help ────────────────────────────────────────────────────────────────────
  const HelpPanel = () => (
    <div className="space-y-4">
      <PageHeader title="Help" sub="Quick start guide and support" />
      <Card className="bg-[#1a1a1a] border-neutral-800">
        <CardHeader><CardTitle className="text-white text-sm">Workflow Guide</CardTitle></CardHeader>
        <CardContent className="space-y-3">
          {[
            ["Edit Content",         "Content → edit any section → Save (Ctrl+S)"],
            ["Snapshot before edits","Snapshots → name it → Save Snapshot"],
            ["Export for deploy",    "Export → Download content.ts → add to repo"],
            ["One-click deploy",     "Deploy → set Netlify hook → Trigger Deploy"],
            ["AI copy suggestions",  "Content editor → click AI button next to any field"],
          ].map(([title, desc]) => (
            <div key={title} className="flex gap-3">
              <CheckCircle className="h-4 w-4 text-green-400 shrink-0 mt-0.5" />
              <div><p className="text-white text-sm font-medium">{title}</p><p className="text-neutral-500 text-xs">{desc}</p></div>
            </div>
          ))}
        </CardContent>
      </Card>
      <Card className="bg-[#1a1a1a] border-neutral-800">
        <CardHeader><CardTitle className="text-white text-sm">Support</CardTitle></CardHeader>
        <CardContent className="space-y-2">
          <p className="text-neutral-400 text-sm">Email: <a href="mailto:danverseai@outlook.com" className="text-orange-400 hover:underline">danverseai@outlook.com</a></p>
          <p className="text-neutral-400 text-sm">WhatsApp: <a href="https://wa.me/201207346648" target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">+201207346648</a></p>
        </CardContent>
      </Card>
    </div>
  )

  // ── Shared sub-components ──────────────────────────────────────────────────
  const PageHeader = ({ title, sub }: { title: string; sub: string }) => (
    <div className="flex items-start justify-between">
      <div><h2 className="text-xl font-bold text-white">{title}</h2><p className="text-neutral-500 text-sm">{sub}</p></div>
    </div>
  )

  const SaveBar = () => (
    <div className="flex items-center gap-3 flex-wrap">
      {dirty && <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">Unsaved changes</Badge>}
      {msg && <Badge className={`${msg.startsWith("✓") || msg.startsWith("Auto") ? "bg-green-500/20 text-green-300 border-green-500/30" : "bg-red-500/20 text-red-300 border-red-500/30"}`}>{msg}</Badge>}
      <Button onClick={handleSave} disabled={!dirty || saving} className="bg-gradient-to-r from-red-500 to-orange-500 text-white ml-auto">
        <Save className="h-4 w-4 mr-2" />{saving ? "Saving…" : "Save (Ctrl+S)"}
      </Button>
    </div>
  )

  const Field = ({ label, children, aiBtn }: { label: string; children: React.ReactNode; aiBtn?: React.ReactNode }) => (
    <div className="space-y-1.5">
      <div className="flex items-center"><Label className="text-neutral-300 text-xs">{label}</Label>{aiBtn}</div>
      {children}
    </div>
  )

  const PAGES: Record<string, React.ReactNode> = {
    dashboard: <Dashboard />,
    content:   <ContentEditor />,
    pricing:   <PricingEditor />,
    snapshots: <SnapshotsPanel />,
    export:    <ExportPanel />,
    deploy:    <DeployPanel />,
    analytics: <AnalyticsPanel />,
    settings:  <SettingsPanel />,
    help:      <HelpPanel />,
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Mobile overlay */}
      {sidebar && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={() => setSidebar(false)} />
          <div className="absolute left-0 top-0 h-full w-60 bg-[#0f0f0f] border-r border-neutral-800 z-10">
            <div className="flex items-center justify-end p-3 border-b border-neutral-800">
              <Button variant="ghost" size="icon" onClick={() => setSidebar(false)}><X className="h-4 w-4" /></Button>
            </div>
            <SidebarContent />
          </div>
        </div>
      )}

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 w-56 bg-[#0f0f0f] border-r border-neutral-800 z-30">
        <SidebarContent />
      </aside>

      {/* Main */}
      <div className="flex-1 flex flex-col lg:ml-56">
        {/* Topbar */}
        <div className="fixed top-0 right-0 left-0 lg:left-56 z-20 h-14 bg-[#0f0f0f]/95 border-b border-neutral-800 flex items-center justify-between px-4 backdrop-blur-sm">
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon" className="lg:hidden text-neutral-400" onClick={() => setSidebar(true)}><Menu className="h-5 w-5" /></Button>
            <span className="text-sm font-medium text-white capitalize">{page}</span>
          </div>
          <div className="flex items-center gap-2">
            {dirty && <span className="text-orange-400 text-xs hidden sm:block">Unsaved</span>}
            <Button onClick={handleSave} disabled={!dirty || saving} size="sm" className="bg-gradient-to-r from-red-500 to-orange-500 text-white text-xs">
              <Save className="h-3.5 w-3.5 mr-1" />{saving ? "…" : "Save"}
            </Button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 lg:p-6 mt-14 overflow-auto">
          {PAGES[page] ?? null}
        </div>
      </div>

      {/* AI Copy Modal */}
      {aiField && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/70" onClick={() => setAiField(null)} />
          <div className="relative bg-[#1a1a1a] border border-neutral-700 rounded-2xl p-6 w-full max-w-lg space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-white font-bold flex items-center gap-2"><Wand2 className="h-4 w-4 text-orange-400" /> AI Copy — {aiField.label}</h3>
              <Button variant="ghost" size="icon" onClick={() => setAiField(null)}><X className="h-4 w-4" /></Button>
            </div>
            {!aiResult && (
              <Button onClick={runAiCopy} disabled={aiLoading} className="bg-gradient-to-r from-red-500 to-orange-500 text-white w-full">
                {aiLoading ? <><RefreshCw className="h-4 w-4 mr-2 animate-spin" /> Generating…</> : <><Sparkles className="h-4 w-4 mr-2" /> Generate with AI</>}
              </Button>
            )}
            {aiResult && (
              <div className="space-y-3">
                <div className="bg-black/60 border border-neutral-700 rounded-lg p-3">
                  <p className="text-green-400 text-sm">{aiResult}</p>
                </div>
                <div className="flex gap-2">
                  <Button onClick={applyAiResult} className="bg-gradient-to-r from-red-500 to-orange-500 text-white flex-1">
                    <CheckCircle className="h-4 w-4 mr-2" /> Apply
                  </Button>
                  <Button onClick={() => { setAiResult(""); runAiCopy() }} variant="outline" className="border-neutral-700 text-neutral-400 bg-transparent">
                    <RefreshCw className="h-4 w-4" />
                  </Button>
                  <Button onClick={() => { setAiResult(""); setAiField(null) }} variant="ghost" className="text-neutral-500">
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
