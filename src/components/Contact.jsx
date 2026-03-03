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

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [status, setStatus] = useState('READY_FOR_UPLINK');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('TRANSMITTING...');

    // URL is stored locally in .env for security
    const GOOGLE_SHEET_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

    try {
      console.log('--- SIGNAL_UPLINK_START ---');
      console.log('DATA_PACKET:', formData);
      console.log('TARGET_URL:', GOOGLE_SHEET_URL);

      await fetch(GOOGLE_SHEET_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'text/plain', // Using text/plain avoids some CORS preflight issues with Apps Script
        },
        body: JSON.stringify(formData),
      });

      console.log('--- SIGNAL_UPLINK_COMPLETE ---');
      console.log('STATUS: Success (Opaque response received)');

      setStatus('UPLINK_SUCCESSFUL');
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setStatus('READY_FOR_UPLINK'), 3000);
    } catch (error) {
      console.error('--- SIGNAL_UPLINK_FAILED ---');
      console.error('ERROR_DETAILS:', error);
      setStatus('SIGNAL_ERROR');
      setTimeout(() => setStatus('READY_FOR_UPLINK'), 3000);
    }
  };

  return (
    <section id="contact">
      {/* Background rings */}
      <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', width: 600, height: 600, border: '1px solid var(--ring-color)', borderRadius: '50%', pointerEvents: 'none' }} />

      <div className="container" style={{ textAlign: 'center', maxWidth: 800, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem', position: 'relative', zIndex: 1 }}>

        <motion.div initial={{ opacity: 0, y: -20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }}>
          <div className="dossier-tag mono">COMMUNICATION_GATEWAY v2.1</div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.2 }}
          style={{ fontSize: 'clamp(28px,7vw,56px)', fontWeight: 900, color: 'var(--text-main)', letterSpacing: -1 }}
        >
          ESTABLISH_CONNECTION
        </motion.h2>

        {/* Tactical Form */}
        <motion.form
          onSubmit={handleSubmit}
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: false, amount: 0.1 }}
          style={{
            width: '100%',
            maxWidth: '600px',
            background: 'rgba(255, 255, 255, 0.03)',
            backdropFilter: 'blur(10px)',
            border: '1px solid var(--border)',
            padding: '2.5rem',
            borderRadius: '12px',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            gap: '1.5rem'
          }}
        >
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
            <div className="input-group">
              <label className="mono" style={{ fontSize: '10px', color: 'var(--primary)', marginBottom: '8px', display: 'block', opacity: 0.7 }}>SENDER_ID</label>
              <input
                type="text"
                placeholder="YOUR NAME"
                required
                className="tactical-input"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              />
            </div>
            <div className="input-group">
              <label className="mono" style={{ fontSize: '10px', color: 'var(--primary)', marginBottom: '8px', display: 'block', opacity: 0.7 }}>RETURN_PATH</label>
              <input
                type="email"
                placeholder="EMAIL_ADDRESS"
                required
                className="tactical-input"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
            </div>
          </div>

          <div className="input-group">
            <label className="mono" style={{ fontSize: '10px', color: 'var(--primary)', marginBottom: '8px', display: 'block', opacity: 0.7 }}>SIGNAL_STREAM</label>
            <textarea
              placeholder="ENTER YOUR MESSAGE HERE..."
              required
              rows="5"
              className="tactical-input"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            ></textarea>
          </div>

          <button type="submit" className="tactical-btn solid" style={{ width: '100%', padding: '15px' }}>
            {status}
          </button>
        </motion.form>

        <motion.div
          initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.2 }}
          transition={{ delay: 0.7 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '1.5rem', flexWrap: 'wrap', marginTop: '1rem' }}
        >
          <a href={resumeData.github} target="_blank" rel="noreferrer" className="tactical-btn">GITHUB</a>
          <a href={resumeData.linkedin} target="_blank" rel="noreferrer" className="tactical-btn">LINKEDIN</a>
          <EncryptedEmail email={resumeData.email} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: false, amount: 0.1 }}
          transition={{ delay: 0.8 }}
        >
          <div className="status-bar white-surface">
            <span className="pulse-dot" />
            <span className="mono" style={{ fontSize: 10, color: 'rgba(0,123,255,0.5)', letterSpacing: 1 }}>
              ENCRYPTION_ACTIVE // {status}
            </span>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;
