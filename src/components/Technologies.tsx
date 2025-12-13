import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Import technology logos
import react from "../assets/techstack/react.png";
import nodejs from "../assets/techstack/nodejs.png";
import flutter from "../assets/techstack/flutter.png";
import spring from "../assets/techstack/spring.png";
import figma from "../assets/techstack/figma.png";
import img6 from "../assets/techstack/6.png";
import img7 from "../assets/techstack/7.png";
import img8 from "../assets/techstack/8.png";
import img9 from "../assets/techstack/9.png";
import img10 from "../assets/techstack/10.png";
import img12 from "../assets/techstack/12.png";
import img13 from "../assets/techstack/13.png";
import img14 from "../assets/techstack/14.png";
import img15 from "../assets/techstack/15.png";

const technologies = [
  react,
  nodejs,
  flutter,
  spring,
  figma,
  img6,
  img7,
  img8,
  img9,
  img10,
  img12,
  img13,
  img14,
  img15,
];

export function Technologies() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollAnimationRef = useRef<number | null>(null);
  const autoScrollPositionRef = useRef(0);
  const lastAutoScrollTimeRef = useRef(0);

  useEffect(() => {
    startAutoScroll();
    return () => {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  const startAutoScroll = () => {
    const animate = (currentTime: number) => {
      if (!isDragging && scrollRef.current) {
        const deltaTime = currentTime - lastAutoScrollTimeRef.current;
        const speed = 0.05;
        autoScrollPositionRef.current += speed * deltaTime;

        const maxScroll = scrollRef.current.scrollWidth / 2;
        if (autoScrollPositionRef.current >= maxScroll) {
          autoScrollPositionRef.current -= maxScroll;
        }

        scrollRef.current.scrollLeft = autoScrollPositionRef.current;
      }
      lastAutoScrollTimeRef.current = currentTime;
      scrollAnimationRef.current = requestAnimationFrame(animate);
    };

    scrollAnimationRef.current = requestAnimationFrame(animate);
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    autoScrollPositionRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    autoScrollPositionRef.current = scrollRef.current.scrollLeft;
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    autoScrollPositionRef.current = scrollRef.current.scrollLeft;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    autoScrollPositionRef.current = scrollRef.current.scrollLeft;
  };

  return (
    <section
      id="technologies"
      className="py-20 bg-primary text-white relative overflow-hidden"
    >
      {/* Abstract Background Shapes */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_30%_50%,black,transparent_60%)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col items-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
            Technologies That Power Your Growth
          </h2>
          <p className="text-white/80 text-lg text-center max-w-2xl leading-relaxed">
            We leverage the latest and most robust frameworks to build
            scalable, secure, and high-performance applications.
          </p>
          <div className="h-1 w-20 bg-white rounded-full mt-6" />
        </motion.div>

        {/* Scrollable Tech Logos */}
        <div className="relative w-full overflow-hidden">
          {/* Fading Effect */}
          <div className="absolute top-0 left-0 z-10 w-12 h-full pointer-events-none bg-gradient-to-r from-primary to-transparent"></div>
          <div className="absolute top-0 right-0 z-10 w-12 h-full pointer-events-none bg-gradient-to-l from-primary to-transparent"></div>

          {/* Scrollable Content */}
          <div
            ref={scrollRef}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onMouseMove={handleMouseMove}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleMouseUp}
            onTouchMove={handleTouchMove}
            className={`flex items-center ${
              isDragging ? "cursor-grabbing" : "cursor-grab"
            } select-none overflow-hidden py-8`}
          >
            {[...technologies, ...technologies, ...technologies].map((logo, index) => (
              <div
                key={index}
                className="flex-shrink-0 mx-4 sm:mx-6 md:mx-8"
              >
                <div className="bg-white/10 backdrop-blur-md border border-white/20 p-6 sm:p-8 md:p-10 rounded-xl hover:bg-white/20 transition-all dark:bg-gradient-to-br dark:from-gray-900 dark:to-black dark:hover:from-gray-800 dark:hover:to-gray-900">
                  <img
                    src={logo}
                    alt={`Technology ${index + 1}`}
                    className="object-contain w-12 h-12 sm:w-20 sm:h-20 md:w-24 md:h-24 pointer-events-none"
                    loading="lazy"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}