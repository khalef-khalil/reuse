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

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
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

            {/* Results Count and Sort */}
            <motion.div 
              className="flex justify-between items-center mb-6"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <div>
                <span className="font-medium">{filteredListings.length}</span> products found
              </div>
              <div className="flex items-center">
                <span className="mr-2">Sort by:</span>
                <select className="p-1 border rounded focus:ring-2 focus:ring-primary focus:border-transparent">
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </motion.div>

            {/* Product Grid */}
            {filteredListings.length > 0 ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
              >
                {filteredListings.map((listing) => (
                  <motion.div
                    key={listing.id}
                    variants={cardVariants}
                    whileHover="hover"
                    className="bg-white dark:bg-neutral-dark rounded-lg shadow-md overflow-hidden"
                  >
                    <div className="h-40 bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
                      <div className="text-gray-400">Product Image</div>
                    </div>
                    <div className="p-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm text-gray-500">{listing.category}</span>
                        <span className="text-sm px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded">
                          {listing.condition}
                        </span>
                      </div>
                      <h3 className="font-semibold text-lg mb-1">{listing.title}</h3>
                      <p className="text-primary font-bold mb-2">${listing.price}</p>
                      <p className="text-sm text-gray-600 dark:text-gray-300 mb-3 line-clamp-2">
                        {listing.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="text-xs text-gray-500">{listing.businessName}</span>
                          {listing.verified && (
                            <svg className="w-3 h-3 ml-1 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                        <Link href={`/marketplace/${listing.id}`}>
                          <Button size="sm">Details</Button>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div 
                className="text-center py-12 bg-white dark:bg-neutral-dark rounded-lg shadow-md"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <svg className="w-16 h-16 mx-auto text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="text-xl font-semibold mb-2">No products found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All Categories');
                    setSelectedCondition('All Conditions');
                    setSelectedBusiness('All Businesses');
                    setPriceRange({ min: 0, max: 5000 });
                  }}
                >
                  Reset Filters
                </Button>
              </motion.div>
            )}
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
} 