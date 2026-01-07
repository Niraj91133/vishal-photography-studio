import { useState } from 'react';

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filters = ['All', 'Wedding', 'Pre-Wedding', 'Birthday', 'Product'];

  const galleryImages = [
    {
      url: 'https://images.pexels.com/photos/1024993/pexels-photo-1024993.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Wedding',
      title: 'Wedding Ceremony'
    },
    {
      url: 'https://images.pexels.com/photos/1043474/pexels-photo-1043474.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Pre-Wedding',
      title: 'Engagement Shoot'
    },
    {
      url: 'https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Wedding',
      title: 'Reception'
    },
    {
      url: 'https://images.pexels.com/photos/1024992/pexels-photo-1024992.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Birthday',
      title: 'Birthday Celebration'
    },
    {
      url: 'https://images.pexels.com/photos/1445384/pexels-photo-1445384.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Pre-Wedding',
      title: 'Couple Portrait'
    },
    {
      url: 'https://images.pexels.com/photos/1043473/pexels-photo-1043473.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Wedding',
      title: 'Wedding Details'
    },
    {
      url: 'https://images.pexels.com/photos/1262304/pexels-photo-1262304.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Product',
      title: 'Product Photography'
    },
    {
      url: 'https://images.pexels.com/photos/1043472/pexels-photo-1043472.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Wedding',
      title: 'Bridal Portrait'
    },
    {
      url: 'https://images.pexels.com/photos/1024990/pexels-photo-1024990.jpeg?auto=compress&cs=tinysrgb&w=800',
      category: 'Birthday',
      title: 'Family Portrait'
    }
  ];

  const filteredImages = activeFilter === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeFilter);

  return (
    <section id="gallery" className="py-32 bg-dark-900 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-20">
          <p className="text-gold-600 font-medium tracking-widest uppercase text-sm mb-3">Portfolio</p>
          <h2 className="text-4xl md:text-6xl text-white mb-6 font-serif">
            Captured Moments
          </h2>
          <div className="w-16 h-1 bg-gold-600 mx-auto rounded-full"></div>
        </div>

        {/* Filter Tabs */}
        <div className="flex justify-center mb-16 overflow-x-auto scrollbar-hide py-4">
          <div className="inline-flex bg-white/5 p-1 rounded-sm border border-white/10 backdrop-blur-sm">
            {filters.map((filter) => (
              <button
                key={filter}
                onClick={() => setActiveFilter(filter)}
                className={`px-8 py-3 text-sm font-medium transition-all duration-300 rounded-sm whitespace-nowrap ${activeFilter === filter
                  ? 'bg-gold-600 text-dark-900 shadow-lg'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Mobile: Horizontal Scroll */}
        <div className="md:hidden -mx-6 px-6">
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x-mandatory py-4">
            {filteredImages.map((image, index) => (
              <div
                key={index}
                className="flex-none w-[85vw] max-w-sm h-[500px] rounded-sm overflow-hidden relative snap-center shadow-xl group border border-white/10"
              >
                <img
                  src={image.url}
                  alt={image.title}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-transparent to-transparent opacity-90"></div>
                <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <p className="text-gold-500 text-sm font-medium uppercase tracking-wider mb-2">{image.category}</p>
                  <p className="text-2xl font-serif text-white">{image.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Masonry Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredImages.map((image, index) => (
            <div
              key={index}
              className={`rounded-sm overflow-hidden group cursor-pointer relative transition-all duration-500 hover:shadow-2xl border border-white/5 bg-dark-800 ${index % 3 === 0 ? 'row-span-2 h-[600px]' : 'h-[300px]'
                }`}
            >
              <div className="relative overflow-hidden h-full w-full">
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 opacity-70 group-hover:opacity-100"
                />

                {/* Hover Overlay */}
                <div className="absolute inset-0 bg-dark-900/40 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-4 group-hover:translate-y-0 transition-transform duration-500 opacity-0 group-hover:opacity-100">
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/60 to-transparent"></div>
                  <div className="relative z-10">
                    <p className="text-gold-500 text-sm font-medium uppercase tracking-wider mb-2">{image.category}</p>
                    <h3 className="text-2xl font-serif text-white">{image.title}</h3>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}