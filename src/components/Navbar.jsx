import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '../data';
import { Github, Linkedin, Menu, X, Sun, Moon, Home, User, Code, Briefcase, Folder, Mail } from 'lucide-react';
import { useTheme } from '../ThemeContext';

const NAV_SECTIONS = [
  { id: 'hero', label: 'HOME', icon: Home },
  { id: 'about', label: 'ABOUT', icon: User },
  { id: 'skills', label: 'SKILLS', icon: Code },
  { id: 'experience', label: 'EXPERIENCE', icon: Briefcase },
  { id: 'projects', label: 'PROJECTS', icon: Folder },
  { id: 'contact', label: 'CONTACT', icon: Mail },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState('hero');
  const [scrolled, setScrolled] = useState(false);
  const [isScrolling, setIsScrolling] = useState(false);
  const { theme, toggle } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);

      // Don't update active state if we're currently scrolling via a click
      if (isScrolling) return;

      for (let i = NAV_SECTIONS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_SECTIONS[i].id);
        if (el && el.offsetTop <= window.scrollY + window.innerHeight * 0.4) {
          setActive(NAV_SECTIONS[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isScrolling]);

  const handleNav = (id) => {
    setActive(id);
    setOpen(false);
    setIsScrolling(true);

    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Reset the scrolling flag after the smooth scroll completes
    // Most smooth scrolls take < 1000ms
    setTimeout(() => {
      setIsScrolling(false);
    }, 1000);
  };

  const isDark = theme === 'dark';
  const navBg = isDark ? 'rgba(8,12,20,0.94)' : 'rgba(248,250,252,0.94)';
  const borderC = scrolled
    ? (isDark ? 'rgba(77,158,255,0.18)' : 'rgba(0,123,255,0.12)')
    : (isDark ? 'rgba(77,158,255,0.08)' : 'rgba(0,123,255,0.06)');
  const shadow = scrolled ? '0 2px 24px rgba(0,0,0,0.4)' : 'none';
  const textMain = isDark ? '#E8EFFF' : '#0F172A';
  const textSec = isDark ? '#6B7FA8' : '#64748B';
  const primary = isDark ? '#4D9EFF' : '#007BFF';
  const surfaceA = isDark ? 'rgba(77,158,255,0.07)' : 'rgba(0,123,255,0.05)';
  const borderA = isDark ? 'rgba(77,158,255,0.2)' : 'rgba(0,123,255,0.2)';

  return (
    <>
      {/* ─── Mobile Top Bar ─── */}
      <nav
        className="mob-nav"
        style={{
          position: 'fixed', top: 0, left: 0, right: 0,
          zIndex: 8000,
          background: 'var(--bg)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: `1px solid var(--border)`,
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.9rem 1.25rem' }}>
          <span style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 900,
            fontSize: 13,
            letterSpacing: 3,
            color: 'var(--text-main)'
          }}>
            SAGAR<span style={{ color: 'var(--primary)' }}>.</span>DEV
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <button
              onClick={toggle}
              style={{
                background: 'none', border: 'none',
                padding: '6px', cursor: 'pointer', color: 'var(--primary)',
                display: 'flex', alignItems: 'center',
                transition: 'transform 0.3s ease',
              }}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <a href={resumeData.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-secondary)', display: 'flex' }}>
              <Github size={18} />
            </a>
          </div>
        </div>
      </nav>

      {/* ─── Mobile Bottom Tab Bar ─── */}
      <nav
        className="mob-nav-bottom"
        style={{
          position: 'fixed',
          bottom: 20,
          left: 10,
          right: 10,
          margin: '0 auto',
          width: 'fit-content',
          zIndex: 8500,
          background: 'var(--surface)',
          padding: '4px',
          borderRadius: 32,
          border: '1px solid var(--border-hover)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.5)',
          display: 'none', /* Controlled via CSS */
          gap: '4px',
          maxWidth: 'calc(100vw - 40px)',
          backdropFilter: 'blur(12px)', // Reduced blur for performance
          WebkitBackdropFilter: 'blur(12px)',
          alignItems: 'center',
          justifyContent: 'center',
          willChange: 'transform',
        }}
      >
        {NAV_SECTIONS.map(({ id, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <motion.button
              key={id}
              onClick={() => handleNav(id)}
              layout
              initial={false}
              animate={{
                backgroundColor: isActive ? 'var(--primary)' : 'transparent',
                // Remove explicit width: auto to let layout handle it more efficiently
              }}
              transition={{
                type: 'spring',
                stiffness: 380, // Slightly less aggressive
                damping: 30,
                backgroundColor: { duration: 0.2 }
              }}
              style={{
                height: 42,
                minWidth: 42,
                borderRadius: 21,
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: isActive ? '0 16px' : '0 12px',
                cursor: 'pointer',
                color: isActive ? 'var(--btn-solid-text)' : 'var(--text-secondary)',
                overflow: 'hidden',
                whiteSpace: 'nowrap',
                willChange: 'width, background-color',
                position: 'relative',
              }}
            >
              <Icon size={18} strokeWidth={2} style={{ flexShrink: 0 }} />
              <AnimatePresence mode="popLayout">
                {isActive && (
                  <motion.span
                    key="label"
                    initial={{ opacity: 0, x: -5 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -5 }}
                    transition={{ duration: 0.15, ease: "easeOut" }}
                    style={{
                      fontSize: 9,
                      fontWeight: 900,
                      fontFamily: 'var(--font-mono)',
                      letterSpacing: 1,
                      marginLeft: 8,
                    }}
                  >
                    {label}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </nav>

      {/* ─── Desktop Social Sidebar ─── */}
      <div className="social-bar" style={{
        position: 'fixed', left: 50, top: 0, bottom: 0,
        flexDirection: 'column', alignItems: 'center', justifyContent: 'center',
        zIndex: 5000,
      }}>
        <div style={{ width: 1, height: 150, background: 'var(--border)' }} />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', margin: '2rem 0' }}>
          {/* Desktop theme toggle */}
          <button
            onClick={toggle}
            style={{
              background: 'none', border: '1px solid var(--border)', borderRadius: 4,
              width: 36, height: 36, cursor: 'pointer', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              color: 'var(--text-secondary)', transition: 'all 0.3s',
            }}
            title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
            onMouseEnter={e => { e.currentTarget.style.color = 'var(--primary)'; e.currentTarget.style.borderColor = 'var(--primary)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = 'var(--text-secondary)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
          >
            {isDark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <a href={resumeData.github} target="_blank" rel="noreferrer"
            style={{ color: 'var(--text-secondary)', display: 'flex', transition: 'color 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <Github size={18} />
          </a>
          <a href={resumeData.linkedin} target="_blank" rel="noreferrer"
            style={{ color: 'var(--text-secondary)', display: 'flex', transition: 'color 0.3s' }}
            onMouseEnter={e => e.currentTarget.style.color = 'var(--primary)'}
            onMouseLeave={e => e.currentTarget.style.color = 'var(--text-secondary)'}
          >
            <Linkedin size={18} />
          </a>
        </div>
        <div style={{ width: 1, height: 150, background: 'var(--border)' }} />
      </div>
    </>
  );
};

export default Navbar;
