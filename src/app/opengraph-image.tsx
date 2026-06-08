import { ImageResponse } from 'next/server';

export const runtime = 'edge';
export const alt = 'Nikulkumar Goyani | Software Test Engineer & V&V Expert';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#0a0a1a',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '60px 72px',
          fontFamily: 'sans-serif',
          position: 'relative',
        }}
      >
        {/* Top glow */}
        <div
          style={{
            position: 'absolute',
            top: '-100px',
            right: '-100px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(109,40,217,0.25) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Bottom glow */}
        <div
          style={{
            position: 'absolute',
            bottom: '-80px',
            left: '-80px',
            width: '400px',
            height: '400px',
            borderRadius: '50%',
            background: 'radial-gradient(circle, rgba(139,92,246,0.15) 0%, transparent 70%)',
            display: 'flex',
          }}
        />

        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ fontSize: '32px', fontWeight: 900, color: 'white' }}>N</span>
          <span style={{ fontSize: '32px', fontWeight: 900, color: '#a78bfa' }}>.</span>
        </div>

        {/* Center content */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Badge */}
          <div
            style={{
              display: 'flex',
              width: 'fit-content',
              background: 'rgba(139,92,246,0.15)',
              border: '1px solid rgba(139,92,246,0.3)',
              borderRadius: '100px',
              padding: '6px 18px',
            }}
          >
            <span style={{ color: '#a78bfa', fontSize: '13px', letterSpacing: '3px', textTransform: 'uppercase' }}>
              V&amp;V Expert · Software Test Engineer
            </span>
          </div>

          {/* Name */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <span style={{ fontSize: '64px', fontWeight: 900, color: 'white', lineHeight: 1.1 }}>
              Nikulkumar Goyani
            </span>
          </div>

          {/* Subtitle */}
          <span style={{ fontSize: '22px', color: 'rgba(255,255,255,0.45)', fontWeight: 400, maxWidth: '700px' }}>
            Senior Software Test Engineer with 6+ years of experience in quality engineering,
            test automation &amp; V&amp;V in regulated environments.
          </span>
        </div>

        {/* Bottom row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', gap: '24px' }}>
            {['ISTQB CTFL 4.0', 'Test Automation', 'Straumann Group'].map((tag) => (
              <div
                key={tag}
                style={{
                  display: 'flex',
                  background: 'rgba(255,255,255,0.05)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '8px',
                  padding: '8px 16px',
                }}
              >
                <span style={{ color: 'rgba(255,255,255,0.4)', fontSize: '13px' }}>{tag}</span>
              </div>
            ))}
          </div>
          <span style={{ color: 'rgba(255,255,255,0.2)', fontSize: '14px' }}>Chemnitz, Germany</span>
        </div>
      </div>
    ),
    { ...size }
  );
}