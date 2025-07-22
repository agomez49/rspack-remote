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
  duration = 3000, 
  onClose,
  isVisible = false 
}) => {
  const [show, setShow] = useState(isVisible);

  useEffect(() => {
    setShow(isVisible);
    if (isVisible && duration > 0) {
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.();
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  const typeStyles = {
    success: "bg-green-500 text-white border-green-600",
    error: "bg-red-500 text-white border-red-600",
    warning: "bg-yellow-500 text-black border-yellow-600",
    info: "bg-blue-500 text-white border-blue-600"
  };

  if (!show) return null;

  return (
    <div className={`
      fixed top-5 right-5 z-50 p-4 rounded-lg shadow-lg border-l-4 
      min-w-80 max-w-md transform transition-all duration-300 ease-in-out
      ${show ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'}
      ${typeStyles[type]}
    `}>
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="mr-3">
            {type === "success" && "✓"}
            {type === "error" && "✗"}
            {type === "warning" && "⚠"}
            {type === "info" && "ℹ"}
          </div>
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
