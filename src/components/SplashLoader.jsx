import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const messages = [
  "INITIALIZING CORE...",
  "SYNCING KNOWLEDGE BASE...",
  "COPYING CODE FROM STACKOVERFLOW...",
  "MODELING 3D ASSETS...",
  "OPTIMIZING PERFORMANCE...",
  "DEPLOYMENT IN PROGRESS...",
  "SYSTEM READY.",
];

const SplashLoader = ({ onFinish }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(onFinish, 800);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
    return () => clearInterval(interval);
  }, [onFinish]);

  const msgIdx = Math.min(Math.floor((progress / 100) * (messages.length - 1)), messages.length - 1);

  return (
    <AnimatePresence>
      <motion.div
        className="splash"
        initial={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="schematic-grid" />
        <div className="system-scanner" />
        <div className="crosshair tl" />
        <div className="crosshair br" />
        <div className="meta-tag mono">CORP_IND // {new Date().getFullYear()}</div>

        <div className="center-content">
          <div className="percentage-wrap">
            <span className="number mono">{progress}</span>
            <span className="pct mono">%</span>
          </div>
          <div className="seg-bar">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className={`seg ${progress > (i / 20) * 100 ? 'active' : ''}`} />
            ))}
          </div>
          <div className="status-badge mono" key={msgIdx}>
            {messages[msgIdx]}
          </div>
        </div>

        <div className="kernel-logs mono">
          <div>KERNEL: V1.0.4_STABLE</div>
          <div>ENCRYPTION: AES_256_ACTIVE</div>
          <div>UPLINK: SYNCHRONIZING...</div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SplashLoader;
