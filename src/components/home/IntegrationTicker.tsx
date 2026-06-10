import React from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';

interface TickerRowProps {
  icons: string[];
  speed: number;
  reverse?: boolean;
}

const TickerRow: React.FC<TickerRowProps> = ({ icons, speed, reverse = false }) => {
  // Triple icons for seamless loop
  const duplicatedIcons = [...icons, ...icons, ...icons, ...icons, ...icons];

  return (
    <div className="flex overflow-hidden relative w-full py-4">
      <motion.div
        className="flex gap-4 md:gap-6 shrink-0"
        animate={{
          x: reverse ? ["-50%", "0%"] : ["0%", "-50%"],
        }}
        transition={{
          duration: speed,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {duplicatedIcons.map((url, i) => (
          <div
            key={i}
            className="w-16 h-16 md:w-20 md:h-20 flex-none rounded-2xl md:rounded-3xl border flex items-center justify-center group transition-all duration-300 shadow-sm hover:shadow-xl relative overflow-hidden"
            style={{ 
              backgroundColor: 'var(--bg-surface)', 
              borderColor: 'var(--border-card)'
            }}
          >
            <div className="absolute inset-0 bg-transparent group-hover:bg-brand-gradient/5 transition-colors duration-500 pointer-events-none" />
            <img 
               src={url} 
               alt="Integration Logo" 
               width={40}
               height={40}
               className="w-8 h-8 md:w-10 md:h-10 object-contain transition-all duration-500 transform group-hover:scale-110" 
               referrerPolicy="no-referrer"
               loading="lazy"
                onError={(e) => {
                  const target = e.currentTarget;
                  const parent = target.parentElement;
                  if (parent) {
                    parent.style.display = 'none';
                  }
                }}
            />
          </div>
        ))}
      </motion.div>
    </div>
  );
};

export const IntegrationTicker: React.FC = () => {
  const row1 = [
    'https://cdn.simpleicons.org/hubspot',
    'https://cdn.simpleicons.org/zapier',
    'https://cdn.simpleicons.org/n8n',
    'https://cdn.simpleicons.org/make',
    'https://cdn.simpleicons.org/openai',
    'https://cdn.simpleicons.org/cloudflare',
    'https://cdn.simpleicons.org/notion',
    'https://cdn.simpleicons.org/slack',
    'https://cdn.simpleicons.org/discord',
    'https://cdn.simpleicons.org/github'
  ];

  const row2 = [
    'https://cdn.simpleicons.org/salesforce',
    'https://cdn.simpleicons.org/mailchimp',
    'https://cdn.simpleicons.org/airtable',
    'https://cdn.simpleicons.org/figma',
    'https://cdn.simpleicons.org/stripe',
    'https://cdn.simpleicons.org/wordpress',
    'https://cdn.simpleicons.org/shopify',
    'https://cdn.simpleicons.org/googleanalytics',
    'https://cdn.simpleicons.org/x',
    'https://cdn.simpleicons.org/linkedin'
  ];

  const row3 = [
    'https://cdn.simpleicons.org/youtube',
    'https://cdn.simpleicons.org/instagram',
    'https://cdn.simpleicons.org/tiktok',
    'https://cdn.simpleicons.org/calendly',
    'https://cdn.simpleicons.org/zoom',
    'https://cdn.simpleicons.org/twilio',
    'https://cdn.simpleicons.org/jira',
    'https://cdn.simpleicons.org/asana',
    'https://cdn.simpleicons.org/trello',
    'https://cdn.simpleicons.org/dropbox'
  ];

  return (
    <section className="py-24 relative overflow-hidden z-10" style={{ backgroundColor: 'color-mix(in srgb, var(--bg-page) 80%, transparent)' }}>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        
        <div className="text-center space-y-6 mb-16">
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 rounded-full border font-sans text-[10px] uppercase tracking-[0.4em] font-black"
            style={{ backgroundColor: 'var(--bg-surface)', borderColor: 'var(--border-card)', color: 'var(--text-muted)' }}
          >
            Integrations
          </motion.h2>
          <motion.h3 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-5xl font-black tracking-tighter"
            style={{ color: 'var(--text-body)' }}
          >
            Over <span className="text-brand-gradient">500+</span> Connected Nodes.
          </motion.h3>
          <p className="font-medium text-sm md:text-base max-w-xl mx-auto" style={{ color: 'var(--text-muted)' }}>
            Use pre-built nodes for common apps. Custom API connections for everything else.
          </p>
        </div>

        {/* Ticker Rows with smooth mask fade */}
        <div className="space-y-4 md:space-y-6 [mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] -webkit-[mask-image:linear-gradient(to_right,transparent,white_10%,white_90%,transparent)] relative isolate">
          <TickerRow icons={row1} speed={60} />
          <TickerRow icons={row2} speed={55} reverse={true} />
          <TickerRow icons={row3} speed={70} />
        </div>


      </div>
    </section>
  );
};
