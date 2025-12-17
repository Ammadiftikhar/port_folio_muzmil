import React from 'react';
import { motion } from 'framer-motion';
import { useIntersectionObserver } from '../hooks/useIntersectionObserver';
import { Calendar, MapPin, ArrowRight } from 'lucide-react';
import siteData from '../data/siteData.json';

const Experience: React.FC = () => {
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.2,
    freezeOnceVisible: true
  });

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const timelineVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const lineVariants = {
    hidden: { height: 0 },
    visible: {
      height: '100%',
      transition: {
        delay: 0.5,
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <section 
      id="experience" 
      className="py-24 bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
      ref={ref}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              My <span className="text-gradient">Experience</span>
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto mb-8">
              Clinical nutrition practice, research leadership, and community-focused health programs
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full" />
          </motion.div>

          {/* Timeline */}
          <div className="relative">
            {/* Timeline Line */}
            <motion.div
              variants={lineVariants}
              initial="hidden"
              animate={isIntersecting ? "visible" : "hidden"}
              className="absolute left-8 md:left-1/2 top-0 w-0.5 bg-gradient-to-b from-primary-600 to-accent-600 transform md:-translate-x-1/2 z-10"
              style={{ height: '100%' }}
            />

            {/* Experience Items */}
            <div className="space-y-12">
              {siteData.experience.map((exp, index) => (
                <motion.div
                  key={exp.company}
                  variants={timelineVariants}
                  custom={index}
                  initial="hidden"
                  animate={isIntersecting ? "visible" : "hidden"}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Timeline Dot */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isIntersecting ? { scale: 1 } : { scale: 0 }}
                    transition={{ delay: index * 0.2 + 0.3, duration: 0.4 }}
                    className="absolute left-8 md:left-1/2 w-4 h-4 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full transform -translate-x-1/2 z-20"
                  >
                    <div className="w-full h-full bg-white dark:bg-gray-900 rounded-full scale-50" />
                  </motion.div>

                  {/* Content */}
                  <div className={`ml-16 md:ml-0 w-full md:w-5/12 ${
                    index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'
                  }`}>
                    <motion.div
                      whileHover={{ y: -5, scale: 1.02 }}
                      className="glass dark:glass-dark rounded-xl p-6 cursor-pointer group"
                    >
                      {/* Company & Title */}
                      <div className="mb-4">
                        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors duration-200">
                          {exp.title}
                        </h3>
                        <div className="flex items-center gap-2 text-primary-600 dark:text-primary-400 font-semibold mb-2">
                          <span>{exp.company}</span>
                          <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
                        </div>
                      </div>

                      {/* Period & Location */}
                      <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-600 dark:text-gray-300">
                        <div className="flex items-center gap-1">
                          <Calendar size={16} />
                          <span>{exp.period}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin size={16} />
                          <span>{exp.location}</span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <ul className="space-y-2">
                        {exp.highlights.map((highlight, highlightIndex) => (
                          <motion.li
                            key={highlightIndex}
                            initial={{ opacity: 0, x: -10 }}
                            animate={isIntersecting ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
                            transition={{ delay: index * 0.2 + 0.5 + highlightIndex * 0.1 }}
                            className="flex items-start gap-2 text-gray-600 dark:text-gray-300"
                          >
                            <div className="w-1.5 h-1.5 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full mt-2 flex-shrink-0" />
                            <span>{highlight}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden md:block w-2/12" />
                </motion.div>
              ))}
            </div>
          </div>

          {/* Current Status */}
          <motion.div
            variants={textVariants}
            initial="hidden"
            animate={isIntersecting ? "visible" : "hidden"}
            transition={{ delay: 1 }}
              className="mt-16 text-center"
            >
              <div className="glass dark:glass-dark rounded-2xl p-8 max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  What's Next?
                </h3>
                <p className="text-gray-600 dark:text-gray-300 mb-6">
                Open to clinical consultations, research collaborations, and health education programs. 
                Let's partner to improve patient outcomes and community wellbeing.
                </p>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  className="btn-primary inline-flex w-fit mx-auto justify-center items-center"
                >
                Book a Consultation
                </motion.button>
              </div>
            </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;
