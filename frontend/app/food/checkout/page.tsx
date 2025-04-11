'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';
import Image from 'next/image';

export default function CheckoutPage() {
  const [submitted, setSubmitted] = useState(false);
  const [confirmed, setConfirmed] = useState(false);
  
  // Mock list of reserved items
  const reservedItems = [
    {
      id: 1,
      name: 'Organic Bananas',
      store: 'Green Market',
      quantity: 2,
      price: 1.99,
      expirationDate: '2023-03-25'
    },
    {
      id: 2,
      name: 'Whole Grain Bread',
      store: 'Green Market',
      quantity: 1,
      price: 3.49,
      expirationDate: '2023-03-24'
    },
    {
      id: 3,
      name: 'Mixed Vegetables Pack',
      store: 'Green Market',
      quantity: 1,
      price: 4.99,
      expirationDate: '2023-03-23'
    }
  ];
  
  // Calculate total price
  const totalPrice = reservedItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    
    // Simulate API call delay
    setTimeout(() => {
      setConfirmed(true);
    }, 1500);
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-12">
        <Link href="/food" className="flex items-center mb-6 text-primary hover:underline">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
          </svg>
          Back to Food Waste
        </Link>
        
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="checkout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="max-w-4xl mx-auto"
            >
              <h1 className="text-3xl font-bold mb-8 text-center">Complete Your Reservation</h1>
              
              <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Reserved Items</h2>
                
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="text-left border-b dark:border-gray-700">
                        <th className="pb-3">Item</th>
                        <th className="pb-3">Store</th>
                        <th className="pb-3">Quantity</th>
                        <th className="pb-3">Price</th>
                        <th className="pb-3">Expires</th>
                      </tr>
                    </thead>
                    <tbody>
                      {reservedItems.map(item => (
                        <tr key={item.id} className="border-b dark:border-gray-700">
                          <td className="py-3">{item.name}</td>
                          <td className="py-3">{item.store}</td>
                          <td className="py-3">{item.quantity}</td>
                          <td className="py-3">${item.price.toFixed(2)}</td>
                          <td className="py-3">{item.expirationDate}</td>
                        </tr>
                      ))}
                    </tbody>
                    <tfoot>
                      <tr>
                        <td colSpan={3} className="pt-4 text-right font-semibold">Total:</td>
                        <td colSpan={2} className="pt-4 font-semibold">${totalPrice.toFixed(2)}</td>
                      </tr>
                    </tfoot>
                  </table>
                </div>
              </div>
              
              <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Pickup Details</h2>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block mb-1">Your Name</label>
                      <input 
                        type="text" 
                        id="name" 
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                                 focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-dark"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block mb-1">Phone Number</label>
                      <input 
                        type="tel" 
                        id="phone" 
                        required
                        className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                                 focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-dark"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="pickup-time" className="block mb-1">Preferred Pickup Time</label>
                    <select 
                      id="pickup-time" 
                      required
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                               focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-dark"
                    >
                      <option value="">Select a time</option>
                      <option value="today-afternoon">Today, Afternoon (2PM - 5PM)</option>
                      <option value="today-evening">Today, Evening (5PM - 8PM)</option>
                      <option value="tomorrow-morning">Tomorrow, Morning (9AM - 12PM)</option>
                      <option value="tomorrow-afternoon">Tomorrow, Afternoon (2PM - 5PM)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="notes" className="block mb-1">Special Instructions (Optional)</label>
                    <textarea 
                      id="notes" 
                      rows={3}
                      className="w-full p-3 border border-gray-300 dark:border-gray-700 rounded-lg 
                               focus:ring-2 focus:ring-primary focus:border-primary bg-white dark:bg-neutral-dark"
                    />
                  </div>
                  
                  <div className="pt-4">
                    <motion.button
                      type="submit"
                      className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Confirm Reservation
                    </motion.button>
                  </div>
                </form>
              </div>
              
              <div className="bg-gray-100 dark:bg-neutral-dark/50 rounded-lg p-4 text-sm">
                <p className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2 mt-0.5 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                  <span>
                    You will receive a confirmation message with a QR code for your pick-up. Make sure to arrive during your selected time slot at the store location. You&apos;ll need to show your QR code to the store staff to collect your reserved items.
                  </span>
                </p>
              </div>
            </motion.div>
          ) : confirmed ? (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="mb-6 flex justify-center">
                <motion.div 
                  className="bg-green-100 text-green-700 rounded-full p-5"
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </motion.div>
              </div>
              
              <h1 className="text-3xl font-bold mb-4">Reservation Confirmed!</h1>
              <p className="text-lg mb-8">Thank you for helping reduce food waste. Your items will be held for pickup at your selected time.</p>
              
              <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Pickup Details</h2>
                <div className="flex justify-center mb-6">
                  <div className="p-4 border border-gray-300 rounded inline-block">
                    <Image 
                      src="/images/qr/food-pickup-qr.png" 
                      alt="QR Code" 
                      width={160} 
                      height={160} 
                      className="w-40 h-40" 
                    />
                  </div>
                </div>
                <div className="text-left mb-4">
                  <p className="mb-2"><span className="font-semibold">Store:</span> Green Market</p>
                  <p className="mb-2"><span className="font-semibold">Address:</span> 123 Eco Street, Sustainability City</p>
                  <p className="mb-2"><span className="font-semibold">Pickup Time:</span> Today, Afternoon (2PM - 5PM)</p>
                  <p><span className="font-semibold">Reservation ID:</span> FW-23459-87</p>
                </div>
                <p className="text-sm">Show this QR code to the store staff when you arrive.</p>
              </div>
              
              <div className="bg-primary/10 rounded-lg p-6 mb-8">
                <h2 className="text-xl font-semibold mb-4">Your Impact</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-white dark:bg-neutral-dark rounded-lg p-4">
                    <p className="text-3xl font-bold text-primary mb-1">2.3 kg</p>
                    <p className="text-sm">Food Waste Saved</p>
                  </div>
                  <div className="bg-white dark:bg-neutral-dark rounded-lg p-4">
                    <p className="text-3xl font-bold text-primary mb-1">3.4 kg</p>
                    <p className="text-sm">CO₂ Emissions Prevented</p>
                  </div>
                  <div className="bg-white dark:bg-neutral-dark rounded-lg p-4">
                    <p className="text-3xl font-bold text-primary mb-1">240 L</p>
                    <p className="text-sm">Water Saved</p>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Link 
                  href="/food"
                  className="px-4 py-2 border border-primary text-primary rounded-lg hover:bg-primary/5 transition-colors"
                >
                  Back to Food Waste
                </Link>
                <Link
                  href="/food/impact"
                  className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-primary-dark transition-colors"
                >
                  View My Impact
                </Link>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="loading"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="max-w-md mx-auto text-center py-12"
            >
              <div className="flex justify-center mb-6">
                <motion.div 
                  className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                />
              </div>
              <h2 className="text-xl font-semibold">Processing Your Reservation...</h2>
              <p className="text-gray-600 dark:text-gray-300 mt-2">This will just take a moment</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </MainLayout>
  );
} 