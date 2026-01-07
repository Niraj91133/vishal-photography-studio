import { Star, Quote } from 'lucide-react';

export default function Testimonials() {
  const testimonials = [
    {
      name: 'Priya & Rahul',
      event: 'Wedding, Patna',
      rating: 5,
      text: 'Golden Shutter captured our special day beautifully. Every moment was perfect!',
      initials: 'PR'
    },
    {
      name: 'Anjali Sharma',
      event: 'Pre-Wedding, Bodhgaya',
      rating: 5,
      text: 'Professional team with amazing creativity. Highly recommend for any occasion!',
      initials: 'AS'
    },
    {
      name: 'Vikash Kumar',
      event: 'Birthday Party, Gaya',
      rating: 5,
      text: 'Excellent service and beautiful photos. They made our celebration memorable.',
      initials: 'VK'
    },
    {
      name: 'Ritu & Amit',
      event: 'Wedding, Bihar Sharif',
      rating: 5,
      text: 'Outstanding quality and professional approach. Best photography team in Bihar!',
      initials: 'RA'
    },
    {
      name: 'Deepak Enterprises',
      event: 'Product Shoot, Patna',
      rating: 5,
      text: 'Amazing commercial photography that boosted our brand presence significantly.',
      initials: 'DE'
    }
  ];

  return (
    <section id="testimonials" className="py-32 bg-dark-800 relative">
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gold-500/20 to-transparent"></div>

      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="text-center mb-20">
          <p className="text-gold-600 font-medium tracking-widest uppercase text-sm mb-3">Testimonials</p>
          <h2 className="text-4xl md:text-6xl text-white mb-6 font-serif">
            Client Love
          </h2>
          <div className="w-16 h-1 bg-gold-600 mx-auto rounded-full"></div>
        </div>

        {/* Horizontal Scroll Container */}
        <div className="md:grid md:grid-cols-2 lg:grid-cols-3 gap-8 hidden">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-8 bg-dark-900 rounded-sm border border-white/5 hover:border-gold-600/30 transition-all duration-300 relative group"
            >
              <Quote className="absolute top-8 right-8 w-12 h-12 text-gold-600/10 group-hover:text-gold-600/20 transition-colors" />

              <div className="flex items-center mb-8">
                <div className="w-14 h-14 bg-gradient-to-br from-gold-400 to-gold-600 rounded-sm flex items-center justify-center text-dark-900 font-serif font-bold text-xl mr-4 shadow-lg">
                  {testimonial.initials}
                </div>
                <div>
                  <h4 className="font-serif text-lg text-white mb-1">{testimonial.name}</h4>
                  <p className="text-sm text-gold-500/80 uppercase tracking-wider text-[10px]">{testimonial.event}</p>
                </div>
              </div>

              <div className="flex mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 text-gold-400 fill-current" />
                ))}
              </div>

              <p className="text-gray-300 leading-relaxed font-light">
                "{testimonial.text}"
              </p>
            </div>
          ))}
        </div>

        {/* Mobile Scroll */}
        <div className="md:hidden -mx-6 px-6">
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x-mandatory py-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="flex-none w-[85vw] max-w-sm p-8 bg-dark-900 rounded-sm border border-white/5 snap-center relative"
              >
                <Quote className="absolute top-6 right-6 w-10 h-10 text-gold-600/10" />
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gold-600 rounded-sm flex items-center justify-center text-dark-900 font-serif font-bold text-lg mr-4">
                    {testimonial.initials}
                  </div>
                  <div>
                    <h4 className="font-serif text-lg text-white">{testimonial.name}</h4>
                    <p className="text-xs text-gold-500/80 uppercase tracking-widest">{testimonial.event}</p>
                  </div>
                </div>

                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold-400 fill-current" />
                  ))}
                </div>

                <p className="text-gray-300 leading-relaxed font-light text-sm">
                  "{testimonial.text}"
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}