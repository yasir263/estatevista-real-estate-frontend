export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  phone?: string;
  role: 'buyer' | 'seller' | 'investor' | 'agent';
  createdAt: string;
}

export interface SavedSearch {
  id: string;
  title: string;
  filters: Record<string, unknown>;
  createdAt: string;
  alertFrequency: 'daily' | 'weekly' | 'instant' | 'never';
  matchesCount: number;
}

export interface Appointment {
  id: string;
  propertyId: string;
  propertyTitle: string;
  propertyImage: string;
  propertyAddress: string;
  agentId: string;
  agentName: string;
  agentPhone: string;
  date: string;
  timeSlot: string;
  status: 'confirmed' | 'pending' | 'completed' | 'cancelled';
  type: 'in-person' | 'video-tour';
  notes?: string;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  recipientId: string;
  propertyId?: string;
  propertyTitle?: string;
  content: string;
  createdAt: string;
  isRead: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  type: 'price_drop' | 'appointment' | 'inquiry_response' | 'saved_search_alert';
  link?: string;
}
