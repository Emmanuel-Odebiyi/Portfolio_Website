import React from 'react';
import { motion } from 'motion/react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Calendar, 
  User, 
  Clock, 
  Share2, 
  Bookmark,
  CheckCircle2,
  Lightbulb,
  ArrowRight,
  ArrowUpRight,
  FileText,
  Briefcase
} from 'lucide-react';

// Sample blog post data
const blogPosts = {
  "1": {
    id: "1",
    title: "Content Marketing Strategies: Explore content trend",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    authorBio: "Emmanuel is a Content Strategist and AI Automation Expert dedicated to helping B2B SaaS companies scale their organic growth through data-driven storytelling and systematic workflows.",
    date: "March 21, 2026",
    readTime: "8 min read",
    heroImage: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=2070",
    tags: ["Marketing", "Strategy"],
    hook: "The landscape of content marketing is shifting beneath our feet. What worked in 2024 is already becoming noise in 2026. If you're still just 'writing blogs,' you're missing the engine that drives modern growth.",
    sections: [
      {
        heading: "The Death of the 'Standard' Blog Post",
        content: "Standard blog posts are dying. Readers are no longer looking for generic information that AI can summarize in three seconds. They are looking for authority, unique data, and actionable systems. In an era where content is infinite, attention is the only currency that matters.",
        example: "Think about the last time you read a 'Top 10 Tips' article. Did you actually finish it? Probably not. Now think about a deep-dive case study that showed you exactly how a company saved 15 hours a week. That's the difference."
      },
      {
        heading: "The Rise of Authority-Led Content",
        content: "Authority isn't just about what you know; it's about how you prove it. Modern readers crave 'Skin in the Game.' They want to see the scars of failed experiments and the blueprints of successful ones. This is why personal brands are outperforming corporate blogs.",
        highlight: "True authority is built through transparency. Share the data, show the process, and don't be afraid to admit when something didn't work."
      },
      {
        heading: "Section-Based Storytelling",
        content: "HackerNoon-style articles succeed because they break complex ideas into clear, labeled sections. This isn't just for aesthetics; it's for cognitive load management. By creating distinct mental 'rooms,' you allow the reader to pause, reflect, and move forward without feeling overwhelmed.",
        highlight: "Clear sections act as mental anchors, allowing readers to navigate deep technical content without getting lost in the weeds."
      },
      {
        heading: "The 'In Plain Terms' Strategy",
        content: "Every complex strategy should be followed by a simplification. If you can't explain it simply, you don't understand it well enough—and your reader definitely won't. This is the bridge between technical expertise and executive decision-making.",
        simplification: {
          label: "In simple terms",
          text: "Don't just dump data on your readers. Tell them what it means for their business and why they should care right now. If they can't explain your value to their boss in one sentence, you've lost."
        }
      },
      {
        heading: "The Practical Takeaway",
        content: "The best content doesn't just inform; it transforms. Every piece of content should leave the reader with a 'Day 1' action. What can they do immediately after closing this tab? If the answer is 'nothing,' the content has failed.",
        example: "Instead of saying 'You should optimize your SEO,' say 'Go to your top 3 performing pages and update the meta descriptions with these 5 keywords today.'"
      }
    ],
    takeaways: [
      "Prioritize authority over volume.",
      "Use section-based storytelling to improve retention.",
      "Always include a 'plain terms' simplification for complex ideas.",
      "Automate the distribution, not the thinking.",
      "Focus on 'Day 1' actionable items for every reader."
    ]
  },
  "2": {
    id: "2",
    title: "Social Media Marketing: Cover social media strategies",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    authorBio: "Emmanuel is a Content Strategist and AI Automation Expert.",
    date: "March 20, 2026",
    readTime: "6 min read",
    heroImage: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=1974",
    tags: ["Marketing", "Social Media"],
    hook: "Social media is no longer just about posting; it's about building a community and driving real business outcomes through strategic engagement.",
    sections: [
      {
        heading: "The Shift to Community",
        content: "Algorithms are increasingly prioritizing meaningful interactions over passive consumption. If your strategy is just broadcasting, you're shouting into a void.",
        highlight: "Engagement is the new reach. Focus on the 100 people who care, not the 10,000 who scroll past."
      }
    ],
    takeaways: ["Focus on community.", "Engagement over reach."]
  },
  "3": {
    id: "3",
    title: "Data Privacy and Ethics in the Digital Age",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    authorBio: "Emmanuel is a Content Strategist and AI Automation Expert.",
    date: "March 19, 2026",
    readTime: "10 min read",
    heroImage: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=2070",
    tags: ["AI", "Ethics"],
    hook: "As we move further into the AI era, the ethical implications of data usage have never been more critical. Privacy is not a feature; it's a fundamental right.",
    sections: [
      {
        heading: "The Ethical Dilemma",
        content: "AI models are only as good as the data they are trained on. But where does that data come from, and who owns it?",
        highlight: "Transparency in AI is the only way to build long-term trust with your users."
      }
    ],
    takeaways: ["Privacy first.", "Transparent AI models."]
  },
  "7": {
    id: "7",
    title: "The Future of Remote Work and AI Collaboration",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    authorBio: "Emmanuel is a Content Strategist and AI Automation Expert.",
    date: "March 15, 2026",
    readTime: "7 min read",
    heroImage: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=2071",
    tags: ["AI", "Work"],
    hook: "Remote work is here to stay, but the way we collaborate is being revolutionized by AI-driven tools that bridge the physical gap.",
    sections: [
      {
        heading: "AI as a Team Member",
        content: "AI isn't just a tool; it's becoming a collaborator that can summarize meetings, manage tasks, and even suggest creative directions.",
        highlight: "The future of work is hybrid: human creativity augmented by AI efficiency."
      }
    ],
    takeaways: ["AI as a collaborator.", "Hybrid work models."]
  },
  "8": {
    id: "8",
    title: "Mastering the Art of Prompt Engineering",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    authorBio: "Emmanuel is a Content Strategist and AI Automation Expert.",
    date: "March 14, 2026",
    readTime: "12 min read",
    heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=2070",
    tags: ["AI", "Strategy"],
    hook: "Prompt engineering is the new coding. Understanding how to talk to AI is the most valuable skill of the next decade.",
    sections: [
      {
        heading: "The Language of Machines",
        content: "Getting the best out of an LLM requires more than just a simple question. It requires context, constraints, and clear objectives.",
        highlight: "A well-crafted prompt is the difference between a generic answer and a breakthrough insight."
      }
    ],
    takeaways: [
      "Context is king.",
      "Constraints drive quality."
    ]
  },
  "10": {
    id: "10",
    title: "Content Marketing Automation: Is It Worth the Investment?",
    author: "Emmanuel Odebiyi",
    authorImage: "https://api.dicebear.com/7.x/avataaars/svg?seed=Emmanuel",
    authorBio: "Emmanuel is a Content Strategist and AI Automation Expert dedicated to helping B2B SaaS companies scale their organic growth through data-driven storytelling and systematic workflows.",
    date: "March 22, 2026",
    readTime: "15 min read",
    heroImage: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=2070",
    tags: ["Automation", "Strategy", "Marketing"],
    hook: "One of the most discussed strategies in the sphere of digital marketing is 'content marketing automation.' This approach makes content generation, dissemination, and evaluation to be done automatically, which helps businesses to be resourceful in other activities they have to pursue.",
    sections: [
      {
        heading: "What is Content Marketing Automation?",
        content: "Content marketing automation encompasses the use of technological tools and platforms to execute repetitive marketing processes that relate to content production, sharing, and even analysis. From typical everyday activities such as scheduling posts, disseminating content across different platforms, or monitoring performance statistics, automation platforms enable the marketer to perform such tasks autonomously, thus enabling the marketer to get into more strategic engagements.",
        simplification: {
          label: "A simple automation process",
          text: "1. It starts with content creation (AI writing buddy). 2. Schedule Your Posts Like a Pro. 3. Smooth Content Distribution. 4. Track Your Performance Like a Data Detective."
        }
      },
      {
        heading: "Why Should You Consider Automation?",
        content: "The biggest advantages that man can gain from automation tools include time and resource efficiency, better personalization, consistency in distribution, and better data-driven decision making. A report from Nucleus Research says that marketing automation actually improves productivity by 20%, meaning organizations can accomplish more within a short time.",
        highlight: "Fun Fact: According to HubSpot, companies that publish blog posts regularly receive 97% more links to their websites.",
        list: [
          "Time and Resource Efficiency: Shave off 50% of the time to run campaigns.",
          "Better Personalization: Segment audience based on demographics and behavior.",
          "Consistency: Reach your audience regularly to build trust.",
          "Data-Driven Decisions: Track metrics around engagement and conversion in real-time.",
          "Scalability: Scale efforts without having to expand team size proportionally."
        ]
      },
      {
        heading: "Challenges to Prepare For",
        content: "Getting too overwhelmed by several benefits will be too early; they come with their challenges. Understanding these will better equip you to prepare for them and realize the fullest potential of your automation efforts.",
        list: [
          "High Initial Setup Costs: Premium platforms like HubSpot or Marketo require substantial investment.",
          "The Learning Curve: Teams need time to understand all features of the platform.",
          "Over-Automation Risk: Content ends up being robotic or impersonal if not balanced.",
          "Quality of Content: Ensuring automation delivers the same quality as human-driven content."
        ],
        quote: {
          text: "Automation is great when it comes to efficiency, but it should never replace the human touch in your marketing efforts.",
          author: "Neil Patel"
        }
      },
      {
        heading: "Key Features to Look For",
        content: "When investing in content marketing automation, it's essential to understand the core features that these tools offer. The right set of features can significantly enhance the efficiency and success of your marketing efforts.",
        list: [
          "Content Creation Assistance: AI-powered tools like Jasper and Copy.ai for ideas and short-form content, and BuzzSumo for identifying trending topics.",
          "Scheduling and Publishing: Tools like Hootsuite and WordPress allow you to pre-schedule posts for weeks or months in advance.",
          "Content Distribution: Sprout Social and Buffer enable distribution to multiple platforms with just one click.",
          "Analytics and Reporting: Google Analytics and HubSpot track performance across various platforms to measure engagement and ROI.",
          "SEO Integration: SEMrush and Yoast SEO help identify keywords and automatically generate meta tags."
        ],
        highlight: "Fun Fact: According to Ahrefs, the first page of Google captures 71% of search traffic clicks. Automation helps you get there."
      },
      {
        heading: "Common Pitfalls to Avoid",
        content: "While automation can revolutionize your marketing, it's not without its challenges. Automation tools are incredibly powerful but, when used improperly, they can cause more harm than good.",
        list: [
          "Over-Automation Without a Personal Touch: Too much automation can alienate your audience and feel robotic.",
          "Neglecting to Monitor or Update: The 'set it and forget it' mentality can lead to outdated or irrelevant information being sent out.",
          "Failing to Segment Properly: Treating all subscribers the same can lead to low engagement and high unsubscribe rates.",
          "Relying on Automation to Generate Content: Automation works best for distribution, not for creating high-quality, nuanced content from scratch.",
          "Not Measuring Performance: Failing to track metrics means you won't know what's working and what needs improvement."
        ],
        highlight: "Case Study: According to Campaign Monitor, segmented email campaigns have been shown to achieve a 760% increase in revenue."
      },
      {
        heading: "The Cost of Automation",
        content: "The costs associated with automation can vary significantly based on the type of tool, the features it offers, and the size of your business. Below is a breakdown of sample monthly costs for popular tools.",
        table: {
          headers: ["Tool", "Monthly Price", "Key Features"],
          rows: [
            ["Buffer", "$6 to $120", "Social media scheduling, analytics, multi-platform support"],
            ["Hootsuite", "$49 to $739", "Social media scheduling, reporting, team collaboration"],
            ["HubSpot", "$800+", "Complete inbound marketing suite, CRM integration, lead generation"],
            ["Mailchimp", "Free to $299+", "Email marketing, automation workflows, customer segmentation"],
            ["SEMrush", "$119.95 to $449.95", "SEO tools, keyword research, content marketing tools"]
          ]
        }
      },
      {
        heading: "How to Get Started",
        content: "Implementing content marketing automation can seem overwhelming, but following a clear and methodical process can smoothly transition your strategy. Choosing the right tool is the most critical step.",
        table: {
          headers: ["Tool", "Best for", "Key Features", "Pricing"],
          rows: [
            ["HubSpot", "All-in-one marketing, sales, and CRM", "Email marketing, workflows, analytics, CRM", "Starts at $50"],
            ["Marketo", "Advanced B2B marketing automation", "Lead scoring, CRM integration, email workflows", "Starts at $895"],
            ["Mailchimp", "Email marketing automation", "Email campaigns, segmentation, analytics", "Free to $299"],
            ["Hootsuite", "Social media automation", "Post scheduling, social media monitoring", "Starts at $19"],
            ["CoSchedule", "Content and marketing management", "Editorial calendar, scheduling, team collaboration", "Starts at $29"]
          ]
        },
        list: [
          "Define Clear Objectives: Ask what specific aspects you want to improve.",
          "Choose the Right Tools: Select platforms that align with your goals.",
          "Build a Workflow: Map out a sequence of tasks triggered by specific events.",
          "Segment Your Audience: Create highly personalized content for specific groups.",
          "Monitor and Optimize: Continuous monitoring is essential for long-term success."
        ],
        simplification: {
          label: "Example Workflow",
          text: "Trigger: User downloads a white paper. Day 1: Send 'Thank You' email. Day 3: Follow-up with related blog posts. Day 7: Send personalized offer."
        }
      },
      {
        heading: "Best Practices for Success",
        content: "To get the most out of content marketing automation, it's not just about setting up the tools; it's about optimizing them for maximum impact.",
        list: [
          "Personalize Content as Much as Possible: Use dynamic content and segment by behavior.",
          "Maintain Consistency in Tone: Develop brand guidelines and use pre-approved templates.",
          "Don't Automate Everything: Humanize customer service and social media interactions.",
          "Continuously Update and Refresh: Conduct audits every six months to keep content fresh.",
          "Test and Experiment Regularly: Run A/B tests on subject lines, CTAs, and formats."
        ],
        highlight: "Pro Tip: Consistent branding can increase revenue by up to 23%, according to Lucidpress."
      },
      {
        heading: "Measuring ROI",
        content: "One of the key concerns is determining whether the investment is paying off. Calculating the return on investment (ROI) is essential to track success.",
        highlight: "ROI Formula: (Revenue from Automation – Cost of Automation) / Cost of Automation x 100",
        simplification: {
          label: "ROI Example",
          text: "If your business generated $50,000 from automated campaigns and spent $10,000 on tools, your ROI is 400%."
        }
      }
    ],
    takeaways: [
      "Automation scales your efforts without scaling your team size proportionally.",
      "Personalization is the key to avoiding the 'robotic' feel of automated content.",
      "Start with simple workflows and grow into more advanced functionality over time.",
      "Always monitor and optimize; automation is not a 'set it and forget it' solution.",
      "Focus on ROI by tracking both revenue growth and labor cost reductions."
    ]
  }
};

export default function BlogPost() {
  const { id } = useParams();
  const post = blogPosts[id as keyof typeof blogPosts] || blogPosts["1"];

  // Logic to find related articles based on "closeness to main website" (AI, Automation, Strategy)
  const coreThemes = ["AI", "Automation", "Strategy", "Growth"];
  
  const relatedPosts = Object.values(blogPosts)
    .filter(p => p.id !== post.id) // Exclude current post
    .map(p => {
      // Calculate relevance score
      let score = 0;
      p.tags.forEach(tag => {
        if (coreThemes.includes(tag)) score += 2;
        if (post.tags.includes(tag)) score += 1;
      });
      return { ...p, score };
    })
    .sort((a, b) => b.score - a.score) // Sort by relevance
    .slice(0, 3); // Take top 3

  return (
    <div className="min-h-screen bg-white text-zinc-900">
      
      {/* Article Hero - Full Viewport */}
      <section className="relative h-screen w-full overflow-hidden">
        <motion.div 
          initial={{ scale: 1 }}
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="absolute inset-0"
        >
          <img 
            src={post.heroImage} 
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          {/* Enhanced Gradient Overlay for better contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-900/60 to-zinc-900/20" />
          <div className="absolute inset-0 bg-black/10" />
        </motion.div>

        <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-20 max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="space-y-8 max-w-4xl"
          >
            <Link to="/blog" className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-4 group">
              <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
              Back to Blog
            </Link>
            
            <h1 className="text-5xl md:text-8xl font-bold text-white tracking-tight leading-[0.95]">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-8 pt-4">
              <div className="flex items-center gap-4">
                <img src={post.authorImage} alt={post.author} className="w-12 h-12 rounded-full border-2 border-white/20" />
                <div className="text-left">
                  <p className="text-white font-bold">{post.author}</p>
                  <p className="text-white/60 text-sm">{post.date}</p>
                </div>
              </div>
              <div className="flex items-center gap-6 text-white/60 text-sm font-mono uppercase tracking-widest">
                <span className="flex items-center gap-2"><Clock size={14} /> {post.readTime}</span>
                <span className="flex items-center gap-2"><Share2 size={14} className="cursor-pointer hover:text-white transition-colors" /></span>
                <span className="flex items-center gap-2"><Bookmark size={14} className="cursor-pointer hover:text-white transition-colors" /></span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Article Content Section */}
      <article className="max-w-3xl mx-auto px-6 py-32">
        
        {/* Introduction / Hook */}
        <section className="mb-20">
          <p className="text-3xl md:text-4xl font-light text-zinc-500 leading-relaxed italic border-l-4 border-deep-space-blue-500 pl-8">
            {post.hook}
          </p>
        </section>

        {/* Dynamic Sections */}
        <div className="space-y-24">
          {post.sections.map((section, index) => (
            <section key={index} className="space-y-8">
              <h2 className="text-4xl font-bold tracking-tight text-zinc-900">
                {section.heading}
              </h2>
              
              <div className="prose prose-zinc prose-xl font-light text-zinc-600 leading-relaxed">
                <p>{section.content}</p>
              </div>

              {section.example && (
                <div className="p-10 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 space-y-4">
                  <div className="flex items-center gap-3 text-zinc-400 font-mono text-xs uppercase tracking-widest">
                    <Lightbulb size={16} className="text-amber-500" />
                    Example Case
                  </div>
                  <p className="text-xl text-zinc-700 font-light leading-relaxed italic">
                    "{section.example}"
                  </p>
                </div>
              )}

              {section.highlight && (
                <div className="p-10 rounded-[2.5rem] bg-deep-space-blue-50 border border-deep-space-blue-100 space-y-4">
                  <p className="text-2xl font-bold text-deep-space-blue-900 leading-tight">
                    {section.highlight}
                  </p>
                </div>
              )}

              {section.simplification && (
                <div className="p-10 rounded-[2.5rem] bg-zinc-900 text-white space-y-6 relative overflow-hidden">
                  <div className="relative z-10">
                    <h4 className="text-xs font-mono uppercase tracking-[0.3em] text-deep-space-blue-400 mb-4">
                      {section.simplification.label}
                    </h4>
                    <p className="text-2xl font-light leading-relaxed text-zinc-300">
                      {section.simplification.text}
                    </p>
                  </div>
                  <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-deep-space-blue-500/10 blur-3xl rounded-full" />
                </div>
              )}

              {section.list && (
                <ul className="space-y-4 pt-4">
                  {section.list.map((item: any, i: number) => (
                    <li key={i} className="flex items-start gap-4 group">
                      <div className="mt-2 w-1.5 h-1.5 rounded-full bg-deep-space-blue-500 flex-shrink-0" />
                      <span className="text-xl text-zinc-600 font-light leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              )}

              {section.quote && (
                <div className="py-12 border-y border-zinc-100 my-12">
                  <p className="text-3xl font-serif italic text-zinc-900 leading-tight text-center max-w-2xl mx-auto">
                    "{section.quote.text}"
                  </p>
                  <p className="text-center mt-6 text-zinc-400 font-mono text-xs uppercase tracking-widest">
                    — {section.quote.author}
                  </p>
                </div>
              )}

              {section.table && (
                <div className="my-12 overflow-x-auto rounded-3xl border border-zinc-100">
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="bg-zinc-50 border-b border-zinc-100">
                        {section.table.headers.map((header: string, i: number) => (
                          <th key={i} className="px-6 py-4 text-xs font-mono uppercase tracking-widest text-zinc-400">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {section.table.rows.map((row: string[], i: number) => (
                        <tr key={i} className="border-b border-zinc-50 last:border-0 hover:bg-zinc-50/50 transition-colors">
                          {row.map((cell: string, j: number) => (
                            <td key={j} className="px-6 py-6 text-sm text-zinc-600 font-light leading-relaxed">
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

        {/* Visual Break / Divider */}
        <div className="my-32 flex items-center justify-center gap-4">
          <div className="h-px w-12 bg-zinc-200" />
          <div className="w-2 h-2 rounded-full bg-deep-space-blue-500" />
          <div className="h-px w-12 bg-zinc-200" />
        </div>

        {/* Key Takeaways Section */}
        <section className="p-12 md:p-20 rounded-[4rem] bg-zinc-50 border border-zinc-100 space-y-12">
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">Summary</h3>
            <h2 className="text-4xl font-bold text-zinc-900 tracking-tight">Key Insights</h2>
          </div>
          
          <ul className="space-y-6">
            {post.takeaways.map((takeaway, i) => (
              <li key={i} className="flex items-start gap-4 group">
                <div className="mt-1.5 w-5 h-5 rounded-full bg-deep-space-blue-100 text-deep-space-blue-600 flex items-center justify-center flex-shrink-0 group-hover:bg-deep-space-blue-500 group-hover:text-white transition-colors">
                  <CheckCircle2 size={12} />
                </div>
                <span className="text-xl text-zinc-600 font-light leading-relaxed">{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* Author Section with Bio */}
        <section className="mt-32 pt-12 border-t border-zinc-100">
          <div className="flex flex-col md:flex-row items-start md:items-center gap-8">
            <img src={post.authorImage} alt={post.author} className="w-24 h-24 rounded-full grayscale hover:grayscale-0 transition-all duration-500" />
            <div className="space-y-4 flex-1">
              <div>
                <p className="text-2xl font-bold text-zinc-900">{post.author}</p>
                <p className="text-zinc-400 text-sm font-mono uppercase tracking-widest">{post.date}</p>
              </div>
              <p className="text-lg text-zinc-500 font-light leading-relaxed max-w-2xl">
                {post.authorBio}
              </p>
              <div className="flex gap-4">
                <Share2 size={20} className="text-zinc-300 hover:text-zinc-900 cursor-pointer transition-colors" />
              </div>
            </div>
          </div>
        </section>

        {/* Simplified CTA Section */}
        <section className="mt-20 pt-12 border-t border-zinc-100">
          <p className="text-zinc-500 font-light">
            Interested in seeing more? <Link to="/portfolio" className="text-deep-space-blue-600 font-bold hover:underline inline-flex items-center gap-1">View my portfolio <ArrowUpRight size={16} /></Link>, <Link to="/resume" className="text-zinc-900 font-bold hover:underline">check my resume</Link>, or <Link to="/contact" className="text-deep-space-blue-600 font-bold hover:underline">get in touch</Link>.
          </p>
        </section>

        {/* Related Articles Section */}
        <section className="mt-32 pt-32 border-t border-zinc-100 space-y-12">
          <div className="space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.3em] text-zinc-400">Next Up</h3>
            <h2 className="text-4xl font-bold text-zinc-900 tracking-tight">Related Articles</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {relatedPosts.map((related) => (
              <Link 
                key={related.id} 
                to={`/blog/${related.id}`}
                className="group space-y-4 block"
              >
                <div className="aspect-[16/10] rounded-2xl overflow-hidden relative">
                  <img 
                    src={related.heroImage} 
                    alt={related.title} 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                </div>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    {related.tags.slice(0, 2).map(tag => (
                      <span key={tag} className="text-[10px] font-mono uppercase tracking-widest text-deep-space-blue-600 bg-deep-space-blue-50 px-2 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <h4 className="text-xl font-bold text-zinc-900 leading-tight group-hover:text-deep-space-blue-600 transition-colors">
                    {related.title}
                  </h4>
                  <p className="text-sm text-zinc-500 font-mono uppercase tracking-widest">{related.date}</p>
                </div>
              </Link>
            ))}
          </div>
        </section>

      </article>

      {/* Newsletter Section (Re-integrated from Blog page) */}
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
              <span className="text-deep-space-blue-400 italic">automation insights</span>
            </h2>
            <p className="text-xl text-zinc-400 font-light max-w-2xl mx-auto">
              Join 2,000+ founders and marketers getting weekly strategies on AI workflows and growth systems.
            </p>
          </motion.div>

          <div className="max-w-md mx-auto relative">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="w-full bg-white/5 border border-white/10 rounded-2xl px-8 py-6 text-white text-sm focus:outline-none focus:ring-2 focus:ring-deep-space-blue-500/30 transition-all"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-deep-space-blue-500 text-white rounded-xl flex items-center justify-center hover:scale-105 transition-transform shadow-lg shadow-deep-space-blue-500/20">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Background Decoration */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-deep-space-blue-500/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-deep-space-blue-500/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
      </section>
    </div>
  );
}
