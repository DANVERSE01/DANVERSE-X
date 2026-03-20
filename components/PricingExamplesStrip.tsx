"use client"

import React, { useRef, useEffect, useState, useCallback } from "react"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

const VIDEOS = [
  { id:"1174583531", cat:"FILM",     label:"01", title:"Cinematic Open",  ratio:"21/9",  fmt:"21:9 · ULTRAWIDE",  delay:0   },
  { id:"1174570414", cat:"SOCIAL",   label:"02", title:"Vertical Story",  ratio:"9/16",  fmt:"9:16 · PORTRAIT",   delay:40  },
  { id:"1174570425", cat:"SAAS",     label:"03", title:"Tech Reveal",     ratio:"16/9",  fmt:"16:9 · WIDESCREEN", delay:80  },
  { id:"1174570410", cat:"FILM",     label:"04", title:"Wide Format",     ratio:"21/9",  fmt:"21:9 · CINEMATIC",  delay:120 },
  { id:"1164910761", cat:"BRAND",    label:"05", title:"Brand Story",     ratio:"9/16",  fmt:"9:16 · PORTRAIT",   delay:160 },
  { id:"1164910689", cat:"B2B",      label:"06", title:"Corporate Film",  ratio:"16/9",  fmt:"16:9 · WIDESCREEN", delay:200 },
  { id:"1164910758", cat:"SOCIAL",   label:"07", title:"Story Campaign",  ratio:"9/16",  fmt:"9:16 · PORTRAIT",   delay:240 },
  { id:"1164910681", cat:"PRODUCT",  label:"08", title:"Product Macro",   ratio:"1/1",   fmt:"1:1 · SQUARE",      delay:280 },
  { id:"1164910756", cat:"FILM",     label:"09", title:"Epic Wide",       ratio:"21/9",  fmt:"21:9 · ULTRAWIDE",  delay:320 },
  { id:"1164910690", cat:"AD",       label:"10", title:"Social Ad",       ratio:"9/16",  fmt:"9:16 · PORTRAIT",   delay:360 },
  { id:"1164910687", cat:"IDENTITY", label:"11", title:"Brand Identity",  ratio:"16/9",  fmt:"16:9 · WIDESCREEN", delay:400 },
]

const TICKER_WORDS = VIDEOS.map(v => v.title).concat(["DANVERSE · 2026"])

function ReelTile({ item }: { item: typeof VIDEOS[0] }) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  const widthMap: Record<string, string> = { "21/9":"calc(200px * 21 / 9)", "9/16":"calc(200px * 9 / 16)", "16/9":"calc(200px * 16 / 9)", "1/1":"200px" }
  const titleSizeMap: Record<string, string> = { "21/9":"22px", "16/9":"16px", "9/16":"13px", "1/1":"16px" }
  return (
    <div ref={ref} style={{ flexShrink:0, width:widthMap[item.ratio]??"200px", height:"200px", position:"relative", overflow:"hidden", background:"#0a0a0a", cursor:"pointer", opacity:visible?1:0, transform:visible?"translateY(0)":"translateY(8px)", transition:`opacity 0.6s ease ${item.delay*0.5}ms, transform 0.6s ease ${item.delay*0.5}ms` }} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      <div style={{ position:"absolute", inset:0, filter:hovered?"brightness(1) saturate(1.3) grayscale(0)":"brightness(0.5) grayscale(0.35) saturate(0.7)", transform:hovered?"scale(1.05)":"scale(1)", transition:"all 0.9s cubic-bezier(0.16,1,0.3,1)", background:`linear-gradient(135deg, hsl(${VIDEOS.indexOf(item)*33}, 60%, 8%), #000)` }} />
      {visible && <iframe src={`https://player.vimeo.com/video/${item.id}?autoplay=1&muted=1&loop=1&background=1&autopause=0&quality=auto`} style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none", pointerEvents:"none", filter:hovered?"brightness(1) saturate(1.3) grayscale(0)":"brightness(0.5) grayscale(0.35) saturate(0.7)", transform:hovered?"scale(1.05)":"scale(1)", transition:"all 0.9s cubic-bezier(0.16,1,0.3,1)" }} allow="autoplay; fullscreen" />}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.95) 0%,rgba(0,0,0,0.05) 100%)" }} />
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"1.5px", background:hovered?"#e63c2f":"rgba(230,60,47,0.09)", boxShadow:hovered?"0 0 16px rgba(230,60,47,0.5)":"none", transition:"all 0.35s" }} />
      <div style={{ position:"absolute", top:10, left:10, fontFamily:"'Courier Prime',monospace", fontSize:"7px", letterSpacing:"0.35em", color:hovered?"#e63c2f":"rgba(255,255,255,0.18)", textTransform:"uppercase", transition:"color 0.35s" }}>{item.cat} · {item.label}</div>
      <div style={{ position:"absolute", bottom:10, left:10, right:10, fontFamily:"'Bebas Neue',sans-serif", fontSize:titleSizeMap[item.ratio]??"16px", letterSpacing:"0.04em", color:"#fff", opacity:hovered?1:0.75, transform:hovered?"translateY(0)":"translateY(4px)", transition:"all 0.55s cubic-bezier(0.16,1,0.3,1)" }}>{item.title}</div>
      <div style={{ position:"absolute", bottom:10, right:10, fontFamily:"'Courier Prime',monospace", fontSize:"7px", color:"rgba(255,255,255,0.25)", letterSpacing:"0.2em" }}>{item.ratio.replace("/","∶")}</div>
    </div>
  )
}

function SplitTile({ item, onHover, onLeave }: { item: typeof VIDEOS[0]; onHover: (v: typeof VIDEOS[0]) => void; onLeave: () => void }) {
  const [visible, setVisible] = useState(false)
  const [hovered, setHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.05 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ position:"relative", aspectRatio:"1/1", overflow:"hidden", background:"#000", cursor:"pointer", opacity:visible?1:0, transition:`opacity 0.5s ease ${item.delay*0.4}ms` }} onMouseEnter={()=>{ setHovered(true); onHover(item) }} onMouseLeave={()=>{ setHovered(false); onLeave() }}>
      <div style={{ position:"absolute", inset:0, filter:hovered?"brightness(0.85) saturate(1.2)":"brightness(0.45) grayscale(0.3)", transform:hovered?"scale(1.06)":"scale(1)", transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)", background:`linear-gradient(135deg, hsl(${VIDEOS.indexOf(item)*33}, 60%, 8%), #000)` }} />
      {visible && <iframe src={`https://player.vimeo.com/video/${item.id}?autoplay=1&muted=1&loop=1&background=1&autopause=0&quality=auto`} style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none", pointerEvents:"none", filter:hovered?"brightness(0.85) saturate(1.2)":"brightness(0.45) grayscale(0.3)", transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)" }} allow="autoplay; fullscreen" />}
      <div style={{ position:"absolute", inset:0, background:"linear-gradient(to top,rgba(0,0,0,0.92) 0%,transparent 55%)" }} />
      <div style={{ position:"absolute", top:0, left:0, right:0, height:"1px", background:hovered?"#e63c2f":"rgba(230,60,47,0.07)", transition:"background 0.3s" }} />
      <div style={{ position:"absolute", top:7, left:7, fontFamily:"'Courier Prime',monospace", fontSize:"6px", letterSpacing:"0.3em", color:"rgba(255,255,255,0.18)", textTransform:"uppercase" }}>{item.cat}</div>
      <div style={{ position:"absolute", bottom:4, right:6, fontFamily:"'Bebas Neue',sans-serif", fontSize:"44px", color:hovered?"rgba(230,60,47,0.2)":"rgba(255,255,255,0.03)", lineHeight:1, transition:"color 0.35s" }}>{item.label}</div>
      <div style={{ position:"absolute", bottom:7, left:7, fontFamily:"'Bebas Neue',sans-serif", fontSize:"12px", color:"#fff", letterSpacing:"0.04em" }}>{item.title}</div>
    </div>
  )
}

function SlateRow({ item, idx }: { item: typeof VIDEOS[0]; idx: number }) {
  const [hovered, setHovered] = useState(false)
  const [visible, setVisible] = useState(false)
  const [showVideo, setShowVideo] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVisible(true); obs.disconnect() } }, { threshold: 0.1 })
    if (ref.current) obs.observe(ref.current)
    return () => obs.disconnect()
  }, [])
  useEffect(() => {
    if (hovered) { const t = setTimeout(() => setShowVideo(true), 200); return () => clearTimeout(t) }
    else setShowVideo(false)
  }, [hovered])
  return (
    <div ref={ref} style={{ display:"grid", gridTemplateColumns:"64px 1fr 160px", alignItems:"center", borderBottom:"1px solid rgba(255,255,255,0.04)", cursor:"pointer", position:"relative", overflow:"hidden", background:hovered?"rgba(255,255,255,0.018)":"transparent", opacity:visible?1:0, transform:visible?"translateX(0)":"translateX(-16px)", transitionProperty:"background,opacity,transform", transitionDuration:"0.4s,0.5s,0.5s", transitionDelay:`0s,${idx*40}ms,${idx*40}ms` }} onMouseEnter={()=>setHovered(true)} onMouseLeave={()=>setHovered(false)}>
      <div style={{ position:"absolute", bottom:0, left:0, right:hovered?0:"100%", height:"1px", background:"#e63c2f", transition:"right 0.65s cubic-bezier(0.16,1,0.3,1)", zIndex:1 }} />
      <div style={{ padding:"0 0 0 28px", fontFamily:"'Courier Prime',monospace", fontSize:"10px", letterSpacing:"0.2em", color:hovered?"#e63c2f":"rgba(255,255,255,0.14)", transition:"color 0.3s" }}>{item.label}</div>
      <div style={{ padding:"18px 20px" }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(28px,3.5vw,48px)", letterSpacing:hovered?"0.07em":"0.03em", color:"#fff", lineHeight:0.92, transition:"letter-spacing 0.55s cubic-bezier(0.16,1,0.3,1)" }}>{item.title}</div>
        <div style={{ fontFamily:"'Courier Prime',monospace", fontSize:"8px", letterSpacing:"0.35em", color:hovered?"rgba(230,60,47,0.65)":"rgba(255,255,255,0.18)", textTransform:"uppercase", marginTop:3, transition:"color 0.3s" }}>{item.cat} · {item.fmt}</div>
      </div>
      <div style={{ display:"flex", alignItems:"center", justifyContent:"flex-end", gap:12, padding:"0 20px", borderLeft:"1px solid rgba(255,255,255,0.04)", height:"100%" }}>
        <div style={{ width:hovered?"86px":0, height:"48px", overflow:"hidden", borderRadius:3, transition:"width 0.6s cubic-bezier(0.16,1,0.3,1)", flexShrink:0 }}>
          <div style={{ width:"86px", height:"48px", position:"relative", borderRadius:3, overflow:"hidden" }}>
            <div style={{ position:"absolute", inset:0, background:`linear-gradient(135deg, hsl(${VIDEOS.indexOf(item)*33}, 60%, 8%), #000)` }} />
            {showVideo && <iframe src={`https://player.vimeo.com/video/${item.id}?autoplay=1&muted=1&loop=1&background=1&autopause=0&quality=auto`} style={{ position:"absolute", inset:0, width:"100%", height:"100%", border:"none", pointerEvents:"none" }} allow="autoplay; fullscreen" />}
          </div>
        </div>
        <div style={{ fontFamily:"'Courier Prime',monospace", fontSize:"8px", letterSpacing:"0.25em", color:"rgba(255,255,255,0.1)", whiteSpace:"nowrap", opacity:hovered?1:0, transition:"opacity 0.35s 0.05s" }}>{item.ratio.replace("/","∶")}</div>
      </div>
    </div>
  )
}

export function PricingExamplesStrip() {
  const reelRef = useRef<HTMLDivElement>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [activeVideo, setActiveVideo] = useState<typeof VIDEOS[0] | null>(null)
  const [headerIn, setHeaderIn] = useState(false)
  const headerRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) setHeaderIn(true) }, { threshold: 0.2 })
    if (headerRef.current) obs.observe(headerRef.current)
    return () => obs.disconnect()
  }, [])
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (!reelRef.current) return
    setIsDragging(true); setStartX(e.pageX - reelRef.current.offsetLeft); setScrollLeft(reelRef.current.scrollLeft)
  }, [])
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isDragging || !reelRef.current) return
    e.preventDefault()
    const x = e.pageX - reelRef.current.offsetLeft
    reelRef.current.scrollLeft = scrollLeft - (x - startX) * 1.5
  }, [isDragging, startX, scrollLeft])
  const stopDrag = useCallback(() => setIsDragging(false), [])
  const tickerWords = [...TICKER_WORDS, ...TICKER_WORDS]
  return (
    <div style={{ background:"#000", color:"#fff", overflow:"hidden" }}>
      <div style={{ background:"#e63c2f", padding:"8px 0", overflow:"hidden", whiteSpace:"nowrap" }}>
        <div style={{ display:"inline-flex", animation:"danverse-tick 22s linear infinite" }}>
          {tickerWords.map((w, i) => <span key={i} style={{ fontFamily:"'Courier Prime',monospace", fontSize:"10px", letterSpacing:"0.4em", color:"#fff", padding:"0 28px", borderRight:"1px solid rgba(255,255,255,0.25)", textTransform:"uppercase" }}>{w}</span>)}
        </div>
      </div>
      <style>{`@keyframes danverse-tick { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }`}</style>
      <div ref={headerRef} style={{ padding:"56px 32px 0", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", top:-30, right:-16, fontFamily:"'Bebas Neue',sans-serif", fontSize:"280px", lineHeight:1, color:"rgba(255,255,255,0.022)", letterSpacing:"-0.03em", pointerEvents:"none", userSelect:"none" }}>11</div>
        <div style={{ display:"flex", alignItems:"center", gap:12, marginBottom:20, opacity:headerIn?1:0, transform:headerIn?"translateY(0)":"translateY(20px)", transition:"all 0.8s cubic-bezier(0.16,1,0.3,1)" }}>
          <div style={{ width:36, height:"1.5px", background:"#e63c2f" }} />
          <div style={{ fontFamily:"'Courier Prime',monospace", fontSize:"9px", letterSpacing:"0.55em", color:"#e63c2f", textTransform:"uppercase" }}>Cinematic Showcase</div>
        </div>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(80px,12vw,140px)", lineHeight:0.8, letterSpacing:"-0.01em", color:"#fff", opacity:headerIn?1:0, transform:headerIn?"translateY(0)":"translateY(40px)", transition:"all 1s cubic-bezier(0.16,1,0.3,1) 0.1s" }}>Production</div>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:"clamp(80px,12vw,140px)", lineHeight:0.8, letterSpacing:"-0.01em", background:"linear-gradient(90deg,#e63c2f 0%,#ff6030 60%,#e63c2f 100%)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", opacity:headerIn?1:0, transform:headerIn?"translateY(0)":"translateY(40px)", transition:"all 1s cubic-bezier(0.16,1,0.3,1) 0.15s" }}>2024–2026</div>
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"flex-end", padding:"24px 0 0", marginTop:20, borderTop:"1px solid rgba(255,255,255,0.06)", opacity:headerIn?1:0, transition:"opacity 0.9s ease 0.3s" }}>
          <div style={{ fontFamily:"'Barlow Condensed',sans-serif", fontSize:12, fontWeight:300, color:"rgba(255,255,255,0.28)", letterSpacing:"0.1em", textTransform:"uppercase", lineHeight:1.9, maxWidth:340 }}>A curated collection of high-fidelity visual systems.<br />Engineered for brands that demand<br />global impact and cinematic excellence.</div>
          <div style={{ textAlign:"right" }}>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:52, color:"rgba(230,60,47,0.15)", lineHeight:1 }}>11</div>
            <div style={{ fontFamily:"'Courier Prime',monospace", fontSize:8, color:"rgba(255,255,255,0.15)", letterSpacing:"0.3em", textTransform:"uppercase" }}>Works · Danverse</div>
          </div>
        </div>
      </div>
      <div style={{ marginTop:2 }}>
        <div style={{ padding:"14px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", borderTop:"1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontFamily:"'Courier Prime',monospace", fontSize:8, letterSpacing:"0.45em", color:"rgba(255,255,255,0.18)", textTransform:"uppercase" }}>— Film Reel · Drag to explore</div>
          <div style={{ fontFamily:"'Courier Prime',monospace", fontSize:8, letterSpacing:"0.3em", color:"rgba(255,255,255,0.1)", textTransform:"uppercase" }}>21:9 · 9:16 · 16:9 · 1:1</div>
        </div>
        <div style={{ height:18, background:"#0d0d0d", display:"flex", alignItems:"center", padding:"0 12px", gap:14, overflow:"hidden", borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          {Array.from({length:24}).map((_,i) => <div key={i} style={{ width:11, height:7, borderRadius:2, background:"#000", border:"1px solid rgba(255,255,255,0.07)", flexShrink:0 }} />)}
        </div>
        <div ref={reelRef} style={{ display:"flex", gap:2, overflowX:"auto", scrollbarWidth:"none", cursor:isDragging?"grabbing":"grab", userSelect:"none" }} onMouseDown={onMouseDown} onMouseMove={onMouseMove} onMouseUp={stopDrag} onMouseLeave={stopDrag}>
          {VIDEOS.map(v => <ReelTile key={v.id} item={v} />)}
        </div>
        <div style={{ height:18, background:"#0d0d0d", display:"flex", alignItems:"center", padding:"0 12px", gap:14, overflow:"hidden", borderTop:"1px solid rgba(255,255,255,0.05)", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          {Array.from({length:24}).map((_,i) => <div key={i} style={{ width:11, height:7, borderRadius:2, background:"#000", border:"1px solid rgba(255,255,255,0.07)", flexShrink:0 }} />)}
        </div>
      </div>
      <div style={{ display:"grid", gridTemplateColumns:"280px 1fr", gap:0, borderTop:"2px solid rgba(255,255,255,0.04)", marginTop:2 }}>
        <div style={{ padding:"32px 28px", borderRight:"1px solid rgba(255,255,255,0.06)", display:"flex", flexDirection:"column", justifyContent:"space-between", background:"rgba(255,255,255,0.012)" }}>
          <div>
            <div style={{ fontFamily:"'Courier Prime',monospace", fontSize:8, letterSpacing:"0.45em", color:"rgba(255,255,255,0.2)", textTransform:"uppercase", marginBottom:20 }}>— Browse Works</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:120, color:"rgba(255,255,255,0.03)", lineHeight:0.85, marginBottom:-14 }}>11</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:40, color:"#fff", lineHeight:0.88 }}>Production</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:40, background:"linear-gradient(90deg,#e63c2f,#ff6030)", WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent", lineHeight:0.88, marginBottom:24 }}>2024–2026</div>
          </div>
          <div style={{ borderTop:"1px solid rgba(255,255,255,0.07)", paddingTop:16 }}>
            <div style={{ fontFamily:"'Courier Prime',monospace", fontSize:8, letterSpacing:"0.3em", color:"#e63c2f", marginBottom:6 }}>{activeVideo?`WORK ${activeVideo.label}`:"HOVER ANY WORK"}</div>
            <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:28, color:"#fff", lineHeight:0.95, transition:"all 0.4s" }}>{activeVideo?activeVideo.title:"— — —"}</div>
            <div style={{ fontFamily:"'Courier Prime',monospace", fontSize:7, letterSpacing:"0.35em", color:"rgba(255,255,255,0.2)", textTransform:"uppercase", marginTop:4, transition:"all 0.4s" }}>{activeVideo?`${activeVideo.cat} · ${activeVideo.label}`:"CINEMATIC SHOWCASE"}</div>
            <div style={{ fontFamily:"'Courier Prime',monospace", fontSize:7, letterSpacing:"0.2em", color:"rgba(230,60,47,0.5)", marginTop:2 }}>{activeVideo?activeVideo.fmt:"11 WORKS · DANVERSE"}</div>
          </div>
        </div>
        <div style={{ display:"grid", gridTemplateColumns:"repeat(4,1fr)", gap:2, background:"#111", alignContent:"start" }}>
          {VIDEOS.map(v => <SplitTile key={v.id} item={v} onHover={setActiveVideo} onLeave={()=>setActiveVideo(null)} />)}
        </div>
      </div>
      <div style={{ borderTop:"2px solid rgba(255,255,255,0.04)", marginTop:2 }}>
        <div style={{ padding:"20px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", borderBottom:"1px solid rgba(255,255,255,0.05)" }}>
          <div style={{ fontFamily:"'Courier Prime',monospace", fontSize:8, letterSpacing:"0.45em", color:"rgba(255,255,255,0.18)", textTransform:"uppercase" }}>— Director&apos;s Slate · Full Index</div>
          <div style={{ fontFamily:"'Courier Prime',monospace", fontSize:8, letterSpacing:"0.3em", color:"rgba(255,255,255,0.1)", textTransform:"uppercase" }}>11 Works · 2024–2026</div>
        </div>
        {VIDEOS.map((v,i) => <SlateRow key={v.id} item={v} idx={i} />)}
      </div>
      <div style={{ padding:"44px 32px", display:"flex", alignItems:"center", justifyContent:"space-between", borderTop:"1px solid rgba(255,255,255,0.06)" }}>
        <div style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:52, color:"rgba(255,255,255,0.04)", letterSpacing:"-0.01em" }}>DANVERSE</div>
        <div>
          <button type="button" onClick={()=>fireCTAAndOpenWhatsApp("showreel-cta")} style={{ fontFamily:"'Bebas Neue',sans-serif", fontSize:15, letterSpacing:"0.4em", color:"#fff", background:"transparent", border:"1px solid rgba(230,60,47,0.45)", padding:"14px 44px", cursor:"pointer", textTransform:"uppercase", display:"block", marginBottom:8, transition:"all 0.45s" }} onMouseEnter={e=>{(e.currentTarget as HTMLButtonElement).style.background="#e63c2f";(e.currentTarget as HTMLButtonElement).style.borderColor="#e63c2f";(e.currentTarget as HTMLButtonElement).style.boxShadow="0 0 50px rgba(230,60,47,0.35)"}} onMouseLeave={e=>{(e.currentTarget as HTMLButtonElement).style.background="transparent";(e.currentTarget as HTMLButtonElement).style.borderColor="rgba(230,60,47,0.45)";(e.currentTarget as HTMLButtonElement).style.boxShadow="none"}}>INITIALIZE PROJECT</button>
          <div style={{ fontFamily:"'Courier Prime',monospace", fontSize:8, letterSpacing:"0.3em", color:"rgba(255,255,255,0.15)", textAlign:"center", textTransform:"uppercase" }}>One conversation. Direction locked. Work starts within 48h.</div>
        </div>
        <div style={{ fontFamily:"'Courier Prime',monospace", fontSize:8, color:"rgba(255,255,255,0.12)", letterSpacing:"0.25em", textAlign:"right", lineHeight:2, textTransform:"uppercase" }}>ENGINEERING<br />CINEMATIC EXCELLENCE<br />SINCE 2024</div>
      </div>
    </div>
  )
}
