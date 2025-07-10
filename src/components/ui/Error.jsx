import { motion } from "framer-motion";
import ApperIcon from "@/components/ApperIcon";
import Button from "@/components/atoms/Button";

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  showRetry = true 
}) => {
  return (
    <motion.div 
      className="flex flex-col items-center justify-center min-h-[400px] text-center px-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="w-20 h-20 bg-gradient-to-r from-red-400 to-red-600 rounded-full flex items-center justify-center mb-6">
        <ApperIcon name="AlertCircle" size={40} className="text-white" />
      </div>
      
      <h3 className="text-2xl font-bold text-gray-900 mb-4 font-display">
        Oops! Something went wrong
      </h3>
      
      <p className="text-gray-600 mb-8 max-w-md">
        {message}. Please try again or contact support if the problem persists.
      </p>
      
      {showRetry && onRetry && (
        <Button
          onClick={onRetry}
          variant="primary"
          size="lg"
          className="flex items-center gap-2"
        >
          <ApperIcon name="RefreshCw" size={20} />
          Try Again
        </Button>
      )}
    </motion.div>
  );
};

export default Error;