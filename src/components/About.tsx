import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useIntersectionObserver } from "../hooks/useIntersectionObserver";
import { Stethoscope, HeartPulse, BookOpenCheck, Users } from "lucide-react";
import siteData from "../data/siteData.json";
import ammadUrl from "../../public/WhatsApp Image 2025-08-21 at 15.39.44_886ed721.jpg?url";

const About: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);
  const { ref, isIntersecting } = useIntersectionObserver({
    threshold: 0.3,
    freezeOnceVisible: true
  });

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const textVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: isMobile
      ? {
          opacity: 1,
          y: 0,
          transition: { duration: 0.3, ease: "easeOut" }
        }
      : {
          opacity: 1,
          y: 0,
          transition: { duration: 0.6, ease: "easeOut" }
        }
  } as const;

  const cardVariants = {
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: (i: number) =>
      isMobile
        ? {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              delay: i * 0.05 + 0.1,
              duration: 0.3,
              ease: "easeOut"
            }
          }
        : {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
              delay: i * 0.1 + 0.3,
              duration: 0.6,
              ease: "easeOut"
            }
          }
  } as const;

  const highlights = [
    {
      icon: Stethoscope,
      title: "Clinical Nutrition & MNT",
      description: "Evidence-based diet planning and medical nutrition therapy for diverse patient needs"
    },
    {
      icon: HeartPulse,
      title: "Pediatric & Diabetic Care",
      description: "Specialized counseling for children and individuals managing diabetes and metabolic health"
    },
    {
      icon: BookOpenCheck,
      title: "Research & Publications",
      description: "Designing studies, collecting data, and translating findings into practical guidance"
    },
    {
      icon: Users,
      title: "Community Education",
      description: "Workshops, facilitation, and empathetic counseling that improve everyday nutrition habits"
    }
  ] as const;

  const sentences = (siteData?.summary ?? "")
    .split(". ")
    .map((s: string) => s.trim())
    .filter(Boolean);

  return (
    <section
      id="about"
      ref={ref}
      className="section-spacing bg-gradient-to-b from-white to-gray-50 dark:from-gray-900 dark:to-gray-950"
    >
      <div className="responsive-container">
        <div className="max-w-4xl mx-auto">
          {/* Section Header */}
          {isMobile ? (
            <div className="text-center mb-12">
              <h2 className="responsive-heading-1 text-gray-900 dark:text-white mb-6">
                About <span className="text-gradient">Me</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full" />
            </div>
          ) : (
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate={isIntersecting ? "visible" : "hidden"}
              className="text-center mb-16"
            >
              <h2 className="responsive-heading-1 text-gray-900 dark:text-white mb-6">
                About <span className="text-gradient">Me</span>
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-primary-600 to-accent-600 mx-auto rounded-full" />
            </motion.div>
          )}

          {/* Main Content */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center mb-16">
            {/* Text Column */}
            {isMobile ? (
              <div className="space-y-6">
                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {sentences.map((sentence, index) => (
                    <p key={index} className="responsive-body">
                      {sentence}
                      {index < sentences.length - 1 ? "." : ""}
                    </p>
                  ))}
                </div>

                <div className="flex flex-col gap-3 pt-4">
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                    <div className="w-2 h-2 bg-primary-600 rounded-full" />
                    <span className="text-primary-700 dark:text-primary-300 font-medium responsive-small">
                      Based in {siteData?.contact?.location ?? "—"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                    <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                    <span className="text-green-700 dark:text-green-300 font-medium responsive-small">
                      Available for consultations & collaborations
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate={isIntersecting ? "visible" : "hidden"}
                className="space-y-6"
              >
                <div className="space-y-4 text-gray-600 dark:text-gray-300 leading-relaxed">
                  {sentences.map((sentence, index) => (
                    <motion.p
                      key={index}
                      variants={textVariants}
                      initial="hidden"
                      animate={isIntersecting ? "visible" : "hidden"}
                      transition={{ delay: index * 0.1 + 0.2 }}
                      className="responsive-body"
                    >
                      {sentence}
                      {index < sentences.length - 1 ? "." : ""}
                    </motion.p>
                  ))}
                </div>

                <motion.div
                  variants={textVariants}
                  initial="hidden"
                  animate={isIntersecting ? "visible" : "hidden"}
                  transition={{ delay: 0.6 }}
                  className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4 pt-4"
                >
                  <div className="flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full">
                    <div className="w-2 h-2 bg-primary-600 rounded-full" />
                    <span className="text-primary-700 dark:text-primary-300 font-medium responsive-small">
                      Based in {siteData?.contact?.location ?? "—"}
                    </span>
                  </div>
                    <div className="flex items-center gap-2 px-4 py-2 bg-green-100 dark:bg-green-900/30 rounded-full">
                      <div className="w-2 h-2 bg-green-600 rounded-full animate-pulse" />
                      <span className="text-green-700 dark:text-green-300 font-medium responsive-small">
                      Available for consultations & collaborations
                      </span>
                    </div>
                  </motion.div>
              </motion.div>
            )}

            {/* Visual Column */}
            {isMobile ? (
              <div className="relative">
                <div className="relative glass dark:glass-dark rounded-2xl p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                      <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                        <img src={ammadUrl} alt="Profile" className="w-full h-full object-cover" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{siteData?.name}</h3>
                    <p className="responsive-small text-gray-600 dark:text-gray-300">{siteData?.role}</p>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-6 h-6 bg-primary-400 rounded-full opacity-60" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 bg-accent-400 rounded-full opacity-60" />
                  <div className="absolute top-1/2 left-4 w-2 h-2 bg-primary-300 rounded-full opacity-40" />
                </div>
              </div>
            ) : (
              <motion.div
                variants={textVariants}
                initial="hidden"
                animate={isIntersecting ? "visible" : "hidden"}
                transition={{ delay: 0.4 }}
                className="relative"
              >
                <div className="relative glass dark:glass-dark rounded-2xl p-8 h-80 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-32 h-32 bg-gradient-to-br from-primary-600 to-accent-600 rounded-full mx-auto mb-6 flex items-center justify-center">
                      {/* <span className="text-4xl font-bold text-white">A</span> */}
                      <div className="w-full h-full rounded-full overflow-hidden flex items-center justify-center">
                        <img src={ammadUrl} alt="Profile" className="w-auto h-auto object-cover" />
                      </div>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">{siteData?.name}</h3>
                    <p className="responsive-small text-gray-600 dark:text-gray-300">{siteData?.role}</p>
                  </div>

                  {/* Decorative elements */}
                  <div className="absolute top-4 right-4 w-6 h-6 bg-primary-400 rounded-full opacity-60" />
                  <div className="absolute bottom-4 left-4 w-4 h-4 bg-accent-400 rounded-full opacity-60" />
                  <div className="absolute top-1/2 left-4 w-2 h-2 bg-primary-300 rounded-full opacity-40" />
                </div>
              </motion.div>
            )}
          </div>

          {/* Highlights Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {highlights.map((item, index) =>
              isMobile ? (
                <div key={item.title} className="glass dark:glass-dark rounded-xl p-6 text-center h-full flex flex-col">
                  <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg text-white mb-4 mx-auto">
                    <item.icon size={20} />
                  </div>
                  <h3 className="responsive-heading-3 text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="responsive-small text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              ) : (
                <motion.div
                  key={item.title}
                  variants={cardVariants}
                  custom={index}
                  initial="hidden"
                  animate={isIntersecting ? "visible" : "hidden"}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="glass dark:glass-dark rounded-xl p-6 text-center group cursor-pointer card-hover"
                >
                  <motion.div
                    whileHover={{ rotate: 360, scale: 1.1 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-primary-600 to-accent-600 rounded-lg text-white mb-4 mx-auto"
                  >
                    <item.icon size={20} />
                  </motion.div>
                  <h3 className="responsive-heading-3 text-gray-900 dark:text-white mb-2">{item.title}</h3>
                  <p className="responsive-small text-gray-600 dark:text-gray-300 leading-relaxed">
                    {item.description}
                  </p>
                </motion.div>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
