
import React, { useMemo } from 'react';
import { History, ShoppingCart, Calendar, ArrowRight, ExternalLink } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import { useOrder } from '../contexts/OrderContext';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from './EmptyState';

export const PurchaseHistoryPage: React.FC = () => {
  const { addToCart } = useCart();
  const { orders } = useOrder();
  const navigate = useNavigate();

  // Flatten orders to get a list of purchased items
  const purchasedItems = useMemo(() => {
      return orders.flatMap(order => 
          order.items.map(item => ({
              purchaseId: order.id,
              date: order.date,
              product: item,
              price: item.negotiatedPrice ? `₦${item.negotiatedPrice.toLocaleString()}` : item.price,
              quantity: item.quantity
          }))
      );
  }, [orders]);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 md:pb-12 pt-4 md:pt-8 flex flex-col">
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 w-full flex-1 flex flex-col">
        
        <h1 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
          <History className="text-red-600 fill-red-600" />
          Purchase History
        </h1>

        {purchasedItems.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
                <EmptyState 
                    variant="history"
                    title="No purchase history" 
                    description="You haven't bought anything yet. Your purchased items will appear here." 
                    actionLabel="Start Shopping" 
                    actionLink="/"
                />
            </div>
        ) : (
            <div className="space-y-4">
                {purchasedItems.map((item, idx) => (
                    <div 
                        key={`${item.purchaseId}-${idx}`} 
                        className="bg-white rounded-2xl border border-gray-100 p-4 md:p-6 flex flex-col md:flex-row gap-6 items-start md:items-center shadow-sm hover:shadow-md transition-shadow"
                    >
                        {/* Image */}
                        <div className="w-20 h-20 bg-gray-50 rounded-xl p-2 shrink-0 border border-gray-100 flex items-center justify-center">
                            <img src={item.product.image} alt={item.product.name} className="w-full h-full object-contain mix-blend-multiply" />
                        </div>

                        {/* Details */}
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
                                <Calendar size={12} />
                                <span>Purchased on {item.date}</span>
                            </div>
                            <h3 className="font-bold text-gray-900 text-sm md:text-base mb-1 truncate">{item.product.name}</h3>
                            <p className="text-sm font-bold text-red-600">{item.price} <span className="text-gray-400 font-normal text-xs ml-1">x {item.quantity}</span></p>
                        </div>

                        {/* Actions */}
                        <div className="flex items-center gap-3 w-full md:w-auto mt-2 md:mt-0">
                            <button 
                                onClick={() => {
                                    addToCart(item.product, 1);
                                    navigate('/cart');
                                }}
                                className="flex-1 md:flex-none bg-gray-900 text-white text-xs font-bold py-2.5 px-4 rounded-xl hover:bg-red-600 transition-colors flex items-center justify-center gap-2 shadow-sm active:scale-95"
                            >
                                <ShoppingCart size={14} /> Buy Again
                            </button>
                            <button 
                                onClick={() => navigate(`/product/${item.product.id}`)}
                                className="p-2.5 border border-gray-200 rounded-xl text-gray-500 hover:text-red-600 hover:border-red-200 hover:bg-red-50 transition-colors"
                            >
                                <ExternalLink size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        )}
      </div>
    </div>
  );
};
