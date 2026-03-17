const express = require('express');
const router = express.Router();
const {
  bookAppointment,
  getAllAppointments,
  getAppointmentStatus,
  updateAppointment,
  deleteAppointment,
} = require('../controllers/appointmentController');
const { protect } = require('../middleware/authMiddleware');

router.post('/book', bookAppointment);
router.get('/status/:id', getAppointmentStatus);
router.get('/', protect, getAllAppointments);
router.put('/:id', protect, updateAppointment);
router.delete('/:id', protect, deleteAppointment);

module.exports = router;
