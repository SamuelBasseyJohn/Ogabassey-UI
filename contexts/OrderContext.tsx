
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Order, CartItem } from '../types';
import { orders as mockOrders } from '../data/orders';

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Order) => void;
  getOrderById: (id: string) => Order | undefined;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};

export const OrderProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  // Initialize with mock data + localStorage
  useEffect(() => {
    const storedOrders = localStorage.getItem('ogabassey_orders');
    if (storedOrders) {
      try {
        setOrders(JSON.parse(storedOrders));
      } catch (e) {
        console.error("Failed to parse orders from storage", e);
        // Fallback to mock data with proper casting
        setOrders(normalizeMockOrders(mockOrders));
      }
    } else {
      setOrders(normalizeMockOrders(mockOrders));
    }
  }, []);

  // Sync to localStorage
  useEffect(() => {
    if (orders.length > 0) {
        localStorage.setItem('ogabassey_orders', JSON.stringify(orders));
    }
  }, [orders]);

  const addOrder = (order: Order) => {
    setOrders(prev => [order, ...prev]);
  };

  const getOrderById = (id: string) => {
    return orders.find(o => o.id === id);
  };

  return (
    <OrderContext.Provider value={{ orders, addOrder, getOrderById }}>
      {children}
    </OrderContext.Provider>
  );
};

// Helper to ensure mock data matches CartItem structure
const normalizeMockOrders = (data: any[]): Order[] => {
    return data.map(order => ({
        ...order,
        items: order.items.map((item: any) => ({
            ...item,
            cartItemId: String(item.id),
            quantity: 1 // Default quantity for mock data
        }))
    }));
};
