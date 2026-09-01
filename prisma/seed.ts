import { PrismaClient, Role, InquiryStatus } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding luxury brand database...');

  // Clean existing tables
  await prisma.inquiry.deleteMany();
  await prisma.productItem.deleteMany();
  await prisma.category.deleteMany();
  await prisma.testimonial.deleteMany();
  await prisma.fAQItem.deleteMany();
  await prisma.user.deleteMany();

  // Create Admin User
  const passwordHash = await bcrypt.hash('LuxuryAdmin2026!', 10);
  const adminUser = await prisma.user.create({
    data: {
      email: 'curator@aereostack.com',
      name: 'Maison Curator',
      passwordHash,
      role: Role.ADMIN,
    },
  });
  console.log(`Created admin user: ${adminUser.email}`);

  // Create Categories
  const horlogerie = await prisma.category.create({
    data: {
      name: 'Haute Horlogerie',
      slug: 'haute-horlogerie',
      description: 'Precision-engineered mechanical marvels crafted with astronomical accuracy and hand-finished guilloché dials.',
    },
  });

  const leathercraft = await prisma.category.create({
    data: {
      name: 'Maison Leathercraft',
      slug: 'maison-leathercraft',
      description: 'Hand-burnished full-grain Tuscan hides, saddle-stitched by master artisans for generations of patina.',
    },
  });

  const sanctuaries = await prisma.category.create({
    data: {
      name: 'Private Sanctuary Journeys',
      slug: 'private-sanctuary-journeys',
      description: 'Bespoke retreats, private architectural sanctuaries, and curated aviation experiences tailored to your cadence.',
    },
  });

  // Create Product Items
  const p1 = await prisma.productItem.create({
    data: {
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
      categoryId: horlogerie.id,
    },
  });

  const p2 = await prisma.productItem.create({
    data: {
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
      categoryId: leathercraft.id,
    },
  });

  await prisma.productItem.create({
    data: {
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
      categoryId: horlogerie.id,
    },
  });

  await prisma.productItem.create({
    data: {
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
      categoryId: sanctuaries.id,
    },
  });

  // Create Inquiries
  await prisma.inquiry.create({
    data: {
      clientName: 'Lord Edward Sterling',
      clientEmail: 'e.sterling@mayfairheritage.co.uk',
      phone: '+44 20 7946 0912',
      message: 'Interested in reserving Piece #07 of the Astralis Celestial Tourbillon with a custom engraved family crest on the movement bridge.',
      status: InquiryStatus.REVIEWED,
      notes: 'Client advisor Marcus assigned. Consultation scheduled for Thursday in Mayfair.',
      productItemId: p1.id,
    },
  });

  await prisma.inquiry.create({
    data: {
      clientName: 'Dr. Arthur Chen',
      clientEmail: 'arthur.chen@singapore-invest.sg',
      phone: '+65 6789 0123',
      message: 'Inquiring about commissioning two Monolith Briefcases in custom espresso bridle leather with hand-stamped gold monogramming.',
      status: InquiryStatus.RESOLVED,
      notes: 'Payment confirmed. Hides selected at Tuscan tannery. Estimated dispatch March 28.',
      productItemId: p2.id,
    },
  });

  // Create Testimonials
  await prisma.testimonial.createMany({
    data: [
      {
        quote: 'AereoStack represents the purest distillation of modern luxury: quiet, confident, and uncompromising in its execution. The Astralis Tourbillon is an absolute masterwork.',
        author: 'Henriette de Montfort',
        roleOrPublication: 'Robb Report Haute Horlogerie Editor',
        rating: 5,
      },
      {
        quote: 'The consultation experience was seamless. Within hours of our private inquiry, our concierge organized a bespoke viewing in Zurich with discreet grace.',
        author: 'Julian Vance',
        roleOrPublication: 'Private Client, Geneva & London',
        rating: 5,
      },
      {
        quote: 'In an era of fleeting trends, this maison stands apart. Their leather goods age like fine vintage wine, acquiring depth and personal narrative.',
        author: 'Clara Sorensen',
        roleOrPublication: 'Architectural Digest International',
        rating: 5,
      },
    ],
  });

  // Create FAQs
  await prisma.fAQItem.createMany({
    data: [
      {
        question: 'How are commissions and bespoke requests initiated?',
        answer: 'Every bespoke journey begins with an initial consultation through our digital platform or via private appointment in our Zurich, London, or Tokyo salons. A dedicated client advisor will review your specifications, discuss artisanal materials, and guide the timeline from initial sketch to final presentation.',
        order: 1,
      },
      {
        question: 'What is the provenance and authenticity guarantee of each creation?',
        answer: 'All horological and leather creations are accompanied by a physical leather-bound Certificate of Origin, signed by the master artisan, and registered within our cryptographic maison ledger. Each piece carries an individual serial number hand-engraved on solid noble metal.',
        order: 2,
      },
      {
        question: 'What are the delivery terms and private courier arrangements?',
        answer: 'Complimentary white-glove armored courier delivery is provided globally across 120 countries with full insured transit value. Alternatively, clients may elect for private salon collection with customized presentation ceremonies.',
        order: 3,
      },
      {
        question: 'How do you handle maintenance and lifelong restoration?',
        answer: 'Our creations are engineered for generational longevity. All timepieces include a 10-year international manufacture warranty, complimentary biennial regulation, and dedicated atelier restoration services across our European workshops.',
        order: 4,
      },
      {
        question: 'Can sanctuary journeys and private aviation experiences be customized?',
        answer: 'Absolutely. Every sanctuary itinerary is custom-curated according to your travel preferences, dietary requirements, security protocols, and flight schedules. Complete buyouts and discreet private transfers are standard.',
        order: 5,
      },
    ],
  });

  console.log('Luxury database seeding completed successfully.');
}

main()
  .catch((e) => {
    console.error('Error during seeding:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
