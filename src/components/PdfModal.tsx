import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';
import { ArrowDownTrayIcon, ChevronLeftIcon, ChevronRightIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid';

pdfjs.GlobalWorkerOptions.workerSrc = `/pdf.worker.min.mjs`;

interface PdfModalProps {
  open: boolean;
  onClose: () => void;
  src: string;
}

const PdfModal: React.FC<PdfModalProps> = ({ open, onClose, src }) => {
  // Conditional return must be at the very top, before any hooks
  if (!open) {
    return null;
  }

  // State declarations
  const [isLoading, setIsLoading] = useState(true);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [hasError, setHasError] = useState(false);
  const [scale, setScale] = useState(1.0);
  const [touchStartDist, setTouchStartDist] = useState<number | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(0);
  const [pageDimensions, setPageDimensions] = useState<{ width: number; height: number } | null>(null);

  const pdfContainerRef = useRef<HTMLDivElement>(null);

  // Calculate the appropriate width or height for the PDF page
  const calculatePageSize = useCallback(() => {
    if (!pdfContainerRef.current || !pageDimensions) return;

    const viewerWidth = pdfContainerRef.current.offsetWidth - 32; // Subtract padding
    const viewerHeight = pdfContainerRef.current.offsetHeight - 32; // Subtract padding

    const pdfAspectRatio = pageDimensions.width / pageDimensions.height;
    const newWidth = viewerWidth;
    const newHeight = newWidth / pdfAspectRatio;

    return { width: newWidth, height: newHeight };
  }, [pageDimensions]);

  // Event handler functions - MUST be defined before useEffect that uses them
  const onDocumentLoadSuccess = useCallback(({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    setIsLoading(false);
    setHasError(false);
    setPageNumber(1); // Reset to first page on new document load
    setScale(1.0); // Reset scale on new document load
  }, []);

  const onDocumentLoadError = useCallback((error: Error) => {
    console.error('Error loading PDF document:', error);
    setIsLoading(false);
    setHasError(true);
  }, []);

  const onPageLoadSuccess = useCallback((page: any) => {
    setPageDimensions({ width: page.width, height: page.height });
  }, []);

  const goToPrevPage = useCallback(() => {
    setPageNumber(prevPageNumber => Math.max(1, prevPageNumber - 1));
  }, []);

  const goToNextPage = useCallback(() => {
    setPageNumber(prevPageNumber => Math.min(numPages || 1, prevPageNumber + 1));
  }, [numPages]);

  const handleDownload = useCallback(() => {
    const link = document.createElement('a');
    link.href = src;
    link.download = src.substring(src.lastIndexOf('/') + 1) || 'document.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [src]);

  const handleZoomIn = useCallback(() => {
    setScale(prevScale => prevScale + 0.1);
  }, []);

  const handleZoomOut = useCallback(() => {
    setScale(prevScale => Math.max(0.5, prevScale - 0.1));
  }, []);

  // Use native DOM event types here
  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.ctrlKey) {
      e.preventDefault(); // Prevent browser zoom
      if (e.deltaY < 0) {
        handleZoomIn();
      } else {
        handleZoomOut();
      }
    }
  }, [handleZoomIn, handleZoomOut]); // Dependencies array should include memoized functions

  // Use native DOM event types here
  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      setTouchStartDist(dist);
    }
  }, []);

  // Use native DOM event types here
  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2 && touchStartDist !== null) {
      e.preventDefault(); // Prevent scrolling/default gestures
      const currentDist = Math.hypot(
        e.touches[0].pageX - e.touches[1].pageX,
        e.touches[0].pageY - e.touches[1].pageY
      );
      const scaleFactor = currentDist / touchStartDist;
      setScale(prevScale => Math.max(0.5, Math.min(3.0, prevScale * scaleFactor)));
      setTouchStartDist(currentDist); // Update start dist for next move
    }
  }, [touchStartDist]); // Dependencies array should include touchStartDist

  // Use native DOM event types here
  const handleTouchEnd = useCallback(() => {
    setTouchStartDist(null);
  }, []);

  // useEffect hook to handle resize for containerWidth and attach/remove event listeners
  useEffect(() => {
    const handleResize = () => {
      if (pdfContainerRef.current) {
        setContainerWidth(pdfContainerRef.current.offsetWidth);
      }
    };

    // Initial width set and resize listener
    if (pdfContainerRef.current) {
      setContainerWidth(pdfContainerRef.current.offsetWidth);
    }
    window.addEventListener('resize', handleResize);

    const pdfContainer = pdfContainerRef.current;
    if (!pdfContainer) return;

    pdfContainer.addEventListener('wheel', handleWheel, { passive: false });
    pdfContainer.addEventListener('touchstart', handleTouchStart, { passive: false });
    pdfContainer.addEventListener('touchmove', handleTouchMove, { passive: false });
    pdfContainer.addEventListener('touchend', handleTouchEnd, { passive: false });

    return () => {
      window.removeEventListener('resize', handleResize);
      pdfContainer.removeEventListener('wheel', handleWheel);
      pdfContainer.removeEventListener('touchstart', handleTouchStart);
      pdfContainer.removeEventListener('touchmove', handleTouchMove);
      pdfContainer.removeEventListener('touchend', handleTouchEnd);
    };
  }, [handleWheel, handleTouchStart, handleTouchMove, handleTouchEnd]);

  const pageSize = calculatePageSize();

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
            <span className="text-sm text-foreground/80 w-24 text-center">
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

            {/* Zoom Controls */}
            <button
              onClick={handleZoomOut}
              disabled={scale <= 0.5 || isLoading || hasError}
              className="p-2 rounded-full text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed hidden md:block"
              aria-label="Zoom out"
            >
              <MinusIcon className="w-5 h-5" />
            </button>
            <span className="text-sm text-foreground/80 w-12 text-center hidden md:block">{(scale * 100).toFixed(0)}%</span>
            <button
              onClick={handleZoomIn}
              disabled={scale >= 3.0 || isLoading || hasError}
              className="p-2 rounded-full text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors disabled:opacity-50 disabled:cursor-not-allowed hidden md:block"
              aria-label="Zoom in"
            >
              <PlusIcon className="w-5 h-5" />
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
            
            {/* Close Button (moved to toolbar) */}
            <button
              onClick={onClose}
              className="p-2 rounded-full text-foreground/80 hover:bg-primary/10 hover:text-primary transition-colors"
              aria-label="Close modal"
            >
              <XMarkIcon className="w-5 h-5" />
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
          <div 
            className="flex-1 flex justify-center items-start p-4 overflow-y-auto relative"
            ref={pdfContainerRef}
          >
            <Document
              file={src}
              onLoadSuccess={onDocumentLoadSuccess}
              onLoadError={onDocumentLoadError}
              className="w-full h-full flex justify-center items-start"
            >
              {numPages && (
                <Page 
                  key={`page_${pageNumber}`}
                  pageNumber={pageNumber}
                  scale={scale}
                  width={pageSize?.width}
                  height={pageSize?.height}
                  renderTextLayer={true}
                  renderAnnotationLayer={true}
                  onLoadSuccess={onPageLoadSuccess}
                />
              )}
            </Document>
          </div>
        )}
      </div>
    </div>
  );
};

export default PdfModal;