import { PrismaClient } from '@prisma/client';

// Declare global Prisma instance to prevent multiple connections in dev
declare global {
  var prismaGlobal: PrismaClient | undefined;
}

let _client: PrismaClient | null = null;

function getPrismaClient(): PrismaClient | null {
  try {
    if (!_client) {
      if (globalThis.prismaGlobal) {
        _client = globalThis.prismaGlobal;
      } else {
        _client = new PrismaClient({
          log: [],
        });
        if (process.env.NODE_ENV !== 'production') {
          globalThis.prismaGlobal = _client;
        }
      }
    }
    return _client;
  } catch {
    return null;
  }
}

export const prisma: PrismaClient = new Proxy({} as PrismaClient, {
  get(_target, prop) {
    const client = getPrismaClient();
    if (!client) {
      return () => Promise.resolve(null);
    }
    const value = (client as unknown as Record<string, unknown>)[prop as string];
    if (typeof value === 'function') {
      return value.bind(client);
    }
    return value;
  },
});

// Database health check cache to avoid repeatedly hanging on unreachable or non-migrated databases
let lastDbFailureTime = 0;
const DB_RETRY_COOLDOWN_MS = 20000; // 20 seconds cooldown on connection failure

function canAttemptDb(): boolean {
  const url = process.env.DATABASE_URL;
  if (!url || url.includes('localhost:5432') || url.includes('USER:PASSWORD')) {
    return false;
  }
  if (Date.now() - lastDbFailureTime < DB_RETRY_COOLDOWN_MS) {
    return false;
  }
  return true;
}

function recordDbFailure() {
  lastDbFailureTime = Date.now();
}

async function safeDbQuery<T>(queryFn: () => Promise<T>, timeoutMs = 1200): Promise<T | null> {
  if (!canAttemptDb()) return null;
  try {
    const timeoutPromise = new Promise<null>((resolve) => {
      setTimeout(() => resolve(null), timeoutMs);
    });
    const result = await Promise.race([queryFn(), timeoutPromise]);
    if (result === null) {
      recordDbFailure();
      return null;
    }
    return result;
  } catch {
    recordDbFailure();
    return null;
  }
}

// In-memory persistent luxury demo store when PostgreSQL database connection is unavailable or initializing
export interface LuxuryCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface LuxuryProductItem {
  id: string;
  title: string;
  slug: string;
  subtitle: string;
  description: string;
  price: number;
  images: string[];
  isFeatured: boolean;
  specifications: Record<string, string>;
  materials: string;
  leadTime: string;
  categoryId: string;
  category?: LuxuryCategory;
  createdAt: Date;
  updatedAt: Date;
}

export interface LuxuryInquiry {
  id: string;
  clientName: string;
  clientEmail: string;
  phone?: string | null;
  message: string;
  status: 'PENDING' | 'REVIEWED' | 'RESOLVED';
  notes?: string | null;
  productItemId?: string | null;
  productItem?: LuxuryProductItem | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface LuxuryTestimonial {
  id: string;
  quote: string;
  author: string;
  roleOrPublication: string;
  rating: number;
  createdAt: Date;
}

export interface LuxuryFAQ {
  id: string;
  question: string;
  answer: string;
  order: number;
  createdAt: Date;
}

export interface LuxuryUser {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  role: 'ADMIN' | 'CURATOR';
  createdAt: Date;
  updatedAt: Date;
}

// Initial rich luxury demo data
const initialCategories: LuxuryCategory[] = [
  {
    id: 'cat-timepieces',
    name: 'Haute Horlogerie',
    slug: 'haute-horlogerie',
    description: 'Precision-engineered mechanical marvels crafted with astronomical accuracy and hand-finished guilloché dials.',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'cat-leather',
    name: 'Maison Leathercraft',
    slug: 'maison-leathercraft',
    description: 'Hand-burnished full-grain Tuscan hides, saddle-stitched by master artisans for generations of patina.',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
  {
    id: 'cat-experiences',
    name: 'Private Sanctuary Journeys',
    slug: 'private-sanctuary-journeys',
    description: 'Bespoke retreats, private architectural sanctuaries, and curated aviation experiences tailored to your cadence.',
    createdAt: new Date('2026-01-01'),
    updatedAt: new Date('2026-01-01'),
  },
];

const initialProducts: LuxuryProductItem[] = [
  {
    id: 'prod-astralis-tourbillon',
    title: 'Astralis Celestial Tourbillon',
    slug: 'astralis-celestial-tourbillon',
    subtitle: 'Limited Edition of 18 Pieces worldwide',
    description: 'The Astralis Celestial Tourbillon features a tri-axial tourbillon cage floating within a sapphire crystal case, mirroring the sidereal rotation of the Northern constellation. Hand-engraved titanium bridges and aventurine dial reflect infinite deep space.',
    price: 185000,
    images: [
      'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1524805444758-089113d48a6d?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1547996160-71dfa63096aa?auto=format&fit=crop&w=1400&q=85',
    ],
    isFeatured: true,
    specifications: {
      'Movement': 'Manufacture Calibre AS-8800 Manual Wind',
      'Power Reserve': '120 Hours (5 Days)',
      'Case Diameter': '42.5mm',
      'Water Resistance': '50 Meters / 5 ATM',
      'Strap': 'Hand-stitched Louisiana Alligator with 18k Rose Gold Deployant',
    },
    materials: 'Grade 5 Titanium, 18k Rose Gold, Double Anti-Reflective Sapphire Crystal',
    leadTime: 'Crafted on commission (6-8 weeks)',
    categoryId: 'cat-timepieces',
    createdAt: new Date('2026-01-10'),
    updatedAt: new Date('2026-01-10'),
  },
  {
    id: 'prod-monolith-briefcase',
    title: 'The Monolith Weekender & Briefcase',
    slug: 'monolith-weekender-briefcase',
    subtitle: 'Full-Grain Tuscan Vachetta Leather',
    description: 'Sculpted from a single contiguous hide of vegetable-tanned French calfskin, The Monolith is reinforced with hand-forged solid brass hardware coated in matte ruthenium. Seamless interior compartments cradle essential documents and personal heirlooms.',
    price: 6800,
    images: [
      'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=1400&q=85',
    ],
    isFeatured: true,
    specifications: {
      'Dimensions': '46cm x 32cm x 18cm',
      'Weight': '1.85 kg',
      'Hardware': 'Solid Brass with PVD Ruthenium Finish',
      'Lining': 'Heavy Silk-Linen Jacquard with Water-Resistant Coating',
      'Serial': 'Individually numbered brass plaque',
    },
    materials: 'Full-Grain Tuscan Vachetta Leather, Silk-Linen Jacquard',
    leadTime: 'Ready for private courier dispatch or boutique pickup',
    categoryId: 'cat-leather',
    createdAt: new Date('2026-01-12'),
    updatedAt: new Date('2026-01-12'),
  },
  {
    id: 'prod-solarium-chronograph',
    title: 'Solarium Perpetual Calendar Chronograph',
    slug: 'solarium-perpetual-chronograph',
    subtitle: 'Solid 950 Platinum & Grand Feu Enamel',
    description: 'An ode to horological permanence. The Solarium incorporates an instantaneous perpetual calendar with moonphase display accurate to one day every 122 years. The dial is hand-fired Grand Feu enamel over an 18k solid gold baseplate.',
    price: 142000,
    images: [
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1526045612212-70caf35c14df?auto=format&fit=crop&w=1400&q=85',
    ],
    isFeatured: true,
    specifications: {
      'Movement': 'Calibre AS-920 Column-Wheel Chronograph',
      'Case Metal': '950 Solid Platinum',
      'Case Diameter': '40mm',
      'Thickness': '11.4mm',
      'Dial': 'Grand Feu White Enamel with Blued Steel Breguet Hands',
    },
    materials: '950 Platinum, Grand Feu Enamel, Sapphire Crystal Back',
    leadTime: 'Bespoke assembly upon private appointment',
    categoryId: 'cat-timepieces',
    createdAt: new Date('2026-01-15'),
    updatedAt: new Date('2026-01-15'),
  },
  {
    id: 'prod-kyoto-retreat-sanctuary',
    title: 'The Kyoto Pavilions Sanctuary Experience',
    slug: 'kyoto-pavilions-sanctuary-experience',
    subtitle: '7-Night Private Architectural Residence',
    description: 'Private immersion in a restored 17th-century sukiya-style wooden villa nestled in the Arashiyama bamboo forest. Features private Michelin-starred kaiseki banquets prepared by Master chef Eiji Kuroda, private tea masters, and hot spring cedar onsens.',
    price: 48000,
    images: [
      'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1503899036084-c55cdd92da26?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1528164344705-475426879c0d?auto=format&fit=crop&w=1400&q=85',
    ],
    isFeatured: true,
    specifications: {
      'Duration': '7 Nights / 8 Days',
      'Capacity': 'Up to 4 Guests (Exclusive Buyout)',
      'Aviation': 'Private Falcon 8X Transfer Connections',
      'Hospitality': '24/7 Dedicated Butler & Master Sommelier',
      'Inclusions': 'Private Temple Access, Custom Kimono Atelier Fitting',
    },
    materials: 'Natural Hinoki Cypress, Volcanic Onsen Stone, Tatami Rush Grass',
    leadTime: 'Advance booking minimum 60 days',
    categoryId: 'cat-experiences',
    createdAt: new Date('2026-01-18'),
    updatedAt: new Date('2026-01-18'),
  },
  {
    id: 'prod-valkyrie-folio',
    title: 'Valkyrie Archival Folio Case',
    slug: 'valkyrie-archival-folio-case',
    subtitle: 'Midnight Navy Boxcalf & Alcantara',
    description: 'Tailored for architects, curators, and collectors, the Valkyrie folio houses rare blueprints and private archives. Lined in champagne microfiber with magnetic neodymium edge clasps and gold hot-stamped initials.',
    price: 4200,
    images: [
      'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=1400&q=85',
    ],
    isFeatured: false,
    specifications: {
      'Dimensions': '38cm x 28cm x 3.5cm',
      'Fit': 'Fits 16" Laptops, A4 Folios & Drawing Books',
      'Closure': 'Concealed Magnetic Rare-Earth Locks',
      'Craft': '100% Hand-Saddle Stitched with Waxed Linen Thread',
    },
    materials: 'Boxcalf Tannage, Alcantara Interior, Solid Brass Monogram Plate',
    leadTime: '2 weeks with bespoke monogramming',
    categoryId: 'cat-leather',
    createdAt: new Date('2026-01-20'),
    updatedAt: new Date('2026-01-20'),
  },
  {
    id: 'prod-dolomites-aviation-chalet',
    title: 'Alpine Peak Heli-Chalet Residence',
    slug: 'alpine-peak-heli-chalet-residence',
    subtitle: 'Cortina d’Ampezzo Private Estate',
    description: 'Perched at 2,400 meters above sea level with private helipad access, this cantilevered glass and larch residence provides panoramic views of the Tofane peaks. Complete with heated indoor infinity pool, private ski instructor, and wine cellar containing 3,000 Grand Cru vintages.',
    price: 65000,
    images: [
      'https://images.unsplash.com/photo-1502784444187-359ac186c5bb?auto=format&fit=crop&w=1400&q=85',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=85',
    ],
    isFeatured: false,
    specifications: {
      'Altitude': '2,400 Meters',
      'Accommodates': 'Up to 10 Guests in 5 Suites',
      'Wellness': 'Finnish Sauna, Hammam, Heated Glacier Pool',
      'Transport': 'Daily Eurocopter EC130 Heli-Shuttle Included',
    },
    materials: 'Dolomite Limestone, Charred Swiss Pine, Triple-Glazed Low-E Glass',
    leadTime: 'Winter & Summer seasonal reservations',
    categoryId: 'cat-experiences',
    createdAt: new Date('2026-01-22'),
    updatedAt: new Date('2026-01-22'),
  },
];

const initialTestimonials: LuxuryTestimonial[] = [
  {
    id: 'test-1',
    quote: 'AereoStack represents the purest distillation of modern luxury: quiet, confident, and uncompromising in its execution. The Astralis Tourbillon is an absolute masterwork.',
    author: 'Henriette de Montfort',
    roleOrPublication: 'Robb Report Haute Horlogerie Editor',
    rating: 5,
    createdAt: new Date('2026-01-05'),
  },
  {
    id: 'test-2',
    quote: 'The consultation experience was seamless. Within hours of our private inquiry, our concierge organized a bespoke viewing in Zurich with discreet grace.',
    author: 'Julian Vance',
    roleOrPublication: 'Private Client, Geneva & London',
    rating: 5,
    createdAt: new Date('2026-01-14'),
  },
  {
    id: 'test-3',
    quote: 'In an era of fleeting trends, this maison stands apart. Their leather goods age like fine vintage wine, acquiring depth and personal narrative.',
    author: 'Clara Sorensen',
    roleOrPublication: 'Architectural Digest International',
    rating: 5,
    createdAt: new Date('2026-01-20'),
  },
];

const initialFAQs: LuxuryFAQ[] = [
  {
    id: 'faq-1',
    question: 'How are commissions and bespoke requests initiated?',
    answer: 'Every bespoke journey begins with an initial consultation through our digital platform or via private appointment in our Zurich, London, or Tokyo salons. A dedicated client advisor will review your specifications, discuss artisanal materials, and guide the timeline from initial sketch to final presentation.',
    order: 1,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: 'faq-2',
    question: 'What is the provenance and authenticity guarantee of each creation?',
    answer: 'All horological and leather creations are accompanied by a physical leather-bound Certificate of Origin, signed by the master artisan, and registered within our cryptographic maison ledger. Each piece carries an individual serial number hand-engraved on solid noble metal.',
    order: 2,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: 'faq-3',
    question: 'What are the delivery terms and private courier arrangements?',
    answer: 'Complimentary white-glove armored courier delivery is provided globally across 120 countries with full insured transit value. Alternatively, clients may elect for private salon collection with customized presentation ceremonies.',
    order: 3,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: 'faq-4',
    question: 'How do you handle maintenance and lifelong restoration?',
    answer: 'Our creations are engineered for generational longevity. All timepieces include a 10-year international manufacture warranty, complimentary biennial regulation, and dedicated atelier restoration services across our European workshops.',
    order: 4,
    createdAt: new Date('2026-01-01'),
  },
  {
    id: 'faq-5',
    question: 'Can sanctuary journeys and private aviation experiences be customized?',
    answer: 'Absolutely. Every sanctuary itinerary is custom-curated according to your travel preferences, dietary requirements, security protocols, and flight schedules. Complete buyouts and discreet private transfers are standard.',
    order: 5,
    createdAt: new Date('2026-01-01'),
  },
];

const initialInquiries: LuxuryInquiry[] = [
  {
    id: 'inq-1',
    clientName: 'Lord Edward Sterling',
    clientEmail: 'e.sterling@mayfairheritage.co.uk',
    phone: '+44 20 7946 0912',
    message: 'Interested in reserving Piece #07 of the Astralis Celestial Tourbillon with a custom engraved family crest on the movement bridge.',
    status: 'REVIEWED',
    notes: 'Client advisor Marcus assigned. Consultation scheduled for Thursday in Mayfair.',
    productItemId: 'prod-astralis-tourbillon',
    createdAt: new Date('2026-02-10T14:30:00Z'),
    updatedAt: new Date('2026-02-11T09:15:00Z'),
  },
  {
    id: 'inq-2',
    clientName: 'Elena Rostova',
    clientEmail: 'elena@rostova-design.com',
    phone: '+41 22 819 4400',
    message: 'Requesting private buyout availability for the Kyoto Pavilions Sanctuary in late October for an intimate anniversary celebration.',
    status: 'PENDING',
    notes: null,
    productItemId: 'prod-kyoto-retreat-sanctuary',
    createdAt: new Date('2026-02-14T11:20:00Z'),
    updatedAt: new Date('2026-02-14T11:20:00Z'),
  },
  {
    id: 'inq-3',
    clientName: 'Dr. Arthur Chen',
    clientEmail: 'arthur.chen@singapore-invest.sg',
    phone: '+65 6789 0123',
    message: 'Inquiring about commissioning two Monolith Briefcases in custom espresso bridle leather with hand-stamped gold monogramming.',
    status: 'RESOLVED',
    notes: 'Payment confirmed. Hides selected at Tuscan tannery. Estimated dispatch March 28.',
    productItemId: 'prod-monolith-briefcase',
    createdAt: new Date('2026-02-01T08:00:00Z'),
    updatedAt: new Date('2026-02-05T16:45:00Z'),
  },
];

// Global in-memory cache for mutations
declare global {
  var _luxuryDataStore: {
    categories: LuxuryCategory[];
    products: LuxuryProductItem[];
    inquiries: LuxuryInquiry[];
    testimonials: LuxuryTestimonial[];
    faqs: LuxuryFAQ[];
  } | undefined;
}

if (!globalThis._luxuryDataStore) {
  globalThis._luxuryDataStore = {
    categories: [...initialCategories],
    products: [...initialProducts],
    inquiries: [...initialInquiries],
    testimonials: [...initialTestimonials],
    faqs: [...initialFAQs],
  };
}

const memoryStore = globalThis._luxuryDataStore;

// Data normalization helpers
function normalizeCategory(cat: {
  id: string;
  name: string;
  slug: string;
  description?: string | null;
  createdAt: Date;
  updatedAt: Date;
}): LuxuryCategory {
  return {
    id: cat.id,
    name: cat.name,
    slug: cat.slug,
    description: cat.description || '',
    createdAt: cat.createdAt,
    updatedAt: cat.updatedAt,
  };
}

function normalizeProduct(prod: {
  id: string;
  title: string;
  slug: string;
  subtitle?: string | null;
  description: string;
  price: number;
  images: string[];
  isFeatured: boolean;
  specifications?: unknown;
  materials?: string | null;
  leadTime?: string | null;
  categoryId: string;
  category?: {
    id: string;
    name: string;
    slug: string;
    description?: string | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}): LuxuryProductItem {
  return {
    id: prod.id,
    title: prod.title,
    slug: prod.slug,
    subtitle: prod.subtitle || '',
    description: prod.description,
    price: prod.price,
    images: prod.images,
    isFeatured: prod.isFeatured,
    specifications: (prod.specifications as Record<string, string>) || {},
    materials: prod.materials || 'Noble Metals & Certified Artisanal Materials',
    leadTime: prod.leadTime || 'Bespoke commission',
    categoryId: prod.categoryId,
    category: prod.category ? normalizeCategory(prod.category) : undefined,
    createdAt: prod.createdAt,
    updatedAt: prod.updatedAt,
  };
}

function normalizeInquiry(inq: {
  id: string;
  clientName: string;
  clientEmail: string;
  phone?: string | null;
  message: string;
  status: string;
  notes?: string | null;
  productItemId?: string | null;
  productItem?: {
    id: string;
    title: string;
    slug: string;
    subtitle?: string | null;
    description: string;
    price: number;
    images: string[];
    isFeatured: boolean;
    specifications?: unknown;
    materials?: string | null;
    leadTime?: string | null;
    categoryId: string;
    category?: {
      id: string;
      name: string;
      slug: string;
      description?: string | null;
      createdAt: Date;
      updatedAt: Date;
    } | null;
    createdAt: Date;
    updatedAt: Date;
  } | null;
  createdAt: Date;
  updatedAt: Date;
}): LuxuryInquiry {
  return {
    id: inq.id,
    clientName: inq.clientName,
    clientEmail: inq.clientEmail,
    phone: inq.phone,
    message: inq.message,
    status: inq.status as 'PENDING' | 'REVIEWED' | 'RESOLVED',
    notes: inq.notes,
    productItemId: inq.productItemId,
    productItem: inq.productItem ? normalizeProduct(inq.productItem) : null,
    createdAt: inq.createdAt,
    updatedAt: inq.updatedAt,
  };
}

// Universal luxury repository providing Prisma-compatible data access
export const luxuryDb = {
  // Categories
  async getCategories(): Promise<LuxuryCategory[]> {
    const cats = await safeDbQuery(() =>
      prisma.category.findMany({
        orderBy: { name: 'asc' },
        include: { products: true },
      })
    );
    if (cats && cats.length > 0) return cats.map(normalizeCategory);
    return memoryStore.categories;
  },

  async getCategoryBySlug(slug: string): Promise<LuxuryCategory | null> {
    const cat = await safeDbQuery(() =>
      prisma.category.findUnique({
        where: { slug },
        include: { products: true },
      })
    );
    if (cat) return normalizeCategory(cat);
    return memoryStore.categories.find((c) => c.slug === slug) || null;
  },

  // Products
  async getProducts(filter?: { categorySlug?: string; featuredOnly?: boolean; search?: string }): Promise<LuxuryProductItem[]> {
    const prods = await safeDbQuery(async () => {
      const where: Record<string, unknown> = {};
      if (filter?.featuredOnly) where.isFeatured = true;
      if (filter?.categorySlug && filter.categorySlug !== 'all') {
        where.category = { slug: filter.categorySlug };
      }
      if (filter?.search) {
        where.OR = [
          { title: { contains: filter.search, mode: 'insensitive' } },
          { description: { contains: filter.search, mode: 'insensitive' } },
        ];
      }
      return prisma.productItem.findMany({
        where,
        include: { category: true },
        orderBy: { createdAt: 'desc' },
      });
    });

    if (prods && prods.length > 0) return prods.map(normalizeProduct);

    let result = [...memoryStore.products];
    if (filter?.featuredOnly) {
      result = result.filter((p) => p.isFeatured);
    }
    if (filter?.categorySlug && filter.categorySlug !== 'all') {
      const category = memoryStore.categories.find((c) => c.slug === filter.categorySlug);
      if (category) {
        result = result.filter((p) => p.categoryId === category.id);
      }
    }
    if (filter?.search) {
      const query = filter.search.toLowerCase();
      result = result.filter(
        (p) =>
          p.title.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          (p.subtitle && p.subtitle.toLowerCase().includes(query))
      );
    }
    return result.map((p) => ({
      ...p,
      category: memoryStore.categories.find((c) => c.id === p.categoryId),
    }));
  },

  async getProductBySlug(slug: string): Promise<LuxuryProductItem | null> {
    const prod = await safeDbQuery(() =>
      prisma.productItem.findUnique({
        where: { slug },
        include: { category: true },
      })
    );
    if (prod) return normalizeProduct(prod);

    const found = memoryStore.products.find((p) => p.slug === slug);
    if (!found) return null;
    return {
      ...found,
      category: memoryStore.categories.find((c) => c.id === found.categoryId),
    };
  },

  async getProductById(id: string): Promise<LuxuryProductItem | null> {
    const prod = await safeDbQuery(() =>
      prisma.productItem.findUnique({
        where: { id },
        include: { category: true },
      })
    );
    if (prod) return normalizeProduct(prod);

    const found = memoryStore.products.find((p) => p.id === id);
    if (!found) return null;
    return {
      ...found,
      category: memoryStore.categories.find((c) => c.id === found.categoryId),
    };
  },

  async createProduct(data: {
    title: string;
    slug: string;
    subtitle?: string;
    description: string;
    price: number;
    images: string[];
    isFeatured?: boolean;
    specifications?: Record<string, string>;
    materials?: string;
    leadTime?: string;
    categoryId: string;
  }): Promise<LuxuryProductItem> {
    const newProduct: LuxuryProductItem = {
      id: `prod-${Date.now()}`,
      title: data.title,
      slug: data.slug,
      subtitle: data.subtitle || '',
      description: data.description,
      price: data.price,
      images: data.images.length > 0 ? data.images : ['https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=1400&q=85'],
      isFeatured: !!data.isFeatured,
      specifications: data.specifications || {},
      materials: data.materials || 'Noble Metals & Certified Artisanal Materials',
      leadTime: data.leadTime || 'Bespoke commission',
      categoryId: data.categoryId,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await safeDbQuery(() =>
      prisma.productItem.create({
        data: {
          title: data.title,
          slug: data.slug,
          subtitle: data.subtitle,
          description: data.description,
          price: data.price,
          images: newProduct.images,
          isFeatured: newProduct.isFeatured,
          specifications: newProduct.specifications,
          materials: newProduct.materials,
          leadTime: newProduct.leadTime,
          categoryId: data.categoryId,
        },
      })
    );

    memoryStore.products.unshift(newProduct);
    return newProduct;
  },

  async updateProduct(id: string, data: Partial<LuxuryProductItem>): Promise<LuxuryProductItem | null> {
    await safeDbQuery(() =>
      prisma.productItem.update({
        where: { id },
        data: {
          ...(data.title && { title: data.title }),
          ...(data.subtitle !== undefined && { subtitle: data.subtitle }),
          ...(data.description && { description: data.description }),
          ...(data.price !== undefined && { price: data.price }),
          ...(data.isFeatured !== undefined && { isFeatured: data.isFeatured }),
          ...(data.materials !== undefined && { materials: data.materials }),
          ...(data.leadTime !== undefined && { leadTime: data.leadTime }),
          ...(data.categoryId && { categoryId: data.categoryId }),
        },
      })
    );

    const idx = memoryStore.products.findIndex((p) => p.id === id);
    if (idx !== -1) {
      memoryStore.products[idx] = {
        ...memoryStore.products[idx],
        ...data,
        updatedAt: new Date(),
      };
      return memoryStore.products[idx];
    }
    return null;
  },

  async deleteProduct(id: string): Promise<boolean> {
    await safeDbQuery(() => prisma.productItem.delete({ where: { id } }));
    const idx = memoryStore.products.findIndex((p) => p.id === id);
    if (idx !== -1) {
      memoryStore.products.splice(idx, 1);
      return true;
    }
    return false;
  },

  // Inquiries
  async getInquiries(): Promise<LuxuryInquiry[]> {
    const inqs = await safeDbQuery(() =>
      prisma.inquiry.findMany({
        orderBy: { createdAt: 'desc' },
        include: { productItem: true },
      })
    );
    if (inqs && inqs.length > 0) return inqs.map(normalizeInquiry);

    return memoryStore.inquiries.map((inq) => ({
      ...inq,
      productItem: inq.productItemId
        ? memoryStore.products.find((p) => p.id === inq.productItemId) || null
        : null,
    }));
  },

  async createInquiry(data: {
    clientName: string;
    clientEmail: string;
    phone?: string | null;
    message: string;
    productItemId?: string | null;
  }): Promise<LuxuryInquiry> {
    const newInquiry: LuxuryInquiry = {
      id: `inq-${Date.now()}`,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      phone: data.phone || null,
      message: data.message,
      status: 'PENDING',
      notes: null,
      productItemId: data.productItemId || null,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    await safeDbQuery(() =>
      prisma.inquiry.create({
        data: {
          clientName: data.clientName,
          clientEmail: data.clientEmail,
          phone: data.phone,
          message: data.message,
          productItemId: data.productItemId,
        },
      })
    );

    memoryStore.inquiries.unshift(newInquiry);
    return newInquiry;
  },

  async updateInquiryStatus(id: string, status: 'PENDING' | 'REVIEWED' | 'RESOLVED', notes?: string): Promise<LuxuryInquiry | null> {
    await safeDbQuery(() =>
      prisma.inquiry.update({
        where: { id },
        data: {
          status,
          ...(notes !== undefined && { notes }),
        },
      })
    );

    const idx = memoryStore.inquiries.findIndex((i) => i.id === id);
    if (idx !== -1) {
      memoryStore.inquiries[idx].status = status;
      if (notes !== undefined) {
        memoryStore.inquiries[idx].notes = notes;
      }
      memoryStore.inquiries[idx].updatedAt = new Date();
      return memoryStore.inquiries[idx];
    }
    return null;
  },

  // Testimonials
  async getTestimonials(): Promise<LuxuryTestimonial[]> {
    const tests = await safeDbQuery(() =>
      prisma.testimonial.findMany({
        orderBy: { createdAt: 'asc' },
      })
    );
    if (tests && tests.length > 0) return tests;
    return memoryStore.testimonials;
  },

  // FAQs
  async getFAQs(): Promise<LuxuryFAQ[]> {
    const faqs = await safeDbQuery(() =>
      prisma.fAQItem.findMany({
        orderBy: { order: 'asc' },
      })
    );
    if (faqs && faqs.length > 0) return faqs;
    return memoryStore.faqs;
  },

  async createFAQ(data: { question: string; answer: string; order?: number }): Promise<LuxuryFAQ> {
    const newFaq: LuxuryFAQ = {
      id: `faq-${Date.now()}`,
      question: data.question,
      answer: data.answer,
      order: data.order || memoryStore.faqs.length + 1,
      createdAt: new Date(),
    };

    await safeDbQuery(() =>
      prisma.fAQItem.create({
        data: {
          question: data.question,
          answer: data.answer,
          order: newFaq.order,
        },
      })
    );

    memoryStore.faqs.push(newFaq);
    return newFaq;
  },

  async deleteFAQ(id: string): Promise<boolean> {
    await safeDbQuery(() => prisma.fAQItem.delete({ where: { id } }));
    const idx = memoryStore.faqs.findIndex((f) => f.id === id);
    if (idx !== -1) {
      memoryStore.faqs.splice(idx, 1);
      return true;
    }
    return false;
  },
};
