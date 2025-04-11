'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Button from './Button';

interface BlockchainVerificationProps {
  transactionHash: string;
  productId: string;
  onVerify: () => void;
}

interface VerificationDetails {
  timestamp: string;
  block: number;
  network: string;
  status: string;
  gas: number;
}

export default function BlockchainVerification({ 
  transactionHash, 
  productId,
  onVerify 
}: BlockchainVerificationProps) {
  const [isVerifying, setIsVerifying] = useState(false);
  const [isVerified, setIsVerified] = useState(false);
  const [verificationDetails, setVerificationDetails] = useState<VerificationDetails | null>(null);

  // Mock blockchain verification
  const handleVerify = () => {
    setIsVerifying(true);

    // Simulate API call to blockchain
    setTimeout(() => {
      setIsVerified(true);
      setIsVerifying(false);
      setVerificationDetails({
        timestamp: new Date().toISOString(),
        block: Math.floor(Math.random() * 1000000) + 15000000,
        network: 'Ethereum',
        status: 'Confirmed',
        gas: Math.floor(Math.random() * 100000) + 50000,
      });
      onVerify();
    }, 2000);
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm"
    >
      <h3 className="text-lg font-semibold mb-4">Blockchain Verification</h3>
      
      {!isVerified ? (
        <div className="space-y-4">
          <p className="text-gray-600 text-sm">
            Verify this product&apos;s authentication on the blockchain network to ensure its
            legitimacy and track its history.
          </p>
          
          <div className="flex items-center bg-blue-50 border border-blue-100 rounded-md p-3">
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
            <div>
              <span className="block font-medium text-blue-700">Verify on Blockchain</span>
              <span className="text-xs text-blue-600">Product ID: {productId}</span>
            </div>
          </div>
          
          <div className="flex">
            <Button 
              onClick={handleVerify} 
              className="flex items-center w-full justify-center"
              isLoading={isVerifying}
              loadingText="Verifying..."
            >
              {!isVerifying && (
                <>
                  <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" 
                    />
                  </svg>
                  Verify Authenticity
                </>
              )}
            </Button>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center bg-green-50 border border-green-100 rounded-md p-3">
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
            <div>
              <span className="block font-medium text-green-700">Verification Successful</span>
              <span className="text-xs text-green-600">
                This product has been verified on the {verificationDetails?.network} blockchain
              </span>
            </div>
          </div>
          
          <div className="border border-gray-200 rounded-md overflow-hidden">
            <div className="bg-gray-50 p-3 border-b border-gray-200">
              <h4 className="font-medium text-gray-700 text-sm">Transaction Details</h4>
            </div>
            <div className="p-3 space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Transaction Hash:</span>
                <span className="font-mono text-xs bg-gray-100 p-1 rounded">
                  {transactionHash.slice(0, 8)}...{transactionHash.slice(-6)}
                </span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Block:</span>
                <span>{verificationDetails?.block}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Status:</span>
                <span className="text-green-600 font-medium">{verificationDetails?.status}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Network:</span>
                <span>{verificationDetails?.network}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">Timestamp:</span>
                <span>{new Date(verificationDetails?.timestamp).toLocaleString()}</span>
              </div>
            </div>
          </div>
          
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              className="flex items-center flex-1 justify-center"
              onClick={() => window.open(`https://etherscan.io/tx/${transactionHash}`, '_blank')}
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
              View on Etherscan
            </Button>
            <Button 
              variant="outline" 
              className="flex items-center flex-1 justify-center"
              onClick={() => window.open(`data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(verificationDetails))}`, '_blank')}
            >
              <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
              </svg>
              Export JSON
            </Button>
          </div>
        </div>
      )}
    </motion.div>
  );
} 