'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '../../../components/layout/MainLayout';
import Button from '../../../components/ui/Button';

// Types
interface BusinessMetric {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
}

interface TransactionData {
  month: string;
  value: number;
}

interface BusinessData {
  name: string;
  transactions: number;
  impact: number;
  revenue: string;
}

export default function BusinessAnalytics() {
  const [timeframe, setTimeframe] = useState<'month' | 'quarter' | 'year'>('month');
  
  // Mock data - in a real app this would come from an API
  const businessMetrics: BusinessMetric[] = [
    {
      title: 'Total Transactions',
      value: '2,856',
      change: 15.3,
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
        </svg>
      )
    },
    {
      title: 'Revenue Saved',
      value: '$45,821',
      change: 23.7,
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Business Users',
      value: '542',
      change: 8.9,
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    },
    {
      title: 'Avg. Transaction Size',
      value: '$328',
      change: 4.2,
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      )
    }
  ];
  
  const monthlyTransactionData: TransactionData[] = [
    { month: 'Jan', value: 125 },
    { month: 'Feb', value: 145 },
    { month: 'Mar', value: 158 },
    { month: 'Apr', value: 178 },
    { month: 'May', value: 210 },
    { month: 'Jun', value: 235 },
    { month: 'Jul', value: 256 },
    { month: 'Aug', value: 278 },
    { month: 'Sep', value: 302 },
    { month: 'Oct', value: 325 },
    { month: 'Nov', value: 342 },
    { month: 'Dec', value: 302 }
  ];
  
  const quarterlyTransactionData: TransactionData[] = [
    { month: 'Q1', value: 428 },
    { month: 'Q2', value: 623 },
    { month: 'Q3', value: 836 },
    { month: 'Q4', value: 969 }
  ];
  
  const yearlyTransactionData: TransactionData[] = [
    { month: '2020', value: 1854 },
    { month: '2021', value: 2105 },
    { month: '2022', value: 2458 },
    { month: '2023', value: 2856 }
  ];
  
  const getTransactionData = () => {
    switch (timeframe) {
      case 'month':
        return monthlyTransactionData;
      case 'quarter':
        return quarterlyTransactionData;
      case 'year':
        return yearlyTransactionData;
      default:
        return monthlyTransactionData;
    }
  };
  
  const topBusinesses: BusinessData[] = [
    { name: 'Green Solutions Ltd', transactions: 256, impact: 89, revenue: '$28,450' },
    { name: 'EcoTech Industries', transactions: 182, impact: 75, revenue: '$23,120' },
    { name: 'Sustainable Futures', transactions: 154, impact: 92, revenue: '$19,650' },
    { name: 'Resource Innovations', transactions: 148, impact: 78, revenue: '$18,925' },
    { name: 'Circular Systems', transactions: 135, impact: 84, revenue: '$17,580' },
  ];
  
  // Calculate max value for chart scaling
  const maxTransactionValue = Math.max(...getTransactionData().map(d => d.value));
  
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

  const topMarkets = [
    { market: 'North America', percentage: 35, growth: 12.8 },
    { market: 'Europe', percentage: 28, growth: 8.5 },
    { market: 'Asia Pacific', percentage: 22, growth: 15.3 },
    { market: 'Africa', percentage: 10, growth: 18.7 },
    { market: 'South America', percentage: 5, growth: 7.2 },
  ];

  const revenueBreakdown = [
    { category: 'Equipment Sales', amount: 28450, percentage: 45 },
    { category: 'Resource Sharing', amount: 15680, percentage: 25 },
    { category: 'Certifications', amount: 9432, percentage: 15 },
    { category: 'Consultation Services', amount: 6285, percentage: 10 },
    { category: 'Other Services', amount: 3142, percentage: 5 },
  ];

  const businessMetricsTrend = [
    { month: 'Jan', transactions: 210, users: 420, revenue: 18200 },
    { month: 'Feb', transactions: 245, users: 445, revenue: 21500 },
    { month: 'Mar', transactions: 285, users: 472, revenue: 25800 },
    { month: 'Apr', transactions: 312, users: 498, revenue: 28900 },
    { month: 'May', transactions: 350, users: 515, revenue: 32400 },
    { month: 'Jun', transactions: 386, users: 542, revenue: 36800 },
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
          <h1 className="text-3xl font-bold mb-2">Business Analytics</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track business performance and transaction metrics
          </p>
        </motion.div>
        
        {/* Timeframe selector */}
        {renderTimeframeSelector()}
        
        {/* Business Metrics */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {businessMetrics.map((metric, index) => (
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
        
        {/* Transaction Trend Chart */}
        <motion.div 
          className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Transaction Trend</h3>
            <div className="h-64">
              <div className="h-full flex items-end justify-between">
                {getTransactionData().map((item, index) => (
                  <div key={item.month} className="flex flex-col items-center group">
                    <motion.div
                      className="w-8 bg-primary rounded-t-md relative mx-1"
                      initial={{ height: 0 }}
                      animate={{ 
                        height: `${(item.value / maxTransactionValue) * 100}%`,
                        transition: { delay: 0.5 + index * 0.05, duration: 0.8, ease: "easeOut" }
                      }}
                    >
                      <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-primary text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                        {item.value} transactions
                      </div>
                    </motion.div>
                    <div className="mt-2 text-xs text-gray-500">{item.month}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Business Category Distribution */}
        <motion.div 
          className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Business Categories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300">Manufacturing</span>
                    <span className="text-gray-600 dark:text-gray-400">35%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <motion.div 
                      className="bg-primary h-2.5 rounded-full" 
                      initial={{ width: 0 }}
                      animate={{ width: '35%' }}
                      transition={{ delay: 0.6, duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300">Retail</span>
                    <span className="text-gray-600 dark:text-gray-400">25%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <motion.div 
                      className="bg-primary h-2.5 rounded-full" 
                      initial={{ width: 0 }}
                      animate={{ width: '25%' }}
                      transition={{ delay: 0.7, duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300">Food & Beverage</span>
                    <span className="text-gray-600 dark:text-gray-400">18%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <motion.div 
                      className="bg-primary h-2.5 rounded-full" 
                      initial={{ width: 0 }}
                      animate={{ width: '18%' }}
                      transition={{ delay: 0.8, duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300">Technology</span>
                    <span className="text-gray-600 dark:text-gray-400">15%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
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
                    <span className="text-gray-700 dark:text-gray-300">Services</span>
                    <span className="text-gray-600 dark:text-gray-400">5%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <motion.div 
                      className="bg-primary h-2.5 rounded-full" 
                      initial={{ width: 0 }}
                      animate={{ width: '5%' }}
                      transition={{ delay: 1.0, duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-700 dark:text-gray-300">Other</span>
                    <span className="text-gray-600 dark:text-gray-400">2%</span>
                  </div>
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <motion.div 
                      className="bg-primary h-2.5 rounded-full" 
                      initial={{ width: 0 }}
                      animate={{ width: '2%' }}
                      transition={{ delay: 1.1, duration: 0.8 }}
                    ></motion.div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Top Performing Businesses */}
        <motion.div 
          className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Top Performing Businesses</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Business Name</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transactions</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Impact Score</th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Revenue Saved</th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-neutral-dark divide-y divide-gray-200 dark:divide-gray-700">
                  {topBusinesses.map((business, index) => (
                    <motion.tr 
                      key={business.name}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.6 + index * 0.1, duration: 0.3 }}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="font-medium text-gray-900 dark:text-white">{business.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{business.transactions}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <span className="text-sm text-gray-500 dark:text-gray-400 mr-2">{business.impact}/100</span>
                          <div className="w-16 bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                            <div className="bg-primary h-1.5 rounded-full" style={{ width: `${business.impact}%` }}></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{business.revenue}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 text-right">
              <Button variant="outline" size="sm">View All Businesses</Button>
            </div>
          </div>
        </motion.div>
        
        {/* Business Growth Prediction */}
        <motion.div 
          className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
        >
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4">Business Growth Prediction</h3>
            <div className="bg-primary/10 border border-primary/20 rounded-lg p-4 mb-4">
              <div className="flex items-start">
                <div className="p-2 rounded-full bg-primary/20 text-primary mr-4">
                  <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                </div>
                <div>
                  <h4 className="text-primary font-medium mb-1">Projected Growth</h4>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">
                    Based on current trends, we project a <span className="font-semibold">23% increase</span> in business activity over the next quarter.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">+18%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">New Users</div>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">+25%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Transaction Volume</div>
              </div>
              <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary">+31%</div>
                <div className="text-sm text-gray-500 dark:text-gray-400">Environmental Impact</div>
              </div>
            </div>
            
            <div className="mt-4 text-right">
              <Button variant="outline" size="sm">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
                Download Business Report
              </Button>
            </div>
          </div>
        </motion.div>

        <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Top Markets</h3>
          <div className="space-y-4">
            {topMarkets.map((market, index) => (
              <div key={market.market}>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-700 dark:text-gray-300">{market.market}</span>
                  <div className="flex items-center">
                    <span className="text-gray-600 dark:text-gray-400 mr-2">{market.percentage}%</span>
                    <span className="text-xs text-green-500">+{market.growth}%</span>
                  </div>
                </div>
                <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                  <motion.div 
                    className="bg-primary h-2.5 rounded-full" 
                    initial={{ width: 0 }}
                    animate={{ width: `${market.percentage}%` }}
                    transition={{ delay: 0.9 + (index * 0.1), duration: 0.8 }}
                  ></motion.div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold mb-4">Business Metrics Trend</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-2">
              <div className="h-64">
                <div className="h-full flex items-end">
                  {businessMetricsTrend.map((item, index) => (
                    <div key={item.month} className="w-full flex-1 flex flex-col items-center group">
                      <div className="w-full flex justify-center items-end h-full space-x-1">
                        <motion.div
                          className="w-3 bg-primary rounded-t-md relative"
                          initial={{ height: 0 }}
                          animate={{ 
                            height: `${(item.transactions / 400) * 100}%`,
                            transition: { delay: 0.5 + index * 0.05, duration: 0.8, ease: "easeOut" }
                          }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-primary text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {item.transactions} transactions
                          </div>
                        </motion.div>
                        
                        <motion.div
                          className="w-3 bg-blue-500 rounded-t-md relative"
                          initial={{ height: 0 }}
                          animate={{ 
                            height: `${(item.users / 600) * 100}%`,
                            transition: { delay: 0.55 + index * 0.05, duration: 0.8, ease: "easeOut" }
                          }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {item.users} users
                          </div>
                        </motion.div>
                        
                        <motion.div
                          className="w-3 bg-green-500 rounded-t-md relative"
                          initial={{ height: 0 }}
                          animate={{ 
                            height: `${(item.revenue / 40000) * 100}%`,
                            transition: { delay: 0.6 + index * 0.05, duration: 0.8, ease: "easeOut" }
                          }}
                        >
                          <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            ${item.revenue}
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
                  <div className="w-3 h-3 bg-primary rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Transactions</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Users</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">Revenue ($)</span>
                </div>
              </div>
            </div>
            
            <div>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 mb-4">
                <h4 className="text-sm font-medium mb-2">Revenue Breakdown</h4>
                <div className="space-y-3">
                  {revenueBreakdown.map((item, index) => (
                    <div key={item.category}>
                      <div className="flex justify-between text-xs mb-1">
                        <span>{item.category}</span>
                        <span className="font-medium">${item.amount.toLocaleString()}</span>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5">
                        <motion.div 
                          className="bg-green-500 h-1.5 rounded-full" 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.percentage}%` }}
                          transition={{ delay: 0.7 + (index * 0.1), duration: 0.8 }}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <div className="text-center text-sm text-gray-500 mt-4">
                <div className="font-medium text-xl text-primary">
                  $62,988
                </div>
                <div>Total Revenue</div>
                <div className="text-green-500 text-xs mt-1">
                  +23.7% from last period
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 