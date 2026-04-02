import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useTransform } from 'motion/react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Search, 
  Cpu, 
  Layers, 
  Rocket,
  ArrowRight,
  Mail,
  User,
  MessageSquare,
  BookOpen,
  Target,
  Bot,
  Award,
  GraduationCap
} from 'lucide-react';
import { SEO } from '../components/SEO';

const skills = [
  { name: 'SEO & Content Strategy', desc: 'Keyword research, technical SEO, SERP analysis, and topic cluster architecture.', icon: <Search size={20} /> },
  { name: 'Marketing Automation', desc: 'n8n workflows, Zapier & Make.com, API integration, and real-time dashboards.', icon: <Zap size={20} /> },
  { name: 'AI Implementation', desc: 'Prompt engineering, custom ChatGPT workflows, and brand voice preservation.', icon: <Bot size={20} /> },
  { name: 'Technical Capabilities', desc: 'Python scripting, OCR implementation, REST APIs, and microservices design.', icon: <Cpu size={20} /> },
];

const certifications = [
  { 
    year: '2025', 
    title: 'AI Automation & Process Design', 
    issuer: 'n8n Academy',
  },
  { 
    year: '2025', 
    title: 'Marketing Automation Specialist', 
    issuer: 'Coursera',
  },
  { 
    year: '2025', 
    title: 'API Integration & Workflow Automation', 
    issuer: 'Implementation Hub',
  },
  { 
    year: '2025', 
    title: 'HubSpot Marketing Software', 
    issuer: 'HubSpot Academy',
  },
  { 
    year: '2024', 
    title: 'Advanced Search Engine Optimization', 
    issuer: 'Semrush (ID: 372617)',
  },
  { 
    year: '2024', 
    title: 'Certified Copywriter', 
    issuer: 'Living Your Dream Africa',
  },
  { 
    year: '2023', 
    title: 'Prompt Engineering for Generative AI', 
    issuer: 'LinkedIn Learning',
  },
  { 
    year: 'Education', 
    title: 'Bachelor\'s Degree, Construction Economics', 
    issuer: 'Obafemi Awolowo University',
    icon: <GraduationCap size={20} />
  },
];

const resultsData = [
  { metric: "Traffic Growth", result: "50–65% increase within 3–6 months" },
  { metric: "Time Savings", result: "10–20 hours reclaimed per week" },
  { metric: "CTR Improvement", result: "35–40% boost" },
  { metric: "ROI Delivered", result: "300–520%" },
  { metric: "Client Retention", result: "95%+ (partnerships lasting 6–24 months)" }
];

const InteractivePanel = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  path, 
  accentColor 
}: { 
  title: string; 
  subtitle: string; 
  icon: any; 
  path: string; 
  accentColor: string;
}) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => navigate(path)}
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.98 }}
      className="relative h-[60vh] md:h-[80vh] w-full cursor-pointer overflow-hidden group rounded-[3rem] border border-zinc-100 shadow-2xl shadow-zinc-200/50"
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
    >
      <motion.div 
        className={`absolute inset-0 z-0 transition-colors duration-500 ${isHovered ? accentColor : 'bg-white'}`}
      />
      <motion.div 
        animate={{ scale: isHovered ? 1.1 : 1 }}
        transition={{ duration: 0.8 }}
        className="absolute inset-0 z-0 opacity-10 pointer-events-none"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-transparent to-zinc-200" />
      </motion.div>

      <div className="relative z-10 h-full p-12 lg:p-20 flex flex-col justify-between">
        <div className="space-y-6">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-white shadow-xl transition-colors duration-500 ${isHovered ? 'bg-zinc-900' : 'bg-zinc-800'}`}>
            <Icon size={32} />
          </div>
          <div className="space-y-2">
            <h2 className={`text-4xl lg:text-6xl font-bold tracking-tight transition-colors duration-500 text-zinc-900`}>
              {title}
            </h2>
            <p className="text-xl text-zinc-500 font-light max-w-md">
              {subtitle}
            </p>
          </div>
        </div>

        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex items-center gap-3 text-zinc-900 font-bold text-lg"
            >
              <span>Click to learn more</span>
              <ArrowRight size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const TimelineItem = ({ item, index }: { item: any; index: number; key?: any }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [index % 2 === 0 ? -50 : 50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 mb-16 last:mb-0">
      <div className={`hidden md:flex items-center ${index % 2 === 0 ? 'justify-end text-right' : 'order-last justify-start text-left'}`}>
        <motion.div style={{ opacity, x, scale }} className="space-y-2">
          <span className="text-4xl font-bold text-brand-gradient font-mono tracking-tighter">{item.year}</span>
          <p className="text-xs font-mono text-zinc-400 uppercase tracking-[0.2em]">{item.issuer}</p>
        </motion.div>
      </div>

      <div className={`${index % 2 === 0 ? 'md:order-last' : ''}`}>
        <motion.div 
          style={{ opacity, scale }}
          className="p-8 rounded-[2rem] bg-zinc-900 border border-zinc-800 shadow-xl shadow-zinc-950/30 hover:shadow-indigo-500/10 transition-all group relative overflow-hidden"
        >
          <div className="md:hidden flex items-center gap-3 mb-4">
            <span className="text-sm font-mono text-brand-gradient font-bold">{item.year}</span>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{item.issuer}</span>
          </div>
          <h4 className="text-xl font-bold text-white mb-2 flex items-center gap-3">
            {item.icon || <Award size={20} className="text-brand-gradient" />}
            {item.title}
          </h4>
        </motion.div>
      </div>

      <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20">
        <motion.div 
          style={{ scale: scrollYProgress }}
          className="w-8 h-8 rounded-full bg-zinc-950 border-4 border-indigo-500 flex items-center justify-center"
        >
          <div className="w-2 h-2 rounded-full bg-brand-gradient animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};

export default function About() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <div className="pt-0 pb-20 bg-white">
      <SEO 
        title="About Emmanuel Odebiyi | From Burnout Writer to Marketing Automation Specialist"
        description="How I went from drowning in content deadlines to building AI-powered marketing systems that deliver 520% ROI. My story, methodology, and why it works."
        keywords="marketing automation expert, content automation specialist, AI content systems, SEO and content strategist Nigeria"
      />
      {/* Hero Section with Personal Narrative Image */}
      <section className="relative h-screen min-h-[700px] flex items-end justify-start overflow-hidden bg-zinc-950">
        {/* Background Image with Focal Point Adjustment */}
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/about-hero.jpg" 
            alt="Emmanuel Odebiyi" 
            className="w-full h-full object-cover object-[center_20%] scale-105 grayscale brightness-125 contrast-150 opacity-40 mix-blend-overlay"
          />
          {/* Halftone / Dither Pattern Overlay */}
          <div className="absolute inset-0 z-10 opacity-30 pointer-events-none mix-blend-multiply" 
               style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '4px 4px' }} />
          
          {/* Edge Fades & Soft Vignette to guide eye to text/face */}
          <div className="absolute inset-0 z-20 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
          <div className="absolute inset-0 z-20 bg-gradient-to-r from-zinc-950 via-zinc-950/20 to-transparent pointer-events-none" />
        </div>

        <div className="max-w-6xl mx-auto px-6 lg:px-12 pb-32 relative z-30 text-left space-y-8">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-[10px] font-mono text-white/70 tracking-[0.4em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gradient animate-pulse" />
            The Origin Story
          </motion.div>
          
          <div className="space-y-6">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white leading-[0.9] drop-shadow-2xl max-w-4xl">
              I Used to Be the <span className="text-zinc-500">Burnout.</span><br />
              Now I Build the System That <span className="text-brand-gradient">Prevents It.</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-zinc-300 font-medium leading-relaxed max-w-2xl opacity-90">
              I went from drowning in deadlines to designing automated marketing engines that deliver <strong className="text-white font-black underline decoration-indigo-500 underline-offset-8">520% ROI</strong>.
            </p>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 w-6 h-10 rounded-full border-2 border-white/20 flex justify-center p-2"
        >
          <div className="w-1 h-2 bg-brand-gradient rounded-full" />
        </motion.div>
      </section>

      {/* Opening narrative block */}
      <section className="py-32 bg-white relative z-20">
        <div className="max-w-3xl mx-auto px-6 space-y-12 text-xl md:text-2xl text-zinc-600 font-light leading-relaxed">
          {[
            {
              content: "Most content marketers burn out trying to keep up. I burned out too — and then I reverse-engineered why, and built something better.",
              emphasis: true,
              dropCap: true
            },
            {
              content: "Growing businesses face a brutal contradiction: content marketing drives growth, but producing it consistently is expensive, time-consuming, and unsustainable. So most businesses are stuck choosing between doing it badly or not doing it at all.",
              emphasis: false
            },
            {
              content: "I solve that exact problem.",
              highlight: true
            },
            {
              content: "I design and build automated marketing systems that deliver enterprise-level content output — without the enterprise price tag, the management overhead, or the constant scramble to keep things moving.",
              point: "enterprise-level content output"
            },
            {
              content: "Marketing that runs while you build. That's what I create.",
              final: true
            }
          ].map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.21, 0.45, 0.32, 0.9] }}
            >
              {item.dropCap ? (
                <p>
                  <span className="first-letter:text-7xl first-letter:font-black first-letter:text-zinc-900 first-letter:mr-3 first-letter:float-left">
                    {item.content}
                  </span>
                </p>
              ) : item.highlight ? (
                <p className="text-zinc-900 font-bold text-3xl md:text-4xl tracking-tight">
                  {item.content}
                </p>
              ) : item.final ? (
                <p className="text-brand-gradient font-black text-2xl md:text-3xl italic">
                  {item.content}
                </p>
              ) : (
                <p>
                  {item.point ? (
                    item.content.split(item.point).map((part, i, arr) => (
                      <React.Fragment key={i}>
                        {part}
                        {i < arr.length - 1 && <strong className="text-zinc-900 font-black underline decoration-indigo-500 decoration-2 underline-offset-4">{item.point}</strong>}
                      </React.Fragment>
                    ))
                  ) : item.content}
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </section>

      {/* Side-by-Side Interactive Panels */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InteractivePanel 
            title="My Story"
            subtitle="The journey from a writer to an automation specialist, and the lessons learned along the way."
            icon={BookOpen}
            path="/my-story"
            accentColor="bg-deep-space-blue-50"
          />
          <InteractivePanel 
            title="My Approach"
            subtitle="Data, Systems, and Zero Guesswork. The methodology behind the results."
            icon={Target}
            path="/my-approach"
            accentColor="bg-deep-space-blue-50"
          />
        </div>
      </section>

      {/* Skills & Expertise */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">The Arsenal</h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900">What I Actually Do</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-8 rounded-3xl bg-zinc-50 border border-zinc-100 space-y-6 group hover:border-deep-space-blue-200 transition-all shadow-xl shadow-zinc-100"
              >
                <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-md">
                  <div className="text-brand-gradient group-hover:scale-110 transition-transform">
                    {skill.icon}
                  </div>
                </div>
                <div className="space-y-4">
                  <p className="font-bold text-zinc-900 text-xl">{skill.name}</p>
                  <p className="text-sm text-zinc-500 font-light leading-relaxed">{skill.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          
          <div className="text-center pt-8">
            <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest max-w-3xl mx-auto leading-loose">
              <strong className="text-brand-gradient">Tools I Use:</strong> Semrush • Ahrefs • Ubersuggest • Surfer SEO • Frase • n8n • Zapier • Make.com • HubSpot 
            </p>
          </div>
        </div>
      </section>

      {/* Results Summary Section */}
      <section className="py-32 bg-zinc-50 border-y border-zinc-100">
        <div className="max-w-5xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">Results Summary</h2>
            <h3 className="text-5xl md:text-6xl font-bold tracking-tight text-zinc-900">The Pattern Repeats. Client After Client.</h3>
          </div>

          <div className="bg-white rounded-[3rem] p-12 shadow-2xl shadow-zinc-200/50 border border-zinc-100">
            <div className="divide-y divide-zinc-100">
              {resultsData.map((row, i) => (
                <div key={i} className="py-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <span className="text-xl font-bold text-zinc-900">{row.metric}</span>
                  <span className="text-brand-gradient text-lg font-medium">{row.result}</span>
                </div>
              ))}
            </div>
            <div className="pt-12 mt-12 border-t border-zinc-100">
              <p className="text-zinc-500 font-light leading-relaxed">
                <strong className="text-zinc-900 font-semibold">What this means for your business:</strong> You publish 4–8x more content, consistently. Organic traffic grows 50–65% within 6 months. Your team reclaims 10–20 hours every single week. Content stops being a cost center and starts generating measurable revenue.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications - Vertical Timeline */}
      <section className="py-32 bg-zinc-950 text-white max-w-7xl mx-auto rounded-[3rem] px-6 overflow-hidden my-20">
        <div className="text-center space-y-4 mb-32">
          <h2 className="text-brand-gradient font-mono text-xs uppercase tracking-[0.3em]">Education & Credentials</h2>
          <h3 className="text-5xl md:text-6xl font-bold tracking-tight">Certifications</h3>
        </div>

        <div ref={timelineRef} className="relative max-w-4xl mx-auto">
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-zinc-800 -translate-x-1/2 z-0" />
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-deep-space-blue-400 to-deep-space-blue-600 -translate-x-1/2 z-10"
          />

          <div className="relative z-20">
            {certifications.map((item, i) => (
              <TimelineItem 
                key={i} 
                item={item} 
                index={i} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact-cta" className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">Next Steps</h2>
            <h3 className="text-5xl md:text-6xl font-bold text-zinc-900 tracking-tight leading-snug">Ready to Build <br/>Something That Works?</h3>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-8">
            <a 
              href="/resume"
              className="px-10 py-5 border-2 border-zinc-200 text-zinc-900 font-bold rounded-[2rem] hover:bg-zinc-50 transition-all flex items-center justify-center gap-3"
            >
              Download PDF Resume <ArrowRight size={20} />
            </a>
            <Link 
              to="/contact"
              className="px-10 py-5 bg-zinc-900 text-white font-bold rounded-[2rem] hover:bg-brand-gradient transition-all shadow-xl shadow-zinc-200 flex items-center justify-center gap-3"
            >
              Book Your Call <ArrowRight size={20} />
            </Link>
          </div>
          
          <div className="flex justify-center flex-wrap items-center gap-8 text-zinc-400 font-mono text-xs uppercase tracking-widest pt-8">
            <span className="flex items-center gap-2"><Mail size={14} className="text-brand-gradient" /> Free 30-minute call</span>
            <span className="flex items-center gap-2"><MessageSquare size={14} className="text-brand-gradient" /> No pitch, just strategy</span>
          </div>
        </div>
      </section>
    </div>
  );
}
