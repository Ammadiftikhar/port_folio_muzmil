import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useTheme } from '../hooks/useTheme';
import siteData from '../data/siteData.json';

const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isMobile, setIsMobile] = useState(false);
  const { theme, toggleTheme } = useTheme();

  const navigation = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Experience', href: '#experience' },
    { name: 'Skills', href: '#skills' },
    { name: 'Education', href: '#education' },
    { name: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
      
      // Update active section based on scroll position
      const sections = navigation.map(nav => nav.href.slice(1));
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    // Close mobile menu when clicking outside or on scroll
    const handleClickOutside = () => {
      setIsMobileMenuOpen(false);
    };

    const handleResize = () => {
      // Close mobile menu on desktop resize
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
      checkMobile();
    };
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    if (isMobileMenuOpen) {
      document.addEventListener('click', handleClickOutside);
      // Prevent body scroll when mobile menu is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('click', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const handleMobileMenuToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`mobile-nav fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 md:bg-white/80 md:dark:bg-gray-900/80 md:backdrop-blur-md border-b border-gray-200/20 dark:border-gray-700/20' 
            : 'bg-transparent'
        }`}
      >
        <div className="responsive-container">
          <div className="mobile-nav-container md:desktop-nav flex items-center justify-between">
            {/* Logo */}
            <motion.div
              whileHover={!isMobile ? { scale: 1.05 } : {}}
              className="mobile-nav-logo md:text-xl text-gray-900 dark:text-white z-50 relative"
            >
              <span className="text-gradient">{siteData.name.split(' ')[0]}</span>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <motion.button
                  key={item.name}
                  onClick={() => handleNavClick(item.href)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  className={`desktop-nav-item relative px-3 py-2 text-sm font-medium ${
                    activeSection === item.href.slice(1)
                      ? 'text-primary-600 dark:text-primary-400'
                      : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400'
                  }`}
                >
                  {item.name}
                  {activeSection === item.href.slice(1) && (
                    <motion.div
                      layoutId="activeSection"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary-600 dark:bg-primary-400"
                      transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    />
                  )}
                </motion.button>
              ))}
            </div>

            {/* Theme Toggle & Mobile Menu Button */}
            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={!isMobile ? { scale: 1.1 } : {}}
                whileTap={{ scale: 0.95 }}
                onClick={toggleTheme}
                className="touch-target p-2 rounded-lg bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200 z-50 relative flex items-center justify-center"
                aria-label="Toggle theme"
              >
                {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
              </motion.button>

              <div className="md:hidden">
                <motion.button
                  whileHover={!isMobile ? { scale: 1.1 } : {}}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleMobileMenuToggle}
                  className="mobile-nav-toggle text-gray-700 dark:text-gray-300 z-50 relative"
                  aria-label="Toggle mobile menu"
                >
                  <AnimatePresence mode="wait">
                    {isMobileMenuOpen ? (
                      <motion.div
                        key="close"
                        initial={{ rotate: isMobile ? 0 : -90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: isMobile ? 0 : 90, opacity: 0 }}
                        transition={{ duration: isMobile ? 0.1 : 0.2 }}
                      >
                        <X size={24} />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="menu"
                        initial={{ rotate: isMobile ? 0 : 90, opacity: 0 }}
                        animate={{ rotate: 0, opacity: 1 }}
                        exit={{ rotate: isMobile ? 0 : -90, opacity: 0 }}
                        transition={{ duration: isMobile ? 0.1 : 0.2 }}
                      >
                        <Menu size={24} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Mobile Menu Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="mobile-menu-backdrop md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Mobile Menu Content */}
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="absolute top-full left-0 right-0 md:hidden mobile-menu-content shadow-2xl z-50"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="responsive-container py-6 space-y-2">
                  {navigation.map((item, index) => (
                    <button
                      key={item.name}
                      onClick={() => handleNavClick(item.href)}
                      className={`mobile-nav-item ${
                        activeSection === item.href.slice(1)
                          ? 'text-primary-600 dark:text-primary-400 bg-primary-50 dark:bg-primary-900/20'
                          : 'text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-gray-50 dark:hover:bg-gray-800/50'
                      }`}
                    >
                      {item.name}
                    </button>
                  ))}
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* Skip to content link */}
      <a
        href="#main-content"
        className="skip-link focus-visible"
      >
        Skip to main content
      </a>
    </>
  );
};

export default Navbar;
