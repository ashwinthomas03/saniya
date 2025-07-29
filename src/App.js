import React, { useState, useEffect } from 'react';
import { Heart, Gift, Camera, Sparkles, Star, ChevronLeft, ChevronRight, Volume2, VolumeX } from 'lucide-react';

const BirthdayWebsite = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [candlesBlown, setCandlesBlown] = useState(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showHearts, setShowHearts] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [cardOpened, setCardOpened] = useState(false);
  const [cardInView, setCardInView] = useState(false);
  const [confettiActive, setConfettiActive] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [fireworksActive, setFireworksActive] = useState(false);

  const totalCandles = 5;

  // Personal photos for the gallery
  const galleryImages = [
    { 
      type: 'image', 
      src: 'https://lh3.googleusercontent.com/d/1hCwAneifZTfvs2-yVgxrSJkplHXBYDKs', 
      caption: 'Beautiful memories together'
    },
    { 
      type: 'image', 
      src: 'https://lh3.googleusercontent.com/d/1DXG7ER0U2JTZMyBSItq32JgtZOkjyp5q', 
      caption: 'Time together'
    },
    { 
      type: 'image', 
      src: 'https://lh3.googleusercontent.com/d/1qHRXCeBZgHv5IZGgYunDzrb8mPD1JEVX', 
      caption: 'Adventures we shared'
    },
    { 
      type: 'image', 
      src: 'https://lh3.googleusercontent.com/d/12hr3CFZBfGe1tUXr2Wuj2YvTY-wJXv5G', 
      caption: 'Special moments',
      rotation: 90 // This image needs 90-degree rotation
    },
    { 
      type: 'image', 
      src: 'https://lh3.googleusercontent.com/d/1WSl2CnPJLyFKaGGLfbWvbaD5vYc-OEic', 
      caption: 'More precious memories',
      rotation: 90 // This image also needs 90-degree rotation
    },
    { 
      type: 'image', 
      src: '/lp_image 3.png', 
      caption: 'Beautiful memories together',
      style: { transform: 'scale(1.8)' }
    },
    { 
      type: 'image', 
      src: '/Screenshot 2025-07-24 at 12.15.43 PM.png', 
      caption: 'Beautiful memories together',
      style: { transform: 'scale(1.8)' }
    },
  ];

  // Trigger spectacular fireworks on website load
  useEffect(() => {
    // Start fireworks immediately when splash screen loads
    setFireworksActive(true);
    
    // Keep fireworks running for longer on splash screen
    const fireworksTimer = setTimeout(() => {
      setFireworksActive(false);
    }, 12000); // Run fireworks for 12 seconds on splash

    return () => {
      clearTimeout(fireworksTimer);
    };
  }, []);

  useEffect(() => {
    if (candlesBlown >= totalCandles) {
      setConfettiActive(true);
      setFireworksActive(true); // Trigger fireworks when all candles are blown
      setTimeout(() => {
        setShowSplash(false);
        setShowHearts(true);
      }, 2000);
      setTimeout(() => setShowMessage(true), 4000);
      setTimeout(() => setFireworksActive(false), 4000); // Stop fireworks after celebration
    }
  }, [candlesBlown]);

  // Scroll observer for card animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setCardInView(true);
          setTimeout(() => setCardOpened(true), 800);
        }
      },
      { threshold: 0.3 }
    );

    const cardSection = document.getElementById('card-section');
    if (cardSection) {
      observer.observe(cardSection);
    }

    return () => {
      if (cardSection) {
        observer.unobserve(cardSection);
      }
    };
  }, [showMessage]);

  const blowCandle = (index) => {
    if (candlesBlown === index) {
      setCandlesBlown(prev => prev + 1);
      if (soundEnabled) {
        console.log('🎵 Candle blown sound!');
      }
    }
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % galleryImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + galleryImages.length) % galleryImages.length);
  };

  const SpectacularFireworks = () => (
    <div className={`fixed inset-0 pointer-events-none z-60 ${fireworksActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
      {/* Large Ground-Launched Rockets */}
      {[...Array(6)].map((_, rocketIndex) => (
        <div
          key={`rocket-${rocketIndex}`}
          className="absolute bottom-0"
          style={{
            left: `${15 + rocketIndex * 15}%`,
          }}
        >
          {/* Rocket trail */}
          <div
            className="w-1 h-1 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full animate-firework-rocket-trail shadow-lg"
            style={{
              boxShadow: '0 0 12px #ffd700, 0 0 24px #ff8c00',
              animationDelay: `${rocketIndex * 1.2}s`,
              animationDuration: '2s',
            }}
          />
          {/* Rocket spark trail */}
          <div
            className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-px h-8 bg-gradient-to-t from-orange-300 to-transparent animate-firework-rocket-sparks"
            style={{
              animationDelay: `${rocketIndex * 1.2}s`,
              animationDuration: '2s',
            }}
          />
        </div>
      ))}

      {/* Massive Firework Explosions */}
      {[...Array(12)].map((_, burstIndex) => (
        <div
          key={`mega-burst-${burstIndex}`}
          className="absolute"
          style={{
            left: `${10 + (burstIndex * 7) + Math.random() * 20}%`,
            top: `${10 + Math.random() * 40}%`,
          }}
        >
          {/* Main explosion particles - outer ring */}
          {[...Array(24)].map((_, particleIndex) => {
            const angle = (particleIndex * 15) * (Math.PI / 180);
            const distance = 80 + Math.random() * 100;
            const colors = ['#ff1744', '#ff6b9d', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43', '#2ecc71', '#e74c3c', '#9b59b6'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            return (
              <div
                key={`outer-particle-${particleIndex}`}
                className="absolute w-2 h-2 rounded-full animate-firework-explosion-outer"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 8px ${color}, 0 0 16px ${color}`,
                  left: '50%',
                  top: '50%',
                  '--particle-x': `${distance * Math.cos(angle)}px`,
                  '--particle-y': `${distance * Math.sin(angle)}px`,
                  animationDelay: `${burstIndex * 0.4 + Math.random() * 0.8}s`,
                  animationDuration: `${2.5 + Math.random() * 1.5}s`,
                }}
              />
            );
          })}

          {/* Inner explosion particles */}
          {[...Array(16)].map((_, particleIndex) => {
            const angle = (particleIndex * 22.5) * (Math.PI / 180);
            const distance = 40 + Math.random() * 60;
            const colors = ['#ffffff', '#fff700', '#ff0080', '#00ff80', '#8000ff', '#ff4000'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            return (
              <div
                key={`inner-particle-${particleIndex}`}
                className="absolute w-3 h-3 rounded-full animate-firework-explosion-inner"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 12px ${color}, 0 0 24px ${color}`,
                  left: '50%',
                  top: '50%',
                  '--particle-x': `${distance * Math.cos(angle)}px`,
                  '--particle-y': `${distance * Math.sin(angle)}px`,
                  animationDelay: `${burstIndex * 0.4 + Math.random() * 0.5}s`,
                  animationDuration: `${2 + Math.random() * 1}s`,
                }}
              />
            );
          })}

          {/* Massive central explosion flash */}
          <div
            className="absolute w-16 h-16 rounded-full animate-firework-mega-flash"
            style={{
              background: 'radial-gradient(circle, #ffffff 0%, #ffd700 30%, #ff4000 60%, transparent 100%)',
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: `${burstIndex * 0.4}s`,
              boxShadow: '0 0 40px #ffffff, 0 0 80px #ffd700',
            }}
          />

          {/* Secondary explosion rings */}
          <div
            className="absolute w-32 h-32 rounded-full border-4 border-white animate-firework-shockwave"
            style={{
              left: '50%',
              top: '50%',
              transform: 'translate(-50%, -50%)',
              animationDelay: `${burstIndex * 0.4 + 0.2}s`,
              borderColor: '#ffd700',
              boxShadow: '0 0 20px #ffd700',
            }}
          />
        </div>
      ))}

      {/* Willow Effect Fireworks */}
      {[...Array(8)].map((_, willowIndex) => (
        <div
          key={`willow-${willowIndex}`}
          className="absolute"
          style={{
            left: `${20 + willowIndex * 10}%`,
            top: `${20 + Math.random() * 30}%`,
          }}
        >
          {/* Willow trailing particles */}
          {[...Array(32)].map((_, particleIndex) => {
            const angle = (particleIndex * 11.25) * (Math.PI / 180);
            const distance = 60 + Math.random() * 80;
            const goldColors = ['#ffd700', '#ffed4e', '#fff59d', '#ffcc02'];
            const color = goldColors[Math.floor(Math.random() * goldColors.length)];
            
            return (
              <div
                key={`willow-particle-${particleIndex}`}
                className="absolute w-1 h-8 animate-firework-willow"
                style={{
                  background: `linear-gradient(to bottom, ${color} 0%, transparent 100%)`,
                  left: '50%',
                  top: '50%',
                  transformOrigin: 'top center',
                  '--particle-x': `${distance * Math.cos(angle)}px`,
                  '--particle-y': `${distance * Math.sin(angle)}px`,
                  animationDelay: `${willowIndex * 0.6 + Math.random() * 0.4}s`,
                  animationDuration: `${3 + Math.random() * 2}s`,
                  boxShadow: `0 0 4px ${color}`,
                }}
              />
            );
          })}
        </div>
      ))}

      {/* Chrysanthemum Fireworks */}
      {[...Array(6)].map((_, chrysIndex) => (
        <div
          key={`chrys-${chrysIndex}`}
          className="absolute"
          style={{
            left: `${25 + chrysIndex * 12}%`,
            top: `${15 + Math.random() * 35}%`,
          }}
        >
          {/* Dense chrysanthemum burst */}
          {[...Array(48)].map((_, particleIndex) => {
            const angle = (particleIndex * 7.5) * (Math.PI / 180);
            const distance = 50 + Math.random() * 70;
            const chrysColors = ['#ff1744', '#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3'];
            const color = chrysColors[Math.floor(Math.random() * chrysColors.length)];
            
            return (
              <div
                key={`chrys-particle-${particleIndex}`}
                className="absolute w-1.5 h-1.5 rounded-full animate-firework-chrysanthemum"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 6px ${color}`,
                  left: '50%',
                  top: '50%',
                  '--particle-x': `${distance * Math.cos(angle)}px`,
                  '--particle-y': `${distance * Math.sin(angle)}px`,
                  animationDelay: `${chrysIndex * 0.8 + Math.random() * 0.6}s`,
                  animationDuration: `${2.5 + Math.random() * 1.5}s`,
                }}
              />
            );
          })}
        </div>
      ))}

      {/* Peony Fireworks */}
      {[...Array(10)].map((_, peonyIndex) => (
        <div
          key={`peony-${peonyIndex}`}
          className="absolute"
          style={{
            left: `${15 + peonyIndex * 8}%`,
            top: `${25 + Math.random() * 25}%`,
          }}
        >
          {/* Peony burst pattern */}
          {[...Array(20)].map((_, particleIndex) => {
            const angle = (particleIndex * 18) * (Math.PI / 180);
            const distance = 45 + Math.random() * 55;
            const peonyColors = ['#ff5722', '#ff9800', '#ffc107', '#ffeb3b', '#cddc39', '#8bc34a'];
            const color = peonyColors[Math.floor(Math.random() * peonyColors.length)];
            
            return (
              <div
                key={`peony-particle-${particleIndex}`}
                className="absolute w-2.5 h-2.5 rounded-full animate-firework-peony"
                style={{
                  backgroundColor: color,
                  boxShadow: `0 0 10px ${color}, 0 0 20px ${color}`,
                  left: '50%',
                  top: '50%',
                  '--particle-x': `${distance * Math.cos(angle)}px`,
                  '--particle-y': `${distance * Math.sin(angle)}px`,
                  animationDelay: `${peonyIndex * 0.3 + Math.random() * 0.7}s`,
                  animationDuration: `${2 + Math.random() * 1.5}s`,
                }}
              />
            );
          })}
        </div>
      ))}

      {/* Crackling Effects */}
      {[...Array(50)].map((_, crackleIndex) => (
        <div
          key={`crackle-${crackleIndex}`}
          className="absolute w-0.5 h-0.5 bg-white rounded-full animate-firework-crackle"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 70}%`,
            animationDelay: `${Math.random() * 8}s`,
            animationDuration: `${0.5 + Math.random() * 1}s`,
            boxShadow: '0 0 4px #ffffff, 0 0 8px #ffffff',
          }}
        />
      ))}

      {/* Palm Tree Fireworks */}
      {[...Array(4)].map((_, palmIndex) => (
        <div
          key={`palm-${palmIndex}`}
          className="absolute"
          style={{
            left: `${30 + palmIndex * 15}%`,
            top: `${20 + Math.random() * 20}%`,
          }}
        >
          {/* Palm fronds effect */}
          {[...Array(12)].map((_, frondIndex) => {
            const baseAngle = (frondIndex * 30) * (Math.PI / 180);
            const palmColors = ['#4caf50', '#8bc34a', '#cddc39', '#ffeb3b'];
            const color = palmColors[Math.floor(Math.random() * palmColors.length)];
            
            return (
              <div
                key={`palm-frond-${frondIndex}`}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                }}
              >
                {/* Each frond has multiple segments */}
                {[...Array(8)].map((_, segmentIndex) => {
                  const segmentDistance = (segmentIndex + 1) * 12;
                  const angle = baseAngle + (Math.random() - 0.5) * 0.3;
                  
                  return (
                    <div
                      key={`segment-${segmentIndex}`}
                      className="absolute w-1 h-3 animate-firework-palm"
                      style={{
                        background: `linear-gradient(to bottom, ${color} 0%, transparent 100%)`,
                        left: `${segmentDistance * Math.cos(angle)}px`,
                        top: `${segmentDistance * Math.sin(angle)}px`,
                        transform: `rotate(${angle * 180 / Math.PI + 90}deg)`,
                        animationDelay: `${palmIndex * 1 + segmentIndex * 0.1}s`,
                        animationDuration: `${3 + Math.random() * 2}s`,
                        boxShadow: `0 0 3px ${color}`,
                      }}
                    />
                  );
                })}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );

  const ConfettiEffect = () => (
    <div className={`fixed inset-0 pointer-events-none z-40 ${confettiActive ? 'opacity-100' : 'opacity-0'} transition-opacity duration-1000`}>
      {[...Array(15)].map((_, i) => (
        <div
          key={i}
          className="absolute w-2 h-2 animate-bounce"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            backgroundColor: ['#ff6b9d', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff'][Math.floor(Math.random() * 5)],
            animationDelay: `${Math.random() * 2}s`,
            animationDuration: `${2 + Math.random() * 2}s`
          }}
        />
      ))}
    </div>
  );

  const SplashScreen = () => (
    <div className={`fixed inset-0 z-50 bg-gradient-to-br from-slate-900 via-gray-900 to-stone-900 flex items-center justify-center transition-opacity duration-1000 ${showSplash ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="text-center text-white max-w-4xl mx-auto px-6">
        
        {/* Elegant Header */}
        <div className="mb-16">
          <h1 className="text-4xl md:text-6xl font-light mb-4 tracking-wide bg-gradient-to-r from-white via-rose-200 to-amber-200 bg-clip-text text-transparent">
            Make a Wish
          </h1>
          <div className="flex items-center justify-center gap-4 mb-6">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
            <Sparkles className="w-6 h-6 text-rose-400" />
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
          </div>
          <p className="text-lg md:text-xl font-light text-gray-300 tracking-wide">
            Light the candles by tapping them in sequence
          </p>
        </div>
        
        {/* Elegant Cake */}
        <div className="relative mx-auto max-w-lg mb-16">
          
          {/* Cake Platform */}
          <div className="relative">
            {/* Candles Container - Positioned above cake */}
            <div className="flex justify-center space-x-6 mb-4">
              {[...Array(totalCandles)].map((_, i) => (
                <div key={i} className="relative group">
                  
                  {/* Candle */}
                  <div
                    className={`w-4 h-12 cursor-pointer transition-all duration-500 rounded-t-full shadow-lg group-hover:scale-110 ${
                      candlesBlown > i 
                        ? 'bg-gradient-to-t from-gray-700 to-gray-600' 
                        : 'bg-gradient-to-t from-yellow-200 to-yellow-100'
                    }`}
                    onClick={() => blowCandle(i)}
                  >
                    {/* Elegant Flame */}
                    {candlesBlown <= i && (
                      <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                        <div className="relative">
                          {/* Main flame */}
                          <div className="w-5 h-7 bg-gradient-to-t from-orange-500 via-yellow-400 to-yellow-200 rounded-full animate-pulse shadow-lg opacity-90">
                            {/* Inner flame */}
                            <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-3 h-4 bg-gradient-to-t from-orange-300 to-yellow-100 rounded-full animate-bounce opacity-80"></div>
                            {/* Flame core */}
                            <div className="absolute top-3 left-1/2 transform -translate-x-1/2 w-1 h-2 bg-white rounded-full opacity-60"></div>
                          </div>
                          {/* Flame glow effect */}
                          <div className="absolute inset-0 w-5 h-7 bg-yellow-300 rounded-full blur-sm opacity-30 animate-pulse"></div>
                        </div>
                      </div>
                    )}
                    
                    {/* Elegant smoke after blown */}
                    {candlesBlown > i && (
                      <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                        <div className="w-px h-10 bg-gradient-to-t from-gray-500 to-transparent opacity-70 animate-pulse"></div>
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 bg-gray-400 rounded-full opacity-30 animate-ping"></div>
                      </div>
                    )}
                  </div>
                  
                  {/* Elegant candle number */}
                  <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 text-gray-300 font-light text-sm tracking-wider">
                    {i + 1}
                  </div>
                </div>
              ))}
            </div>

            {/* Base Layer - Positioned below candles */}
            <div className="mx-auto w-80 h-20 bg-gradient-to-t from-amber-800 via-amber-700 to-amber-600 rounded-xl shadow-2xl relative overflow-hidden">
              {/* Decorative layers */}
              <div className="absolute top-0 left-0 right-0 h-3 bg-gradient-to-r from-rose-400 via-pink-400 to-rose-400 rounded-t-xl opacity-90"></div>
              <div className="absolute top-3 left-0 right-0 h-1 bg-white/60"></div>
              <div className="absolute top-5 left-0 right-0 h-2 bg-gradient-to-r from-amber-300 to-yellow-300 opacity-80"></div>
              
              {/* Subtle decorative elements */}
              <div className="absolute top-2 left-8 w-3 h-3 bg-rose-300 rounded-full opacity-70"></div>
              <div className="absolute top-2 right-8 w-3 h-3 bg-pink-300 rounded-full opacity-70"></div>
              <div className="absolute bottom-3 left-1/4 w-2 h-2 bg-yellow-300 rounded-full opacity-60"></div>
              <div className="absolute bottom-3 right-1/4 w-2 h-2 bg-rose-300 rounded-full opacity-60"></div>
            </div>
          </div>
        </div>
        
        {/* Progress Indicator */}
        <div className="mb-8">
          <div className="flex justify-center mb-4">
            <div className="flex space-x-2">
              {[...Array(totalCandles)].map((_, i) => (
                <div
                  key={i}
                  className={`w-3 h-3 rounded-full transition-all duration-500 ${
                    candlesBlown > i ? 'bg-rose-400' : 'bg-gray-600'
                  }`}
                />
              ))}
            </div>
          </div>
          <p className="text-gray-400 font-light tracking-wide">
            {candlesBlown} of {totalCandles} candles lit
          </p>
        </div>
        
        {/* Completion Message */}
        {candlesBlown >= totalCandles && (
          <div className="animate-fade-in">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20 max-w-md mx-auto">
              <div className="flex justify-center mb-4">
                <div className="flex space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse" 
                      style={{ animationDelay: `${i * 0.1}s` }}
                    />
                  ))}
                </div>
              </div>
              <h3 className="text-2xl font-light mb-3 text-rose-200">Wish Granted</h3>
              <p className="text-gray-300 font-light leading-relaxed">
                Your birthday celebration awaits...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const FloatingElements = () => (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Romantic floating hearts */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`heart-${i}`}
          className={`absolute animate-pulse ${showHearts ? 'opacity-20' : 'opacity-0'} transition-opacity duration-3000`}
          style={{
            left: `${15 + (i * 15)}%`,
            top: `${20 + Math.random() * 40}%`,
            animationDelay: `${i * 1.2}s`,
            animationDuration: '6s'
          }}
        >
          <Heart className={`w-6 h-6 fill-current ${
            i % 3 === 0 ? 'text-pink-400' : 
            i % 3 === 1 ? 'text-purple-400' : 
            'text-red-400'
          }`} />
        </div>
      ))}
      
      {/* Elegant rose petals */}
      {[...Array(8)].map((_, i) => (
        <div
          key={`petal-${i}`}
          className={`absolute animate-bounce ${showHearts ? 'opacity-15' : 'opacity-0'} transition-opacity duration-4000`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.8}s`,
            animationDuration: '8s',
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        >
          <div className={`w-4 h-4 rounded-full opacity-60 shadow-sm ${
            i % 4 === 0 ? 'bg-gradient-to-br from-pink-300 to-rose-400' :
            i % 4 === 1 ? 'bg-gradient-to-br from-purple-300 to-indigo-400' :
            i % 4 === 2 ? 'bg-gradient-to-br from-blue-300 to-cyan-400' :
            'bg-gradient-to-br from-amber-300 to-orange-400'
          }`}></div>
        </div>
      ))}
      
      {/* Dreamy light orbs */}
      {[...Array(4)].map((_, i) => (
        <div
          key={`orb-${i}`}
          className={`absolute animate-pulse ${showHearts ? 'opacity-10' : 'opacity-0'} transition-opacity duration-5000`}
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 2}s`,
            animationDuration: '10s'
          }}
        >
          <div className={`w-12 h-12 rounded-full blur-sm ${
            i % 2 === 0 ? 'bg-gradient-radial from-lavender-200 to-transparent' : 
            'bg-gradient-radial from-peach-200 to-transparent'
          }`}></div>
        </div>
      ))}
    </div>
  );

  const SubtleSparkles = () => (
    <div className="fixed inset-0 pointer-events-none">
      {/* Golden sparkles */}
      {[...Array(10)].map((_, i) => (
        <div
          key={`sparkle-${i}`}
          className="absolute animate-pulse opacity-25"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 0.7}s`,
            animationDuration: '4s'
          }}
        >
          <Sparkles className={`w-3 h-3 ${
            i % 3 === 0 ? 'text-amber-300' :
            i % 3 === 1 ? 'text-yellow-300' :
            'text-orange-300'
          }`} />
        </div>
      ))}
      
      {/* Twinkling stars */}
      {[...Array(6)].map((_, i) => (
        <div
          key={`star-${i}`}
          className="absolute animate-ping opacity-20"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${i * 1.5}s`,
            animationDuration: '3s'
          }}
        >
          <Star className={`w-2 h-2 fill-current ${
            i % 2 === 0 ? 'text-cyan-300' : 'text-indigo-300'
          }`} />
        </div>
      ))}
    </div>
  );

  if (showSplash) {
    return (
      <>
        <SplashScreen />
        <SpectacularFireworks />
        <ConfettiEffect />
      </>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-100 relative overflow-hidden">
      {/* Romantic background elements */}
      <div className="absolute inset-0 opacity-25">
        {/* Soft gradient orbs */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-radial from-blue-200 to-transparent rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-radial from-purple-200 to-transparent rounded-full blur-lg animate-pulse animation-delay-1000"></div>
        <div className="absolute bottom-32 left-20 w-28 h-28 bg-gradient-radial from-pink-200 to-transparent rounded-full blur-xl animate-pulse animation-delay-1500"></div>
        <div className="absolute bottom-20 right-32 w-20 h-20 bg-gradient-radial from-amber-200 to-transparent rounded-full blur-lg animate-pulse animation-delay-500"></div>
        
        {/* Dreamy flowing shapes */}
        <div className="absolute top-1/4 left-1/4 w-40 h-20 bg-gradient-to-r from-indigo-200 to-purple-200 opacity-20 rounded-full blur-2xl transform rotate-45 animate-pulse"></div>
        <div className="absolute bottom-1/3 right-1/4 w-36 h-18 bg-gradient-to-r from-pink-200 to-rose-200 opacity-20 rounded-full blur-2xl transform -rotate-45 animate-pulse animation-delay-1000"></div>
      </div>
      
      <FloatingElements />
      <SubtleSparkles />
      <SpectacularFireworks />
      <ConfettiEffect />
      
      {/* Sound Toggle */}
      <button
        onClick={() => setSoundEnabled(!soundEnabled)}
        className="fixed top-6 right-6 z-40 bg-white/80 backdrop-blur-sm p-3 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
      >
        {soundEnabled ? (
          <Volume2 className="w-5 h-5 text-slate-600" />
        ) : (
          <VolumeX className="w-5 h-5 text-slate-600" />
        )}
      </button>
      
      {/* Hero Section */}
      <section className="min-h-screen flex items-center justify-center relative px-6">
        {/* Romantic backdrop */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-96 h-96 bg-gradient-radial from-pink-100 via-rose-50 to-transparent rounded-full opacity-40 animate-pulse"></div>
        </div>
        
        <div className="text-center z-10 max-w-5xl mx-auto relative">
          {/* Elegant frame around content */}
          <div className="absolute inset-0 border-2 border-rose-200 rounded-3xl opacity-20 transform rotate-1"></div>
          <div className="absolute inset-0 border border-pink-200 rounded-3xl opacity-30 transform -rotate-1"></div>
          
          <div className="relative bg-white/20 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-white/40">
            <div className="transform hover:scale-102 transition-transform duration-700">
              {/* Romantic header with flourishes */}
              <div className="flex justify-center items-center mb-6">
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
                <div className="mx-4 flex space-x-2">
                  <Heart className="w-4 h-4 text-pink-500 fill-pink-500" />
                  <Heart className="w-3 h-3 text-purple-500 fill-purple-500 mt-0.5" />
                  <Heart className="w-4 h-4 text-red-500 fill-red-500" />
                </div>
                <div className="w-16 h-px bg-gradient-to-r from-transparent via-purple-400 to-transparent"></div>
              </div>
              
              <h1 className="text-5xl md:text-7xl lg:text-8xl font-light tracking-wide bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent mb-6 leading-tight animate-fade-in">
                Happy Birthday
              </h1>
              
              {/* Elegant subtitle with decorative elements */}
              <div className="flex justify-center items-center mb-8">
                <Sparkles className="w-4 h-4 text-amber-400 mr-3" />
                <span className="text-lg md:text-xl text-purple-700 font-light italic tracking-wide">
                  To My Beautiful Love
                </span>
                <Sparkles className="w-4 h-4 text-orange-400 ml-3" />
              </div>
              
              <div className="flex justify-center mb-8">
                <div className="relative cursor-pointer group" onClick={() => {
                  setConfettiActive(!confettiActive);
                  setFireworksActive(true);
                  setTimeout(() => setFireworksActive(false), 3000);
                }}>
                  {/* Glowing gift effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full blur-lg opacity-30 group-hover:opacity-50 transition-opacity animate-pulse"></div>
                  <Gift className="relative w-12 h-12 text-indigo-600 animate-bounce hover:scale-110 transition-transform" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-amber-400 rounded-full animate-ping"></div>
                  <p>Click here</p>
                </div>
              </div>
              
              <p className="text-xl md:text-2xl text-indigo-700 mb-12 font-light tracking-wide animate-slide-up">
                Celebrating the extraordinary person you are
              </p>
              
              <div className="space-y-6 text-base md:text-lg text-slate-600 max-w-3xl mx-auto font-light leading-relaxed">
                <p className="animate-slide-up opacity-0 animation-delay-500">
                  Today marks another year of your beautiful journey through life, filled with grace, wisdom, and endless possibilities.
                </p>
                <p className="animate-slide-up opacity-0 animation-delay-1000">
                  Your presence brings warmth to every room, and your spirit illuminates the lives of everyone fortunate enough to know you.
                </p>
                <p className="animate-slide-up opacity-0 animation-delay-1500">
                  Here's to celebrating you and all the wonderful moments yet to come.
                </p>
              </div>
              
              {/* Romantic quote */}
              <div className="mt-12 p-6 bg-gradient-to-r from-purple-100/50 to-pink-100/50 backdrop-blur-sm rounded-2xl border border-purple-200">
                <p className="text-purple-700 italic font-light text-lg">
                  "In you, I've found the love of my life and my closest, truest friend."
                </p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Enhanced Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="flex flex-col items-center text-indigo-600 hover:text-purple-700 transition-colors cursor-pointer group">
            <span className="text-sm font-light mb-3 tracking-wide opacity-80 group-hover:opacity-100">Scroll to explore our story</span>
            <div className="w-6 h-10 border-2 border-purple-400 rounded-full flex justify-center relative">
              <div className="w-1 h-3 bg-purple-400 rounded-full mt-2 animate-pulse"></div>
              <div className="absolute inset-0 border border-pink-300 rounded-full animate-ping opacity-30"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-24 px-6 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-light text-slate-800 mb-6 tracking-wide">
              Cherished Memories
            </h2>
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
              <Camera className="w-6 h-6 text-rose-500" />
              <div className="w-16 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent"></div>
            </div>
            <p className="text-lg text-slate-600 font-light">A curated collection of our most treasured moments</p>
          </div>
          
          <div className="relative max-w-4xl mx-auto">
            <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white/80 backdrop-blur-sm p-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl group">
                <img
                  src={galleryImages[currentImageIndex].src}
                  alt={galleryImages[currentImageIndex].caption}
                  className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 cursor-pointer ${
                    galleryImages[currentImageIndex].rotation ? `rotate-${galleryImages[currentImageIndex].rotation}` : ''
                  }`}
                  style={{
                    transform: galleryImages[currentImageIndex].rotation 
                      ? `rotate(${galleryImages[currentImageIndex].rotation}deg)` 
                      : undefined
                  }}
                  onClick={() => {
                    setConfettiActive(true);
                    setFireworksActive(true);
                    setTimeout(() => setFireworksActive(false), 2000);
                  }}
                  onError={(e) => {
                    // Try fallback URL if primary fails
                    if (galleryImages[currentImageIndex].fallback && e.target.src !== galleryImages[currentImageIndex].fallback) {
                      console.log('Trying fallback for image:', currentImageIndex);
                      e.target.src = galleryImages[currentImageIndex].fallback;
                    } else {
                      console.log('Image failed to load:', e.target.src);
                    }
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <p className="text-white text-lg font-light tracking-wide">
                    {galleryImages[currentImageIndex].caption}
                  </p>
                </div>
                {/* Click hint */}
              </div>
              
              <div className="flex justify-between items-center mt-6">
                <button
                  onClick={prevImage}
                  className="group bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
                </button>
                
                <div className="flex space-x-3">
                  {galleryImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full transition-all duration-300 hover:scale-125 ${
                        index === currentImageIndex 
                          ? 'bg-rose-500 w-8' 
                          : 'bg-slate-300 hover:bg-slate-400'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={nextImage}
                  className="group bg-slate-800 hover:bg-slate-700 text-white px-6 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center gap-2"
                >
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Special Message Section */}
      <section id="card-section" className="py-24 px-6 relative">
        <div className="max-w-4xl mx-auto text-center">
          <div className={`transform transition-all duration-1000 ${cardInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
            
            {/* Birthday Card */}
            <div className="relative mx-auto max-w-2xl perspective-1000">
              {/* Card Container */}
              <div className="relative w-full h-96 mb-8 preserve-3d">
                
                {/* Front of Card */}
                <div className={`absolute inset-0 w-full h-full backface-hidden transition-transform duration-1500 ease-out ${cardOpened ? 'rotate-y-180' : ''}`}>
                  <div className="w-full h-full bg-gradient-to-br from-rose-100 to-pink-200 rounded-2xl shadow-2xl border border-rose-200 flex items-center justify-center relative overflow-hidden cursor-pointer hover:scale-105 transition-transform"
                       onClick={() => setCardOpened(true)}>
                    {/* Decorative elements on front */}
                    <div className="absolute top-4 left-4 w-8 h-8 bg-rose-300 rounded-full opacity-60 animate-pulse"></div>
                    <div className="absolute top-8 right-6 w-6 h-6 bg-pink-300 rounded-full opacity-60 animate-pulse animation-delay-500"></div>
                    <div className="absolute bottom-6 left-8 w-4 h-4 bg-rose-400 rounded-full opacity-60 animate-pulse animation-delay-1000"></div>
                    <div className="absolute bottom-4 right-4 w-10 h-10 bg-pink-200 rounded-full opacity-60 animate-pulse animation-delay-1500"></div>
                    
                    {/* Front content */}
                    <div className="text-center z-10">
                      <div className="mb-4">
                        <Gift className="w-16 h-16 text-rose-500 mx-auto mb-4 animate-bounce" />
                      </div>
                      <h3 className="text-2xl md:text-3xl font-light text-slate-800 mb-2 tracking-wide">
                        Happy Birthday
                      </h3>
                      <p className="text-slate-600 font-light">Your special message awaits</p>
                      <div className="mt-4 animate-pulse">
                        <div className="w-8 h-1 bg-rose-400 mx-auto rounded-full"></div>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Back of Card (Message) */}
                <div className={`absolute inset-0 w-full h-full backface-hidden rotate-y-180 transition-transform duration-1500 ease-out ${cardOpened ? 'rotate-y-0' : ''}`}>
                  <div className="w-full h-full bg-gradient-to-br from-white to-rose-50 rounded-2xl shadow-2xl border border-rose-200 relative overflow-hidden">
                    {/* Decorative elements on back */}
                    <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
                      <div className="absolute top-4 left-4 w-6 h-6 bg-rose-300 rounded-full"></div>
                      <div className="absolute top-12 right-8 w-4 h-4 bg-pink-300 rounded-full"></div>
                      <div className="absolute bottom-8 left-12 w-8 h-8 bg-rose-200 rounded-full"></div>
                      <div className="absolute bottom-4 right-4 w-5 h-5 bg-pink-400 rounded-full"></div>
                    </div>
                    
                    {/* Scrollable Message content */}
                    <div className="h-full overflow-y-auto p-8 scrollbar-thin scrollbar-thumb-rose-300 scrollbar-track-rose-100">
                      <div className="text-center max-w-lg mx-auto">
                        <div className="flex justify-center mb-6">
                          <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className="w-5 h-5 text-amber-400 fill-amber-400 animate-pulse cursor-pointer hover:scale-125 transition-transform" 
                                style={{ animationDelay: `${i * 0.2}s`, animationDuration: '2s' }}
                                onClick={() => {
                                  setConfettiActive(true);
                                  setFireworksActive(true);
                                  setTimeout(() => setFireworksActive(false), 2000);
                                }}
                              />
                            ))}
                          </div>
                        </div>
                        
                        <h4 className="text-xl md:text-2xl font-light text-slate-800 mb-6 tracking-wide sticky top-0 bg-gradient-to-b from-white to-rose-50 pb-2 z-10">
                          A Personal Note
                        </h4>
                        
                        <div className="text-sm md:text-base text-slate-600 space-y-6 leading-relaxed font-light">
  <p className="italic text-slate-500">
    My Dearest Niyooseeee, ❤️
  </p>

  <p>
    I don’t know where to start or how to begin, but all I can jump start this letter 
    by saying how grateful and happy I am to have a partner like you by my side. 🥰 
    Having someone to talk to openly or share things without having to think twice 
    is something I always look forward to from you. Your eyes, your smile, and your love 
    make me feel comforted, joyful, and happy. Believe me or not, but getting to bed without 
    talking to you makes me feel very incomplete. 😘
  </p>

  <p>
    From the day we actually started talking, I felt this connection — that missing piece 
    of my life I always thrived to fit into. But after getting to know you better, 
    and like I always used to tell you, getting the “wifey vibes” helped me realize 
    you are my endgame. 💍💖
  </p>

  <p>
    Even though you get annoying and give me that look with that unda kanu 😏, 
    I simply love seeing it — so much that I sometimes purposely drive you mad. 
    I know I haven’t been perfect with what you expect out of me, but I promise I will try 
    to be the best dudu fudu I can for you. 🤞💌
  </p>

  <p className="text-rose-600 font-normal">
    So let me officially say: Happy Birthday my beautiful, amazing, sweet, naughty, and charming baby! 🎂🎉  
    May your year be filled with happiness, joy, and love, and may you get everything that you’ve asked for (including me hehe 😉).  
    I want you to know that your presence is a gift to me, and I will be there with you forever, 
    celebrating all your birthdays and making each one a blast. 🥳💝
  </p>

  <p className="text-slate-700 font-normal mt-8 pb-4">
    I love you so much, chakkare 😘💞… and pssttt, since you’re old now — no gifts! 🎁❌😂
    <br />
    <br></br>
    <span className="text-base font-medium">From your Ichayan 😘</span>
  </p>

  <div className="flex justify-center mt-6 mb-2">
    <div className="text-2xl">💝🎂🥳😍</div>
  </div>
</div>

                      </div>
                    </div>
                    
                    {/* Scroll indicator */}
                    <div className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
                      <div className="w-2 h-2 bg-rose-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>
                </div>
                
              </div>
              
              {/* Interactive buttons */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => setCardOpened(!cardOpened)}
                  className="bg-rose-500 hover:bg-rose-600 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-light tracking-wide"
                >
                  {cardOpened ? 'Close Card' : 'Open Card'}
                </button>
                <button
                  onClick={() => {
                    setConfettiActive(true);
                    setFireworksActive(true);
                    setTimeout(() => setFireworksActive(false), 4000);
                  }}
                  className="bg-amber-500 hover:bg-amber-600 text-white px-8 py-3 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 font-light tracking-wide"
                >
                  🎆 Launch Fireworks!
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Elegant Footer */}
      <footer className="py-12 text-center border-t border-white/20">
        <div className="flex justify-center space-x-2 mb-6">
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent self-center"></div>
          <Heart className="w-4 h-4 text-rose-400 fill-rose-400" />
          <div className="w-12 h-px bg-gradient-to-r from-transparent via-rose-400 to-transparent self-center"></div>
        </div>
        <p className="text-slate-500 font-light tracking-wide">Crafted with love and appreciation by your greatttt boyfriend 😘</p>
      </footer>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
        }
        
        @keyframes slide-up {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes firework-rocket-trail {
          0% {
            transform: translateY(0) scale(1);
            opacity: 1;
          }
          50% {
            transform: translateY(-200px) scale(1.5);
            opacity: 0.8;
          }
          100% {
            transform: translateY(-400px) scale(0.5);
            opacity: 0;
          }
        }
        
        @keyframes firework-rocket-sparks {
          0% {
            opacity: 1;
            height: 8px;
          }
          100% {
            opacity: 0;
            height: 40px;
          }
        }
        
        @keyframes firework-explosion-outer {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          50% {
            opacity: 0.8;
          }
          100% {
            transform: translate(calc(-50% + var(--particle-x)), calc(-50% + var(--particle-y))) scale(0);
            opacity: 0;
          }
        }
        
        @keyframes firework-explosion-inner {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          30% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--particle-x)), calc(-50% + var(--particle-y))) scale(0.3);
            opacity: 0;
          }
        }
        
        @keyframes firework-mega-flash {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 1;
          }
          20% {
            transform: translate(-50%, -50%) scale(2);
            opacity: 1;
          }
          100% {
            transform: translate(-50%, -50%) scale(4);
            opacity: 0;
          }
        }
        
        @keyframes firework-shockwave {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(3);
            opacity: 0;
          }
        }
        
        @keyframes firework-willow {
          0% {
            transform: translate(-50%, -50%) rotate(0deg) scale(1);
            opacity: 1;
          }
          50% {
            transform: translate(calc(-50% + var(--particle-x) * 0.5), calc(-50% + var(--particle-y) * 0.5)) rotate(180deg) scale(1.2);
            opacity: 0.8;
          }
          100% {
            transform: translate(calc(-50% + var(--particle-x)), calc(-50% + var(--particle-y) + 100px)) rotate(360deg) scale(0.3);
            opacity: 0;
          }
        }
        
        @keyframes firework-chrysanthemum {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translate(calc(-50% + var(--particle-x)), calc(-50% + var(--particle-y))) scale(0.1);
            opacity: 0;
          }
        }
        
        @keyframes firework-peony {
          0% {
            transform: translate(-50%, -50%) scale(1);
            opacity: 1;
          }
          30% {
            opacity: 1;
            transform: translate(calc(-50% + var(--particle-x) * 0.3), calc(-50% + var(--particle-y) * 0.3)) scale(1.5);
          }
          100% {
            transform: translate(calc(-50% + var(--particle-x)), calc(-50% + var(--particle-y))) scale(0.2);
            opacity: 0;
          }
        }
        
        @keyframes firework-crackle {
          0%, 100% {
            opacity: 0;
            transform: scale(0);
          }
          10%, 30%, 50%, 70%, 90% {
            opacity: 1;
            transform: scale(1);
          }
          20%, 40%, 60%, 80% {
            opacity: 0.3;
            transform: scale(0.5);
          }
        }
        
        @keyframes firework-palm {
          0% {
            opacity: 1;
            transform: rotate(var(--rotation, 0deg)) scale(1);
          }
          70% {
            opacity: 0.8;
          }
          100% {
            opacity: 0;
            transform: rotate(var(--rotation, 0deg)) scale(0.3) translateY(50px);
          }
        }
        
        .animate-slide-up {
          animation: slide-up 0.8s ease-out forwards;
        }
        
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
        
        .animate-firework-rocket-trail {
          animation: firework-rocket-trail ease-out forwards;
        }
        
        .animate-firework-rocket-sparks {
          animation: firework-rocket-sparks ease-out forwards;
        }
        
        .animate-firework-explosion-outer {
          animation: firework-explosion-outer ease-out forwards;
        }
        
        .animate-firework-explosion-inner {
          animation: firework-explosion-inner ease-out forwards;
        }
        
        .animate-firework-mega-flash {
          animation: firework-mega-flash 0.8s ease-out forwards;
        }
        
        .animate-firework-shockwave {
          animation: firework-shockwave 1.5s ease-out forwards;
        }
        
        .animate-firework-willow {
          animation: firework-willow ease-out forwards;
        }
        
        .animate-firework-chrysanthemum {
          animation: firework-chrysanthemum ease-out forwards;
        }
        
        .animate-firework-peony {
          animation: firework-peony ease-out forwards;
        }
        
        .animate-firework-crackle {
          animation: firework-crackle ease-in-out infinite;
        }
        
        .animate-firework-palm {
          animation: firework-palm ease-out forwards;
        }
        
        .animation-delay-500 {
          animation-delay: 0.5s;
        }
        
        .animation-delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-1500 {
          animation-delay: 1.5s;
        }
        
        .hover\\:scale-102:hover {
          transform: scale(1.02);
        }
        
        .backdrop-blur-sm {
          backdrop-filter: blur(8px);
        }
        
        .backdrop-blur-md {
          backdrop-filter: blur(12px);
        }
        
        /* 3D Card Animation Styles */
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .preserve-3d {
          transform-style: preserve-3d;
        }
        
        .backface-hidden {
          backface-visibility: hidden;
        }
        
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        
        .rotate-y-0 {
          transform: rotateY(0deg);
        }
        
        /* Scroll indicator animation */
        @keyframes scroll-bounce {
          0%, 20%, 50%, 80%, 100% {
            transform: translateY(0);
          }
          40% {
            transform: translateY(-4px);
          }
          60% {
            transform: translateY(-2px);
          }
        }
        
        .animate-scroll {
          animation: scroll-bounce 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default BirthdayWebsite;