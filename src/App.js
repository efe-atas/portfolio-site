import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import ComputerVisionProjects from './pages/ComputerVisionProjects';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';
import Apps from './pages/Apps';


function App() {
  return (
    <ThemeProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<ComputerVisionProjects />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/apps" element={<Apps />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App; 