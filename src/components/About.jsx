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
  const [phase, setPhase] = useState(false); // false = Ghibli, true = real
  const [showResult, setShowResult] = useState(false);

  const triggerScan = () => {
    if (isScanning) return;
    setIsScanning(true);
    setShowResult(true);

    // After 2 seconds (matching scanner duration), finalize the transition
    setTimeout(() => {
      setIsScanning(false);
      setPhase(p => !p);
      setShowResult(false);
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
            viewport={{ once: false, amount: 0.3 }}
          >
            <div className="hologram-bg mono">
              {Array.from({ length: 10 }).map((_, i) => (
                <div key={i}>SYSTEM_ARCHITECTURE_DATA_STREAM_v0x{i.toString(16).toUpperCase()}</div>
              ))}
            </div>

            <div className="main-frame white-surface">
              <div className="frame-grid" />

              {/* Base Image (Initial is Ghibli now) */}
              <img
                src={phase ? '/images/original.JPG' : '/images/Ghibli.png'}
                alt="Sagar Dutta"
                className="profile-img"
              />

              {/* Revealed Image (Original photo revealed) */}
              {showResult && (
                <motion.img
                  src={phase ? '/images/Ghibli.png' : '/images/original.JPG'}
                  alt="Sagar Dutta Transformation"
                  className="profile-img"
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    zIndex: 2,
                    objectFit: 'cover'
                  }}
                  initial={{ clipPath: 'inset(0% 0% 100% 0%)' }}
                  animate={{ clipPath: isScanning ? 'inset(0% 0% 0% 0%)' : 'inset(0% 0% 100% 0%)' }}
                  transition={{ duration: 2, ease: 'linear' }}
                />
              )}

              {isScanning && (
                <motion.div
                  className="scan-beam"
                  initial={{ top: '-2%' }}
                  animate={{ top: '100%' }}
                  transition={{ duration: 2, ease: 'linear' }}
                  style={{ zIndex: 10 }}
                />
              )}

              <span className="frame-label fl-tl mono">ARCH_ID: 0x9B // NEURAL</span>
              <span className="frame-label fl-tr mono">LOAD: STABLE</span>
              <span className="frame-label fl-bl mono">LATENCY: 0.04ms</span>
              <span className="frame-label fl-br mono">SIG_STRENGTH: MAX</span>
              <button className="scan-btn mono" onClick={triggerScan}>
                {isScanning ? 'RECONSTRUCT_DATA...' : 'CLICK ME! [ENHANCE]'}&nbsp;
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
              viewport={{ once: false, amount: 0.3 }}
            >
              {resumeData.bioTitle.toUpperCase()}
            </motion.h2>

            <motion.p
              className="bio-text"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
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
