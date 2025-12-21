import React, { useState } from 'react';
import { Send, CheckCircle2, Heart } from 'lucide-react';

export const RSVP: React.FC = () => {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('1');
  const [family, setFamily] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return;

    const phoneNumber = "521234567890"; 
    const message = `¡Hola! Soy *${name}* ${family ? `(Familia ${family})` : ''}. Confirmo mi asistencia a los XV de Skarleth para *${guests} personas*. ¡Gracias! 👑💖`;
    
    const url = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  return (
    <section className="py-20 relative overflow-hidden bg-white">
      {/* Decorative floral elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-xv-pink/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-xv-rose/20 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10 max-w-2xl">
        <div className="bg-white/80 backdrop-blur-xl border border-white shadow-[0_10px_40px_rgba(225,173,186,0.2)] rounded-3xl p-8 md:p-12 relative">
          
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-lg text-xv-rose-gold">
             <Heart fill="currentColor" size={32} />
          </div>

          <div className="text-center mb-10 mt-4">
            <h2 className="font-vibes text-5xl md:text-6xl text-xv-rose-dark mb-4">Confirmación</h2>
            <p className="font-mont text-gray-500 leading-relaxed font-light">
              Nos encantaría compartir este momento mágico contigo. <br/>
              Por favor confirma tu asistencia antes del 20 de Marzo.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block font-cinzel text-xv-wine text-xs mb-2 ml-1 tracking-wider">Nombre Completo</label>
              <input 
                type="text" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ej. Juan Pérez"
                className="w-full bg-xv-bg border border-xv-rose/30 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-xv-rose-gold focus:ring-1 focus:ring-xv-rose-gold transition-colors font-mont"
                required
              />
            </div>
            
            <div>
              <label className="block font-cinzel text-xv-wine text-xs mb-2 ml-1 tracking-wider">Apellidos de la Familia</label>
              <input 
                type="text" 
                value={family}
                onChange={(e) => setFamily(e.target.value)}
                placeholder="Ej. Familia Pérez López"
                className="w-full bg-xv-bg border border-xv-rose/30 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-xv-rose-gold focus:ring-1 focus:ring-xv-rose-gold transition-colors font-mont"
              />
            </div>

            <div>
              <label className="block font-cinzel text-xv-wine text-xs mb-2 ml-1 tracking-wider">Nº de Asistentes</label>
              <select 
                value={guests}
                onChange={(e) => setGuests(e.target.value)}
                className="w-full bg-xv-bg border border-xv-rose/30 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-xv-rose-gold focus:ring-1 focus:ring-xv-rose-gold transition-colors font-mont"
              >
                {[1, 2, 3, 4, 5, 6].map(num => (
                  <option key={num} value={num} className="text-gray-700">
                    {num} {num === 1 ? 'Persona' : 'Personas'}
                  </option>
                ))}
              </select>
            </div>

            <button 
              type="submit"
              className="w-full bg-gradient-to-r from-xv-rose-dark to-xv-wine text-white font-cinzel text-sm font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:shadow-xv-rose/40 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 mt-6"
            >
              <Send size={18} />
              <span>Enviar Confirmación</span>
            </button>
          </form>

          <div className="mt-8 flex items-center justify-center gap-2 text-xv-wine/60 text-sm font-mont bg-xv-bg/50 py-2 rounded-lg">
            <CheckCircle2 size={16} />
            <span>Código de Vestimenta: Formal</span>
          </div>
        </div>
      </div>
    </section>
  );
};