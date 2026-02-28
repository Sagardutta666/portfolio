const ScreenOverlay = () => {
  const decals = [
    { style: { top: 20, left: 20 }, text: 'REC // 00:00:01' },
    { style: { top: 20, right: 20 }, text: 'AUTH_LVL_4' },
    { style: { bottom: 20, left: 20 }, text: 'LOC: 37.7749N 122.4194W' },
    { style: { bottom: 20, right: 20 }, text: 'BUFF_SIZE: 1024KB' },
  ];

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {/* Subtle scanlines */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(0,0,0,0) 50%, rgba(0,0,0,0.015) 50%)',
        backgroundSize: '100% 4px',
      }} />

      {/* Corner Decals */}
      {decals.map((d, i) => (
        <div key={i} className="mono" style={{
          position: 'absolute',
          ...d.style,
          fontSize: 8, fontWeight: 700,
          color: 'var(--primary)',
          opacity: 0.15,
          letterSpacing: 1,
        }}>
          {d.text}
        </div>
      ))}
    </div>
  );
};

export default ScreenOverlay;
