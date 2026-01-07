import { Camera, Video, Edit, BookOpen, Lightbulb, ShoppingBag } from 'lucide-react';

export default function Services() {
  const services = [
    {
      icon: Camera,
      title: 'Photography',
      description: 'Wedding, Pre-wedding, Baby, Product photography with professional equipment',
      image: "https://images.pexels.com/photos/1024992/pexels-photo-1024992.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      icon: Video,
      title: 'Videography',
      description: 'Reels, Wedding Films, Cinematic Edits with drone and gimbal shots',
      image: "https://images.pexels.com/photos/2543262/pexels-photo-2543262.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      icon: Edit,
      title: 'Editing',
      description: 'Photo & Video Editing, Color Grading with professional software',
      image: "https://images.pexels.com/photos/2506923/pexels-photo-2506923.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      icon: BookOpen,
      title: 'Album Design',
      description: 'Custom Album Layout & Printing with premium materials',
      image: "https://images.pexels.com/photos/1779487/pexels-photo-1779487.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      icon: Lightbulb,
      title: 'Backlit Printing',
      description: 'For portraits & display with enhanced visual appeal',
      image: "https://images.pexels.com/photos/1445384/pexels-photo-1445384.jpeg?auto=compress&cs=tinysrgb&w=800"
    },
    {
      icon: ShoppingBag,
      title: 'Commercial Shoots',
      description: 'Product, Branding, Business Visuals for your brand',
      image: "https://images.pexels.com/photos/1262304/pexels-photo-1262304.jpeg?auto=compress&cs=tinysrgb&w=800"
    }
  ];

  return (
    <section id="services" className="py-32 bg-dark-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-gold-600/5 rounded-full blur-[120px] -translate-y-1/2 translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <p className="text-gold-600 font-medium tracking-widest uppercase text-sm mb-3">Our Expertise</p>
          <h2 className="text-4xl md:text-6xl text-white mb-6 font-serif">
            Premium Services
          </h2>
          <div className="w-16 h-1 bg-gold-600 mx-auto rounded-full"></div>
        </div>

        {/* Mobile: Horizontal Snap Scroll, Desktop: Grid */}
        <div className="md:hidden -mx-6 px-6">
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x-mandatory py-4">
            {services.map((service, index) => (
              <div
                key={index}
                className="flex-none w-[85vw] max-w-sm group snap-center"
              >
                <div className="relative h-96 rounded-lg overflow-hidden bg-gray-900 shadow-xl transition-transform duration-500 group-hover:scale-[1.02]">
                  <img src={service.image} alt={service.title} className="w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500" />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/40 to-transparent"></div>

                  <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-500">
                    <div className="w-12 h-12 bg-gold-600 rounded-sm flex items-center justify-center mb-4 text-white">
                      <service.icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-2xl font-serif text-white mb-2">{service.title}</h3>
                    <p className="text-gray-300 font-light leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden md:grid grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group relative h-[400px] rounded-sm overflow-hidden bg-dark-900 cursor-pointer shadow-lg hover:shadow-2xl transition-all duration-500"
            >
              {/* Image Background */}
              <img
                src={service.image}
                alt={service.title}
                className="w-full h-full object-cover opacity-60 group-hover:scale-110 group-hover:opacity-40 transition-all duration-700"
              />

              {/* Gradient Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-dark-900 via-dark-900/50 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500"></div>

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end items-start transition-all duration-500">
                <div className="w-14 h-14 bg-white/10 backdrop-blur-md rounded-sm flex items-center justify-center mb-6 text-gold-400 group-hover:bg-gold-600 group-hover:text-white transition-all duration-300 border border-white/10">
                  <service.icon className="w-7 h-7" />
                </div>

                <h3 className="text-3xl font-serif text-white mb-3 translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                  {service.title}
                </h3>

                <p className="text-gray-300 font-light leading-relaxed opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500 delay-100">
                  {service.description}
                </p>

                <div className="h-0.5 w-0 bg-gold-500 group-hover:w-full transition-all duration-700 mt-6 delay-200"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}