import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ProductCard from "@/components/molecules/ProductCard";
import Loading from "@/components/ui/Loading";
import Error from "@/components/ui/Error";
import { productService } from "@/services/api/productService";

const RelatedProducts = ({ productId }) => {
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadRelatedProducts();
  }, [productId]);

const loadRelatedProducts = async () => {
    try {
      setLoading(true);
      setError("");
      
      const data = await productService.getSimilarProducts(productId);
      
      // Transform data to match UI expectations
      const transformedData = data.map(p => ({
        ...p,
        name: p.Name || p.name,
        discountPrice: p.discount_price || p.discountPrice,
        reviewCount: p.review_count || p.reviewCount
      }));
      
      setRelatedProducts(transformedData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">
          Related Products
        </h2>
        <Loading type="grid" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mt-16">
        <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">
          Related Products
        </h2>
        <Error message={error} onRetry={loadRelatedProducts} />
      </div>
    );
  }

  if (relatedProducts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16">
      <h2 className="text-2xl font-bold text-gray-900 mb-6 font-display">
        Related Products
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {relatedProducts.map((product, index) => (
          <motion.div
            key={product.Id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;