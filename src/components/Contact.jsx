import { useState } from 'react';
import { motion } from 'framer-motion';
import { resumeData } from '../data';
import { Wifi } from 'lucide-react';

const EncryptedEmail = ({ email }) => {
  const [hovered, setHovered] = useState(false);
  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 15 }}>
        <Wifi
          size={24}
          color={hovered ? 'var(--primary)' : 'rgba(0,123,255,0.3)'}
          style={{ transition: 'color 0.3s', flexShrink: 0 }}
        />
        <span className="mono email-text" style={{
          color: hovered ? 'var(--primary)' : 'var(--text-main)',
          transition: 'color 0.3s',
        }}>{email}</span>
      </div>
      <motion.div
        animate={{ width: hovered ? 'min(400px, 90vw)' : 0 }}
        transition={{ duration: 0.3 }}
        style={{ height: 2, background: 'var(--primary)', overflow: 'hidden' }}
      />
    </div>
  );
};

const Contact = () => (
  <section id="contact">
    {/* Background rings */}
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, border: '1px solid var(--ring-color)', borderRadius: '50%', pointerEvents: 'none' }} />
    <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 400, height: 400, border: '1px solid var(--border)', borderRadius: '50%', pointerEvents: 'none' }} />

    <div className="container" style={{ textAlign: 'center', maxWidth: 800, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>

      <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
        <div className="dossier-tag mono">COMMUNICATION_GATEWAY v1.0</div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        style={{ fontSize: 'clamp(28px,7vw,56px)', fontWeight: 900, color: 'var(--text-main)', letterSpacing: -1 }}
      >
        INITIATE_CONTACT
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.4 }}
        style={{ fontSize: 'clamp(14px,2vw,18px)', color: 'var(--text-secondary)', lineHeight: 1.6, fontWeight: 300 }}
      >
        I am currently accepting select mission-critical projects.<br />
        Signal stability is high. Response time optimized.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.6 }}
      >
        <EncryptedEmail email={resumeData.email} />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ delay: 0.7 }}
        style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap' }}
      >
        <a href={resumeData.github} target="_blank" rel="noreferrer" className="tactical-btn">GITHUB_REPO</a>
        <a href={resumeData.linkedin} target="_blank" rel="noreferrer" className="tactical-btn">LINKEDIN_LINK</a>
        <a href={resumeData.resumeUrl} target="_blank" rel="noreferrer" className="tactical-btn solid">DOWNLOAD_CV</a>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
        transition={{ delay: 0.8 }}
      >
        <div className="status-bar white-surface">
          <span className="pulse-dot" />
          <span className="mono" style={{ fontSize: 10, color: 'rgba(0,123,255,0.5)', letterSpacing: 1 }}>
            SIGNAL_STABLE // READY_FOR_UPLINK
          </span>
        </div>
      </motion.div>

    </div>
  </section>
);

export default Contact;
