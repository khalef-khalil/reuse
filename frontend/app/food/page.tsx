'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import MainLayout from '@/components/layout/MainLayout';
import { FoodWasteItem } from '@/types';

export default function FoodWastePage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // Mock food waste items data
  const foodWasteItems: FoodWasteItem[] = [
    {
      id: '1',
      name: 'Organic Bananas',
      description: 'Slightly spotted but perfect for smoothies or baking',
      originalPrice: 3.99,
      discountedPrice: 1.99,
      discount: 50,
      quantity: 5,
      expirationDate: '2023-12-10',
      category: 'produce',
      storeId: '1',
      storeName: 'Green Market',
      location: {
        address: '123 Eco Street',
        city: 'Sustainability City',
        state: 'CA',
        zipCode: '12345',
        coordinates: {
          latitude: 37.7749,
          longitude: -122.4194
        }
      },
      imageUrl: '/images/food/organic-bananas.jpg',
      tags: ['organic', 'fruit', 'ripe'],
      verified: true,
      status: 'available',
      createdAt: '2023-11-05T08:00:00Z',
      updatedAt: '2023-11-05T08:00:00Z'
    },
    {
      id: '2',
      name: 'Whole Grain Bread',
      description: 'Day-old artisanal bread, perfect for toast or sandwiches',
      originalPrice: 5.99,
      discountedPrice: 2.99,
      discount: 50,
      quantity: 3,
      expirationDate: '2023-12-07',
      category: 'bakery',
      storeId: '2',
      storeName: 'Daily Bakery',
      location: {
        address: '456 Main Street',
        city: 'Sustainability City',
        state: 'CA',
        zipCode: '12345',
        coordinates: {
          latitude: 37.7749,
          longitude: -122.4194
        }
      },
      imageUrl: '/images/food/whole-grain-bread.jpg',
      tags: ['bread', 'bakery', 'day-old'],
      verified: true,
      status: 'available',
      createdAt: '2023-11-05T09:00:00Z',
      updatedAt: '2023-11-05T09:00:00Z'
    },
    {
      id: '3',
      name: 'Mixed Vegetables Pack',
      description: 'Assorted vegetables perfect for stir-fry or soup',
      originalPrice: 7.99,
      discountedPrice: 4.99,
      discount: 40,
      quantity: 8,
      expirationDate: '2023-12-09',
      category: 'produce',
      storeId: '1',
      storeName: 'Green Market',
      location: {
        address: '123 Eco Street',
        city: 'Sustainability City',
        state: 'CA',
        zipCode: '12345',
        coordinates: {
          latitude: 37.7749,
          longitude: -122.4194
        }
      },
      imageUrl: '/images/food/mixed-vegetables.jpg',
      tags: ['vegetables', 'fresh', 'organic'],
      verified: true,
      status: 'available',
      createdAt: '2023-11-05T10:00:00Z',
      updatedAt: '2023-11-05T10:00:00Z'
    },
    {
      id: '4',
      name: 'Greek Yogurt',
      description: 'Creamy yogurt great for breakfast or snacks',
      originalPrice: 4.99,
      discountedPrice: 2.49,
      discount: 50,
      quantity: 10,
      expirationDate: '2023-12-08',
      category: 'dairy',
      storeId: '3',
      storeName: 'Fresh Grocers',
      location: {
        address: '789 Healthy Blvd',
        city: 'Sustainability City',
        state: 'CA',
        zipCode: '12345',
        coordinates: {
          latitude: 37.7749,
          longitude: -122.4194
        }
      },
      imageUrl: '/images/food/greek-yogurt.jpg',
      tags: ['dairy', 'protein', 'healthy'],
      verified: true,
      status: 'available',
      createdAt: '2023-11-05T11:00:00Z',
      updatedAt: '2023-11-05T11:00:00Z'
    },
    {
      id: '5',
      name: 'Pasta Sauce',
      description: 'Homemade tomato sauce, perfect for pasta dishes',
      originalPrice: 6.99,
      discountedPrice: 3.99,
      discount: 43,
      quantity: 4,
      expirationDate: '2023-12-15',
      category: 'prepared',
      storeId: '3',
      storeName: 'Fresh Grocers',
      location: {
        address: '789 Healthy Blvd',
        city: 'Sustainability City',
        state: 'CA',
        zipCode: '12345',
        coordinates: {
          latitude: 37.7749,
          longitude: -122.4194
        }
      },
      imageUrl: '/images/food/pasta-sauce.jpg',
      tags: ['prepared', 'sauce', 'vegetarian'],
      verified: true,
      status: 'available',
      createdAt: '2023-11-05T12:00:00Z',
      updatedAt: '2023-11-05T12:00:00Z'
    },
    {
      id: '6',
      name: 'Assorted Muffins',
      description: 'Variety pack of freshly baked muffins',
      originalPrice: 8.99,
      discountedPrice: 4.49,
      discount: 50,
      quantity: 6,
      expirationDate: '2023-12-07',
      category: 'bakery',
      storeId: '2',
      storeName: 'Daily Bakery',
      location: {
        address: '456 Main Street',
        city: 'Sustainability City',
        state: 'CA',
        zipCode: '12345',
        coordinates: {
          latitude: 37.7749,
          longitude: -122.4194
        }
      },
      imageUrl: '/images/food/assorted-muffins.jpg',
      tags: ['bakery', 'breakfast', 'sweet'],
      verified: true,
      status: 'available',
      createdAt: '2023-11-05T13:00:00Z',
      updatedAt: '2023-11-05T13:00:00Z'
    }
  ];
  
  // Filter items by category and search query
  const filteredItems = foodWasteItems.filter(item => {
    const matchesCategory = activeCategory === 'all' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         item.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         item.storeName.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  
  // Categories for filter
  const categories = [
    { id: 'all', name: 'All Items' },
    { id: 'produce', name: 'Fresh Produce' },
    { id: 'bakery', name: 'Bakery' },
    { id: 'dairy', name: 'Dairy' },
    { id: 'prepared', name: 'Prepared Foods' }
  ];
  
  // Animation variants
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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 100 }
    }
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-8">
        <motion.div 
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">Reduce Food Waste</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Save food from being wasted, save money, and help the environment.
            Reserve soon-to-expire food items from local stores at discounted prices.
          </p>
        </motion.div>
        
        <div className="flex flex-col md:flex-row justify-between mb-8 space-y-4 md:space-y-0">
          <div className="flex overflow-x-auto pb-2 md:pb-0 -mx-4 px-4 md:mx-0 md:px-0">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`whitespace-nowrap px-4 py-2 rounded-full mr-2 transition-colors ${
                  activeCategory === category.id 
                    ? 'bg-primary text-white' 
                    : 'bg-gray-100 dark:bg-neutral-dark hover:bg-gray-200 dark:hover:bg-gray-700'
                }`}
              >
                {category.name}
              </button>
            ))}
          </div>
          
          <div className="relative">
            <input
              type="text"
              placeholder="Search items, stores..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-100 dark:bg-neutral-dark rounded-full w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        
        {filteredItems.length === 0 ? (
          <div className="text-center py-12">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-16 w-16 mx-auto text-gray-300 dark:text-gray-600 mb-4" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                strokeWidth={2} 
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
              />
            </svg>
            <h3 className="text-xl font-semibold mb-2">No items found</h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter to find what you're looking for.
            </p>
          </div>
        ) : (
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {filteredItems.map((item) => (
              <motion.div 
                key={item.id}
                className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden flex flex-col"
                variants={itemVariants}
              >
                <div className="relative h-48">
                  <Image
                    src={item.imageUrl}
                    alt={item.name}
                    fill
                    style={{ objectFit: 'cover' }}
                  />
                  <div className="absolute top-2 right-2 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded">
                    {Math.round((1 - item.discountedPrice/item.originalPrice) * 100)}% OFF
                  </div>
                </div>
                
                <div className="p-4 flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-semibold text-lg">{item.name}</h3>
                    <div>
                      <span className="text-gray-500 dark:text-gray-400 line-through text-sm">${item.originalPrice.toFixed(2)}</span>
                      <span className="text-primary font-bold ml-1">${item.discountedPrice.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <p className="text-gray-600 dark:text-gray-300 text-sm mb-3">{item.description}</p>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-1">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 mr-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" 
                      />
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" 
                      />
                    </svg>
                    {item.storeName} ({((Math.random() * 2) + 0.5).toFixed(1)} mi)
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 mr-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" 
                      />
                    </svg>
                    Expires: {new Date(item.expirationDate).toLocaleDateString()}
                  </div>
                  
                  <div className="flex items-center text-sm text-green-600 mb-4">
                    <svg 
                      xmlns="http://www.w3.org/2000/svg" 
                      className="h-4 w-4 mr-1" 
                      fill="none" 
                      viewBox="0 0 24 24" 
                      stroke="currentColor"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M5 13l4 4L19 7" 
                      />
                    </svg>
                    Save {((Math.random() * 0.5) + 0.2).toFixed(1)} kg CO₂ per item
                  </div>
                </div>
                
                <div className="px-4 pb-4">
                  <Link href={`/food/${item.id}`}>
                    <motion.div
                      className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center justify-center"
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      View Details
                    </motion.div>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <div className="mt-12 text-center">
          <Link href="/food/impact">
            <motion.div
              className="inline-block px-6 py-3 bg-gradient-to-r from-primary to-secondary text-white font-semibold rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              View Your Environmental Impact
            </motion.div>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
} 