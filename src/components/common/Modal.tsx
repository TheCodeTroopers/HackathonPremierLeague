import React, { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  maxWidth = 'lg'
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || typeof document === 'undefined') return null;

  const maxWidthClasses = {
    sm: 'max-w-sm',
    md: 'max-w-md',
    lg: 'max-w-lg',
    xl: 'max-w-xl',
    '2xl': 'max-w-2xl'
  }[maxWidth];

  return createPortal(
    <div className="fixed inset-0 z-[9999] overflow-y-auto overflow-x-hidden flex justify-center items-start sm:items-center p-3 sm:p-6 bg-[#1E1B4B]/80 backdrop-blur-sm animate-in fade-in duration-200">
      <div
        className="fixed inset-0 -z-10 cursor-pointer"
        onClick={onClose}
        aria-label="Close modal backdrop"
      />
      <div
        className={`relative w-full ${maxWidthClasses} my-auto bg-[#FFFDF7] sketch-border rounded-2xl p-4 sm:p-7 shadow-sketch-xl z-10 max-h-[calc(100dvh-2rem)] sm:max-h-[calc(100dvh-4rem)] overflow-y-auto`}
      >
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b-2 border-[#1E1B4B]">
          <h3 className="text-base sm:text-xl font-black font-display uppercase text-[#1E1B4B] pr-2">
            {title}
          </h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg border-2 border-[#1E1B4B] bg-[#EFE8D6] hover:bg-[#EA580C] hover:text-white transition-colors cursor-pointer flex-shrink-0"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <div>{children}</div>
      </div>
    </div>,
    document.body
  );
};

