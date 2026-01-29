"use client"

import { useRef, useState, Suspense } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import * as THREE from "three"

const ACCENT = "#EF4444"

type MediaItem = {
  id: string
  type: "image" | "video"
  src: string
  title?: string
}

type MediaGridProps = {
  items: MediaItem[]
  title?: string
}

function MediaCard({
  item,
  position,
  onClick,
  index,
}: {
  item: MediaItem
  position: [number, number, number]
  onClick: () => void
  index: number
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += (hovered ? 0.01 : 0.0008) * Math.sin(state.clock.elapsedTime * 0.5 + index)
      meshRef.current.scale.set(hovered ? 1.05 : 1, hovered ? 1.05 : 1, hovered ? 1.05 : 1)
    }
  })

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onPointerEnter={() => setHovered(true)}
        onPointerLeave={() => setHovered(false)}
        onClick={onClick}
        castShadow
        receiveShadow
      >
        <planeGeometry args={[2.2, 1.6]} />
        <meshStandardMaterial
          color={hovered ? "#ff6b6b" : "#1a1a1a"}
          emissive={hovered ? "#EF4444" : "#000000"}
          emissiveIntensity={hovered ? 0.6 : 0.15}
          metalness={0.3}
          roughness={0.7}
          wireframe={false}
        />
      </mesh>

      {/* Subtle frame effect */}
      <mesh position={[0, 0, 0.01]}>
        <planeGeometry args={[2.3, 1.7]} />
        <meshStandardMaterial
          color="#0a0a0a"
          emissive={hovered ? "#ff6b6b" : "#000000"}
          emissiveIntensity={hovered ? 0.3 : 0}
          transparent
          opacity={hovered ? 0.8 : 0.3}
        />
      </mesh>

      {/* Edge glow outline */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={5}
            array={
              new Float32Array([
                -1.15, -0.8, 0.02, 1.15, -0.8, 0.02, 1.15, 0.8, 0.02, -1.15, 0.8, 0.02, -1.15, -0.8, 0.02,
              ])
            }
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color={hovered ? "#EF4444" : "#333333"} linewidth={1.5} />
      </lineSegments>
    </group>
  )
}

function GridScene({ items, onItemClick }: { items: MediaItem[]; onItemClick: (item: MediaItem) => void }) {
  const cols = 3
  const rows = Math.ceil(items.length / cols)
  const spacing = 3.2
  const rowSpacing = 2.3

  return (
    <>
      <color attach="background" args={["#0a0a0a"]} />

      {/* Professional three-point lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 8]} intensity={0.7} castShadow />
      <pointLight position={[15, 15, 10]} intensity={0.6} color="#ffffff" />
      <pointLight position={[-15, -10, 5]} intensity={0.4} color={ACCENT} />

      {items.map((item, idx) => {
        const col = idx % cols
        const row = Math.floor(idx / cols)
        const x = (col - (cols - 1) / 2) * spacing
        const y = (rows / 2 - row - 0.5) * rowSpacing
        const z = 0

        return (
          <MediaCard key={item.id} item={item} position={[x, y, z]} onClick={() => onItemClick(item)} index={idx} />
        )
      })}
    </>
  )
}

function LoadingPlaceholder() {
  return (
    <div className="w-full h-[550px] bg-gradient-to-b from-black to-neutral-950 rounded-2xl border border-white/5 flex items-center justify-center">
      <div className="text-center">
        <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-white/10 mb-4">
          <div className="w-8 h-8 rounded-full border-2 border-white/20 border-t-red-500 animate-spin" />
        </div>
        <p className="text-white/60 text-sm">Loading 3D gallery...</p>
      </div>
    </div>
  )
}

export function MediaGrid3D({ items, title }: MediaGridProps) {
  const [selectedItem, setSelectedItem] = useState<MediaItem | null>(null)

  if (items.length === 0) {
    return (
      <div className="w-full text-center py-12 text-white/50">
        <p>No media items to display</p>
      </div>
    )
  }

  return (
    <div className="w-full">
      {title && <h3 className="text-lg font-semibold text-white mb-6">{title}</h3>}

      <div className="w-full bg-gradient-to-b from-black to-neutral-950 rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
        <Suspense fallback={<LoadingPlaceholder />}>
          <div className="w-full h-[550px]">
            <Canvas
              camera={{
                position: [0, 0, 13],
                fov: 45,
              }}
              dpr={[1, 2]}
            >
              <Suspense fallback={null}>
                <GridScene items={items} onItemClick={setSelectedItem} />
              </Suspense>
            </Canvas>
          </div>
        </Suspense>

        {/* Item labels below canvas */}
        <div className="grid grid-cols-3 gap-4 px-6 py-4 bg-black/30 border-t border-white/5">
          {items.slice(0, 3).map((item) => (
            <div key={item.id} className="text-center text-xs text-white/60">
              {item.title || "Media Item"}
            </div>
          ))}
        </div>
      </div>

      {/* Media Modal Preview */}
      {selectedItem && (
        <div
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in"
          onClick={() => setSelectedItem(null)}
        >
          <div
            className="relative max-w-4xl w-full max-h-[85vh] rounded-3xl overflow-hidden bg-black border border-white/10 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setSelectedItem(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 backdrop-blur-sm flex items-center justify-center text-white text-xl transition-colors"
            >
              ✕
            </button>

            <div className="flex flex-col h-full">
              {selectedItem.type === "image" ? (
                <img src={selectedItem.src} alt={selectedItem.title} className="w-full h-full object-contain" />
              ) : (
                <video src={selectedItem.src} controls className="w-full h-full object-contain" autoPlay />
              )}

              {selectedItem.title && (
                <div className="px-6 py-4 bg-black/50 border-t border-white/10">
                  <p className="text-white font-medium text-center">{selectedItem.title}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
