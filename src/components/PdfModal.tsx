import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { ArrowDownTrayIcon, ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

interface PdfModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
}

const PdfModal: React.FC<PdfModalProps> = ({ open, onClose, src }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasError, setHasError] = useState(false);

  if (!open) return null;

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setHasError(false);
    setPageNumber(1); // Reset to first page on new document load
  };

  const onDocumentLoadError = (error: Error) => {
    console.error('Error loading PDF document:', error);
    setIsLoading(false);
    setHasError(true);
  };

  const goToPrevPage = () => {
    setPageNumber(prevPageNumber => Math.max(1, prevPageNumber - 1));
  };

  const goToNextPage = () => {
    setPageNumber(prevPageNumber => Math.min(numPages || 1, prevPageNumber + 1));
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = src;
    link.download = src.substring(src.lastIndexOf('/') + 1) || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
      <div className="relative bg-background rounded-lg shadow-lg w-full max-w-3xl h-[90vh] flex flex-col overflow-hidden">
        {/* Header/Toolbar */}
        <div className="flex items-center justify-between p-4 bg-muted/50 border-b border-muted-foreground/20">
          <div className="flex items-center gap-2">
            {/* Page Navigation */}
            <button
              onClick={goToPrevPage}
              disabled={pageNumber <= 1 || isLoading || hasError}
              className="p-2 rounded-full text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeftIcon className="w-5 h-5" />
            </button>
            <span className="text-sm text-foreground/80">
              Page {pageNumber} of {numPages || '--'}
            </span>
            <button
              onClick={goToNextPage}
              disabled={pageNumber >= (numPages || 1) || isLoading || hasError}
              className="p-2 rounded-full text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRightIcon className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2">
            {/* Download Button */}
            <button
              onClick={handleDownload}
              className="p-2 rounded-full text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="Download PDF"
            >
              <ArrowDownTrayIcon className="w-5 h-5" />
            </button>
            
            {/* Close Button */}
            <button
              onClick={onClose}
              className="p-2 rounded-full text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="Close modal"
            >
              &times;
            </button>
          </div>
        </div>
        
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {hasError ? (
          <div className="flex-1 flex items-center justify-center p-8 text-center">
            <div>
              <p className="text-xl font-semibold text-primary mb-2">Failed to load PDF</p>
              <p className="text-foreground/80">Please try again later or contact me directly for the document.</p>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex justify-center items-center p-4 overflow-y-auto relative">
            <Document
              file={src}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              className="w-full max-w-full h-full flex justify-center items-center"
            >
              {numPages && Array.from(new Array(numPages), (el, index) => (
                <Page key={`page_${index + 1}`} pageNumber={index + 1} width={Math.min(700, window.innerWidth * 0.8)} renderTextLayer={true} renderAnnotationLayer={true} />
              ))}
            </Document>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfModal; 