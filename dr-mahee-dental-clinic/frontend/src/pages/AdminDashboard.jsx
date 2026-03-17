import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import {
  FaTooth, FaSignOutAlt, FaCalendarAlt, FaCheckCircle, FaTimesCircle,
  FaClock, FaTrash, FaEdit, FaBars, FaTimes, FaSave, FaPlus,
  FaUsers, FaCheck, FaBan, FaChartBar, FaCog
} from 'react-icons/fa';
import API from '../api/axios';

const StatusBadge = ({ status }) => {
  const cls = { Pending: 'badge-pending', Approved: 'badge-approved', Rejected: 'badge-rejected', Completed: 'badge-completed' };
  return <span className={cls[status] || 'badge-pending'}>{status}</span>;
};

const StatCard = ({ icon: Icon, label, value, color, bg }) => (
  <motion.div whileHover={{ y: -3, scale: 1.01 }} className="card">
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm text-slate-500 mb-1">{label}</p>
        <p className="text-3xl font-extrabold text-slate-800">{value}</p>
      </div>
      <div className={`${bg} p-4 rounded-2xl`}>
        <Icon className={`${color} text-2xl`} />
      </div>
    </div>
  </motion.div>
);

const AdminDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('appointments');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filter, setFilter] = useState('All');
  const [editContent, setEditContent] = useState(null);
  const [savingContent, setSavingContent] = useState(false);
  const navigate = useNavigate();

  const adminInfo = JSON.parse(localStorage.getItem('adminInfo') || '{}');

  const fetchData = useCallback(async () => {
    setLoading(true);
    try {
      const [aptsRes, contentRes] = await Promise.all([
        API.get('/appointments'),
        API.get('/content'),
      ]);
      setAppointments(aptsRes.data);
      setContent(contentRes.data);
      setEditContent(contentRes.data);
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error('Session expired. Please login again.');
        navigate('/admin/login');
      } else {
        toast.error('Failed to load data');
      }
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) { navigate('/admin/login'); return; }
    fetchData();
  }, [navigate, fetchData]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminInfo');
    toast.success('Logged out successfully');
    navigate('/admin/login');
  };

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/appointments/${id}`, { status });
      setAppointments((prev) => prev.map((a) => (a._id === id ? { ...a, status } : a)));
      toast.success(`Appointment marked as ${status}`);
    } catch {
      toast.error('Failed to update status');
    }
  };

  const deleteAppointment = async (id) => {
    if (!window.confirm('Delete this appointment?')) return;
    try {
      await API.delete(`/appointments/${id}`);
      setAppointments((prev) => prev.filter((a) => a._id !== id));
      toast.success('Appointment deleted');
    } catch {
      toast.error('Failed to delete');
    }
  };

  const saveContent = async () => {
    setSavingContent(true);
    try {
      await API.put('/content', editContent);
      setContent(editContent);
      toast.success('Content updated successfully!');
    } catch {
      toast.error('Failed to save content');
    } finally {
      setSavingContent(false);
    }
  };

  const stats = {
    total: appointments.length,
    pending: appointments.filter((a) => a.status === 'Pending').length,
    approved: appointments.filter((a) => a.status === 'Approved').length,
    completed: appointments.filter((a) => a.status === 'Completed').length,
  };

  const filtered = filter === 'All' ? appointments : appointments.filter((a) => a.status === filter);

  const navItems = [
    { id: 'appointments', label: 'Appointments', icon: FaCalendarAlt },
    { id: 'content', label: 'Content', icon: FaCog },
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 1024) && (
          <motion.aside
            initial={{ x: -280 }}
            animate={{ x: 0 }}
            exit={{ x: -280 }}
            transition={{ duration: 0.3 }}
            className="fixed lg:sticky top-0 left-0 h-screen w-64 bg-slate-900 text-white z-40 flex flex-col shadow-2xl"
          >
            <div className="p-6 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-br from-primary to-secondary p-2 rounded-xl">
                  <FaTooth className="text-white text-lg" />
                </div>
                <div>
                  <p className="font-bold text-sm">Dr. Mahee's</p>
                  <p className="text-xs text-slate-400">Admin Panel</p>
                </div>
              </div>
            </div>
            <nav className="flex-1 p-4 space-y-1">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                    activeTab === item.id ? 'bg-primary text-white shadow-md' : 'text-slate-400 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <item.icon /> {item.label}
                </button>
              ))}
            </nav>
            <div className="p-4 border-t border-slate-800">
              <div className="flex items-center gap-3 mb-3 px-2">
                <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white text-sm font-bold">
                  {(adminInfo.username || 'A')[0].toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-medium text-white">{adminInfo.username || 'Admin'}</p>
                  <p className="text-xs text-slate-400">Administrator</p>
                </div>
              </div>
              <button onClick={handleLogout}
                className="w-full flex items-center gap-2 text-sm text-slate-400 hover:text-red-400 px-4 py-2 rounded-xl hover:bg-slate-800 transition-all">
                <FaSignOutAlt /> Logout
              </button>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div onClick={() => setSidebarOpen(false)} className="fixed inset-0 bg-black/50 z-30 lg:hidden" />
      )}

      {/* Main */}
      <div className="flex-1 min-w-0">
        {/* Top Bar */}
        <div className="bg-white border-b border-slate-200 px-6 py-4 flex items-center justify-between sticky top-0 z-20 shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(!sidebarOpen)} className="lg:hidden p-2 rounded-lg hover:bg-slate-100">
              {sidebarOpen ? <FaTimes /> : <FaBars />}
            </button>
            <div>
              <h1 className="text-xl font-bold text-slate-800 capitalize">{activeTab}</h1>
              <p className="text-xs text-slate-400">Manage your clinic's {activeTab}</p>
            </div>
          </div>
          <button onClick={handleLogout}
            className="hidden md:flex items-center gap-2 text-sm text-slate-500 hover:text-red-500 transition-colors font-medium">
            <FaSignOutAlt /> Logout
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon={FaChartBar} label="Total" value={stats.total} color="text-primary" bg="bg-sky-50" />
            <StatCard icon={FaClock} label="Pending" value={stats.pending} color="text-yellow-500" bg="bg-yellow-50" />
            <StatCard icon={FaCheckCircle} label="Approved" value={stats.approved} color="text-green-500" bg="bg-green-50" />
            <StatCard icon={FaUsers} label="Completed" value={stats.completed} color="text-blue-500" bg="bg-blue-50" />
          </div>

          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              {/* Filters */}
              <div className="flex flex-wrap gap-2 mb-4">
                {['All', 'Pending', 'Approved', 'Rejected', 'Completed'].map((f) => (
                  <button
                    key={f}
                    onClick={() => setFilter(f)}
                    className={`px-4 py-2 rounded-xl text-sm font-medium transition-all ${
                      filter === f ? 'bg-primary text-white shadow-md' : 'bg-white text-slate-600 hover:bg-sky-50 border border-slate-200'
                    }`}
                  >
                    {f} {f === 'All' ? `(${appointments.length})` : f === 'Pending' ? `(${stats.pending})` : ''}
                  </button>
                ))}
              </div>

              {/* Table / Cards */}
              {filtered.length === 0 ? (
                <div className="card text-center py-16">
                  <FaCalendarAlt className="text-slate-300 text-5xl mx-auto mb-4" />
                  <p className="text-slate-500 font-medium">No appointments found</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {filtered.map((apt, i) => (
                    <motion.div
                      key={apt._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.03 }}
                      className="card hover:shadow-lg"
                    >
                      <div className="flex flex-col md:flex-row md:items-center gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-3 mb-2 flex-wrap">
                            <span className="font-bold text-primary text-sm">{apt.appointmentId}</span>
                            <StatusBadge status={apt.status} />
                            <span className="text-xs text-slate-400">{new Date(apt.createdAt).toLocaleDateString()}</span>
                          </div>
                          <p className="font-semibold text-slate-800">{apt.name}</p>
                          <div className="flex flex-wrap gap-3 mt-1 text-sm text-slate-500">
                            <span>📞 {apt.phone}</span>
                            <span>✉️ {apt.email}</span>
                            <span>📅 {apt.date} at {apt.time}</span>
                          </div>
                          <p className="text-sm text-slate-500 mt-1 truncate">🦷 {apt.problem}</p>
                        </div>
                        <div className="flex flex-wrap gap-2 shrink-0">
                          {apt.status === 'Pending' && (
                            <>
                              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                onClick={() => updateStatus(apt._id, 'Approved')}
                                className="flex items-center gap-1.5 bg-green-500 hover:bg-green-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                                <FaCheck /> Approve
                              </motion.button>
                              <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                                onClick={() => updateStatus(apt._id, 'Rejected')}
                                className="flex items-center gap-1.5 bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                                <FaBan /> Reject
                              </motion.button>
                            </>
                          )}
                          {apt.status === 'Approved' && (
                            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                              onClick={() => updateStatus(apt._id, 'Completed')}
                              className="flex items-center gap-1.5 bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg text-xs font-medium transition-colors">
                              <FaCheckCircle /> Complete
                            </motion.button>
                          )}
                          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                            onClick={() => deleteAppointment(apt._id)}
                            className="flex items-center gap-1.5 bg-slate-100 hover:bg-red-50 text-slate-500 hover:text-red-500 px-3 py-1.5 rounded-lg text-xs font-medium transition-all">
                            <FaTrash />
                          </motion.button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Content Tab */}
          {activeTab === 'content' && editContent && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* General */}
              <div className="card">
                <h3 className="font-bold text-slate-800 mb-4 text-lg">Hero Section</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Hero Title</label>
                    <input type="text" value={editContent.heroTitle || ''} onChange={(e) => setEditContent({ ...editContent, heroTitle: e.target.value })}
                      className="input-field" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Hero Subtitle</label>
                    <textarea value={editContent.heroSubtitle || ''} onChange={(e) => setEditContent({ ...editContent, heroSubtitle: e.target.value })}
                      rows={3} className="input-field resize-none" />
                  </div>
                </div>
              </div>

              <div className="card">
                <h3 className="font-bold text-slate-800 mb-4 text-lg">Clinic Information</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">About Text</label>
                    <textarea value={editContent.aboutText || ''} onChange={(e) => setEditContent({ ...editContent, aboutText: e.target.value })}
                      rows={4} className="input-field resize-none" />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Phone</label>
                      <input type="text" value={editContent.phone || ''} onChange={(e) => setEditContent({ ...editContent, phone: e.target.value })}
                        className="input-field" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-1.5">Address</label>
                      <input type="text" value={editContent.address || ''} onChange={(e) => setEditContent({ ...editContent, address: e.target.value })}
                        className="input-field" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Testimonials */}
              <div className="card">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-bold text-slate-800 text-lg">Testimonials</h3>
                  <button onClick={() => setEditContent({
                    ...editContent,
                    testimonials: [...(editContent.testimonials || []), { name: '', review: '', rating: 5, role: 'Patient' }]
                  })} className="flex items-center gap-1.5 bg-primary text-white px-3 py-1.5 rounded-lg text-sm font-medium">
                    <FaPlus /> Add
                  </button>
                </div>
                <div className="space-y-4">
                  {(editContent.testimonials || []).map((t, i) => (
                    <div key={i} className="border border-slate-100 rounded-xl p-4 space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-semibold text-slate-600">Testimonial #{i + 1}</span>
                        <button onClick={() => setEditContent({
                          ...editContent,
                          testimonials: editContent.testimonials.filter((_, idx) => idx !== i)
                        })} className="text-red-400 hover:text-red-600 transition-colors"><FaTrash /></button>
                      </div>
                      <div className="grid grid-cols-2 gap-3">
                        <input placeholder="Name" value={t.name} onChange={(e) => {
                          const updated = [...editContent.testimonials];
                          updated[i] = { ...updated[i], name: e.target.value };
                          setEditContent({ ...editContent, testimonials: updated });
                        }} className="input-field text-sm" />
                        <input placeholder="Role" value={t.role} onChange={(e) => {
                          const updated = [...editContent.testimonials];
                          updated[i] = { ...updated[i], role: e.target.value };
                          setEditContent({ ...editContent, testimonials: updated });
                        }} className="input-field text-sm" />
                      </div>
                      <textarea placeholder="Review" value={t.review} rows={2} onChange={(e) => {
                        const updated = [...editContent.testimonials];
                        updated[i] = { ...updated[i], review: e.target.value };
                        setEditContent({ ...editContent, testimonials: updated });
                      }} className="input-field text-sm resize-none w-full" />
                    </div>
                  ))}
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                onClick={saveContent}
                disabled={savingContent}
                className="btn-primary flex items-center gap-2 px-8 disabled:opacity-60"
              >
                {savingContent ? <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" /> : <FaSave />}
                Save Changes
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
