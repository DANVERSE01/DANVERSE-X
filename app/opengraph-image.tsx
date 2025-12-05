import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'DANVERSE | AI-Powered Creative Studio'
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = 'image/png'

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'linear-gradient(135deg, #0a0a0f 0%, #1a0a0f 100%)',
          position: 'relative',
        }}
      >
        {/* Background Gradient Orbs */}
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #ef4444 0%, transparent 70%)',
            opacity: 0.3,
            top: '-200px',
            left: '-200px',
            filter: 'blur(100px)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            width: '600px',
            height: '600px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, #f97316 0%, transparent 70%)',
            opacity: 0.3,
            bottom: '-200px',
            right: '-200px',
            filter: 'blur(100px)',
          }}
        />

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* Logo Letter */}
          <div
            style={{
              fontSize: 180,
              fontWeight: 'bold',
              background: 'linear-gradient(135deg, #ef4444 0%, #f97316 50%, #fbbf24 100%)',
              backgroundClip: 'text',
              color: 'transparent',
              marginBottom: '20px',
            }}
          >
            D
          </div>

          {/* Title */}
          <div
            style={{
              fontSize: 72,
              fontWeight: 'bold',
              color: 'white',
              textAlign: 'center',
              marginBottom: '20px',
            }}
          >
            DANVERSE
          </div>

          {/* Subtitle */}
          <div
            style={{
              fontSize: 32,
              color: '#f97316',
              textAlign: 'center',
              fontWeight: '600',
            }}
          >
            AI-Powered Creative Studio
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
