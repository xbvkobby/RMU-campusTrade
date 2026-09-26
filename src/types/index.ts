export type Department = 
  | 'Nautical Science'
  | 'Marine Engineering'
  | 'Ports & Shipping Administration'
  | 'Marine Electrical & Electronics'
  | 'Computer Science & IT'
  | 'Logistics & Supply Chain';

export type AcademicLevel = 
  | 'Level 100'
  | 'Level 200'
  | 'Level 300'
  | 'Level 400'
  | 'Postgraduate';

export type HostelLocation = 
  | 'Titanic Hostel'
  | 'Cadet Block A'
  | 'Cadet Block B'
  | 'Mandela Hostel'
  | 'Maritime Hall'
  | 'Off-Campus (Nungua/Tema)';

export interface User {
  id: string;
  name: string;
  email: string;
  avatar: string;
  department: Department;
  level: AcademicLevel;
  hostel: HostelLocation;
  indexNumber: string;
  isVerified: boolean;
  verifiedAt?: string;
  phone: string;
  momoNumber?: string;
  trustScore: number;
  dealsCompleted: number;
  cadetBadge?: string;
  bio: string;
}

export type ItemCategory = 
  | 'all'
  | 'textbooks'
  | 'appliances'
  | 'cadet_gear'
  | 'electronics'
  | 'hostel_furniture'
  | 'study_tools';

export type ItemCondition = 
  | 'Brand New'
  | 'Like New (Flawless)'
  | 'Good (Minor wear)'
  | 'Fair (Fully functional)';

export interface Listing {
  id: string;
  title: string;
  price: number; // in GH₵
  originalPrice?: number;
  category: ItemCategory;
  condition: ItemCondition;
  description: string;
  images: string[];
  sellerId: string;
  seller: User;
  location: string;
  safeZoneRecommended: string;
  tags: string[];
  courseCode?: string;
  status: 'available' | 'reserved' | 'sold';
  postedAt: string;
  specs?: Record<string, string>;
  inspectionChecklist: string[];
  viewsCount: number;
  likesCount: number;
}

export type OfferStatus = 
  | 'pending'
  | 'accepted'
  | 'declined'
  | 'countered'
  | 'completed'
  | 'cancelled';

export interface Offer {
  id: string;
  listingId: string;
  buyerId: string;
  sellerId: string;
  amount: number;
  originalListingPrice: number;
  status: OfferStatus;
  counterAmount?: number;
  proposedLocation?: string;
  proposedTime?: string;
  createdAt: string;
  updatedAt: string;
  buyerName?: string;
}

export type MessageType = 
  | 'text'
  | 'offer'
  | 'offer_accepted'
  | 'offer_declined'
  | 'counter_offer'
  | 'meetup_scheduled'
  | 'handover_completed'
  | 'safety_tip';

export interface Message {
  id: string;
  conversationId: string;
  senderId: string;
  senderName: string;
  text: string;
  timestamp: string;
  type: MessageType;
  offerData?: {
    amount: number;
    offerId?: string;
    proposedLocation?: string;
    proposedTime?: string;
  };
}

export interface Conversation {
  id: string;
  listingId: string;
  listingTitle: string;
  listingPrice: number;
  listingImage: string;
  buyerId: string;
  buyerName: string;
  buyerAvatar: string;
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
  activeOffer?: Offer;
}
