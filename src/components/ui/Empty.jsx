import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Empty = ({ 
  title = "No items found", 
  description = "Looks like there's nothing here yet.",
  actionText = "Continue Shopping",
  actionPath = "/",
  icon = "ShoppingBag"
}) => {
  const navigate = useNavigate();

  const handleAction = () => {
    navigate(actionPath);
  };

  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[400px] text-center px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-24 h-24 bg-gradient-to-r from-primary to-accent rounded-full flex items-center justify-center mb-6">
        <ApperIcon name={icon} size={48} className="text-white" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display">
        {title}
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {description}
      </p>
      
      <Button
        onClick={handleAction}
        variant="primary"
        size="lg"
        className="flex items-center gap-2"
      >
        <ApperIcon name="ArrowRight" size={20} />
        {actionText}
      </Button>
    </motion.div>
  );
};

export default Empty;