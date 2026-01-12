import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useState, useEffect, useCallback } from "react";
import { Logo3D } from "./Logo3D";

// Constants
const SCROLL_RANGE = 500;
const ANIMATION_CONFIG = {
  y1: { input: [0, SCROLL_RANGE] as number[], output: [0, 200] as number[] },
  y2: { input: [0, SCROLL_RANGE] as number[], output: [0, -150] as number[] },
  rotate: { input: [0, SCROLL_RANGE] as number[], output: [0, 45] as number[] },
} as const;

const ANIMATION_VARIANTS = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
  badge: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay: 0.2 },
    },
  },
  scroll: {
    hidden: { opacity: 0, y: 10 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 1,
        duration: 1,
        repeat: Infinity,
        repeatType: "reverse" as const,
      },
    },
  },
} as const;

// Custom hook for theme detection
function useThemeDetection(): boolean {
  const [isDark, setIsDark] = useState(() =>
    document.documentElement.classList.contains("dark")
  );

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDark(document.documentElement.classList.contains("dark"));
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}




export function Hero() {
  const { scrollY } = useScroll();
  const y1 = useTransform(
    scrollY,
    ANIMATION_CONFIG.y1.input,
    ANIMATION_CONFIG.y1.output
  );
  const y2 = useTransform(
    scrollY,
    ANIMATION_CONFIG.y2.input,
    ANIMATION_CONFIG.y2.output
  );


  const isDark = useThemeDetection();

  const handleContactClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      document
        .getElementById("contact")
        ?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  const handlePortfolioClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      document
        .getElementById("portfolio")
        ?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20"
      aria-label="Hero section"
    >
      {/* Background Elements */}
      <div
        className="absolute inset-0 overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_50%,rgba(209,0,31,0.05),transparent_50%)]" />

        {/* Animated Blobs */}
        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 right-[10%] w-72 h-72 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 left-[10%] w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={ANIMATION_VARIANTS}
          >
            <motion.div
              className="mb-6 sm:mb-8 flex justify-start sm:justify-left"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
            >
              <motion.div
                className="relative px-3 py-1.5 sm:px-3 sm:py-1 text-gray-600 dark:text-gray-400 rounded-full text-xs sm:text-sm/6 ring-1 ring-gray-900/10 dark:ring-gray-100/10 hover:ring-gray-900/20 dark:hover:ring-gray-100/20 overflow-hidden group cursor-pointer max-w-full"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.98 }}
              >
                {/* Animated gradient background on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 opacity-0 group-hover:opacity-100"
                  initial={false}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: "200% 100%",
                  }}
                />

                {/* Shimmer effect */}
                <motion.div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100"
                  initial={false}
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"
                    animate={{
                      x: ["-200%", "200%"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      repeatDelay: 1,
                      ease: "easeInOut",
                    }}
                  />
                </motion.div>

                <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                  <motion.span
                    className="inline-block w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full flex-shrink-0"
                    animate={{
                      scale: [1, 1.2, 1],
                      opacity: [1, 0.7, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                  />
                  <span className="whitespace-nowrap overflow-hidden text-ellipsis">
                    Digital Marketing × Software Development
                  </span>
                  <a
                    href="#services"
                    className="font-semibold text-primary group/link inline-flex items-center whitespace-nowrap flex-shrink-0"
                  >
                    <span
                      className="absolute inset-0"
                      aria-hidden="true"
                    ></span>
                    <span className="hidden xs:inline">Explore</span>
                    <span className="inline xs:hidden">More</span>
                    <motion.span
                      className="inline-block ml-0.5 sm:ml-1"
                      animate={{
                        x: [0, 3, 0],
                      }}
                      transition={{
                        duration: 1.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      aria-hidden="true"
                    >
                      &rarr;
                    </motion.span>
                  </a>
                </span>
              </motion.div>
            </motion.div>
            
            {/* Animated Subtitle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="mb-4"
            >
              <span className="text-sm md:text-base font-semibold tracking-wider uppercase text-primary">
                Transform • Innovate • Dominate
              </span>
            </motion.div>
            
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Digital Excellence <br />
              <span className="relative inline-block">
                <span className="text-primary">Engineered</span>
                <motion.span
                  className="absolute -bottom-2 left-0 w-full h-1 bg-primary"
                  initial={{ width: 0 }}
                  animate={{ width: "100%" }}
                  transition={{ delay: 1, duration: 0.8 }}
                />
              </span>{" "}for Growth
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
              We blend cutting-edge software development with data-driven digital marketing to accelerate your business growth and market dominance.
            </p>

            <nav
              className="flex flex-col sm:flex-row gap-4"
              aria-label="Hero navigation"
            >
              <a
                href="#contact"
                onClick={handleContactClick}
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-white font-semibold overflow-hidden transition-all hover:scale-105 shadow-lg shadow-primary/25 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Contact us"
              >
                <span className="absolute inset-0 bg-gradient-to-r from-primary via-primary-dark to-primary bg-[length:200%_100%] group-hover:bg-[position:100%_0] transition-all duration-500" />
                <span className="relative flex items-center">
                  Start Your Project
                  <ArrowRight
                    className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform"
                    aria-hidden="true"
                  />
                </span>
              </a>
              <a
                href="#portfolio"
                onClick={handlePortfolioClick}
                className="group relative inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-gray-200 dark:border-white/10 font-semibold transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 overflow-hidden"
                aria-label="View our portfolio"
              >
                <span className="absolute inset-0 bg-primary/5 scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300" />
                <span className="relative group-hover:text-primary transition-colors">
                  View Case Studies
                </span>
              </a>
            </nav>
          </motion.div>

          {/* 3D Logo Area */}
          <Logo3D isDark={isDark} />
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={ANIMATION_VARIANTS.scroll}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        aria-label="Scroll down indicator"
      >
        <ChevronDown className="w-8 h-8 text-gray-400" aria-hidden="true" />
      </motion.div>

      {/* Watermark Background */}
      <div className="pointer-events-none absolute left-0 right-0 bottom-0 h-[55vh] overflow-hidden" aria-hidden="true">
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/20 to-transparent dark:from-black/60 dark:via-black/30" />
        <div
          className="absolute inset-0 bg-[url('/logos/uthrix10.png')] bg-no-repeat bg-center bg-[length:90vw] translate-y-[10%] opacity-6 md:opacity-10 mix-blend-screen"
        />
      </div>
    </section>
  );
}
