import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Search, 
  ArrowUpRight,
  ChevronDown,
  Mail
} from 'lucide-react';
import { SEO } from '../components/SEO';

const blogPosts = [
  {
    id: 1,
    title: "How I Save 15+ Hours Every Week With Content Automation",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    date: "March 22, 2026",
    excerpt: "The exact workflow I use to publish 40+ articles monthly — without burning out. Tools, processes, honest lessons, and what I'd do differently.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
    tags: ["Automation Tips"],
    readTime: "8 min"
  },
  {
    id: 2,
    title: "The 5 Marketing Tasks Every Growing Business Should Automate First",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    date: "March 15, 2026",
    excerpt: "Stop wasting your best hours on repetitive work. Here's exactly where automation delivers the fastest ROI — and how to set it up.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015",
    tags: ["Process Optimization"],
    readTime: "6 min"
  },
  {
    id: 3,
    title: "Why AI Content Fails — And the Fix That Actually Works",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    date: "March 08, 2026",
    excerpt: "Generic AI output doesn't convert. Here's the system I use to preserve brand voice and produce content that sounds human, ranks well, and drives results.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070",
    tags: ["AI Implementation"],
    readTime: "7 min"
  },
  {
    id: 4,
    title: "From Position 24 to Position 9: The SEO Framework That Moved the Needle",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    date: "March 01, 2026",
    excerpt: "The exact keyword research and content optimization approach that improved rankings by 15 positions in 90 days — broken down step by step.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070",
    tags: ["SEO Strategies"],
    readTime: "10 min"
  },
  {
    id: 5,
    title: "How to Build a Content Marketing Tech Stack for Under $500/Month",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    date: "February 22, 2026",
    excerpt: "The tools I use to automate content creation, SEO, and distribution — without needing an enterprise budget or a dedicated team.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071",
    tags: ["Tool Reviews"],
    readTime: "9 min"
  }
];

const allTags = ["All", ...Array.from(new Set(blogPosts.flatMap(post => post.tags)))];

export default function Blog() {
  const [selectedTag, setSelectedTag] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  const featuredPost = blogPosts[0];

  const filteredPosts = blogPosts.filter(post => {
    const matchesTag = selectedTag === "All" || post.tags.includes(selectedTag);
    const matchesSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTag && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <SEO 
        title="Marketing Automation Blog | SEO, AI & Content Strategy for Growing Businesses"
        description="Practical guides on automating content marketing, SEO, and business growth — written by someone who's built the systems and delivered the results."
        keywords="marketing automation blog, SEO strategies, AI content implementation, content automation guide"
      />
      
      {/* Full Viewport Hero Section */}
      <section className="relative h-screen w-full overflow-hidden group">
        <Link to={`/blog/${featuredPost.id}`}>
          <motion.div 
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <img 
              src={featuredPost.image} 
              alt={featuredPost.title} 
              className="w-full h-full object-cover transition-transform duration-[2000ms] ease-in-out group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            {/* Enhanced Gradient Overlay for better text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20" />
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>

          <div className="absolute inset-0 flex flex-col justify-end pb-24 px-6">
            <div className="max-w-7xl mx-auto w-full">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="space-y-6 max-w-4xl"
              >
                <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white tracking-tighter leading-[0.9]">
                  {featuredPost.title}
                </h1>
                <p className="text-xl md:text-2xl text-zinc-300 font-light max-w-2xl leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                
                {/* Simplified Metadata */}
                <div className="flex items-center gap-4 pt-4">
                  <img 
                    src={featuredPost.authorImage} 
                    alt={featuredPost.author} 
                    className="w-12 h-12 rounded-full border-2 border-white/20"
                  />
                  <div className="text-white">
                    <p className="font-bold tracking-tight">{featuredPost.author}</p>
                    <p className="text-sm text-zinc-400 font-mono uppercase tracking-widest">{featuredPost.date}</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </Link>

        {/* Scroll Indicator */}
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
        >
          <ChevronDown size={32} />
        </motion.div>
      </section>

      {/* Blog Listing Section */}
      <section className="max-w-7xl mx-auto px-6 py-32">
        <div className="flex flex-col md:flex-row justify-between items-end gap-8 mb-12">
          <div className="space-y-4 max-w-2xl">
            <h2 className="text-5xl font-bold tracking-tighter text-zinc-900">Marketing Automation Insights</h2>
            <p className="text-xl text-zinc-500 font-light leading-relaxed">Practical, no-fluff strategies for automating content, SEO, and growth — from someone who's built the systems and measured the results.</p>
          </div>
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/20 transition-all"
            />
            <Search className="absolute right-6 top-1/2 -translate-y-1/2 text-zinc-300" size={18} />
          </div>
        </div>

        {/* Topic Filters */}
        <div className="flex flex-wrap gap-3 mb-16">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-6 py-2.5 rounded-xl text-sm font-bold transition-all border ${
                selectedTag === tag
                  ? 'bg-zinc-900 text-white border-zinc-900 shadow-lg shadow-zinc-200'
                  : 'bg-white text-zinc-500 border-zinc-100 hover:border-zinc-300'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {filteredPosts.map((post) => (
            <Link 
              key={post.id}
              to={`/blog/${post.id}`}
              className="group block"
            >
              <motion.div 
                layout
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                whileHover={{ y: -10 }}
                viewport={{ once: true }}
                className="transition-all duration-300"
              >
                <div className="aspect-[4/5] rounded-[2.5rem] overflow-hidden mb-8 relative">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute top-6 right-6 w-12 h-12 bg-white rounded-2xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 translate-y-4 group-hover:translate-y-0">
                    <ArrowUpRight size={20} className="text-zinc-900" />
                  </div>
                </div>
                
                <div className="space-y-6">
                  <h3 className="text-3xl font-bold leading-[1.1] tracking-tight group-hover:text-deep-space-blue-600 transition-colors">
                    {post.title}
                  </h3>
                  
                  {/* Simplified Metadata */}
                  <div className="flex items-center gap-3">
                    <img 
                      src={post.authorImage} 
                      alt={post.author} 
                      className="w-8 h-8 rounded-full bg-zinc-100"
                    />
                    <div>
                      <p className="text-sm font-bold text-zinc-900 tracking-tight">{post.author}</p>
                      <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">{post.date} • {post.readTime}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Pagination / Load More */}
        <div className="mt-24 flex justify-center">
          <button className="px-10 py-5 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-deep-space-blue-500 transition-all shadow-xl shadow-zinc-200 flex items-center gap-3 group">
            Load More Stories
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-zinc-900 py-32 px-6 overflow-hidden relative">
        <div className="max-w-7xl mx-auto text-center space-y-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <h2 className="text-5xl md:text-7xl font-bold text-white tracking-tighter">
              Get Weekly Insights That <br />
              <span className="text-deep-space-blue-400 italic">Actually Move the Needle</span>
            </h2>
            <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto">
              Join 500+ marketers and founders getting practical automation strategies — content marketing, SEO, AI implementation, and growth systems — every week.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="max-w-md mx-auto relative"
          >
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white text-sm focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/30 transition-all"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-deep-space-blue-500 text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-deep-space-blue-500/20">
              <Mail size={20} />
            </button>
          </motion.div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-deep-space-blue-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-deep-space-blue-500/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </section>
    </div>
  );
}
