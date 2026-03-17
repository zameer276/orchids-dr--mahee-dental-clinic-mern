import React from 'react';
import { Link } from 'react-router-dom';
import { FaTooth, FaPhone, FaEnvelope, FaMapMarkerAlt, FaFacebook, FaInstagram, FaTwitter, FaWhatsapp } from 'react-icons/fa';
import { motion } from 'framer-motion';

const Footer = () => {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                <FaTooth className="text-white text-xl" />
              </div>
              <div>
                <p className="font-bold text-white">Dr. Mahee's</p>
                <p className="text-xs text-primary">Implant & Aesthetic Dental</p>
              </div>
            </div>
            <p className="text-sm leading-relaxed text-slate-400">
              Providing world-class dental care with a gentle touch. Your smile is our priority.
            </p>
            <div className="flex gap-3">
              {[FaFacebook, FaInstagram, FaTwitter, FaWhatsapp].map((Icon, i) => (
                <motion.a
                  key={i}
                  href="#"
                  whileHover={{ scale: 1.1, y: -2 }}
                  className="w-9 h-9 bg-slate-800 hover:bg-primary rounded-lg flex items-center justify-center transition-colors duration-200"
                >
                  <Icon size={16} className="text-slate-300" />
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              {[
                { label: 'Home', path: '/' },
                { label: 'About Doctor', path: '/about' },
                { label: 'Our Services', path: '/services' },
                { label: 'Book Appointment', path: '/book-appointment' },
                { label: 'Check Status', path: '/check-status' },
              ].map((link) => (
                <li key={link.path}>
                  <Link
                    to={link.path}
                    className="text-sm text-slate-400 hover:text-primary transition-colors duration-200 flex items-center gap-1"
                  >
                    <span className="text-primary">›</span> {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Services</h3>
            <ul className="space-y-2">
              {['Dental Implants', 'Teeth Whitening', 'Orthodontics', 'Root Canal', 'Veneers', 'Dental Crowns'].map((s) => (
                <li key={s}>
                  <span className="text-sm text-slate-400 flex items-center gap-1">
                    <span className="text-secondary">›</span> {s}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">Contact Us</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaMapMarkerAlt className="text-primary mt-1 shrink-0" />
                <span className="text-sm text-slate-400">123 Dental Street, Medical Hub, Chennai - 600001, Tamil Nadu</span>
              </li>
              <li className="flex items-center gap-3">
                <FaPhone className="text-primary shrink-0" />
                <a href="tel:+919876543210" className="text-sm text-slate-400 hover:text-primary transition-colors">+91 98765 43210</a>
              </li>
              <li className="flex items-center gap-3">
                <FaEnvelope className="text-primary shrink-0" />
                <a href="mailto:info@drmahee.com" className="text-sm text-slate-400 hover:text-primary transition-colors">info@drmahee.com</a>
              </li>
            </ul>
            <div className="mt-4 p-3 bg-slate-800 rounded-xl">
              <p className="text-xs text-slate-400 font-medium mb-1">Clinic Hours</p>
              <p className="text-xs text-slate-300">Mon – Sat: 9:00 AM – 7:00 PM</p>
              <p className="text-xs text-slate-300">Sunday: 10:00 AM – 2:00 PM</p>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-slate-500">© 2026 Dr. Mahee's Implant & Aesthetic Dental Clinic. All rights reserved.</p>
          <Link to="/admin/login" className="text-xs text-slate-600 hover:text-slate-400 transition-colors">Admin</Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
