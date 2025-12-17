import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, Mail, Phone, MapPin } from 'lucide-react';
import FloatingShapes from './FloatingShapes';
import siteData from '../data/siteData.json';

const Hero: React.FC = () => {
  const [scrollY, setScrollY] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleScrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleScrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
  };

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => isMobile ? {
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.3,
        ease: "easeOut"
      }
    } : ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.2,
        duration: 0.6,
        ease: "easeOut"
      }
    })
  };

  const buttonVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: isMobile ? {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4,
        duration: 0.3,
        ease: "easeOut"
      }
    } : {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.8,
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const mapLink = siteData.contact.location
    ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteData.contact.location)}`
    : '#';

  return (
    <section 
      id="home" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950 pt-16 section-spacing"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 bg-noise opacity-30" />
      
      {/* Animated Background Gradient */}
      <div className="hidden md:block">
        <motion.div
          style={{ y: scrollY * -0.5 }}
          className="absolute inset-0 bg-gradient-radial from-primary-200/20 via-transparent to-accent-200/20 dark:from-primary-900/20 dark:via-transparent dark:to-accent-900/20"
        />
      </div>

      {/* Floating Shapes */}
      <div className="hidden md:block">
        <FloatingShapes />
      </div>

      {/* Main Content */}
      <div className="relative z-10 responsive-container text-center">
        <div className="max-w-4xl mx-auto mt-5">
          {/* Greeting */}
          {isMobile ? (
            <p className="responsive-body text-gray-600 dark:text-gray-400 mb-4 font-medium">
              Hello, I'm
            </p>
          ) : (
            <motion.p
              variants={textVariants}
              custom={0}
              initial="hidden"
              animate="visible"
              className="responsive-body text-gray-600 dark:text-gray-400 mb-4 font-medium"
            >
              Hello, I'm
            </motion.p>
          )}

          {/* Name */}
          {isMobile ? (
            <h1 className="responsive-heading-1 text-gray-900 dark:text-white mb-6 leading-tight">
              <span className="text-gradient">{siteData.name}</span>
            </h1>
          ) : (
            <motion.h1
              variants={textVariants}
              custom={1}
              initial="hidden"
              animate="visible"
              className="responsive-heading-1 text-gray-900 dark:text-white mb-6 leading-tight"
            >
              <span className="text-gradient">{siteData.name}</span>
            </motion.h1>
          )}

          {/* Role */}
          {isMobile ? (
            <h2 className="responsive-heading-2 text-gray-700 dark:text-gray-300 mb-8 leading-tight">
              {siteData.role}
            </h2>
          ) : (
            <motion.h2
              variants={textVariants}
              custom={2}
              initial="hidden"
              animate="visible"
              className="responsive-heading-2 text-gray-700 dark:text-gray-300 mb-8 leading-tight"
            >
              {siteData.role}
            </motion.h2>
          )}

          {/* Tagline */}
          {isMobile ? (
            <p className="responsive-body text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              {siteData.tagline}
            </p>
          ) : (
            <motion.p
              variants={textVariants}
              custom={3}
              initial="hidden"
              animate="visible"
              className="responsive-body text-gray-600 dark:text-gray-400 mb-12 max-w-2xl mx-auto leading-relaxed"
            >
              {siteData.tagline}
            </motion.p>
          )}

          {/* Action Buttons */}
          {isMobile ? (
            <div className="flex flex-col gap-4 justify-center items-center mb-12">
              <button
                onClick={handleScrollToExperience}
                className="btn-primary mobile-btn"
              >
                View Experience
              </button>

              <button
                onClick={handleScrollToContact}
                className="btn-secondary mobile-btn"
              >
                Book a Consultation
              </button>

              <a
                href={`tel:${siteData.contact.phone}`}
                className="btn-secondary mobile-btn gap-2"
              >
                <Phone size={20} />
                Call Now
              </a>
            </div>
          ) : (
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              className="flex flex-row gap-4 justify-center items-center mb-12"
            >
              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleScrollToExperience}
                className="btn-primary px-8 py-3"
              >
                View Experience
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleScrollToContact}
                className="btn-secondary px-8 py-3"
              >
                Book a Consultation
              </motion.button>

              <motion.a
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                href={`tel:${siteData.contact.phone}`}
                className="btn-secondary flex items-center justify-center gap-2 px-8 py-3"
              >
                <Phone size={20} />
                Call Now
              </motion.a>
            </motion.div>
          )}

          {/* Social Links */}
          {isMobile ? (
            <div className="flex justify-center space-x-6 mb-16">
              <a
                href={`mailto:${siteData.contact.email}`}
                className="touch-target p-3 rounded-full glass dark:glass-dark text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 flex items-center justify-center"
                aria-label="Send email"
              >
                <Mail size={24} />
              </a>

              <a
                href={`tel:${siteData.contact.phone}`}
                className="touch-target p-3 rounded-full glass dark:glass-dark text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 flex items-center justify-center"
                aria-label="Call phone"
              >
                <Phone size={24} />
              </a>

              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="touch-target p-3 rounded-full glass dark:glass-dark text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 flex items-center justify-center"
                aria-label="View location"
              >
                <MapPin size={24} />
              </a>
            </div>
          ) : (
            <motion.div
              variants={buttonVariants}
              initial="hidden"
              animate="visible"
              className="flex justify-center space-x-6 mb-16"
            >
              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={`mailto:${siteData.contact.email}`}
                className="p-3 rounded-full glass dark:glass-dark text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 touch-target flex items-center justify-center"
                aria-label="Send email"
              >
                <Mail size={24} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={`tel:${siteData.contact.phone}`}
                className="p-3 rounded-full glass dark:glass-dark text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 touch-target flex items-center justify-center"
                aria-label="Call phone"
              >
                <Phone size={24} />
              </motion.a>

              <motion.a
                whileHover={{ scale: 1.1, y: -2 }}
                whileTap={{ scale: 0.95 }}
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 rounded-full glass dark:glass-dark text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 transition-colors duration-200 touch-target flex items-center justify-center"
                aria-label="View location"
              >
                <MapPin size={24} />
              </motion.a>
            </motion.div>
          )}
        </div>

        {/* Scroll Indicator */}
        <div className="hidden md:block">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="p-2 rounded-full text-gray-400 dark:text-gray-500"
            >
              <ChevronDown size={32} />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
