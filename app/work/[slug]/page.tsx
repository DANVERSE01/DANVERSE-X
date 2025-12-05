import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, Tag, User } from "lucide-react"

// Project data - can be moved to CMS or database
const projectsData: Record<string, ProjectData> = {
  "neon-dreams-campaign": {
    title: "Neon Dreams Campaign",
    subtitle: "Cinematic advertising that breaks through the noise",
    category: "Cinematic Ads",
    year: "2024",
    client: "TechVision Labs",
    duration: "6 weeks",
    heroImage: "/images/2d0f88e5-0eef-4d29-b8b8.jpeg",
    overview:
      "A hyper-realistic 3D campaign showcasing bioluminescent crystals and organic forms, designed to capture attention in a saturated digital landscape. The campaign achieved 340% higher engagement than industry benchmarks.",
    challenge:
      "TechVision Labs needed a campaign that would stand out in a crowded market dominated by generic tech aesthetics. They wanted something that felt alive, organic, and unmistakably premium.",
    solution:
      "We created a series of cinematic 3D environments featuring bioluminescent crystals and otherworldly plant life. Each frame was designed to stop the scroll and create an emotional connection with the viewer.",
    results: [
      { metric: "340%", label: "Higher Engagement" },
      { metric: "2.1M", label: "Organic Views" },
      { metric: "47%", label: "Click-Through Rate" },
      { metric: "12x", label: "ROAS" },
    ],
    gallery: [
      "/images/2d0f88e5-0eef-4d29-b8b8.jpeg",
      "/images/448bfdab-d707-43a9-8574-447eab2414aa-20-20copy.jpeg",
      "/images/chatgpt-20image-20nov-2021-2c-202025-2c-2001-50-56-20pm.png",
    ],
    services: ["3D Animation", "Art Direction", "Motion Design", "Sound Design"],
    nextProject: "digital-identity-rebrand",
    prevProject: "portrait-series",
  },
  "digital-identity-rebrand": {
    title: "Digital Identity Rebrand",
    subtitle: "A bold new visual language for the future of advertising",
    category: "Branding",
    year: "2024",
    client: "DANVERSE",
    duration: "4 weeks",
    heroImage: "/images/90913f4b-4847-4351-b7ff.jpeg",
    overview:
      "A complete brand identity system featuring flowing neon light trails, a custom D monogram, and a tagline that positions DANVERSE as the future of intelligent advertising.",
    challenge:
      "DANVERSE needed a visual identity that communicated cutting-edge AI capabilities while maintaining warmth and approachability. The brand had to feel both futuristic and trustworthy.",
    solution:
      "We developed a dynamic visual system based on flowing light trails in cyan, magenta, and lime. The custom D monogram represents the convergence of creativity and technology.",
    results: [
      { metric: "100%", label: "Brand Recognition" },
      { metric: "5x", label: "Social Engagement" },
      { metric: "85%", label: "Positive Sentiment" },
      { metric: "∞", label: "Possibilities" },
    ],
    gallery: ["/images/90913f4b-4847-4351-b7ff.jpeg", "/images/8d48d9bd-b870-4093-a006-4630f5e24801-20-282-29.png"],
    services: ["Brand Strategy", "Visual Identity", "Motion Guidelines", "Brand Book"],
    nextProject: "data-flow-visualization",
    prevProject: "neon-dreams-campaign",
  },
  // Add more projects as needed...
}

interface ProjectData {
  title: string
  subtitle: string
  category: string
  year: string
  client: string
  duration: string
  heroImage: string
  overview: string
  challenge: string
  solution: string
  results: { metric: string; label: string }[]
  gallery: string[]
  services: string[]
  nextProject: string
  prevProject: string
}

export function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({ slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const project = projectsData[params.slug]
  if (!project) {
    return { title: "Project Not Found | DANVERSE" }
  }
  return {
    title: `${project.title} | DANVERSE`,
    description: project.overview,
  }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const project = projectsData[params.slug]

  if (!project) {
    return (
      <main className="min-h-screen bg-[#0a0a0f] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Project Not Found</h1>
          <Link href="/work" className="text-lime-400 hover:underline">
            Back to Work
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white overflow-x-hidden">
      <SiteHeader />

      {/* Hero Section - Full Bleed */}
      <section className="relative h-[70vh] md:h-[85vh] overflow-hidden">
        <Image
          src={project.heroImage || "/placeholder.svg"}
          alt={project.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0f] via-[#0a0a0f]/40 to-transparent" />

        {/* Hero Content */}
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-12 lg:p-20">
          <div className="container mx-auto max-w-6xl">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-4 py-1.5 rounded-full text-sm font-medium bg-lime-400/20 text-lime-400 border border-lime-400/30">
                {project.category}
              </span>
              <span className="text-white/40">{project.year}</span>
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4">{project.title}</h1>
            <p className="text-xl md:text-2xl text-white/60 max-w-2xl">{project.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Project Meta */}
      <section className="py-12 border-b border-white/10">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
                <User className="w-4 h-4" />
                Client
              </div>
              <p className="text-white font-medium">{project.client}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
                <Calendar className="w-4 h-4" />
                Duration
              </div>
              <p className="text-white font-medium">{project.duration}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
                <Tag className="w-4 h-4" />
                Category
              </div>
              <p className="text-white font-medium">{project.category}</p>
            </div>
            <div>
              <div className="flex items-center gap-2 text-white/40 text-sm mb-2">
                <ExternalLink className="w-4 h-4" />
                Services
              </div>
              <p className="text-white font-medium">{project.services.length} deliverables</p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="grid md:grid-cols-2 gap-12 md:gap-20">
            <div>
              <h2 className="text-sm uppercase tracking-wider text-lime-400 mb-4">Overview</h2>
              <p className="text-2xl md:text-3xl text-white/90 leading-relaxed">{project.overview}</p>
            </div>
            <div className="space-y-8">
              <div>
                <h3 className="text-sm uppercase tracking-wider text-cyan-400 mb-3">The Challenge</h3>
                <p className="text-white/60 leading-relaxed">{project.challenge}</p>
              </div>
              <div>
                <h3 className="text-sm uppercase tracking-wider text-magenta-400 mb-3">The Solution</h3>
                <p className="text-white/60 leading-relaxed">{project.solution}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-20 bg-white/5">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-sm uppercase tracking-wider text-lime-400 mb-12 text-center">Results</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {project.results.map((result, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-lime-400 via-cyan-400 to-lime-400 bg-clip-text text-transparent mb-2">
                  {result.metric}
                </div>
                <p className="text-white/60 text-sm uppercase tracking-wider">{result.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section - Cinematic Scroll */}
      <section className="py-20 md:py-32">
        <div className="container mx-auto max-w-7xl px-6">
          <h2 className="text-sm uppercase tracking-wider text-lime-400 mb-12">Gallery</h2>
          <div className="space-y-8">
            {project.gallery.map((image, i) => (
              <div key={i} className="relative aspect-[16/9] md:aspect-[21/9] rounded-2xl overflow-hidden group">
                <Image
                  src={image || "/placeholder.svg"}
                  alt={`${project.title} - Image ${i + 1}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Used */}
      <section className="py-20 border-t border-white/10">
        <div className="container mx-auto max-w-6xl px-6">
          <h2 className="text-sm uppercase tracking-wider text-lime-400 mb-8">Services Delivered</h2>
          <div className="flex flex-wrap gap-3">
            {project.services.map((service, i) => (
              <span
                key={i}
                className="px-5 py-2.5 rounded-full bg-white/5 border border-white/10 text-white/80 hover:border-lime-400/50 hover:text-lime-400 transition-colors cursor-default"
              >
                {service}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 md:py-32 bg-gradient-to-b from-transparent via-lime-400/5 to-transparent">
        <div className="container mx-auto max-w-4xl px-6 text-center">
          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            Ready to create something
            <span className="block bg-gradient-to-r from-lime-400 to-cyan-400 bg-clip-text text-transparent">
              extraordinary?
            </span>
          </h2>
          <p className="text-white/60 text-lg mb-8 max-w-2xl mx-auto">
            Let&apos;s discuss your project and explore how we can bring your vision to life.
          </p>
          <Button
            asChild
            size="lg"
            className="bg-lime-400 text-black font-semibold rounded-full px-10 py-6 text-lg hover:bg-lime-300 hover:scale-105 transition-all duration-300"
          >
            <Link href="https://wa.link/rc25na" target="_blank">
              Start Your Project
            </Link>
          </Button>
        </div>
      </section>

      {/* Navigation Between Projects */}
      <section className="py-12 border-t border-white/10">
        <div className="container mx-auto max-w-6xl px-6">
          <div className="flex justify-between items-center">
            <Link
              href={`/work/${project.prevProject}`}
              className="group flex items-center gap-3 text-white/60 hover:text-lime-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
              <span>Previous Project</span>
            </Link>
            <Link href="/work" className="text-white/60 hover:text-white transition-colors">
              All Work
            </Link>
            <Link
              href={`/work/${project.nextProject}`}
              className="group flex items-center gap-3 text-white/60 hover:text-lime-400 transition-colors"
            >
              <span>Next Project</span>
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>
        </div>
      </section>

      <AppverseFooter />
    </main>
  )
}
