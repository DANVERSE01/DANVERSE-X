export type RouteKind = "route" | "home-anchor" | "external"

export interface RouteConfig {
  href: string
  kind: RouteKind
  label: string
  mobilePriority?: number
}

export const PRIMARY_NAV_ROUTES: readonly RouteConfig[] = [
  { href: "/work", kind: "route", label: "Work", mobilePriority: 1 },
  { href: "#process", kind: "home-anchor", label: "Process", mobilePriority: 2 },
  { href: "/faq", kind: "route", label: "FAQ", mobilePriority: 3 },
  { href: "/about", kind: "route", label: "About", mobilePriority: 4 },
] as const

export const FOOTER_NAV_ROUTES: readonly RouteConfig[] = [
  { href: "/", kind: "route", label: "Home" },
  { href: "/work", kind: "route", label: "Work" },
  { href: "#features", kind: "home-anchor", label: "Studio Standard" },
  { href: "#case-files", kind: "home-anchor", label: "Case Files" },
  { href: "#process", kind: "home-anchor", label: "Process" },
  { href: "/about", kind: "route", label: "About" },
] as const

export function resolveRouteHref(route: RouteConfig, pathname: string) {
  if (route.kind === "home-anchor") {
    return pathname === "/" ? route.href : `/${route.href}`
  }

  return route.href
}

export function isRouteActive(pathname: string, route: RouteConfig) {
  if (route.kind === "home-anchor") {
    return pathname === "/"
  }

  return pathname === route.href
}
