import React, { useState } from 'react';
import { Send, CheckCircle2, Heart, XCircle, Utensils } from 'lucide-react';
import confetti from 'canvas-confetti';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';
import { invitation } from '../lib/invitation';

const fireGoldConfetti = () => {
  const defaults = {
    spread: 70,
    ticks: 120,
    gravity: 0.95,
    decay: 0.94,
    scalar: 0.9,
    colors: ['#f59e0b', '#fb923c', '#fcd34d', '#fff7c2'],
  };

  confetti({ ...defaults, particleCount: 90, origin: { x: 0.25, y: 0.55 } });
  confetti({ ...defaults, particleCount: 90, origin: { x: 0.75, y: 0.55 } });
};

export const RSVP: React.FC = () => {
  const [name, setName] = useState('');
  const [guests, setGuests] = useState('1');
  const [family, setFamily] = useState('');
  const [attendance, setAttendance] = useState<'yes' | 'no' | null>(null);
  const [dietaryRestrictions, setDietaryRestrictions] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const firebaseReady = Boolean(isFirebaseConfigured && db);

  const handleAttendance = (value: 'yes' | 'no') => {
    setAttendance(value);
    if (value === 'yes') {
      fireGoldConfetti();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !attendance) return;

    setIsSending(true);

    try {
      if (firebaseReady && db) {
        await addDoc(collection(db, 'loveWallMessages'), {
          name,
          attendance,
          guests: Number(guests),
          family,
          message: message.trim(),
          dietaryRestrictions: dietaryRestrictions.trim(),
          createdAt: serverTimestamp(),
        });
      }
    } catch (error) {
      console.error('Error al guardar RSVP en Firebase:', error);
    }

    let whatsappMessage = '';
    if (attendance === 'yes') {
      whatsappMessage = `¡Hola! Soy *${name}* ${family ? `(Familia ${family})` : ''}.\n\nConfirmo mi asistencia a los XV de Skarlet para *${guests} persona(s)*.\n\n`;
      if (dietaryRestrictions) {
        whatsappMessage += `Restricciones alimentarias: ${dietaryRestrictions}\n\n`;
      }
      if (message) {
        whatsappMessage += `Mensaje: ${message}\n\n`;
      }
      whatsappMessage += '¡Gracias!';
    } else {
      whatsappMessage = `¡Hola! Soy *${name}* ${family ? `(Familia ${family})` : ''}.\n\nLamentablemente no podré asistir a los XV de Skarlet.\n\n`;
      if (message) {
        whatsappMessage += `Mensaje: ${message}\n\n`;
      }
      whatsappMessage += 'Les deseo lo mejor en su celebración.';
    }

    const url = `https://wa.me/${invitation.whatsappPhone}?text=${encodeURIComponent(
      whatsappMessage,
    )}`;
    window.open(url, '_blank');

    if (attendance === 'yes') {
      fireGoldConfetti();
    }

    setStatusMessage('Listo. Se abrió WhatsApp para terminar tu confirmación.');
    setIsSending(false);
  };

  return (
    <section id="rsvp" className="py-20 relative overflow-hidden bg-white">
      <div className="container mx-auto px-4 relative z-10 max-w-2xl">
        <div className="rsvp-card bg-white/80 backdrop-blur-xl border border-white shadow-[0_10px_40px_rgba(225,173,186,0.2)] p-8 md:p-12 relative">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-white p-3 rounded-full shadow-lg text-xv-rose-gold border border-xv-rose-gold/30">
            <Heart fill="currentColor" size={32} />
          </div>

          <div className="text-center mb-10 mt-4">
            <h2 className="titulos-cursiva text-5xl md:text-6xl text-xv-rose-dark mb-4">
              Confirmación
            </h2>
            <p className="font-mont text-gray-500 leading-relaxed font-light">
              Nos encantaría compartir este momento mágico contigo. <br />
              Por favor confirma tu asistencia antes del{' '}
              <strong className="text-xv-wine">{invitation.rsvpDeadline}</strong>.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block texto-general text-xv-wine text-xs mb-3 ml-1 tracking-wider">
                ¿Podrás asistir?
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => handleAttendance('yes')}
                  className={`flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all duration-300 font-mont text-sm ${
                    attendance === 'yes'
                      ? 'border-green-500 bg-green-50 text-green-700'
                      : 'border-gray-200 hover:border-green-300 text-gray-600'
                  }`}
                >
                  <CheckCircle2 size={20} />
                  <span>Sí, asistiré</span>
                </button>
                <button
                  type="button"
                  onClick={() => handleAttendance('no')}
                  className={`flex items-center justify-center gap-2 py-4 rounded-xl border-2 transition-all duration-300 font-mont text-sm ${
                    attendance === 'no'
                      ? 'border-red-400 bg-red-50 text-red-600'
                      : 'border-gray-200 hover:border-red-300 text-gray-600'
                  }`}
                >
                  <XCircle size={20} />
                  <span>No podré ir</span>
                </button>
              </div>
            </div>

            <div>
              <label className="block texto-general text-xv-wine text-xs mb-2 ml-1 tracking-wider">
                Nombre Completo *
              </label>
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
              <label className="block texto-general text-xv-wine text-xs mb-2 ml-1 tracking-wider">
                Apellidos de la Familia
              </label>
              <input
                type="text"
                value={family}
                onChange={(e) => setFamily(e.target.value)}
                placeholder="Ej. Familia Pérez López"
                className="w-full bg-xv-bg border border-xv-rose/30 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-xv-rose-gold focus:ring-1 focus:ring-xv-rose-gold transition-colors font-mont"
              />
            </div>

            {attendance === 'yes' && (
              <>
                <div>
                  <label className="block texto-general text-xv-wine text-xs mb-2 ml-1 tracking-wider">
                    Nº de Asistentes
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(e.target.value)}
                    className="w-full bg-xv-bg border border-xv-rose/30 rounded-xl px-4 py-3 text-gray-700 focus:outline-none focus:border-xv-rose-gold focus:ring-1 focus:ring-xv-rose-gold transition-colors font-mont"
                  >
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <option key={num} value={num} className="text-gray-700">
                        {num} {num === 1 ? 'Persona' : 'Personas'}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block texto-general text-xv-wine text-xs mb-2 ml-1 tracking-wider">
                    <Utensils size={14} className="inline mr-2" />
                    Restricciones Alimentarias (opcional)
                  </label>
                  <input
                    type="text"
                    value={dietaryRestrictions}
                    onChange={(e) => setDietaryRestrictions(e.target.value)}
                    placeholder="Ej. Vegetariano, sin gluten, alergia a mariscos..."
                    className="w-full bg-xv-bg border border-xv-rose/30 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-xv-rose-gold focus:ring-1 focus:ring-xv-rose-gold transition-colors font-mont text-sm"
                  />
                </div>
              </>
            )}

            <div>
              <label className="block texto-general text-xv-wine text-xs mb-2 ml-1 tracking-wider">
                Mensaje para Skarlet (opcional)
              </label>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Escribe un mensaje especial..."
                rows={3}
                className="w-full bg-xv-bg border border-xv-rose/30 rounded-xl px-4 py-3 text-gray-700 placeholder-gray-400 focus:outline-none focus:border-xv-rose-gold focus:ring-1 focus:ring-xv-rose-gold transition-colors font-mont resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={!attendance || !name || isSending}
              className="w-full bg-gradient-to-r from-xv-rose-dark to-xv-wine text-white font-mont text-sm font-bold py-4 rounded-xl shadow-lg hover:shadow-xl hover:shadow-xv-rose/40 transform hover:-translate-y-1 transition-all duration-300 flex items-center justify-center gap-3 mt-6 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              <Send size={18} />
              <span>
                {isSending ? 'Enviando...' : 'Enviar Confirmación por WhatsApp'}
              </span>
            </button>

            {statusMessage && (
              <p className="text-center font-mont text-xs text-xv-rose-gold">
                {statusMessage}
              </p>
            )}
          </form>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="flex items-center justify-center gap-2 text-xv-wine/60 text-sm font-mont bg-xv-bg/50 py-2 rounded-lg">
              <CheckCircle2 size={16} />
              <span>Vestimenta: Formal</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-xv-wine/60 text-sm font-mont bg-xv-bg/50 py-2 rounded-lg">
              <Heart size={16} />
              <span>Fecha límite: 1 Mayo</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
