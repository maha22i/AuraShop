import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useFavorites } from '../context/FavoritesContext';
import { Product } from '../types';
import ImagePreview from './ImagePreview';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const [selectedSize, setSelectedSize] = useState(product.sizes[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [showImagePreview, setShowImagePreview] = useState(false);
  const { dispatch } = useCart();
  const { addToFavorites, removeFromFavorites, isFavorite } = useFavorites();

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: { 
        product,
        size: selectedSize,
        color: selectedColor
      }
    });
  };

  const handleFavoriteClick = () => {
    if (isFavorite(product.id)) {
      removeFromFavorites(product.id);
    } else {
      addToFavorites(product);
    }
  };

  return (
    <>
      <div className="bg-white rounded-lg shadow-lg p-3 sm:p-4 group">
        {/* Image Container */}
        <div className="relative overflow-hidden rounded-lg mb-3 sm:mb-4">
          <img
            src={product.images[0]}
            alt={product.name}
            className="w-full aspect-[3/4] object-cover transform group-hover:scale-105 transition-transform duration-300"
          />
          <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-opacity" />
          
          {/* Quick Action Buttons */}
          <div className="absolute top-2 sm:top-4 right-2 sm:right-4 space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              onClick={handleFavoriteClick}
              className={`bg-white p-2 rounded-full shadow-lg transition-colors ${
                isFavorite(product.id) 
                  ? 'text-red-500 hover:text-red-600' 
                  : 'text-gray-400 hover:text-red-500'
              }`}
            >
              <Heart className="w-4 sm:w-5 h-4 sm:h-5" fill={isFavorite(product.id) ? "currentColor" : "none"} />
            </button>
            <button 
              className="bg-white p-2 rounded-full shadow-lg hover:bg-sky-50"
              onClick={() => setShowImagePreview(true)}
            >
              <Eye className="w-4 sm:w-5 h-4 sm:h-5 text-sky-600" />
            </button>
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-2 sm:space-y-3">
          <h3 className="text-base sm:text-lg font-semibold text-gray-800 line-clamp-2">
            {product.name}
          </h3>
          <p className="text-sky-600 font-medium">
            {product.price.toLocaleString()} FDJ
          </p>
          
          {/* Size Selection */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {product.sizes.map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`px-2 sm:px-3 py-1 rounded-md text-xs sm:text-sm ${
                  selectedSize === size
                    ? 'bg-sky-600 text-white'
                    : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                }`}
              >
                {size}
              </button>
            ))}
          </div>

          {/* Color Selection */}
          <div className="flex flex-wrap gap-1 sm:gap-2">
            {product.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`w-6 sm:w-8 h-6 sm:h-8 rounded-full border-2 ${
                  selectedColor === color ? 'border-sky-600' : 'border-transparent'
                }`}
                style={{ backgroundColor: color }}
              />
            ))}
          </div>

          {/* Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="w-full mt-2 sm:mt-4 bg-sky-600 text-white py-2 rounded-lg hover:bg-sky-700 transition-colors flex items-center justify-center text-sm sm:text-base"
          >
            <ShoppingCart className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
            Ajouter au panier
          </button>
        </div>
      </div>

      {/* Image Preview Modal */}
      {showImagePreview && (
        <ImagePreview
          images={product.images}
          onClose={() => setShowImagePreview(false)}
        />
      )}
    </>
  );
}