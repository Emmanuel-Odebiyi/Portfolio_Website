import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../ui/Button';

export const CTASection = () => {
  return (
    <section id="contact" className="py-40 bg-transparent">
      <div className="max-w-5xl mx-auto px-6 text-center space-y-16">
        <div className="space-y-6">
          <h2 className="text-4xl md:text-7xl font-bold text-zinc-900 tracking-tight leading-snug">
            Your Window Is Open. <br />
            <span className="text-brand-gradient">Your Competitors Are Already Moving.</span>
          </h2>
          <p className="text-2xl text-zinc-500 font-light max-w-3xl mx-auto">
            Every week without a system is a week they're showing up where you aren't.
          </p>
          <p className="text-sm font-mono text-zinc-400 uppercase tracking-widest mt-8">
            Availability: May 2026 Booking Now (Limited by Design)
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            {
              title: "Free Strategy Call",
              desc: "30 Minutes. No pitch. Just honest conversation about whether automation is the right move.",
              btn: "Book Your Call →",
              variant: "primary" as const
            },
            {
              title: "Custom Proposal",
              desc: "Tell me about your business. I'll send back a clear action plan and investment breakdown.",
              btn: "Request Proposal →",
              variant: "secondary" as const
            },
            {
              title: "Paid Audit ($500)",
              desc: "A complete, no-fluff analysis of your content, SEO, and automation opportunities.",
              btn: "Book Your Audit →",
              variant: "secondary" as const
            }
          ].map((item, i) => (
            <div key={i} className="p-10 rounded-[2rem] bg-zinc-50 border border-zinc-100 text-left space-y-6 flex flex-col justify-between">
              <div className="space-y-4">
                <h4 className="text-xl font-bold text-zinc-900">{item.title}</h4>
                <p className="text-zinc-500 font-light leading-relaxed">{item.desc}</p>
              </div>
              <Link to="/contact" className="w-full">
                <Button variant={item.variant} className="w-full">
                  {item.btn}
                </Button>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
