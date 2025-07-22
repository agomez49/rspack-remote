import React, { useState, useEffect, useRef } from "react";

interface ToastProps {
  message?: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
  isVisible?: boolean;
  debugMode?: boolean; // Add a debug mode prop
}

const Toast: React.FC<ToastProps> = ({
  message = "Toast notification",
  type = "info",
  duration,
  onClose,
  isVisible = false,
  debugMode = false
}) => {
  const [show, setShow] = useState(isVisible);
  const renderCount = useRef(0);
  
  // Log whenever component props change
  useEffect(() => {
    if (debugMode) {
      console.log('Toast component received props:', { 
        message, type, duration, isVisible, show 
      });
      renderCount.current += 1;
      console.log(`Toast render count: ${renderCount.current}`);
    }
  });

  useEffect(() => {
    if (debugMode) {
      console.log(`isVisible changed to: ${isVisible}`);
    }
    
    // Force show state to follow isVisible prop
    setShow(isVisible);
    
    let timer: NodeJS.Timeout | undefined;
    if (isVisible && duration && duration > 0) {
      if (debugMode) {
        console.log(`Setting auto-dismiss timer for ${duration}ms`);
      }
      timer = setTimeout(() => {
        if (debugMode) {
          console.log('Auto-dismiss timer triggered');
        }
        setShow(false);
        onClose?.();
      }, duration);
    }
    
    return () => {
      if (timer) {
        if (debugMode) {
          console.log('Clearing timer on cleanup');
        }
        clearTimeout(timer);
      }
    };
  }, [isVisible, duration, onClose, debugMode]);

  const typeStyles = {
    success: "bg-green-500 text-white border-green-600",
    error: "bg-red-500 text-white border-red-600",
    warning: "bg-yellow-500 text-black border-yellow-600",
    info: "bg-blue-500 text-white border-blue-600"  // Fixed info color
  };

  // Log and return null when not showing
  if (!show) {
    if (debugMode) {
      console.log('Toast is not visible (show === false)');
    }
    return null;
  }
  
  if (debugMode) {
    console.log('Rendering visible toast component');
  }

  return (
    <div className={`
      fixed top-5 right-5 z-[9999] p-4 rounded-lg shadow-lg border-l-4 
      min-w-[320px] max-w-md transform transition-all duration-300 ease-in-out
      ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      ${typeStyles[type]}
    `}
    style={{
      // Add inline styles as a fallback in case of CSS conflicts
      position: 'fixed',
      top: '20px',
      right: '20px',
      zIndex: 9999,
      padding: '16px',
      borderRadius: '8px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      borderLeftWidth: '4px',
    }}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-medium">{message}</span>
        </div>
        <button
          onClick={() => {
            setShow(false);
            onClose?.();
          }}
          className="ml-4 text-lg font-bold hover:opacity-70 focus:outline-none"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
export type { ToastProps };