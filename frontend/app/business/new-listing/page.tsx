'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import MainLayout from '../../../components/layout/MainLayout';
import Button from '../../../components/ui/Button';

// Mock categories for the dropdown
const categories = [
  'Electronics',
  'Furniture',
  'Office Supplies',
  'Machinery',
  'IT Equipment',
  'Construction Materials',
  'Vehicles',
  'Tools',
  'Medical Equipment',
  'Other'
];

// Mock conditions for the dropdown
const conditions = [
  'New',
  'Like New',
  'Excellent',
  'Good',
  'Fair',
  'Needs Repair'
];

export default function NewListing() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    condition: '',
    quantity: 1,
    price: '',
    description: '',
    tags: '',
    location: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Mock form submission - would connect to API in real implementation
    setTimeout(() => {
      setIsSubmitting(false);
      router.push('/business?tab=listings');
    }, 1500);
  };

  const pageVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      y: -20,
      transition: { duration: 0.3 }
    }
  };

  const staggerFormItems = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const formItemVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <MainLayout>
      <motion.div 
        className="container-custom py-8"
        initial="initial"
        animate="animate"
        exit="exit"
        variants={pageVariants}
      >
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center mb-6">
            <Link href="/business?tab=listings" className="text-primary hover:underline flex items-center">
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Listings
            </Link>
          </div>
          
          <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden">
            <div className="p-6 border-b">
              <h1 className="text-2xl font-bold">Create New Listing</h1>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Add a new product or equipment to the marketplace
              </p>
            </div>
            
            <motion.form 
              onSubmit={handleSubmit} 
              className="p-6 space-y-6"
              variants={staggerFormItems}
            >
              <motion.div variants={formItemVariants}>
                <label className="block text-sm font-medium mb-1" htmlFor="title">
                  Product Title <span className="text-red-500">*</span>
                </label>
                <input
                  id="title"
                  name="title"
                  type="text"
                  required
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="E.g., Office Desk Set (5 units)"
                />
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={formItemVariants}>
                  <label className="block text-sm font-medium mb-1" htmlFor="category">
                    Category <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="category"
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </motion.div>
                
                <motion.div variants={formItemVariants}>
                  <label className="block text-sm font-medium mb-1" htmlFor="condition">
                    Condition <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="condition"
                    name="condition"
                    required
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  >
                    <option value="">Select condition</option>
                    {conditions.map((condition) => (
                      <option key={condition} value={condition}>
                        {condition}
                      </option>
                    ))}
                  </select>
                </motion.div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <motion.div variants={formItemVariants}>
                  <label className="block text-sm font-medium mb-1" htmlFor="quantity">
                    Quantity <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    required
                    value={formData.quantity}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </motion.div>
                
                <motion.div variants={formItemVariants}>
                  <label className="block text-sm font-medium mb-1" htmlFor="price">
                    Price (USD) <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="price"
                    name="price"
                    type="text"
                    required
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder="E.g., 1200"
                  />
                </motion.div>
              </div>
              
              <motion.div variants={formItemVariants}>
                <label className="block text-sm font-medium mb-1" htmlFor="description">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows={4}
                  required
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="Describe the product, including its specifications, age, reason for selling, etc."
                />
              </motion.div>
              
              <motion.div variants={formItemVariants}>
                <label className="block text-sm font-medium mb-1" htmlFor="tags">
                  Tags (comma separated)
                </label>
                <input
                  id="tags"
                  name="tags"
                  type="text"
                  value={formData.tags}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="E.g., sustainable, office, reusable"
                />
              </motion.div>
              
              <motion.div variants={formItemVariants}>
                <label className="block text-sm font-medium mb-1" htmlFor="location">
                  Location <span className="text-red-500">*</span>
                </label>
                <input
                  id="location"
                  name="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="E.g., Nairobi, Kenya"
                />
              </motion.div>
              
              <motion.div
                variants={formItemVariants}
                className="border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg p-6 text-center"
              >
                <svg className="w-12 h-12 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  Drag and drop product images here, or <span className="text-primary">browse</span>
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Supported formats: JPG, PNG. Max size: 5MB
                </p>
              </motion.div>
              
              <motion.div 
                variants={formItemVariants}
                className="space-y-2"
              >
                <div className="p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <div className="flex items-start">
                    <svg className="w-5 h-5 text-green-500 dark:text-green-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <div>
                      <h4 className="font-medium text-green-800 dark:text-green-300">REUSE Verification</h4>
                      <p className="text-sm text-green-600 dark:text-green-400">
                        Your listing will be automatically verified using blockchain technology to ensure authenticity and trust.
                      </p>
                    </div>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                variants={formItemVariants}
                className="flex justify-end space-x-4 pt-4"
              >
                <Link href="/business?tab=listings">
                  <Button variant="outline" type="button">
                    Cancel
                  </Button>
                </Link>
                <Button type="submit" isLoading={isSubmitting}>
                  Create Listing
                </Button>
              </motion.div>
            </motion.form>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
} 