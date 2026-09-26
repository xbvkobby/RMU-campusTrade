import React, { useState, useEffect, useRef } from 'react';
import { useMarketplace } from '../context/MarketplaceContext';
import { Conversation, Message, Offer } from '../types';
import { 
  X, 
  Send, 
  ShieldCheck, 
  MapPin, 
  Clock, 
  CheckCircle, 
  CheckCircle2, 
  AlertCircle, 
  Sparkles, 
  DollarSign, 
  ArrowRight, 
  Handshake, 
  Calendar, 
  ShieldAlert,
  ChevronRight,
  MessageSquare,
  RefreshCw
} from 'lucide-react';

export const ChatModal: React.FC = () => {
  const {
    isChatModalOpen,
    setIsChatModalOpen,
    conversations,
    messages,
    activeConversationId,
    setActiveConversationId,
    currentUser,
    sendMessage,
    makeOffer,
    acceptOffer,
    declineOffer,
    counterOffer,
    confirmHandover,
    listings,
    setIsSafeZonesOpen
  } = useMarketplace();

  const [inputMessage, setInputMessage] = useState('');
  const [showOfferForm, setShowOfferForm] = useState(false);
  const [offerAmount, setOfferAmount] = useState<number>(0);
  const [offerLocation, setOfferLocation] = useState('RMU Main Gate Security Station');
  const [offerTime, setOfferTime] = useState('Today at 4:30 PM');
  const [counterInputAmount, setCounterInputAmount] = useState<number>(0);
  const [showCounterBox, setShowCounterBox] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConv = conversations.find(c => c.id === activeConversationId) || conversations[0];
  const activeListing = listings.find(l => l.id === activeConv?.listingId);
  const convMessages = activeConv ? (messages[activeConv.id] || []) : [];

  const isSeller = activeConv ? activeConv.sellerId === currentUser.id : false;
  const isBuyer = activeConv ? activeConv.buyerId === currentUser.id : false;

  useEffect(() => {
    if (activeConv) {
      setOfferAmount(Math.round(activeConv.listingPrice * 0.85));
      setCounterInputAmount(Math.round(activeConv.listingPrice * 0.92));
    }
  }, [activeConv?.id]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [convMessages.length]);

  if (!isChatModalOpen) return null;

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputMessage.trim() || !activeConv) return;
    sendMessage(activeConv.id, inputMessage);
    setInputMessage('');
  };

  const handleQuickChip = (text: string) => {
    if (!activeConv) return;
    sendMessage(activeConv.id, text);
  };

  const handleMakeOfferSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!activeConv || offerAmount <= 0) return;
    makeOffer(activeConv.id, Number(offerAmount), offerLocation, offerTime);
    setShowOfferForm(false);
  };

  const handleAccept = () => {
    if (!activeConv?.activeOffer) return;
    acceptOffer(activeConv.id, activeConv.activeOffer.id);
  };

  const handleDecline = () => {
    if (!activeConv?.activeOffer) return;
    declineOffer(activeConv.id, activeConv.activeOffer.id);
  };

  const handleCounterSubmit = () => {
    if (!activeConv?.activeOffer || counterInputAmount <= 0) return;
    counterOffer(activeConv.id, activeConv.activeOffer.id, counterInputAmount);
    setShowCounterBox(false);
  };

  const handleCompleteHandover = () => {
    if (!activeConv) return;
    confirmHandover(activeConv.id, activeConv.listingId);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-2 sm:p-4 md:p-6 animate-in fade-in duration-150">
      <div 
        className="bg-white rounded-2xl w-full max-w-5xl h-[88vh] max-h-[750px] shadow-2xl border border-slate-200 overflow-hidden flex flex-col md:flex-row"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Left Sidebar: Conversations list */}
        <div className="w-full md:w-80 border-r border-slate-200 bg-slate-50/70 flex flex-col shrink-0 h-44 md:h-full">
          <div className="p-3.5 border-b border-slate-200 flex items-center justify-between bg-white shrink-0">
            <div>
              <h2 className="font-extrabold text-sm text-slate-900">Student Negotiations</h2>
              <p className="text-[11px] text-slate-500">RMU Campus Peer Threads</p>
            </div>
            <button
              onClick={() => setIsChatModalOpen(false)}
              className="md:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="overflow-y-auto flex-1 divide-y divide-slate-100">
            {conversations.length === 0 ? (
              <div className="p-6 text-center text-xs text-slate-500">
                No active negotiation threads yet.
              </div>
            ) : (
              conversations.map(conv => {
                const isSelected = activeConv?.id === conv.id;
                const otherUserName = conv.sellerId === currentUser.id ? conv.buyerName : conv.sellerName;
                const otherUserAvatar = conv.sellerId === currentUser.id ? conv.buyerAvatar : conv.sellerAvatar;
                
                return (
                  <button
                    key={conv.id}
                    onClick={() => setActiveConversationId(conv.id)}
                    className={`w-full p-3 flex items-start gap-2.5 text-left transition-colors relative ${
                      isSelected ? 'bg-blue-50/90 border-r-2 border-blue-700' : 'hover:bg-slate-100/80 bg-white'
                    }`}
                  >
                    <div className="relative shrink-0">
                      <img
                        src={otherUserAvatar}
                        alt={otherUserName}
                        className="w-10 h-10 rounded-full object-cover ring-1 ring-slate-200"
                        referrerPolicy="no-referrer"
                      />
                      <img
                        src={conv.listingImage}
                        alt="item"
                        className="w-4 h-4 rounded-full object-cover absolute -bottom-1 -right-1 ring-1 ring-white"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center justify-between">
                        <span className="font-bold text-xs text-slate-900 truncate">{otherUserName}</span>
                        <span className="text-[10px] text-slate-400 shrink-0">{conv.lastMessageAt}</span>
                      </div>
                      <div className="text-[11px] font-semibold text-blue-700 truncate mt-0.5">
                        GH₵ {conv.listingPrice.toLocaleString()} • {conv.listingTitle}
                      </div>
                      <div className="text-xs text-slate-500 truncate mt-0.5">
                        {conv.lastMessage}
                      </div>
                      {conv.activeOffer && conv.activeOffer.status !== 'completed' && (
                        <div className="mt-1">
                          <span className={`inline-block text-[10px] font-bold px-1.5 py-0.2 rounded ${
                            conv.activeOffer.status === 'accepted' 
                              ? 'bg-emerald-100 text-emerald-800' 
                              : conv.activeOffer.status === 'pending'
                              ? 'bg-amber-100 text-amber-800'
                              : 'bg-blue-100 text-blue-800'
                          }`}>
                            Offer GH₵ {conv.activeOffer.amount.toLocaleString()} ({conv.activeOffer.status})
                          </span>
                        </div>
                      )}
                    </div>
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Chat Main Body */}
        {activeConv ? (
          <div className="flex-1 flex flex-col h-full bg-white min-w-0">
            {/* Header: Item summary & Offer trigger */}
            <div className="p-3 sm:px-5 sm:py-3.5 border-b border-slate-200 flex items-center justify-between gap-3 bg-white shrink-0 shadow-xs">
              <div className="flex items-center gap-3 min-w-0">
                <img
                  src={activeConv.listingImage}
                  alt={activeConv.listingTitle}
                  className="w-11 h-11 rounded-lg object-cover border border-slate-200 shrink-0"
                  referrerPolicy="no-referrer"
                />
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="font-bold text-xs sm:text-sm text-slate-900 truncate">
                      {activeConv.listingTitle}
                    </span>
                    <span className="text-xs font-extrabold text-blue-700 shrink-0">
                      GH₵ {activeConv.listingPrice.toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
                    <span>Chatting with {isSeller ? activeConv.buyerName : activeConv.sellerName}</span>
                    <span className="inline-flex items-center gap-0.5 text-blue-700 font-semibold text-[11px]">
                      <ShieldCheck className="w-3 h-3 text-blue-600" />
                      RMU Verified
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {/* Button to Make or Change Offer */}
                {(!activeConv.activeOffer || activeConv.activeOffer.status === 'declined') && (
                  <button
                    onClick={() => setShowOfferForm(!showOfferForm)}
                    className="px-3 py-1.5 bg-blue-700 hover:bg-blue-800 text-white rounded-lg text-xs font-bold flex items-center gap-1 transition-all shadow-xs"
                  >
                    <DollarSign className="w-3.5 h-3.5" />
                    <span>Make Offer</span>
                  </button>
                )}

                <button
                  onClick={() => setIsChatModalOpen(false)}
                  className="hidden md:flex p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Negotiation Offer Box / Form Modal Drawer */}
            {showOfferForm && (
              <div className="bg-blue-50/80 border-b border-blue-200 p-4 animate-in slide-in-from-top-2 duration-150">
                <form onSubmit={handleMakeOfferSubmit} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="font-bold text-xs text-blue-950 flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                      <span>Propose Negotiation Offer (Asking: GH₵ {activeConv.listingPrice.toLocaleString()})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowOfferForm(false)}
                      className="text-slate-400 hover:text-slate-600"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Your Offer Amount (GH₵)
                      </label>
                      <input
                        type="number"
                        min="1"
                        max={activeConv.listingPrice}
                        value={offerAmount}
                        onChange={(e) => setOfferAmount(Number(e.target.value))}
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-bold text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                        required
                      />
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Proposed RMU Safe Zone
                      </label>
                      <select
                        value={offerLocation}
                        onChange={(e) => setOfferLocation(e.target.value)}
                        className="w-full px-2 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                      >
                        <option value="RMU Main Gate Security Station">Main Gate Security (Power Outlet)</option>
                        <option value="RMU Library Foyer & Study Quad">Library Foyer & Study Quad</option>
                        <option value="Cadets Mess & Cafeteria Square">Cadets Mess & Cafeteria Square</option>
                        <option value="Maritime Safety Training Centre">Maritime Safety Centre (MSTC)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[11px] font-semibold text-slate-700 mb-1">
                        Proposed Handover Time
                      </label>
                      <input
                        type="text"
                        value={offerTime}
                        onChange={(e) => setOfferTime(e.target.value)}
                        placeholder="e.g. Today at 4:30 PM"
                        className="w-full px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs text-slate-800 focus:outline-hidden focus:ring-1 focus:ring-blue-600"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <span className="text-[11px] text-blue-800">
                      You are offering a discount of GH₵ {(activeConv.listingPrice - offerAmount).toLocaleString()} ({Math.round(((activeConv.listingPrice - offerAmount) / activeConv.listingPrice) * 100)}% off).
                    </span>
                    <button
                      type="submit"
                      className="bg-blue-700 hover:bg-blue-800 text-white font-bold text-xs px-4 py-1.5 rounded-lg shadow-xs"
                    >
                      Send Offer Proposal
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Active Negotiation State Banner inside Thread */}
            {activeConv.activeOffer && (
              <div className={`p-3.5 border-b text-xs transition-all ${
                activeConv.activeOffer.status === 'accepted'
                  ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
                  : activeConv.activeOffer.status === 'completed'
                  ? 'bg-slate-100 border-slate-200 text-slate-800'
                  : activeConv.activeOffer.status === 'countered'
                  ? 'bg-amber-50 border-amber-200 text-amber-950'
                  : 'bg-blue-50/80 border-blue-200 text-blue-950'
              }`}>
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-sm">
                        {activeConv.activeOffer.status === 'accepted' ? '🎉 Agreed Price:' : 'Negotiation Offer:'} GH₵ {
                          (activeConv.activeOffer.counterAmount || activeConv.activeOffer.amount).toLocaleString()
                        }
                      </span>
                      <span className={`uppercase font-bold text-[10px] px-2 py-0.5 rounded-full ${
                        activeConv.activeOffer.status === 'accepted'
                          ? 'bg-emerald-200 text-emerald-900'
                          : activeConv.activeOffer.status === 'completed'
                          ? 'bg-slate-200 text-slate-800'
                          : 'bg-amber-200 text-amber-900'
                      }`}>
                        {activeConv.activeOffer.status}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-600 mt-1 flex flex-wrap items-center gap-3">
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3 text-slate-500" />
                        {activeConv.activeOffer.proposedLocation || 'RMU Campus'}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        {activeConv.activeOffer.proposedTime || 'After lectures'}
                      </span>
                    </div>
                  </div>

                  {/* Actions depending on role and offer status */}
                  <div className="flex items-center gap-2 flex-wrap">
                    {/* If offer is pending and current user is seller */}
                    {activeConv.activeOffer.status === 'pending' && isSeller && (
                      <>
                        <button
                          onClick={handleAccept}
                          className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs rounded-lg shadow-xs transition-colors flex items-center gap-1"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>Accept GH₵ {activeConv.activeOffer.amount}</span>
                        </button>
                        <button
                          onClick={() => setShowCounterBox(!showCounterBox)}
                          className="px-2.5 py-1.5 bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 font-bold text-xs rounded-lg transition-colors"
                        >
                          Counter Offer
                        </button>
                        <button
                          onClick={handleDecline}
                          className="px-2.5 py-1.5 text-red-600 hover:bg-red-50 text-xs font-semibold rounded-lg transition-colors"
                        >
                          Decline
                        </button>
                      </>
                    )}

                    {/* Counter offer input popover */}
                    {showCounterBox && (
                      <div className="flex items-center gap-1.5 bg-white p-1.5 rounded-lg border border-slate-300 shadow-sm">
                        <span className="text-[11px] text-slate-500 font-semibold">GH₵</span>
                        <input
                          type="number"
                          value={counterInputAmount}
                          onChange={(e) => setCounterInputAmount(Number(e.target.value))}
                          className="w-20 px-1.5 py-1 text-xs font-bold border border-slate-300 rounded"
                        />
                        <button
                          onClick={handleCounterSubmit}
                          className="px-2 py-1 bg-blue-700 text-white text-xs font-bold rounded"
                        >
                          Send
                        </button>
                      </div>
                    )}

                    {/* If offer is accepted: Safe Handover confirmation button */}
                    {activeConv.activeOffer.status === 'accepted' && (
                      <button
                        onClick={handleCompleteHandover}
                        className="px-3.5 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
                      >
                        <Handshake className="w-4 h-4" />
                        <span>Confirm Handover & Payment Complete</span>
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Messages Thread list */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-3.5 bg-slate-50/50">
              {convMessages.map((msg) => {
                const isMe = msg.senderId === currentUser.id;
                const isSystem = msg.senderId === 'system';

                if (isSystem) {
                  return (
                    <div key={msg.id} className="p-3 rounded-xl bg-blue-50/70 border border-blue-100 text-xs text-blue-900 flex items-start gap-2.5 max-w-lg mx-auto">
                      <ShieldAlert className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
                      <div className="space-y-0.5">
                        <div className="font-bold text-[11px] text-blue-950 uppercase tracking-wider">
                          RMU Safe Trade Notice
                        </div>
                        <p className="text-[11px] text-blue-800 leading-relaxed">
                          {msg.text}
                        </p>
                      </div>
                    </div>
                  );
                }

                if (msg.type === 'offer') {
                  return (
                    <div key={msg.id} className={`flex ${isMe ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md p-3.5 rounded-2xl text-xs space-y-1.5 shadow-xs border ${
                        isMe ? 'bg-blue-700 text-white border-blue-700 rounded-br-xs' : 'bg-white text-slate-800 border-slate-200 rounded-bl-xs'
                      }`}>
                        <div className="font-extrabold flex items-center gap-1.5">
                          <DollarSign className="w-4 h-4" />
                          <span>Price Offer Proposed</span>
                        </div>
                        <p className="leading-snug">{msg.text}</p>
                        <div className={`text-[10px] text-right pt-0.5 ${isMe ? 'text-blue-200' : 'text-slate-400'}`}>
                          {msg.timestamp}
                        </div>
                      </div>
                    </div>
                  );
                }

                if (msg.type === 'offer_accepted') {
                  return (
                    <div key={msg.id} className="p-3 rounded-xl bg-emerald-50 border border-emerald-200 text-xs text-emerald-900 max-w-md mx-auto text-center space-y-1 shadow-xs">
                      <div className="font-bold flex items-center justify-center gap-1 text-emerald-800">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        <span>Offer Accepted!</span>
                      </div>
                      <p className="text-[11px] text-emerald-700">{msg.text}</p>
                      <span className="text-[10px] text-emerald-600 block">{msg.timestamp}</span>
                    </div>
                  );
                }

                if (msg.type === 'handover_completed') {
                  return (
                    <div key={msg.id} className="p-4 rounded-xl bg-gradient-to-r from-emerald-100 to-teal-100 border border-emerald-300 text-emerald-950 max-w-lg mx-auto text-center space-y-1.5 shadow-md">
                      <div className="font-extrabold text-sm flex items-center justify-center gap-1.5 text-emerald-900">
                        <Sparkles className="w-4 h-4 text-emerald-700" />
                        <span>Transaction Completed Successfully</span>
                      </div>
                      <p className="text-xs text-emerald-800">{msg.text}</p>
                      <span className="text-[10px] text-emerald-600 block">{msg.timestamp}</span>
                    </div>
                  );
                }

                // Regular chat bubble
                return (
                  <div key={msg.id} className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}>
                    {!isMe && (
                      <img
                        src={activeConv.sellerId === currentUser.id ? activeConv.buyerAvatar : activeConv.sellerAvatar}
                        alt="peer"
                        className="w-7 h-7 rounded-full object-cover shrink-0 mb-1 ring-1 ring-slate-200"
                        referrerPolicy="no-referrer"
                      />
                    )}
                    <div className={`max-w-md px-4 py-2.5 rounded-2xl text-xs space-y-1 shadow-xs ${
                      isMe 
                        ? 'bg-blue-700 text-white rounded-br-xs' 
                        : 'bg-white text-slate-800 border border-slate-200/90 rounded-bl-xs'
                    }`}>
                      {!isMe && (
                        <div className="text-[10px] font-bold text-slate-500 mb-0.5">
                          {msg.senderName}
                        </div>
                      )}
                      <p className="leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                      <div className={`text-[10px] text-right ${isMe ? 'text-blue-200' : 'text-slate-400'}`}>
                        {msg.timestamp}
                      </div>
                    </div>
                  </div>
                );
              })}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Negotiation Chips */}
            <div className="px-4 py-2 border-t border-slate-100 bg-slate-50/70 overflow-x-auto flex items-center gap-1.5 scrollbar-thin">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 shrink-0">
                Quick Negotiate:
              </span>
              {[
                'Is the price negotiable?',
                'Can we test it at the Main Gate security socket?',
                'Can I pick it up at the Library after lectures?',
                `Will you take GH₵ ${Math.round(activeConv.listingPrice * 0.85)}?`
              ].map((chip, idx) => (
                <button
                  key={idx}
                  onClick={() => handleQuickChip(chip)}
                  className="px-2.5 py-1 bg-white hover:bg-blue-50 text-slate-700 hover:text-blue-700 border border-slate-200 hover:border-blue-300 rounded-md text-[11px] font-medium whitespace-nowrap transition-colors shrink-0"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-200 bg-white flex items-center gap-2">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                placeholder="Type your negotiation message or question..."
                className="flex-1 px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 focus:outline-hidden focus:ring-1 focus:ring-blue-600 focus:bg-white transition-all"
              />
              <button
                type="submit"
                disabled={!inputMessage.trim()}
                className="bg-blue-700 hover:bg-blue-800 active:scale-95 disabled:opacity-40 disabled:cursor-not-allowed text-white p-2.5 rounded-xl transition-all shadow-xs"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-slate-400">
            Select a conversation on the left to start negotiating.
          </div>
        )}
      </div>
    </div>
  );
};
