import { useState, useEffect } from 'react';
import { collection, getDocs, updateDoc, doc, orderBy, query, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Order } from '../../types';
import { Package, Clock, CheckCircle, ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react';

interface EditOrderModalProps {
  order: Order;
  onClose: () => void;
  onSave: (orderId: string, updates: Partial<Order>) => Promise<void>;
}

function EditOrderModal({ order, onClose, onSave }: EditOrderModalProps) {
  const [formData, setFormData] = useState({
    fullName: order.customerInfo.fullName,
    email: order.customerInfo.email || '',
    phone: order.customerInfo.phone,
    district: order.customerInfo.district,
    comment: order.customerInfo.comment || '',
    status: order.status,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(order.id, {
        customerInfo: {
          fullName: formData.fullName,
          email: formData.email || null,
          phone: formData.phone,
          district: formData.district,
          comment: formData.comment || null,
        },
        status: formData.status,
      });
      onClose();
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" onClick={onClose}>
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>

        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <form onSubmit={handleSubmit}>
            <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Modifier la commande
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom du client
                  </label>
                  <input
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Téléphone
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Quartier
                  </label>
                  <input
                    type="text"
                    value={formData.district}
                    onChange={(e) => setFormData({ ...formData, district: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Commentaire
                  </label>
                  <textarea
                    value={formData.comment}
                    onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                    rows={3}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Statut
                  </label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as Order['status'] })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-sky-500 focus:ring-sky-500"
                  >
                    <option value="new">Nouvelle</option>
                    <option value="processing">En cours</option>
                    <option value="completed">Livrée</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
              <button
                type="submit"
                disabled={loading}
                className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-sky-600 text-base font-medium text-white hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:ml-3 sm:w-auto sm:text-sm"
              >
                {loading ? 'Enregistrement...' : 'Enregistrer'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-sky-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              >
                Annuler
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default function OrderList() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedOrder, setExpandedOrder] = useState<string | null>(null);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(ordersQuery);
      const ordersData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate(),
        updatedAt: doc.data().updatedAt?.toDate(),
      })) as Order[];
      setOrders(ordersData);
    } catch (error) {
      console.error('Erreur lors de la récupération des commandes:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, newStatus: Order['status']) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        status: newStatus,
        updatedAt: new Date()
      });
      
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { ...order, status: newStatus, updatedAt: new Date() }
          : order
      ));
    } catch (error) {
      console.error('Erreur lors de la mise à jour du statut:', error);
    }
  };

  const handleUpdateOrder = async (orderId: string, updates: Partial<Order>) => {
    try {
      await updateDoc(doc(db, 'orders', orderId), {
        ...updates,
        updatedAt: new Date()
      });
      
      setOrders(orders.map(order => 
        order.id === orderId 
          ? { 
              ...order, 
              ...updates, 
              updatedAt: new Date() 
            }
          : order
      ));
    } catch (error) {
      console.error('Erreur lors de la mise à jour:', error);
      throw error;
    }
  };

  const handleDeleteOrder = async (orderId: string) => {
    try {
      await deleteDoc(doc(db, 'orders', orderId));
      setOrders(orders.filter(order => order.id !== orderId));
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Erreur lors de la suppression:', error);
    }
  };

  const getStatusBadge = (status: Order['status']) => {
    switch (status) {
      case 'new':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">Nouvelle</span>;
      case 'processing':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-yellow-100 text-yellow-800">En cours</span>;
      case 'completed':
        return <span className="px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">Livrée</span>;
    }
  };

  const getStatusIcon = (status: Order['status']) => {
    switch (status) {
      case 'new':
        return <Package className="w-5 h-5 text-blue-500" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="text-center py-12">
        <Package className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Aucune commande n'a été passée.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {orders.map((order) => (
        <div key={order.id} className="bg-white rounded-lg shadow-sm border">
          {/* Order Header */}
          <div className="p-4 flex items-center justify-between">
            <div 
              className="flex items-center space-x-4 flex-grow cursor-pointer"
              onClick={() => setExpandedOrder(expandedOrder === order.id ? null : order.id)}
            >
              {getStatusIcon(order.status)}
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  Commande de {order.customerInfo.fullName}
                </h3>
                <p className="text-sm text-gray-500">
                  {order.createdAt.toLocaleDateString()} à {order.createdAt.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {getStatusBadge(order.status)}
              <button
                onClick={() => setEditingOrder(order)}
                className="text-sky-600 hover:text-sky-700"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              {deleteConfirm === order.id ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Confirmer
                  </button>
                  <button
                    onClick={() => setDeleteConfirm(null)}
                    className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                  >
                    Annuler
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setDeleteConfirm(order.id)}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
              {expandedOrder === order.id ? 
                <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                <ChevronDown className="w-5 h-5 text-gray-400" />
              }
            </div>
          </div>

          {/* Order Details */}
          {expandedOrder === order.id && (
            <div className="border-t px-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Informations client</h4>
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="text-gray-500">Nom</dt>
                      <dd className="font-medium">{order.customerInfo.fullName}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Téléphone</dt>
                      <dd className="font-medium">{order.customerInfo.phone}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Email</dt>
                      <dd className="font-medium">{order.customerInfo.email || 'Non renseigné'}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Quartier</dt>
                      <dd className="font-medium">{order.customerInfo.district}</dd>
                    </div>
                    {order.customerInfo.comment && (
                      <div>
                        <dt className="text-gray-500">Commentaire</dt>
                        <dd className="font-medium">{order.customerInfo.comment}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Order Items */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Articles commandés</h4>
                  <div className="whitespace-pre-wrap font-mono text-sm">
                    {order.items}
                  </div>
                  <div className="mt-4 pt-4 border-t">
                    <p className="text-lg font-semibold text-gray-900">
                      Total: {order.total.toLocaleString()} FDJ
                    </p>
                  </div>
                </div>
              </div>

              {/* Status Update */}
              <div className="mt-6 pt-6 border-t">
                <h4 className="text-sm font-medium text-gray-900 mb-4">Mettre à jour le statut</h4>
                <div className="flex space-x-4">
                  <button
                    onClick={() => updateOrderStatus(order.id, 'new')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      order.status === 'new'
                        ? 'bg-blue-100 text-blue-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Nouvelle
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'processing')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      order.status === 'processing'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    En cours
                  </button>
                  <button
                    onClick={() => updateOrderStatus(order.id, 'completed')}
                    className={`px-4 py-2 rounded-md text-sm font-medium ${
                      order.status === 'completed'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                    }`}
                  >
                    Livrée
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Edit Order Modal */}
      {editingOrder && (
        <EditOrderModal
          order={editingOrder}
          onClose={() => setEditingOrder(null)}
          onSave={handleUpdateOrder}
        />
      )}
    </div>
  );
}