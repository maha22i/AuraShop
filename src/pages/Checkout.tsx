import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { CustomerInfo } from '../types';
import { sendOrderEmail } from '../services/emailService';
import { saveOrderToFirestore } from '../services/orderService';

export default function Checkout() {
  const { state, dispatch } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    fullName: '',
    email: '',
    phone: '',
    district: '',
    comment: ''
  });

  const formatOrderItems = () => {
    return state.items.map(item => `
      Produit: ${item.name}
      Taille: ${item.selectedSize}
      Couleur: ${item.selectedColor}
      Quantité: ${item.quantity}
      Prix unitaire: ${item.price} FDJ
      Sous-total: ${item.price * item.quantity} FDJ
    `).join('\n\n');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Envoyer l'email
      await sendOrderEmail({
        customerName: customerInfo.fullName,
        customerEmail: customerInfo.email || 'Non fourni',
        customerPhone: customerInfo.phone,
        customerDistrict: customerInfo.district,
        customerComment: customerInfo.comment || 'Aucun commentaire',
        orderItems: formatOrderItems(),
        orderTotal: `${state.total} FDJ`,
      });

      // Sauvegarder la commande dans Firestore (en arrière-plan)
      saveOrderToFirestore({
        customerInfo: {
          fullName: customerInfo.fullName,
          email: customerInfo.email || null,
          phone: customerInfo.phone,
          district: customerInfo.district,
          comment: customerInfo.comment || null,
        },
        items: formatOrderItems(),
        total: state.total,
      });

      // Vider le panier et rediriger vers la page de confirmation
      dispatch({ type: 'CLEAR_CART' });
      navigate('/confirmation');
    } catch (error) {
      alert('Une erreur est survenue lors de l\'envoi de la commande. Veuillez réessayer.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state.items.length === 0) {
    navigate('/');
    return null;
  }

  return (
    <div className="pt-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12">
          {/* Order Summary */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Résumé de la commande</h2>
            <div className="bg-white rounded-lg shadow p-6">
              <ul className="divide-y divide-gray-200">
                {state.items.map((item) => (
                  <li key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="py-4">
                    <div className="flex items-center space-x-4">
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="h-16 w-16 rounded-md object-cover"
                      />
                      <div className="flex-1">
                        <h3 className="text-sm font-medium">{item.name}</h3>
                        <p className="text-sm text-gray-500">
                          Taille: {item.selectedSize} | Quantité: {item.quantity}
                        </p>
                        <p className="text-sm font-medium">
                          {(item.price * item.quantity).toLocaleString()} FDJ
                        </p>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Total</p>
                  <p>{state.total.toLocaleString()} FDJ</p>
                </div>
              </div>
            </div>
          </div>

          {/* Customer Information Form */}
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-8">Vos coordonnées</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="fullName" className="block text-sm font-medium text-gray-700">
                  Nom complet *
                </label>
                <input
                  type="text"
                  id="fullName"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  value={customerInfo.fullName}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, fullName: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email (optionnel)
                </label>
                <input
                  type="email"
                  id="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, email: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Téléphone *
                </label>
                <input
                  type="tel"
                  id="phone"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, phone: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="district" className="block text-sm font-medium text-gray-700">
                  Quartier *
                </label>
                <input
                  type="text"
                  id="district"
                  required
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  value={customerInfo.district}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, district: e.target.value })}
                />
              </div>

              <div>
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
                  Commentaire (optionnel)
                </label>
                <textarea
                  id="comment"
                  rows={4}
                  placeholder="Instructions spéciales pour la livraison, préférences particulières..."
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  value={customerInfo.comment}
                  onChange={(e) => setCustomerInfo({ ...customerInfo, comment: e.target.value })}
                />
                <p className="mt-1 text-sm text-gray-500">
                  Ajoutez ici toute information supplémentaire concernant votre commande.
                </p>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-sky-600 text-white py-3 px-6 rounded-lg hover:bg-sky-700 transition-colors ${
                  isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {isSubmitting ? 'Envoi en cours...' : 'Confirmer la commande'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}