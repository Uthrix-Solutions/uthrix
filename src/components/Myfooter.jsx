import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { BsFacebook, BsYoutube, BsLinkedin, BsInstagram } from "react-icons/bs";

function MyFooter() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <footer className="bg-white text-gray-700 py-10">
      <div className="max-w-6xl mx-auto px-6">
        {/* Footer Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 border-b border-gray-200 pb-8">
          {/* Capabilities */}
          <div>
            <h3 className="text-lg font-medium mb-3">Capabilities</h3>
            <ul className="text-gray-500 space-y-2">
              <li><a href="#" className="hover:text-primary">Design</a></li>
              <li><a href="#" className="hover:text-primary">Marketing</a></li>
              <li><a href="#" className="hover:text-primary">Technology</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-lg font-medium mb-3">Company</h3>
            <ul className="text-gray-500 space-y-2">
              <li><a href="#" className="hover:text-primary">About us</a></li>
              <li><a href="#" className="hover:text-primary">Expertise</a></li>
              <li><a href="/careers" className="hover:text-primary">Careers</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-lg font-medium mb-3">Resources</h3>
            <ul className="text-gray-500 space-y-2">
              <li><a href="#" className="hover:text-primary">Blog</a></li>
              <li><a href="/contact" className="hover:text-primary">Contact us</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-lg font-medium mb-3">Legal</h3>
            <ul className="text-gray-500 space-y-2">
              <li><a href="#" className="hover:text-primary">Privacy policy</a></li>
              <li><a href="#" className="hover:text-primary">Terms and conditions</a></li>
            </ul>
          </div>
        </div>

        {/* Footer Bottom Section */}
        <div className="flex flex-col sm:flex-row justify-between items-center mt-6 text-gray-500 text-sm">
          {/* Copyright Text */}
          <p>© Copyright {new Date().getFullYear()} @uthrix. All Rights Reserved.</p>

          {/* Social Media Icons */}
          <div className="flex space-x-4 mt-4 sm:mt-0">
            <a href="#" className="hover:text-primary"><BsFacebook size={18} /></a>
            <a href="#" className="hover:text-primary"><BsYoutube size={18} /></a>
            <a href="https://www.linkedin.com/company/uthrix/ " className="hover:text-primary"><BsLinkedin size={18} /></a>
            <a href="#" className="hover:text-primary"><BsInstagram size={18} /></a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default MyFooter;
