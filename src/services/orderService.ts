import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../config/firebase';

interface SaveOrderParams {
  customerInfo: {
    fullName: string;
    email: string | null;
    phone: string;
    district: string;
    comment: string | null;
  };
  items: string;
  total: number;
}

export const saveOrderToFirestore = async (params: SaveOrderParams) => {
  try {
    const orderData = {
      customerInfo: params.customerInfo,
      items: params.items,
      total: params.total,
      status: 'new',
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await addDoc(collection(db, 'orders'), orderData);
  } catch (error) {
    console.error('Erreur lors de la sauvegarde de la commande:', error);
    // Ne pas propager l'erreur pour ne pas bloquer le processus de commande
  }
};