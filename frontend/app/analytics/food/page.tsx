'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';
import Button from '../../../components/ui/Button';

// Types
interface FoodMetric {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

export default function FoodWasteAnalytics() {
  const [timeframe, setTimeframe] = useState<'month' | 'quarter' | 'year'>('month');
  
  // Mock data - in a real app this would come from an API
  const foodMetrics: FoodMetric[] = [
    {
      title: 'Food Waste Saved',
      value: '5,230 kg',
      change: 18.3,
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 15.546c-.523 0-1.046.151-1.5.454a2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.704 2.704 0 01-3 0 2.704 2.704 0 00-3 0 2.701 2.701 0 00-1.5-.454M9 6v2m3-2v2m3-2v2M9 3h.01M12 3h.01M15 3h.01M21 21v-7a2 2 0 00-2-2H5a2 2 0 00-2 2v7h18zm-3-9v-2a2 2 0 00-2-2H8a2 2 0 00-2 2v2h12z" />
        </svg>
      )
    },
    {
      title: 'CO₂ Emissions Prevented',
      value: '1,780 kg',
      change: 15.7,
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Value Recovered',
      value: '$15,690',
      change: 12.8,
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Participating Stores',
      value: '132',
      change: 8.2,
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
        </svg>
      )
    }
  ];
  
  // Create more detailed monthly waste trend data
  const monthlyWasteTrend = [
    { month: 'Jan', reduction: 42, diversion: 38, recovery: 32 },
    { month: 'Feb', reduction: 48, diversion: 41, recovery: 35 },
    { month: 'Mar', reduction: 53, diversion: 45, recovery: 37 },
    { month: 'Apr', reduction: 61, diversion: 52, recovery: 43 },
    { month: 'May', reduction: 68, diversion: 57, recovery: 48 },
    { month: 'Jun', reduction: 72, diversion: 62, recovery: 53 },
    { month: 'Jul', reduction: 79, diversion: 65, recovery: 56 },
    { month: 'Aug', reduction: 84, diversion: 71, recovery: 59 },
    { month: 'Sep', reduction: 89, diversion: 75, recovery: 63 },
    { month: 'Oct', reduction: 94, diversion: 78, recovery: 68 },
    { month: 'Nov', reduction: 98, diversion: 82, recovery: 71 },
    { month: 'Dec', reduction: 105, diversion: 87, recovery: 74 },
  ];
  
  // Create detailed food categories data
  const foodCategories = [
    { 
      category: 'Produce', 
      percentage: 32, 
      wasteReduction: 186, 
      topItems: ['Bananas', 'Apples', 'Tomatoes'],
      color: '#4CAF50' 
    },
    { 
      category: 'Dairy', 
      percentage: 18, 
      wasteReduction: 104, 
      topItems: ['Milk', 'Yogurt', 'Cheese'],
      color: '#2196F3' 
    },
    { 
      category: 'Bakery', 
      percentage: 22, 
      wasteReduction: 127, 
      topItems: ['Bread', 'Pastries', 'Rolls'],
      color: '#FFC107' 
    },
    { 
      category: 'Meat & Seafood', 
      percentage: 15, 
      wasteReduction: 87, 
      topItems: ['Chicken', 'Fish', 'Ground Beef'],
      color: '#F44336' 
    },
    { 
      category: 'Prepared Foods', 
      percentage: 13, 
      wasteReduction: 75, 
      topItems: ['Salads', 'Sandwiches', 'Hot Bar'],
      color: '#9C27B0' 
    },
  ];
  
  // Top participating stores data
  const topStores = [
    { name: 'Organic Market #231', location: 'San Francisco, CA', reduction: 532, savings: 12380 },
    { name: 'Fresh Foods Co-op', location: 'Portland, OR', reduction: 478, savings: 11240 },
    { name: 'Green Grocers #15', location: 'Seattle, WA', reduction: 423, savings: 9870 },
    { name: 'Sustainable Eats', location: 'Austin, TX', reduction: 395, savings: 8340 },
    { name: 'EcoMart #42', location: 'Boulder, CO', reduction: 342, savings: 7650 },
  ];
  
  // Environmental impact calculations
  const environmentalImpact = {
    waterSaved: 3245000, // liters
    landPreserved: 1872, // square meters
    energyConserved: 23450, // kWh
    fertilizer: 1230, // kg
  };
  
  const maxWasteAmount = Math.max(...monthlyWasteTrend.map(item => item.reduction));
  
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
            onClick={() => setTimeframe(period as 'month' | 'quarter' | 'year')}
            className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
              timeframe === period 
                ? 'bg-white dark:bg-gray-700 shadow-sm' 
                : 'text-gray-500 dark:text-gray-400'
            }`}
            whileHover={{ 
              backgroundColor: timeframe === period 
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
          <h1 className="text-3xl font-bold mb-2">Food Waste Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track and analyze food waste reduction metrics
          </p>
        </motion.div>
        
        {/* Timeframe selector */}
        {renderTimeframeSelector()}
        
        {/* Food Waste Metrics */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {foodMetrics.map((metric, index) => (
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
                    <div className="text-2xl font-bold mt-2">{metric.value}</div>
                  </div>
                  <div className="p-2 rounded-full bg-primary/10 text-primary">
                    {metric.icon}
                  </div>
                </div>
                <div className={`mt-4 flex items-center text-sm ${metric.change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.change >= 0 ? (
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                    </svg>
                  )}
                  <span>{Math.abs(metric.change)}% from last period</span>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Food Waste Trend Chart */}
        <motion.div 
          className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Food Waste Reduction Trend</h3>
            <div className="h-64">
              <div className="h-full flex items-end justify-between">
                {monthlyWasteTrend.map((item, index) => (
                  <div key={item.month} className="flex flex-col items-center group">
                    <motion.div
                      className="w-8 bg-primary rounded-t-md relative mx-1"
                      initial={{ height: 0 }}
                      animate={{ 
                        height: `${(item.reduction / maxWasteAmount) * 100}%`,
                        transition: { delay: 0.5 + index * 0.05, duration: 0.8, ease: "easeOut" }
                      }}
                    >
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-primary text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.reduction} kg
                      </div>
                    </motion.div>
                    <div className="mt-2 text-xs text-gray-500">{item.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Food Categories */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          {/* Food Categories Distribution */}
          <motion.div 
            className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Food Categories Distribution</h3>
              <div className="space-y-4">
                {foodCategories.map((category, index) => (
                  <div key={category.category}>
                    <div className="flex justify-between mb-1">
                      <span className="text-gray-700 dark:text-gray-300">{category.category}</span>
                      <span className="text-gray-600 dark:text-gray-400">{category.percentage}%</span>
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                      <motion.div 
                        className="h-2.5 rounded-full" 
                        style={{ backgroundColor: category.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${category.percentage}%` }}
                        transition={{ delay: 0.6 + (index * 0.1), duration: 0.8 }}
                      ></motion.div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
          
          {/* Visualized Pie Chart (placeholder) */}
          <motion.div 
            className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Visual Distribution</h3>
              <div className="flex items-center justify-center h-64">
                <div className="relative w-40 h-40">
                  {foodCategories.map((category, index) => {
                    const previousPercentages = foodCategories
                      .slice(0, index)
                      .reduce((sum, cat) => sum + cat.percentage, 0);
                    const rotateStart = (previousPercentages / 100) * 360;
                    
                    return (
                      <motion.div 
                        key={category.category}
                        className="absolute inset-0"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.6 + (index * 0.1), duration: 0.4 }}
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
                              transform: `rotate(${category.percentage * 3.6}deg)`,
                              backgroundColor: category.color
                            }}
                          ></div>
                        </div>
                      </motion.div>
                    );
                  })}
                  <div className="absolute inset-4 rounded-full bg-white dark:bg-neutral-dark"></div>
                </div>
              </div>
              <div className="flex flex-wrap justify-center mt-4 gap-4">
                {foodCategories.map((category) => (
                  <div key={category.category} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2" 
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-xs text-gray-600 dark:text-gray-400">{category.category}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
        
        {/* Food Waste Impact */}
        <motion.div 
          className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Environmental Impact</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-primary/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-primary mb-2">1,780</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">kg CO₂ Emissions Saved</div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Equivalent to planting 89 trees</div>
              </div>
              <div className="bg-blue-500/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-blue-500 mb-2">8,450</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">Liters of Water Saved</div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Equivalent to 56 households&apos; daily usage</div>
              </div>
              <div className="bg-yellow-500/10 rounded-lg p-4 text-center">
                <div className="text-3xl font-bold text-yellow-500 mb-2">2,120</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">kWh Energy Saved</div>
                <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">Equivalent to powering 70 homes for a day</div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Top Participating Stores */}
        <motion.div 
          className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Participating Stores</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Store Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Waste Saved (kg)</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Items Saved</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Value Recovered</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-neutral-dark divide-y divide-gray-200 dark:divide-gray-700">
                  {[
                    { name: 'Fresh Market', waste: 385, items: 1243, value: '$3,120' },
                    { name: 'Green Grocers', waste: 312, items: 985, value: '$2,845' },
                    { name: 'City Supermarket', waste: 295, items: 876, value: '$2,150' },
                    { name: 'Organic Foods', waste: 268, items: 732, value: '$1,985' },
                    { name: 'Downtown Bakery', waste: 252, items: 625, value: '$1,720' },
                  ].map((store, index) => (
                    <motion.tr 
                      key={store.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1, duration: 0.3 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900 dark:text-white">{store.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{store.waste}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{store.items}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{store.value}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <Button variant="outline" size="sm">View All Stores</Button>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <motion.div 
            className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6"
            variants={fadeIn}
          >
            <h3 className="text-lg font-semibold mb-4">Monthly Waste Trend</h3>
            <div className="h-64">
              <div className="h-full flex items-end">
                {monthlyWasteTrend.map((item, index) => (
                  <div key={item.month} className="w-full flex-1 flex flex-col items-center group">
                    <div className="w-full flex justify-center items-end h-full space-x-1">
                      <motion.div
                        className="w-2 bg-green-600 rounded-t-sm relative"
                        initial={{ height: 0 }}
                        animate={{ 
                          height: `${(item.reduction / 110) * 100}%`,
                          transition: { delay: 0.5 + index * 0.03, duration: 0.8, ease: "easeOut" }
                        }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-600 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.reduction} kg reduced
                        </div>
                      </motion.div>
                      
                      <motion.div
                        className="w-2 bg-blue-500 rounded-t-sm relative"
                        initial={{ height: 0 }}
                        animate={{ 
                          height: `${(item.diversion / 110) * 100}%`,
                          transition: { delay: 0.55 + index * 0.03, duration: 0.8, ease: "easeOut" }
                        }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.diversion} kg diverted
                        </div>
                      </motion.div>
                      
                      <motion.div
                        className="w-2 bg-amber-500 rounded-t-sm relative"
                        initial={{ height: 0 }}
                        animate={{ 
                          height: `${(item.recovery / 110) * 100}%`,
                          transition: { delay: 0.6 + index * 0.03, duration: 0.8, ease: "easeOut" }
                        }}
                      >
                        <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-amber-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                          {item.recovery} kg recovered
                        </div>
                      </motion.div>
                    </div>
                    <div className="mt-2 text-xs text-gray-500">{item.month}</div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex justify-center mt-4 space-x-6">
              <div className="flex items-center">
                <div className="w-3 h-3 bg-green-600 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Reduction</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Diversion</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 bg-amber-500 rounded-full mr-2"></div>
                <span className="text-xs text-gray-600 dark:text-gray-400">Recovery</span>
              </div>
            </div>
          </motion.div>

          <motion.div 
            className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6"
            variants={fadeIn}
          >
            <h3 className="text-lg font-semibold mb-4">Food Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <div className="relative h-64 w-full">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-2xl font-bold">579 kg</div>
                      <div className="text-sm text-gray-500">Total Waste Reduced</div>
                    </div>
                  </div>
                  <svg className="w-full h-full" viewBox="0 0 100 100">
                    {foodCategories.map((category, index) => {
                      const previousPercentages = foodCategories
                        .slice(0, index)
                        .reduce((sum, cat) => sum + cat.percentage, 0);
                      
                      const offset = previousPercentages;
                      const dashArray = category.percentage;
                      
                      return (
                        <motion.circle
                          key={category.category}
                          cx="50"
                          cy="50"
                          r="40"
                          fill="none"
                          stroke={category.color}
                          strokeWidth="15"
                          strokeDasharray={`${dashArray} ${100 - dashArray}`}
                          strokeDashoffset={100 - offset}
                          initial={{ strokeDashoffset: 100 }}
                          animate={{ 
                            strokeDashoffset: 100 - offset,
                            transition: { delay: 0.5 + (index * 0.1), duration: 0.8 }
                          }}
                          transform="rotate(-90 50 50)"
                        />
                      );
                    })}
                  </svg>
                </div>
                <div className="flex flex-wrap justify-center mt-4">
                  {foodCategories.map((category) => (
                    <div key={category.category} className="flex items-center mr-4 mb-2">
                      <div 
                        className="w-3 h-3 rounded-full mr-1"
                        style={{ backgroundColor: category.color }}
                      ></div>
                      <span className="text-xs text-gray-600 dark:text-gray-400">
                        {category.category} ({category.percentage}%)
                      </span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                {foodCategories.map((category, index) => (
                  <motion.div 
                    key={category.category}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.7 + (index * 0.1) }
                    }}
                  >
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{category.category}</span>
                      <span>{category.wasteReduction} kg</span>
                    </div>
                    <div className="text-xs text-gray-500 mb-1">
                      Top items: {category.topItems.join(', ')}
                    </div>
                    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <motion.div 
                        className="h-2 rounded-full" 
                        style={{ backgroundColor: category.color }}
                        initial={{ width: 0 }}
                        animate={{ width: `${category.percentage * 2}%` }}
                        transition={{ delay: 0.8 + (index * 0.1), duration: 0.5 }}
                      ></motion.div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>

        <motion.div 
          className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6 mb-6"
          variants={fadeIn}
        >
          <h3 className="text-lg font-semibold mb-4">Environmental Impact</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg text-center">
              <motion.div
                className="text-2xl font-bold text-green-600 dark:text-green-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.5 }}
              >
                {(environmentalImpact.waterSaved / 1000).toLocaleString()}k
              </motion.div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Liters of Water Saved</div>
            </div>
            
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg text-center">
              <motion.div
                className="text-2xl font-bold text-blue-600 dark:text-blue-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
              >
                {environmentalImpact.landPreserved.toLocaleString()}
              </motion.div>
              <div className="text-sm text-gray-600 dark:text-gray-400">m² Land Preserved</div>
            </div>
            
            <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg text-center">
              <motion.div
                className="text-2xl font-bold text-amber-600 dark:text-amber-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.5 }}
              >
                {environmentalImpact.energyConserved.toLocaleString()}
              </motion.div>
              <div className="text-sm text-gray-600 dark:text-gray-400">kWh Energy Conserved</div>
            </div>
            
            <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg text-center">
              <motion.div
                className="text-2xl font-bold text-purple-600 dark:text-purple-400"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
              >
                {environmentalImpact.fertilizer.toLocaleString()}
              </motion.div>
              <div className="text-sm text-gray-600 dark:text-gray-400">kg Fertilizer Reduced</div>
            </div>
          </div>
        </motion.div>

        <motion.div 
          className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6"
          variants={fadeIn}
        >
          <h3 className="text-lg font-semibold mb-4">Top Participating Stores</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-800">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Store</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Location</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Waste Reduction (kg)</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Cost Savings ($)</th>
                </tr>
              </thead>
              <tbody className="bg-white dark:bg-neutral-dark divide-y divide-gray-200 dark:divide-gray-700">
                {topStores.map((store, index) => (
                  <motion.tr 
                    key={store.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ 
                      opacity: 1, 
                      y: 0,
                      transition: { delay: 0.8 + (index * 0.1) }
                    }}
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{store.name}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{store.location}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <div className="flex items-center">
                        <span className="text-green-600 dark:text-green-400 font-medium">{store.reduction}</span>
                        <div className="ml-2 w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                          <motion.div 
                            className="bg-green-500 h-1.5 rounded-full" 
                            initial={{ width: 0 }}
                            animate={{ width: `${(store.reduction / 550) * 100}%` }}
                            transition={{ delay: 0.9 + (index * 0.1), duration: 0.8 }}
                          ></motion.div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                      <span className="text-primary font-medium">${store.savings.toLocaleString()}</span>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
} 