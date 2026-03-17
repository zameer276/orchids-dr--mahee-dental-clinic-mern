import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaUser, FaPhone, FaEnvelope, FaCalendarAlt, FaClock, FaNotesMedical, FaCopy, FaCheckCircle } from 'react-icons/fa';
import API from '../api/axios';

const timeSlots = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
  '12:00 PM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM',
  '04:30 PM', '05:00 PM', '05:30 PM', '06:00 PM',
];

const AppointmentForm = () => {
  const [form, setForm] = useState({ name: '', phone: '', email: '', date: '', time: '', problem: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [copied, setCopied] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = 'Name is required';
    if (!form.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^[0-9+\- ]{7,15}$/.test(form.phone.trim())) newErrors.phone = 'Enter a valid phone number';
    if (!form.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Enter a valid email';
    if (!form.date) newErrors.date = 'Date is required';
    else {
      const selected = new Date(form.date);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (selected < today) newErrors.date = 'Please select a future date';
    }
    if (!form.time) newErrors.time = 'Please select a time slot';
    if (!form.problem.trim()) newErrors.problem = 'Please describe your dental problem';
    return newErrors;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (errors[e.target.name]) setErrors({ ...errors, [e.target.name]: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      toast.error('Please fix the form errors');
      return;
    }
    setLoading(true);
    try {
      const { data } = await API.post('/appointments/book', form);
      setSubmitted(data);
      toast.success('Appointment booked successfully!');
      setForm({ name: '', phone: '', email: '', date: '', time: '', problem: '' });
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book appointment');
    } finally {
      setLoading(false);
    }
  };

  const copyId = () => {
    navigator.clipboard.writeText(submitted.appointmentId);
    setCopied(true);
    toast.success('Appointment ID copied!');
    setTimeout(() => setCopied(false), 2000);
  };

  const today = new Date().toISOString().split('T')[0];

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg mx-auto text-center"
      >
        <div className="card p-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FaCheckCircle className="text-green-500 text-4xl" />
          </div>
          <h3 className="text-2xl font-bold text-slate-800 mb-2">Appointment Booked!</h3>
          <p className="text-slate-500 mb-6">Your appointment has been successfully scheduled. Please save your Appointment ID.</p>
          <div className="bg-gradient-to-r from-sky-50 to-teal-50 border border-sky-200 rounded-xl p-5 mb-6">
            <p className="text-sm text-slate-500 mb-1">Your Appointment ID</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl font-bold text-primary tracking-wider">{submitted.appointmentId}</span>
              <button onClick={copyId} className="text-slate-400 hover:text-primary transition-colors">
                {copied ? <FaCheckCircle className="text-green-500" /> : <FaCopy />}
              </button>
            </div>
          </div>
          <div className="text-left space-y-2 mb-6 text-sm text-slate-600">
            <div className="flex justify-between"><span className="font-medium">Name:</span><span>{submitted.appointment.name}</span></div>
            <div className="flex justify-between"><span className="font-medium">Date:</span><span>{submitted.appointment.date}</span></div>
            <div className="flex justify-between"><span className="font-medium">Time:</span><span>{submitted.appointment.time}</span></div>
            <div className="flex justify-between"><span className="font-medium">Status:</span><span className="badge-pending">{submitted.appointment.status}</span></div>
          </div>
          <button onClick={() => setSubmitted(null)} className="btn-primary w-full">
            Book Another Appointment
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5 max-w-2xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Full Name *</label>
          <div className="relative">
            <FaUser className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              className={`input-field pl-10 ${errors.name ? 'border-red-400 ring-1 ring-red-300' : ''}`}
            />
          </div>
          {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone Number *</label>
          <div className="relative">
            <FaPhone className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="tel"
              name="phone"
              value={form.phone}
              onChange={handleChange}
              placeholder="+91 98765 43210"
              className={`input-field pl-10 ${errors.phone ? 'border-red-400 ring-1 ring-red-300' : ''}`}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Email Address *</label>
          <div className="relative">
            <FaEnvelope className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="john@example.com"
              className={`input-field pl-10 ${errors.email ? 'border-red-400 ring-1 ring-red-300' : ''}`}
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        {/* Date */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1.5">Preferred Date *</label>
          <div className="relative">
            <FaCalendarAlt className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 text-sm" />
            <input
              type="date"
              name="date"
              value={form.date}
              min={today}
              onChange={handleChange}
              className={`input-field pl-10 ${errors.date ? 'border-red-400 ring-1 ring-red-300' : ''}`}
            />
          </div>
          {errors.date && <p className="text-red-500 text-xs mt-1">{errors.date}</p>}
        </div>
      </div>

      {/* Time Slot */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-2">
          <FaClock className="inline mr-1 text-slate-400" /> Select Time Slot *
        </label>
        <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 gap-2">
          {timeSlots.map((slot) => (
            <button
              key={slot}
              type="button"
              onClick={() => { setForm({ ...form, time: slot }); if (errors.time) setErrors({ ...errors, time: '' }); }}
              className={`py-2 px-1 text-xs rounded-lg border font-medium transition-all ${
                form.time === slot
                  ? 'bg-primary text-white border-primary shadow-md'
                  : 'bg-white text-slate-600 border-slate-200 hover:border-primary hover:text-primary'
              }`}
            >
              {slot}
            </button>
          ))}
        </div>
        {errors.time && <p className="text-red-500 text-xs mt-1">{errors.time}</p>}
      </div>

      {/* Problem */}
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1.5">
          <FaNotesMedical className="inline mr-1 text-slate-400" /> Describe Your Dental Problem *
        </label>
        <textarea
          name="problem"
          value={form.problem}
          onChange={handleChange}
          rows={4}
          placeholder="Please describe your dental concern or the treatment you are looking for..."
          className={`input-field resize-none ${errors.problem ? 'border-red-400 ring-1 ring-red-300' : ''}`}
        />
        {errors.problem && <p className="text-red-500 text-xs mt-1">{errors.problem}</p>}
      </div>

      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className="btn-primary w-full flex items-center justify-center gap-2 text-base py-4 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
            Booking...
          </>
        ) : 'Book My Appointment'}
      </motion.button>
    </form>
  );
};

export default AppointmentForm;
