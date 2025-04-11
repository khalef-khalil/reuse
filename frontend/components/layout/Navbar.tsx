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
              <Link href="/food" className="hover:text-primary transition-colors">
                REUSE Food
              </Link>
            </motion.div>
            <motion.div whileHover="hover" variants={navItemVariants}>
              <Link href="/label" className="hover:text-primary transition-colors">
                REUSE Label
              </Link>
            </motion.div>
            
            <motion.div 
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/business" className="btn-primary">
                Business Dashboard
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
              <Link href="/food" className="block hover:text-primary transition-colors">
                REUSE Food
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
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Link href="/business" className="block btn-primary inline-block mt-2">
                Business Dashboard
              </Link>
            </motion.div>
          </motion.div>
        )}
      </div>
    </motion.nav>
  );
} 