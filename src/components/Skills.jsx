import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Player } from '@lottiefiles/react-lottie-player';
import { resumeData } from '../data';

const marqueeItems = [
  'Flutter', 'React', 'Node.js', 'Fast API', 'TypeScript', 'Firebase',
  'Next.js', 'Dart', 'Kotlin', 'Android Studio', 'Android', 'Git', 'GitHub',
  'Gitlab', 'Postman', 'Bitbucket', 'Angular', 'JavaScript', 'Framer Motion'
];

const SkillOrbit = ({ skills }) => {
  const [angle, setAngle] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const rafRef = useRef();
  const lastRef = useRef(0);
  const speed = (2 * Math.PI) / 20000;

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 700);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  useEffect(() => {
    const step = (time) => {
      if (lastRef.current) setAngle(prev => prev + speed * (time - lastRef.current));
      lastRef.current = time;
      rafRef.current = requestAnimationFrame(step);
    };
    rafRef.current = requestAnimationFrame(step);
    return () => cancelAnimationFrame(rafRef.current);
  }, []);

  const count = skills.length;
  const rx = isMobile ? 120 : 200;
  const ry = isMobile ? 44 : 72;
  const nodeSize = isMobile ? 80 : 130;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {[1.1, 0.9].map(scale => (
        <div key={scale} style={{
          position: 'absolute',
          width: `${(rx * 2 + 40) * scale}px`,
          height: `${(ry * 2 + 14) * scale}px`,
          border: '1px solid var(--ring-color)',
          borderRadius: '50%',
          pointerEvents: 'none',
        }} />
      ))}

      <div style={{
        position: 'absolute',
        width: nodeSize, height: nodeSize,
        borderRadius: '50%',
        background: 'var(--surface)',
        border: '1px solid var(--border)',
        boxShadow: '0 0 40px var(--primary-glow)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 8, zIndex: 5,
      }}>
        <Player autoplay loop src="/animation/developer_skills.json" style={{ width: '100%', height: '100%' }} />
      </div>

      {skills.map((skill, i) => {
        const theta = (i * (2 * Math.PI / count)) + angle;
        const x = rx * Math.cos(theta);
        const y = ry * Math.sin(theta);
        const sc = 0.7 + 0.3 * ((Math.sin(theta) + 1) / 2);
        const opacity = 0.5 + 0.5 * ((Math.sin(theta) + 1) / 2);
        return (
          <div key={skill} style={{
            position: 'absolute',
            left: `calc(50% + ${x}px)`,
            top: `calc(50% + ${y}px)`,
            transform: `translate(-50%, -50%) scale(${sc})`,
            opacity,
            zIndex: Math.round(sc * 10),
            padding: isMobile ? '4px 10px' : '6px 14px',
            background: 'var(--surface)',
            border: '1px solid var(--border)',
            borderRadius: 4,
            fontFamily: 'var(--font-mono)',
            fontSize: isMobile ? 9 : 10,
            fontWeight: 900,
            color: 'var(--text-main)',
            letterSpacing: 1,
            whiteSpace: 'nowrap',
            boxShadow: '0 4px 10px rgba(0,123,255,0.06)',
            pointerEvents: 'none',
          }}>
            {skill.toUpperCase()}
          </div>
        );
      })}
    </div>
  );
};

const Skills = () => (
  <section id="skills" style={{ overflow: 'hidden' }}>
    <div style={{
      position: 'absolute', top: '50%', left: '50%',
      transform: 'translate(-50%,-50%)',
      width: 'min(90vw, 700px)', height: 'min(90vw, 700px)',
      border: '1px solid var(--ring-color)',
      borderRadius: '50%', pointerEvents: 'none',
    }} />

    <div className="container" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>

      {/* Header */}
      <motion.div
        style={{ textAlign: 'center', marginBottom: '2rem', width: '100%' }}
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <span className="section-label">TECHNICAL_STACK</span>
        <h2 style={{ fontSize: 'clamp(40px,6vw,56px)', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-1px' }}>
          SYSTEM_CORE
        </h2>
      </motion.div>

      {/* Orbit */}
      <motion.div
        className="orbit-container"
        style={{ width: '100%' }}
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
      >
        <SkillOrbit skills={resumeData.orbitalSkills} />
      </motion.div>

      {/* Marquee */}
      <div style={{ marginTop: '2rem', borderTop: '1px solid rgba(0,123,255,0.08)', paddingTop: '1.5rem', width: '100%' }}>
        <p className="mono" style={{
          fontSize: 9, color: 'rgba(0,123,255,0.4)',
          letterSpacing: 4, fontWeight: 700,
          textAlign: 'center', marginBottom: '1.5rem',
        }}>
          TECHNOLOGIES_IN_USE
        </p>
        <div className="marquee-wrap">
          <div className="marquee-inner">
            {marqueeItems.map((tech, i) => (
              <span key={i} className="mono marquee-item">
                <span style={{ color: 'var(--primary)', fontSize: 8, marginRight: 8 }}>●</span>
                {tech.toUpperCase()}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Skills;
