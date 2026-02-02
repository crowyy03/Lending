import React, { useState } from 'react';
import { Check, ArrowRight, Loader2, MapPin, Phone, Mail, Home, MessageSquare } from 'lucide-react';

interface FormData {
  address: string;
  phone: string;
  contactMethod: 'call' | 'whatsapp';
  coverage: string;
  homeHeight: string;
  mainUse: string;
  notes: string;
  email: string;
}

export const MultiStepForm: React.FC = () => {
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  
  const [formData, setFormData] = useState<FormData>({
    address: '',
    phone: '',
    contactMethod: 'whatsapp',
    coverage: '',
    homeHeight: '',
    mainUse: '',
    notes: '',
    email: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelection = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    // Simple validation
    if (step === 1) {
      if (!formData.address || !formData.phone) return alert('Please fill in your address and phone number.');
    }
    if (step === 2) {
      if (!formData.coverage || !formData.homeHeight || !formData.mainUse) return alert('Please select an option for each question.');
    }
    setStep(prev => prev + 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email) return alert('Please enter your email.');
    
    setIsSubmitting(true);
    const scriptUrl = import.meta.env.VITE_GOOGLE_SCRIPT_URL as string | undefined;

    try {
      if (scriptUrl) {
        await fetch(scriptUrl, {
          method: 'POST',
          mode: 'no-cors',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(formData),
        });
      } else {
        await new Promise(resolve => setTimeout(resolve, 800));
      }
      setIsSuccess(true);
    } catch (err) {
      if (scriptUrl) alert('Something went wrong. Please try again or contact us directly.');
      else setIsSuccess(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="glass-panel p-8 rounded-2xl text-center max-w-lg mx-auto border border-brand-cyan/30 shadow-[0_0_50px_-12px_rgba(34,211,238,0.2)]">
        <div className="w-16 h-16 bg-brand-cyan/20 rounded-full flex items-center justify-center mx-auto mb-6 text-brand-cyan">
          <Check size={32} strokeWidth={3} />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">Got it — next step is a quick confirmation</h3>
        <p className="text-gray-300 mb-8 leading-relaxed">
          We’ll preview your roofline on maps and reach out via your chosen method ({formData.contactMethod === 'call' ? 'Phone Call' : 'WhatsApp'}). 
          After a short 10–15 min confirmation, we’ll email your personalized estimate.
        </p>
        <button 
          onClick={() => window.location.reload()} // Reset for demo purposes
          className="text-brand-cyan hover:text-white font-medium transition-colors"
        >
          Back to Gallery
        </button>
      </div>
    );
  }

  return (
    <div id="estimate-form" className="w-full max-w-2xl mx-auto">
      <div className="glass-panel rounded-2xl overflow-hidden shadow-2xl">
        {/* Progress Bar */}
        <div className="bg-brand-navy/50 h-2 w-full flex">
          <div className={`h-full transition-all duration-500 bg-brand-cyan ${step >= 1 ? 'w-1/3' : 'w-0'}`} />
          <div className={`h-full transition-all duration-500 bg-brand-cyan ${step >= 2 ? 'w-1/3' : 'w-0'}`} />
          <div className={`h-full transition-all duration-500 bg-brand-cyan ${step >= 3 ? 'w-1/3' : 'w-0'}`} />
        </div>

        <div className="p-6 md:p-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Get Your Estimate</h2>
          <p className="text-brand-cyan text-sm mb-6 uppercase tracking-wider font-semibold">
            {step === 1 && "Step 1 — Tell us where your home is"}
            {step === 2 && "Step 2 — Quick details"}
            {step === 3 && "Step 3 — Where should we send your estimate?"}
          </p>

          <form onSubmit={handleSubmit}>
            {/* STEP 1 */}
            {step === 1 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Home Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-3.5 text-brand-cyan w-5 h-5" />
                    <input
                      type="text"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="1234 Sunset Blvd, Los Angeles..."
                      className="w-full bg-brand-navy/50 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-2">We use this to preview your roofline on maps.</p>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Phone Number</label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-3.5 text-brand-cyan w-5 h-5" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="(310) 555-0123"
                      className="w-full bg-brand-navy/50 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-3">Preferred Contact Method</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button
                      type="button"
                      onClick={() => handleSelection('contactMethod', 'call')}
                      className={`py-3 px-4 rounded-lg border flex items-center justify-center gap-2 transition-all ${
                        formData.contactMethod === 'call' 
                          ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan' 
                          : 'bg-brand-navy/30 border-gray-700 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      <Phone size={18} /> Call
                    </button>
                    <button
                      type="button"
                      onClick={() => handleSelection('contactMethod', 'whatsapp')}
                      className={`py-3 px-4 rounded-lg border flex items-center justify-center gap-2 transition-all ${
                        formData.contactMethod === 'whatsapp' 
                          ? 'bg-brand-cyan/20 border-brand-cyan text-brand-cyan' 
                          : 'bg-brand-navy/30 border-gray-700 text-gray-400 hover:border-gray-500'
                      }`}
                    >
                      <MessageSquare size={18} /> WhatsApp
                    </button>
                  </div>
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-brand-cyan hover:bg-cyan-400 text-brand-dark font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    Next <ArrowRight size={20} />
                  </button>
                  <p className="text-xs text-center text-gray-600 mt-4">
                    No spam. Address is used only to preview the roofline on maps.
                  </p>
                </div>
              </div>
            )}

            {/* STEP 2 */}
            {step === 2 && (
              <div className="space-y-6 animate-fadeIn">
                {/* Coverage */}
                <div>
                  <label className="block text-gray-400 text-sm mb-3">Coverage Preference</label>
                  <div className="space-y-2">
                    {['Front roofline only', 'Full perimeter (all sides)', 'Not sure (help me choose)'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelection('coverage', opt)}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                          formData.coverage === opt
                            ? 'bg-brand-cyan/20 border-brand-cyan text-white'
                            : 'bg-brand-navy/30 border-gray-700 text-gray-400 hover:bg-brand-navy/50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Home Height */}
                <div>
                  <label className="block text-gray-400 text-sm mb-3">Home Height</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['1 story', '2 stories', 'Multi-level', 'Complex'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelection('homeHeight', opt)}
                        className={`p-3 rounded-lg border text-sm transition-all ${
                          formData.homeHeight === opt
                            ? 'bg-brand-cyan/20 border-brand-cyan text-white'
                            : 'bg-brand-navy/30 border-gray-700 text-gray-400 hover:bg-brand-navy/50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Main Use */}
                <div>
                  <label className="block text-gray-400 text-sm mb-3">Main Use</label>
                  <div className="space-y-2">
                    {['Warm white everyday', 'Holidays & colors', 'Both'].map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        onClick={() => handleSelection('mainUse', opt)}
                        className={`w-full text-left p-4 rounded-lg border transition-all ${
                          formData.mainUse === opt
                            ? 'bg-brand-cyan/20 border-brand-cyan text-white'
                            : 'bg-brand-navy/30 border-gray-700 text-gray-400 hover:bg-brand-navy/50'
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-gray-400 text-sm mb-2">Anything we should know? (Optional)</label>
                  <input
                    type="text"
                    name="notes"
                    value={formData.notes}
                    onChange={handleInputChange}
                    placeholder="HOA, corner lot, backyard patio..."
                    className="w-full bg-brand-navy/50 border border-gray-700 rounded-lg py-3 px-4 text-white focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all"
                  />
                </div>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="w-full bg-brand-cyan hover:bg-cyan-400 text-brand-dark font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2"
                  >
                    Continue <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3 */}
            {step === 3 && (
              <div className="space-y-6 animate-fadeIn">
                <div>
                  <label className="block text-gray-400 text-sm mb-2">Email Address</label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-3.5 text-brand-cyan w-5 h-5" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="you@example.com"
                      className="w-full bg-brand-navy/50 border border-gray-700 rounded-lg py-3 pl-10 pr-4 text-white focus:border-brand-cyan focus:outline-none focus:ring-1 focus:ring-brand-cyan transition-all"
                    />
                  </div>
                </div>

                <div className="bg-brand-navy/30 p-4 rounded-lg border border-gray-800">
                  <h4 className="text-white font-medium mb-2 flex items-center gap-2"><Home size={16} className="text-brand-violet"/> Summary</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li><span className="text-gray-500">Address:</span> {formData.address}</li>
                    <li><span className="text-gray-500">Use:</span> {formData.mainUse}</li>
                    <li><span className="text-gray-500">Coverage:</span> {formData.coverage}</li>
                  </ul>
                </div>

                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-brand-cyan hover:bg-cyan-400 text-brand-dark font-bold py-4 rounded-lg transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed shadow-[0_0_20px_rgba(34,211,238,0.4)]"
                  >
                    {isSubmitting ? (
                      <><Loader2 className="animate-spin" /> Sending...</>
                    ) : (
                      "Submit & Get Estimate"
                    )}
                  </button>
                  <p className="text-xs text-center text-gray-600 mt-4">
                    By submitting, you agree to receive a contact via phone or email regarding your estimate.
                  </p>
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};