import { useEffect, useRef, useState } from "react";
import useGameState from "../../lib/stores/useGameState";

export default function MessageDialog() {
  const { currentMessage, showDialog } = useGameState();
  const contentRef = useRef<HTMLDivElement>(null);
  const [isScrolling, setIsScrolling] = useState(false);

  useEffect(() => {
    if (showDialog && currentMessage && contentRef.current) {
      const element = contentRef.current;
      const isOverflowing = element.scrollHeight > element.clientHeight;

      if (isOverflowing) {
        setIsScrolling(true);

        // Auto-scroll slowly if content overflows
        let scrollTop = 0;
        const scrollHeight = element.scrollHeight - element.clientHeight;
        const scrollSpeed = 0.2; // pixels per frame

        const scroll = () => {
          if (element && scrollTop < scrollHeight) {
            scrollTop += scrollSpeed;
            element.scrollTop = scrollTop;
            requestAnimationFrame(scroll);
          } else {
            setIsScrolling(false);
          }
        };

        // Start scrolling after a brief delay
        setTimeout(() => {
          scroll();
        }, 3000);
      } else {
        setIsScrolling(false);
      }
    }
  }, [showDialog, currentMessage]);

  if (!showDialog || !currentMessage) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-80">
      <div
        className="bg-gray-900 border-2 border-orange-600 rounded-lg p-6 max-w-2xl max-h-112 overflow-hidden shadow-2xl"
        style={{
          boxShadow: '0 0 20px #ff4400, inset 0 0 10px rgba(255, 68, 0, 0.2)',
          background: 'linear-gradient(145deg, #1a1a1a, #2d2d2d)'
        }}
      >
        {/* Message content */}
        <div
          ref={contentRef}
          className="text-orange-100 overflow-y-auto max-h-96 pr-4"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: '#ff4400 #333333'
          }}
          dangerouslySetInnerHTML={{ __html: currentMessage }}
        />

        {/* Scrolling indicator */}
        {isScrolling && (
          <div className="text-orange-400 text-sm mt-4 text-center animate-pulse">
            <div>Auto-scrolling...</div>
          </div>
        )}

        {/* Close instruction */}
        <div className="text-orange-400 text-sm mt-4 text-center border-t border-orange-600 pt-4">
          <div className="flex items-center justify-center space-x-2">
            <div className="w-4 h-4 border border-orange-400 rounded flex items-center justify-center text-xs">
              L
            </div>
            <span>Left click to close and resume</span>
          </div>
        </div>
      </div>
    </div>
  );
}
