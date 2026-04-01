import React from 'react';
import { Users, Building2, Bot, PenTool } from 'lucide-react';

interface Problem {
  id: number;
  tag: string;
  headline: string;
  body: string;
  detail: string;
  icon: React.ElementType;
  accentColor: string;
}

const PROBLEMS: Problem[] = [
  {
    id: 1,
    tag: 'The Freelancer Problem',
    headline: 'They Were Great — Until They Weren\'t.',
    body: 'You hired a freelancer. They were great for a while. Then they got overloaded, quality dropped, and one day — they just stopped responding.',
    detail: 'Now you\'re back to square one, sifting through proposals and hoping this one sticks.',
    icon: Users,
    accentColor: '#e85d4a',
  },
  {
    id: 2,
    tag: 'The Agency Problem',
    headline: 'Slick Deck. Impressive Pitch. Junior Work.',
    body: 'You tried an agency. Slick deck. Impressive pitch. Then the invoice arrived: $8,000/month, six-month minimum.',
    detail: 'Three months later you\'re getting junior work at senior prices, and a simple revision takes two weeks.',
    icon: Building2,
    accentColor: '#f59e0b',
  },
  {
    id: 3,
    tag: 'The AI Tools Problem',
    headline: 'ChatGPT Felt Like a Breakthrough. Then You Read It Back.',
    body: 'It sounded like every other bland, generic article online. Worse, it sounded nothing like you.',
    detail: 'Your brand voice? Gone. Your differentiation? Erased. Your audience can tell — and they\'re clicking away.',
    icon: Bot,
    accentColor: '#8b5cf6',
  },
  {
    id: 4,
    tag: 'The DIY Problem',
    headline: 'You\'re the Expert. So You Should Write It — Right?',
    body: 'Except you\'re also the one running sales calls, managing the team, solving operational fires, and keeping clients happy.',
    detail: 'So the blog post gets written at 11 PM — when it gets written at all. Three weeks later, nothing published. Again.',
    icon: PenTool,
    accentColor: '#10b981',
  },
];

export const ProblemSection: React.FC = () => {
  return (
    <section className="py-32 bg-white" aria-label="The Problem Section">
      <div className="max-w-4xl mx-auto px-6 md:px-12 flex flex-col gap-24 md:gap-32">
        {PROBLEMS.map((problem) => {
          const Icon = problem.icon;
          return (
            <div key={problem.id} className="flex flex-col items-start text-left relative group">
              {/* Optional subtle icon in the background/corner */}
              <div 
                className="absolute top-0 right-0 opacity-5 sm:opacity-10 pointer-events-none transform translate-x-4 -translate-y-4"
                style={{ color: problem.accentColor }}
              >
                <Icon size={120} strokeWidth={1} />
              </div>

              <span 
                className="inline-block px-4 py-1.5 rounded-full text-[10px] md:text-sm font-bold tracking-[0.2em] uppercase mb-6"
                style={{ backgroundColor: `${problem.accentColor}20`, color: problem.accentColor }}
              >
                {problem.tag}
              </span>

              <span 
                className="text-8xl md:text-[10rem] font-black mb-4 md:mb-8 leading-none select-none tracking-tighter"
                style={{ color: `${problem.accentColor}30` }}
              >
                {String(problem.id).padStart(2, '0')}
              </span>

              <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 tracking-tight leading-[1.1] mb-6 md:mb-8 max-w-3xl">
                {problem.headline}
              </h2>

              <p className="text-lg md:text-2xl text-zinc-600 mb-6 max-w-3xl leading-relaxed">
                {problem.body}
              </p>

              <p 
                className="text-lg md:text-xl italic font-semibold max-w-3xl leading-relaxed"
                style={{ color: problem.accentColor }}
              >
                {problem.detail}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
