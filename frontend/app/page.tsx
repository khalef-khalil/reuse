'use client';

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import MainLayout from "../components/layout/MainLayout";
import Button from "../components/ui/Button";

export default function Home() {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const fadeInUp = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const solutionCardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    hover: { 
      scale: 1.03,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-neutral-light to-white dark:from-neutral-dark dark:to-black py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={containerVariants}
            >
              <motion.h1 
                className="text-4xl md:text-5xl font-bold mb-6"
                variants={itemVariants}
              >
                Sustainable Solutions for a <span className="text-primary">Circular Economy</span>
              </motion.h1>
              <motion.p 
                className="text-lg mb-8"
                variants={itemVariants}
              >
                REUSE connects businesses and consumers to reduce waste and optimize resource utilization through innovative digital solutions.
              </motion.p>
              <motion.div 
                className="flex flex-col sm:flex-row gap-4"
                variants={itemVariants}
              >
                <Link href="/marketplace">
                  <Button size="lg">Explore Marketplace</Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg">Learn More</Button>
                </Link>
              </motion.div>
            </motion.div>
            <motion.div 
              className="relative h-[300px] md:h-[400px] rounded-lg bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <motion.div 
                className="text-primary font-bold text-xl"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Sustainable Future
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section className="py-16">
        <div className="container-custom">
          <motion.div 
            className="text-center mb-12"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={fadeInUp}
          >
            <h2 className="text-3xl font-bold mb-4">Our Solutions</h2>
            <p className="max-w-2xl mx-auto text-gray-600 dark:text-gray-300">
              Three interconnected platforms designed to reduce waste and promote sustainability.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* REUSE PRO */}
            <motion.div 
              className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden"
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              variants={solutionCardVariants}
              transition={{ delay: 0.1 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">REUSE PRO</h3>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  B2B marketplace for sharing, selling, or donating unused equipment and assets.
                </p>
                <Link href="/marketplace">
                  <Button variant="outline" size="sm">Learn More</Button>
                </Link>
              </div>
            </motion.div>

            {/* REUSE FOOD */}
            <motion.div 
              className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden"
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              variants={solutionCardVariants}
              transition={{ delay: 0.2 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">REUSE FOOD</h3>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Geolocation-based app helping food retailers sell products nearing expiration.
                </p>
                <Link href="/food">
                  <Button variant="outline" size="sm">Learn More</Button>
                </Link>
              </div>
            </motion.div>

            {/* REUSE LABEL */}
            <motion.div 
              className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden"
              initial="hidden"
              whileInView="visible"
              whileHover="hover"
              viewport={{ once: true, amount: 0.2 }}
              variants={solutionCardVariants}
              transition={{ delay: 0.3 }}
            >
              <div className="p-6">
                <h3 className="text-xl font-bold text-primary mb-3">REUSE LABEL</h3>
                <p className="mb-4 text-gray-600 dark:text-gray-300">
                  Labeling system for slightly damaged but functional products.
                </p>
                <Link href="/label">
                  <Button variant="outline" size="sm">Learn More</Button>
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section 
        className="bg-primary text-white py-16"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 0.7 }}
      >
        <div className="container-custom text-center">
          <motion.h2 
            className="text-3xl font-bold mb-6"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Join the Sustainable Movement
          </motion.h2>
          <motion.p 
            className="max-w-2xl mx-auto mb-8 text-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            Start reducing waste and making a positive environmental impact today.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/register">
              <Button variant="secondary" size="lg">Get Started</Button>
            </Link>
          </motion.div>
        </div>
      </motion.section>
    </MainLayout>
  );
}
