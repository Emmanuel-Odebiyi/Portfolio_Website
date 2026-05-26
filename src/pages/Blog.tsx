import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Search, 
  ArrowUpRight,
  ChevronDown,
  Mail,
  CheckCircle,
  Calendar,
  Clock,
  ChevronRight
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { allBlogPosts as blogPosts } from '../data/blogLoader';

export default function Blog() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [visibleCount, setVisibleCount] = useState(4);
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [subscribing, setSubscribing] = useState(false);

  // Extract all unique tags dynamically
  const allTags = ["All", ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))];

  const featuredPost = blogPosts[0];

  const filteredPosts = blogPosts.filter(post => {
    const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesTag && matchesSearch;
  });

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes('@')) return;
    setSubscribing(true);
    setTimeout(() => {
      setSubscribing(false);
      setIsSubscribed(true);
      setEmail("");
    }, 1200);
  };

  const handleLoadMore = () => {
    setVisibleCount(prev => Math.min(prev + 2, filteredPosts.length));
  };

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-[#f8fafc] overflow-hidden">
      <SEO 
        title="Growth Intelligence Blog | Emmanuel Odebiyi"
        description="Practical, no-fluff guides on content marketing automation, organic SEO frameworks, and AI workflows for B2B SaaS and high-growth businesses."
        keywords="marketing automation blog, SEO strategies, AI content implementation, B2B organic growth, Emmanuel Odebiyi"
      />
      
      {/* Dynamic Background Aurora */}
      <div className="absolute top-0 left-0 w-full h-[500px] overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[80%] rounded-full bg-blue-600/10 blur-[120px] aurora-orb-1" />
        <div className="absolute top-[-10%] right-[-10%] w-[45%] h-[75%] rounded-full bg-indigo-600/10 blur-[120px] aurora-orb-2" />
      </div>

      {/* Full Viewport Cinematic Featured Post Hero */}
      <section className="relative h-[90vh] md:h-screen w-full overflow-hidden group z-10 border-b border-white/5">
        <Link to={`/blog/${featuredPost.id}`}>
          <motion.div 
            initial={{ scale: 1.05 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src={featuredPost.image} 
              alt={featuredPost.title} 
              className="w-full h-full object-cover transition-transform duration-[2400ms] ease-out group-hover:scale-103"
              referrerPolicy="no-referrer"
            />
            {/* Dark glassmorphic gradient overlay for crisp readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/60 to-black/30" />
            <div className="absolute inset-0 bg-[#0a0f1e]/20" />
          </motion.div>

          <div className="absolute inset-0 flex flex-col justify-end pb-16 md:pb-24 px-6 md:px-12">
            <div className="max-w-7xl mx-auto w-full relative">
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.9 }}
                className="space-y-6 max-w-4xl text-left"
              >
                {/* Tag and read time badge */}
                <div className="flex items-center gap-3">
                  <span className="px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-[#60a5fa] bg-blue-500/10 border border-blue-500/20 rounded-full backdrop-blur-md">
                    Featured Insight
                  </span>
                  <span className="text-xs text-zinc-400 font-mono flex items-center gap-1.5">
                    <Clock size={12} /> {featuredPost.readTime}
                  </span>
                </div>

                <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight text-white leading-[0.95] font-display">
                  {featuredPost.title}
                </h1>
                
                <p className="text-lg md:text-2xl text-zinc-300 font-light max-w-3xl leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                {/* Author Info & Date */}
                <div className="flex items-center gap-4 pt-4">
                  <img 
                    src={featuredPost.authorImage} 
                    alt={featuredPost.author} 
                    className="w-12 h-12 rounded-full border border-white/10 shadow-lg shadow-black/30"
                  />
                  <div>
                    <p className="font-bold text-white tracking-tight">{featuredPost.author}</p>
                    <p className="text-xs text-zinc-400 font-mono uppercase tracking-widest flex items-center gap-1.5 mt-0.5">
                      <Calendar size={11} /> {featuredPost.date}
                    </p>
                  </div>
                  <div className="ml-auto md:ml-8 w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-[#2563eb] group-hover:border-[#2563eb] transition-all duration-300">
                    <ArrowUpRight size={20} className="text-white group-hover:scale-110 transition-transform" />
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Link>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/40 cursor-pointer hidden md:flex flex-col items-center gap-1"
          onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })}
        >
          <span className="text-[10px] uppercase font-mono tracking-widest">Explore Insights</span>
          <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* Main Blog Explorer */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
        
        {/* Title and Search Control Panel */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div className="space-y-4 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-blue-500 animate-pulse" />
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">Knowledge Lab</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-white">
              Organic Growth & Systems Architecture
            </h2>
            <p className="text-lg text-zinc-400 font-light leading-relaxed">
              Tactical blueprints, automation templates, and case studies detailing how we build high-converting content frameworks and technical SEO foundations.
            </p>
          </div>
          
          {/* Enhanced Search Input */}
          <div className="relative w-full lg:w-96 group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-md opacity-20 group-focus-within:opacity-40 transition-opacity duration-300" />
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search by topic, tag, keyword..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#0f172a]/80 border border-white/10 rounded-2xl px-6 py-4.5 pl-14 text-white text-sm focus:outline-none focus:border-blue-500/50 placeholder-zinc-500 backdrop-blur-md transition-all font-sans"
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400 group-focus-within:text-blue-400 transition-colors" size={18} />
            </div>
          </div>
        </div>

        {/* Premium Topic Filters */}
        <div className="flex flex-wrap gap-2.5 mb-16 border-b border-white/5 pb-8">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTag(tag);
                setVisibleCount(4); // Reset pagination on filter change
              }}
              className={`px-5 py-2.5 rounded-xl text-xs font-bold font-mono tracking-wider uppercase transition-all border ${
                selectedTag === tag
                  ? 'bg-blue-500 text-white border-blue-400/20 shadow-lg shadow-blue-500/15'
                  : 'bg-white/5 text-zinc-400 border-white/5 hover:border-white/15 hover:text-white'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Asymmetrical Editorial Grid */}
        <AnimatePresence mode="popLayout">
          {filteredPosts.length > 0 ? (
            <motion.div 
              layout 
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
            >
              {filteredPosts.slice(0, visibleCount).map((post, idx) => {
                // Design an asymmetrical layout where cards are styled differently based on index
                const isLargeCard = idx === 0 && selectedTag === "All" && searchQuery === "";
                
                return (
                  <motion.div
                    key={post.id}
                    layout
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.5, ease: "easeOut" }}
                    className={`${
                      isLargeCard 
                        ? 'md:col-span-2 lg:col-span-3 lg:grid lg:grid-cols-12 gap-8' 
                        : 'col-span-1'
                    } group bg-[#0f172a]/30 border border-white/5 rounded-[2rem] overflow-hidden hover:border-white/10 hover:bg-[#0f172a]/50 transition-all duration-300 flex flex-col justify-between`}
                  >
                    <Link to={`/blog/${post.id}`} className={`block h-full ${isLargeCard ? 'lg:flex col-span-12' : ''}`}>
                      
                      {/* Image Frame */}
                      <div className={`overflow-hidden relative ${
                        isLargeCard 
                          ? 'lg:w-[55%] aspect-[16/10] lg:aspect-auto h-full' 
                          : 'aspect-[16/10] w-full'
                      }`}>
                        <img 
                          src={post.image} 
                          alt={post.title} 
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e]/60 to-transparent pointer-events-none" />
                        <div className="absolute top-5 left-5 flex gap-2">
                          {post.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="px-2.5 py-1 text-[9px] font-mono uppercase tracking-widest text-[#f8fafc] bg-black/40 backdrop-blur-md rounded border border-white/10"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Content Frame */}
                      <div className={`p-8 flex flex-col justify-between text-left ${
                        isLargeCard ? 'lg:w-[45%] lg:p-12' : 'flex-1'
                      }`}>
                        <div className="space-y-4">
                          <div className="flex items-center gap-3 text-zinc-500 text-xs font-mono">
                            <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                          </div>

                          <h3 className={`${
                            isLargeCard ? 'text-3xl md:text-5xl font-display leading-tight' : 'text-2xl font-bold leading-snug'
                          } text-white group-hover:text-blue-400 transition-colors`}>
                            {post.title}
                          </h3>

                          <p className="text-zinc-400 font-light text-sm md:text-base leading-relaxed line-clamp-3">
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Author Footer */}
                        <div className="flex items-center gap-3 pt-8 mt-6 border-t border-white/5">
                          <img 
                            src={post.authorImage} 
                            alt={post.author} 
                            className="w-8 h-8 rounded-full border border-white/10"
                          />
                          <div>
                            <p className="text-xs font-bold text-white">{post.author}</p>
                            <p className="text-[10px] text-zinc-500 font-mono uppercase">Author</p>
                          </div>
                          
                          <div className="ml-auto w-8 h-8 rounded-full bg-white/5 border border-white/15 flex items-center justify-center group-hover:bg-blue-600 group-hover:border-blue-600 transition-all duration-300">
                            <ChevronRight size={16} className="text-white" />
                          </div>
                        </div>

                      </div>

                    </Link>
                  </motion.div>
                );
              })}
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-24 bg-[#0f172a]/20 border border-white/5 rounded-3xl backdrop-blur-sm"
            >
              <div className="max-w-md mx-auto space-y-4">
                <p className="text-zinc-500 text-sm font-mono uppercase tracking-widest">No articles found</p>
                <h3 className="text-2xl font-bold text-white">We couldn't find matching insights</h3>
                <p className="text-zinc-400 font-light text-sm">
                  Try adjusting your search keywords or choosing a different category filter.
                </p>
                <button 
                  onClick={() => { setSelectedTag("All"); setSearchQuery(""); }}
                  className="px-6 py-2.5 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-bold text-white mt-4 font-mono transition-colors"
                >
                  Clear All Filters
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Real Dynamic Pagination / Load More */}
        {filteredPosts.length > visibleCount && (
          <div className="mt-20 flex justify-center">
            <button 
              onClick={handleLoadMore}
              className="px-10 py-4.5 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl transition-all shadow-xl shadow-blue-500/10 flex items-center gap-3 group relative overflow-hidden"
            >
              <span className="relative z-10 flex items-center gap-2 text-sm font-mono tracking-wider uppercase">
                Load More Insights
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </div>
        )}
      </section>

      {/* Stateful interactive Newsletter Section */}
      <section className="bg-zinc-950/60 border-t border-white/5 py-28 px-6 overflow-hidden relative">
        {/* Background Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/10 blur-[100px] rounded-full pointer-events-none" />

        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <span className="text-xs font-mono uppercase tracking-widest text-[#60a5fa]">Organic Scale Insights</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold text-white tracking-tight leading-none font-display">
              Get Weekly Systems That <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-indigo-500 italic">Actually Scale</span>
            </h2>
            
            <p className="text-zinc-400 font-light max-w-2xl mx-auto text-sm md:text-base leading-relaxed">
              Join 500+ marketers and business owners getting actionable marketing automation frameworks, customized technical SEO audits, and AI workflows straight to their inbox.
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!isSubscribed ? (
              <motion.form 
                onSubmit={handleSubscribe}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="max-w-lg mx-auto relative group"
              >
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-2xl blur-md opacity-25 group-focus-within:opacity-50 transition-opacity duration-300" />
                <div className="relative flex flex-col md:flex-row gap-3 bg-[#0f172a]/95 border border-white/10 p-2.5 rounded-2xl backdrop-blur-md">
                  <input 
                    type="email" 
                    required
                    disabled={subscribing}
                    placeholder="Enter your professional email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent px-5 py-4 text-white text-sm focus:outline-none placeholder-zinc-500 disabled:opacity-50"
                  />
                  <button 
                    type="submit"
                    disabled={subscribing}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-xs uppercase tracking-wider font-mono shadow-lg disabled:opacity-50"
                  >
                    {subscribing ? (
                      <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    ) : (
                      <>
                        Subscribe
                        <Mail size={16} />
                      </>
                    )}
                  </button>
                </div>
              </motion.form>
            ) : (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md mx-auto p-8 rounded-3xl bg-[#0f172a]/60 border border-blue-500/20 flex flex-col items-center gap-4 backdrop-blur-md shadow-2xl shadow-blue-500/5"
              >
                <div className="w-16 h-16 rounded-full bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400">
                  <CheckCircle size={32} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold text-white">You're in the loop!</h4>
                  <p className="text-zinc-400 text-xs font-light">
                    We've sent a confirmation email to join the newsletter circle.
                  </p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>
    </div>
  );
}
