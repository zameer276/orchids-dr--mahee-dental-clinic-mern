const Appointment = require('../models/Appointment');

const bookAppointment = async (req, res) => {
  const { name, phone, email, date, time, problem } = req.body;
  try {
    if (!name || !phone || !email || !date || !time || !problem) {
      return res.status(400).json({ message: 'All fields are required' });
    }
    const appointment = await Appointment.create({ name, phone, email, date, time, problem });
    res.status(201).json({
      message: 'Appointment booked successfully',
      appointmentId: appointment.appointmentId,
      appointment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAllAppointments = async (req, res) => {
  try {
    const appointments = await Appointment.find().sort({ createdAt: -1 });
    res.json(appointments);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getAppointmentStatus = async (req, res) => {
  const { id } = req.params;
  try {
    let appointment = await Appointment.findOne({ appointmentId: id });
    if (!appointment) {
      appointment = await Appointment.find({ phone: id });
      if (!appointment || appointment.length === 0) {
        return res.status(404).json({ message: 'No appointment found with this ID or phone number' });
      }
      return res.json(appointment);
    }
    res.json(appointment);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const updateAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByIdAndUpdate(id, req.body, { new: true });
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment updated', appointment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteAppointment = async (req, res) => {
  const { id } = req.params;
  try {
    const appointment = await Appointment.findByIdAndDelete(id);
    if (!appointment) {
      return res.status(404).json({ message: 'Appointment not found' });
    }
    res.json({ message: 'Appointment deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  bookAppointment,
  getAllAppointments,
  getAppointmentStatus,
  updateAppointment,
  deleteAppointment,
};
