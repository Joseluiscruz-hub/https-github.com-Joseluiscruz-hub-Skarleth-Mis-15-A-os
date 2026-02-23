import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Crown } from 'lucide-react';

interface ParentCardProps {
  title: string;
  names: string[];
  delay: number;
  icon: React.ReactNode;
}

const ParentCard: React.FC<ParentCardProps> = ({
  title,
  names,
  delay,
  icon,
}) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="text-center"
  >
    <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-xv-rose-gold/10 text-xv-rose-gold mb-4">
      {icon}
    </div>
    <h3 className="font-cinzel text-sm uppercase tracking-[0.2em] text-xv-wine mb-4">
      {title}
    </h3>
    <div className="space-y-1">
      {names.map((name, index) => (
        <p
          key={index}
          className="font-vibes text-2xl md:text-3xl text-xv-rose-dark"
        >
          {name}
        </p>
      ))}
    </div>
  </motion.div>
);

export const Parents: React.FC = () => {
  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-xv-rose-gold/30 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-xv-rose-gold/30 to-transparent"></div>

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-vibes text-5xl md:text-6xl text-xv-rose-gold mb-4">
            Con la satisfacción de haberme visto nacer y crecer
          </h2>
          <p className="font-mont text-gray-400 text-sm tracking-wider">
            mis padres
          </p>
        </motion.div>

        <div className="max-w-5xl mx-auto">
          {/* Parents Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16">
            <ParentCard
              title="Mi Papá"
              names={['José Luis Cruz']}
              delay={0.2}
              icon={<Crown size={24} />}
            />
            <ParentCard
              title="Mi Mamá"
              names={['María Guadalupe Hernández']}
              delay={0.3}
              icon={<Crown size={24} />}
            />
          </div>

          {/* Divider */}
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex items-center justify-center gap-4 mb-16"
          >
            <div className="h-[1px] w-24 bg-xv-rose-gold/40"></div>
            <Heart
              className="text-xv-rose-gold"
              size={20}
              fill="currentColor"
            />
            <div className="h-[1px] w-24 bg-xv-rose-gold/40"></div>
          </motion.div>

          {/* Godparents Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h3 className="font-vibes text-4xl text-xv-rose-dark mb-2">
              Mis Padrinos
            </h3>
            <p className="font-mont text-gray-400 text-xs tracking-wider uppercase">
              Quienes me acompañan en este día especial
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <ParentCard
              title="Padrinos de Velación"
              names={['JOSE ARTURO GONZALEZ CHAVEZ', 'ELSA GONZALEZ LOPEZ']}
              delay={0.5}
              icon={<Heart size={20} />}
            />
            <ParentCard
              title="Padrinos de Anillo"
              names={['JOSE ARTURO GONZALEZ CHAVEZ', 'ELSA GONZALEZ LOPEZ']}
              delay={0.6}
              icon={<Heart size={20} />}
            />
            <ParentCard
              title="Padrinos de Corona"
              names={['JOSE ARTURO GONZALEZ CHAVEZ', 'ELSA GONZALEZ LOPEZ']}
              delay={0.7}
              icon={<Heart size={20} />}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
