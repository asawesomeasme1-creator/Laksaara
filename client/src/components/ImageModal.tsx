import { useEffect } from 'react';
import { X } from 'lucide-react';

interface ImageModalProps {
  isOpen: boolean;
  image: string;
  alt: string;
  onClose: () => void;
  measurements?: string[];
}

export default function ImageModal({ isOpen, image, alt, onClose, measurements }: ImageModalProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 animate-fade-in-scale"
      onClick={onClose}
    >
      <div
        className="relative w-full max-h-[90vh] flex items-center justify-center gap-8"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 bg-white/10 hover:bg-white/20 text-white p-2 rounded-full transition-all duration-200 backdrop-blur-sm"
          aria-label="Close modal"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Image Container */}
        <div className="relative flex-1 flex items-center justify-center max-w-3xl">
          <img
            src={image}
            alt={alt}
            className="max-w-full max-h-[70vh] w-auto h-auto object-contain"
          />
        </div>

        {/* Dimensions Sidebar */}
        {measurements && measurements.length > 0 && (
          <div className="hidden lg:flex flex-col gap-4 w-80 max-h-[70vh] overflow-y-auto pr-2">
            <div className="bg-brand-gold/10 backdrop-blur-sm rounded-lg p-6 border border-brand-gold/20">
              <h3 className="text-brand-gold font-semibold text-lg mb-4 uppercase tracking-wider">Specifications</h3>
              <div className="space-y-3">
                {measurements.map((m, i) => (
                  <div key={i} className="text-brand-cream/80 text-sm leading-relaxed border-b border-brand-gold/10 pb-3 last:border-0">
                    {m}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Click to close hint */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white/60 text-sm backdrop-blur-sm bg-black/30 px-4 py-2 rounded-full">
          Click outside or press ESC to close
        </div>
      </div>
    </div>
  );
}
