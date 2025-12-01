import { useEffect, useState } from "react";
import debounce from "lodash.debounce";
import { Link as ScrollLink } from "react-scroll";
import { FaTimes, FaBars } from "react-icons/fa";
import { Link as RouterLink, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo7.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // Handle scroll event for sticky navbar
  useEffect(() => {
    const handleScroll = debounce(() => {
      setIsSticky(window.scrollY > 100);
    }, 50);
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Handle navigation for both scroll and route changes
  const handleNavigation = (path, href) => {
    if (href) {
      // External route navigation
      setIsMenuOpen(false);
      navigate(href);
    } else if (path) {
      if (location.pathname !== "/") {
        // Navigate to the landing page first
        navigate("/");
        setTimeout(() => {
          scrollToSection(path);
        }, 100); // Delay to ensure the page has loaded
      } else {
        // Scroll to the section directly if already on the landing page
        scrollToSection(path);
      }
    }
  };
  const scrollToSection = (path) => {
    setActiveSection(path);
    setIsMenuOpen(false);
    const element = document.getElementById(path);
    if (element) {
      const navbarHeight = 100; // Get the navbar height
      const elementPosition = element.offsetTop - navbarHeight; // Adjust for navbar height
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      });
    }
  };

  const navItems = [
    { link: "Home", path: "home" },
    { link: "Services", path: "service" },
    { link: "About Us", path: "about" },
       
  ];

  return (
    <header
      className={`fixed top-12 left-1/3 transform -translate-x-1/2 w-auto rounded-full px-5 py-2 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] z-50 md:top-4 md:left-1/2 md:transform -md:translate-x-1/2 md:w-auto border backdrop-blur-md ${
        isSticky
          ? "bg-white/10 shadow-lg border-white/20"
          : "bg-white shadow-md border-transparent"
      }`}
    >
      <nav className="flex items-center space-x-8 ">
        {/* Logo */}
        <RouterLink 
          to="/" 
          className="text-2xl font-bold"
          onClick={() => setIsMenuOpen(false)}
        >
          <img src={logo} alt="logo" className="w-8 h-8 cursor-pointer transition-transform duration-200 ease-out hover:scale-150 hover:-rotate-[1.5deg] hover:drop-shadow-md motion-reduce:transition-none motion-reduce:hover:transform-none" />
        </RouterLink>

        {/* Mobile menu button (hidden on desktop) */}
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-700 focus:outline-none"
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Desktop Navigation Links */}
        <ul className="hidden md:flex space-x-6">
          {navItems.map(({ link, path, href }) => (
            <li 
              key={path || href} 
              className="cursor-pointer hover:text-gray-500"
            >
              {href ? (
                <RouterLink 
                  to={href} 
                  onClick={() => handleNavigation(href)}
                  className="block py-2 font-poppin"
                >
                  {link}
                </RouterLink>
              ) : (
                <ScrollLink
                  to={path}
                  spy={true}
                  smooth={true}
                  duration={300}
                  offset={-100}
                  className={`block py-2 font-poppin ${
                    activeSection === path ? "text-primary font-medium" : ""
                  }`}
                  onSetActive={() => setActiveSection(path)}
                  onClick={() => handleNavigation(path)}
                >
                  {link}
                </ScrollLink>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop Contact Button */}
        <RouterLink
          to="/contact"
          className="hidden md:block font-poppin bg-primary text-white px-4 py-2 rounded-full font-medium hover:bg-secondory transition"
          onClick={() => setIsMenuOpen(false)}
        >
          Talk to Us
        </RouterLink>

        {/* Mobile Menu (hidden on desktop) */}
{isMenuOpen && (
  <div className="md:hidden fixed top-10 left-0 right-0 bg-white rounded-lg shadow-lg py-4 px-6 w-48 z-50">
    <ul className="flex flex-col space-y-3 text-center">
      {navItems.map(({ link, path, href }) => (
        <li 
          key={path || href}
          className="cursor-pointer hover:text-gray-500"
        >
          {href ? (
            <RouterLink
              to={href}
              onClick={() => handleNavigation(null, href)}
              className="block py-2"
            >
              {link}
            </RouterLink>
          ) : (
            <ScrollLink
              to={path}
              spy={true}
              smooth={true}
              duration={300}
              offset={-100}
              className={`block py-2 ${
                activeSection === path ? "text-primary font-medium" : ""
              }`}
              onSetActive={() => setActiveSection(path)}
              onClick={() => handleNavigation(path)}
            >
              {link}
            </ScrollLink>
          )}
        </li>
      ))}
      {/* Contact Us Button */}
      <li className="mt-3">
        <RouterLink
          to="/contact"
          className="bg-primary text-white w-13 h-10 flex items-center justify-center rounded-md mx-auto font-medium hover:bg-red-700 transition"
          onClick={() => setIsMenuOpen(false)}
        >
          Contact Us
        </RouterLink>
      </li>
    </ul>
  </div>
)}

      </nav>
    </header>
  );
};

export default Navbar;