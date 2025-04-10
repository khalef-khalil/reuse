'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';
import Button from '../../../components/ui/Button';

// Types
interface ImpactMetric {
  title: string;
  value: string;
  unit: string;
  icon: React.ReactNode;
}

interface TimelineData {
  period: string;
  carbonSaved: number;
  wasteReduced: number;
  waterSaved: number;
}

export default function ImpactAnalytics() {
  const [timespan, setTimespan] = useState<'month' | 'quarter' | 'year'>('month');
  
  // Mock data - in a real app this would come from an API
  const impactMetrics: ImpactMetric[] = [
    {
      title: 'Carbon Footprint Saved',
      value: '1,256',
      unit: 'kg CO₂e',
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Waste Reduction',
      value: '3,587',
      unit: 'kg',
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      )
    },
    {
      title: 'Water Saved',
      value: '28,450',
      unit: 'liters',
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
        </svg>
      )
    },
    {
      title: 'Energy Conserved',
      value: '4,825',
      unit: 'kWh',
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    }
  ];
  
  const monthlyData: TimelineData[] = [
    { period: 'Jan', carbonSaved: 86, wasteReduced: 245, waterSaved: 1860 },
    { period: 'Feb', carbonSaved: 92, wasteReduced: 265, waterSaved: 2100 },
    { period: 'Mar', carbonSaved: 105, wasteReduced: 312, waterSaved: 2450 },
    { period: 'Apr', carbonSaved: 124, wasteReduced: 356, waterSaved: 2840 },
    { period: 'May', carbonSaved: 132, wasteReduced: 378, waterSaved: 3120 },
    { period: 'Jun', carbonSaved: 148, wasteReduced: 412, waterSaved: 3540 },
    { period: 'Jul', carbonSaved: 156, wasteReduced: 425, waterSaved: 3650 },
    { period: 'Aug', carbonSaved: 165, wasteReduced: 445, waterSaved: 3780 },
    { period: 'Sep', carbonSaved: 149, wasteReduced: 398, waterSaved: 3450 },
    { period: 'Oct', carbonSaved: 132, wasteReduced: 380, waterSaved: 3250 },
    { period: 'Nov', carbonSaved: 110, wasteReduced: 325, waterSaved: 2850 },
    { period: 'Dec', carbonSaved: 75, wasteReduced: 210, waterSaved: 1980 }
  ];
  
  const quarterlyData: TimelineData[] = [
    { period: 'Q1', carbonSaved: 283, wasteReduced: 822, waterSaved: 6410 },
    { period: 'Q2', carbonSaved: 404, wasteReduced: 1146, waterSaved: 9500 },
    { period: 'Q3', carbonSaved: 470, wasteReduced: 1268, waterSaved: 10880 },
    { period: 'Q4', carbonSaved: 317, wasteReduced: 915, waterSaved: 8080 }
  ];
  
  const yearlyData: TimelineData[] = [
    { period: '2020', carbonSaved: 850, wasteReduced: 2450, waterSaved: 19800 },
    { period: '2021', carbonSaved: 980, wasteReduced: 2820, waterSaved: 22500 },
    { period: '2022', carbonSaved: 1150, wasteReduced: 3250, waterSaved: 25800 },
    { period: '2023', carbonSaved: 1256, wasteReduced: 3587, waterSaved: 28450 }
  ];
  
  const getTimelineData = () => {
    switch (timespan) {
      case 'month':
        return monthlyData;
      case 'quarter':
        return quarterlyData;
      case 'year':
        return yearlyData;
      default:
        return monthlyData;
    }
  };
  
  // Calculate max values for chart scaling
  const currentData = getTimelineData();
  const maxCarbonSaved = Math.max(...currentData.map(d => d.carbonSaved));
  const maxWasteReduced = Math.max(...currentData.map(d => d.wasteReduced));
  const maxWaterSaved = Math.max(...currentData.map(d => d.waterSaved));
  
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const renderTimeframeSelector = () => (
    <div className="flex justify-center mb-8">
      <div className="inline-flex p-1 space-x-1 bg-gray-100 dark:bg-neutral-dark rounded-lg">
        {['month', 'quarter', 'year'].map((period) => (
          <motion.button
            key={period}
            onClick={() => setTimespan(period as 'month' | 'quarter' | 'year')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              timespan === period 
                ? 'bg-white dark:bg-gray-700 shadow-sm' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
            whileHover={{ 
              backgroundColor: timespan === period 
                ? '' 
                : 'rgba(0,0,0,0.05)' 
            }}
            whileTap={{ scale: 0.98 }}
          >
            {period.charAt(0).toUpperCase() + period.slice(1)}
          </motion.button>
        ))}
      </div>
    </div>
  );

  const sustainabilityGoals = [
    { name: 'Reduce Carbon Emissions', target: 1500, current: 1256, percentage: 78 },
    { name: 'Minimize Waste Production', target: 5500, current: 3587, percentage: 65 },
    { name: 'Conserve Water Resources', target: 35000, current: 28450, percentage: 82 },
    { name: 'Promote Circular Economy', target: 100, current: 93, percentage: 93 },
  ];

  const emissionsBySector = [
    { sector: 'Transportation', percentage: 38, reduction: 532 },
    { sector: 'Manufacturing', percentage: 25, reduction: 328 },
    { sector: 'Energy Usage', percentage: 18, reduction: 243 },
    { sector: 'Product Lifecycle', percentage: 12, reduction: 153 },
    { sector: 'Other', percentage: 7, reduction: 86 },
  ];

  return (
    <MainLayout>
      <div className="container-custom py-8">
        {/* Header */}
        <motion.div 
          className="mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-4">
            <Link href="/analytics" className="text-primary hover:underline flex items-center">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Dashboard
            </Link>
          </div>
          <h1 className="text-3xl font-bold mb-2">Environmental Impact Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Detailed metrics on your contribution to environmental sustainability
          </p>
        </motion.div>
        
        {/* Timeframe selector */}
        {renderTimeframeSelector()}
        
        {/* Impact Metrics */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {impactMetrics.map((metric, index) => (
            <motion.div 
              key={index}
              className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden"
              variants={fadeIn}
              whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
            >
              <div className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{metric.title}</h3>
                    <div className="flex items-end mt-2">
                      <span className="text-2xl font-bold">{metric.value}</span>
                      <span className="text-gray-500 dark:text-gray-400 ml-1">{metric.unit}</span>
                    </div>
                  </div>
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {metric.icon}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Timeline Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Carbon Footprint Chart */}
          <motion.div 
            className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Carbon Footprint Reduction</h3>
              <div className="h-64">
                <div className="h-full flex items-end justify-between">
                  {getTimelineData().map((item, index) => (
                    <div key={item.period} className="flex flex-col items-center group">
                      <motion.div
                        className="w-8 bg-primary rounded-t-md relative mx-1"
                        initial={{ height: 0 }}
                        animate={{ 
                          height: `${(item.carbonSaved / maxCarbonSaved) * 100}%`,
                          transition: { delay: 0.5 + index * 0.05, duration: 0.8, ease: "easeOut" }
                        }}
                      >
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-primary text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.carbonSaved} kg CO₂e
                        </div>
                      </motion.div>
                      <div className="mt-2 text-xs text-gray-500">{item.period}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
          
          {/* Waste Reduction Chart */}
          <motion.div 
            className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Waste Reduction</h3>
              <div className="h-64">
                <div className="h-full flex items-end justify-between">
                  {getTimelineData().map((item, index) => (
                    <div key={item.period} className="flex flex-col items-center group">
                      <motion.div
                        className="w-8 bg-accent rounded-t-md relative mx-1"
                        initial={{ height: 0 }}
                        animate={{ 
                          height: `${(item.wasteReduced / maxWasteReduced) * 100}%`,
                          transition: { delay: 0.5 + index * 0.05, duration: 0.8, ease: "easeOut" }
                        }}
                      >
                        <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-accent text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.wasteReduced} kg
                        </div>
                      </motion.div>
                      <div className="mt-2 text-xs text-gray-500">{item.period}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Water Conservation Chart */}
        <motion.div 
          className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Water Conservation</h3>
            <div className="h-64">
              <div className="h-full flex items-end justify-between">
                {getTimelineData().map((item, index) => (
                  <div key={item.period} className="flex flex-col items-center group">
                    <motion.div
                      className="w-8 bg-blue-500 rounded-t-md relative mx-1"
                      initial={{ height: 0 }}
                      animate={{ 
                        height: `${(item.waterSaved / maxWaterSaved) * 100}%`,
                        transition: { delay: 0.5 + index * 0.05, duration: 0.8, ease: "easeOut" }
                      }}
                    >
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.waterSaved} L
                      </div>
                    </motion.div>
                    <div className="mt-2 text-xs text-gray-500">{item.period}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Sustainability Goals Progress */}
        <motion.div 
          className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Sustainability Goals Progress</h3>
            <div className="space-y-6">
              {sustainabilityGoals.map((goal, index) => (
                <div key={goal.name}>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300">{goal.name}</span>
                    <div className="text-gray-600 dark:text-gray-400 text-sm">
                      <span className="font-medium">{goal.current.toLocaleString()}</span>
                      <span className="mx-1">/</span>
                      <span>{goal.target.toLocaleString()}</span>
                      <span className="ml-2 text-primary">{goal.percentage}%</span>
                    </div>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <motion.div 
                      className="bg-primary h-2.5 rounded-full" 
                      initial={{ width: 0 }}
                      animate={{ width: `${goal.percentage}%` }}
                      transition={{ delay: 0.6 + (index * 0.1), duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
        
        {/* Emissions by Sector */}
        <motion.div 
          className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.55 }}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Emissions Reduction by Sector</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                {emissionsBySector.map((sector, index) => (
                  <div key={sector.sector}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{sector.sector}</span>
                      <div className="flex items-center">
                        <span className="text-gray-600 dark:text-gray-400 mr-2">{sector.percentage}%</span>
                        <span className="text-xs text-green-500">-{sector.reduction} kg</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <motion.div 
                        className="bg-green-500 h-2.5 rounded-full" 
                        initial={{ width: 0 }}
                        animate={{ width: `${sector.percentage}%` }}
                        transition={{ delay: 0.7 + (index * 0.1), duration: 0.8 }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="relative h-60">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="relative w-40 h-40">
                    {emissionsBySector.map((sector, index) => {
                      const previousPercentages = emissionsBySector
                        .slice(0, index)
                        .reduce((sum, s) => sum + s.percentage, 0);
                      const rotateStart = (previousPercentages / 100) * 360;
                      
                      const colors = ['#4CAF50', '#388E3C', '#2E7D32', '#1B5E20', '#9E9E9E'];
                      
                      return (
                        <motion.div 
                          key={sector.sector}
                          className="absolute inset-0"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.8 + (index * 0.1), duration: 0.4 }}
                        >
                          <div 
                            className="absolute inset-0 overflow-hidden"
                            style={{ 
                              clip: `rect(0, 20rem, 20rem, 10rem)`,
                              transform: `rotate(${rotateStart}deg)`
                            }}
                          >
                            <div 
                              className="absolute inset-0 overflow-hidden"
                              style={{
                                clip: `rect(0, 10rem, 20rem, 0)`,
                                transform: `rotate(${sector.percentage * 3.6}deg)`,
                                backgroundColor: colors[index % colors.length]
                              }}
                            ></div>
                          </div>
                        </motion.div>
                      );
                    })}
                    <div className="absolute inset-4 rounded-full bg-white dark:bg-neutral-dark flex items-center justify-center">
                      <span className="text-sm font-medium">
                        Total: <br />
                        1,342 kg
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="absolute bottom-0 w-full flex flex-wrap justify-center gap-4">
                  {emissionsBySector.map((sector, index) => {
                    const colors = ['#4CAF50', '#388E3C', '#2E7D32', '#1B5E20', '#9E9E9E'];
                    
                    return (
                      <div key={sector.sector} className="flex items-center">
                        <div 
                          className="w-3 h-3 rounded-full mr-2" 
                          style={{ backgroundColor: colors[index % colors.length] }}
                        ></div>
                        <span className="text-xs text-gray-600 dark:text-gray-400">{sector.sector}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Actions Section */}
        <motion.div 
          className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Impact Reports</h3>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download PDF Report
              </Button>
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                </svg>
                Share Report
              </Button>
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
                Print Report
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
} 