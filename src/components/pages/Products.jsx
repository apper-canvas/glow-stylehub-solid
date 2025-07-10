import { useState, useEffect } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import ProductCard from "@/components/molecules/ProductCard";
import FilterSidebar from "@/components/molecules/FilterSidebar";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import Empty from "@/components/ui/Empty";
import { productService } from "@/services/api/productService";

const Products = () => {
  const { category } = useParams();
  const [searchParams] = useSearchParams();
  const searchQuery = searchParams.get("search");

  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState("popularity");
  const [viewMode, setViewMode] = useState("grid");
  const [filters, setFilters] = useState({
    category: [],
    brand: [],
    priceRange: null,
    rating: null
  });

  useEffect(() => {
    loadProducts();
  }, [category, searchQuery]);

  useEffect(() => {
    applyFiltersAndSort();
  }, [products, filters, sortBy]);

  const loadProducts = async () => {
    try {
      setLoading(true);
      setError("");
      
      let data;
      if (searchQuery) {
        data = await productService.searchProducts(searchQuery);
      } else if (category) {
        data = await productService.getByCategory(category);
      } else {
        data = await productService.getAll();
      }
      
      setProducts(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const applyFiltersAndSort = () => {
    let filtered = [...products];

    // Apply filters
    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter(p => filters.category.includes(p.category));
    }

    if (filters.brand && filters.brand.length > 0) {
      filtered = filtered.filter(p => filters.brand.includes(p.brand));
    }

    if (filters.priceRange) {
      filtered = filtered.filter(p => 
        p.discountPrice >= filters.priceRange.min && 
        p.discountPrice <= filters.priceRange.max
      );
    }

    if (filters.rating) {
      filtered = filtered.filter(p => p.rating >= filters.rating);
    }

    // Apply sorting
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.discountPrice - b.discountPrice);
        break;
      case "price-high":
        filtered.sort((a, b) => b.discountPrice - a.discountPrice);
        break;
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        filtered.sort((a, b) => b.Id - a.Id);
        break;
      default:
        // Keep original order for popularity
        break;
    }

    setFilteredProducts(filtered);
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleClearFilters = () => {
    setFilters({
      category: [],
      brand: [],
      priceRange: null,
      rating: null
    });
  };

  const getPageTitle = () => {
    if (searchQuery) {
      return `Search results for "${searchQuery}"`;
    }
    if (category) {
      return category.charAt(0).toUpperCase() + category.slice(1).replace("-", " & ");
    }
    return "All Products";
  };

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error message={error} onRetry={loadProducts} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex">
          {/* Filter Sidebar */}
          <FilterSidebar
            isOpen={isFilterOpen}
            onClose={() => setIsFilterOpen(false)}
            filters={filters}
            onFiltersChange={handleFiltersChange}
            onClearFilters={handleClearFilters}
          />

          {/* Main Content */}
          <div className="flex-1 lg:ml-0">
            {/* Header */}
            <div className="bg-white border-b border-gray-200 px-4 sm:px-6 lg:px-8 py-6">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900 font-display">
                    {getPageTitle()}
                  </h1>
                  <p className="text-gray-600 mt-1">
                    {filteredProducts.length} products found
                  </p>
                </div>

                <div className="flex items-center space-x-4">
                  {/* Mobile Filter Button */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setIsFilterOpen(true)}
                    className="lg:hidden"
                  >
                    <ApperIcon name="Filter" size={20} />
                    Filters
                  </Button>

                  {/* Sort Dropdown */}
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  >
                    <option value="popularity">Most Popular</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Highest Rated</option>
                    <option value="newest">Newest First</option>
                  </select>

                  {/* View Mode Toggle */}
                  <div className="hidden sm:flex border border-gray-300 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-primary text-white" : "bg-white text-gray-600"}`}
                    >
                      <ApperIcon name="Grid3X3" size={20} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-primary text-white" : "bg-white text-gray-600"}`}
                    >
                      <ApperIcon name="List" size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid */}
            <div className="px-4 sm:px-6 lg:px-8 py-8">
              {filteredProducts.length === 0 ? (
                <Empty
                  title="No products found"
                  description="Try adjusting your filters or search terms."
                  actionText="Clear Filters"
                  actionPath="/products"
                  icon="Search"
                />
              ) : (
                <div className={`grid gap-6 ${
                  viewMode === "grid" 
                    ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
                    : "grid-cols-1"
                }`}>
                  {filteredProducts.map((product, index) => (
                    <motion.div
                      key={product.Id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;