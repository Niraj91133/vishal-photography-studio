import { Check, Download } from 'lucide-react';

export default function Packages() {
  const packages = [
    {
      name: 'Traditional Package',
      price: '₹45,000 – ₹60,000',
      description: 'Perfect for traditional ceremonies and celebrations',
      features: [
        '2–3 Professional Cameramen',
        'DSLR, LED lights, optional drone',
        '1–3 Days Coverage',
        'Photo Editing (basic)',
        'Optional Album',
        'Online Gallery Access'
      ],
      popular: false
    },
    {
      name: 'Cinematic + Candid + Traditional',
      price: '₹65,000 – ₹3,00,000',
      description: 'Complete coverage with cinematic storytelling',
      features: [
        'Cinematic Short Film + Full Coverage',
        'Drone + Gimbal + Multiple Camera Setup',
        '2–5 Days Coverage',
        'Candid + Traditional Photos',
        'Advanced Editing + Album',
        'Same Day Editing Available',
        'Premium Online Gallery',
        'Social Media Ready Content'
      ],
      popular: true
    }
  ];

  return (
    <section id="packages" className="py-32 bg-dark-900 border-t border-white/5 relative overflow-hidden">
      {/* Background Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/dark-matter.png')] opacity-10"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-gold-600/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <p className="text-gold-600 font-medium tracking-widest uppercase text-sm mb-3">Investment</p>
          <h2 className="text-4xl md:text-6xl text-white mb-6 font-serif">
            Curated Collections
          </h2>
          <div className="w-16 h-1 bg-gold-600 mx-auto rounded-full"></div>
        </div>

        {/* Desktop Grid */}
        <div className="hidden lg:grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {packages.map((pkg, index) => (
            <div
              key={index}
              className={`relative p-10 rounded-sm transition-all duration-300 group hover:-translate-y-2 ${pkg.popular
                ? 'bg-dark-800 border-2 border-gold-600/50 shadow-2xl shadow-gold-900/20'
                : 'bg-dark-800/50 border border-white/10 hover:border-white/20'
                }`}
            >
              {pkg.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gold-600 text-dark-900 px-6 py-1.5 text-xs font-bold uppercase tracking-widest shadow-lg">
                    Most Popular
                  </span>
                </div>
              )}

              <div className="text-center mb-10">
                <h3 className="text-2xl font-serif text-white mb-4">
                  {pkg.name}
                </h3>
                <p className="text-gray-400 mb-6 font-light">
                  {pkg.description}
                </p>
                <div className={`text-3xl font-bold font-serif ${pkg.popular ? 'text-gold-500' : 'text-white'}`}>
                  {pkg.price}
                </div>
              </div>

              <div className="space-y-4 mb-10">
                {pkg.features.map((feature, featureIndex) => (
                  <div key={featureIndex} className="flex items-center">
                    <Check className={`w-5 h-5 mr-4 flex-shrink-0 ${pkg.popular ? 'text-gold-500' : 'text-gray-500'}`} />
                    <span className="text-gray-300 font-light">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-4">
                <a
                  href="tel:8809295961"
                  className={`w-full py-4 px-6 rounded-sm font-medium text-center transition-all duration-300 uppercase tracking-wider text-sm ${pkg.popular
                    ? 'bg-gold-600 hover:bg-gold-500 text-dark-900 shadow-lg hover:shadow-gold-600/20'
                    : 'border border-white/20 text-white hover:bg-white hover:text-dark-900'
                    }`}
                >
                  Book Now
                </a>

                <button className="w-full py-4 px-6 rounded-sm font-medium text-gray-400 hover:text-white transition-colors duration-300 flex items-center justify-center gap-2 uppercase tracking-wider text-sm group-hover:text-gold-400">
                  <Download className="w-4 h-4" />
                  Download Brochure
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Mobile View */}
        <div className="lg:hidden -mx-6 px-6 pb-8">
          <div className="flex gap-6 overflow-x-auto pb-8 scrollbar-hide snap-x-mandatory py-4">
            {packages.map((pkg, index) => (
              <div
                key={index}
                className={`flex-none w-[90vw] max-w-sm relative p-8 rounded-sm snap-center transition-all duration-300 ${pkg.popular
                  ? 'bg-dark-800 border border-gold-600/40 shadow-xl'
                  : 'bg-dark-800/80 border border-white/10'
                  }`}
              >
                {pkg.popular && (
                  <div className="absolute top-0 right-0">
                    <div className="bg-gold-600 text-dark-900 px-4 py-1 text-[10px] font-bold uppercase tracking-widest">
                      Popular
                    </div>
                  </div>
                )}

                <div className="mb-8 mt-4">
                  <h3 className="text-2xl font-serif text-white mb-2 leading-tight">
                    {pkg.name}
                  </h3>
                  <div className={`text-2xl font-bold font-serif mb-4 ${pkg.popular ? 'text-gold-500' : 'text-gray-200'}`}>
                    {pkg.price}
                  </div>
                  <p className="text-gray-400 text-sm font-light">
                    {pkg.description}
                  </p>
                </div>

                <div className="space-y-3 mb-8">
                  {pkg.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start">
                      <Check className={`w-4 h-4 mr-3 mt-1 flex-shrink-0 ${pkg.popular ? 'text-gold-500' : 'text-gray-600'}`} />
                      <span className="text-gray-300 text-sm font-light">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col gap-3">
                  <a
                    href="tel:8809295961"
                    className={`w-full py-3 px-6 rounded-sm font-medium text-center transition-all duration-300 uppercase tracking-wider text-xs ${pkg.popular
                      ? 'bg-gold-600 text-dark-900'
                      : 'border border-white/20 text-white'
                      }`}
                  >
                    Book Now
                  </a>

                  <button className="w-full py-3 px-6 font-medium text-gray-500 flex items-center justify-center gap-2 uppercase tracking-wider text-xs">
                    <Download className="w-3 h-3" />
                    Download Brochure
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}