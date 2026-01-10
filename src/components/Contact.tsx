import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, MapPin, Phone, Send } from 'lucide-react';
export function Contact() {
  const [formState, setFormState] = useState<'idle' | 'submitting' | 'success'>('idle');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormState('submitting');
    // Simulate API call
    setTimeout(() => {
      setFormState('success');
      setTimeout(() => setFormState('idle'), 3000);
    }, 1500);
  };
  return <section id="contact" className="py-20 lg:py-32 bg-gray-50 dark:bg-[#0a0a0a] relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }}>
            <span className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold tracking-wider uppercase text-sm mb-6">
              Let's Talk
            </span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
              Ready to{" "}
              <span className="text-primary">Accelerate</span>{" "}
              Your Growth?
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-10 leading-relaxed">
              Whether you need a powerful marketing campaign or a robust software solution, we're here to make it happen. Let's start the conversation.
            </p>

            <div className="space-y-6">
              <motion.div 
                className="flex items-start space-x-4 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 bg-gradient-to-br from-primary/10 to-pink-500/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Email Us</h3>
                  <a href="mailto:uthrix.solutions@gmail.com" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    uthrix.solutions@gmail.com
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 bg-gradient-to-br from-blue-500/10 to-cyan-500/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Call Us</h3>
                  <a href="tel:+94773263997" className="text-gray-600 dark:text-gray-400 hover:text-primary transition-colors">
                    +94 773 263 997
                  </a>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-start space-x-4 group"
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <div className="p-3 bg-gradient-to-br from-green-500/10 to-emerald-500/10 rounded-xl text-primary group-hover:scale-110 transition-transform">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg mb-1">Location</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    Sri Lanka
                  </p>
                </div>
              </motion.div>
            </div>

            {/* Animated Map Placeholder */}
            {/* <div className="mt-12 h-48 bg-gray-100 dark:bg-gray-800 rounded-2xl overflow-hidden relative">
              <div className="absolute inset-0 opacity-20">
                <div className="w-full h-full bg-[radial-gradient(#D1001F_1px,transparent_1px)] [background-size:16px_16px]" />
              </div>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div className="relative">
                  <div className="w-4 h-4 bg-primary rounded-full animate-ping absolute inset-0" />
                  <div className="w-4 h-4 bg-primary rounded-full relative z-10" />
                </div>
              </div>
            </div> */}
          </motion.div>

          <motion.div initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} className="bg-white dark:bg-[#141414] p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-white/10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input type="text" id="name" required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input type="email" id="email" required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <input type="text" id="subject" required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Project Inquiry" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea id="message" required rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none" placeholder="Tell us about your project..." />
              </div>

              <button type="submit" disabled={formState !== 'idle'} className={`w-full py-4 rounded-xl font-bold text-white transition-all flex items-center justify-center space-x-2 ${formState === 'success' ? 'bg-green-500' : 'bg-primary hover:bg-primary-dark'}`}>
                {formState === 'idle' && <>
                    <span>Send Message</span>
                    <Send className="w-5 h-5" />
                  </>}
                {formState === 'submitting' && <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />}
                {formState === 'success' && <span>Message Sent!</span>}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>;
}