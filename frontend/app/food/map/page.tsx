'use client';

import { useState, useEffect, Suspense } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import MainLayout from '@/components/layout/MainLayout';

function MapContent() {
  const searchParams = useSearchParams();
  const storeId = searchParams.get('storeId');
  const [selectedStore, setSelectedStore] = useState<number | null>(storeId ? parseInt(storeId) : null);
  const [isMapLoading, setIsMapLoading] = useState(true);

  const stores = [
    {
      id: 1,
      name: 'Green Grocery',
      address: '123 Main Street, City',
      lat: 37.7749,
      lng: -122.4194,
      distance: '0.8 km',
      itemsAvailable: 12,
    },
    {
      id: 2,
      name: 'Organic Market',
      address: '456 Oak Avenue, City',
      lat: 37.7739,
      lng: -122.4212,
      distance: '1.2 km',
      itemsAvailable: 8,
    },
    {
      id: 3,
      name: 'Fresh Farms',
      address: '789 Pine Street, City',
      lat: 37.7729,
      lng: -122.4174,
      distance: '2.5 km',
      itemsAvailable: 15,
    },
  ];

  useEffect(() => {
    // Simulate loading map
    const timer = setTimeout(() => {
      setIsMapLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Link href="/food" className="flex items-center mb-6 text-primary hover:underline">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
        </svg>
        Back to Food Stores
      </Link>

      <motion.h1
        className="text-3xl font-bold mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Find Nearby Food Stores
      </motion.h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <motion.div
          className="md:col-span-2 bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden h-[500px] relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {isMapLoading ? (
            <div className="flex justify-center items-center h-full">
              <motion.div 
                className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
            </div>
          ) : (
            <>
              <div className="absolute top-4 left-4 z-10 bg-white dark:bg-neutral-dark p-2 rounded-md shadow-md">
                <div className="flex items-center space-x-2">
                  <button className="p-2 bg-primary text-white rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </button>
                  <span className="text-sm">Use my location</span>
                </div>
              </div>
              
              {/* This would be replaced with a real map component like React Map GL */}
              <div className="h-full w-full bg-blue-100 flex items-center justify-center">
                <div className="text-center p-4">
                  <p className="mb-2 font-semibold">Interactive Map Would Be Here</p>
                  <p className="text-sm text-gray-600">Using react-map-gl or similar library</p>
                  
                  {/* Store Markers */}
                  <div className="mt-8 flex justify-center space-x-6">
                    {stores.map((store) => (
                      <motion.div 
                        key={store.id}
                        className={`p-2 rounded-full ${selectedStore === store.id ? 'bg-primary text-white' : 'bg-white text-primary'}`}
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={() => setSelectedStore(store.id)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
        </motion.div>

        <div>
          <motion.div
            className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-4 mb-4"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h2 className="font-semibold mb-3">Filter Stores</h2>
            <div className="space-y-3">
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary" defaultChecked />
                  <span>Show all stores</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary" defaultChecked />
                  <span>Expiring today</span>
                </label>
              </div>
              <div>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input type="checkbox" className="rounded text-primary focus:ring-primary" defaultChecked />
                  <span>Verified items only</span>
                </label>
              </div>
              <div>
                <label className="block mb-1 text-sm">Max distance</label>
                <input 
                  type="range" 
                  min="1" 
                  max="10" 
                  defaultValue="5" 
                  className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-primary" 
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>1 km</span>
                  <span>5 km</span>
                  <span>10 km</span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h2 className="font-semibold">Nearby Stores</h2>
            
            {stores.map((store, index) => (
              <motion.div
                key={store.id}
                className={`p-4 rounded-lg ${selectedStore === store.id ? 'bg-primary/10 border border-primary' : 'bg-white dark:bg-neutral-dark'} shadow-md`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + (index * 0.1) }}
                whileHover={{ y: -5 }}
                onClick={() => setSelectedStore(store.id)}
              >
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold">{store.name}</h3>
                  <span className="bg-primary/10 text-primary px-2 py-1 rounded text-xs">
                    {store.distance}
                  </span>
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">{store.address}</p>
                <p className="text-sm">
                  <span className="font-semibold text-primary">{store.itemsAvailable}</span> items available
                </p>
                <div className="mt-3">
                  <Link
                    href={`/food/store/${store.id}`}
                    className="text-sm text-primary hover:underline inline-flex items-center"
                  >
                    View details
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}

export default function MapPage() {
  return (
    <MainLayout>
      <div className="container-custom py-12">
        <Suspense fallback={<div>Loading map...</div>}>
          <MapContent />
        </Suspense>
      </div>
    </MainLayout>
  );
} 