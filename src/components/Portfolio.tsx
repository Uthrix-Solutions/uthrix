import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUpRight } from 'lucide-react';
const projects = [{
  title: 'FinTech Dashboard',
  category: 'Web Application',
  image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
  color: 'bg-blue-500'
}, {
  title: 'E-Commerce Platform',
  category: 'Mobile App',
  image: 'https://images.unsplash.com/photo-1523206489230-c012c64b2b48?auto=format&fit=crop&q=80&w=800',
  color: 'bg-purple-500'
}, {
  title: 'Healthcare System',
  category: 'Enterprise Software',
  image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&q=80&w=800',
  color: 'bg-green-500'
}, {
  title: 'Smart Home Hub',
  category: 'IoT Solution',
  image: 'https://images.unsplash.com/photo-1558002038-1091a166111c?auto=format&fit=crop&q=80&w=800',
  color: 'bg-orange-500'
}, {
  title: 'Logistics Tracker',
  category: 'SaaS Platform',
  image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&q=80&w=800',
  color: 'bg-red-500'
}, {
  title: 'Social Network',
  category: 'Mobile App',
  image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=80&w=800',
  color: 'bg-pink-500'
}];
export function Portfolio() {
  return <section id="portfolio" className="py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <motion.div initial={{
          opacity: 0,
          x: -20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }}>
            <span className="text-primary font-semibold tracking-wider uppercase text-sm">
              Our Work
            </span>
            <h2 className="mt-2 text-3xl md:text-4xl font-bold">
              Featured Projects
            </h2>
          </motion.div>

          <motion.a href="#" initial={{
          opacity: 0,
          x: 20
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }} className="hidden md:flex items-center text-primary font-semibold hover:text-primary-dark transition-colors">
            View All Projects <ArrowUpRight className="ml-2 w-5 h-5" />
          </motion.a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => <motion.div key={index} initial={{
          opacity: 0,
          y: 20
        }} whileInView={{
          opacity: 1,
          y: 0
        }} viewport={{
          once: true
        }} transition={{
          delay: index * 0.1
        }} className="group relative rounded-2xl overflow-hidden aspect-[4/3] cursor-pointer">
              <img src={project.image} alt={project.title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-6 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium text-white mb-2 ${project.color}`}>
                  {project.category}
                </span>
                <h3 className="text-xl font-bold text-white mb-1">
                  {project.title}
                </h3>
                <div className="flex items-center text-white/80 text-sm font-medium">
                  View Case Study <ArrowUpRight className="ml-1 w-4 h-4" />
                </div>
              </div>
            </motion.div>)}
        </div>

        <div className="mt-12 text-center md:hidden">
          <a href="#" className="inline-flex items-center text-primary font-semibold">
            View All Projects <ArrowUpRight className="ml-2 w-5 h-5" />
          </a>
        </div>
      </div>
    </section>;
}