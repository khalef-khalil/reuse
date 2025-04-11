'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import Image from 'next/image';
import Link from 'next/link';

// Mock conversation data
const mockConversations = [
  {
    id: 'conv1',
    businessId: 'b2',
    businessName: 'GreenOffice Supplies',
    avatar: '/images/company1.png',
    lastMessage: 'I\'m interested in your LaserJet Printer. Is it still available?',
    timestamp: '2024-04-02T14:30:00Z',
    unread: true,
  },
  {
    id: 'conv2',
    businessId: 'b3',
    businessName: 'Sustainable Furnishings',
    avatar: '/images/company2.png',
    lastMessage: 'Yes, the chairs are still available. Would you like to schedule a viewing?',
    timestamp: '2024-04-01T09:15:00Z',
    unread: false,
  },
  {
    id: 'conv3',
    businessId: 'b1',
    businessName: 'EcoTech Solutions',
    avatar: '/images/company3.png',
    lastMessage: 'Great, I\'ll prepare the invoice for the 4 desks you requested.',
    timestamp: '2024-03-30T16:45:00Z',
    unread: false,
  },
  {
    id: 'conv4',
    businessId: 'b4',
    businessName: 'Circular Tech',
    avatar: '/images/company4.png',
    lastMessage: 'The MacBooks have been prepared for pickup. Let me know when you can come by.',
    timestamp: '2024-03-29T11:20:00Z',
    unread: false,
  },
];

// Mock messages for each conversation
const mockMessages = {
  conv1: [
    {
      id: 'm1',
      senderId: 'current-user',
      text: 'I\'m interested in your LaserJet Printer. Is it still available?',
      timestamp: '2024-04-02T14:30:00Z',
    },
    {
      id: 'm2',
      senderId: 'b2',
      text: 'Yes, it\'s still available! It\'s in great condition.',
      timestamp: '2024-04-02T14:35:00Z',
    },
    {
      id: 'm3',
      senderId: 'current-user',
      text: 'Great! What\'s the best price you can offer if I pick it up tomorrow?',
      timestamp: '2024-04-02T14:40:00Z',
    },
  ],
  conv2: [
    {
      id: 'm1',
      senderId: 'b3',
      text: 'Thank you for your interest in our conference room chairs.',
      timestamp: '2024-04-01T09:00:00Z',
    },
    {
      id: 'm2',
      senderId: 'current-user',
      text: 'Are these chairs still available? I need about 8 of them.',
      timestamp: '2024-04-01T09:10:00Z',
    },
    {
      id: 'm3',
      senderId: 'b3',
      text: 'Yes, the chairs are still available. Would you like to schedule a viewing?',
      timestamp: '2024-04-01T09:15:00Z',
    },
  ],
  conv3: [
    {
      id: 'm1',
      senderId: 'current-user',
      text: 'Hello, I\'m interested in your office desks. Do you have 4 available?',
      timestamp: '2024-03-30T16:30:00Z',
    },
    {
      id: 'm2',
      senderId: 'b1',
      text: 'Yes, we have 4 desks available. They\'re all in good condition.',
      timestamp: '2024-03-30T16:35:00Z',
    },
    {
      id: 'm3',
      senderId: 'current-user',
      text: 'Great! I\'d like to purchase all 4. Can you prepare an invoice?',
      timestamp: '2024-03-30T16:40:00Z',
    },
    {
      id: 'm4',
      senderId: 'b1',
      text: 'Great, I\'ll prepare the invoice for the 4 desks you requested.',
      timestamp: '2024-03-30T16:45:00Z',
    },
  ],
  conv4: [
    {
      id: 'm1',
      senderId: 'current-user',
      text: 'I\'d like to purchase 2 of your MacBook Pros. Are they still available?',
      timestamp: '2024-03-29T11:00:00Z',
    },
    {
      id: 'm2',
      senderId: 'b4',
      text: 'Yes, we have 3 available. Would you like to come see them?',
      timestamp: '2024-03-29T11:05:00Z',
    },
    {
      id: 'm3',
      senderId: 'current-user',
      text: 'No need. I\'ll take 2 of them. When can I pick them up?',
      timestamp: '2024-03-29T11:10:00Z',
    },
    {
      id: 'm4',
      senderId: 'b4',
      text: 'Perfect. We\'ll prepare them for pickup. Are you available tomorrow?',
      timestamp: '2024-03-29T11:15:00Z',
    },
    {
      id: 'm5',
      senderId: 'current-user',
      text: 'Yes, I can come by tomorrow afternoon around 2pm.',
      timestamp: '2024-03-29T11:18:00Z',
    },
    {
      id: 'm6',
      senderId: 'b4',
      text: 'The MacBooks have been prepared for pickup. Let me know when you can come by.',
      timestamp: '2024-03-29T11:20:00Z',
    },
  ],
};

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
}

export default function MessagesPage() {
  const [selectedConversation, setSelectedConversation] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [conversations, setConversations] = useState(mockConversations);
  const [messages, setMessages] = useState<Message[]>([]);
  
  // Format date for display
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const isToday = date.toDateString() === now.toDateString();
    
    if (isToday) {
      return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } else {
      return date.toLocaleDateString([], { month: 'short', day: 'numeric' });
    }
  };
  
  // Load messages when a conversation is selected
  useEffect(() => {
    if (selectedConversation) {
      setMessages(mockMessages[selectedConversation as keyof typeof mockMessages] || []);
      
      // Mark conversation as read
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === selectedConversation ? { ...conv, unread: false } : conv
        )
      );
    }
  }, [selectedConversation]);
  
  // Handle sending a new message
  const handleSendMessage = () => {
    if (messageText.trim() && selectedConversation) {
      const newMessage = {
        id: `m${Date.now()}`,
        senderId: 'current-user',
        text: messageText,
        timestamp: new Date().toISOString(),
      };
      
      // Update messages
      setMessages(prev => [...prev, newMessage]);
      
      // Update last message in conversation list
      setConversations(prevConversations => 
        prevConversations.map(conv => 
          conv.id === selectedConversation 
            ? { 
                ...conv, 
                lastMessage: messageText,
                timestamp: new Date().toISOString(),
              } 
            : conv
        )
      );
      
      // Clear input
      setMessageText('');
    }
  };
  
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { duration: 0.3 }
    }
  };
  
  const listItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.3 }
    },
    hover: {
      backgroundColor: 'rgba(59, 130, 246, 0.1)',
      transition: { duration: 0.2 }
    }
  };
  
  const messageVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.2 }
    }
  };
  
  return (
    <MainLayout>
      <div className="container-custom py-8">
        <div className="mb-6">
          <Link href="/business" className="flex items-center text-primary hover:underline">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            Back to Business Dashboard
          </Link>
        </div>
        
        <div className="mb-4">
          <h1 className="text-2xl font-bold">Messaging Center</h1>
          <p className="text-gray-600 dark:text-gray-400">Connect with businesses on the REUSE platform</p>
        </div>
      
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white dark:bg-neutral-dark rounded-lg shadow-lg overflow-hidden"
        >
          <div className="flex h-[600px]">
            {/* Conversation List */}
            <div className="w-1/3 border-r border-gray-200 dark:border-gray-700 overflow-y-auto">
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-lg font-semibold">Conversations</h2>
              </div>
              <div className="overflow-y-auto">
                {conversations.map((conversation) => (
                  <div 
                    key={conversation.id}
                    className={`p-4 border-b border-gray-100 dark:border-gray-800 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${
                      selectedConversation === conversation.id ? 'bg-gray-100 dark:bg-gray-800' : ''
                    }`}
                    onClick={() => setSelectedConversation(conversation.id)}
                  >
                    <div className="flex items-center">
                      <div className="relative flex-shrink-0">
                        <div className="w-12 h-12 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center">
                          <span className="text-gray-500 text-xs">Logo</span>
                        </div>
                        {conversation.unread && (
                          <span className="absolute -top-1 -right-1 w-3 h-3 bg-primary rounded-full"></span>
                        )}
                      </div>
                      <div className="ml-3 flex-grow min-w-0">
                        <div className="flex justify-between">
                          <h3 className="font-medium truncate">{conversation.businessName}</h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap ml-2">
                            {formatDate(conversation.timestamp)}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400 truncate mt-1">
                          {conversation.lastMessage}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Conversation View */}
            <div className="w-2/3 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center">
                    <div className="w-10 h-10 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mr-3">
                      <span className="text-gray-500 text-xs">Logo</span>
                    </div>
                    <div>
                      <h3 className="font-medium">
                        {conversations.find(c => c.id === selectedConversation)?.businessName}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-grow overflow-y-auto p-4">
                    {messages.map((message) => (
                      <div 
                        key={message.id}
                        className={`mb-4 flex ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div 
                          className={`max-w-xs md:max-w-md rounded-lg p-3 ${
                            message.senderId === 'current-user' 
                              ? 'bg-primary text-white' 
                              : 'bg-gray-100 dark:bg-gray-800'
                          }`}
                        >
                          <p className="text-sm">{message.text}</p>
                          <p className="text-xs text-right mt-1 opacity-70">
                            {formatDate(message.timestamp)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        className="flex-grow p-2 border rounded-l focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:border-gray-700"
                        placeholder="Type a message..."
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                      />
                      <button
                        onClick={handleSendMessage}
                        className="bg-primary text-white px-4 rounded-r hover:bg-primary-dark transition-colors"
                      >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex items-center justify-center h-full p-6 text-center">
                  <div>
                    <svg className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                    <h3 className="text-lg font-semibold mb-2">Select a conversation</h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Choose a conversation from the list to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </MainLayout>
  );
} 