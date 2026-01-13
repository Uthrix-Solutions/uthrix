import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, Play, ChevronLeft, ChevronRight, ArrowUpRight, Pause } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  position: string;
  company: string;
  companyLogo?: string;
  image: string;
  quote: string;
  rating: number;
  videoUrl?: string;
  projectType?: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    position: "Marketing Director",
    company: "TechFlow Solutions",
    image: "https://i.pravatar.cc/150?img=1",
    quote: "Uthrix transformed our digital presence completely. Their strategic approach to social media marketing increased our engagement by 340% in just 3 months. The team's creativity and data-driven insights are unmatched.",
    rating: 5,
    projectType: "Social Media Marketing",
    videoUrl: "https://example.com/testimonial1.mp4"
  },
  {
    id: 2,
    name: "Michael Chen",
    position: "CEO",
    company: "InnovateHub",
    image: "https://i.pravatar.cc/150?img=33",
    quote: "Working with Uthrix on our web application was a game-changer. They delivered a scalable, beautiful solution that exceeded our expectations. The development process was smooth, transparent, and truly collaborative.",
    rating: 5,
    projectType: "Web Development"
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    position: "Founder",
    company: "GreenLeaf Organics",
    image: "https://i.pravatar.cc/150?img=5",
    quote: "The branding and design work Uthrix created for us was phenomenal. They captured our vision perfectly and delivered a brand identity that resonates with our customers. Our sales increased by 85% post-launch!",
    rating: 5,
    projectType: "Branding & Design"
  }
];

// Statistics data
const stats = [
  { value: 3, suffix: '+', label: 'Happy Clients', duration: 2000 },
  { value: 100, suffix: '%', label: 'Satisfaction Rate', duration: 2500 },
  { value: 10, suffix: '+', label: 'Projects Delivered', duration: 2000 },
  { value: 1, suffix: '+', label: 'Industry Awards', duration: 1500 }
];

// Custom easing function
const easeOutQuart = (t: number): number => {
  return 1 - Math.pow(1 - t, 4);
};

// Counter component with intersection observer
function AnimatedCounter({ value, suffix, label, duration }: { 
  value: number; 
  suffix: string; 
  label: string; 
  duration: number;
}) {
  const [count, setCount] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const counterRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          setIsVisible(true);
          hasAnimated.current = true;
        }
      },
      { threshold: 0.2, rootMargin: '50px' }
    );

    if (counterRef.current) {
      observer.observe(counterRef.current);
    }

    return () => {
      if (counterRef.current) {
        observer.unobserve(counterRef.current);
      }
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!isVisible) return;

    let startTime: number | null = null;

    const animate = (currentTime: number) => {
      if (!startTime) startTime = currentTime;
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easedProgress = easeOutQuart(progress);
      const currentValue = Math.floor(easedProgress * value);
      
      setCount(currentValue);

      if (progress < 1) {
        animationFrameRef.current = requestAnimationFrame(animate);
      } else {
        setCount(value);
      }
    };

    animationFrameRef.current = requestAnimationFrame(animate);

    return () => {
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, [isVisible, value, duration]);

  return (
    <div ref={counterRef}>
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isVisible ? { opacity: 1, scale: 1 } : {}}
        transition={{ 
          duration: 0.6, 
          type: "spring",
          stiffness: 100,
          damping: 15
        }}
        className="text-center group"
      >
        <div className="text-4xl md:text-5xl font-bold text-primary mb-2 group-hover:scale-110 transition-transform">
          {count}{suffix}
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-sm text-[var(--text-secondary)] uppercase tracking-wider"
        >
          {label}
        </motion.div>
      </motion.div>
    </div>
  );
}

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);

  // Auto-play functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 6000);

    return () => clearInterval(interval);
  }, []);

  const handlePrevious = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handleDotClick = (index: number) => {
    setDirection(index > currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0,
      scale: 0.8
    })
  };

  const currentTestimonial = testimonials[currentIndex];

  return (
    <section id="testimonials" className="py-20 bg-[var(--bg-primary)] relative overflow-hidden">
      {/* Minimal Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-20"
        >
          <span className="text-primary font-semibold tracking-wider uppercase text-sm">
            TESTIMONIALS
          </span>
          <h2 className="mt-2 text-3xl md:text-5xl font-bold mb-4">
            What Our Clients Say
          </h2>
          <p className="text-lg text-[var(--text-secondary)] max-w-2xl mx-auto">
            Real stories from real clients who transformed their businesses with our solutions.
          </p>
        </motion.div>

        {/* Main Testimonial Showcase */}
        <div className="relative mb-20">
          <div className="max-w-5xl mx-auto">
            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.2 },
                  scale: { duration: 0.2 }
                }}
              >
                {/* Featured Testimonial Card */}
                <div className="bg-[var(--bg-secondary)] rounded-3xl p-8 md:p-16 relative border border-gray-100 dark:border-gray-800">
                  {/* Decorative Quote Mark */}
                  <div className="absolute -top-6 left-8">
                    <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
                      <Quote className="w-6 h-6 text-white" />
                    </div>
                  </div>

                  {/* Project Type Badge */}
                  {currentTestimonial.projectType && (
                    <div className="inline-block mb-6">
                      <span className="px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-medium">
                        {currentTestimonial.projectType}
                      </span>
                    </div>
                  )}

                  {/* Rating */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(currentTestimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-xl md:text-2xl font-medium leading-relaxed mb-8 text-[var(--text-primary)]">
                    "{currentTestimonial.quote}"
                  </blockquote>

                  {/* Author */}
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-primary/20">
                        <img
                          src={currentTestimonial.image}
                          alt={currentTestimonial.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      {currentTestimonial.videoUrl && (
                        <motion.div
                          animate={{ scale: [1, 1.1, 1] }}
                          transition={{ repeat: Infinity, duration: 2 }}
                          className="absolute -bottom-1 -right-1 w-8 h-8 bg-primary rounded-full flex items-center justify-center shadow-lg"
                        >
                          <Play className="w-4 h-4 text-white fill-white ml-0.5" />
                        </motion.div>
                      )}
                    </div>
                    
                    <div>
                      <h4 className="font-bold text-xl text-[var(--text-primary)]">
                        {currentTestimonial.name}
                      </h4>
                      <p className="text-[var(--text-secondary)] text-base">
                        {currentTestimonial.position}
                      </p>
                      <p className="text-primary font-medium text-sm">
                        {currentTestimonial.company}
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Navigation Controls */}
            <div className="flex items-center justify-center gap-6 mt-12">
              {/* Previous Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handlePrevious}
                className="w-12 h-12 bg-[var(--bg-secondary)] hover:bg-primary border border-gray-200 dark:border-gray-800 hover:border-primary rounded-full flex items-center justify-center text-[var(--text-primary)] hover:text-white transition-all duration-300 group"
                aria-label="Previous testimonial"
              >
                <ChevronLeft className="w-6 h-6" />
              </motion.button>

              {/* Dots */}
              <div className="flex gap-3">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => handleDotClick(index)}
                    className={`transition-all duration-300 ${
                      index === currentIndex
                        ? 'w-12 h-2 bg-primary'
                        : 'w-2 h-2 bg-gray-300 dark:bg-gray-700 hover:bg-primary/50'
                    } rounded-full`}
                    aria-label={`Go to testimonial ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleNext}
                className="w-12 h-12 bg-[var(--bg-secondary)] hover:bg-primary border border-gray-200 dark:border-gray-800 hover:border-primary rounded-full flex items-center justify-center text-[var(--text-primary)] hover:text-white transition-all duration-300 group"
                aria-label="Next testimonial"
              >
                <ChevronRight className="w-6 h-6" />
              </motion.button>
            </div>
          </div>
        </div>

        {/* Testimonial Grid - All Reviews */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-12 text-[var(--text-primary)]">
            More Success Stories
          </h3>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="bg-[var(--bg-secondary)] rounded-2xl p-6 border border-gray-100 dark:border-gray-800 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
                onClick={() => handleDotClick(index)}
              >
                {/* Mini Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-primary text-primary" />
                    ))}
                  </div>
                  {testimonial.videoUrl && (
                    <div className="w-6 h-6 bg-primary/10 rounded-full flex items-center justify-center">
                      <Play className="w-3 h-3 text-primary fill-primary" />
                    </div>
                  )}
                </div>

                {/* Quote */}
                <p className="text-sm text-[var(--text-secondary)] leading-relaxed mb-6 line-clamp-4">
                  "{testimonial.quote}"
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary/20">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-grow min-w-0">
                    <h4 className="font-semibold text-sm text-[var(--text-primary)] truncate">
                      {testimonial.name}
                    </h4>
                    <p className="text-xs text-[var(--text-secondary)] truncate">
                      {testimonial.position}
                    </p>
                  </div>
                  <ArrowUpRight className="w-5 h-5 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Project Badge */}
                {testimonial.projectType && (
                  <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-800">
                    <span className="text-xs text-primary font-medium">
                      {testimonial.projectType}
                    </span>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 pt-20 border-t border-gray-200 dark:border-gray-800"
        >
          {stats.map((stat, index) => (
            <AnimatedCounter
              key={index}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              duration={stat.duration}
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
