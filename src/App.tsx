import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import BlogList from './components/BlogList';
import BlogEditor from './components/BlogEditor';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<BlogList />} />
            <Route path="/new" element={<BlogEditor />} />
            <Route path="/edit/:id" element={<BlogEditor />} />
          </Routes>
        </main>
        <Toaster />
      </div>
    </Router>
  );
}

export default App;