'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import { FoodWasteItem } from '@/types';

export default function FoodItemDetailPage() {
  const params = useParams();
  const [quantity, setQuantity] = useState(1);
  const [reserved, setReserved] = useState(false);
  
  // Mock function to get food item by ID
  const getFoodItemById = (id: string): FoodWasteItem | undefined => {
    const mockFoodItems: FoodWasteItem[] = [
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
      }
    ];
    
    return mockFoodItems.find(item => item.id === id);
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
    if (newQuantity >= 1 && newQuantity <= item.quantity) {
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
  const totalCO2Saved = ((item.originalPrice - item.discountedPrice) * 0.1 * quantity).toFixed(1);
  
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
              src={item.imageUrl}
              alt={item.name}
              fill
              style={{ objectFit: 'cover' }}
              className="rounded-lg"
            />
            <div className="absolute top-4 right-4 bg-accent text-neutral-dark px-3 py-1 rounded-full font-semibold text-sm">
              {item.discount}% OFF
            </div>
          </motion.div>
          
          {/* Product Details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{item.name}</h1>
            
            <div className="mb-4">
              <span className="text-lg font-semibold text-primary">${item.discountedPrice.toFixed(2)}</span>
              <span className="text-gray-500 line-through ml-2">${item.originalPrice.toFixed(2)}</span>
              <span className="ml-2 bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">Save {item.discount}%</span>
            </div>
            
            <p className="text-gray-600 mb-4">{item.description}</p>
            
            <div className="mb-6">
              <div className="flex items-center mb-2">
                <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-gray-600">Expiration: <span className="font-medium">{new Date(item.expirationDate).toLocaleDateString()}</span></span>
              </div>
              
              <div className="flex items-center mb-2">
                <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-gray-600">Store: <span className="font-medium">{item.storeName}</span></span>
              </div>
              
              <div className="flex items-center">
                <svg className="h-5 w-5 text-primary mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                </svg>
                <span className="text-gray-600">Category: <span className="font-medium capitalize">{item.category}</span></span>
              </div>
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 font-medium mb-2">Quantity</label>
              <div className="flex items-center">
                <button
                  className="text-gray-500 focus:outline-none focus:text-primary border rounded-md p-2"
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                  </svg>
                </button>
                <span className="w-12 mx-2 text-center font-medium">{quantity}</span>
                <button
                  className="text-gray-500 focus:outline-none focus:text-primary border rounded-md p-2"
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= item.quantity}
                >
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                </button>
                <span className="ml-4 text-gray-500">
                  {item.quantity} available
                </span>
              </div>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold text-green-800 mb-2">Environmental Impact</h3>
              <div className="flex items-center mb-1">
                <svg className="h-5 w-5 text-green-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Save {totalCO2Saved} kg of CO2 emissions</span>
              </div>
              <div className="flex items-center mb-1">
                <svg className="h-5 w-5 text-green-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Prevent food waste</span>
              </div>
              <div className="flex items-center">
                <svg className="h-5 w-5 text-green-700 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                <span>Support sustainable businesses</span>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <motion.button
                className={`px-6 py-3 rounded-lg flex-1 ${
                  reserved
                    ? "bg-green-500 text-white"
                    : "bg-primary text-white hover:bg-secondary"
                }`}
                whileHover={!reserved ? { scale: 1.03 } : {}}
                whileTap={!reserved ? { scale: 0.98 } : {}}
                onClick={handleReserve}
                disabled={reserved}
              >
                {reserved ? (
                  <div className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-2 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Reserved!
                  </div>
                ) : (
                  "Reserve Now"
                )}
              </motion.button>
              
              <Link 
                href={`/food/store/${item.storeId}`}
                className="px-6 py-3 bg-white border border-primary text-primary rounded-lg text-center hover:bg-gray-50"
              >
                View Store
              </Link>
            </div>
            
            <div className="mt-6 text-gray-500 text-sm">
              By reserving this item, you'll help reduce food waste and save ${totalSavings}!
            </div>
          </motion.div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-xl font-bold mb-4">More Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2">Nutritional Information</h3>
              <p className="text-gray-600 mb-4">
                This product may contain allergens. Please contact the store for specific nutritional information.
              </p>
              <div className="flex flex-wrap gap-2 mt-2">
                {item.tags.map((tag, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-2 py-1 rounded-md text-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="font-semibold mb-2">Pickup Information</h3>
              <p className="text-gray-600 mb-4">
                {item.storeName} - {item.location.address}, {item.location.city}, {item.location.state} {item.location.zipCode}
              </p>
              <p className="text-gray-600">
                Please bring your reservation confirmation when picking up your items.
                Remember to bring your own bags to further reduce waste!
              </p>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
} 