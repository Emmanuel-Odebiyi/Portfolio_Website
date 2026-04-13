import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  Zap, 
  Search, 
  Cpu, 
  Layers, 
  ArrowRight, 
  CheckCircle2, 
  Workflow,
  Plus,
  Minus
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { TextEffect } from '../components/ui/text-effect';
import { ContainerScroll } from '../components/ui/container-scroll-animation';
import { ToolsTicker, Tool } from '../components/ToolsTicker';

const coreServices = [
  {
    title: "Content Marketing Automation",
    description: "We build an end-to-end pipeline that handles keyword research, content briefs, drafting, and distribution. You get 4–8 high-quality, SEO-optimized articles per month without lifting a finger.",
    icon: <Workflow className="text-zinc-600 group-hover:text-brand-gradient transition-colors" size={32} />
  },
  {
    title: "SEO Strategy & Optimization",
    description: "Deep technical SEO audits, site speed optimization, and on-page content alignment. We ensure your existing and new content is actually visible to your target audience.",
    icon: <Search className="text-zinc-600 group-hover:text-brand-gradient transition-colors" size={32} />
  },
  {
    title: "Business Process Automation",
    description: "Connecting your CRM (HubSpot), email marketing tools, and internal databases using n8n and Zapier. We eliminate data silos and automate lead nurturing so your team can focus on closing deals.",
    icon: <Cpu className="text-zinc-600 group-hover:text-brand-gradient transition-colors" size={32} />
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
    highlight: false
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
    highlight: true
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

const toolData: Tool[] = [
  { name: 'Zapier', logo: 'https://cdn.simpleicons.org/zapier' },
  { name: 'n8n', logo: 'https://cdn.simpleicons.org/n8n' },
  { name: 'Make', logo: 'https://cdn.simpleicons.org/make' },
  { name: 'HubSpot', logo: 'https://cdn.simpleicons.org/hubspot' },
  { name: 'Python', logo: 'https://cdn.simpleicons.org/python' },
  { name: 'OpenAI', logo: 'https://cdn.simpleicons.org/openai' },
];

export default function Services() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <div className="bg-white selection:bg-brand-gradient selection:text-white">
      <SEO 
        title="Marketing Automation Services | Content, SEO & Process Automation for Growing Businesses"
        description="Done-for-you content marketing automation, SEO optimization, and business process automation. Enterprise results without enterprise costs. Month-to-month, no lock-in."
        keywords="content marketing automation services, SEO automation, business process automation, marketing systems consultant"
      />
      
      {/* Hero Section */}
      <section className="relative px-6 flex flex-col items-center pt-32 lg:pt-40 pb-20 overflow-visible">
        {/* Subtle background glow */}
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-brand-gradient/10 blur-[120px] rounded-full pointer-events-none" />

        <div className="max-w-4xl text-center space-y-8 relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-brand-gradient" />
            Services & Solutions
          </motion.div>
          
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-zinc-900 leading-[1.1] min-h-[140px] md:min-h-[160px]">
            <TextEffect as="span" preset="fade" per="char">
              Done-For-You Marketing Systems That Produce Real Revenue.
            </TextEffect>
          </h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="text-xl text-zinc-500 font-light leading-relaxed max-w-2xl mx-auto"
          >
            Consistent content. Higher rankings. Time back in your week. No team required.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            className="flex flex-wrap justify-center gap-4 pt-4"
          >
            <Link 
              to="/contact"
              className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-zinc-800 transition-all shadow-xl shadow-zinc-200/50 flex items-center gap-2 group"
            >
              Get a Proposal <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform"/>
            </Link>
            <Link 
              to="/portfolio"
              className="px-8 py-4 bg-white text-zinc-900 font-bold rounded-2xl border border-zinc-200 hover:bg-zinc-50 transition-all"
            >
              View Case Studies
            </Link>
          </motion.div>
        </div>

        {/* Container Scroll Presentation */}
        <div className="w-full mt-10 -mb-40 relative z-20">
          <ContainerScroll
            titleComponent={<></>}
          >
            <div className="w-full h-full bg-white rounded-2xl overflow-hidden shadow-2xl relative border border-zinc-100 flex items-center justify-center group">
               {/* Dashboard Placeholder Image */}
               <img 
                 src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" 
                 alt="Workflow Dashboard Mockup" 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-1000 ease-out"
               />
               <div className="absolute inset-0 bg-gradient-to-t from-white/30 to-transparent pointer-events-none" />
               <div className="absolute top-4 left-4 flex gap-2">
                 <div className="w-3 h-3 rounded-full bg-rose-400" />
                 <div className="w-3 h-3 rounded-full bg-amber-400" />
                 <div className="w-3 h-3 rounded-full bg-emerald-400" />
               </div>
            </div>
          </ContainerScroll>
        </div>
      </section>

      {/* Intro Text */}
      <section className="max-w-4xl mx-auto px-6 mb-32 text-center space-y-8 pt-40 md:pt-64">
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
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              whileHover={{ y: -5 }}
              className={`p-10 rounded-[3rem] bg-white border border-zinc-100 space-y-8 group transition-all cursor-default shadow-sm hover:shadow-xl hover:border-zinc-200 relative overflow-hidden`}
            >
              {/* Subtle hover gradient bloom */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="w-16 h-16 rounded-2xl bg-zinc-50 border border-zinc-100 shadow-sm flex items-center justify-center group-hover:scale-110 transition-transform relative z-10">
                {service.icon}
              </div>
              <div className="space-y-4 relative z-10">
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
      <section className="bg-zinc-50 py-32 border-y border-zinc-100 mb-32 overflow-hidden">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">Engagement Model</h2>
            <h3 className="text-5xl md:text-6xl font-bold text-zinc-900 tracking-tight">How We Work Together</h3>
            <p className="text-xl text-zinc-500 font-light max-w-2xl mx-auto pt-4">
              I don't do 12-month retainers. I offer transparent, month-to-month engagements focused purely on results.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-10">
            {packages.map((pkg, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className={`relative p-10 md:p-14 rounded-[3rem] bg-white group flex flex-col ${
                  pkg.highlight ? '' : 'border border-zinc-200 shadow-xl shadow-zinc-100/50'
                }`}
              >
                {/* Magic Gradient Border for Highlighted Package */}
                {pkg.highlight && (
                  <div className="absolute -inset-[1px] rounded-[3rem] bg-gradient-to-r from-teal-400 via-blue-500 to-purple-500 opacity-60 group-hover:opacity-100 blur-[2px] transition-opacity duration-500 z-0" />
                )}
                {pkg.highlight && (
                  <div className="absolute -inset-[2px] rounded-[3rem] bg-gradient-to-r from-teal-400/50 via-blue-500/50 to-purple-500/50 opacity-40 group-hover:opacity-80 blur-[8px] transition-opacity duration-500 z-0 pointer-events-none" />
                )}
                {/* Solid white background for internal content */}
                {pkg.highlight && (
                   <div className="absolute inset-0 bg-white rounded-[3rem] z-0" />
                )}

                <div className="relative z-10 flex flex-col h-full">
                  <div className="space-y-4 mb-12">
                     <h4 className="text-3xl font-bold text-zinc-900">{pkg.title}</h4>
                     <p className="text-lg leading-relaxed text-zinc-500">
                        {pkg.subtitle}
                     </p>
                  </div>

                  <div className="mb-12">
                     <p className="text-sm font-mono uppercase tracking-widest mb-2 text-zinc-400">Pricing Structure</p>
                     <p className="text-xl font-semibold text-zinc-900">{pkg.price}</p>
                  </div>

                  <div className="space-y-6 flex-grow mb-16">
                     {pkg.features.map((feature, j) => (
                        <motion.div 
                           initial={{ opacity: 0, x: -10 }}
                           whileInView={{ opacity: 1, x: 0 }}
                           viewport={{ once: true }}
                           transition={{ delay: 0.2 + (j * 0.1) }}
                           key={j} 
                           className="flex items-start gap-4"
                        >
                           <div className="mt-1 bg-zinc-100 rounded-full p-1 text-zinc-900 shrink-0 group-hover:bg-zinc-900 group-hover:text-white transition-colors duration-300">
                              <CheckCircle2 size={16} />
                           </div>
                           <span className="text-lg text-zinc-700">{feature}</span>
                        </motion.div>
                     ))}
                  </div>

                  <Link 
                     to="/contact"
                     className={`w-full py-5 rounded-2xl font-bold text-lg text-center transition-all flex items-center justify-center gap-2 group/btn ${
                        pkg.highlight 
                           ? 'bg-zinc-900 text-white shadow-xl hover:bg-zinc-800' 
                           : 'bg-white border border-zinc-200 text-zinc-900 hover:bg-zinc-50 hover:border-zinc-300'
                     }`}
                  >
                     Choose {pkg.title.split(' (')[0]} <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform"/>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Light Theme Scrollytelling Process */}
      <section className="py-32 bg-white relative">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
            {/* Sticky Left */}
            <div className="lg:sticky lg:top-40 h-fit space-y-8">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em] mb-4 outline-none">The Methodology</h2>
                <h3 className="text-5xl md:text-6xl font-bold text-zinc-900 tracking-tight leading-[1.1] mb-6">
                  The 3-Step <br /> Process
                </h3>
                <p className="text-xl text-zinc-500 font-light leading-relaxed max-w-md">
                  A systematic approach to moving you from chaotic, manual operations to sleek, profitable automation.
                </p>
              </motion.div>
            </div>
            
            {/* Scrolling Right */}
            <div className="space-y-12 relative isolate">
              {processSteps.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6 }}
                  className="relative p-10 lg:p-14 bg-zinc-50 rounded-[3rem] border border-zinc-100 hover:bg-white hover:shadow-2xl hover:border-zinc-200 transition-all duration-500 group overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-2 h-full bg-zinc-200 group-hover:bg-brand-gradient transition-colors duration-500" />
                  
                  <div className="text-[120px] leading-none font-bold text-zinc-900/5 font-mono absolute top-4 right-4 pointer-events-none group-hover:text-zinc-900/10 transition-colors duration-500">
                    {item.step}
                  </div>
                  
                  <div className="relative z-10">
                    <h4 className="text-2xl lg:text-3xl font-bold text-zinc-900 tracking-tight mb-6">{item.title}</h4>
                    <p className="text-zinc-500 font-light leading-relaxed text-lg">{item.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Specialized Tools Ticker Stack */}
      <section className="py-20 bg-white relative flex flex-col items-center border-t border-zinc-100 mt-20">
        <div className="text-center space-y-4 mb-16 px-6">
           <h3 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight text-zinc-900">
              Specialized SEO & <br />
              <span className="text-brand-gradient">Automation Stack.</span>
           </h3>
           <p className="text-xl text-zinc-500 font-light">
             We leverage industry-leading tools to build indestructible workflows.
           </p>
        </div>
        <ToolsTicker tools={toolData} />
      </section>

      {/* Specialized Stats */}
      <section className="py-32 bg-white px-6">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "ROI Focused", value: "300-520%" },
            { label: "Organic Gains", value: "65%+" },
            { label: "Time Savings", value: "80%" },
            { label: "Client Retained", value: "95%+" }
          ].map((stat, i) => (
            <motion.div 
               initial={{ opacity: 0, scale: 0.9 }}
               whileInView={{ opacity: 1, scale: 1 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.1 }}
               key={i} 
               className="p-8 rounded-[2rem] bg-zinc-50 border border-zinc-100 flex flex-col items-center justify-center text-center group hover:bg-white hover:border-zinc-200 hover:shadow-xl transition-all"
            >
              <p className="text-3xl lg:text-4xl font-bold text-zinc-900 mb-2 group-hover:scale-110 transition-transform">{stat.value}</p>
              <p className="text-xs font-mono text-zinc-500 uppercase tracking-widest">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-6 mb-32">
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">Common Questions</h2>
          <h3 className="text-5xl font-bold text-zinc-900 tracking-tight">FAQ</h3>
        </div>
        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-zinc-50 rounded-3xl border border-zinc-100 overflow-hidden"
            >
              <button
                onClick={() => toggleFaq(i)}
                className="w-full flex items-center justify-between p-8 text-left focus:outline-none"
              >
                <span className={`text-xl font-bold pr-8 transition-colors ${openFaq === i ? 'text-zinc-900' : 'text-zinc-700'}`}>{faq.question}</span>
                <div className={`w-10 h-10 shrink-0 rounded-full border flex items-center justify-center transition-all duration-300 ${openFaq === i ? 'bg-zinc-900 text-white border-zinc-900 rotate-180' : 'bg-white border-zinc-200 text-zinc-500'}`}>
                  {openFaq === i ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </button>
              <AnimatePresence>
                {openFaq === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                    className="overflow-hidden"
                  >
                    <div className="px-8 pb-8 text-zinc-500 font-light leading-relaxed text-lg pt-2 border-t border-zinc-100 mt-2 mx-8">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-7xl mx-auto px-6 pb-32">
        <div className="relative bg-zinc-50 rounded-[4rem] p-12 md:p-24 text-center space-y-10 overflow-hidden border border-zinc-200 shadow-2xl group hover:shadow-3xl transition-shadow">
          <div className="relative z-10 space-y-6">
            <h3 className="text-5xl md:text-7xl font-bold text-zinc-900 tracking-tight leading-tight">
              Ready to automate <br /> your growth?
            </h3>
            <p className="text-xl text-zinc-500 font-light max-w-2xl mx-auto">
              Every business is unique. Bespoke solutions and flexible packages available to meet your exact growth stage and needs.
            </p>
            <div className="pt-6">
              <Link 
                to="/contact"
                className="px-12 py-6 bg-zinc-900 text-white font-bold text-xl rounded-[2rem] hover:bg-zinc-800 transition-all shadow-2xl shadow-zinc-900/20 inline-flex items-center gap-2 group/btn"
              >
                Book a Free Discovery Call <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
          {/* Decorative Circles Light Theme */}
          <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-brand-gradient/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-brand-gradient/10 transition-colors duration-1000" />
          <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-gradient/5 rounded-full blur-[100px] pointer-events-none group-hover:bg-brand-gradient/10 transition-colors duration-1000" />
        </div>
      </section>
    </div>
  );
}
