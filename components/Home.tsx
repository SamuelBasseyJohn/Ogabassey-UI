import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Hero } from './Hero';
import { ProductFilters } from './ProductFilters';
import { FeaturedProducts } from './FeaturedProducts';
import { BannerCarousel } from './BannerCarousel';

const CATEGORIES = ['All', 'Phones', 'Gaming', 'Laptops', 'Accessories', 'Printers'];

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(3000000);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const handlePriceChange = (min: number, max: number) => {
    setMinPrice(min);
    setMaxPrice(max);
  };

  const handleCategorySelect = (category: string) => {
    // Filter in place instead of navigating
    setSelectedCategory(category);
  };

  return (
    <>
      <Hero />
      
      {/* Horizontal Carousel Banner */}
      <div className="max-w-[1400px] mx-auto px-4 md:px-6 mb-6">
        <BannerCarousel className="h-40 md:h-52" />
      </div>

      <ProductFilters 
        categories={CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={handleCategorySelect}
        minPrice={minPrice}
        maxPrice={maxPrice}
        onPriceChange={handlePriceChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      
      <FeaturedProducts 
        selectedCategory={selectedCategory}
        minPrice={minPrice}
        maxPrice={maxPrice}
        viewMode={viewMode}
      />
    </>
  );
};