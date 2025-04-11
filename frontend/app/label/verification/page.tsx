'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Certificate {
  issuer: string;
  owner: string;
  productId: string;
  issueDate: number;
  isValid: boolean;
  productName?: string;
  productDescription?: string;
}

export default function VerificationPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<Certificate | null>(null);
  const [verificationState, setVerificationState] = useState<'initial' | 'loading' | 'success' | 'error'>('initial');
  
  // Mock verification function - would connect to blockchain in real app
  const verifyProduct = async (productId: string) => {
    setVerificationState('loading');
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock data - in a real app, this would come from the blockchain
    if (productId === 'REUSE-001' || productId === 'prod-001') {
      setSearchResults({
        issuer: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
        owner: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
        productId: 'REUSE-001',
        issueDate: Date.now() - 1000000000,
        isValid: true,
        productName: 'Office Desk',
        productDescription: 'Slightly scratched wooden desk, fully functional'
      });
      setVerificationState('success');
    } else {
      setSearchResults(null);
      setVerificationState('error');
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      verifyProduct(searchQuery);
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const shortenAddress = (address: string) => {
    return `${address.substring(0, 6)}...${address.substring(address.length - 4)}`;
  };

  return (
    <div className="container-custom py-12">
      <motion.div
        className="text-center mb-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="mb-4">
          <Link href="/label" className="text-primary inline-flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to REUSE Label
          </Link>
        </div>
        <h1 className="text-4xl font-bold mb-2">Verify REUSE Label</h1>
        <p className="text-xl max-w-2xl mx-auto text-gray-600">
          Check the authenticity of a product with a REUSE Label
        </p>
      </motion.div>
      
      <div className="max-w-3xl mx-auto">
        <motion.div 
          className="bg-white shadow-lg rounded-lg overflow-hidden mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Verify a Certificate</h2>
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col md:flex-row gap-4">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter product ID or certificate hash..."
                  className="flex-grow p-3 border border-gray-300 rounded-md"
                  required
                />
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn-primary md:w-auto px-6"
                  type="submit"
                  disabled={verificationState === 'loading'}
                >
                  {verificationState === 'loading' ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Verifying...
                    </div>
                  ) : (
                    'Verify'
                  )}
                </motion.button>
              </div>
            </form>
            <p className="text-sm text-gray-500 mt-2">
              Enter the product ID from the label or scan the QR code on the product
            </p>
          </div>
        </motion.div>
        
        {verificationState === 'success' && searchResults && (
          <motion.div
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-4 bg-green-100 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-green-800">Valid REUSE Certificate</span>
            </div>
            
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Certificate Details</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500">Product ID</div>
                      <div className="font-medium">{searchResults.productId}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Issue Date</div>
                      <div className="font-medium">{formatDate(searchResults.issueDate)}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Certificate Status</div>
                      <div className="font-medium text-green-600">Valid</div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="text-lg font-semibold mb-4">Product Information</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-sm text-gray-500">Name</div>
                      <div className="font-medium">{searchResults.productName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Description</div>
                      <div className="font-medium">{searchResults.productDescription}</div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-6 border-t border-gray-200">
                <h3 className="text-lg font-semibold mb-4">Blockchain Details</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <div className="text-sm text-gray-500">Issuer</div>
                    <div className="font-mono text-sm">{shortenAddress(searchResults.issuer)}</div>
                  </div>
                  <div>
                    <div className="text-sm text-gray-500">Current Owner</div>
                    <div className="font-mono text-sm">{shortenAddress(searchResults.owner)}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8 flex justify-center">
                <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center">
                  <motion.img 
                    src="/qr-certificate.svg" 
                    alt="Certificate QR Code" 
                    className="w-20 h-20 mr-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                  />
                  <div>
                    <div className="font-semibold text-green-800">REUSE Certified</div>
                    <div className="text-sm text-gray-600">Scan QR to verify on blockchain</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
        
        {verificationState === 'error' && (
          <motion.div
            className="bg-white shadow-lg rounded-lg overflow-hidden"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="p-4 bg-red-100 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="font-medium text-red-800">Certificate Not Found</span>
            </div>
            
            <div className="p-6 text-center">
              <p className="text-gray-700 mb-4">
                We couldn&apos;t find a valid certificate for the product ID &quot;{searchQuery}&quot;.
              </p>
              <p className="text-gray-500 mb-6">
                This may indicate that the product has not been certified or the ID is incorrect.
              </p>
              
              <div className="flex flex-col md:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setVerificationState('initial')}
                  className="btn-secondary"
                >
                  Try Again
                </motion.button>
                <Link href="/label/certification" className="btn-primary">
                  Apply for Certification
                </Link>
              </div>
            </div>
          </motion.div>
        )}
        
        <motion.div 
          className="mt-12 bg-white shadow-lg rounded-lg overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <div className="p-6">
            <h2 className="text-xl font-bold mb-4">How Verification Works</h2>
            <div className="space-y-4">
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold">1</span>
                </div>
                <p className="text-gray-700">
                  Every REUSE Label has a unique product ID that&apos;s verifiable on the blockchain
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold">2</span>
                </div>
                <p className="text-gray-700">
                  The verification process checks the certificate&apos;s validity directly on the blockchain
                </p>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0 h-6 w-6 bg-primary text-white rounded-full flex items-center justify-center mr-3">
                  <span className="text-sm font-bold">3</span>
                </div>
                <p className="text-gray-700">
                  Valid certificates confirm the product meets our sustainability and quality standards
                </p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
} 