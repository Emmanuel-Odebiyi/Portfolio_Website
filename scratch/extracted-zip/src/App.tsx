import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import MyStory from './pages/MyStory';
import MyApproach from './pages/MyApproach';
import Services from './pages/Services';
import Contact from './pages/Contact';
import GrowthIntelligenceLab from './pages/GrowthIntelligenceLab';
import AutomationRadar from './pages/tools/AutomationRadar';
import AutopilotScore from './pages/tools/AutopilotScore';
import ROITimeMachine from './pages/tools/ROITimeMachine';
import GrowthSimulator from './pages/tools/GrowthSimulator';
import ToolPlaceholder from './pages/tools/ToolPlaceholder';
import Portfolio from './pages/Portfolio';
import Resume from './pages/Resume';
import Blog from './pages/Blog';
import BlogPost from './pages/BlogPost';

export default function App() {
  return (
    <Router>
      <main className="bg-zinc-50 text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/my-story" element={<MyStory />} />
          <Route path="/my-approach" element={<MyApproach />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/growth-intelligence-lab" element={<GrowthIntelligenceLab />} />
          <Route path="/tools/automation-radar" element={<AutomationRadar />} />
          <Route path="/tools/autopilot-score" element={<AutopilotScore />} />
          <Route path="/tools/roi-time-machine" element={<ROITimeMachine />} />
          <Route path="/tools/growth-simulator" element={<GrowthSimulator />} />
          <Route path="/tools/:toolId" element={<ToolPlaceholder />} />
          <Route path="/portfolio" element={<Portfolio />} />
          <Route path="/resume" element={<Resume />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogPost />} />
        </Routes>
        <Footer />
      </main>
    </Router>
  );
}
