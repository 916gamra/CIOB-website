import React, { useState, useEffect } from 'react';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Award, 
  Search, 
  Globe, 
  ChevronRight, 
  X, 
  Utensils, 
  BookOpen, 
  Clock, 
  Users, 
  Check, 
  Briefcase, 
  ShieldCheck, 
  FileText, 
  Menu, 
  ArrowUpRight,
  CheckCircle,
  TrendingUp,
  Sliders,
  Scale
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { products } from './data/products';
import { recipes } from './data/recipes';
import { translations } from './data/translations';
import { Language, Product, Recipe } from './types';

export default function App() {
  const [language, setLanguage] = useState<Language>('fr');
  const [activeTab, setActiveTab] = useState<'home' | 'presentation' | 'knowhow' | 'products' | 'recipes' | 'contact'>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Contact Form State
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', message: '' });
  const [formSuccess, setFormSuccess] = useState(false);
  const [formError, setFormError] = useState('');

  // Active Recipe State
  const [activeRecipe, setActiveRecipe] = useState<Recipe>(recipes[0]);

  const t = translations[language];

  // Carousel images
  const slides = [
    {
      image: '/images/slider/autocuiseur-titanic-usine-ciob-fes-maroc.jpg',
      title: language === 'fr' ? 'La Marque Titanic®' : 'The Titanic® Brand',
      desc: language === 'fr' 
        ? 'Ustensiles de cuisine de réputation nationale et internationale, synonymes de durabilité.' 
        : 'Cookware of domestic and international repute, synonymous with life-cycle reliability.'
    },
    {
      image: '/images/slider/couscote-titanic-usine-ciob-fes-maroc.jpg',
      title: language === 'fr' ? 'Savoir-Faire de Fès' : 'Craft of Fez',
      desc: language === 'fr' 
        ? 'Un pôle industriel moderne combinant découpe de haute précision et polissage minutieux.' 
        : 'A state-of-the-art manufacturing core combining deep drawing and micro polishing.'
    },
    {
      image: '/images/usine-ciob-fes-machine.jpg',
      title: language === 'fr' ? 'Technologie & Productivité' : 'Technology & Yield',
      desc: language === 'fr' 
        ? 'Des machines modernes adaptées aux commandes à haut volume pour les grossistes et distributeurs.' 
        : 'Modern heavy machinery tuned for high-volume orders catering to distributors.'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      setFormError(language === 'fr' ? 'Veuillez remplir tous les champs obligatoires (*)' : 'Please fill out all required fields (*)');
      return;
    }
    setFormError('');
    setFormSuccess(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', message: '' });
      setFormSuccess(false);
    }, 5000);
  };

  const filteredProducts = products.filter(product => {
    const matchesSearch = 
      product.nameFR.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.nameEN.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sizes.some(size => size.toLowerCase().includes(searchQuery.toLowerCase())) ||
      product.descriptionFR.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.descriptionEN.toLowerCase().includes(searchQuery.toLowerCase());
    
    if (selectedCategory === 'all') return matchesSearch;
    return matchesSearch && product.category === selectedCategory;
  });

  const categories = [
    { id: 'all', label: t.allCategories, count: products.length },
    { id: 'aluminium', label: t.catAlu, count: products.filter(p => p.category === 'aluminium').length },
    { id: 'antiadhesif', label: t.catAnti, count: products.filter(p => p.category === 'antiadhesif').length },
    { id: 'inox', label: t.catInox, count: products.filter(p => p.category === 'inox').length },
    { id: 'pro', label: t.catPro, count: products.filter(p => p.category === 'pro').length },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans selection:bg-cyan-600 selection:text-white">
      {/* TOP HEADER STATUS */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1.5 hover:text-cyan-400 smooth-hover">
              <Phone className="w-3.5 h-3.5 text-cyan-500" />
              <a href="tel:+212535729168" className="font-mono">+212 535 729 168</a>
            </span>
            <span className="flex items-center gap-1.5 hover:text-cyan-400 smooth-hover">
              <Mail className="w-3.5 h-3.5 text-cyan-500" />
              <a href="mailto:ciob99@yahoo.fr" className="font-mono">ciob99@yahoo.fr</a>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-slate-400 hidden md:inline">{t.madeInFez}</span>
            <div className="flex items-center bg-slate-800 rounded-lg p-0.5 border border-slate-700">
              <button 
                onClick={() => setLanguage('fr')} 
                className={`px-2.5 py-1 rounded-md text-xs font-semibold smooth-hover gap-1 flex items-center ${language === 'fr' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                FR
              </button>
              <button 
                onClick={() => setLanguage('en')} 
                className={`px-2.5 py-1 rounded-md text-xs font-semibold smooth-hover gap-1 flex items-center ${language === 'en' ? 'bg-cyan-600 text-white shadow-md' : 'text-slate-400 hover:text-white'}`}
              >
                EN
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* NAVIGATION BAR */}
      <header className="bg-white/95 backdrop-blur-md sticky top-0 z-40 border-b border-slate-100 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 py-3.5 flex justify-between items-center">
          <button onClick={() => { setActiveTab('home'); window.scrollTo(0, 0); }} className="flex items-center gap-3 text-left">
            <img src="/images/logo.png" alt="CIOB Logo" className="h-10 w-auto object-contain" />
            <div className="hidden lg:block">
              <h1 className="text-xl font-bold font-display tracking-tight text-slate-900 leading-none">CIOB MAROC</h1>
              <span className="text-[10px] font-semibold text-cyan-600 uppercase tracking-widest">{t.tagline}</span>
            </div>
          </button>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1 lg:gap-2">
            {[
              { id: 'home', label: t.home },
              { id: 'presentation', label: t.presentation },
              { id: 'knowhow', label: t.knowHow },
              { id: 'products', label: t.products },
              { id: 'recipes', label: t.recipes },
              { id: 'contact', label: t.contact },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  window.scrollTo(0, 0);
                }}
                className={`px-3 py-2 text-sm font-medium rounded-lg smooth-hover ${
                  activeTab === tab.id 
                    ? 'text-cyan-600 bg-cyan-50/70 font-semibold' 
                    : 'text-slate-600 hover:text-cyan-600 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Mobile view button */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden p-1.5 text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg smooth-hover"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-white border-t border-slate-100 px-4 py-3 flex flex-col gap-1 shadow-lg">
            {[
              { id: 'home', label: t.home },
              { id: 'presentation', label: t.presentation },
              { id: 'knowhow', label: t.knowHow },
              { id: 'products', label: t.products },
              { id: 'recipes', label: t.recipes },
              { id: 'contact', label: t.contact },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id as any);
                  setMobileMenuOpen(false);
                  window.scrollTo(0, 0);
                }}
                className={`w-full text-left px-4 py-2.5 text-sm rounded-lg font-medium smooth-hover ${
                  activeTab === tab.id 
                    ? 'bg-cyan-600 text-white font-semibold' 
                    : 'text-slate-700 hover:bg-slate-50'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* MAIN VIEWPORT BODY */}
      <main className="flex-grow">
        {/* VIEW 1: HOME PAGE */}
        {activeTab === 'home' && (
          <div>
            {/* HERO CAROUSEL */}
            <section className="relative h-[480px] md:h-[580px] bg-slate-950 overflow-hidden">
              <div className="absolute inset-0 z-0">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentSlide}
                    initial={{ opacity: 0, scale: 1.05 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.8 }}
                    className="absolute inset-0"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-transparent z-10" />
                    <img 
                      src={slides[currentSlide].image} 
                      alt="Titanic factory" 
                      className="w-full h-full object-cover opacity-80"
                    />
                  </motion.div>
                </AnimatePresence>
              </div>

              {/* SLIDE CONTENT HERO OVERLAY */}
              <div className="absolute inset-0 z-20 flex items-center">
                <div className="max-w-7xl mx-auto px-4 w-full">
                  <div className="max-w-2xl text-white">
                    <motion.div 
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="inline-flex items-center gap-1.5 bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider mb-4"
                    >
                      <Award className="w-3.5 h-3.5" />
                      Titanic® {t.since}
                    </motion.div>
                    
                    <motion.h2 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 }}
                      className="text-4xl md:text-5xl font-extrabold font-display tracking-tight text-white mb-4 leading-[1.1]"
                    >
                      {slides[currentSlide].title}
                    </motion.h2>

                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-base md:text-lg text-slate-300 mb-8 max-w-xl leading-relaxed"
                    >
                      {slides[currentSlide].desc}
                    </motion.p>

                    <motion.div 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 }}
                      className="flex flex-wrap gap-4"
                    >
                      <button 
                        onClick={() => { setActiveTab('products'); window.scrollTo(0, 0); }}
                        className="bg-cyan-600 hover:bg-cyan-500 text-white px-6 py-3 rounded-lg font-semibold shadow-xl shadow-cyan-600/15 sm:w-auto w-full smooth-hover flex items-center justify-center gap-2"
                      >
                        {t.exploreCatalog}
                        <ArrowUpRight className="w-4 h-4" />
                      </button>
                      <button 
                        onClick={() => { setActiveTab('presentation'); window.scrollTo(0, 0); }}
                        className="bg-slate-800/80 hover:bg-slate-700 text-white px-6 py-3 rounded-lg font-semibold sm:w-auto w-full smooth-hover border border-slate-700 text-center"
                      >
                        {t.learnMore}
                      </button>
                    </motion.div>
                  </div>
                </div>
              </div>

              {/* DOT NAVIGATION */}
              <div className="absolute bottom-6 right-6 z-30 flex gap-2">
                {slides.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => setCurrentSlide(idx)}
                    className={`w-3 h-3 rounded-full smooth-hover ${idx === currentSlide ? 'bg-cyan-500 w-8' : 'bg-slate-600 hover:bg-slate-400'}`}
                  />
                ))}
              </div>
            </section>

            {/* KEY DATA STATS METRICS */}
            <section className="bg-slate-900 border-b border-slate-800 py-10 text-white">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8">
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-cyan-400 font-display">30+</div>
                  <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">{t.statYears}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-cyan-400 font-display">100%</div>
                  <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">{t.madeInFez}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-cyan-400 font-display">ISO 9001</div>
                  <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">{t.statCompliance}</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl md:text-4xl font-extrabold text-cyan-400 font-display">15+</div>
                  <div className="text-xs text-slate-400 mt-1 uppercase tracking-wider font-semibold">{t.statExport}</div>
                </div>
              </div>
            </section>

            {/* HOMEPAGE CORE BLOCK 1: BRIEF PRESENTATION */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="relative group">
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-cyan-500 to-indigo-500 opacity-20 blur-lg" />
                  <img 
                    src="/images/a-propos-ciob-maroc-fes.jpg" 
                    alt="Titanic Cookware Factory Fez" 
                    className="relative rounded-xl border border-slate-100 shadow-2xl object-cover w-full h-[360px]"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-2">{t.aboutCompany}</h3>
                  <h2 className="text-3xl font-extrabold font-display text-slate-900 tracking-tight leading-tight mb-6">
                    {language === 'fr' 
                      ? 'Des articles certifiés ISO, fiers de notre héritage industriel' 
                      : 'ISO certified articles, proud of our Moroccan industrial heritage'
                    }
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {t.aboutParagraph}
                  </p>
                  
                  <div className="border-l-4 border-cyan-500 pl-4 py-1 mb-8">
                    <p className="text-slate-800 font-medium italic">
                      {language === 'fr' 
                        ? '« Notre mission est d’armer chaque foyer d’instruments de cuisine performants, sains et durables à vie. »' 
                        : '"Our mission is to arm every household with high-performance, healthy, and lifelong cookery tools."'
                      }
                    </p>
                    <span className="text-xs text-slate-500 block mt-2 font-mono">— Mr. Aziz Omari, {t.presidentTitle}</span>
                  </div>

                  <div className="flex gap-4">
                    <button 
                      onClick={() => { setActiveTab('presentation'); window.scrollTo(0, 0); }}
                      className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-5 py-2.5 rounded-lg smooth-hover"
                    >
                      {t.learnMore}
                    </button>
                    <a 
                      href="http://ciobmaroc.ma/ciob-politique-qualite.pdf" 
                      target="_blank"
                      rel="noreferrer"
                      className="text-cyan-600 hover:text-cyan-800 text-sm font-semibold flex items-center gap-1 inline-flex smooth-hover"
                    >
                      {t.downloadQuality}
                      <ArrowUpRight className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              </div>
            </section>

            {/* HOMEPAGE CORE BLOCK 2: PRODUCTS HIGHLIGHT */}
            <section className="py-20 bg-slate-50 border-t border-b border-slate-100">
              <div className="max-w-7xl mx-auto px-4">
                <div className="text-center max-w-2xl mx-auto mb-16">
                  <h3 className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-2">{t.products}</h3>
                  <h2 className="text-3xl font-extrabold font-display text-slate-900 tracking-tight mb-4">
                    {language === 'fr' ? 'Nos Meilleurs Produits de Vente' : 'Our Flagship Cookware Series'}
                  </h2>
                  <p className="text-slate-600 text-sm">
                    {language === 'fr' 
                      ? 'Explorez notre gamme conçue sur mesure pour les besoins des cuisines modernes et professionnelles.' 
                      : 'Explore our line tailormade to meet modern and professional heavy catering standards.'
                    }
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {products.slice(0, 3).map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => handleProductClick(item)}
                      className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-lg shadow-slate-100/40 hover:-translate-y-1.5 smooth-hover cursor-pointer group"
                    >
                      <div className="relative overflow-hidden aspect-square flex items-center justify-center p-6 bg-slate-100">
                        <img 
                          src={item.image} 
                          alt={item.nameFR} 
                          className="max-h-full max-w-full object-contain smooth-hover group-hover:scale-105" 
                        />
                        <div className="absolute top-3 left-3 bg-cyan-600 text-white text-[10px] font-bold px-2 py-1 rounded-full uppercase tracking-wider">
                          Titanic®
                        </div>
                      </div>
                      <div className="p-5 border-t border-slate-100 flex flex-col justify-between min-h-[160px]">
                        <div>
                          <span className="text-[10px] font-extrabold text-cyan-600 uppercase tracking-wider block mb-1">
                            {item.category === 'aluminium' ? t.catAlu : item.category === 'antiadhesif' ? t.catAnti : item.category === 'inox' ? t.catInox : t.catPro}
                          </span>
                          <h4 className="font-semibold text-slate-900 text-base line-clamp-1 group-hover:text-cyan-600 smooth-hover">
                            {language === 'fr' ? item.nameFR : item.nameEN}
                          </h4>
                          <p className="text-xs text-slate-500 mt-2 line-clamp-2">
                            {language === 'fr' ? item.descriptionFR : item.descriptionEN}
                          </p>
                        </div>
                        <div className="flex items-center justify-between text-xs font-semibold text-slate-800 pt-4 border-t border-slate-50 mt-4">
                          <span className="text-slate-400 text-[10px] font-mono">{item.sizes[0]}</span>
                          <span className="text-cyan-600 flex items-center gap-0.5 group-hover:gap-1.5 transition-all text-[11px]">
                            {language === 'fr' ? 'Détails' : 'View Details'} &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <button 
                    onClick={() => { setActiveTab('products'); window.scrollTo(0, 0); }}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-lg smooth-hover"
                  >
                    {t.viewDetails}
                  </button>
                </div>
              </div>
            </section>

            {/* HOMEPAGE CORE BLOCK 3: TRADITIONAL FOOD PROMO */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div>
                  <h3 className="text-xs font-bold text-cyan-600 uppercase tracking-widest mb-2">{t.recipes}</h3>
                  <h2 className="text-3xl font-extrabold font-display text-slate-900 tracking-tight leading-tight mb-4">
                    {t.recipeHeroTitle}
                  </h2>
                  <p className="text-slate-600 leading-relaxed mb-6">
                    {t.recipeHeroSub}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                    {recipes.map((rec) => (
                      <div 
                        key={rec.id} 
                        onClick={() => { setActiveRecipe(rec); setActiveTab('recipes'); window.scrollTo(0, 0); }}
                        className="flex items-center gap-3 p-3 border border-slate-100 rounded-xl hover:border-cyan-100 hover:bg-cyan-50/20 cursor-pointer smooth-hover"
                      >
                        <img 
                          src={rec.image} 
                          alt={rec.nameFR} 
                          className="w-12 h-12 rounded-lg object-cover"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-slate-800 line-clamp-1">
                            {language === 'fr' ? rec.nameFR : rec.nameEN}
                          </h4>
                          <span className="text-[10px] font-mono text-slate-500 inline-flex items-center gap-1 mt-0.5">
                            <Clock className="w-3 h-3 text-cyan-500" />
                            {language === 'fr' ? rec.prepTimeFR : rec.prepTimeEN}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>

                  <button 
                    onClick={() => { setActiveTab('recipes'); window.scrollTo(0, 0); }}
                    className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-lg smooth-hover inline-flex items-center gap-1.5"
                  >
                    <BookOpen className="w-4 h-4" />
                    {language === 'fr' ? 'Consulter le Blog Culinaire' : 'Visit Culinary Blog'}
                  </button>
                </div>

                <div className="relative aspect-square flex items-center justify-center p-1 bg-slate-100 rounded-2xl overflow-hidden shadow-xl">
                  <div className="absolute inset-0 bg-slate-900/10 z-10" />
                  <img 
                    src="/images/couscous-7-legumes-ciob-maroc.jpg" 
                    alt="Moroccan Cuisine" 
                    className="w-full h-full object-cover rounded-xl"
                  />
                  <div className="absolute bottom-6 left-6 z-20 bg-white/95 backdrop-blur px-4 py-3 rounded-xl border border-slate-100 shadow-xl max-w-xs">
                    <span className="text-[10px] font-extrabold text-cyan-600 tracking-wider uppercase block">{t.recipes}</span>
                    <h4 className="text-sm font-bold text-slate-900 mt-1">Couscous aux 7 légumes</h4>
                    <p className="text-xs text-slate-500 mt-1 line-clamp-2">L’art culinaire de Fez préparé dans la digne et authentique couscoussière Titanic.</p>
                  </div>
                </div>
              </div>
            </section>

            {/* HOMEPAGE CORE BLOCK 4: QUALITY TRUST SECTION */}
            <section className="py-20 bg-slate-900 text-white relative overflow-hidden">
              <div className="absolute right-0 top-0 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl" />
              <div className="absolute left-0 bottom-0 w-96 h-96 bg-indigo-600/10 rounded-full blur-3xl" />
              
              <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                  <div>
                    <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest block mb-2">{t.statCompliance}</span>
                    <h2 className="text-3xl font-extrabold font-display tracking-tight leading-tight mb-4">
                      {t.qualityTitle}
                    </h2>
                    <p className="text-slate-300 text-sm leading-relaxed mb-6">
                      {t.qualityDesc}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8 text-sm">
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{language === 'fr' ? 'Certification ISO 9001:2015' : 'ISO 9001:2015 Certified'}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{language === 'fr' ? 'Contrôles Bureau Veritas' : 'Bureau Veritas Audits'}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{language === 'fr' ? 'Matériaux certifiés contact alimentaire' : 'Certified Food Contact Materials'}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-cyan-400 flex-shrink-0 mt-0.5" />
                        <span>{language === 'fr' ? 'Polissage mécanique haute sécurité' : 'High Safety Mechanical Polishing'}</span>
                      </div>
                    </div>

                    <a 
                      href="http://ciobmaroc.ma/ciob-politique-qualite.pdf" 
                      target="_blank"
                      rel="noreferrer"
                      className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm px-5 py-3 rounded-lg shadow-lg inline-flex items-center gap-1.5 smooth-hover"
                    >
                      <FileText className="w-4.5 h-4.5" />
                      {language === 'fr' ? 'Consulter la politique PDF' : 'Open Quality PDF'}
                    </a>
                  </div>

                  <div className="flex flex-wrap justify-center items-center gap-8 bg-white/5 border border-white/10 rounded-2xl p-10 backdrop-blur-sm">
                    <div className="flex flex-col items-center gap-2">
                      <img src="/images/veritas.jpg" alt="Veritas Logo" className="h-24 w-auto rounded-lg object-contain shadow-md bg-white p-2" />
                      <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">Bureau Veritas</span>
                    </div>
                    <div className="flex flex-col items-center gap-2">
                      <img src="/images/cgem.jpg" alt="CGEM Logo" className="h-24 w-auto rounded-lg object-contain shadow-md bg-white p-2" />
                      <span className="text-[10px] font-semibold text-slate-300 uppercase tracking-wider">CGEM Maroc</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* VIEW 2: PRESENTATION PAGE */}
        {activeTab === 'presentation' && (
          <section className="py-16 md:py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="max-w-3xl mb-12">
                <nav className="text-xs text-slate-400 font-medium mb-3 tracking-wider uppercase">
                  <span className="hover:text-cyan-600 cursor-pointer" onClick={() => setActiveTab('home')}>{t.home}</span> / {t.presentation}
                </nav>
                <h1 className="text-4xl font-extrabold font-display text-slate-950 tracking-tight leading-tight">
                  {language === 'fr' ? 'Présentation de notre Usine' : 'Fez Cookware Factory presentation'}
                </h1>
                <div className="h-1 w-12 bg-cyan-600 mt-4 rounded-full" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                <div className="lg:col-span-2 space-y-8">
                  <div className="aspect-[16/9] bg-slate-100 rounded-xl overflow-hidden border border-slate-100 shadow-xl relative">
                    <div className="absolute inset-0 bg-slate-900/10 z-10" />
                    <img 
                      src="/images/a-propos-ciob-maroc-fes.jpg" 
                      alt="Titanic factory Fez" 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="prose prose-slate max-w-none text-slate-600 space-y-6">
                    <p className="text-lg text-slate-700 font-medium leading-relaxed">
                      {t.aboutParagraph}
                    </p>
                    <p>
                      {language === 'fr'
                        ? 'La société CIOB intègre un cycle d’ingénierie global pour façonner le métal. Dès la réception des bobines d’aluminium brut et d’acier inoxydable, nos équipes expertes découpent, emboutissent, polissent et assemblent les produits avec une rigueur absolue.'
                        : 'CIOB manages an ending-to-end metalforming product life cycle. Upon receiving raw aluminum coils or high-purity steel sheets, our highly skilled operators execute precise cutting, stamping, drawing, polishing, and riveting operations with master precision.'
                      }
                    </p>
                    <p>
                      {language === 'fr'
                        ? 'Idéalement implantée dans le quartier industriel de Ben Souda à Fès, l’usine moderne de CIOB alimente sereinement le marché national marocain mais s’impose également comme un partenaire exportateur fiable vers plus de 15 pays, notamment en Afrique Subsaharienne et au Sahara.'
                        : 'Perfected in Ben Souda Industrial Area in the imperial Moroccan city of Fez, CIOB plant feeds both the Morrocan domestic chain and scales as a solid exporter providing for 15+ sub-Saharan African countries and global retail networks.'
                      }
                    </p>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 flex items-start gap-4">
                    <span className="p-3 bg-cyan-50 text-cyan-600 rounded-xl leading-none">
                      <Scale className="w-8 h-8" />
                    </span>
                    <div>
                      <h3 className="font-extrabold text-slate-900 text-lg mb-2">{t.qualityTitle}</h3>
                      <p className="text-slate-600 text-sm leading-relaxed mb-4">{t.qualityDesc}</p>
                      <a 
                        href="http://ciobmaroc.ma/ciob-politique-qualite.pdf" 
                        target="_blank"
                        rel="noreferrer"
                        className="text-cyan-600 hover:text-cyan-800 text-sm font-semibold inline-flex items-center gap-1 inline-flex smooth-hover"
                      >
                        {t.downloadQuality}
                        <ArrowUpRight className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Sidebar widgets */}
                <div className="space-y-8">
                  {/* CEO words */}
                  <div className="bg-slate-900 text-white rounded-2xl p-6 md:p-8 relative overflow-hidden">
                    <div className="absolute right-0 top-0 w-24 h-24 bg-cyan-500/15 rounded-full blur-xl" />
                    <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest mb-4">{language === 'fr' ? 'Mot du Directeur' : 'Words from Director'}</h3>
                    <blockquote className="text-sm italic text-slate-200 mb-6 relative">
                      {language === 'fr'
                        ? '« Notre dévouement total pour l’ergonomie et des alliages certifiés contribue directement à la réussite des foyers marocains. Titanic® n\'est pas un simple outil, c\'est le compagnon des secrets de votre maison. »'
                        : '"Our absolute commitment to ergonomics and audited alloy standards directly powers Moroccan homes. Titanic® is beyond a simple cooking pot: it is the trusted guardian of family taste legacies."'
                      }
                    </blockquote>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-cyan-600 rounded-full flex items-center justify-center font-bold text-sm text-white">AO</div>
                      <div>
                        <h4 className="font-bold text-xs">Mr. Aziz Omari</h4>
                        <span className="text-[10px] text-slate-400 block">{t.presidentTitle}</span>
                      </div>
                    </div>
                  </div>

                  {/* Trust widget */}
                  <div className="bg-slate-50 border border-slate-100 rounded-2xl p-6">
                    <h3 className="font-bold text-slate-900 text-base mb-4">{language === 'fr' ? 'Politiques de confiances' : 'Wholesale partnerships'}</h3>
                    <ul className="space-y-3.5 text-xs text-slate-600">
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span>{language === 'fr' ? 'Capacité de production de gros volume' : 'Scalable bulk manufacture capacity'}</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span>{language === 'fr' ? 'Emballage renforcé export maritime' : 'Sea freight ready heavy packaging'}</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span>{language === 'fr' ? 'Respect strict du calendrier des livraisons' : 'Strict time schedule compliance'}</span>
                      </li>
                      <li className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                        <span>{language === 'fr' ? 'Ustensiles sur-mesure à la commande' : 'Customized metal-stamping options'}</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* VIEW 3: SAVOIR FAIRE PAGE */}
        {activeTab === 'knowhow' && (
          <section className="py-16 md:py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="max-w-3xl mb-12">
                <nav className="text-xs text-slate-400 font-medium mb-3 tracking-wider uppercase">
                  <span className="hover:text-cyan-600 cursor-pointer" onClick={() => setActiveTab('home')}>{t.home}</span> / {t.knowHow}
                </nav>
                <h1 className="text-4xl font-extrabold font-display text-slate-950 tracking-tight leading-tight">
                  {t.knowHowTitle}
                </h1>
                <p className="text-slate-500 text-sm mt-2">{t.knowHowSub}</p>
                <div className="h-1 w-12 bg-cyan-600 mt-4 rounded-full" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-xl shadow-slate-100/30 flex flex-col justify-between">
                  <div>
                    <span className="p-3 bg-cyan-50 text-cyan-600 rounded-xl leading-none inline-block mb-6">
                      <Briefcase className="w-6 h-6" />
                    </span>
                    <h3 className="font-extrabold text-slate-950 text-xl mb-4">{t.knowHowMission}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {t.knowHowMissionText}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-slate-50 mt-6 flex gap-3 text-cyan-600 text-xs font-semibold">
                    <span>Bouilloires / Kettle</span> &bull;
                    <span>Marmites / Pots</span> &bull;
                    <span>Autocuiseurs</span>
                  </div>
                </div>

                <div className="bg-white border border-slate-100 rounded-2xl p-8 shadow-xl shadow-slate-100/30 flex flex-col justify-between">
                  <div>
                    <span className="p-3 bg-cyan-50 text-cyan-600 rounded-xl leading-none inline-block mb-6">
                      <ShieldCheck className="w-6 h-6" />
                    </span>
                    <h3 className="font-extrabold text-slate-950 text-xl mb-4">{t.knowHowTrust}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {t.knowHowTrustText}
                    </p>
                  </div>
                  <div className="pt-6 border-t border-slate-50 mt-6 flex gap-3 text-cyan-600 text-xs font-semibold">
                    <span>ISO 9001:2015</span> &bull;
                    <span>Bureau Veritas</span> &bull;
                    <span>Certifié Sûr</span>
                  </div>
                </div>
              </div>

              {/* MACHINE PHOTOS */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="relative group overflow-hidden rounded-2xl border border-slate-100 shadow-xl aspect-[4/3]">
                  <img src="/images/usine-ciob-fes-machine-bobine.jpg" alt="Bobine machine" className="w-full h-full object-cover smooth-hover group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-6">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Étape 1 : Usinage Bobine</span>
                      <h4 className="text-white font-bold text-base mt-1">Découpe de flans en aluminium pur</h4>
                    </div>
                  </div>
                </div>
                <div className="relative group overflow-hidden rounded-2xl border border-slate-100 shadow-xl aspect-[4/3]">
                  <img src="/images/usine-ciob-fes-machine.jpg" alt="Metal machine" className="w-full h-full object-cover smooth-hover group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent flex items-end p-6">
                    <div>
                      <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider">Étape 2 : Emboutissage Lourd</span>
                      <h4 className="text-white font-bold text-base mt-1">Formage par presses hydrauliques</h4>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* VIEW 4: PRODUCTS SECTION */}
        {activeTab === 'products' && (
          <section className="py-16 md:py-20 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">
              {/* Breadcrumbs */}
              <div className="max-w-3xl mb-12">
                <nav className="text-xs text-slate-400 font-medium mb-3 tracking-wider uppercase">
                  <span className="hover:text-cyan-600 cursor-pointer" onClick={() => setActiveTab('home')}>{t.home}</span> / {t.products}
                </nav>
                <h1 className="text-4xl font-extrabold font-display text-slate-950 tracking-tight leading-none mb-3">
                  {t.productCatalog}
                </h1>
                <p className="text-slate-500 text-sm leading-relaxed max-w-xl">
                  {language === 'fr' 
                     ? 'Tous nos ustensiles Titanic® sont façonnés pour résister aux agressions d’une chauffe prolongée.'
                     : 'All Titanic® kitchen vessels are treated to resist persistent high-voltage stovetop heat cycle wear.'
                  }
                </p>
                <div className="h-1 w-12 bg-cyan-600 mt-4 rounded-full" />
              </div>

              {/* SEARCH BAR & FILTERS BOX */}
              <div className="bg-white rounded-2xl border border-slate-100 p-4 md:p-6 shadow-sm mb-10 flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-slate-400" />
                  <input 
                    type="text" 
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-600 select-all"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-1/2 -translate-y-1/2 p-0.5 rounded-full hover:bg-slate-200">
                      <X className="w-3.5 h-3.5 text-slate-500" />
                    </button>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto pb-1 md:pb-0">
                  {categories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => setSelectedCategory(cat.id)}
                      className={`px-3.5 py-2 text-xs font-semibold rounded-xl whitespace-nowrap smooth-hover flex items-center gap-1.5 ${
                        selectedCategory === cat.id 
                          ? 'bg-cyan-600 text-white shadow-md shadow-cyan-600/10' 
                          : 'text-slate-600 bg-slate-50 border border-slate-100 hover:bg-slate-100/50'
                      }`}
                    >
                      {cat.label}
                      <span className={`text-[10px] px-1.5 py-0.5 rounded-md ${selectedCategory === cat.id ? 'bg-cyan-700/60 text-white' : 'bg-slate-200 text-slate-600'}`}>{cat.count}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* PRODUCTS LIST GRID */}
              {filteredProducts.length === 0 ? (
                <div className="text-center py-20 bg-white border border-slate-100 rounded-2xl">
                  <span className="p-4 bg-slate-50 text-slate-400 rounded-full inline-block leading-none mb-4">
                    <Sliders className="w-8 h-8" />
                  </span>
                  <h3 className="font-extrabold text-slate-800 text-lg">{language === 'fr' ? 'Aucun produit trouvé' : 'No utensils matches found'}</h3>
                  <p className="text-sm text-slate-500 mt-1 max-w-xs mx-auto">{language === 'fr' ? 'Essayez de changer les mots clés ou réinitialisez vos filtres.' : 'Try adjusting search tags or select All Categories.'}</p>
                  <button onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }} className="bg-slate-900 text-white font-semibold text-xs px-4 py-2 rounded-lg mt-4 smooth-hover">
                    {language === 'fr' ? 'Réinitialiser' : 'Reset Filters'}
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => handleProductClick(item)}
                      className="bg-white rounded-xl border border-slate-100 overflow-hidden shadow-md shadow-slate-100/40 hover:-translate-y-1 smooth-hover cursor-pointer group flex flex-col justify-between"
                    >
                      <div className="relative overflow-hidden aspect-square flex items-center justify-center p-6 bg-slate-100 flex-shrink-0">
                        <img 
                          src={item.image} 
                          alt={item.nameFR} 
                          className="max-h-full max-w-full object-contain smooth-hover group-hover:scale-105" 
                        />
                        <div className="absolute top-3 left-3 bg-cyan-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                          Titanic®
                        </div>
                      </div>
                      <div className="p-4 border-t border-slate-100 flex flex-col justify-between flex-grow">
                        <div>
                          <span className="text-[9px] font-extrabold text-cyan-600 uppercase tracking-wider block mb-1">
                            {item.category === 'aluminium' ? t.catAlu : item.category === 'antiadhesif' ? t.catAnti : item.category === 'inox' ? t.catInox : t.catPro}
                          </span>
                          <h4 className="font-bold text-slate-950 text-sm line-clamp-1 group-hover:text-cyan-600 smooth-hover">
                            {language === 'fr' ? item.nameFR : item.nameEN}
                          </h4>
                        </div>
                        <div className="flex items-center justify-between text-[10px] font-semibold text-slate-800 pt-3 border-t border-slate-50 mt-3 flex-shrink-0">
                          <span className="text-slate-400 font-mono font-medium">{item.sizes[0]}</span>
                          <span className="text-cyan-600 flex items-center gap-0.5 group-hover:gap-1.5 transition-all">
                            {language === 'fr' ? 'Fiche' : 'Details'} &rarr;
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </section>
        )}

        {/* VIEW 5: RECIPES SECTION */}
        {activeTab === 'recipes' && (
          <section className="py-16 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="max-w-3xl mb-12">
                <nav className="text-xs text-slate-400 font-medium mb-3 tracking-wider uppercase">
                  <span className="hover:text-cyan-600 cursor-pointer" onClick={() => setActiveTab('home')}>{t.home}</span> / {t.recipes}
                </nav>
                <h1 className="text-4xl font-extrabold font-display text-slate-900 tracking-tight leading-none mb-3">
                  {language === 'fr' ? 'Blog Culinaire Ciob Maroc' : 'Titanic® Traditional Kitchen recipes'}
                </h1>
                <p className="text-slate-500 text-sm leading-relaxed">{t.recipeSub}</p>
                <div className="h-1 w-12 bg-cyan-600 mt-4 rounded-full" />
              </div>

              {/* RECIPES MASTER-DETAIL HORIZONTAL SPLIT */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 items-start">
                {/* Left Recipes Listing Column */}
                <div className="space-y-4">
                  {recipes.map((rec) => (
                    <div 
                      key={rec.id} 
                      onClick={() => setActiveRecipe(rec)}
                      className={`p-4 border rounded-2xl cursor-pointer smooth-hover flex gap-4 ${
                        activeRecipe.id === rec.id
                          ? 'border-cyan-600 bg-cyan-50/20 shadow-lg shadow-cyan-600/5' 
                          : 'border-slate-100 hover:border-slate-200 hover:bg-slate-50'
                      }`}
                    >
                      <img 
                        src={rec.image} 
                        alt={rec.nameFR} 
                        className="w-20 h-20 rounded-xl object-cover"
                      />
                      <div className="flex flex-col justify-between py-0.5">
                        <h3 className="font-bold text-slate-900 text-sm leading-snug line-clamp-2">
                          {language === 'fr' ? rec.nameFR : rec.nameEN}
                        </h3>
                        <div className="flex items-center gap-2 text-[10px] text-slate-400 font-mono mt-2">
                          <span className="flex items-center gap-0.5 text-cyan-600">
                            <Clock className="w-3.5 h-3.5" />
                            {language === 'fr' ? rec.cookTimeFR : rec.cookTimeEN}
                          </span>
                          <span>&bull;</span>
                          <span className="flex items-center gap-0.5 text-slate-500">
                            <Users className="w-3.5 h-3.5" />
                            {language === 'fr' ? rec.servingsFR : rec.servingsEN}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Right Recipes Expanded Board detail */}
                <div className="lg:col-span-2 bg-slate-50 border border-slate-100 rounded-2xl p-6 md:p-8 shadow-sm">
                  <div className="aspect-[16/9] overflow-hidden rounded-xl bg-slate-100 mb-6 border border-slate-150 relative">
                    <div className="absolute inset-0 bg-slate-950/20 z-10" />
                    <img 
                      src={activeRecipe.image} 
                      alt={activeRecipe.nameFR} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-6 left-6 z-20 text-white max-w-md">
                      <span className="text-[10px] uppercase font-bold text-cyan-400 tracking-wider inline-block mb-1.5">{language === 'fr' ? 'La cuisson parfaite' : 'Perfect simmer cycle'}</span>
                      <h2 className="text-xl md:text-2xl font-extrabold leading-tight">
                        {language === 'fr' ? activeRecipe.nameFR : activeRecipe.nameEN}
                      </h2>
                    </div>
                  </div>

                  <p className="text-slate-600 text-sm leading-relaxed mb-8">
                    {language === 'fr' ? activeRecipe.descriptionFR : activeRecipe.descriptionEN}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4 px-6 bg-white border border-slate-100 rounded-xl mb-8 font-mono text-center text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t.prepTime}</span>
                      <span className="text-slate-800 font-extrabold text-sm mt-0.5 block">{language === 'fr' ? activeRecipe.prepTimeFR : activeRecipe.prepTimeEN}</span>
                    </div>
                    <div className="border-t md:border-t-0 md:border-l md:border-r border-slate-100 py-3 md:py-0">
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t.cookTime}</span>
                      <span className="text-slate-800 font-extrabold text-sm mt-0.5 block">{language === 'fr' ? activeRecipe.cookTimeFR : activeRecipe.cookTimeEN}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase font-semibold">{t.servings}</span>
                      <span className="text-slate-800 font-extrabold text-sm mt-0.5 block">{language === 'fr' ? activeRecipe.servingsFR : activeRecipe.servingsEN}</span>
                    </div>
                  </div>

                  {/* INGREDIENTS CHECKLIST list Grid */}
                  <div className="mb-8">
                    <h4 className="font-extrabold text-slate-900 text-base mb-4 flex items-center gap-1.5">
                      <Utensils className="w-4.5 h-4.5 text-cyan-600" />
                      {t.ingredients}
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {(language === 'fr' ? activeRecipe.ingredientsFR : activeRecipe.ingredientsEN).map((ing, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 p-2.5 bg-white rounded-lg border border-slate-100 hover:border-cyan-150 md:text-xs text-slate-700 font-medium">
                          <Check className="w-4 h-4 text-cyan-600 flex-shrink-0 mt-0.5" />
                          <span>{ing}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* STEPS TIMELINE directions */}
                  <div>
                    <h4 className="font-extrabold text-slate-900 text-base mb-4 flex items-center gap-1.5">
                      <BookOpen className="w-4.5 h-4.5 text-cyan-600" />
                      {t.steps}
                    </h4>
                    <div className="space-y-4">
                      {(language === 'fr' ? activeRecipe.stepsFR : activeRecipe.stepsEN).map((step, idx) => (
                        <div key={idx} className="flex gap-4 p-4 bg-white rounded-xl border border-slate-100 hover:border-slate-200 shadow-sm leading-relaxed">
                          <span className="w-7 h-7 bg-cyan-600 text-white rounded-full font-extrabold text-sm flex items-center justify-center flex-shrink-0 mt-0.5">
                            {idx + 1}
                          </span>
                          <p className="text-slate-600 text-sm py-0.5 font-medium">{step}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* VIEW 6: CONTACT SECTION */}
        {activeTab === 'contact' && (
          <section className="py-16 md:py-24 bg-slate-50">
            <div className="max-w-7xl mx-auto px-4">
              <div className="max-w-3xl mb-12">
                <nav className="text-xs text-slate-400 font-medium mb-3 tracking-wider uppercase">
                  <span className="hover:text-cyan-600 cursor-pointer" onClick={() => setActiveTab('home')}>{t.home}</span> / {t.contact}
                </nav>
                <h1 className="text-4xl font-extrabold font-display text-slate-950 tracking-tight leading-none mb-3">
                  {t.contactUs}
                </h1>
                <p className="text-slate-500 text-sm max-w-md">{t.contactSub}</p>
                <div className="h-1 w-12 bg-cyan-600 mt-4 rounded-full" />
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                {/* Left Form Board */}
                <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-150/40 p-6 md:p-8 shadow-sm">
                  <h3 className="font-extrabold text-slate-950 text-xl mb-6">{t.contactFormTitle}</h3>
                  
                  {formSuccess && (
                    <div className="bg-emerald-50 border border-emerald-200 text-emerald-800 p-4 rounded-xl text-sm flex items-center gap-2 mb-6">
                      <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                      <span>{t.formSuccess}</span>
                    </div>
                  )}

                  {formError && (
                    <div className="bg-rose-50 border border-rose-200 text-rose-800 p-4 rounded-xl text-sm flex items-center gap-2 mb-6">
                      <X className="w-5 h-5 text-rose-600 flex-shrink-0" />
                      <span>{formError}</span>
                    </div>
                  )}

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1">{t.formName} *</label>
                      <input 
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-600 select-all"
                      />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1">{t.formEmail} *</label>
                        <input 
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-600 select-all"
                        />
                      </div>
                      <div>
                        <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1">{t.formPhone}</label>
                        <input 
                          type="tel"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-600 select-all"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-slate-700 text-xs font-bold uppercase tracking-wider mb-1">{t.formMsg} *</label>
                      <textarea 
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-600 select-all"
                      />
                    </div>

                    <button 
                      type="submit"
                      className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-sm px-6 py-3 rounded-lg shadow-lg smooth-hover w-full flex items-center justify-center gap-1"
                    >
                      <span>{t.formSend}</span>
                      <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </form>
                </div>

                {/* Right Map/Shortcuts Info */}
                <div className="lg:col-span-5 space-y-6">
                  <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 md:p-8 text-white relative overflow-hidden">
                    <h3 className="font-extrabold text-cyan-400 text-lg mb-6">{language === 'fr' ? 'La Manufacture CIOB' : 'CIOB Factory Details'}</h3>

                    <div className="space-y-4">
                      <div className="flex items-start gap-3 text-sm">
                        <MapPin className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-xs text-slate-300">{t.officeAddress}</h4>
                          <a href="https://goo.gl/maps/JS6g2DAtoJzN8eNa7" target="_blank" rel="noreferrer" className="text-slate-200 hover:text-cyan-400 smooth-hover text-xs block mt-1 leading-relaxed">
                            {t.contactAddress}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-sm">
                        <Mail className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-xs text-slate-300">Email direct</h4>
                          <a href="mailto:ciob99@yahoo.fr" className="text-slate-200 hover:text-cyan-400 smooth-hover text-xs font-mono block mt-1">
                            {t.contactEmail}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-sm">
                        <Phone className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-xs text-slate-300">{language === 'fr' ? 'Tél Clientèle' : 'Direct Line'}</h4>
                          <a href="tel:+212535729168" className="text-slate-200 hover:text-cyan-400 smooth-hover text-xs font-mono block mt-1">
                            {t.contactPhone}
                          </a>
                        </div>
                      </div>

                      <div className="flex items-start gap-3 text-sm border-t border-slate-800/80 pt-4 mt-4">
                        <ShieldCheck className="w-5 h-5 text-cyan-500 flex-shrink-0 mt-0.5" />
                        <div>
                          <h4 className="font-bold text-xs text-slate-300">{t.officeHours}</h4>
                          <span className="text-xs text-slate-400 block mt-1 leading-none">{t.officeHoursDays}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* EMBED MAP iFRAME */}
                  <div className="h-[280px] bg-slate-100 rounded-2xl overflow-hidden border border-slate-150 shadow-inner relative">
                    <iframe 
                      title="CIOB Location Fez"
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3305.6198942207903!2d-5.07185!3d34.028!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzTCsDAxJzQwLjgiTiA1wrAwNCcxOC43Ilc!5e0!3m2!1sfr!2sma!4v1611234567890!5m2!1sfr!2sma"
                      className="w-full h-full border-0"
                      allowFullScreen={true}
                      loading="lazy"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* DETAILED PRODUCT POPUP MODAL */}
      <AnimatePresence>
        {selectedProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4">
            {/* Backdrop cover */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedProduct(null)}
              className="fixed inset-0 bg-slate-950/60 backdrop-blur-sm"
            />

            {/* Modal box */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              className="bg-white rounded-2xl border border-slate-100 shadow-2xl relative w-full max-w-3xl overflow-hidden z-10 max-h-[90vh] flex flex-col"
            >
              {/* Top Banner Header with Close button */}
              <div className="bg-slate-900 px-6 py-4 flex justify-between items-center border-b border-slate-800 text-white flex-shrink-0">
                <span className="text-[10px] font-extrabold text-cyan-400 uppercase tracking-widest">
                  Titanic® {selectedProduct.category === 'aluminium' ? t.catAlu : selectedProduct.category === 'antiadhesif' ? t.catAnti : selectedProduct.category === 'inox' ? t.catInox : t.catPro}
                </span>
                <button 
                  onClick={() => setSelectedProduct(null)}
                  className="p-1 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg smooth-hover"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable container content */}
              <div className="overflow-y-auto p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
                  {/* Photo panel */}
                  <div className="aspect-square bg-slate-100 rounded-xl p-6 flex items-center justify-center border border-slate-200 shadow-inner">
                    <img 
                      src={selectedProduct.image} 
                      alt={selectedProduct.nameFR} 
                      className="max-h-full max-w-full object-contain"
                    />
                  </div>

                  {/* Facts list */}
                  <div className="space-y-6">
                    <div>
                      <h2 className="text-2xl font-extrabold font-display text-slate-950 leading-tight">
                        {language === 'fr' ? selectedProduct.nameFR : selectedProduct.nameEN}
                      </h2>
                      <p className="text-slate-600 text-sm mt-3 leading-relaxed">
                        {language === 'fr' ? selectedProduct.descriptionFR : selectedProduct.descriptionEN}
                      </p>
                    </div>

                    <div className="border-t border-b border-slate-100 py-4 font-mono text-xs">
                      <span className="text-slate-400 text-[10px] uppercase font-bold block mb-2">{t.productSizes}</span>
                      <div className="flex flex-wrap gap-1.5">
                        {selectedProduct.sizes.map((size, index) => (
                          <span key={index} className="bg-slate-100 text-slate-800 px-2.5 py-1 rounded-md font-semibold font-sans">
                            {size}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div>
                      <span className="text-slate-400 text-[10px] uppercase font-extrabold tracking-wider block mb-3">{language === 'fr' ? "Fiche Technique / Spécifications" : "Technical Specs"}</span>
                      <ul className="space-y-2 text-xs">
                        {(language === 'fr' ? selectedProduct.featuresFR : selectedProduct.featuresEN).map((feat, index) => (
                          <li key={index} className="flex items-start gap-2 text-slate-700 leading-relaxed font-semibold">
                            <Check className="w-4 h-4 text-cyan-600 mt-0.5 flex-shrink-0" />
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <button 
                      onClick={() => { setSelectedProduct(null); setActiveTab('contact'); }}
                      className="bg-cyan-600 hover:bg-cyan-500 text-white font-semibold text-xs px-5 py-3 rounded-xl shadow-lg w-full smooth-hover flex items-center justify-center gap-1.5"
                    >
                      <Mail className="w-4.5 h-4.5" />
                      {language === 'fr' ? 'Demander des tarifs grossistes' : 'Inquire for Wholesale Rates'}
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* FOOTER AREA */}
      <footer className="bg-slate-900 border-t border-slate-800 mt-auto text-slate-300 py-16">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-10">
          
          {/* Brief */}
          <div className="md:col-span-2 space-y-4">
            <button onClick={() => { setActiveTab('home'); window.scrollTo(0, 0); }} className="flex items-center gap-2.5 text-left text-white font-display text-lg font-bold">
              <img src="/images/logo.png" alt="CIOB" className="h-8 w-auto bg-white p-0.5 rounded-md" />
              <span>SOCIÉTÉ CIOB MAROC</span>
            </button>
            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              {t.aboutParagraph}
            </p>
            <div className="flex gap-3 text-cyan-500">
              <a href="https://www.facebook.com/TitanicProductionMaroc/" target="_blank" rel="noreferrer" className="p-2 bg-slate-800 rounded-lg hover:bg-cyan-600 hover:text-white smooth-hover leading-none text-sm">
                Facebook
              </a>
            </div>
          </div>

          {/* Links structure */}
          <div className="space-y-3.5 text-sm">
            <h4 className="text-white font-bold text-xs uppercase tracking-wider">{t.company}</h4>
            <div className="flex flex-col gap-2.5 text-xs">
              <button onClick={() => { setActiveTab('presentation'); window.scrollTo(0, 0); }} className="hover:text-cyan-400 text-left smooth-hover">{t.presentation}</button>
              <button onClick={() => { setActiveTab('knowhow'); window.scrollTo(0, 0); }} className="hover:text-cyan-400 text-left smooth-hover">{t.knowHow}</button>
              <a href="http://ciobmaroc.ma/ciob-politique-qualite.pdf" target="_blank" rel="noreferrer" className="hover:text-cyan-400 smooth-hover">{t.qualityPolicy}</a>
              <button onClick={() => { setActiveTab('recipes'); window.scrollTo(0, 0); }} className="hover:text-cyan-400 text-left smooth-hover">{t.recipes}</button>
            </div>
          </div>

          {/* Location details */}
          <div className="space-y-4 text-xs font-medium">
            <h4 className="text-white font-bold uppercase tracking-wider text-xs">{language === 'fr' ? 'Nous Trouver' : 'Find Us'}</h4>
            
            <div className="space-y-3">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                <a href="https://goo.gl/maps/JS6g2DAtoJzN8eNa7" target="_blank" rel="noreferrer" className="hover:text-cyan-400 smooth-hover text-slate-400 leading-relaxed">
                  {t.contactAddress}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Mail className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                <a href="mailto:ciob99@yahoo.fr" className="hover:text-cyan-400 font-mono text-slate-400">
                  {t.contactEmail}
                </a>
              </div>
              <div className="flex items-start gap-2.5">
                <Phone className="w-4 h-4 text-cyan-500 flex-shrink-0 mt-0.5" />
                <a href="tel:+212535729168" className="hover:text-cyan-400 font-mono text-slate-400">
                  {t.contactPhone}
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Outer footer strip */}
        <div className="max-w-7xl mx-auto px-4 border-t border-slate-800/80 mt-12 pt-6 flex flex-col md:flex-row justify-between text-caption text-[11px] text-slate-500 gap-4">
          <span>{t.copyright.replace('{year}', new Date().getFullYear().toString())}</span>
          <span>{t.designedWithLove}</span>
        </div>
      </footer>
    </div>
  );
}
