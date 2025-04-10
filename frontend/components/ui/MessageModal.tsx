'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

interface MessageModalProps {
  isOpen: boolean;
  businessName: string;
  productTitle: string;
  onClose: () => void;
  onSend: (message: string) => void;
}

export default function MessageModal({ 
  isOpen, 
  businessName, 
  productTitle, 
  onClose, 
  onSend 
}: MessageModalProps) {
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [characterCount, setCharacterCount] = useState(0);
  
  // Reset modal state when opened
  useEffect(() => {
    if (isOpen) {
      setMessage(`Hi, I'm interested in your "${productTitle}". Is it still available?`);
      setCharacterCount(productTitle.length + 46);
    }
  }, [isOpen, productTitle]);
  
  // Update character count
  useEffect(() => {
    setCharacterCount(message.length);
  }, [message]);
  
  const handleSubmit = () => {
    if (message.trim()) {
      setIsSending(true);
      // Simulate sending delay
      setTimeout(() => {
        onSend(message);
        setIsSending(false);
        onClose();
      }, 800);
    }
  };
  
  // Animation variants
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  };
  
  const modalVariants = {
    hidden: { 
      opacity: 0,
      y: 50,
      scale: 0.95
    },
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
      transition: {
        duration: 0.2
      }
    }
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <motion.div 
            className="fixed inset-0 bg-black bg-opacity-50"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
            onClick={onClose}
          />
          
          <motion.div 
            className="relative bg-white rounded-lg shadow-xl max-w-md w-full mx-4 z-10"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-5 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold text-gray-900">
                  Message to {businessName}
                </h3>
                <button
                  type="button"
                  className="text-gray-400 hover:text-gray-500 focus:outline-none"
                  onClick={onClose}
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            
            <div className="p-5">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  About product: <span className="font-semibold">{productTitle}</span>
                </label>
                <textarea
                  rows={5}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                  placeholder="Type your message here..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  maxLength={1000}
                ></textarea>
                <div className="flex justify-end mt-1">
                  <span className="text-xs text-gray-500">
                    {characterCount}/1000 characters
                  </span>
                </div>
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <Button 
                  onClick={onClose}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSubmit}
                  disabled={!message.trim() || isSending}
                  className="relative"
                >
                  {isSending ? (
                    <div className="flex items-center space-x-2">
                      <svg className="animate-spin h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      <span>Sending...</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      <span>Send Message</span>
                    </div>
                  )}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
} 