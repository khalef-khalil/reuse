'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import React from 'react';
import Link from 'next/link';
import {
  AreaChart, Area, BarChart, Bar, LineChart, Line, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

// Types
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

  const impactChartData = [
    { name: 'Jan', value: 32 },
    { name: 'Feb', value: 45 },
    { name: 'Mar', value: 58 },
    { name: 'Apr', value: 72 },
    { name: 'May', value: 84 },
    { name: 'Jun', value: 96 },
    { name: 'Jul', value: 112 },
    { name: 'Aug', value: 128 },
    { name: 'Sep', value: 116 },
    { name: 'Oct', value: 98 },
    { name: 'Nov', value: 87 },
    { name: 'Dec', value: 76 },
  ];

  const businessDistribution = [
    { name: 'Manufacturing', value: 35, growth: 12.3 },
    { name: 'Retail', value: 25, growth: 8.7 },
    { name: 'Services', value: 20, growth: 15.2 },
    { name: 'Tech', value: 15, growth: 18.6 },
    { name: 'Other', value: 5, growth: 3.1 },
  ];

  const resourceConservationData = [
    { name: 'Water', value: 4200 },
    { name: 'Energy', value: 3500 },
    { name: 'Materials', value: 5800 },
    { name: 'Land', value: 2900 },
  ];

  const transactionVolumeData = [
    { name: 'Jan', value: 25 },
    { name: 'Feb', value: 35 },
    { name: 'Mar', value: 45 },
    { name: 'Apr', value: 42 },
    { name: 'May', value: 55 },
    { name: 'Jun', value: 75 },
  ];

  const userGrowthData = [
    { name: 'Jan', value: 210 },
    { name: 'Feb', value: 325 },
    { name: 'Mar', value: 450 },
    { name: 'Apr', value: 650 },
    { name: 'May', value: 850 },
    { name: 'Jun', value: 1050 },
  ];

  const foodWasteSavingsData = [
    { name: 'Jan', value: 120 },
    { name: 'Feb', value: 140 },
    { name: 'Mar', value: 180 },
    { name: 'Apr', value: 210 },
    { name: 'May', value: 240 },
    { name: 'Jun', value: 290 },
  ];

  const foodCategoriesData = [
    { name: 'Produce', value: 40 },
    { name: 'Dairy', value: 20 },
    { name: 'Bakery', value: 15 },
    { name: 'Meat', value: 10 },
    { name: 'Other', value: 15 },
  ];

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#9146FF'];

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
            onClick={() => setActiveTab(tab.id as 'overview' | 'impact' | 'business' | 'food')}
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
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={impactChartData}
                      margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="value" stroke="#8884d8" fill="#8884d8" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Distribution by Industry</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={businessDistribution}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {businessDistribution.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
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
              <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Carbon Footprint Reduction</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={[
                        { month: 'Jan', value: 245 },
                        { month: 'Feb', value: 285 },
                        { month: 'Mar', value: 332 },
                        { month: 'Apr', value: 378 },
                        { month: 'May', value: 410 },
                        { month: 'Jun', value: 458 }
                      ]}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="CO₂ Reduction (kg)" fill="#00C49F" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Resource Conservation</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={resourceConservationData}
                      layout="vertical"
                      margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis type="number" />
                      <YAxis dataKey="name" type="category" />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Units Saved" fill="#0088FE" />
                    </BarChart>
                  </ResponsiveContainer>
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
              <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Transaction Volume</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart
                      data={transactionVolumeData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line type="monotone" dataKey="value" name="Transactions" stroke="#FF8042" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">User Growth</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart
                      data={userGrowthData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Area type="monotone" dataKey="value" name="Users" stroke="#9146FF" fill="#9146FF" fillOpacity={0.3} />
                    </AreaChart>
                  </ResponsiveContainer>
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
              <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Food Waste Savings</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={foodWasteSavingsData}
                      margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="value" name="Food Saved (kg)" fill="#FFBB28" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
              
              <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
                <h3 className="text-lg font-semibold mb-4">Food Categories</h3>
                <div className="h-64">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={foodCategoriesData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {foodCategoriesData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
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
        <div className="mb-6">
          <Link href="/business" className="flex items-center text-primary hover:underline">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Business Dashboard
          </Link>
        </div>
      
        <motion.h1 
          className="text-3xl font-bold mb-2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Analytics Dashboard
        </motion.h1>
        
        <motion.p 
          className="text-gray-600 dark:text-gray-300 mb-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Track your environmental impact and business performance
        </motion.p>
        
        {renderTimeframeSelector()}
        {renderTabSelector()}
        {renderTabContent()}
      </div>
    </MainLayout>
  );
} 