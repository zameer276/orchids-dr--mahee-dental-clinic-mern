const mongoose = require('mongoose');

const serviceSchema = new mongoose.Schema({
  title: String,
  description: String,
  icon: String,
});

const testimonialSchema = new mongoose.Schema({
  name: String,
  review: String,
  rating: { type: Number, default: 5 },
  role: String,
});

const contentSchema = new mongoose.Schema({
  heroTitle: {
    type: String,
    default: 'Your Smile, Our Priority',
  },
  heroSubtitle: {
    type: String,
    default: 'World-class dental care with a gentle touch. Specializing in Implants & Aesthetic Dentistry.',
  },
  aboutText: {
    type: String,
    default: 'Dr. Mahee is a renowned dental specialist with over 15 years of experience in implant dentistry and aesthetic treatments. Committed to providing the highest quality dental care in a comfortable and welcoming environment.',
  },
  phone: {
    type: String,
    default: '+91 98765 43210',
  },
  address: {
    type: String,
    default: '123 Dental Street, Medical Hub, Chennai - 600001, Tamil Nadu, India',
  },
  services: {
    type: [serviceSchema],
    default: [
      { title: 'Dental Implants', description: 'State-of-the-art titanium implants that look and feel like natural teeth.', icon: 'implant' },
      { title: 'Teeth Whitening', description: 'Professional whitening treatments for a brighter, more confident smile.', icon: 'whitening' },
      { title: 'Orthodontics', description: 'Braces and clear aligners to straighten your teeth beautifully.', icon: 'orthodontics' },
      { title: 'Root Canal', description: 'Painless root canal therapy using advanced techniques and technology.', icon: 'rootcanal' },
      { title: 'Veneers', description: 'Custom porcelain veneers for a perfect Hollywood smile transformation.', icon: 'veneers' },
      { title: 'Dental Crowns', description: 'Durable and natural-looking crowns to restore damaged teeth.', icon: 'crowns' },
    ],
  },
  testimonials: {
    type: [testimonialSchema],
    default: [
      { name: 'Priya Sharma', review: 'Dr. Mahee transformed my smile completely! The implant procedure was painless and the results are stunning.', rating: 5, role: 'Patient' },
      { name: 'Rahul Verma', review: 'Best dental clinic I have ever visited. The staff is friendly and Dr. Mahee is extremely professional.', rating: 5, role: 'Patient' },
      { name: 'Anitha Kumar', review: 'My teeth whitening results exceeded expectations. I feel so much more confident now!', rating: 5, role: 'Patient' },
    ],
  },
}, { timestamps: true });

module.exports = mongoose.model('Content', contentSchema);
