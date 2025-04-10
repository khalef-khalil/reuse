// Food Waste Types
export interface FoodWasteItem {
  id: string;
  name: string;
  description: string;
  originalPrice: number;
  discountedPrice: number;
  discount: number;
  quantity: number;
  expirationDate: string;
  category: string;
  storeId: string;
  storeName: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  imageUrl: string;
  tags: string[];
  nutritionalInfo?: {
    calories?: number;
    carbs?: number;
    protein?: number;
    fat?: number;
    allergens?: string[];
  };
  verified: boolean;
  status: 'available' | 'reserved' | 'sold';
  createdAt: string;
  updatedAt: string;
}

// Business Types
export interface Business {
  id: string;
  name: string;
  description: string;
  logo: string;
  coverImage?: string;
  industry: string;
  size: string;
  location: {
    address: string;
    city: string;
    state: string;
    zipCode: string;
    coordinates: {
      latitude: number;
      longitude: number;
    };
  };
  contact: {
    email: string;
    phone: string;
    website?: string;
  };
  socialMedia?: {
    linkedin?: string;
    twitter?: string;
    facebook?: string;
    instagram?: string;
  };
  sustainabilityInfo?: {
    initiatives: string[];
    certifications: string[];
    goals: string[];
  };
  memberSince: string;
  verified: boolean;
}

// Marketplace Types
export interface MarketplaceItem {
  id: string;
  title: string;
  description: string;
  category: string;
  condition: string;
  price: number;
  negotiable: boolean;
  quantity: number;
  imageUrls: string[];
  businessId: string;
  businessName: string;
  businessLogo: string;
  location: {
    city: string;
    state: string;
  };
  tags: string[];
  listedDate: string;
  status: 'available' | 'pending' | 'sold';
  verified: boolean;
}

// Label Types
export interface ReuseLabel {
  id: string;
  productId: string;
  productName: string;
  businessId: string;
  businessName: string;
  certificationType: string;
  issueDate: string;
  expiryDate: string;
  verificationStatus: 'pending' | 'verified' | 'rejected';
  certificateUrl: string;
  transactions: LabelTransaction[];
}

export interface LabelTransaction {
  id: string;
  labelId: string;
  transactionType: 'issue' | 'transfer' | 'verify' | 'revoke';
  fromBusinessId?: string;
  toBusinessId?: string;
  timestamp: string;
  verifierId?: string;
  notes?: string;
}

// User Types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'consumer' | 'business' | 'admin';
  businessId?: string;
  profilePicture?: string;
  preferences?: {
    notifications: boolean;
    marketplaceAlerts: boolean;
    foodWasteAlerts: boolean;
  };
  joinDate: string;
}

// Message Types
export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  senderPicture?: string;
  content: string;
  timestamp: string;
  read: boolean;
  attachments?: {
    name: string;
    url: string;
    type: string;
  }[];
}

export interface Conversation {
  id: string;
  participants: {
    id: string;
    name: string;
    picture?: string;
    businessId?: string;
    businessName?: string;
  }[];
  lastMessage: {
    content: string;
    timestamp: string;
    senderId: string;
  };
  unreadCount: number;
  relatedItemId?: string;
  relatedItemType?: 'marketplace' | 'foodwaste' | 'label';
} 