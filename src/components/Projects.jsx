import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { resumeData } from '../data';
import { Code, Terminal } from 'lucide-react';

const MiniGraph = ({ label, val }) => (
  <div className="mini-graph">
    <span className="mini-label mono">{label}</span>
    <div className="mini-bar">
      <div className="mini-fill" style={{ width: `${val * 100}%` }} />
    </div>
  </div>
);

const ProjectDashboard = ({ project, index }) => (
  <motion.div
    className="dashboard"
    key={index}
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    exit={{ opacity: 0, y: -10 }}
    transition={{ duration: 0.35 }}
  >
    <div className="dash-header">
      <div>
        <p className="mono project-node">PROJECT_NODE // {project.title?.toUpperCase()}</p>
        <h3 className="project-title">{project.title}</h3>
      </div>
      <div className="stats-plate">
        <MiniGraph label="PERFORMANCE" val={0.95} />
        <MiniGraph label="SCALABILITY" val={0.88} />
        <MiniGraph label="SECURITY" val={0.92} />
      </div>
    </div>

    <p className="project-desc">{project.description}</p>

    <div className="tags">
      {(project.tags || []).map(tag => (
        <span key={tag} className="dash-badge mono">{tag}</span>
      ))}
    </div>

    <div className="dash-footer">
      <a
        href={project.link || '#'}
        target="_blank"
        rel="noreferrer"
        className="tactical-btn solid"
        style={{ textDecoration: 'none', fontSize: '11px', padding: '12px 20px' }}
      >
        <Code size={16} /> SOURCE_CODE / REPO
      </a>
      <div className="build-status">
        <span className="green-dot" />
        <span className="mono" style={{ fontSize: 10, color: '#10b981', fontWeight: 700 }}>BUILD: SUCCESS</span>
      </div>
    </div>
  </motion.div>
);

const Projects = () => {
  const [selected, setSelected] = useState(0);
  const projects = resumeData.projects || [];

  const PanelHeader = ({ title }) => (
    <div className="panel-header">
      <Terminal size={12} color="var(--primary)" />
      <span className="mono">{title}</span>
    </div>
  );

  return (
    <section id="projects">
      <div className="container">
        {/* Header */}
        <motion.div
          style={{ textAlign: 'center', marginBottom: '2.5rem', width: '100%' }}
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <span className="section-label">PROJECT_FILES</span>
          <h2 style={{ fontSize: 'clamp(36px,6vw,48px)', fontWeight: 900, color: 'var(--text-main)', letterSpacing: '-1px' }}>
            MISSION_CONTROL
          </h2>
        </motion.div>

        {/* Desktop: Directory + Dashboard */}
        <div className="panel-wrap">
          <div className="desktop-panel white-surface">
            <div className="dir-panel">
              <PanelHeader title="DIRECTORY / root" />
              <div className="dir-list">
                {projects.map((p, i) => (
                  <button
                    key={i}
                    className={`dir-item ${selected === i ? 'active' : ''}`}
                    onClick={() => setSelected(i)}
                  >
                    <span className="mono idx">{`0${i + 1}`}</span>
                    <span className="name">{p.title?.toUpperCase()}</span>
                  </button>
                ))}
              </div>
            </div>
            <div className="dash-panel">
              <AnimatePresence mode="wait">
                <ProjectDashboard key={selected} project={projects[selected]} index={selected} />
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Mobile: Tab + Dashboard */}
        <div className="panel-wrap">
          <div className="mobile-panel white-surface">
            <div className="mobile-tabs">
              {projects.map((p, i) => (
                <button
                  key={i}
                  className={`mob-tab mono ${selected === i ? 'active' : ''}`}
                  onClick={() => setSelected(i)}
                >
                  P_0{i + 1}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <ProjectDashboard key={selected} project={projects[selected]} index={selected} />
            </AnimatePresence>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Projects;
