import { useEffect, useState } from 'react';
import { Phone, ChevronDown } from 'lucide-react';

interface HeroProps {
  onNavClick: (section: string) => void;
}

export default function Hero({ onNavClick }: HeroProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => setOffset(window.pageYOffset);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden bg-dark-900">
      {/* Parallax Background */}
      <div
        className="absolute inset-0 z-0"
        style={{ transform: `translateY(${offset * 0.5}px)` }}
      >
        <img
          src="https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
          alt="Wedding photography"
          className="w-full h-full object-cover scale-110 opacity-70"
        />
        {/* Premium Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-b from-dark-900/60 via-dark-900/40 to-dark-900/90" />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center text-white px-6 w-full max-w-5xl mx-auto mt-20">
        <h1 className="font-serif text-5xl md:text-8xl font-medium mb-6 leading-tight fade-in tracking-tight">
          Golden Shutter
          <span className="block text-3xl md:text-5xl font-light text-gold-400 mt-4 italic tracking-normal">
            Photography
          </span>
        </h1>

        <div className="w-24 h-[1px] bg-gradient-to-r from-transparent via-gold-500 to-transparent mx-auto mb-10 opacity-60"></div>

        <p className="font-sans text-lg md:text-xl font-light mb-16 max-w-2xl mx-auto leading-relaxed text-gray-200 tracking-wide fade-in" style={{ animationDelay: '0.2s' }}>
          Capturing life's most precious moments with elegance, emotion, and timeless artistry.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20 fade-in" style={{ animationDelay: '0.4s' }}>
          <a
            href="tel:8809295961"
            className="w-full sm:w-auto group relative flex items-center justify-center gap-3 bg-gold-600/90 hover:bg-gold-500 text-dark-900 px-8 py-4 rounded-sm font-medium transition-all duration-300 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute inset-0 w-full h-full bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out"></div>
            <Phone className="w-5 h-5 relative z-10 group-hover:scale-110 transition-transform duration-300" />
            <span className="relative z-10 tracking-wide uppercase text-sm font-semibold">Book a Call</span>
          </a>

          <button
            onClick={() => onNavClick('gallery')}
            className="w-full sm:w-auto group relative flex items-center justify-center gap-3 border border-white/20 hover:border-gold-500/50 bg-white/5 hover:bg-dark-900/50 text-white px-8 py-4 rounded-sm font-medium transition-all duration-300 backdrop-blur-md"
          >
            <span className="tracking-wide uppercase text-sm font-semibold group-hover:text-gold-400 transition-colors">View Portfolio</span>
          </button>
        </div>

        {/* Scroll Indicator */}
        <button
          onClick={() => onNavClick('services')}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce flex flex-col items-center gap-2 opacity-50 hover:opacity-100 transition-opacity duration-300"
        >
          <span className="text-[10px] uppercase tracking-[0.2em] text-gold-200">Scroll</span>
          <ChevronDown className="w-5 h-5 text-gold-400" />
        </button>
      </div>
    </section>
  );
}