'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import React from 'react';

// Types
interface MetricCardProps {
  title: string;
  value: string;
  change: number;
  icon: React.ReactNode;
  delay?: number;
  key?: string | number;
}

interface ChartData {
  label: string;
  value: number;
}

export default function AnalyticsDashboard() {
  const [timeframe, setTimeframe] = useState<'week' | 'month' | 'year'>('month');
  const [activeTab, setActiveTab] = useState<'overview' | 'impact' | 'business' | 'food'>('overview');

  // Mock data - in a real app this would come from an API
  const overviewMetrics = [
    {
      title: 'Total Impact',
      value: '1,256 kg',
      change: 12.5,
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      title: 'Resources Saved',
      value: '$15,245',
      change: 8.3,
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    },
    {
      title: 'Users Active',
      value: '2,542',
      change: 5.2,
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
        </svg>
      )
    },
    {
      title: 'Carbon Offset',
      value: '845 kg',
      change: -3.5,
      icon: (
        <svg className="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      )
    }
  ];

  const impactChartData: ChartData[] = [
    { label: 'Jan', value: 32 },
    { label: 'Feb', value: 45 },
    { label: 'Mar', value: 58 },
    { label: 'Apr', value: 72 },
    { label: 'May', value: 84 },
    { label: 'Jun', value: 96 },
    { label: 'Jul', value: 112 },
    { label: 'Aug', value: 128 },
    { label: 'Sep', value: 116 },
    { label: 'Oct', value: 98 },
    { label: 'Nov', value: 87 },
    { label: 'Dec', value: 76 },
  ];

  const businessDistribution = [
    { label: 'Manufacturing', value: 35, growth: 12.3 },
    { label: 'Retail', value: 25, growth: 8.7 },
    { label: 'Services', value: 20, growth: 15.2 },
    { label: 'Tech', value: 15, growth: 18.6 },
    { label: 'Other', value: 5, growth: 3.1 },
  ];

  const maxChartValue = Math.max(...impactChartData.map(item => item.value));

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

  const renderMetricCard = ({ title, value, change, icon, delay = 0 }: MetricCardProps) => (
    <motion.div 
      className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1, duration: 0.5 }}
      whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
    >
      <div className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-gray-500 dark:text-gray-400 text-sm font-medium">{title}</h3>
            <div className="text-2xl font-bold mt-2">{value}</div>
          </div>
          <div className="p-2 rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        </div>
        <div className={`mt-4 flex items-center text-sm ${change >= 0 ? 'text-green-500' : 'text-red-500'}`}>
          {change >= 0 ? (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
            </svg>
          ) : (
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          )}
          <span>{Math.abs(change)}% from last period</span>
        </div>
      </div>
    </motion.div>
  );

  const renderTimeframeSelector = () => (
    <div className="flex justify-center mb-8">
      <div className="inline-flex p-1 space-x-1 bg-gray-100 dark:bg-neutral-dark rounded-lg">
        {['week', 'month', 'year'].map((period) => (
          <motion.button
            key={period}
            onClick={() => setTimeframe(period as 'week' | 'month' | 'year')}
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

  const renderTabSelector = () => (
    <div className="mb-8 border-b dark:border-gray-700">
      <div className="flex space-x-8">
        {[
          { id: 'overview', label: 'Overview' },
          { id: 'impact', label: 'Environmental Impact' },
          { id: 'business', label: 'Business Metrics' },
          { id: 'food', label: 'Food Waste Reduction' }
        ].map((tab) => (
          <motion.button
            key={tab.id}
            onClick={() => setActiveTab(tab.id as any)}
            className={`pb-4 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id 
                ? 'border-primary text-primary' 
                : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
            }`}
            whileTap={{ scale: 0.98 }}
          >
            {tab.label}
          </motion.button>
        ))}
      </div>
    </div>
  );

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {overviewMetrics.map((metric, index) => (
                <motion.div 
                  key={metric.title}
                  className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
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
            </div>
            
            <motion.div variants={fadeIn} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Environmental Impact Trend</h3>
                <div className="h-64">
                  <div className="h-full flex items-end justify-between">
                    {impactChartData.map((item, index) => (
                      <div key={item.label} className="flex flex-col items-center group">
                        <motion.div
                          className="w-8 bg-primary rounded-t-md relative mx-1"
                          initial={{ height: 0 }}
                          animate={{ 
                            height: `${(item.value / maxChartValue) * 100}%`,
                            transition: { delay: 0.5 + index * 0.05, duration: 0.8, ease: "easeOut" }
                          }}
                        >
                          <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-primary text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                            {item.value} kg
                          </div>
                        </motion.div>
                        <div className="mt-2 text-xs text-gray-500">{item.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Distribution by Industry</h3>
                <div className="space-y-4">
                  {businessDistribution.map((item, index) => (
                    <div key={item.label}>
                      <div className="flex justify-between mb-1">
                        <span className="text-gray-700 dark:text-gray-300">{item.label}</span>
                        <div className="flex items-center">
                          <span className="text-gray-600 dark:text-gray-400 mr-2">{item.value}%</span>
                          <span className="text-xs text-green-500">+{item.growth}%</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                        <motion.div 
                          className="bg-primary h-2 rounded-full" 
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ delay: 0.7 + (index * 0.1), duration: 0.8 }}
                        ></motion.div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        );
      case 'impact':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Environmental impact detailed metrics would go here */}
              <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Carbon Footprint Reduction</h3>
                <div className="h-64">
                  <div className="flex items-center justify-center h-full">
                    <div className="w-full h-full flex items-end justify-between">
                      {[
                        { month: 'Jan', value: 245 },
                        { month: 'Feb', value: 285 },
                        { month: 'Mar', value: 332 },
                        { month: 'Apr', value: 378 },
                        { month: 'May', value: 410 },
                        { month: 'Jun', value: 458 }
                      ].map((item, index) => (
                        <div key={item.month} className="flex flex-col items-center group">
                          <motion.div
                            className="w-8 bg-green-500 rounded-t-md relative mx-1"
                            initial={{ height: 0 }}
                            animate={{ 
                              height: `${(item.value / 458) * 100}%`,
                              transition: { delay: 0.5 + index * 0.05, duration: 0.8, ease: "easeOut" }
                            }}
                          >
                            <div className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-green-500 text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
                              {item.value} kg CO₂
                            </div>
                          </motion.div>
                          <div className="mt-2 text-xs text-gray-500">{item.month}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Resource Conservation</h3>
                <div className="h-64">
                  {/* Placeholder for resource conservation chart */}
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Resource conservation visualization
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Impact Report</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Detailed analysis of environmental impact metrics and sustainability achievements.
              </p>
              <Button size="sm" variant="outline">Download Full Report</Button>
            </div>
          </motion.div>
        );
      case 'business':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Business metrics would go here */}
              <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Transaction Volume</h3>
                <div className="h-64">
                  {/* Placeholder for transaction volume chart */}
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Transaction volume visualization
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">User Growth</h3>
                <div className="h-64">
                  {/* Placeholder for user growth chart */}
                  <div className="flex items-center justify-center h-full text-gray-400">
                    User growth visualization
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Top Performing Businesses</h3>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                  <thead>
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Business</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Transactions</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Impact Score</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Growth</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800">
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">Company {i}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{Math.floor(Math.random() * 100) + 50}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{Math.floor(Math.random() * 50) + 70}/100</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-green-500">+{Math.floor(Math.random() * 20) + 5}%</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </motion.div>
        );
      case 'food':
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
              {/* Food waste metrics would go here */}
              <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Food Waste Savings</h3>
                <div className="h-64">
                  {/* Placeholder for food waste savings chart */}
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Food waste reduction visualization
                  </div>
                </div>
              </div>
              
              <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Food Categories</h3>
                <div className="h-64">
                  {/* Placeholder for food categories chart */}
                  <div className="flex items-center justify-center h-full text-gray-400">
                    Food categories visualization
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
              <h3 className="text-lg font-semibold mb-4">Food Impact Report</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Analysis of food waste reduction and its environmental impact.
              </p>
              <Button size="sm" variant="outline">Download Report</Button>
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

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
          <h1 className="text-3xl font-bold mb-2">Analytics & Impact Dashboard</h1>
          <p className="text-gray-600 dark:text-gray-400">
            Track your environmental impact and business metrics in real-time
          </p>
        </motion.div>
        
        {/* Timeframe selector */}
        {renderTimeframeSelector()}
        
        {/* Tab selector */}
        {renderTabSelector()}
        
        {/* Tab content */}
        {renderTabContent()}
      </div>
    </MainLayout>
  );
} 