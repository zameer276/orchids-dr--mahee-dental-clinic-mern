import React from 'react';
import { motion } from 'framer-motion';
import AppointmentStatus from '../components/AppointmentStatus';
import { FaSearch, FaInfoCircle } from 'react-icons/fa';

const CheckStatus = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="pt-20">
      <section className="bg-gradient-to-br from-sky-50 to-teal-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <FaSearch className="text-primary text-2xl" />
            </div>
            <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">Track Your Visit</p>
            <h1 className="section-title">Check Appointment Status</h1>
            <p className="text-slate-500 text-lg max-w-2xl mx-auto">
              Enter your Appointment ID or registered phone number to track your appointment status in real time.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-16 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.1 }}>
            {/* Status Legend */}
            <div className="flex flex-wrap justify-center gap-4 mb-10">
              {[
                { label: 'Pending', color: 'badge-pending', desc: 'Awaiting confirmation' },
                { label: 'Approved', color: 'badge-approved', desc: 'Confirmed — visit us!' },
                { label: 'Rejected', color: 'badge-rejected', desc: 'Please reschedule' },
                { label: 'Completed', color: 'badge-completed', desc: 'Treatment done' },
              ].map((s) => (
                <div key={s.label} className="flex items-center gap-2 bg-white px-4 py-2 rounded-xl shadow-sm">
                  <span className={s.color}>{s.label}</span>
                  <span className="text-xs text-slate-500">— {s.desc}</span>
                </div>
              ))}
            </div>

            <AppointmentStatus />

            <div className="mt-10 max-w-xl mx-auto">
              <div className="bg-sky-50 border border-sky-200 rounded-xl p-4 flex items-start gap-3">
                <FaInfoCircle className="text-primary mt-0.5 shrink-0" />
                <div className="text-sm text-slate-600">
                  <p className="font-medium text-slate-700 mb-1">Can't find your appointment?</p>
                  <p>Make sure you're using the exact Appointment ID (e.g., APT-XXXXXXXX) received after booking, or the phone number you registered with. Contact us at <a href="tel:+919876543210" className="text-primary font-medium">+91 98765 43210</a> for help.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default CheckStatus;
