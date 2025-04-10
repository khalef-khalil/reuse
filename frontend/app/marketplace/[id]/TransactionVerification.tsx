'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from '../../../components/ui/Button';
import BlockchainVerification from '../../../components/ui/BlockchainVerification';

interface TransactionVerificationProps {
  productId: string;
  transactionHash: string;
  isVerified: boolean;
}

export default function TransactionVerification({
  productId,
  transactionHash,
  isVerified: initialVerified
}: TransactionVerificationProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVerified, setIsVerified] = useState(initialVerified);
  
  const handleVerifyComplete = () => {
    setIsVerified(true);
  };
  
  const modalVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.2 }
    }
  };
  
  const contentVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: { 
      opacity: 1, 
      y: 0, 
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 30
      }
    },
    exit: { 
      opacity: 0, 
      y: 50, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <>
      <div className="flex items-start">
        {isVerified ? (
          <div className="flex items-center p-3 bg-green-50 border border-green-100 rounded-md w-full">
            <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-green-500" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path 
                  fillRule="evenodd" 
                  d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" 
                  clipRule="evenodd" 
                />
              </svg>
            </div>
            <div className="flex-1">
              <span className="block font-medium text-green-700">Blockchain Verified</span>
              <p className="text-xs text-green-600 mb-1">
                This listing has been verified on the blockchain, ensuring authenticity and transparency.
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs mt-1"
                onClick={() => setIsModalOpen(true)}
              >
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                View Verification
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex items-center p-3 bg-blue-50 border border-blue-100 rounded-md w-full">
            <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center mr-3 flex-shrink-0">
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 text-blue-500" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
                />
              </svg>
            </div>
            <div className="flex-1">
              <span className="block font-medium text-blue-700">Verify this Listing</span>
              <p className="text-xs text-blue-600 mb-1">
                Blockchain verification ensures the authenticity and history of this product. 
              </p>
              <Button 
                variant="outline" 
                size="sm" 
                className="text-xs mt-1"
                onClick={() => setIsModalOpen(true)}
              >
                <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Verify Now
              </Button>
            </div>
          </div>
        )}
      </div>
      
      {/* Verification Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            onClick={() => setIsModalOpen(false)}
          >
            <motion.div 
              className="bg-white rounded-lg shadow-xl max-w-lg w-full max-h-[90vh] overflow-y-auto"
              variants={contentVariants}
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-center p-4 border-b border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800">Blockchain Verification</h3>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              
              <div className="p-5">
                <BlockchainVerification 
                  transactionHash={transactionHash}
                  productId={productId}
                  onVerify={handleVerifyComplete}
                />
              </div>
              
              <div className="border-t border-gray-200 p-4 bg-gray-50 flex justify-end">
                <Button 
                  variant="outline"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
} 