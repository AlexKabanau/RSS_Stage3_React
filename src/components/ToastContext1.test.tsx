import React, { createContext, useContext, useState, useEffect } from 'react';
import Toast from './Toast';

interface ToastContextType {
  addToast: (content: React.ReactNode) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [toasts, setToasts] = useState<
    { id: number; content: React.ReactNode }[]
  >([]);

  const addToast = (content: React.ReactNode) => {
    const newToast = { id: Date.now(), content };
    setToasts((prev) => [...prev, newToast]);
    console.log('Added toast:', newToast);

    setTimeout(() => {
      setToasts((prev) => {
        console.log('Removing toast:', newToast.id);
        return prev.filter((toast) => toast.id !== newToast.id);
      });
    }, 3000);
  };

  useEffect(() => {
    console.log('Current toasts:', toasts);
  }, [toasts]);

  return (
    <ToastContext.Provider value={{ addToast }}>
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast key={toast.id} content={toast.content} />
        ))}
      </div>
      {children}
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
