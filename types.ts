
import React from 'react';

export interface ProductRecommendation {
  name: string;
  price: string;
  reason: string;
  category: string;
}

export interface Category {
  id: string;
  name: string;
  icon: React.ReactNode;
  color?: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  bgColor: string;
  textColor: string;
  size: 'large' | 'small';
}

export interface Product {
  id: number;
  name: string;
  price: string;
  rawPrice: number;
  image: string;
  description: string;
  rating: number;
  category: string;
  condition: 'New' | 'Used';
  // Detailed specs for filtering
  brand?: string;
  storage?: string;
  ram?: string;
  colors?: string[];
  simType?: string;
  displayType?: string;
  displaySize?: string;
}

export interface CartItem extends Product {
  cartItemId: string; // Unique ID for cart entry (product ID + options)
  selectedColor?: string;
  selectedColorValue?: string;
  secondaryColor?: string;
  secondaryColorValue?: string;
  selectedStorage?: string;
  quantity: number;
  negotiatedPrice?: number;
  negotiationStatus?: 'none' | 'accepted';
  hasAssurance?: boolean;
  imei?: string;
}

export interface Order {
  id: string;
  date: string;
  time: string;
  total: string;
  status: string;
  paymentMethod: string;
  shippingAddress: string;
  items: CartItem[];
  walletDeduction?: number;
}