'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import MainLayout from '@/components/layout/MainLayout';

export default function FoodListingPage() {
  const [formData, setFormData] = useState({
    productName: '',
    category: '',
    originalPrice: '',
    discountedPrice: '',
    quantity: '',
    expirationDate: '',
    description: '',
    isVerified: false,
  });

  const [image, setImage] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    if (type === 'checkbox') {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({
        ...prev,
        [name]: checked,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target && event.target.result) {
          setImage(event.target.result as string);
        }
      };
      reader.readAsDataURL(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      
      // Reset form after success
      setTimeout(() => {
        setFormData({
          productName: '',
          category: '',
          originalPrice: '',
          discountedPrice: '',
          quantity: '',
          expirationDate: '',
          description: '',
          isVerified: false,
        });
        setImage(null);
        setIsSuccess(false);
      }, 3000);
    }, 1500);
  };

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
        stiffness: 100
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
          Back to Food Waste
        </Link>
        
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold mb-4">List Your Food Products</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Help reduce food waste by listing your products that are nearing their expiration date
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div
            className="md:col-span-2"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold mb-6">Product Details</h2>
              {isSuccess ? (
                <motion.div
                  className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded flex items-center mb-6"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
                  </svg>
                  <span>Your product has been successfully listed!</span>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit}>
                  <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                  >
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-2" htmlFor="productName">
                        Product Name*
                      </label>
                      <input
                        type="text"
                        id="productName"
                        name="productName"
                        value={formData.productName}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-2" htmlFor="category">
                        Category*
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      >
                        <option value="">Select a category</option>
                        <option value="Fruits">Fruits</option>
                        <option value="Vegetables">Vegetables</option>
                        <option value="Dairy">Dairy</option>
                        <option value="Bakery">Bakery</option>
                        <option value="Meat">Meat</option>
                        <option value="Seafood">Seafood</option>
                        <option value="Beverages">Beverages</option>
                        <option value="Other">Other</option>
                      </select>
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-2" htmlFor="originalPrice">
                        Original Price ($)*
                      </label>
                      <input
                        type="number"
                        id="originalPrice"
                        name="originalPrice"
                        value={formData.originalPrice}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-2" htmlFor="discountedPrice">
                        Discounted Price ($)*
                      </label>
                      <input
                        type="number"
                        id="discountedPrice"
                        name="discountedPrice"
                        value={formData.discountedPrice}
                        onChange={handleChange}
                        step="0.01"
                        min="0"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                      {formData.originalPrice && formData.discountedPrice && (
                        <p className="mt-1 text-sm text-primary">
                          {Math.round((1 - parseFloat(formData.discountedPrice) / parseFloat(formData.originalPrice)) * 100)}% discount
                        </p>
                      )}
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-2" htmlFor="quantity">
                        Quantity Available*
                      </label>
                      <input
                        type="number"
                        id="quantity"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        min="1"
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </motion.div>
                    
                    <motion.div variants={itemVariants}>
                      <label className="block text-sm font-medium mb-2" htmlFor="expirationDate">
                        Expiration Date*
                      </label>
                      <input
                        type="date"
                        id="expirationDate"
                        name="expirationDate"
                        value={formData.expirationDate}
                        onChange={handleChange}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                        required
                      />
                    </motion.div>
                    
                    <motion.div className="md:col-span-2" variants={itemVariants}>
                      <label className="block text-sm font-medium mb-2" htmlFor="description">
                        Description
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={4}
                        className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                      ></textarea>
                    </motion.div>
                    
                    <motion.div className="md:col-span-2" variants={itemVariants}>
                      <label className="block text-sm font-medium mb-2" htmlFor="image">
                        Product Image
                      </label>
                      <div className="border-2 border-dashed border-gray-300 rounded-md p-6 text-center">
                        {image ? (
                          <div className="mb-4">
                            <img src={image} alt="Product preview" className="mx-auto h-48 object-contain" />
                            <button
                              type="button"
                              onClick={() => setImage(null)}
                              className="mt-2 text-red-500 text-sm hover:underline"
                            >
                              Remove image
                            </button>
                          </div>
                        ) : (
                          <div className="text-gray-500 mb-4">
                            <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <p>Drag and drop or click to upload</p>
                          </div>
                        )}
                        <input
                          type="file"
                          id="image"
                          name="image"
                          accept="image/*"
                          onChange={handleImageChange}
                          className="hidden"
                        />
                        <label
                          htmlFor="image"
                          className="btn-secondary inline-block cursor-pointer"
                        >
                          Select Image
                        </label>
                      </div>
                    </motion.div>
                    
                    <motion.div className="md:col-span-2" variants={itemVariants}>
                      <label className="flex items-center">
                        <input
                          type="checkbox"
                          name="isVerified"
                          checked={formData.isVerified}
                          onChange={handleChange}
                          className="rounded text-primary focus:ring-primary mr-2"
                        />
                        <span>
                          I verify that this product is still safe for consumption and complies with all food safety regulations
                        </span>
                      </label>
                    </motion.div>
                  </motion.div>
                  
                  <motion.div
                    className="text-right"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                  >
                    <motion.button
                      type="submit"
                      className="btn-primary px-8"
                      disabled={isSubmitting}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center">
                          <motion.div 
                            className="w-5 h-5 border-2 border-white border-t-transparent rounded-full mr-2"
                            animate={{ rotate: 360 }}
                            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                          />
                          Processing...
                        </span>
                      ) : (
                        'List Product'
                      )}
                    </motion.button>
                  </motion.div>
                </form>
              )}
            </div>
          </motion.div>
          
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">How It Works</h3>
              <ol className="space-y-4">
                <li className="flex items-start">
                  <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">1</span>
                  <span>Fill out the product details including expiration date and discounted price.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">2</span>
                  <span>Add a clear image of your product so customers know what they're getting.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">3</span>
                  <span>Verify that your product is still safe for consumption and submit.</span>
                </li>
                <li className="flex items-start">
                  <span className="bg-primary text-white w-6 h-6 rounded-full flex items-center justify-center mr-3 flex-shrink-0">4</span>
                  <span>Your listing will be available for nearby customers to find and reserve.</span>
                </li>
              </ol>
            </div>
            
            <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Reduce food waste in your business</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Generate revenue from products that might otherwise be discarded</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Attract new customers to your business</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Improve your business's sustainability profile</span>
                </li>
                <li className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-primary mr-2" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span>Earn verifiable impact certificates</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-r from-primary to-secondary text-white rounded-lg shadow-md p-6">
              <h3 className="text-xl font-semibold mb-4">Blockchain Verification</h3>
              <p className="mb-4">
                All transactions and impact data are securely recorded on the blockchain, providing transparent and tamper-proof verification.
              </p>
              <Link href="/business/blockchain" className="inline-flex items-center text-white hover:underline">
                Learn more about our blockchain technology
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
} 