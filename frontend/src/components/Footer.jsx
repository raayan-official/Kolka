import React from "react";
import instaImage from "../assets/card1.jpg";
import instaImage1 from "../assets/card2.jpg";
import instaImage2 from "../assets/card3.jpg";
import instaImage3 from "../assets/card4.jpg";
import instaImage4 from "../assets/card5.jpg";

const Footer = () => {
  return (
    <>
      <footer className="section__container footer__container bg-dark py-12 text-white">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 px-6">
          {/* Contact Info */}
          <div className="footer__col">
            <h4 className="footer__title text-xl md:text-2xl">CONTACT INFO</h4>
            <ul className="footer__list text-sm md:text-base">
              <li>
                <i className="ri-map-pin-line mr-2"></i> Palta, Santinagar
              </li>
              <li>
                <i className="ri-mail-line mr-2"></i> kolka@gmail.com
              </li>
              <li>
                <i className="ri-phone-line mr-2"></i> +91 8240824509
              </li>
            </ul>
          </div>

          {/* Company Links */}
          <div className="footer__col">
            <h4 className="footer__title text-xl md:text-2xl">COMPANY</h4>
            <ul className="footer__list text-sm md:text-base">
              <li><a href="/" className="footer__link">Home</a></li>
              <li><a href="/" className="footer__link">About Us</a></li>
              <li><a href="/" className="footer__link">Work With Us</a></li>
              <li><a href="/" className="footer__link">Our Blogs</a></li>
              <li><a href="/" className="footer__link">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Useful Links */}
          <div className="footer__col">
            <h4 className="footer__title text-xl md:text-2xl">USEFUL LINKS</h4>
            <ul className="footer__list text-sm md:text-base">
              <li><a href="/" className="footer__link">Help</a></li>
              <li><a href="/" className="footer__link">Track Your Order</a></li>
              <li><a href="/" className="footer__link">Mehndi</a></li>
              <li><a href="/" className="footer__link">Cone</a></li>
              <li><a href="/" className="footer__link">Balm</a></li>
              <li><a href="/" className="footer__link">Oil</a></li>
              <li><a href="/" className="footer__link">Other</a></li>
            </ul>
          </div>

          {/* Instagram Grid */}
          <div className="footer__col">
            <h4 className="footer__title text-xl md:text-2xl">INSTAGRAM</h4>
            <div className="instagram__grid grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-4">
              <img 
                src={instaImage} 
                alt="Instagram 1" 
                className="w-full h-24 object-cover rounded-lg transition-all duration-300 hover:scale-105" 
              />
              <img 
                src={instaImage1} 
                alt="Instagram 2" 
                className="w-full h-24 object-cover rounded-lg transition-all duration-300 hover:scale-105" 
              />
              <img 
                src={instaImage2} 
                alt="Instagram 3" 
                className="w-full h-24 object-cover rounded-lg transition-all duration-300 hover:scale-105" 
              />
              <img 
                src={instaImage3} 
                alt="Instagram 4" 
                className="w-full h-24 object-cover rounded-lg transition-all duration-300 hover:scale-105" 
              />
              <img 
                src={instaImage4} 
                alt="Instagram 5" 
                className="w-full h-24 object-cover rounded-lg transition-all duration-300 hover:scale-105" 
              />
            </div>
          </div>
        </div>
      </footer>

      {/* Footer Bar */}
      <div className="footer__bar bg-dark text-center py-4">
        <p className="text-sm md:text-base text-gray-400">
          &copy; {new Date().getFullYear()} Kolka 🩷. All rights reserved.
        </p>
      </div>
    </>
  );
};

export default Footer;
