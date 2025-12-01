import { useEffect, useRef, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

const Ourclient = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const scrollAnimationRef = useRef(null);
  const autoScrollPositionRef = useRef(0);
  const lastAutoScrollTimeRef = useRef(0);

  AOS.init({
    // defines which position of the element regarding to window should trigger the animation
  });

  useEffect(() => {
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
    <div
      data-aos-anchor-placement="bottom-center"
      className="flex flex-col items-center px-2 py-4 mt-8 lg sm:px-6"
    >
      <h2 className="text-2xl font-bold text-center text-#4e4d4e sm:text-3xl lg:text-4xl">
        Clients from all around the world{" "}
      </h2>
      <p className="mt-2 mb-4 text-sm text-center text-naturalDGrey lg:text-base">
        we've done +20 projects
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
              alt={`Tech stack logo ${index}`}
              className="object-contain w-12 mx-2 pointer-events-none sm:w-16 md:w-20"
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Ourclient;

// Import images for logos
import img1 from "../assets/techstack/EdgeKart.png";
import img2 from "../assets/techstack/Logos.jpg";
import img3 from "../assets/techstack/OmegaMillion.jpg";
import img4 from "../assets/techstack/Pastel&Co..jpg";
import img5 from "../assets/techstack/company2.png";
import img6 from "../assets/techstack/logo1.png";
import img7 from "../assets/techstack/Fossa.png";
import img8 from "../assets/techstack/Leaf.png";
import img9 from "../assets/techstack/Nira.png";
import img10 from "../assets/techstack/Tower.png";
import img11 from "../assets/techstack/Asgardia.png";

// import img2 from "../assets/techstackLogos/img2.png";
// import img3 from "../assets/techstackLogos/img3.png";
// import img4 from "../assets/techstackLogos/img4.png";
// import img5 from "../assets/techstackLogos/img5.png";
// import img6 from "../assets/techstackLogos/img6.png";
// import img7 from "../assets/techstackLogos/img7.png";
// import img8 from "../assets/techstackLogos/img8.png";
// import img9 from "../assets/techstackLogos/img9.png";
// import img10 from "../assets/techstackLogos/img10.png";
// import img11 from "../assets/techstackLogos/img11.png";
// import img12 from "../assets/techstackLogos/img12.png";
// import img13 from "../assets/techstackLogos/img13.png";
// import img14 from "../assets/techstackLogos/img14.png";
// import img15 from "../assets/techstackLogos/img15.png";

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
];
