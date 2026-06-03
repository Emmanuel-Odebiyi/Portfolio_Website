import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Search, 
  Cpu, 
  Layers, 
  Rocket, 
  CheckCircle2, 
  ArrowRight, 
  Bot, 
  BarChart3, 
  Globe, 
  Terminal,
  Mail,
  Workflow,
  Sparkles,
  Target
} from 'lucide-react';

const coreServices = [
  {
    title: "Content Marketing Automation",
    description: "You know content drives growth. But creating it consistently? That's the nightmare. I build systems that automate the heavy lifting.",
    icon: <Workflow className="text-emerald-500" size={32} />,
    color: "bg-emerald-50",
    accent: "emerald"
  },
  {
    title: "SEO Strategy & Automation",
    description: "Your content isn't being found. You're publishing regularly, but Google doesn't care. I align your content with search intent automatically.",
    icon: <Search className="text-indigo-500" size={32} />,
    color: "bg-indigo-50",
    accent: "indigo"
  },
  {
    title: "Business Process Automation",
    description: "Your team is drowning in repetitive tasks. Leads fall through the cracks. I connect your tools to create a seamless, hands-off machine.",
    icon: <Cpu className="text-amber-500" size={32} />,
    color: "bg-amber-50",
    accent: "amber"
  }
];

const deepDiveServices = [
  {
    id: "01",
    title: "SEO Content Strategy & Optimization",
    details: "End-to-end keyword research, content planning, on-page optimization, and scalable content creation.",
    outcomes: "Higher search rankings, 65%+ organic growth.",
    tools: ["Semrush", "Ahrefs", "Surfer SEO", "Frase", "WordPress"],
    icon: <Target size={24} />
  },
  {
    id: "02",
    title: "Marketing Automation Pipeline Design",
    details: "Architect and implement custom lead nurturing and content distribution flows.",
    outcomes: "Accelerated funnel velocity, 40+ articles/month scaled.",
    tools: ["HubSpot", "ActiveCampaign", "Make.com", "Buffer"],
    icon: <Workflow size={24} />
  },
  {
    id: "03",
    title: "AI-Enhanced Content Operations",
    details: "AI workflows for content ideation, generation, and refinement. Custom GPTs for content briefs.",
    outcomes: "Up to 80% time savings, 91% content accuracy.",
    tools: ["OpenAI API", "Tesseract OCR", "Python", "n8n"],
    icon: <Bot size={24} />
  },
  {
    id: "04",
    title: "Workflow Automation & Integrations",
    details: "End-to-end system automation — content publishing, reporting, asset management.",
    outcomes: "Flawless execution, zero repetitive manual labor.",
    tools: ["n8n", "Zapier", "Make.com", "Google Workspace"],
    icon: <Zap size={24} />
  },
  {
    id: "05",
    title: "Technical SEO Audits & Implementation",
    details: "Robust site health assessment (site speed, indexing, Core Web Vitals) with direct implementation.",
    outcomes: "Top-10 rankings, crawling/indexing improvements.",
    tools: ["Semrush", "Ahrefs", "Google Search Console", "Screaming Frog"],
    icon: <Terminal size={24} />
  },
  {
    id: "06",
    title: "Analytics, Reporting & ROI Optimization",
    details: "Custom dashboards, attribution pipelines, and executive-level reports.",
    outcomes: "Confident growth decisions, 520% ROI.",
    tools: ["Google Analytics", "Google Data Studio", "HubSpot"],
    icon: <BarChart3 size={24} />
  }
];

const faqs = [
  {
    question: "How long does it take to see results?",
    answer: "Automation results are immediate in terms of time saved. For SEO, we typically see significant movement in 3-6 months, though our automated systems often accelerate this."
  },
  {
    question: "Do I need to hire a developer to maintain these systems?",
    answer: "No. I build these systems to be user-friendly and self-sustaining. I also provide documentation and training for your existing team."
  },
  {
    question: "Which tools do you specialize in?",
    answer: "I am an expert in Zapier, Make.com, n8n, HubSpot, and various AI models (OpenAI, Anthropic). I pick the tool that fits your budget and complexity."
  }
];

export default function Services() {
  return (
    <div className="pt-32 pb-20 bg-white selection:bg-emerald-100 selection:text-emerald-900">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Services & Solutions
            </motion.div>
            <h1 className="text-6xl md:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.1]">
              Stop Managing Marketing. <br />
              <span className="text-zinc-300">Start Scaling Growth.</span>
            </h1>
            <p className="text-xl text-zinc-500 font-light leading-relaxed max-w-xl">
              The automation systems that turn your content chaos into consistent revenue—without hiring a full team.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                to="/contact"
                className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-zinc-200 flex items-center gap-2"
              >
                Get a Proposal <ArrowRight size={18} />
              </Link>
              <Link 
                to="/portfolio"
                className="px-8 py-4 bg-white text-zinc-900 font-bold rounded-2xl border border-zinc-200 hover:bg-zinc-50 transition-all"
              >
                View Case Studies
              </Link>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square rounded-[4rem] bg-zinc-50 border border-zinc-100 overflow-hidden relative group">
              <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-indigo-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-12 w-full">
                  {[Zap, Search, Cpu, Layers].map((Icon, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="aspect-square rounded-3xl bg-white border border-zinc-100 shadow-sm flex items-center justify-center text-zinc-400 group-hover:text-emerald-500 transition-colors"
                    >
                      <Icon size={48} strokeWidth={1} />
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
            {/* Floating Badge */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -right-6 p-6 bg-white rounded-3xl shadow-2xl border border-zinc-100 space-y-2"
            >
              <p className="text-3xl font-bold text-zinc-900">520%</p>
              <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Average ROI</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="max-w-4xl mx-auto px-6 mb-32 text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight">
          Enterprise results without enterprise complexity.
        </h2>
        <p className="text-xl text-zinc-500 font-light leading-relaxed">
          I build intelligent marketing systems for growing businesses. You get systematic content production, SEO that actually ranks, and automated workflows that run while you sleep.
        </p>
        <div className="flex justify-center gap-8 text-sm font-mono text-zinc-400 uppercase tracking-widest">
          <span>No retainers</span>
          <span>No bloated contracts</span>
          <span>Just systems</span>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">The Foundation</h2>
          <h3 className="text-5xl font-bold text-zinc-900 tracking-tight">Core Services</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {coreServices.map((service, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -10 }}
              className={`p-10 rounded-[3rem] ${service.color} border border-zinc-100 space-y-8 group transition-all`}
            >
              <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform">
                {service.icon}
              </div>
              <div className="space-y-4">
                <h4 className="text-2xl font-bold text-zinc-900">{service.title}</h4>
                <p className="text-zinc-600 font-light leading-relaxed">
                  {service.description}
                </p>
              </div>
              <button className="flex items-center gap-2 text-sm font-bold text-zinc-900 hover:gap-4 transition-all">
                Learn more <ArrowRight size={16} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Specialized Tools Section */}
      <section className="py-32 bg-zinc-900 text-white relative overflow-hidden mb-32">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h3 className="text-5xl font-bold tracking-tight leading-tight">
                Specialized SEO & <br />
                <span className="text-emerald-500">Automation Stack.</span>
              </h3>
              <p className="text-xl text-zinc-400 font-light leading-relaxed">
                Each solution is designed for maximum impact and efficiency, built on top-tier tools. Whether you need advanced technical SEO or seamless automation, you’ll receive tailored execution focused on growth metrics.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "ROI Focused", value: "520%" },
                  { label: "Organic Gains", value: "65%+" },
                  { label: "Time Savings", value: "80%" },
                  { label: "Accuracy", value: "91%" }
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {["Zapier", "n8n", "Make", "HubSpot", "Python", "OpenAI", "Semrush", "Ahrefs", "Surfer"].map((tool, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xs font-mono text-zinc-500 uppercase tracking-widest hover:bg-emerald-500/20 hover:text-emerald-400 transition-all cursor-default">
                  {tool}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
      </section>

      {/* Service Deep Dive - Data Grid Style */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center space-y-4 mb-20">
          <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">The Details</h2>
          <h3 className="text-5xl font-bold text-zinc-900 tracking-tight">Service Deep Dive</h3>
        </div>
        
        <div className="border-t border-zinc-100">
          {deepDiveServices.map((service, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="group grid grid-cols-1 md:grid-cols-[80px_1.5fr_1fr_1fr] gap-8 py-12 border-b border-zinc-100 hover:bg-zinc-50 transition-colors px-8 -mx-8 rounded-xl"
            >
              <div className="text-4xl font-bold text-zinc-100 group-hover:text-emerald-500 transition-colors font-mono">
                {service.id}
              </div>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-zinc-100 text-zinc-900 group-hover:bg-zinc-900 group-hover:text-white transition-colors">
                    {service.icon}
                  </div>
                  <h4 className="text-2xl font-bold text-zinc-900">{service.title}</h4>
                </div>
                <p className="text-zinc-500 font-light leading-relaxed max-w-md">
                  {service.details}
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Expected Outcomes</p>
                <p className="text-sm font-bold text-zinc-900">{service.outcomes}</p>
              </div>
              <div className="space-y-2">
                <p className="text-[10px] font-mono text-zinc-400 uppercase tracking-widest">Tech Stack</p>
                <div className="flex flex-wrap gap-2">
                  {service.tools.map((tool, j) => (
                    <span key={j} className="px-2 py-1 rounded-md bg-zinc-100 text-[10px] font-mono text-zinc-500">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Process Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-zinc-900 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
          <div className="relative z-10 space-y-20">
            <div className="text-center space-y-4">
              <h2 className="text-emerald-500 font-mono text-xs uppercase tracking-[0.3em]">The Methodology</h2>
              <h3 className="text-5xl md:text-6xl font-bold text-white tracking-tight">My Process: From Idea to ROI</h3>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {[
                { step: "01", title: "Discovery", desc: "Clarifying goals and success metrics." },
                { step: "02", title: "Research", desc: "In-depth site and workflow audit." },
                { step: "03", title: "Strategy", desc: "Creating actionable, scalable plans." },
                { step: "04", title: "Execution", desc: "Seamless implementation with advanced tools." },
                { step: "05", title: "Scaling", desc: "Reporting, optimizing, and scaling impact." }
              ].map((item, i) => (
                <div key={i} className="space-y-6 relative">
                  <div className="text-6xl font-bold text-white/5 font-mono absolute -top-8 -left-4">
                    {item.step}
                  </div>
                  <div className="space-y-2 relative z-10">
                    <h4 className="text-xl font-bold text-white">{item.title}</h4>
                    <p className="text-sm text-zinc-500 font-light leading-relaxed">{item.desc}</p>
                  </div>
                  {i < 4 && (
                    <div className="hidden md:block absolute top-4 -right-4 text-white/10">
                      <ArrowRight size={24} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full" />
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-4xl mx-auto px-6 mb-32">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">Common Questions</h2>
          <h3 className="text-5xl font-bold text-zinc-900 tracking-tight">FAQ</h3>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details key={i} className="group bg-zinc-50 rounded-3xl border border-zinc-100 overflow-hidden transition-all">
              <summary className="flex items-center justify-between p-8 cursor-pointer list-none">
                <span className="text-xl font-bold text-zinc-900">{faq.question}</span>
                <div className="w-8 h-8 rounded-full bg-white border border-zinc-200 flex items-center justify-center group-open:rotate-180 transition-transform">
                  <ArrowRight size={16} className="rotate-90" />
                </div>
              </summary>
              <div className="px-8 pb-8 text-zinc-500 font-light leading-relaxed">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-emerald-500 rounded-[4rem] p-12 md:p-24 text-center space-y-10 relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              Ready to automate <br /> your growth?
            </h3>
            <p className="text-xl text-emerald-100 font-light max-w-2xl mx-auto">
              Every business is unique. Bespoke solutions and flexible packages available to meet your exact growth stage and needs.
            </p>
            <div className="pt-6">
              <Link 
                to="/contact"
                className="px-12 py-6 bg-white text-emerald-600 font-bold text-xl rounded-[2rem] hover:bg-zinc-900 hover:text-white transition-all shadow-2xl shadow-emerald-900/20 inline-block"
              >
                Book a Free Discovery Call
              </Link>
            </div>
          </div>
          {/* Decorative Circles */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl" />
        </div>
      </section>
    </div>
  );
}
