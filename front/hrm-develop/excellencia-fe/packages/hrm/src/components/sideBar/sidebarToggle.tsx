// components/SidebarToggle.tsx
import { motion, AnimatePresence } from "framer-motion";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

interface SidebarToggleProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

export default function SidebarToggle({ isExpanded, toggleSidebar }: SidebarToggleProps) {
  return (
    <motion.button
      onClick={toggleSidebar}
      className="absolute -right-3 top-6 z-50 flex h-6 w-6 items-center justify-center rounded-full bg-gray-800 shadow-lg ring-2 ring-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-500"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      aria-label={isExpanded ? "Collapse sidebar" : "Expand sidebar"}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={isExpanded ? "collapsed" : "expanded"}
          initial={{ opacity: 0, rotate: isExpanded ? 90 : -90 }}
          animate={{ opacity: 1, rotate: 0 }}
          exit={{ opacity: 0, rotate: isExpanded ? -90 : 90 }}
          transition={{ duration: 0.2 }}
          className="text-gray-300"
        >
          {isExpanded ? <FiChevronLeft /> : <FiChevronRight />}
        </motion.span>
      </AnimatePresence>
    </motion.button>
  );
}