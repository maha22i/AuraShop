import { useState, useEffect } from 'react';
import { collection, getDocs, query, orderBy, doc, deleteDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { Order } from '../../types';
import { User, Phone, Package, ChevronDown, ChevronUp, Edit2, Trash2 } from 'lucide-react';

interface EditCustomerModalProps {
  customer: {
    phone: string;
    info: {
      fullName: string;
      phone: string;
      email?: string;
      district: string;
    };
    orders: Order[];
  };
  onClose: () => void;
  onSave: (phone: string, updates: { fullName: string; email?: string; district: string }) => Promise<void>;
}

function EditCustomerModal({ customer, onClose, onSave }: EditCustomerModalProps) {
  const [formData, setFormData] = useState({
    fullName: customer.info.fullName,
    email: customer.info.email || '',
    district: customer.info.district,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(customer.phone, {
        fullName: formData.fullName,
        email: formData.email || undefined,
        district: formData.district,
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
                Modifier les informations du client
              </h3>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">
                    Nom complet
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

export default function CustomerList() {
  const [customers, setCustomers] = useState<{
    [key: string]: {
      info: {
        fullName: string;
        phone: string;
        email?: string;
        district: string;
      };
      orders: Order[];
    };
  }>({});
  const [loading, setLoading] = useState(true);
  const [expandedCustomer, setExpandedCustomer] = useState<string | null>(null);
  const [editingCustomer, setEditingCustomer] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    fetchCustomers();
  }, []);

  const fetchCustomers = async () => {
    try {
      const ordersQuery = query(collection(db, 'orders'), orderBy('createdAt', 'desc'));
      const querySnapshot = await getDocs(ordersQuery);
      
      const customersData: {
        [key: string]: {
          info: {
            fullName: string;
            phone: string;
            email?: string;
            district: string;
          };
          orders: Order[];
        };
      } = {};

      querySnapshot.docs.forEach(doc => {
        const order = {
          id: doc.id,
          ...doc.data(),
          createdAt: doc.data().createdAt?.toDate(),
          updatedAt: doc.data().updatedAt?.toDate(),
        } as Order;

        const customerPhone = order.customerInfo.phone;

        if (!customersData[customerPhone]) {
          customersData[customerPhone] = {
            info: {
              fullName: order.customerInfo.fullName,
              phone: order.customerInfo.phone,
              email: order.customerInfo.email,
              district: order.customerInfo.district,
            },
            orders: [],
          };
        }

        customersData[customerPhone].orders.push(order);
      });

      setCustomers(customersData);
    } catch (error) {
      console.error('Erreur lors de la récupération des clients:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateCustomer = async (phone: string, updates: { fullName: string; email?: string; district: string }) => {
    try {
      // Mettre à jour toutes les commandes du client
      const customerOrders = customers[phone].orders;
      for (const order of customerOrders) {
        await updateDoc(doc(db, 'orders', order.id), {
          'customerInfo.fullName': updates.fullName,
          'customerInfo.email': updates.email,
          'customerInfo.district': updates.district,
          updatedAt: new Date(),
        });
      }

      // Mettre à jour l'état local
      setCustomers(prev => ({
        ...prev,
        [phone]: {
          ...prev[phone],
          info: {
            ...prev[phone].info,
            fullName: updates.fullName,
            email: updates.email,
            district: updates.district,
          },
        },
      }));

      setEditingCustomer(null);
    } catch (error) {
      console.error('Erreur lors de la mise à jour du client:', error);
      throw error;
    }
  };

  const handleDeleteCustomer = async (phone: string) => {
    try {
      // Supprimer toutes les commandes du client
      const customerOrders = customers[phone].orders;
      for (const order of customerOrders) {
        await deleteDoc(doc(db, 'orders', order.id));
      }

      // Mettre à jour l'état local
      const newCustomers = { ...customers };
      delete newCustomers[phone];
      setCustomers(newCustomers);
      setDeleteConfirm(null);
    } catch (error) {
      console.error('Erreur lors de la suppression du client:', error);
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

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-sky-600"></div>
      </div>
    );
  }

  if (Object.keys(customers).length === 0) {
    return (
      <div className="text-center py-12">
        <User className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-500">Aucun client n'a encore passé de commande.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Liste des clients</h2>
      
      {Object.entries(customers).map(([phone, customer]) => (
        <div key={phone} className="bg-white rounded-lg shadow-sm border">
          {/* Customer Header */}
          <div className="p-4 flex items-center justify-between">
            <div 
              className="flex items-center space-x-4 flex-grow cursor-pointer"
              onClick={() => setExpandedCustomer(expandedCustomer === phone ? null : phone)}
            >
              <User className="w-10 h-10 text-gray-400 bg-gray-100 rounded-full p-2" />
              <div>
                <h3 className="text-lg font-medium text-gray-900">
                  {customer.info.fullName}
                </h3>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <Phone className="w-4 h-4 mr-1" />
                  {customer.info.phone}
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {customer.orders.length} commande{customer.orders.length > 1 ? 's' : ''}
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setEditingCustomer(phone);
                }}
                className="text-sky-600 hover:text-sky-700"
              >
                <Edit2 className="w-5 h-5" />
              </button>
              {deleteConfirm === phone ? (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteCustomer(phone);
                    }}
                    className="text-red-600 hover:text-red-700 text-sm font-medium"
                  >
                    Confirmer
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm(null);
                    }}
                    className="text-gray-600 hover:text-gray-700 text-sm font-medium"
                  >
                    Annuler
                  </button>
                </div>
              ) : (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteConfirm(phone);
                  }}
                  className="text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              )}
              {expandedCustomer === phone ? 
                <ChevronUp className="w-5 h-5 text-gray-400" /> : 
                <ChevronDown className="w-5 h-5 text-gray-400" />
              }
            </div>
          </div>

          {/* Customer Details */}
          {expandedCustomer === phone && (
            <div className="border-t px-4 py-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Customer Information */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Informations client</h4>
                  <dl className="space-y-2 text-sm">
                    <div>
                      <dt className="text-gray-500">Email</dt>
                      <dd className="font-medium">{customer.info.email || 'Non renseigné'}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Quartier</dt>
                      <dd className="font-medium">{customer.info.district}</dd>
                    </div>
                    <div>
                      <dt className="text-gray-500">Nombre total de commandes</dt>
                      <dd className="font-medium">{customer.orders.length}</dd>
                    </div>
                  </dl>
                </div>

                {/* Order History */}
                <div>
                  <h4 className="text-sm font-medium text-gray-900 mb-4">Historique des commandes</h4>
                  <div className="space-y-4">
                    {customer.orders.map((order) => (
                      <div key={order.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Package className="w-5 h-5 text-gray-400" />
                          <div>
                            <p className="text-sm font-medium">
                              Commande #{order.id.slice(-6).toUpperCase()}
                            </p>
                            <p className="text-xs text-gray-500">
                              {order.createdAt.toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-sm font-medium">
                            {order.total.toLocaleString()} FDJ
                          </span>
                          {getStatusBadge(order.status)}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}

      {/* Edit Customer Modal */}
      {editingCustomer && (
        <EditCustomerModal
          customer={{ phone: editingCustomer, ...customers[editingCustomer] }}
          onClose={() => setEditingCustomer(null)}
          onSave={handleUpdateCustomer}
        />
      )}
    </div>
  );
}