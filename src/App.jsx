import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Hero from './pages/Hero';

const App = () => {
  return (
    <div className="m-0 p-0 bg-background text-primary flex flex-col">
      {/* <nav className="flex items-center bg-background text-primary border-2 w-full h-[100px] px-20 gap-10 font-basic">
        <Link className='grow' to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/services">Services</Link>
        <Link to="/contact">Contact</Link>
      </nav> */}

      <div className="flex justify-center mx-auto my-[10vh] min-h-[80vh] lg:w-[1000px]">
        <Routes>
          <Route path="/" element={<Hero />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
