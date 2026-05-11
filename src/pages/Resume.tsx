import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Download, 
  Mail, 
  Linkedin, 
  Twitter, 
  Globe, 
  MapPin, 
  Calendar, 
  ExternalLink,
  ChevronRight,
  Award,
  BookOpen,
  Briefcase,
  Wrench,
  User,
  ArrowLeft,
  Loader2
} from 'lucide-react';
import { Link } from 'react-router-dom';

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
    <div className="min-h-screen bg-[#0B0F19] text-white pt-32 pb-20 font-sans">
      <div className="max-w-5xl mx-auto px-6">
        
        {/* Header - Christie Tang Style */}
        <header className="mb-24 space-y-12">
          <div className="flex flex-col md:flex-row justify-between items-start gap-8">
            <div className="space-y-4">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-5xl sm:text-7xl md:text-8xl font-bold text-white tracking-tighter leading-snug"
              >
                Emmanuel <br /> Odebiyi
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="text-2xl text-gray-400 font-light tracking-tight"
              >
                AI Automation Specialist & SEO Strategist
              </motion.p>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-4 text-right md:pt-4"
            >
              <div className="flex flex-col gap-2 text-sm font-mono uppercase tracking-widest text-gray-500">
                <a href="mailto:emmanuelodebiyiwrites@gmail.com" className="hover:text-white transition-colors">emmanuelodebiyiwrites@gmail.com</a>
                <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="hover:text-white transition-colors">Twitter</a>
                <a href="#" className="hover:text-white transition-colors">Portfolio</a>
              </div>
              
              <AnimatePresence mode="wait">
                {!isPageLoaded ? (
                  <motion.div
                    key="loading"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="flex items-center justify-end gap-2 text-gray-500 text-xs font-mono uppercase tracking-widest"
                  >
                    <Loader2 size={14} className="animate-spin" /> Preparing PDF...
                  </motion.div>
                ) : (
                  <motion.a
                    key="download"
                    href="/Emmanuel_Odebiyi_Resume.pdf"
                    download="Emmanuel_Odebiyi_Resume.pdf"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-brand-gradient text-zinc-900 text-xs font-bold rounded-full hover:brightness-110 transition-all shadow-xl shadow-indigo-500/20 uppercase tracking-widest"
                  >
                    <Download size={14} /> Download PDF
                  </motion.a>
                )}
              </AnimatePresence>
            </motion.div>
          </div>
          
          <div className="h-px bg-white/10 w-full" />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-[200px_1fr] gap-20">
          
          {/* Sticky Navigation Sidebar */}
          <aside className="hidden lg:block">
            <nav className="sticky top-32 space-y-6">
              {sections.map((section) => (
                <button
                  key={section.id}
                  onClick={() => scrollToSection(section.id)}
                  className={`block text-xs font-bold uppercase tracking-[0.2em] transition-all text-left ${
                    activeSection === section.id 
                      ? 'text-brand-gradient' 
                      : 'text-gray-500 hover:text-white'
                  }`}
                >
                  {section.label}
                </button>
              ))}
              <div className="pt-12">
                <Link 
                  to="/portfolio"
                  className="inline-flex items-center gap-2 text-[10px] font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors"
                >
                  <ArrowLeft size={12} /> Back to Work
                </Link>
              </div>
            </nav>
          </aside>

          {/* Main Content Area */}
          <div className="space-y-32">
            
            {/* Summary */}
            <section id="summary" className="space-y-8">
              <h2 className="text-xs font-mono text-gray-600 uppercase tracking-[0.4em]">01 / Summary</h2>
              <p className="text-2xl md:text-5xl text-white font-bold leading-[1.1] tracking-tighter max-w-4xl">
                I build <span className="text-brand-gradient">autonomous growth engines</span> for SaaS companies. By combining AI-driven workflows with high-intent SEO strategy, I help brands scale their content operations and capture market share without increasing headcount.
              </p>
              <p className="text-xl text-gray-400 font-light leading-relaxed max-w-2xl">
                Currently helping B2B technology platforms automate their marketing pipelines and achieve predictable, data-backed ROI.
              </p>
            </section>

            {/* Experience */}
            <section id="experience" className="space-y-16">
              <h2 className="text-xs font-mono text-gray-600 uppercase tracking-[0.4em]">02 / Experience</h2>
              <div className="space-y-24">
                {experience.map((job, i) => (
                  <div key={i} className="grid grid-cols-1 md:grid-cols-[1fr_200px] gap-8 group">
                    <div className="space-y-6">
                      <div className="space-y-1">
                        <h3 className="text-2xl font-bold text-white tracking-tight group-hover:text-brand-gradient transition-colors">{job.role}</h3>
                        <p className="text-lg text-gray-400 font-medium">{job.company}</p>
                      </div>
                      <p className="text-gray-400 font-light leading-relaxed max-w-2xl italic">
                        {job.description}
                      </p>
                      <ul className="space-y-4">
                        {job.bullets.map((bullet, j) => (
                          <li key={j} className="flex items-start gap-4 text-gray-300 leading-relaxed">
                            <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-mono text-gray-500 uppercase tracking-widest">{job.period}</span>
                      <p className="text-xs text-gray-600 mt-1 uppercase tracking-widest">{job.location}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Skills */}
            <section id="skills" className="space-y-16">
              <h2 className="text-xs font-mono text-gray-600 uppercase tracking-[0.4em]">03 / Skills</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                {skillGroups.map((group, i) => (
                  <div key={i} className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-widest text-white border-b border-white/10 pb-4">{group.category}</h3>
                    <ul className="space-y-3">
                      {group.skills.map(skill => (
                        <li key={skill} className="text-gray-400 font-light flex items-center gap-2">
                          <ChevronRight size={14} className="text-brand-gradient" />
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>

            {/* Projects */}
            <section id="projects" className="space-y-16">
              <h2 className="text-xs font-mono text-gray-600 uppercase tracking-[0.4em]">04 / Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { title: "TechFlow Automation", desc: "Built a 520% ROI content machine for a SF-based SaaS.", link: "/portfolio" },
                  { title: "SEO Growth Engine", desc: "Scaled organic traffic by 65% for a major media brand.", link: "/portfolio" }
                ].map((project, i) => (
                  <Link 
                    key={i} 
                    to={project.link}
                    className="p-10 rounded-[2rem] bg-white/5 hover:bg-white/10 transition-all group border border-white/5 hover:border-white/20 backdrop-blur-sm"
                  >
                    <div className="flex justify-between items-start mb-6">
                      <h3 className="text-2xl font-bold text-white tracking-tight">{project.title}</h3>
                      <ExternalLink size={20} className="text-gray-600 group-hover:text-white transition-colors" />
                    </div>
                    <p className="text-gray-400 font-light leading-relaxed">{project.desc}</p>
                  </Link>
                ))}
              </div>
            </section>

            {/* Certifications */}
            <section id="certifications" className="space-y-16">
              <h2 className="text-xs font-mono text-gray-600 uppercase tracking-[0.4em]">05 / Certifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  "HubSpot Content Marketing Certified",
                  "Google Analytics Individual Qualification",
                  "Semrush SEO Fundamentals",
                  "Zapier Automation Expert"
                ].map((cert, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 border border-white/10 rounded-2xl hover:border-white/20 bg-white/5 backdrop-blur-sm transition-colors">
                    <Award size={20} className="text-brand-gradient" />
                    <span className="font-medium text-white tracking-tight">{cert}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Education */}
            <section id="education" className="space-y-16">
              <h2 className="text-xs font-mono text-gray-600 uppercase tracking-[0.4em]">06 / Education</h2>
              <div className="flex flex-col md:flex-row justify-between items-start gap-4">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-white tracking-tight">Bachelor of Arts</h3>
                  <p className="text-gray-400 font-medium">Obafemi Awolowo University (OAU)</p>
                </div>
                <span className="text-sm font-mono text-gray-500 uppercase tracking-widest">2018 - 2022</span>
              </div>
            </section>

            {/* Final Footer */}
            <footer className="pt-24 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8">
              <p className="text-gray-600 text-xs font-mono uppercase tracking-widest">
                © 2026 Emmanuel Odebiyi — Built for Growth
              </p>
              <div className="flex gap-8">
                <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">LinkedIn</a>
                <a href="#" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Twitter</a>
                <a href="mailto:emmanuelodebiyiwrites@gmail.com" className="text-xs font-bold uppercase tracking-widest text-gray-500 hover:text-white transition-colors">Email</a>
              </div>
            </footer>

          </div>
        </div>
      </div>
    </div>
  );
}
