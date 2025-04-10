'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface ImpactMetrics {
  totalProducts: number;
  wasteReduction: number;
  co2Saved: number;
  waterSaved: number;
  energySaved: number;
}

interface ImpactHistory {
  month: string;
  wasteReduction: number;
}

export default function ImpactPage() {
  const [timeframe, setTimeframe] = useState<'month' | 'quarter' | 'year'>('month');
  
  // Mock data - in a real app this would come from an API
  const impactMetrics: ImpactMetrics = {
    totalProducts: 52,
    wasteReduction: 723, // kg
    co2Saved: 1256, // kg
    waterSaved: 9723, // liters
    energySaved: 3812, // kWh
  };
  
  const monthlyImpactHistory: ImpactHistory[] = [
    { month: 'Jan', wasteReduction: 123 },
    { month: 'Feb', wasteReduction: 145 },
    { month: 'Mar', wasteReduction: 165 },
    { month: 'Apr', wasteReduction: 178 },
    { month: 'May', wasteReduction: 197 },
    { month: 'Jun', wasteReduction: 230 },
  ];
  
  const quarterlyImpactHistory: ImpactHistory[] = [
    { month: 'Q1', wasteReduction: 433 },
    { month: 'Q2', wasteReduction: 605 },
    { month: 'Q3', wasteReduction: 723 },
    { month: 'Q4', wasteReduction: 0 },
  ];
  
  const yearlyImpactHistory: ImpactHistory[] = [
    { month: '2021', wasteReduction: 1200 },
    { month: '2022', wasteReduction: 1850 },
    { month: '2023', wasteReduction: 2745 },
    { month: '2024', wasteReduction: 723 },
  ];
  
  const getImpactData = () => {
    switch (timeframe) {
      case 'month':
        return monthlyImpactHistory;
      case 'quarter':
        return quarterlyImpactHistory;
      case 'year':
        return yearlyImpactHistory;
      default:
        return monthlyImpactHistory;
    }
  };

  const formatNumber = (num: number): string => {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  };
  
  // Calculate max value for chart scaling
  const maxValue = Math.max(...getImpactData().map(item => item.wasteReduction));
  
  return (
    <div className="container-custom py-12">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-4">
          <Link href="/label" className="text-primary inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to REUSE Label
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-2">Impact Tracking</h1>
        <p className="text-xl max-w-2xl mx-auto text-gray-600">
          Track the environmental impact of your REUSE labeled products
        </p>
      </motion.div>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
        variants={{
          hidden: { opacity: 0 },
          visible: {
            opacity: 1,
            transition: {
              staggerChildren: 0.1,
            },
          },
        }}
        initial="hidden"
        animate="visible"
      >
        <motion.div
          className="bg-white shadow-lg rounded-lg overflow-hidden"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 100,
              },
            },
          }}
        >
          <div className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">{impactMetrics.totalProducts}</div>
            <div className="text-gray-600">Products Certified</div>
          </div>
        </motion.div>
        
        <motion.div
          className="bg-white shadow-lg rounded-lg overflow-hidden"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 100,
              },
            },
          }}
        >
          <div className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">{formatNumber(impactMetrics.wasteReduction)} kg</div>
            <div className="text-gray-600">Waste Reduction</div>
          </div>
        </motion.div>
        
        <motion.div
          className="bg-white shadow-lg rounded-lg overflow-hidden"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 100,
              },
            },
          }}
        >
          <div className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">{formatNumber(impactMetrics.co2Saved)} kg</div>
            <div className="text-gray-600">CO₂ Emissions Saved</div>
          </div>
        </motion.div>
        
        <motion.div
          className="bg-white shadow-lg rounded-lg overflow-hidden"
          variants={{
            hidden: { y: 20, opacity: 0 },
            visible: {
              y: 0,
              opacity: 1,
              transition: {
                type: 'spring',
                stiffness: 100,
              },
            },
          }}
        >
          <div className="p-6">
            <div className="text-3xl font-bold text-primary mb-2">{formatNumber(impactMetrics.waterSaved)} L</div>
            <div className="text-gray-600">Water Saved</div>
          </div>
        </motion.div>
      </motion.div>
      
      <motion.div
        className="bg-white shadow-lg rounded-lg overflow-hidden mb-12"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">Impact History</h2>
            <div className="flex space-x-2 bg-gray-100 rounded-lg p-1">
              <button
                onClick={() => setTimeframe('month')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  timeframe === 'month' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setTimeframe('quarter')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  timeframe === 'quarter' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
              >
                Quarterly
              </button>
              <button
                onClick={() => setTimeframe('year')}
                className={`px-4 py-2 text-sm rounded-md transition-colors ${
                  timeframe === 'year' ? 'bg-white shadow-sm' : 'hover:bg-white/50'
                }`}
              >
                Yearly
              </button>
            </div>
          </div>
          
          <div className="w-full h-64">
            <div className="h-full flex items-end justify-between">
              {getImpactData().map((item, index) => (
                <div key={item.month} className="flex flex-col items-center">
                  <motion.div
                    className="w-14 bg-primary rounded-t-md relative group"
                    initial={{ height: 0 }}
                    animate={{ 
                      height: `${(item.wasteReduction / maxValue) * 100}%`,
                      transition: { delay: 0.5 + index * 0.1, duration: 0.8, ease: "easeOut" }
                    }}
                  >
                    <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-primary text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                      {item.wasteReduction} kg
                    </div>
                  </motion.div>
                  <div className="mt-2 text-gray-600 text-sm">{item.month}</div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="mt-4 flex justify-between">
            <div className="text-sm text-gray-500">Waste Reduction (kg)</div>
            <div className="text-sm text-gray-500">
              {timeframe === 'month' ? '6-month period' : timeframe === 'quarter' ? 'Current year' : 'Past 4 years'}
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Impact by Product Category</h2>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">Furniture</span>
                  <span className="text-gray-600">42%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div 
                    className="bg-primary h-2.5 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: '42%' }}
                    transition={{ delay: 0.7, duration: 0.8 }}
                  ></motion.div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">Electronics</span>
                  <span className="text-gray-600">28%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div 
                    className="bg-primary h-2.5 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: '28%' }}
                    transition={{ delay: 0.8, duration: 0.8 }}
                  ></motion.div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">Packaging</span>
                  <span className="text-gray-600">15%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div 
                    className="bg-primary h-2.5 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: '15%' }}
                    transition={{ delay: 0.9, duration: 0.8 }}
                  ></motion.div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">Apparel</span>
                  <span className="text-gray-600">10%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div 
                    className="bg-primary h-2.5 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: '10%' }}
                    transition={{ delay: 1.0, duration: 0.8 }}
                  ></motion.div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700">Other</span>
                  <span className="text-gray-600">5%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <motion.div 
                    className="bg-primary h-2.5 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: '5%' }}
                    transition={{ delay: 1.1, duration: 0.8 }}
                  ></motion.div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-white shadow-lg rounded-lg overflow-hidden">
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">Environmental Impact Equivalents</h2>
            <div className="space-y-6">
              <div className="flex items-center">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-700 font-medium">Equivalent to planting</div>
                  <div className="text-xl font-bold text-primary">83 trees</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-700 font-medium">Energy to power</div>
                  <div className="text-xl font-bold text-primary">153 homes for a day</div>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="h-10 w-10 bg-primary/10 rounded-full flex items-center justify-center mr-4">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <div className="text-gray-700 font-medium">Hours of waste prevention</div>
                  <div className="text-xl font-bold text-primary">1,256 hours</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
      
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7 }}
      >
        <Link href="/label/certification" className="btn-primary text-lg px-8 py-3">
          Apply for More Certifications
        </Link>
      </motion.div>
      
      <motion.div
        className="text-center text-gray-500 text-sm"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <p>Data refreshed daily. Last updated: June 24, 2024</p>
      </motion.div>
    </div>
  );
} 