'use client';

import React from 'react';
import { motion, AnimatePresence, useDragControls } from 'framer-motion';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export default function MobileBottomSheet({ isOpen, onClose, children, title }: Props) {
  const dragControls = useDragControls();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          />
          
          <motion.div
            drag="y"
            dragControls={dragControls}
            dragConstraints={{ top: 0 }}
            dragElastic={0.2}
            onDragEnd={(e, info) => {
              if (info.velocity.y > 500 || info.offset.y > 200) {
                onClose();
              }
            }}
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="fixed bottom-0 left-0 right-0 bg-obsidian-900 rounded-t-3xl z-50 md:hidden border-t border-white/10 shadow-2xl"
          >
            <div className="w-full flex justify-center py-3 cursor-grab active:cursor-grabbing">
              <div className="w-10 h-1 bg-obsidian-500 rounded-full" />
            </div>
            
            {title && (
              <div className="px-6 pb-2 text-gold-200 font-semibold text-lg border-b border-white/5">
                {title}
              </div>
            )}
            
            <div className="max-h-[70vh] overflow-y-auto p-4 custom-scrollbar">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
