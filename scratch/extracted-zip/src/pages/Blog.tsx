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

const blogPosts = [
  {
    id: 10,
    title: "Content Marketing Automation: Is It Worth the Investment?",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    date: "March 22, 2026",
    excerpt: "Is automation your secret weapon or a waste of time and money? Let's dig deeper into the world of content marketing automation.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
    tags: ["Automation", "Strategy", "Marketing"]
  },
  {
    id: 1,
    title: "Content Marketing Strategies: Explore content trend",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    date: "March 21, 2026",
    excerpt: "The Future of Artificial Intelligence: Trends and Implications. The Future of Artificial Intelligence: Trends and Implications.",
    image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2070",
    tags: ["Marketing", "Strategy"]
  },
  {
    id: 2,
    title: "Social Media Marketing: Cover social media strategies",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    date: "March 20, 2026",
    excerpt: "The Future of Artificial Intelligence: Trends and Implications. The Future of Artificial Intelligence: Trends and Implications.",
    image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1974",
    tags: ["Marketing", "Social Media"]
  },
  {
    id: 3,
    title: "Data Privacy and Ethics in the Digital Age",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    date: "March 19, 2026",
    excerpt: "The Future of Artificial Intelligence: Trends and Implications. The Future of Artificial Intelligence: Trends and Implications.",
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070",
    tags: ["AI", "Ethics"]
  },
  {
    id: 4,
    title: "Digital Marketing Analytics: Explore the importance",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    date: "March 18, 2026",
    excerpt: "The Future of Artificial Intelligence: Trends and Implications. The Future of Artificial Intelligence: Trends and Implications.",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=2015",
    tags: ["Marketing", "Analytics"]
  },
  {
    id: 5,
    title: "Influencer Marketing: Discuss the benefits",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    date: "March 17, 2026",
    excerpt: "The Future of Artificial Intelligence: Trends and Implications. The Future of Artificial Intelligence: Trends and Implications.",
    image: "https://images.unsplash.com/photo-1557838923-2985c318be48?auto=format&fit=crop&q=80&w=2062",
    tags: ["Marketing", "Growth"]
  },
  {
    id: 6,
    title: "Video Marketing: Cover video marketing trends",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    date: "March 16, 2026",
    excerpt: "The Future of Artificial Intelligence: Trends and Implications. The Future of Artificial Intelligence: Trends and Implications.",
    image: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&q=80&w=2071",
    tags: ["Marketing", "Video"]
  },
  {
    id: 7,
    title: "The Future of Remote Work and AI Collaboration",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    date: "March 15, 2026",
    excerpt: "How AI is bridging the gap in distributed teams and creating new paradigms for productivity.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071",
    tags: ["AI", "Work"]
  },
  {
    id: 8,
    title: "Mastering the Art of Prompt Engineering",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    date: "March 14, 2026",
    excerpt: "A deep dive into the language of AI and how to get exactly what you want from LLMs.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070",
    tags: ["AI", "Strategy"]
  },
  {
    id: 9,
    title: "Sustainable Tech: Reducing Your Digital Carbon Footprint",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    date: "March 13, 2026",
    excerpt: "Why efficiency in code and automation is the next frontier for environmental sustainability.",
    image: "https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?auto=format&fit=crop&q=80&w=2070",
    tags: ["Ethics", "Strategy"]
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
    <div className="min-h-screen bg-white text-zinc-900 selection:bg-emerald-100 selection:text-emerald-900">
      
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
          <div className="space-y-4">
            <h2 className="text-5xl font-bold tracking-tighter">Latest Stories</h2>
            <p className="text-xl text-zinc-500 font-light">Insights on AI, Automation, and Digital Growth.</p>
          </div>
          <div className="relative w-full md:w-80">
            <input 
              type="text" 
              placeholder="Search articles..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-50 border border-zinc-100 rounded-2xl px-6 py-4 text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition-all"
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
                  <h3 className="text-3xl font-bold leading-[1.1] tracking-tight group-hover:text-emerald-600 transition-colors">
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
                      <p className="text-[10px] text-zinc-400 font-mono uppercase tracking-widest">{post.date}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))}
        </div>

        {/* Pagination / Load More */}
        <div className="mt-24 flex justify-center">
          <button className="px-10 py-5 bg-zinc-900 text-white font-bold rounded-2xl hover:bg-emerald-600 transition-all shadow-xl shadow-zinc-200 flex items-center gap-3 group">
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
              Stay ahead with <br />
              <span className="text-emerald-400 italic">automation insights</span>
            </h2>
            <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto">
              Join 2,000+ founders and marketers getting weekly strategies on AI workflows and growth systems.
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
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500/30 transition-all"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-emerald-500 text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-emerald-500/20">
              <Mail size={20} />
            </button>
          </motion.div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-500/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </section>
    </div>
  );
}
