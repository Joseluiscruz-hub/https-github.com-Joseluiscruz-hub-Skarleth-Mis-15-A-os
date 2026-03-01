import React, { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db, isFirebaseConfigured } from '../firebase';

const VerificarFirestore: React.FC = () => {
  useEffect(() => {
    async function verificar() {
      if (!isFirebaseConfigured || !db) {
        console.warn(
          'Firebase no está configurado. Omitiendo verificación de Firestore.'
        );
        return;
      }

      try {
        // Cambia "testDocId" por un ID válido de tu colección
        const docRef = doc(db, 'loveWallMessages', 'testDocId');
        await getDoc(docRef);
        console.log('¡La aplicación está conectada a Cloud Firestore!');
      } catch (error) {
        console.error('Error al conectar con Cloud Firestore:', error);
      }
    }
    verificar();
  }, []);

  return null;
};

export default VerificarFirestore;
