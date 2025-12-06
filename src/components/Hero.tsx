import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, ChevronDown } from 'lucide-react';
export function Hero() {
  const {
    scrollY
  } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);
  const rotate = useTransform(scrollY, [0, 500], [0, 45]);
  return <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(209,0,31,0.05),transparent_50%)]" />

        {/* Animated Blobs */}
        <motion.div style={{
        y: y1
      }} className="absolute top-20 right-[10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <motion.div style={{
        y: y2
      }} className="absolute bottom-20 left-[10%] w-96 h-96 bg-blue-500/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div initial={{
          opacity: 0,
          x: -50
        }} animate={{
          opacity: 1,
          x: 0
        }} transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}>
            <motion.div initial={{
            opacity: 0,
            y: 20
          }} animate={{
            opacity: 1,
            y: 0
          }} transition={{
            delay: 0.2
          }} className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6">
              Future of Software Development
            </motion.div>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Crafting Future <br />
              <span className="text-primary">Software Today</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
              Empowering businesses with tailored technology solutions for
              seamless growth. We turn complex ideas into elegant reality.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <a href="#contact" className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-all hover:scale-105 shadow-lg shadow-primary/25 group">
                Let's Connect
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a href="#portfolio" className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-gray-200 dark:border-gray-800 font-semibold hover:border-primary hover:text-primary transition-all hover:scale-105">
                View Portfolio
              </a>
            </div>
          </motion.div>

          {/* 3D Illustration Area */}
          <div className="relative h-[400px] md:h-[600px] flex items-center justify-center perspective-1000">
            <motion.div style={{
            rotateY: rotate
          }} className="relative w-64 h-64 md:w-80 md:h-80 preserve-3d animate-float">
              {/* Central Cube */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-3xl opacity-90 shadow-2xl transform rotate-45" />

              {/* Floating Elements */}
              <div className="absolute -top-12 -right-12 w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-xl animate-float-delayed flex items-center justify-center border border-gray-200 dark:border-gray-700">
                <div className="w-12 h-12 bg-primary/20 rounded-full" />
              </div>

              <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-white dark:bg-gray-900 rounded-full shadow-xl animate-pulse-slow flex items-center justify-center border border-gray-200 dark:border-gray-700 z-20">
                <div className="text-4xl font-bold text-primary">U</div>
              </div>

              {/* Orbiting Ring */}
              <div className="absolute inset-[-40px] border-2 border-dashed border-primary/30 rounded-full animate-spin-slow" />
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div initial={{
      opacity: 0,
      y: 10
    }} animate={{
      opacity: 1,
      y: 0
    }} transition={{
      delay: 1,
      duration: 1,
      repeat: Infinity,
      repeatType: 'reverse'
    }} className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
        <ChevronDown className="w-8 h-8 text-gray-400" />
      </motion.div>
    </section>;
}