import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { FaSearch, FaCalendarAlt, FaClock, FaUser, FaPhone } from 'react-icons/fa';
import API from '../api/axios';

const StatusBadge = ({ status }) => {
  const classes = {
    Pending: 'badge-pending',
    Approved: 'badge-approved',
    Rejected: 'badge-rejected',
    Completed: 'badge-completed',
  };
  return <span className={classes[status] || 'badge-pending'}>{status}</span>;
};

const AppointmentCard = ({ apt }) => (
  <motion.div
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="bg-white rounded-2xl border border-slate-100 shadow-md p-6"
  >
    <div className="flex items-start justify-between mb-4">
      <div>
        <p className="text-xs text-slate-400 mb-1">Appointment ID</p>
        <p className="font-bold text-primary text-lg tracking-wide">{apt.appointmentId}</p>
      </div>
      <StatusBadge status={apt.status} />
    </div>
    <div className="grid grid-cols-2 gap-4 text-sm">
      <div className="flex items-center gap-2 text-slate-600">
        <FaUser className="text-primary" />
        <span>{apt.name}</span>
      </div>
      <div className="flex items-center gap-2 text-slate-600">
        <FaPhone className="text-primary" />
        <span>{apt.phone}</span>
      </div>
      <div className="flex items-center gap-2 text-slate-600">
        <FaCalendarAlt className="text-primary" />
        <span>{apt.date}</span>
      </div>
      <div className="flex items-center gap-2 text-slate-600">
        <FaClock className="text-primary" />
        <span>{apt.time}</span>
      </div>
    </div>
    <div className="mt-4 p-3 bg-slate-50 rounded-xl">
      <p className="text-xs text-slate-500 mb-1 font-medium">Problem Description</p>
      <p className="text-sm text-slate-700">{apt.problem}</p>
    </div>
    {apt.status === 'Approved' && (
      <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-xl">
        <p className="text-sm text-green-700 font-medium">✓ Your appointment is confirmed! Please arrive 10 minutes early.</p>
      </div>
    )}
    {apt.status === 'Rejected' && (
      <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-xl">
        <p className="text-sm text-red-700 font-medium">✗ Your appointment was not approved. Please call us to reschedule.</p>
      </div>
    )}
    {apt.status === 'Completed' && (
      <div className="mt-3 p-3 bg-blue-50 border border-blue-200 rounded-xl">
        <p className="text-sm text-blue-700 font-medium">✓ Treatment completed. Thank you for choosing Dr. Mahee's clinic!</p>
      </div>
    )}
  </motion.div>
);

const AppointmentStatus = () => {
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query.trim()) {
      toast.error('Please enter an Appointment ID or phone number');
      return;
    }
    setLoading(true);
    setSearched(true);
    try {
      const { data } = await API.get(`/appointments/status/${query.trim()}`);
      setResults(Array.isArray(data) ? data : [data]);
    } catch (error) {
      setResults([]);
      toast.error(error.response?.data?.message || 'No appointment found');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSearch} className="flex gap-3 mb-8">
        <div className="relative flex-1">
          <FaSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Enter Appointment ID (e.g. APT-XXXXXXXX) or Phone Number"
            className="input-field pl-10"
          />
        </div>
        <motion.button
          type="submit"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          disabled={loading}
          className="btn-primary px-6 whitespace-nowrap disabled:opacity-60"
        >
          {loading ? (
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
          ) : 'Check Status'}
        </motion.button>
      </form>

      <AnimatePresence mode="wait">
        {loading && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-center py-12">
            <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-slate-500">Searching appointments...</p>
          </motion.div>
        )}

        {!loading && searched && results && results.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12 bg-white rounded-2xl shadow-md"
          >
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-slate-700 mb-2">No Appointment Found</h3>
            <p className="text-slate-500">Please check your Appointment ID or phone number and try again.</p>
          </motion.div>
        )}

        {!loading && results && results.length > 0 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-4">
            <p className="text-sm text-slate-500 mb-2">Found {results.length} appointment(s)</p>
            {results.map((apt) => (
              <AppointmentCard key={apt._id} apt={apt} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AppointmentStatus;
