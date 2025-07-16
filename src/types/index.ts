export type TenantType = 'organization' | 'sole_proprietor';

export interface Tenant {
  id: string;
  name: string;
  type: TenantType;
  settings: {
    branding?: {
      logo?: string;
      primaryColor?: string;
      companyName?: string;
    };
    features?: {
      adminPortal: boolean;
      realtorPortal: boolean;
      clientPortal: boolean;
    };
  };
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'realtor' | 'client';
  avatar?: string;
  phone?: string;
  department?: string;
  status: 'active' | 'inactive' | 'pending';
  lastLogin?: string;
  createdAt: string;
  tenantId: string;
}

export interface Property {
  id: string;
  title: string;
  price: string;
  location: string;
  bedrooms: number;
  bathrooms: number;
  area: string;
  image: string;
  features: string[];
  status: 'available' | 'sold' | 'pending';
  type: 'apartment' | 'house' | 'condo' | 'townhouse';
  realtorId: string;
  description?: string;
  virtualTourUrl?: string;
}

export interface Contact {
  id: string;
  name: string;
  email: string;
  phone: string;
  company?: string;
  status: 'active' | 'pending' | 'inactive';
  tags: string[];
  lastContact: string;
  source: 'website' | 'referral' | 'social' | 'cold_call';
  assignedTo?: string;
}

export interface Lead {
  id: string;
  name: string;
  email: string;
  phone: string;
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost';
  source: string;
  budget: string;
  preferences: {
    propertyType: string;
    location: string;
    bedrooms: number;
    maxPrice: number;
  };
  assignedTo: string;
  createdAt: string;
  lastActivity: string;
}

export interface Meeting {
  id: string;
  title: string;
  clientName: string;
  date: string;
  time: string;
  type: 'viewing' | 'consultation' | 'signing' | 'virtual_tour';
  status: 'scheduled' | 'completed' | 'cancelled';
  location?: string;
  notes?: string;
}

export interface Invoice {
  id: string;
  clientName: string;
  amount: string;
  status: 'paid' | 'pending' | 'overdue';
  dueDate: string;
  property: string;
  type: 'commission' | 'service' | 'consultation';
}

export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: 'text' | 'image' | 'document';
}

export interface Chat {
  id: string;
  participants: User[];
  lastMessage: ChatMessage;
  unreadCount: number;
}