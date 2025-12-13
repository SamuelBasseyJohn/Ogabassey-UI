
import React, { useEffect } from 'react';
import { RefreshCw, Truck, Check, X, Clock, CreditCard, AlertCircle, ShoppingBag } from 'lucide-react';

export const ReturnPolicyPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 pt-4">
      {/* Header */}
      <div className="bg-[#1a1a1a] text-white py-16 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>
        <div className="max-w-[1400px] mx-auto px-4 md:px-6 relative z-10 text-center">
          <div className="w-16 h-16 bg-white/10 rounded-2xl flex items-center justify-center mx-auto mb-6 backdrop-blur-sm border border-white/10">
             <RefreshCw size={32} className="text-red-500" />
          </div>
          <h1 className="text-3xl md:text-5xl font-extrabold mb-4 tracking-tight">Return & Refund Policy</h1>
          <p className="text-gray-400 text-sm md:text-base max-w-2xl mx-auto">
            Peace of mind guaranteed. Simple, transparent returns for your satisfaction.
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 md:px-6 -mt-10 relative z-20">
        <div className="space-y-8">
            
            {/* The 7-Day Window */}
            <div className="bg-white p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
                <div className="w-24 h-24 bg-red-50 rounded-full flex items-center justify-center shrink-0 border-4 border-white shadow-sm">
                    <Clock size={40} className="text-red-600" />
                </div>
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">7-Day Return Window</h2>
                    <p className="text-gray-600 leading-relaxed">
                        You have 7 days from the date of delivery to return an item if it is defective or if you received the wrong product. We prioritize resolution through exchange or repair first.
                    </p>
                </div>
            </div>

            {/* Eligibility */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Eligibility for Returns</h3>
                <div className="space-y-6">
                    <div className="flex gap-4 items-start">
                        <Check className="text-green-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm">Defective on Arrival</h4>
                            <p className="text-sm text-gray-500">The device has a hardware fault immediately upon unboxing/setup.</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <Check className="text-green-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm">Wrong Item</h4>
                            <p className="text-sm text-gray-500">The product delivered is different from what was ordered (e.g., wrong color, storage, or model).</p>
                        </div>
                    </div>
                    <div className="flex gap-4 items-start">
                        <Check className="text-green-600 shrink-0 mt-1" />
                        <div>
                            <h4 className="font-bold text-gray-900 text-sm">Original Condition</h4>
                            <p className="text-sm text-gray-500">Item must be returned with all original packaging, accessories, and free gifts intact.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Non-Returnable Items */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                <h3 className="text-lg font-bold text-gray-900 mb-6 border-b border-gray-100 pb-4">Non-Returnable Items</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex gap-3 items-center p-3 bg-gray-50 rounded-lg">
                        <X size={18} className="text-gray-400" />
                        <span className="text-sm text-gray-600">Software subscriptions/Digital codes</span>
                    </div>
                    <div className="flex gap-3 items-center p-3 bg-gray-50 rounded-lg">
                        <X size={18} className="text-gray-400" />
                        <span className="text-sm text-gray-600">Items with broken warranty seals</span>
                    </div>
                    <div className="flex gap-3 items-center p-3 bg-gray-50 rounded-lg">
                        <X size={18} className="text-gray-400" />
                        <span className="text-sm text-gray-600">Hygiene products (Earbuds if opened)</span>
                    </div>
                    <div className="flex gap-3 items-center p-3 bg-gray-50 rounded-lg">
                        <X size={18} className="text-gray-400" />
                        <span className="text-sm text-gray-600">Items damaged by the user</span>
                    </div>
                </div>
            </div>

            {/* Refund Process */}
            <div className="bg-blue-50 border border-blue-100 rounded-2xl p-8">
                <h3 className="text-lg font-bold text-blue-900 mb-4 flex items-center gap-2">
                    <CreditCard size={20} /> Refund Policy
                </h3>
                <p className="text-sm text-blue-800 mb-6 leading-relaxed">
                    Refunds are processed only if an item cannot be replaced or repaired within a reasonable timeframe (72 hours). 
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Refund Method</span>
                        <p className="font-bold text-gray-900 mt-1">Same as Payment Method</p>
                        <p className="text-xs text-gray-500 mt-1">Or Store Wallet (Instant)</p>
                    </div>
                    <div className="bg-white p-4 rounded-xl border border-blue-100 shadow-sm">
                        <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Processing Time</span>
                        <p className="font-bold text-gray-900 mt-1">2 - 5 Business Days</p>
                        <p className="text-xs text-gray-500 mt-1">Depends on your bank</p>
                    </div>
                </div>
            </div>

            {/* Change of Mind */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex gap-4">
                <AlertCircle className="text-gray-400 shrink-0" />
                <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">Change of Mind Returns</h4>
                    <p className="text-sm text-gray-600 leading-relaxed">
                        If you simply change your mind about a purchase, we may accept a return within 24 hours, provided the item is sealed and unused. However, a <strong>15% restocking fee</strong> will apply, and delivery fees are non-refundable.
                    </p>
                </div>
            </div>

        </div>
      </div>
    </div>
  );
};
