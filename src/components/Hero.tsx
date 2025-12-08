import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";
import { useEffect, useState, useCallback } from "react";
import logoWhite from "../assets/images/UlogoWhite.png";
import logoRed from "../assets/images/UlogoRed.png";

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
    const checkTheme = () => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };

    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "class") {
          checkTheme();
        }
      });
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  return isDark;
}

// Separate component for 3D illustration
interface LogoIllustrationProps {
  rotate: MotionValue<number>;
  isDark: boolean;
}

function LogoIllustration({ rotate, isDark }: LogoIllustrationProps) {
  return (
    <div className="relative h-[400px] md:h-[600px] flex items-center justify-center perspective-1000">
      <motion.div
        style={{ rotateY: rotate }}
        className="relative w-64 h-64 md:w-80 md:h-80 preserve-3d animate-float"
      >
        {/* Central Cube */}
        <div
          className="absolute inset-0 bg-gradient-to-br from-primary to-primary-dark rounded-3xl opacity-90 shadow-2xl transform rotate-45"
          aria-hidden="true"
        />

        {/* Floating Elements */}
        <div
          className="absolute -top-12 -right-12 w-24 h-24 bg-gray-100 dark:bg-gray-800 rounded-2xl shadow-xl animate-float-delayed flex items-center justify-center border border-gray-200 dark:border-gray-700"
          aria-hidden="true"
        >
          <div className="w-12 h-12 bg-primary/20 rounded-full" />
        </div>

        <div
          className="absolute -bottom-8 -left-8 w-32 h-32 bg-white dark:bg-gray-900 rounded-full shadow-xl animate-pulse-slow flex items-center justify-center border border-gray-200 dark:border-gray-700 z-20"
          aria-hidden="true"
        >
          <img
            src={isDark ? logoWhite : logoRed}
            alt="UthriX Logo"
            className="w-16 h-16 object-contain transition-opacity duration-300"
            loading="lazy"
            width={64}
            height={64}
          />
        </div>

        {/* Orbiting Ring */}
        <div
          className="absolute inset-[-40px] border-2 border-dashed border-primary/30 rounded-full animate-spin-slow"
          aria-hidden="true"
        />
      </motion.div>
    </div>
  );
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
  const rotate = useTransform(
    scrollY,
    ANIMATION_CONFIG.rotate.input,
    ANIMATION_CONFIG.rotate.output
  );

  const isDark = useThemeDetection();

  const handleContactClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
    },
    []
  );

  const handlePortfolioClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>) => {
      e.preventDefault();
      document.getElementById("portfolio")?.scrollIntoView({ behavior: "smooth" });
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
            <motion.span
              variants={ANIMATION_VARIANTS.badge}
              className="inline-block px-4 py-2 rounded-full bg-primary/10 text-primary font-semibold text-sm mb-6"
              role="status"
              aria-label="Company tagline"
            >
              Future of Software Development
            </motion.span>

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6">
              Crafting Future <br />
              <span className="text-primary">Software Today</span>
            </h1>

            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 mb-8 max-w-lg leading-relaxed">
              Empowering businesses with tailored technology solutions for
              seamless growth. We turn complex ideas into elegant reality.
            </p>

            <nav
              className="flex flex-col sm:flex-row gap-4"
              aria-label="Hero navigation"
            >
              <a
                href="#contact"
                onClick={handleContactClick}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full bg-primary text-white font-semibold hover:bg-primary-dark transition-all hover:scale-105 shadow-lg shadow-primary/25 group focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="Contact us"
              >
                Let's Connect
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
              </a>
              <a
                href="#portfolio"
                onClick={handlePortfolioClick}
                className="inline-flex items-center justify-center px-8 py-4 rounded-full border-2 border-gray-200 dark:border-gray-800 font-semibold hover:border-primary hover:text-primary transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label="View our portfolio"
              >
                View Portfolio
              </a>
            </nav>
          </motion.div>

          {/* 3D Illustration Area */}
          <LogoIllustration rotate={rotate} isDark={isDark} />
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
    </section>
  );
}
