import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet"; // For SEO meta tags

// Import images for logos
import img1 from "../assets/techstack/1.png";
import img2 from "../assets/techstack/2.png";
import img3 from "../assets/techstack/3.png";
import img4 from "../assets/techstack/4.png";
import img5 from "../assets/techstack/5.png";
import img6 from "../assets/techstack/6.png";
import img7 from "../assets/techstack/7.png";
import img8 from "../assets/techstack/8.png";
import img9 from "../assets/techstack/9.png";
import img10 from "../assets/techstack/10.png";
import img11 from "../assets/techstack/11.png";
import img12 from "../assets/techstack/12.png";
import img13 from "../assets/techstack/13.png";
import img14 from "../assets/techstack/14.png";
import img15 from "../assets/techstack/15.png";

const logos = [
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
];

const Product = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollAnimationRef = useRef(null);
  const autoScrollPositionRef = useRef(0);
  const lastAutoScrollTimeRef = useRef(0);

  // Initialize AOS (Animation on Scroll)
  useEffect(() => {
    AOS.init({
      duration: 1200,
    });
    startAutoScroll();
    return () => {
      if (scrollAnimationRef.current) {
        cancelAnimationFrame(scrollAnimationRef.current);
      }
    };
  }, []);

  const startAutoScroll = () => {
    const animate = (currentTime) => {
      if (!isDragging && scrollRef.current) {
        const deltaTime = currentTime - lastAutoScrollTimeRef.current;
        const speed = 0.05; // Adjust this value to change scroll speed
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

  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    autoScrollPositionRef.current = scrollRef.current.scrollLeft;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    autoScrollPositionRef.current = scrollRef.current.scrollLeft;
  };

  const handleTouchStart = (e) => {
    setIsDragging(true);
    setStartX(e.touches[0].pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
    autoScrollPositionRef.current = scrollRef.current.scrollLeft;
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    const x = e.touches[0].pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    scrollRef.current.scrollLeft = scrollLeft - walk;
    autoScrollPositionRef.current = scrollRef.current.scrollLeft;
  };

  return (
    <div>
      {/* SEO Meta Tags */}
      <Helmet>
        <title>Tech Stack - Web & Software Development Technologies</title>
        <meta
          name="description"
          content="Explore the cutting-edge technologies and frameworks we use to deliver exceptional web and software development services."
        />
        <meta
          property="og:title"
          content="Tech Stack - Web & Software Development Technologies"
        />
        <meta
          property="og:description"
          content="Our team works with a wide range of modern technologies to provide innovative solutions for your business. Discover the tech stack we use for web development."
        />
        <meta property="og:image" content={img1} />
        <meta name="twitter:card" content="summary" />
        <meta
          name="twitter:title"
          content="Tech Stack - Web & Software Development Technologies"
        />
        <meta
          name="twitter:description"
          content="Discover the latest technologies we use to deliver high-quality web solutions tailored to your needs."
        />
      </Helmet>

      {/* Product Section */}
      <div
        data-aos="zoom-in"
        className="flex flex-col items-center px-2 py-4 mt-8 lg sm:px-6"
      >
        <h2 className="text-2xl font-bold text-center text-#4e4d4e sm:text-3xl lg:text-4xl">
          Techstack We Work With
        </h2>
        <p className="mt-2 mb-4 text-sm text-center text-naturalDGrey lg:text-base">
          Harnessing the power of the latest technologies, we deliver
          exceptional results.
        </p>
        <div className="relative w-full my-4 overflow-hidden">
          {/* Fading Effect */}
          <div className="absolute top-0 left-0 z-10 w-12 h-full pointer-events-none bg-gradient-to-r from-blue to-transparent"></div>
          <div className="absolute top-0 right-0 z-10 w-12 h-full pointer-events-none bg-gradient-to-l from-blue to-transparent"></div>

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
            className={`flex items-center cursor-grab ${
              isDragging ? "cursor-grabbing" : ""
            } select-none overflow-hidden`}
          >
            {[...logos, ...logos].map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Tech stack logo ${index + 1}`}
                className="object-contain w-12 mx-2 pointer-events-none sm:w-16 md:w-20"
                loading="lazy" // Lazy loading for images
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
