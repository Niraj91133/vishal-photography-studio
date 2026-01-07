import { useState, useEffect } from 'react';
import { Menu, X, Camera } from 'lucide-react';

interface HeaderProps {
  activeSection: string;
  onNavClick: (section: string) => void;
}

export default function Header({ activeSection, onNavClick }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { id: 'hero', label: 'Home' },
    { id: 'services', label: 'Services' },
    { id: 'gallery', label: 'Gallery' },
    { id: 'packages', label: 'Packages' },
    { id: 'contact', label: 'Contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 border-b ${isScrolled
        ? 'bg-dark-500/80 backdrop-blur-xl border-white/10 py-4'
        : 'bg-transparent border-transparent py-6'
        }`}
    >
      <nav className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 group cursor-pointer" onClick={() => onNavClick('hero')}>
            <div className={`p-2 rounded-lg transition-colors duration-300 ${isScrolled ? 'bg-gold-600/10' : 'bg-white/10'}`}>
              <Camera className={`w-6 h-6 ${isScrolled ? 'text-gold-600' : 'text-white'}`} />
            </div>
            <span className={`text-2xl font-serif font-bold tracking-tight ${isScrolled ? 'text-white' : 'text-white'}`}>
              Golden<span className="text-gold-600">Shutter</span>
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavClick(item.id)}
                className={`text-sm font-medium tracking-wide transition-all duration-300 relative group py-2 ${activeSection === item.id
                  ? 'text-gold-600'
                  : 'text-gray-300 hover:text-white'
                  }`}
              >
                {item.label}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gold-600 transform origin-left transition-transform duration-300 ${activeSection === item.id ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  }`}></span>
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 text-white hover:text-gold-600 transition-colors"
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Overlay */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 z-40 bg-dark-500/95 backdrop-blur-2xl transition-all duration-300 flex flex-col justify-center">
            {/* Close button positioned absolutely top right to match the header's X button position approx */}
            <div className="absolute top-0 right-0 p-6 pt-8">
              {/* This is just a spacer or we could put the X here, but the X is in the fixed header which is z-50. 
                   So the overlay being z-40 is below the header. Good. */}
            </div>

            <div className="flex flex-col space-y-8 px-8">
              {navItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    onNavClick(item.id);
                    setIsMenuOpen(false);
                  }}
                  className={`text-4xl font-serif font-bold text-left transition-all duration-300 transform hover:translate-x-2 ${activeSection === item.id
                    ? 'text-gold-600'
                    : 'text-white/50 hover:text-white'
                    }`}
                >
                  {item.label}
                </button>
              ))}
            </div>

            <div className="absolute bottom-12 left-0 right-0 px-8">
              <p className="text-gold-600 text-sm font-medium tracking-widest uppercase mb-2">Golden Shutter</p>
              <p className="text-white/40 text-sm">Capturing Memories, Crafting Stories</p>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}