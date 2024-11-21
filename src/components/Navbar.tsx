import { ShoppingCart, Search, Menu, Heart, X } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { useAuth } from '../context/AuthContext';
import CartDrawer from './CartDrawer';
import AdminAccessModal from './AdminAccessModal';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isAdminModalOpen, setIsAdminModalOpen] = useState(false);
  const location = useLocation();
  const { state } = useCart();
  const { favorites } = useFavorites();
  const { currentUser } = useAuth();

  // Fermer le menu mobile lors du changement de route
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  // Séquence secrète pour ouvrir le modal admin (Ctrl + Alt + A)
  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.altKey && event.key === 'a') {
      event.preventDefault();
      setIsAdminModalOpen(true);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <nav className="bg-white shadow-md fixed w-full z-50 top-0">
      <div className="max-w-7xl mx-auto px-4">
        {/* Desktop Navigation */}
        <div className="flex justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-sky-600">
              AuraShop
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-gray-600 hover:text-sky-600 transition-colors">Accueil</Link>
            <Link to="/hommes" className="text-gray-600 hover:text-sky-600 transition-colors">Hommes</Link>
            <Link to="/femmes" className="text-gray-600 hover:text-sky-600 transition-colors">Femmes</Link>
            <Link to="/enfants" className="text-gray-600 hover:text-sky-600 transition-colors">Enfants</Link>
            <Link to="/about" className="text-gray-600 hover:text-sky-600 transition-colors">À propos</Link>
            <Link to="/contact" className="text-gray-600 hover:text-sky-600 transition-colors">Contact</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            {/* Search Icon - Desktop */}
            <button 
              className="hidden md:flex text-gray-600 hover:text-sky-600 transition-colors"
              onClick={() => setIsSearchOpen(!isSearchOpen)}
            >
              <Search className="h-5 w-5" />
            </button>

            {/* Favorites */}
            <Link 
              to="/favoris" 
              className="text-gray-600 hover:text-sky-600 relative transition-colors"
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {favorites.length}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button 
              className="text-gray-600 hover:text-sky-600 relative transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="h-5 w-5" />
              {state.items.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-green-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                  {state.items.length}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-600 hover:text-sky-600 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Search Bar - Expanded */}
        {isSearchOpen && (
          <div className="absolute left-0 right-0 bg-white p-4 shadow-lg border-t">
            <div className="max-w-3xl mx-auto relative">
              <input
                type="search"
                placeholder="Rechercher un produit..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <button
                onClick={() => setIsSearchOpen(false)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        <div className={`md:hidden transition-all duration-300 ease-in-out ${
          isMenuOpen 
            ? 'max-h-screen opacity-100 visible'
            : 'max-h-0 opacity-0 invisible'
        }`}>
          <div className="py-4 space-y-4 bg-white">
            {/* Search Bar - Mobile */}
            <div className="px-4 mb-4">
              <div className="relative">
                <input
                  type="search"
                  placeholder="Rechercher un produit..."
                  className="w-full px-4 py-2 pl-10 pr-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </div>

            {/* Mobile Navigation Links */}
            <div className="space-y-2 px-4">
              <Link to="/" className="block py-2 text-gray-600 hover:text-sky-600 transition-colors">
                Accueil
              </Link>
              <Link to="/hommes" className="block py-2 text-gray-600 hover:text-sky-600 transition-colors">
                Hommes
              </Link>
              <Link to="/femmes" className="block py-2 text-gray-600 hover:text-sky-600 transition-colors">
                Femmes
              </Link>
              <Link to="/enfants" className="block py-2 text-gray-600 hover:text-sky-600 transition-colors">
                Enfants
              </Link>
              <Link to="/about" className="block py-2 text-gray-600 hover:text-sky-600 transition-colors">
                À propos
              </Link>
              <Link to="/contact" className="block py-2 text-gray-600 hover:text-sky-600 transition-colors">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Cart Drawer */}
      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Admin Modal */}
      <AdminAccessModal isOpen={isAdminModalOpen} onClose={() => setIsAdminModalOpen(false)} />
    </nav>
  );
}