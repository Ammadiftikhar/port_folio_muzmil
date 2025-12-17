import React from 'react';
import { motion } from 'framer-motion';

const FloatingShapes: React.FC = () => {
  const shapes = [
    { id: 1, size: { mobile: 40, desktop: 80 }, x: '10%', y: '20%', delay: 0 },
    { id: 2, size: { mobile: 60, desktop: 120 }, x: '80%', y: '10%', delay: 1 },
    { id: 3, size: { mobile: 30, desktop: 60 }, x: '20%', y: '70%', delay: 2 },
    { id: 4, size: { mobile: 50, desktop: 100 }, x: '90%', y: '60%', delay: 0.5 },
    { id: 5, size: { mobile: 20, desktop: 40 }, x: '60%', y: '80%', delay: 1.5 },
    { id: 6, size: { mobile: 35, desktop: 70 }, x: '15%', y: '40%', delay: 2.5 },
  ];

  const floatVariants = {
    animate: {
      y: [0, -20, 0],
      rotate: [0, 180, 360],
      scale: [1, 1.1, 1],
      transition: {
        duration: 8,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  const mobileFloatVariants = {
    animate: {
      y: [0, -10, 0],
      rotate: [0, 90, 180],
      scale: [1, 1.05, 1],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {shapes.map((shape) => (
        <motion.div
          key={shape.id}
          className="absolute opacity-15 sm:opacity-20 dark:opacity-8 dark:sm:opacity-10"
          style={{
            left: shape.x,
            top: shape.y,
          }}
          variants={window.innerWidth < 768 ? mobileFloatVariants : floatVariants}
          animate="animate"
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ 
            opacity: window.innerWidth < 768 ? 0.15 : 0.2, 
            scale: 1 
          }}
          transition={{
            delay: shape.delay,
            duration: 0.6
          }}
        >
          {/* Geometric shapes */}
          {shape.id % 3 === 0 ? (
            // Triangle
            <div 
              className="bg-gradient-to-r from-primary-400 to-accent-400"
              style={{
                width: window.innerWidth < 768 ? shape.size.mobile : shape.size.desktop,
                height: window.innerWidth < 768 ? shape.size.mobile : shape.size.desktop,
                clipPath: 'polygon(50% 0%, 0% 100%, 100% 100%)'
              }}
            />
          ) : shape.id % 2 === 0 ? (
            // Circle
            <div 
              className="bg-gradient-to-r from-accent-400 to-primary-400 rounded-full" 
              style={{
                width: window.innerWidth < 768 ? shape.size.mobile : shape.size.desktop,
                height: window.innerWidth < 768 ? shape.size.mobile : shape.size.desktop,
              }}
            />
          ) : (
            // Square
            <div 
              className="bg-gradient-to-r from-primary-400 to-accent-400 rounded-lg transform rotate-45"
              style={{
                width: window.innerWidth < 768 ? shape.size.mobile : shape.size.desktop,
                height: window.innerWidth < 768 ? shape.size.mobile : shape.size.desktop,
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
};

export default FloatingShapes;