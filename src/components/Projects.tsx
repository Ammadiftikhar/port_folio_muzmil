import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { GraduationCap, Award, Calendar, MapPin, ClipboardList, BookOpen } from 'lucide-react';
import siteData from '../data/siteData.json';

const Projects: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.1,
    freezeOnceVisible: true
  });

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { delay: i * 0.1, duration: 0.6, ease: 'easeOut' }
    })
  };

  return (
    <section
      id="education"
      className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-950 dark:to-gray-900"
      ref={ref}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isIntersecting ? 'visible' : 'hidden'}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Education & <span className="text-gradient">Credentials</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Academic training, certifications, and leadership experiences shaping my clinical nutrition practice.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full" />
          </motion.div>

          {/* Education Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {siteData.education.map((edu, index) => (
              <motion.div
                key={edu.id}
                variants={cardVariants}
                custom={index}
                initial="hidden"
                animate={isIntersecting ? 'visible' : 'hidden'}
                whileHover={{ y: -4 }}
                className="glass dark:glass-dark rounded-xl p-6 space-y-3"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 rounded-lg bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30">
                      <GraduationCap className="text-primary-700 dark:text-primary-300" size={20} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white">{edu.degree}</h3>
                      <p className="text-gray-600 dark:text-gray-300">{edu.institution}</p>
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-primary-700 dark:text-primary-300 whitespace-nowrap">
                    {edu.year}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin size={14} />
                  <span>{edu.location}</span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Certifications & Trainings */}
          <div className="grid lg:grid-cols-2 gap-8 mt-12">
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate={isIntersecting ? 'visible' : 'hidden'}
              className="glass dark:glass-dark rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <Award className="text-primary-600 dark:text-primary-300" size={22} />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Certifications</h3>
              </div>
              <div className="space-y-4">
                {siteData.certifications.map((cert) => (
                  <div key={cert.id} className="p-4 rounded-xl bg-gray-100/70 dark:bg-gray-800/50 flex items-start justify-between gap-4">
                    <div>
                      <p className="font-semibold text-gray-900 dark:text-white">{cert.name}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300">{cert.issuer}</p>
                    </div>
                    <span className="text-sm text-primary-700 dark:text-primary-300 font-semibold">{cert.year}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={textVariants}
              initial="hidden"
              animate={isIntersecting ? 'visible' : 'hidden'}
              className="glass dark:glass-dark rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <ClipboardList className="text-primary-600 dark:text-primary-300" size={22} />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Trainings & Internships</h3>
              </div>
              <div className="space-y-4">
                {siteData.trainings.map((training, index) => (
                  <motion.div
                    key={training.id}
                    variants={cardVariants}
                    custom={index}
                    initial="hidden"
                    animate={isIntersecting ? 'visible' : 'hidden'}
                    className="p-4 rounded-xl bg-gray-100/70 dark:bg-gray-800/50"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="font-semibold text-gray-900 dark:text-white">{training.role}</p>
                        <p className="text-sm text-gray-600 dark:text-gray-300">{training.organization}</p>
                      </div>
                      <span className="text-xs px-3 py-1 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300">
                        {training.period}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600 dark:text-gray-300 mt-2">
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={14} />
                        {training.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={14} />
                        {training.period}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{training.description}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Leadership & Achievements */}
          <div className="grid lg:grid-cols-2 gap-8 mt-12">
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate={isIntersecting ? 'visible' : 'hidden'}
              className="glass dark:glass-dark rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <Calendar className="text-primary-600 dark:text-primary-300" size={22} />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Leadership & Administrative</h3>
              </div>
              <div className="space-y-4">
                {siteData.administrative_experience.map((item) => (
                  <div key={item.id} className="p-4 rounded-xl bg-gray-100/70 dark:bg-gray-800/50 space-y-1">
                    <p className="font-semibold text-gray-900 dark:text-white">{item.role}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {item.organization || item.institution}
                    </p>
                    <div className="flex flex-wrap gap-3 text-sm text-gray-600 dark:text-gray-300">
                      {item.event && <span>{item.event}</span>}
                      <span className="inline-flex items-center gap-1">
                        <MapPin size={14} />
                        {item.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Calendar size={14} />
                        {item.period || item.year}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            <motion.div
              variants={textVariants}
              initial="hidden"
              animate={isIntersecting ? 'visible' : 'hidden'}
              className="glass dark:glass-dark rounded-2xl p-6 space-y-4"
            >
              <div className="flex items-center gap-3">
                <Award className="text-primary-600 dark:text-primary-300" size={22} />
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Achievements</h3>
              </div>
              <div className="space-y-4">
                {siteData.achievements.map((achievement) => (
                  <div key={achievement.id} className="p-4 rounded-xl bg-gray-100/70 dark:bg-gray-800/50 space-y-1">
                    <p className="font-semibold text-gray-900 dark:text-white">{achievement.title}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {achievement.event || achievement.organization} · {achievement.location}
                    </p>
                    <span className="text-xs px-3 py-1 rounded-full bg-accent-100 dark:bg-accent-900/30 text-accent-700 dark:text-accent-300 inline-block">
                      {achievement.year || achievement.date}
                    </span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Research */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isIntersecting ? 'visible' : 'hidden'}
            className="mt-12 glass dark:glass-dark rounded-2xl p-6"
          >
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="text-primary-600 dark:text-primary-300" size={22} />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Research</h3>
            </div>
            <div className="space-y-4">
              {siteData.research.map((paper) => (
                <div key={paper.id} className="p-4 rounded-xl bg-gray-100/70 dark:bg-gray-800/50">
                  <p className="font-semibold text-gray-900 dark:text-white mb-1">{paper.title}</p>
                  <p className="text-sm text-primary-700 dark:text-primary-300 font-medium mb-2">{paper.status}</p>
                  <a
                    href={paper.doi}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-accent-700 dark:text-accent-300 underline"
                  >
                    {paper.doi}
                  </a>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
