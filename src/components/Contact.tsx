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
  return <section id="contact" className="py-20 lg:py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Get In Touch
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold mb-6">
              Let's Build Together
            </h2>
            <p className="text-gray-600 dark:text-gray-400 text-lg mb-10">
              Have a project in mind? We'd love to hear about it. Send us a
              message and we'll get back to you within 24 hours.
            </p>

            <div className="space-y-8">
              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-primary">
                  <Mail className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Email Us</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    uthrix.solutions@gmail.com
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-primary">
                  <Phone className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-lg">Call Us</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    +94 773 263 997
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-4">
                <div className="p-3 bg-gray-100 dark:bg-gray-800 rounded-lg text-primary">
                  <MapPin className="w-6 h-6" />
                </div>
                {/* <div>
                  <h3 className="font-bold text-lg">Visit Us</h3>
                  <p className="text-gray-600 dark:text-gray-400">
                    123 Tech Avenue, Silicon Valley
                    <br />
                    California, USA
                  </p>
                </div> */}
              </div>
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
        }} className="bg-white dark:bg-gray-900 p-8 rounded-3xl shadow-xl border border-gray-100 dark:border-gray-800">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">
                    Name
                  </label>
                  <input type="text" id="name" required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="John Doe" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email
                  </label>
                  <input type="email" id="email" required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="subject" className="text-sm font-medium">
                  Subject
                </label>
                <input type="text" id="subject" required className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="Project Inquiry" />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  Message
                </label>
                <textarea id="message" required rows={4} className="w-full px-4 py-3 rounded-xl bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none" placeholder="Tell us about your project..." />
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