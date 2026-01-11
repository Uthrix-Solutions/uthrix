import { Link } from 'react-router-dom';
import { motion, useMotionValue } from 'framer-motion';
import { Linkedin, Facebook, Instagram } from 'lucide-react';
import logo from "../assets/logo5.png";

export function Footer() {
  const logoScale = useMotionValue(1);
  return <footer className="bg-[#141414] dark:bg-[#0a0a0a] text-white pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <div className="flex items-center space-x-2">
              <motion.img
            src={logo}
            alt="logo"
            style={{ scale: logoScale }}
            className="w-9 h-9 cursor-pointer transition-transform duration-300 ease-out hover:scale-110 hover:-rotate-[2deg] hover:drop-shadow-[0_8px_24px_rgba(0,0,0,0.2)]"
          />
              <span className="text-2xl font-heading font-bold tracking-tight">
                UTHRIX
              </span>
            </div>
            <p className="text-gray-400 leading-relaxed">
              Digital marketing strategies powered by cutting-edge software engineering. Your growth is our mission.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.linkedin.com/company/uthrix/?originalSubdomain=lk" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>             
              <a href="https://www.facebook.com/people/UthriX/61581276571721/#" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/uthrix.sl?igsh=eTIxZW15YmRzZzJ3&utm_source=qr" className="p-2 bg-white/5 rounded-full hover:bg-primary transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Company</h3>
            <ul className="space-y-4">
              <li>
                <a href="#about" className="text-gray-400 hover:text-primary transition-colors">
                  About Us
                </a>
              </li>
              <li>
                <a href="#portfolio" className="text-gray-400 hover:text-primary transition-colors">
                  Portfolio
                </a>
              </li>
              <li>
                <Link to="/careers" className="text-gray-400 hover:text-primary transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <a href="#contact" className="text-gray-400 hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Services</h3>
            <ul className="space-y-4">
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition-colors">
                  Digital Marketing
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition-colors">
                  Software Development
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition-colors">
                  Web & Mobile Apps
                </a>
              </li>
              <li>
                <a href="#services" className="text-gray-400 hover:text-primary transition-colors">
                  SEO & SEM
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-6">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Subscribe to our newsletter for the latest updates.
            </p>
            <form className="flex">
              <input type="email" placeholder="Enter your email" className="flex-1 px-4 py-2 rounded-l-lg bg-white/5 border border-white/10 focus:ring-2 focus:ring-primary outline-none" />
              <button className="px-4 py-2 bg-primary rounded-r-lg font-bold hover:bg-primary-dark transition-colors">
                Go
              </button>
            </form>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
          <p>© 2026 UTHRIX. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="hover:text-white transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Terms of Service
            </a>
            <a href="#" className="hover:text-white transition-colors">
              Cookie Policy
            </a>
          </div>
        </div>
      </div>
    </footer>;
}