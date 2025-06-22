import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Home from './components/Home';
import About from './components/About';
import Contact from './components/Contact';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-gradient-to-br from-slate-100 via-gray-100 to-stone-200 dark:from-slate-800 dark:via-gray-900 dark:to-stone-900">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
        <footer className="text-center py-8 text-sm text-gray-500 dark:text-gray-400">
          <p>Powered by Gemini AI. &copy; {new Date().getFullYear()} Ebook Formatter Inc.</p>
        </footer>
      </div>
    </Router>
  );
};

export default App;
