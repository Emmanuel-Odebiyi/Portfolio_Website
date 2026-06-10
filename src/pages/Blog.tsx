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
    <div className="min-h-screen" style={{ backgroundColor: 'var(--bg-page)', color: 'var(--text-body)' }}>
      <SEO 
        title="Growth Intelligence Blog | Emmanuel Odebiyi"
        description="Practical, no-fluff guides on content marketing automation, organic SEO frameworks, and AI workflows for B2B SaaS and high-growth businesses."
        keywords="marketing automation blog, SEO strategies, AI content implementation, B2B organic growth, Emmanuel Odebiyi"
      />

      {/* Full Viewport Cinematic Featured Post Hero */}
      <section className="relative h-[90vh] md:h-screen w-full overflow-hidden group z-10 border-b" style={{ borderColor: 'var(--border-card)' }}>
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
              width={1920}
              height={1080}
              className="w-full h-full object-cover transition-transform duration-[2400ms] ease-out group-hover:scale-103"
              referrerPolicy="no-referrer"
            />
            {/* Top-down dark overlay to bring out the header text and logo */}
            <div className="absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-[#0E1C2A]/70 via-[#0E1C2A]/30 to-transparent pointer-events-none z-10" />
            {/* Dark glassmorphic gradient overlay for crisp readability */}
            <div className="absolute inset-0" style={{ background: 'linear-gradient(to top, var(--bg-page) 0%, transparent 100%)', opacity: 0.8 }} />
            <div className="absolute inset-0" style={{ backgroundColor: 'var(--bg-page)', opacity: 0.15 }} />
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
                  <span 
                    className="px-3.5 py-1 text-xs font-sans font-bold uppercase tracking-widest border rounded-full backdrop-blur-md"
                    style={{ color: 'var(--accent-amber)', borderColor: 'var(--border-card)', backgroundColor: 'var(--bg-surface)' }}
                  >
                    Featured Insight
                  </span>
                  <span className="text-xs font-sans font-bold uppercase tracking-widest flex items-center gap-1.5" style={{ color: 'var(--text-muted)' }}>
                    <Clock size={12} /> {featuredPost.readTime}
                  </span>
                </div>

                <h1 className="text-4xl md:text-7xl lg:text-8xl font-bold tracking-tight leading-[0.95] font-display" style={{ color: 'var(--text-body)' }}>
                  {featuredPost.title}
                </h1>
                
                <p className="text-lg md:text-2xl font-light max-w-3xl leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {featuredPost.excerpt}
                </p>
                
                {/* Author Info & Date */}
                <div className="flex items-center gap-4 pt-4">
                  <img 
                    src={featuredPost.authorImage} 
                    alt={featuredPost.author} 
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded-full border shadow-lg"
                    style={{ borderColor: 'var(--border-card)' }}
                  />
                  <div>
                    <p className="font-bold tracking-tight" style={{ color: 'var(--text-body)' }}>{featuredPost.author}</p>
                    <p className="text-xs font-sans font-bold uppercase tracking-widest flex items-center gap-1.5 mt-0.5" style={{ color: 'var(--text-muted)' }}>
                      <Calendar size={11} /> {featuredPost.date}
                    </p>
                  </div>
                  <div 
                    className="ml-auto md:ml-8 w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300 hover:brightness-110"
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                  >
                    <ArrowUpRight size={20} style={{ color: 'var(--text-body)' }} className="group-hover:scale-110 transition-transform" />
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
          className="absolute bottom-6 left-1/2 -translate-x-1/2 cursor-pointer hidden md:flex flex-col items-center gap-1"
          style={{ color: 'var(--text-muted)' }}
          onClick={() => window.scrollTo({ top: window.innerHeight - 80, behavior: 'smooth' })}
        >
          <span className="text-[10px] uppercase font-sans font-bold tracking-widest">Explore Insights</span>
          <ChevronDown size={20} />
        </motion.div>
      </section>

      {/* Main Blog Explorer */}
      <section className="max-w-7xl mx-auto px-6 py-24 md:py-32 relative z-10">
        
        {/* Title and Search Control Panel */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-8 mb-16">
          <div className="space-y-4 max-w-2xl text-left">
            <div className="inline-flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
              <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Knowledge Lab</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold font-display tracking-tight" style={{ color: 'var(--text-body)' }}>
              Organic Growth & Systems Architecture
            </h2>
            <p className="text-lg font-light leading-relaxed" style={{ color: 'var(--text-muted)' }}>
              Tactical blueprints, automation templates, and case studies detailing how we build high-converting content frameworks and technical SEO foundations.
            </p>
          </div>
          
          {/* Enhanced Search Input */}
          <div className="relative w-full lg:w-96 group">
            <div className="relative">
              <input 
                type="text" 
                placeholder="Search by topic, tag, keyword..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border rounded-2xl px-6 py-4 pl-14 text-base focus:outline-none placeholder-zinc-500 transition-all"
                style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
              />
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 transition-colors" style={{ color: 'var(--text-muted)' }} size={18} />
            </div>
          </div>
        </div>

        {/* Premium Topic Filters */}
        <div className="flex flex-wrap gap-2.5 mb-16 border-b pb-8" style={{ borderColor: 'var(--border-card)' }}>
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => {
                setSelectedTag(tag);
                setVisibleCount(4); // Reset pagination on filter change
              }}
              className="px-5 py-2.5 rounded-xl text-xs font-bold font-sans tracking-widest uppercase transition-all border"
              style={{
                backgroundColor: selectedTag === tag ? 'var(--text-body)' : 'var(--bg-surface)',
                color: selectedTag === tag ? 'var(--bg-page)' : 'var(--text-muted)',
                borderColor: selectedTag === tag ? 'var(--text-body)' : 'var(--border-card)'
              }}
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
                    } group border rounded-[2rem] overflow-hidden transition-all duration-300 flex flex-col justify-between`}
                    style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
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
                          width={380}
                          height={240}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                          referrerPolicy="no-referrer"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
                        <div className="absolute top-5 left-5 flex gap-2">
                          {post.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="px-2.5 py-1 text-[9px] font-sans font-bold uppercase tracking-widest border rounded"
                              style={{ color: 'var(--text-body)', backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
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
                          <div className="flex items-center gap-3 text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>
                            <span className="flex items-center gap-1"><Calendar size={12} /> {post.date}</span>
                            <span>•</span>
                            <span className="flex items-center gap-1"><Clock size={12} /> {post.readTime}</span>
                          </div>

                          <h3 
                            className={`${
                              isLargeCard ? 'text-3xl md:text-5xl font-display leading-tight' : 'text-2xl font-bold font-display leading-snug'
                            } transition-colors group-hover:text-[var(--accent-amber)]`}
                            style={{ color: 'var(--text-body)' }}
                          >
                            {post.title}
                          </h3>

                          <p className="font-light text-sm md:text-base leading-relaxed line-clamp-3" style={{ color: 'var(--text-muted)' }}>
                            {post.excerpt}
                          </p>
                        </div>

                        {/* Author Footer */}
                        <div className="flex items-center gap-3 pt-8 mt-6 border-t" style={{ borderColor: 'var(--border-card)' }}>
                          <img 
                            src={post.authorImage} 
                            alt={post.author} 
                            width={32}
                            height={32}
                            className="w-8 h-8 rounded-full border"
                            style={{ borderColor: 'var(--border-card)' }}
                          />
                          <div>
                            <p className="text-xs font-bold" style={{ color: 'var(--text-body)' }}>{post.author}</p>
                            <p className="text-[10px] font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Author</p>
                          </div>
                          
                          <div 
                            className="ml-auto w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300 group-hover:brightness-110"
                            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
                          >
                            <ChevronRight size={16} style={{ color: 'var(--text-body)' }} />
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
              className="text-center py-24 border rounded-3xl"
              style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)' }}
            >
              <div className="max-w-md mx-auto space-y-4">
                <p className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>No articles found</p>
                <h3 className="text-2xl font-bold font-display" style={{ color: 'var(--text-body)' }}>We couldn't find matching insights</h3>
                <p className="font-light text-sm" style={{ color: 'var(--text-muted)' }}>
                  Try adjusting your search keywords or choosing a different category filter.
                </p>
                <button 
                  onClick={() => { setSelectedTag("All"); setSearchQuery(""); }}
                  className="px-6 py-2.5 border rounded-xl text-xs font-sans font-bold tracking-widest uppercase mt-4 transition-colors"
                  style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)', color: 'var(--text-body)' }}
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
              className="px-10 py-5 font-bold rounded-2xl transition-all shadow-xl flex items-center gap-3 group hover:brightness-110"
              style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
            >
              <span className="relative z-10 flex items-center gap-2 text-sm font-sans uppercase tracking-widest">
                Load More Insights
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </span>
            </button>
          </div>
        )}
      </section>

      {/* Stateful interactive Newsletter Section */}
      <section className="border-t py-28 px-6 overflow-hidden relative" style={{ backgroundColor: 'var(--bg-surface-alt)', borderColor: 'var(--border-card)' }}>
        <div className="max-w-4xl mx-auto text-center space-y-10 relative z-10">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: 'var(--accent-amber)' }} />
              <span className="text-xs font-sans font-bold uppercase tracking-widest" style={{ color: 'var(--text-muted)' }}>Organic Scale Insights</span>
            </div>
            
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight leading-none font-display" style={{ color: 'var(--text-body)' }}>
              Get weekly systems that <span className="italic font-medium" style={{ color: 'var(--accent-amber)' }}>actually scale</span>
            </h2>
            
            <p className="font-light max-w-2xl mx-auto text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
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
                <div 
                  className="relative flex flex-col md:flex-row gap-3 border p-2.5 rounded-2xl backdrop-blur-md"
                  style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
                >
                  <input 
                    type="email" 
                    required
                    disabled={subscribing}
                    placeholder="Enter your professional email address" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1 bg-transparent px-5 py-4 text-base focus:outline-none placeholder-zinc-500 disabled:opacity-50"
                    style={{ color: 'var(--text-body)' }}
                  />
                  <button 
                    type="submit"
                    disabled={subscribing}
                    className="font-bold text-xs uppercase tracking-widest font-sans shadow-lg disabled:opacity-50 px-8 py-4 rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all"
                    style={{ backgroundColor: 'var(--btn-cta-bg)', color: 'var(--btn-cta-text)' }}
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
                className="max-w-md mx-auto p-8 rounded-3xl border flex flex-col items-center gap-4 backdrop-blur-md shadow-2xl"
                style={{ backgroundColor: 'var(--bg-page)', borderColor: 'var(--border-card)' }}
              >
                <div className="w-16 h-16 rounded-full flex items-center justify-center" style={{ backgroundColor: 'var(--bg-surface)', border: '1px solid var(--border-card)', color: 'var(--accent-amber)' }}>
                  <CheckCircle size={32} />
                </div>
                <div className="space-y-1">
                  <h4 className="text-lg font-bold" style={{ color: 'var(--text-body)' }}>You're in the loop!</h4>
                  <p className="text-xs font-light" style={{ color: 'var(--text-muted)' }}>
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
