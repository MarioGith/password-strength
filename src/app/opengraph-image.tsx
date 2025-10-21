import { ImageResponse } from 'next/og'

export const runtime = 'edge'

export const alt = 'Password Strength Checker - Level up your password security'
export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: 'linear-gradient(135deg, #f5f5f5 0%, #e5e5e5 100%)',
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '40px',
          }}
        >
          <h1
            style={{
              fontSize: '80px',
              fontWeight: 900,
              color: '#000',
              textAlign: 'center',
              margin: 0,
              lineHeight: 1.2,
            }}
          >
            Power Up Your Passwords
          </h1>
          <p
            style={{
              fontSize: '40px',
              color: '#525252',
              textAlign: 'center',
              margin: 0,
            }}
          >
            Test your password strength and watch your warrior evolve!
          </p>
          <div
            style={{
              display: 'flex',
              gap: '30px',
              marginTop: '20px',
            }}
          >
            <div
              style={{
                background: '#404040',
                color: '#fff',
                padding: '20px 40px',
                borderRadius: '50px',
                fontSize: '32px',
                fontWeight: 700,
              }}
            >
              6 Levels
            </div>
            <div
              style={{
                background: '#404040',
                color: '#fff',
                padding: '20px 40px',
                borderRadius: '50px',
                fontSize: '32px',
                fontWeight: 700,
              }}
            >
              Password Generator
            </div>
            <div
              style={{
                background: '#000',
                color: '#fff',
                padding: '20px 40px',
                borderRadius: '50px',
                fontSize: '32px',
                fontWeight: 700,
              }}
            >
              100% Free
            </div>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  )
}
