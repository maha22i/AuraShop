import { useState } from 'react';
import { Filter, X } from 'lucide-react';

interface FilterProps {
  onFilterChange: (filters: {
    sortBy: 'price-asc' | 'price-desc' | '';
    priceRange: [number, number];
  }) => void;
  minPrice: number;
  maxPrice: number;
}

export default function ProductFilter({ onFilterChange, minPrice, maxPrice }: FilterProps) {
  const [sortBy, setSortBy] = useState<'price-asc' | 'price-desc' | ''>('');
  const [priceRange, setPriceRange] = useState<[number, number]>([minPrice, maxPrice]);
  const [isOpen, setIsOpen] = useState(true);

  const handleFilterChange = (
    sort: typeof sortBy = sortBy,
    price: [number, number] = priceRange
  ) => {
    setSortBy(sort);
    setPriceRange(price);
    onFilterChange({ sortBy: sort, priceRange: price });
  };

  const resetFilters = () => {
    setSortBy('');
    setPriceRange([minPrice, maxPrice]);
    onFilterChange({ sortBy: '', priceRange: [minPrice, maxPrice] });
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      {/* Filter Header */}
      <div className="bg-gradient-to-r from-sky-600 to-sky-500 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Filter className="w-5 h-5 text-white" />
            <h2 className="text-lg font-semibold text-white">Filtres</h2>
          </div>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:text-sky-100 transition-colors"
          >
            {isOpen ? <X className="w-5 h-5" /> : <Filter className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="p-6 space-y-8">
          {/* Price Range */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Prix</h3>
            <div className="space-y-4">
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                value={priceRange[1]}
                onChange={(e) => handleFilterChange(sortBy, [minPrice, parseInt(e.target.value)])}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-600"
              />
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span>{minPrice.toLocaleString()} FDJ</span>
                <span>{priceRange[1].toLocaleString()} FDJ</span>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <h3 className="text-sm font-semibold text-gray-800 mb-4">Trier par prix</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleFilterChange('price-asc', priceRange)}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'price-asc'
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Prix croissant
              </button>
              <button
                onClick={() => handleFilterChange('price-desc', priceRange)}
                className={`w-full px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  sortBy === 'price-desc'
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Prix décroissant
              </button>
            </div>
          </div>

          {/* Reset Button */}
          <button
            onClick={resetFilters}
            className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors"
          >
            Réinitialiser les filtres
          </button>
        </div>
      )}
    </div>
  );
}