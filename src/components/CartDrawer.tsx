import { X, Minus, Plus, ShoppingBag, Edit2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { CartItem } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

interface EditItemModalProps {
  item: CartItem;
  onClose: () => void;
  onSave: (id: string, size: string, color: string, quantity: number) => void;
}

function EditItemModal({ item, onClose, onSave }: EditItemModalProps) {
  const [size, setSize] = useState(item.selectedSize);
  const [color, setColor] = useState(item.selectedColor);
  const [quantity, setQuantity] = useState(item.quantity);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="relative bg-white rounded-lg p-4 sm:p-6 w-full max-w-md">
        <h3 className="text-lg font-semibold mb-4">Modifier l'article</h3>
        
        {/* Size Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Taille</label>
          <div className="flex flex-wrap gap-2">
            {item.sizes.map((s) => (
              <button
                key={s}
                onClick={() => setSize(s)}
                className={`px-3 py-1 rounded-md text-sm ${
                  size === s ? 'bg-sky-600 text-white' : 'bg-gray-100 text-gray-800'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* Color Selection */}
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">Couleur</label>
          <div className="flex flex-wrap gap-2">
            {item.colors.map((c) => (
              <button
                key={c}
                onClick={() => setColor(c)}
                className={`w-8 h-8 rounded-full border-2 ${
                  color === c ? 'border-sky-600' : 'border-transparent'
                }`}
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        {/* Quantity Selection */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Quantité</label>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="p-1 rounded-md bg-gray-100"
            >
              <Minus className="h-4 w-4" />
            </button>
            <span className="w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="p-1 rounded-md bg-gray-100"
            >
              <Plus className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-4">
          <button
            onClick={onClose}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Annuler
          </button>
          <button
            onClick={() => {
              onSave(item.id, size, color, quantity);
              onClose();
            }}
            className="flex-1 px-4 py-2 bg-sky-600 text-white rounded-md hover:bg-sky-700"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}

export default function CartDrawer({ isOpen, onClose }: CartDrawerProps) {
  const { state, dispatch } = useCart();
  const [editingItem, setEditingItem] = useState<CartItem | null>(null);

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity < 1) return;
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const handleEditItem = (id: string, size: string, color: string, quantity: number) => {
    dispatch({
      type: 'UPDATE_ITEM',
      payload: { id, size, color, quantity }
    });
  };

  if (!isOpen) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
        
        <div className="absolute right-0 top-0 h-full w-full sm:max-w-md bg-white shadow-xl">
          <div className="flex h-full flex-col">
            {/* Header */}
            <div className="flex items-center justify-between border-b px-4 py-3">
              <h2 className="text-lg font-semibold">Votre panier</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {state.items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ShoppingBag className="h-12 w-12 mb-4" />
                  <p>Votre panier est vide</p>
                </div>
              ) : (
                <ul className="divide-y divide-gray-200">
                  {state.items.map((item) => (
                    <li key={`${item.id}-${item.selectedSize}-${item.selectedColor}`} className="py-4">
                      <div className="flex items-start space-x-4">
                        <img
                          src={item.images[0]}
                          alt={item.name}
                          className="h-20 w-20 rounded-md object-cover"
                        />
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            Taille: {item.selectedSize} | Couleur: {item.selectedColor}
                          </p>
                          <p className="text-sm font-medium text-sky-600">
                            {(item.price * item.quantity).toLocaleString()} FDJ
                          </p>
                        </div>
                        <div className="flex flex-col items-end space-y-2">
                          <button
                            onClick={() => setEditingItem(item)}
                            className="p-1 text-gray-400 hover:text-gray-500"
                          >
                            <Edit2 className="h-4 w-4" />
                          </button>
                          <div className="flex items-center space-x-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="p-1 text-gray-400 hover:text-gray-500"
                            >
                              <Minus className="h-4 w-4" />
                            </button>
                            <span className="text-gray-600">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="p-1 text-gray-400 hover:text-gray-500"
                            >
                              <Plus className="h-4 w-4" />
                            </button>
                          </div>
                          <button
                            onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: item.id })}
                            className="text-sm text-red-500 hover:text-red-600"
                          >
                            Supprimer
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* Footer */}
            <div className="border-t p-4">
              <div className="flex justify-between text-base font-medium text-gray-900 mb-4">
                <p>Total</p>
                <p>{state.total.toLocaleString()} FDJ</p>
              </div>
              <Link
                to="/checkout"
                onClick={onClose}
                className={`block w-full rounded-md bg-sky-600 px-4 py-3 text-center text-sm font-medium text-white hover:bg-sky-700 ${
                  state.items.length === 0 ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={state.items.length === 0}
              >
                Commander ({state.items.length} article{state.items.length !== 1 ? 's' : ''})
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Item Modal */}
      {editingItem && (
        <EditItemModal
          item={editingItem}
          onClose={() => setEditingItem(null)}
          onSave={handleEditItem}
        />
      )}
    </>
  );
}