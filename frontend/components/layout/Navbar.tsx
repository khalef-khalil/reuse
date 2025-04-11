'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasUnreadMessages] = useState(true); // In a real app, this would come from a context or API

  const navItemVariants = {
    hover: { 
      scale: 1.05, 
      color: "#4CAF50",
      transition: { duration: 0.2 } 
    }
  };

  return (
    <motion.nav 
      className="bg-white dark:bg-neutral-dark shadow-md"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      <div className="container-custom py-4">
        <div className="flex justify-between items-center">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link href="/" className="flex items-center">
              <Image 
                src="/logo.png" 
                alt="REUSE Logo" 
                width={90} 
                height={90}
                priority
              />
            </Link>
          </motion.div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <motion.div whileHover="hover" variants={navItemVariants}>
              <Link href="/marketplace" className="hover:text-primary transition-colors">
                Marketplace
              </Link>
            </motion.div>
            <motion.div whileHover="hover" variants={navItemVariants}>
              <Link href="/business" className="hover:text-primary transition-colors">
                Business Dashboard
              </Link>
            </motion.div>
            <motion.div whileHover="hover" variants={navItemVariants}>
              <Link href="/food" className="hover:text-primary transition-colors">
                Food Waste
              </Link>
            </motion.div>
            <motion.div whileHover="hover" variants={navItemVariants}>
              <Link href="/label" className="hover:text-primary transition-colors">
                REUSE Label
              </Link>
            </motion.div>
            <motion.div whileHover="hover" variants={navItemVariants}>
              <Link href="/analytics" className="hover:text-primary transition-colors">
                Analytics
              </Link>
            </motion.div>
            <motion.div whileHover="hover" variants={navItemVariants}>
              <Link href="/about" className="hover:text-primary transition-colors">
                About
              </Link>
            </motion.div>
            
            {/* Messages Link with notification dot */}
            <motion.div
              whileHover="hover"
              variants={navItemVariants}
              className="relative"
            >
              <Link href="/messages" className="hover:text-primary transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Messages
                {hasUnreadMessages && (
                  <span className="absolute -top-1 -right-2 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  </span>
                )}
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/auth/login" className="btn-primary">
                Sign In
              </Link>
            </motion.div>
          </div>
          
          {/* Mobile Menu Button */}
          <motion.button 
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            whileTap={{ scale: 0.9 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isMobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </motion.button>
        </div>
        
        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <motion.div 
            className="md:hidden mt-4 space-y-4 pb-4"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div 
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/marketplace" className="block hover:text-primary transition-colors">
                Marketplace
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/business" className="block hover:text-primary transition-colors">
                Business Dashboard
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/food" className="block hover:text-primary transition-colors">
                Food Waste
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/label" className="block hover:text-primary transition-colors">
                REUSE Label
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/analytics" className="block hover:text-primary transition-colors">
                Analytics
              </Link>
            </motion.div>
            <motion.div 
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
            >
              <Link href="/about" className="block hover:text-primary transition-colors">
                About
              </Link>
            </motion.div>
            
            {/* Mobile Messages Link */}
            <motion.div 
              whileHover={{ x: 5 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              <Link href="/messages" className="block hover:text-primary transition-colors flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
                Messages
                {hasUnreadMessages && (
                  <span className="ml-2 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center">
                    <span className="animate-pulse absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                  </span>
                )}
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/auth/login" className="block btn-primary inline-block mt-2">
                Sign In
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
} 