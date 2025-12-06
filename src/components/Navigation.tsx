import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { motion, AnimatePresence } from 'framer-motion';
const navLinks = [{
  name: 'Home',
  href: '#home'
}, {
  name: 'Services',
  href: '#services'
}, {
  name: 'Technologies',
  href: '#technologies'
}, {
  name: 'Portfolio',
  href: '#portfolio'
}, {
  name: 'About',
  href: '#about'
}, {
  name: 'Contact',
  href: '#contact'
}];
export function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-black/80 backdrop-blur-md py-4 shadow-lg' : 'bg-transparent py-6'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <a href="#" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center text-white font-bold text-xl group-hover:scale-110 transition-transform duration-300">
              U
            </div>
            <span className="text-2xl font-heading font-bold tracking-tight">
              UTHRIX
            </span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map(link => <a key={link.name} href={link.href} className="text-sm font-medium hover:text-primary transition-colors relative group">
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>)}
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <ThemeToggle />
            <button onClick={() => setIsOpen(!isOpen)} className="p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors" aria-label="Toggle menu">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Overlay */}
      <AnimatePresence>
        {isOpen && <motion.div initial={{
        opacity: 0,
        height: 0
      }} animate={{
        opacity: 1,
        height: 'auto'
      }} exit={{
        opacity: 0,
        height: 0
      }} className="md:hidden bg-white dark:bg-black border-t border-gray-100 dark:border-gray-800 overflow-hidden">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {navLinks.map(link => <a key={link.name} href={link.href} onClick={() => setIsOpen(false)} className="block px-3 py-3 rounded-md text-base font-medium hover:bg-gray-50 dark:hover:bg-gray-900 hover:text-primary transition-colors">
                  {link.name}
                </a>)}
            </div>
          </motion.div>}
      </AnimatePresence>
    </nav>;
}