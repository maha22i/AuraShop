import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
import { motion } from 'framer-motion';

export default function WomenProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    sortBy: '' as 'price-asc' | 'price-desc' | '',
    priceRange: [0, 100000] as [number, number]
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          where('category', '==', 'women')
        );
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })) as Product[];
        setProducts(productsData);

        if (productsData.length > 0) {
          const maxPrice = Math.max(...productsData.map(p => p.price));
          setFilters(prev => ({
            ...prev,
            priceRange: [0, maxPrice]
          }));
        }
      } catch (error) {
        console.error('Erreur lors de la récupération des produits:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const filteredProducts = products
    .filter(product => product.price <= filters.priceRange[1])
    .sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      return 0;
    });

  const minPrice = Math.min(...products.map(p => p.price));
  const maxPrice = Math.max(...products.map(p => p.price));

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <motion.div
          className="h-12 w-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
    );
  }

  return (
    <div className="pt-16 bg-gray-50">
      {/* En-tête */}
      <div className="bg-gradient-to-r from-pink-100 to-purple-200 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <motion.h1
            className="text-4xl md:text-5xl font-extrabold text-gray-800"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Collection Femmes
          </motion.h1>
          <p className="mt-4 text-lg md:text-xl text-gray-600">
            Découvrez nos dernières tendances pour femme. Élégance et confort au rendez-vous.
          </p>
        </div>
      </div>

      {/* Contenu */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filtres */}
          <motion.div
            className="lg:col-span-1"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <ProductFilter
              onFilterChange={setFilters}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </motion.div>

          {/* Produits */}
          <motion.div
            className="lg:col-span-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Bar d'outils */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-sm text-gray-600">
                {filteredProducts.length > 0
                  ? `${filteredProducts.length} produit${filteredProducts.length > 1 ? 's' : ''} trouvé${filteredProducts.length > 1 ? 's' : ''}`
                  : 'Aucun produit trouvé.'}
              </p>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters((prev) => ({
                    ...prev,
                    sortBy: e.target.value as 'price-asc' | 'price-desc' | '',
                  }))
                }
                className="border border-gray-300 rounded-md p-2 bg-white text-sm focus:ring focus:ring-pink-300"
              >
                <option value="">Trier par</option>
                <option value="price-asc">Prix : du moins cher au plus cher</option>
                <option value="price-desc">Prix : du plus cher au moins cher</option>
              </select>
            </div>

            {filteredProducts.length === 0 ? (
              <p className="text-center text-gray-500">
                Aucun produit ne correspond à vos critères.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {filteredProducts.map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
