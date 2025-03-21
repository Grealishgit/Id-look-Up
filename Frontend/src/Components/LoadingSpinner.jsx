import { motion } from "framer-motion";

const LoadingSpinner = () => {
    return (
        <motion.div
            className="w-10 h-10 border-4 border-t-2 border-t-gray-200 border-emerald-600 z-60 rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
    );
};

export default LoadingSpinner;
