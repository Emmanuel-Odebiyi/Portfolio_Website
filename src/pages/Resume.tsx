import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  ChevronRight,
  Award,
  ArrowLeft,
  ArrowRight,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { SEO } from '../components/SEO';

const sections = [
  { id: 'summary', label: 'Summary' },
  { id: 'experience', label: 'Experience' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'education', label: 'Education' },
];

const experience = [
  {
    role: "AI Automation Specialist & Consultant",
    company: "Independent / B2B SaaS",
    period: "2024 — Present",
    location: "Remote",
    description: "Architecting intelligent marketing systems that bridge the gap between AI automation and SEO strategy for high-growth SaaS companies.",
    bullets: [
      "Built automated content distribution pipelines reducing manual labor by 70% while increasing publishing volume.",
      "Developed custom AI workflows using OpenAI API and n8n for high-accuracy content repurposing and SEO optimization.",
      "Implemented growth systems that led to a 520% ROI for B2B technology clients within 90 days.",
      "Orchestrated complex lead nurturing flows in HubSpot and ActiveCampaign to accelerate funnel velocity."
    ]
  },
  {
    role: "Senior SEO Writer & Strategist",
    company: "TechFlow Solutions",
    period: "2023 — 2024",
    location: "San Francisco, CA",
    description: "Led SEO content strategy and execution for a premier B2B technology platform, focusing on high-intent search capture.",
    bullets: [
      "Executed end-to-end keyword research and content planning, targeting high-value commercial keywords.",
      "Optimized on-page elements across 200+ critical landing pages, improving average ranking from page 4 to page 1.",
      "Collaborated with engineering and product teams to implement technical SEO fixes and improve site health scores."
    ]
  },
  {
    role: "Content Editor",
    company: "The Scoove Africa",
    period: "2022 — 2023",
    location: "Lagos, Nigeria",
    description: "Managed a cross-functional team of writers and editors for a leading digital publishing brand in the entertainment niche.",
    bullets: [
      "Streamlined the editorial pipeline, increasing monthly article output by 40% while maintaining rigorous quality standards.",
      "Scaled organic traffic by 65% in 90 days through data-driven content optimization and strategic internal linking.",
      "Analyzed audience engagement metrics to refine content strategy and improve user retention rates."
    ]
  },
  {
    role: "Web Content Writer",
    company: "Freelance",
    period: "2021 — 2022",
    location: "Remote",
    description: "Specialized in high-conversion blog posts and articles for technology and business publications.",
    bullets: [
      "Delivered 500+ high-quality articles for international clients, focusing on SEO and reader engagement.",
      "Mastered the fundamentals of digital marketing and search engine optimization through hands-on client work."
    ]
  }
];

const skillGroups = [
  {
    category: "Automation & AI",
    skills: ["Zapier", "Make.com", "n8n", "OpenAI API", "Python", "Airtable", "Workflow Orchestration"]
  },
  {
    category: "SEO & Content",
    skills: ["Semrush", "Ahrefs", "Surfer SEO", "Frase", "Keyword Research", "On-Page Optimization", "Technical SEO"]
  },
  {
    category: "Marketing Tech",
    skills: ["HubSpot", "ActiveCampaign", "Google Analytics 4", "Google Search Console", "WordPress", "CRM Automation"]
  }
];

export default function Resume() {
  const [activeSection, setActiveSection] = useState('summary');
  const [isPageLoaded, setIsPageLoaded] = useState(false);

  useEffect(() => {
    // Simulate page load delay for the PDF download option
    const timer = setTimeout(() => {
      setIsPageLoaded(true);
    }, 1500);

    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timer);
    };
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      const offset = element.offsetTop - 100;
      window.scrollTo({ top: offset, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen pt-32 pb-20 font-sans" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="Resume | Emmanuel Odebiyi"
        description="Download Emmanuel Odebiyi's resume. AI Automation Specialist & SEO Strategist building autonomous growth engines for B2B SaaS companies."
        keywords="emmanuel odebiyi resume, AI automation specialist, SEO strategist, content marketing resume"
      />
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header */}
        <header className="mb-24 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-none font-display"
                style={{ color: 'var(--text-body)' }}
              >
                Emmanuel <br /> Odebiyi
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl font-light tracking-tight"
                style={{ color: 'var(--text-muted)' }}
              >
                AI Automation Specialist & SEO Strategist
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-right md:pt-4 text-left"
            >
              <div className="flex flex-col gap-2 text-sm font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                <a href="mailto:emmanuel@emmanuelodebiyi.name.ng" className="hover:text-[var(--text-body)] transition-colors">emmanuel@emmanuelodebiyi.name.ng</a>
                <a href="https://www.linkedin.com/in/emmanuel-odebiyi" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-body)] transition-colors">LinkedIn</a>
                <a href="https://x.com/Bobowrites_" target="_blank" rel="noopener noreferrer" className="hover:text-[var(--text-body)] transition-colors">Twitter</a>
                <Link to="/portfolio" className="hover:text-[var(--text-body)] transition-colors">Portfolio</Link>
              </div>
              
              <AnimatePresence mode="wait">
                {!isPageLoaded ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-end gap-2 text-xs font-sans font-bold uppercase tracking-widest animate-pulse"
                    style={{ color: 'var(--text-muted)' }}
                  >
                    <Loader2 size={14} className="animate-spin" /> Preparing PDF...
                  </motion.div>
                ) : (
                  <motion.a
                    key="download"
                    href="/assets/Emmanuel_Odebiyi_Resume.pdf"
                    download="Emmanuel_Odebiyi_Resume.pdf"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-6 py-3 text-xs font-bold rounded-full hover:brightness-110 transition-all shadow-xl uppercase tracking-widest"
                    style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
                  >
                    <Download size={14} /> Download PDF
                  </motion.a>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          
          <div className="h-px w-full" style={{ backgroundColor: 'var(--border-card)' }} />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-20">
          
          {/* Sticky Navigation Sidebar */}
          <aside className="hidden lg:block">
            <nav className="sticky top-32 space-y-6">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className="block text-xs font-bold uppercase tracking-[0.2em] transition-all text-left"
                  style={{
                    color: activeSection === section.id ? 'var(--accent-amber)' : 'var(--text-muted)'
                  }}
                >
                  {section.label}
                </button>
              ))}
              <div className="pt-12">
                <Link 
                  to="/portfolio"
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest transition-colors"
                  style={{ color: 'var(--text-muted)' }}
                >
                  <ArrowLeft size={12} /> Back to Work
                </Link>
              </div>
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="space-y-32">
            
            {/* Summary */}
            <section id="summary" className="space-y-8 text-left">
              <h2 className="text-xs font-sans font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--text-muted)' }}>01 / Summary</h2>
              <p className="text-2xl md:text-5xl font-bold leading-[1.1] tracking-tighter max-w-4xl font-display" style={{ color: 'var(--text-body)' }}>
                I build <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>autonomous growth engines</span> for SaaS companies. By combining AI-driven workflows with high-intent SEO strategy, I help brands scale their content operations and capture market share without increasing headcount.
              </p>
              <p className="text-xl font-light leading-relaxed max-w-2xl" style={{ color: 'var(--text-muted)' }}>
                Currently helping B2B technology platforms automate their marketing pipelines and achieve predictable, data-backed ROI.
              </p>
            </section>

            {/* Experience */}
            <section id="experience" className="space-y-16 text-left">
              <h2 className="text-xs font-sans font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--text-muted)' }}>02 / Experience</h2>
              <div className="space-y-24">
                {experience.map((job, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8 group">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-bold tracking-tight transition-colors group-hover:text-[var(--accent-amber)]" style={{ color: 'var(--text-body)' }}>{job.role}</h3>
                        <p className="text-lg font-medium" style={{ color: 'var(--text-muted)' }}>{job.company}</p>
                      </div>
                      <p className="font-light leading-relaxed max-w-2xl italic" style={{ color: 'var(--text-muted)' }}>
                        {job.description}
                      </p>
                      <ul className="space-y-4">
                        {job.bullets.map((bullet, j) => (
                          <li key={j} className="flex items-start gap-4 leading-relaxed" style={{ color: 'var(--text-body)' }}>
                            <span className="mt-2.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: 'var(--accent-amber)' }} />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:text-right text-left">
                      <span className="text-sm font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{job.period}</span>
                      <p className="text-xs mt-1 uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>{job.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section id="skills" className="space-y-16 text-left">
              <h2 className="text-xs font-sans font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--text-muted)' }}>03 / Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {skillGroups.map((group, i) => (
                  <div key={i} className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest border-b pb-4" style={{ color: 'var(--text-body)', borderColor: 'var(--border-card)' }}>{group.category}</h3>
                    <ul className="space-y-3">
                      {group.skills.map(skill => (
                        <li key={skill} className="font-light flex items-center gap-2" style={{ color: 'var(--text-muted)' }}>
                          <ChevronRight size={14} style={{ color: 'var(--accent-amber)' }} />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section id="projects" className="space-y-16 text-left">
              <h2 className="text-xs font-sans font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--text-muted)' }}>04 / Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "TechFlow Automation", desc: "Built a 520% ROI content machine for a SF-based SaaS.", link: "/portfolio" },
                  { title: "SEO Growth Engine", desc: "Scaled organic traffic by 65% for a major media brand.", link: "/portfolio" }
                ].map((project, i) => (
                  <Link 
                    key={i} 
                    to={project.link}
                    className="p-10 rounded-[2rem] border transition-all"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                  >
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-body)' }}>{project.title}</h3>
                      <ArrowRight size={20} style={{ color: 'var(--text-muted)' }} />
                    </div>
                    <p className="font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>{project.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section id="certifications" className="space-y-16 text-left">
              <h2 className="text-xs font-sans font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--text-muted)' }}>05 / Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "HubSpot Content Marketing Certified",
                  "Google Analytics Individual Qualification",
                  "Semrush SEO Fundamentals",
                  "Zapier Automation Expert"
                ].map((cert, i) => (
                  <div 
                    key={i} 
                    className="flex items-center gap-4 p-6 border rounded-2xl transition-colors"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                  >
                    <Award size={20} style={{ color: 'var(--accent-amber)' }} />
                    <span className="font-bold tracking-tight" style={{ color: 'var(--text-body)' }}>{cert}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section id="education" className="space-y-16 text-left">
              <h2 className="text-xs font-sans font-bold uppercase tracking-[0.4em]" style={{ color: 'var(--text-muted)' }}>06 / Education</h2>
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold tracking-tight" style={{ color: 'var(--text-body)' }}>Bachelor of Arts</h3>
                  <p className="font-medium" style={{ color: 'var(--text-muted)' }}>Obafemi Awolowo University (OAU)</p>
                </div>
                <span className="text-sm font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>2018 - 2022</span>
              </div>
            </section>

            {/* Final Footer */}
            <footer className="pt-24 border-t flex flex-col md:flex-row justify-between items-center gap-8" style={{ borderColor: 'var(--border-card)' }}>
              <p className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                © 2026 Emmanuel Odebiyi — Built for Growth
              </p>
              <div className="flex gap-8">
                <a href="https://www.linkedin.com/in/emmanuel-odebiyi" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest transition-colors" style={{ color: 'var(--text-muted)' }}>LinkedIn</a>
                <a href="https://x.com/Bobowrites_" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest transition-colors" style={{ color: 'var(--text-muted)' }}>Twitter</a>
                <a href="mailto:emmanuel@emmanuelodebiyi.name.ng" className="text-xs font-bold uppercase tracking-widest transition-colors" style={{ color: 'var(--text-muted)' }}>Email</a>
              </div>
            </footer>

          </div>
        </div>
      </div>
    </div>
  );
}
