import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Hero from './pages/Hero';

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <nav className="flex items-center ga
      w-full h-20">
        <Link className='grow' to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <div className=""> {/* Offset for fixed navbar */}
        <Routes>
          <Route path="/" element={<Hero />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
