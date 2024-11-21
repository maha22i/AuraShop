import { useState } from 'react';
import { Package, Users, ShoppingBag } from 'lucide-react';
import ProductList from '../../components/admin/ProductList';
import OrderList from '../../components/admin/OrderList';
import CustomerList from '../../components/admin/CustomerList';
import ProductForm from '../../components/admin/ProductForm';
import AdminHeader from '../../components/admin/AdminHeader';
import { Product } from '../../types';

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('products');
  const [showProductForm, setShowProductForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | undefined>();

  const handleEditProduct = (product: Product) => {
    setSelectedProduct(product);
    setShowProductForm(true);
  };

  const handleAddProduct = () => {
    setSelectedProduct(undefined);
    setShowProductForm(true);
  };

  const handleProductFormSuccess = () => {
    setShowProductForm(false);
    setSelectedProduct(undefined);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <AdminHeader />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        {/* Navigation Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab('products')}
              className={`${
                activeTab === 'products'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Package className="w-5 h-5 mr-2" />
              Produits
            </button>
            <button
              onClick={() => setActiveTab('orders')}
              className={`${
                activeTab === 'orders'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <ShoppingBag className="w-5 h-5 mr-2" />
              Commandes
            </button>
            <button
              onClick={() => setActiveTab('customers')}
              className={`${
                activeTab === 'customers'
                  ? 'border-sky-500 text-sky-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
            >
              <Users className="w-5 h-5 mr-2" />
              Clients
            </button>
          </nav>
        </div>

        {/* Content Area */}
        <div className="bg-white shadow rounded-lg p-6">
          {activeTab === 'products' && (
            <ProductList
              onEdit={handleEditProduct}
              onAdd={handleAddProduct}
            />
          )}

          {activeTab === 'orders' && <OrderList />}

          {activeTab === 'customers' && <CustomerList />}
        </div>
      </main>

      {/* Product Form Modal */}
      {showProductForm && (
        <ProductForm
          product={selectedProduct}
          onClose={() => setShowProductForm(false)}
          onSuccess={handleProductFormSuccess}
        />
      )}
    </div>
  );
}