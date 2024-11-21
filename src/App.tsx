import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { FavoritesProvider } from './context/FavoritesContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import MenProducts from './pages/MenProducts';
import WomenProducts from './pages/WomenProducts';
import ChildrenProducts from './pages/ChildrenProducts';
import Login from './pages/admin/Login';
import PrivateRoute from './components/PrivateRoute';
import AdminDashboard from './pages/admin/Dashboard';
import Favorites from './pages/Favorites';

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <CartProvider>
          <FavoritesProvider>
            <div className="min-h-screen bg-gray-50 flex flex-col">
              <Navbar />
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/checkout" element={<Checkout />} />
                  <Route path="/confirmation" element={<OrderConfirmation />} />
                  <Route path="/hommes" element={<MenProducts />} />
                  <Route path="/femmes" element={<WomenProducts />} />
                  <Route path="/enfants" element={<ChildrenProducts />} />
                  <Route path="/favoris" element={<Favorites />} />
                  <Route path="/admin/login" element={<Login />} />
                  <Route 
                    path="/admin/dashboard" 
                    element={
                      <PrivateRoute>
                        <AdminDashboard />
                      </PrivateRoute>
                    } 
                  />
                </Routes>
              </div>
              <Footer />
            </div>
          </FavoritesProvider>
        </CartProvider>
      </AuthProvider>
    </Router>
  );
}