import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { Aurora } from './components/Aurora';
import { SkipLink } from './components/SkipLink';

// ── Eagerly loaded (above the fold / core navigation) ────────────────────────
import Home from './pages/Home';
import NotFound from './pages/NotFound';

// ── Lazy-loaded pages (code splitting for faster initial bundle) ──────────────
const About = lazy(() => import('./pages/About'));
const MyStory = lazy(() => import('./pages/MyStory'));
const MyApproach = lazy(() => import('./pages/MyApproach'));
const Services = lazy(() => import('./pages/Services'));
const Contact = lazy(() => import('./pages/Contact'));
const GrowthIntelligenceLab = lazy(() => import('./pages/GrowthIntelligenceLab'));
const Portfolio = lazy(() => import('./pages/Portfolio'));
const Resume = lazy(() => import('./pages/Resume'));
const Blog = lazy(() => import('./pages/Blog'));
const BlogPost = lazy(() => import('./pages/BlogPost'));
const PrivacyPolicy = lazy(() => import('./pages/PrivacyPolicy'));
const TermsOfService = lazy(() => import('./pages/TermsOfService'));
const AutomationRadar = lazy(() => import('./pages/tools/AutomationRadar'));
const AutopilotScore = lazy(() => import('./pages/tools/AutopilotScore'));
const ROITimeMachine = lazy(() => import('./pages/tools/ROITimeMachine'));
const GrowthSimulator = lazy(() => import('./pages/tools/GrowthSimulator'));
const ToolPlaceholder = lazy(() => import('./pages/tools/ToolPlaceholder'));
const ContentMarketingAutomation = lazy(() => import('./pages/services/ContentMarketingAutomation'));
const SEOStrategyOptimization = lazy(() => import('./pages/services/SEOStrategyOptimization'));
const BusinessProcessAutomation = lazy(() => import('./pages/services/BusinessProcessAutomation'));

// ── Page Loading Fallback ─────────────────────────────────────────────────────
function PageLoader() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: '#71717a',
        fontSize: '0.9rem',
      }}
      aria-live="polite"
      aria-label="Loading page"
    >
      <span
        style={{
          width: 32,
          height: 32,
          border: '2px solid #e4e4e7',
          borderTopColor: '#0a0a0a',
          borderRadius: '50%',
          display: 'inline-block',
          animation: 'spin 0.7s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      {/* Accessibility: skip navigation for keyboard users */}
      <SkipLink />
      <Aurora />
      <main id="main-content" className="relative bg-transparent">
        <Header />
        <Suspense fallback={<PageLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/my-story" element={<MyStory />} />
            <Route path="/my-approach" element={<MyApproach />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/content-marketing-automation" element={<ContentMarketingAutomation />} />
            <Route path="/services/seo-strategy-optimization" element={<SEOStrategyOptimization />} />
            <Route path="/services/business-process-automation" element={<BusinessProcessAutomation />} />
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
            <Route path="/privacy" element={<PrivacyPolicy />} />
            <Route path="/terms" element={<TermsOfService />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
        <Footer />
      </main>
    </Router>
  );
}
