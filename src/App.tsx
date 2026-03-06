import React, { useState, useEffect } from 'react';
import { 
  Home, 
  Compass, 
  Bookmark, 
  User, 
  Search, 
  Hexagon, 
  ArrowRight, 
  ArrowLeft, 
  Share2, 
  ShieldCheck, 
  Bug, 
  Bot, 
  Zap,
  CheckCircle2,
  AlertCircle,
  Code2,
  ExternalLink,
  MessageSquare,
  PlayCircle,
  BookOpen,
  MapPin,
  Settings,
  Heart,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CASE_STUDIES } from './constants';
import { CaseStudy, Industry, UserProfile } from './types';

const IconMap: Record<string, any> = {
  ShieldCheck,
  Bug,
  Bot,
  Zap
};

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<'home' | 'detail' | 'saved' | 'discover' | 'profile'>('home');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [activeIndustry, setActiveIndustry] = useState<Industry>('All');
  const [savedIds, setSavedIds] = useState<string[]>(() => {
    const saved = localStorage.getItem('techimpact_saved');
    return saved ? JSON.parse(saved) : [];
  });
  const [profile, setProfile] = useState<UserProfile>(() => {
    const saved = localStorage.getItem('techimpact_profile');
    return saved ? JSON.parse(saved) : {
      name: 'Tech Explorer',
      location: 'San Francisco, CA',
      interests: ['Technology', 'Banking']
    };
  });

  useEffect(() => {
    localStorage.setItem('techimpact_saved', JSON.stringify(savedIds));
  }, [savedIds]);

  useEffect(() => {
    localStorage.setItem('techimpact_profile', JSON.stringify(profile));
  }, [profile]);

  const industries: Industry[] = ['All', 'Banking', 'Fintech', 'Healthcare', 'Retail', 'Manufacturing', 'Technology', 'Mining, Oil & Energy'];

  // Mouse drag to scroll functionality
  const scrollRef = React.useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: React.MouseEvent) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollRef.current) return;
    e.preventDefault();
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = (x - startX) * 2; // Scroll speed
    scrollRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleOpenDetail = (caseStudy: CaseStudy) => {
    setSelectedCase(caseStudy);
    setCurrentScreen('detail');
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    setCurrentScreen('home');
    setSelectedCase(null);
  };

  const toggleSave = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    setSavedIds(prev => 
      prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
    );
  };

  const filteredCases = CASE_STUDIES.filter(c => 
    activeIndustry === 'All' || c.industry === activeIndustry
  );

  const savedCases = CASE_STUDIES.filter(c => savedIds.includes(c.id));

  const recommendedCases = CASE_STUDIES.filter(c => 
    profile.interests.includes(c.industry)
  );

  const discoverCases = recommendedCases.length > 0 
    ? recommendedCases 
    : [...CASE_STUDIES].sort(() => 0.5 - Math.random()).slice(0, 5);

  return (
    <div className="min-h-screen bg-[#0f172a] text-white font-sans selection:bg-teal-500/30 overflow-x-hidden">
      <AnimatePresence mode="wait">
        {currentScreen === 'home' ? (
          <motion.div
            key="home"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="pb-24"
          >
            {/* Header */}
            <header className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Hexagon className="w-6 h-6 text-teal-500 fill-teal-500/20" />
                <h1 className="text-xl font-bold tracking-tight">TechImpact</h1>
              </div>
              <button className="p-2 hover:bg-white/5 rounded-full transition-colors">
                <Search className="w-5 h-5 text-slate-400" />
              </button>
            </header>

            <main className="px-6 pt-6 space-y-8">
              {/* Featured Card */}
              <section 
                className="relative rounded-[2.5rem] overflow-hidden aspect-[4/5] sm:aspect-video group cursor-pointer bg-gradient-to-br from-indigo-950 via-blue-900 to-slate-950 border border-white/10 shadow-2xl"
                onClick={() => handleOpenDetail(CASE_STUDIES[0])}
              >
                {/* Technical Pattern Overlay */}
                <div 
                  className="absolute inset-0 opacity-20 mix-blend-overlay"
                  style={{ 
                    backgroundImage: `url('https://www.transparenttextures.com/patterns/circuit-board.png')`,
                    backgroundSize: '400px'
                  }}
                />
                
                <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-center">
                  <div className="mb-4 sm:mb-6">
                    <div className="inline-flex items-center gap-2 px-3 py-1 sm:px-4 sm:py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/10 text-[9px] sm:text-[10px] font-bold uppercase tracking-widest">
                      <span className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_8px_rgba(74,222,128,0.6)]" />
                      Featured Case Study
                    </div>
                  </div>
                  
                  <h2 className="text-5xl sm:text-7xl font-black mb-2 tracking-tighter leading-none">
                    {CASE_STUDIES[0].impactValue}
                  </h2>
                  <p className="text-xl sm:text-2xl font-bold text-white mb-4 sm:mb-6">
                    {CASE_STUDIES[0].impactLabel} Achieved
                  </p>
                  
                  <p className="text-slate-300 text-xs sm:text-sm max-w-xs mb-6 sm:mb-8 leading-relaxed opacity-80 line-clamp-3 sm:line-clamp-none">
                    {CASE_STUDIES[0].description}
                  </p>
                  
                  <button className="flex items-center justify-center gap-2 w-fit px-10 py-4 bg-teal-600 hover:bg-teal-500 transition-all rounded-2xl font-bold text-white shadow-xl shadow-teal-900/40 active:scale-[0.98]">
                    Read Full Story
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>

                {/* Decorative Glow */}
                <div className="absolute -bottom-24 -right-24 w-64 h-64 bg-teal-500/20 blur-[100px] rounded-full" />
                <div className="absolute -top-24 -left-24 w-64 h-64 bg-blue-500/20 blur-[100px] rounded-full" />
              </section>

              {/* Industries */}
              <section>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg">Industries</h3>
                  <button className="text-sm text-teal-500 font-medium hover:underline">View all</button>
                </div>
                <div 
                  ref={scrollRef}
                  onMouseDown={handleMouseDown}
                  onMouseLeave={handleMouseLeave}
                  onMouseUp={handleMouseUp}
                  onMouseMove={handleMouseMove}
                  className={`flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 no-scrollbar cursor-grab active:cursor-grabbing select-none ${isDragging ? 'pointer-events-none' : ''}`}
                >
                  {industries.map((industry) => (
                    <button
                      key={industry}
                      onClick={() => !isDragging && setActiveIndustry(industry)}
                      className={`flex-none px-6 py-2.5 rounded-full font-medium text-sm transition-all border ${
                        activeIndustry === industry
                          ? 'bg-white text-slate-900 border-white'
                          : 'bg-white/5 text-slate-400 border-white/5 hover:border-white/20'
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </section>

              {/* Partner Ecosystem */}
              <section className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-lg">Partner Ecosystem</h3>
                  <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">Trusted by Leaders</span>
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-3 sm:gap-4">
                  {['qactions.com', 'tricentis.com', 'hcaptcha.com', 'veracode.com', 'automationanywhere.com', 'synthesized.io', 'sap.com', 'microsoft.com'].map((domain) => (
                    <div key={domain} className="aspect-square rounded-xl sm:rounded-2xl bg-white/5 border border-white/5 flex items-center justify-center p-2 sm:p-3 hover:bg-white/10 transition-all group">
                      <img 
                        src={`https://logo.clearbit.com/${domain}`} 
                        alt={domain} 
                        className="max-h-full max-w-full opacity-40 group-hover:opacity-100 transition-opacity grayscale group-hover:grayscale-0"
                        referrerPolicy="no-referrer"
                      />
                    </div>
                  ))}
                </div>
              </section>

              {/* Latest Transformations */}
              <section className="space-y-6">
                <h3 className="font-semibold text-lg">Latest Transformations</h3>
                <div className="grid gap-4">
                  {filteredCases.map((item) => {
                    const Icon = IconMap[item.icon] || Zap;
                    return (
                      <article 
                        key={item.id}
                        onClick={() => handleOpenDetail(item)}
                        className="group relative rounded-3xl bg-white/5 border border-white/5 p-6 hover:bg-white/[0.08] transition-all cursor-pointer active:scale-[0.98]"
                      >
                        <div className="flex justify-between items-start mb-6">
                          <div className="flex items-center gap-3">
                            <div className={`p-3 rounded-2xl bg-${item.color}-500/10 text-${item.color}-400`}>
                              <Icon className="w-6 h-6" />
                            </div>
                            {item.brandLogo && (
                              <img src={item.brandLogo} alt="Brand" className="h-6 opacity-80 rounded" referrerPolicy="no-referrer" />
                            )}
                            {item.logo && (
                              <img src={item.logo} alt="Logo" className="h-6 opacity-80" referrerPolicy="no-referrer" />
                            )}
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/5 px-3 py-1 rounded-full">
                              {item.category}
                            </span>
                            <button 
                              onClick={(e) => toggleSave(e, item.id)}
                              className="p-2 rounded-full hover:bg-white/10 transition-all"
                            >
                              <Bookmark className={`w-4 h-4 ${savedIds.includes(item.id) ? 'fill-teal-500 text-teal-500' : 'text-slate-500'}`} />
                            </button>
                          </div>
                        </div>
                        <h4 className="text-xl font-bold mb-2 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent transition-opacity group-hover:opacity-80">{item.title}</h4>
                        <p className="text-sm text-slate-400 mb-6 line-clamp-2 leading-relaxed">
                          {item.description}
                        </p>
                        <div className="flex items-center gap-6">
                          {item.metrics.map((metric, idx) => (
                            <React.Fragment key={idx}>
                              <div className="flex flex-col">
                                <span className="text-teal-400 text-lg font-bold">{metric.value}</span>
                                <span className="text-slate-500 text-[10px] font-bold uppercase tracking-wider">{metric.label}</span>
                              </div>
                              {idx === 0 && <div className="w-px h-8 bg-white/10" />}
                            </React.Fragment>
                          ))}
                        </div>
                      </article>
                    );
                  })}
                </div>
              </section>
            </main>
          </motion.div>
        ) : currentScreen === 'saved' ? (
          <motion.div
            key="saved"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-24"
          >
            <header className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
              <h1 className="text-xl font-bold tracking-tight">Saved Cases</h1>
            </header>
            <main className="px-6 pt-6 space-y-4">
              {savedCases.length === 0 ? (
                <div className="text-center py-20 text-slate-500">
                  <Bookmark className="w-12 h-12 mx-auto mb-4 opacity-20" />
                  <p>No saved case studies yet.</p>
                </div>
              ) : (
                savedCases.map((item) => {
                  const Icon = IconMap[item.icon] || Zap;
                  return (
                    <article 
                      key={item.id}
                      onClick={() => handleOpenDetail(item)}
                      className="group relative rounded-3xl bg-white/5 border border-white/5 p-6 hover:bg-white/[0.08] transition-all cursor-pointer"
                    >
                      <div className="flex justify-between items-start mb-4">
                        <div className="flex items-center gap-3">
                          <div className={`p-2.5 rounded-xl bg-${item.color}-500/10 text-${item.color}-400`}>
                            <Icon className="w-5 h-5" />
                          </div>
                          {item.brandLogo && (
                            <img src={item.brandLogo} alt="Brand" className="h-5 opacity-80 rounded" referrerPolicy="no-referrer" />
                          )}
                        </div>
                        <button 
                          onClick={(e) => toggleSave(e, item.id)}
                          className="p-2 rounded-full hover:bg-white/10 transition-all"
                        >
                          <Bookmark className="w-4 h-4 fill-teal-500 text-teal-500" />
                        </button>
                      </div>
                      <h4 className="text-lg font-bold mb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{item.title}</h4>
                      <p className="text-xs text-slate-500 uppercase tracking-wider font-bold mb-3">{item.industry} • {item.category}</p>
                      <p className="text-sm text-slate-400 line-clamp-2">{item.description}</p>
                    </article>
                  );
                })
              )}
            </main>
          </motion.div>
        ) : currentScreen === 'discover' ? (
          <motion.div
            key="discover"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-24"
          >
            <header className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 px-6 py-4">
              <h1 className="text-xl font-bold tracking-tight">Discover</h1>
            </header>
            <main className="px-6 pt-6 space-y-8">
              <div className="bg-teal-500/10 border border-teal-500/20 rounded-3xl p-6 flex items-center gap-4">
                <div className="p-3 bg-teal-500 rounded-2xl">
                  <Sparkles className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="font-bold">Personalized for you</h3>
                  <p className="text-sm text-slate-400">Based on your interests in {profile.interests.join(', ')}</p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="font-semibold text-lg">Recommended for You</h3>
                <div className="grid gap-4">
                  {discoverCases.map((item) => {
                    const Icon = IconMap[item.icon] || Zap;
                    return (
                      <article 
                        key={item.id}
                        onClick={() => handleOpenDetail(item)}
                        className="group relative rounded-3xl bg-white/5 border border-white/5 p-6 hover:bg-white/[0.08] transition-all cursor-pointer"
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex items-center gap-3">
                            <div className={`p-2.5 rounded-xl bg-${item.color}-500/10 text-${item.color}-400`}>
                              <Icon className="w-5 h-5" />
                            </div>
                            {item.brandLogo && (
                              <img src={item.brandLogo} alt="Brand" className="h-5 opacity-80 rounded" referrerPolicy="no-referrer" />
                            )}
                          </div>
                          <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500 bg-white/5 px-3 py-1 rounded-full">
                            {item.category}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold mb-1 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">{item.title}</h4>
                        <p className="text-sm text-slate-400 line-clamp-2">{item.description}</p>
                      </article>
                    );
                  })}
                </div>
              </div>
            </main>
          </motion.div>
        ) : currentScreen === 'profile' ? (
          <motion.div
            key="profile"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pb-24"
          >
            <header className="sticky top-0 z-50 bg-[#0f172a]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
              <h1 className="text-xl font-bold tracking-tight">Profile</h1>
              <button className="p-2 hover:bg-white/5 rounded-full">
                <Settings className="w-5 h-5 text-slate-400" />
              </button>
            </header>
            <main className="px-6 pt-8 space-y-10">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-teal-500 to-purple-500 p-1">
                  <div className="w-full h-full rounded-full bg-[#0f172a] flex items-center justify-center">
                    <User className="w-10 h-10 text-teal-500" />
                  </div>
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{profile.name}</h2>
                  <p className="text-slate-400 flex items-center justify-center gap-1 text-sm">
                    <MapPin className="w-3 h-3" /> {profile.location}
                  </p>
                </div>
              </div>

              <section className="space-y-4">
                <h3 className="font-semibold text-lg flex items-center gap-2">
                  <Heart className="w-5 h-5 text-red-500" /> My Interests
                </h3>
                <div className="flex flex-wrap gap-2">
                  {industries.filter(i => i !== 'All').map((industry) => (
                    <button
                      key={industry}
                      onClick={() => {
                        setProfile(prev => ({
                          ...prev,
                          interests: prev.interests.includes(industry)
                            ? prev.interests.filter(i => i !== industry)
                            : [...prev.interests, industry]
                        }));
                      }}
                      className={`px-4 py-2 rounded-full text-xs font-bold transition-all border ${
                        profile.interests.includes(industry)
                          ? 'bg-teal-500 text-white border-teal-500'
                          : 'bg-white/5 text-slate-400 border-white/5'
                      }`}
                    >
                      {industry}
                    </button>
                  ))}
                </div>
              </section>

              <section className="space-y-2">
                <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <Bookmark className="w-5 h-5 text-teal-500" />
                    <span className="font-medium">Saved Case Studies</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-slate-500 text-sm">{savedIds.length}</span>
                    <ChevronRight className="w-4 h-4 text-slate-500" />
                  </div>
                </button>
                <button className="w-full flex items-center justify-between p-4 bg-white/5 rounded-2xl hover:bg-white/10 transition-all">
                  <div className="flex items-center gap-3">
                    <Zap className="w-5 h-5 text-purple-500" />
                    <span className="font-medium">Account Settings</span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-500" />
                </button>
              </section>
            </main>
          </motion.div>
        ) : (
          <motion.div
            key="detail"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="pb-24 min-h-screen bg-[#f5f3db] text-slate-900"
          >
            {/* Detail Header */}
            <header className="sticky top-0 z-50 bg-[#f5f3db]/80 backdrop-blur-md border-b border-black/5 px-6 py-4 flex items-center justify-between">
              <button onClick={handleBack} className="p-2 -ml-2 hover:bg-black/5 rounded-full transition-colors">
                <ArrowLeft className="w-5 h-5" />
              </button>
              <h2 className="text-xs font-bold uppercase tracking-[0.4em] text-slate-400">Case Study</h2>
              <button className="p-2 -mr-2 hover:bg-black/5 rounded-full transition-colors">
                <Share2 className="w-5 h-5" />
              </button>
            </header>

            <main className="px-6 py-8 space-y-10">
              {/* Top Info */}
              <div className="space-y-8">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 bg-white p-3 rounded-[1.5rem] shadow-sm border border-black/5 pr-8">
                    <div className="w-12 h-12 rounded-2xl bg-teal-50 flex items-center justify-center text-teal-600">
                      <Hexagon className="w-6 h-6" />
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-0.5">Industry</p>
                      <p className="font-black text-base text-slate-900 leading-none">{selectedCase?.industry}</p>
                    </div>
                  </div>
                  <div className="w-12 h-12 rounded-full bg-white border border-black/5 flex items-center justify-center shadow-sm text-purple-600">
                    {selectedCase && React.createElement(IconMap[selectedCase.icon] || Zap, { className: "w-6 h-6" })}
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-teal-50 border border-teal-100 text-teal-600">
                    <Zap className="w-3 h-3 fill-teal-600" />
                    <span className="text-[10px] font-black uppercase tracking-widest">{selectedCase?.category}</span>
                  </div>
                  <h1 className="text-4xl sm:text-6xl font-black tracking-tighter leading-[0.85] bg-gradient-to-br from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {selectedCase?.subtitle.split(' ').map((word, i) => (
                      <React.Fragment key={i}>
                        {word} {i === 0 && <br />}
                      </React.Fragment>
                    ))}
                  </h1>
                  <p className="text-xl text-slate-500 font-medium leading-relaxed">
                    {selectedCase?.description}
                  </p>
                </div>
              </div>

              {/* Gallery Section */}
              {selectedCase?.gallery && selectedCase.gallery.length > 0 && (
                <section className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-xl">Visual Insights</h3>
                    <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Conceptual Previews</span>
                  </div>
                  <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 no-scrollbar">
                    {selectedCase.gallery.map((img, i) => (
                      <div key={i} className="flex-none w-72 aspect-video rounded-3xl overflow-hidden border border-black/5 shadow-sm bg-white">
                        <img 
                          src={img} 
                          alt={`Gallery ${i}`} 
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                          referrerPolicy="no-referrer"
                        />
                      </div>
                    ))}
                  </div>
                </section>
              )}

              {/* QActions Specific Links */}
              {selectedCase?.links && (
                <section className="grid grid-cols-3 gap-3">
                  {selectedCase.links.blog && (
                    <a href={selectedCase.links.blog} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-black/5 shadow-sm hover:border-teal-500 transition-all">
                      <BookOpen className="w-5 h-5 text-teal-600" />
                      <span className="text-[10px] font-bold uppercase">Blog</span>
                    </a>
                  )}
                  {selectedCase.links.demo && (
                    <a href={selectedCase.links.demo} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 bg-teal-600 rounded-2xl border border-teal-500 shadow-sm hover:bg-teal-700 transition-all text-white">
                      <PlayCircle className="w-5 h-5" />
                      <span className="text-[10px] font-bold uppercase">Demo</span>
                    </a>
                  )}
                  {selectedCase.links.contact && (
                    <a href={selectedCase.links.contact} target="_blank" rel="noopener noreferrer" className="flex flex-col items-center gap-2 p-4 bg-white rounded-2xl border border-black/5 shadow-sm hover:border-teal-500 transition-all">
                      <MessageSquare className="w-5 h-5 text-teal-600" />
                      <span className="text-[10px] font-bold uppercase">Contact</span>
                    </a>
                  )}
                </section>
              )}

              {/* Challenge Section */}
              <section className="bg-white rounded-3xl p-8 shadow-sm border border-black/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full -z-0" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center text-red-600">
                      <AlertCircle className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-xl">The Challenge</h3>
                  </div>
                  <ul className="space-y-5">
                    {selectedCase?.challenge.map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <div className="w-1.5 h-1.5 rounded-full bg-slate-300 mt-2 flex-shrink-0" />
                        <p className="text-sm text-slate-600 leading-relaxed">{item}</p>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Solution Section */}
              <section className="bg-white rounded-3xl p-8 shadow-sm border border-black/5 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-teal-50 rounded-bl-full -z-0" />
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-8 h-8 rounded-full bg-teal-100 flex items-center justify-center text-teal-600">
                      <CheckCircle2 className="w-4 h-4" />
                    </div>
                    <h3 className="font-bold text-xl">The Solution</h3>
                  </div>
                  <ul className="space-y-6">
                    {selectedCase?.solution.map((item, i) => (
                      <li key={i} className="flex items-start gap-4">
                        <div className="w-5 h-5 rounded-full bg-teal-50 flex items-center justify-center text-teal-600 flex-shrink-0 mt-0.5">
                          <span className="text-xs font-bold">+</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-900 mb-1">{item.title}</p>
                          <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </section>

              {/* Metrics Grid */}
              <section className="grid grid-cols-2 gap-4">
                {selectedCase?.metrics.map((metric, i) => (
                  <div key={i} className="bg-white p-6 rounded-3xl border border-black/5 text-center shadow-sm">
                    <p className={`text-3xl font-black mb-1 ${i === 0 ? 'text-teal-600' : 'text-purple-600'}`}>
                      {metric.value}
                    </p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">{metric.label}</p>
                  </div>
                ))}
              </section>
            </main>

            {/* Sticky Action */}
            <div className="fixed bottom-0 left-0 right-0 p-6 bg-[#f5f3db]/80 backdrop-blur-xl border-t border-black/5 z-50">
              <button className="w-full bg-gradient-to-b from-slate-100 to-slate-300 py-4 rounded-2xl font-bold text-slate-900 flex items-center justify-center gap-3 shadow-lg border border-white/50 active:scale-[0.98] transition-all">
                <Code2 className="w-5 h-5" />
                View Technical Specs
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Nav */}
      <nav className="fixed bottom-0 w-full bg-[#0f172a]/90 backdrop-blur-xl border-t border-white/5 pb-8 pt-4 px-8 z-50">
        <div className="flex justify-between items-center max-w-md mx-auto">
          <NavItem 
            icon={<Home className="w-6 h-6" />} 
            label="Home" 
            active={currentScreen === 'home'} 
            onClick={() => setCurrentScreen('home')}
          />
          <NavItem 
            icon={<Compass className="w-6 h-6" />} 
            label="Discover" 
            active={currentScreen === 'discover'}
            onClick={() => setCurrentScreen('discover')}
          />
          <NavItem 
            icon={<Bookmark className="w-6 h-6" />} 
            label="Saved" 
            active={currentScreen === 'saved'} 
            onClick={() => setCurrentScreen('saved')}
          />
          <NavItem 
            icon={<User className="w-6 h-6" />} 
            label="Profile" 
            active={currentScreen === 'profile'}
            onClick={() => setCurrentScreen('profile')}
          />
        </div>
      </nav>
    </div>
  );
}

function NavItem({ icon, label, active = false, onClick }: { icon: React.ReactNode, label: string, active?: boolean, onClick?: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 transition-colors ${active ? 'text-teal-500' : 'text-slate-500 hover:text-slate-300'}`}
    >
      {icon}
      <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
      {active && <motion.div layoutId="nav-dot" className="w-1 h-1 rounded-full bg-teal-500 mt-0.5" />}
    </button>
  );
}
