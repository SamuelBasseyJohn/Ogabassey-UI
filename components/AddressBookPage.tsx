
import React, { useState } from 'react';
import { MapPin, Plus, Edit2, Trash2, CheckCircle2, X, Save, Home, Briefcase } from 'lucide-react';

interface Address {
  id: number;
  label: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  isDefault: boolean;
}

export const AddressBookPage: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
      { id: 1, label: "Home", address: "2 Olaide Tomori St, Ikeja", city: "Lagos", state: "Lagos", phone: "+234 814 697 8921", isDefault: true },
      { id: 2, label: "Office", address: "Tech Hub, 45 Admiralty Way, Lekki Phase 1", city: "Lagos", state: "Lagos", phone: "+234 800 123 4567", isDefault: false },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<number | null>(null);
  
  const initialFormState = {
    label: '',
    address: '',
    city: '',
    state: '',
    phone: '',
    isDefault: false
  };
  
  const [formData, setFormData] = useState(initialFormState);

  const handleAddNew = () => {
    setEditingId(null);
    setFormData(initialFormState);
    setIsModalOpen(true);
  };

  const handleEdit = (addr: Address) => {
    setEditingId(addr.id);
    setFormData({
      label: addr.label,
      address: addr.address,
      city: addr.city,
      state: addr.state,
      phone: addr.phone,
      isDefault: addr.isDefault
    });
    setIsModalOpen(true);
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this address?')) {
      setAddresses(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleSetDefault = (id: number) => {
    setAddresses(prev => prev.map(a => ({
      ...a,
      isDefault: a.id === id
    })));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingId) {
      // Update existing address
      setAddresses(prev => {
        // If setting as default, uncheck others
        const updatedList = prev.map(a => {
          if (a.id === editingId) {
             return { ...formData, id: editingId };
          }
          if (formData.isDefault) {
              return { ...a, isDefault: false };
          }
          return a;
        });
        return updatedList;
      });
    } else {
      // Add new address
      const newId = Math.max(0, ...addresses.map(a => a.id)) + 1;
      const newAddress = { ...formData, id: newId };
      
      setAddresses(prev => {
        let updated = [...prev, newAddress];
        
        // If new one is default, uncheck others
        if (newAddress.isDefault) {
            updated = updated.map(a => a.id === newId ? a : { ...a, isDefault: false });
        }
        
        // If it's the first address, force default
        if (updated.length === 1) {
            updated[0].isDefault = true;
        }
        return updated;
      });
    }
    setIsModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-12 pt-4 md:pt-8 flex flex-col">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 w-full flex-1 flex flex-col">
        
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
            <MapPin className="text-red-600 fill-red-600" />
            Address Book
            </h1>
            <button 
                onClick={handleAddNew}
                className="bg-red-600 text-white text-xs font-bold px-4 py-2.5 rounded-xl hover:bg-red-700 transition-colors flex items-center gap-2 shadow-sm active:scale-95"
            >
                <Plus size={16} /> Add New
            </button>
        </div>

        {addresses.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-8 bg-white rounded-2xl border border-dashed border-gray-200">
                <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                    <MapPin className="text-gray-400" size={32} />
                </div>
                <h3 className="font-bold text-gray-900 text-lg mb-2">No addresses found</h3>
                <p className="text-gray-500 text-sm mb-6 max-w-xs">Add a delivery address to checkout faster.</p>
                <button 
                    onClick={handleAddNew}
                    className="text-red-600 font-bold text-sm hover:underline"
                >
                    Add Address Now
                </button>
            </div>
        ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {addresses.map((addr) => (
                    <div key={addr.id} className={`bg-white p-6 rounded-2xl border ${addr.isDefault ? 'border-red-200 ring-1 ring-red-50' : 'border-gray-100'} shadow-sm relative group transition-all`}>
                        
                        <div className="flex justify-between items-start mb-4">
                            <div className="flex items-center gap-2">
                                {addr.label.toLowerCase() === 'home' ? <Home size={18} className="text-gray-400" /> : addr.label.toLowerCase() === 'office' ? <Briefcase size={18} className="text-gray-400" /> : <MapPin size={18} className="text-gray-400" />}
                                <span className="font-bold text-gray-900">{addr.label}</span>
                                {addr.isDefault && (
                                    <span className="bg-green-50 text-green-700 text-[10px] font-bold px-2 py-0.5 rounded-full border border-green-100 flex items-center gap-1">
                                        <CheckCircle2 size={10} /> Default
                                    </span>
                                )}
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => handleEdit(addr)}
                                    className="p-1.5 text-gray-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                    title="Edit"
                                >
                                    <Edit2 size={16} />
                                </button>
                                <button 
                                    onClick={() => handleDelete(addr.id)}
                                    className="p-1.5 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                                    title="Delete"
                                >
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </div>

                        <div className="space-y-1 text-sm text-gray-600 mb-4">
                            <p className="font-medium text-gray-800">{addr.address}</p>
                            <p>{addr.city}, {addr.state}</p>
                            <p className="pt-2 font-medium text-gray-900 flex items-center gap-2">
                                <span className="text-gray-400 text-xs">Phone:</span> {addr.phone}
                            </p>
                        </div>

                        {!addr.isDefault && (
                            <button 
                                onClick={() => handleSetDefault(addr.id)}
                                className="text-xs font-bold text-gray-400 hover:text-red-600 transition-colors"
                            >
                                Set as Default
                            </button>
                        )}
                    </div>
                ))}
            </div>
        )}

      </div>

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl relative z-10 animate-in zoom-in-95 duration-200 flex flex-col max-h-[90vh]">
                
                <div className="flex justify-between items-center p-5 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900 text-lg">{editingId ? 'Edit Address' : 'Add New Address'}</h3>
                    <button onClick={() => setIsModalOpen(false)} className="p-1 hover:bg-gray-100 rounded-full text-gray-500 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                <div className="p-6 overflow-y-auto">
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Label</label>
                            <input 
                                type="text" 
                                placeholder="e.g. Home, Office, Mum's House"
                                value={formData.label}
                                onChange={(e) => setFormData({...formData, label: e.target.value})}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm font-medium"
                            />
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Address</label>
                            <input 
                                type="text" 
                                placeholder="Street address, apartment, suite"
                                value={formData.address}
                                onChange={(e) => setFormData({...formData, address: e.target.value})}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm font-medium"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">City</label>
                                <input 
                                    type="text" 
                                    placeholder="City"
                                    value={formData.city}
                                    onChange={(e) => setFormData({...formData, city: e.target.value})}
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm font-medium"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">State</label>
                                <input 
                                    type="text" 
                                    placeholder="State"
                                    value={formData.state}
                                    onChange={(e) => setFormData({...formData, state: e.target.value})}
                                    required
                                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm font-medium"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wide mb-1.5">Phone Number</label>
                            <input 
                                type="tel" 
                                placeholder="+234..."
                                value={formData.phone}
                                onChange={(e) => setFormData({...formData, phone: e.target.value})}
                                required
                                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all text-sm font-medium"
                            />
                        </div>

                        <div className="flex items-center gap-3 pt-2">
                            <input 
                                type="checkbox" 
                                id="isDefault"
                                checked={formData.isDefault}
                                onChange={(e) => setFormData({...formData, isDefault: e.target.checked})}
                                className="w-5 h-5 text-red-600 rounded focus:ring-red-500 border-gray-300"
                            />
                            <label htmlFor="isDefault" className="text-sm text-gray-700 font-medium cursor-pointer select-none">
                                Set as default address
                            </label>
                        </div>

                        <button 
                            type="submit" 
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3.5 rounded-xl transition-all shadow-lg hover:shadow-red-200 active:scale-[0.98] flex items-center justify-center gap-2 mt-4"
                        >
                            <Save size={18} />
                            {editingId ? 'Update Address' : 'Save Address'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
      )}
    </div>
  );
};
