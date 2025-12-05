import { ImageResponse } from 'next/og'

// Image metadata
export const size = {
  width: 192,
  height: 192,
}
export const contentType = 'image/png'

// Image generation
export default function Icon192() {
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
        {/* Glassmorphic Background Effect */}
        <div
          style={{
            position: 'absolute',
            width: '120px',
            height: '120px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(255,255,255,0.3) 0%, transparent 70%)',
            top: '20px',
            left: '20px',
            filter: 'blur(20px)',
          }}
        />
        
        {/* Letter D */}
        <div
          style={{
            fontSize: 120,
            fontWeight: 'bold',
            color: 'white',
            textShadow: '0 4px 20px rgba(0,0,0,0.3)',
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
