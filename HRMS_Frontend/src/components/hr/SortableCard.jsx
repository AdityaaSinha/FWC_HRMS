import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { motion } from 'framer-motion';
import { GripVertical } from 'lucide-react';

// Animation settings for Framer Motion
const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.05, // Staggered delay
      duration: 0.3,
      ease: 'easeOut',
    },
  }),
};

export default function SortableCard({ children, id, index, className = '', showHandle = true }) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition: transition || 'transform 0.2s ease',
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };

  return (
    <motion.div
      ref={setNodeRef}
      style={style}
      // Apply Framer Motion animation props
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      custom={index} // Pass the index for staggered delay
      className={`relative ${className}`} // Pass through any grid-span classes
    >
      {/* Pass children (your actual card) */}
      {children}
      
      {/* Add a drag handle */}
      {showHandle && (
        <button
          {...attributes}
          {...listeners}
          className="absolute top-4 right-4 p-1 rounded-md text-gray-500 hover:text-white hover:bg-white/10 transition-colors"
          aria-label="Drag to reorder"
        >
          <GripVertical size={20} />
        </button>
      )}
    </motion.div>
  );
}