'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';

// Mock categories for filtering
const categories = [
  'All Categories',
  'Electronics',
  'Furniture',
  'Office Supplies',
  'Machinery',
  'IT Equipment',
  'Construction Materials',
  'Vehicles',
  'Tools',
  'Medical Equipment',
];

// Mock conditions for filtering
const conditions = [
  'All Conditions',
  'New',
  'Like New',
  'Excellent',
  'Good',
  'Fair',
  'Needs Repair',
];

// Mock business data
const businesses = [
  {
    id: 'b1',
    name: 'EcoTech Solutions',
    verified: true,
  },
  {
    id: 'b2',
    name: 'GreenOffice Supplies',
    verified: true,
  },
  {
    id: 'b3',
    name: 'Sustainable Furnishings',
    verified: false,
  },
  {
    id: 'b4',
    name: 'Circular Tech',
    verified: true,
  },
];

// Mock product listings
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
    description: 'Slightly used office desks in good condition. Selling due to office downsizing.',
    createdAt: '2023-10-15',
    businessId: 'b1',
    businessName: 'EcoTech Solutions',
    verified: true,
    transactionVerified: true,
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
    description: 'Dell OptiPlex 7080 desktops, 3 years old but in excellent condition with i7 processors.',
    createdAt: '2023-11-20',
    businessId: 'b1',
    businessName: 'EcoTech Solutions',
    verified: true,
    transactionVerified: true,
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
    description: 'Ergonomic conference room chairs. Some wear but still functional.',
    createdAt: '2023-12-05',
    businessId: 'b3',
    businessName: 'Sustainable Furnishings',
    verified: false,
    transactionVerified: false,
  },
  {
    id: 'p4',
    title: 'HP Color LaserJet Printer',
    image: '/images/placeholder.png',
    price: 350,
    condition: 'Good',
    category: 'Electronics',
    location: 'Nairobi, Kenya',
    quantity: 1,
    description: 'HP Color LaserJet Pro MFP. Works perfectly, selling because we upgraded to a newer model.',
    createdAt: '2024-01-10',
    businessId: 'b2',
    businessName: 'GreenOffice Supplies',
    verified: true,
    transactionVerified: true,
  },
  {
    id: 'p5',
    title: 'Steel Filing Cabinets',
    image: '/images/placeholder.png',
    price: 600,
    condition: 'Like New',
    category: 'Office Supplies',
    location: 'Nairobi, Kenya',
    quantity: 6,
    description: 'High-quality steel filing cabinets with lock and key. Barely used, in excellent condition.',
    createdAt: '2024-01-15',
    businessId: 'b2',
    businessName: 'GreenOffice Supplies',
    verified: true,
    transactionVerified: true,
  },
  {
    id: 'p6',
    title: 'MacBook Pro (2021)',
    image: '/images/placeholder.png',
    price: 1500,
    condition: 'Excellent',
    category: 'Electronics',
    location: 'Kisumu, Kenya',
    quantity: 3,
    description: 'MacBook Pro with M1 chip, 16GB RAM, 512GB SSD. Minor scratches on the bottom but works perfectly.',
    createdAt: '2024-01-20',
    businessId: 'b4',
    businessName: 'Circular Tech',
    verified: true,
    transactionVerified: true,
  },
  {
    id: 'p7',
    title: 'Office Partition Screens',
    image: '/images/placeholder.png',
    price: 900,
    condition: 'Good',
    category: 'Furniture',
    location: 'Nairobi, Kenya',
    quantity: 8,
    description: 'Modular office partition screens, sound-absorbing. Easy to assemble and configure.',
    createdAt: '2024-01-25',
    businessId: 'b3',
    businessName: 'Sustainable Furnishings',
    verified: false,
    transactionVerified: false,
  },
  {
    id: 'p8',
    title: 'Acer Projector',
    image: '/images/placeholder.png',
    price: 450,
    condition: 'Excellent',
    category: 'Electronics',
    location: 'Mombasa, Kenya',
    quantity: 2,
    description: 'Acer H7850 4K UHD projector. Low lamp hours, comes with ceiling mount and remote.',
    createdAt: '2024-02-01',
    businessId: 'b4',
    businessName: 'Circular Tech',
    verified: true,
    transactionVerified: true,
  },
];

export default function Marketplace() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedCondition, setSelectedCondition] = useState('All Conditions');
  const [selectedBusiness, setSelectedBusiness] = useState('All Businesses');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 5000 });
  const [filteredListings, setFilteredListings] = useState(allListings);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Filter listings based on selected filters
  useEffect(() => {
    let results = [...allListings];

    // Filter by search term
    if (searchTerm) {
      results = results.filter(
        item => 
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      results = results.filter(item => item.category === selectedCategory);
    }

    // Filter by condition
    if (selectedCondition !== 'All Conditions') {
      results = results.filter(item => item.condition === selectedCondition);
    }

    // Filter by business
    if (selectedBusiness !== 'All Businesses') {
      results = results.filter(item => item.businessName === selectedBusiness);
    }

    // Filter by price range
    results = results.filter(
      item => item.price >= priceRange.min && item.price <= priceRange.max
    );

    setFilteredListings(results);
  }, [searchTerm, selectedCategory, selectedCondition, selectedBusiness, priceRange]);

  // Reset all filters
  const handleResetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('All Categories');
    setSelectedCondition('All Conditions');
    setSelectedBusiness('All Businesses');
    setPriceRange({ min: 0, max: 5000 });
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
    },
    exit: { 
      opacity: 0,
      transition: { duration: 0.3 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    hover: { 
      y: -10,
      boxShadow: "0 10px 25px rgba(0, 0, 0, 0.1)",
      transition: { duration: 0.2 }
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
        <div className="mb-8">
          <motion.h1 
            className="text-3xl font-bold mb-2"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            B2B Marketplace
          </motion.h1>
          <motion.p 
            className="text-gray-600 dark:text-gray-300"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            Find verified business products and equipment for your organization
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters - Desktop */}
          <motion.div 
            className="hidden lg:block"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6 space-y-6 sticky top-4">
              <div>
                <h3 className="font-semibold mb-3">Search</h3>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                />
              </div>

              <div>
                <h3 className="font-semibold mb-3">Categories</h3>
                <div className="space-y-2">
                  {categories.map(category => (
                    <div key={category} className="flex items-center">
                      <input
                        type="radio"
                        id={`category-${category}`}
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="mr-2 accent-primary"
                      />
                      <label htmlFor={`category-${category}`}>{category}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Condition</h3>
                <div className="space-y-2">
                  {conditions.map(condition => (
                    <div key={condition} className="flex items-center">
                      <input
                        type="radio"
                        id={`condition-${condition}`}
                        name="condition"
                        checked={selectedCondition === condition}
                        onChange={() => setSelectedCondition(condition)}
                        className="mr-2 accent-primary"
                      />
                      <label htmlFor={`condition-${condition}`}>{condition}</label>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Price Range</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span>${priceRange.min}</span>
                    <span>${priceRange.max}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="5000"
                    step="100"
                    value={priceRange.max}
                    onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                    className="w-full accent-primary"
                  />
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-3">Business</h3>
                <select
                  value={selectedBusiness}
                  onChange={(e) => setSelectedBusiness(e.target.value)}
                  className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  <option value="All Businesses">All Businesses</option>
                  {businesses.map(business => (
                    <option key={business.id} value={business.name}>
                      {business.name} {business.verified && '✓'}
                    </option>
                  ))}
                </select>
              </div>

              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('All Categories');
                  setSelectedCondition('All Conditions');
                  setSelectedBusiness('All Businesses');
                  setPriceRange({ min: 0, max: 5000 });
                }}
                className="w-full"
              >
                Reset Filters
              </Button>
            </div>
          </motion.div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Mobile Filter Bar */}
            <motion.div 
              className="mb-4 lg:hidden"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between">
                <div className="relative flex-1 mr-2">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                  <svg 
                    className="w-5 h-5 absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <Button 
                  variant="outline" 
                  onClick={() => setIsFilterOpen(!isFilterOpen)}
                >
                  <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
                  </svg>
                  Filters
                </Button>
              </div>

              <AnimatePresence>
                {isFilterOpen && (
                  <motion.div 
                    className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-4 mt-2 space-y-4"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div>
                      <h3 className="font-semibold mb-2">Categories</h3>
                      <select
                        value={selectedCategory}
                        onChange={(e) => setSelectedCategory(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {categories.map(category => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Condition</h3>
                      <select
                        value={selectedCondition}
                        onChange={(e) => setSelectedCondition(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        {conditions.map(condition => (
                          <option key={condition} value={condition}>{condition}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Price Range</h3>
                      <div className="flex items-center justify-between text-sm">
                        <span>${priceRange.min}</span>
                        <span>${priceRange.max}</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="5000"
                        step="100"
                        value={priceRange.max}
                        onChange={(e) => setPriceRange(prev => ({ ...prev, max: parseInt(e.target.value) }))}
                        className="w-full accent-primary"
                      />
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Business</h3>
                      <select
                        value={selectedBusiness}
                        onChange={(e) => setSelectedBusiness(e.target.value)}
                        className="w-full p-2 border rounded focus:ring-2 focus:ring-primary focus:border-transparent"
                      >
                        <option value="All Businesses">All Businesses</option>
                        {businesses.map(business => (
                          <option key={business.id} value={business.name}>
                            {business.name} {business.verified && '✓'}
                          </option>
                        ))}
                      </select>
                    </div>

                    <div className="flex justify-between pt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => {
                          setSearchTerm('');
                          setSelectedCategory('All Categories');
                          setSelectedCondition('All Conditions');
                          setSelectedBusiness('All Businesses');
                          setPriceRange({ min: 0, max: 5000 });
                        }}
                      >
                        Reset
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => setIsFilterOpen(false)}
                      >
                        Apply Filters
                      </Button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            {/* Search */}
            <div className="mb-6">
              <div className="relative">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search for products, equipment, or materials..."
                  className="w-full pl-12 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                />
                <div className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Results Info */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div className="mb-2 md:mb-0">
                <p className="text-gray-600 dark:text-gray-400">
                  Showing {filteredListings.length} {filteredListings.length === 1 ? 'result' : 'results'}
                </p>
              </div>
              <div className="w-full md:w-auto">
                <select
                  className="w-full md:w-auto px-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  onChange={e => {
                    const sort = e.target.value;
                    // Sort logic here
                    setFilteredListings(prevListings => {
                      const sorted = [...prevListings];
                      if (sort === 'price-low') {
                        sorted.sort((a, b) => a.price - b.price);
                      } else if (sort === 'price-high') {
                        sorted.sort((a, b) => b.price - a.price);
                      } else if (sort === 'date-new') {
                        sorted.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
                      } else if (sort === 'date-old') {
                        sorted.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
                      }
                      return sorted;
                    });
                  }}
                >
                  <option value="">Sort by</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="date-new">Date: Newest First</option>
                  <option value="date-old">Date: Oldest First</option>
                </select>
              </div>
            </div>

            {/* No Results */}
            {filteredListings.length === 0 && (
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-8 text-center my-8"
              >
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-full mx-auto flex items-center justify-center mb-4">
                  <svg className="w-10 h-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold mb-2">No listings found</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  We couldn&apos;t find any listings matching your search criteria.
                </p>
                <Button onClick={handleResetFilters}>
                  Reset Filters
                </Button>
              </motion.div>
            )}

            {/* Listings Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence>
                {filteredListings.map((item, index) => (
                  <motion.div
                    key={item.id}
                    custom={index}
                    variants={cardVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    whileHover="hover"
                    className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
                    layout
                  >
                    <Link href={`/marketplace/${item.id}`} className="block">
                      <div className="h-48 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                        <span className="text-gray-400">Product Image</span>
                      </div>
                      
                      <div className="p-5">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-bold text-lg truncate pr-2">{item.title}</h3>
                          {item.transactionVerified && (
                            <div className="flex-shrink-0 bg-green-100 rounded-full p-1" title="Blockchain Verified">
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-green-600" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                              </svg>
                            </div>
                          )}
                        </div>
                        
                        <p className="text-2xl font-bold text-primary mb-3">${item.price}</p>
                        
                        <div className="flex flex-wrap gap-1 mb-3">
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                            {item.category}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                            {item.condition}
                          </span>
                          <span className="px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-xs">
                            {item.quantity} available
                          </span>
                        </div>
                        
                        <div className="flex items-center justify-between mt-4">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center mr-2">
                              <span className="text-gray-500 dark:text-gray-400">{item.businessName.charAt(0)}</span>
                            </div>
                            <div>
                              <p className="text-sm font-medium flex items-center">
                                {item.businessName}
                                {item.verified && (
                                  <svg className="ml-1 w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                  </svg>
                                )}
                              </p>
                              <p className="text-xs text-gray-500">{item.location}</p>
                            </div>
                          </div>
                          <span className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Pagination */}
            {filteredListings.length > 0 && (
              <div className="flex justify-center mt-12">
                <nav className="flex items-center space-x-2">
                  <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                    Previous
                  </button>
                  <button className="px-3 py-2 rounded-md bg-primary text-white">
                    1
                  </button>
                  <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                    2
                  </button>
                  <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                    3
                  </button>
                  <span className="px-2 text-gray-500">...</span>
                  <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                    10
                  </button>
                  <button className="px-3 py-2 rounded-md border border-gray-300 text-gray-500 hover:bg-gray-50">
                    Next
                  </button>
                </nav>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
} 