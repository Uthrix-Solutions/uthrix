import React from 'react';
import { motion } from 'framer-motion';
import { Code2, Database, Globe, Layers, Server } from 'lucide-react';
const technologies = [{
  name: '.NET',
  icon: Server,
  color: '#512BD4'
}, {
  name: 'Spring Boot',
  icon: Layers,
  color: '#6DB33F'
}, {
  name: 'React',
  icon: Code2,
  color: '#61DAFB'
}, {
  name: 'Angular',
  icon: Globe,
  color: '#DD0031'
}, {
  name: 'SQL Server',
  icon: Database,
  color: '#CC2927'
}];
export function Technologies() {
  return <section id="technologies" className="py-20 bg-primary text-white relative overflow-hidden">
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,white,transparent_60%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div initial={{
          opacity: 0,
          x: -30
        }} whileInView={{
          opacity: 1,
          x: 0
        }} viewport={{
          once: true
        }}>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Technologies That Power <br />
              Your Growth
            </h2>
            <p className="text-white/80 text-lg max-w-md leading-relaxed mb-8">
              We leverage the latest and most robust frameworks to build
              scalable, secure, and high-performance applications.
            </p>
            <div className="h-1 w-20 bg-white rounded-full" />
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {technologies.map((tech, index) => <motion.div key={tech.name} initial={{
            opacity: 0,
            y: 20
          }} whileInView={{
            opacity: 1,
            y: 0
          }} viewport={{
            once: true
          }} transition={{
            delay: index * 0.1
          }} whileHover={{
            scale: 1.05
          }} className="bg-white/10 backdrop-blur-md border border-white/20 p-6 rounded-xl flex flex-col items-center justify-center text-center hover:bg-white/20 transition-all cursor-default">
                <div className="w-12 h-12 rounded-full bg-white text-primary flex items-center justify-center mb-4 shadow-lg">
                  <tech.icon className="w-6 h-6" style={{
                color: tech.color
              }} />
                </div>
                <span className="font-semibold">{tech.name}</span>
              </motion.div>)}
          </div>
        </div>
      </div>
    </section>;
}