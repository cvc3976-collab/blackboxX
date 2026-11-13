import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Heart,
  ExternalLink,
  ShieldCheck,
  Plus,
  Trash2,
  Edit3,
  Eye,
  Package,
  Newspaper,
  HelpCircle,
  Lock,
  Unlock,
  X,
  ZoomIn,
  ChevronRight,
  SlidersHorizontal,
  ArrowUpRight,
  CheckCircle2,
  BarChart3,
  Settings,
  Image as ImageIcon,
  Layers,
  Sparkles,
  Menu,
  MessageSquare
} from 'lucide-react';

// ============================================================================
// LOGO GRAPHIQUE SUR MESURE BLACKBOX (SVG & FAVICON)
// ============================================================================
const BlackboxLogo = ({ size = 'md', showTagline = false }) => {
  const iconDim = size === 'sm' ? 28 : size === 'lg' ? 44 : 34;
  return (
    <div className="inline-flex items-center gap-3 select-none group">
      <svg
        width={iconDim}
        height={iconDim}
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 group-hover:scale-105 shrink-0"
      >
        <rect width="48" height="48" rx="6" fill="#111111" />
        <path
          d="M24 9L38 17V33L24 41L10 33V17L24 9Z"
          stroke="#FFFFFF"
          strokeWidth="2.5"
          strokeLinejoin="miter"
        />
        <path
          d="M24 25L38 17M24 25L10 17M24 25V41"
          stroke="#FFFFFF"
          strokeWidth="2.5"
        />
        <path d="M24 11.5L35.5 18L24 24.5L12.5 18L24 11.5Z" fill="#FFFFFF" />
        <rect x="21.5" y="16" width="5" height="4" fill="#111111" />
      </svg>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-black tracking-[-0.06em] text-[#111111] uppercase leading-none ${
              size === 'sm'
                ? 'text-lg'
                : size === 'lg'
                ? 'text-3xl'
                : 'text-2xl'
            }`}
            style={{ fontFamily: "'Inter', 'Arial Black', sans-serif" }}
          >
            BLACK<span className="bg-[#111111] text-white px-1.5 py-0.5 ml-0.5">BOX</span>
          </span>
        </div>
        {showTagline && (
          <span className="text-[10px] font-bold tracking-[0.2em] text-[#555555] uppercase mt-1">
            DISCOVER PRODUCTS. CHECK QUALITY. SHOP SMARTER.
          </span>
        )}
      </div>
    </div>
  );
};

// ============================================================================
// ICÔNE DISCORD SVG OFFICIELLE
// ============================================================================
const DiscordIcon = ({ className = 'w-5 h-5' }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.946 2.4189-2.1568 2.4189Z" />
  </svg>
);

// ============================================================================
// DONNÉES INITIALES
// ============================================================================
const CATEGORIES = ['Vêtements', 'Chaussures', 'Accessoires', 'Sacs', 'Bijoux', 'Autres'];

const INITIAL_PRODUCTS = [
  {
    id: 'prod-1',
    name: 'Hoodie Boxy Heavyweight 520GSM — Washed Anthracite',
    category: 'Vêtements',
    priceEur: 34.50,
    priceCny: 265,
    description: 'Coupe boxy ultra-structurée avec épaules tombantes et coton peigné lourd 520 GSM. Finition délavée vintage à l’acide.',
    bbdbuyUrl: 'https://bbdbuy.com/product/detail?url=https%3A%2F%2Fitem.taobao.com%2Fitem.htm%3Fid%3D84920194821',
    promoImages: ['https://images.unsplash.com/photo-1556821840-3a63f95609a7?auto=format&fit=crop&w=900&q=80'],
    qcImages: ['https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=900&q=80'],
    views: 1420,
    createdAt: '2026-11-10T10:00:00Z'
  },
  {
    id: 'prod-2',
    name: 'Sneakers Retro Court Low — White / Carbon Suede',
    category: 'Chaussures',
    priceEur: 48.00,
    priceCny: 368,
    description: 'Silhouette basse inspirée du skate des années 90. Empiècements en cuir pleine fleur et daim brossé carbone.',
    bbdbuyUrl: 'https://bbdbuy.com/product/detail?url=https%3A%2F%2Fweidian.com%2Fitem.html%3FitemID%3D7291048291',
    promoImages: ['https://images.unsplash.com/photo-1549298916-b41d501d3772?auto=format&fit=crop&w=900&q=80'],
    qcImages: ['https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&w=900&q=80'],
    views: 2180,
    createdAt: '2026-11-08T14:30:00Z'
  }
];

const INITIAL_NEWS = [
  {
    id: 'news-1',
    title: 'Guide Débutant : Comment commander via BBDBuy en 3 étapes',
    category: 'Guide BBDBuy',
    date: '11 Novembre 2026',
    image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=900&q=80',
    summary: 'Découvrez comment utiliser les liens vérifiés BLACKBOX pour commander facilement.',
    content: 'Parcourez le catalogue, inspectez les QC, puis cliquez sur Acheter pour être redirigé vers BBDBuy.'
  }
];

const DEFAULT_DISCORD_URL = 'https://discord.gg/blackbox-bbdbuy';

// ============================================================================
// COMPOSANT PRINCIPAL : APP
// ============================================================================
export default function App() {
  const [activeTab, setActiveTab] = useState('home');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [products, setProducts] = useState(() => {
    try {
      const saved = localStorage.getItem('blackbox_products_v1');
      return saved ? JSON.parse(saved) : INITIAL_PRODUCTS;
    } catch {
      return INITIAL_PRODUCTS;
    }
  });

  const [news, setNews] = useState(() => {
    try {
      const saved = localStorage.getItem('blackbox_news_v1');
      return saved ? JSON.parse(saved) : INITIAL_NEWS;
    } catch {
      return INITIAL_NEWS;
    }
  });

  const [favorites, setFavorites] = useState(() => {
    try {
      const saved = localStorage.getItem('blackbox_favorites_v1');
      return saved ? JSON.parse(saved) : ['prod-1'];
    } catch {
      return ['prod-1'];
    }
  });

  const [discordUrl, setDiscordUrl] = useState(() => {
    return localStorage.getItem('blackbox_discord_url_v1') || DEFAULT_DISCORD_URL;
  });

  useEffect(() => {
    localStorage.setItem('blackbox_products_v1', JSON.stringify(products));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('blackbox_news_v1', JSON.stringify(news));
  }, [news]);

  useEffect(() => {
    localStorage.setItem('blackbox_favorites_v1', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    localStorage.setItem('blackbox_discord_url_v1', discordUrl);
  }, [discordUrl]);

  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Tous');
  const [sortBy, setSortBy] = useState('newest');
  const [selectedNewsArticle, setSelectedNewsArticle] = useState(null);
  const [lightboxImage, setLightboxImage] = useState(null);
  const [toast, setToast] = useState(null);

  const showToast = (message) => {
    setToast(message);
    setTimeout(() => setToast(null), 3200);
  };

  // États Admin
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminPasswordInput, setAdminPasswordInput] = useState('');
  const [adminLoginError, setAdminLoginError] = useState('');
  const [adminActiveTab, setAdminActiveTab] = useState('products');

  // Modal d'ajout / édition de produit
  const [editingProduct, setEditingProduct] = useState(undefined);
  const [productForm, setProductForm] = useState({
    name: '',
    category: 'Vêtements',
    priceEur: '',
    priceCny: '',
    description: '',
    bbdbuyUrl: '',
    promoImagesStr: '',
    qcImagesStr: ''
  });

  // Modal d'ajout / édition d'actualité
  const [editingNews, setEditingNews] = useState(undefined);
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'Guide BBDBuy',
    date: '13 Novembre 2026',
    image: '',
    summary: '',
    content: ''
  });

  const openProductDetail = (productId) => {
    setProducts((prev) =>
      prev.map((p) => (p.id === productId ? { ...p, views: (p.views || 0) + 1 } : p))
    );
    setSelectedProductId(productId);
    setActiveTab('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleFavorite = (e, productId) => {
    if (e) e.stopPropagation();
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Article retiré de vos favoris');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Article ajouté à vos favoris');
        return [...prev, productId];
      }
    });
  };

  const filteredProducts = useMemo(() => {
    return products
      .filter((p) => {
        const matchesCat = selectedCategory === 'Tous' || p.category === selectedCategory;
        const matchesSearch =
          p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
          p.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesSearch;
      })
      .sort((a, b) => {
        if (sortBy === 'popular') return (b.views || 0) - (a.views || 0);
        if (sortBy === 'price-asc') return a.priceEur - b.priceEur;
        if (sortBy === 'price-desc') return b.priceEur - a.priceEur;
        return new Date(b.createdAt) - new Date(a.createdAt);
      });
  }, [products, selectedCategory, searchQuery, sortBy]);

  const popularProducts = useMemo(() => {
    return [...products].sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, 4);
  }, [products]);

  const activeProduct = useMemo(() => {
    return products.find((p) => p.id === selectedProductId) || products[0];
  }, [products, selectedProductId]);

  const navigateTo = (tab, categoryFilter = null) => {
    if (categoryFilter) {
      setSelectedCategory(categoryFilter);
    }
    setActiveTab(tab);
    setMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-[#F4F4F6] text-[#111111] flex flex-col font-sans">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-[#111111] text-white px-5 py-3 rounded-lg shadow-xl text-sm font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Lightbox Zoom Image */}
      {lightboxImage && (
        <div
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4 cursor-zoom-out"
        >
          <div className="relative max-w-5xl max-h-[90vh]">
            <button
              onClick={() => setLightboxImage(null)}
              className="absolute -top-10 right-0 text-white hover:text-gray-300 p-2"
            >
              <X className="w-8 h-8" />
            </button>
            <img
              src={lightboxImage}
              alt="Zoom QC"
              className="max-w-full max-h-[85vh] object-contain rounded-lg border border-white/20"
            />
          </div>
        </div>
      )}

      {/* HEADER PRINCIPAL */}
      <header className="sticky top-0 z-40 bg-white border-b border-[#E2E2E6]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          <div
            onClick={() => navigateTo('home')}
            className="cursor-pointer flex items-center gap-2"
          >
            <BlackboxLogo size="md" />
          </div>

          {/* Navigation Desktop */}
          <nav className="hidden md:flex items-center gap-8">
            <button
              onClick={() => navigateTo('home')}
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                activeTab === 'home' ? 'text-[#111111] border-b-2 border-[#111111] pb-1' : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              Accueil
            </button>
            <button
              onClick={() => navigateTo('catalog')}
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                activeTab === 'catalog' ? 'text-[#111111] border-b-2 border-[#111111] pb-1' : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              Catalogue
            </button>
            <button
              onClick={() => navigateTo('news')}
              className={`text-xs font-bold uppercase tracking-widest transition-colors ${
                activeTab === 'news' ? 'text-[#111111] border-b-2 border-[#111111] pb-1' : 'text-[#666666] hover:text-[#111111]'
              }`}
            >
              Actualités
            </button>
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-bold uppercase tracking-widest text-[#666666] hover:text-[#111111] transition-colors flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5" />
              Questions / Assistance
            </a>
          </nav>

          {/* Actions Droite */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigateTo('favorites')}
              className="relative p-2.5 rounded-lg border border-[#E2E2E6] hover:border-[#111111] bg-white text-[#111111] transition-colors flex items-center gap-1.5 text-xs font-bold"
            >
              <Heart className={`w-4 h-4 ${favorites.length > 0 ? 'fill-[#111111]' : ''}`} />
              <span className="hidden sm:inline">Favoris</span>
              <span className="bg-[#111111] text-white px-1.5 py-0.5 rounded-full text-[10px]">
                {favorites.length}
              </span>
            </button>

            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden lg:inline-flex items-center gap-2 bg-[#111111] text-white px-4 py-2.5 rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-[#2a2a2a] transition-colors"
            >
              <DiscordIcon className="w-4 h-4" />
              Discord
            </a>

            <button
              onClick={() => navigateTo('admin')}
              className={`p-2.5 rounded-lg border transition-colors ${
                activeTab === 'admin'
                  ? 'bg-[#111111] text-white border-[#111111]'
                  : 'bg-white text-[#111111] border-[#E2E2E6] hover:border-[#111111]'
              }`}
              title="Espace Administrateur"
            >
              <Settings className="w-4 h-4" />
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-lg border border-[#E2E2E6] bg-white text-[#111111]"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-[#E2E2E6] px-4 py-4 space-y-3">
            <button
              onClick={() => navigateTo('home')}
              className="block w-full text-left font-bold text-xs uppercase tracking-widest py-2"
            >
              Accueil
            </button>
            <button
              onClick={() => navigateTo('catalog')}
              className="block w-full text-left font-bold text-xs uppercase tracking-widest py-2"
            >
              Catalogue
            </button>
            <button
              onClick={() => navigateTo('news')}
              className="block w-full text-left font-bold text-xs uppercase tracking-widest py-2"
            >
              Actualités
            </button>
            <a
              href={discordUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-bold text-xs uppercase tracking-widest py-2"
            >
              <DiscordIcon className="w-4 h-4" /> Questions / Assistance (Discord)
            </a>
          </div>
        )}
      </header>

      {/* CONTENU PRINCIPAL */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* ================= ACCUEIL ================= */}
        {activeTab === 'home' && (
          <div className="space-y-14 pb-16">
            <section className="bg-white border border-[#E2E2E6] rounded-2xl p-6 sm:p-12 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 bg-[#F4F4F6] border border-[#E2E2E6] px-3 py-1.5 rounded-full">
                    <span className="w-2 h-2 rounded-full bg-[#111111] animate-pulse" />
                    <span className="text-xs font-extrabold uppercase tracking-widest text-[#111111]">
                      Catalogue Indépendant • Redirection BBDBuy
                    </span>
                  </div>

                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight text-[#111111] uppercase leading-[1.02]">
                    DISCOVER PRODUCTS.
                    <br />
                    <span className="text-[#666666]">CHECK QUALITY.</span>
                    <br />
                    SHOP SMARTER.
                  </h1>

                  <p className="text-base sm:text-lg text-[#555555] max-w-2xl leading-relaxed">
                    Plus besoin de chercher pendant des heures sur Taobao, Weidian ou 1688.{' '}
                    <strong className="text-[#111111]">BLACKBOX</strong> sélectionne les meilleures
                    pièces streetwear, publie leurs véritables photos d’entrepôt{' '}
                    <strong className="text-[#111111]">Quality Checks (QC)</strong> et vous redirige
                    en un clic vers <strong className="text-[#111111]">BBDBuy</strong>.
                  </p>

                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      navigateTo('catalog');
                    }}
                    className="flex flex-col sm:flex-row gap-2.5 max-w-xl"
                  >
                    <div className="relative flex-1">
                      <Search className="w-4 h-4 text-[#666666] absolute left-3.5 top-1/2 -translate-y-1/2" />
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Rechercher un hoodie, sneakers, sac..."
                        className="w-full pl-10 pr-4 py-3.5 bg-[#F4F4F6] border border-[#E2E2E6] rounded-lg text-sm text-[#111111] focus:outline-none focus:border-[#111111]"
                      />
                    </div>
                    <button
                      type="submit"
                      className="px-6 py-3.5 bg-[#111111] text-white font-bold text-sm uppercase tracking-wider rounded-lg hover:bg-[#2a2a2a]"
                    >
                      Explorer
                    </button>
                  </form>
                </div>

                <div className="lg:col-span-5 bg-[#F4F4F6] border border-[#E2E2E6] rounded-xl p-5 space-y-4">
                  <div className="flex items-center justify-between border-b border-[#E2E2E6] pb-3">
                    <div className="flex items-center gap-2">
                      <ShieldCheck className="w-5 h-5 text-[#111111]" />
                      <span className="text-xs font-black uppercase tracking-wider text-[#111111]">
                        Transparence Warehouse QC
                      </span>
                    </div>
                    <span className="text-[11px] font-bold bg-white px-2.5 py-1 rounded border border-[#E2E2E6]">
                      {products.length} Références
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {popularProducts.slice(0, 2).map((item) => (
                      <div
                        key={item.id}
                        onClick={() => openProductDetail(item.id)}
                        className="bg-white rounded-lg border border-[#E2E2E6] overflow-hidden cursor-pointer group"
                      >
                        <div className="aspect-square overflow-hidden relative">
                          <img
                            src={item.promoImages[0]}
                            alt={item.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                        <div className="p-2.5">
                          <p className="text-xs font-bold text-[#111111] truncate">{item.name}</p>
                          <p className="text-xs font-extrabold text-[#555555] mt-0.5">
                            ~{item.priceEur.toFixed(2)} €
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= CATALOGUE ================= */}
        {activeTab === 'catalog' && (
          <div className="space-y-8 pb-16">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-2xl border border-[#E2E2E6]">
              <div>
                <h1 className="text-2xl font-black uppercase tracking-tight text-[#111111]">
                  Catalogue Streetwear
                </h1>
                <p className="text-xs text-[#666666] mt-1">
                  {filteredProducts.length} articles disponibles • Redirection BBDBuy
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3 w-full md:w-auto">
                <div className="relative flex-1 md:w-64">
                  <Search className="w-4 h-4 text-[#666666] absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Filtrer par nom..."
                    className="w-full pl-9 pr-4 py-2 bg-[#F4F4F6] border border-[#E2E2E6] rounded-lg text-xs"
                  />
                </div>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-[#F4F4F6] border border-[#E2E2E6] px-3 py-2 rounded-lg text-xs font-bold"
                >
                  <option value="newest">Nouveautés</option>
                  <option value="popular">Popularité</option>
                  <option value="price-asc">Prix croissant</option>
                  <option value="price-desc">Prix décroissant</option>
                </select>
              </div>
            </div>

            {/* Filtres Catégories */}
            <div className="flex flex-wrap gap-2">
              {['Tous', ...CATEGORIES].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-colors border ${
                    selectedCategory === cat
                      ? 'bg-[#111111] text-white border-[#111111]'
                      : 'bg-white text-[#111111] border-[#E2E2E6] hover:border-[#111111]'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>

            {/* Grille Produits */}
            {filteredProducts.length === 0 ? (
              <div className="bg-white border border-[#E2E2E6] rounded-2xl p-12 text-center space-y-4">
                <Package className="w-12 h-12 text-[#666666] mx-auto" />
                <h3 className="text-lg font-bold">Aucun produit trouvé</h3>
                <p className="text-xs text-[#666666]">Essayez de modifier vos filtres ou votre recherche.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => {
                  const isFav = favorites.includes(product.id);
                  const qcCount = product.qcImages ? product.qcImages.length : 0;
                  return (
                    <div
                      key={product.id}
                      onClick={() => openProductDetail(product.id)}
                      className="group bg-white border border-[#E2E2E6] rounded-lg overflow-hidden cursor-pointer transition-all duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-[4/5] bg-[#EAEAEF] overflow-hidden">
                          <img
                            src={product.promoImages?.[0]}
                            alt={product.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                          <div className="absolute top-3 left-3 flex gap-1.5">
                            <span className="bg-white/95 text-[#111111] text-[11px] font-bold uppercase px-2 py-1 rounded">
                              {product.category}
                            </span>
                            {qcCount > 0 && (
                              <span className="bg-[#111111] text-white text-[11px] font-bold uppercase px-2 py-1 rounded flex items-center gap-1">
                                <ShieldCheck className="w-3 h-3 text-emerald-400" /> {qcCount} QC
                              </span>
                            )}
                          </div>
                          <button
                            onClick={(e) => toggleFavorite(e, product.id)}
                            className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center border ${
                              isFav ? 'bg-[#111111] text-white border-[#111111]' : 'bg-white text-[#111111] border-[#E2E2E6]'
                            }`}
                          >
                            <Heart className={`w-4 h-4 ${isFav ? 'fill-current' : ''}`} />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-[#111111] text-sm line-clamp-2 group-hover:underline">
                            {product.name}
                          </h3>
                        </div>
                      </div>
                      <div className="px-4 pb-4 pt-1 flex items-center justify-between border-t border-[#F4F4F6]">
                        <div>
                          <span className="text-[11px] uppercase text-[#666666] block">Prix indicatif</span>
                          <span className="text-base font-black text-[#111111]">
                            ~{Number(product.priceEur).toFixed(2)} €
                          </span>
                        </div>
                        <span className="w-8 h-8 rounded-md bg-[#F4F4F6] group-hover:bg-[#111111] group-hover:text-white flex items-center justify-center">
                          <ArrowUpRight className="w-4 h-4" />
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {/* ================= FICHE PRODUIT & QC ================= */}
        {activeTab === 'product' && activeProduct && (
          <div className="space-y-12 pb-16">
            <button
              onClick={() => navigateTo('catalog')}
              className="text-xs font-bold uppercase tracking-widest text-[#666666] hover:text-[#111111] flex items-center gap-1.5"
            >
              ← Retour au catalogue
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 bg-white border border-[#E2E2E6] rounded-2xl p-6 sm:p-10">
              <div className="lg:col-span-6 space-y-4">
                <div className="aspect-square bg-[#EAEAEF] rounded-xl overflow-hidden border border-[#E2E2E6]">
                  <img
                    src={activeProduct.promoImages?.[0]}
                    alt={activeProduct.name}
                    className="w-full h-full object-cover cursor-zoom-in"
                    onClick={() => setLightboxImage(activeProduct.promoImages[0])}
                  />
                </div>
              </div>

              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2">
                  <span className="bg-[#111111] text-white text-xs font-bold uppercase px-3 py-1 rounded">
                    {activeProduct.category}
                  </span>
                  <span className="text-xs text-[#666666] font-medium">
                    {activeProduct.views || 0} vues
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-black uppercase text-[#111111]">
                  {activeProduct.name}
                </h1>

                <div className="bg-[#F4F4F6] p-4 rounded-xl border border-[#E2E2E6]">
                  <span className="text-xs uppercase text-[#666666] block">Prix indicatif</span>
                  <div className="flex items-baseline gap-3">
                    <span className="text-3xl font-black text-[#111111]">
                      ~{Number(activeProduct.priceEur).toFixed(2)} €
                    </span>
                    {activeProduct.priceCny && (
                      <span className="text-sm font-bold text-[#666666]">
                        (¥{activeProduct.priceCny})
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-[#555555] leading-relaxed">
                  {activeProduct.description}
                </p>

                <div className="pt-4 space-y-3">
                  <a
                    href={activeProduct.bbdbuyUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 bg-[#111111] text-white font-black text-sm uppercase tracking-widest rounded-xl hover:bg-[#2a2a2a] transition-colors flex items-center justify-center gap-2 shadow-lg"
                  >
                    Acheter maintenant sur BBDBuy
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </div>

            {/* SECTION QUALITY CHECKS (QC) */}
            <div className="bg-white border border-[#E2E2E6] rounded-2xl p-6 sm:p-10 space-y-6">
              <div className="flex items-center justify-between border-b border-[#E2E2E6] pb-4">
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-6 h-6 text-emerald-600" />
                  <div>
                    <h2 className="text-lg font-black uppercase tracking-tight text-[#111111]">
                      Quality Checks (QC)
                    </h2>
                    <p className="text-xs text-[#666666]">
                      Photos réelles prises par l’entrepôt de l’agent (Vérifiées et certifiées)
                    </p>
                  </div>
                </div>
                <span className="bg-[#F4F4F6] px-3 py-1 rounded text-xs font-bold">
                  {activeProduct.qcImages?.length || 0} Photos QC
                </span>
              </div>

              {(!activeProduct.qcImages || activeProduct.qcImages.length === 0) ? (
                <p className="text-xs text-[#666666] italic py-4">Aucune photo QC ajoutée pour le moment.</p>
              ) : (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {activeProduct.qcImages.map((img, idx) => (
                    <div
                      key={idx}
                      onClick={() => setLightboxImage(img)}
                      className="group relative aspect-square bg-[#EAEAEF] rounded-xl overflow-hidden border border-[#E2E2E6] cursor-zoom-in"
                    >
                      <img src={img} alt={`QC ${idx + 1}`} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center text-white">
                        <ZoomIn className="w-6 h-6" />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* ================= ACTUALITÉS ================= */}
        {activeTab === 'news' && (
          <div className="space-y-8 pb-16">
            <div className="bg-white p-6 rounded-2xl border border-[#E2E2E6]">
              <h1 className="text-2xl font-black uppercase tracking-tight text-[#111111]">
                Actualités & Guides
              </h1>
              <p className="text-xs text-[#666666] mt-1">
                Conseils pour débutants, informations sur BBDBuy et livraisons.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {news.map((item) => (
                <div
                  key={item.id}
                  onClick={() => setSelectedNewsArticle(item)}
                  className="bg-white border border-[#E2E2E6] rounded-xl overflow-hidden cursor-pointer group flex flex-col justify-between hover:shadow-md transition-shadow"
                >
                  <div>
                    {item.image && (
                      <div className="aspect-video bg-[#EAEAEF] overflow-hidden">
                        <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform" />
                      </div>
                    )}
                    <div className="p-5 space-y-2">
                      <span className="text-[11px] font-bold bg-[#F4F4F6] px-2.5 py-1 rounded uppercase">
                        {item.category}
                      </span>
                      <h3 className="font-bold text-[#111111] text-base group-hover:underline">
                        {item.title}
                      </h3>
                      <p className="text-xs text-[#555555] line-clamp-2">
                        {item.summary}
                      </p>
                    </div>
                  </div>
                  <div className="px-5 pb-5 pt-2 border-t border-[#F4F4F6] text-[11px] text-[#666666] font-medium">
                    {item.date}
                  </div>
                </div>
              ))}
            </div>

            {selectedNewsArticle && (
              <div
                onClick={() => setSelectedNewsArticle(null)}
                className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
              >
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="bg-white max-w-2xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 sm:p-8 space-y-4 relative"
                >
                  <button
                    onClick={() => setSelectedNewsArticle(null)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-[#F4F4F6]"
                  >
                    <X className="w-5 h-5" />
                  </button>
                  <span className="text-xs font-bold bg-[#111111] text-white px-3 py-1 rounded">
                    {selectedNewsArticle.category}
                  </span>
                  <h2 className="text-xl font-black uppercase text-[#111111]">
                    {selectedNewsArticle.title}
                  </h2>
                  <p className="text-xs text-[#666666]">{selectedNewsArticle.date}</p>
                  <div className="text-sm text-[#333333] whitespace-pre-line leading-relaxed pt-2">
                    {selectedNewsArticle.content}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* ================= FAVORIS ================= */}
        {activeTab === 'favorites' && (
          <div className="space-y-8 pb-16">
            <div className="bg-white p-6 rounded-2xl border border-[#E2E2E6]">
              <h1 className="text-2xl font-black uppercase tracking-tight text-[#111111]">
                Mes Favoris
              </h1>
              <p className="text-xs text-[#666666] mt-1">
                {favorites.length} articles sauvegardés
              </p>
            </div>

            {favorites.length === 0 ? (
              <div className="bg-white border border-[#E2E2E6] rounded-2xl p-12 text-center space-y-4">
                <Heart className="w-12 h-12 text-[#666666] mx-auto" />
                <h3 className="text-lg font-bold">Aucun favori pour l'instant</h3>
                <p className="text-xs text-[#666666]">Cliquez sur le cœur d'un produit pour l'ajouter ici.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {products
                  .filter((p) => favorites.includes(p.id))
                  .map((product) => (
                    <div
                      key={product.id}
                      onClick={() => openProductDetail(product.id)}
                      className="group bg-white border border-[#E2E2E6] rounded-lg overflow-hidden cursor-pointer hover:shadow-lg flex flex-col justify-between"
                    >
                      <div>
                        <div className="relative aspect-[4/5] bg-[#EAEAEF]">
                          <img src={product.promoImages?.[0]} alt={product.name} className="w-full h-full object-cover" />
                          <button
                            onClick={(e) => toggleFavorite(e, product.id)}
                            className="absolute top-3 right-3 w-9 h-9 rounded-full bg-[#111111] text-white flex items-center justify-center"
                          >
                            <Heart className="w-4 h-4 fill-current" />
                          </button>
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-sm line-clamp-2">{product.name}</h3>
                        </div>
                      </div>
                      <div className="px-4 pb-4 pt-1 flex items-center justify-between border-t border-[#F4F4F6]">
                        <span className="text-base font-black">~{Number(product.priceEur).toFixed(2)} €</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}

        {/* ================= ESPACE ADMINISTRATEUR ================= */}
        {activeTab === 'admin' && (
          <div className="space-y-8 pb-16">
            {!isAdminAuthenticated ? (
              <div className="max-w-md mx-auto bg-white border border-[#E2E2E6] rounded-2xl p-8 space-y-6 shadow-sm">
                <div className="text-center space-y-2">
                  <div className="w-12 h-12 bg-[#111111] text-white rounded-xl flex items-center justify-center mx-auto">
                    <Lock className="w-6 h-6" />
                  </div>
                  <h1 className="text-xl font-black uppercase">Administration BLACKBOX</h1>
                  <p className="text-xs text-[#666666]">Entrez votre mot de passe administrateur</p>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    if (adminPasswordInput === 'Goundo77@') {
                      setIsAdminAuthenticated(true);
                      setAdminLoginError('');
                      showToast('Connexion administrateur réussie');
                    } else {
                      setAdminLoginError('Mot de passe incorrect');
                    }
                  }}
                  className="space-y-4"
                >
                  <div>
                    <input
                      type="password"
                      value={adminPasswordInput}
                      onChange={(e) => setAdminPasswordInput(e.target.value)}
                      placeholder="Mot de passe"
                      autoFocus
                      className="w-full px-4 py-3 bg-[#F4F4F6] border border-[#E2E2E6] rounded-lg text-sm focus:outline-none focus:border-[#111111]"
                    />
                    {adminLoginError && (
                      <p className="text-xs text-red-600 mt-1">{adminLoginError}</p>
                    )}
                  </div>
                  <button
                    type="submit"
                    className="w-full py-3 bg-[#111111] text-white font-bold text-xs uppercase tracking-widest rounded-lg hover:bg-[#2a2a2a]"
                  >
                    Se connecter
                  </button>
                </form>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-[#E2E2E6]">
                  <div>
                    <h1 className="text-2xl font-black uppercase">Tableau de Bord Admin</h1>
                    <p className="text-xs text-[#666666]">Gestion complète des produits, QC et actualités</p>
                  </div>
                  <button
                    onClick={() => setIsAdminAuthenticated(false)}
                    className="px-4 py-2 bg-red-50 text-red-600 border border-red-200 rounded-lg text-xs font-bold uppercase"
                  >
                    Déconnexion
                  </button>
                </div>

                {/* Onglets Admin */}
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setAdminActiveTab('products')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase ${
                      adminActiveTab === 'products' ? 'bg-[#111111] text-white' : 'bg-white border border-[#E2E2E6]'
                    }`}
                  >
                    Produits ({products.length})
                  </button>
                  <button
                    onClick={() => setAdminActiveTab('news')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase ${
                      adminActiveTab === 'news' ? 'bg-[#111111] text-white' : 'bg-white border border-[#E2E2E6]'
                    }`}
                  >
                    Actualités ({news.length})
                  </button>
                  <button
                    onClick={() => setAdminActiveTab('settings')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase ${
                      adminActiveTab === 'settings' ? 'bg-[#111111] text-white' : 'bg-white border border-[#E2E2E6]'
                    }`}
                  >
                    Paramètres & Discord
                  </button>
                </div>

                {/* Gestion Produits */}
                {adminActiveTab === 'products' && (
                  <div className="bg-white border border-[#E2E2E6] rounded-2xl p-6 space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-black uppercase text-sm">Liste des Produits</h3>
                      <button
                        onClick={() => {
                          setEditingProduct(null);
                          setProductForm({
                            name: '',
                            category: 'Vêtements',
                            priceEur: '',
                            priceCny: '',
                            description: '',
                            bbdbuyUrl: '',
                            promoImagesStr: '',
                            qcImagesStr: ''
                          });
                        }}
                        className="px-4 py-2 bg-[#111111] text-white rounded-lg text-xs font-bold uppercase flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" /> Ajouter un produit
                      </button>
                    </div>

                    {editingProduct !== undefined && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const newProd = {
                            id: editingProduct ? editingProduct.id : `prod-${Date.now()}`,
                            name: productForm.name,
                            category: productForm.category,
                            priceEur: parseFloat(productForm.priceEur) || 0,
                            priceCny: parseFloat(productForm.priceCny) || 0,
                            description: productForm.description,
                            bbdbuyUrl: productForm.bbdbuyUrl,
                            promoImages: productForm.promoImagesStr.split(',').map(s => s.trim()).filter(Boolean),
                            qcImages: productForm.qcImagesStr.split(',').map(s => s.trim()).filter(Boolean),
                            views: editingProduct ? editingProduct.views : 0,
                            createdAt: editingProduct ? editingProduct.createdAt : new Date().toISOString()
                          };

                          if (editingProduct) {
                            setProducts(products.map(p => p.id === editingProduct.id ? newProd : p));
                            showToast('Produit mis à jour avec succès');
                          } else {
                            setProducts([newProd, ...products]);
                            showToast('Produit ajouté avec succès');
                          }
                          setEditingProduct(undefined);
                        }}
                        className="bg-[#F4F4F6] p-6 rounded-xl border border-[#E2E2E6] space-y-4"
                      >
                        <h4 className="font-bold text-xs uppercase text-[#111111]">
                          {editingProduct ? 'Modifier le produit' : 'Nouveau produit'}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Nom du produit"
                            value={productForm.name}
                            onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                            required
                            className="w-full px-3 py-2 bg-white border border-[#E2E2E6] rounded-lg text-xs"
                          />
                          <select
                            value={productForm.category}
                            onChange={(e) => setProductForm({ ...productForm, category: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-[#E2E2E6] rounded-lg text-xs"
                          >
                            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                          </select>
                          <input
                            type="number"
                            step="0.01"
                            placeholder="Prix EUR"
                            value={productForm.priceEur}
                            onChange={(e) => setProductForm({ ...productForm, priceEur: e.target.value })}
                            required
                            className="w-full px-3 py-2 bg-white border border-[#E2E2E6] rounded-lg text-xs"
                          />
                          <input
                            type="number"
                            placeholder="Prix CNY"
                            value={productForm.priceCny}
                            onChange={(e) => setProductForm({ ...productForm, priceCny: e.target.value })}
                            className="w-full px-3 py-2 bg-white border border-[#E2E2E6] rounded-lg text-xs"
                          />
                        </div>
                        <textarea
                          placeholder="Description détaillée"
                          value={productForm.description}
                          onChange={(e) => setProductForm({ ...productForm, description: e.target.value })}
                          rows={3}
                          className="w-full px-3 py-2 bg-white border border-[#E2E2E6] rounded-lg text-xs"
                        />
                        <input
                          type="url"
                          placeholder="Lien BBDBuy"
                          value={productForm.bbdbuyUrl}
                          onChange={(e) => setProductForm({ ...productForm, bbdbuyUrl: e.target.value })}
                          required
                          className="w-full px-3 py-2 bg-white border border-[#E2E2E6] rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          placeholder="URLs photos Promo (séparées par des virgules)"
                          value={productForm.promoImagesStr}
                          onChange={(e) => setProductForm({ ...productForm, promoImagesStr: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-[#E2E2E6] rounded-lg text-xs"
                        />
                        <input
                          type="text"
                          placeholder="URLs photos QC (séparées par des virgules)"
                          value={productForm.qcImagesStr}
                          onChange={(e) => setProductForm({ ...productForm, qcImagesStr: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-[#E2E2E6] rounded-lg text-xs"
                        />
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="px-5 py-2.5 bg-[#111111] text-white rounded-lg text-xs font-bold uppercase"
                          >
                            Enregistrer
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingProduct(undefined)}
                            className="px-5 py-2.5 bg-white border border-[#E2E2E6] rounded-lg text-xs font-bold uppercase"
                          >
                            Annuler
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="divide-y divide-[#E2E2E6]">
                      {products.map((p) => (
                        <div key={p.id} className="py-3 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <img src={p.promoImages?.[0]} alt="" className="w-12 h-12 object-cover rounded-lg border" />
                            <div>
                              <p className="font-bold text-xs line-clamp-1">{p.name}</p>
                              <p className="text-[11px] text-[#666666]">{p.category} • ~{p.priceEur} € • {p.qcImages?.length || 0} QC</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingProduct(p);
                                setProductForm({
                                  name: p.name,
                                  category: p.category,
                                  priceEur: p.priceEur,
                                  priceCny: p.priceCny,
                                  description: p.description,
                                  bbdbuyUrl: p.bbdbuyUrl,
                                  promoImagesStr: p.promoImages?.join(', ') || '',
                                  qcImagesStr: p.qcImages?.join(', ') || ''
                                });
                              }}
                              className="p-2 bg-[#F4F4F6] rounded hover:bg-[#111111] hover:text-white"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Supprimer ce produit ?')) {
                                  setProducts(products.filter(item => item.id !== p.id));
                                  showToast('Produit supprimé');
                                }
                              }}
                              className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-600 hover:text-white"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Gestion Actualités Admin */}
                {adminActiveTab === 'news' && (
                  <div className="bg-white border border-[#E2E2E6] rounded-2xl p-6 space-y-6">
                    <div className="flex justify-between items-center">
                      <h3 className="font-black uppercase text-sm">Gestion des Actualités & Guides</h3>
                      <button
                        onClick={() => {
                          setEditingNews(null);
                          setNewsForm({
                            title: '',
                            category: 'Guide BBDBuy',
                            date: '13 Novembre 2026',
                            image: '',
                            summary: '',
                            content: ''
                          });
                        }}
                        className="px-4 py-2 bg-[#111111] text-white rounded-lg text-xs font-bold uppercase flex items-center gap-1.5"
                      >
                        <Plus className="w-4 h-4" /> Ajouter une actualité
                      </button>
                    </div>

                    {editingNews !== undefined && (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const newArt = {
                            id: editingNews ? editingNews.id : `news-${Date.now()}`,
                            title: newsForm.title,
                            category: newsForm.category,
                            date: newsForm.date,
                            image: newsForm.image,
                            summary: newsForm.summary,
                            content: newsForm.content
                          };

                          if (editingNews) {
                            setNews(news.map(n => n.id === editingNews.id ? newArt : n));
                            showToast('Actualité mise à jour');
                          } else {
                            setNews([newArt, ...news]);
                            showToast('Actualité ajoutée');
                          }
                          setEditingNews(undefined);
                        }}
                        className="bg-[#F4F4F6] p-6 rounded-xl border border-[#E2E2E6] space-y-4"
                      >
                        <h4 className="font-bold text-xs uppercase text-[#111111]">
                          {editingNews ? "Modifier l'actualité" : 'Nouvelle actualité'}
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <input
                            type="text"
                            placeholder="Titre de l'article"
                            value={newsForm.title}
                            onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                            required
                            className="w-full px-3 py-2 bg-white border border-[#E2E2E6] rounded-lg text-xs"
                          />
                          <input
                            type="text"
                            placeholder="Catégorie (ex: Guide BBDBuy, Annonce)"
                            value={newsForm.category}
                            onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value })}
                            required
                            className="w-full px-3 py-2 bg-white border border-[#E2E2E6] rounded-lg text-xs"
                          />
                        </div>
                        <input
                          type="text"
                          placeholder="URL de l'image d'illustration"
                          value={newsForm.image}
                          onChange={(e) => setNewsForm({ ...newsForm, image: e.target.value })}
                          className="w-full px-3 py-2 bg-white border border-[#E2E2E6] rounded-lg text-xs"
                        />
                        <textarea
                          placeholder="Résumé court"
                          value={newsForm.summary}
                          onChange={(e) => setNewsForm({ ...newsForm, summary: e.target.value })}
                          rows={2}
                          className="w-full px-3 py-2 bg-white border border-[#E2E2E6] rounded-lg text-xs"
                        />
                        <textarea
                          placeholder="Contenu complet de l'article"
                          value={newsForm.content}
                          onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                          rows={4}
                          className="w-full px-3 py-2 bg-white border border-[#E2E2E6] rounded-lg text-xs"
                        />
                        <div className="flex gap-2">
                          <button
                            type="submit"
                            className="px-5 py-2.5 bg-[#111111] text-white rounded-lg text-xs font-bold uppercase"
                          >
                            Enregistrer
                          </button>
                          <button
                            type="button"
                            onClick={() => setEditingNews(undefined)}
                            className="px-5 py-2.5 bg-white border border-[#E2E2E6] rounded-lg text-xs font-bold uppercase"
                          >
                            Annuler
                          </button>
                        </div>
                      </form>
                    )}

                    <div className="divide-y divide-[#E2E2E6]">
                      {news.map((item) => (
                        <div key={item.id} className="py-3 flex items-center justify-between gap-4">
                          <div>
                            <p className="font-bold text-xs">{item.title}</p>
                            <p className="text-[11px] text-[#666666]">{item.category} • {item.date}</p>
                          </div>
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => {
                                setEditingNews(item);
                                setNewsForm({
                                  title: item.title,
                                  category: item.category,
                                  date: item.date,
                                  image: item.image || '',
                                  summary: item.summary || '',
                                  content: item.content || ''
                                });
                              }}
                              className="p-2 bg-[#F4F4F6] rounded hover:bg-[#111111] hover:text-white"
                            >
                              <Edit3 className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => {
                                if (confirm('Supprimer cette actualité ?')) {
                                  setNews(news.filter(n => n.id !== item.id));
                                  showToast('Actualité supprimée');
                                }
                              }}
                              className="p-2 bg-red-50 text-red-600 rounded hover:bg-red-600 hover:text-white"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Paramètres & Discord */}
                {adminActiveTab === 'settings' && (
                  <div className="bg-white border border-[#E2E2E6] rounded-2xl p-6 space-y-6">
                    <h3 className="font-black uppercase text-sm">Configuration du Lien Discord (Assistance)</h3>
                    <div className="space-y-4 max-w-xl">
                      <div>
                        <label className="block text-xs font-bold uppercase text-[#666666] mb-1">
                          Lien d'invitation Discord officiel
                        </label>
                        <input
                          type="url"
                          value={discordUrl}
                          onChange={(e) => setDiscordUrl(e.target.value)}
                          className="w-full px-4 py-3 bg-[#F4F4F6] border border-[#E2E2E6] rounded-lg text-xs"
                        />
                      </div>
                      <button
                        onClick={() => showToast('Lien Discord mis à jour avec succès')}
                        className="px-6 py-3 bg-[#111111] text-white rounded-lg text-xs font-bold uppercase"
                      >
                        Enregistrer
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </main>

      {/* FOOTER */}
      <footer className="bg-white border-t border-[#E2E2E6] py-12 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <BlackboxLogo size="sm" showTagline={true} />
          </div>
          <p className="text-xs text-[#666666]">
            © 2026 BLACKBOX. Catalogue indépendant. Non affilié officiellement à BBDBuy (redirection partenaire).
          </p>
        </div>
      </footer>
    </div>
  );
}
