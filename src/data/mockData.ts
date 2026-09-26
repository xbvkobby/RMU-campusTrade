import { User, Listing, Conversation, Message } from '../types';

export const INITIAL_USERS: User[] = [
  {
    id: 'user_kwame',
    name: 'Kwame Mensah',
    email: 'k.mensah@st.rmu.edu.gh',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    department: 'Marine Engineering',
    level: 'Level 300',
    hostel: 'Titanic Hostel',
    indexNumber: 'RMU/22/MENG/041',
    isVerified: true,
    verifiedAt: 'Jan 2025',
    phone: '+233 24 819 4022',
    momoNumber: '0248194022 (Kwame M.)',
    trustScore: 4.9,
    dealsCompleted: 8,
    cadetBadge: 'Senior Marine Cadet',
    bio: 'Marine Eng 3rd year. Keeping hostel gear in top shape. All items tested before sale.',
  },
  {
    id: 'user_sarah',
    name: 'Cadet Sarah Boateng',
    email: 's.boateng@st.rmu.edu.gh',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    department: 'Nautical Science',
    level: 'Level 400',
    hostel: 'Cadet Block A',
    indexNumber: 'RMU/21/NAUT/014',
    isVerified: true,
    verifiedAt: 'Sept 2024',
    phone: '+233 55 932 1108',
    momoNumber: '0559321108 (Sarah B.)',
    trustScore: 5.0,
    dealsCompleted: 14,
    cadetBadge: 'Cadet Chief Mate',
    bio: 'Final year Nautical Science cadet preparing for sea-time boardings. Clearing my textbook collection and navigational accessories.',
  },
  {
    id: 'user_emmanuel',
    name: 'Emmanuel Osei-Tutuh',
    email: 'e.osei@st.rmu.edu.gh',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    department: 'Ports & Shipping Administration',
    level: 'Level 200',
    hostel: 'Mandela Hostel',
    indexNumber: 'RMU/23/PSA/088',
    isVerified: true,
    verifiedAt: 'Oct 2024',
    phone: '+233 20 664 3091',
    momoNumber: '0206643091 (Emmanuel O.)',
    trustScore: 4.8,
    dealsCompleted: 5,
    bio: 'PSA sophomore. Relocating hostel rooms this semester, selling extra kitchen and electrical appliances.',
  },
  {
    id: 'user_ama',
    name: 'Ama Serwaa Addo',
    email: 'a.addo@st.rmu.edu.gh',
    avatar: 'https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&w=300&q=80',
    department: 'Computer Science & IT',
    level: 'Level 200',
    hostel: 'Titanic Hostel',
    indexNumber: 'RMU/23/CSIT/029',
    isVerified: true,
    verifiedAt: 'Nov 2024',
    phone: '+233 27 114 9903',
    momoNumber: '0271149903 (Ama S.)',
    trustScore: 4.7,
    dealsCompleted: 3,
    bio: 'CSIT student. Selling tech peripherals, scientific tools, and study aids.',
  }
];

export const INITIAL_LISTINGS: Listing[] = [
  {
    id: 'list_1',
    title: 'Hisense 93L Compact Table-Top Refrigerator (Silver)',
    price: 1250,
    originalPrice: 1850,
    category: 'appliances',
    condition: 'Like New (Flawless)',
    description: 'Purchased directly from Hisense Ghana last academic year. Freezes ice cubes in under 20 minutes, silent motor, fits perfectly under the standard RMU Titanic & Cadet hostel bunk beds. Comes with a high-capacity power surge protector. No gas leak, clean coils.',
    images: [
      '/src/assets/images/compact_refrigerator_1790426743265.jpg'
    ],
    sellerId: 'user_sarah',
    seller: INITIAL_USERS[1],
    location: 'Cadet Block A, Ground Floor',
    safeZoneRecommended: 'RMU Main Gate Security Station or Library Forecourt',
    tags: ['refrigerator', 'hisense', 'hostel fridge', 'chiller', 'cadet hostel'],
    status: 'available',
    postedAt: '2 hours ago',
    specs: {
      'Brand': 'Hisense Ghana',
      'Capacity': '93 Litres',
      'Defrost': 'Manual Quick Defrost',
      'Voltage': '220V - 240V (Ghana standard)',
      'Energy Rating': 'A+ Low consumption'
    },
    inspectionChecklist: [
      'Plug into security wall socket for 10 minutes to verify compressor kick-in',
      'Inspect interior door seals and ice compartment integrity',
      'Check rear radiator piping for zero rust or oil spots'
    ],
    viewsCount: 142,
    likesCount: 19
  },
  {
    id: 'list_tv',
    title: 'Nasco 32" Frameless HD Smart LED Television (With Stand & Remote)',
    price: 950,
    originalPrice: 1450,
    category: 'electronics',
    condition: 'Like New (Flawless)',
    description: '32-inch high-definition smart LED TV in excellent condition. Ideal for student hostel rooms—low power consumption, works with campus decoders, gaming consoles, and USB movies. Features crystal clear stereo sound and dual HDMI ports. Remote control and tabletop stand included.',
    images: [
      '/src/assets/images/smart_television_1790426755451.jpg'
    ],
    sellerId: 'user_emmanuel',
    seller: INITIAL_USERS[2],
    location: 'Mandela Hostel, Rm 104',
    safeZoneRecommended: 'RMU Main Gate Security Station or Cadets Mess',
    tags: ['television', 'tv', 'smart tv', 'nasco', 'electronics', 'screen'],
    status: 'available',
    postedAt: '3 hours ago',
    specs: {
      'Brand': 'Nasco Smart Vision',
      'Screen Size': '32 Inches (HD LED)',
      'Connectivity': '2x HDMI, 2x USB, AV In, Earphone Out',
      'Power': '45W Energy Saver'
    },
    inspectionChecklist: [
      'Power on at security outlet and check for zero dead pixels or screen lines',
      'Test HDMI video and audio volume clarity',
      'Check remote control button responsiveness'
    ],
    viewsCount: 178,
    likesCount: 22
  },
  {
    id: 'list_2',
    title: "Reed's Marine Engineering Series Vol 8: General Engineering Knowledge",
    price: 220,
    originalPrice: 380,
    category: 'textbooks',
    condition: 'Good (Minor wear)',
    description: 'The definitive textbook for 3rd/4th year Marine Engineering at RMU. Essential for MENG 301, MENG 312 and Maritime Authority certificate prep. Clean pages, no missing chapters, highlighted formulas and diagrams for propulsion, boilers, and auxiliary systems.',
    images: [
      '/src/assets/images/marine_textbook_1790426777333.jpg'
    ],
    sellerId: 'user_kwame',
    seller: INITIAL_USERS[0],
    location: 'Titanic Hostel, Block B',
    safeZoneRecommended: 'RMU Library Foyer & Quiet Study Hall',
    tags: ['textbook', 'marine engineering', 'reeds', 'propulsion', 'exam prep'],
    courseCode: 'MENG 301 - Marine Auxiliary Machinery',
    status: 'available',
    postedAt: '5 hours ago',
    specs: {
      'Author': 'Leslie Jackson & Thomas D. Morton',
      'Edition': '4th Revised Edition',
      'Publisher': 'Thomas Reed Publications',
      'Pages': '628 pages with schematics'
    },
    inspectionChecklist: [
      'Verify all chapters 1 to 14 are bound and complete',
      'Check schematic pull-out charts inside back cover',
      'Confirm legible handwriting in notes margin'
    ],
    viewsCount: 88,
    likesCount: 12
  },
  {
    id: 'list_3',
    title: 'Double Infrared Ceramic Electric Cooker / Hot Plate (2200W)',
    price: 340,
    originalPrice: 520,
    category: 'appliances',
    condition: 'Like New (Flawless)',
    description: 'Ceramic glass top electric hot plate with dual temperature control dials. Cooks jollof, stew, and warms soup 3x faster than coil burners. Safe for hostel room breakers—does not trip the circuit. Works with any pot (stainless, aluminium, or ceramic).',
    images: [
      '/src/assets/images/electric_cooker_1790426766525.jpg'
    ],
    sellerId: 'user_emmanuel',
    seller: INITIAL_USERS[2],
    location: 'Mandela Hostel, Rm 104',
    safeZoneRecommended: 'Cafeteria / Cadets Mess Quadrangle',
    tags: ['cooker', 'hot plate', 'hostel cooking', 'kitchen', 'infrared'],
    status: 'available',
    postedAt: '1 day ago',
    specs: {
      'Brand': 'Nasco Infrared Cook',
      'Power': 'Dual 1100W + 1100W',
      'Surface': 'Toughened Micro-crystal Glass',
      'Safety': 'Overheat auto thermal fuse'
    },
    inspectionChecklist: [
      'Turn both dials on to verify ceramic red glow within 15 seconds',
      'Check plug and thick power cord for zero fraying',
      'Inspect glass surface for any hairline cracks'
    ],
    viewsCount: 204,
    likesCount: 28
  },
  {
    id: 'list_4',
    title: 'Bowditch: American Practical Navigator (Hardcover 2-Vol Set + Chart Dividers)',
    price: 450,
    originalPrice: 700,
    category: 'textbooks',
    condition: 'Like New (Flawless)',
    description: 'Complete nautical astronomy, celestial calculations, radar plotting, and ocean passage planning bible for Nautical Science cadets. Includes brass nautical divider, parallel plotting ruler, and navigational triangle. You will save over GH₵ 250 compared to buying brand new in Accra.',
    images: [
      '/src/assets/images/marine_textbook_1790426777333.jpg'
    ],
    sellerId: 'user_sarah',
    seller: INITIAL_USERS[1],
    location: 'Cadet Block A',
    safeZoneRecommended: 'Maritime Safety Training Centre (MSTC) Lobby',
    tags: ['nautical science', 'bowditch', 'celestial navigation', 'chart dividers', 'cadet'],
    courseCode: 'NAUT 201 - Celestial & Terrestrial Navigation',
    status: 'available',
    postedAt: '1 day ago',
    specs: {
      'Author': 'Nathaniel Bowditch / NGA Pub No. 9',
      'Format': 'Hardcover Deluxe Edition',
      'Bonus Items': 'Brass Dividers + 15-inch Parallel Ruler'
    },
    inspectionChecklist: [
      'Confirm Volume 1 and Volume 2 are both included',
      'Check divider needles are straight with tight brass hinge',
      'Verify clean navigational sight reduction tables'
    ],
    viewsCount: 165,
    likesCount: 24
  },
  {
    id: 'list_5',
    title: 'Binatone 16" Rechargeable Standing Fan with Remote & LED Torch',
    price: 420,
    originalPrice: 650,
    category: 'electronics',
    condition: 'Like New (Flawless)',
    description: 'Absolute lifesaver during Accra coastal heat and occasional campus power interruptions. Built-in 12V 4.5Ah battery provides 6 to 8 hours of quiet continuous breeze on medium speed. Equipped with bright LED night lamp and USB phone charging port for emergencies.',
    images: [
      '/src/assets/images/rechargeable_fan_1790426788984.jpg'
    ],
    sellerId: 'user_kwame',
    seller: INITIAL_USERS[0],
    location: 'Titanic Hostel',
    safeZoneRecommended: 'RMU Library Foyer Entrance',
    tags: ['fan', 'rechargeable', 'binatone', 'hostel room', 'lights out'],
    status: 'available',
    postedAt: '2 days ago',
    specs: {
      'Brand': 'Binatone RCF-1655',
      'Battery Life': 'Up to 8 hours run time',
      'Blades': '5 High-efficiency aero blades',
      'Extras': 'Remote control + USB powerbank port'
    },
    inspectionChecklist: [
      'Test battery mode by unplugging from wall',
      'Cycle through speeds 1, 2, and 3',
      'Verify remote control sensitivity and LED lamp switch'
    ],
    viewsCount: 230,
    likesCount: 31
  },
  {
    id: 'list_6',
    title: 'RMU Cadet White Ceremonial Drill Uniform Set (Men’s 38-40)',
    price: 360,
    originalPrice: 580,
    category: 'cadet_gear',
    condition: 'Like New (Flawless)',
    description: 'Official RMU drill white tunic with gold anchor buttons, matched white trousers (waist 32-34 with let-out hem allowance), and white peaked cadet cap (size 57). Tailored according to maritime academy regulations. Worn only 3 times for university matriculation and sea-inspection parades. Dry-cleaned and ready for inspection.',
    images: [
      'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'user_sarah',
    seller: INITIAL_USERS[1],
    location: 'Cadet Block A',
    safeZoneRecommended: 'Cadets Mess Parade Square',
    tags: ['cadet uniform', 'drill white', 'peaked cap', 'parade', 'ceremonial'],
    courseCode: 'MARI 100 - Cadet Discipline & Regimental Duties',
    status: 'available',
    postedAt: '3 days ago',
    specs: {
      'Chest Size': '38 to 40 inches (Medium)',
      'Trousers': 'Waist 32-34, Length 42 (adjustable)',
      'Cap Size': '57cm with brass anchor emblem',
      'Material': 'Dacron heavy twill stain-resistant'
    },
    inspectionChecklist: [
      'Check all gilded maritime buttons are intact with secure split pins',
      'Inspect collar and cuff linings for zero yellowing',
      'Verify zipper and belt loop stitching'
    ],
    viewsCount: 119,
    likesCount: 15
  },
  {
    id: 'list_7',
    title: 'Casio fx-991EX ClassWiz High-Resolution Scientific Calculator',
    price: 175,
    originalPrice: 280,
    category: 'study_tools',
    condition: 'Like New (Flawless)',
    description: 'Approved for all RMU semester engineering examinations, thermodynamics calculations, matrix operations, complex impedance vectors, and statistical distributions. Dual solar and battery power with protective slide-on hard case.',
    images: [
      'https://images.unsplash.com/photo-1594980596870-8aa52a78d8cd?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'user_ama',
    seller: INITIAL_USERS[3],
    location: 'Titanic Hostel',
    safeZoneRecommended: 'RMU Library Quiet Floor Entrance',
    tags: ['calculator', 'casio', 'engineering math', 'classwiz', 'exam approved'],
    courseCode: 'MATH 101 - Applied Maritime Mathematics',
    status: 'available',
    postedAt: '3 days ago',
    specs: {
      'Model': 'Casio fx-991EX ClassWiz',
      'Functions': '552 mathematical functions',
      'Display': 'Natural Textbook High-Res LCD',
      'Power': 'Two-way (Solar + LR44)'
    },
    inspectionChecklist: [
      'Test solar sensor by blocking cell with finger',
      'Run standard self-check mode (Shift + 7 + On)',
      'Confirm screen has zero dead LCD lines or ink bleeding'
    ],
    viewsCount: 95,
    likesCount: 14
  },
  {
    id: 'list_8',
    title: 'Heavy-Duty Flame Retardant Maritime Boilersuit / Coverall (Size L)',
    price: 260,
    originalPrice: 420,
    category: 'cadet_gear',
    condition: 'Good (Minor wear)',
    description: 'Genuine Portwest high-visibility navy & orange maritime coverall. Mandated for RMU mechanical workshops, diesel engine simulator sessions, and welding practicals. Reinforced knee pockets, brass heavy-duty two-way zipper, and radio loop.',
    images: [
      'https://images.unsplash.com/photo-1578632767115-351597cf2477?auto=format&fit=crop&w=800&q=80'
    ],
    sellerId: 'user_kwame',
    seller: INITIAL_USERS[0],
    location: 'Titanic Hostel',
    safeZoneRecommended: 'RMU Marine Engineering Workshop Gate',
    tags: ['boilersuit', 'coveralls', 'workshop gear', 'flame retardant', 'safety'],
    courseCode: 'MENG 204 - Workshop Practice & Technology',
    status: 'available',
    postedAt: '4 days ago',
    specs: {
      'Size': 'Large (Chest 42-44, Height 5ft 9 to 6ft 1)',
      'Standard': 'EN ISO 11612 Flame Resistant',
      'Pockets': '8 utility pockets with brass zips'
    },
    inspectionChecklist: [
      'Check two-way heavy brass zipper slider movement',
      'Verify reflective stripes have no peeling',
      'Inspect cuffs and ankle studs'
    ],
    viewsCount: 112,
    likesCount: 9
  }
];

export const INITIAL_CONVERSATIONS: Conversation[] = [
  {
    id: 'conv_1',
    listingId: 'list_1',
    listingTitle: 'Hisense 93L Compact Table-Top Refrigerator (Silver)',
    listingPrice: 1250,
    listingImage: '/src/assets/images/compact_refrigerator_1790426743265.jpg',
    buyerId: 'user_kwame',
    buyerName: 'Kwame Mensah',
    buyerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    sellerId: 'user_sarah',
    sellerName: 'Cadet Sarah Boateng',
    sellerAvatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    lastMessage: 'Deal! Let us meet at the Main Gate Security outpost so we can plug it in to test.',
    lastMessageAt: '12:35 PM',
    unreadCount: 1,
    activeOffer: {
      id: 'off_1',
      listingId: 'list_1',
      buyerId: 'user_kwame',
      sellerId: 'user_sarah',
      amount: 1100,
      originalListingPrice: 1250,
      status: 'accepted',
      proposedLocation: 'RMU Main Gate Security Station',
      proposedTime: 'Today at 4:30 PM',
      createdAt: '2026-09-26T10:15:00Z',
      updatedAt: '2026-09-26T12:35:00Z',
      buyerName: 'Kwame Mensah'
    }
  },
  {
    id: 'conv_2',
    listingId: 'list_3',
    listingTitle: 'Double Infrared Ceramic Electric Cooker / Hot Plate (2200W)',
    listingPrice: 340,
    listingImage: '/src/assets/images/electric_cooker_1790426766525.jpg',
    buyerId: 'user_kwame',
    buyerName: 'Kwame Mensah',
    buyerAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
    sellerId: 'user_emmanuel',
    sellerName: 'Emmanuel Osei-Tutuh',
    sellerAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
    lastMessage: 'Can you do GH₵ 290? I can pick it up right now at Mandela Hostel.',
    lastMessageAt: 'Yesterday',
    unreadCount: 0,
    activeOffer: {
      id: 'off_2',
      listingId: 'list_3',
      buyerId: 'user_kwame',
      sellerId: 'user_emmanuel',
      amount: 290,
      originalListingPrice: 340,
      status: 'pending',
      proposedLocation: 'Mandela Hostel Forecourt',
      proposedTime: 'Today at 5:00 PM',
      createdAt: '2026-09-25T16:20:00Z',
      updatedAt: '2026-09-25T16:20:00Z',
      buyerName: 'Kwame Mensah'
    }
  }
];

export const INITIAL_MESSAGES: Record<string, Message[]> = {
  'conv_1': [
    {
      id: 'm1',
      conversationId: 'conv_1',
      senderId: 'user_kwame',
      senderName: 'Kwame Mensah',
      text: 'Hello Cadet Sarah! I saw your Hisense tabletop fridge. Does it come with the original power surge protector you mentioned?',
      timestamp: '10:10 AM',
      type: 'text'
    },
    {
      id: 'm2',
      conversationId: 'conv_1',
      senderId: 'user_sarah',
      senderName: 'Cadet Sarah Boateng',
      text: 'Good morning Kwame. Yes, it comes with a high-capacity surge protector so hostel voltage fluctuations won’t harm the motor. Also defrosted and cleaned.',
      timestamp: '10:12 AM',
      type: 'text'
    },
    {
      id: 'm3',
      conversationId: 'conv_1',
      senderId: 'user_kwame',
      senderName: 'Kwame Mensah',
      text: 'I submitted an offer of GH₵ 1,100. Would you accept that for immediate cash/MoMo payment upon testing?',
      timestamp: '10:15 AM',
      type: 'offer',
      offerData: {
        amount: 1100,
        offerId: 'off_1',
        proposedLocation: 'RMU Main Gate Security Station',
        proposedTime: 'Today at 4:30 PM'
      }
    },
    {
      id: 'm4',
      conversationId: 'conv_1',
      senderId: 'user_sarah',
      senderName: 'Cadet Sarah Boateng',
      text: 'Offer accepted! GH₵ 1,100 works for me since you are on campus. Let us meet at the Main Gate Security outpost so we can plug it in to test before payment.',
      timestamp: '12:35 PM',
      type: 'offer_accepted',
      offerData: {
        amount: 1100,
        offerId: 'off_1',
        proposedLocation: 'RMU Main Gate Security Station',
        proposedTime: 'Today at 4:30 PM'
      }
    }
  ],
  'conv_2': [
    {
      id: 'm21',
      conversationId: 'conv_2',
      senderId: 'user_kwame',
      senderName: 'Kwame Mensah',
      text: 'Hi Emmanuel, is the infrared cooker still available? Does it heat up with regular stainless pans?',
      timestamp: 'Yesterday 4:00 PM',
      type: 'text'
    },
    {
      id: 'm22',
      conversationId: 'conv_2',
      senderId: 'user_emmanuel',
      senderName: 'Emmanuel Osei-Tutuh',
      text: 'Yes! Infrared technology heats any pan surface, unlike induction that requires magnetic bottoms. Used it for 1 semester in Mandela.',
      timestamp: 'Yesterday 4:10 PM',
      type: 'text'
    },
    {
      id: 'm23',
      conversationId: 'conv_2',
      senderId: 'user_kwame',
      senderName: 'Kwame Mensah',
      text: 'Can you do GH₵ 290? I can pick it up right now at Mandela Hostel.',
      timestamp: 'Yesterday 4:20 PM',
      type: 'offer',
      offerData: {
        amount: 290,
        offerId: 'off_2',
        proposedLocation: 'Mandela Hostel Forecourt',
        proposedTime: 'Today at 5:00 PM'
      }
    }
  ]
};

export const RMU_SAFE_ZONES = [
  {
    name: 'RMU Library Foyer & Study Quad',
    desc: 'Staffed, well-lit daytime zone with open benches and security staff nearby. Ideal for textbooks, calculators, and study aids.',
    hours: '08:00 - 21:00 Daily',
    hasPowerOutlet: true,
    recommendedFor: 'Textbooks, electronics, uniform trials'
  },
  {
    name: 'RMU Main Gate Security Station',
    desc: 'Equipped with verified wall sockets on security approval to test refrigerators, cookers, and appliances before money changes hands.',
    hours: '24 Hours (Daylight recommended 07:00 - 18:30)',
    hasPowerOutlet: true,
    recommendedFor: 'Heavy appliances (Refrigerators, Induction cookers, Fans)'
  },
  {
    name: 'Cadets Mess & Cafeteria Square',
    desc: 'High student traffic area located between Titanic Hostel and Academic Blocks. Very safe for peer-to-peer daytime exchanges.',
    hours: '07:00 - 20:00 Daily',
    hasPowerOutlet: false,
    recommendedFor: 'General gear, boilersuits, chart equipment'
  },
  {
    name: 'Maritime Safety Training Centre (MSTC) Lobby',
    desc: 'Clean, quiet air-conditioned administrative reception. Security attendant always present at reception desk.',
    hours: '08:30 - 17:00 Mon-Fri',
    hasPowerOutlet: true,
    recommendedFor: 'Laptops, calculators, high-value navigational equipment'
  }
];
