export function ProjectorOpen() {
  return (
    <>
      <section style={{height:"100vh",background:"#060606",display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",position:"relative",overflow:"hidden"}}>
        <div style={{position:"absolute",top:0,left:"50%",transform:"translateX(-50%)",width:"1px",background:"rgba(255,255,255,0.04)",height:0,boxShadow:"0 0 60px 30px rgba(255,255,255,0.015)",animation:"beamGrow 1.8s ease-out 0.2s forwards"}} />
        <p style={{fontFamily:"Courier Prime,monospace",fontSize:"9px",letterSpacing:"8px",textTransform:"uppercase",color:"rgba(255,255,255,0)",animation:"fadeIn 0.8s ease 1.4s forwards",marginBottom:"28px",position:"relative",zIndex:1}}>
          danverse.ai · creative concepts · 2026
        </p>
        <h1 style={{fontFamily:"Bebas Neue,Arial Black,sans-serif",fontSize:"clamp(64px,14vw,160px)",lineHeight:0.85,letterSpacing:"4px",textAlign:"center",opacity:0,position:"relative",zIndex:1,animation:"projFlare 1.4s ease 1.8s forwards",color:"#fff"}}>
          WE BUILD<br/>
          <span style={{color:"#e63c2f"}}>CINEMA.</span><br/>
          NOT ADS.
        </h1>
        <p style={{fontFamily:"Courier Prime,monospace",fontSize:"9px",letterSpacing:"5px",textTransform:"uppercase",color:"rgba(255,255,255,0)",animation:"fadeIn 0.8s ease 3s forwards",marginTop:"24px",position:"relative",zIndex:1}}>
          The craft behind every conversion
        </p>
        <div style={{position:"absolute",bottom:"32px",display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",color:"rgba(255,255,255,0)",animation:"fadeIn 0.8s ease 3.4s forwards"}}>
          <span style={{fontSize:"8px",letterSpacing:"5px",textTransform:"uppercase",fontFamily:"Courier Prime,monospace"}}>scroll to enter</span>
          <div style={{width:"1px",height:"32px",background:"rgba(255,255,255,0.15)",animation:"tickPulse 2s ease-in-out 3.6s infinite"}} />
        </div>
      </section>
    </>
  )
}
