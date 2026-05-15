import { useState } from 'react';
import { SmoothScroll } from './components/SmoothScroll';
import { Cursor } from './components/Cursor';
import { Loader } from './components/Loader';
import { Navbar } from './components/Navbar';
import { Hero } from './sections/Hero';
import { Projects } from './sections/Projects';
import { Experience } from './sections/Experience';
import { WhatIDo } from './sections/WhatIDo';
import { Contact } from './sections/Contact';

function App() {
  const [loading, setLoading] = useState(true);

  const handleLoadingComplete = () => {
    setLoading(false);
  };

  return (
    <SmoothScroll>
      {/* Global custom cursor */}
      <Cursor />
      
      {/* Initial Loader that mounts on start */}
      {loading && <Loader onComplete={handleLoadingComplete} />}

      {/* Main content, unmounted until loading finishes or just hidden. 
          Given the loader takes the full screen and is absolute/fixed, 
          we can render the content behind it so it's ready. */}
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <Navbar />
        <main>
          <Hero />
          <WhatIDo />
          <Projects />
          <Experience />
          <Contact />
        </main>
      </div>
    </SmoothScroll>
  );
}

export default App;
