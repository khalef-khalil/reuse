'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import MainLayout from '../../../components/layout/MainLayout';
import Button from '../../../components/ui/Button';
import MessageModal from '../../../components/ui/MessageModal';
import TransactionVerification from './TransactionVerification';

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
    tags: ['Office', 'Furniture', 'Wood', 'Sustainable'],
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
    transactionVerified: true,
    transactionHash: '0x8f6d3d5e9bb4d44a7bdeaaa718326a4c9aee37a1dda0a3e0c0e9e7b061b4c1a3'
  },
  {
    id: 'p2',
    title: 'Dell OptiPlex Desktops',
    image: '/images/placeholder.png',
    price: 2500,
    condition: 'Excellent',
    category: 'Electronics',
    location: 'Nairobi, Kenya',
    tags: ['Computers', 'Dell', 'Office', 'Refurbished'],
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
    transactionVerified: true,
    transactionHash: '0x7e6d3d5e9bb4d44a7bdeaaa718326a4c9aee37a1dda0a3e0c0e9e7b061b4c2b2'
  },
  {
    id: 'p3',
    title: 'Conference Room Chairs',
    image: '/images/placeholder.png',
    price: 800,
    condition: 'Fair',
    category: 'Furniture',
    location: 'Mombasa, Kenya',
    tags: ['Chairs', 'Office', 'Ergonomic', 'Conference'],
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
    transactionVerified: false,
    transactionHash: ''
  },
  {
    id: 'p4',
    title: 'HP Color LaserJet Printer',
    image: '/images/placeholder.png',
    price: 350,
    condition: 'Good',
    category: 'Electronics',
    location: 'Nairobi, Kenya',
    tags: ['Printer', 'Office', 'HP', 'Color'],
    quantity: 1,
    description: 'HP Color LaserJet Pro MFP. Works perfectly, selling because we upgraded to a newer model.',
    createdAt: '2024-01-10',
    specifications: [
      { name: 'Brand', value: 'HP' },
      { name: 'Model', value: 'Color LaserJet Pro MFP M477fdw' },
      { name: 'Functions', value: 'Print, Scan, Copy, Fax' },
      { name: 'Connectivity', value: 'USB, Ethernet, WiFi' },
      { name: 'Pages Printed', value: 'Approximately 15,000' },
      { name: 'Age', value: '3 years' },
    ],
    businessId: 'b2',
    businessName: 'GreenOffice Supplies',
    businessDescription: 'Provider of eco-friendly office supplies and equipment.',
    businessContact: 'sales@greenoffice.co.ke',
    businessPhone: '+254 111 222 333',
    verified: true,
    transactionVerified: true,
    transactionHash: '0x5f6d3d5e9bb4d44a7bdeaaa718326a4c9aee37a1dda0a3e0c0e9e7b061b4c3c1'
  },
];

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [relatedProducts, setRelatedProducts] = useState<typeof allListings>([]);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Find the product based on the ID from the URL
  const product = allListings.find(item => item.id === id);

  // Find related products based on category and tags
  useEffect(() => {
    if (product) {
      const filtered = allListings.filter(item => 
        item.id !== product.id && (
          item.category === product.category ||
          item.tags?.some(tag => product.tags?.includes(tag))
        )
      ).slice(0, 3); // Limit to 3 related products
      
      setRelatedProducts(filtered);
    }
  }, [product]);

  if (!product) {
    return (
      <MainLayout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">The product you&apos;re looking for doesn&apos;t exist or has been removed.</p>
          <Link href="/marketplace">
            <Button>Return to Marketplace</Button>
          </Link>
        </div>
      </MainLayout>
    );
  }

  const handleSendMessage = (message: string) => {
    console.log('Sending message:', message);
    // In a real app, this would send the message to an API
    
    // Simulate navigation to messages page
    setTimeout(() => {
      router.push('/messages');
    }, 500);
  };
  
  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    // In a real app, this would update the user's wishlist in the database
  };

  const pageVariants = {
    initial: { opacity: 0 },
    animate: { 
      opacity: 1,
      transition: { duration: 0.5 }
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
              
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-4">
                {product.tags?.map(tag => (
                  <motion.span 
                    key={tag}
                    className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-full"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    #{tag}
                  </motion.span>
                ))}
              </div>
              
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                {product.description}
              </p>
              
              {/* Blockchain Verification */}
              {product.transactionVerified && (
                <div className="mb-6 p-3 bg-green-50 border border-green-100 rounded-md">
                  <div className="flex items-center mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-green-500 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="font-medium text-green-700">Blockchain Verified</span>
                  </div>
                  <p className="text-sm text-green-600">
                    This product listing has been verified on the blockchain, ensuring authenticity and transparency.
                  </p>
                  <div className="mt-2 flex items-center">
                    <span className="text-xs text-gray-500 truncate flex-1">
                      Transaction: {product.transactionHash.slice(0, 10)}...{product.transactionHash.slice(-8)}
                    </span>
                    <button className="text-xs text-blue-600 hover:underline">
                      View on Etherscan
                    </button>
                  </div>
                </div>
              )}

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
                <Button onClick={() => setIsMessageModalOpen(true)} className="flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  Contact Seller
                </Button>
                <Button 
                  variant={isWishlisted ? "outline" : "outline"}
                  onClick={handleToggleWishlist}
                  className={`flex items-center justify-center ${isWishlisted ? 'text-red-500 border-red-500 hover:bg-red-50' : ''}`}
                >
                  {isWishlisted ? (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                      </svg>
                      Added to Wishlist
                    </>
                  ) : (
                    <>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                      Add to Wishlist
                    </>
                  )}
                </Button>
              </div>
              
              {/* Transaction Verification - Integration */}
              <div className="mt-6">
                <TransactionVerification 
                  productId={product.id}
                  transactionHash={product.transactionHash}
                  isVerified={product.transactionVerified}
                />
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
                {product.specifications?.map((spec, index) => (
                  <div key={index} className="flex">
                    <span className="font-medium w-1/3">{spec.name}:</span>
                    <span className="text-gray-600 dark:text-gray-300 w-2/3">{spec.value}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Seller Information and Actions */}
          <motion.div 
            className="space-y-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            {/* Seller Information */}
            <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center mr-3">
                  <span className="text-xl font-bold text-gray-500 dark:text-gray-300">
                    {product.businessName.charAt(0)}
                  </span>
                </div>
                <div>
                  <h3 className="font-bold text-lg flex items-center">
                    {product.businessName}
                    {product.verified && (
                      <svg className="w-5 h-5 text-blue-500 ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                      </svg>
                    )}
                  </h3>
                  {product.verified ? (
                    <span className="text-sm text-green-600">Verified Seller</span>
                  ) : (
                    <span className="text-sm text-gray-500">Unverified Seller</span>
                  )}
                </div>
              </div>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {product.businessDescription}
              </p>
              <div className="space-y-2">
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{product.businessContact}</span>
                </div>
                <div className="flex items-center">
                  <svg className="w-5 h-5 text-gray-500 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-gray-600 dark:text-gray-300">{product.businessPhone}</span>
                </div>
              </div>
            </div>

            {/* Similar Products */}
            <div className="bg-white dark:bg-neutral-dark rounded-lg shadow-md p-6">
              <h3 className="font-bold text-lg mb-4">Related Products</h3>
              <div className="space-y-4">
                {relatedProducts.length > 0 ? (
                  relatedProducts.map((item) => (
                    <motion.div 
                      key={item.id}
                      variants={cardVariants}
                      initial="hidden"
                      animate="visible"
                      whileHover="hover"
                      className="p-3 border border-gray-200 dark:border-gray-700 rounded-lg hover:shadow transition-shadow cursor-pointer"
                      onClick={() => router.push(`/marketplace/${item.id}`)}
                    >
                      <div className="flex space-x-3">
                        <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded flex items-center justify-center flex-shrink-0">
                          <span className="text-xs text-gray-400">Image</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm truncate">{item.title}</h4>
                          <p className="text-primary font-bold text-sm">${item.price}</p>
                          <div className="flex items-center mt-1">
                            <span className="text-xs px-2 py-0.5 rounded-full bg-gray-100 dark:bg-gray-700">
                              {item.condition}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 text-sm">
                    No related products found.
                  </p>
                )}
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
      
      {/* Message Modal */}
      <MessageModal
        isOpen={isMessageModalOpen}
        businessName={product.businessName}
        productTitle={product.title}
        onClose={() => setIsMessageModalOpen(false)}
        onSend={handleSendMessage}
      />
    </MainLayout>
  );
} 