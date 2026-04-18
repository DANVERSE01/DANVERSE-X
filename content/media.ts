export interface MotionAsset {
  id: string
  title: string
  role: string
  sourceLabel: string
  src: string
  poster: string
  original: string
}

const OPTIMIZED = "/videos/optimized"

export const motionAssets: MotionAsset[] = [
  {
    id: "showreel-hero",
    title: "Showreel hero",
    role: "entry motion",
    sourceLabel: "showreel-hero.mp4",
    src: `${OPTIMIZED}/showreel-hero.mp4`,
    poster: `${OPTIMIZED}/posters/showreel-hero.jpg`,
    original: "/videos/showreel-hero.mp4",
  },
  {
    id: "kova-3d-showcase",
    title: "KOVA showcase",
    role: "product motion",
    sourceLabel: "kova-3d-showcase.mp4",
    src: `${OPTIMIZED}/kova-3d-showcase.mp4`,
    poster: `${OPTIMIZED}/posters/kova-3d-showcase.jpg`,
    original: "/videos/kova-3d-showcase.mp4",
  },
  {
    id: "kova-social",
    title: "KOVA social",
    role: "feed rhythm",
    sourceLabel: "kova-social.mp4",
    src: `${OPTIMIZED}/kova-social.mp4`,
    poster: `${OPTIMIZED}/posters/kova-social.jpg`,
    original: "/videos/kova-social.mp4",
  },
  {
    id: "hf-20260330",
    title: "Premium object",
    role: "light study",
    sourceLabel: "hf_20260330.mp4",
    src: `${OPTIMIZED}/hf-20260330-205615-7aa88a8b-465a-42e8-99cc-18a62632c5a4-1.mp4`,
    poster: `${OPTIMIZED}/posters/hf-20260330-205615-7aa88a8b-465a-42e8-99cc-18a62632c5a4-1.jpg`,
    original: "/videos/hf_20260330_205615_7aa88a8b-465a-42e8-99cc-18a62632c5a4 (1).mp4",
  },
  {
    id: "product-showcase",
    title: "3D product",
    role: "object render",
    sourceLabel: "3d-product-showcase.mp4",
    src: `${OPTIMIZED}/mohamed-adel-portfolio-client-public-3d-product-showcase.mp4`,
    poster: `${OPTIMIZED}/posters/mohamed-adel-portfolio-client-public-3d-product-showcase.jpg`,
    original: "/videos/mohamed-adel-portfolio_client_public_3d-product-showcase.mp4",
  },
  {
    id: "dynamic-presentation",
    title: "Dynamic product",
    role: "presentation motion",
    sourceLabel: "product-showcase-dynamic-presentation.mp4",
    src: `${OPTIMIZED}/mohamed-adel-portfolio-client-public-portfolio-videos-product-showcase-dynamic-presentation.mp4`,
    poster: `${OPTIMIZED}/posters/mohamed-adel-portfolio-client-public-portfolio-videos-product-showcase-dynamic-presentation.jpg`,
    original: "/videos/mohamed-adel-portfolio_client_public_portfolio_videos_product-showcase-dynamic-presentation.mp4",
  },
  {
    id: "ff021d73",
    title: "Atmospheric pass",
    role: "motion fragment",
    sourceLabel: "ff021d73.mp4",
    src: `${OPTIMIZED}/ff021d73-5ab0-4d5a-8661-7b0d0fa0ce18.mp4`,
    poster: `${OPTIMIZED}/posters/ff021d73-5ab0-4d5a-8661-7b0d0fa0ce18.jpg`,
    original: "/videos/ff021d73-5ab0-4d5a-8661-7b0d0fa0ce18.mp4",
  },
  {
    id: "download-77",
    title: "Object pass",
    role: "short-form motion",
    sourceLabel: "download-77.mp4",
    src: `${OPTIMIZED}/download-77.mp4`,
    poster: `${OPTIMIZED}/posters/download-77.jpg`,
    original: "/videos/download (77).mp4",
  },
  {
    id: "other-vision",
    title: "Other vision",
    role: "speculative film",
    sourceLabel: "other-vision.mp4",
    src: `${OPTIMIZED}/other-vision.mp4`,
    poster: `${OPTIMIZED}/posters/other-vision.jpg`,
    original: "/videos/other vision.mp4",
  },
  {
    id: "out-7",
    title: "Field film",
    role: "environment pass",
    sourceLabel: "out-7.mp4",
    src: `${OPTIMIZED}/out-7.mp4`,
    poster: `${OPTIMIZED}/posters/out-7.jpg`,
    original: "/videos/out (7).mp4",
  },
  {
    id: "out-8",
    title: "Light pass",
    role: "environment pass",
    sourceLabel: "out-8.mp4",
    src: `${OPTIMIZED}/out-8.mp4`,
    poster: `${OPTIMIZED}/posters/out-8.jpg`,
    original: "/videos/out (8).mp4",
  },
  {
    id: "danverse-fiilm",
    title: "House film",
    role: "long-form atmosphere",
    sourceLabel: "danverse-fiilm.mp4",
    src: `${OPTIMIZED}/danverse-fiilm.mp4`,
    poster: `${OPTIMIZED}/posters/danverse-fiilm.jpg`,
    original: "/videos/danverse fiilm.mp4",
  },
]
