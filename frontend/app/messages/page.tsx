'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import MainLayout from '../../components/layout/MainLayout';
import Button from '../../components/ui/Button';
import Image from 'next/image';

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
      <motion.div 
        className="container mx-auto p-4 max-w-7xl"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="flex flex-col mb-6">
          <motion.h1 
            className="text-3xl font-bold text-gray-800"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Messaging Center
          </motion.h1>
          <motion.p 
            className="text-gray-600 mt-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Connect with businesses on the REUSE platform
          </motion.p>
        </div>
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
          <div className="flex h-[calc(100vh-250px)] min-h-[500px]">
            {/* Conversation List */}
            <div className="w-1/3 border-r border-gray-200 overflow-y-auto">
              <div className="p-4 border-b border-gray-200">
                <h2 className="text-lg font-semibold text-gray-800">Conversations</h2>
              </div>
              <AnimatePresence>
                {conversations.map((conv) => (
                  <motion.div
                    key={conv.id}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    whileHover="hover"
                    onClick={() => setSelectedConversation(conv.id)}
                    className={`p-4 border-b border-gray-100 cursor-pointer ${
                      selectedConversation === conv.id ? 'bg-blue-50' : ''
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12 relative">
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
                          {conv.avatar ? (
                            <Image src={conv.avatar} alt={conv.businessName} width={48} height={48} className="object-cover" />
                          ) : (
                            <span className="text-lg font-semibold text-gray-500">{conv.businessName.charAt(0)}</span>
                          )}
                        </div>
                        {conv.unread && (
                          <div className="absolute top-0 right-0 w-3 h-3 bg-blue-500 rounded-full border-2 border-white"></div>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="font-medium text-gray-900 truncate">{conv.businessName}</h3>
                          <span className="text-xs text-gray-500">{formatDate(conv.timestamp)}</span>
                        </div>
                        <p className={`text-sm truncate ${conv.unread ? 'font-semibold text-gray-900' : 'text-gray-500'}`}>
                          {conv.lastMessage}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
            
            {/* Message Area */}
            <div className="w-2/3 flex flex-col">
              {selectedConversation ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
                    <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                      {(() => {
                        const conv = conversations.find(c => c.id === selectedConversation);
                        return conv?.avatar ? (
                          <Image src={conv.avatar} alt={conv.businessName} width={40} height={40} className="rounded-full object-cover" />
                        ) : (
                          <span className="text-lg font-semibold text-gray-500">{conv?.businessName.charAt(0)}</span>
                        );
                      })()}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">
                        {conversations.find(c => c.id === selectedConversation)?.businessName}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Messages */}
                  <div className="flex-1 p-4 overflow-y-auto bg-gray-50">
                    <AnimatePresence>
                      {messages.map((message) => (
                        <motion.div
                          key={message.id}
                          variants={messageVariants}
                          initial="hidden"
                          animate="visible"
                          exit={{ opacity: 0 }}
                          className={`flex mb-4 ${message.senderId === 'current-user' ? 'justify-end' : 'justify-start'}`}
                        >
                          <div 
                            className={`max-w-[70%] p-3 rounded-lg ${
                              message.senderId === 'current-user' 
                                ? 'bg-blue-500 text-white rounded-br-none' 
                                : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                            }`}
                          >
                            <p className="text-sm">{message.text}</p>
                            <p className={`text-xs mt-1 ${message.senderId === 'current-user' ? 'text-blue-100' : 'text-gray-500'}`}>
                              {formatDate(message.timestamp)}
                            </p>
                          </div>
                        </motion.div>
                      ))}
                    </AnimatePresence>
                  </div>
                  
                  {/* Message Input */}
                  <div className="p-4 border-t border-gray-200">
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Type a message..."
                        className="flex-1 p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                      <Button onClick={handleSendMessage} disabled={!messageText.trim()}>
                        Send
                      </Button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex flex-col items-center justify-center p-8 bg-gray-50">
                  <div className="w-20 h-20 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">No conversation selected</h3>
                  <p className="text-gray-500 text-center max-w-md">
                    Select a conversation from the list on the left to view messages, or start a new conversation from a business profile.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </MainLayout>
  );
} 