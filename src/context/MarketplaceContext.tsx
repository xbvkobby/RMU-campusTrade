import React, { createContext, useContext, useState, useEffect } from 'react';
import { User, Listing, Conversation, Message, Offer, ItemCategory, ItemCondition } from '../types';
import { INITIAL_USERS, INITIAL_LISTINGS, INITIAL_CONVERSATIONS, INITIAL_MESSAGES } from '../data/mockData';
import confetti from 'canvas-confetti';

interface MarketplaceContextType {
  currentUser: User;
  users: User[];
  setCurrentUser: (user: User) => void;
  switchUserById: (userId: string) => void;
  updateCurrentUserProfile: (updatedData: Partial<User>) => void;
  verifyCurrentStudent: (indexNumber: string, department: User['department'], level: User['level'], idCardPreview?: string) => void;

  // Listings
  listings: Listing[];
  addListing: (newListing: Omit<Listing, 'id' | 'sellerId' | 'seller' | 'postedAt' | 'viewsCount' | 'likesCount' | 'status'>) => void;
  markListingSold: (listingId: string) => void;
  toggleLikeListing: (listingId: string) => void;
  incrementListingViews: (listingId: string) => void;
  deleteListing: (listingId: string) => void;

  // Search & Filters
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  selectedCategory: ItemCategory;
  setSelectedCategory: (cat: ItemCategory) => void;
  selectedCondition: string;
  setSelectedCondition: (cond: string) => void;
  selectedHostel: string;
  setSelectedHostel: (hostel: string) => void;
  maxPrice: number;
  setMaxPrice: (price: number) => void;
  verifiedOnly: boolean;
  setVerifiedOnly: (val: boolean) => void;
  sortBy: 'recent' | 'price_asc' | 'price_desc' | 'popular';
  setSortBy: (sort: 'recent' | 'price_asc' | 'price_desc' | 'popular') => void;

  // Favorites
  favorites: string[];
  toggleFavorite: (listingId: string) => void;
  isFavorite: (listingId: string) => boolean;
  showFavoritesOnly: boolean;
  setShowFavoritesOnly: (val: boolean) => void;
  favoritesCount: number;

  // Modals & Navigation
  selectedListing: Listing | null;
  setSelectedListing: (listing: Listing | null) => void;
  isNewListingModalOpen: boolean;
  setIsNewListingModalOpen: (open: boolean) => void;
  isChatModalOpen: boolean;
  setIsChatModalOpen: (open: boolean) => void;
  isVerificationModalOpen: boolean;
  setIsVerificationModalOpen: (open: boolean) => void;
  isSafetyGuideOpen: boolean;
  setIsSafetyGuideOpen: (open: boolean) => void;
  isSafeZonesOpen: boolean;
  setIsSafeZonesOpen: (open: boolean) => void;

  // Messaging & Negotiations
  conversations: Conversation[];
  messages: Record<string, Message[]>;
  activeConversationId: string | null;
  setActiveConversationId: (convId: string | null) => void;
  openChatForListing: (listing: Listing) => void;
  sendMessage: (convId: string, text: string) => void;
  makeOffer: (convId: string, amount: number, proposedLocation?: string, proposedTime?: string) => void;
  acceptOffer: (convId: string, offerId: string) => void;
  declineOffer: (convId: string, offerId: string) => void;
  counterOffer: (convId: string, offerId: string, counterAmount: number) => void;
  confirmHandover: (convId: string, listingId: string) => void;
  unreadCountTotal: number;
}

const MarketplaceContext = createContext<MarketplaceContextType | undefined>(undefined);

export const MarketplaceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Local storage state keys
  const [users, setUsers] = useState<User[]>(() => {
    const saved = localStorage.getItem('rmu_users');
    return saved ? JSON.parse(saved) : INITIAL_USERS;
  });

  const [currentUserId, setCurrentUserId] = useState<string>(() => {
    return localStorage.getItem('rmu_current_user_id') || 'user_kwame';
  });

  const currentUser = users.find(u => u.id === currentUserId) || users[0];

  const [listings, setListings] = useState<Listing[]>(() => {
    const saved = localStorage.getItem('rmu_listings');
    if (!saved) return INITIAL_LISTINGS;
    try {
      const parsed: Listing[] = JSON.parse(saved);
      // Ensure initial listings have their accurate generated photos and list_tv is present
      const updated = parsed.map(item => {
        const initial = INITIAL_LISTINGS.find(init => init.id === item.id);
        if (initial && initial.images[0]?.startsWith('/src/assets/images')) {
          return { ...item, images: initial.images };
        }
        return item;
      });
      if (!updated.some(i => i.id === 'list_tv')) {
        const tvItem = INITIAL_LISTINGS.find(i => i.id === 'list_tv');
        if (tvItem) updated.splice(1, 0, tvItem);
      }
      return updated;
    } catch {
      return INITIAL_LISTINGS;
    }
  });

  const [conversations, setConversations] = useState<Conversation[]>(() => {
    const saved = localStorage.getItem('rmu_conversations');
    if (!saved) return INITIAL_CONVERSATIONS;
    try {
      const parsed: Conversation[] = JSON.parse(saved);
      return parsed.map(conv => {
        const initial = INITIAL_CONVERSATIONS.find(init => init.id === conv.id);
        if (initial && initial.listingImage.startsWith('/src/assets/images')) {
          return { ...conv, listingImage: initial.listingImage };
        }
        return conv;
      });
    } catch {
      return INITIAL_CONVERSATIONS;
    }
  });

  const [messages, setMessages] = useState<Record<string, Message[]>>(() => {
    const saved = localStorage.getItem('rmu_messages');
    return saved ? JSON.parse(saved) : INITIAL_MESSAGES;
  });

  // Filter States
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<ItemCategory>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedHostel, setSelectedHostel] = useState<string>('all');
  const [maxPrice, setMaxPrice] = useState<number>(3000);
  const [verifiedOnly, setVerifiedOnly] = useState<boolean>(false);
  const [sortBy, setSortBy] = useState<'recent' | 'price_asc' | 'price_desc' | 'popular'>('recent');

  // Favorites
  const [favorites, setFavorites] = useState<string[]>(() => {
    const saved = localStorage.getItem(`rmu_favorites_${currentUserId}`);
    return saved ? JSON.parse(saved) : ['list_1', 'list_4'];
  });
  const [showFavoritesOnly, setShowFavoritesOnly] = useState<boolean>(false);

  // Sync favorites on user switch
  useEffect(() => {
    const saved = localStorage.getItem(`rmu_favorites_${currentUserId}`);
    if (saved) {
      setFavorites(JSON.parse(saved));
    } else {
      setFavorites(['list_1', 'list_4']);
    }
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem(`rmu_favorites_${currentUserId}`, JSON.stringify(favorites));
  }, [favorites, currentUserId]);

  const toggleFavorite = (listingId: string) => {
    setFavorites(prev => {
      const exists = prev.includes(listingId);
      const updated = exists ? prev.filter(id => id !== listingId) : [...prev, listingId];

      setListings(listPrev => listPrev.map(item => {
        if (item.id === listingId) {
          return {
            ...item,
            likesCount: Math.max(0, item.likesCount + (exists ? -1 : 1))
          };
        }
        return item;
      }));

      return updated;
    });
  };

  const isFavorite = (listingId: string) => favorites.includes(listingId);
  const favoritesCount = favorites.length;

  // Modals
  const [selectedListing, setSelectedListing] = useState<Listing | null>(null);
  const [isNewListingModalOpen, setIsNewListingModalOpen] = useState(false);
  const [isChatModalOpen, setIsChatModalOpen] = useState(false);
  const [isVerificationModalOpen, setIsVerificationModalOpen] = useState(false);
  const [isSafetyGuideOpen, setIsSafetyGuideOpen] = useState(false);
  const [isSafeZonesOpen, setIsSafeZonesOpen] = useState(false);
  const [activeConversationId, setActiveConversationId] = useState<string | null>(null);

  // Sync to localStorage
  useEffect(() => {
    localStorage.setItem('rmu_users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('rmu_current_user_id', currentUserId);
  }, [currentUserId]);

  useEffect(() => {
    localStorage.setItem('rmu_listings', JSON.stringify(listings));
  }, [listings]);

  useEffect(() => {
    localStorage.setItem('rmu_conversations', JSON.stringify(conversations));
  }, [conversations]);

  useEffect(() => {
    localStorage.setItem('rmu_messages', JSON.stringify(messages));
  }, [messages]);

  const switchUserById = (userId: string) => {
    setCurrentUserId(userId);
  };

  const setCurrentUser = (user: User) => {
    setUsers(prev => prev.map(u => u.id === user.id ? user : u));
    setCurrentUserId(user.id);
  };

  const updateCurrentUserProfile = (updatedData: Partial<User>) => {
    setUsers(prev => prev.map(u => {
      if (u.id === currentUserId) {
        return { ...u, ...updatedData };
      }
      return u;
    }));
  };

  const verifyCurrentStudent = (
    indexNumber: string,
    department: User['department'],
    level: User['level']
  ) => {
    setUsers(prev => prev.map(u => {
      if (u.id === currentUserId) {
        return {
          ...u,
          indexNumber,
          department,
          level,
          isVerified: true,
          verifiedAt: 'Just Now',
          trustScore: Math.max(u.trustScore, 4.9)
        };
      }
      return u;
    }));
    // Also update current user's listings to show verified
    setListings(prev => prev.map(item => {
      if (item.sellerId === currentUserId) {
        return {
          ...item,
          seller: {
            ...item.seller,
            isVerified: true,
            indexNumber,
            department,
            level
          }
        };
      }
      return item;
    }));

    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const addListing = (newListingData: Omit<Listing, 'id' | 'sellerId' | 'seller' | 'postedAt' | 'viewsCount' | 'likesCount' | 'status'>) => {
    const newId = 'list_' + Date.now();
    const createdItem: Listing = {
      ...newListingData,
      id: newId,
      sellerId: currentUser.id,
      seller: currentUser,
      postedAt: 'Just now',
      viewsCount: 1,
      likesCount: 0,
      status: 'available'
    };

    setListings(prev => [createdItem, ...prev]);
    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch {
      // ignore
    }
  };

  const markListingSold = (listingId: string) => {
    setListings(prev => prev.map(l => l.id === listingId ? { ...l, status: 'sold' } : l));
  };

  const deleteListing = (listingId: string) => {
    setListings(prev => prev.filter(l => l.id !== listingId));
    if (selectedListing?.id === listingId) {
      setSelectedListing(null);
    }
  };

  const toggleLikeListing = (listingId: string) => {
    setListings(prev => prev.map(l => {
      if (l.id === listingId) {
        return { ...l, likesCount: l.likesCount + 1 };
      }
      return l;
    }));
  };

  const incrementListingViews = (listingId: string) => {
    setListings(prev => prev.map(l => {
      if (l.id === listingId) {
        return { ...l, viewsCount: l.viewsCount + 1 };
      }
      return l;
    }));
  };

  // Chat and negotiation methods
  const openChatForListing = (listing: Listing) => {
    // If the user is the seller, find any conversation for this listing or open existing
    let targetConv = conversations.find(c => 
      c.listingId === listing.id && 
      (c.buyerId === currentUser.id || c.sellerId === currentUser.id)
    );

    if (!targetConv) {
      // Create new conversation
      const newConvId = `conv_${Date.now()}`;
      targetConv = {
        id: newConvId,
        listingId: listing.id,
        listingTitle: listing.title,
        listingPrice: listing.price,
        listingImage: listing.images[0] || '',
        buyerId: currentUser.id,
        buyerName: currentUser.name,
        buyerAvatar: currentUser.avatar,
        sellerId: listing.seller.id,
        sellerName: listing.seller.name,
        sellerAvatar: listing.seller.avatar,
        lastMessage: `Started inquiry for ${listing.title}`,
        lastMessageAt: 'Just now',
        unreadCount: 0
      };

      setConversations(prev => [targetConv!, ...prev]);
      
      // Seed welcome prompt message
      const initialMsg: Message = {
        id: 'msg_' + Date.now(),
        conversationId: newConvId,
        senderId: 'system',
        senderName: 'RMU SafeTrade System',
        text: `Welcome to the secure negotiation thread for "${listing.title}". Always inspect items at designated RMU Safe Zones (e.g., Library Foyer or Main Gate) before making MoMo/cash transfer.`,
        timestamp: 'Just now',
        type: 'safety_tip'
      };

      setMessages(prev => ({
        ...prev,
        [newConvId]: [initialMsg]
      }));
    }

    setActiveConversationId(targetConv.id);
    setIsChatModalOpen(true);
  };

  const sendMessage = (convId: string, text: string) => {
    if (!text.trim()) return;

    const newMsg: Message = {
      id: 'msg_' + Date.now(),
      conversationId: convId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'text'
    };

    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), newMsg]
    }));

    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        return {
          ...c,
          lastMessage: text.trim(),
          lastMessageAt: 'Just now'
        };
      }
      return c;
    }));

    // If simulating auto peer response when testing alone
    const currentConv = conversations.find(c => c.id === convId);
    if (currentConv && currentConv.sellerId !== currentUser.id && currentConv.buyerId === currentUser.id) {
      setTimeout(() => {
        const peer = users.find(u => u.id === currentConv.sellerId);
        if (!peer) return;

        const peerReplyText = getSimulatedPeerReply(text, peer.name);
        if (!peerReplyText) return;

        const peerMsg: Message = {
          id: 'msg_peer_' + Date.now(),
          conversationId: convId,
          senderId: peer.id,
          senderName: peer.name,
          text: peerReplyText,
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text'
        };

        setMessages(prev => ({
          ...prev,
          [convId]: [...(prev[convId] || []), peerMsg]
        }));

        setConversations(prev => prev.map(c => {
          if (c.id === convId) {
            return {
              ...c,
              lastMessage: peerReplyText,
              lastMessageAt: 'Just now'
            };
          }
          return c;
        }));
      }, 1200);
    }
  };

  const makeOffer = (convId: string, amount: number, proposedLocation = 'RMU Library Foyer', proposedTime = 'Tomorrow at 4:00 PM') => {
    const currentConv = conversations.find(c => c.id === convId);
    if (!currentConv) return;

    const newOffer: Offer = {
      id: 'off_' + Date.now(),
      listingId: currentConv.listingId,
      buyerId: currentUser.id,
      sellerId: currentConv.sellerId,
      amount,
      originalListingPrice: currentConv.listingPrice,
      status: 'pending',
      proposedLocation,
      proposedTime,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      buyerName: currentUser.name
    };

    const offerMessage: Message = {
      id: 'msg_off_' + Date.now(),
      conversationId: convId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: `Proposed an offer of GH₵ ${amount.toLocaleString()} (Original: GH₵ ${currentConv.listingPrice.toLocaleString()}) at ${proposedLocation}`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'offer',
      offerData: {
        amount,
        offerId: newOffer.id,
        proposedLocation,
        proposedTime
      }
    };

    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), offerMessage]
    }));

    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        return {
          ...c,
          activeOffer: newOffer,
          lastMessage: `Offered GH₵ ${amount.toLocaleString()}`,
          lastMessageAt: 'Just now'
        };
      }
      return c;
    }));
  };

  const acceptOffer = (convId: string, offerId: string) => {
    const currentConv = conversations.find(c => c.id === convId);
    if (!currentConv || !currentConv.activeOffer) return;

    const updatedOffer: Offer = {
      ...currentConv.activeOffer,
      status: 'accepted',
      updatedAt: new Date().toISOString()
    };

    const acceptMessage: Message = {
      id: 'msg_acc_' + Date.now(),
      conversationId: convId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: `🎉 Offer of GH₵ ${updatedOffer.amount.toLocaleString()} was accepted! Meetup scheduled at ${updatedOffer.proposedLocation || 'RMU Campus'}.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'offer_accepted',
      offerData: {
        amount: updatedOffer.amount,
        offerId: offerId,
        proposedLocation: updatedOffer.proposedLocation,
        proposedTime: updatedOffer.proposedTime
      }
    };

    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), acceptMessage]
    }));

    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        return {
          ...c,
          activeOffer: updatedOffer,
          lastMessage: `Accepted offer: GH₵ ${updatedOffer.amount.toLocaleString()}`,
          lastMessageAt: 'Just now'
        };
      }
      return c;
    }));

    // Reserve listing
    setListings(prev => prev.map(l => l.id === currentConv.listingId ? { ...l, status: 'reserved' } : l));

    try {
      confetti({
        particleCount: 60,
        spread: 60,
        origin: { y: 0.6 }
      });
    } catch {
      // ignore
    }
  };

  const declineOffer = (convId: string, offerId: string) => {
    const currentConv = conversations.find(c => c.id === convId);
    if (!currentConv || !currentConv.activeOffer) return;

    const updatedOffer: Offer = {
      ...currentConv.activeOffer,
      status: 'declined',
      updatedAt: new Date().toISOString()
    };

    const declineMsg: Message = {
      id: 'msg_dec_' + Date.now(),
      conversationId: convId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: `Declined the offer of GH₵ ${updatedOffer.amount.toLocaleString()}. Please feel free to propose a closer offer.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'offer_declined'
    };

    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), declineMsg]
    }));

    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        return {
          ...c,
          activeOffer: updatedOffer,
          lastMessage: `Declined offer of GH₵ ${updatedOffer.amount.toLocaleString()}`,
          lastMessageAt: 'Just now'
        };
      }
      return c;
    }));
  };

  const counterOffer = (convId: string, offerId: string, counterAmount: number) => {
    const currentConv = conversations.find(c => c.id === convId);
    if (!currentConv || !currentConv.activeOffer) return;

    const updatedOffer: Offer = {
      ...currentConv.activeOffer,
      status: 'countered',
      counterAmount: counterAmount,
      updatedAt: new Date().toISOString()
    };

    const counterMsg: Message = {
      id: 'msg_counter_' + Date.now(),
      conversationId: convId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: `Counter-offered with GH₵ ${counterAmount.toLocaleString()} (was GH₵ ${updatedOffer.amount.toLocaleString()})`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'counter_offer',
      offerData: {
        amount: counterAmount,
        offerId
      }
    };

    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), counterMsg]
    }));

    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        return {
          ...c,
          activeOffer: updatedOffer,
          lastMessage: `Counter-offered GH₵ ${counterAmount.toLocaleString()}`,
          lastMessageAt: 'Just now'
        };
      }
      return c;
    }));
  };

  const confirmHandover = (convId: string, listingId: string) => {
    const currentConv = conversations.find(c => c.id === convId);
    if (!currentConv) return;

    const completedMsg: Message = {
      id: 'msg_done_' + Date.now(),
      conversationId: convId,
      senderId: currentUser.id,
      senderName: currentUser.name,
      text: `🤝 Handover & Payment Confirmed! Both students verified the item at the RMU Safe Zone. Deal successfully concluded.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      type: 'handover_completed'
    };

    setMessages(prev => ({
      ...prev,
      [convId]: [...(prev[convId] || []), completedMsg]
    }));

    setConversations(prev => prev.map(c => {
      if (c.id === convId) {
        return {
          ...c,
          activeOffer: c.activeOffer ? { ...c.activeOffer, status: 'completed' } : undefined,
          lastMessage: '🤝 Handover confirmed! Deal closed.',
          lastMessageAt: 'Just now'
        };
      }
      return c;
    }));

    // Mark listing as sold
    markListingSold(listingId);

    // Increase user trust & completed deals
    setUsers(prev => prev.map(u => {
      if (u.id === currentConv.sellerId || u.id === currentConv.buyerId) {
        return {
          ...u,
          dealsCompleted: u.dealsCompleted + 1,
          trustScore: Math.min(5.0, Number((u.trustScore + 0.05).toFixed(1)))
        };
      }
      return u;
    }));

    try {
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.5 }
      });
    } catch {
      // ignore
    }
  };

  const unreadCountTotal = conversations.reduce((acc, c) => acc + (c.unreadCount || 0), 0);

  return (
    <MarketplaceContext.Provider
      value={{
        currentUser,
        users,
        setCurrentUser,
        switchUserById,
        updateCurrentUserProfile,
        verifyCurrentStudent,
        listings,
        addListing,
        markListingSold,
        toggleLikeListing,
        incrementListingViews,
        deleteListing,
        searchQuery,
        setSearchQuery,
        selectedCategory,
        setSelectedCategory,
        selectedCondition,
        setSelectedCondition,
        selectedHostel,
        setSelectedHostel,
        maxPrice,
        setMaxPrice,
        verifiedOnly,
        setVerifiedOnly,
        sortBy,
        setSortBy,
        favorites,
        toggleFavorite,
        isFavorite,
        showFavoritesOnly,
        setShowFavoritesOnly,
        favoritesCount,
        selectedListing,
        setSelectedListing,
        isNewListingModalOpen,
        setIsNewListingModalOpen,
        isChatModalOpen,
        setIsChatModalOpen,
        isVerificationModalOpen,
        setIsVerificationModalOpen,
        isSafetyGuideOpen,
        setIsSafetyGuideOpen,
        isSafeZonesOpen,
        setIsSafeZonesOpen,
        conversations,
        messages,
        activeConversationId,
        setActiveConversationId,
        openChatForListing,
        sendMessage,
        makeOffer,
        acceptOffer,
        declineOffer,
        counterOffer,
        confirmHandover,
        unreadCountTotal
      }}
    >
      {children}
    </MarketplaceContext.Provider>
  );
};

export const useMarketplace = () => {
  const context = useContext(MarketplaceContext);
  if (!context) {
    throw new Error('useMarketplace must be used within a MarketplaceProvider');
  }
  return context;
};

function getSimulatedPeerReply(msg: string, peerName: string): string | null {
  const lower = msg.toLowerCase();
  if (lower.includes('negotiable') || lower.includes('discount') || lower.includes('last price') || lower.includes('gh')) {
    return `Hello! Yes, the price is slightly negotiable if we can meet today on campus. Make me an offer through the Make Offer button and I can review it.`;
  }
  if (lower.includes('condition') || lower.includes('working') || lower.includes('freeze') || lower.includes('cool') || lower.includes('test')) {
    return `It is in great condition, exactly as described. We can test it at the Main Gate security station or library power points before any payment.`;
  }
  if (lower.includes('meet') || lower.includes('where') || lower.includes('hostel') || lower.includes('library')) {
    return `I am available around the Library Foyer or Cadets Mess after classes at 4:30 PM. Does that work for you?`;
  }
  return `Thanks for reaching out! Let me know if you want to inspect it or propose an offer.`;
}
