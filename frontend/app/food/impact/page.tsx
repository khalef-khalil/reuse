'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

interface ImpactDataType {
  foodSaved: number;
  co2Saved: number;
  waterSaved: number;
  moneySaved: number;
  certificatesEarned: number;
  weeklyProgress: number[];
  monthlyComparison: number[];
}

export default function ImpactPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [impactData, setImpactData] = useState<ImpactDataType | null>(null);
  
  // Simulate loading impact data
  useEffect(() => {
    const timer = setTimeout(() => {
      setImpactData({
        foodSaved: 45,
        co2Saved: 67,
        waterSaved: 1240,
        moneySaved: 123.50,
        certificatesEarned: 2,
        weeklyProgress: [10, 8, 12, 15],
        monthlyComparison: [35, 45, 60],
      });
      setIsLoading(false);
    }, 1500);
    
    return () => clearTimeout(timer);
  }, []);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };
  
  if (isLoading) {
    return (
      <MainLayout>
        <div className="container-custom py-12 flex justify-center items-center h-[50vh]">
          <motion.div 
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="container-custom py-12">
        <Link href="/food" className="flex items-center mb-6 text-primary hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Food Waste
        </Link>
        
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-3">Your Impact</h1>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Track how your food waste reduction efforts are making a difference in the world
          </p>
        </motion.div>
        
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div 
            className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6 text-center"
            variants={itemVariants}
          >
            <div className="mb-3 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-1">Food Saved</h3>
            <p className="text-3xl font-bold text-primary">{impactData.foodSaved} kg</p>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6 text-center"
            variants={itemVariants}
          >
            <div className="mb-3 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-1">CO₂ Emissions Saved</h3>
            <p className="text-3xl font-bold text-primary">{impactData.co2Saved} kg</p>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6 text-center"
            variants={itemVariants}
          >
            <div className="mb-3 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-1">Water Saved</h3>
            <p className="text-3xl font-bold text-primary">{impactData.waterSaved} L</p>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6 text-center"
            variants={itemVariants}
          >
            <div className="mb-3 bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold mb-1">Money Saved</h3>
            <p className="text-3xl font-bold text-primary">${impactData.moneySaved.toFixed(2)}</p>
          </motion.div>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <motion.div 
            className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4">Weekly Progress</h3>
            <div className="h-64 flex items-end justify-between space-x-2">
              {impactData.weeklyProgress.map((value, index) => (
                <motion.div 
                  key={index}
                  className="bg-primary rounded-t-md w-full"
                  initial={{ height: 0 }}
                  animate={{ height: `${(value / 15) * 100}%` }}
                  transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                >
                  <div className="text-center text-white font-bold p-2">
                    {value} kg
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="flex justify-between mt-2 text-sm text-gray-600">
              <span>Week 1</span>
              <span>Week 2</span>
              <span>Week 3</span>
              <span>Week 4</span>
            </div>
          </motion.div>
          
          <motion.div 
            className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-xl font-semibold mb-4">Monthly Comparison</h3>
            <div className="h-64 flex items-end justify-between space-x-4">
              {impactData.monthlyComparison.map((value, index) => (
                <div key={index} className="flex flex-col items-center w-full">
                  <motion.div 
                    className={`rounded-t-md w-full ${
                      index === 0 ? 'bg-gray-300' : 
                      index === 1 ? 'bg-primary/70' : 
                      'bg-primary'
                    }`}
                    initial={{ height: 0 }}
                    animate={{ height: `${(value / 60) * 100}%` }}
                    transition={{ duration: 0.5, delay: 0.5 + (index * 0.1) }}
                  >
                    <div className="text-center text-white font-bold p-2">
                      {value} kg
                    </div>
                  </motion.div>
                  <span className="mt-2 text-sm text-gray-600">
                    {index === 0 ? 'Nov' : index === 1 ? 'Dec' : 'Jan'}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h3 className="text-xl font-semibold mb-4">Blockchain Verified Certificates</h3>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="md:w-1/2">
              <div className="border border-primary/20 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">REUSE Impact Certificate</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Issued on Jan 15, 2024</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Verified</span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="mb-2">This is to certify that you have saved:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>25kg of Food from waste</li>
                    <li>38kg of CO₂ emissions</li>
                    <li>720L of water</li>
                  </ul>
                </div>
                <div className="text-xs text-gray-500 mt-4 font-mono">
                  <p>Certificate ID: RIC-2024-0001</p>
                  <p>Blockchain Hash: 0x8f5e3892f85d9c5c59e0da293e31c94b</p>
                </div>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="border border-primary/20 rounded-lg p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h4 className="font-semibold text-lg">REUSE Impact Certificate</h4>
                    <p className="text-gray-600 dark:text-gray-300 text-sm">Issued on Feb 10, 2024</p>
                  </div>
                  <div className="flex items-center space-x-1 bg-primary/10 text-primary px-2 py-1 rounded text-sm">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span>Verified</span>
                  </div>
                </div>
                <div className="mb-4">
                  <p className="mb-2">This is to certify that you have saved:</p>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 dark:text-gray-300">
                    <li>20kg of Food from waste</li>
                    <li>29kg of CO₂ emissions</li>
                    <li>520L of water</li>
                  </ul>
                </div>
                <div className="text-xs text-gray-500 mt-4 font-mono">
                  <p>Certificate ID: RIC-2024-0002</p>
                  <p>Blockchain Hash: 0x7a2d1f6e3c8b5d4a9f0e7c6b5a3d2e1f</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        <motion.div
          className="rounded-lg bg-gradient-to-r from-primary to-secondary text-white p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="mb-6 md:mb-0 md:mr-8">
              <h2 className="text-2xl font-bold mb-3">Share Your Impact</h2>
              <p className="max-w-lg">
                Let others know about your contribution to reducing food waste and creating a more sustainable future.
              </p>
            </div>
            <div className="flex space-x-4">
              <motion.button
                className="p-3 bg-white text-primary rounded-full hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z" />
                </svg>
              </motion.button>
              <motion.button
                className="p-3 bg-white text-primary rounded-full hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z" />
                </svg>
              </motion.button>
              <motion.button
                className="p-3 bg-white text-primary rounded-full hover:bg-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
} 