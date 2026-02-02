import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
import { FAQS } from '../constants';

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="py-20 px-4 max-w-3xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-white mb-12">Frequently Asked Questions</h2>
      <div className="space-y-4">
        {FAQS.map((faq, idx) => (
          <div 
            key={idx} 
            className={`border rounded-xl transition-all duration-300 ${openIndex === idx ? 'border-brand-cyan/50 bg-brand-surface' : 'border-gray-800 bg-transparent'}`}
          >
            <button
              onClick={() => toggle(idx)}
              className="w-full flex justify-between items-center p-5 text-left focus:outline-none"
            >
              <span className={`text-lg font-medium transition-colors ${openIndex === idx ? 'text-brand-cyan' : 'text-gray-200'}`}>
                {faq.question}
              </span>
              {openIndex === idx ? <Minus className="text-brand-cyan shrink-0 ml-4" /> : <Plus className="text-gray-500 shrink-0 ml-4" />}
            </button>
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="p-5 pt-0 text-gray-400 leading-relaxed">
                {faq.answer}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};