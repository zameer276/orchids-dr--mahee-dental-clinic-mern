import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaUser, FaPaperPlane } from 'react-icons/fa';

const Contact = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', subject: '', message: '' });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.message) {
      toast.error('Please fill all required fields');
      return;
    }
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    toast.success('Message sent! We will get back to you soon.');
    setForm({ name: '', email: '', phone: '', subject: '', message: '' });
    setLoading(false);
  };

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }} className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-sky-50 to-teal-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
            <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">Get In Touch</p>
            <h1 className="section-title">Contact Us</h1>
            <p className="text-slate-500 text-lg max-w-xl mx-auto">Have questions? We're here to help. Reach out to us anytime.</p>
          </motion.div>
        </div>
      </section>

      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-5 gap-12">
            {/* Info */}
            <motion.div initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:col-span-2 space-y-6">
              <div>
                <h2 className="text-2xl font-bold text-slate-800 mb-2">Let's Talk</h2>
                <p className="text-slate-500">We'd love to hear from you. Contact us through any of the channels below.</p>
              </div>

              {[
                { icon: FaPhone, title: 'Phone', info: '+91 98765 43210', sub: 'Mon-Sat 9AM-7PM', href: 'tel:+919876543210', color: 'bg-sky-50 text-primary' },
                { icon: FaEnvelope, title: 'Email', info: 'info@drmahee.com', sub: 'We reply within 24 hours', href: 'mailto:info@drmahee.com', color: 'bg-teal-50 text-secondary' },
                { icon: FaMapMarkerAlt, title: 'Address', info: '123 Dental Street, Medical Hub', sub: 'Chennai - 600001, Tamil Nadu', href: '#', color: 'bg-purple-50 text-purple-600' },
                { icon: FaClock, title: 'Hours', info: 'Mon-Sat: 9AM – 7PM', sub: 'Sunday: 10AM – 2PM', href: '#', color: 'bg-orange-50 text-orange-500' },
              ].map((c, i) => (
                <motion.a
                  key={i}
                  href={c.href}
                  whileHover={{ x: 4 }}
                  className="flex items-start gap-4 card hover:shadow-lg"
                >
                  <div className={`${c.color} p-3 rounded-xl shrink-0`}>
                    <c.icon className="text-lg" />
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">{c.title}</p>
                    <p className="text-sm text-slate-700">{c.info}</p>
                    <p className="text-xs text-slate-400">{c.sub}</p>
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {/* Form */}
            <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
              className="lg:col-span-3 card p-8">
              <h2 className="text-2xl font-bold text-slate-800 mb-6">Send a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
                    <div className="relative">
                      <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                      <input type="text" name="name" value={form.name} onChange={handleChange}
                        placeholder="John Doe" className="input-field pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Email *</label>
                    <div className="relative">
                      <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                      <input type="email" name="email" value={form.email} onChange={handleChange}
                        placeholder="john@example.com" className="input-field pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                    <div className="relative">
                      <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
                      <input type="tel" name="phone" value={form.phone} onChange={handleChange}
                        placeholder="+91 98765 43210" className="input-field pl-10" />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Subject</label>
                    <input type="text" name="subject" value={form.subject} onChange={handleChange}
                      placeholder="How can we help?" className="input-field" />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Message *</label>
                  <textarea name="message" value={form.message} onChange={handleChange} rows={5}
                    placeholder="Write your message here..." className="input-field resize-none" />
                </div>
                <motion.button type="submit" disabled={loading}
                  whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                  className="btn-primary w-full flex items-center justify-center gap-2 py-4 disabled:opacity-60">
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <><FaPaperPlane /> Send Message</>
                  )}
                </motion.button>
              </form>
            </motion.div>
          </div>

          {/* Map Placeholder */}
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-12 rounded-2xl overflow-hidden shadow-lg bg-gradient-to-br from-sky-100 to-teal-100 h-64 flex items-center justify-center">
            <div className="text-center">
              <FaMapMarkerAlt className="text-primary text-5xl mx-auto mb-3" />
              <p className="text-slate-700 font-semibold">123 Dental Street, Medical Hub</p>
              <p className="text-slate-500 text-sm">Chennai - 600001, Tamil Nadu, India</p>
            </div>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default Contact;
