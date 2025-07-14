import React, { useEffect, useRef } from 'react';
import { Routes, Route } from 'react-router-dom';
import Hero from './pages/Hero';

const App = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    // Dynamically import the scripts only on client side
    if (typeof window !== 'undefined') {
      // Load shaders.js first
      import('./components/shaders.js').then(() => {
        // Then load script.js which depends on shaders.js
        return import('./components/script.js').then((module) => {
          // Initialize the background with the canvas reference
          if (module.initBackground && canvasRef.current) {
            module.initBackground(canvasRef.current);
          }
        });
      }).catch(error => {
        console.error('Error loading background scripts:', error);
      });
    }
  }, []);

  return (
    <div className="m-0 p-0 text-primary flex flex-col relative min-h-screen">
      {/* Background canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full -z-10"
        id="gradient-canvas"
      />
      
      {/* Content */}
      <div className="flex justify-center mx-auto my-[10vh] min-h-[80vh] lg:w-[1000px] relative z-10">
        <Routes>
          <Route path="/" element={<Hero />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;