'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Link from 'next/link';

export default function LabelPage() {
  const [isExpanded, setIsExpanded] = useState<{ [key: string]: boolean }>({
    certification: false,
    verification: false,
    impact: false,
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: 'spring',
        stiffness: 100,
      },
    },
  };

  const toggleExpand = (section: string) => {
    setIsExpanded(prev => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="container-custom py-12">
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl font-bold text-primary mb-4">REUSE Label System</h1>
        <p className="text-xl max-w-3xl mx-auto">
          Our certification system for revalued products that promotes sustainability and reduces waste.
        </p>
      </motion.div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
      >
        <motion.div
          variants={itemVariants}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="p-6">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Certification Process</h3>
            <p className="text-gray-600 mb-4">Register your products for certification and receive the REUSE Label.</p>
            <Link href="/label/certification" className="btn-primary">
              Get Certified
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="p-6">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Verification System</h3>
            <p className="text-gray-600 mb-4">Verify if a product has a valid REUSE Label certificate.</p>
            <Link href="/label/verification" className="btn-primary">
              Verify Product
            </Link>
          </div>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-white shadow-lg rounded-lg overflow-hidden"
          whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
          <div className="p-6">
            <div className="h-12 w-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Impact Tracking</h3>
            <p className="text-gray-600 mb-4">Track and visualize the environmental impact of your REUSE Label products.</p>
            <Link href="/label/impact" className="btn-primary">
              View Impact
            </Link>
          </div>
        </motion.div>
      </motion.div>

      <div className="mb-16">
        <motion.h2 
          className="text-2xl font-bold mb-6 text-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          How REUSE Label Works
        </motion.h2>

        <motion.div
          className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="p-6">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand('certification')}
            >
              <h3 className="text-xl font-semibold">1. Certification Process</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-6 w-6 transform transition-transform ${isExpanded.certification ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <motion.div
              initial={false}
              animate={{ 
                height: isExpanded.certification ? 'auto' : 0,
                opacity: isExpanded.certification ? 1 : 0,
                marginTop: isExpanded.certification ? '1rem' : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-gray-600 mb-2">Our certification process involves:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Submit your product for verification</li>
                <li>Our team assesses the product&apos;s condition and reusability</li>
                <li>Once approved, the certificate is issued on the blockchain</li>
                <li>You can download and display the REUSE Label on your product</li>
              </ul>
            </motion.div>
          </div>

          <div className="border-t border-gray-200"></div>

          <div className="p-6">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand('verification')}
            >
              <h3 className="text-xl font-semibold">2. Verification Workflow</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-6 w-6 transform transition-transform ${isExpanded.verification ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <motion.div
              initial={false}
              animate={{ 
                height: isExpanded.verification ? 'auto' : 0,
                opacity: isExpanded.verification ? 1 : 0,
                marginTop: isExpanded.verification ? '1rem' : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-gray-600 mb-2">Our verification system allows:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Consumers to verify product authenticity by entering the product ID</li>
                <li>Verification is done directly on the blockchain for transparency</li>
                <li>Certificate transfer when ownership changes</li>
                <li>Businesses to manage all their certificates in one place</li>
              </ul>
            </motion.div>
          </div>

          <div className="border-t border-gray-200"></div>

          <div className="p-6">
            <div 
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleExpand('impact')}
            >
              <h3 className="text-xl font-semibold">3. Impact Tracking</h3>
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-6 w-6 transform transition-transform ${isExpanded.impact ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            <motion.div
              initial={false}
              animate={{ 
                height: isExpanded.impact ? 'auto' : 0,
                opacity: isExpanded.impact ? 1 : 0,
                marginTop: isExpanded.impact ? '1rem' : 0
              }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-gray-600 mb-2">Our impact tracking features:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                <li>Environmental impact metrics for each certified product</li>
                <li>Aggregated statistics for businesses to showcase their sustainability efforts</li>
                <li>Real-time updates on waste reduction and resource conservation</li>
                <li>Shareable reports for annual sustainability reviews</li>
              </ul>
            </motion.div>
          </div>
        </motion.div>
      </div>

      <motion.div
        className="text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link href="/label/certification" className="btn-primary text-lg px-8 py-3">
          Get Started with REUSE Label
        </Link>
      </motion.div>
    </div>
  );
} 