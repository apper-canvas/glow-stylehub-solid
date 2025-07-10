import { motion } from "framer-motion";
import ProductCard from "@/components/molecules/ProductCard";
import Empty from "@/components/ui/Empty";
import { useWishlist } from "@/hooks/useWishlist";

const Wishlist = () => {
  const { wishlistItems } = useWishlist();

  if (wishlistItems.length === 0) {
    return (
      <Empty
        title="Your wishlist is empty"
        description="Save items you like to your wishlist and shop them later."
        actionText="Start Shopping"
        actionPath="/products"
        icon="Heart"
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold text-gray-900 font-display">
            My Wishlist
          </h1>
          <span className="text-lg text-gray-600">
            {wishlistItems.length} {wishlistItems.length === 1 ? "item" : "items"}
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlistItems.map((product, index) => (
            <motion.div
              key={product.Id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Wishlist;