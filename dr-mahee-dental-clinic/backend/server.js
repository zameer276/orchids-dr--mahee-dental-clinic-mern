const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const { seedAdmin } = require('./controllers/adminController');

dotenv.config();

connectDB().then(() => {
  seedAdmin();
});

const app = express();

app.use(cors({
  origin: true, // Allow all origins (covers orchids.cloud preview URLs)
  credentials: true,
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoutes'));
app.use('/api/content', require('./routes/contentRoutes'));

app.get('/', (req, res) => {
  res.json({ message: "Dr. Mahee's Dental Clinic API is running" });
});

app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({ message: err.message });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, '0.0.0.0', () => console.log(`Server running on port ${PORT}`));
