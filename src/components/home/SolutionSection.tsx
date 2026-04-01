import React from 'react';
import { Search, Zap, Cpu, Mail, BarChart3, LucideIcon } from 'lucide-react';

interface Solution {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  color: string;
  textColor: string;
  iconColor: string;
  Icon: LucideIcon;
}

const solutions: Solution[] = [
  {
    id: 1,
    title: "Automated Publishing",
    subtitle: "8 to 40+ articles monthly.",
    description: "Your content publishes automatically on schedule—without you lifting a finger after setup.",
    color: "bg-[#FFF4E5]",
    textColor: "text-amber-950",
    iconColor: "text-amber-500",
    Icon: Zap,
  },
  {
    id: 2,
    title: "SEO-Optimized",
    subtitle: "Position 24 → Position 9.",
    description: "Optimized from day one. Say goodbye to guesswork and watch your average ranking climb rapidly.",
    color: "bg-[#E5F7E8]",
    textColor: "text-emerald-950",
    iconColor: "text-emerald-500",
    Icon: Search,
  },
  {
    id: 3,
    title: "Omnichannel Distribution",
    subtitle: "Blog → Social → Email → LinkedIn.",
    description: "Distributed across every single platform automatically so your audience sees you everywhere.",
    color: "bg-[#E5F0FF]",
    textColor: "text-blue-950",
    iconColor: "text-blue-500",
    Icon: Mail,
  },
  {
    id: 4,
    title: "Brand Alignment",
    subtitle: "Your voice, preserved.",
    description: "It sounds like you wrote it because the entire system is custom-built around your unique tone.",
    color: "bg-[#F0E5FF]",
    textColor: "text-purple-950",
    iconColor: "text-purple-500",
    Icon: Cpu,
  },
  {
    id: 5,
    title: "Data Intelligence",
    subtitle: "Performance tracked always.",
    description: "You'll know exactly what's working, what's generating revenue, and what to conquer next.",
    color: "bg-[#FFE5E5]",
    textColor: "text-rose-950",
    iconColor: "text-rose-500",
    Icon: BarChart3,
  }
];

export const SolutionSection = () => {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold text-zinc-900 mb-8 tracking-tight max-w-4xl mx-auto leading-[1.1]">
            What If Your Marketing Could Run Itself?
          </h2>
          <p className="text-zinc-600 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed font-light">
            I build intelligent content marketing systems that produce consistent, high-quality output — without you lifting a finger after setup.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {solutions.map((solution) => (
            <div 
              key={solution.id}
              className={`p-8 md:p-10 rounded-[2.5rem] ${solution.color} flex flex-col h-full border border-zinc-100/50 shadow-sm transition-transform hover:scale-[1.02] duration-300`}
            >
              <div className="bg-white/60 backdrop-blur-sm p-4 rounded-2xl w-fit mb-8 shadow-sm">
                <solution.Icon className={`w-8 h-8 ${solution.iconColor}`} />
              </div>
              
              <span className={`text-xs font-bold uppercase tracking-[0.2em] mb-4 ${solution.textColor} opacity-60`}>
                {solution.title}
              </span>
              
              <h3 className={`text-2xl md:text-3xl font-bold mb-4 ${solution.textColor} leading-tight`}>
                {solution.subtitle}
              </h3>
              
              <p className={`text-base md:text-lg font-medium ${solution.textColor} opacity-80 leading-relaxed mt-auto`}>
                {solution.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
