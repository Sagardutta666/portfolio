import { useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ThemeProvider } from './ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Contact from './components/Contact';
import TacticalHUD from './components/TacticalHUD';
import ScreenOverlay from './components/ScreenOverlay';
import SplashLoader from './components/SplashLoader';
import { resumeData } from './data';

function App() {
  const [loading, setLoading] = useState(true);
  const onFinish = useCallback(() => setLoading(false), []);

  return (
    <ThemeProvider>
      <div className="app">
        <AnimatePresence>
          {loading && <SplashLoader onFinish={onFinish} />}
        </AnimatePresence>

        {!loading && (
          <>
            <ScreenOverlay />
            <TacticalHUD />
            <Navbar />
            <main>
              <Hero />
              <About />
              <Skills />
              <Experience />
              <Projects />
              <Contact />
            </main>
            <footer>
              <div className="container">
                <div className="footer-inner mono">
                  <p>DESIGNED & BUILT BY {resumeData.fullName.toUpperCase()}.</p>
                  <p className="copy">© {new Date().getFullYear()} {resumeData.fullName}. All rights reserved.</p>
                </div>
              </div>
            </footer>
          </>
        )}
      </div>
    </ThemeProvider>
  );
}

export default App;
