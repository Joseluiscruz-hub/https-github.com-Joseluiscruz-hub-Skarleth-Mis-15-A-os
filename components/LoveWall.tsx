import React, { useEffect, useState } from 'react';
import {
  collection,
  limit,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
} from 'firebase/firestore';
import { Heart } from 'lucide-react';
import { db, isFirebaseConfigured } from '../firebase';

interface WallMessage {
  id: string;
  name: string;
  message: string;
  attendance: 'yes' | 'no';
  createdAt?: Timestamp;
}

export const LoveWall: React.FC = () => {
  const [messages, setMessages] = useState<WallMessage[]>([]);

  useEffect(() => {
    if (!isFirebaseConfigured || !db) return;

    const firestore = db;
    const wallQuery = query(
      collection(firestore, 'loveWallMessages'),
      orderBy('createdAt', 'desc'),
      limit(12)
    );

    const unsubscribe = onSnapshot(wallQuery, (snapshot) => {
      const incoming = snapshot.docs.map((doc) => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name || 'Invitado',
          message:
            data.message ||
            (data.attendance === 'yes'
              ? '¡Nos vemos en la fiesta!'
              : 'Te mando un abrazo enorme.'),
          attendance: data.attendance === 'no' ? 'no' : 'yes',
          createdAt: data.createdAt,
        } as WallMessage;
      });
      setMessages(incoming);
    });

    return () => unsubscribe();
  }, []);

  // ...existing code...
  // Importar el componente de verificación
  // eslint-disable-next-line
  const VerificarFirestore = require('./VerificarFirestore').default;

  return (
    <section className="love-wall-section py-20 bg-xv-bg/60">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="text-center mb-10">
          <Heart
            className="mx-auto text-xv-rose-gold mb-3"
            fill="currentColor"
          />
          <h2 className="titulos-cursiva text-5xl text-xv-rose-dark mb-2">
            Muro de Amor
          </h2>
          <p className="font-mont text-sm text-xv-wine/70">
            Mensajes en vivo de nuestros invitados
          </p>
        </div>

        {!isFirebaseConfigured && (
          <div className="text-center bg-white border border-xv-rose/20 rounded-2xl p-6 font-mont text-sm text-gray-500">
            Configura las variables <code>VITE_FIREBASE_*</code> para activar el
            muro en tiempo real.
          </div>
        )}

        {/* Verificación de conexión Firestore */}
        <VerificarFirestore />

        {isFirebaseConfigured && messages.length === 0 && (
          <div className="text-center bg-white border border-xv-rose/20 rounded-2xl p-6 font-mont text-sm text-gray-500">
            Aún no hay mensajes. Sé el primero en dejar uno al confirmar
            asistencia.
          </div>
        )}

        {messages.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {messages.map((message) => (
              <article
                key={message.id}
                className="love-message bg-white rounded-2xl p-5 border border-xv-rose/20 shadow-sm"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-cormorant text-2xl text-xv-rose-dark">
                    {message.name}
                  </h3>
                  <span
                    className={`text-xs font-mont px-2 py-1 rounded-full ${
                      message.attendance === 'yes'
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-600'
                    }`}
                  >
                    {message.attendance === 'yes' ? 'Asiste' : 'No asiste'}
                  </span>
                </div>
                <p className="font-mont text-sm text-gray-600 leading-relaxed">
                  “{message.message}”
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
