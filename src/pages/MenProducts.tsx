import { useState, useEffect } from 'react';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../config/firebase';
import { Product } from '../types';
import ProductCard from '../components/ProductCard';
import ProductFilter from '../components/ProductFilter';
//import { motion } from 'framer-motion';

export default function MenProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({
    sortBy: '' as 'price-asc' | 'price-desc' | 'popularity' | 'newest' | '',
    priceRange: [0, 100000] as [number, number],
  });

  const itemsPerPage = 9;

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const q = query(
          collection(db, 'products'),
          where('category', '==', 'men')
        );
        const querySnapshot = await getDocs(q);
        const productsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as Product[];
        setProducts(productsData);

        // Update price range based on actual products
        if (productsData.length > 0) {
          const maxPrice = Math.max(...productsData.map((p) => p.price));
          setFilters((prev) => ({
            ...prev,
            priceRange: [0, maxPrice],
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

  const sortedFilteredProducts = products
    .filter((product) => product.price <= filters.priceRange[1])
    .sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'popularity') return b.popularity - a.popularity; // Popularity logic
      if (filters.sortBy === 'newest') return b.createdAt - a.createdAt; // Newest logic
      return 0;
    });

  const paginatedProducts = sortedFilteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(sortedFilteredProducts.length / itemsPerPage);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        {/* <motion.div
          className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        /> */}
      </div>
    );
  }

  const minPrice = Math.min(...products.map((p) => p.price));
  const maxPrice = Math.max(...products.map((p) => p.price));

  return (
    <div className="pt-16 bg-gray-50">
      {/* Banner */}
      <div className="relative bg-gradient-to-r from-blue-500 to-green-500 text-white py-16 px-4 text-center">
        <h1 className="text-4xl font-extrabold mb-4">Collection Hommes</h1>
        <p className="text-lg">
          Découvrez les dernières tendances en mode masculine et trouvez le style parfait.
        </p>
      </div>

      {/* Main Section */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters */}
          <div className="lg:col-span-1">
            <ProductFilter
              onFilterChange={setFilters}
              minPrice={minPrice}
              maxPrice={maxPrice}
            />
          </div>

          {/* Products */}
          <div className="lg:col-span-3">
            <div className="flex justify-between items-center mb-8">
              <p className="text-gray-600">
                {sortedFilteredProducts.length} produits trouvés
              </p>
              <select
                value={filters.sortBy}
                onChange={(e) =>
                  setFilters({ ...filters, sortBy: e.target.value as any })
                }
                className="bg-white border border-gray-300 rounded-md text-gray-600 py-2 px-4"
              >
                <option value="">Trier par</option>
                <option value="price-asc">Prix: Croissant</option>
                <option value="price-desc">Prix: Décroissant</option>
                <option value="popularity">Popularité</option>
                <option value="newest">Nouveautés</option>
              </select>
            </div>

            {paginatedProducts.length === 0 ? (
              <p className="text-center text-gray-500">
                Aucun produit ne correspond à vos critères.
              </p>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {paginatedProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                {[...Array(totalPages)].map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`mx-1 px-4 py-2 rounded-md ${
                      currentPage === i + 1
                        ? 'bg-blue-500 text-white'
                        : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
