import { useState } from 'react';
import { collection, addDoc, updateDoc, doc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db, storage } from '../../config/firebase';
import { Product } from '../../types';
import { X, Upload, Plus } from 'lucide-react';

interface ProductFormProps {
  product?: Product;
  onClose: () => void;
  onSuccess: () => void;
}

// Définition des couleurs disponibles
const availableColors = [
  { name: 'Blanc', hex: '#FFFFFF' },
  { name: 'Noir', hex: '#000000' },
  { name: 'Bleu', hex: '#2196F3' },
  { name: 'Rouge', hex: '#F44336' },
  { name: 'Vert', hex: '#4CAF50' },
  { name: 'Jaune', hex: '#FFEB3B' },
  { name: 'Gris', hex: '#9E9E9E' },
  { name: 'Marron', hex: '#795548' },
  { name: 'Rose', hex: '#E91E63' },
  { name: 'Violet', hex: '#9C27B0' }
];

export default function ProductForm({ product, onClose, onSuccess }: ProductFormProps) {
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    category: product?.category || 'men',
    sizes: product?.sizes || ['S', 'M', 'L', 'XL'],
    colors: product?.colors || [],
    images: product?.images || [],
  });
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState('');

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      setImageFiles(prev => [...prev, ...files]);
    }
  };

  const removeImage = (index: number) => {
    setImageFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setUploading(true);

    try {
      // Validation
      if (formData.colors.length === 0) {
        throw new Error('Veuillez sélectionner au moins une couleur');
      }
      if (formData.sizes.length === 0) {
        throw new Error('Veuillez sélectionner au moins une taille');
      }
      if (formData.price <= 0) {
        throw new Error('Le prix doit être supérieur à 0');
      }

      // Upload images
      const imageUrls = [...formData.images];
      for (const file of imageFiles) {
        const storageRef = ref(storage, `products/${Date.now()}_${file.name}`);
        const snapshot = await uploadBytes(storageRef, file);
        const url = await getDownloadURL(snapshot.ref);
        imageUrls.push(url);
      }

      const productData = {
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category,
        sizes: formData.sizes,
        colors: formData.colors,
        images: imageUrls,
        updatedAt: serverTimestamp(),
      };

      if (product?.id) {
        // Update existing product
        await updateDoc(doc(db, 'products', product.id), productData);
      } else {
        // Add new product
        await addDoc(collection(db, 'products'), {
          ...productData,
          createdAt: serverTimestamp(),
        });
      }

      onSuccess();
      onClose();
    } catch (error) {
      console.error('Erreur lors de l\'enregistrement:', error);
      setError(error instanceof Error ? error.message : 'Une erreur est survenue lors de l\'enregistrement du produit.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50">
      <div className="relative top-20 mx-auto p-5 border w-full max-w-4xl shadow-lg rounded-lg bg-white">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">
            {product ? 'Modifier le produit' : 'Ajouter un produit'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {error && (
          <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Nom du produit *
              </label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Catégorie *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value as 'men' | 'women' | 'children' })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
              >
                <option value="men">Hommes</option>
                <option value="women">Femmes</option>
                <option value="children">Enfants</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Prix (FDJ) *
              </label>
              <input
                type="number"
                required
                min="0"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) })}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
              />
            </div>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description *
            </label>
            <textarea
              required
              rows={4}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
            />
          </div>

          {/* Sizes */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Tailles disponibles *
            </label>
            <div className="flex flex-wrap gap-2">
              {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                <label key={size} className="inline-flex items-center">
                  <input
                    type="checkbox"
                    checked={formData.sizes.includes(size)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, sizes: [...formData.sizes, size] });
                      } else {
                        setFormData({
                          ...formData,
                          sizes: formData.sizes.filter((s) => s !== size),
                        });
                      }
                    }}
                    className="rounded border-gray-300 text-sky-600 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Couleurs disponibles *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
              {availableColors.map((color) => (
                <label key={color.hex} className="inline-flex items-center p-2 border rounded hover:bg-gray-50">
                  <input
                    type="checkbox"
                    checked={formData.colors.includes(color.hex)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFormData({ ...formData, colors: [...formData.colors, color.hex] });
                      } else {
                        setFormData({
                          ...formData,
                          colors: formData.colors.filter((c) => c !== color.hex),
                        });
                      }
                    }}
                    className="rounded border-gray-300 text-sky-600 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  />
                  <span 
                    className="ml-2 w-4 h-4 rounded border"
                    style={{ backgroundColor: color.hex }}
                  />
                  <span className="ml-2 text-sm text-gray-700">{color.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Images du produit *
            </label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Existing Images */}
              {formData.images.map((url, index) => (
                <div key={index} className="relative group">
                  <img
                    src={url}
                    alt={`Product ${index + 1}`}
                    className="h-32 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setFormData({
                        ...formData,
                        images: formData.images.filter((_, i) => i !== index),
                      });
                    }}
                    className="absolute top-2 right-2 hidden group-hover:flex bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* New Image Previews */}
              {imageFiles.map((file, index) => (
                <div key={index} className="relative group">
                  <img
                    src={URL.createObjectURL(file)}
                    alt={`Preview ${index + 1}`}
                    className="h-32 w-full object-cover rounded-lg"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-2 right-2 hidden group-hover:flex bg-red-500 text-white rounded-full p-1"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}

              {/* Upload Button */}
              <label className="border-2 border-dashed border-gray-300 rounded-lg p-4 h-32 flex flex-col items-center justify-center cursor-pointer hover:border-sky-500">
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
                <Upload className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm text-gray-500">Ajouter des images</span>
              </label>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={uploading}
              className={`px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700 flex items-center ${
                uploading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {uploading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                  Enregistrement...
                </>
              ) : (
                <>
                  <Plus className="w-5 h-5 mr-2" />
                  {product ? 'Mettre à jour' : 'Ajouter le produit'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}