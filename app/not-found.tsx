import Link from "next/link"

export default function NotFound() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-black px-6 py-24 text-white">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(230,60,47,0.22),transparent_55%)]" />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#e63c2f] to-transparent opacity-70" />
      <div className="relative z-10 flex max-w-2xl flex-col items-center text-center">
        <p className="font-display text-[clamp(7rem,24vw,15rem)] leading-none tracking-[0.14em] text-[#e63c2f]">
          404
        </p>
        <h1 className="mt-4 text-3xl font-semibold uppercase tracking-[0.18em] text-white sm:text-4xl">
          Page not found
        </h1>
        <p className="mt-4 max-w-xl text-base text-white/70 sm:text-lg">
          The page you requested is off the DANVERSE grid. Head back to the homepage to continue exploring the
          studio.
        </p>
        <Link
          href="/"
          className="mt-8 inline-flex items-center rounded-full border border-[#e63c2f]/40 bg-[#e63c2f]/12 px-6 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white transition-colors duration-300 hover:bg-[#e63c2f] hover:text-black"
        >
          Back to homepage
        </Link>
      </div>
    </div>
  )
}
