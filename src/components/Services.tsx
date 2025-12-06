import React, { Children } from 'react';
import { motion } from 'framer-motion';
import { Database, Globe, Layout, Monitor, Server, ShoppingCart } from 'lucide-react';
const services = [{
  icon: Server,
  title: 'ERP Systems',
  description: 'Streamline operations with integrated enterprise solutions designed for scalability and efficiency.'
}, {
  icon: ShoppingCart,
  title: 'eCommerce',
  description: 'Build scalable online stores that drive sales with secure payment gateways and intuitive UX.'
}, {
  icon: Monitor,
  title: 'Desktop Apps',
  description: 'Powerful native applications for Windows and macOS built for performance and reliability.'
}, {
  icon: Layout,
  title: 'Custom Software',
  description: 'Tailored solutions for your unique business needs, solving complex problems with code.'
}, {
  icon: Database,
  title: 'Database Solutions',
  description: 'Robust data management, migration, and optimization for high-performance applications.'
}];
const container = {
  hidden: {
    opacity: 0
  },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};
const item = {
  hidden: {
    opacity: 0,
    y: 20
  },
  show: {
    opacity: 1,
    y: 0
  }
};
export function Services() {
  return <section id="services" className="py-20 lg:py-32 bg-gray-50 dark:bg-gray-900/50 relative overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-gray-100/50 to-transparent dark:from-gray-800/20 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.span initial={{
          opacity: 0,
          y: 10
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} className="text-primary font-semibold tracking-wider uppercase text-sm">
            What We Do
          </motion.span>
          <motion.h2 initial={{
          opacity: 0,
          y: 10
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: 0.1
        }} className="mt-2 text-3xl md:text-4xl font-bold">
            With UTHRIX, You Perform Better.
            <br />
            <span className="text-gray-500 dark:text-gray-400">
              Always! It is our guarantee.
            </span>
          </motion.h2>
        </div>

        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{
        once: true,
        margin: '-100px'
      }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => <motion.div key={service.title} variants={item} className="group relative bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border border-gray-100 dark:border-gray-700 overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-150 duration-500" />

              <div className="relative z-10">
                <div className="w-14 h-14 bg-primary/10 rounded-xl flex items-center justify-center text-primary mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                  <service.icon className="w-7 h-7" />
                </div>

                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {service.title}
                </h3>

                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            </motion.div>)}
        </motion.div>
      </div>
    </section>;
}