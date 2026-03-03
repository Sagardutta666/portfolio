import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '../data';
import { Play, ChevronDown, ChevronUp } from 'lucide-react';

const ExperienceCard = ({ exp, index }) => {
  const [expanded, setExpanded] = useState(index === 0);

  return (
    <motion.div
      className="exp-card"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ delay: index * 0.15, duration: 0.5 }}
    >
      {/* Left accent line */}
      <div style={{
        width: 3,
        background: expanded ? 'var(--primary)' : 'rgba(0,123,255,0.15)',
        flexShrink: 0,
        transition: 'background 0.3s',
      }} />

      <div className="card-body">
        <button className="card-header" onClick={() => setExpanded(p => !p)}>
          <div className="header-left">
            <span className="mono index-num">0{index + 1}</span>
            <div>
              <h3 className="role">{exp.role}</h3>
              <div className="meta mono">
                <span className="company">@{exp.company}</span>
                <span className="sep">·</span>
                <span className="location">{exp.location}</span>
              </div>
            </div>
          </div>
          <div className="header-right">
            <span className="mono period">{exp.period}</span>
            <div className="chevron">
              {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </div>
          </div>
        </button>

        <AnimatePresence initial={false}>
          {expanded && (
            <motion.div
              className="points-wrap"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <ul className="points">
                {exp.points.map((pt, i) => (
                  <motion.li
                    key={i}
                    className="point"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.08 }}
                  >
                    <Play size={9} style={{ color: 'var(--primary)', flexShrink: 0, marginTop: 5 }} />
                    <p>{pt}</p>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const Experience = () => (
  <section id="experience">
    <div className="container">
      <motion.div
        style={{ textAlign: 'center', marginBottom: '3rem', width: '100%' }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <span className="section-label">SERVICE_HISTORY</span>
        <h2 style={{
          fontSize: 'clamp(36px,6vw,48px)',
          fontWeight: 900,
          color: 'var(--text-main)',
          letterSpacing: '-1px',
        }}>
          MISSION_LOGS
        </h2>
      </motion.div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: 860, margin: '0 auto', width: '100%' }}>
        {resumeData.experience.map((exp, i) => (
          <ExperienceCard key={i} exp={exp} index={i} />
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
