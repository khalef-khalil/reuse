'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import MainLayout from '@/components/layout/MainLayout';

interface LabelLayoutProps {
  children: ReactNode;
}

export default function LabelLayout({ children }: LabelLayoutProps) {
  return (
    <MainLayout>
      <main>
        {children}

        <motion.div
          className="bg-primary/5 py-10 mt-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <div className="container-custom">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">About REUSE Label</h3>
                <p className="text-gray-600 text-sm">
                  Our certification system for revalued products promotes sustainability and reduces waste. 
                  By certifying products that would otherwise go to waste, we help businesses and consumers 
                  make environmentally responsible choices.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">Get Certified</h3>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li>• Submit your product for certification</li>
                  <li>• Receive verification from our team</li>
                  <li>• Get your blockchain certificate</li>
                  <li>• Display the REUSE Label on your product</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-3 text-primary">Contact Us</h3>
                <p className="text-gray-600 text-sm mb-2">
                  Have questions about the REUSE Label certification process?
                </p>
                <a href="mailto:label@reuseplatform.com" className="text-primary text-sm font-medium">
                  label@reuseplatform.com
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </main>
    </MainLayout>
  );
} 