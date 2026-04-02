import React from 'react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';

export default function TermsOfService() {
  return (
    <div className="pt-32 pb-20 bg-white font-sans">
      <SEO 
        title="Terms of Service | Emmanuel Odebiyi"
        description="Terms and conditions for using Emmanuel Odebiyi's portfolio, interactive tools, and consulting services."
      />
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 tracking-tight">Terms of Service</h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Last Updated: March 24, 2026</p>
          </div>

          <div className="prose prose-zinc prose-lg max-w-none font-light text-zinc-600 leading-relaxed space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">1. Agreement to Terms</h2>
              <p>
                By accessing this website, you agree to be bound by these Terms of Service. If you disagree with any part of these terms, please do not use the website or its services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">2. Use of Site and Tools</h2>
              <p>
                The information and interactive tools provided in the Growth Intelligence Lab are for educational and diagnostic purposes. They are based on general benchmarks and my own experience, not guaranteed financial calculations.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You may not use this website for any unlawful purpose.</li>
                <li>You may not attempt to reverse-engineer or scrape the tools provided.</li>
                <li>You use the tools and follow any advice at your own risk.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">3. Intellectual Property</h2>
              <p>
                All content on this site, including but not limited to text, design, graphics, code, and methodology, is the intellectual property of Emmanuel Odebiyi unless otherwise stated. You may not reproduce, redistribute, or use any part of this site for commercial purposes without explicit written permission.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">4. Limitation of Liability</h2>
              <p>
                Emmanuel Odebiyi and the website shall not be held liable for any damages that result from the use of, or the inability to use, the materials on this site or the performance of the services.
              </p>
            </section>

            <section className="space-y-4 border-t border-zinc-100 pt-8">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">5. Contact</h2>
              <p>
                If you have any questions about these Terms of Service, please contact me at: <br />
                <a href="mailto:emmayoodebiyi001@gmail.com" className="text-brand-gradient font-bold hover:underline">emmayoodebiyi001@gmail.com</a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
