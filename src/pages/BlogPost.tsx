import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  Clock, 
  Share2, 
  Bookmark,
  CheckCircle2,
  Lightbulb,
  ArrowUpRight,
  ClipboardCheck,
  Check,
  ChevronRight,
  BookOpen
} from 'lucide-react';
import { SEO } from '../components/SEO';
import { blogPosts } from '../data/blogData';

export default function BlogPost() {
  const { id } = useParams();
  
  // Find post dynamically
  const post = blogPosts.find(p => p.id === id) || blogPosts[0];

  const [scrollPercent, setScrollPercent] = useState(0);
  const [activeSection, setActiveSection] = useState(0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Check and manage bookmarks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem('blog_bookmarks');
      if (saved) {
        const list = JSON.parse(saved) as string[];
        setIsBookmarked(list.includes(post.id));
      }
    } catch (e) {
      console.warn("Storage access not allowed:", e);
    }
  }, [post.id]);

  const toggleBookmark = () => {
    try {
      const saved = localStorage.getItem('blog_bookmarks');
      let list = saved ? (JSON.parse(saved) as string[]) : [];
      if (list.includes(post.id)) {
        list = list.filter(item => item !== post.id);
        setIsBookmarked(false);
        triggerToast("Removed from bookmarks");
      } else {
        list.push(post.id);
        setIsBookmarked(true);
        triggerToast("Saved to bookmarks! 🔖");
      }
      localStorage.setItem('blog_bookmarks', JSON.stringify(list));
    } catch (e) {
      triggerToast("Could not save bookmark");
    }
  };

  const copyShareLink = () => {
    navigator.clipboard.writeText(window.location.href)
      .then(() => {
        triggerToast("Link copied to clipboard! 📋");
      })
      .catch(() => {
        triggerToast("Failed to copy link");
      });
  };

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2500);
  };

  // Scroll percent calculations for progress bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight <= 0) return;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollPercent(progress);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scrollspy to set active Table of Contents header
  useEffect(() => {
    const handleScrollSpy = () => {
      const scrollPosition = window.scrollY + 180;
      post.sections.forEach((_, idx) => {
        const el = document.getElementById(`section-${idx}`);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(idx);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScrollSpy);
    // Initial call
    setTimeout(handleScrollSpy, 200);

    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, [post.sections]);

  // Logic to find related articles based on tags overlap
  const relatedPosts = blogPosts
    .filter(p => p.id !== post.id) // Exclude current post
    .map(p => {
      let score = 0;
      p.tags.forEach(tag => {
        if (post.tags.includes(tag)) score += 2;
      });
      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score) // Sort by relevance
    .slice(0, 3); // Take top 3

  return (
    <div className="min-h-screen bg-[#0a0f1e] text-[#f8fafc] overflow-hidden">
      <SEO 
        title={`${post.title} | Emmanuel Odebiyi`}
        description={post.excerpt}
        keywords={post.tags.join(", ")}
      />

      {/* Floating Scroll Progress Bar */}
      <div className="fixed top-0 left-0 w-full h-1 bg-white/5 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 transition-all duration-75"
          style={{ width: `${scrollPercent}%` }}
        />
      </div>

      {/* Floating Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: '-50%' }}
            animate={{ opacity: 1, y: 0, x: '-50%' }}
            exit={{ opacity: 0, y: 20, x: '-50%' }}
            className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-50 bg-[#0f172a] border border-blue-500/30 text-white px-6 py-3.5 rounded-2xl shadow-2xl shadow-blue-500/10 flex items-center gap-3 backdrop-blur-md"
          >
            <Check size={16} className="text-blue-400" />
            <span className="text-sm font-mono tracking-wide">{toastMessage}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Article Hero Banner */}
      <section className="relative h-[80vh] w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.8, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={post.heroImage} 
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Crisp, deep overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0a0f1e] via-[#0a0f1e]/70 to-black/35" />
          <div className="absolute inset-0 bg-[#0a0f1e]/15" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-20 max-w-7xl mx-auto w-full relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
            className="space-y-6 max-w-4xl text-left"
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-zinc-400 hover:text-white transition-colors mb-2 group font-mono text-xs uppercase tracking-widest">
              <ArrowLeft size={14} className="group-hover:-translate-x-1 transition-transform" />
              Back to Insights
            </Link>
            
            <h1 className="text-4xl md:text-7xl font-bold text-white tracking-tight leading-[0.95] font-display">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-6 pt-4">
              <div className="flex items-center gap-3">
                <img 
                  src={post.authorImage} 
                  alt={post.author} 
                  className="w-10 h-10 rounded-full border border-white/10" 
                />
                <div>
                  <p className="text-white font-bold text-sm leading-none">{post.author}</p>
                  <p className="text-zinc-500 text-[10px] font-mono uppercase tracking-wider mt-1">{post.date}</p>
                </div>
              </div>
              
              <div className="h-4 w-px bg-white/10 hidden sm:block" />

              <div className="flex items-center gap-6 text-zinc-400 text-xs font-mono">
                <span className="flex items-center gap-1.5"><Clock size={13} /> {post.readTime}</span>
                <button 
                  onClick={copyShareLink}
                  className="flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none"
                  title="Share Link"
                >
                  <Share2 size={13} /> Share
                </button>
                <button 
                  onClick={toggleBookmark}
                  className="flex items-center gap-1.5 hover:text-white transition-colors focus:outline-none"
                  title="Bookmark post"
                >
                  <Bookmark size={13} className={isBookmarked ? "fill-blue-500 text-blue-500" : ""} /> Bookmark
                </button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Main Content Layout */}
      <section className="max-w-7xl mx-auto px-6 py-20 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          
          {/* Sticky Left Table of Contents */}
          <aside className="hidden lg:block lg:col-span-3 sticky top-28 h-fit space-y-8 text-left border-r border-white/5 pr-6">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                <BookOpen size={12} />
                <span>Reading Guide</span>
              </div>
              <h4 className="text-sm font-bold text-white font-sans">Core Framework</h4>
            </div>
            
            <nav className="flex flex-col gap-2 relative">
              {post.sections.map((sec, idx) => (
                <a
                  key={idx}
                  href={`#section-${idx}`}
                  className={`text-sm font-light py-2 pl-4 border-l transition-all duration-300 ${
                    activeSection === idx
                      ? 'text-blue-400 border-blue-500 font-medium'
                      : 'text-zinc-500 border-white/5 hover:text-zinc-300 hover:border-white/10'
                  }`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(`section-${idx}`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
                  }}
                >
                  {sec.heading}
                </a>
              ))}
            </nav>

            {/* Quick Actions Panel */}
            <div className="pt-8 border-t border-white/5 space-y-4">
              <button 
                onClick={copyShareLink}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/8 transition-all text-xs font-mono text-zinc-300 hover:text-white"
              >
                <span>Share Insight</span>
                <Share2 size={12} />
              </button>
              <button 
                onClick={toggleBookmark}
                className="w-full flex items-center justify-between px-4 py-3 rounded-xl bg-white/5 border border-white/5 hover:border-white/10 hover:bg-white/8 transition-all text-xs font-mono text-zinc-300 hover:text-white"
              >
                <span>{isBookmarked ? "Bookmarked" : "Bookmark Insight"}</span>
                <Bookmark size={12} className={isBookmarked ? "fill-blue-500 text-blue-500" : ""} />
              </button>
            </div>
          </aside>

          {/* Article Central Column */}
          <article className="col-span-1 lg:col-span-8 lg:pl-6 text-left">
            
            {/* Hook / Introduction */}
            <section className="mb-16">
              <p className="text-2xl md:text-3xl font-light text-zinc-300 leading-relaxed italic border-l-4 border-blue-500 pl-8 font-sans">
                "{post.hook}"
              </p>
            </section>

            {/* Content Sections */}
            <div className="space-y-20">
              {post.sections.map((section, index) => (
                <section 
                  key={index} 
                  id={`section-${index}`} 
                  className="space-y-6 scroll-mt-24 transition-opacity"
                >
                  <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
                    <span className="text-zinc-600 text-sm font-mono tracking-wider font-light">0{index + 1}.</span>
                    {section.heading}
                  </h2>
                  
                  <div className="prose prose-invert max-w-none text-zinc-300 font-light text-base md:text-lg leading-relaxed space-y-4">
                    <p className="whitespace-pre-line">{section.content}</p>
                  </div>

                  {/* Styled Section Extras */}
                  {section.example && (
                    <div className="p-8 rounded-3xl bg-[#0f172a]/50 border border-amber-500/20 shadow-lg shadow-amber-500/5 space-y-3 relative overflow-hidden">
                      <div className="flex items-center gap-2 text-amber-400 font-mono text-[10px] uppercase tracking-widest">
                        <Lightbulb size={14} />
                        <span>Example Playbook</span>
                      </div>
                      <p className="text-base text-zinc-200 font-light leading-relaxed italic">
                        "{section.example}"
                      </p>
                    </div>
                  )}

                  {section.highlight && (
                    <div className="p-8 rounded-3xl bg-gradient-to-r from-blue-500/10 to-indigo-500/10 border border-blue-500/20 shadow-lg space-y-2">
                      <p className="text-lg md:text-xl font-medium text-white leading-snug">
                        {section.highlight}
                      </p>
                    </div>
                  )}

                  {section.simplification && (
                    <div className="p-8 rounded-3xl bg-[#0a0f1e]/80 border border-white/5 text-white space-y-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-2xl rounded-full" />
                      <div className="relative z-10 space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#60a5fa] block">
                          {section.simplification.label}
                        </span>
                        <p className="text-base md:text-lg font-light leading-relaxed text-zinc-300">
                          {section.simplification.text}
                        </p>
                      </div>
                    </div>
                  )}

                  {section.list && (
                    <ul className="space-y-3.5 pt-2 pl-2">
                      {section.list.map((item, i) => (
                        <li key={i} className="flex items-start gap-3.5 group">
                          <div className="mt-2.5 w-1.5 h-1.5 rounded-full bg-blue-500 flex-shrink-0" />
                          <span className="text-base md:text-lg text-zinc-300 font-light leading-relaxed">{item}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {section.quote && (
                    <div className="py-10 border-y border-white/5 my-10 relative">
                      <p className="text-2xl md:text-3xl font-display italic text-white leading-relaxed text-center max-w-2xl mx-auto">
                        "{section.quote.text}"
                      </p>
                      <p className="text-center mt-4 text-zinc-500 font-mono text-[10px] uppercase tracking-widest">
                        — {section.quote.author}
                      </p>
                    </div>
                  )}

                  {section.table && (
                    <div className="my-8 overflow-x-auto rounded-2xl border border-white/5 shadow-2xl shadow-black/20">
                      <table className="w-full text-left border-collapse">
                        <thead>
                          <tr className="bg-white/5 border-b border-white/5">
                            {section.table.headers.map((header, i) => (
                              <th key={i} className="px-6 py-4.5 text-[10px] font-mono uppercase tracking-widest text-zinc-400">
                                {header}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {section.table.rows.map((row, i) => (
                            <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-[#0f172a]/30 transition-colors">
                              {row.map((cell, j) => (
                                <td key={j} className="px-6 py-5 text-sm text-zinc-300 font-light leading-relaxed">
                                  {cell}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </section>
              ))}
            </div>

            {/* Divider Element */}
            <div className="my-24 flex items-center justify-center gap-3">
              <div className="h-px w-10 bg-white/10" />
              <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
              <div className="h-px w-10 bg-white/10" />
            </div>

            {/* Key Takeaways Section */}
            <section className="p-8 md:p-16 rounded-[2.5rem] bg-[#0f172a]/40 border border-white/5 shadow-xl space-y-10">
              <div className="space-y-3">
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 block">Executive Summary</span>
                <h2 className="text-3xl font-bold text-white tracking-tight">Key Insights</h2>
              </div>
              
              <ul className="space-y-5">
                {post.takeaways.map((takeaway, i) => (
                  <li key={i} className="flex items-start gap-4 group">
                    <div className="mt-1.5 w-5 h-5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center justify-center flex-shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                      <CheckCircle2 size={12} />
                    </div>
                    <span className="text-base md:text-lg text-zinc-300 font-light leading-relaxed">{takeaway}</span>
                  </li>
                ))}
              </ul>
            </section>

            {/* Dynamic Author Bio Card */}
            <section className="mt-24 pt-12 border-t border-white/5">
              <div className="flex flex-col md:flex-row items-start md:items-center gap-6 bg-[#0f172a]/20 border border-white/5 p-8 rounded-3xl backdrop-blur-sm">
                <img 
                  src={post.authorImage} 
                  alt={post.author} 
                  className="w-20 h-20 rounded-full border border-white/10 object-cover shadow-lg shadow-black/20" 
                />
                <div className="space-y-3 flex-1 text-left">
                  <div>
                    <p className="text-xl font-bold text-white leading-none">{post.author}</p>
                    <p className="text-zinc-500 text-xs font-mono uppercase mt-1 tracking-wider">{post.date} • Author</p>
                  </div>
                  <p className="text-sm md:text-base text-zinc-400 font-light leading-relaxed">
                    {post.authorBio}
                  </p>
                </div>
              </div>
            </section>

            {/* Bottom Actions Router */}
            <section className="mt-16 p-8 border-t border-white/5 text-zinc-400 font-light text-sm text-left flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <p className="max-w-md">
                Want to build automated pipelines like these for your business? Explore my solutions or reach out.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link to="/portfolio" className="text-white hover:text-blue-400 font-bold hover:underline inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest transition-colors">
                  Case Studies <ArrowUpRight size={14} />
                </Link>
                <span className="text-white/10 hidden md:inline">|</span>
                <Link to="/contact" className="text-blue-400 hover:text-blue-300 font-bold hover:underline inline-flex items-center gap-1 font-mono text-xs uppercase tracking-widest transition-colors">
                  Let's Connect <ArrowUpRight size={14} />
                </Link>
              </div>
            </section>

          </article>
        </div>

        {/* Dynamic Related Articles Section */}
        {relatedPosts.length > 0 && (
          <section className="mt-32 pt-20 border-t border-white/5 space-y-10 text-left">
            <div className="space-y-3">
              <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-zinc-500 block">Next Up</span>
              <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight">Related Insights</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {relatedPosts.map((related) => (
                <Link 
                  key={related.id} 
                  to={`/blog/${related.id}`}
                  className="group bg-[#0f172a]/20 hover:bg-[#0f172a]/50 border border-white/5 hover:border-white/10 rounded-3xl p-6 block transition-all duration-300 hover:y-[-4px]"
                >
                  <div className="aspect-[16/10] rounded-2xl overflow-hidden relative mb-6">
                    <img 
                      src={related.image} 
                      alt={related.title} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-103"
                      referrerPolicy="no-referrer"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-[#0a0f1e]/40 pointer-events-none" />
                  </div>
                  <div className="space-y-3">
                    <div className="flex flex-wrap gap-1.5">
                      {related.tags.slice(0, 2).map(tag => (
                        <span key={tag} className="text-[8px] font-mono uppercase tracking-widest text-blue-400 bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h4 className="text-lg font-bold text-white leading-snug group-hover:text-blue-400 transition-colors line-clamp-2">
                      {related.title}
                    </h4>
                    <div className="flex items-center justify-between text-zinc-500 text-[10px] font-mono pt-3 border-t border-white/5">
                      <span>{related.date}</span>
                      <span className="flex items-center gap-1 group-hover:text-white transition-colors">
                        Read
                        <ChevronRight size={10} className="group-hover:translate-x-0.5 transition-transform" />
                      </span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </section>

      {/* Embedded unified bottom newsletter to match footer flow */}
      <section className="bg-zinc-950/60 border-t border-white/5 py-24 px-6 overflow-hidden relative">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <div className="space-y-3">
            <span className="text-xs font-mono uppercase tracking-widest text-[#60a5fa]">Organic Scale Insights</span>
            <h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight leading-none font-display">
              Join the Growth Lab
            </h2>
            <p className="text-zinc-400 font-light max-w-xl mx-auto text-sm leading-relaxed">
              Get raw automated workflows, operational templates, and technical SEO frameworks delivered weekly. No spam, only engineering-grade growth strategy.
            </p>
          </div>

          <div className="max-w-md mx-auto relative group">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-xl blur-md opacity-20 group-focus-within:opacity-40 transition-opacity duration-300" />
            <div className="relative flex bg-[#0f172a]/90 border border-white/10 p-2 rounded-xl">
              <input 
                type="email" 
                placeholder="Enter email address" 
                className="flex-1 bg-transparent px-4 text-white text-xs focus:outline-none placeholder-zinc-500"
                disabled
              />
              <Link
                to="/blog"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg flex items-center justify-center gap-2 hover:scale-[1.02] active:scale-[0.98] transition-all font-bold text-[10px] uppercase tracking-wider font-mono shadow-md"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
