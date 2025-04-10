'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

interface FilterOption {
  value: string;
  label: string;
}

interface PriceRange {
  min: number;
  max: number;
}

interface AdvancedSearchFiltersProps {
  categories: FilterOption[];
  conditions: FilterOption[];
  businesses: FilterOption[];
  selectedCategory: string;
  selectedCondition: string;
  selectedBusiness: string;
  priceRange: PriceRange;
  onCategoryChange: (category: string) => void;
  onConditionChange: (condition: string) => void;
  onBusinessChange: (business: string) => void;
  onPriceRangeChange: (range: PriceRange) => void;
  onReset: () => void;
  isOpen: boolean;
  onToggle: () => void;
}

export default function AdvancedSearchFilters({
  categories,
  conditions,
  businesses,
  selectedCategory,
  selectedCondition,
  selectedBusiness,
  priceRange,
  onCategoryChange,
  onConditionChange,
  onBusinessChange,
  onPriceRangeChange,
  onReset,
  isOpen,
  onToggle
}: AdvancedSearchFiltersProps) {
  const [localPriceRange, setLocalPriceRange] = useState<PriceRange>(priceRange);
  
  // Update local price range when prop changes
  useEffect(() => {
    setLocalPriceRange(priceRange);
  }, [priceRange]);
  
  // Apply price range when user stops sliding
  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>, type: 'min' | 'max') => {
    const value = parseInt(e.target.value);
    if (type === 'min') {
      setLocalPriceRange(prev => ({ ...prev, min: value }));
    } else {
      setLocalPriceRange(prev => ({ ...prev, max: value }));
    }
  };
  
  const handlePriceApply = () => {
    onPriceRangeChange(localPriceRange);
  };
  
  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: { 
      opacity: 1, 
      height: 'auto',
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0,
      height: 0,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <div className="mb-6">
      <div className="flex justify-between items-center mb-2">
        <button
          onClick={onToggle}
          className="flex items-center text-gray-700 hover:text-primary transition-colors"
        >
          <span className="mr-2 font-medium">Filters</span>
          <svg
            className={`w-5 h-5 transition-transform duration-200 ${isOpen ? 'transform rotate-180' : ''}`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        
        {(selectedCategory !== 'All Categories' || 
         selectedCondition !== 'All Conditions' || 
         selectedBusiness !== 'All Businesses' ||
         priceRange.min > 0 || 
         priceRange.max < 5000) && (
          <button
            className="text-sm text-primary hover:text-primary-dark transition-colors"
            onClick={onReset}
          >
            Reset Filters
          </button>
        )}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm overflow-hidden"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* Category Filter */}
              <div>
                <h4 className="font-medium mb-2 text-gray-700">Category</h4>
                <select
                  value={selectedCategory}
                  onChange={(e) => onCategoryChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {categories.map(category => (
                    <option key={category.value} value={category.value}>
                      {category.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Condition Filter */}
              <div>
                <h4 className="font-medium mb-2 text-gray-700">Condition</h4>
                <select
                  value={selectedCondition}
                  onChange={(e) => onConditionChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {conditions.map(condition => (
                    <option key={condition.value} value={condition.value}>
                      {condition.label}
                    </option>
                  ))}
                </select>
              </div>
              
              {/* Business Filter */}
              <div>
                <h4 className="font-medium mb-2 text-gray-700">Business</h4>
                <select
                  value={selectedBusiness}
                  onChange={(e) => onBusinessChange(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                >
                  {businesses.map(business => (
                    <option key={business.value} value={business.value}>
                      {business.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            
            {/* Price Range Filter */}
            <div className="mt-4">
              <h4 className="font-medium mb-2 text-gray-700">Price Range</h4>
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Min ($)</label>
                  <input
                    type="number"
                    min="0"
                    max={localPriceRange.max}
                    value={localPriceRange.min}
                    onChange={(e) => handlePriceChange(e, 'min')}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-sm text-gray-600 mb-1">Max ($)</label>
                  <input
                    type="number"
                    min={localPriceRange.min}
                    value={localPriceRange.max}
                    onChange={(e) => handlePriceChange(e, 'max')}
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
                <Button
                  onClick={handlePriceApply}
                  variant="outline"
                  size="sm"
                  className="mt-5"
                >
                  Apply
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
} 