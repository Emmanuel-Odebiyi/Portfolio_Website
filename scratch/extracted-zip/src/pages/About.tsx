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
  CheckCircle2,
  ArrowRight,
  Mail,
  Linkedin,
  Send,
  User,
  MessageSquare,
  FileText,
  BookOpen,
  Target,
  Bot,
  Calendar
} from 'lucide-react';

const careerTimeline = [
  { 
    year: '2022', 
    role: 'Web Content Writer', 
    company: 'Freelance',
    description: 'Started my journey writing high-quality blog posts and articles for various clients, focusing on conversion and engagement.'
  },
  { 
    year: '2022', 
    role: 'Content Editor', 
    company: 'The Scoove Africa',
    description: 'Managed a team of writers, ensuring content quality and consistency while streamlining the editorial process.'
  },
  { 
    year: '2023', 
    role: 'Senior SEO Writer', 
    company: 'TechFlow Solutions',
    description: 'Developed and executed SEO strategies, driving significant traffic growth and improving search rankings for key terms.'
  },
  { 
    year: '2024', 
    role: 'Content Marketing Automation', 
    company: 'Independent',
    description: 'Began building automated systems to scale content production and distribution, reducing manual effort by 70%.'
  },
  { 
    year: '2025', 
    role: 'AI Automation Specialist', 
    company: 'OAU Library',
    description: 'Implementing AI-driven solutions to streamline library operations and research, enhancing data accessibility.'
  },
  { 
    year: '2025', 
    role: 'Consultant, B2B SaaS', 
    company: 'Current',
    description: 'Helping SaaS companies scale their content marketing through custom automation and AI-integrated systems.'
  },
];

const skills = [
  { name: 'Zapier Flows', desc: 'Automating complex workflows between 5000+ apps.', icon: <Zap size={20} /> },
  { name: 'Quick n8n Jobs', desc: 'Building self-hosted automation workflows for data processing.', icon: <Layers size={20} /> },
  { name: 'Make.com Logic', desc: 'Creating advanced visual automations with complex logic.', icon: <Cpu size={20} /> },
  { name: 'Airtable Masters', desc: 'Designing relational databases for content and operations.', icon: <Layers size={20} /> },
  { name: 'Email Campaigns', desc: 'Automating personalized email sequences and newsletters.', icon: <Mail size={20} /> },
  { name: 'Dashboards', desc: 'Building real-time performance dashboards for marketing metrics.', icon: <Search size={20} /> },
  { name: 'AI Systems', desc: 'Integrating LLMs into business workflows for content and support.', icon: <Bot size={20} /> },
  { name: 'HubSpot Power', desc: 'Optimizing CRM workflows and marketing automation.', icon: <Rocket size={20} /> },
];

const InteractivePanel = ({ 
  title, 
  subtitle, 
  icon: Icon, 
  path, 
  accentColor, 
  bgImage 
}: { 
  title: string; 
  subtitle: string; 
  icon: any; 
  path: string; 
  accentColor: string;
  bgImage?: string;
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
      {/* Background Tint Shift */}
      <motion.div 
        className={`absolute inset-0 z-0 transition-colors duration-500 ${isHovered ? accentColor : 'bg-white'}`}
      />

      {/* Background Visual Animation */}
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
            <h2 className={`text-5xl lg:text-7xl font-bold tracking-tight transition-colors duration-500 ${isHovered ? 'text-zinc-900' : 'text-zinc-900'}`}>
              {title}
            </h2>
            <p className="text-xl text-zinc-500 font-light max-w-md">
              {subtitle}
            </p>
          </div>
        </div>

        {/* Content Reveal on Hover */}
        <AnimatePresence>
          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="flex items-center gap-3 text-zinc-900 font-bold text-lg"
            >
              <span>Click to learn more about {title}</span>
              <ArrowRight size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const TimelineItem = ({ item, index, isLast }: { item: any; index: number; isLast: boolean; key?: any }) => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"]
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5], [0, 1]);
  const x = useTransform(scrollYProgress, [0, 0.5], [index % 2 === 0 ? -50 : 50, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.8, 1]);

  return (
    <div ref={ref} className="relative grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-20 mb-20 last:mb-0">
      {/* Date/Year for Desktop (Alternating) */}
      <div className={`hidden md:flex items-center ${index % 2 === 0 ? 'justify-end text-right' : 'order-last justify-start text-left'}`}>
        <motion.div style={{ opacity, x, scale }} className="space-y-2">
          <span className="text-4xl font-bold text-zinc-200 font-mono tracking-tighter">{item.year}</span>
          <p className="text-xs font-mono text-emerald-500 uppercase tracking-[0.2em]">{item.company}</p>
        </motion.div>
      </div>

      {/* Content Card */}
      <div className={`${index % 2 === 0 ? 'md:order-last' : ''}`}>
        <motion.div 
          style={{ opacity, scale }}
          className="p-8 rounded-[2.5rem] bg-white border border-zinc-100 shadow-xl shadow-zinc-200/30 hover:shadow-emerald-500/5 transition-all group relative overflow-hidden"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity" />
          <div className="md:hidden flex items-center gap-3 mb-4">
            <span className="text-sm font-mono text-emerald-500 font-bold">{item.year}</span>
            <span className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">{item.company}</span>
          </div>
          <h4 className="text-2xl font-bold text-zinc-900 mb-4">{item.role}</h4>
          <p className="text-zinc-500 font-light leading-relaxed">{item.description}</p>
        </motion.div>
      </div>

      {/* Central Point */}
      <div className="absolute left-0 md:left-1/2 top-0 md:top-1/2 -translate-x-1/2 md:-translate-y-1/2 z-20">
        <motion.div 
          style={{ scale: scrollYProgress }}
          className="w-10 h-10 rounded-full bg-white border-4 border-emerald-500 shadow-lg shadow-emerald-500/20 flex items-center justify-center"
        >
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
        </motion.div>
      </div>
    </div>
  );
};

export default function About() {
  const [formStatus, setFormStatus] = useState<'idle' | 'sending' | 'sent'>('idle');
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('sending');
    setTimeout(() => setFormStatus('sent'), 1500);
  };

  return (
    <div className="pt-32 pb-20 bg-white selection:bg-emerald-100 selection:text-emerald-900">
      {/* Header Section */}
      <section className="max-w-7xl mx-auto px-6 mb-20 text-center space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
          About Me
        </motion.div>
        <h1 className="text-6xl md:text-8xl font-bold tracking-tight text-zinc-900">
          Scaling with <span className="text-zinc-300">Purpose.</span>
        </h1>
      </section>

      {/* Side-by-Side Interactive Panels */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <InteractivePanel 
            title="My Story"
            subtitle="The journey from a writer to an automation specialist, and the lessons learned along the way."
            icon={BookOpen}
            path="/my-story"
            accentColor="bg-emerald-50"
          />
          <InteractivePanel 
            title="My Approach"
            subtitle="The methodology behind the results: Authority, Data, Simplicity, and Action."
            icon={Target}
            path="/my-approach"
            accentColor="bg-indigo-50"
          />
        </div>
      </section>

      {/* Vertical Stacked Sections */}
      
      {/* Skills, Expertise & Certifications */}
      <section className="py-32 bg-zinc-900 text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 relative z-10 space-y-24">
          <div className="text-center space-y-4">
            <h2 className="text-emerald-500 font-mono text-xs uppercase tracking-[0.3em]">The Arsenal</h2>
            <h3 className="text-5xl md:text-7xl font-bold tracking-tight">Skills & Expertise</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {skills.map((skill, i) => (
              <motion.div 
                key={i}
                whileHover={{ scale: 1.05 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 space-y-6 group hover:bg-white/10 transition-all"
              >
                <div className="w-12 h-12 rounded-2xl bg-emerald-500 flex items-center justify-center text-white shadow-lg shadow-emerald-500/20">
                  {skill.icon}
                </div>
                <div className="space-y-2">
                  <p className="font-bold text-white">{skill.name}</p>
                  <p className="text-xs text-zinc-400 font-light leading-relaxed">{skill.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* Career Milestones - Vertical Timeline */}
      <section className="py-32 max-w-7xl mx-auto px-6 overflow-hidden">
        <div className="text-center space-y-4 mb-32">
          <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">Career Pathway</h2>
          <h3 className="text-5xl md:text-7xl font-bold text-zinc-900 tracking-tight">My Journey So Far</h3>
        </div>

        <div ref={timelineRef} className="relative max-w-5xl mx-auto">
          {/* Vertical Progress Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-zinc-100 -translate-x-1/2 z-0" />
          <motion.div 
            style={{ scaleY, originY: 0 }}
            className="absolute left-0 md:left-1/2 top-0 bottom-0 w-1 bg-gradient-to-b from-emerald-400 to-emerald-600 -translate-x-1/2 z-10"
          />

          <div className="relative z-20">
            {careerTimeline.map((item, i) => (
              <TimelineItem 
                key={i} 
                item={item} 
                index={i} 
                isLast={i === careerTimeline.length - 1} 
              />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact-cta" className="py-32 bg-zinc-50">
        <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
          <div className="space-y-4">
            <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">Get In Touch</h2>
            <h3 className="text-5xl font-bold text-zinc-900 tracking-tight">Let's Build Something.</h3>
            <p className="text-xl text-zinc-500 font-light max-w-2xl mx-auto">
              Ready to automate your growth? Start our guided conversation to see how we can scale your business together.
            </p>
          </div>

          <div className="flex flex-col items-center gap-8">
            <Link 
              to="/contact"
              className="px-12 py-6 bg-zinc-900 text-white font-bold text-xl rounded-[2rem] hover:bg-emerald-600 transition-all shadow-2xl shadow-zinc-200 flex items-center gap-3"
            >
              Start Guided Onboarding <ArrowRight size={24} />
            </Link>
            
            <div className="flex items-center gap-8 text-zinc-400 font-mono text-xs uppercase tracking-widest">
              <span className="flex items-center gap-2"><Mail size={14} className="text-emerald-500" /> Response in &lt; 24h</span>
              <span className="flex items-center gap-2"><MessageSquare size={14} className="text-emerald-500" /> 100% Human Review</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
