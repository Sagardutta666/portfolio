import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../ThemeContext';

const TacticalHUD = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [hovered, setHovered] = useState(false);
  const { theme, toggle } = useTheme();

  const sections = ['HOME', 'ABOUT', 'SKILLS', 'EXPERIENCE', 'PROJECTS', 'CONTACT'];
  const ids = ['hero', 'about', 'skills', 'experience', 'projects', 'contact'];

  useEffect(() => {
    const onScroll = () => {
      const scrolled = document.documentElement.scrollTop;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(Math.min(scrolled / total, 1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && el.offsetTop <= scrolled + window.innerHeight * 0.4) {
          setActiveSection(i);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const hex = Math.floor(scrollProgress * 255).toString(16).padStart(2, '0').toUpperCase();

  return (
    <div className="hud-wrap">
      <div className="hud-inner">
        <div className="mono status-txt">SYSTEM_ONLINE</div>
        <div className="mono coords">0x{hex} // {(scrollProgress * 100).toFixed(1)}%</div>

        <div
          className="nav-strip"
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
        >
          <div className="track" />
          <div className="fill" style={{ height: `${scrollProgress * 300}px` }} />
          <div className="ticks">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="tick" />
            ))}
          </div>
          <div className="items">
            {sections.map((label, i) => (
              <a key={label} href={`#${ids[i]}`} className={`hud-item ${activeSection === i ? 'active' : ''}`}>
                <div className="label-wrap">
                  <motion.span
                    className="mono item-label"
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: hovered || activeSection === i ? 1 : 0, x: hovered || activeSection === i ? 0 : 10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {(i + 1).toString().padStart(2, '0')} // {label}
                  </motion.span>
                </div>
                <div className="pip" />
              </a>
            ))}
          </div>
        </div>

        {/* Theme Toggle */}
        <button
          className="hud-theme-btn mono"
          onClick={toggle}
          title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
        >
          {theme === 'dark' ? '☀ LIGHT' : '● DARK'}
        </button>

        <div className="mono status-txt">v2.0.4_STABLE</div>
      </div>
    </div>
  );
};

export default TacticalHUD;
