import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaArrowRight, FaStar, FaShieldAlt, FaAward, FaUserMd, FaSmile,
  FaCalendarCheck, FaTooth, FaChevronRight, FaQuoteLeft
} from 'react-icons/fa';
import API from '../api/axios';

const fadeUp = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6, ease: 'easeOut' },
};

const stagger = {
  animate: { transition: { staggerChildren: 0.1 } },
};

const iconMap = {
  implant: '🦷',
  whitening: '✨',
  orthodontics: '😁',
  rootcanal: '💉',
  veneers: '💎',
  crowns: '👑',
};

const Home = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    API.get('/content').then(({ data }) => setContent(data)).catch(() => {});
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}>
      {/* Hero */}
      <section className="relative min-h-screen flex items-center bg-gradient-to-br from-sky-50 via-white to-teal-50 pt-20 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 grid lg:grid-cols-2 gap-16 items-center relative">
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
          >
            <div className="inline-flex items-center gap-2 bg-sky-100 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
              <FaAward className="text-xs" /> Award-Winning Dental Care
            </div>
            <h1 className="text-5xl md:text-6xl font-extrabold text-slate-800 leading-tight mb-6">
              {content?.heroTitle || 'Your Smile,'}
              <br />
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {content?.heroTitle ? '' : 'Our Priority'}
              </span>
            </h1>
            <p className="text-lg text-slate-500 leading-relaxed mb-8 max-w-lg">
              {content?.heroSubtitle || 'World-class dental care with a gentle touch. Specializing in Implants & Aesthetic Dentistry.'}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/book-appointment">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary flex items-center gap-2 text-base px-8"
                >
                  Book Appointment <FaArrowRight />
                </motion.button>
              </Link>
              <Link to="/check-status">
                <motion.button
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-outline flex items-center gap-2 text-base"
                >
                  Check Status <FaChevronRight />
                </motion.button>
              </Link>
            </div>
            <div className="mt-10 flex items-center gap-8">
              {[{ num: '15+', label: 'Years Experience' }, { num: '10K+', label: 'Happy Patients' }, { num: '50+', label: 'Services' }].map((stat) => (
                <div key={stat.label}>
                  <p className="text-3xl font-extrabold text-primary">{stat.num}</p>
                  <p className="text-xs text-slate-500 font-medium">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.2 }}
            className="relative hidden lg:block"
          >
            <div className="relative bg-gradient-to-br from-primary to-secondary rounded-3xl p-1 shadow-2xl">
              <div className="bg-white rounded-3xl p-8 text-center">
                <div className="text-9xl mb-4">🦷</div>
                <h3 className="text-2xl font-bold text-slate-800 mb-2">Dr. Mahee</h3>
                <p className="text-primary font-medium mb-1">BDS, MDS – Implantology</p>
                <p className="text-slate-500 text-sm">15+ Years of Excellence</p>
                <div className="flex justify-center gap-1 mt-3">
                  {[...Array(5)].map((_, i) => <FaStar key={i} className="text-yellow-400" />)}
                </div>
                <p className="text-xs text-slate-400 mt-1">500+ Google Reviews</p>
              </div>
            </div>
            <motion.div
              animate={{ y: [-5, 5, -5] }}
              transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
              className="absolute -top-6 -right-6 bg-white rounded-2xl shadow-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-green-100 rounded-xl flex items-center justify-center">
                  <FaCalendarCheck className="text-green-500" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Today's Appointments</p>
                  <p className="font-bold text-slate-800">12 Patients</p>
                </div>
              </div>
            </motion.div>
            <motion.div
              animate={{ y: [5, -5, 5] }}
              transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4"
            >
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-sky-100 rounded-xl flex items-center justify-center">
                  <FaSmile className="text-primary" />
                </div>
                <div>
                  <p className="text-xs text-slate-500">Patient Satisfaction</p>
                  <p className="font-bold text-slate-800">99.2%</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {[
              { icon: FaShieldAlt, title: 'Safe & Sterile', desc: 'All equipment sterilized to international standards', color: 'text-blue-500', bg: 'bg-blue-50' },
              { icon: FaUserMd, title: 'Expert Specialist', desc: 'Qualified & experienced dental specialists', color: 'text-primary', bg: 'bg-sky-50' },
              { icon: FaTooth, title: 'Advanced Tech', desc: 'Latest dental technology for precise treatments', color: 'text-secondary', bg: 'bg-teal-50' },
            ].map((f, i) => (
              <motion.div key={i} variants={fadeUp} className="card flex items-start gap-4 hover:scale-[1.02]">
                <div className={`${f.bg} p-3 rounded-xl shrink-0`}>
                  <f.icon className={`${f.color} text-xl`} />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">{f.title}</h3>
                  <p className="text-sm text-slate-500">{f.desc}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Services */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-14"
          >
            <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">What We Offer</p>
            <h2 className="section-title">Our Dental Services</h2>
            <p className="section-subtitle">
              Comprehensive dental care tailored to your needs using the latest technology.
            </p>
          </motion.div>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {(content?.services || []).slice(0, 6).map((service, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                whileHover={{ y: -6, scale: 1.01 }}
                className="card group cursor-default"
              >
                <div className="text-4xl mb-4">{iconMap[service.icon] || '🦷'}</div>
                <h3 className="font-bold text-slate-800 text-lg mb-2 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{service.description}</p>
              </motion.div>
            ))}
          </motion.div>
          <div className="text-center mt-10">
            <Link to="/services">
              <motion.button whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }} className="btn-outline">
                View All Services <FaArrowRight className="inline ml-1" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gradient-to-br from-sky-50 to-teal-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">Patient Reviews</p>
            <h2 className="section-title">What Our Patients Say</h2>
          </motion.div>
          <motion.div
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            variants={stagger}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {(content?.testimonials || []).map((t, i) => (
              <motion.div key={i} variants={fadeUp} whileHover={{ y: -4 }} className="card">
                <FaQuoteLeft className="text-primary/20 text-4xl mb-4" />
                <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">"{t.review}"</p>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-bold text-slate-800">{t.name}</p>
                    <p className="text-xs text-slate-400">{t.role}</p>
                  </div>
                  <div className="flex gap-0.5">
                    {[...Array(t.rating || 5)].map((_, j) => <FaStar key={j} className="text-yellow-400 text-xs" />)}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl font-extrabold text-white mb-4">Ready for a Beautiful Smile?</h2>
            <p className="text-sky-100 text-lg mb-8">Book your appointment today and take the first step towards your dream smile.</p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/book-appointment">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="bg-white text-primary font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all"
                >
                  Book Appointment
                </motion.button>
              </Link>
              <Link to="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.97 }}
                  className="border-2 border-white text-white font-bold py-3 px-8 rounded-xl hover:bg-white/10 transition-all"
                >
                  Contact Us
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Home;
