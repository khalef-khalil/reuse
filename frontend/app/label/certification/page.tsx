'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';

interface Product {
  id: string;
  name: string;
  type: string;
  description: string;
  condition: string;
  status: 'pending' | 'approved' | 'rejected';
  certificateId?: string;
}

export default function CertificationPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    productName: '',
    productType: '',
    description: '',
    condition: 'good',
    photos: [] as File[],
  });
  
  // Mock data for existing products
  const [products, setProducts] = useState<Product[]>([
    {
      id: 'prod-001',
      name: 'Office Desk',
      type: 'Furniture',
      description: 'Slightly scratched wooden desk, fully functional',
      condition: 'Good',
      status: 'approved',
      certificateId: '0x123456789abcdef',
    },
    {
      id: 'prod-002',
      name: 'HP Printer',
      type: 'Electronics',
      description: 'Used printer with minor cosmetic damage',
      condition: 'Fair',
      status: 'pending',
    },
  ]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would submit to the API and blockchain
    const newProduct: Product = {
      id: `prod-${Math.floor(Math.random() * 1000)}`,
      name: formData.productName,
      type: formData.productType,
      description: formData.description,
      condition: formData.condition,
      status: 'pending',
    };
    
    setProducts([...products, newProduct]);
    
    // Reset form and move to success step
    setFormData({
      productName: '',
      productType: '',
      description: '',
      condition: 'good',
      photos: [],
    });
    
    setStep(3);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData({
        ...formData,
        photos: Array.from(e.target.files),
      });
    }
  };

  const conditionalRender = () => {
    switch (step) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between mb-8">
              <h2 className="text-2xl font-bold">Apply for Certification</h2>
              <button 
                onClick={() => setStep(2)} 
                className="btn-secondary"
              >
                Manage Certificates
              </button>
            </div>
            
            <div className="bg-white shadow-lg rounded-lg p-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Product Name</label>
                  <input
                    type="text"
                    name="productName"
                    value={formData.productName}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Product Type</label>
                  <input
                    type="text"
                    name="productType"
                    value={formData.productType}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Description</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    rows={4}
                    required
                  ></textarea>
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2">Condition</label>
                  <select
                    name="condition"
                    value={formData.condition}
                    onChange={handleChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    required
                  >
                    <option value="excellent">Excellent</option>
                    <option value="good">Good</option>
                    <option value="fair">Fair</option>
                    <option value="poor">Poor (but usable)</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">Upload Photos</label>
                  <input
                    type="file"
                    name="photos"
                    onChange={handleFileChange}
                    className="w-full p-2 border border-gray-300 rounded-md"
                    multiple
                    accept="image/*"
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Upload at least 3 photos showing the product from different angles
                  </p>
                </div>
                
                <div className="mb-4">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="terms"
                      name="terms"
                      className="mr-2"
                      required
                    />
                    <label htmlFor="terms" className="text-sm text-gray-700">
                      I confirm that this product is in usable condition and agree to the REUSE Label terms
                    </label>
                  </div>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="btn-primary w-full py-3"
                  type="submit"
                >
                  Submit for Certification
                </motion.button>
              </form>
            </div>
          </motion.div>
        );
      
      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex justify-between mb-8">
              <h2 className="text-2xl font-bold">My Certificates</h2>
              <button 
                onClick={() => setStep(1)} 
                className="btn-secondary"
              >
                Apply for New Certificate
              </button>
            </div>
            
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
              <div className="p-4 bg-primary/10 border-b border-gray-200">
                <div className="grid grid-cols-12 font-medium text-gray-700">
                  <div className="col-span-3">Product</div>
                  <div className="col-span-2">Type</div>
                  <div className="col-span-3">Status</div>
                  <div className="col-span-4">Actions</div>
                </div>
              </div>
              
              <div className="divide-y divide-gray-200">
                {products.map((product) => (
                  <motion.div 
                    key={product.id}
                    className="p-4 grid grid-cols-12 items-center"
                    whileHover={{ backgroundColor: '#f9fafb' }}
                  >
                    <div className="col-span-3 font-medium">{product.name}</div>
                    <div className="col-span-2 text-gray-600">{product.type}</div>
                    <div className="col-span-3">
                      <span 
                        className={`px-2 py-1 rounded-full text-xs font-medium ${
                          product.status === 'approved' 
                            ? 'bg-green-100 text-green-800' 
                            : product.status === 'rejected'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                      </span>
                    </div>
                    <div className="col-span-4 flex space-x-2">
                      {product.status === 'approved' && (
                        <>
                          <button className="btn-secondary py-1 px-3 text-sm">
                            Download Label
                          </button>
                          <button className="btn-primary py-1 px-3 text-sm">
                            View Certificate
                          </button>
                        </>
                      )}
                      {product.status === 'pending' && (
                        <span className="text-gray-600 text-sm">
                          Under review
                        </span>
                      )}
                      {product.status === 'rejected' && (
                        <button className="btn-secondary py-1 px-3 text-sm">
                          View Details
                        </button>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        );
        
      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-8"
          >
            <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold mb-2">Application Submitted!</h2>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Your product has been submitted for certification. We&apos;ll review your application and get back to you shortly.
            </p>
            
            <div className="flex space-x-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(2)}
                className="btn-primary"
              >
                View My Certificates
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(1)}
                className="btn-secondary"
              >
                Submit Another Product
              </motion.button>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
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
        <h1 className="text-4xl font-bold mb-2">Product Certification</h1>
        <p className="text-xl max-w-2xl mx-auto text-gray-600">
          Register your products to receive the REUSE Label certification
        </p>
      </motion.div>
      
      {conditionalRender()}
    </div>
  );
} 