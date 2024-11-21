import { ShoppingBag, CreditCard, Truck, Shield } from 'lucide-react';
import { motion } from 'framer-motion';

export default function About() {
  return (
    <div className="pt-16 bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-500 to-green-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            className="text-5xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            À propos de nous
          </motion.h1>
          <motion.p
            className="text-lg md:text-xl text-blue-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            Bienvenue sur **AuraShop**, votre destination mode à Djibouti. Une
            expérience de shopping unique, pensée pour vous !
          </motion.p>
        </div>
      </div>

      {/* How it Works */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Comment ça marche ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                Icon: ShoppingBag,
                title: '1. Parcourez & Choisissez',
                description:
                  'Explorez notre catalogue et ajoutez vos articles préférés au panier.',
              },
              {
                Icon: CreditCard,
                title: '2. Commandez',
                description:
                  'Remplissez vos coordonnées et envoyez votre commande.',
              },
              {
                Icon: Truck,
                title: '3. Recevez',
                description:
                  'Notre équipe vous contacte pour organiser la livraison.',
              },
            ].map((step, idx) => (
              <motion.div
                key={idx}
                className="text-center p-6 shadow-lg rounded-lg bg-gradient-to-t from-gray-50 to-blue-50"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <step.Icon className="w-16 h-16 text-blue-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Payment Options */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-gray-100">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Modes de paiement
          </h2>
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: 'Paiement en espèces',
                  description:
                    'Payez directement à la livraison en espèces. Simple et pratique.',
                  points: [
                    'Sans frais supplémentaires',
                    'Vérifiez votre commande avant de payer',
                  ],
                },
                {
                  title: 'Paiement en plusieurs fois',
                  description:
                    'Flexibilité de paiement pour les commandes importantes.',
                  points: [
                    'Premier versement à la livraison',
                    'Échéancier personnalisé',
                  ],
                },
              ].map((option, idx) => (
                <div key={idx}>
                  <h3 className="text-2xl font-semibold mb-4">{option.title}</h3>
                  <p className="text-gray-600 mb-4">{option.description}</p>
                  <ul className="list-disc list-inside text-gray-600">
                    {option.points.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Delivery */}
      <section className="py-16 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Livraison adaptée à Djibouti
          </h2>
          <motion.div
            className="bg-white rounded-lg shadow-lg p-8"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-2xl font-semibold mb-4">Notre processus</h3>
                <ul className="space-y-4 text-gray-600">
                  {[
                    'Confirmation de votre commande',
                    'Contact téléphonique pour les détails',
                    'Accord sur le point de livraison',
                    'Livraison à l’heure convenue',
                  ].map((step, idx) => (
                    <li key={idx} className="flex items-start">
                      <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-4">
                        {idx + 1}
                      </span>
                      {step}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-semibold mb-4">Zones desservies</h3>
                <p className="text-gray-600">
                  Nous livrons dans tous les quartiers de Djibouti-ville et ses
                  environs. Un point de livraison pratique sera organisé.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Commitments */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-12 text-center">
            Nos engagements
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                Icon: Shield,
                title: 'Qualité garantie',
                description:
                  'Tous nos produits sont soigneusement sélectionnés pour leur qualité.',
              },
              {
                Icon: Shield,
                title: 'Service personnalisé',
                description:
                  'Une équipe attentive à vos besoins, toujours disponible.',
              },
              {
                Icon: Shield,
                title: 'Flexibilité',
                description:
                  'Des solutions adaptées à vos besoins pour les paiements et livraisons.',
              },
            ].map((commitment, idx) => (
              <motion.div
                key={idx}
                className="bg-gradient-to-r from-white to-blue-50 p-6 rounded-lg shadow-lg"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <commitment.Icon className="w-16 h-16 text-blue-600 mb-4" />
                <h3 className="text-2xl font-semibold mb-2">
                  {commitment.title}
                </h3>
                <p className="text-gray-600">{commitment.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">
            Questions fréquentes
          </h2>
          <div className="space-y-6">
            {[
              {
                question: 'Comment passer une commande ?',
                answer:
                  'Ajoutez vos articles préférés au panier, puis complétez vos coordonnées.',
              },
              {
                question: 'Comment fonctionne le paiement en plusieurs fois ?',
                answer:
                  'Un échelonnement des paiements est disponible pour les commandes importantes.',
              },
              {
                question: 'Quels quartiers sont desservis ?',
                answer:
                  'Nous livrons dans tous les quartiers de Djibouti-ville avec un service flexible.',
              },
            ].map((faq, idx) => (
              <motion.div
                key={idx}
                className="bg-white rounded-lg shadow-md p-6"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
              >
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
