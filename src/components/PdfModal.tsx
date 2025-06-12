import React from 'react';

interface PdfModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
}

const PdfModal: React.FC<PdfModalProps> = ({ open, onClose, src }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative bg-background rounded-lg shadow-lg w-full max-w-3xl h-[80vh] flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-2xl text-primary hover:text-accent focus:outline-none z-10"
          aria-label="Close"
        >
          &times;
        </button>
        <iframe
          src={src}
          title="PDF Viewer"
          className="w-full h-full rounded-b-lg border-none"
        />
      </div>
    </div>
  );
};

export default PdfModal; 