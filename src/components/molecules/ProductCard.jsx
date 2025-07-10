import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import Badge from "@/components/atoms/Badge";
import { useCart } from "@/hooks/useCart";
import { useWishlist } from "@/hooks/useWishlist";

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { isInWishlist, toggleWishlist } = useWishlist();
  const [isHovered, setIsHovered] = useState(false);

  const discountPercentage = Math.round(
    ((product.price - product.discountPrice) / product.price) * 100
  );

  const handleAddToCart = (e) => {
    e.stopPropagation();
    addToCart(product, product.sizes[0], product.colors[0], 1);
    toast.success("Added to cart!");
  };

  const handleWishlistToggle = (e) => {
    e.stopPropagation();
    toggleWishlist(product);
    toast.success(
      isInWishlist(product.Id) ? "Removed from wishlist" : "Added to wishlist"
    );
  };

  const handleCardClick = () => {
    navigate(`/product/${product.Id}`);
  };

  return (
    <motion.div
      className="product-card group relative overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleCardClick}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      {/* Discount Badge */}
      {discountPercentage > 0 && (
        <Badge variant="accent" className="absolute top-2 left-2 z-10">
          {discountPercentage}% OFF
        </Badge>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlistToggle}
        className="absolute top-2 right-2 z-10 p-2 rounded-full bg-white shadow-lg hover:bg-gray-50 transition-colors"
      >
        <ApperIcon
          name="Heart"
          size={18}
          className={`transition-colors ${
            isInWishlist(product.Id) ? "text-primary fill-primary" : "text-gray-600"
          }`}
        />
      </button>

      {/* Product Image */}
      <div className="relative aspect-4/5 overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Quick Add Button - Shows on hover */}
        <motion.div
          className="absolute bottom-4 left-4 right-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.2 }}
        >
          <Button
            onClick={handleAddToCart}
            variant="primary"
            size="sm"
            className="w-full"
          >
            Quick Add
          </Button>
        </motion.div>
      </div>

      {/* Product Info */}
      <div className="p-4 space-y-2">
        <div className="text-sm text-gray-600 font-medium">{product.brand}</div>
        <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
        
        {/* Rating */}
        <div className="flex items-center gap-1">
          <ApperIcon name="Star" size={16} className="text-yellow-400 fill-current" />
          <span className="text-sm text-gray-600">
            {product.rating} ({product.reviewCount})
          </span>
        </div>

        {/* Price */}
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-gray-900">
            ₹{product.discountPrice.toLocaleString()}
          </span>
          {product.price > product.discountPrice && (
            <span className="text-sm text-gray-500 line-through">
              ₹{product.price.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;