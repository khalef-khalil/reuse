'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';

// Mock business profile data
const mockBusinessProfile = {
  id: 'b123',
  name: 'EcoTech Solutions',
  logo: '/images/placeholder.png',
  description: 'Leading provider of sustainable technology solutions for businesses.',
  industry: 'Technology',
  location: 'Nairobi, Kenya',
  contactEmail: 'info@ecotech.com',
  contactPhone: '+254 123 456 789',
  website: 'https://ecotech.example.com',
  yearFounded: 2018,
  employeeCount: 45,
  sustainabilityGoals: ['Carbon Neutral by 2025', 'Zero Waste Operations', 'Sustainable Supply Chain'],
  verified: true,
};

// Mock business metrics
const mockMetrics = [
  { label: 'Active Listings', value: 12 },
  { label: 'Completed Transactions', value: 27 },
  { label: 'Waste Reduction (kg)', value: 540 },
  { label: 'CO₂ Saved (kg)', value: 320 },
];

// Mock business listings (products)
const mockListings = [
  {
    id: 'p1',
    title: 'Office Desks (Set of 4)',
    image: '/images/marketplace/office-desks.jpg',
    price: 1200,
    condition: 'Good',
    category: 'Furniture',
    quantity: 4,
    description: 'Slightly used office desks in good condition. Selling due to office downsizing.',
    createdAt: '2023-10-15',
    status: 'active',
  },
  {
    id: 'p2',
    title: 'Dell OptiPlex Desktops',
    image: '/images/marketplace/dell-desktops.jpg',
    price: 2500,
    condition: 'Excellent',
    category: 'Electronics',
    quantity: 8,
    description: 'Dell OptiPlex 7080 desktops, 3 years old but in excellent condition with i7 processors.',
    createdAt: '2023-11-20',
    status: 'active',
  },
  {
    id: 'p3',
    title: 'Conference Room Chairs',
    image: '/images/marketplace/conference-chairs.jpg',
    price: 800,
    condition: 'Fair',
    category: 'Furniture',
    quantity: 12,
    description: 'Ergonomic conference room chairs. Some wear but still functional.',
    createdAt: '2023-12-05',
    status: 'active',
  },
  {
    id: 'p4',
    title: 'Acer Projector',
    image: '/images/marketplace/acer-projector.jpg',
    price: 350,
    condition: 'Excellent',
    category: 'Electronics',
    quantity: 1,
    description: 'Acer XL1220 projector with 3000 lumens brightness, barely used with all accessories.',
    createdAt: '2024-01-10',
    status: 'active',
  },
  {
    id: 'p5',
    title: 'MacBook Pro 2022',
    image: '/images/marketplace/macbook-pro.jpg',
    price: 1800,
    condition: 'Like New',
    category: 'Electronics',
    quantity: 2,
    description: 'M1 Pro MacBook Pro, purchased in 2022. 16GB RAM, 512GB storage. Excellent condition.',
    createdAt: '2024-02-15',
    status: 'active',
  },
  {
    id: 'p6',
    title: 'HP LaserJet Printer',
    image: '/images/marketplace/hp-printer.jpg',
    price: 450,
    condition: 'Good',
    category: 'Electronics',
    quantity: 1,
    description: 'HP LaserJet Pro MFP multifunction printer. Comes with extra toner cartridges.',
    createdAt: '2024-03-01',
    status: 'active',
  },
];

// Mock conversations data (for messages tab)
const mockRecentMessages = [
  {
    id: 'conv1',
    businessName: 'GreenOffice Supplies',
    avatar: '/images/company1.png',
    lastMessage: 'I\'m interested in your LaserJet Printer. Is it still available?',
    timestamp: '2024-04-02T14:30:00Z',
    unread: true,
  },
  {
    id: 'conv2',
    businessName: 'Sustainable Furnishings',
    avatar: '/images/company2.png',
    lastMessage: 'Yes, the chairs are still available. Would you like to schedule a viewing?',
    timestamp: '2024-04-01T09:15:00Z',
    unread: false,
  },
  {
    id: 'conv3',
    businessName: 'Circular Tech',
    avatar: '/images/company4.png',
    lastMessage: 'The MacBooks have been prepared for pickup. Let me know when you can come by.',
    timestamp: '2024-03-29T11:20:00Z',
    unread: false,
  },
];

export default function BusinessDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

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

  const itemVariant = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  // Format date for display in messages
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-8"
          >
            <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-neutral-dark p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Business Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Industry:</span>
                    <span className="ml-2">{mockBusinessProfile.industry}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Location:</span>
                    <span className="ml-2">{mockBusinessProfile.location}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Year Founded:</span>
                    <span className="ml-2">{mockBusinessProfile.yearFounded}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Employees:</span>
                    <span className="ml-2">{mockBusinessProfile.employeeCount}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-neutral-dark p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-4">Contact Information</h3>
                <div className="space-y-3">
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Email:</span>
                    <span className="ml-2">{mockBusinessProfile.contactEmail}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Phone:</span>
                    <span className="ml-2">{mockBusinessProfile.contactPhone}</span>
                  </div>
                  <div>
                    <span className="text-gray-500 dark:text-gray-400">Website:</span>
                    <a href={mockBusinessProfile.website} className="ml-2 text-primary hover:underline">
                      {mockBusinessProfile.website}
                    </a>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div variants={fadeIn} className="bg-white dark:bg-neutral-dark p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-4">Sustainability Goals</h3>
              <ul className="space-y-2">
                {mockBusinessProfile.sustainabilityGoals.map((goal, index) => (
                  <li key={index} className="flex items-center">
                    <svg className="w-5 h-5 text-primary mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {goal}
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div variants={fadeIn} className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {mockMetrics.map((metric, index) => (
                <motion.div 
                  key={index}
                  className="bg-white dark:bg-neutral-dark p-4 rounded-lg shadow-md text-center"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-2xl font-bold text-primary">{metric.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );
      case 'listings':
        return (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.div variants={fadeIn} className="flex justify-between items-center">
              <h3 className="text-xl font-semibold">Your Product Listings</h3>
              <Link href="/business/new-listing">
                <Button size="sm">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  Add New Listing
                </Button>
              </Link>
            </motion.div>
            
            <motion.div variants={fadeIn} className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {mockListings.map((listing) => (
                <motion.div
                  key={listing.id}
                  variants={itemVariant}
                  className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                >
                  <div className="h-40 bg-gray-200 dark:bg-gray-700 relative overflow-hidden">
                    <Image 
                      src={listing.image} 
                      alt={listing.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                  <div className="p-4">
                    <h4 className="font-semibold text-lg mb-1">{listing.title}</h4>
                    <div className="flex items-center space-x-2 mb-2">
                      <span className="text-primary font-semibold">${listing.price}</span>
                      <span className="text-sm px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                        {listing.condition}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                      {listing.description}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {listing.quantity} available
                      </span>
                      <Link href={`/business/listings/${listing.id}`}>
                        <Button variant="outline" size="sm">Edit</Button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        );
      case 'messages':
        return (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-6"
          >
            <motion.div variants={fadeIn} className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Messages</h3>
              <Link href="/messages">
                <Button size="sm" variant="outline">
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  View All Messages
                </Button>
              </Link>
            </motion.div>
            
            {mockRecentMessages.length > 0 ? (
              <motion.div variants={fadeIn} className="space-y-4">
                {mockRecentMessages.map((conversation) => (
                  <motion.div
                    key={conversation.id}
                    variants={itemVariant}
                    className={`bg-white dark:bg-neutral-dark rounded-lg shadow-md p-4 border-l-4 ${
                      conversation.unread ? 'border-primary' : 'border-transparent'
                    }`}
                    whileHover={{ 
                      x: 5,
                      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)"
                    }}
                  >
                    <Link href="/messages" className="block">
                      <div className="flex items-center">
                        <div className="relative flex-shrink-0 w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                          <span className="text-gray-500 text-xs">Logo</span>
                          {conversation.unread && (
                            <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
                          )}
                        </div>
                        <div className="flex-grow min-w-0">
                          <div className="flex justify-between items-center mb-1">
                            <h4 className="font-medium truncate">{conversation.businessName}</h4>
                            <span className="text-xs text-gray-500 ml-2 flex-shrink-0">
                              {formatDate(conversation.timestamp)}
                            </span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-400 truncate">
                            {conversation.lastMessage}
                          </p>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
                
                <motion.div
                  variants={itemVariant}
                  className="text-center pt-4"
                >
                  <Link href="/messages" className="inline-flex items-center text-primary hover:underline">
                    <span>See all conversations</span>
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </motion.div>
              </motion.div>
            ) : (
              <motion.div 
                variants={fadeIn}
                className="p-6 bg-white dark:bg-neutral-dark rounded-lg shadow-md text-center py-12"
              >
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">Your Inbox</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  You don&apos;t have any messages yet. Messages from interested businesses will appear here.
                </p>
                <Button variant="outline">Go to Marketplace</Button>
              </motion.div>
            )}
          </motion.div>
        );
      case 'settings':
        return (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white dark:bg-neutral-dark p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-6">Profile Settings</h3>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Business Name</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                    defaultValue={mockBusinessProfile.name} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Industry</label>
                  <input 
                    type="text" 
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                    defaultValue={mockBusinessProfile.industry} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Email</label>
                  <input 
                    type="email" 
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                    defaultValue={mockBusinessProfile.contactEmail} 
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Phone</label>
                  <input 
                    type="tel" 
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                    defaultValue={mockBusinessProfile.contactPhone} 
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Business Description</label>
                <textarea 
                  rows={4}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  defaultValue={mockBusinessProfile.description}
                ></textarea>
              </div>
              
              <div>
                <Button type="button">Save Changes</Button>
              </div>
            </form>
          </motion.div>
        );
      case 'analytics':
        return (
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="bg-white dark:bg-neutral-dark p-6 rounded-lg shadow-md"
          >
            <h3 className="text-xl font-semibold mb-6">Business Analytics</h3>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
              {mockMetrics.map((metric, index) => (
                <motion.div 
                  key={index}
                  className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg shadow-sm"
                  whileHover={{ y: -5, boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)" }}
                  transition={{ duration: 0.2 }}
                >
                  <div className="text-3xl font-bold text-primary mb-1">{metric.value}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">{metric.label}</div>
                </motion.div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="mb-4 text-gray-600 dark:text-gray-300">
                View detailed analytics including environmental impact, resource conservation, and business growth.
              </p>
              <Link href="/analytics">
                <Button size="lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                  Full Analytics Dashboard
                </Button>
              </Link>
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
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-neutral-dark p-6 rounded-lg shadow-md flex flex-col md:flex-row items-center mb-8"
        >
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-6 mb-4 md:mb-0">
            <span className="text-gray-400 text-xl">Logo</span>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-2xl font-bold mb-1">{mockBusinessProfile.name}</h1>
            <p className="text-gray-600 dark:text-gray-300 mb-2">{mockBusinessProfile.description}</p>
            <div className="flex items-center justify-center md:justify-start">
              {mockBusinessProfile.verified && (
                <span className="inline-flex items-center bg-green-100 text-green-800 text-xs px-2 py-1 rounded">
                  <svg className="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Verified Business
                </span>
              )}
            </div>
          </div>
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-1"
          >
            <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden">
              <nav className="divide-y">
                {[
                  { id: 'overview', label: 'Overview', icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6' },
                  { id: 'listings', label: 'Listings', icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01' },
                  { id: 'messages', label: 'Messages', icon: 'M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z' },
                  { id: 'analytics', label: 'Analytics', icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z' },
                  { id: 'settings', label: 'Settings', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
                ].map((item) => (
                  <motion.button
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full px-4 py-3 flex items-center ${activeTab === item.id ? 'bg-primary/10 text-primary font-medium' : 'hover:bg-gray-50 dark:hover:bg-gray-800'}`}
                    whileTap={{ scale: 0.98 }}
                    whileHover={{ backgroundColor: activeTab === item.id ? 'rgba(76, 175, 80, 0.2)' : 'rgba(0, 0, 0, 0.05)' }}
                  >
                    <svg className="w-5 h-5 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d={item.icon} />
                    </svg>
                    {item.label}
                  </motion.button>
                ))}
              </nav>
            </div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-4"
          >
            {renderTabContent()}
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
} 