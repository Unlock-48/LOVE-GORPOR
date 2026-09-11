import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Heart, 
  Camera, 
  Sparkles, 
  Plus, 
  X, 
  Volume2, 
  VolumeX, 
  Image as ImageIcon,
  Quote,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Bookmark,
  CloudSun,
  Maximize2
} from 'lucide-react';
import { FEATURE_ITEMS } from './data/showcase';
import { ALL_MEMORIES, type MemoryPlace } from './data/memories';

const GlobalStyles = () => (
  <style>{`
    @import url('https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Inter:wght@300;400;500;600&display=swap');

    :root {
      --background: 201 100% 13%;
      --foreground: 0 0% 100%;
      --muted-foreground: 240 4% 66%;
      --primary: 0 0% 100%;
      --primary-foreground: 0 0% 4%;
      --secondary: 0 0% 10%;
      --muted: 0 0% 10%;
      --accent: 0 0% 10%;
      --border: 0 0% 18%;
      --input: 0 0% 18%;
      --font-display: 'Instrument Serif', serif;
      --font-body: 'Inter', sans-serif;
    }

    /* ซ่อน Scrollbar ทั้งหมดของเบราว์เซอร์อย่างสมบูรณ์ */
    html, body {
      font-family: var(--font-body);
      background-color: hsl(var(--background));
      color: hsl(var(--foreground));
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      overflow-x: hidden;
      margin: 0;
      padding: 0;
      scrollbar-width: none !important; /* Firefox */
      -ms-overflow-style: none !important; /* IE/Edge */
    }

    body {
      min-width: 320px;
    }

    ::-webkit-scrollbar {
      display: none !important;
      width: 0px !important;
      height: 0px !important;
    }

    * {
      scrollbar-width: none !important;
      -ms-overflow-style: none !important;
    }
    *::-webkit-scrollbar {
      display: none !important;
      width: 0px !important;
      height: 0px !important;
    }

    .font-serif-instrument {
      font-family: var(--font-display);
    }

    /* Liquid Glass Effect */
    .liquid-glass {
      background: rgba(255, 255, 255, 0.03);
      background-blend-mode: luminosity;
      backdrop-filter: blur(16px);
      -webkit-backdrop-filter: blur(16px);
      border: none;
      box-shadow: inset 0 1px 1px rgba(255, 255, 255, 0.2), 0 20px 40px -15px rgba(0, 0, 0, 0.5);
      position: relative;
      overflow: hidden;
      transition: all 0.35s cubic-bezier(0.16, 1, 0.3, 1);
    }

    .liquid-glass::before {
      content: '';
      position: absolute;
      inset: 0;
      border-radius: inherit;
      padding: 1.4px;
      background: linear-gradient(
        180deg,
        rgba(255, 255, 255, 0.5) 0%,
        rgba(255, 255, 255, 0.18) 22%,
        rgba(255, 255, 255, 0) 42%,
        rgba(255, 255, 255, 0) 60%,
        rgba(255, 255, 255, 0.18) 80%,
        rgba(255, 255, 255, 0.5) 100%
      );
      -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
      -webkit-mask-composite: xor;
      mask-composite: exclude;
      pointer-events: none;
    }

    /* Animation Keyframes */
    @keyframes fade-rise {
      from {
        opacity: 0;
        transform: translateY(24px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }

    @keyframes slide-in-smooth {
      from {
        opacity: 0;
        transform: scale(0.97) translateY(8px);
      }
      to {
        opacity: 1;
        transform: scale(1) translateY(0);
      }
    }

    .animate-fade-rise {
      animation: fade-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) both;
    }
    .animate-fade-rise-delay {
      animation: fade-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.2s both;
    }
    .animate-fade-rise-delay-2 {
      animation: fade-rise 0.8s cubic-bezier(0.16, 1, 0.3, 1) 0.4s both;
    }
    .animate-slide-smooth {
      animation: slide-in-smooth 0.45s cubic-bezier(0.16, 1, 0.3, 1) both;
    }

    @media (min-width: 1024px) and (max-width: 1440px) {
      .responsive-shell {
        max-width: 56rem;
      }
    }

    @media (min-width: 1024px) and (max-height: 820px) {
      #memories {
        padding-top: 5.5rem;
        padding-bottom: 2.5rem;
      }

      #memories .memories-card {
        min-height: 420px;
        padding: 1.75rem;
      }

      #memories .memories-list {
        max-height: 420px;
      }
    }

    @media (max-width: 1023px) {
      .responsive-shell {
        max-width: 100%;
      }

      #showcase,
      #memories {
        min-height: auto;
        justify-content: flex-start;
      }
    }

    @media (max-width: 767px) {
      .site-nav {
        padding-top: max(0.75rem, env(safe-area-inset-top));
        padding-right: max(1rem, env(safe-area-inset-right));
        padding-left: max(1rem, env(safe-area-inset-left));
      }

      .site-nav > a {
        min-width: 0;
      }

      .site-nav > a > span:first-child {
        font-size: 1.75rem;
      }

      .site-nav > div {
        gap: 0.5rem;
      }

      .site-nav > div > button:last-child {
        padding: 0.5rem 0.75rem;
        font-size: 0.7rem;
      }

      .hero-title {
        font-size: clamp(2.75rem, 13vw, 4.5rem);
        letter-spacing: -0.06em;
      }

      .hero-copy {
        font-size: 0.875rem;
        margin-top: 1.5rem;
      }

      #memories {
        padding-top: 6.5rem;
        padding-right: 1rem;
        padding-bottom: 3rem;
        padding-left: 1rem;
      }

      #memories .memories-card {
        min-height: 430px;
        padding: 1.25rem;
        border-radius: 1.5rem;
      }

      #memories .memories-card h3 {
        font-size: 1.75rem;
      }

      #memories .memories-card > div:last-child > div {
        padding: 0.75rem;
      }

      #memories .memories-list {
        max-height: min(560px, calc(100svh - 14rem));
        overflow-y: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
      }

      #memories .memories-list > div {
        padding: 0.65rem;
        gap: 0.65rem;
      }

      #memories .memories-list > div > div:first-child {
        width: 4rem;
        height: 4rem;
      }

      #memories .memories-list h4 {
        font-size: 0.8rem;
      }

      #memories .memories-list p {
        font-size: 0.7rem;
      }
    }

    @media (min-width: 768px) and (max-width: 1023px) {
      #memories {
        padding-top: 7rem;
        padding-bottom: 3rem;
      }

      #memories .memories-card {
        min-height: 480px;
      }

      #memories .memories-list {
        max-height: min(560px, calc(100svh - 18rem));
        overflow-y: auto;
        overscroll-behavior: contain;
        -webkit-overflow-scrolling: touch;
      }
    }

    @media (prefers-reduced-motion: reduce) {
      *, *::before, *::after {
        scroll-behavior: auto !important;
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
      }
    }
  `}</style>
);

interface NavbarProps {
  onScrollTo: (id: string) => void;
  activeSection: string;
  isAudioPlaying: boolean;
  toggleAudio: () => void;
}

const Navigation: React.FC<NavbarProps> = ({ onScrollTo, activeSection, isAudioPlaying, toggleAudio }) => {
  return (
    <nav className="site-nav responsive-shell fixed top-0 left-0 right-0 z-50 flex row justify-between items-center px-6 sm:px-10 py-5 max-w-7xl mx-auto w-full transition-all">
      <a 
        href="#" 
        onClick={(e) => { e.preventDefault(); onScrollTo('hero'); }}
        className="flex items-center gap-1 group focus:outline-none"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        <span className="text-3xl sm:text-4xl tracking-tight text-[hsl(var(--foreground))] transition-opacity group-hover:opacity-90">
          Gorpor <sup className="text-xs font-sans ml-0.5 tracking-normal">𑣲⋆</sup>
        </span>
        <span className="text-xs font-sans uppercase tracking-[0.25em] text-[hsl(var(--muted-foreground))] ml-2.5 hidden sm:inline-block border-l border-white/20 pl-3">
          Memories & Us
        </span>
      </a>

      <div className="hidden md:flex items-center gap-7 bg-black/40 backdrop-blur-xl px-6 py-2.5 rounded-full border border-white/10 shadow-lg">
        {[
          { id: 'hero', label: 'Home' },
          { id: 'counter', label: 'Anniversary' },
          { id: 'showcase', label: 'Showcase' },
          { id: 'memories', label: 'Memories' },
          { id: 'letter', label: 'Our Story' },
        ].map((link) => {
          const isActive = activeSection === link.id;
          return (
            <button
              key={link.id}
              type="button"
              onClick={() => onScrollTo(link.id)}
              className={`text-xs uppercase tracking-wider transition-all duration-300 relative py-1 cursor-pointer font-medium ${
                isActive 
                  ? 'text-white' 
                  : 'text-white/50 hover:text-white/90'
              }`}
            >
              {link.label}
              {isActive && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r from-rose-400 to-rose-200 rounded-full" />
              )}
            </button>
          );
        })}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={toggleAudio}
          title={isAudioPlaying ? "Mute soundtrack" : "Play romantic melody"}
          className="liquid-glass rounded-full p-2.5 text-[hsl(var(--foreground))] hover:scale-[1.06] transition-transform flex items-center justify-center cursor-pointer"
        >
          {isAudioPlaying ? <Volume2 size={16} className="text-rose-300" /> : <VolumeX size={16} className="text-white/60" />}
        </button>

        <button
          type="button"
          onClick={() => onScrollTo('counter')}
          className="liquid-glass rounded-full px-5 sm:px-6 py-2 sm:py-2.5 text-xs sm:text-sm text-[hsl(var(--foreground))] hover:scale-[1.03] transition-transform duration-300 font-medium cursor-pointer flex items-center gap-2"
        >
          <span>Begin Journey</span>
          <Heart size={14} className="text-rose-300 fill-rose-300/40" />
        </button>
      </div>
    </nav>
  );
};

const AnniversaryCounter: React.FC = () => {
  // กำหนดวันเริ่มต้นคบกัน (10 กรกฎาคม 2026) ระบบจะคำนวณจำนวนวันสะสม (62 วัน) ให้อัตโนมัติเบื้องหลัง
  const [anniversaryDate] = useState<string>('2026-07-10T00:00:00');
  const [elapsed, setElapsed] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTime = () => {
      const start = new Date(anniversaryDate);
      const now = new Date();
      const difference = Math.max(0, now.getTime() - start.getTime());

      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / 1000 / 60) % 60);
      const seconds = Math.floor((difference / 1000) % 60);

      setElapsed({ days, hours, minutes, seconds });
    };

    calculateTime();
    const timer = setInterval(calculateTime, 1000);
    return () => clearInterval(timer);
  }, [anniversaryDate]);

  return (
    <section id="counter" className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center px-6 py-20">
      <div className="liquid-glass rounded-3xl p-8 sm:p-14 text-center relative overflow-hidden max-w-5xl w-full shadow-2xl">
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="flex items-center justify-center gap-2 mb-4">
          <Sparkles size={16} className="text-rose-300/80" />
          <span className="text-xs uppercase tracking-[0.25em] text-[hsl(var(--muted-foreground))] font-medium">
            Time In Love & Harmony
          </span>
          <Sparkles size={16} className="text-rose-300/80" />
        </div>

        <h2 
          className="text-3xl sm:text-5xl md:text-6xl text-white font-normal mb-5 tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          Counting Every Quiet <em className="not-italic text-rose-200/90 font-serif-instrument">Heartbeat</em> With You
        </h2>

        <p className="text-[hsl(var(--muted-foreground))] text-sm sm:text-base max-w-xl mx-auto mb-10 leading-relaxed font-light">
          Every second spent in your warmth feels like finding peace in a hurried world.
        </p>

        {/* Counter Grid 4 กล่องคลีนๆ สไตล์มินิมอล */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto">
          {[
            { label: 'Days', value: elapsed.days },
            { label: 'Hours', value: elapsed.hours },
            { label: 'Minutes', value: elapsed.minutes },
            { label: 'Seconds', value: elapsed.seconds },
          ].map((item, idx) => (
            <div 
              key={idx}
              className="bg-white/[0.02] border border-white/10 rounded-2xl p-4 sm:p-6 backdrop-blur-md flex flex-col items-center justify-center relative group hover:border-white/20 transition-colors"
            >
              <span 
                className="text-4xl sm:text-5xl md:text-6xl font-normal text-white tabular-nums tracking-tight"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {String(item.value).padStart(2, '0')}
              </span>
              <span className="text-[11px] uppercase tracking-widest text-[hsl(var(--muted-foreground))] mt-2 font-medium">
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const DriftLogo = ({ size = 32, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={size}
    height={size}
    viewBox="0 0 256 256"
    fill="none"
    className="flex-shrink-0"
  >
    <path
      d="M 256 256 L 178 256 C 150.386 256 128 233.614 128 206 L 128 256 L 0 256 L 0 192 C 0 156.654 28.654 128 64 128 C 99.346 128 128 156.654 128 192 L 128 128 L 256 128 Z M 78 0 C 105.614 0 128 22.386 128 50 L 128 0 L 256 0 L 256 64 C 256 99.346 227.346 128 192 128 C 156.654 128 128 99.346 128 64 L 128 128 L 0 128 L 0 0 Z"
      fill={color}
    />
  </svg>
);

interface DriftShowcaseProps {
  activeIdx: number;
  onChangeIdx: (index: number) => void;
}

const DriftShowcaseSection: React.FC<DriftShowcaseProps> = ({ activeIdx, onChangeIdx }) => {
  const currentItem = FEATURE_ITEMS[activeIdx] || FEATURE_ITEMS[0];
  const featureListRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const activeButton = featureListRef.current?.querySelector<HTMLButtonElement>(
      `button[data-feature-index="${activeIdx}"]`,
    );
    activeButton?.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
  }, [activeIdx]);

  return (
    <section id="showcase" className="relative z-10 min-h-screen w-full flex flex-col justify-center max-w-7xl mx-auto px-5 md:px-10 lg:px-12 py-20">
      <div className="grid grid-cols-1 lg:grid-cols-[420px_1fr] xl:grid-cols-[460px_1fr] gap-10 lg:gap-16 items-center">
        <div className="flex flex-col gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-xs text-rose-200 font-medium tracking-wide mb-4">
              <span className="w-2 h-2 rounded-full bg-rose-400 animate-pulse" />
              <span>Our Little Story</span>
            </div>

            <h2 
              className="text-3xl sm:text-4xl lg:text-5xl font-normal text-white tracking-tight leading-[1.15]"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              A love that grows with every moment, <br className="hidden sm:inline" />
              <span className="text-white/60 font-serif-instrument italic">always with you</span>
            </h2>

            <p className="text-white/70 text-sm sm:text-base mt-3 leading-relaxed font-light">
              Watch our favorite moments unfold, one memory at a time.
            </p>
          </div>

          <nav
            ref={featureListRef}
            className="flex max-h-[19rem] flex-col gap-2.5 overflow-y-auto overscroll-contain pr-1"
            aria-label="Feature navigation"
            onWheel={(event) => event.stopPropagation()}
          >
            {FEATURE_ITEMS.map((item, idx) => {
              const isActive = activeIdx === idx;
              return (
                <button
                  key={item.id}
                  data-feature-index={idx}
                  type="button"
                  onClick={() => onChangeIdx(idx)}
                  className={`w-full text-left px-5 py-4 rounded-2xl transition-all duration-300 flex items-center justify-between border cursor-pointer ${
                    isActive
                      ? 'bg-white text-black border-white shadow-xl scale-[1.02]'
                      : 'bg-white/[0.04] text-white/70 border-white/10 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3.5">
                    <span
                      className={`text-xs font-mono font-bold ${
                        isActive ? 'text-rose-600' : 'text-white/40'
                      }`}
                    >
                      {item.step}
                    </span>
                    <span className="text-sm font-medium tracking-tight">
                      {item.title}
                    </span>
                  </div>
                  <ChevronRight
                    size={16}
                    className={`transition-transform duration-300 ${
                      isActive ? 'translate-x-1 text-black' : 'text-white/30'
                    }`}
                  />
                </button>
              );
            })}
          </nav>
        </div>

        <div className="liquid-glass rounded-3xl p-6 sm:p-10 shadow-2xl flex flex-col gap-5 border border-white/15 animate-slide-smooth">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <DriftLogo size={28} color="#FFF" />
              <span className="text-xs uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-rose-200/90 font-medium">
                {currentItem.tag}
              </span>
            </div>
            <span className="font-mono text-sm text-white/40 tracking-wider">
              Phase {currentItem.step}
            </span>
          </div>

          <div>
            <h3 
              className="text-2xl md:text-3xl font-normal text-white tracking-tight"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              {currentItem.title}
            </h3>
            <p className="text-sm text-white/50 mt-1">{currentItem.subtitle}</p>
          </div>

          <div className="aspect-video w-full rounded-2xl overflow-hidden bg-black/50 border border-white/10 shadow-inner relative group">
            <video
              key={currentItem.videoUrl}
              src={currentItem.videoUrl}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-contain bg-black"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none" />
          </div>

          <p className="text-white/70 text-sm md:text-base leading-relaxed font-light">
            {currentItem.description}
          </p>
        </div>
      </div>
    </section>
  );
};

interface DestinationExplorerProps {
  activeIndex: number;
  onSelectIndex: (index: number) => void;
  memories: MemoryPlace[];
  onAddMemory: (memory: MemoryPlace) => void;
  onToggleLike: (id: string) => void;
}

const DestinationExplorer: React.FC<DestinationExplorerProps> = ({
  activeIndex,
  onSelectIndex,
  memories,
  onAddMemory,
  onToggleLike
}) => {
  const [isAddingOpen, setIsAddingOpen] = useState<boolean>(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  // Form state
  const [newTitle, setNewTitle] = useState('');
  const [newSubtitle, setNewSubtitle] = useState('');
  const [newLocation, setNewLocation] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newImageUrl, setNewImageUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const activeMemory = memories[activeIndex] || memories[0];

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (uploadEvent) => {
        if (uploadEvent.target?.result) {
          setNewImageUrl(uploadEvent.target.result as string);
        }
      };
      reader.readAsDataURL(file);

      const formData = new FormData();
      formData.append('image', file);
      try {
        const response = await fetch('/api/pictures', { method: 'POST', body: formData });
        if (!response.ok) throw new Error(`Upload failed with status ${response.status}`);
        const result = (await response.json()) as { path: string };
        setNewImageUrl(result.path);
      } catch (error) {
        console.error('The image preview is available, but saving to public/picture failed.', error);
      }
    }
  };

  const handleAddNewMemory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle || !newImageUrl) return;

    const newMemory: MemoryPlace = {
      id: Date.now().toString(),
      title: newTitle,
      subtitle: newSubtitle || 'Precious Moments',
      country: newLocation || 'With You ❤️',
      description: newDesc || 'Another unforgettable memory made with my favorite person.',
      weather: '25°C Warm & Peaceful',
      spotName: newSubtitle || newTitle,
      locationDetails: newLocation || 'Special Place',
      image: newImageUrl,
      liked: true,
      likesCount: 1,
      categoryIcon: 'camera'
    };

    onAddMemory(newMemory);
    setIsAddingOpen(false);
    setNewTitle('');
    setNewSubtitle('');
    setNewLocation('');
    setNewDesc('');
    setNewImageUrl('');
  };

  return (
    <section id="memories" className="responsive-shell relative z-10 min-h-screen w-full flex flex-col justify-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 sm:py-24">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 sm:mb-10 gap-4 shrink-0">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={14} className="text-rose-300" />
            <span className="text-xs uppercase tracking-[0.25em] text-[hsl(var(--muted-foreground))] font-medium">
              Places & Moments With You
            </span>
          </div>
          <h2 
            className="text-3xl sm:text-4xl md:text-5xl text-white font-normal tracking-tight leading-tight"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Must-See <em className="not-italic text-rose-200 font-serif-instrument">Destinations</em> & Memories
          </h2>
        </div>

        <button
          type="button"
          onClick={() => setIsAddingOpen(true)}
          className="liquid-glass rounded-full px-5 py-2.5 text-xs text-white hover:scale-105 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer shadow-md"
        >
          <Plus size={14} className="text-rose-300" />
          <span>Add Her Photo</span>
        </button>
      </div>

      {/* Main Grid: Left Big Preview + Right List */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-stretch">
        
        {/* LEFT COLUMN: Large Interactive Destination Card (Fixed Text Flow & No Collisions) */}
        <div className="lg:col-span-7 xl:col-span-8">
          <div className="memories-card liquid-glass rounded-[28px] overflow-hidden relative min-h-[500px] sm:min-h-[560px] h-full flex flex-col justify-between p-6 sm:p-10 shadow-2xl border border-white/15">
            {/* Background Image */}
            <div 
              key={activeMemory.id}
              className="absolute inset-0 bg-cover bg-center transition-all duration-700 ease-out animate-slide-smooth"
              style={{ backgroundImage: `url(${activeMemory.image})` }}
            />
            {/* Dark Gradients for readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/60 to-black/35 pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none" />

            {/* Top Details: Clean vertical flow without any overlap */}
            <div key={`info-${activeMemory.id}`} className="relative z-10 max-w-xl animate-fade-rise flex flex-col items-start gap-2.5">
              {/* Badges Row (Country + Weather) วางไว้ด้านบนสุดเป็นระเบียบ */}
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-rose-200 text-xs font-medium shadow-sm">
                  <MapPin size={12} className="text-rose-300" />
                  {activeMemory.country}
                </span>
                <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/20 text-white/90 text-xs shadow-sm">
                  <CloudSun size={12} className="text-amber-300" />
                  {activeMemory.weather}
                </span>
              </div>

              {/* Title with distinct block spacing and proper line height */}
              <h3 
                className="text-2xl sm:text-3xl lg:text-4xl font-normal text-white tracking-tight drop-shadow-lg leading-snug my-0.5"
                style={{ fontFamily: "'Instrument Serif', serif" }}
              >
                {activeMemory.title}
              </h3>

              {/* Description */}
              <p className="text-white/85 text-xs sm:text-sm leading-relaxed font-light drop-shadow max-w-lg">
                {activeMemory.description}
              </p>
            </div>

            {/* Bottom Floating Bar */}
            <div className="relative z-10 mt-6">
              <div className="bg-black/70 backdrop-blur-xl border border-white/20 rounded-2xl p-4 sm:p-5 flex items-center justify-between shadow-lg gap-4">
                <div className="flex items-center gap-3.5 overflow-hidden">
                  <div className="w-10 h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                    <MapPin size={20} className="text-rose-300" />
                  </div>
                  <div className="truncate">
                    <h4 className="text-white text-sm sm:text-base font-medium truncate">
                      {activeMemory.spotName}
                    </h4>
                    <p className="text-[11px] sm:text-xs text-white/60 truncate mt-0.5">
                      {activeMemory.locationDetails}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    type="button"
                    onClick={() => onToggleLike(activeMemory.id)}
                    className={`w-10 h-10 rounded-xl flex items-center justify-center transition-all cursor-pointer ${
                      activeMemory.liked 
                        ? 'bg-rose-500/30 text-rose-300 border border-rose-400/40 shadow-[0_0_12px_rgba(244,63,94,0.3)]' 
                        : 'bg-white/10 hover:bg-white/20 text-white/80 border border-white/10'
                    }`}
                    title="Like memory"
                  >
                    <Heart size={18} className={activeMemory.liked ? 'fill-rose-300' : ''} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setLightboxImage(activeMemory.image)}
                    className="w-10 h-10 rounded-xl bg-white/10 hover:bg-white/20 text-white/80 hover:text-white flex items-center justify-center transition-all cursor-pointer border border-white/10"
                    title="View Full Photo"
                  >
                    <Maximize2 size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Interactive Destinations List (Hidden scrollbar) */}
        <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-3">
          <div className="flex items-center justify-between px-2 mb-1">
            <span className="text-sm font-medium text-white/90 tracking-wide">
              Must-See Destinations ({memories.length})
            </span>
            <span className="text-xs text-rose-300/80 hover:text-rose-200 transition-colors flex items-center gap-1">
              Select one <ChevronRight size={14} />
            </span>
          </div>

          <div 
            className="memories-list space-y-3 max-h-[500px] sm:max-h-[560px] overflow-y-auto pr-1 [&::-webkit-scrollbar]:hidden"
            onWheel={(event) => event.stopPropagation()}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {memories.map((item, idx) => {
              const isSelected = idx === activeIndex;
              return (
                <div
                  key={item.id}
                  onClick={() => onSelectIndex(idx)}
                  className={`p-3.5 rounded-2xl transition-all duration-300 cursor-pointer flex items-center gap-3.5 relative overflow-hidden group ${
                    isSelected 
                      ? 'bg-white/[0.12] border-2 border-rose-400/70 shadow-[0_4px_25px_rgba(244,63,94,0.18)] scale-[1.01]' 
                      : 'bg-white/[0.03] hover:bg-white/[0.08] border border-white/10 hover:border-white/20'
                  }`}
                >
                  {isSelected && (
                    <div className="absolute left-0 top-2 bottom-2 w-1 bg-rose-400 rounded-r-full shadow-[0_0_8px_rgba(244,63,94,0.8)]" />
                  )}

                  <div className="relative w-18 h-18 sm:w-20 sm:h-20 rounded-xl overflow-hidden shrink-0 border border-white/10 bg-black/40">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/10" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className={`text-sm sm:text-base font-semibold truncate transition-colors ${
                      isSelected ? 'text-white' : 'text-white/80 group-hover:text-white'
                    }`}>
                      {item.subtitle || item.title}
                    </h4>
                    <p className="text-xs text-white/50 truncate mt-0.5 font-light">
                      {item.description}
                    </p>
                    
                    <div className="flex items-center gap-1.5 mt-2 text-[11px] text-white/60">
                      <MapPin size={12} className="text-rose-300 shrink-0" />
                      <span className="truncate">{item.locationDetails}</span>
                    </div>
                  </div>

                  <div className="shrink-0 flex items-center justify-center p-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onToggleLike(item.id);
                      }}
                      className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                        item.liked 
                          ? 'bg-rose-500/20 text-rose-300' 
                          : 'bg-white/5 text-white/40 hover:text-white hover:bg-white/10'
                      }`}
                    >
                      {item.categoryIcon === 'camera' ? (
                        <Camera size={16} />
                      ) : (
                        <Bookmark size={16} className={item.liked ? 'fill-rose-300' : ''} />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Modal: Add Her Photo */}
      {isAddingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-rise">
          <div className="liquid-glass rounded-3xl p-6 sm:p-8 max-w-lg w-full border border-white/20 bg-neutral-950/80 relative">
            <button
              type="button"
              onClick={() => setIsAddingOpen(false)}
              className="absolute top-5 right-5 text-white/60 hover:text-white transition-colors"
            >
              <X size={20} />
            </button>

            <h3 
              className="text-2xl sm:text-3xl text-white font-normal mb-2"
              style={{ fontFamily: "'Instrument Serif', serif" }}
            >
              Add a New Memory
            </h3>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mb-6">
              Upload a photo or paste an image URL. Uploaded files are saved to our picture collection.
            </p>

            <form onSubmit={handleAddNewMemory} className="space-y-4 text-xs">
              <div>
                <label className="block text-white/80 font-medium mb-1">Destination / Event Name</label>
                <input 
                  type="text"
                  required
                  placeholder="e.g., Saint Petersburg, Sunset Beach..."
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-white/80 font-medium mb-1">Spot / Activity Subtitle</label>
                <input 
                  type="text"
                  placeholder="e.g., Hermitage Museum Walk..."
                  value={newSubtitle}
                  onChange={(e) => setNewSubtitle(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-white/80 font-medium mb-1">Location Details</label>
                <input 
                  type="text"
                  placeholder="e.g., Riverside Promenade"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-400"
                />
              </div>

              <div>
                <label className="block text-white/80 font-medium mb-1">Heartfelt Note / Description</label>
                <textarea 
                  rows={2}
                  placeholder="What made this moment unforgettable?"
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-white/5 border border-white/15 rounded-xl px-3.5 py-2.5 text-white focus:outline-none focus:border-rose-400 resize-none"
                />
              </div>

              <div>
                <label className="block text-white/80 font-medium mb-1">Photo (Upload from Device or Paste URL)</label>
                <div className="flex gap-2 mb-2">
                  <input 
                    type="url"
                    placeholder="https://images.unsplash.com/..."
                    value={newImageUrl}
                    onChange={(e) => setNewImageUrl(e.target.value)}
                    className="flex-1 bg-white/5 border border-white/15 rounded-xl px-3.5 py-2 text-white focus:outline-none focus:border-rose-400"
                  />
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="liquid-glass rounded-xl px-3.5 py-2 text-white hover:scale-105 transition-transform flex items-center gap-1.5"
                  >
                    <ImageIcon size={14} />
                    <span>Browse</span>
                  </button>
                </div>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  accept="image/*" 
                  onChange={handleFileUpload} 
                  className="hidden" 
                />
              </div>

              {newImageUrl && (
                <div className="w-full h-28 rounded-xl overflow-hidden border border-white/20 mt-2">
                  <img src={newImageUrl} alt="Preview" className="w-full h-full object-contain bg-black" />
                </div>
              )}

              <div className="flex justify-end gap-3 pt-4 border-t border-white/10">
                <button
                  type="button"
                  onClick={() => setIsAddingOpen(false)}
                  className="px-4 py-2 text-white/60 hover:text-white transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!newTitle || !newImageUrl}
                  className="liquid-glass rounded-xl px-6 py-2 text-white font-medium hover:scale-105 transition-transform disabled:opacity-50"
                >
                  Add Memory
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Fullscreen Lightbox */}
      {lightboxImage && (
        <div 
          onClick={() => setLightboxImage(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-lg animate-fade-rise cursor-zoom-out"
        >
          <div className="relative max-w-5xl max-h-[85vh] rounded-2xl overflow-hidden border border-white/20 shadow-2xl">
            <img 
              src={lightboxImage} 
              alt="Enlarged Memory" 
              className="w-full h-full object-contain max-h-[85vh]"
            />
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute top-4 right-4 liquid-glass rounded-full p-2.5 text-white hover:scale-110 transition-transform"
            >
              <X size={18} />
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

const LoveStorySection: React.FC = () => {
  return (
    <section id="letter" className="relative z-10 min-h-screen w-full flex flex-col justify-center max-w-4xl mx-auto px-6 py-20">
      <div className="liquid-glass rounded-3xl p-8 sm:p-14 relative overflow-hidden shadow-2xl">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Quote size={20} className="text-rose-300/60" />
        </div>

        <h2
          className="text-3xl sm:text-5xl text-center text-white font-normal mb-8 tracking-tight"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          A Letter For <em className="not-italic text-rose-200 font-serif-instrument">The One</em>
        </h2>

        <div className="space-y-6 text-[hsl(var(--muted-foreground))] text-base sm:text-lg leading-relaxed font-light text-center max-w-2xl mx-auto">
          <p>
            "I was going to write something super romantic, but let's be real—you just love me for my snack sharing. Happy 2 months, my partner in crime!"
          </p>
          <p>
            "Thank you for sharing your life, your laughter, and most importantly, your fries with me."
          </p>
        </div>

        <div className="mt-12 flex flex-col items-center justify-center">
          <span 
            className="text-2xl sm:text-3xl text-white font-normal tracking-wide"
            style={{ fontFamily: "'Instrument Serif', serif" }}
          >
            Forever & Always,
          </span>
          <span className="text-xs uppercase tracking-[0.25em] text-rose-200/80 mt-1 font-medium">
            With All My Heart
          </span>
        </div>
      </div>
    </section>
  );
};

interface HeroSectionProps {
  onBeginJourney: () => void;
}

interface LoveQuestionModalProps {
  onClose: () => void;
}

const LoveQuestionModal: React.FC<LoveQuestionModalProps> = ({ onClose }) => {
  const [noCount, setNoCount] = useState(0);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });
  const [answered, setAnswered] = useState(false);

  const questionImages = [
    '/loveme/pic1.jpg',
    '/loveme/pic2.jpg',
    '/loveme/pic%203.jpg',
    '/loveme/love.jpg',
  ];
  const questions = ['พี่รักผมไหม', 'พี่ไม่รักผมหรอ', 'ดื้อนะ', 'รักค้าบบ'];
  const noButtonVisible = noCount < 3;
  const loveScale = 1 + noCount * 0.35;

  const moveNoButton = () => {
    if (noCount >= 3 || !window.matchMedia('(pointer: fine)').matches) return;
    const x = Math.round((Math.random() - 0.5) * 180);
    const y = Math.round((Math.random() - 0.5) * 90);
    setNoPosition({ x, y });
  };

  const handleNo = () => {
    setNoCount((count) => Math.min(3, count + 1));
    setNoPosition({ x: 0, y: 0 });
  };

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-[#061923]/75 p-4 backdrop-blur-md"
      role="dialog"
      aria-modal="true"
      aria-labelledby="love-question-title"
      onClick={onClose}
      onWheel={(event) => event.stopPropagation()}
    >
      <div
        className="liquid-glass w-full max-w-md rounded-[2rem] border border-white/25 bg-[#0d2b3a]/95 p-5 text-center shadow-2xl sm:p-7"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-5 top-5 rounded-full p-2 text-white/60 transition-colors hover:bg-white/10 hover:text-white"
        >
          <X size={18} />
        </button>

        <div className="mb-5 aspect-[16/9] w-full overflow-hidden rounded-2xl border border-white/15 bg-black/30">
          <img
            src={answered ? '/loveme/loveutoo.png' : questionImages[noCount]}
            alt={answered ? 'Love you too' : 'Our memory'}
            className="h-full w-full object-contain bg-[#081d27] transition-all duration-500"
          />
        </div>

        <p className="mb-2 text-xs uppercase tracking-[0.25em] text-rose-200/75">A little question</p>
        <h2
          id="love-question-title"
          className="text-3xl text-white sm:text-4xl"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {answered ? 'รักเหมือนกันนะ ❤️' : questions[noCount]}
        </h2>

        {!answered && (
          <div className="relative mt-8 flex min-h-16 items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setAnswered(true)}
              className="rounded-full bg-rose-400 px-7 py-3 font-semibold text-white shadow-[0_0_28px_rgba(251,113,133,0.45)] transition-all duration-500 hover:bg-rose-300"
              style={{ transform: `scale(${loveScale})` }}
            >
              รัก
            </button>

            {noButtonVisible && (
              <button
                type="button"
                onClick={handleNo}
                onMouseEnter={moveNoButton}
                onPointerEnter={moveNoButton}
                className="rounded-full border border-white/20 bg-white/10 px-6 py-3 text-white/80 transition-all duration-300 hover:bg-white/15"
                style={{
                  transform: `translate(${noPosition.x}px, ${noPosition.y}px) scale(${1 - noCount * 0.2})`,
                }}
              >
                ไม่
              </button>
            )}
          </div>
        )}

        {answered && (
          <button
            type="button"
            onClick={onClose}
            className="mt-8 rounded-full border border-rose-300/40 bg-rose-400/20 px-6 py-2.5 text-sm text-rose-100 transition-colors hover:bg-rose-400/30"
          >
            ไปต่อกันเลย
          </button>
        )}
      </div>
    </div>
  );
};

const HeroSection: React.FC<HeroSectionProps> = ({ onBeginJourney }) => {
  return (
    <section id="hero" className="relative z-10 min-h-screen w-full flex flex-col items-center justify-center text-center px-6">
      <h1
        className="hero-title text-5xl sm:text-7xl md:text-8xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal text-[hsl(var(--foreground))] animate-fade-rise"
        style={{ fontFamily: "'Instrument Serif', serif" }}
      >
        Where <em className="not-italic text-[hsl(var(--muted-foreground))] font-serif-instrument">dreams</em> rise{' '}
        <em className="not-italic text-[hsl(var(--muted-foreground))] font-serif-instrument">through the silence.</em>
      </h1>

      <p className="hero-copy text-[hsl(var(--muted-foreground))] text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-light animate-fade-rise-delay">
        We're designing tools for deep thinkers, bold creators, and quiet rebels. Amid the chaos, we build digital spaces
        for sharp focus, timeless love, and our most cherished memories.
      </p>

      <button
        type="button"
        onClick={onBeginJourney}
        className="liquid-glass rounded-full px-12 sm:px-14 py-4 sm:py-5 text-base text-[hsl(var(--foreground))] mt-12 hover:scale-[1.03] cursor-pointer transition-all duration-300 animate-fade-rise-delay-2 flex items-center gap-3 group"
      >
        <span className="tracking-wide">Begin Journey</span>
        <Heart size={18} className="text-rose-300 group-hover:scale-110 transition-transform fill-rose-300/30" />
      </button>

      <div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center text-white/40 hover:text-white/80 transition-colors cursor-pointer"
        onClick={onBeginJourney}
      >
        <span className="text-[10px] uppercase tracking-[0.2em] mb-1">Our Journey</span>
        <ChevronDown size={16} className="animate-bounce" />
      </div>
    </section>
  );
};

const SECTIONS = ['hero', 'counter', 'showcase', 'memories', 'letter'];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [isLoveQuestionOpen, setIsLoveQuestionOpen] = useState<boolean>(false);
  const [showcaseIndex, setShowcaseIndex] = useState<number>(0);
  const [memoriesIndex, setMemoriesIndex] = useState<number>(0);
  const [memoriesList, setMemoriesList] = useState<MemoryPlace[]>(ALL_MEMORIES);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isTransitioningRef = useRef<boolean>(false);
  const activeSectionRef = useRef<string>('hero');
  const showcaseIndexRef = useRef<number>(0);
  const memoriesIndexRef = useRef<number>(0);
  const memoriesLengthRef = useRef<number>(ALL_MEMORIES.length);
  const lastStepTimeRef = useRef<number>(0);

  useEffect(() => {
    activeSectionRef.current = activeSection;
  }, [activeSection]);

  useEffect(() => {
    showcaseIndexRef.current = showcaseIndex;
  }, [showcaseIndex]);

  useEffect(() => {
    if (activeSection !== 'showcase' || FEATURE_ITEMS.length < 2) return;

    const showcaseTimer = window.setInterval(() => {
      setShowcaseIndex(currentIndex => (currentIndex + 1) % FEATURE_ITEMS.length);
    }, 10000);

    return () => window.clearInterval(showcaseTimer);
  }, [activeSection]);

  useEffect(() => {
    memoriesIndexRef.current = memoriesIndex;
  }, [memoriesIndex]);

  useEffect(() => {
    memoriesLengthRef.current = memoriesList.length;
  }, [memoriesList]);

  const toggleAudio = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/Gigi%20Perez%20Sailor%20Song.mp3');
      audioRef.current.loop = true;
      audioRef.current.volume = 0.4;
    }

    if (isAudioPlaying) {
      audioRef.current.pause();
      setIsAudioPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsAudioPlaying(true))
        .catch((error: unknown) => {
          setIsAudioPlaying(false);
          console.error('Unable to play the soundtrack.', error);
        });
    }
  };

  const handleAddMemory = (newMemory: MemoryPlace) => {
    setMemoriesList(prev => [newMemory, ...prev]);
    setMemoriesIndex(0);
  };

  const handleToggleLike = (id: string) => {
    setMemoriesList(prev => prev.map(item => {
      if (item.id === id) {
        return {
          ...item,
          liked: !item.liked,
          likesCount: item.liked ? item.likesCount - 1 : item.likesCount + 1
        };
      }
      return item;
    }));
  };

  const scrollToSection = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      isTransitioningRef.current = true;
      setActiveSection(id);
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      
      setTimeout(() => {
        isTransitioningRef.current = false;
      }, 950);
    }
  }, []);

  const navigateAdjacentSection = useCallback((direction: -1 | 1) => {
    const currentIndex = SECTIONS.indexOf(activeSectionRef.current);
    const nextIndex = currentIndex + direction;

    if (nextIndex < 0 || nextIndex >= SECTIONS.length) return;

    const nextSection = SECTIONS[nextIndex];
    if (nextSection === 'showcase') {
      setShowcaseIndex(direction > 0 ? 0 : FEATURE_ITEMS.length - 1);
    }
    if (nextSection === 'memories') {
      setMemoriesIndex(direction > 0 ? 0 : memoriesLengthRef.current - 1);
    }
    scrollToSection(nextSection);
  }, [scrollToSection]);

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (isTransitioningRef.current) {
        e.preventDefault();
        return;
      }

      if (Math.abs(e.deltaY) < 18) return;

      const currentSection = activeSectionRef.current;
      const now = Date.now();

      if (currentSection === 'showcase') {
        if (now - lastStepTimeRef.current < 450) {
          e.preventDefault();
          return;
        }

        const currentShowcase = showcaseIndexRef.current;
        const maxShowcase = FEATURE_ITEMS.length - 1;

        if (e.deltaY > 0) {
          if (currentShowcase < maxShowcase) {
            e.preventDefault();
            lastStepTimeRef.current = now;
            setShowcaseIndex(currentShowcase + 1);
            return;
          } else {
            e.preventDefault();
            setMemoriesIndex(0);
            scrollToSection('memories');
            return;
          }
        } else if (e.deltaY < 0) {
          if (currentShowcase > 0) {
            e.preventDefault();
            lastStepTimeRef.current = now;
            setShowcaseIndex(currentShowcase - 1);
            return;
          } else {
            e.preventDefault();
            scrollToSection('counter');
            return;
          }
        }
      }

      if (currentSection === 'memories') {
        if (now - lastStepTimeRef.current < 400) {
          e.preventDefault();
          return;
        }

        const currentMemIdx = memoriesIndexRef.current;
        const maxMemIdx = memoriesLengthRef.current - 1;

        if (e.deltaY > 0) {
          if (currentMemIdx < maxMemIdx) {
            e.preventDefault();
            lastStepTimeRef.current = now;
            setMemoriesIndex(currentMemIdx + 1);
            return;
          } else {
            e.preventDefault();
            scrollToSection('letter');
            return;
          }
        } else if (e.deltaY < 0) {
          if (currentMemIdx > 0) {
            e.preventDefault();
            lastStepTimeRef.current = now;
            setMemoriesIndex(currentMemIdx - 1);
            return;
          } else {
            e.preventDefault();
            setShowcaseIndex(FEATURE_ITEMS.length - 1);
            scrollToSection('showcase');
            return;
          }
        }
      }

      e.preventDefault();
      const currentIdx = SECTIONS.indexOf(currentSection);

      if (e.deltaY > 0 && currentIdx < SECTIONS.length - 1) {
        scrollToSection(SECTIONS[currentIdx + 1]);
      } else if (e.deltaY < 0 && currentIdx > 0) {
        scrollToSection(SECTIONS[currentIdx - 1]);
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        const currentSection = activeSectionRef.current;
        if (currentSection === 'memories' && memoriesIndexRef.current < memoriesLengthRef.current - 1) {
          setMemoriesIndex(prev => prev + 1);
          return;
        }
        if (currentSection === 'showcase' && showcaseIndexRef.current < FEATURE_ITEMS.length - 1) {
          setShowcaseIndex(prev => prev + 1);
          return;
        }
        const currentIdx = SECTIONS.indexOf(currentSection);
        if (currentIdx < SECTIONS.length - 1) scrollToSection(SECTIONS[currentIdx + 1]);
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        const currentSection = activeSectionRef.current;
        if (currentSection === 'memories' && memoriesIndexRef.current > 0) {
          setMemoriesIndex(prev => prev - 1);
          return;
        }
        if (currentSection === 'showcase' && showcaseIndexRef.current > 0) {
          setShowcaseIndex(prev => prev - 1);
          return;
        }
        const currentIdx = SECTIONS.indexOf(currentSection);
        if (currentIdx > 0) scrollToSection(SECTIONS[currentIdx - 1]);
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [scrollToSection]);

  return (
    <div className="relative min-h-screen selection:bg-rose-500/30 selection:text-white">
      <GlobalStyles />

      {/* Background Video */}
      <video
        className="fixed inset-0 w-full h-full object-cover z-0 pointer-events-none"
        src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
        autoPlay
        loop
        muted
        playsInline
      />

      <div className="fixed inset-0 bg-black/40 z-0 pointer-events-none" />

      {/* Direct section navigation */}
      <div className="fixed inset-x-3 sm:inset-x-5 top-1/2 -translate-y-1/2 z-40 flex items-center justify-between pointer-events-none">
        <button
          type="button"
          onClick={() => navigateAdjacentSection(-1)}
          disabled={activeSection === SECTIONS[0]}
          aria-label="Go to previous section"
          className="liquid-glass pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-all hover:scale-110 hover:text-white disabled:pointer-events-none disabled:opacity-0"
        >
          <ChevronLeft size={22} />
        </button>
        <button
          type="button"
          onClick={() => navigateAdjacentSection(1)}
          disabled={activeSection === SECTIONS[SECTIONS.length - 1]}
          aria-label="Go to next section"
          className="liquid-glass pointer-events-auto flex h-11 w-11 items-center justify-center rounded-full text-white/80 transition-all hover:scale-110 hover:text-white disabled:pointer-events-none disabled:opacity-0"
        >
          <ChevronRight size={22} />
        </button>
      </div>

      {/* Floating Side Pagination */}
      <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden lg:flex flex-col gap-3.5 bg-black/35 backdrop-blur-md p-2.5 rounded-full border border-white/10 shadow-2xl">
        {SECTIONS.map((sectionId) => {
          const isActive = activeSection === sectionId;
          const labels: Record<string, string> = {
            hero: 'Home',
            counter: 'Anniversary',
            showcase: 'Showcase',
            memories: 'Memories',
            letter: 'Our Story'
          };
          return (
            <button
              key={sectionId}
              type="button"
              onClick={() => scrollToSection(sectionId)}
              className="group relative flex items-center justify-center p-1 cursor-pointer"
              title={labels[sectionId]}
            >
              <span
                className={`transition-all duration-500 rounded-full ${
                  isActive
                    ? 'w-2.5 h-6 bg-rose-400 shadow-[0_0_12px_rgba(244,63,94,0.9)]'
                    : 'w-2.5 h-2.5 bg-white/30 hover:bg-white/70'
                }`}
              />
              <span className="absolute right-8 px-2.5 py-1 rounded-lg bg-black/85 text-white text-[10px] uppercase tracking-wider font-medium opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity whitespace-nowrap border border-white/15">
                {labels[sectionId]}
              </span>
            </button>
          );
        })}
      </div>

      <div className="relative z-10 flex flex-col min-h-screen">
        <Navigation 
          onScrollTo={scrollToSection} 
          activeSection={activeSection}
          isAudioPlaying={isAudioPlaying}
          toggleAudio={toggleAudio}
        />
        
        <main className="flex-1 flex flex-col">
          <HeroSection onBeginJourney={() => setIsLoveQuestionOpen(true)} />
          <AnniversaryCounter />
          <DriftShowcaseSection 
            activeIdx={showcaseIndex} 
            onChangeIdx={setShowcaseIndex} 
          />
          <DestinationExplorer 
            activeIndex={memoriesIndex}
            onSelectIndex={setMemoriesIndex}
            memories={memoriesList}
            onAddMemory={handleAddMemory}
            onToggleLike={handleToggleLike}
          />
          <LoveStorySection />
        </main>
      </div>
      {isLoveQuestionOpen && <LoveQuestionModal onClose={() => setIsLoveQuestionOpen(false)} />}
    </div>
  );
}