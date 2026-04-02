import React from 'react';
import { motion } from 'motion/react';
import { SEO } from '../components/SEO';

export default function PrivacyPolicy() {
  return (
    <div className="pt-32 pb-20 bg-white">
      <SEO 
        title="Privacy Policy | Emmanuel Odebiyi"
        description="Privacy policy and data protection practices for Emmanuel Odebiyi's portfolio and consulting services."
      />
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          <div className="space-y-4">
            <h1 className="text-5xl md:text-6xl font-bold text-zinc-900 tracking-tight">Privacy Policy</h1>
            <p className="text-zinc-500 font-mono text-xs uppercase tracking-widest">Last Updated: March 24, 2026</p>
          </div>

          <div className="prose prose-zinc prose-lg max-w-none font-light text-zinc-600 leading-relaxed space-y-8">
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">1. Introduction</h2>
              <p>
                In plain terms: I value your privacy. This policy outlines how I handle your data when you visit this website, use my tools, or contact me for services.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">2. Information I Collect</h2>
              <p>
                I collect information in two ways:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li><strong>Information you provide:</strong> When you Fill out a contact form, sign up for a newsletter, or use an interactive tool, I collect the data you input (e.g., name, email, business details).</li>
                <li><strong>Automated data:</strong> Like most websites, I use basic analytics (e.g., Google Analytics 4) to understand how people use the site. This includes anonymized data like your IP address, browser type, and pages visited.</li>
              </ul>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">3. How I Use Your Information</h2>
              <p>
                The data I collect is used exclusively to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your inquiries or project requests.</li>
                <li>Provide you with the results of the interactive tools in the Growth Intelligence Lab.</li>
                <li>Send you newsletters if you have explicitly opted in.</li>
                <li>Improve the website experience and technical performance.</li>
              </ul>
              <p className="font-medium text-zinc-900">I do not sell, rent, or trade your personal information to third parties.</p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">4. Data Security</h2>
              <p>
                I implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure. I strive to use commercially acceptable means to protect your personal information but cannot guarantee absolute security.
              </p>
            </section>

            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">5. Third-Party Services</h2>
              <p>
                I use trusted third-party services to run this site and my business (e.g., Vercel for hosting, n8n/Zapier for automation, HubSpot for CRM). Each of these services has its own privacy policy.
              </p>
            </section>

            <section className="space-y-4 border-t border-zinc-100 pt-8">
              <h2 className="text-2xl font-bold text-zinc-900 tracking-tight">6. Contact</h2>
              <p>
                If you have any questions about this Privacy Policy, please contact me at: <br />
                <a href="mailto:emmayoodebiyi001@gmail.com" className="text-brand-gradient font-bold hover:underline">emmayoodebiyi001@gmail.com</a>
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
