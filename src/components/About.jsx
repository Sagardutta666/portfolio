import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data';
import { RefreshCcw } from 'lucide-react';

const StatBar = ({ label, percent, value }) => (
  <div style={{ marginBottom: '1rem' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
      <span className="mono" style={{ fontSize: 9, color: 'rgba(0,123,255,0.7)', letterSpacing: 1, fontWeight: 700 }}>{label}</span>
      <span className="mono" style={{ fontSize: 9, color: 'var(--text-main)', fontWeight: 700 }}>{value}</span>
    </div>
    <div style={{ height: 2, background: 'rgba(0,123,255,0.05)', position: 'relative' }}>
      <motion.div
        style={{ position: 'absolute', left: 0, top: 0, height: '100%', background: 'var(--primary)' }}
        initial={{ width: 0 }}
        whileInView={{ width: `${percent}%` }}
        transition={{ duration: 1, delay: 0.5 }}
      />
    </div>
  </div>
);

const About = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [phase, setPhase] = useState(false);
  const scanTimeout = useRef(null);

  const triggerScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    scanTimeout.current = setTimeout(() => {
      setIsScanning(false);
      setPhase(p => !p);
    }, 2000);
  };

  return (
    <section id="about">
      <div className="container">
        <div className="about-grid">

          {/* LEFT: Image Frame */}
          <motion.div
            className="image-frame-wrap"
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="hologram-bg mono">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i}>SYSTEM_ARCHITECTURE_DATA_STREAM_v0x{i.toString(16).toUpperCase()}</div>
              ))}
            </div>

            <div className="main-frame white-surface">
              <div className="frame-grid" />
              <img
                src={phase ? '/images/Ghibli.png' : '/images/original.JPG'}
                alt="Sagar Dutta"
                className="profile-img"
              />
              {isScanning && (
                <motion.div
                  className="scan-beam"
                  initial={{ top: '-5%' }}
                  animate={{ top: '105%' }}
                  transition={{ duration: 2, ease: 'linear' }}
                />
              )}
              <span className="frame-label fl-tl mono">ARCH_ID: 0x9B // NEURAL</span>
              <span className="frame-label fl-tr mono">LOAD: STABLE</span>
              <span className="frame-label fl-bl mono">LATENCY: 0.04ms</span>
              <span className="frame-label fl-br mono">SIG_STRENGTH: MAX</span>
              <button className="scan-btn mono" onClick={triggerScan}>
                {isScanning ? 'SCANNING...' : 'Click me!'}&nbsp;
                <RefreshCcw size={10} style={{ animation: isScanning ? 'spin 2s linear infinite' : 'none' }} />
              </button>
            </div>

            <div className="tac tl" /><div className="tac tr" />
            <div className="tac bl" /><div className="tac br" />
          </motion.div>

          {/* RIGHT: Text */}
          <div className="about-text">
            <div className="dossier-tags">
              <span className="d-tag mono">SYS_DOC</span>
              <span className="d-tag mono">VER_2.4</span>
            </div>

            <p className="mono sec-label">01 // PHILOSOPHY</p>

            <motion.h2
              className="bio-title"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {resumeData.bioTitle.toUpperCase()}
            </motion.h2>

            <motion.p
              className="bio-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              {resumeData.bioFull}
            </motion.p>

            <div style={{ marginTop: '2.5rem' }}>
              <StatBar label="COFFEE_INTAKE" percent={98} value="98%" />
              <StatBar label="LOGIC_EFFICIENCY" percent={100} value="MAX" />
              <StatBar label="STREAK_ACTIVE" percent={85} value="365d+" />
            </div>

            <div className="signature">
              <div className="sig-line" />
              <span className="mono sig-text">SECURE_ROOT_ACCESS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
