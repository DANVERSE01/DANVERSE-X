import { SiteHeader } from "@/components/site-header"
import { AppverseFooter } from "@/components/appverse-footer"
import Link from "next/link"
import Image from "next/image"

export const metadata = {
  title: "Work | DANVERSE",
  description: "Explore our portfolio of cinematic ads, brand identities, and AI-powered creative projects.",
}

// Sample projects data - can be moved to a CMS or config file
const projects = [
  {
    slug: "neon-dreams-campaign",
    title: "Neon Dreams Campaign",
    category: "Cinematic Ads",
    year: "2024",
    thumbnail: "/images/2d0f88e5-0eef-4d29-b8b8.jpeg",
    color: "lime",
  },
  {
    slug: "digital-identity-rebrand",
    title: "Digital Identity Rebrand",
    category: "Branding",
    year: "2024",
    thumbnail: "/images/90913f4b-4847-4351-b7ff.jpeg",
    color: "cyan",
  },
  {
    slug: "data-flow-visualization",
    title: "Data Flow Visualization",
    category: "Motion Design",
    year: "2024",
    thumbnail: "/images/chatgpt-20image-20nov-2021-2c-202025-2c-2001-50-56-20pm.png",
    color: "magenta",
  },
  {
    slug: "creative-process-film",
    title: "Creative Process Film",
    category: "Brand Film",
    year: "2024",
    thumbnail: "/images/8d48d9bd-b870-4093-a006-4630f5e24801-20-282-29.png",
    color: "lime",
  },
  {
    slug: "bio-tech-capsules",
    title: "Bio-Tech Capsules",
    category: "3D Animation",
    year: "2024",
    thumbnail: "/images/448bfdab-d707-43a9-8574-447eab2414aa-20-20copy.jpeg",
    color: "cyan",
  },
  {
    slug: "portrait-series",
    title: "Portrait Series",
    category: "AI Art Direction",
    year: "2024",
    thumbnail: "/images/a964a214-7df6-4891-925c-149533b8d970-20-282-29.png",
    color: "magenta",
  },
]

export default function WorkPage() {
  return (
    <main className="min-h-screen bg-[#0a0a0f] text-white">
      <SiteHeader />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6">
            <span className="text-white">Selected</span>
            <br />
            <span className="bg-gradient-to-r from-lime-400 via-cyan-400 to-magenta-400 bg-clip-text text-transparent">
              Works
            </span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl max-w-2xl">
            Cinematic experiences, bold identities, and AI-powered creative systems for brands that refuse to blend in.
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="pb-32 px-4">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
            {projects.map((project, i) => (
              <Link
                key={project.slug}
                href={`/work/${project.slug}`}
                className={`group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 transition-all duration-500 hover:border-${project.color}-400/50 hover:scale-[1.02] ${
                  i === 0 ? "md:col-span-2 aspect-[21/9]" : "aspect-[4/3]"
                }`}
              >
                {/* Thumbnail */}
                <Image
                  src={project.thumbnail || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8">
                  <div className="flex items-center gap-3 mb-3">
                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium bg-${project.color}-400/20 text-${project.color}-400 border border-${project.color}-400/30`}
                    >
                      {project.category}
                    </span>
                    <span className="text-white/40 text-sm">{project.year}</span>
                  </div>
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white group-hover:text-lime-400 transition-colors duration-300">
                    {project.title}
                  </h2>
                </div>

                {/* Hover Glow */}
                <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-${project.color}-400/10 via-transparent to-transparent`}
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <AppverseFooter />
    </main>
  )
}
