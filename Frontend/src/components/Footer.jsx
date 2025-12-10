import React from "react";
import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Heart } from "lucide-react";
import Logo from "../assets/quickbite.png";
import Tag from "./TextFormat.jsx";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-[#c44569] via-[#7b2d42] to-[#5a1f31] text-white overflow-hidden">
      {/* Decorative overlay gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent pointer-events-none" />
      
      {/* Decorative blur circles */}
      <div className="absolute top-20 -right-20 w-64 h-64 bg-pink-400/10 rounded-full blur-3xl" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-rose-400/10 rounded-full blur-3xl" />

      <div className="relative max-w-7xl mx-auto px-6 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-1">
            <div className="mb-6 group">
              <div className="relative w-fit">
                <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-rose-300 rounded-full blur-xl opacity-40 group-hover:opacity-60 transition-opacity" />
                <img 
                  src={Logo} 
                  alt="Quickbite Logo" 
                  className="h-[100px] w-[100px] rounded-full border-4 border-white/20 shadow-2xl relative transform group-hover:scale-105 transition-transform"
                />
              </div>
            </div>
            <p className="text-white/80 text-sm leading-relaxed mb-6">
              Quickbite is your go-to food delivery app, bringing delicious meals from your favorite local restaurants right to your doorstep.
            </p>
            
            {/* Social Media */}
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all border border-white/10"
              >
                <Facebook size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all border border-white/10"
              >
                <Twitter size={18} />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center hover:bg-white/20 hover:scale-110 transition-all border border-white/10"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">
              Quick Navigation
            </h3>
            <ul className="space-y-3">
              {['Home', 'Menu', 'Orders', 'Favorites', 'About', 'Contact'].map((item, idx) => (
                <li key={idx}>
                  <a 
                    href={`/${item.toLowerCase()}`}
                    className="text-white/70 hover:text-white text-sm flex items-center gap-2 group transition-all hover:translate-x-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-300 group-hover:bg-white transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">
              Our Services
            </h3>
            <ul className="space-y-3">
              {['Fast Delivery', '24/7 Support', 'Easy Payment', 'Fresh Food', 'Large Menu', 'Quality Service'].map((item, idx) => (
                <li key={idx}>
                  <a 
                    href="#"
                    className="text-white/70 hover:text-white text-sm flex items-center gap-2 group transition-all hover:translate-x-2"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-pink-300 group-hover:bg-white transition-colors" />
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6 bg-gradient-to-r from-pink-200 to-white bg-clip-text text-transparent">
              Get In Touch
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm text-white/80 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all">
                  <Mail size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/60">Email</span>
                  <span className="font-medium">quickbite@google.com</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all">
                  <Phone size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/60">Phone</span>
                  <span className="font-medium">9860811063</span>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm text-white/80 hover:text-white transition-colors group">
                <div className="w-10 h-10 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center flex-shrink-0 group-hover:bg-white/20 transition-all">
                  <MapPin size={18} />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs text-white/60">Address</span>
                  <span className="font-medium">123 Satdobato, Lalitpur</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-8" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-white/60">
            © {new Date().getFullYear()} Quickbite. All rights reserved.
          </p>
          <div className="flex items-center gap-6 text-sm">
            <a href="#" className="text-white/60 hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="text-white/60 hover:text-white transition-colors">Cookie Policy</a>
          </div>
          <p className="text-sm text-white/60 flex items-center gap-2">
            Made with <Heart size={14} className="text-pink-300 fill-pink-300 animate-pulse" /> in Nepal
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
