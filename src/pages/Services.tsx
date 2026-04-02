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
import { SEO } from '../components/SEO';

const coreServices = [
  {
    title: "Content Marketing Automation",
    description: "We build an end-to-end pipeline that handles keyword research, content briefs, drafting, and distribution. You get 4–8 high-quality, SEO-optimized articles per month without lifting a finger.",
    icon: <Workflow className="text-brand-gradient" size={32} />,
    color: "bg-deep-space-blue-50",
    accent: "deep-space-blue"
  },
  {
    title: "SEO Strategy & Optimization",
    description: "Deep technical SEO audits, site speed optimization, and on-page content alignment. We ensure your existing and new content is actually visible to your target audience.",
    icon: <Search className="text-brand-gradient" size={32} />,
    color: "bg-deep-space-blue-50",
    accent: "deep-space-blue"
  },
  {
    title: "Business Process Automation",
    description: "Connecting your CRM (HubSpot), email marketing tools, and internal databases using n8n and Zapier. We eliminate data silos and automate lead nurturing so your team can focus on closing deals.",
    icon: <Cpu className="text-amber-500" size={32} />,
    color: "bg-amber-50",
    accent: "amber"
  }
];

const packages = [
  {
    title: "The Kickstart (One-Off Build)",
    subtitle: "Perfect for teams that need the infrastructure built, but want to run it themselves.",
    price: "Custom implementation",
    features: [
      "Custom system architecture",
      "3-5 automated workflows built & documented",
      "Tech stack integration (HubSpot, Zapier, etc.)",
      "2 weeks delivery time",
      "1 month post-launch technical support"
    ],
    highlight: false,
    color: "bg-white",
    textColor: "text-zinc-900"
  },
  {
    title: "The Growth Engine (Monthly)",
    subtitle: "A completely done-for-you service. I build the systems and run the content machine for you.",
    price: "Month-to-month. Cancel anytime.",
    features: [
      "Everything in The Kickstart",
      "4-8 SEO articles fully produced & published per month",
      "Continuous workflow optimization and bug fixing",
      "Monthly strategy sessions and ROI reporting",
      "Priority API updates and AI prompt refinements"
    ],
    highlight: true,
    color: "bg-zinc-900",
    textColor: "text-white"
  }
];

const processSteps = [
  { 
    step: "01", 
    title: "Phase 1: The Audit", 
    desc: "We look at your current stack, find the bottlenecks, and design a custom blueprint that maximizes efficiency without bloated software costs." 
  },
  { 
    step: "02", 
    title: "Phase 2: The Build", 
    desc: "I construct your automated pipelines, integrate your tools, and refine the AI prompts to ensure the output sounds exactly like your brand, not a robot." 
  },
  { 
    step: "03", 
    title: "Phase 3: The Scale", 
    desc: "We hit publish. The system runs. We track the analytics, optimize the conversions, and scale the output as your business grows." 
  }
];

const faqs = [
  {
    question: "How long does it take to see results?",
    answer: "Automation results are immediate in terms of time saved. For SEO, we typically see significant movement in 3-6 months, though our automated systems often accelerate this by increasing publishing velocity."
  },
  {
    question: "Do I need to hire a developer to maintain these systems?",
    answer: "No. I build these systems to be user-friendly and self-sustaining. I also provide clear documentation and training for your existing team so you maintain full control."
  },
  {
    question: "Which tools do you specialize in?",
    answer: "I am an expert in n8n, Zapier, Make.com, HubSpot, and various AI models (OpenAI, Anthropic). I pick the tool that precisely fits your budget and operational complexity."
  }
];

export default function Services() {
  return (
    <div className="pt-32 pb-20 bg-white">
      <SEO 
        title="Marketing Automation Services | Content, SEO & Process Automation for Growing Businesses"
        description="Done-for-you content marketing automation, SEO optimization, and business process automation. Enterprise results without enterprise costs. Month-to-month, no lock-in."
        keywords="content marketing automation services, SEO automation, business process automation, marketing systems consultant"
      />
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-brand-gradient" />
              Services & Solutions
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.05]">
              Done-For-You Marketing Systems That <span className="text-brand-gradient">Produce Real Revenue.</span>
            </h1>
            <p className="text-xl text-zinc-500 font-light leading-relaxed max-w-xl">
              Consistent content. Higher rankings. Time back in your week. No team required.
            </p>
            <div className="flex flex-wrap gap-4 pt-4">
              <Link 
                to="/contact"
                className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-brand-gradient transition-all shadow-xl shadow-zinc-200 flex items-center gap-2"
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
              <div className="absolute inset-0 bg-gradient-to-br from-deep-space-blue-500/10 to-deep-space-blue-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="grid grid-cols-2 gap-4 p-12 w-full">
                  {[Zap, Search, Cpu, Layers].map((Icon, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.1 }}
                      className="aspect-square rounded-3xl bg-white border border-zinc-100 shadow-sm flex items-center justify-center text-zinc-400 group-hover:text-brand-gradient transition-colors"
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
              className="absolute -bottom-6 -right-6 p-6 bg-white rounded-3xl shadow-2xl border border-zinc-100 space-y-2 z-10"
            >
              <p className="text-3xl font-bold text-zinc-900">10-20h</p>
              <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">Saved Weekly</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Intro Text */}
      <section className="max-w-4xl mx-auto px-6 mb-32 text-center space-y-8">
        <h2 className="text-3xl md:text-4xl font-bold text-zinc-900 tracking-tight leading-snug">
          Growing businesses don't need more advice. They need a system that actually runs.
        </h2>
        <p className="text-xl text-zinc-500 font-light leading-relaxed">
          One that publishes consistently, ranks in search, and generates leads on autopilot. I build custom-engineered marketing systems that deliver enterprise output without enterprise complexity, cost, or management overhead.
        </p>
        <div className="flex justify-center gap-8 text-sm font-mono text-zinc-400 uppercase tracking-widest pt-4">
          <span>No retainers</span>
          <span className="text-brand-gradient">•</span>
          <span>No bloated contracts</span>
          <span className="text-brand-gradient">•</span>
          <span>Just measurable growth</span>
        </div>
      </section>

      {/* Core Services Grid */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">The Capabilities</h2>
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
            </motion.div>
          ))}
        </div>
      </section>

      {/* Packages / How We Work Together */}
      <section className="bg-zinc-50 py-32 border-y border-zinc-100 mb-32">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">Engagement Model</h2>
            <h3 className="text-5xl md:text-6xl font-bold text-zinc-900 tracking-tight">How We Work Together</h3>
            <p className="text-xl text-zinc-500 font-light max-w-2xl mx-auto pt-4">
              I don't do 12-month retainers. I offer transparent, month-to-month engagements focused purely on results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {packages.map((pkg, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className={`p-12 md:p-14 rounded-[3rem] ${pkg.color} ${pkg.textColor} border border-zinc-200 shadow-2xl ${pkg.highlight ? 'shadow-zinc-300' : 'shadow-zinc-200/50'} flex flex-col`}
              >
                <div className="space-y-4 mb-12">
                  <h4 className="text-3xl font-bold">{pkg.title}</h4>
                  <p className={`text-lg leading-relaxed ${pkg.highlight ? 'text-zinc-400' : 'text-zinc-500'}`}>
                    {pkg.subtitle}
                  </p>
                </div>

                <div className="mb-12">
                  <p className={`text-sm font-mono uppercase tracking-widest mb-2 ${pkg.highlight ? 'text-deep-space-blue-400' : 'text-brand-gradient'}`}>Pricing Structure</p>
                  <p className="text-xl font-semibold">{pkg.price}</p>
                </div>

                <div className="space-y-6 flex-grow mb-16">
                  {pkg.features.map((feature, j) => (
                    <div key={j} className="flex items-start gap-4">
                      <div className={`mt-1 bg-brand-gradient rounded-full p-1 text-white shrink-0`}>
                        <CheckCircle2 size={16} />
                      </div>
                      <span className={`text-lg ${pkg.highlight ? 'text-zinc-300' : 'text-zinc-700'}`}>{feature}</span>
                    </div>
                  ))}
                </div>

                <Link 
                  to="/contact"
                  className={`w-full py-5 rounded-2xl font-bold text-lg text-center transition-all flex items-center justify-center gap-2 ${
                    pkg.highlight 
                      ? 'bg-brand-gradient text-white hover:bg-brand-gradient' 
                      : 'bg-zinc-100 text-zinc-900 hover:bg-zinc-200'
                  }`}
                >
                  Choose {pkg.title.split(' (')[0]} <ArrowRight size={20} />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="max-w-7xl mx-auto px-6 mb-32">
        <div className="bg-zinc-900 rounded-[4rem] p-12 md:p-24 relative overflow-hidden">
          <div className="relative z-10 space-y-20">
            <div className="text-center space-y-4">
              <h2 className="text-brand-gradient font-mono text-xs uppercase tracking-[0.3em]">The Methodology</h2>
              <h3 className="text-5xl md:text-6xl font-bold text-white tracking-tight">The 3-Step Process</h3>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
              {processSteps.map((item, i) => (
                <div key={i} className="space-y-6 relative">
                  <div className="text-7xl font-bold text-white/5 font-mono absolute -top-8 -left-4 pointer-events-none">
                    {item.step}
                  </div>
                  <div className="space-y-4 relative z-10 bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-sm hover:bg-white/10 transition-colors h-full">
                    <h4 className="text-2xl font-bold text-white tracking-tight">{item.title}</h4>
                    <p className="text-zinc-400 font-light leading-relaxed text-lg">{item.desc}</p>
                  </div>
                  {i < 2 && (
                    <div className="hidden lg:flex absolute top-1/2 -right-8 text-brand-gradient/50 -translate-y-1/2 z-20">
                      <ArrowRight size={32} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gradient/10 blur-[120px] rounded-full pointer-events-none" />
        </div>
      </section>

      {/* Specialized Tools Section */}
      <section className="py-32 bg-white relative overflow-hidden mb-32 border-y border-zinc-100">
        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div className="space-y-8">
              <h3 className="text-5xl font-bold tracking-tight leading-tight text-zinc-900">
                Specialized SEO & <br />
                <span className="text-brand-gradient">Automation Stack.</span>
              </h3>
              <p className="text-xl text-zinc-500 font-light leading-relaxed">
                Each solution is built on top-tier tools. Whether you need advanced technical SEO or seamless automation, you’ll receive tailored execution focused on growth metrics without vendor lock-in.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { label: "ROI Focused", value: "300-520%" },
                  { label: "Organic Gains", value: "65%+" },
                  { label: "Time Savings", value: "80%" },
                  { label: "Client Retained", value: "95%+" }
                ].map((stat, i) => (
                  <div key={i} className="p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
                    <p className="text-3xl font-bold text-zinc-900">{stat.value}</p>
                    <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="grid grid-cols-3 gap-6">
              {["Zapier", "n8n", "Make", "HubSpot", "Python", "OpenAI", "Semrush", "Ahrefs", "Surfer"].map((tool, i) => (
                <div key={i} className="aspect-square rounded-2xl bg-zinc-50 border border-zinc-100 flex items-center justify-center text-xs font-mono text-zinc-500 uppercase tracking-widest hover:bg-deep-space-blue-50 hover:text-brand-gradient hover:border-deep-space-blue-200 transition-all cursor-default shadow-sm h-full w-full">
                  {tool}
                </div>
              ))}
            </div>
          </div>
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
                <span className="text-xl font-bold text-zinc-900 pr-8">{faq.question}</span>
                <div className="w-10 h-10 shrink-0 rounded-full bg-white border border-zinc-200 flex items-center justify-center group-open:rotate-180 transition-transform shadow-sm">
                  <ArrowRight size={16} className="rotate-90 text-zinc-500" />
                </div>
              </summary>
              <div className="px-8 pb-8 text-zinc-500 font-light leading-relaxed text-lg pt-2 border-t border-zinc-100 mt-2 mx-8">
                {faq.answer}
              </div>
            </details>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6">
        <div className="bg-brand-gradient rounded-[4rem] p-12 md:p-24 text-center space-y-10 relative overflow-hidden">
          <div className="relative z-10 space-y-6">
            <h3 className="text-5xl md:text-7xl font-bold text-white tracking-tight">
              Ready to automate <br /> your growth?
            </h3>
            <p className="text-xl text-deep-space-blue-100 font-light max-w-2xl mx-auto">
              Every business is unique. Bespoke solutions and flexible packages available to meet your exact growth stage and needs.
            </p>
            <div className="pt-6">
              <Link 
                to="/contact"
                className="px-12 py-6 bg-zinc-900 text-white font-bold text-xl rounded-[2rem] hover:bg-zinc-800 transition-all shadow-2xl shadow-deep-space-blue-900/20 inline-block"
              >
                Book a Free Discovery Call
              </Link>
            </div>
          </div>
          {/* Decorative Circles */}
          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-deep-space-blue-400/20 rounded-full blur-3xl pointer-events-none" />
        </div>
      </section>
    </div>
  );
}
