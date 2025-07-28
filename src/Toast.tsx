import React, { useState, useEffect } from "react";

interface ToastProps {
  message?: string;
  type?: "success" | "error" | "warning" | "info";
  duration?: number;
  onClose?: () => void;
  isVisible?: boolean;
}

const Toast: React.FC<ToastProps> = ({
  message = "Toast notification",
  type = "info",
  duration = 5000,
  onClose,
  isVisible = true,
}) => {
  console.log('🍞 Toast component rendered with:', { 
    message, 
    type, 
    isVisible, 
    duration,
    hasOnClose: !!onClose 
  });
  
  const [internalVisible, setInternalVisible] = useState(isVisible);
  
  useEffect(() => {    
    setInternalVisible(isVisible);
    
    if (isVisible && duration > 0) {
      console.log(`⏰ Setting auto-close timer for ${duration}ms`);
      
      const timer = setTimeout(() => {
        console.log('⏰ Timer fired - closing toast');
        setInternalVisible(false);
        onClose?.();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  console.log('🎯 Toast render decision - internalVisible:', internalVisible);

  if (!internalVisible) {
    console.log('❌ Toast NOT rendering - returning null');
    return null;
  }

  console.log('✅ Toast IS rendering');

  const handleClose = () => {
    console.log('👆 Toast close button clicked');
    setInternalVisible(false);
    onClose?.();
  };

  const baseClasses = "fixed top-4 right-4 p-4 rounded-lg shadow-lg min-w-80 max-w-md border-l-4";
  const zIndexClass = "z-[99999]";
  const displayClasses = "block";
  
  const typeClasses = {
    success: "bg-green-500 text-white border-green-600",
    error: "bg-red-500 text-white border-red-600",
    warning: "bg-yellow-500 text-black border-yellow-600",
    info: "bg-blue-500 text-white border-blue-600"
  };

  return (
    <div 
      className={`${baseClasses} ${zIndexClass} ${displayClasses} ${typeClasses[type]}`}
      onClick={() => console.log('🖱️ Toast clicked - it is visible!')}
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <span className="font-medium">{message}</span>
        </div>
        <button
          onClick={handleClose}
          className="ml-4 text-lg font-bold hover:opacity-70 focus:outline-none"
          aria-label="Close toast"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Toast;
export type { ToastProps };
