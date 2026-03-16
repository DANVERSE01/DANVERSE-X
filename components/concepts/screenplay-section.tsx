"use client"
import type React from "react"
import { useEffect, useRef, useState } from "react"
import { fireCTAAndOpenWhatsApp } from "@/lib/n8n"

const LINES = [
  { type:"slug",      text:"FADE IN:" },
  { type:"slug",      text:"INT. THE HOOK -- DIGITAL SPACE -- 0-3s" },
  { type:"action",    text:"The screen holds black. Your brand arrives. Three seconds -- the only window before the brain decides to scroll past. We engineer this moment. We do not guess at it." },
  { type:"character", text:"DANVERSE (V.O.)" },
  { type:"dialogue",  text:"We do not guess at the hook. We engineer it." },
  { type:"direction", text:"CUT TO:" },
  { type:"slug",      text:"INT. THE STORY -- NARRATIVE ARC -- 3-45s" },
  { type:"action",    text:"Problem introduced. Solution revealed. Transformation made real. Every frame earns its place. Nothing is filler. The narrative is the product." },
  { type:"character", text:"DANVERSE (V.O.)" },
  { type:"dialogue",  text:"If it does not serve the conversion, it does not exist." },
  { type:"direction", text:"SMASH CUT TO:" },
  { type:"slug",      text:"INT. THE CALL -- PEAK MOMENT -- 45-60s" },
  { type:"action",    text:"One decision. One action. The CTA lands at peak emotional investment -- written into the story from the brief, not appended in the edit." },
  { type:"character", text:"DANVERSE (V.O.)" },
  { type:"dialogue",  text:"We do not ask for the click. We make it inevitable." },
  { type:"direction", text:"FADE OUT." },
] as const

const SPEEDS: Record<string,number> = {slug:38,action:16,character:28,dialogue:22,direction:40}
const STYLES: Record<string,React.CSSProperties> = {
  slug:      {fontWeight:700,textTransform:"uppercase",letterSpacing:"2px",color:"#fff",fontSize:"12px",marginTop:"20px"},
  action:    {color:"rgba(255,255,255,0.45)",fontSize:"12px",lineHeight:1.8,maxWidth:"58ch"},
  character: {fontWeight:700,textTransform:"uppercase",letterSpacing:"1px",color:"#fff",fontSize:"12px",textAlign:"center",marginTop:"16px"},
  dialogue:  {color:"rgba(255,255,255,0.6)",fontSize:"12px",lineHeight:1.7,padding:"0 15%",fontStyle:"italic"},
  direction: {color:"rgba(255,255,255,0.3)",textAlign:"right",textTransform:"uppercase",letterSpacing:"2px",fontSize:"11px",marginTop:"12px"},
}

export function ScreenplaySection() {
  const secRef = useRef<HTMLElement>(null)
  const outRef = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)
  const [reduce, setReduce] = useState(false)

  useEffect(() => { setReduce(window.matchMedia("(prefers-reduced-motion:reduce)").matches) }, [])

  useEffect(() => {
    const s = secRef.current; if (!s) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) setStarted(true) }, {threshold:0.3})
    obs.observe(s); return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started || !outRef.current) return
    outRef.current.innerHTML = ""
    if (reduce) {
      const frag = document.createDocumentFragment()
      LINES.forEach(l => { const p = document.createElement("p"); p.textContent = l.text; Object.assign(p.style,{fontFamily:"'Courier Prime',monospace",marginBottom:"2px",...STYLES[l.type]}); frag.appendChild(p) })
      outRef.current.appendChild(frag); return
    }
    let li=0,ci=0,cur: HTMLParagraphElement|null=null,t: ReturnType<typeof setTimeout>
    const out = outRef.current
    function nl() {
      if (li>=LINES.length) return
      cur=document.createElement("p"); Object.assign(cur.style,{fontFamily:"'Courier Prime',monospace",marginBottom:"2px",...STYLES[LINES[li].type]}); out.appendChild(cur); tc()
    }
    function tc() {
      const l=LINES[li]
      if (ci<l.text.length) { if(cur) cur.textContent+=l.text[ci]; ci++; t=setTimeout(tc,SPEEDS[l.type]??20) }
      else { ci=0; li++; t=setTimeout(nl,l.type==="direction"?500:120) }
    }
    nl(); return () => clearTimeout(t)
  }, [started, reduce])

  return (
    <section ref={secRef} style={{background:"#060606",borderTop:"1px solid rgba(255,255,255,0.04)",padding:"80px clamp(24px,6vw,80px)"}}>
      <div style={{marginBottom:"48px"}}>
        <p style={{fontFamily:"Courier Prime,monospace",fontSize:"9px",letterSpacing:"6px",textTransform:"uppercase",color:"#e63c2f",marginBottom:"16px"}}>CONCEPT 04 / THE SCRIPT</p>
        <h2 style={{fontFamily:"Bebas Neue,Arial Black,sans-serif",fontSize:"clamp(36px,6vw,64px)",lineHeight:0.88,color:"#fff"}}>
          Every ad is a film.<br/>
          <span style={{color:"#e63c2f"}}>Three acts.</span> One outcome.
        </h2>
      </div>
      <div style={{background:"#000",border:"1px solid rgba(255,255,255,0.06)",padding:"48px clamp(24px,4vw,56px)",maxWidth:"820px",position:"relative"}}>
        <div style={{position:"absolute",top:0,left:0,right:0,height:"3px",background:"#e63c2f"}} />
        <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"32px"}}>
          {["#e63c2f","#fff","#060606"].map(c => <div key={c} style={{width:"10px",height:"10px",borderRadius:"50%",background:c,border:"1px solid rgba(255,255,255,0.15)"}} />)}
          <span style={{fontFamily:"Courier Prime,monospace",fontSize:"10px",letterSpacing:"3px",color:"rgba(255,255,255,0.2)",textTransform:"uppercase",marginLeft:"8px"}}>danverse_screenplay_v1.fountain</span>
        </div>
        <div ref={outRef} />
        <span className="term-cursor" />
      </div>
      <div style={{marginTop:"48px"}}>
        <button onClick={() => fireCTAAndOpenWhatsApp("concept-04-screenplay")} style={{display:"inline-flex",alignItems:"center",gap:"16px",background:"none",border:"none",cursor:"pointer"}}>
          <span style={{fontFamily:"Courier Prime,monospace",fontSize:"11px",letterSpacing:"4px",textTransform:"uppercase",color:"#fff"}}>Start the brief</span>
          <span style={{width:"32px",height:"1px",background:"#e63c2f",transition:"width .5s",display:"block"}} />
        </button>
      </div>
    </section>
  )
}
