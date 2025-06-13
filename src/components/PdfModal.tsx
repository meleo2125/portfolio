import React, { useState } from 'react';

interface PdfModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
}

const PdfModal: React.FC<PdfModalProps> = ({ open, onClose, src }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

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
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {hasError ? (
          <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
            <p className="text-xl font-semibold text-primary mb-2">Failed to load PDF</p>
            <p className="text-foreground/80 mb-4">Please try again later or contact me directly for the document.</p>
            {src && (
              <a
                href={src}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
              >
                Download PDF
              </a>
            )}
          </div>
        ) : (
          <iframe
            src={src}
            title="PDF Viewer"
            className="w-full h-full rounded-b-lg border-none"
            onLoad={() => setIsLoading(false)}
            onError={() => {
              setIsLoading(false);
              setHasError(true);
            }}
          />
        )}

        {/* Optional: Add a download button always for mobile */}
        {!isLoading && !hasError && (
          <div className="md:hidden p-4 bg-background border-t border-muted-foreground/20 flex justify-center">
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              className="px-6 py-2 rounded-full bg-primary text-white font-medium hover:bg-primary/90 transition-colors"
            >
              Download PDF
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfModal; 