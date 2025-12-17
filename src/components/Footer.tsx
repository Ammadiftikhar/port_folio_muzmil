import React from "react";
import { motion } from "framer-motion";
import { Mail, Phone, MapPin, ArrowUp } from "lucide-react";
import siteData from "../data/siteData.json";

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Mail,
      label: "Email",
      href: `mailto:${siteData.contact.email}`,
      color: "hover:text-purple-400 dark:hover:text-purple-300"
    },
    {
      icon: Phone,
      label: "Phone",
      href: `tel:${siteData.contact.phone}`,
      color: "hover:text-green-400 dark:hover:text-green-300"
    },
    {
      icon: MapPin,
      label: "Location",
      href: siteData.contact.location
        ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(siteData.contact.location)}`
        : "#",
      color: "hover:text-red-400 dark:hover:text-red-300"
    }
  ];

  const quickLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Experience", href: "#experience" },
    { name: "Skills", href: "#skills" },
    { name: "Education", href: "#education" },
    { name: "Contact", href: "#contact" }
  ];

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer className="relative bg-gray-900 dark:bg-gray-950 text-white overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-noise opacity-10" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary-900/20 via-transparent to-accent-900/20" />

      <div className="relative container mx-auto px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="pt-16 pb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand Section */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="mb-6"
              >
                <h3 className="text-2xl font-bold mb-4">
                  <span className="text-gradient">{siteData.name}</span>
                </h3>
                <p className="text-gray-300 leading-relaxed max-w-md">
                  {siteData.role} focused on evidence-based care, personalized diet planning, and measurable health outcomes.
                </p>
              </motion.div>

              {/* Social Links */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="flex gap-4"
              >
                {socialLinks.map((social) => (
                  <motion.a
                    key={social.label}
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`p-3 bg-gray-800 dark:bg-gray-900 rounded-xl text-gray-400 ${social.color} transition-colors duration-200`}
                    aria-label={social.label}
                  >
                    <social.icon size={20} />
                  </motion.a>
                ))}
              </motion.div>
            </div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <motion.button
                      whileHover={{ x: 5 }}
                      onClick={() => handleNavClick(link.href)}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-left"
                    >
                      {link.name}
                    </motion.button>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <h4 className="text-lg font-semibold mb-6">Get in Touch</h4>
              <div className="space-y-3">
                <a
                  href={`mailto:${siteData.contact.email}`}
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {siteData.contact.email}
                </a>
                <a
                  href={`tel:${siteData.contact.phone}`}
                  className="block text-gray-400 hover:text-white transition-colors duration-200"
                >
                  {siteData.contact.phone}
                </a>
                <p className="text-gray-400">{siteData.contact.location}</p>
              </div>

              {/* CTA */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-block mt-6 px-6 py-3 bg-gradient-to-r from-primary-600 to-accent-600 text-white rounded-lg font-medium hover:shadow-lg transition-shadow duration-200"
              >
                Book a Consultation
              </motion.button>
            </motion.div>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-gray-700 to-transparent" />

        {/* Bottom Section */}
        <div className="py-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-gray-400 text-sm flex flex-wrap items-center justify-center gap-2"
          >
            © {currentYear}
            <span className="font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-accent-400">
              {siteData.name}
            </span>
            <span className="flex items-center gap-2">
              Evidence-based nutrition | Patient-centered care
            </span>
          </motion.p>

          {/* Back to Top Button */}
          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleScrollToTop}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors duration-200 text-sm"
          >
            Back to Top
            <motion.div animate={{ y: [0, -3, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
              <ArrowUp size={16} />
            </motion.div>
          </motion.button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
