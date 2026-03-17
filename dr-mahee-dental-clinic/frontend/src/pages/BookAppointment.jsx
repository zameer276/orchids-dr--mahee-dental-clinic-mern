import React from 'react';
import { motion } from 'framer-motion';
import AppointmentForm from '../components/AppointmentForm';
import { FaCalendarAlt, FaClock, FaShieldAlt } from 'react-icons/fa';

const BookAppointment = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="pt-20">
      <section className="bg-gradient-to-br from-sky-50 to-teal-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">Schedule Your Visit</p>
            <h1 className="section-title">Book an Appointment</h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Fill out the form below to schedule your appointment with Dr. Mahee. We'll confirm your slot as soon as possible.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}
                className="card p-8">
                <h2 className="text-2xl font-bold text-slate-800 mb-6">Appointment Details</h2>
                <AppointmentForm />
              </motion.div>
            </div>

            <div className="space-y-6">
              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }}
                className="card">
                <h3 className="font-bold text-slate-800 mb-4">Clinic Hours</h3>
                <div className="space-y-3">
                  {[
                    { day: 'Monday – Friday', time: '9:00 AM – 7:00 PM' },
                    { day: 'Saturday', time: '9:00 AM – 6:00 PM' },
                    { day: 'Sunday', time: '10:00 AM – 2:00 PM' },
                  ].map((h) => (
                    <div key={h.day} className="flex justify-between items-center py-2 border-b border-slate-50 last:border-0">
                      <span className="text-sm text-slate-600">{h.day}</span>
                      <span className="text-sm font-semibold text-primary">{h.time}</span>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.3 }}
                className="card">
                <h3 className="font-bold text-slate-800 mb-4">Before You Visit</h3>
                <ul className="space-y-3">
                  {[
                    { icon: FaCalendarAlt, text: 'Arrive 10 minutes before your appointment' },
                    { icon: FaClock, text: 'Bring any previous dental records if available' },
                    { icon: FaShieldAlt, text: 'Inform us of any medications you\'re taking' },
                  ].map((tip, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                      <tip.icon className="text-primary mt-0.5 shrink-0" />
                      {tip.text}
                    </li>
                  ))}
                </ul>
              </motion.div>

              <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.4 }}
                className="bg-gradient-to-br from-primary to-secondary rounded-2xl p-6 text-white">
                <h3 className="font-bold mb-2">Emergency? Call Us!</h3>
                <p className="text-sky-100 text-sm mb-3">For dental emergencies, call us immediately.</p>
                <a href="tel:+919876543210" className="bg-white text-primary font-bold py-2 px-4 rounded-xl text-sm inline-block hover:shadow-lg transition-all">
                  +91 98765 43210
                </a>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </motion.div>
  );
};

export default BookAppointment;
