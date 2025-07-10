import { useState } from "react";
import { toast } from "react-toastify";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";
import { useCart } from "@/hooks/useCart";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity < 1) return;
    setQuantity(newQuantity);
    updateQuantity(item.productId, item.size, item.color, newQuantity);
  };

  const handleRemove = () => {
    removeFromCart(item.productId, item.size, item.color);
    toast.success("Item removed from cart");
  };

  return (
    <div className="flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm">
      {/* Product Image */}
      <div className="w-20 h-20 bg-gray-100 rounded-lg overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1">
        <h3 className="font-semibold text-gray-900">{item.name}</h3>
        <p className="text-sm text-gray-600">{item.brand}</p>
        <div className="flex items-center gap-2 mt-1">
          <span className="text-sm text-gray-500">Size: {item.size}</span>
          <span className="text-sm text-gray-500">Color: {item.color}</span>
        </div>
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold text-gray-900">
            ₹{item.price.toLocaleString()}
          </span>
          
          {/* Quantity Controls */}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(quantity - 1)}
              disabled={quantity <= 1}
            >
              <ApperIcon name="Minus" size={16} />
            </Button>
            <span className="w-8 text-center">{quantity}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleQuantityChange(quantity + 1)}
            >
              <ApperIcon name="Plus" size={16} />
            </Button>
          </div>
        </div>
      </div>

      {/* Remove Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleRemove}
        className="text-red-600 hover:text-red-700"
      >
        <ApperIcon name="Trash2" size={20} />
      </Button>
    </div>
  );
};

export default CartItem;