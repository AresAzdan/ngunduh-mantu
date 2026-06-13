"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MapPin, Calendar, Clock, Heart, ArrowDown, Send, CheckCircle2 } from 'lucide-react';
import { useMusic } from './MusicContext';

// === COMPONENTS ===

// 1. Google Fonts Injection & Base Styles
const FontStyles = () => (
  <style dangerouslySetInnerHTML={{__html: `
    @import url('https://fonts.googleapis.com/css2?family=Amiri+Quran&family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,400;1,600&family=Inter:wght@300;400;500;600&family=Noto+Naskh+Arabic:wght@400;500;600;700&family=Scheherazade+New:wght@400;700&display=swap');
    
    :root {
      --moss-green: #10260D;
      --forest-green: #1A3317;
      --luxury-gold: #A6842E;
      --ivory: #F6F8F6;
    }

    body {
      margin: 0;
      background-color: var(--moss-green);
      color: var(--forest-green);
    }

    .font-serif {
      font-family: 'Cormorant Garamond', serif;
    }

    .font-sans {
      font-family: 'Inter', sans-serif;
    }

    .font-arabic {
      font-family: 'Amiri Quran', 'Noto Naskh Arabic', 'Scheherazade New', serif;
    }

    /* Custom Scrollbar */
    ::-webkit-scrollbar {
      width: 8px;
    }
    ::-webkit-scrollbar-track {
      background: var(--ivory);
    }
    ::-webkit-scrollbar-thumb {
      background: var(--luxury-gold);
      border-radius: 4px;
    }

    /* Glassmorphism */
    .glass-card {
      background: rgba(246, 248, 246, 0.85);
      backdrop-filter: blur(12px);
      -webkit-backdrop-filter: blur(12px);
      border: 1px solid rgba(166, 132, 46, 0.2);
    }
  `}} />
);

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  delay: number;
  duration: number;
  drift: number;
};

const seededValue = (index: number, salt: number) => {
  const raw = Math.sin(index * 37.719 + salt * 19.131) * 10000;
  return raw - Math.floor(raw);
};

const particles: Particle[] = Array.from({ length: 30 }).map((_, i) => ({
  id: i,
  x: seededValue(i, 1) * 100,
  y: seededValue(i, 2) * 100,
  size: seededValue(i, 3) * 3 + 1,
  delay: seededValue(i, 4) * 5,
  duration: seededValue(i, 5) * 10 + 10,
  drift: seededValue(i, 6) * 10 - 5,
}));

// 2. Animated Gold Particles
const Particles = () => {

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-[#A6842E] opacity-40"
          style={{ width: p.size, height: p.size, left: `${p.x}%`, top: `${p.y}%` }}
          animate={{
            y: ['0vh', '-100vh'],
            opacity: [0, 0.6, 0],
            x: [`0vw`, `${p.drift}vw`]
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
};

// 3. Ornaments, SVGs, & Patterns
const EgyptianPattern = ({ variant = 'dark' }: { variant?: 'light' | 'dark' }) => {
  // dark variant for ivory backgrounds (#1A3317), light variant for moss green backgrounds (#A6842E)
  const color = variant === 'dark' ? '1A3317' : 'A6842E';
  const opacity = variant === 'dark' ? '0.04' : '0.06'; // Subtle opacity
  
  return (
    <div 
      className="absolute inset-0 pointer-events-none z-0"
      style={{
        opacity: opacity,
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' stroke='%23${color}' stroke-width='1.5'%3E%3Cpolygon points='60 20 75 50 60 80 45 50' /%3E%3Cpath d='M60 80 C40 90 25 120 25 120 M60 80 C80 90 95 120 95 120' /%3E%3Cline x1='60' y1='80' x2='60' y2='120' /%3E%3Cpath d='M25 120 C25 90 15 80 0 80 M95 120 C95 90 105 80 120 80' /%3E%3Ccircle cx='60' cy='12' r='6' /%3E%3C/g%3E%3C/svg%3E")`,
        backgroundSize: '120px 120px',
        backgroundRepeat: 'repeat'
      }}
    />
  );
};

const CornerOrnament = ({ className, rotation = 0 }: { className?: string, rotation?: number }) => (
  <svg 
    viewBox="0 0 100 100" 
    fill="none" 
    className={className} 
    style={{ transform: `rotate(${rotation}deg)` }}
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M 0,0 L 0,40 C 20,40 40,20 40,0 Z" stroke="currentColor" strokeWidth="0.5" fill="none"/>
    <path d="M 5,5 L 5,30 C 15,30 30,15 30,5 Z" stroke="currentColor" strokeWidth="0.5" fill="none"/>
    <circle cx="15" cy="15" r="1.5" fill="currentColor"/>
    <path d="M 40,0 C 40,30 70,60 100,60" stroke="currentColor" strokeWidth="1" fill="none"/>
    <path d="M 0,40 C 30,40 60,70 60,100" stroke="currentColor" strokeWidth="1" fill="none"/>
    <path d="M 45,20 C 50,15 60,15 60,25 C 55,30 45,30 45,20 Z" fill="currentColor" opacity="0.6"/>
    <path d="M 20,45 C 15,50 15,60 25,60 C 30,55 30,45 20,45 Z" fill="currentColor" opacity="0.6"/>
    <path d="M 65,35 C 70,30 80,30 80,40 C 75,45 65,45 65,35 Z" fill="currentColor" opacity="0.6"/>
    <path d="M 35,65 C 30,70 30,80 40,80 C 45,75 45,65 35,65 Z" fill="currentColor" opacity="0.6"/>
  </svg>
);

const DividerOrnament = ({ className }: { className?: string }) => (
  <svg width="200" height="24" viewBox="0 0 200 24" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
    <path d="M 0,12 L 80,12" stroke="currentColor" strokeWidth="1"/>
    <path d="M 120,12 L 200,12" stroke="currentColor" strokeWidth="1"/>
    <path d="M 100,2 L 108,12 L 100,22 L 92,12 Z" fill="currentColor" opacity="0.8"/>
    <circle cx="85" cy="12" r="2" fill="currentColor" opacity="0.5"/>
    <circle cx="115" cy="12" r="2" fill="currentColor" opacity="0.5"/>
  </svg>
);

const SectionFrame = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <div className={`relative overflow-hidden border border-[#A6842E]/30 rounded-3xl ${className}`}>
    <CornerOrnament className="absolute top-4 left-4 w-10 h-10 md:w-14 md:h-14 text-[#A6842E] opacity-60 z-0 pointer-events-none" rotation={0} />
    <CornerOrnament className="absolute top-4 right-4 w-10 h-10 md:w-14 md:h-14 text-[#A6842E] opacity-60 z-0 pointer-events-none" rotation={90} />
    <CornerOrnament className="absolute bottom-4 left-4 w-10 h-10 md:w-14 md:h-14 text-[#A6842E] opacity-60 z-0 pointer-events-none" rotation={270} />
    <CornerOrnament className="absolute bottom-4 right-4 w-10 h-10 md:w-14 md:h-14 text-[#A6842E] opacity-60 z-0 pointer-events-none" rotation={180} />
    <div className="relative z-10 h-full w-full flex flex-col justify-center">
      {children}
    </div>
  </div>
);

// 4. Reusable Animation Wrapper
const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-50px" }}
    transition={{ duration: 0.8, delay, ease: "easeOut" }}
    className={className}
  >
    {children}
  </motion.div>
);


// === MAIN APPLICATION PAGE ===

type WeddingInvitationProps = {
  initialGuestName?: string;
};

export default function App({ initialGuestName = "" }: WeddingInvitationProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { play } = useMusic();

  // --- RSVP & GUESTBOOK STATE ---
  const [rsvpData, setRsvpData] = useState({
    name: initialGuestName,
    attendance: 'hadir',
    guests: '1',
    message: ''
  });
  
  const [submissions, setSubmissions] = useState([
    { id: 1, name: 'Bapak & Ibu Anwar', attendance: 'hadir', guests: '2', message: 'Selamat berbahagia Amr dan Ishmah. Semoga menjadi keluarga sakinah mawaddah warahmah.', timestamp: '12 Juni 2026' },
    { id: 2, name: 'Keluarga Dimas', attendance: 'tidak_hadir', guests: '0', message: 'Mohon maaf kami berhalangan hadir. Semoga acaranya lancar dan sukses selalu ya!', timestamp: '10 Juni 2026' }
  ]);

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!rsvpData.name) return;
    
    const newSubmission = { 
      id: Date.now(), 
      name: rsvpData.name,
      attendance: rsvpData.attendance,
      guests: rsvpData.attendance === 'hadir' ? rsvpData.guests : '0',
      message: rsvpData.message || 'Selamat berbahagia!',
      timestamp: 'Baru saja'
    };
    
    setSubmissions([newSubmission, ...submissions]);
    setRsvpData(prev => ({ ...prev, message: '' })); // Clear message field after submit
  };

  const totalConfirmedGuests = submissions
    .filter(s => s.attendance === 'hadir')
    .reduce((acc, curr) => acc + (curr.guests === '4+' ? 4 : parseInt(curr.guests || '0')), 0);

  const handleOpenInvitation = () => {
    setIsOpen(true);
    play();
  };

  // Lock scroll when envelope is closed
  useEffect(() => {
    if (!isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
      window.scrollTo(0, 0);
    }
    return () => { document.body.style.overflow = 'auto'; };
  }, [isOpen]);

  return (
    <div className="font-sans text-[#1A3317] bg-[#F6F8F6] min-h-screen relative overflow-hidden antialiased">
      <FontStyles />

      {/* --- HERO COVER (SECTION 1) --- */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div 
            className="fixed inset-0 z-40 bg-[#10260D] p-4 md:p-6 overflow-hidden"
            initial={{ y: 0 }}
            exit={{ y: "-100vh", opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.65, 0, 0.35, 1] }}
          >
            <EgyptianPattern variant="light" />
            <SectionFrame className="w-full h-full border-[#A6842E]/50 z-10">
              <Particles />
              
              <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 max-w-2xl mx-auto">
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }} 
                  animate={{ opacity: 1, scale: 1 }} 
                  transition={{ duration: 1, delay: 0.2 }}
                  className="text-[#A6842E] tracking-widest text-sm md:text-base uppercase mb-8 font-medium"
                >
                  Ngunduh Mantu
                </motion.div>
                
                <motion.h1 
                  initial={{ opacity: 0, y: 20 }} 
                  animate={{ opacity: 1, y: 0 }} 
                  transition={{ duration: 1, delay: 0.6 }}
                  className="font-serif text-[#A6842E] text-4xl md:text-6xl lg:text-7xl leading-tight mb-6"
                >
                  Amr Yamani Zayd Makarim
                  <br />
                  <span className="text-3xl md:text-5xl my-4 block font-light italic">&amp;</span>
                  Ishmah Maemunah Ibrahim Sungkar
                </motion.h1>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1, delay: 1 }}
                >
                  <DividerOrnament className="text-[#A6842E] my-6 opacity-80" />
                </motion.div>

                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 1, delay: 1.2 }}
                  className="text-[#A6842E] font-serif text-xl md:text-2xl mb-12 tracking-wide"
                >
                  24 Juni 2026
                </motion.p>

                <motion.button
                  onClick={handleOpenInvitation}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 1.5 }}
                  whileHover={{ scale: 1.05, backgroundColor: "#C2A34F" }}
                  whileTap={{ scale: 0.95 }}
                  className="group relative px-8 py-4 bg-[#A6842E] text-[#10260D] rounded-full font-medium tracking-wider shadow-[0_0_20px_rgba(166,132,46,0.3)] transition-all flex items-center gap-3 overflow-hidden"
                >
                  <span className="relative z-10">Buka Undangan</span>
                  <ArrowDown size={18} className="relative z-10 animate-bounce" />
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
                </motion.button>
              </div>
              
              {/* Soft dark gradient at bottom */}
              <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-black/40 to-transparent pointer-events-none rounded-b-3xl" />
            </SectionFrame>
          </motion.div>
        )}
      </AnimatePresence>


      {/* --- MAIN CONTENT --- */}
      {/* Container is scrollable and visible under the hero cover once opened */}
      <div className={`relative w-full ${!isOpen ? 'h-screen overflow-hidden' : ''}`}>
        
        {/* SECTION 2 — OPENING MESSAGE */}
        <section className="relative z-10 min-h-[80vh] flex flex-col items-center justify-center px-6 py-24 text-center overflow-hidden">
          <EgyptianPattern variant="dark" />
          <FadeIn className="relative z-10">
            <div className="mb-10 md:mb-12 text-center">
              <p
                lang="ar"
                dir="rtl"
                className="font-arabic text-[#A6842E] text-4xl md:text-5xl lg:text-6xl leading-relaxed opacity-95"
              >
                &#x628;&#x650;&#x633;&#x652;&#x645;&#x650; &#x627;&#x644;&#x644;&#x651;&#x670;&#x647;&#x650; &#x627;&#x644;&#x631;&#x64E;&#x651;&#x62D;&#x652;&#x645;&#x670;&#x646;&#x650; &#x627;&#x644;&#x631;&#x64E;&#x651;&#x62D;&#x650;&#x64A;&#x652;&#x645;&#x650;
              </p>
            </div>
            <p className="font-serif text-lg md:text-2xl leading-relaxed text-[#1A3317] max-w-2xl mx-auto italic">
              &quot;Dan di antara tanda-tanda (kebesaran)-Nya ialah Dia menciptakan pasangan-pasangan untukmu dari jenismu sendiri, agar kamu cenderung dan merasa tenteram kepadanya, dan Dia menjadikan di antaramu rasa kasih dan sayang.&quot;
              <br /><br />
              <span className="text-sm md:text-base font-sans font-medium text-[#A6842E] not-italic tracking-widest">(QS. Ar-Rum: 21)</span>
            </p>
          </FadeIn>

          <FadeIn delay={0.2} className="mt-16 max-w-2xl mx-auto relative z-10">
            <DividerOrnament className="text-[#A6842E] mx-auto mb-10 opacity-60" />
            <p className="font-sans font-light text-[#1A3317]/80 text-sm md:text-base leading-loose px-4">
              Dengan memohon rahmat dan ridho Allah SWT,<br/>
              kami mengundang Bapak/Ibu/Saudara/i<br/>
              untuk hadir dalam acara Ngunduh Mantu<br/>
              putra-putri kami.
            </p>
            <DividerOrnament className="text-[#A6842E] mx-auto mt-10 opacity-60" />
          </FadeIn>
        </section>


        {/* SECTION 3 — COUPLE SECTION */}
        <section className="relative z-10 py-24 px-6 overflow-hidden">
          <EgyptianPattern variant="dark" />
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center justify-center gap-12 md:gap-8 lg:gap-16 relative z-10">
            
            {/* Groom */}
            <FadeIn className="flex-1 w-full max-w-md">
              <SectionFrame className="glass-card p-10 text-center relative group hover:-translate-y-2 transition-transform duration-500 shadow-xl shadow-[#1A3317]/5">
                <div className="absolute top-0 right-0 w-32 h-32 bg-[#A6842E]/10 rounded-bl-full -z-10 transition-transform group-hover:scale-110" />
                <h3 className="font-serif text-3xl md:text-4xl text-[#10260D] mb-4">Amr Yamani<br/>Zayd Makarim</h3>
                <p className="font-sans text-sm text-[#1A3317]/70 leading-relaxed">
                  Putra dari<br/>
                  <span className="font-medium text-[#1A3317]">Bapak Zayd Makarim</span><br/>
                  & <span className="font-medium text-[#1A3317]">Ibu Fera Ali Marta</span>
                </p>
              </SectionFrame>
            </FadeIn>

            {/* Ampersand */}
            <FadeIn delay={0.2} className="hidden md:flex text-[#A6842E] font-serif text-6xl italic opacity-80">
              &
            </FadeIn>
            <FadeIn delay={0.2} className="md:hidden text-[#A6842E] font-serif text-5xl italic opacity-80">
              <Heart size={32} className="animate-pulse" fill="currentColor" fillOpacity={0.2} />
            </FadeIn>

            {/* Bride */}
            <FadeIn delay={0.4} className="flex-1 w-full max-w-md">
              <SectionFrame className="glass-card p-10 text-center relative group hover:-translate-y-2 transition-transform duration-500 shadow-xl shadow-[#1A3317]/5">
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-[#A6842E]/10 rounded-tr-full -z-10 transition-transform group-hover:scale-110" />
                <h3 className="font-serif text-3xl md:text-4xl text-[#10260D] mb-4">Ishmah Maemunah<br/>Ibrahim Sungkar</h3>
                <p className="font-sans text-sm text-[#1A3317]/70 leading-relaxed">
                  Putri dari<br/>
                  <span className="font-medium text-[#1A3317]">Bapak  Ibrahim Muhammad Sungkar</span><br/>
                  & <span className="font-medium text-[#1A3317]">Ibu Sosan Lukman Nahdi</span>
                </p>
              </SectionFrame>
            </FadeIn>

          </div>
        </section>


        {/* SECTION 4 — EVENT DETAILS */}
        <section className="relative z-10 py-24 px-6 bg-[#10260D] text-white my-12 shadow-2xl overflow-hidden">
          <EgyptianPattern variant="light" />
          <div className="max-w-4xl mx-auto relative z-10">
            <FadeIn>
              <SectionFrame className="p-12 md:p-16 border-[#A6842E]/40 bg-[#1A3317]/40 backdrop-blur-sm">
                <div className="text-center">
                  <h2 className="font-serif text-4xl md:text-5xl text-[#A6842E] mb-12">Acara Ngunduh Mantu</h2>
                  
                  <div className="mx-auto grid max-w-xl gap-y-6 text-left">
                    <div className="grid grid-cols-[80px_1fr] items-center gap-x-4 group">
                      <div className="flex w-20 items-center justify-center">
                        <div className="w-12 h-12 rounded-full border border-[#A6842E] flex items-center justify-center text-[#A6842E] group-hover:bg-[#A6842E] group-hover:text-[#10260D] transition-colors">
                          <Calendar size={20} />
                        </div>
                      </div>
                      <div className="flex min-h-12 items-center">
                        <p className="font-serif tracking-wide text-xl text-[#A6842E] mb-0">24 Juni 2026</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-[80px_1fr] items-center gap-x-4 group">
                      <div className="flex w-20 items-center justify-center">
                        <div className="w-12 h-12 rounded-full border border-[#A6842E] flex items-center justify-center text-[#A6842E] group-hover:bg-[#A6842E] group-hover:text-[#10260D] transition-colors">
                          <Clock size={20} />
                        </div>
                      </div>
                      <div className="flex min-h-12 items-center">
                        <p className="font-serif tracking-wide text-xl text-[#A6842E] mb-0">10:00 - 14:00 WIB</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-[80px_1fr] items-center gap-x-4 group">
                      <div className="flex w-20 items-center justify-center">
                        <div className="w-12 h-12 rounded-full border border-[#A6842E] flex items-center justify-center text-[#A6842E] group-hover:bg-[#A6842E] group-hover:text-[#10260D] transition-colors shrink-0">
                          <MapPin size={20} />
                        </div>
                      </div>
                      <div className="flex min-h-12 items-center">
                        <div>
                          <p className="font-serif tracking-wide text-xl text-[#A6842E] mb-0">Zayd’s Green House</p>
                          <p className="text-sm font-sans text-white/70 leading-relaxed max-w-[200px]">
                            (Lokasi terlampir di map)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </SectionFrame>
            </FadeIn>
          </div>
        </section>


        {/* SECTION 5 — LOCATION & MAP */}
        <section className="relative z-10 py-24 px-6 overflow-hidden">
          <EgyptianPattern variant="dark" />
          <FadeIn className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="font-serif text-4xl md:text-5xl text-[#10260D] mb-4">Lokasi Acara</h2>
            <div className="w-24 h-[1px] bg-[#A6842E] mx-auto mb-12" />
            
            <SectionFrame className="glass-card p-4 md:p-6 shadow-xl shadow-[#1A3317]/10 w-full mb-10 transform hover:scale-[1.01] transition-transform duration-500 bg-white/60">
              <div className="w-full aspect-video md:aspect-[21/9] rounded-2xl overflow-hidden relative bg-[#E5E7EB] z-10">
                {/* Embedded Google Maps Exactly as Provided */}
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d428.7859546253323!2d106.77540797341388!3d-6.6230849619835475!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69c59c36571353%3A0x46d3647be2cfa604!2sZayd%E2%80%99s%20green%20house!5e0!3m2!1sen!2sid!4v1781330341652!5m2!1sen!2sid" 
                  className="absolute inset-0 w-full h-full border-0"
                  allowFullScreen={false} 
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Lokasi Zayd's Green House"
                />
              </div>
            </SectionFrame>

            <a 
              href="https://goo.gl/maps/placeholder" // Intentionally generic link fallback if they click the button instead of iframe
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 px-8 py-4 bg-[#10260D] text-[#A6842E] rounded-full font-medium tracking-wide hover:bg-[#1A3317] hover:shadow-lg transition-all"
            >
              <MapPin size={18} />
              Buka di Google Maps
            </a>
          </FadeIn>
        </section>


        {/* SECTION 5.5 — RSVP & GUESTBOOK */}
        <section className="relative z-10 py-24 px-6 overflow-hidden">
          <EgyptianPattern variant="dark" />
          <div className="max-w-4xl mx-auto relative z-10">
            <FadeIn className="text-center mb-12">
              <h2 className="font-serif text-4xl md:text-5xl text-[#10260D] mb-4">Konfirmasi Kehadiran</h2>
              <div className="w-24 h-[1px] bg-[#A6842E] mx-auto mb-6" />
              <p className="font-sans text-[#1A3317]/80 text-sm md:text-base max-w-2xl mx-auto px-4">
                Mohon konfirmasi kehadiran Anda untuk membantu kami mempersiapkan acara dengan lebih baik.
              </p>
            </FadeIn>

            <FadeIn delay={0.2} className="max-w-2xl mx-auto">
              <SectionFrame className="glass-card p-6 md:p-10 shadow-xl shadow-[#1A3317]/10 bg-white/70 w-full mb-16">
                <form onSubmit={handleRsvpSubmit} className="space-y-8 relative z-10">
                  
                  {/* Nama Tamu */}
                  <div>
                    <label className="block font-serif text-xl text-[#10260D] mb-3">Nama Tamu *</label>
                    <input 
                      required 
                      type="text" 
                      value={rsvpData.name}
                      onChange={(e) => setRsvpData({...rsvpData, name: e.target.value})}
                      className="w-full bg-transparent border-b border-[#A6842E]/40 px-4 py-3 text-[#1A3317] focus:outline-none focus:border-[#A6842E] font-sans transition-colors placeholder-[#1A3317]/30" 
                      placeholder="Masukkan nama lengkap Anda" 
                    />
                  </div>

                  {/* Kehadiran */}
                  <div>
                    <label className="block font-serif text-xl text-[#10260D] mb-3">Kehadiran</label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {['hadir', 'tidak_hadir'].map((status) => (
                        <button
                          key={status}
                          type="button"
                          onClick={() => setRsvpData({...rsvpData, attendance: status})}
                          className={`py-3 px-4 rounded-xl border transition-all duration-300 flex items-center justify-center gap-2 ${
                            rsvpData.attendance === status 
                              ? 'bg-[#10260D] text-[#A6842E] border-[#10260D] shadow-md' 
                              : 'bg-transparent text-[#1A3317] border-[#A6842E]/30 hover:border-[#A6842E]'
                          }`}
                        >
                          {rsvpData.attendance === status && <CheckCircle2 size={18} />}
                          {status === 'hadir' ? 'InsyaAllah Hadir' : 'Berhalangan'}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Jumlah Tamu (Only show if attending) */}
                  <AnimatePresence>
                    {rsvpData.attendance === 'hadir' && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="overflow-hidden"
                      >
                        <label className="block font-serif text-xl text-[#10260D] mb-3">Jumlah Tamu</label>
                        <div className="grid grid-cols-4 gap-3">
                          {['1', '2', '3', '4+'].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => setRsvpData({...rsvpData, guests: num})}
                              className={`py-3 rounded-xl border transition-all duration-300 font-medium ${
                                rsvpData.guests === num 
                                  ? 'bg-[#A6842E] text-[#10260D] border-[#A6842E] shadow-md' 
                                  : 'bg-transparent text-[#1A3317] border-[#A6842E]/30 hover:border-[#A6842E]'
                              }`}
                            >
                              {num}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {/* Ucapan & Doa */}
                  <div>
                    <label className="block font-serif text-xl text-[#10260D] mb-3">Ucapan & Doa</label>
                    <textarea 
                      rows={4}
                      value={rsvpData.message}
                      onChange={(e) => setRsvpData({...rsvpData, message: e.target.value})}
                      className="w-full bg-white/50 border border-[#A6842E]/40 rounded-xl px-4 py-3 text-[#1A3317] focus:outline-none focus:border-[#A6842E] font-sans transition-colors resize-none placeholder-[#1A3317]/30" 
                      placeholder="Tuliskan doa dan harapan untuk kedua mempelai..." 
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-4 bg-[#10260D] text-[#A6842E] rounded-xl font-medium tracking-wide hover:bg-[#1A3317] transition-all flex items-center justify-center gap-2 shadow-lg shadow-[#10260D]/20 group"
                  >
                    Kirim Konfirmasi
                    <Send size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </form>
              </SectionFrame>

              {/* Guestbook / Wishes List */}
              <div className="mt-8">
                <div className="flex items-center justify-between mb-6 border-b border-[#A6842E]/30 pb-4">
                  <h3 className="font-serif text-2xl text-[#10260D]">Buku Tamu</h3>
                  <div className="bg-[#10260D] text-[#A6842E] text-xs font-sans px-3 py-1 rounded-full tracking-wider">
                    {totalConfirmedGuests} Tamu Konfirmasi
                  </div>
                </div>
                
                <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                  <AnimatePresence>
                    {submissions.map((sub) => (
                      <motion.div 
                        key={sub.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/60 border border-[#A6842E]/20 rounded-2xl p-5 shadow-sm relative overflow-hidden"
                      >
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                          <Heart fill="#A6842E" size={40} />
                        </div>
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="font-serif text-lg text-[#10260D] font-semibold">{sub.name}</h4>
                          <span className="text-xs text-[#1A3317]/50 font-sans">{sub.timestamp}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-3">
                          <span className={`text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full ${sub.attendance === 'hadir' ? 'bg-[#A6842E]/20 text-[#A6842E]' : 'bg-gray-200 text-gray-500'}`}>
                            {sub.attendance === 'hadir' ? 'Hadir' : 'Tidak Hadir'}
                          </span>
                          {sub.attendance === 'hadir' && (
                            <span className="text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[#10260D]/10 text-[#10260D]">
                              {sub.guests} Orang
                            </span>
                          )}
                        </div>
                        <p className="font-sans text-sm text-[#1A3317]/80 leading-relaxed italic relative z-10">
                          &quot;{sub.message}&quot;
                        </p>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              </div>

            </FadeIn>
          </div>
        </section>


        {/* SECTION 6 — THANK YOU */}
        <section className="relative z-10 py-32 px-6 flex flex-col items-center justify-center text-center overflow-hidden">
          <EgyptianPattern variant="dark" />
          <FadeIn className="relative z-10">
            <DividerOrnament className="text-[#A6842E] mx-auto mb-12 opacity-80" />
            <p className="font-sans font-light text-[#1A3317]/90 text-sm md:text-base leading-loose max-w-2xl mx-auto px-4">
              Merupakan suatu kehormatan dan kebahagiaan<br/>
              bagi kami apabila Bapak/Ibu/Saudara/i<br/>
              berkenan hadir dan memberikan doa restu.<br/>
              Terima kasih.
            </p>
            
            <h3 className="font-serif text-3xl md:text-5xl text-[#10260D] mt-16 mb-4">Wassalamu&apos;alaikum</h3>
            <p className="font-serif text-[#A6842E] text-xl md:text-2xl italic">Kel. Bapak Zayd Makarim & Kel. Bapak Ibrahim Sungkar</p>
          </FadeIn>
        </section>


        {/* SECTION 7 — FOOTER */}
        <footer className="relative z-10 bg-[#10260D] text-[#A6842E] py-12 border-t border-[#A6842E]/30 text-center overflow-hidden">
          <EgyptianPattern variant="light" />
          <div className="max-w-4xl mx-auto px-6 relative z-10">
            <h4 className="font-serif text-2xl mb-2">Amr & Ishmah</h4>
            <p className="font-sans text-sm tracking-widest opacity-80">24 JUNI 2026</p>
          </div>
        </footer>

      </div>
    </div>
  );
}
