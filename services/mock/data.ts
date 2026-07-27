import { Property } from '@/types/property';
import { Agent } from '@/types/agent';
import { Agency } from '@/types/agency';
import { LocationItem } from '@/types/location';
import { BlogPost } from '@/types/blog';

export const MOCK_AGENCIES: Agency[] = [
  {
    id: 'agency-1',
    name: 'Aura Heights Real Estate',
    slug: 'aura-heights-real-estate',
    logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    description: 'Premier luxury brokerage specializing in waterfront estates, architectural masterworks, and elite penthouses across North America & Europe.',
    email: 'contact@auraheights.com',
    phone: '+1 (800) 555-0199',
    address: '450 Park Avenue, 28th Floor',
    city: 'New York',
    country: 'United States',
    website: 'https://auraheights.example.com',
    agentsCount: 42,
    totalListingsCount: 180,
    rating: 4.9,
    reviewsCount: 124,
    establishedYear: 2008,
    specialties: ['Luxury Estates', 'Waterfront', 'Penthouses', 'Commercial Towers']
  },
  {
    id: 'agency-2',
    name: 'Vanguard Living',
    slug: 'vanguard-living',
    logo: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b3?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
    description: 'Modern residential property specialists focused on sustainable luxury homes, urban penthouses, and high-yield investment portfolios.',
    email: 'info@vanguardliving.com',
    phone: '+1 (888) 420-9988',
    address: '88 Ocean Drive, Suite 1200',
    city: 'Miami',
    country: 'United States',
    website: 'https://vanguardliving.example.com',
    agentsCount: 28,
    totalListingsCount: 95,
    rating: 4.8,
    reviewsCount: 96,
    establishedYear: 2014,
    specialties: ['Eco Luxury', 'Beachfront Villas', 'New Developments']
  },
  {
    id: 'agency-3',
    name: 'Sovereign Heritage Realty',
    slug: 'sovereign-heritage-realty',
    logo: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    description: 'Bespoke estate advisors delivering discretion and unparalleled market expertise for historic manors and prime urban land.',
    email: 'inquiries@sovereignheritage.com',
    phone: '+44 20 7946 0912',
    address: '14 Mayfair Square',
    city: 'London',
    country: 'United Kingdom',
    website: 'https://sovereignheritage.example.com',
    agentsCount: 35,
    totalListingsCount: 140,
    rating: 5.0,
    reviewsCount: 180,
    establishedYear: 1999,
    specialties: ['Historic Estates', 'Townhouses', 'Country Manors']
  },
  {
    id: 'agency-4',
    name: 'Horizon Prime Properties',
    slug: 'horizon-prime-properties',
    logo: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
    description: 'Dynamic commercial & high-end residential real estate firm operating in top financial capitals and resort destinations.',
    email: 'connect@horizonprime.com',
    phone: '+1 (310) 998-1122',
    address: '9500 Wilshire Blvd',
    city: 'Beverly Hills',
    country: 'United States',
    website: 'https://horizonprime.example.com',
    agentsCount: 50,
    totalListingsCount: 210,
    rating: 4.7,
    reviewsCount: 88,
    establishedYear: 2011,
    specialties: ['Beverly Hills Mansions', 'Commercial Retail', 'Resort Villas']
  },
  {
    id: 'agency-5',
    name: 'Elysian Estates International',
    slug: 'elysian-estates-international',
    logo: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=300&q=80',
    coverImage: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
    description: 'Global boutique agency catering to high-net-worth individuals seeking signature architectural residences and private islands.',
    email: 'vip@elysianestates.com',
    phone: '+41 22 819 3000',
    address: 'Rue du Rhône 42',
    city: 'Geneva',
    country: 'Switzerland',
    website: 'https://elysianestates.example.com',
    agentsCount: 20,
    totalListingsCount: 65,
    rating: 4.9,
    reviewsCount: 64,
    establishedYear: 2005,
    specialties: ['Alpine Chalets', 'Private Islands', 'Architectural Icons']
  }
];

export const MOCK_AGENTS: Agent[] = [
  {
    id: 'agent-1',
    name: 'Eleanor Vance',
    title: 'Senior Managing Director & Partner',
    email: 'eleanor.vance@auraheights.com',
    phone: '+1 (212) 555-0144',
    whatsapp: '+12125550144',
    image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    agencyId: 'agency-1',
    agencyName: 'Aura Heights Real Estate',
    specialization: ['Penthouse Collection', 'Waterfront Estates', 'Private Sales'],
    languages: ['English', 'French'],
    experienceYears: 16,
    activeListingsCount: 14,
    rating: 4.9,
    reviewsCount: 48,
    bio: 'Eleanor is an industry veteran with over $1.2B in career sales. Known for representing signature properties along Park Avenue and Aspen slope-side compounds.',
    socials: { linkedin: '#', instagram: '#', twitter: '#' }
  },
  {
    id: 'agent-2',
    name: 'Marcus Thorne',
    title: 'Principal Luxury Specialist',
    email: 'marcus.t@vanguardliving.com',
    phone: '+1 (305) 555-8821',
    whatsapp: '+13055558821',
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=600&q=80',
    agencyId: 'agency-2',
    agencyName: 'Vanguard Living',
    specialization: ['Miami Beach Front', 'Modern Villas', 'Investment Advisory'],
    languages: ['English', 'Spanish'],
    experienceYears: 12,
    activeListingsCount: 18,
    rating: 4.8,
    reviewsCount: 36,
    bio: 'Specializing in South Florida waterfront architecture, Marcus bridges contemporary aesthetics with quantitative asset valuation.',
    socials: { linkedin: '#', instagram: '#' }
  },
  {
    id: 'agent-3',
    name: 'Victoria Stirling',
    title: 'Director of European Estates',
    email: 'v.stirling@sovereignheritage.com',
    phone: '+44 20 7946 0192',
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80',
    agencyId: 'agency-3',
    agencyName: 'Sovereign Heritage Realty',
    specialization: ['Historic Manors', 'Mayfair Townhouses', 'Equestrian Properties'],
    languages: ['English', 'German', 'Italian'],
    experienceYears: 20,
    activeListingsCount: 10,
    rating: 5.0,
    reviewsCount: 62,
    bio: 'Victoria holds decades of experience discreetly navigating off-market transactions for heritage estates and historic landmarks.',
    socials: { linkedin: '#' }
  },
  {
    id: 'agent-4',
    name: 'Julian Sterling',
    title: 'Senior Vice President of Residential',
    email: 'julian.sterling@horizonprime.com',
    phone: '+1 (310) 555-9011',
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    agencyId: 'agency-4',
    agencyName: 'Horizon Prime Properties',
    specialization: ['Beverly Hills Mansions', 'Bel-Air Compounds', 'New Developments'],
    languages: ['English'],
    experienceYears: 14,
    activeListingsCount: 22,
    rating: 4.9,
    reviewsCount: 42,
    bio: 'Julian represents celebrity clientele, tech founders, and international collectors seeking architecturally significant West Coast residences.',
    socials: { instagram: '#', linkedin: '#' }
  },
  {
    id: 'agent-5',
    name: 'Sophia Laurent',
    title: 'Global Alpine & Villa Specialist',
    email: 'sophia@elysianestates.com',
    phone: '+41 22 819 3010',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&w=600&q=80',
    agencyId: 'agency-5',
    agencyName: 'Elysian Estates International',
    specialization: ['Alpine Chalets', 'Lake Geneva Villas', 'Private Resorts'],
    languages: ['French', 'English', 'Russian'],
    experienceYears: 11,
    activeListingsCount: 8,
    rating: 4.9,
    reviewsCount: 29,
    bio: 'Sophia guides discerning clients through Switzerland, Monaco, and Cote d\'Azur real estate investments with white-glove service.',
    socials: { linkedin: '#' }
  },
  {
    id: 'agent-6',
    name: 'Alexander Hayes',
    title: 'Commercial & Mixed-Use Advisor',
    email: 'alexander.hayes@auraheights.com',
    phone: '+1 (212) 555-0988',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    agencyId: 'agency-1',
    agencyName: 'Aura Heights Real Estate',
    specialization: ['Commercial Towers', 'Retail Spaces', 'High-Rise Office'],
    languages: ['English'],
    experienceYears: 15,
    activeListingsCount: 16,
    rating: 4.7,
    reviewsCount: 31,
    bio: 'Expert in commercial acquisition, tenant underwriting, and prime financial district developments.',
    socials: { linkedin: '#' }
  },
  {
    id: 'agent-7',
    name: 'Camila Rodriguez',
    title: 'Waterfront Development Specialist',
    email: 'camila.r@vanguardliving.com',
    phone: '+1 (305) 555-3411',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80',
    agencyId: 'agency-2',
    agencyName: 'Vanguard Living',
    specialization: ['High-rise Penthouses', 'Pre-construction Sales', 'Interior Design Consulting'],
    languages: ['Spanish', 'English', 'Portuguese'],
    experienceYears: 9,
    activeListingsCount: 15,
    rating: 4.8,
    reviewsCount: 24,
    bio: 'Camila works closely with tier-one architects to bring luxury multi-unit developments to market.',
    socials: { instagram: '#' }
  },
  {
    id: 'agent-8',
    name: 'David Kensington',
    title: 'Senior Estate Broker',
    email: 'd.kensington@sovereignheritage.com',
    phone: '+44 20 7946 0855',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80',
    agencyId: 'agency-3',
    agencyName: 'Sovereign Heritage Realty',
    specialization: ['Country Estates', 'Hunting Grounds', 'Knightsbridge Apartments'],
    languages: ['English'],
    experienceYears: 18,
    activeListingsCount: 11,
    rating: 4.9,
    reviewsCount: 50,
    bio: 'David combines traditional land management expertise with modern digital asset presentation.',
    socials: { linkedin: '#' }
  },
  {
    id: 'agent-9',
    name: 'Seraphina Chen',
    title: 'Architectural & Ultra-Luxury Director',
    email: 'seraphina.c@horizonprime.com',
    phone: '+1 (310) 555-7744',
    image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    agencyId: 'agency-4',
    agencyName: 'Horizon Prime Properties',
    specialization: ['Modernist Masterpieces', 'Cliffside Estates', 'Private Cinema Enclaves'],
    languages: ['English', 'Mandarin'],
    experienceYears: 13,
    activeListingsCount: 19,
    rating: 5.0,
    reviewsCount: 41,
    bio: 'Known for curating bespoke architectural portfolio tours for global art and real estate collectors.',
    socials: { instagram: '#', linkedin: '#' }
  },
  {
    id: 'agent-10',
    name: 'Jean-Luc Moreau',
    title: 'Mediterranean & Riviera Representative',
    email: 'jeanluc@elysianestates.com',
    phone: '+33 4 93 39 00 11',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    agencyId: 'agency-5',
    agencyName: 'Elysian Estates International',
    specialization: ['Cote d\'Azur Estates', 'Vineyards', 'Mega-Yacht Berths'],
    languages: ['French', 'English', 'Italian'],
    experienceYears: 22,
    activeListingsCount: 7,
    rating: 4.9,
    reviewsCount: 38,
    bio: 'French Riviera specialist with unmatched connections across Cannes, Saint-Tropez, and Cap Ferrat.',
    socials: { linkedin: '#' }
  }
];

export const MOCK_LOCATIONS: LocationItem[] = [
  {
    id: 'loc-1',
    name: 'Manhattan',
    slug: 'manhattan',
    city: 'New York',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?auto=format&fit=crop&w=800&q=80',
    description: 'The epicenter of global commerce, culture, and iconic high-rise penthouses overlooking Central Park.',
    propertiesCount: 28,
    avgPriceSqFt: 2150,
    highlights: ['Central Park Views', 'Pre-war Architecture', 'Financial District Towers', 'Michelin-starred Dining'],
    popularFor: 'High-rise Penthouses & Pre-war Co-ops'
  },
  {
    id: 'loc-2',
    name: 'Miami Beach',
    slug: 'miami-beach',
    city: 'Miami',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1506929562872-bb421503ef21?auto=format&fit=crop&w=800&q=80',
    description: 'Tropical elegance, glass-encased oceanfront towers, private dockage, and vibrant year-round lifestyle.',
    propertiesCount: 22,
    avgPriceSqFt: 1850,
    highlights: ['Private Dockage', 'Art Deco District', 'Star Island Estates', 'White Sand Beaches'],
    popularFor: 'Waterfront Villas & Beachfront Condos'
  },
  {
    id: 'loc-3',
    name: 'Mayfair & Kensington',
    slug: 'mayfair-kensington',
    city: 'London',
    country: 'United Kingdom',
    image: 'https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?auto=format&fit=crop&w=800&q=80',
    description: 'Stately Georgian townhouses, private garden squares, and timeless prestige in the heart of London.',
    propertiesCount: 19,
    avgPriceSqFt: 2400,
    highlights: ['Private Garden Squares', 'Georgian Architecture', 'Proximity to Hyde Park', 'Royal Heritage'],
    popularFor: 'Stately Townhouses & Historic Mansions'
  },
  {
    id: 'loc-4',
    name: 'Beverly Hills & Bel-Air',
    slug: 'beverly-hills-bel-air',
    city: 'Los Angeles',
    country: 'United States',
    image: 'https://images.unsplash.com/photo-1580655653885-65763b2597d0?auto=format&fit=crop&w=800&q=80',
    description: 'Secluded gated compounds, modernist cliffside glass villas, and palm-lined avenues.',
    propertiesCount: 25,
    avgPriceSqFt: 1950,
    highlights: ['Gated Security', 'Infinity Edge Pools', 'City-to-Ocean Panoramas', 'Rodeo Drive Shopping'],
    popularFor: 'Gated Luxury Compounds & Architectural Moderns'
  },
  {
    id: 'loc-5',
    name: 'Geneva & Alpine Riviera',
    slug: 'geneva-alpine-riviera',
    city: 'Geneva',
    country: 'Switzerland',
    image: 'https://images.unsplash.com/photo-1527668752968-14dc70a27c95?auto=format&fit=crop&w=800&q=80',
    description: 'Pristine lakefront manses, private vineyard domains, and ultra-exclusive alpine ski chalets.',
    propertiesCount: 14,
    avgPriceSqFt: 2300,
    highlights: ['Lake Geneva Shoreline', 'Ski-in Ski-out Access', 'Tax Discretion', 'Panoramic Alps Views'],
    popularFor: 'Lakefront Estates & Ski Chalets'
  }
];

// Helper to generate 60 realistic properties programmatically with distinct titles, prices, specs & imagery
const TITLES_PREFIXES = [
  'The Glass Pavilion', 'Aura Sky Penthouse', 'Villa Solstice', 'The Sovereign Manor',
  'Elysian Crest Compound', 'The Monolith Residence', 'Belvedere Ocean Villa', 'The Horizon Tower Suite',
  'Serenity Bay Estate', 'The Mayfair Heritage House', 'Park Avenue Grand Duplex', 'The Courchevel Chalet',
  'Star Island Sanctuary', 'The Pinnacle Residence', 'Azure Coast Villa', 'The Obsidian Loft',
  'Chateau de Lumiere', 'The Kensington Gardens Duplex', 'Villa Vista Mar', 'The Beacon Hill Estate',
  'Summit Ridge Estate', 'The Promenade Penthouse', 'Verdant Hill Compound', 'The Grand Palazzo',
  'Highland Ridge Manor', 'The Nexus Commercial Center', 'Crown Jewel Penthouse', 'The Haven Beach Villa'
];

const PROPERTY_TYPES = ['villa', 'apartment', 'penthouse', 'townhouse', 'commercial', 'land', 'new-development'] as const;
const PURPOSES = ['sale', 'rent'] as const;
const CITIES = ['New York', 'Miami', 'London', 'Beverly Hills', 'Geneva', 'Los Angeles', 'Aspen', 'Monaco'];
const NEIGHBORHOODS = ['Central Park South', 'Star Island', 'Mayfair', 'Bel-Air', 'Lake Geneva', 'Tribeca', 'Brickell', 'Kensington'];
const AMENITIES_LIST = [
  'Infinity Pool', 'Private Dock', 'Home Cinema', 'Wine Cellar', 'Spa & Sauna', 
  'Smart Home Automation', '24/7 Security Guard', 'Helipad', 'Private Elevator',
  'Tennis Court', 'Gym & Fitness Suite', 'Staff Quarters', 'Garage (4+ Cars)', 'Panoramic Ocean Views'
];

const IMAGES_POOL = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600573472591-ee6c563aaec9?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=1200&q=80',
  'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?auto=format&fit=crop&w=1200&q=80'
];

export const MOCK_PROPERTIES: Property[] = Array.from({ length: 65 }).map((_, index) => {
  const id = `prop-${index + 1}`;
  const titlePrefix = TITLES_PREFIXES[index % TITLES_PREFIXES.length];
  const type = PROPERTY_TYPES[index % PROPERTY_TYPES.length];
  const purpose = index % 4 === 0 ? 'rent' : 'sale';
  const city = CITIES[index % CITIES.length];
  const neighborhood = NEIGHBORHOODS[index % NEIGHBORHOODS.length];
  const isRent = purpose === 'rent';
  
  // Calculate dynamic price
  const basePrice = isRent 
    ? 12000 + (index * 2500) % 45000 
    : 2500000 + (index * 1250000) % 35000000;

  const bedrooms = 2 + (index % 6);
  const bathrooms = 2 + (index % 5);
  const areaSqFt = 2200 + (index * 650) % 16000;
  const mainImageIndex = index % IMAGES_POOL.length;
  
  const propertyImages = [
    IMAGES_POOL[mainImageIndex],
    IMAGES_POOL[(mainImageIndex + 1) % IMAGES_POOL.length],
    IMAGES_POOL[(mainImageIndex + 2) % IMAGES_POOL.length],
    IMAGES_POOL[(mainImageIndex + 3) % IMAGES_POOL.length]
  ];

  const agent = MOCK_AGENTS[index % MOCK_AGENTS.length];

  return {
    id,
    title: `${titlePrefix} ${type === 'penthouse' ? 'Penthouse' : type === 'villa' ? 'Villa' : 'Residence'}`,
    slug: `${titlePrefix.toLowerCase().replace(/[^a-z0-9]/g, '-')}-${id}`,
    description: `An architectural masterwork situated in prime ${neighborhood}, ${city}. Designed with floor-to-ceiling glass walls, bespoke finishes, dual master suites, and seamless indoor-outdoor luxury entertainment terraces.`,
    purpose,
    type,
    price: basePrice,
    currency: '$',
    period: isRent ? 'month' : undefined,
    location: {
      address: `${100 + index * 12} ${neighborhood} Blvd`,
      neighborhood,
      city,
      area: `${city} Metro`,
      country: city === 'London' ? 'United Kingdom' : city === 'Geneva' ? 'Switzerland' : city === 'Monaco' ? 'Monaco' : 'United States',
      lat: 40.7128 + (index * 0.01) % 0.2,
      lng: -74.0060 + (index * 0.01) % 0.2,
      zipCode: `${90210 + (index % 100)}`
    },
    features: {
      bedrooms,
      bathrooms,
      areaSqFt,
      yearBuilt: 2018 + (index % 7),
      garageSpaces: 2 + (index % 4),
      furnishing: index % 3 === 0 ? 'furnished' : index % 3 === 1 ? 'semi-furnished' : 'unfurnished',
      constructionStatus: index % 5 === 0 ? 'off-plan' : index % 4 === 0 ? 'under-construction' : 'ready-to-move'
    },
    amenities: AMENITIES_LIST.slice(0, 5 + (index % 8)),
    images: propertyImages,
    videoTourUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
    virtualTour3dUrl: 'https://my.matterport.com/show/?m=sample',
    isFeatured: index % 3 === 0,
    isVerified: true,
    isLuxury: basePrice > 5000000 || type === 'penthouse' || type === 'villa',
    isCommercial: type === 'commercial',
    isNewDevelopment: type === 'new-development' || index % 6 === 0,
    completionYear: 2026,
    developerName: 'Aura Signature Developments',
    agentId: agent.id,
    agencyId: agent.agencyId,
    createdAt: new Date(Date.now() - index * 86400000 * 3).toISOString(),
    viewsCount: 1420 + index * 85,
    refCode: `EV-${8000 + index}`,
    floorPlans: [
      {
        id: `fp-1-${id}`,
        name: 'Main Residence Level',
        beds: bedrooms - 1,
        baths: bathrooms - 1,
        sqft: Math.round(areaSqFt * 0.65),
        image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'
      },
      {
        id: `fp-2-${id}`,
        name: 'Upper Penthouse & Terrace',
        beds: 1,
        baths: 1,
        sqft: Math.round(areaSqFt * 0.35),
        image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=800&q=80'
      }
    ],
    priceHistory: [
      { date: '2025-01-15', price: Math.round(basePrice * 1.05), event: 'Listed' },
      { date: '2025-03-01', price: basePrice, event: 'Price Change' }
    ],
    nearbyPlaces: [
      { name: 'St. Jude International Academy', category: 'School', distance: '0.4 miles' },
      { name: 'Mount Sinai Private Pavilion', category: 'Hospital', distance: '1.2 miles' },
      { name: 'Saks Fifth Avenue', category: 'Shopping', distance: '0.8 miles' },
      { name: 'Metropolitan Metro Hub', category: 'Transit', distance: '0.3 miles' },
      { name: 'Le Bernardin Fine Dining', category: 'Dining', distance: '0.5 miles' }
    ]
  };
});

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: 'blog-1',
    title: 'The Evolution of High-End Architecture in 2026: Biophilic Luxury',
    slug: 'the-evolution-of-high-end-architecture-in-2026',
    excerpt: 'How leading international architects are blending natural biophilic integration with automated luxury living technology.',
    content: `
      # The Evolution of High-End Architecture in 2026
      
      Contemporary ultra-luxury real estate is undergoing a seismic paradigm shift. The demand for purely ornate marble structures has given way to **biophilic architectural harmony**, where living green facades, internal water sanctuaries, and net-zero energy systems meet zero-tolerance privacy engineering.

      ## Key Trends Defining Prime Estates
      - **Seamless Indoor-Outdoor Glass Pocketing**: Wall-to-ceiling structural glass motorized systems that eliminate structural barriers between interior salons and infinity water terraces.
      - **Private Wellness Suites**: Cryotherapy chambers, infrared cedar saunas, and magnesium flotation pools built standard in private compounds.
      - **Off-Grid Independence**: Hydrogen cell storage and solar glass integration ensuring continuous autonomy without compromising visual grandeur.
    `,
    category: 'Architecture & Design',
    coverImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Julian Sterling',
      avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=300&q=80',
      role: 'Architecture Contributor'
    },
    publishedAt: '2026-06-12',
    readTimeMinutes: 6,
    tags: ['Architecture', 'Luxury Living', 'Trends', 'Design']
  },
  {
    id: 'blog-2',
    title: 'Global Prime Property Index: Q2 2026 Capital Growth Analysis',
    slug: 'global-prime-property-index-q2-2026',
    excerpt: 'An in-depth capital flow analysis across Manhattan, London, Geneva, Miami, and Dubai prime residential sectors.',
    content: `
      # Global Prime Property Index: Q2 2026
      
      Despite macroeconomic headwinds, premier real estate assets in top tier global safe havens continue to display remarkable resilience and capital preservation capability.

      ## Market Highlights
      - **Manhattan Ultra-Prime**: Penthouse sales above $25M surged by 14% year-over-year.
      - **Miami Waterfront**: Land scarcity along Star Island and Palm Island drove average square foot prices to record highs.
      - **Geneva & London Mayfair**: Flight to physical tangible assets strengthened buyer confidence among family offices.
    `,
    category: 'Market Insights',
    coverImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Eleanor Vance',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
      role: 'Managing Partner'
    },
    publishedAt: '2026-06-28',
    readTimeMinutes: 8,
    tags: ['Market Report', 'Investment', 'Real Estate', 'Global Cities']
  },
  {
    id: 'blog-3',
    title: 'Navigating Off-Market Luxury Acquisitions: A Buyer’s Guide',
    slug: 'navigating-off-market-luxury-acquisitions',
    excerpt: 'Essential strategies for accessing quiet listings and private sales in competitive global metropolitan areas.',
    content: `
      # Navigating Off-Market Luxury Acquisitions
      
      Over 40% of signature transactions above $15 Million occur privately without entering public MLS channels. Understanding how to navigate off-market inventory requires trusted advisory network access.

      ## Why High-Net-Worth Sellers Prefer Quiet Listings
      1. Privacy & Discretion
      2. Targeted High-Qualified Buyer Matching
      3. Mitigating Public Price History Exposure
    `,
    category: 'Buying Guide',
    coverImage: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1200&q=80',
    author: {
      name: 'Victoria Stirling',
      avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=300&q=80',
      role: 'European Estates Director'
    },
    publishedAt: '2026-07-04',
    readTimeMinutes: 5,
    tags: ['Buying', 'Off-Market', 'Strategy', 'Private Wealth']
  }
];
