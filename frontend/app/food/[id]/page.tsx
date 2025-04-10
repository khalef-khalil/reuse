'use client';

import { useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { FoodWasteItem } from '@/types';

export default function FoodItemDetailPage() {
  const params = useParams();
  const router = useRouter();
  const [quantity, setQuantity] = useState(1);
  const [reserved, setReserved] = useState(false);
  
  // Mock function to get food item by ID
  const getFoodItemById = (id: string): FoodWasteItem | undefined => {
    const mockFoodItems: FoodWasteItem[] = [
      {
        id: 1,
        name: 'Organic Bananas',
        description: 'Slightly spotted but perfect for smoothies or baking',
        originalPrice: 3.99,
        discountedPrice: 1.99,
        category: 'produce',
        expiryDate: '2023-12-10',
        store: {
          id: 1,
          name: 'Green Market',
          location: '123 Eco Street, Sustainability City',
          distance: 0.8
        },
        image: '/images/food/organic-bananas.jpg',
        quantityAvailable: 5,
        co2SavedPerItem: 0.5
      },
      {
        id: 2,
        name: 'Whole Grain Bread',
        description: 'Day-old artisanal bread, perfect for toast or sandwiches',
        originalPrice: 5.99,
        discountedPrice: 2.99,
        category: 'bakery',
        expiryDate: '2023-12-07',
        store: {
          id: 2,
          name: 'Daily Bakery',
          location: '456 Main Street, Sustainability City',
          distance: 1.2
        },
        image: '/images/food/whole-grain-bread.jpg',
        quantityAvailable: 3,
        co2SavedPerItem: 0.3
      },
      {
        id: 3,
        name: 'Mixed Vegetables Pack',
        description: 'Assorted vegetables perfect for stir-fry or soup',
        originalPrice: 7.99,
        discountedPrice: 4.99,
        category: 'produce',
        expiryDate: '2023-12-09',
        store: {
          id: 1,
          name: 'Green Market',
          location: '123 Eco Street, Sustainability City',
          distance: 0.8
        },
        image: '/images/food/mixed-vegetables.jpg',
        quantityAvailable: 8,
        co2SavedPerItem: 0.7
      },
      {
        id: 4,
        name: 'Greek Yogurt',
        description: 'Creamy yogurt great for breakfast or snacks',
        originalPrice: 4.99,
        discountedPrice: 2.49,
        category: 'dairy',
        expiryDate: '2023-12-08',
        store: {
          id: 3,
          name: 'Fresh Grocers',
          location: '789 Healthy Blvd, Sustainability City',
          distance: 2.5
        },
        image: '/images/food/greek-yogurt.jpg',
        quantityAvailable: 10,
        co2SavedPerItem: 0.4
      },
      {
        id: 5,
        name: 'Pasta Sauce',
        description: 'Homemade tomato sauce, perfect for pasta dishes',
        originalPrice: 6.99,
        discountedPrice: 3.99,
        category: 'prepared',
        expiryDate: '2023-12-15',
        store: {
          id: 3,
          name: 'Fresh Grocers',
          location: '789 Healthy Blvd, Sustainability City',
          distance: 2.5
        },
        image: '/images/food/pasta-sauce.jpg',
        quantityAvailable: 4,
        co2SavedPerItem: 0.3
      },
      {
        id: 6,
        name: 'Assorted Muffins',
        description: 'Variety pack of freshly baked muffins',
        originalPrice: 8.99,
        discountedPrice: 4.49,
        category: 'bakery',
        expiryDate: '2023-12-07',
        store: {
          id: 2,
          name: 'Daily Bakery',
          location: '456 Main Street, Sustainability City',
          distance: 1.2
        },
        image: '/images/food/assorted-muffins.jpg',
        quantityAvailable: 6,
        co2SavedPerItem: 0.5
      }
    ];
    
    return mockFoodItems.find(item => item.id === Number(id));
  };
  
  const item = getFoodItemById(params.id as string);
  
  if (!item) {
    return (
      <MainLayout>
        <div className="container-custom py-12 text-center">
          <h1 className="text-3xl font-bold mb-4">Item Not Found</h1>
          <p className="mb-8">The food item you're looking for doesn't exist or has been removed.</p>
          <Link href="/food">
            <motion.div
              className="inline-block px-6 py-3 bg-primary text-white font-semibold rounded-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
            >
              Back to Food Listings
            </motion.div>
          </Link>
        </div>
      </MainLayout>
    );
  }
  
  const handleQuantityChange = (amount: number) => {
    const newQuantity = quantity + amount;
    if (newQuantity >= 1 && newQuantity <= item.quantityAvailable) {
      setQuantity(newQuantity);
    }
  };
  
  const handleReserve = () => {
    setReserved(true);
    // In a real app, this would send a request to the server
    // setTimeout(() => router.push('/food/checkout'), 2000);
  };
  
  const totalSavings = ((item.originalPrice - item.discountedPrice) * quantity).toFixed(2);
  const totalPrice = (item.discountedPrice * quantity).toFixed(2);
  const totalCO2Saved = (item.co2SavedPerItem * quantity).toFixed(1);
  
  return (
    <MainLayout>
      <div className="container-custom py-8">
        {/* Back button */}
        <div className="mb-6">
          <Link href="/food">
            <motion.div
              className="inline-flex items-center text-primary hover:underline"
              whileHover={{ x: -3 }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back to Food Listings
            </motion.div>
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Product Image */}
          <motion.div
            className="relative h-80 md:h-96 rounded-lg overflow-hidden bg-gray-100"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Image
              src={item.image}
              alt={item.name}
              fill
              style={{ objectFit: 'cover' }}
            />
            <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
              {Math.round((1 - item.discountedPrice/item.originalPrice) * 100)}% OFF
            </div>
          </motion.div>
          
          {/* Product Details */}
          <motion.div
            className="flex flex-col"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-3xl font-bold mb-2">{item.name}</h1>
            
            <div className="mb-4">
              <span className="text-gray-500 dark:text-gray-400 line-through text-lg mr-2">
                ${item.originalPrice.toFixed(2)}
              </span>
              <span className="text-2xl font-bold text-primary">
                ${item.discountedPrice.toFixed(2)}
              </span>
            </div>
            
            <p className="text-gray-600 dark:text-gray-300 mb-6">{item.description}</p>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-primary"
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
              {item.store.name} · {item.store.distance.toFixed(1)} miles away
            </div>
            
            <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2 text-primary"
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
              Best if picked up by: {item.expiryDate}
            </div>
            
            <div className="flex items-center text-sm text-green-600 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
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
              Save {item.co2SavedPerItem.toFixed(1)} kg CO₂ per item
            </div>
            
            <div className="p-4 bg-gray-50 dark:bg-neutral-dark rounded-lg mb-6">
              <div className="flex justify-between items-center mb-2">
                <span className="font-semibold">Quantity:</span>
                <div className="flex items-center">
                  <button
                    onClick={() => handleQuantityChange(-1)}
                    disabled={quantity <= 1}
                    className={`h-8 w-8 flex items-center justify-center rounded-full ${
                      quantity <= 1 
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
                        : 'bg-primary text-white'
                    }`}
                  >
                    -
                  </button>
                  <span className="mx-4 font-semibold">{quantity}</span>
                  <button
                    onClick={() => handleQuantityChange(1)}
                    disabled={quantity >= item.quantityAvailable}
                    className={`h-8 w-8 flex items-center justify-center rounded-full ${
                      quantity >= item.quantityAvailable 
                        ? 'bg-gray-200 dark:bg-gray-700 text-gray-400 cursor-not-allowed' 
                        : 'bg-primary text-white'
                    }`}
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {item.quantityAvailable} available
              </div>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span>Price:</span>
                <span>${totalPrice}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>You save:</span>
                <span>${totalSavings}</span>
              </div>
              <div className="flex justify-between text-green-600">
                <span>CO₂ saved:</span>
                <span>{totalCO2Saved} kg</span>
              </div>
            </div>
            
            <AnimatePresence>
              {!reserved ? (
                <motion.button
                  className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleReserve}
                  exit={{ opacity: 0, scale: 0.95 }}
                >
                  Reserve Now
                </motion.button>
              ) : (
                <motion.div
                  className="w-full bg-green-500 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5 mr-2"
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
                  Reserved! Proceed to Checkout
                </motion.div>
              )}
            </AnimatePresence>
            
            {reserved && (
              <motion.div 
                className="mt-4"
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                transition={{ duration: 0.3 }}
              >
                <Link href="/food/checkout">
                  <div className="w-full border border-primary text-primary font-semibold py-3 px-4 rounded-lg flex items-center justify-center hover:bg-primary/5 transition-colors">
                    Continue to Checkout
                  </div>
                </Link>
              </motion.div>
            )}
          </motion.div>
        </div>
        
        {/* Store Info & Map */}
        <motion.div
          className="mt-12 bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
        >
          <h2 className="text-xl font-bold mb-4">Store Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">{item.store.name}</h3>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{item.store.location}</p>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
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
                Open: 9:00 AM - 9:00 PM
              </div>
              
              <div className="flex items-center text-sm text-gray-600 dark:text-gray-300 mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                  />
                </svg>
                (555) 123-4567
              </div>
              
              <Link href={`/food/store/${item.store.id}`}>
                <motion.div
                  className="inline-block text-primary hover:underline"
                  whileHover={{ x: 3 }}
                >
                  View all items from this store
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 inline-block ml-1"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </motion.div>
              </Link>
            </div>
            
            <div className="h-48 bg-gray-200 dark:bg-gray-700 rounded-lg flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">Map view placeholder</p>
            </div>
          </div>
        </motion.div>
        
        {/* Environmental Impact */}
        <motion.div
          className="mt-8 bg-gradient-to-r from-primary/10 to-secondary/10 dark:from-primary/20 dark:to-secondary/20 rounded-lg p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
          <h2 className="text-xl font-bold mb-4">Your Environmental Impact</h2>
          <p className="mb-4">
            By saving this food from being wasted, you're making a real difference:
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="bg-white dark:bg-neutral-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{totalCO2Saved} kg</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">CO₂ emissions saved</div>
            </div>
            
            <div className="bg-white dark:bg-neutral-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">{(quantity * 5).toFixed(0)}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Liters of water saved</div>
            </div>
            
            <div className="bg-white dark:bg-neutral-dark rounded-lg p-4 text-center">
              <div className="text-2xl font-bold text-primary mb-1">${totalSavings}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">Money saved</div>
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
} 