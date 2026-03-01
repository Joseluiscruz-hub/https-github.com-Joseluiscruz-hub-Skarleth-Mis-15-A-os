import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, CreditCard, Copy, Check, ExternalLink } from 'lucide-react';

interface GiftOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  action: React.ReactNode;
  delay: number;
}

const GiftOption: React.FC<GiftOptionProps> = ({
  icon,
  title,
  description,
  action,
  delay,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="bg-white rounded-2xl p-6 shadow-lg border border-xv-rose/10 hover:shadow-xl transition-shadow duration-300"
  >
    <div className="text-center">
      <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-xv-rose-gold/20 to-xv-pink/20 text-xv-rose-gold mb-4">
        {icon}
      </div>
      <h3 className="texto-general text-lg text-xv-wine mb-2">{title}</h3>
      <p className="font-mont text-gray-500 text-sm mb-4">{description}</p>
      {action}
    </div>
  </motion.div>
);

export const GiftRegistry: React.FC = () => {
  const [copied, setCopied] = useState<string | null>(null);

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(null), 2000);
  };

  // Bank account info (replace with real data)
  const bankAccount = {
    bank: 'Banorte',
    clabe: '072580012441402978',
    card: '4915663121198122',
    holder: 'José Luis Cruz Prieto',
  };

  return (
    <section className="py-20 bg-xv-bg relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-xv-pink/20 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 left-10 w-32 h-32 bg-xv-rose/20 rounded-full blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <Gift
            className="mx-auto text-xv-rose-gold mb-4"
            size={40}
            strokeWidth={1.5}
          />
          <h2 className="titulos-cursiva text-5xl md:text-6xl text-xv-rose-gold mb-4">
            Mesa de Regalos
          </h2>
          <p className="font-mont text-gray-500 max-w-lg mx-auto leading-relaxed">
            Tu presencia es el mejor regalo. Sin embargo, si deseas obsequiarme
            algo, aquí te dejo algunas opciones.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {/* Lluvia de Sobres */}
          <GiftOption
            icon={<Gift size={28} />}
            title="Lluvia de Sobres"
            description="El día del evento habrá un buzón especial para tu regalo"
            delay={0.2}
            action={
              <span className="inline-block font-mont text-xs text-xv-rose-gold bg-xv-rose-gold/10 px-4 py-2 rounded-full">
                💌 En la fiesta
              </span>
            }
          />

          {/* Bank Transfer */}
          <GiftOption
            icon={<CreditCard size={28} />}
            title="Transferencia"
            description={`${bankAccount.bank} - ${bankAccount.holder}`}
            delay={0.3}
            action={
              <div className="space-y-2">
                <button
                  onClick={() => copyToClipboard(bankAccount.clabe, 'clabe')}
                  className="w-full flex items-center justify-between bg-xv-bg hover:bg-xv-pink/20 px-4 py-2 rounded-lg transition-colors group"
                >
                  <span className="font-mono text-xs text-gray-600">
                    CLABE: {bankAccount.clabe.slice(0, 8)}...
                  </span>
                  {copied === 'clabe' ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy
                      size={16}
                      className="text-gray-400 group-hover:text-xv-rose-gold"
                    />
                  )}
                </button>
                <button
                  onClick={() =>
                    copyToClipboard(bankAccount.card.replace(/\s/g, ''), 'card')
                  }
                  className="w-full flex items-center justify-between bg-xv-bg hover:bg-xv-pink/20 px-4 py-2 rounded-lg transition-colors group"
                >
                  <span className="font-mono text-xs text-gray-600">
                    Tarjeta: {bankAccount.card}
                  </span>
                  {copied === 'card' ? (
                    <Check size={16} className="text-green-500" />
                  ) : (
                    <Copy
                      size={16}
                      className="text-gray-400 group-hover:text-xv-rose-gold"
                    />
                  )}
                </button>
              </div>
            }
          />

          {/* Amazon Wishlist */}
          <GiftOption
            icon={<ExternalLink size={28} />}
            title="Lista de Deseos"
            description="Productos seleccionados con mucho cariño"
            delay={0.4}
            action={
              <a
                href="https://www.amazon.com.mx/hz/wishlist/ls/EXAMPLE"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-xv-wine hover:bg-xv-rose-dark text-white font-mont text-xs px-6 py-2 rounded-full transition-colors"
              >
                Ver Lista
                <ExternalLink size={14} />
              </a>
            }
          />
        </div>

        {/* Thank you note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
          className="text-center font-vibes text-2xl text-xv-rose-dark mt-12"
        >
          ¡Gracias por ser parte de mi celebración! 💖
        </motion.p>
      </div>
    </section>
  );
};
