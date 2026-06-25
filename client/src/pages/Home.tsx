import { useEffect, useRef, useState } from 'react';
import { ChevronDown, Mail, MapPin, Phone, Eye } from 'lucide-react';
import ImageModal from '@/components/ImageModal';
import BusinessCard from '@/components/BusinessCard';

/**
 * Laksaara TMQ — Premium Wood Furniture Export
 * Design Philosophy: Luxury Heritage Minimalism
 * - Material Reverence: Wood grain and natural imperfections celebrated
 * - Spiritual Minimalism: Lakshmi/Saraswati symbolism woven subtly
 * - Breathing Whitespace: Generous margins and asymmetric layouts
 * - Restrained Motion: Smooth, deliberate animations
 * Color Palette: Antique Gold (#C9A84C), Deep Walnut Brown (#3B1F0A), Warm Cream (#F5EFE6)
 */

interface FurnitureItem {
  id: string;
  name: string;
  description: string;
  materials: string;
  image: string;
  backdropImage?: string;
  measurements?: string[];
}

const furnitureCollection: FurnitureItem[] = [
  {
    id: 'piece-01',
    name: 'Accent Armchair',
    description: 'Handcrafted wooden furniture piece showcasing premium craftsmanship and natural wood grain.',
    materials: 'Premium wood',
    image: '/images/enh-piece-01.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Contemporary Minimalist',
    ],
  },
  {
    id: 'piece-02',
    name: 'Cane Bedside Table / Nightstand',
    description: 'A mid-century modern bedside table crafted from solid mahogany with a warm honey finish and natural rattan. Style: Mid-Century Modern',
    materials: 'Solid mahogany with natural rattan',
    image: '/images/enh-piece-02.jpg',
    measurements: [
      'Height: 60 cm · Width: 50 cm · Depth: 45 cm',
      'Style: Mid-Century Modern',
      '✓ Dimensions available in custom sizes',
    ],
  },
  {
    id: 'piece-03',
    name: 'Sculptural Ergonomic Stools',
    description: 'A family of hand-carved stools where each silhouette is sculpted from a single block of solid hardwood. The rounded, dished seats invite you to sit, while the flowing, organically shaped legs turn everyday seating into functional sculpture. Equally at home tucked beneath a kitchen island or arranged as occasional perches in a living space.',
    materials: 'Solid hand-carved hardwood',
    image: '/images/enh-piece-03.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Sculptural Organic',
    ],
  },
  {
    id: 'piece-04',
    name: 'Bistro Slatted Dining Chair',
    description: 'Engineered for both superb ergonomics and space-saving functionality, this versatile chair features a curved slatted backrest and slim, supportive armrests. It comes with a tailored, removable seat cushion for extra comfort. Thanks to its smart stackable design, it transitions seamlessly from a chic indoor dining room to an upscale rooftop terrace.',
    materials: 'Weather-resistant Grade-A Teak or Treated Eucalyptus',
    image: '/images/enh-piece-04.jpg',
    measurements: [
      'Width: 56 cm · Depth: 54 cm · Height: 82 cm',
      'Seat Height (with cushion): 46 cm',
      'Style: Scandinavian Modern / Transitional Outdoor-Indoor',
      '✓ Dimensions available in custom sizes',
    ],
  },
  {
    id: 'piece-05',
    name: 'L-Shape Corner Desk with Natural Rattan',
    description: 'A stunning and functional L-shaped corner desk crafted from solid mahogany with a warm honey finish.',
    materials: 'Solid mahogany with natural rattan',
    image: '/images/enh-piece-05.jpg',
    measurements: [
      'Height: 80 cm · Width: 120 cm · Depth: 45 cm',
      '✓ Dimensions available in custom sizes',
    ],
  },
  {
    id: 'piece-06',
    name: 'Wave-Slat Outdoor Lounge Collection',
    description: 'An architectural outdoor seating collection defined by rhythmic, wave-like wooden slats that wrap each sofa, lounge chair, and table in fluid curves. The sculpted timber frames pair with deep, weather-ready cushions to create a resort-grade lounge setting. Designed for terraces, poolsides, and oceanfront decks where statement furniture meets relaxed comfort.',
    materials: 'Weather-resistant solid teak slats with upholstered cushions',
    image: '/images/piece-06.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Resort Contemporary / Outdoor',
    ],
  },
  {
    id: 'piece-07',
    name: 'Two-Drawer Console / Sideboard with Cane Side Panels',
    description: 'A versatile solid mahogany console/sideboard with two drawers fitted with sculptural wooden pulls. Cane panel inserts on both side ends frame an open lower shelf, balancing storage with visual lightness. Style: Mid-Century Modern',
    materials: 'Solid mahogany with cane panel inserts',
    image: '/images/enh-piece-07.jpg',
    measurements: [
      'Height: 70 cm · Width: 90 cm · Depth: 40 cm',
      'Features: Two drawers with soft close rails',
      'Style: Mid-Century Modern',
      '✓ Dimensions available in custom sizes',
    ],
  },
  {
    id: 'piece-08',
    name: 'Oval Mirror',
    description: 'An elegant oval-framed mirror featuring premium wood construction and organic curves. The sculptural frame celebrates natural wood grain with a contemporary aesthetic, serving as both a functional piece and an artistic focal point for any room.',
    materials: 'Solid premium wood',
    image: '/images/piece-08.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Organic Contemporary',
    ],
  },
  {
    id: 'piece-09',
    name: 'Deck Styled Table',
    description: 'A sophisticated deck-styled table featuring clean lines and premium wood construction. Inspired by nautical design elements, this piece combines functionality with a relaxed, coastal aesthetic, perfect for both indoor and outdoor entertaining.',
    materials: 'Solid hardwood with metal accents',
    image: '/images/piece-09.jpg',
    backdropImage: '/images/piece-09-backdrop.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Modern Modular',
    ],
  },
  {
    id: 'piece-10',
    name: 'Rattan Chair',
    description: 'A stunning blend of organic textures and sleek lines, the Armchair features a finely crafted solid wood frame complemented by a breathable woven rattan backrest. Designed with deep, plush cushioning, it serves as the perfect accent chair to bring warmth and contemporary elegance to living rooms, lounges, or covered patios.',
    materials: 'Premium Solid Teak / Ash Wood (with natural rattan weave)',
    image: '/images/enh-piece-10.jpg',
    measurements: [
      'Width: 75 cm · Depth: 80 cm · Height: 78 cm',
      'Seat Height: 42 cm',
      'Style: Mid-Century Modern / Japandi Minimalist',
      '✓ Dimensions available in custom sizes',
    ],
  },
  {
    id: 'piece-11',
    name: 'Biomorphic Carved Wall Sculpture',
    description: 'A monumental wall sculpture carved from solid wood into flowing, coral-like organic forms. Open negative spaces and undulating ridges play with light and shadow, transforming a blank wall into a dramatic natural artwork. Each piece is hand-shaped, making every sculpture a one-of-a-kind statement for lobbies, living rooms, and feature walls.',
    materials: 'Solid hand-carved hardwood',
    image: '/images/piece-11.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Organic Sculptural',
    ],
  },
  {
    id: 'piece-12',
    name: 'Live-Edge Root Coffee Table',
    description: 'A statement coffee table crafted from a single cross-cut slab, showcasing dramatic concentric grain on a polished top that rests on a sculptural natural root base. The contrast between the smooth, honey-toned surface and the rugged, organic base celebrates the raw character of the timber. A grounding centerpiece for living rooms that brings nature indoors.',
    materials: 'Solid live-edge slab with natural root base',
    image: '/images/piece-12.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Live-Edge Naturalist',
    ],
  },

  {
    id: 'piece-14',
    name: 'Cane & Upholstered Platform Bed',
    description: 'A statement platform bed in solid mahogany featuring a distinctive headboard with geometric cane panel inserts framed by diagonal wooden accents, paired with a neutral linen-upholstered lumbar panel. Slatted bed base for optimal mattress support.',
    materials: 'Solid mahogany, natural rattan, wood',
    image: '/images/piece-13.jpg',
    measurements: [
      'Height: 125 cm · Width: 150 cm · Depth: 200 cm',
      'Style: Contemporary Mid-Century',
      '✓ Dimensions available in custom sizes',
    ],
  },
  {
    id: 'piece-15',
    name: 'Console Table',
    description: 'An elegant console table with clean, minimalist lines and premium hardwood construction. Perfect for entryways or living spaces, this versatile piece combines subtle storage with a sophisticated aesthetic that complements any interior design.',
    materials: 'Solid hardwood with metal accents',
    image: '/images/enh-piece-16.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Modern Minimalist',
    ],
  },
  {
    id: 'piece-16',
    name: 'Dining Table',
    description: 'A refined dining table in solid mahogany featuring elegant proportions and premium craftsmanship. With its warm honey finish and sophisticated design, this table creates an inviting focal point for memorable dining experiences and gatherings.',
    materials: 'Solid mahogany with woven cane panel',
    image: '/images/new-eldos-dining.jpg',
    measurements: [
      'Height: 60 cm · Width: 50 cm · Depth: 45 cm',
      'Style: Classic Contemporary',
      '✓ Dimensions available in custom sizes',
    ],
  },
  {
    id: 'piece-17',
    name: 'Vienta Dining Set',
    description: 'A refined round dining set with sculptural cathedral-arch chairs and a curved pedestal base in warm honey tones.',
    materials: 'Solid honey-toned wood',
    image: '/images/new-vienta-dining.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Contemporary Classic',
    ],
  },
  {
    id: 'piece-18',
    name: 'Tazkia Dining Set',
    description: 'An elegant extendable round table paired with oval-back chairs, blending classic form with modern craftsmanship.',
    materials: 'Solid hardwood',
    image: '/images/new-tazkia-dining.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Contemporary Elegant',
    ],
  },
  {
    id: 'piece-19',
    name: 'Camarro Dining Set',
    description: 'A serene weathered-oak dining ensemble with crossed-lattice chairs and a matching sideboard for a relaxed, natural aesthetic.',
    materials: 'Weathered oak',
    image: '/images/new-camarro-dining.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Rustic Contemporary',
    ],
  },
  {
    id: 'piece-20',
    name: 'Turned Candle Holders',
    description: 'Hand-turned walnut candle holders with a sculptural hourglass silhouette that brings warmth to any setting.',
    materials: 'Solid walnut',
    image: '/images/new-candle-holders.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Artisan Sculptural',
    ],
  },
  {
    id: 'piece-21',
    name: 'Carved Wood Wall Art',
    description: 'A dimensional carved wooden wall panel with overlapping petal forms, celebrating the natural beauty of wood grain.',
    materials: 'Carved natural wood',
    image: '/images/new-wood-wallart.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Artisan Wall Sculpture',
    ],
  },
  {
    id: 'piece-22',
    name: 'Sculptural Accent Stool',
    description: 'A striking sculptural stool featuring organic wood forms and premium craftsmanship. This versatile piece serves as seating, side table, or artistic accent, adding character to any contemporary space.',
    materials: 'Solid premium wood',
    image: '/images/piece-22.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Organic Contemporary',
    ],
  },
  {
    id: 'piece-23',
    name: 'Grand Carved Relief Wall Panel',
    description: 'A grand framed wall relief, intricately hand-carved to depict a detailed narrative scene with remarkable depth and dimension. Master artisans render figures, architecture, and ornamental borders in fine relief, creating a heritage centerpiece above a console or mantel. A devotional and artistic statement piece that anchors formal living and entry spaces.',
    materials: 'Solid hardwood, hand-carved relief',
    image: '/images/piece-23.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Heritage Hand-Carved',
    ],
  },
  {
    id: 'piece-24',
    name: 'Sculpted Wall Art',
    description: 'A striking sculptural wall art piece crafted from premium wood with artistic carving details. This dimensional artwork celebrates the natural beauty of wood grain while adding visual interest and contemporary elegance to any wall.',
    materials: 'Solid hardwood with metal accents',
    image: '/images/piece-24.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Contemporary Minimalist',
    ],
  },
  {
    id: 'piece-25',
    name: 'Modern Rattan Dining',
    description: 'A contemporary dining set featuring modern rattan elements combined with premium wood construction. The organic weave of natural rattan paired with sleek wooden frames creates a sophisticated, versatile dining solution for modern interiors.',
    materials: 'Solid wood with traditional joinery',
    image: '/images/piece-25.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Heritage Contemporary',
    ],
  },
  {
    id: 'piece-26',
    name: 'Geometric Wall Shelving',
    description: 'A striking geometric shelving system that combines storage with sculptural design. Each shelf is precision-crafted to create visual interest while providing functional display and storage space.',
    materials: 'Solid premium wood',
    image: '/images/piece-26.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Geometric Contemporary',
    ],
  },
  {
    id: 'piece-27',
    name: 'Traditional Deck chair',
    description: 'A classic deck chair featuring traditional design elements and premium wood construction. With its ergonomic angles and natural finish, this versatile piece offers comfortable seating while maintaining timeless aesthetic appeal for indoor and outdoor spaces.',
    materials: 'Solid premium wood',
    image: '/images/piece-27.jpg',
    measurements: [
      'Dimensions can be customized to order',
      'Style: Artisan Sculptural',
    ],
  },
];

const flooringCollection: FurnitureItem[] = [
  {
    id: 'flooring-merbau',
    name: 'Merbau',
    description: 'A premium hardwood decking and flooring renowned for its rich reddish-brown tones and exceptional durability. Naturally resistant to weather, rot, and insects, Merbau delivers a warm, luxurious surface that ages gracefully — ideal for both refined interiors and exposed outdoor decks.',
    materials: 'Solid Merbau hardwood',
    image: '/images/flooring-merbau.jpg',
  },
  {
    id: 'flooring-teakwood',
    name: 'Teakwood',
    description: 'A timeless flooring choice prized for its lustrous honey-golden grain and natural oils that lend outstanding stability and moisture resistance. Teakwood offers a smooth, polished finish that brings understated elegance and lasting warmth to any living space.',
    materials: 'Solid Teak hardwood',
    image: '/images/flooring-teakwood.jpg',
  },
  {
    id: 'flooring-bankirai',
    name: 'Bankirai Decking',
    description: 'A robust, fine-grooved decking engineered for the outdoors. Bankirai’s dense hardwood and anti-slip ribbed surface make it perfect for terraces, poolsides, and decks, combining safety and strength with a handsome, naturally weathering finish.',
    materials: 'Solid Bankirai hardwood, grooved profile',
    image: '/images/flooring-bankirai.jpg',
  },
];

export default function Home() {
  const [visibleItems, setVisibleItems] = useState<Set<string>>(new Set());
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string; measurements?: string[] } | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const itemRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-id');
            if (id) {
              setVisibleItems((prev) => new Set([...prev, id]));
            }
          }
        });
      },
      { threshold: 0.1 }
    );

    itemRefs.current.forEach((ref) => observer.observe(ref));

    return () => {
      itemRefs.current.forEach((ref) => observer.unobserve(ref));
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled = window.scrollY > 50;
      setIsScrolled(scrolled);
      
      if (headerRef.current) {
        if (scrolled) {
          headerRef.current.classList.add('scrolled');
        } else {
          headerRef.current.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  const openImageModal = (src: string, alt: string, measurements?: string[]) => {
    setSelectedImage({ src, alt, measurements });
    setModalOpen(true);
  };

  const closeImageModal = () => {
    setModalOpen(false);
    setTimeout(() => setSelectedImage(null), 300);
  };

  return (
    <div className="min-h-screen bg-brand-cream dark:bg-brand-brown relative">
      {/* Feathered Background Accents - full-page layer for depth */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="feather-accent feather-accent-1" />
        <div className="feather-accent feather-accent-2" />
        <div className="feather-accent feather-accent-3" />
        <div className="feather-accent feather-accent-4" />
        <div className="feather-accent feather-accent-5" />
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <ImageModal
          isOpen={modalOpen}
          image={selectedImage.src}
          alt={selectedImage.alt}
          measurements={selectedImage.measurements}
          onClose={closeImageModal}
        />
      )}

      {/* Header/Navigation */}
      <header 
        ref={headerRef}
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-brand-cream/70 dark:bg-brand-brown/70 backdrop-blur-xl border-b border-brand-gold/20 shadow-sm'
            : 'bg-brand-cream/40 dark:bg-brand-brown/40 backdrop-blur-md border-b border-transparent'
        }`}
      >
        <div className={`container mx-auto px-4 flex items-center justify-between transition-all duration-300 ${
          isScrolled ? 'py-2' : 'py-4'
        }`}>
          {/* Logo */}
          <div className="flex items-center gap-4 flex-1">
            <div className="relative">
              <img
                src="/images/laksaara_logo.png"
                alt="Laksaara TMQ Logo"
                className={`drop-shadow-lg hover:drop-shadow-xl transition-all duration-300 ${
                  isScrolled ? 'h-9 w-auto' : 'h-14 w-auto'
                }`}
              />
            </div>
            <div className={`hidden sm:block border-l border-brand-gold/30 pl-4 transition-all duration-300 ${
              isScrolled ? 'opacity-80' : 'opacity-100'
            }`}>
              <h1 className={`font-bold text-brand-brown dark:text-brand-cream tracking-wide transition-all duration-300 ${
                isScrolled ? 'text-base' : 'text-xl'
              }`}>LAKSAARA TMQ</h1>
              <p className={`text-brand-gold font-semibold transition-all duration-300 ${
                isScrolled ? 'text-[10px]' : 'text-xs'
              }`}>Premium Wood Furniture</p>
            </div>
          </div>

          {/* Navigation Menu */}
          <nav className="hidden md:flex gap-8 items-center">
            <button
              onClick={() => scrollToSection('about')}
              className="text-brand-brown dark:text-brand-cream hover:text-brand-gold dark:hover:text-brand-gold transition-colors duration-200 font-medium text-sm"
            >
              About
            </button>
            <button
              onClick={() => scrollToSection('collections')}
              className="text-brand-brown dark:text-brand-cream hover:text-brand-gold dark:hover:text-brand-gold transition-colors duration-200 font-medium text-sm"
            >
              Collections
            </button>
            <button
              onClick={() => scrollToSection('contact')}
              className="text-brand-brown dark:text-brand-cream hover:text-brand-gold dark:hover:text-brand-gold transition-colors duration-200 font-medium text-sm"
            >
              Contact
            </button>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button className="text-brand-brown dark:text-brand-cream hover:text-brand-gold transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            {/* Hero Image - Left Side */}
            <div className="order-2 md:order-1">
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663786701054/mHdX8ih3tUtidmCcGr4hLa/hero-background-JZzFwBGU6ByLbkzXHFrbuu.webp"
                alt="Premium Wood Furniture"
                className="w-full h-auto rounded-lg shadow-2xl"
              />
            </div>

            {/* Hero Content - Right Side */}
            <div className="order-1 md:order-2 space-y-8">
              <div className="space-y-4">
                <h1 className="text-5xl md:text-6xl font-bold text-brand-brown dark:text-brand-cream leading-tight">
                  We don't just sell wood, we share good roots
                </h1>
                <p className="text-lg text-brand-brown/80 dark:text-brand-cream/80 leading-relaxed max-w-lg">
                  Premium Indonesian Timber & Custom wood. Sourced sustainable, legally certified timber and premium grade wood slabs for global furniture markets.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => scrollToSection('collections')}
                  className="bg-brand-gold hover:bg-brand-gold/90 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl"
                >
                  Explore Collections
                </button>
                <button
                  onClick={() => scrollToSection('contact')}
                  className="border-2 border-brand-gold text-brand-gold hover:bg-brand-gold/10 dark:hover:bg-brand-gold/20 px-8 py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95"
                >
                  Get in Touch
                </button>
              </div>

              {/* Scroll Indicator */}
              <div className="pt-8 animate-bounce">
                <ChevronDown className="w-6 h-6 text-brand-gold/60" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent relative z-10" />

      {/* About Section */}
      <section id="about" className="py-20 md:py-32 bg-brand-surface/85 backdrop-blur-2xl relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-brand-brown dark:text-brand-cream mb-6">Our Philosophy</h2>
              <div className="w-16 h-1 bg-brand-gold mx-auto mb-8" />
            </div>

            <p className="text-lg text-brand-brown/80 dark:text-brand-cream/80 leading-relaxed">
              At Laksaara TMQ, we believe furniture is more than function—it is a conversation between maker and collector. Our name honors Lakshmi, goddess of prosperity and abundance, and Saraswati, goddess of knowledge and arts. Together, they represent the perfect marriage of wealth and wisdom in design.
            </p>

            <p className="text-lg text-brand-brown/80 dark:text-brand-cream/80 leading-relaxed">
              
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-12">
              <div className="space-y-4">
                <div className="text-4xl font-bold text-brand-gold">100%</div>
                <p className="text-brand-brown dark:text-brand-cream font-semibold">Handcrafted</p>
                <p className="text-sm text-brand-brown/70 dark:text-brand-cream/70">Every piece is individually crafted by skilled artisans</p>
              </div>
              <div className="space-y-4">
                <div className="text-4xl font-bold text-brand-gold">Sustainable</div>
                <p className="text-brand-brown dark:text-brand-cream font-semibold">Sourced</p>
                <p className="text-sm text-brand-brown/70 dark:text-brand-cream/70">Premium wood from responsibly managed forests</p>
              </div>
              <div className="space-y-4">
                <div className="text-4xl font-bold text-brand-gold">Timeless</div>
                <p className="text-brand-brown dark:text-brand-cream font-semibold">Design</p>
                <p className="text-sm text-brand-brown/70 dark:text-brand-cream/70">Pieces that transcend trends and endure generations</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent relative z-10" />

      {/* Collections Section */}
      <section id="collections" className="py-20 md:py-32 bg-brand-cream/70 dark:bg-brand-brown/70 relative z-10">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-brand-brown dark:text-brand-cream mb-6">Our Collection</h2>
            <div className="w-16 h-1 bg-brand-gold mx-auto mb-8" />
            <p className="text-lg text-brand-brown/80 dark:text-brand-cream/80 max-w-2xl mx-auto">
              Categories - 
Semi processed lumber and slabs | Finished wood furniture | Wood flooring/wood panel | Plywoods/Wood artefacts.
            </p>
          </div>

          {/* Furniture Collection - Staggered independent cards, 2 per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-20 lg:gap-x-20">
            {furnitureCollection.map((item, index) => {
              const isVisible = visibleItems.has(item.id);
              // Stagger: even items push down, odd items stay up (alternating vertical offset)
              const isOffset = index % 2 === 1;

              return (
                <div
                  key={item.id}
                  ref={(el) => {
                    if (el) itemRefs.current.set(item.id, el);
                  }}
                  data-id={item.id}
                  className={`group transition-all duration-1000 ${
                    isOffset ? 'md:mt-24' : ''
                  } ${
                    isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                  }`}
                >
                  {/* Image */}
                  <div className="relative mb-8 image-frame">
                    {/* Feathered glow behind image */}
                    <div className="image-glow" aria-hidden="true" />
                    <div className="relative overflow-hidden rounded-2xl shadow-xl z-[1]">
                    <div className="relative overflow-hidden h-[360px]">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                        onClick={() => openImageModal(item.image, item.name, item.measurements)}
                      />

                      {/* Click to View Badge */}
                      <div className="absolute top-5 right-5 bg-brand-gold text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                        <Eye className="w-3.5 h-3.5" />
                        <span>Click to View</span>
                      </div>

                      {/* Overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                    </div>
                  </div>

                  {/* Content - generous space for large text */}
                  <div className="space-y-5 px-2">
                    <div className="flex items-baseline gap-4">
                      <span className="text-sm font-semibold text-brand-gold tracking-[0.3em]">{String(index + 1).padStart(2, '0')}</span>
                      <div className="h-px flex-1 bg-brand-gold/30" />
                    </div>

                    <h3 className="text-2xl md:text-3xl font-bold text-brand-brown dark:text-brand-cream leading-tight">{item.name}</h3>

                    <p className="text-base text-brand-brown/75 dark:text-brand-cream/75 leading-relaxed max-w-md">{item.description}</p>

                    {item.measurements && item.measurements.length > 0 && (
                      <div className="rounded-xl border border-brand-gold/20 bg-brand-gold/5 px-5 py-4 max-w-md">
                        <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.2em] mb-2">Dimensions</p>
                        <ul className="space-y-1">
                          {item.measurements.map((m, i) => (
                            <li key={i} className="text-sm text-brand-brown/70 dark:text-brand-cream/70 leading-snug">{m}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    <div className="flex items-center gap-8 pt-2">
                      <div>
                        <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.2em] mb-1">Materials</p>
                        <p className="text-sm text-brand-brown/70 dark:text-brand-cream/70">{item.materials}</p>
                      </div>
                      <div className="h-10 w-px bg-brand-gold/20" />
                      <div className="flex flex-col gap-2">
                        <button
                          onClick={() => openImageModal(item.image, item.name, item.measurements)}
                          className="text-brand-gold hover:text-brand-brown dark:hover:text-brand-cream font-semibold text-sm flex items-center gap-2 transition-colors duration-300 group/btn"
                        >
                          <Eye className="w-4 h-4" />
                          View Full Image
                        </button>
                        {item.id === 'piece-14' && (
                          <button
                            onClick={() => openImageModal('/images/enh-piece-15.jpg', 'Tropical Retreat Bed - Bed Frame', item.measurements)}
                            className="text-brand-gold hover:text-brand-brown dark:hover:text-brand-cream font-semibold text-sm flex items-center gap-2 transition-colors duration-300 group/btn"
                          >
                            <Eye className="w-4 h-4" />
                            View Bed Frame
                          </button>
                        )}
                        {item.id === 'piece-09' && item.backdropImage && (
                          <button
                            onClick={() => openImageModal(item.backdropImage!, 'Deck Styled Table - With Backdrop', item.measurements)}
                            className="text-brand-gold hover:text-brand-brown dark:hover:text-brand-cream font-semibold text-sm flex items-center gap-2 transition-colors duration-300 group/btn"
                          >
                            <Eye className="w-4 h-4" />
                            View with Backdrop
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Flooring Section */}
          <div className="mt-32">
            <div className="text-center mb-16">
              <h3 className="text-3xl md:text-4xl font-bold text-brand-brown dark:text-brand-cream mb-6">Flooring &amp; Decking</h3>
              <div className="w-16 h-1 bg-brand-gold mx-auto mb-8" />
              <p className="text-lg text-brand-brown/80 dark:text-brand-cream/80 max-w-2xl mx-auto">
                Premium hardwood flooring and decking, sourced and finished for lasting beauty underfoot — indoors and out.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-x-10 gap-y-16">
              {flooringCollection.map((item, index) => {
                const isVisible = visibleItems.has(item.id);
                return (
                  <div
                    key={item.id}
                    ref={(el) => {
                      if (el) itemRefs.current.set(item.id, el);
                    }}
                    data-id={item.id}
                    className={`group transition-all duration-1000 ${
                      isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
                    }`}
                  >
                    {/* Image */}
                    <div className="relative mb-7 image-frame">
                      <div className="image-glow" aria-hidden="true" />
                      <div className="relative overflow-hidden rounded-2xl shadow-xl z-[1]">
                        <div className="relative overflow-hidden h-[300px]">
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 cursor-pointer"
                            onClick={() => openImageModal(item.image, item.name)}
                          />
                          <div className="absolute top-5 right-5 bg-brand-gold text-white px-3 py-1.5 rounded-full flex items-center gap-1.5 text-xs font-semibold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                            <Eye className="w-3.5 h-3.5" />
                            <span>Click to View</span>
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-4 px-2">
                      <div className="flex items-baseline gap-4">
                        <span className="text-sm font-semibold text-brand-gold tracking-[0.3em]">{String(index + 1).padStart(2, '0')}</span>
                        <div className="h-px flex-1 bg-brand-gold/30" />
                      </div>

                      <h4 className="text-2xl font-bold text-brand-brown dark:text-brand-cream leading-tight">{item.name}</h4>

                      <p className="text-base text-brand-brown/75 dark:text-brand-cream/75 leading-relaxed">{item.description}</p>

                      <div className="flex items-center gap-8 pt-2">
                        <div>
                          <p className="text-xs font-semibold text-brand-gold uppercase tracking-[0.2em] mb-1">Material</p>
                          <p className="text-sm text-brand-brown/70 dark:text-brand-cream/70">{item.materials}</p>
                        </div>
                        <div className="h-10 w-px bg-brand-gold/20" />
                        <button
                          onClick={() => openImageModal(item.image, item.name)}
                          className="text-brand-gold hover:text-brand-brown dark:hover:text-brand-cream font-semibold text-sm flex items-center gap-2 transition-colors duration-300 group/btn"
                        >
                          <Eye className="w-4 h-4" />
                          View Full Image
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent relative z-10" />

      {/* Contact Section */}
      <section id="contact" className="py-20 md:py-32 bg-brand-surface/85 backdrop-blur-2xl relative z-10">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-bold text-brand-brown dark:text-brand-cream mb-6">Get in Touch</h2>
              <div className="w-16 h-1 bg-brand-gold mx-auto mb-8" />
              <p className="text-lg text-brand-brown/80 dark:text-brand-cream/80">
                Interested in our collection? We'd love to hear from you. Reach out with any inquiries or to schedule a consultation.
              </p>
            </div>

            {/* Contact Info */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              <div className="text-center space-y-4">
                <Mail className="w-8 h-8 text-brand-gold mx-auto" />
                <div>
                  <p className="text-sm font-semibold text-brand-gold uppercase tracking-widest mb-2">Email</p>
                  <a
                    href="mailto:laksaraatmq@gmail.com"
                    className="text-brand-brown dark:text-brand-cream hover:text-brand-gold transition-colors font-medium"
                  >
                    laksaraatmq@gmail.com
                  </a>
                </div>
              </div>

              <div className="text-center space-y-4">
                <Phone className="w-8 h-8 text-brand-gold mx-auto" />
                <div>
                  <p className="text-sm font-semibold text-brand-gold uppercase tracking-widest mb-2">WhatsApp</p>
                  <div className="space-y-1">
                    <a href="https://wa.me/6281385476694" target="_blank" rel="noopener noreferrer" className="block text-brand-brown dark:text-brand-cream hover:text-brand-gold transition-colors">+62 813 8547 6694</a>
                    <a href="https://wa.me/62819615115" target="_blank" rel="noopener noreferrer" className="block text-brand-brown dark:text-brand-cream hover:text-brand-gold transition-colors">+62 819 615 115</a>
                    <a href="https://wa.me/6281111851581" target="_blank" rel="noopener noreferrer" className="block text-brand-brown dark:text-brand-cream hover:text-brand-gold transition-colors">+62 811 1185 1581</a>
                  </div>
                </div>
              </div>

              <div className="text-center space-y-4">
                <MapPin className="w-8 h-8 text-brand-gold mx-auto" />
                <div>
                  <p className="text-sm font-semibold text-brand-gold uppercase tracking-widest mb-2">Location</p>
                  <p className="text-brand-brown dark:text-brand-cream">India</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <form className="space-y-6 bg-brand-cream dark:bg-brand-brown p-8 rounded-lg border border-brand-gold/20">
              <div>
                <label className="block text-sm font-semibold text-brand-brown dark:text-brand-cream mb-2">Name</label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-brand-gold/30 rounded-lg bg-white dark:bg-brand-brown/50 text-brand-brown dark:text-brand-cream placeholder-brand-brown/50 dark:placeholder-brand-cream/50 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-brown dark:text-brand-cream mb-2">Email</label>
                <input
                  type="email"
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 border border-brand-gold/30 rounded-lg bg-white dark:bg-brand-brown/50 text-brand-brown dark:text-brand-cream placeholder-brand-brown/50 dark:placeholder-brand-cream/50 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-brand-brown dark:text-brand-cream mb-2">Message</label>
                <textarea
                  placeholder="Tell us about your inquiry..."
                  rows={5}
                  className="w-full px-4 py-3 border border-brand-gold/30 rounded-lg bg-white dark:bg-brand-brown/50 text-brand-brown dark:text-brand-cream placeholder-brand-brown/50 dark:placeholder-brand-cream/50 focus:outline-none focus:border-brand-gold focus:ring-2 focus:ring-brand-gold/20 transition-all resize-none"
                />
              </div>

              <button className="w-full bg-brand-gold hover:bg-brand-gold/90 text-white py-3 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-lg hover:shadow-xl">
                Send Inquiry
              </button>
            </form>

            {/* Virtual Business Card */}
            <div className="mt-12 text-center">
              <p className="text-sm font-semibold text-brand-gold uppercase tracking-widest mb-2">Take Us With You</p>
              <p className="text-brand-brown/70 dark:text-brand-cream/70 mb-6 max-w-md mx-auto">
                Save our details in seconds. Download our virtual business card with the company contact information.
              </p>
              <BusinessCard />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-brand-brown dark:bg-black text-brand-cream py-12 border-t-4 border-brand-gold relative z-10">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-lg font-bold mb-4">Laksaara TMQ</h3>
              <p className="text-brand-cream/80 text-sm">Premium handcrafted wood furniture celebrating Indian heritage and contemporary design.</p>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Quick Links</h3>
              <ul className="space-y-2 text-sm">
                <li>
                  <button
                    onClick={() => scrollToSection('about')}
                    className="text-brand-cream/80 hover:text-brand-gold transition-colors"
                  >
                    About
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('collections')}
                    className="text-brand-cream/80 hover:text-brand-gold transition-colors"
                  >
                    Collections
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => scrollToSection('contact')}
                    className="text-brand-cream/80 hover:text-brand-gold transition-colors"
                  >
                    Contact
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-lg font-bold mb-4">Contact</h3>
              <p className="text-brand-cream/80 text-sm mb-2">
                <a href="mailto:laksaraatmq@gmail.com" className="hover:text-brand-gold transition-colors">
                  laksaraatmq@gmail.com
                </a>
              </p>
              <p className="text-brand-cream/80 text-sm">India</p>
            </div>
          </div>

          <div className="border-t border-brand-gold/20 pt-8 text-center text-sm text-brand-cream/60">
            <p>&copy; 2025 Laksaara TMQ. All rights reserved.</p>
            <p className="mt-2">Crafted with reverence for heritage and contemporary design.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
