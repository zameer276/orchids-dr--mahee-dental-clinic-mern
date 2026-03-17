import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import API from '../api/axios';

const iconMap = {
  implant: '🦷',
  whitening: '✨',
  orthodontics: '😁',
  rootcanal: '💉',
  veneers: '💎',
  crowns: '👑',
};

const defaultServices = [
  { title: 'Dental Implants', description: 'State-of-the-art titanium implants that look and feel like natural teeth. A permanent solution for missing teeth.', icon: 'implant', duration: '2-3 hours', recovery: '1-2 weeks' },
  { title: 'Teeth Whitening', description: 'Professional whitening treatments for a brighter, more confident smile. Safe and effective laser whitening.', icon: 'whitening', duration: '1 hour', recovery: 'None' },
  { title: 'Orthodontics', description: 'Braces and clear aligners to straighten your teeth beautifully. We offer traditional and invisible options.', icon: 'orthodontics', duration: '12-24 months', recovery: 'Ongoing' },
  { title: 'Root Canal', description: 'Painless root canal therapy using advanced techniques. Save your natural tooth with modern endodontic treatment.', icon: 'rootcanal', duration: '1-2 hours', recovery: '2-3 days' },
  { title: 'Veneers', description: 'Custom porcelain veneers for a perfect Hollywood smile transformation. Ultra-thin shells bonded to teeth.', icon: 'veneers', duration: '2 visits', recovery: 'None' },
  { title: 'Dental Crowns', description: 'Durable and natural-looking crowns to restore damaged teeth. Protect and strengthen compromised teeth.', icon: 'crowns', duration: '2 visits', recovery: '1-2 days' },
];

const Services = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    API.get('/content').then(({ data }) => {
      setServices(data.services?.length ? data.services : defaultServices);
    }).catch(() => setServices(defaultServices));
  }, []);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-sky-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">What We Offer</p>
            <h1 className="section-title">Our Dental Services</h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              We offer a comprehensive range of dental treatments using the latest technology and techniques.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                whileHover={{ y: -8, scale: 1.01 }}
                className="card group overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-sky-50 to-transparent rounded-bl-full" />
                <div className="text-5xl mb-5">{iconMap[service.icon] || '🦷'}</div>
                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-primary transition-colors">{service.title}</h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-5">{service.description}</p>
                {(service.duration || service.recovery) && (
                  <div className="flex gap-3 pt-4 border-t border-slate-100">
                    {service.duration && (
                      <div className="bg-sky-50 px-3 py-1.5 rounded-lg">
                        <p className="text-xs text-slate-400">Duration</p>
                        <p className="text-xs font-semibold text-primary">{service.duration}</p>
                      </div>
                    )}
                    {service.recovery && (
                      <div className="bg-teal-50 px-3 py-1.5 rounded-lg">
                        <p className="text-xs text-slate-400">Recovery</p>
                        <p className="text-xs font-semibold text-secondary">{service.recovery}</p>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <h2 className="text-3xl font-bold text-white mb-4">Need a Specific Treatment?</h2>
            <p className="text-sky-100 mb-8">Book an appointment and our team will guide you through the best options.</p>
            <Link to="/book-appointment">
              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                className="bg-white text-primary font-bold py-3 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center gap-2 mx-auto">
                Book Consultation <FaArrowRight />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Services;
