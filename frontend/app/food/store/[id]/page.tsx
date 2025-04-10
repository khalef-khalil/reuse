'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function StoreDetailPage({ params }: { params: { id: string } }) {
  const [store, setStore] = useState<any>(null);
  const [foodItems, setFoodItems] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reservedItems, setReservedItems] = useState<Set<number>>(new Set());

  // Simulate fetching store data
  useEffect(() => {
    // This would be replaced with a real API call
    setTimeout(() => {
      const storeId = parseInt(params.id);
      
      // Mock store data
      const storeData = {
        id: storeId,
        name: storeId === 1 ? 'Green Grocery' : storeId === 2 ? 'Organic Market' : 'Fresh Farms',
        address: '123 Main Street, City',
        phone: '+1 234 567 890',
        openingHours: '8:00 AM - 9:00 PM',
        description: 'A local store committed to reducing food waste and offering quality products at discounted prices.',
        image: '/images/stores/grocery-store.jpg',
      };
      
      // Mock food items with expiration dates
      const mockFoodItems = [
        {
          id: 1,
          name: 'Organic Apples',
          originalPrice: 3.99,
          discountedPrice: 1.99,
          expirationDate: '2023-12-10',
          category: 'Fruits',
          quantity: 5,
          image: '/images/food/organic-bananas.jpg',
          verified: true,
        },
        {
          id: 2,
          name: 'Whole Grain Bread',
          originalPrice: 4.50,
          discountedPrice: 2.25,
          expirationDate: '2023-12-09',
          category: 'Bakery',
          quantity: 3,
          image: '/images/food/whole-grain-bread.jpg',
          verified: true,
        },
        {
          id: 3,
          name: 'Greek Yogurt',
          originalPrice: 5.99,
          discountedPrice: 2.99,
          expirationDate: '2023-12-11',
          category: 'Dairy',
          quantity: 8,
          image: '/images/food/greek-yogurt.jpg',
          verified: true,
        },
        {
          id: 4,
          name: 'Fresh Orange Juice',
          originalPrice: 4.99,
          discountedPrice: 2.49,
          expirationDate: '2023-12-08',
          category: 'Beverages',
          quantity: 4,
          image: '/images/food/pasta-sauce.jpg',
          verified: false,
        },
      ];
      
      setStore(storeData);
      setFoodItems(mockFoodItems);
      setIsLoading(false);
    }, 1500);
  }, [params.id]);

  const handleReserve = (itemId: number) => {
    const newReservedItems = new Set(reservedItems);
    
    if (newReservedItems.has(itemId)) {
      newReservedItems.delete(itemId);
    } else {
      newReservedItems.add(itemId);
    }
    
    setReservedItems(newReservedItems);
  };

  const calculateTimeLeft = (expirationDate: string) => {
    const expDate = new Date(expirationDate);
    const today = new Date();
    
    const diffTime = expDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    return diffDays;
  };
  
  const getExpirationClass = (days: number) => {
    if (days <= 1) return 'bg-red-100 text-red-800';
    if (days <= 3) return 'bg-orange-100 text-orange-800';
    return 'bg-green-100 text-green-800';
  };

  if (isLoading) {
    return (
      <MainLayout>
        <div className="container-custom py-12 flex justify-center items-center h-[50vh]">
          <motion.div 
            className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </div>
      </MainLayout>
    );
  }

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
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12
      }
    }
  };

  return (
    <MainLayout>
      <div className="container-custom py-12">
        <Link href="/food" className="flex items-center mb-6 text-primary hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Food Stores
        </Link>
        
        <motion.div 
          className="flex flex-col md:flex-row gap-8 mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="md:w-1/3">
            <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden sticky top-24">
              <img src={store.image} alt={store.name} className="w-full h-48 object-cover" />
              <div className="p-6">
                <h1 className="text-3xl font-bold mb-3">{store.name}</h1>
                <p className="text-gray-600 dark:text-gray-300 mb-4">{store.description}</p>
                
                <div className="mb-4">
                  <h3 className="font-semibold text-lg mb-2">Contact Information</h3>
                  <p className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {store.address}
                  </p>
                  <p className="flex items-center text-gray-600 dark:text-gray-300 mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {store.phone}
                  </p>
                  <p className="flex items-center text-gray-600 dark:text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    {store.openingHours}
                  </p>
                </div>
                
                <Link href={`/food/map?storeId=${store.id}`} className="btn-primary block text-center">
                  Get Directions
                </Link>
              </div>
            </div>
          </div>
          
          <div className="md:w-2/3">
            <h2 className="text-2xl font-bold mb-6">Available Food Items</h2>
            
            <motion.div 
              className="grid grid-cols-1 gap-6"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {foodItems.map((item) => {
                const daysLeft = calculateTimeLeft(item.expirationDate);
                const expirationClass = getExpirationClass(daysLeft);
                const isReserved = reservedItems.has(item.id);
                
                return (
                  <motion.div
                    key={item.id}
                    className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden"
                    variants={itemVariants}
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/3">
                        <img src={item.image} alt={item.name} className="w-full h-48 md:h-full object-cover" />
                      </div>
                      <div className="p-6 md:w-2/3">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-xl font-semibold">{item.name}</h3>
                          <div className="flex items-center">
                            <span className={`px-2 py-1 rounded text-sm mr-2 ${expirationClass}`}>
                              {daysLeft <= 0 ? 'Expires today' : daysLeft === 1 ? 'Expires tomorrow' : `Expires in ${daysLeft} days`}
                            </span>
                            {item.verified && (
                              <span className="bg-primary/10 text-primary px-2 py-1 rounded text-sm flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Verified
                              </span>
                            )}
                          </div>
                        </div>
                        
                        <div className="mb-3">
                          <span className="text-gray-600 dark:text-gray-300">Category: {item.category}</span>
                        </div>
                        
                        <div className="mb-4">
                          <span className="text-gray-500 line-through mr-2">${item.originalPrice.toFixed(2)}</span>
                          <span className="text-primary font-bold text-lg">${item.discountedPrice.toFixed(2)}</span>
                          <span className="ml-2 bg-accent/10 text-accent px-2 py-1 rounded text-sm">
                            {Math.round((1 - item.discountedPrice / item.originalPrice) * 100)}% off
                          </span>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600 dark:text-gray-300">
                            Quantity: {item.quantity} available
                          </span>
                          <motion.button
                            onClick={() => handleReserve(item.id)}
                            className={`px-4 py-2 rounded-md font-semibold ${
                              isReserved 
                                ? 'bg-secondary text-white' 
                                : 'bg-white text-primary border border-primary hover:bg-primary/10'
                            }`}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {isReserved ? 'Reserved' : 'Reserve'}
                          </motion.button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
            
            {reservedItems.size > 0 && (
              <motion.div
                className="mt-8 p-6 bg-white dark:bg-neutral-dark rounded-lg shadow-md"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h3 className="text-xl font-bold mb-4">Your Reservation</h3>
                <p className="mb-4">You have reserved {reservedItems.size} item(s)</p>
                <div className="flex justify-between">
                  <Link href="/food" className="btn-secondary">
                    Continue Shopping
                  </Link>
                  <Link href="/food/checkout" className="btn-primary">
                    Complete Reservation
                  </Link>
                </div>
              </motion.div>
            )}
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
} 