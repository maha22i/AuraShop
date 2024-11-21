import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function OrderConfirmation() {
  const orderNumber = Math.random().toString(36).substring(2, 10).toUpperCase();

  return (
    <div className="pt-16 bg-gray-50 min-h-screen">
      <div className="max-w-2xl mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <div className="flex justify-center mb-6">
            <CheckCircle className="h-16 w-16 text-green-500" />
          </div>
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            Merci pour votre commande !
          </h1>
          <p className="text-gray-600 mb-6">
            Votre numéro de commande est : <span className="font-semibold">{orderNumber}</span>
          </p>
          <p className="text-gray-600 mb-8">
            Nous vous contacterons bientôt pour confirmer les détails et organiser la livraison.
          </p>
          <Link
            to="/"
            className="inline-block bg-sky-600 text-white px-8 py-3 rounded-lg hover:bg-sky-700 transition-colors"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}