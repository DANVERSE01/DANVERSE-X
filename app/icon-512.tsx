import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 512,
  height: 512,
}
export const contentType = 'image/png'

// Image generation
export default function Icon512() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #ef4444 0%, #f97316 50%, #fbbf24 100%)',
          position: 'relative',
        }}
      >
        {/* Background Gradient Orbs */}
        <div
          style={{
            position: 'absolute',
            width: '300px',
            height: '300px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            top: '50px',
            left: '50px',
            filter: 'blur(40px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '250px',
            height: '250px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.2) 0%, transparent 70%)',
            bottom: '80px',
            right: '80px',
            filter: 'blur(30px)',
          }}
        />
        
        {/* Letter D */}
        <div
          style={{
            fontSize: 320,
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0 8px 40px rgba(0,0,0,0.4), 0 4px 20px rgba(0,0,0,0.3)',
            position: 'relative',
            zIndex: 1,
          }}
        >
          D
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
