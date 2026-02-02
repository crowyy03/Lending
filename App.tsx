import React, { useEffect, useState } from 'react';
import { MultiStepForm } from './components/MultiStepForm';
import { Gallery } from './components/Gallery';
import { FAQ } from './components/FAQ';
import { FEATURES } from './constants';
import { Map, Phone, ArrowRight, Star } from 'lucide-react';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToForm = (e: React.MouseEvent) => {
    e.preventDefault();
    const form = document.getElementById('estimate-form');
    form?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <div className="min-h-screen bg-brand-dark overflow-x-hidden selection:bg-brand-violet selection:text-white">
      
      {/* Top Bar */}
      <nav className={`fixed w-full z-40 transition-all duration-500 ${scrolled ? 'bg-brand-dark/90 backdrop-blur-md border-b border-brand-violet/20 py-4' : 'bg-transparent py-6'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex justify-between items-center">
          <div className="flex flex-col group cursor-default">
            <h1 className="text-2xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-brand-cyan group-hover:to-brand-violet transition-all duration-300">
              AlexPRO<span className="text-brand-cyan group-hover:text-brand-violet">Lights</span>
            </h1>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest hidden sm:block">Serving Los Angeles Only</span>
          </div>
          <button 
            onClick={scrollToForm}
            className="bg-white/5 hover:bg-brand-violet/20 hover:border-brand-violet/50 text-white px-5 py-2 rounded-full text-sm font-medium transition-all backdrop-blur-sm border border-white/10 shadow-[0_0_15px_-5px_rgba(168,85,247,0.3)]"
          >
            Get Estimate
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative w-full min-h-[90vh] flex items-center justify-center pt-20 overflow-hidden">
        {/* Main Background Image */}
        <div className="absolute inset-0 z-0">
          <div className="w-full h-full bg-gray-900 relative">
             {/* Gradient Overlay for Text Readability */}
             <div className="absolute inset-0 bg-gradient-to-b from-brand-dark/50 via-brand-dark/60 to-brand-dark z-10"></div>
             <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-transparent to-brand-dark/30 z-10"></div>
             
             {/* Main Image: Warm Architectural Glow */}
             <img 
                src="/images/gallery/Security.jpg"
                alt="Permanent Exterior Lighting on Luxury Home"
                className="w-full h-full object-cover opacity-60"
             />
          </div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center mt-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-brand-cyan/30 backdrop-blur-md text-brand-cyan text-xs font-bold uppercase tracking-wider mb-8 shadow-[0_0_20px_-5px_rgba(34,211,238,0.4)]">
            <Map size={12} className="text-brand-violet" /> Los Angeles Installs Only
          </div>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-[1.05] mb-6 tracking-tight">
            Permanent <br className="hidden md:block" /> Exterior Lighting <br/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan via-blue-400 to-brand-violet animate-pulse-slow">
              For Your Home
            </span>
          </h1>
          
          <p className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto mb-10 leading-relaxed font-light drop-shadow-lg">
            Clean, discreet daytime look. At night: <span className="text-white font-medium">warm architectural glow</span> or <span className="text-brand-violet font-medium">full color</span> for holidays.
          </p>
          
          <div className="glass-panel p-4 md:p-6 rounded-xl max-w-xl mx-auto mb-12 text-left border-l-4 border-l-brand-violet bg-black/40 backdrop-blur-xl">
             <p className="text-gray-300 text-sm md:text-base">
               <span className="text-brand-cyan font-bold uppercase tracking-wide text-xs block mb-1">Simple Process</span>
               Share your address and we’ll preview your roofline on maps to prepare a personalized estimate. Then we confirm details in a quick 10–15 min chat.
             </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={scrollToForm}
              className="w-full sm:w-auto bg-gradient-to-r from-brand-cyan to-brand-violet hover:from-cyan-400 hover:to-violet-400 text-white font-bold text-lg px-8 py-4 rounded-full shadow-[0_0_40px_-10px_rgba(168,85,247,0.6)] transition-all hover:scale-105 active:scale-95"
            >
              Get My Estimate
            </button>
            <p className="text-xs text-gray-400 uppercase tracking-widest sm:hidden mt-2">No on-site visit needed first</p>
          </div>
        </div>
      </header>

      {/* How it works (Process) */}
      <section className="py-24 bg-brand-dark relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-brand-violet/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-brand-cyan/5 rounded-full blur-[120px] pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-16 text-center">How you get your estimate</h2>
          <div className="grid md:grid-cols-3 gap-8 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-brand-violet/40 to-transparent z-0"></div>

            {[
              {
                step: "01",
                title: "Submit address",
                desc: "We look up your home on maps to understand the roofline and layout."
              },
              {
                step: "02",
                title: "10 min chat",
                desc: "We confirm coverage (front vs all sides) and a few install details via call or text."
              },
              {
                step: "03",
                title: "Receive Estimate",
                desc: "Clear options and next steps sent to your email. No pressure."
              }
            ].map((item, idx) => (
              <div key={idx} className="relative z-10 bg-brand-dark/80 backdrop-blur-sm p-6 text-center group border border-white/5 rounded-2xl hover:border-brand-violet/30 transition-all duration-300">
                <div className="w-24 h-24 mx-auto bg-brand-surface border border-gray-800 rounded-full flex items-center justify-center mb-6 group-hover:border-brand-violet group-hover:bg-brand-violet/10 transition-all shadow-lg group-hover:shadow-[0_0_20px_-5px_rgba(168,85,247,0.4)]">
                  <span className="text-2xl font-bold text-gray-500 group-hover:text-brand-violet">{item.step}</span>
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-gray-400 leading-relaxed text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <Gallery />

      {/* Why Choose Us */}
      <section className="py-24 bg-brand-surface/30 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {FEATURES.map((feature, idx) => (
              <div key={idx} className="bg-brand-dark/50 p-6 rounded-2xl border border-white/5 hover:border-brand-cyan/30 transition-all group">
                <feature.icon className="text-gray-500 group-hover:text-brand-cyan mb-4 w-8 h-8 transition-colors" />
                <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conversion Section */}
      <section className="py-24 relative overflow-hidden">
        {/* Glow Effects */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-brand-cyan/10 to-brand-violet/10 rounded-full blur-[100px] pointer-events-none"></div>
        
        <div className="relative z-10 px-4">
           <MultiStepForm />
        </div>
      </section>

      {/* FAQ */}
      <FAQ />

      {/* Final CTA */}
      <section className="py-24 text-center px-4 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-brand-violet/5 pointer-events-none"></div>
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight">
          Want your home to look <br /> 
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-cyan to-brand-violet">premium after dark?</span>
        </h2>
        <button 
          onClick={scrollToForm}
          className="bg-white text-brand-dark hover:bg-gray-100 font-bold text-lg px-12 py-5 rounded-full transition-all hover:scale-105 active:scale-95 shadow-[0_0_50px_-10px_rgba(255,255,255,0.3)] relative z-10"
        >
          Get My Estimate
        </button>
        <div className="flex flex-wrap justify-center gap-4 mt-10 text-xs md:text-sm text-gray-500 uppercase tracking-widest font-semibold">
          <span className="flex items-center gap-1"><Map size={14}/> Los Angeles Only</span>
          <span className="hidden sm:inline opacity-30">•</span>
          <span className="flex items-center gap-1"><Phone size={14}/> Call or WhatsApp</span>
          <span className="hidden sm:inline opacity-30">•</span>
          <span className="flex items-center gap-1"><Star size={14}/> 5-Star Service</span>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-white mb-2">AlexPRO<span className="text-brand-cyan">Lights</span></h3>
          <p className="text-gray-500 mb-6">Serving Los Angeles only</p>
          <a href="tel:+13105550123" className="text-brand-violet hover:text-white transition-colors block mb-8 font-medium">
            (310) 555-0123
          </a>
          <p className="text-xs text-gray-700">
            © {new Date().getFullYear()} AlexPRO Lights. All rights reserved. <br/>
            Privacy Policy | Terms of Service
          </p>
        </div>
      </footer>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 w-full p-4 bg-gradient-to-t from-brand-dark via-brand-dark to-transparent z-50 md:hidden">
        <button 
          onClick={scrollToForm}
          className="w-full bg-gradient-to-r from-brand-cyan to-brand-violet text-white font-bold py-4 rounded-xl shadow-lg shadow-brand-violet/20 active:scale-95 transition-transform"
        >
          Get My Estimate
        </button>
      </div>
    </div>
  );
}

export default App;