import React, { useRef } from 'react';
import { GALLERY_ITEMS } from '../constants';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export const Gallery: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = 300;
      if (direction === 'left') {
        current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
      } else {
        current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
      }
    }
  };

  return (
    <div className="py-20 bg-gradient-to-b from-brand-dark via-brand-navy/20 to-brand-dark">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-2">
              Daytime discreet. <br className="md:hidden" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-brand-cyan to-brand-violet">Nighttime wow.</span>
            </h2>
          </div>
          <div className="hidden md:flex gap-4">
            <button onClick={() => scroll('left')} className="p-3 rounded-full border border-gray-700 hover:border-brand-cyan text-white transition-all">
              <ArrowLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="p-3 rounded-full border border-gray-700 hover:border-brand-cyan text-white transition-all">
              <ArrowRight size={20} />
            </button>
          </div>
        </div>

        {/* Scroll Container */}
        <div 
          ref={scrollRef}
          className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 no-scrollbar"
        >
          {GALLERY_ITEMS.map((item) => (
            <div 
              key={item.id} 
              className="min-w-[85vw] md:min-w-[400px] snap-center rounded-2xl overflow-hidden relative group"
            >
              <div className="aspect-[4/3] bg-gray-800 relative">
                <img 
                  src={item.image} 
                  alt={item.title} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-100" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent" />
                <div className="absolute bottom-0 left-0 p-6">
                  <p className="text-xl font-medium text-white">{item.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <a href="#estimate-form" className="inline-flex text-sm font-semibold text-brand-cyan hover:text-white transition-colors uppercase tracking-widest border-b border-brand-cyan/30 pb-1">
            See More Installs
          </a>
        </div>
      </div>
    </div>
  );
};