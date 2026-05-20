import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Cpu, 
  Rocket, 
  Users, 
  CheckCircle2, 
  MapPin, 
  ChevronRight, 
  Menu, 
  X, 
  Award, 
  Zap, 
  Globe,
  ArrowRight
} from 'lucide-react';

// --- Components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white/80 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-brand-primary/20">
            U
          </div>
          <span className="font-heading font-bold text-xl tracking-tight text-brand-navy">
            UPPERCLASS <span className="text-brand-primary">AI</span>
          </span>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#about" className="text-brand-navy/70 hover:text-brand-primary transition-colors font-medium">Who We Are</a>
          <a href="#programs" className="text-brand-navy/70 hover:text-brand-primary transition-colors font-medium">Programs</a>
          <a href="#why" className="text-brand-navy/70 hover:text-brand-primary transition-colors font-medium">Why Us</a>
          <button className="bg-brand-primary text-white px-6 py-2.5 rounded-full font-semibold hover:bg-brand-navy transition-all duration-300 shadow-md hover:shadow-lg active:scale-95">
            Book a School Demo
          </button>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-brand-navy" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl p-6 flex flex-col gap-4 md:hidden border-t"
          >
            <a href="#about" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium py-2 border-b">Who We Are</a>
            <a href="#programs" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium py-2 border-b">Programs</a>
            <a href="#why" onClick={() => setIsMobileMenuOpen(false)} className="text-lg font-medium py-2 border-b">Why Us</a>
            <button className="bg-brand-primary text-white px-6 py-3 rounded-xl font-bold mt-2">
              Book a School Demo
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden bg-brand-offwhite">
      {/* Decorative Elements */}
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-brand-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] left-[-10%] w-[30%] h-[30%] bg-brand-navy/5 rounded-full blur-3xl" />

      <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
        <motion.div 
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-brand-primary/10 text-brand-primary px-4 py-2 rounded-full font-bold text-sm mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-brand-primary"></span>
            </span>
            FUTURE-READY EDUCATION
          </div>
          <h1 className="text-5xl md:text-7xl font-heading font-bold leading-[1.1] text-brand-navy mb-6">
            Empowering the <span className="text-brand-primary italic">next generation</span> of African innovators.
          </h1>
          <p className="text-xl text-brand-navy/70 mb-10 leading-relaxed max-w-lg">
            We bring world-class AI and Robotics education to schools across Nigeria, turning young dreamers into future-ready leaders.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <button className="bg-brand-primary text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-navy transition-all shadow-xl shadow-brand-primary/20 active:scale-95 flex items-center justify-center gap-2">
              Book a School Demo <ArrowRight size={20} />
            </button>
            <button className="bg-white text-brand-navy border border-brand-light px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-light transition-all active:scale-95">
              Learn More
            </button>
          </div>
          <p className="mt-8 text-sm font-medium text-brand-navy/50 flex items-center gap-2">
            <CheckCircle2 size={16} className="text-brand-primary" /> Already partnering with 50+ leading schools
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9, rotate: 2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
          className="relative"
        >
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-brand-navy/10 border-8 border-white aspect-[4/5] md:aspect-square">
            {/* Image Placeholder - User should replace with real high-res visual */}
            <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-brand-navy/40 mix-blend-overlay z-10" />
            <img 
              src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=2070&auto=format&fit=crop" 
              alt="Nigerian children with robotics" 
              className="w-full h-full object-cover"
            />
            
            {/* Floating UI Elements */}
            <motion.div 
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute top-10 right-[-20px] glass p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center text-white">
                <CheckCircle2 size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-brand-navy/60">Success Rate</div>
                <div className="text-lg font-bold text-brand-navy leading-none">100% Growth</div>
              </div>
            </motion.div>

            <motion.div 
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              className="absolute bottom-10 left-[-20px] glass p-4 rounded-2xl shadow-xl z-20 flex items-center gap-3"
            >
              <div className="w-10 h-10 bg-brand-primary rounded-full flex items-center justify-center text-white">
                <Cpu size={24} />
              </div>
              <div>
                <div className="text-xs font-bold text-brand-navy/60">Interactive Modules</div>
                <div className="text-lg font-bold text-brand-navy leading-none">AI & Robotics</div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
      
      {/* Brand Tagline Banner */}
      <div className="mt-20 border-y border-brand-light py-10 overflow-hidden">
        <motion.div 
          animate={{ x: [0, -1000] }}
          transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
          className="flex whitespace-nowrap gap-12 items-center"
        >
          {[1,2,3,4,5,6,7,8].map((i) => (
            <span key={i} className="text-4xl md:text-6xl font-heading font-black text-brand-navy/5 flex items-center gap-8">
              UPPERCLASS AI <span className="w-4 h-4 bg-brand-primary rounded-full" /> ...START WITH IMAGINATION <span className="w-4 h-4 bg-brand-navy rounded-full" />
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

const WhoWeAre = () => {
  const stats = [
    { label: 'Students Impacted', value: '10,000+' },
    { label: 'Partner Schools', value: '50+' },
    { label: 'AI Projects', value: '250+' },
    { label: 'Cities Covered', value: '5+' },
  ];

  return (
    <section id="about" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <h2 className="text-brand-primary font-bold tracking-widest text-sm mb-4">WHO WE ARE</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-brand-navy mb-8 leading-tight">
              Leading the African Frontier in Tech-Education.
            </h3>
            <p className="text-lg text-brand-navy/70 mb-8 leading-relaxed">
              At Upperclass AI Limited, we believe that every child’s future begins with imagination. We are a premium Nigerian EdTech company dedicated to bridging the global technology gap by bringing cutting-edge AI, Robotics, and Coding education directly into Nigerian classrooms.
            </p>
            <div className="space-y-4 mb-10">
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center mt-1">
                  <CheckCircle2 size={16} className="text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-navy">Our Mission</h4>
                  <p className="text-brand-navy/60">To democratize access to high-end tech skills for every Nigerian child.</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center mt-1">
                  <CheckCircle2 size={16} className="text-brand-primary" />
                </div>
                <div>
                  <h4 className="font-bold text-brand-navy">Our Vision</h4>
                  <p className="text-brand-navy/60">An Africa where young innovators lead the global technology conversation.</p>
                </div>
              </div>
            </div>
            <button className="group flex items-center gap-2 font-bold text-brand-primary hover:text-brand-navy transition-colors">
              Discover our story <ChevronRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 gap-6">
            {stats.map((stat, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-brand-offwhite p-8 rounded-3xl border border-brand-light hover:border-brand-primary/30 transition-all group"
              >
                <div className="text-4xl font-heading font-black text-brand-navy mb-2 group-hover:text-brand-primary transition-colors">{stat.value}</div>
                <div className="text-sm font-bold text-brand-navy/50 tracking-wider uppercase">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Programs = () => {
  const programs = [
    {
      title: "In-School AI & Robotics",
      description: "A comprehensive curriculum integrated into your school's weekly timetable. We provide facilitators, equipment, and world-class content.",
      icon: <Cpu className="w-8 h-8" />,
      features: ["Facilitator-as-a-Service", "Zero Capex for Schools", "Curriculum Aligned"]
    },
    {
      title: "Holiday Bootcamp",
      description: "Intensive 2-4 week sessions during school breaks where kids dive deep into building drones, coding games, and training AI models.",
      icon: <Rocket className="w-8 h-8" />,
      features: ["Project-based Learning", "Ages 7-17", "Certificate of Excellence"]
    },
    {
      title: "Corporate/NGO Partnerships",
      description: "Custom CSR programs for organizations looking to invest in digital literacy and empower underserved communities.",
      icon: <Globe className="w-8 h-8" />,
      features: ["Scalable Impact", "Detailed Reporting", "Skill Certification"]
    }
  ];

  return (
    <section id="programs" className="py-24 bg-brand-navy text-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <h2 className="text-brand-primary font-bold tracking-widest text-sm mb-4 uppercase">Our LIVE Programs</h2>
          <h3 className="text-4xl md:text-5xl font-heading font-bold mb-6">Designed for the innovators of tomorrow.</h3>
          <p className="text-white/60 max-w-2xl mx-auto text-lg">
            Whether it's during the school term or holidays, we provide hands-on experiences that make learning technology fun and impactful.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {programs.map((program, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -10 }}
              className="bg-white/5 border border-white/10 p-10 rounded-3xl backdrop-blur-sm flex flex-col h-full"
            >
              <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center mb-8 shadow-lg shadow-brand-primary/20">
                {program.icon}
              </div>
              <h4 className="text-2xl font-heading font-bold mb-4">{program.title}</h4>
              <p className="text-white/60 mb-8 flex-grow leading-relaxed">{program.description}</p>
              <ul className="space-y-3 mb-8">
                {program.features.map((feature, idx) => (
                  <li key={idx} className="flex items-center gap-3 text-sm font-medium">
                    <CheckCircle2 size={16} className="text-brand-primary" /> {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full py-4 rounded-xl border border-white/20 font-bold hover:bg-white hover:text-brand-navy transition-all">
                Learn More
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const WhyUs = () => {
  const reasons = [
    {
      title: "Facilitator-as-a-Service",
      desc: "We provide the experts. Your school doesn't need to worry about hiring or training tech teachers.",
      icon: <Users />
    },
    {
      title: "Zero Capex",
      desc: "We bring the equipment. Laptops, robots, and VR headsets — we handle the hardware investment.",
      icon: <Zap />
    },
    {
      title: "FGN 2025 Aligned",
      desc: "Our curriculum is perfectly mapped to Nigeria's national digital literacy goals for 2025.",
      icon: <Award />
    },
    {
      title: "Global Certification",
      desc: "Students receive certificates recognized globally, opening doors to future opportunities.",
      icon: <CheckCircle2 />
    }
  ];

  return (
    <section id="why" className="py-24 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row gap-16 items-center">
          <div className="md:w-1/2">
            <h2 className="text-brand-primary font-bold tracking-widest text-sm mb-4 uppercase">WHY UPPERCLASS AI</h2>
            <h3 className="text-4xl md:text-5xl font-heading font-bold text-brand-navy mb-8 leading-tight">
              A partnership built for excellence.
            </h3>
            <div className="space-y-8">
              {reasons.map((reason, i) => (
                <div key={i} className="flex gap-6">
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center text-brand-primary shadow-sm flex-shrink-0">
                    {reason.icon}
                  </div>
                  <div>
                    <h4 className="font-bold text-brand-navy text-lg mb-1">{reason.title}</h4>
                    <p className="text-brand-navy/60 leading-relaxed">{reason.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="md:w-1/2 relative">
            <div className="bg-brand-primary/10 rounded-[3rem] p-4 aspect-square flex items-center justify-center relative overflow-hidden">
               <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 opacity-20"
                style={{ backgroundImage: 'radial-gradient(circle, #1877f2 1px, transparent 1px)', backgroundSize: '40px 40px' }}
               />
               <div className="relative z-10 text-center p-12 bg-white rounded-[2.5rem] shadow-2xl">
                 <div className="text-6xl font-heading font-black text-brand-primary mb-4">7-17</div>
                 <div className="text-xl font-bold text-brand-navy mb-6 tracking-wider uppercase">Age Group Specialists</div>
                 <p className="text-brand-navy/50 leading-relaxed mb-8">
                   We specialize in teaching complex tech concepts to young minds in a way that is engaging, age-appropriate, and unforgettable.
                 </p>
                 <button className="bg-brand-navy text-white px-8 py-4 rounded-full font-bold hover:bg-brand-primary transition-all">
                   View Sample Curriculum
                 </button>
               </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Impact = () => {
  const cities = ['Lagos', 'Abuja', 'Ogun', 'Ibadan', 'Benin City'];

  return (
    <section className="py-24 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-brand-primary font-bold tracking-widest text-sm mb-4 uppercase">IMPACT & REACH</h2>
        <h3 className="text-4xl md:text-5xl font-heading font-bold text-brand-navy mb-12">Expanding across Nigeria.</h3>
        
        <div className="flex flex-wrap justify-center gap-4 md:gap-8 mb-16">
          {cities.map((city, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 bg-brand-offwhite px-8 py-4 rounded-2xl border border-brand-light font-bold text-brand-navy hover:border-brand-primary transition-all"
            >
              <MapPin size={20} className="text-brand-primary" /> {city}
            </motion.div>
          ))}
        </div>

        <div className="relative h-[400px] md:h-[600px] w-full rounded-[3rem] overflow-hidden group">
          <img 
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=2070&auto=format&fit=crop" 
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
            alt="Students collaborating" 
          />
          <div className="absolute inset-0 bg-brand-navy/40 flex items-center justify-center p-6 text-center">
            <div className="max-w-2xl">
              <h4 className="text-white text-3xl md:text-5xl font-heading font-bold mb-6">"Our goal is to reach 100,000 students by 2026."</h4>
              <p className="text-white/80 text-xl font-medium">— Upperclass AI Management</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  return (
    <section className="py-24 bg-brand-offwhite">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-brand-primary font-bold tracking-widest text-sm mb-4 uppercase">SCHOOL SPOTLIGHT</h2>
        <h3 className="text-4xl md:text-5xl font-heading font-bold text-brand-navy mb-16">What education leaders say.</h3>
        
        <div className="grid md:grid-cols-2 gap-8 text-left">
          {[1, 2].map((i) => (
            <div key={i} className="bg-white p-12 rounded-[2.5rem] shadow-sm border border-brand-light relative">
              <div className="text-brand-primary/20 absolute top-10 right-10">
                <svg width="60" height="60" viewBox="0 0 24 24" fill="currentColor"><path d="M14.017 21L14.017 18C14.017 16.8954 14.9124 16 16.017 16H19.017C19.5693 16 20.017 15.5523 20.017 15V9C20.017 8.44772 19.5693 8 19.017 8H16.017C14.9124 8 14.017 7.10457 14.017 6V5C14.017 3.89543 14.9124 3 16.017 3H19.017C21.2261 3 23.017 4.79086 23.017 7V15C23.017 18.3137 20.3307 21 17.017 21H14.017ZM1.0166 21L1.0166 18C1.0166 16.8954 1.91203 16 3.0166 16H6.0166C6.56888 16 7.0166 15.5523 7.0166 15V9C7.0166 8.44772 6.56888 8 6.0166 8H3.0166C1.91203 8 1.0166 7.10457 1.0166 6V5C1.0166 3.89543 1.91203 3 3.0166 3H6.0166C8.22574 3 10.0166 4.79086 10.0166 7V15C10.0166 18.3137 7.3303 21 4.0166 21H1.0166Z"/></svg>
              </div>
              <p className="text-xl text-brand-navy font-medium italic mb-10 leading-relaxed">
                "Upperclass AI has transformed how our students perceive technology. It's no longer just a subject; it's a tool they use to solve problems every day."
              </p>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-brand-light rounded-full" />
                <div>
                  <div className="font-bold text-brand-navy">Administrator Name</div>
                  <div className="text-sm text-brand-navy/60">Prestigious School, Lagos</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const CTA = () => {
  return (
    <section className="py-24 bg-brand-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-navy/10" />
      <motion.div 
        animate={{ scale: [1, 1.2, 1] }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute top-[-50%] left-[-20%] w-[80%] h-[150%] bg-white/5 rounded-full blur-[120px]"
      />
      
      <div className="max-w-4xl mx-auto px-6 text-center relative z-10 text-white">
        <h2 className="text-5xl md:text-7xl font-heading font-black mb-8 leading-tight italic text-shadow-xl">
          "...start with imagination"
        </h2>
        <p className="text-2xl font-medium mb-12 text-white/90 leading-relaxed">
          Ready to bring the future to your school? Partner with Nigeria’s leading AI & Robotics educators.
        </p>
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <button className="bg-white text-brand-primary px-10 py-5 rounded-full font-black text-xl hover:bg-brand-navy hover:text-white transition-all shadow-2xl active:scale-95">
            Book a School Demo
          </button>
          <button className="bg-brand-navy text-white px-10 py-5 rounded-full font-black text-xl hover:bg-white hover:text-brand-navy transition-all active:scale-95">
            Contact Support
          </button>
        </div>
        <div className="mt-16 flex justify-center gap-8 text-white/60">
          <div className="flex items-center gap-2 font-bold"><CheckCircle2 size={20} /> Zero Setup Cost</div>
          <div className="flex items-center gap-2 font-bold"><CheckCircle2 size={20} /> Expert Facilitators</div>
          <div className="flex items-center gap-2 font-bold"><CheckCircle2 size={20} /> Global Curriculum</div>
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-brand-navy pt-24 pb-12 text-white/60 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-brand-primary rounded-lg flex items-center justify-center text-white font-bold text-xl">
                U
              </div>
              <span className="font-heading font-bold text-2xl tracking-tight text-white">
                UPPERCLASS <span className="text-brand-primary">AI</span>
              </span>
            </div>
            <p className="max-w-sm text-lg leading-relaxed mb-8">
              A premium Nigerian EdTech company specializing in high-end AI and Robotics education for the next generation.
            </p>
            <div className="flex gap-4">
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors cursor-pointer"><Globe size={20} /></div>
              <div className="w-10 h-10 bg-white/5 rounded-full flex items-center justify-center hover:bg-brand-primary transition-colors cursor-pointer"><Users size={20} /></div>
            </div>
          </div>
          
          <div>
            <h5 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Quick Links</h5>
            <ul className="space-y-4">
              <li><a href="#about" className="hover:text-brand-primary transition-colors">Who We Are</a></li>
              <li><a href="#programs" className="hover:text-brand-primary transition-colors">Our Programs</a></li>
              <li><a href="#why" className="hover:text-brand-primary transition-colors">Why Upperclass AI</a></li>
              <li><a href="#" className="hover:text-brand-primary transition-colors">Impact & Reach</a></li>
            </ul>
          </div>

          <div>
            <h5 className="text-white font-bold mb-6 tracking-wider uppercase text-sm">Contact</h5>
            <ul className="space-y-4">
              <li className="flex items-center gap-3"><MapPin size={18} /> Lagos, Nigeria</li>
              <li className="flex items-center gap-3">hello@upperclass.ai</li>
              <li className="flex items-center gap-3">+234 (0) 000 000 0000</li>
            </ul>
          </div>
        </div>
        
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
          <p>© 2026 Upperclass AI Limited. All rights reserved.</p>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

function App() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <WhoWeAre />
        <Programs />
        <WhyUs />
        <Impact />
        <Testimonials />
        <CTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
