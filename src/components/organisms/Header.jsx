import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import SearchBar from "@/components/molecules/SearchBar";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

const Header = () => {
  const navigate = useNavigate();
  const { getCartCount } = useCart();
  const { wishlistItems } = useWishlist();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const categories = [
    { name: "Women", path: "/products/women" },
    { name: "Men", path: "/products/men" },
    { name: "Kids", path: "/products/kids" },
    { name: "Home & Living", path: "/products/home-living" },
    { name: "Beauty", path: "/products/beauty" }
  ];

  const handleSearch = (query) => {
    navigate(`/products?search=${encodeURIComponent(query)}`);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-40">
      {/* Top Header */}
      <div className="border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <ApperIcon name="ShoppingBag" size={20} className="text-white" />
              </div>
              <span className="text-xl font-bold gradient-text font-display">
                StyleHub
              </span>
            </Link>

            {/* Search Bar - Desktop */}
            <div className="hidden md:block flex-1 max-w-lg mx-8">
              <SearchBar onSearch={handleSearch} />
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleMobileMenu}
                className="md:hidden"
              >
                <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
              </Button>

              {/* Wishlist */}
              <Link to="/wishlist" className="relative">
                <ApperIcon name="Heart" size={24} className="text-gray-600 hover:text-primary transition-colors" />
                {wishlistItems.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {wishlistItems.length}
                  </span>
                )}
              </Link>

              {/* Cart */}
              <Link to="/cart" className="relative">
                <ApperIcon name="ShoppingCart" size={24} className="text-gray-600 hover:text-primary transition-colors" />
                {getCartCount() > 0 && (
                  <span className="absolute -top-2 -right-2 bg-primary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {getCartCount()}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="hidden md:block">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-8 h-12">
            {categories.map((category) => (
              <Link
                key={category.name}
                to={category.path}
                className="text-sm font-medium text-gray-700 hover:text-primary transition-colors"
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white border-t border-gray-200"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.2 }}
        >
          <div className="px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <SearchBar onSearch={handleSearch} />
            
            {/* Mobile Navigation */}
            <div className="space-y-2">
              {categories.map((category) => (
                <Link
                  key={category.name}
                  to={category.path}
                  className="block px-3 py-2 text-base font-medium text-gray-700 hover:text-primary hover:bg-gray-50 rounded-md transition-colors"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </header>
  );
};

export default Header;