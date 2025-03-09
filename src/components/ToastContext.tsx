import React, { createContext, useState } from 'react';
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

    setTimeout(() => {
      setToasts((prev) => {
        return prev.filter((toast) => toast.id !== newToast.id);
      });
    }, 3000);
  };

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

export { ToastContext };
export type { ToastContextType };
