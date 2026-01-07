import { Calendar, Camera, MapPin } from 'lucide-react';

export default function About() {
  const stats = [
    {
      icon: Calendar,
      number: '6+',
      label: 'Years Experience'
    },
    {
      icon: Camera,
      number: '500+',
      label: 'Events Captured'
    },
    {
      icon: MapPin,
      number: '20+',
      label: 'Cities Covered'
    }
  ];

  return (
    <section id="about" className="py-32 bg-dark-900 relative overflow-hidden">
      {/* Decorative floating elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-gold-600/5 rounded-full blur-[80px] -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <p className="text-gold-600 font-medium tracking-widest uppercase text-sm mb-3">Our Story</p>
          <h2 className="text-4xl md:text-6xl text-white mb-6 font-serif">
            Who We Are
          </h2>
          <div className="w-16 h-1 bg-gold-600 mx-auto rounded-full mb-8"></div>
          <p className="text-lg md:text-xl text-gray-300 max-w-4xl mx-auto leading-relaxed font-light">
            We are <span className="text-gold-500 font-serif italic">Golden Shutter Photography</span> — a passionate team of creators, capturing timeless moments
            across weddings, birthdays, baby shoots, and commercial projects. With years of experience and
            hundreds of happy clients, our goal is to preserve memories with soul.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-10 bg-dark-800 rounded-sm border border-white/5 hover:border-gold-600/30 transition-all duration-500 group">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-dark-900 rounded-full mb-6 border border-gold-600/20 group-hover:border-gold-600 group-hover:shadow-[0_0_20px_rgba(212,175,55,0.3)] transition-all duration-500">
                <stat.icon className="w-8 h-8 text-gold-500" />
              </div>
              <div className="text-4xl md:text-5xl font-serif text-white mb-3 group-hover:text-gold-500 transition-colors duration-300">
                {stat.number}
              </div>
              <div className="text-gray-400 font-light uppercase tracking-widest text-sm">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}