import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ExternalLink, Github } from 'lucide-react';

interface Project {
  id: number;
  name: string;
  category: string;
  stack: string[];
  summary: string;
  image: string;
  features: string[];
  github: string;
  demo: string;
}

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProjectModal: React.FC<ProjectModalProps> = ({ project, isOpen, onClose }) => {
  if (!project) return null;

  const modalVariants = {
    hidden: {
      opacity: 0,
      scale: 0.8,
      y: 20
    },
    visible: {
      opacity: 1,
      scale: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: {
      opacity: 0,
      scale: 0.8,
      y: 20,
      transition: {
        duration: 0.2
      }
    }
  };

  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  const contentVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1,
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="relative w-full max-w-4xl max-h-[90vh] glass dark:glass-dark rounded-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-2 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm rounded-full text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white transition-colors duration-200"
              aria-label="Close modal"
            >
              <X size={24} />
            </motion.button>

            <div className="overflow-y-auto max-h-[90vh]">
              {/* Header Image */}
              <div className="relative h-64 md:h-80 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                
                {/* Project Title Overlay */}
                <div className="absolute bottom-6 left-6 right-16">
                  <motion.div
                    variants={contentVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.h2 
                      variants={itemVariants}
                      className="text-3xl md:text-4xl font-bold text-white mb-2"
                    >
                      {project.name}
                    </motion.h2>
                    <motion.div 
                      variants={itemVariants}
                      className="flex items-center gap-3"
                    >
                      <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium">
                        {project.category}
                      </span>
                      <div className="flex gap-2">
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                          aria-label="View source code"
                        >
                          <Github size={18} />
                        </motion.a>
                        <motion.a
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                          href={project.demo}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-colors duration-200"
                          aria-label="View live demo"
                        >
                          <ExternalLink size={18} />
                        </motion.a>
                      </div>
                    </motion.div>
                  </motion.div>
                </div>
              </div>

              {/* Content */}
              <motion.div
                variants={contentVariants}
                initial="hidden"
                animate="visible"
                className="p-6 md:p-8 space-y-8"
              >
                {/* Description */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-3">
                    Project Overview
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                    {project.summary}
                  </p>
                </motion.div>

                {/* Features */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Key Features
                  </h3>
                  <div className="grid md:grid-cols-2 gap-3">
                    {project.features.map((feature, index) => (
                      <motion.div
                        key={index}
                        variants={itemVariants}
                        className="flex items-start gap-3 p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                      >
                        <div className="w-2 h-2 bg-gradient-to-r from-primary-600 to-accent-600 rounded-full mt-2 flex-shrink-0" />
                        <span className="text-gray-700 dark:text-gray-300 text-sm">
                          {feature}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* Tech Stack */}
                <motion.div variants={itemVariants}>
                  <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
                    Technology Stack
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {project.stack.map((tech, index) => (
                      <motion.span
                        key={tech}
                        variants={itemVariants}
                        whileHover={{ scale: 1.05 }}
                        className="px-4 py-2 bg-gradient-to-r from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 text-primary-700 dark:text-primary-300 rounded-lg font-medium text-sm"
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>
                </motion.div>

                {/* Action Buttons */}
                <motion.div 
                  variants={itemVariants}
                  className="flex flex-col sm:flex-row gap-4 pt-4"
                >
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.demo}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary flex items-center justify-center gap-2"
                  >
                    <ExternalLink size={18} />
                    View Live Demo
                  </motion.a>
                  <motion.a
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-secondary flex items-center justify-center gap-2"
                  >
                    <Github size={18} />
                    View Source Code
                  </motion.a>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ProjectModal;