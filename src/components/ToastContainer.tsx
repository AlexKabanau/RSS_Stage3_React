// ToastContainer.tsx
import React, { useState } from 'react';
import Toast from './Toast';

const ToastContainer: React.FC = () => {
  const [toasts, setToasts] = useState<
    { id: number; content: React.ReactNode }[]
  >([]);

  const addToast = (content: React.ReactNode) => {
    const newToast = { id: Date.now(), content };
    setToasts((prev) => [...prev, newToast]);

    // Удаление тоста через 3 секунды
    setTimeout(() => {
      removeToast(newToast.id);
    }, 3000);
  };

  const removeToast = (id: number) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  };

  return (
    <div>
      <button
        onClick={() =>
          addToast(
            <span>
              Это ваше уведомление с <strong>жирным</strong> текстом!
            </span>
          )
        }
      >
        Показать тост
      </button>
      <div className="toast-container">
        {toasts.map((toast) => (
          <Toast key={toast.id} content={toast.content} />
        ))}
      </div>
    </div>
  );
};

export default ToastContainer;
