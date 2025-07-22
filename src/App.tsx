import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import Toast, { ToastProps } from "./Toast";

import "./index.css";

const App = () => {
  const [toasts, setToasts] = useState<Array<{id: number, message: string, type: ToastProps['type']}>>([]);

  const showToast = (message: string, type: ToastProps['type'] = "info") => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">Toast Component Demo</h1>
        <div className="space-y-4">
          <button 
            onClick={() => showToast("Success! Operation completed.", "success")}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded mr-2"
          >
            Show Success Toast
          </button>
          <button 
            onClick={() => showToast("Error! Something went wrong.", "error")}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded mr-2"
          >
            Show Error Toast
          </button>
          <button 
            onClick={() => showToast("Warning! Please check your input.", "warning")}
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-4 py-2 rounded mr-2"
          >
            Show Warning Toast
          </button>
          <button 
            onClick={() => showToast("Info: Here's some information.", "info")}
            className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded mr-2"
          >
            Show Info Toast
          </button>
        </div>
      </div>
      
      {/* Render all toasts */}
      {toasts.map(toast => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          isVisible={true}
          onClose={() => removeToast(toast.id)}
          duration={5000}
        />
      ))}
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);