import { Phone, Mail, Clock, Facebook, Instagram, Twitter, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-4">AuraShop</h3>
            <p className="text-gray-400 mb-4">
              Votre mode, votre style, livré chez vous à Djibouti.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.facebook.com/profile.php?id=61556557785486" className="hover:text-sky-500 transition-colors" target="_blank">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/aura_shop_djibouti/" className="hover:text-sky-500 transition-colors" target="_blank">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://twitter.com" className="hover:text-sky-500 transition-colors" target="_blank">
                <Twitter className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Navigation rapide</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-sky-500 transition-colors">Accueil</Link>
              </li>
              <li>
                <Link to="/hommes" className="hover:text-sky-500 transition-colors">Hommes</Link>
              </li>
              <li>
                <Link to="/femmes" className="hover:text-sky-500 transition-colors">Femmes</Link>
              </li>
              <li>
                <Link to="/enfants" className="hover:text-sky-500 transition-colors">Enfants</Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-sky-500 transition-colors">À propos</Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-sky-500 transition-colors">Contact</Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center">
                <Phone className="w-5 h-5 mr-3 text-sky-500" />
                <span>+253 77 55 20 28 </span>
              
              </li>
              <li className="flex items-center">
                <Mail className="w-5 h-5 mr-3 text-sky-500" />
                <span>djibouti.aura@gmail.com</span>
              </li>
              <li className="flex items-center">
                <Clock className="w-5 h-5 mr-3 text-sky-500" />
                <span>7/7j 24/24h</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-lg font-semibold text-white mb-4">Newsletter</h3>
            <p className="text-gray-400 mb-4">
              Restez informé(e) des nouveautés et promotions.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Votre email"
                className="flex-1 px-4 py-2 bg-gray-800 rounded-l-lg focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <button
                type="submit"
                className="px-4 py-2 bg-sky-600 text-white rounded-r-lg hover:bg-sky-700 transition-colors"
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-400">
              © 2024 AuraShop. Tous droits réservés.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="" className="text-sm text-gray-400 hover:text-sky-500 transition-colors">
                Politique de confidentialité
              </Link>
              <Link to="" className="text-sm text-gray-400 hover:text-sky-500 transition-colors">
                Conditions d'utilisation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}