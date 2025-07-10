import { useState } from "react";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const FilterSidebar = ({ 
  isOpen, 
  onClose, 
  filters, 
  onFiltersChange, 
  onClearFilters 
}) => {
  const [priceRange, setPriceRange] = useState({
    min: filters.priceRange?.min || 0,
    max: filters.priceRange?.max || 10000
  });

  const categories = ["Women", "Men", "Kids", "Beauty", "Home & Living"];
  const brands = ["StyleHub", "TrendWear", "FashionForward", "ClassicWear", "SportStyle"];
  const ratings = [4, 3, 2, 1];

  const handleCategoryChange = (category) => {
    const newCategories = filters.category || [];
    const updatedCategories = newCategories.includes(category)
      ? newCategories.filter(c => c !== category)
      : [...newCategories, category];
    
    onFiltersChange({ ...filters, category: updatedCategories });
  };

  const handleBrandChange = (brand) => {
    const newBrands = filters.brand || [];
    const updatedBrands = newBrands.includes(brand)
      ? newBrands.filter(b => b !== brand)
      : [...newBrands, brand];
    
    onFiltersChange({ ...filters, brand: updatedBrands });
  };

  const handleRatingChange = (rating) => {
    onFiltersChange({ ...filters, rating: filters.rating === rating ? null : rating });
  };

  const handlePriceChange = () => {
    onFiltersChange({ ...filters, priceRange });
  };

  const FilterSection = ({ title, children }) => (
    <div className="border-b border-gray-200 pb-4">
      <h3 className="font-semibold text-gray-900 mb-3">{title}</h3>
      {children}
    </div>
  );

  const sidebarContent = (
    <div className="h-full bg-white">
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="lg:hidden"
        >
          <ApperIcon name="X" size={20} />
        </Button>
      </div>

      {/* Filters */}
      <div className="p-4 space-y-6 overflow-y-auto">
        {/* Categories */}
        <FilterSection title="Categories">
          <div className="space-y-2">
            {categories.map(category => (
              <label key={category} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.category?.includes(category) || false}
                  onChange={() => handleCategoryChange(category)}
                  className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{category}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Brands */}
        <FilterSection title="Brands">
          <div className="space-y-2">
            {brands.map(brand => (
              <label key={brand} className="flex items-center">
                <input
                  type="checkbox"
                  checked={filters.brand?.includes(brand) || false}
                  onChange={() => handleBrandChange(brand)}
                  className="mr-2 rounded border-gray-300 text-primary focus:ring-primary"
                />
                <span className="text-sm text-gray-700">{brand}</span>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Price Range */}
        <FilterSection title="Price Range">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                value={priceRange.min}
                onChange={(e) => setPriceRange({ ...priceRange, min: parseInt(e.target.value) || 0 })}
                placeholder="Min"
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
              <span className="text-gray-500">-</span>
              <input
                type="number"
                value={priceRange.max}
                onChange={(e) => setPriceRange({ ...priceRange, max: parseInt(e.target.value) || 10000 })}
                placeholder="Max"
                className="w-full px-2 py-1 border border-gray-300 rounded text-sm"
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={handlePriceChange}
              className="w-full"
            >
              Apply
            </Button>
          </div>
        </FilterSection>

        {/* Rating */}
        <FilterSection title="Rating">
          <div className="space-y-2">
            {ratings.map(rating => (
              <label key={rating} className="flex items-center">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => handleRatingChange(rating)}
                  className="mr-2 text-primary focus:ring-primary"
                />
                <div className="flex items-center gap-1">
                  <span className="text-sm text-gray-700">{rating}</span>
                  <ApperIcon name="Star" size={16} className="text-yellow-400 fill-current" />
                  <span className="text-sm text-gray-500">& above</span>
                </div>
              </label>
            ))}
          </div>
        </FilterSection>

        {/* Clear Filters */}
        <Button
          variant="outline"
          onClick={onClearFilters}
          className="w-full"
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="fixed inset-0 bg-black bg-opacity-50" onClick={onClose} />
          <motion.div
            className="fixed left-0 top-0 h-full w-80 max-w-[80vw]"
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 0.3 }}
          >
            {sidebarContent}
          </motion.div>
        </div>
      )}

      {/* Desktop Sidebar */}
      <div className="hidden lg:block w-64 border-r border-gray-200">
        {sidebarContent}
      </div>
    </>
  );
};

export default FilterSidebar;