// Toast.tsx
import React from 'react';
import './Toast.css';

interface ToastProps {
  content: React.ReactNode;
}

const Toast: React.FC<ToastProps> = ({ content }) => {
  return <div className="toast">{content}</div>;
};

export default Toast;
