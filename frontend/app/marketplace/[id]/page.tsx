'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { motion } from 'framer-motion';
import MainLayout from '../../../components/layout/MainLayout';
import Button from '../../../components/ui/Button';

// Mock listings data (same as in marketplace page)
const allListings = [
  {
    id: 'p1',
    title: 'Office Desks (Set of 4)',
    image: '/images/placeholder.png',
    price: 1200,
    condition: 'Good',
    category: 'Furniture',
    location: 'Nairobi, Kenya',
    quantity: 4,
    description: 'Slightly used office desks in good condition. Selling due to office downsizing. These are high-quality desks made from sustainable materials with adjustable height features. Perfect for a growing business or startup office space.',
    createdAt: '2023-10-15',
    specifications: [
      { name: 'Dimensions', value: '120cm x 80cm x 75cm' },
      { name: 'Material', value: 'Bamboo and recycled steel' },
      { name: 'Weight', value: '35kg each' },
      { name: 'Color', value: 'Natural wood with black legs' },
      { name: 'Features', value: 'Cable management, adjustable height' },
      { name: 'Age', value: '2 years' },
    ],
    businessId: 'b1',
    businessName: 'EcoTech Solutions',
    businessDescription: 'Leading provider of sustainable technology solutions for businesses.',
    businessContact: 'info@ecotech.com',
    businessPhone: '+254 123 456 789',
    verified: true,
  },
  {
    id: 'p2',
    title: 'Dell OptiPlex Desktops',
    image: '/images/placeholder.png',
    price: 2500,
    condition: 'Excellent',
    category: 'Electronics',
    location: 'Nairobi, Kenya',
    quantity: 8,
    description: 'Dell OptiPlex 7080 desktops, 3 years old but in excellent condition with i7 processors. These workstations are perfect for office use, design work, or software development. All units have been professionally refurbished and tested. Selling as a batch or individually.',
    createdAt: '2023-11-20',
    specifications: [
      { name: 'Processor', value: 'Intel Core i7-10700, 8-core' },
      { name: 'RAM', value: '16GB DDR4' },
      { name: 'Storage', value: '512GB SSD' },
      { name: 'Graphics', value: 'Intel UHD Graphics 630' },
      { name: 'OS', value: 'Windows 10 Pro' },
      { name: 'Ports', value: 'USB 3.0, HDMI, DisplayPort, Ethernet' },
      { name: 'Age', value: '3 years' },
    ],
    businessId: 'b1',
    businessName: 'EcoTech Solutions',
    businessDescription: 'Leading provider of sustainable technology solutions for businesses.',
    businessContact: 'info@ecotech.com',
    businessPhone: '+254 123 456 789',
    verified: true,
  },
  {
    id: 'p3',
    title: 'Conference Room Chairs',
    image: '/images/placeholder.png',
    price: 800,
    condition: 'Fair',
    category: 'Furniture',
    location: 'Mombasa, Kenya',
    quantity: 12,
    description: 'Ergonomic conference room chairs. Some wear but still functional. These are high-quality ergonomic chairs from Herman Miller, designed for comfort during long meetings. They feature adjustable height, lumbar support, and armrests.',
    createdAt: '2023-12-05',
    specifications: [
      { name: 'Brand', value: 'Herman Miller' },
      { name: 'Material', value: 'Mesh back, fabric seat' },
      { name: 'Color', value: 'Gray' },
      { name: 'Features', value: 'Adjustable height, lumbar support, armrests' },
      { name: 'Weight Capacity', value: '120kg' },
      { name: 'Age', value: '4 years' },
    ],
    businessId: 'b3',
    businessName: 'Sustainable Furnishings',
    businessDescription: 'Provider of eco-friendly and sustainable office furniture solutions.',
    businessContact: 'contact@sustainablefurnishings.com',
    businessPhone: '+254 987 654 321',
    verified: false,
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const [isContactFormOpen, setIsContactFormOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Find the product based on the ID from the URL
  const product = allListings.find(item => item.id === id);

  if (!product) {
    return (
      <MainLayout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you're looking for doesn't exist or has been removed.</p>
          <Link href="/marketplace">
            <Button>Return to Marketplace</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
      setIsContactFormOpen(false);
      // Would typically show a success message here
    }, 1500);
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <MainLayout>
      <motion.div 
        className="container-custom py-8"
        initial="initial"
        animate="animate"
        variants={pageVariants}
      >
        <div className="flex items-center mb-6">
          <Link href="/marketplace" className="text-primary hover:underline flex items-center">
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Marketplace
          </Link>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Product Images and Info */}
          <div className="lg:col-span-2 space-y-6">
            {/* Product Image */}
            <motion.div 
              className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-64 sm:h-96 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                <div className="text-gray-400 text-xl">Product Image</div>
              </div>
            </motion.div>

            {/* Product Details */}
            <motion.div 
              className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <div className="flex flex-wrap items-center justify-between mb-4">
                <div className="flex items-center mb-2 sm:mb-0">
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm mr-2">
                    {product.category}
                  </span>
                  <span className="px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm">
                    {product.condition}
                  </span>
                </div>
                <span className="text-sm text-gray-500">
                  Listed on {new Date(product.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-2xl font-bold text-primary mb-4">${product.price}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {product.description}
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span>{product.location}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
                  </svg>
                  <span>{product.quantity} Available</span>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                <Button onClick={() => setIsContactFormOpen(true)}>
                  Contact Seller
                </Button>
                <Button variant="outline">
                  Save to Wishlist
                </Button>
              </div>
            </motion.div>

            {/* Product Specifications */}
            <motion.div 
              className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-4">Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="border-b pb-2">
                    <span className="text-gray-500 dark:text-gray-400">{spec.name}:</span>
                    <span className="ml-2 font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Blockchain Verification */}
            <motion.div 
              className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4">REUSE Verification</h2>
              <div className="flex items-start p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <svg className="w-6 h-6 text-green-500 dark:text-green-400 mr-3 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-medium text-green-800 dark:text-green-300 mb-1">
                    This product is verified on the blockchain
                  </h4>
                  <p className="text-sm text-green-600 dark:text-green-400">
                    REUSE has verified this product's authenticity and the seller's legitimacy using blockchain technology.
                  </p>
                  <div className="mt-3">
                    <Button variant="outline" size="sm">
                      <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                      View Certificate
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Seller Information */}
          <div className="lg:col-span-1 space-y-6">
            <motion.div 
              className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h2 className="text-xl font-bold mb-4">About the Seller</h2>
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                  <span className="text-gray-400">Logo</span>
                </div>
                <div>
                  <div className="flex items-center">
                    <h3 className="font-semibold">{product.businessName}</h3>
                    {product.verified && (
                      <svg className="w-4 h-4 ml-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <Link href={`/business/${product.businessId}`} className="text-sm text-primary hover:underline">
                    View Profile
                  </Link>
                </div>
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {product.businessDescription}
              </p>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-sm">{product.businessContact}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-4 h-4 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-sm">{product.businessPhone}</span>
                </div>
              </div>
              
              <Button onClick={() => setIsContactFormOpen(true)} className="w-full">
                Contact Seller
              </Button>
            </motion.div>
            
            {/* Similar Products */}
            <motion.div 
              className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <h2 className="text-xl font-bold mb-4">Similar Products</h2>
              <div className="space-y-4">
                {allListings
                  .filter(item => item.id !== product.id && item.category === product.category)
                  .slice(0, 3)
                  .map(item => (
                    <motion.div 
                      key={item.id}
                      className="flex items-start"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="w-16 h-16 bg-gray-200 dark:bg-gray-700 rounded-md flex items-center justify-center mr-3 flex-shrink-0">
                        <span className="text-xs text-gray-400">Image</span>
                      </div>
                      <div>
                        <Link href={`/marketplace/${item.id}`} className="font-medium hover:text-primary transition-colors">
                          {item.title}
                        </Link>
                        <p className="text-primary text-sm font-semibold">${item.price}</p>
                        <div className="flex items-center text-xs text-gray-500">
                          <span>{item.businessName}</span>
                          {item.verified && (
                            <svg className="w-3 h-3 ml-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </motion.div>
          </div>
        </div>

        {/* Contact Form Modal */}
        {isContactFormOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="bg-white dark:bg-neutral-dark rounded-lg shadow-lg max-w-md w-full"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex justify-between items-center p-4 border-b">
                <h2 className="text-xl font-bold">Contact Seller</h2>
                <button 
                  className="text-gray-500 hover:text-gray-700"
                  onClick={() => setIsContactFormOpen(false)}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <form onSubmit={handleSubmit} className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="name">
                    Your Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="email">
                    Your Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1" htmlFor="message">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                    placeholder={`I'm interested in the "${product.title}" and would like to know more.`}
                  />
                </div>
                <div className="flex justify-end space-x-3 pt-2">
                  <Button 
                    variant="outline" 
                    type="button"
                    onClick={() => setIsContactFormOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button 
                    type="submit"
                    isLoading={isSubmitting}
                  >
                    Send Message
                  </Button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </MainLayout>
  );
} 