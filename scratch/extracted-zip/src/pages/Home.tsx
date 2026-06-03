import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  AlertCircle, 
  Share2, 
  TrendingUp, 
  Target, 
  Zap, 
  BarChart3,
  MousePointer2,
  UserX,
  Building2,
  Bot,
  Search,
  Cpu,
  Layers,
  Rocket
} from 'lucide-react';
import { ScrollytellingSection, Milestone } from '../components/ScrollytellingSection';
import { VerticalScrollSection, VerticalItem } from '../components/VerticalScrollSection';
import { ToolsTicker, Tool } from '../components/ToolsTicker';

const problemMilestones: Milestone[] = [
  {
    id: 1,
    title: "Freelancers?",
    text: "You found someone great... for three months. Then they took on too many clients, quality slipped, or they just ghosted. You're left holding the bag and starting the search all over again.",
    icon: UserX,
    illustration: "https://illustrations.popsy.co/white/surreal-hourglass.svg",
    color: "#ef4444"
  },
  {
    id: 2,
    title: "Agencies?",
    text: "The proposal looked amazing. Then you saw the price: $8K/month, 6-month commitment. You signed anyway because you needed help. Three months in, you realized you're paying senior rates but working with their junior team.",
    icon: Building2,
    illustration: "https://illustrations.popsy.co/white/navigation.svg",
    color: "#f59e0b"
  },
  {
    id: 3,
    title: "AI Tools?",
    text: "You tried ChatGPT. Got excited. Started creating content. Then you read it back and thought, 'This sounds like every other AI-generated article on the internet.' Your brand voice? Nowhere to be found.",
    icon: Bot,
    illustration: "https://illustrations.popsy.co/white/falling.svg",
    color: "#6366f1"
  },
  {
    id: 4,
    title: "Doing It Yourself?",
    text: "You're the expert in your business, so you should write the content, right? Except... between client calls and operations, you're writing blog posts at 11 PM on Sundays. It's not sustainable.",
    icon: MousePointer2,
    illustration: "https://illustrations.popsy.co/white/creative-work.svg",
    color: "#ec4899"
  }
];

const solutionMilestones: Milestone[] = [
  {
    id: 1,
    title: "Automated Content Engine",
    text: "We build a system that publishes 8-40+ high-quality articles monthly, optimized for SEO from day one. It runs on autopilot while you focus on your core business.",
    icon: Zap,
    illustration: "https://illustrations.popsy.co/white/idea.svg",
    color: "#10b981"
  },
  {
    id: 2,
    title: "Multi-Platform Distribution",
    text: "One piece of content becomes ten. We automate the flow from blog to social, email, and LinkedIn, ensuring your message is everywhere your customers are.",
    icon: Share2,
    illustration: "https://illustrations.popsy.co/white/flowchart.svg",
    color: "#3b82f6"
  },
  {
    id: 3,
    title: "Predictable Revenue Growth",
    text: "Every word is tied to a business objective. We track conversions and ROI, turning your content marketing into a predictable and scalable revenue driver.",
    icon: BarChart3,
    illustration: "https://illustrations.popsy.co/white/data-analysis.svg",
    color: "#8b5cf6"
  }
];

const numberItems: VerticalItem[] = [
  {
    id: 1,
    title: "520% ROI",
    subtitle: "TechFlow Solutions",
    content: "Emmanuel transformed our content marketing from a bottleneck into a growth engine. The 520% ROI in the first quarter made our board believers.",
    illustration: "https://illustrations.popsy.co/white/financial-report.svg",
    color: "#10b981"
  },
  {
    id: 2,
    title: "15+ Hours Saved",
    subtitle: "OAU Library",
    content: "What used to take hours now takes minutes. Emmanuel gave us back our time to focus on serving researchers. The accuracy is better than manual entry.",
    illustration: "https://illustrations.popsy.co/white/digital-marketing.svg",
    color: "#3b82f6"
  },
  {
    id: 3,
    title: "65% Traffic Increase",
    subtitle: "The Scoove Africa",
    content: "His automation expertise and hands-on SEO insights made all the difference. We exceeded every growth target within three months.",
    illustration: "https://illustrations.popsy.co/white/creative-work.svg",
    color: "#8b5cf6"
  }
];

const testimonialItems: VerticalItem[] = [
  {
    id: 1,
    title: "A Growth Engine",
    content: "Emmanuel transformed our content marketing from a bottleneck into a growth engine. The 520% ROI in the first quarter made our board believers. Best decision we made this year.",
    author: "Sarah Mitchell",
    role: "VP Marketing, TechFlow Solutions",
    illustration: "https://illustrations.popsy.co/white/success.svg",
    color: "#10b981"
  },
  {
    id: 2,
    title: "SEO Mastery",
    content: "His automation expertise and hands-on SEO insights made all the difference for The Scoove Africa. We exceeded every growth target within three months.",
    author: "Olayiide Bolaji-Daniel",
    role: "CEO, The Scoove Africa",
    illustration: "https://illustrations.popsy.co/white/navigation.svg",
    color: "#3b82f6"
  },
  {
    id: 3,
    title: "Highly Recommended",
    content: "Emmanuel is a great writer who carefully and strategically researches his content. He executes his tasks excellently... I highly recommend Emmanuel as a Professional Content Writer.",
    author: "Adewunmi Adedayo",
    role: "Journalist, Examiner Newspapers Australia",
    illustration: "https://illustrations.popsy.co/white/celebration.svg",
    color: "#8b5cf6"
  }
];

const tools: Tool[] = [
  { name: "SEO & Analytics", icon: <Search size={24} /> },
  { name: "Automation", icon: <Zap size={24} /> },
  { name: "AI Systems", icon: <Cpu size={24} /> },
  { name: "Scaling", icon: <Rocket size={24} /> },
  { name: "Zapier", icon: <Layers size={24} /> },
  { name: "Make.com", icon: <Layers size={24} /> },
  { name: "Airtable", icon: <Layers size={24} /> },
  { name: "ChatGPT", icon: <Bot size={24} /> },
  { name: "Ahrefs", icon: <Search size={24} /> },
  { name: "Semrush", icon: <Search size={24} /> },
  { name: "LinkedIn", icon: <Share2 size={24} /> },
  { name: "Growth Engines", icon: <TrendingUp size={24} /> }
];

export default function Home() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center p-6 overflow-hidden bg-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-emerald-50 blur-[120px] rounded-full opacity-60" />
          <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-indigo-50 blur-[120px] rounded-full opacity-60" />
        </div>
        
        <div className="relative z-10 text-center space-y-10 max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-50 border border-zinc-100 text-xs font-mono text-zinc-500 tracking-[0.2em] uppercase"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            Emmanuel Odebiyi
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className="text-7xl md:text-9xl font-bold tracking-tight leading-[0.95] text-zinc-900"
          >
            Marketing on <br />
            <span className="text-zinc-300">Autopilot.</span>
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="text-2xl text-zinc-500 max-w-3xl mx-auto leading-relaxed font-light"
          >
            I automate content marketing, SEO, and business processes for growing businesses—delivering 
            <span className="text-emerald-600 font-medium"> 520% ROI</span>, 
            <span className="text-indigo-600 font-medium"> 65% traffic growth</span>, and 
            <span className="text-zinc-900 font-medium"> 15+ hours saved weekly</span>.
          </motion.p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
            <Link 
              to="/portfolio"
              className="px-8 py-4 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-zinc-200 inline-block"
            >
              View Proven Results →
            </Link>
            <Link 
              to="/contact"
              className="px-8 py-4 bg-white text-zinc-900 border border-zinc-200 font-bold rounded-2xl hover:bg-zinc-50 transition-all inline-block"
            >
              Book Free Strategy Call
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <div className="bg-zinc-900 py-6 overflow-hidden border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-6 flex flex-wrap justify-center gap-x-12 gap-y-4 text-zinc-400 font-mono text-xs uppercase tracking-widest">
          <span className="flex items-center gap-2"><span className="text-emerald-500">✓</span> 520% ROI in 90 days</span>
          <span className="flex items-center gap-2"><span className="text-emerald-500">✓</span> 65% traffic increase</span>
          <span className="flex items-center gap-2"><span className="text-emerald-500">✓</span> 15+ hours saved weekly</span>
          <span className="flex items-center gap-2"><span className="text-emerald-500">✓</span> 95%+ client retention</span>
        </div>
      </div>

      {/* Problem Scrollytelling */}
      <section id="about-preview" className="py-40 bg-white text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-5xl md:text-7xl font-bold text-zinc-900 tracking-tight"
        >
          ... Does This Sound Familiar?
        </motion.h2>
      </section>

      <ScrollytellingSection 
        title="Let me guess what you've tried:" 
        milestones={problemMilestones} 
        themeColor="#ef4444"
      />

      <section className="py-40 bg-zinc-900 text-center">
        <div className="max-w-4xl mx-auto px-6 space-y-8">
          <motion.h3 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-4xl md:text-5xl font-bold text-white leading-tight"
          >
            Now you're back to square one, interviewing writers and hoping the next one sticks around.
          </motion.h3>
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-zinc-400 font-light"
          >
            Stop Managing Marketing. Start Scaling Growth.
          </motion.p>
        </div>
      </section>

      {/* Solutions Scrollytelling */}
      <section id="services">
        <ScrollytellingSection 
          title="What If Your Marketing Worked FOR You?" 
          milestones={solutionMilestones} 
          themeColor="#10b981"
        />
      </section>

      {/* Vertical Case Studies */}
      <section id="numbers" className="bg-white">
        <div className="max-w-7xl mx-auto px-6 pt-32 text-center space-y-4">
          <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">Case Studies</h2>
          <h3 className="text-5xl md:text-7xl font-bold text-zinc-900 tracking-tight">The Numbers That Matter</h3>
        </div>
        <VerticalScrollSection items={numberItems} sectionId="numbers-scroll" />
      </section>

      {/* Testimonials */}
      <section id="testimonials" className="bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6 pt-32 text-center space-y-4">
          <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">Testimonials</h2>
          <h3 className="text-5xl md:text-7xl font-bold text-zinc-900 tracking-tight">What Clients Are Saying</h3>
        </div>
        <VerticalScrollSection items={testimonialItems} sectionId="testimonials-scroll" />
      </section>

      {/* Tools Ticker */}
      <section className="bg-white">
        <div className="max-w-7xl mx-auto px-6 pt-32 text-center space-y-4">
          <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">Expertise</h2>
          <h3 className="text-5xl font-bold text-zinc-900 tracking-tight">Tools I Have Mastered</h3>
        </div>
        <ToolsTicker tools={tools} />
      </section>

      {/* Mini Blog Section */}
      <section id="blog" className="py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-6 space-y-20">
          <div className="flex flex-col md:flex-row justify-between items-end gap-8">
            <div className="space-y-4">
              <h2 className="text-zinc-400 font-mono text-xs uppercase tracking-[0.3em]">Insights</h2>
              <h3 className="text-5xl font-bold text-zinc-900 tracking-tight">Latest Articles</h3>
            </div>
            <a href="#" className="text-emerald-600 font-bold hover:underline">View all posts →</a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "The Future of Content Automation: Smart, Scalable, Simple",
                date: "May 15, 2024",
                image: "https://illustrations.popsy.co/white/digital-marketing.svg"
              },
              {
                title: "5 Essential Marketing Automation Workflows",
                date: "Apr 30, 2024",
                image: "https://illustrations.popsy.co/white/flowchart.svg"
              },
              {
                title: "How I Use Airtable & Zapier to Turbo-Charge Repurposing",
                date: "Apr 18, 2024",
                image: "https://illustrations.popsy.co/white/creative-work.svg"
              }
            ].map((post, i) => (
              <motion.a 
                key={i}
                href="#"
                whileHover={{ y: -10 }}
                className="group block space-y-6"
              >
                <div className="aspect-[16/10] rounded-3xl bg-white border border-zinc-100 overflow-hidden p-8 flex items-center justify-center group-hover:border-emerald-200 transition-colors">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-mono text-zinc-400 uppercase tracking-widest">{post.date}</p>
                  <h4 className="text-xl font-bold text-zinc-900 leading-tight group-hover:text-emerald-600 transition-colors">{post.title}</h4>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-40 bg-white">
        <div className="max-w-5xl mx-auto px-6 text-center space-y-16">
          <div className="space-y-6">
            <h2 className="text-5xl md:text-7xl font-bold text-zinc-900 tracking-tight leading-tight">
              Stop Managing Marketing. <br />
              <span className="text-emerald-500">Start Scaling Growth.</span>
            </h2>
            <p className="text-2xl text-zinc-500 font-light max-w-3xl mx-auto">
              Your competitors are automating. Your customers are searching. Your opportunity is right now.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Free Strategy Call",
                desc: "30 Minutes. No pitch. Just honest conversation about your challenges.",
                btn: "Book Your Call →"
              },
              {
                title: "Custom Proposal",
                desc: "Detailed recommendations and investment breakdown for your business.",
                btn: "Request Proposal →"
              },
              {
                title: "Paid Audit ($200)",
                desc: "Complete analysis of your content, SEO, and automation opportunities.",
                btn: "Book Your Audit →"
              }
            ].map((item, i) => (
              <div key={i} className="p-10 rounded-[2rem] bg-zinc-50 border border-zinc-100 text-left space-y-6 flex flex-col justify-between">
                <div className="space-y-4">
                  <h4 className="text-xl font-bold text-zinc-900">{item.title}</h4>
                  <p className="text-zinc-500 font-light leading-relaxed">{item.desc}</p>
                </div>
                <Link 
                  to="/contact"
                  className="w-full py-4 bg-white border border-zinc-200 text-zinc-900 font-bold rounded-xl hover:bg-zinc-900 hover:text-white transition-all text-center inline-block"
                >
                  {item.btn}
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
