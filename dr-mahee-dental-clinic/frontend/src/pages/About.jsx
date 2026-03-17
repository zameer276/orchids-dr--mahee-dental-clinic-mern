import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaAward, FaGraduationCap, FaStar, FaUsers, FaCheckCircle } from 'react-icons/fa';
import API from '../api/axios';

const fadeUp = { initial: { opacity: 0, y: 40 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.6 } };

const About = () => {
  const [content, setContent] = useState(null);

  useEffect(() => {
    API.get('/content').then(({ data }) => setContent(data)).catch(() => {});
  }, []);

  const credentials = [
    { icon: FaGraduationCap, title: 'BDS – Bachelor of Dental Surgery', sub: 'Tamil Nadu Government Dental College, Chennai' },
    { icon: FaGraduationCap, title: 'MDS – Implantology & Prosthodontics', sub: 'Sri Ramachandra University, Chennai' },
    { icon: FaAward, title: 'Fellow – International Congress of Oral Implantologists', sub: 'ICOI, USA' },
    { icon: FaAward, title: 'Best Dentist Award 2022', sub: 'Tamil Nadu Dental Association' },
  ];

  const skills = ['Dental Implants', 'Full Mouth Rehabilitation', 'Smile Designing', 'Orthodontics', 'Cosmetic Dentistry', 'Laser Dentistry'];

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.4 }}
      className="pt-20">
      {/* Header */}
      <section className="bg-gradient-to-br from-sky-50 to-teal-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div {...fadeUp} className="text-center max-w-3xl mx-auto">
            <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">Meet The Doctor</p>
            <h1 className="section-title">About Dr. Mahee</h1>
            <p className="text-slate-500 text-lg">
              A passionate dental specialist dedicated to transforming smiles and improving lives through advanced dentistry.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Profile */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <div className="relative">
                <div className="bg-gradient-to-br from-primary to-secondary rounded-3xl p-1 shadow-2xl inline-block">
                  <div className="bg-white rounded-3xl p-12 text-center">
                    <div className="text-8xl mb-4">👨‍⚕️</div>
                    <h3 className="text-2xl font-bold text-slate-800">Dr. Mahee</h3>
                    <p className="text-primary font-semibold">BDS, MDS – Implantology</p>
                    <div className="flex justify-center gap-1 mt-2">
                      {[...Array(5)].map((_, i) => <FaStar key={i} className="text-yellow-400 text-sm" />)}
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 mt-6">
                  {[
                    { num: '15+', label: 'Years Experience', color: 'bg-sky-50 text-primary' },
                    { num: '10K+', label: 'Happy Patients', color: 'bg-teal-50 text-secondary' },
                    { num: '50+', label: 'Dental Services', color: 'bg-purple-50 text-purple-600' },
                    { num: '99%', label: 'Success Rate', color: 'bg-green-50 text-green-600' },
                  ].map((s) => (
                    <div key={s.label} className={`${s.color} p-4 rounded-2xl text-center`}>
                      <p className="text-2xl font-extrabold">{s.num}</p>
                      <p className="text-xs font-medium opacity-80">{s.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, x: 50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <h2 className="text-3xl font-bold text-slate-800 mb-4">
                Transforming Smiles with <span className="text-primary">Precision & Care</span>
              </h2>
              <p className="text-slate-600 leading-relaxed mb-6">
                {content?.aboutText || 'Dr. Mahee is a renowned dental specialist with over 15 years of experience in implant dentistry and aesthetic treatments. Committed to providing the highest quality dental care in a comfortable and welcoming environment.'}
              </p>
              <p className="text-slate-600 leading-relaxed mb-8">
                With a patient-first approach and state-of-the-art technology, every treatment is tailored to ensure the best outcomes. Dr. Mahee combines artistry with precision to deliver smiles that truly shine.
              </p>
              <div className="space-y-3">
                {skills.map((skill) => (
                  <div key={skill} className="flex items-center gap-3">
                    <FaCheckCircle className="text-secondary shrink-0" />
                    <span className="text-slate-700 font-medium">{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Credentials */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-14">
            <p className="text-primary font-semibold mb-2 uppercase tracking-wider text-sm">Education & Awards</p>
            <h2 className="section-title">Qualifications & Achievements</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {credentials.map((c, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                whileHover={{ y: -4 }} className="card flex items-start gap-4">
                <div className="bg-gradient-to-br from-primary to-secondary p-3 rounded-xl shrink-0">
                  <c.icon className="text-white text-xl" />
                </div>
                <div>
                  <h3 className="font-bold text-slate-800 mb-1">{c.title}</h3>
                  <p className="text-sm text-slate-500">{c.sub}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}>
            <FaUsers className="text-white/30 text-6xl mx-auto mb-6" />
            <h2 className="text-3xl font-bold text-white mb-4">Our Mission</h2>
            <p className="text-sky-100 text-lg leading-relaxed">
              To provide exceptional, compassionate dental care that enhances the quality of life of every patient. We believe a healthy, beautiful smile is not a luxury—it's a right.
            </p>
          </motion.div>
        </div>
      </section>
    </motion.div>
  );
};

export default About;
