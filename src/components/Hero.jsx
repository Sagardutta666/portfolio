import { motion } from 'framer-motion';
import { resumeData } from '../data';
import { ChevronRight } from 'lucide-react';
import { Player } from '@lottiefiles/react-lottie-player';

const Hero = () => {
  const bootLines = [
    "SYSTEM_INIT: SUCCESS",
    "CORP_IDENTITY_V4: LOADED",
    "NETWORK_STATUS: ENCRYPTED",
  ];

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="hero" style={{ minHeight: '100vh', padding: 0 }}>
      <div className="hero-grid-bg" />

      <div className="container hero-layout">
        {/* LEFT: Text */}
        <div className="hero-text">
          <div className="boot-lines">
            {bootLines.map((line, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 0.5, x: 0 }}
                transition={{ delay: i * 0.2 }}
                className="mono boot-line"
              >
                <span style={{ color: 'var(--primary)', marginRight: 8 }}>{'>'}</span>
                {line}
              </motion.div>
            ))}
          </div>

          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="hero-heading"
          >
            SOFTWARE<br />DEVELOPER.EXE
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="hero-bio"
          >
            I'm {resumeData.fullName}, {resumeData.role} specializing in crafting high-end cross-platform systems.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="hero-actions"
          >
            <button className="tactical-btn solid" onClick={() => scrollTo('projects')}>
              INITIALIZE_PROJECTS <ChevronRight size={14} />
            </button>
            <button className="tactical-btn" onClick={() => scrollTo('contact')}>
              CONTACT_UPLINK <ChevronRight size={14} />
            </button>
          </motion.div>
        </div>

        {/* RIGHT: Lottie + HUD */}
        <motion.div
          className="hero-visual"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.4, duration: 1.5 }}
        >
          <div className="hud-frame">
            <div className="corner tl" />
            <div className="corner tr" />
            <div className="corner bl" />
            <div className="corner br" />
            <div className="orbit-ring ring-outer" />
            <div className="orbit-ring ring-inner" />
            <div className="lottie-wrap">
              <Player
                autoplay
                loop
                src="/animation/developer_skills.json"
                style={{ width: '100%', height: '100%' }}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
