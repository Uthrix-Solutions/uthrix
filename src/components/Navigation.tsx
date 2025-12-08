import { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from "../assets/logo7.png";

const navLinks = [
  { name: 'Home', path: 'home' },
  { name: 'Services', path: 'services' },
  { name: 'Technologies', path: 'technologies' },
  { name: 'Portfolio', path: 'portfolio' },
  { name: 'About', path: 'about' },
];

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState('');

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle scroll event for sticky navbar with debounce effect
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleScroll = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setIsSticky(window.scrollY > 100);
      }, 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      clearTimeout(timeoutId);
    };
  }, []);

  // Scroll to section handler
  const scrollToSection = (path: string) => {
    setActiveSection(path);
    setIsMenuOpen(false);
    
    const element = document.getElementById(path);
    if (element) {
      const navbarHeight = 100;
      const elementPosition = element.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth',
      });
    }
  };

  // Track active section on scroll
  useEffect(() => {
    const handleScrollSpy = () => {
      const sections = navLinks.map(link => document.getElementById(link.path));
      const scrollPosition = window.scrollY + 150;

      sections.forEach((section, index) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.offsetHeight;
          
          if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            setActiveSection(navLinks[index].path);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  return (
    <header
      className={`fixed top-16 right-4 md:left-1/2 transform md:-translate-x-1/2 w-fit rounded-full px-5 py-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-50 md:top-4 border backdrop-blur-md ${
        isSticky
          ? 'bg-white/10 dark:bg-black/10 shadow-lg border-white/20 dark:border-gray-700/20'
          : 'bg-white dark:bg-black shadow-md border-transparent'
      }`}
    >
      <nav className="flex items-center gap-6">
        {/* Logo */}
        <a 
          href="/" 
          className="text-2xl font-bold"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={logo} alt="logo" className="w-8 h-8 cursor-pointer transition-transform duration-200 ease-out hover:scale-150 hover:-rotate-[1.5deg] hover:drop-shadow-md motion-reduce:transition-none motion-reduce:hover:transform-none" />
        </a>
        {/* Mobile menu button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-gray-700 dark:text-gray-300 focus:outline-none p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex items-center gap-6">
          {navLinks.map(({ name, path }) => (
            <li key={path} className="cursor-pointer">
              <a
                href={`#${path}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(path);
                }}
                className={`block py-2 font-medium text-sm hover:text-primary transition-colors relative group whitespace-nowrap ${
                  activeSection === path ? 'text-primary' : ''
                }`}
              >
                {name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full" />
              </a>
            </li>
          ))}
          
          {/* Desktop Contact Button */}
          <li>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                scrollToSection('contact');
              }}
              className="bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-primary/80 transition-colors whitespace-nowrap"
            >
              Talk to Us
            </a>
          </li>
        </ul>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2 }}
            className="md:hidden absolute top-full right-0 mt-2 bg-white dark:bg-black rounded-lg shadow-lg py-4 px-6 w-48 border border-gray-200 dark:border-gray-800"
          >
            <ul className="flex flex-col space-y-3 text-center">
              {navLinks.map(({ name, path }) => (
                <li key={path} className="cursor-pointer">
                  <a
                    href={`#${path}`}
                    onClick={(e) => {
                      e.preventDefault();
                      scrollToSection(path);
                    }}
                    className={`block py-2 font-medium hover:text-primary transition-colors ${
                      activeSection === path ? 'text-primary' : ''
                    }`}
                  >
                    {name}
                  </a>
                </li>
              ))}
              
              {/* Mobile Contact Button */}
              <li className="mt-3">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection('contact');
                  }}
                  className="bg-primary text-white w-full h-10 flex items-center justify-center rounded-md font-medium hover:bg-primary/80 transition-colors"
                >
                  Contact Us
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}